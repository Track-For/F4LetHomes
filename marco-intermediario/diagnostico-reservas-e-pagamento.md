# 4Let Homes | Diagnóstico de reservas e pagamento

**Track For · 18 de novembro de 2026**

## Resumo

Testei 13 acomodações do site da 4Let Homes em dois períodos. Encontrei **três anúncios que exibem uma cotação, mas encaminham o hóspede para um formulário de contato**. Confirmei na Stays que a reserva instantânea está desativada na configuração individual dos três.

O segundo problema, **checkout sem meios de pagamento**, continua em investigação. O Mercado Pago consta como ativo na Stays. No teste público, o fluxo chegou à identificação por e-mail, antes da etapa em que o hóspede escolhe como pagar.

## 1. Acomodações que encaminham para contato

Foram consultados os períodos de **1 a 4 de dezembro** e **8 a 10 de dezembro de 2026**, para **dois hóspedes**. No cenário de 8 a 10 de dezembro, os três anúncios abaixo exibiram preço e total para duas noites. O botão **Enviar pedido** abriu o formulário de contato da Stays.

| Acomodação | Código | Total exibido para duas noites |
|---|---|---:|
| Colina Flamboyant Duplo T8404 | WX01I | R$ 742,00 |
| Colina Flamboyant Triplo T8403 | HZ01J | R$ 923,00 |
| Chalés Sonho de Verão T1303 | ZJ04I | R$ 1.479,00 |

### Causa confirmada nos três anúncios

Em **Acomodações → Distribuição → Configurações sobre reservas**, a reserva instantânea está definida como **Individual → Não** nos três anúncios **WX01I**, **HZ01J** e **ZJ04I**. A regra corresponde ao botão **Enviar pedido** observado nas cotações. O botão abriu o formulário de contato. O destinatário e o recebimento da mensagem não foram testados.

Outros casos ajudaram a distinguir o problema. A **Colina Family**, o **Chalé T1301** e o **Residencial Santo Antônio** exibiram **Reserve já**. O **Del Rey**, o **Verano Ponta Negra** e a **Pedra Baleia Single** exibiram mensagem de indisponibilidade nas datas checadas. Nessa situação, o e-mail funciona como alternativa de contato.

### Correção e critério de aceite

Com a aprovação da operação, conferir a regra individual dos três anúncios e habilitar a reserva instantânea nos que devem aceitar reservas diretas. A configuração pode afetar outros canais conectados, por isso a decisão deve considerar o fluxo de aprovação dos proprietários e os canais ativos de cada imóvel.

Repetir a cotação com as mesmas datas e o mesmo número de hóspedes. O aceite exige que a página exiba **Reserve já** e que o botão abra a identificação do hóspede com a unidade, as datas e o preço corretos.

[Configuração de reservas no WX01I](https://fletho.stays.net/i/apartment/WX01I/reservation-settings) · [Fluxo de reserva direta na Stays](https://academy.stays.net/pt-BR/support/solutions/articles/36000053153-como-os-hospedes-fazem-reservas-via-site/)

## 2. Checkout sem opção de pagamento

O **Mercado Pago** aparece como ativo no painel. No **Chalés Sonho de Verão T1301**, o botão **Reserve já** abriu a identificação por e-mail. Como o teste parou nessa etapa, a exibição de cartão, Pix ou outros meios para aquela cotação segue sem confirmação. Na revalidação do App Center, o recurso [Canais de pagamento por anúncio](https://fletho.stays.net/i/appcenter/all/5fd72fa661c121537d898594) aparece **Desativado**. A próxima comparação deve começar pela configuração geral de checkout e pela elegibilidade do provedor para cada cotação.

### Como localizar a causa

1. Avançar com um e-mail de teste autorizado em uma cotação que oferece **Reserve já**. Registrar quais meios de pagamento aparecem e em qual etapa.
2. Repetir em outro imóvel reservável, com as mesmas datas e hóspedes, e comparar os meios exibidos.
3. Se a ausência ocorrer em todos os testes, conferir a visibilidade do canal no checkout, a moeda aceita e a configuração do provedor antes de alterar qualquer regra.
4. Após identificar e corrigir a causa, repetir o cenário afetado e o cenário de comparação. O aceite deste teste é visualizar os meios elegíveis na tela de pagamento. A confirmação de uma transação exige um cenário de homologação autorizado.

[Configuração de pagamentos por acomodação na Stays](https://academy.stays.net/pt-BR/support/solutions/articles/36000295984-como-personalizar-os-canais-de-pagamento-por-acomodacao/)

## Situação atual

**Encaminhamento para contato:** reproduzido em três anúncios, com a configuração responsável confirmada nos três.

**Checkout sem pagamento:** pendente de reprodução após a identificação por e-mail.

Nenhuma configuração de reservas ou pagamentos foi alterada nesta rodada.

## Atualização de 19/11/2026, 13h: causa provável do checkout

Li a configuração de pagamento que a Stays entrega na página pública de reserva (`/customer/pt/booking?id=ZJ01I&from=2026-12-08&to=2026-12-10&persons=2`; o mesmo vale para PK03J e VA05I). Nenhuma configuração foi alterada.

- **Mercado Pago com credenciais de TESTE.** A chave pública e o access token começam com `TEST-`. Esse é o modo sandbox do Mercado Pago: cartões reais são recusados e nenhuma cobrança real acontece. É a causa mais provável de o checkout "não ter pagamento".
- **Só cartão de crédito configurado.** O único método é `credit_card` (8 bandeiras, até 3x, acréscimo de 4,98% no total). **Pix não está na lista de métodos**, embora apareça o prazo do Pix (59 min) e o ícone no rodapé. Boleto também não.
- **`_i_hideOption: 1` no cartão.** Pode esconder a opção na tela. Confirmar na Stays o que esse campo faz.
- **Risco de segurança.** O access token (campo `signature`) aparece no HTML público. Com credencial de teste o dano é pequeno. Se a credencial de produção for colocada no mesmo lugar e a Stays continuar expondo o campo, o token de produção fica público. Antes de trocar, confirmar com o suporte da Stays (sac@stays.net) que o access token não vai para o navegador.

### Correção (depende do titular da conta Mercado Pago)
1. No Mercado Pago (Suas integrações → aplicação → Credenciais de produção), copiar a Public Key e o Access Token de produção (`APP_USR-…`).
2. Na Stays (App Center → Mercado Pago), trocar as credenciais `TEST-` pelas de produção.
3. Ativar Pix (e boleto, se quiser) como método do canal. Revisar o acréscimo de 4,98% e o `hideOption`.
4. Aceite: no ZJ01I com 08–10/12, chegar à tela de pagamento e ver cartão e Pix. Gerar um Pix de valor real e cancelar a reserva, ou fazer um pagamento pequeno com estorno, com autorização.

## Atualização de 19/11/2026, tarde: configuração lida no painel

Lido em App Center → Mercado Pago → canal "Mercado Pago". Nada foi alterado e as credenciais não foram copiadas (só o prefixo foi conferido).

| Item | Valor atual |
|---|---|
| Chave pública e token de acesso | Começam com `TEST-` (sandbox) |
| Redirecionar para o ambiente do Mercado Pago | **Sim**. Explica o `_i_hideOption=1`: o formulário de cartão some do site e o pagamento acontece no Mercado Pago |
| Formas de pagamento | Só cartão de crédito (8 bandeiras). O painel não oferece Pix nem boleto neste canal |
| Tokenização de cartão | **Sim**: a cobrança não é automática, alguém precisa cobrar manualmente |
| Parcelas | Até 3x |
| Acréscimo | 4,98% sobre o total da hospedagem (era 2,99% em 03/08/2026) |
| Last minute | 1 dia |
| Visível no checkout | Sim. Título só em PT ("Formas de pagamento") |
| Canais de pagamento por anúncio | App desativado |
| Stone (Pagar.me V5) | App ativo, sem nenhum canal criado |

No site, o ZJ01I (08–10/12, 2 hóspedes, R$ 880,00) chega a "Qual é o seu e-mail?". A tela de pagamento ainda não foi vista: falta o e-mail de teste. O PK03J não foi testado.

Correções propostas, todas aguardando aprovação: credenciais de produção (coladas pelo titular), tokenização = Não, decisão sobre o acréscimo, Pix/boleto pela conta MP ou por um canal Stone, título e descrição em EN/ES.
