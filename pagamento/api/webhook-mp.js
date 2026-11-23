// Notificações do Mercado Pago (Webhooks, evento "Pagamentos").
// Nunca confia no conteúdo da notificação: reconsulta o pagamento no MP antes de agir.
import { env } from '../lib/env.js';
import { send, readJson } from '../lib/http.js';
import { validWebhookSignature } from '../lib/mp.js';
import { confirmPayment } from '../lib/confirm.js';

export default async function webhook(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'method_not_allowed' });
  const body = readJson(req);
  const q = req.query || {};
  const type = body.type || body.topic || q.type || q.topic;
  const dataId = String(q['data.id'] || body?.data?.id || q.id || '');

  const secret = env().mpWebhookSecret;
  if (secret) {
    const ok = validWebhookSignature({
      signature: req.headers['x-signature'],
      requestId: req.headers['x-request-id'],
      dataId: q['data.id'] || body?.data?.id,
      secret,
    });
    if (!ok) return send(res, 401, { error: 'invalid_signature' });
  }

  if (type !== 'payment' || !/^\d{1,20}$/.test(dataId)) return send(res, 200, { ignored: true });

  try {
    const result = await confirmPayment(dataId);
    return send(res, 200, { ok: true, status: result.status, recorded: result.recorded });
  } catch (e) {
    // 500 faz o Mercado Pago reenviar a notificação mais tarde.
    console.error('webhook', dataId, e.message, e.details || '');
    return send(res, 500, { error: 'retry' });
  }
}
