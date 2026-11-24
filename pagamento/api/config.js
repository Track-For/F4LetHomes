// Configuração pública para a página: só a Public Key (feita para ficar no navegador) e as regras de parcelamento.
import { env } from '../lib/env.js';
import { handler, send, HttpError } from '../lib/http.js';

export default handler(['GET'], async (req, res) => {
  const cfg = env();
  if (!cfg.mpPublicKey) throw new HttpError(503, 'mp_not_configured');
  send(res, 200, {
    publicKey: cfg.mpPublicKey,
    maxInstallments: cfg.maxInstallments,
    pixDiscountPercent: cfg.pixDiscountPercent,
    siteUrl: cfg.siteUrl,
    testMode: cfg.mockStays || cfg.mpPublicKey.startsWith('TEST-'),
  });
});
