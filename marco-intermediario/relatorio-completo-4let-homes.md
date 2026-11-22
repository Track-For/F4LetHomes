# 4Let Homes | Relatório completo do marco intermediário

**Track For · Auditoria de 18 e 19 de novembro de 2026**

## Correção de Cerro Corá em produção

Em 19/11, após autorização, o agrupamento Colina Flamboyant (VA06I) foi conectado no nível da propriedade no canal Site. O painel passou a exibir Conectado. O clique no card Cerro Corá na home abriu a página pública e exibiu cinco fichas: VA05I, WX01I, HZ01J, WU01I e YM01I. A diferença entre as 13 unidades do cadastro geral e as cinco do canal Site ainda requer revisão individual. As referências ao 404 de VA06I abaixo registram o cenário anterior à correção.

[Página pública de Cerro Corá](https://www.f4let.com/pt/building/VA06I) · [Canal Site](https://fletho.stays.net/i/chmanager/website/apartments/0)

## Cabo Frio na home

O card de Cabo Frio aponta para /pt/, a própria home. Nenhum dos seis agrupamentos do canal Site ou dos 12 locais exibidos no cadastro geral (seis ativos e seis rascunhos) fica em Cabo Frio. O card pode ser retirado até haver uma acomodação publicada ou receber um endereço oficial da operação.

[Home](https://www.f4let.com/pt/) · [Cadastro geral](https://fletho.stays.net/i/buildings/0)

## Revalidação de 19 de novembro

- **Publicado e conferido no site.** O título do navegador das três páginas em português foi atualizado para “Termos e Condições | 4Let Homes”, “Política de Privacidade | 4Let Homes” e “Política de Cancelamento | 4Let Homes”. O título da página de Privacidade também recebeu a acentuação correta no editor. A política de cancelamento já exibe a grafia “Consumidor”, corrigida na rodada anterior. As condições comerciais dessas páginas aguardam validação da operação.
- **Erros reproduzidos.** VA06I e PK01J retornaram 404. O catálogo sem datas continua exibindo três resultados e um espaço em branco na contagem de noites.
- **Preços.** O contador de Preços Incompletos passou de 31 para 39. A lista expandida ainda mostra os mesmos 12 anúncios, com as mesmas datas de início e limites finais exibidos em 19/11/2027 ou 19/05/2028. O contador e a lista têm granularidade diferente. O calendário deve confirmar a última noite afetada em cada intervalo antes da correção.

[Termos](https://www.f4let.com/pt/terms-and-conditions) · [Privacidade](https://www.f4let.com/pt/politica-de-privacidade) · [Cancelamento](https://www.f4let.com/pt/page/6a76bb54693dd40759d57741) · [Central de Validação](https://fletho.stays.net/i/validation_screen/price-errors)

## Resumo executivo

A auditoria cobriu as **22 URLs do sitemap público**, os **12 links de unidades da home** e rotas adicionais de busca, favoritos e solicitação de reserva. A revalidação cruzou o comportamento público com o editor do site, o cadastro de acomodações, o canal Site e a Central de Validação da Stays. Os testes de reserva cobriram **13 acomodações em dois períodos**, sempre para dois hóspedes.

| Frente | Resultado |
|---|---|
| Menu Acomodações | **Corrigido em produção.** O item levava a agosto de 2026. Agora abre o catálogo sem datas fixas. |
| Reservas encaminhadas para contato | **Reproduzido em três anúncios.** WX01I, HZ01J e ZJ04I têm reserva instantânea desativada nas regras individuais da Stays. |
| Checkout sem pagamento | **Ainda sem reprodução.** O Mercado Pago aparece ativo no painel. O teste público chegou à identificação por e-mail. |
| Cerro Corá | **Causa localizada na Stays.** O agrupamento VA06I está ativo no cadastro geral e desconectado no canal Site. As cinco páginas individuais verificadas abrem. |
| Tarifas e canais externos | **Pendências registradas.** A Central mostrou 12 anúncios com períodos sem diária, duas lacunas curtas no calendário e avisos de Airbnb, Decolar e Expedia. |
| Marco intermediário | Diagnóstico e protótipo preparados. A aprovação escrita da continuidade ainda está pendente. |

## Correção aplicada e verificada

No **Editor do site → Menus → Menu Asuperior padrão → Acomodações**, o item do tipo Link apontava para `/pt/search?from=2026-08-01&to=2026-08-31&persons=1`. Troquei o endereço para `https://www.f4let.com/pt/search`, mantendo o nome do item. Após salvar o item e o menu, a Stays exibiu “Menu salvo com sucesso”. Abri a home pública, conferi a nova URL do item e cliquei nela. O catálogo abriu sem datas fixas. O texto incompleto da contagem de noites ainda aparece no catálogo sem período.

[Home pública](https://www.f4let.com/) · [Catálogo](https://www.f4let.com/pt/search)

## Auditoria do site público

### Página inicial

**O que funciona.** A home apresenta busca por datas, hóspedes, cidade e quartos, com abas separadas para busca por código e consulta de reserva. Os cards de destaque dão acesso aos detalhes de unidades. O título do navegador identifica a marca e a hospedagem por temporada.

**O que corrigir.** O menu global de acomodações carregava datas vencidas. Esse endereço foi corrigido e verificado em produção. Os cards de Cabo Frio e Cerro Corá têm destinos incorretos. No destaque do Del Rey, a divergência de quartos afeta a escolha do hóspede antes mesmo de abrir o imóvel. Os links de localidades e os ícones de favoritos e WhatsApp merecem nomes que expliquem a ação a quem navega com leitor de tela.

**Teste após o ajuste.** Abrir cada destino pelo card, conferir o nome e o inventário no destino e voltar à home preservando uma navegação previsível. Conferir título, data, hóspedes e cidade antes de acionar a busca. Validar os três caminhos da home separadamente.

[Home](https://f4let.com/pt/)

### Listagem e resultados

| Consulta | Resultado observado |
|---|---|
| Menu Acomodações, com 01 a 31/08/2026 para uma pessoa | A URL manteve o período antigo. A página exibiu três resultados agrupados e o cabeçalho “( noites)” sem contagem. |
| Listagem neutra em /pt/search | Abriu três empreendimentos, com o mesmo cabeçalho incompleto. Serve como destino de catálogo. |
| 08 a 10/12/2026, duas pessoas, sem cidade | A busca encaminhou ao empreendimento Chalés Sonho de Verão. Em uma execução, o endereço do empreendimento preservou os parâmetros. |
| Mesmo período e hóspedes, com Belo Horizonte | A busca permaneceu na listagem, exibiu corretamente as duas noites e retornou zero unidades. |

**O que corrigir.** Apresentar o estado sem datas como catálogo e reservar o termo “disponíveis” para consultas confirmadas. Retirar o texto incompleto da contagem de noites. Explicar se a contagem representa empreendimentos, quartos ou unidades, porque os cards exibidos agrupam inventário. No zero resultado, facilitar a troca de datas ou cidade. A regra que encaminha direto para um empreendimento com os filtros preenchidos precisa ser verificada com a Stays antes de mudar a lógica de navegação.

**Teste após o ajuste.** Comparar três pares de imóvel e período acordados com a 4Let Homes, incluindo um disponível, um indisponível e um sujeito a restrição tarifária ou estadia mínima, se houver. Guardar resultado público, calendário, tarifa, capacidade e regras da Stays para o mesmo cenário.

[Listagem pública](https://f4let.com/pt/search) · [Consulta de Belo Horizonte](https://f4let.com/pt/search?from=2026-12-08&to=2026-12-10&persons=2&cities%5B%5D=Belo+Horizonte)

### Localidades e empreendimentos

| Localidade | Página de chegada | Observação e ação |
|---|---|---|
| Natal | [Verano Ponta Negra](https://f4let.com/pt/building/VA04I) | Abre empreendimento em Ponta Negra, com datas e controle de atualização de preços. Confirmar se o rótulo “Natal” deve representar toda a cidade ou especificamente o Verano. |
| Belo Horizonte | [BH Del Rey](https://f4let.com/pt/building/VA02I) | Abre o empreendimento em Carlos Prates e apresenta a unidade Del Rey. Preservar a relação entre cidade, empreendimento e unidade. |
| São Miguel do Gostoso | [Busca da cidade](https://f4let.com/pt/search?persons=1&cities%5B%5D=S%C3%A3o+Miguel+do+Gostoso) | A busca encaminha aos Chalés Sonho de Verão, onde aparecem quatro unidades. Verificar se a abertura direta deve continuar quando houver mais de um empreendimento ativo na cidade. |
| Cabo Frio | [Home](https://f4let.com/pt/) | O card aponta de volta à home. Usar uma rota de cidade ou propriedade válida após confirmar o cadastro, ou retirar o atalho enquanto não houver destino. |
| Cerro Corá | [VA06I](https://f4let.com/pt/building/VA06I) | A página exibe 404 e a mensagem de erro está em inglês. Confirmar o cadastro ativo antes de substituir o link. Localizar a mensagem de erro quando o editor permitir. |

### Páginas de unidades e início de reserva

| Unidade testada | Evidência | Ação |
|---|---|---|
| [Belo Horizonte Del Rey · VA01I](https://f4let.com/pt/apartment/VA01I/4let-belo-horizonte-del-rey) | A página abriu com galeria, localização, descrição, comodidades, preço “a partir de” e seleção de datas. Na consulta direta de dezembro, o resultado observado apareceu sem os parâmetros no endereço. O texto repete informações da introdução e contém o fragmento “O b”. | Confirmar a quantidade de quartos, revisar a descrição no cadastro e retestar a passagem de datas pelo fluxo normal de seleção para distinguir comportamento da URL direta e estado carregado. |
| [Verano Ponta Negra · VA03I](https://f4let.com/pt/apartment/VA03I/4let-verano-ponta-negra) | Para 08 a 10/12 e duas pessoas, mostrou R$ 454 por noite junto de uma mensagem de indisponibilidade. | Investigar se o preço é referência ou cotação do período e deixar a distinção explícita. Cruzar a indisponibilidade com calendário, capacidade e tarifa. |
| [Chalé T1301CSV · ZJ01I](https://f4let.com/pt/apartment/ZJ01I/4let-chales-sonho-de-verao-t1301csv) | No mesmo cenário, mostrou duas pessoas, R$ 440 por noite, duas noites, total de R$ 880 e ação “Reserve já”. | Usar como candidato a cenário positivo. Conferir total, hóspedes e datas na etapa seguinte e registrar taxas quando aplicáveis. |
| [Chalé T1302CSV · ZJ02I](https://f4let.com/pt/apartment/ZJ02I/4let-chales-sonho-de-verao-t1302csv) | Exibiu R$ 440 por noite e a composição para duas noites. | Conferir a correspondência com a unidade e a tarifa no painel administrativo. |

A cotação pública demonstra avanço até a oferta reservável. Para homologar o checkout, partir de uma unidade confirmada pela operação e acompanhar a passagem até a tela de confirmação ou pagamento, verificando a preservação de unidade, datas, hóspedes e preço. Testar PIX e cartão quando habilitados, com ambiente e meio de pagamento autorizados. Os ícones de pagamento no rodapé representam a apresentação do site e não comprovam quais meios estão disponíveis para a cotação.

### Contato

A página abriu com origem do contato, canal preferido, nome, e-mail, telefone, assunto, mensagem e CAPTCHA de imagem. O rodapé tem e-mail de reservas e atalho de WhatsApp. A origem aparece selecionada como “Google”, o que merece revisão se o campo for usado para medir de onde chegam os contatos. O CAPTCHA apareceu como imagem sem descrição na árvore de acessibilidade. Confirmar se existe um caminho equivalente acessível para enviar a solicitação. Na homologação, validar campos obrigatórios, envio, mensagem de sucesso e recebimento no canal correto com dados de teste autorizados.

[Contato](https://f4let.com/pt/contact)

### Sobre nós

A página apresenta a operação desde 2018, o trabalho da Central de Reservas e o concierge. A imagem institucional tem texto alternativo. O conteúdo principal começa visualmente identificado como “Conheça a 4let Homes” em H2 e a árvore de acessibilidade mostra um H1 vazio. Transformar o título visível em H1 e acrescentar uma ação contextual ao final, como consultar acomodações ou falar com a central. Reaproveitar o conteúdo institucional após a revisão de texto.

[Sobre nós](https://f4let.com/pt/sobrenos)

### Favoritos, login e Minha Reserva

- **Favoritos.** A rota abriu com título de navegador “Minha Lista” e contador zero. Na sessão vazia, a árvore de acessibilidade passa do menu para o rodapé sem mensagem de orientação nem ação de retorno ao catálogo. Incluir um estado vazio e testar salvar, recarregar e remover uma unidade.
- **Login.** O modal abriu e apresentou acesso por código de e-mail e por senha. Falta verificar o envio de código e a recuperação de acesso com uma conta dedicada. O aceite deve incluir instrução de erro, retorno ao site após autenticar e preservação da busca quando aplicável.
- **Minha Reserva.** A entrada aparece na home em aba própria. A localização de uma reserva existente depende de uma referência de teste autorizada. Verificar a resposta para referência válida e inválida e a exibição em dispositivo móvel.

[Favoritos](https://f4let.com/pt/wishlist) · [Minha Reserva](https://f4let.com/pt/#reservation)

### Páginas legais

| Página | Observação | Ajuste a encaminhar |
|---|---|---|
| [Termos e Condições](https://f4let.com/pt/terms-and-conditions) | A página abre e tem H1. O título de navegador anterior, “termos-e-condicoes”, foi corrigido em 19/11. A regra de checkout tardio contém “88h até 88h”. | Solicitar à 4Let Homes a faixa de horário correta. Conferir a coerência das regras publicadas com a experiência no checkout. |
| [Política de Privacidade](https://f4let.com/pt/politica-de-privacidade) | A página abria com H1 sem acento e identificação de página pelo endereço. Em 19/11, o título PT foi acentuado no editor e o novo título de navegador foi conferido no site. | Pedir à operação o aviso aplicável ao futuro formulário do proprietário. |
| [Política de Cancelamento](https://f4let.com/pt/page/6a76bb54693dd40759d57741) | A página abre e tem H1. O endereço usa um identificador opaco, e a grafia de “Consumidor” e o título do navegador foram corrigidos e conferidos. | Confirmar a redação das condições comerciais com o responsável pela política. Se a Stays permitir URL legível, manter os links existentes funcionais por redirecionamento. |

### Área do proprietário

A navegação e o rodapé auditados não exibiram uma entrada pública para donos de imóveis. O formulário de Contato atende a uma finalidade geral. A seção contratada precisa receber nome, e-mail, telefone, cidade/UF, endereço ou região, tipo de propriedade, quartos, capacidade e descrição, além de até cinco fotos em JPG, PNG ou WEBP de até 5 MB por arquivo. A validação deve cobrir arquivos aceitos e recusados, concordância com o aviso de privacidade, confirmação ao solicitante e entrega ao canal operacional indicado pela 4Let Homes. A equipe do cliente faz a análise manual.

## Testes de reserva e pagamento

### Acomodações que encaminham para contato

Foram consultados os períodos de **1 a 4 de dezembro** e **8 a 10 de dezembro de 2026**, para **dois hóspedes**. No cenário de 8 a 10 de dezembro, os três anúncios abaixo exibiram preço e total para duas noites. O botão **Enviar pedido** apontava para o formulário da Stays. O teste confirmou o destino do link. O destinatário do e-mail não foi verificado.

| Acomodação | Código | Total exibido para duas noites |
|---|---|---:|
| Colina Flamboyant Duplo T8404 | WX01I | R$ 742,00 |
| Colina Flamboyant Triplo T8403 | HZ01J | R$ 923,00 |
| Chalés Sonho de Verão T1303 | ZJ04I | R$ 1.479,00 |

#### Causa confirmada nos três anúncios

Em **Acomodações → Distribuição → Configurações sobre reservas**, a reserva instantânea está definida como **Individual → Não** nos três anúncios **WX01I**, **HZ01J** e **ZJ04I**. A regra corresponde ao botão **Enviar pedido** observado nas cotações. O botão abriu o formulário de contato. O destinatário e o recebimento da mensagem não foram testados.

Outros casos ajudaram a distinguir o problema. A **Colina Family**, o **Chalé T1301** e o **Residencial Santo Antônio** exibiram **Reserve já**. O **Del Rey**, o **Verano Ponta Negra** e a **Pedra Baleia Single** exibiram mensagem de indisponibilidade nas datas checadas. Nessa situação, o e-mail funciona como alternativa de contato.

#### Correção e critério de aceite

Com a aprovação da operação, conferir a regra individual dos três anúncios e habilitar a reserva instantânea nos que devem aceitar reservas diretas. A configuração pode afetar outros canais conectados, por isso a decisão deve considerar o fluxo de aprovação dos proprietários e os canais ativos de cada imóvel.

Repetir a cotação com as mesmas datas e o mesmo número de hóspedes. O aceite exige que a página exiba **Reserve já** e que o botão abra a identificação do hóspede com a unidade, as datas e o preço corretos.

[Configuração de reservas no WX01I](https://fletho.stays.net/i/apartment/WX01I/reservation-settings) · [Fluxo de reserva direta na Stays](https://academy.stays.net/pt-BR/support/solutions/articles/36000053153-como-os-hospedes-fazem-reservas-via-site/)

### Checkout sem opção de pagamento

O **Mercado Pago** aparece como ativo no painel. No **Chalés Sonho de Verão T1301**, o botão **Reserve já** abriu a identificação por e-mail. Como o teste parou nessa etapa, a exibição de cartão, Pix ou outros meios para aquela cotação segue sem confirmação. Na revalidação do App Center, o recurso [Canais de pagamento por anúncio](https://fletho.stays.net/i/appcenter/all/5fd72fa661c121537d898594) aparece **Desativado**. A próxima comparação deve começar pela configuração geral de checkout e pela elegibilidade do provedor para cada cotação.

#### Como localizar a causa

1. Avançar com um e-mail de teste autorizado em uma cotação que oferece **Reserve já**. Registrar quais meios de pagamento aparecem e em qual etapa.
2. Repetir em outro imóvel reservável, com as mesmas datas e hóspedes, e comparar os meios exibidos.
3. Se a ausência ocorrer em todos os testes, conferir a visibilidade do canal no checkout, a moeda aceita e a configuração do provedor antes de alterar qualquer regra.
4. Após identificar e corrigir a causa, repetir o cenário afetado e o cenário de comparação. O aceite deste teste é visualizar os meios elegíveis na tela de pagamento. A confirmação de uma transação exige um cenário de homologação autorizado.

[Configuração de pagamentos por acomodação na Stays](https://academy.stays.net/pt-BR/support/solutions/articles/36000295984-como-personalizar-os-canais-de-pagamento-por-acomodacao/)

## Auditoria do painel da Stays

### Colina Flamboyant está ativa no cadastro e desconectada no canal Site

Na tela [Acomodações](https://fletho.stays.net/i/building/VA06I), o endereço VA06I aparece **ATIVO**, com **13 acomodações** no cadastro. Em [Anúncios do site](https://fletho.stays.net/i/chmanager/website/apartments/0), o agrupamento exibe **5 acomodações** e o botão **Connect** em **Nível propriedade**. Os agrupamentos Del Rey, Verano, Chalés e Pedra Baleia exibem **Conectado**. O link de prévia do painel aponta para o mesmo identificador que retorna 404 no site.

**Correção proposta.** Confirmar quais unidades devem ficar na página pública e as informações exibidas no endereço. Então conectar apenas o agrupamento VA06I no canal Site e abrir a prévia, o card da home e cinco páginas individuais. Conferir inventário, preço, calendário e o aparecimento no sitemap. A conexão não foi acionada durante a auditoria. O catálogo geral e o canal Site mostram contagens diferentes e a alteração publicaria o agrupamento.

### Central de Validação sinaliza períodos sem tarifa

O ícone do painel marcava **31 em 18/11** e **39 em 19/11**. O bloco expandido mostrou **12 anúncios** em ambas as leituras. Os intervalos abaixo reproduzem como o painel exibiu os limites em 19/11.

| Anúncio | Período exibido sem diária |
|---|---|
| T8405PCF · Colina | 15/12/2026 a 19/11/2027 |
| T8402PCF · Colina | 15/12/2026 a 19/05/2028 |
| T8404PCF · Colina | 15/12/2026 a 19/05/2028 |
| T4402PPB · Pedra Baleia | 18/01/2027 a 19/05/2028 |
| T8401PCF · Colina | 01/02/2027 a 19/05/2028 |
| T1905VPN · Verano | 01/02/2027 a 19/11/2027 |
| T1301CSV · Chalés | 15/02/2027 a 19/05/2028 |
| T1303CSV · Chalés | 15/02/2027 a 19/05/2028 |
| P0604VPN · Verano | 01/03/2027 a 19/11/2027 |
| T0073RSA · Santo Antônio | 01/08/2027 a 19/05/2028 |
| T8403PCF · Colina | 25/09/2027 a 19/11/2027 |
| T0404RDR · Del Rey | 01/10/2027 a 19/05/2028 |

**Correção proposta.** Começar pelas três unidades da Colina que perdem tarifas em 15/12. Confirmar com a operação o horizonte de vendas, preço base, feriados, estadia mínima e canais que devem receber a tarifa. Abrir cada intervalo indicado pela Stays, preencher com os valores aprovados e verificar no site a última noite com preço e a primeira noite que estava sem tarifa. As lacunas de dezembro da Colina começam depois do teste público de 8 a 10/12, portanto não explicam por si só os resultados daquele teste. Nenhuma tarifa foi alterada.

[Central de Validação · Preços](https://fletho.stays.net/i/validation_screen/price-errors)

### Estadia mínima bloqueia lacunas curtas

A Central mostrou **18 a 19/11/2026 no P0604VPN** e **17 a 18/11/2026 no T0073RSA**. A Stays explica que os intervalos entre reservas são menores que o mínimo definido. São exemplos de indisponibilidade causada por regra comercial. Para futuras lacunas, decidir com a operação se vale abrir exceção apenas naquela data, preservando o mínimo geral.

[Central de Validação · Calendário](https://fletho.stays.net/i/validation_screen/calendar-gaps)

### Canais externos têm pendências distintas

- **Airbnb.** A Central mostrou pendências de configuração, aviso para revisar capacidade dos anúncios importados, política de cancelamento que o canal não aceita e **sete atualizações de anúncios que não puderam ser aplicadas**. Também mostrou aviso para selecionar no painel a conta de recebimento. Revisar a lista por anúncio, comparar capacidade com o cadastro e escolher uma política aceita e aprovada pela operação antes de reenviar. O financeiro deve tratar a conta de recebimento.
- **Decolar.** A Central solicita concluir a configuração da propriedade. Identificar o anúncio vinculado e completar os campos indicados pelo canal antes de validar sincronização.
- **Expedia.** A Central informa que faltam requisitos para publicação. Revisar a lista de requisitos da propriedade no canal e confirmar seu estado após completar.
- **Reservas e App Center.** A seção de reservas mostrou um aviso de avaliações Airbnb pendentes na tela consultada. A tela de App Center não mostrou itens de webhook na inspeção. Isso não comprova a integridade do histórico de sincronização nem a ausência de conflitos em outros períodos.

[Central de Validação · Conectividade](https://fletho.stays.net/i/validation_screen/ota-errors)

### RSA Praia Grande e Pousada Pedra Baleia

O agrupamento **PK01J** retornou 404 e apareceu sem o selo **Conectado** no canal Site. A unidade pública **PK03J** abriu e ofereceu reserva direta nos testes. Confirmar se a operação pretende divulgar o agrupamento. Na **Pedra Baleia**, o agrupamento **EE01J** aparece conectado e a unidade **EE03J** abriu. A página do agrupamento mostrou mensagem de datas reservadas sem período explícito na URL. Nos períodos consultados, a unidade indicou indisponibilidade. Cruzar um cenário aprovado com o calendário antes de alterar a publicação.

## Inventário completo de URLs abertas

A varredura de cobertura abriu individualmente as 22 URLs do [sitemap público](https://www.f4let.com/sitemap.xml), os 12 endereços com nomes de imóvel vinculados pela home e as rotas adicionais abaixo. A abertura confirma o conteúdo observado. A disponibilidade e as tarifas dependem do cenário de busca.

| Imóvel | Localidade e tarifa de referência exibida sem datas |
|---|---|
| [VA01I · Belo Horizonte Del Rey](https://www.f4let.com/pt/apartment/VA01I) | Carlos Prates, Belo Horizonte · R$ 97,50 |
| [VA03I · Verano Ponta Negra](https://www.f4let.com/pt/apartment/VA03I) | Ponta Negra, Natal · R$ 84,50 |
| [VA05I · Colina Flamboyant Family](https://www.f4let.com/pt/apartment/VA05I) | Zona Rural, Cerro Corá · R$ 130,41 |
| [WU01I · Colina Flamboyant Duplo T8402](https://www.f4let.com/pt/apartment/WU01I) | Zona Rural, Cerro Corá · R$ 135,15 |
| [WX01I · Colina Flamboyant Duplo T8404](https://www.f4let.com/pt/apartment/WX01I) | Zona Rural, Cerro Corá · R$ 131,46 |
| [YM01I · Colina Flamboyant Single](https://www.f4let.com/pt/apartment/YM01I) | Zona Rural, Cerro Corá · R$ 135,15 |
| [HZ01J · Colina Flamboyant Triplo](https://www.f4let.com/pt/apartment/HZ01J) | Zona Rural, Cerro Corá · R$ 132,78 |
| [ZJ01I · Chalés T1301](https://www.f4let.com/pt/apartment/ZJ01I) | Centro, São Miguel do Gostoso · R$ 283,46 |
| [ZJ02I · Chalés T1302](https://www.f4let.com/pt/apartment/ZJ02I) | Centro, São Miguel do Gostoso · R$ 283,46 |
| [ZJ04I · Chalés T1303](https://www.f4let.com/pt/apartment/ZJ04I) | Centro, São Miguel do Gostoso · R$ 210,09 |
| [ZJ06I · Chalés T1304](https://www.f4let.com/pt/apartment/ZJ06I) | Centro, São Miguel do Gostoso · R$ 210,09 |
| [PK03J · Residencial Santo Antônio](https://www.f4let.com/pt/apartment/PK03J) | Vila Mirim, Praia Grande · R$ 97,35 |

As 12 unidades abriram com o título correspondente e um controle de seleção de datas. Em Cerro Corá, as cinco páginas individuais da Colina Flamboyant abrem mesmo com o 404 no card de destino. Isso permite localizar o problema no endereço do card e dá opções para corrigir o percurso após confirmar com a operação qual destino deve concentrar o inventário.

| Demais endereços abertos | Resultado |
|---|---|
| [VA02I](https://www.f4let.com/pt/building/VA02I), [VA04I](https://www.f4let.com/pt/building/VA04I) e [ZI01I](https://www.f4let.com/pt/building/ZI01I) | BH Del Rey, Verano Ponta Negra e Chalés Sonho de Verão abriram como empreendimentos. |
| [EE01J](https://www.f4let.com/pt/building/EE01J) | A Pousada Pedra Baleia abriu. Sem datas explícitas no endereço, a tela já exibiu a mensagem de que todos os anúncios estavam reservados para as datas. Retestar com período definido antes de concluir indisponibilidade. |
| [Home do sitemap](https://www.f4let.com/pt/home) | A rota exibiu cabeçalho e rodapé, sem o conteúdo da home na árvore de acessibilidade. A [home pública](https://www.f4let.com/) abriu com conteúdo. Apontar o sitemap para o endereço público e verificar se cabe redirecionar a rota antiga. |
| [Contato](https://www.f4let.com/pt/contact), [Sobre nós](https://www.f4let.com/pt/sobrenos), [Termos](https://www.f4let.com/pt/terms-and-conditions), [Privacidade](https://www.f4let.com/pt/politica-de-privacidade) e [Cancelamento](https://www.f4let.com/pt/page/6a76bb54693dd40759d57741) | As cinco páginas do sitemap abriram. Os achados individuais estão nas seções anteriores. |
| [Busca](https://www.f4let.com/pt/search), [Favoritos](https://www.f4let.com/pt/wishlist) e [Solicitação de reserva do Del Rey](https://www.f4let.com/customer/pt/contactus?id=VA01I) | Rotas adicionais abertas. O formulário de solicitação foi visualizado sem envio. |
| [VA06I](https://www.f4let.com/pt/building/VA06I) | 404 reproduzido no destino do card Cerro Corá. |

## Plano de correção e homologação

| Ordem | Entrega | Verificação |
|---|---|---|
| 1 | Conferir a configuração de reserva dos anúncios WX01I, HZ01J e ZJ04I. Aplicar a regra aprovada pela operação. | Repetir a cotação para dois hóspedes e verificar o botão, as datas, o imóvel e o total no fluxo de reserva. |
| 2 | Reproduzir a etapa de pagamento com identificação de teste autorizada. Conferir visibilidade, moeda e vínculo do canal de pagamento conforme o resultado. | Comparar pelo menos dois imóveis reserváveis. Confirmar os meios elegíveis antes de qualquer transação. |
| 3 | Resolver os destinos de Cerro Corá e Cabo Frio e a rota da home listada no sitemap. | Abrir cada card pela home, conferir o conteúdo de chegada e revalidar as URLs publicadas. |
| 4 | Resolver as lacunas tarifárias aprovadas, começando pelas três unidades da Colina com início em 15/12. | Testar as noites nas duas pontas de cada lacuna e cruzar os resultados com o calendário e as regras da Stays. |
| 5 | Corrigir dados divergentes dos imóveis, rótulos da busca, estado vazio, textos e títulos. Implementar a área do proprietário conforme o Anexo I. | Validar navegação, formulários, recebimento, leitura por teclado e layout em 390, 768 e 1440 px. Conferir também canonical, sitemap e metadados. |
| 6 | Revisar avisos dos canais externos com a operação. | Verificar o estado por anúncio nos canais afetados após cada ajuste aprovado. |

## Situação do contrato

- **Entrada.** O responsável informou o recebimento dos R$ 400 e dos acessos. O contrato conta 15 dias corridos a partir do dia seguinte ao cumprimento conjunto da assinatura, confirmação do pagamento e entrega dos insumos essenciais, ressalvadas as suspensões previstas. As datas desses eventos não foram confirmadas neste relatório.
- **Marco intermediário.** O diagnóstico, o [primeiro protótipo local](index.html) e a correção verificada do menu demonstram o avanço. As cláusulas 5.2 e 5.3 vinculam os R$ 600 à validação técnica, à apresentação de avanço funcional e à aprovação escrita da continuidade.
- **Aceite final.** Restam a comparação de pelo menos três cenários com a Stays, os testes de autenticação, recuperação, confirmação ou pagamento em ambiente autorizado e as demais verificações do Anexo I. A parcela de R$ 1.000 vence após o aceite final expresso e antes da publicação definitiva. O acompanhamento de R$ 200 mensais e a garantia de 30 dias começam no aceite final.

As mudanças publicadas e verificadas incluem o menu Acomodações, descrições em português de nove anúncios, a correção ortográfica no texto de Cancelamento e os três títulos de navegador publicados em 19/11.

## Cobertura e achados adicionais

A cobertura inicial foi parcial. O inventário original reúne URLs do sitemap, links da home e rotas adicionais. As 13 acomodações representam a amostra do teste de reservas.

- **Verano Ponta Negra · VA09I / T1905VPN.** Unidade fora da lista original. O agrupamento VA04I mostra duas acomodações no canal Site. A unidade VA03I tem selo Connected, enquanto VA09I aparece sem o selo e com alerta de preços incompletos. A URL pública direta do VA09I abriu no Opera GX. A ficha informa cinco pessoas, enquanto a descrição também menciona capacidade para seis. A elegibilidade da unidade na busca e o checkout seguem pendentes de teste com datas.
- **Idiomas.** As homes em inglês e espanhol abrem. Ambas exibem nomes genéricos repetidos nos Chalés e nomes diferentes dos da versão PT para imóveis da Colina. Na home em inglês, os rótulos das políticas no rodapé estão em português. Na home em espanhol, a consulta de reserva ainda exibe rótulos em português.
- **Cobertura pendente.** Cruzar todos os anúncios do cadastro com o canal Site e as URLs acessíveis, inclusive unidades que não constam do inventário original. Ainda faltam a navegação detalhada em EN/ES, a validação responsiva dos fluxos e a checagem por anúncio de calendário, regras, cotação e checkout. A etapa de meios de pagamento depende de identificação de teste autorizada.

[VA09I no site público](https://www.f4let.com/pt/apartment/VA09I) · [Canal Site](https://fletho.stays.net/i/chmanager/website/apartments/0) · [Home em inglês](https://www.f4let.com/en/) · [Home em espanhol](https://www.f4let.com/es/)

## Matriz de verificação do canal Site

Reabri o sitemap no Opera GX e confirmei 22 URLs. A tela Anúncios do site mostra seis empreendimentos e 14 unidades. As 42 fichas diretas (14 em cada idioma) abriram. O teste com 8 a 10/12/2026 e dois hóspedes foi feito nas 14 fichas em português. O botão de reserva indica o fluxo oferecido nessa data. A tela de pagamento continua pendente.

| Unidade | Canal Site | Oferta pública no cenário |
|---|---|---|
| VA01I · Del Rey | Conectado | Indisponível |
| VA03I · Verano | Conectado | Indisponível |
| VA09I · Verano | Sem selo | Enviar pedido |
| VA05I · Colina Family | Conectado | Reserve já |
| WU01I · Colina T8402 | Conectado | Reserve já |
| WX01I · Colina T8404 | Conectado | Enviar pedido |
| YM01I · Colina Single | Conectado | Reserve já |
| HZ01J · Colina Triplo | Conectado | Enviar pedido |
| ZJ01I · Chalés T1301 | Conectado | Reserve já |
| ZJ02I · Chalés T1302 | Conectado | Reserve já |
| ZJ04I · Chalés T1303 | Conectado | Enviar pedido |
| ZJ06I · Chalés T1304 | Conectado | Reserve já |
| PK03J · Santo Antônio | Conectado | Reserve já |
| EE03J · Pedra Baleia | Sem selo | Indisponível |

Os 14 itens exibem alerta de preços incompletos na tela do canal. O alerta é distinto da lista de períodos da Central de Validação e da indisponibilidade para o período consultado.

### Conteúdo e comportamento verificados

- **VA09I.** A Stays mostrou Reserva instantânea em Individual → Não. O formulário de solicitação recebeu o imóvel, 8 a 10 de dezembro e dois hóspedes. O envio e o destinatário seguem pendentes. A capacidade registrada na Stays é de cinco. A referência anterior a seis foi corrigida na descrição PT e verificada no site.
- **ZJ04I.** Em uma leitura a ação continha a unidade, datas e hóspedes na URL. Em outra, o mesmo botão expôs apenas a rota genérica do formulário. A preservação efetiva dos dados ao clicar e a influência do carregamento da cotação precisam de confirmação.
- **Empreendimentos.** VA02I, VA04I, ZI01I e EE01J abriram nos três idiomas. VA06I e PK01J exibiram “Building … is not found” nos três. Verano mostra uma unidade na página pública sem datas, enquanto o painel lista duas. Pedra Baleia em inglês exibe que todos os anúncios estão reservados mesmo antes de uma seleção de datas.
- **Busca.** Em português, sem datas, chama três empreendimentos de “3 unidades disponíveis” e deixa o número de noites em branco. As rotas principais de busca, contato, Sobre nós, favoritos e políticas respondem em PT/EN/ES.
- **Fichas em EN/ES.** Os quatro Chalés compartilham o mesmo título genérico. VA05I, WU01I e WX01I usam Standard 01/02/03. EE03J aparece como Single em português e Double/Duplo em inglês/espanhol. VA03I e VA09I têm o mesmo título nas duas versões.
- **Políticas.** O corpo da política de privacidade em inglês permanece em português. Termos em espanhol abrem com texto em português. A política de cancelamento em espanhol tem título traduzido e condições de reembolso em português. A revisão de conteúdo deve preservar as condições aprovadas pela operação.

A matriz cobre as unidades enumeradas no canal Site. Continua pendente o cruzamento com todo o cadastro geral, os testes responsivos, a interação com todos os controles em cada idioma, a comparação individual de indisponibilidade com calendário e tarifa, os envios de teste e o checkout após identificação autorizada. Esta rodada foi de leitura e navegação.

[Canal Site](https://fletho.stays.net/i/chmanager/website/apartments/0) · [Regra VA09I](https://fletho.stays.net/i/apartment/VA09I/reservation-settings) · [Solicitação VA09I](https://www.f4let.com/customer/pt/contactus?id=VA09I&from=2026-12-08&to=2026-12-10&persons=2)

## Revisão individual e correções publicadas

Cenários em português para dois hóspedes, de 1 a 4 e de 8 a 10/12/2026. A oferta abaixo registra a etapa pública que foi possível observar. “Reserva direta” descreve o botão, com exceção do ZJ01I, que já chegou à identificação por e-mail na rodada anterior. A presença de Pix e cartão ainda exige um teste após a identificação.

| Código | Ficha pública | Oferta de 1 a 4/12 | Oferta de 8 a 10/12 | Ação e verificação |
|---|---|---|---|---|
| VA01I | 1 quarto, 5 hóspedes | Indisponível | Indisponível | A descrição menciona dois quartos. Confirmar a configuração física antes de editar o cadastro estrutural. Cruzar os dois períodos com o calendário. |
| VA03I | 2 quartos, 5 hóspedes | Indisponível | Indisponível | Corrigidas e verificadas as duas referências a seis na descrição PT. Cruzar a indisponibilidade com o calendário. |
| VA05I | 1 quarto, 6 hóspedes | Reserva direta | Reserva direta | O texto fala da pousada inteira, com 14 quartos. A ficha se refere à unidade Family. Detalhar o quarto após conferir sua configuração. |
| WU01I | 1 quarto, 2 hóspedes | Reserva direta | Reserva direta | O texto atribuía 14 quartos e seis hóspedes à unidade. Corrigido para um quarto e dois hóspedes. Verificado no site. |
| WX01I | 1 quarto, 4 hóspedes | Enviar pedido | Enviar pedido | Corrigida a frase que informava quatro quartos e seis hóspedes. Reserva individual permanece pendente de decisão comercial. |
| YM01I | 1 quarto, 2 hóspedes | Cotação de três noites | Reserva direta | A capacidade estrutural foi conferida. O nome Single e o texto geral da pousada merecem confirmação com o cadastro físico antes de atualização. |
| ZJ01I | 1 quarto, 4 hóspedes | Reserva direta | Reserva direta | Corrigido e verificado o texto de acesso às instalações. A identificação por e-mail foi observada na rodada inicial. |
| ZJ02I | 1 quarto, 4 hóspedes | Reserva direta | Reserva direta | Corrigido e verificado o mesmo texto de acesso. |
| ZJ04I | 2 quartos, 6 hóspedes | Enviar pedido | Enviar pedido | Corrigido e verificado o texto de acesso. O clique de 1 a 4/12 transferiu imóvel, datas e dois hóspedes ao formulário, apesar de o link estático aparecer genérico. |
| ZJ06I | 2 quartos, 6 hóspedes | Reserva direta | Reserva direta | Corrigido e verificado o texto de acesso. |
| HZ01J | 1 quarto, 3 hóspedes | Enviar pedido | Enviar pedido | Corrigidos os dois trechos que indicavam quatro e seis hóspedes. Retirada do primeiro trecho a composição de camas conflitante. Verificado no site. |
| PK03J | 1 quarto, 6 hóspedes | Reserva direta | Reserva direta | A descrição e a capacidade exibida concordam. O agrupamento PK01J continua com erro de página. |
| EE03J | 1 quarto, 4 hóspedes | Indisponível | Indisponível | A denominação Single/Double/Duplo precisa de validação. A unidade está sem selo no canal Site e requer análise de distribuição e calendário. |
| VA09I | 2 quartos, 5 hóspedes | Enviar pedido | Enviar pedido | Descrição corrigida e verificada na rodada anterior. O formulário preservou a unidade, as datas e os hóspedes no cenário de 8 a 10/12. |

Os oito anúncios corrigidos nesta rodada foram reabertos nas URLs públicas e os textos novos apareceram em todas as fichas PT. Também seguem registrados a correção de VA09I e o ajuste ortográfico na política de cancelamento. Permanecem pendentes as regras de reserva instantânea, a conexão dos agrupamentos, a confirmação das informações físicas divergentes e o teste autorizado de Pix e cartão.


## Pendências de homologação por frente

| Frente | Evidência necessária para concluir |
|---|---|
| Inventário, tarifas e calendário | Cruzar o cadastro geral com os seis agrupamentos e 14 unidades do canal Site. Marcar quais devem aparecer na busca. Comparar no mínimo três cenários no site e na Stays, anotando unidade, datas, hóspedes, conexão, bloqueio, estadia mínima, diária, taxas e total. Conferir as noites nas duas pontas dos intervalos sem diária. |
| Reserva direta e solicitação | A operação define a regra de WX01I, HZ01J, ZJ04I e VA09I. Verificar as regras no canal Site e nos canais externos antes da mudança. Validar destino, dados transferidos e recebimento com um envio de teste autorizado para o fluxo por pedido. |
| Checkout | Usar e-mail de teste autorizado em ZJ01I e em outra unidade com reserva direta. Conferir valor, moeda, datas, hóspedes, taxas e meios elegíveis após a identificação. O Mercado Pago ativo no painel ainda precisa ser confrontado com Pix e cartão na tela pública. |
| Agrupamentos e localidades | Definir publicação de VA06I e PK01J e o inventário visível de cada um. Confirmar um destino real para Cabo Frio. Reabrir os cards da home, links diretos, resultados por cidade e versões PT/EN/ES. |
| Conteúdo de unidades e idiomas | Confirmar quartos do Del Rey, configuração da Family e Single da Colina, composição de camas e nome da Pedra Baleia. Conferir cada tradução, capacidade e título com a ficha correta. |
| Navegação, acessibilidade e busca | Testar 390, 768 e 1440 px com teclado e leitor de tela, inclusive busca por código, datas invertidas, troca de filtros, ausência de resultados, favoritos e formulários. Conferir seleção e remoção de favorito após recarregar. Validar H1, títulos, canonical, sitemap, indexação e erros traduzidos. |
| Conta e Minha Reserva | Validar código, senha, recuperação e resposta a localizadores válidos e inválidos com conta e reserva de homologação. |
| Informações legais e área do proprietário | Obter a faixa de horários correta do checkout tardio, aprovar versões traduzidas das políticas e definir aviso de privacidade e destinatário da área do proprietário. Testar os formatos JPG, PNG e WEBP, limite de cinco fotos de 5 MB por arquivo, validação de campos, confirmação e recebimento. |
| Canais externos | Conferir os avisos por anúncio, validar os requisitos de Airbnb, Decolar e Expedia e registrar o resultado após cada ajuste da operação. |
