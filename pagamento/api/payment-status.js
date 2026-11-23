// Consulta do navegador enquanto o Pix não é pago. Se o pagamento já foi aprovado, confirma a reserva
// (serve de reserva caso o webhook atrase). Só responde se o pagamento for mesmo daquela reserva.
import { handler, send, reservationCode, HttpError } from '../lib/http.js';
import { mp } from '../lib/mp.js';
import { confirmPayment } from '../lib/confirm.js';

export default handler(['GET'], async (req, res) => {
  const code = reservationCode(req.query?.code);
  const id = String(req.query?.id || '');
  if (!/^\d{1,20}$/.test(id)) throw new HttpError(400, 'invalid_payment_id');
  const p = await mp.getPayment(id);
  if (String(p.external_reference || '').toUpperCase() !== code) throw new HttpError(404, 'payment_not_found');
  let confirmed = false;
  if (p.status === 'approved') {
    try { confirmed = (await confirmPayment(id, { payment: p })).recorded; } catch (e) { console.error('confirm-poll', id, e.message); }
  }
  send(res, 200, { id, status: p.status, statusDetail: p.status_detail, confirmed });
});
