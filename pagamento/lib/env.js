// Configuração lida das variáveis de ambiente da Vercel. Nenhum segredo fica no código.

function num(name, fallback) {
  const v = Number(process.env[name]);
  return Number.isFinite(v) && v > 0 ? v : fallback;
}

export function env() {
  return {
    mpAccessToken: process.env.MP_ACCESS_TOKEN || '',
    mpPublicKey: process.env.MP_PUBLIC_KEY || '',
    mpWebhookSecret: process.env.MP_WEBHOOK_SECRET || '',
    staysBaseUrl: (process.env.STAYS_BASE_URL || 'https://fletho.stays.net').replace(/\/+$/, ''),
    staysClientId: process.env.STAYS_CLIENT_ID || '',
    staysClientSecret: process.env.STAYS_CLIENT_SECRET || '',
    staysPaymentProviderId: process.env.STAYS_PAYMENT_PROVIDER_ID || '',
    publicBaseUrl: (process.env.PUBLIC_BASE_URL || 'https://pagamento.f4let.com').replace(/\/+$/, ''),
    siteUrl: (process.env.SITE_URL || 'https://www.f4let.com').replace(/\/+$/, ''),
    maxInstallments: Math.min(num('MAX_INSTALLMENTS', 3), 12),
    pixExpirationMinutes: num('PIX_EXPIRATION_MINUTES', 30),
    statementDescriptor: (process.env.STATEMENT_DESCRIPTOR || '4LETHOMES').slice(0, 13),
    mockStays: process.env.MOCK_STAYS === '1',
  };
}
