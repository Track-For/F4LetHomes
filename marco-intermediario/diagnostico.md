# 4Let Homes | Diagnóstico do marco intermediário

Verificação em 18/11/2026 no site público e no editor da Stays.

| Fluxo | Evidência | Situação |
|---|---|---|
| Navegação para Acomodações | O menu público abre `/pt/search?from=2026-08-01&to=2026-08-31&persons=1`. O mesmo endereço consta em Acomodações no menu superior do editor da Stays. | Falha reproduzida. A configuração do menu é a origem observada. |
| Listagem sem datas fixas | `/pt/search` abriu o catálogo com três resultados agrupados por empreendimento. | Alternativa validada para navegação. O protótipo já usa essa rota. |
| Busca com datas e hóspedes | Uma consulta de 08 a 10/12/2026, para dois hóspedes, abriu a página dos Chalés Sonho de Verão e preservou datas e hóspedes na URL. | Encaminhamento observado em um cenário. Falta comparar disponibilidade e tarifas com três referências do cliente e validar o filtro de destino. |
| Login | O modal público abriu e mostrou opções de código por e-mail e acesso por senha. | Abertura validada. Autenticação e recuperação completas pendentes de conta de teste autorizada. |
| Checkout | A consulta futura chegou à página de empreendimento. | Confirmação e meios de pagamento ainda pendentes de teste em cenário autorizado. |
| Configuração tarifária | O painel da Stays exibiu o indicador “Preços Incompletos” com valor 31. | A origem e o impacto desse indicador na busca precisam ser verificados por imóvel e período. |

## Inventário e reaproveitamento

- O site público tem página inicial, busca, detalhes de imóveis, páginas de empreendimentos, contato, Sobre nós e favoritos.
- O editor da Stays oferece menus, páginas, hotsites e edição de HTML de cabeçalho e rodapé. A listagem e os links oficiais de imóveis já operam no domínio do cliente e foram reaproveitados no protótipo. O código-fonte do desenvolvimento anterior não estava disponível no diretório de trabalho.
- O primeiro protótipo demonstra navegação sem datas fixas, busca com datas escolhidas e validação local da ordem das datas. O site público ainda tem a configuração anterior.

## Para demonstrar e pedir aprovação

Abra o protótipo, mostre o link antigo e depois a listagem sem datas fixas. Demonstre uma busca futura e registre a disponibilidade comparada com três referências do cliente. Confirme permissão e ambiente de teste para autenticação, recuperação e checkout. Registre por escrito qualquer limitação essencial de terceiros e, após apresentar o avanço funcional, peça a aprovação da continuidade. A parcela de R$ 600 está vinculada à entrega e à aprovação escrita desse marco.
