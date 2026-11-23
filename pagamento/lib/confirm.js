// Confirma na Stays um pagamento aprovado no Mercado Pago.
// Pode ser chamado várias vezes para o mesmo pagamento (webhook, consulta do navegador, resposta do cartão):
// o resultado é sempre um único lançamento na reserva.

import { mp } from './mp.js';
import { stays } from './stays.js';
import { env } from './env.js';
import { todayBR } from './http.js';

const tag = (paymentId) => `MP ${paymentId}`;
const isOurs = (p, paymentId) => String(p?.name || '').includes(tag(paymentId)) || String(p?.desc || '').includes(tag(paymentId));

function describe(p) {
  const method = p.payment_method_id === 'pix' ? 'Pix' : `Cartão ${p.payment_method_id || ''}`.trim();
  const parc = p.installments > 1 ? ` em ${p.installments}x` : '';
  return `${method}${parc} · ${tag(p.id)}`;
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
    const fee = (p.fee_details || []).reduce((s, f) => s + (Number(f.amount) || 0), 0);
    const day = todayBR();
    const body = {
      type: 'credit',
      status: 'completed',
      _f_val: Number(p.transaction_amount),
      expirationDate: day,
      paymentDate: day,
      competenceDate: day,
      name: `Mercado Pago · ${tag(p.id)}`,
      desc: describe(p),
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
