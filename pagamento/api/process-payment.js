// Cria o pagamento no Mercado Pago a partir do formulário do Payment Brick.
// O valor cobrado vem da Stays (valor em aberto da reserva). O valor enviado pelo navegador é ignorado.
import crypto from 'node:crypto';
import { env } from '../lib/env.js';
import { handler, send, readJson, reservationCode, HttpError } from '../lib/http.js';
import { payableReservation } from '../lib/stays.js';
import { mp } from '../lib/mp.js';
import { confirmPayment } from '../lib/confirm.js';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/;

function payer(formPayer = {}) {
  const email = String(formPayer.email || '').trim();
  if (!EMAIL_RE.test(email)) throw new HttpError(400, 'invalid_email');
  const out = { email };
  const id = formPayer.identification;
  if (id && id.type && id.number) out.identification = { type: String(id.type), number: String(id.number).replace(/\D/g, '') };
  if (formPayer.first_name) out.first_name = String(formPayer.first_name).slice(0, 80);
  if (formPayer.last_name) out.last_name = String(formPayer.last_name).slice(0, 80);
  return out;
}

export function buildPayment({ code, due, form, method, cfg, now = Date.now() }) {
  const common = {
    transaction_amount: due,
    description: `Reserva ${code} · 4let Homes`,
    external_reference: code,
    notification_url: `${cfg.publicBaseUrl}/api/webhook-mp`,
    statement_descriptor: cfg.statementDescriptor,
    metadata: { reservation: code },
    payer: payer(form.payer),
  };
  const isPix = method === 'bank_transfer' || form.payment_method_id === 'pix';
  if (isPix) {
    // Formato exigido pelo MP: horário de Brasília com fuso explícito, ex.: 2026-11-23T10:30:00.000-03:00
    const brt = new Date(now + cfg.pixExpirationMinutes * 60 * 1000 - 3 * 3600 * 1000);
    return { ...common, payment_method_id: 'pix', date_of_expiration: brt.toISOString().replace('Z', '-03:00') };
  }
  if (!form.token || !form.payment_method_id) throw new HttpError(400, 'invalid_card_data');
  const installments = Math.max(1, Math.trunc(Number(form.installments) || 1));
  if (installments > cfg.maxInstallments) throw new HttpError(400, 'too_many_installments');
  const body = { ...common, token: String(form.token), installments, payment_method_id: String(form.payment_method_id) };
  if (form.issuer_id) body.issuer_id = String(form.issuer_id);
  return body;
}

export default handler(['POST'], async (req, res) => {
  const cfg = env();
  const input = readJson(req);
  const code = reservationCode(input.code);
  const form = input.formData || {};
  const { due, state } = await payableReservation(code);
  if (state === 'paid') throw new HttpError(409, 'already_paid');
  if (state !== 'payable') throw new HttpError(409, 'reservation_unavailable');

  const body = buildPayment({ code, due, form, method: input.selectedPaymentMethod, cfg });
  const key = UUID_RE.test(input.attemptId || '') ? input.attemptId : crypto.randomUUID();
  const p = await mp.createPayment(body, key);

  // Cartão aprovado na hora: já confirma a reserva (o webhook faria o mesmo, sem duplicar).
  if (p.status === 'approved') {
    try { await confirmPayment(p.id, { payment: p }); } catch (e) { console.error('confirm-sync', p.id, e.message); }
  }
  send(res, 200, { id: String(p.id), status: p.status, statusDetail: p.status_detail });
});
