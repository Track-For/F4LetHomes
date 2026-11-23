export class HttpError extends Error {
  constructor(status, code, message, details) {
    super(message || code);
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

// Envolve um handler: trata erros sem vazar detalhes internos ao navegador.
export function handler(methods, fn) {
  return async (req, res) => {
    if (!methods.includes(req.method)) {
      res.setHeader('Allow', methods.join(', '));
      return send(res, 405, { error: 'method_not_allowed' });
    }
    try {
      await fn(req, res);
    } catch (err) {
      if (err instanceof HttpError) {
        if (err.status >= 500) console.error(err.code, err.message, err.details || '');
        return send(res, err.status, { error: err.code });
      }
      console.error('unexpected', err);
      return send(res, 500, { error: 'internal_error' });
    }
  };
}

export function readJson(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string' && req.body) {
    try { return JSON.parse(req.body); } catch { throw new HttpError(400, 'invalid_json'); }
  }
  return {};
}

const CODE_RE = /^[A-Za-z0-9]{4,16}$/;
export function reservationCode(value) {
  const code = String(value || '').trim();
  if (!CODE_RE.test(code)) throw new HttpError(400, 'invalid_reservation_code');
  return code.toUpperCase();
}

export function todayBR() {
  // Data no fuso de Brasília (UTC-3, sem horário de verão desde 2019).
  return new Date(Date.now() - 3 * 3600 * 1000).toISOString().slice(0, 10);
}
