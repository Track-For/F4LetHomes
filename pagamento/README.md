# Pagamento 4let Homes: checkout transparente (cartão e Pix)

Página própria de pagamento das reservas do site: `https://pagamento.f4let.com/r/<código da reserva>`.
O hóspede reserva na Stays, cai nesta página, paga com cartão (até 3x) ou Pix pelo **Payment Brick** do
Mercado Pago, e a reserva é marcada como paga e confirmada na Stays automaticamente.

O Access Token do Mercado Pago e as credenciais da Stays ficam **só nas variáveis de ambiente da Vercel**.
Nada sensível vai para o navegador nem para o git.

## Como funciona

```
Site (Stays) ── reserva sem canal de pagamento ──► /customer/pt/reservation/HW04G/confirmation
      │  (script no head_section)
      ▼
pagamento.f4let.com/r/HW04G
      │ GET /api/reservation  → lê a reserva na Stays (valor em aberto = total − já pago)
      │ Payment Brick (cartão / Pix)
      │ POST /api/process-payment → cria o pagamento no MP com o valor da Stays
      ▼
Mercado Pago ── webhook ──► POST /api/webhook-mp
                              │ reconsulta o pagamento no MP
                              │ aprovado → lança o pagamento na reserva (Stays)
                              └ reserva "reserved" → "booked"
```

- O valor cobrado vem **sempre** da Stays. O valor enviado pelo navegador é ignorado.
- A confirmação acontece por três caminhos (resposta do cartão, webhook e consulta do navegador durante o Pix)
  e nunca duplica: cada pagamento do MP gera um único lançamento na reserva (`name` contém `MP <id>`).
- A página não mostra nome, e-mail ou documento do hóspede, só acomodação, datas, hóspedes e valor.

## Arquivos

| Caminho | O que é |
|---|---|
| `public/` | Página (HTML, CSS, JS) com o visual do site, PT/EN/ES (`?lang=en`) |
| `api/config.js` | Public Key e número de parcelas para a página |
| `api/reservation.js` | Resumo da reserva |
| `api/process-payment.js` | Cria o pagamento no Mercado Pago |
| `api/payment-status.js` | Consulta do navegador enquanto o Pix não é pago |
| `api/webhook-mp.js` | Notificações do Mercado Pago |
| `lib/` | Clientes da Stays e do MP, confirmação sem duplicar |
| `integracao-stays/head_section-pagamento.html` | Script que leva o hóspede da Stays para a página |
| `test/` | Testes automatizados (`npm test`) |
| `scripts/dev.mjs` | Servidor local (`node scripts/dev.mjs`) |

## Implantação, passo a passo

### 1. Publicar na Vercel (uma vez)
Na pasta `pagamento/`:
```bash
npx vercel link        # escolher a conta (Track For ou 4Let) e criar o projeto "pagamento-4let"
npx vercel deploy --prod
```

### 2. Domínio `pagamento.f4let.com`
1. Vercel → projeto → Settings → Domains → adicionar `pagamento.f4let.com`.
2. GoDaddy → DNS de f4let.com → novo registro **CNAME**, nome `pagamento`, valor `cname.vercel-dns.com`.
   Não mexa nos outros registros (backup em `etapa-final/dns-godaddy-backup-2026-11-22.md`).

### 3. Variáveis de ambiente (Vercel → Settings → Environment Variables, ambiente Production)
Lista completa em `.env.example`. As obrigatórias:

| Variável | De onde vem |
|---|---|
| `MP_PUBLIC_KEY` | Mercado Pago → app VLC-F4LET → Credenciais de produção → Public Key |
| `MP_ACCESS_TOKEN` | Mesma tela → Access Token |
| `MP_WEBHOOK_SECRET` | Passo 4 (assinatura secreta do webhook) |
| `STAYS_CLIENT_ID`, `STAYS_CLIENT_SECRET` | Suporte da Stays, ao ativar a API Externa |

Depois de salvar as variáveis, rode `npx vercel deploy --prod` de novo (ou "Redeploy" no painel).

### 4. Webhook do Mercado Pago
Mercado Pago → Suas integrações → VLC-F4LET → **Webhooks** → Configurar notificações:
- URL de produção: `https://pagamento.f4let.com/api/webhook-mp`
- Evento: **Pagamentos**
- Salvar, copiar a **assinatura secreta** e colar em `MP_WEBHOOK_SECRET` (passo 3).

### 5. Stays
1. O canal Mercado Pago da Stays deve continuar **Não conectado** (já está, desde 22/11/2026).
2. Configurar na Stays o prazo de expiração das pré-reservas não pagas (para liberar o calendário).
3. Instalar `integracao-stays/head_section-pagamento.html` no fim do head_section
   (Editor do site → Editar HTML → head_section). **Só depois do passo 6 dar certo.**

### 6. Teste antes de abrir para os hóspedes
1. Com credenciais **de teste** do MP (`TEST-...`) e `MOCK_STAYS=1`, abrir `/r/TESTE1`, pagar com um
   [cartão de teste](https://www.mercadopago.com.br/developers/pt/docs/checkout-bricks/additional-content/your-integrations/test/cards)
   e com Pix. Conferir que a página mostra "Reserva confirmada".
2. Com as credenciais reais da Stays (`MOCK_STAYS=0`), fazer uma reserva de verdade no site, pagar um valor
   baixo e conferir na Stays: pagamento lançado na reserva e reserva confirmada. Estornar no MP depois.
3. Instalar o script do head_section (passo 5.3).

## A confirmar no primeiro teste real
- Se a reserva feita no site sem canal de pagamento nasce como `reserved` (pré-reserva) e se a Stays
  redireciona para `/customer/<idioma>/reservation/<código>/confirmation`. Visto no código da Stays, não testado.
- Se o lançamento `type: "credit"` aparece na Stays como pagamento recebido do hóspede.
- Se a Stays aceita mudar `type` de `reserved` para `booked` via `PATCH`, como diz a documentação.
- Filtro de canal (`otherChannel` em `lib/stays.js`): reservas com `partner.name` de OTA ou com `partnerCode`
  aparecem como `channel` e não aceitam pagamento. A documentação da Stays não diz qual campo traz o canal; o log
  `origem` de cada reserva consultada mostra o que veio. Conferir que uma reserva do site e uma criada no painel
  saem sem `partnerCode`.

## Teste local
```bash
cp .env.example .env.local     # preencher; para testar sem Stays, MOCK_STAYS=1
node scripts/dev.mjs           # http://localhost:3000/r/TESTE1
npm test                       # testes automatizados (simulam Stays e MP)
```
