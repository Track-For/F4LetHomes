// ROTA TEMPORÁRIA (24/11/2026): ler/gravar o contrato de proprietário de um anúncio pela API da Stays,
// porque a tela de Contrato do painel abre em branco. Protegida por token (só o hash fica aqui). APAGAR após o uso.
import crypto from 'node:crypto';
import { env } from '../lib/env.js';

const TOKEN_SHA256 = '932507b4c77710ea8b41bf3859542f1288bd4ffdcc631e58f2e1b2003035b122';
const ALLOWED = [
  /^\/settings\/listing\/[A-Za-z0-9]{4,32}\/owner-contract$/,
  /^\/content\/listings\/[A-Za-z0-9]{4,32}$/,
  /^\/finance\/owners(\/[A-Za-z0-9]{4,32})?$/,
];

export default async function handler(req, res) {
  const tok = String(req.headers['x-tmp-token'] || '');
  const h = crypto.createHash('sha256').update(tok).digest('hex');
  if (tok.length < 20 || !crypto.timingSafeEqual(Buffer.from(h), Buffer.from(TOKEN_SHA256))) {
    res.statusCode = 404; return res.end('not found');
  }
  const path = String(req.query?.path || '');
  const method = req.method === 'PATCH' ? 'PATCH' : 'GET';
  if (!ALLOWED.some((r) => r.test(path))) { res.statusCode = 400; return res.end('path not allowed'); }
  const cfg = env();
  const auth = Buffer.from(`${cfg.staysClientId}:${cfg.staysClientSecret}`).toString('base64');
  const r = await fetch(`${cfg.staysBaseUrl}/external/v1${path}`, {
    method,
    headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/json', Accept: 'application/json' },
    body: method === 'PATCH' ? JSON.stringify(req.body || {}) : undefined,
  });
  const text = await r.text();
  res.statusCode = r.status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(text);
}
