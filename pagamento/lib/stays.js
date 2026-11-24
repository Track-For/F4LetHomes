// Cliente da API Externa da Stays (https://stays.net/external-api/).
// Com MOCK_STAYS=1, usa reservas falsas em memória para testar sem as credenciais da Stays.

import { env } from './env.js';
import { HttpError } from './http.js';

async function call(method, path, body) {
  const cfg = env();
  if (!cfg.staysClientId || !cfg.staysClientSecret) {
    throw new HttpError(503, 'stays_not_configured', 'STAYS_CLIENT_ID/STAYS_CLIENT_SECRET ausentes');
  }
  const auth = Buffer.from(`${cfg.staysClientId}:${cfg.staysClientSecret}`).toString('base64');
  const r = await fetch(`${cfg.staysBaseUrl}/external/v1${path}`, {
    method,
    headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/json', Accept: 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (r.status === 404) return null;
  const text = await r.text();
  if (!r.ok) throw new HttpError(502, 'stays_error', `Stays ${method} ${path} -> ${r.status}`, text.slice(0, 500));
  return text ? JSON.parse(text) : {};
}

// ---------- modo de teste ----------
const mockDb = {
  reservations: {
    TESTE1: { _id: 'm1', id: 'TESTE1', type: 'reserved', checkInDate: '2026-12-23', checkOutDate: '2026-12-25', guests: 2, _idlisting: 'L1', price: { currency: 'BRL', _f_total: 933 }, stats: { _f_totalPaid: 0 } },
    TESTE2: { _id: 'm2', id: 'TESTE2', type: 'booked', checkInDate: '2027-01-10', checkOutDate: '2027-01-12', guests: 1, _idlisting: 'L1', price: { currency: 'BRL', _f_total: 500 }, stats: { _f_totalPaid: 500 } },
    TESTE3: { _id: 'm3', id: 'TESTE3', type: 'booked', checkInDate: '2027-02-01', checkOutDate: '2027-02-04', guests: 2, _idlisting: 'L1', partner: { _id: 'p1', name: 'API expedia' }, partnerCode: '2539590648', price: { currency: 'BRL', _f_total: 700 }, stats: { _f_totalPaid: 0 } },
  },
  payments: {},
  listings: { L1: { _id: 'L1', id: 'T1905VPN', _mstitle: { pt_BR: '4let Verano Ponta Negra (teste)', en_US: '4let Verano Ponta Negra (test)' } } },
};
let mockSeq = 0;

function mock(method, path, body) {
  const m = path.match(/^\/booking\/reservations\/([^/]+)(\/payments(?:\/([^/]+))?)?$/);
  const l = path.match(/^\/content\/listings\/([^/]+)$/);
  if (l) return mockDb.listings[l[1]] || null;
  if (!m) throw new Error(`mock: rota não simulada ${method} ${path}`);
  const res = mockDb.reservations[m[1]];
  if (!res) return null;
  const list = (mockDb.payments[res.id] ||= []);
  if (!m[2]) {
    if (method === 'GET') return structuredClone(res);
    if (method === 'PATCH') { Object.assign(res, body); return structuredClone(res); }
  }
  if (m[2] && !m[3]) {
    if (method === 'GET') return structuredClone(list);
    if (method === 'POST') {
      const p = { _id: `p${String(++mockSeq).padStart(6, '0')}`, ...body };
      list.push(p);
      res.stats._f_totalPaid += body._f_val;
      return structuredClone(p);
    }
  }
  if (m[3] && method === 'DELETE') {
    const i = list.findIndex((p) => p._id === m[3]);
    if (i >= 0) { res.stats._f_totalPaid -= list[i]._f_val; list.splice(i, 1); }
    return {};
  }
  throw new Error(`mock: rota não simulada ${method} ${path}`);
}

function api(method, path, body) {
  return env().mockStays ? Promise.resolve(mock(method, path, body)) : call(method, path, body);
}

// ---------- operações usadas pelo pagamento ----------
export const stays = {
  getReservation: (code) => api('GET', `/booking/reservations/${encodeURIComponent(code)}`),
  getListing: (id) => api('GET', `/content/listings/${encodeURIComponent(id)}`),
  listPayments: async (code) => (await api('GET', `/booking/reservations/${encodeURIComponent(code)}/payments`)) || [],
  addPayment: (code, payment) => api('POST', `/booking/reservations/${encodeURIComponent(code)}/payments`, payment),
  deletePayment: (code, paymentId) => api('DELETE', `/booking/reservations/${encodeURIComponent(code)}/payments/${encodeURIComponent(paymentId)}`),
  setType: (code, type) => api('PATCH', `/booking/reservations/${encodeURIComponent(code)}`, { type }),
  _mockDb: mockDb,
};

const round2 = (n) => Math.round(n * 100) / 100;

// Reservas de Airbnb, Booking, Expedia etc. são cobradas pelo próprio canal: não aceitam pagamento aqui.
// A documentação da Stays não diz qual campo traz o canal. No painel, a reserva da Expedia aparece como
// "RM02J - 2539590648 | API expedia": nome do parceiro em partner.name e código do canal em partnerCode.
// Reserva do site ou criada no painel não tem nenhum dos dois.
const OTA = /airbnb|booking|expedia|vrbo|homeaway|decolar|despegar|hotels\.com|google|marriott|housi|temporada ?livre|travelstaytion|triplar|goweasy|^api\b/i;

export function otherChannel(r) {
  const partner = String(r?.partner?.name || '').trim();
  const partnerCode = String(r?.partnerCode || '').trim();
  return { blocked: OTA.test(partner) || partnerCode !== '', partner, hasPartnerCode: partnerCode !== '' };
}

// Lê a reserva e decide se ela pode ser paga. O valor vem SEMPRE da Stays, nunca do navegador.
export async function payableReservation(code) {
  const r = await stays.getReservation(code);
  if (!r) throw new HttpError(404, 'reservation_not_found');
  const total = Number(r.price?._f_total) || 0;
  const paid = Number(r.stats?._f_totalPaid) || 0;
  const due = round2(total - paid);
  const channel = otherChannel(r);
  // Só o nome do canal e se há código do canal: nada de dados do hóspede no log.
  console.log('origem', r.id || code, JSON.stringify({ partner: channel.partner, partnerCode: channel.hasPartnerCode }));
  let state = 'payable';
  if (!['reserved', 'booked', 'contract'].includes(r.type)) state = 'unavailable';
  else if (channel.blocked) state = 'channel';
  else if (due <= 0) state = 'paid';
  return { reservation: r, total, paid, due, currency: r.price?.currency || 'BRL', state };
}

export function listingTitle(listing, lang) {
  const t = listing?._mstitle || {};
  const key = { pt: 'pt_BR', en: 'en_US', es: 'es_ES' }[lang] || 'pt_BR';
  return t[key] || t.pt_BR || t.en_US || Object.values(t)[0] || listing?.internalName || '';
}
