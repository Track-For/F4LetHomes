// Resumo da reserva para a página de pagamento. Não expõe dados pessoais do hóspede:
// só acomodação, datas, número de hóspedes e o valor em aberto.
import { handler, send, reservationCode } from '../lib/http.js';
import { payableReservation, stays, listingTitle } from '../lib/stays.js';

export default handler(['GET'], async (req, res) => {
  const code = reservationCode(req.query?.code);
  const lang = ['pt', 'en', 'es'].includes(req.query?.lang) ? req.query.lang : 'pt';
  const { reservation: r, total, paid, due, currency, state } = await payableReservation(code);
  let listing = '';
  try {
    listing = r._idlisting ? listingTitle(await stays.getListing(r._idlisting), lang) : '';
  } catch (e) {
    console.error('listing', code, e.message);
  }
  send(res, 200, {
    code,
    state, // payable | paid | unavailable | channel
    listing,
    checkIn: r.checkInDate,
    checkOut: r.checkOutDate,
    guests: r.guests,
    currency,
    total,
    paid,
    due,
  });
});
