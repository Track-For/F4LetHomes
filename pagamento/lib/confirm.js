// Confirma na Stays um pagamento aprovado no Mercado Pago.
// Pode ser chamado várias vezes para o mesmo pagamento (webhook, consulta do navegador, resposta do cartão):
// o resultado é sempre um único lançamento na reserva.

import { mp } from './mp.js';
import { stays } from './stays.js';
import { env } from './env.js';
import { todayBR } from './http.js';

const tag = (paymentId) => `MP ${paymentId}`;
const isOurs = (p, paymentId) => String(p?.name || '').includes(tag(paymentId)) || String(p?.desc || '').includes(tag(paymentId));

const round2 = (n) => Math.round(n * 100) / 100;
const brl = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

// Valor que o pagamento quita na reserva. No Pix com desconto, é maior que o valor pago
// (o servidor grava "settles" no metadata ao criar o pagamento; o navegador não consegue mudar isso).
function settlement(p) {
  const paid = Number(p.transaction_amount) || 0;
  const settles = Number(p.metadata?.settles);
  const discount = Number.isFinite(settles) && settles > paid && settles - paid <= settles * 0.5 ? round2(settles - paid) : 0;
  return { value: round2(paid + discount), discount };
}

function describe(p, discount) {
  const method = p.payment_method_id === 'pix' ? 'Pix' : `Cartão ${p.payment_method_id || ''}`.trim();
  const parc = p.installments > 1 ? ` em ${p.installments}x` : '';
  const desc = discount > 0 ? ` (pago ${brl(Number(p.transaction_amount))}, desconto de ${brl(discount)} somado à taxa)` : '';
  return `${method}${parc}${desc} · ${tag(p.id)}`;
}

export async function confirmPayment(paymentId, { payment } = {}) {
  const p = payment || (await mp.getPayment(paymentId));
  const code = String(p.external_reference || '').toUpperCase();
  const result = { paymentId: String(p.id), status: p.status, statusDetail: p.status_detail, reservation: code || null, recorded: false };
  if (p.status !== 'approved' || !code) return result;
  if (p.currency_id && p.currency_id !== 'BRL') {
    console.error('moeda inesperada', p.id, p.currency_id);
    return result;
  }

  const existing = (await stays.listPayments(code)).filter((x) => isOurs(x, p.id));
  if (existing.length === 0) {
    const { value, discount } = settlement(p);
    const fee = (p.fee_details || []).reduce((s, f) => s + (Number(f.amount) || 0), 0) + discount;
    const day = todayBR();
    const body = {
      type: 'credit',
      status: 'completed',
      _f_val: value,
      expirationDate: day,
      paymentDate: day,
      competenceDate: day,
      name: `Mercado Pago · ${tag(p.id)}`,
      desc: describe(p, discount),
      // sem "readonly": a limpeza de duplicados abaixo precisa poder apagar via API
    };
    if (fee > 0) body._f_fee = Math.round(fee * 100) / 100;
    const provider = env().staysPaymentProviderId;
    if (provider) body._idpaymentProvider = provider;
    await stays.addPayment(code, body);
  }

  // Duas confirmações simultâneas podem lançar duas vezes: todas mantêm o lançamento de menor _id e apagam o resto.
  const after = (await stays.listPayments(code)).filter((x) => isOurs(x, p.id)).sort((a, b) => String(a._id).localeCompare(String(b._id)));
  for (const dup of after.slice(1)) await stays.deletePayment(code, dup._id);
  result.recorded = after.length > 0;

  const r = await stays.getReservation(code);
  if (r && r.type === 'reserved') await stays.setType(code, 'booked');
  return result;
}
