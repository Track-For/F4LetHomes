import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';

process.env.MOCK_STAYS = '1';
process.env.MP_ACCESS_TOKEN = 'TEST-token-falso';
process.env.MP_PUBLIC_KEY = 'TEST-public-falsa';
process.env.PUBLIC_BASE_URL = 'https://pagamento.exemplo.com';

const { stays } = await import('../lib/stays.js');
const { confirmPayment } = await import('../lib/confirm.js');
const { validWebhookSignature } = await import('../lib/mp.js');
const { buildPayment, default: processPayment } = await import('../api/process-payment.js');
const reservationApi = (await import('../api/reservation.js')).default;
const webhook = (await import('../api/webhook-mp.js')).default;
const statusApi = (await import('../api/payment-status.js')).default;
const { env } = await import('../lib/env.js');

// ---------- dublês ----------
const db = stays._mockDb;
const fresh = structuredClone(db);
let mpPayments = {};
let mpCreated = [];
let mpNext = 1000;

function mpPayment(over = {}) {
  const id = String(mpNext++);
  const p = { id: Number(id), status: 'approved', status_detail: 'accredited', currency_id: 'BRL', transaction_amount: 933, installments: 1, payment_method_id: 'visa', external_reference: 'TESTE1', fee_details: [{ amount: 46.46 }], ...over };
  mpPayments[id] = p;
  return p;
}

globalThis.fetch = async (url, opts = {}) => {
  const u = new URL(url);
  assert.equal(u.host, 'api.mercadopago.com', `fetch inesperado: ${url}`);
  if (opts.method === 'POST' && u.pathname === '/v1/payments') {
    const body = JSON.parse(opts.body);
    mpCreated.push({ body, headers: opts.headers });
    const p = mpPayment({ transaction_amount: body.transaction_amount, metadata: body.metadata, external_reference: body.external_reference, payment_method_id: body.payment_method_id, installments: body.installments || 1, status: body.payment_method_id === 'pix' ? 'pending' : 'approved' });
    return new Response(JSON.stringify(p), { status: 201 });
  }
  const m = u.pathname.match(/^\/v1\/payments\/(\d+)$/);
  if (m && mpPayments[m[1]]) return new Response(JSON.stringify(mpPayments[m[1]]), { status: 200 });
  return new Response('{"message":"not found"}', { status: 404 });
};

function call(fn, { method = 'GET', query = {}, body, headers = {} } = {}) {
  return new Promise((resolve) => {
    const res = {
      statusCode: 200, headers: {},
      setHeader(k, v) { this.headers[k.toLowerCase()] = v; },
      end(data) { resolve({ status: this.statusCode, body: data ? JSON.parse(data) : null }); },
    };
    fn({ method, query, body, headers }, res);
  });
}

beforeEach(() => {
  Object.assign(db, structuredClone(fresh));
  mpPayments = {};
  mpCreated = [];
  delete process.env.MP_WEBHOOK_SECRET;
});

// ---------- montagem do pagamento ----------
test('cartão: valor vem da Stays, não do navegador; parcelas limitadas', () => {
  const cfg = env();
  const body = buildPayment({ code: 'TESTE1', due: 933, method: 'credit_card', cfg, form: { transaction_amount: 1, token: 'tok', installments: 3, payment_method_id: 'visa', issuer_id: 25, payer: { email: 'a@b.com', identification: { type: 'CPF', number: '123.456.789-09' } } } });
  assert.equal(body.transaction_amount, 933);
  assert.equal(body.installments, 3);
  assert.equal(body.payer.identification.number, '12345678909');
  assert.equal(body.external_reference, 'TESTE1');
  assert.equal(body.notification_url, 'https://pagamento.exemplo.com/api/webhook-mp');
  assert.throws(() => buildPayment({ code: 'TESTE1', due: 933, method: 'credit_card', cfg, form: { token: 't', installments: 4, payment_method_id: 'visa', payer: { email: 'a@b.com' } } }), /too_many_installments/);
  assert.throws(() => buildPayment({ code: 'TESTE1', due: 933, method: 'credit_card', cfg, form: { token: 't', payment_method_id: 'visa', payer: { email: 'x' } } }), /invalid_email/);
});

test('Pix: expira em 30 min, no horário de Brasília', () => {
  const now = Date.UTC(2026, 10, 22, 23, 0, 0); // 20h00 em Brasília
  const body = buildPayment({ code: 'TESTE1', due: 933, method: 'bank_transfer', cfg: env(), now, form: { payment_method_id: 'pix', payer: { email: 'a@b.com' } } });
  assert.equal(body.payment_method_id, 'pix');
  assert.equal(body.date_of_expiration, '2026-11-22T20:30:00.000-03:00');
  assert.equal(body.token, undefined);
  // 5% de desconto: paga 886,35 e quita 933
  assert.equal(body.transaction_amount, 886.35);
  assert.equal(body.metadata.settles, 933);
  assert.equal(body.metadata.pix_discount, 46.65);
});

test('Pix com desconto: a Stays recebe o valor cheio, com o desconto somado à taxa', async () => {
  const p = mpPayment({ payment_method_id: 'pix', transaction_amount: 886.35, metadata: { settles: 933 }, fee_details: [{ amount: 8.86 }] });
  await confirmPayment(String(p.id));
  const [pay] = db.payments.TESTE1;
  assert.equal(pay._f_val, 933);
  assert.equal(pay._f_fee, 55.51);
  assert.match(pay.desc, /desconto/);
  assert.equal(db.reservations.TESTE1.stats._f_totalPaid, 933);
  assert.equal(db.reservations.TESTE1.type, 'booked');
});

test('metadata "settles" absurdo não vira crédito', async () => {
  const p = mpPayment({ payment_method_id: 'pix', transaction_amount: 10, metadata: { settles: 933 } });
  await confirmPayment(String(p.id));
  assert.equal(db.payments.TESTE1[0]._f_val, 10);
});

// ---------- confirmação na Stays ----------
test('pagamento aprovado: lança um pagamento e confirma a reserva', async () => {
  const p = mpPayment();
  const r = await confirmPayment(String(p.id));
  assert.equal(r.recorded, true);
  const list = db.payments.TESTE1;
  assert.equal(list.length, 1);
  assert.equal(list[0].type, 'credit');
  assert.equal(list[0].status, 'completed');
  assert.equal(list[0]._f_val, 933);
  assert.equal(list[0]._f_fee, 46.46);
  assert.match(list[0].name, new RegExp(`MP ${p.id}`));
  assert.equal(db.reservations.TESTE1.type, 'booked');
  assert.equal(db.reservations.TESTE1.stats._f_totalPaid, 933);
});

test('confirmar duas vezes, ou ao mesmo tempo, não duplica', async () => {
  const p = mpPayment();
  await Promise.all([confirmPayment(String(p.id)), confirmPayment(String(p.id)), confirmPayment(String(p.id))]);
  await confirmPayment(String(p.id));
  assert.equal(db.payments.TESTE1.length, 1);
  assert.equal(db.reservations.TESTE1.stats._f_totalPaid, 933);
});

test('pagamento pendente ou recusado não mexe na reserva', async () => {
  for (const status of ['pending', 'rejected', 'in_process']) {
    const p = mpPayment({ status });
    const r = await confirmPayment(String(p.id));
    assert.equal(r.recorded, false);
  }
  assert.equal((db.payments.TESTE1 || []).length, 0);
  assert.equal(db.reservations.TESTE1.type, 'reserved');
});

// ---------- rotas ----------
test('GET /api/reservation: resumo sem dados pessoais e estados', async () => {
  const a = await call(reservationApi, { query: { code: 'teste1' } });
  assert.equal(a.status, 200);
  assert.deepEqual(Object.keys(a.body).sort(), ['checkIn', 'checkOut', 'code', 'currency', 'due', 'guests', 'listing', 'paid', 'state', 'total'].sort());
  assert.equal(a.body.state, 'payable');
  assert.equal(a.body.due, 933);
  assert.equal((await call(reservationApi, { query: { code: 'TESTE2' } })).body.state, 'paid');
  assert.equal((await call(reservationApi, { query: { code: 'NAOEXISTE' } })).status, 404);
});

test('reserva de outro canal (Airbnb, Booking, Expedia...) não aceita pagamento', async () => {
  assert.equal((await call(reservationApi, { query: { code: 'TESTE3' } })).body.state, 'channel');
  const r = await call(processPayment, { method: 'POST', body: { code: 'TESTE3', selectedPaymentMethod: 'credit_card', formData: { transaction_amount: 700, token: 'tok', installments: 1, payment_method_id: 'visa', payer: { email: 'h@exemplo.com' } } } });
  assert.equal(r.status, 409);
  assert.equal(mpCreated.length, 0);
  const { otherChannel } = await import('../lib/stays.js');
  assert.equal(otherChannel({ partner: { name: 'Airbnb' } }).blocked, true);
  assert.equal(otherChannel({ partner: { name: 'API booking.com' } }).blocked, true);
  assert.equal(otherChannel({ partnerCode: 'HM2QNZPDN1' }).blocked, true);
  assert.equal(otherChannel({}).blocked, false);
  assert.equal(otherChannel({ partner: { name: 'Site' } }).blocked, false);
  assert.equal((await call(reservationApi, { query: { code: '../x' } })).status, 400);
});

test('POST /api/process-payment: cartão aprovado já confirma a reserva', async () => {
  const r = await call(processPayment, { method: 'POST', body: { code: 'TESTE1', selectedPaymentMethod: 'credit_card', formData: { transaction_amount: 10, token: 'tok', installments: 2, payment_method_id: 'master', payer: { email: 'h@exemplo.com' } } } });
  assert.equal(r.status, 200);
  assert.equal(r.body.status, 'approved');
  assert.equal(mpCreated[0].body.transaction_amount, 933);
  assert.ok(mpCreated[0].headers['X-Idempotency-Key']);
  assert.equal(db.reservations.TESTE1.type, 'booked');
  assert.equal(db.payments.TESTE1.length, 1);
});

test('POST /api/process-payment: reserva já paga é recusada', async () => {
  const r = await call(processPayment, { method: 'POST', body: { code: 'TESTE2', formData: { payment_method_id: 'pix', payer: { email: 'h@exemplo.com' } } } });
  assert.equal(r.status, 409);
  assert.equal(r.body.error, 'already_paid');
  assert.equal(mpCreated.length, 0);
});

test('Pix: fica pendente; a consulta e o webhook confirmam quando aprovar', async () => {
  const r = await call(processPayment, { method: 'POST', body: { code: 'TESTE1', selectedPaymentMethod: 'bank_transfer', formData: { payment_method_id: 'pix', payer: { email: 'h@exemplo.com' } } } });
  assert.equal(r.body.status, 'pending');
  assert.equal(db.reservations.TESTE1.type, 'reserved');

  // consulta de outra reserva não vaza o status
  assert.equal((await call(statusApi, { query: { code: 'TESTE2', id: r.body.id } })).status, 404);

  mpPayments[r.body.id].status = 'approved';
  const w = await call(webhook, { method: 'POST', query: { 'data.id': r.body.id, type: 'payment' }, body: { type: 'payment', data: { id: r.body.id } } });
  assert.equal(w.status, 200);
  assert.equal(w.body.recorded, true);
  const s = await call(statusApi, { query: { code: 'TESTE1', id: r.body.id } });
  assert.equal(s.body.status, 'approved');
  assert.equal(db.payments.TESTE1.length, 1);
  assert.equal(db.reservations.TESTE1.type, 'booked');
});

test('webhook: assinatura obrigatória quando MP_WEBHOOK_SECRET existe', async () => {
  process.env.MP_WEBHOOK_SECRET = 'segredo';
  const p = mpPayment();
  const id = String(p.id);
  const bad = await call(webhook, { method: 'POST', query: { 'data.id': id, type: 'payment' }, body: { type: 'payment' }, headers: { 'x-signature': 'ts=1,v1=abc', 'x-request-id': 'r1' } });
  assert.equal(bad.status, 401);
  assert.equal((db.payments.TESTE1 || []).length, 0);

  const ts = String(Math.floor(Date.now() / 1000));
  const v1 = crypto.createHmac('sha256', 'segredo').update(`id:${id};request-id:r1;ts:${ts};`).digest('hex');
  const ok = await call(webhook, { method: 'POST', query: { 'data.id': id, type: 'payment' }, body: { type: 'payment' }, headers: { 'x-signature': `ts=${ts},v1=${v1}`, 'x-request-id': 'r1' } });
  assert.equal(ok.status, 200);
  assert.equal(db.payments.TESTE1.length, 1);
});

test('webhook: ignora eventos que não são de pagamento', async () => {
  const r = await call(webhook, { method: 'POST', query: { type: 'merchant_order', id: '1' }, body: {} });
  assert.equal(r.status, 200);
  assert.equal(r.body.ignored, true);
});

test('assinatura: rejeita v1 de outro segredo', () => {
  const ts = '1704908010';
  const v1 = crypto.createHmac('sha256', 'outro').update(`id:123;request-id:r;ts:${ts};`).digest('hex');
  assert.equal(validWebhookSignature({ signature: `ts=${ts},v1=${v1}`, requestId: 'r', dataId: '123', secret: 'segredo' }), false);
});
