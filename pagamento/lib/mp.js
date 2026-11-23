// Cliente mínimo da API de pagamentos do Mercado Pago. O Access Token só existe aqui, no servidor.

import crypto from 'node:crypto';
import { env } from './env.js';
import { HttpError } from './http.js';

const BASE = 'https://api.mercadopago.com';

async function call(method, path, body, extraHeaders = {}) {
  const { mpAccessToken } = env();
  if (!mpAccessToken) throw new HttpError(503, 'mp_not_configured', 'MP_ACCESS_TOKEN ausente');
  const r = await fetch(`${BASE}${path}`, {
    method,
    headers: { Authorization: `Bearer ${mpAccessToken}`, 'Content-Type': 'application/json', ...extraHeaders },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await r.text();
  const data = text ? JSON.parse(text) : {};
  if (!r.ok) {
    // 4xx do MP em criação de pagamento = dados recusados (cartão inválido etc.), não falha nossa.
    const status = r.status >= 400 && r.status < 500 ? 422 : 502;
    throw new HttpError(status, 'mp_error', `MP ${method} ${path} -> ${r.status}`, text.slice(0, 500));
  }
  return data;
}

export const mp = {
  createPayment: (payload, idempotencyKey) =>
    call('POST', '/v1/payments', payload, { 'X-Idempotency-Key': idempotencyKey || crypto.randomUUID() }),
  getPayment: (id) => call('GET', `/v1/payments/${encodeURIComponent(id)}`),
};

// Confere a assinatura x-signature dos webhooks do Mercado Pago.
// Manifesto: id:<data.id>;request-id:<x-request-id>;ts:<ts>;  -> HMAC-SHA256 com a "assinatura secreta".
// Sem limite de idade por padrão: um reenvio antigo é inofensivo, porque o webhook sempre
// reconsulta o pagamento no MP antes de agir.
export function validWebhookSignature({ signature, requestId, dataId, secret, toleranceSec = Infinity, now = Date.now() }) {
  if (!signature || !secret) return false;
  const parts = Object.fromEntries(
    String(signature).split(',').map((kv) => kv.split('=').map((s) => s.trim())).filter((p) => p.length === 2),
  );
  const { ts, v1 } = parts;
  if (!ts || !v1) return false;
  const tsMs = Number(ts) > 1e12 ? Number(ts) : Number(ts) * 1000;
  if (!Number.isFinite(tsMs) || Math.abs(now - tsMs) > toleranceSec * 1000) return false;
  let manifest = '';
  if (dataId) manifest += `id:${/^[a-z0-9]+$/i.test(dataId) ? String(dataId).toLowerCase() : dataId};`;
  if (requestId) manifest += `request-id:${requestId};`;
  manifest += `ts:${ts};`;
  const expected = crypto.createHmac('sha256', secret).update(manifest).digest('hex');
  const a = Buffer.from(expected);
  const b = Buffer.from(String(v1));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
