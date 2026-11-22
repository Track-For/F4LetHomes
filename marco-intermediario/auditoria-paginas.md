# 4Let Homes | Auditoria do site público

**18 de novembro de 2026 · Marco intermediário · Track For**

A auditoria acompanhou a jornada no Opera GX, da home até a cotação no motor Stays. Foram abertas páginas institucionais, páginas legais, destinos, empreendimentos e unidades. A auditoria documenta o comportamento observado no navegador. A comparação com o calendário administrativo e as regras tarifárias da Stays permanece pendente. Os testes pararam antes de criar reservas, disparar mensagens ou efetuar pagamentos.

## Correções prioritárias

| Prioridade | Ocorrência | Origem observada ou ponto de investigação |
|---|---|---|
| Alta | Menu Acomodações envia o visitante a uma busca com datas fixas de agosto de 2026. | Endereço confirmado no menu superior da Stays. A listagem neutra foi validada no navegador. |
| Alta | Cerro Corá abre uma tela 404. | A home aponta para o empreendimento VA06I, que aparece como inexistente. Confirmar o destino ativo com a operação. |
| Alta | Cabo Frio volta à própria home. | Link do card aponta para /pt/. Confirmar se existe oferta pública ativa antes de trocar o destino. |
| Alta | O card do Del Rey informa um quarto, enquanto a descrição do mesmo imóvel informa dois. | Conferir o cadastro VA01I com a operação e corrigir a fonte dos dados. |
| Alta | A jornada tem preço e botão de reserva em unidades dos Chalés, mas o checkout ainda precisa passar pelo roteiro de aceite. | Validar continuidade e consistência dos valores em cenário autorizado pela 4Let Homes. |
| Média | Busca sem datas mostra “disponíveis” e “( noites)”. | Estado de listagem reaproveita o texto de disponibilidade sem período preenchido. |
| Média | As páginas de políticas apresentam problemas de título e de conteúdo operacional. | Revisão dos textos pela 4Let Homes e ajuste de apresentação no editor. |
| Escopo contratado | A área do proprietário não apareceu na navegação pública auditada. | Implementar a entrada de captação e validar o recebimento com a operação. |

## Página inicial

**O que funciona.** A home apresenta busca por datas, hóspedes, cidade e quartos, com abas separadas para busca por código e consulta de reserva. Os cards de destaque dão acesso aos detalhes de unidades. O título do navegador identifica a marca e a hospedagem por temporada.

**O que corrigir.** O menu global de acomodações carrega datas vencidas. Os cards de Cabo Frio e Cerro Corá têm destinos incorretos. No destaque do Del Rey, a divergência de quartos afeta a escolha do hóspede antes mesmo de abrir o imóvel. Os links de localidades e os ícones de favoritos e WhatsApp merecem nomes que expliquem a ação a quem navega com leitor de tela.

**Teste após o ajuste.** Abrir cada destino pelo card, conferir o nome e o inventário no destino e voltar à home preservando uma navegação previsível. Conferir título, data, hóspedes e cidade antes de acionar a busca. Validar os três caminhos da home separadamente.

[Home](https://f4let.com/pt/)

## Listagem e resultados

| Consulta | Resultado observado |
|---|---|
| Menu Acomodações, com 01 a 31/08/2026 para uma pessoa | A URL manteve o período antigo. A página exibiu três resultados agrupados e o cabeçalho “( noites)” sem contagem. |
| Listagem neutra em /pt/search | Abriu três empreendimentos, com o mesmo cabeçalho incompleto. Serve como destino de catálogo. |
| 08 a 10/12/2026, duas pessoas, sem cidade | A busca encaminhou ao empreendimento Chalés Sonho de Verão. Em uma execução, o endereço do empreendimento preservou os parâmetros. |
| Mesmo período e hóspedes, com Belo Horizonte | A busca permaneceu na listagem, exibiu corretamente as duas noites e retornou zero unidades. |

**O que corrigir.** Apresentar o estado sem datas como catálogo e reservar o termo “disponíveis” para consultas confirmadas. Retirar o texto incompleto da contagem de noites. Explicar se a contagem representa empreendimentos, quartos ou unidades, porque os cards exibidos agrupam inventário. No zero resultado, facilitar a troca de datas ou cidade. A regra que encaminha direto para um empreendimento com os filtros preenchidos precisa ser verificada com a Stays antes de mudar a lógica de navegação.

**Teste após o ajuste.** Comparar três pares de imóvel e período acordados com a 4Let Homes, incluindo um disponível, um indisponível e um sujeito a restrição tarifária ou estadia mínima, se houver. Guardar resultado público, calendário, tarifa, capacidade e regras da Stays para o mesmo cenário.

[Listagem pública](https://f4let.com/pt/search) · [Consulta de Belo Horizonte](https://f4let.com/pt/search?from=2026-12-08&to=2026-12-10&persons=2&cities%5B%5D=Belo+Horizonte)

## Localidades e empreendimentos

| Localidade | Página de chegada | Observação e ação |
|---|---|---|
| Natal | [Verano Ponta Negra](https://f4let.com/pt/building/VA04I) | Abre empreendimento em Ponta Negra, com datas e controle de atualização de preços. Confirmar se o rótulo “Natal” deve representar toda a cidade ou especificamente o Verano. |
| Belo Horizonte | [BH Del Rey](https://f4let.com/pt/building/VA02I) | Abre o empreendimento em Carlos Prates e apresenta a unidade Del Rey. Preservar a relação entre cidade, empreendimento e unidade. |
| São Miguel do Gostoso | [Busca da cidade](https://f4let.com/pt/search?persons=1&cities%5B%5D=S%C3%A3o+Miguel+do+Gostoso) | A busca encaminha aos Chalés Sonho de Verão, onde aparecem quatro unidades. Verificar se a abertura direta deve continuar quando houver mais de um empreendimento ativo na cidade. |
| Cabo Frio | [Home](https://f4let.com/pt/) | O card aponta de volta à home. Usar uma rota de cidade ou propriedade válida após confirmar o cadastro, ou retirar o atalho enquanto não houver destino. |
| Cerro Corá | [VA06I](https://f4let.com/pt/building/VA06I) | A página exibe 404 e a mensagem de erro está em inglês. Confirmar o cadastro ativo antes de substituir o link. Localizar a mensagem de erro quando o editor permitir. |

## Páginas de unidades e início de reserva

| Unidade testada | Evidência | Ação |
|---|---|---|
| [Belo Horizonte Del Rey · VA01I](https://f4let.com/pt/apartment/VA01I/4let-belo-horizonte-del-rey) | A página abriu com galeria, localização, descrição, comodidades, preço “a partir de” e seleção de datas. Na consulta direta de dezembro, o resultado observado apareceu sem os parâmetros no endereço. O texto repete informações da introdução e contém o fragmento “O b”. | Confirmar a quantidade de quartos, revisar a descrição no cadastro e retestar a passagem de datas pelo fluxo normal de seleção para distinguir comportamento da URL direta e estado carregado. |
| [Verano Ponta Negra · VA03I](https://f4let.com/pt/apartment/VA03I/4let-verano-ponta-negra) | Para 08 a 10/12 e duas pessoas, mostrou R$ 454 por noite junto de uma mensagem de indisponibilidade. | Investigar se o preço é referência ou cotação do período e deixar a distinção explícita. Cruzar a indisponibilidade com calendário, capacidade e tarifa. |
| [Chalé T1301CSV · ZJ01I](https://f4let.com/pt/apartment/ZJ01I/4let-chales-sonho-de-verao-t1301csv) | No mesmo cenário, mostrou duas pessoas, R$ 440 por noite, duas noites, total de R$ 880 e ação “Reserve já”. | Usar como candidato a cenário positivo. Conferir total, hóspedes e datas na etapa seguinte e registrar taxas quando aplicáveis. |
| [Chalé T1302CSV · ZJ02I](https://f4let.com/pt/apartment/ZJ02I/4let-chales-sonho-de-verao-t1302csv) | Exibiu R$ 440 por noite e a composição para duas noites. | Conferir a correspondência com a unidade e a tarifa no painel administrativo. |

A cotação pública demonstra avanço até a oferta reservável. Para homologar o checkout, partir de uma unidade confirmada pela operação e acompanhar a passagem até a tela de confirmação ou pagamento, verificando a preservação de unidade, datas, hóspedes e preço. Testar PIX e cartão quando habilitados, com ambiente e meio de pagamento autorizados. Os ícones de pagamento no rodapé representam a apresentação do site e não comprovam quais meios estão disponíveis para a cotação.

## Contato

A página abriu com origem do contato, canal preferido, nome, e-mail, telefone, assunto, mensagem e CAPTCHA de imagem. O rodapé tem e-mail de reservas e atalho de WhatsApp. A origem aparece selecionada como “Google”, o que merece revisão se o campo for usado para medir de onde chegam os contatos. O CAPTCHA apareceu como imagem sem descrição na árvore de acessibilidade. Confirmar se existe um caminho equivalente acessível para enviar a solicitação. Na homologação, validar campos obrigatórios, envio, mensagem de sucesso e recebimento no canal correto com dados de teste autorizados.

[Contato](https://f4let.com/pt/contact)

## Sobre nós

A página apresenta a operação desde 2018, o trabalho da Central de Reservas e o concierge. A imagem institucional tem texto alternativo. O conteúdo principal começa visualmente identificado como “Conheça a 4let Homes” em H2 e a árvore de acessibilidade mostra um H1 vazio. Transformar o título visível em H1 e acrescentar uma ação contextual ao final, como consultar acomodações ou falar com a central. Reaproveitar o conteúdo institucional após a revisão de texto.

[Sobre nós](https://f4let.com/pt/sobrenos)

## Favoritos, login e Minha Reserva

- **Favoritos.** A rota abriu com título de navegador “Minha Lista” e contador zero. Na sessão vazia, a árvore de acessibilidade passa do menu para o rodapé sem mensagem de orientação nem ação de retorno ao catálogo. Incluir um estado vazio e testar salvar, recarregar e remover uma unidade.
- **Login.** O modal abriu e apresentou acesso por código de e-mail e por senha. Falta verificar o envio de código e a recuperação de acesso com uma conta dedicada. O aceite deve incluir instrução de erro, retorno ao site após autenticar e preservação da busca quando aplicável.
- **Minha Reserva.** A entrada aparece na home em aba própria. A localização de uma reserva existente depende de uma referência de teste autorizada. Verificar a resposta para referência válida e inválida e a exibição em dispositivo móvel.

[Favoritos](https://f4let.com/pt/wishlist) · [Minha Reserva](https://f4let.com/pt/#reservation)

## Páginas legais

| Página | Observação | Ajuste a encaminhar |
|---|---|---|
| [Termos e Condições](https://f4let.com/pt/terms-and-conditions) | A página abre e tem H1. O título de navegador aparece como “termos-e-condicoes”. A regra de checkout tardio contém “88h até 88h”. | Usar título legível e solicitar à 4Let Homes a faixa de horário correta. Conferir a coerência das regras publicadas com a experiência no checkout. |
| [Política de Privacidade](https://f4let.com/pt/politica-de-privacidade) | A página abre, com H1 “Politica de Privacidade”, enquanto a árvore apresenta o endereço como identificação da página. | Corrigir acentuação e título do navegador. Pedir à operação o aviso aplicável ao futuro formulário do proprietário. |
| [Política de Cancelamento](https://f4let.com/pt/page/6a76bb54693dd40759d57741) | A página abre e tem H1. O endereço usa um identificador opaco, e o texto começa com “Código de Defesa do Consumir”. | Corrigir o título do navegador e a redação com o responsável pela política. Se a Stays permitir URL legível, manter os links existentes funcionais por redirecionamento. |

## Área do proprietário

A navegação e o rodapé auditados não exibiram uma entrada pública para donos de imóveis. O formulário de Contato atende a uma finalidade geral. A seção contratada precisa receber nome, e-mail, telefone, cidade/UF, endereço ou região, tipo de propriedade, quartos, capacidade e descrição, além de até cinco fotos em JPG, PNG ou WEBP de até 5 MB por arquivo. A validação deve cobrir arquivos aceitos e recusados, concordância com o aviso de privacidade, confirmação ao solicitante e entrega ao canal operacional indicado pela 4Let Homes. A equipe do cliente faz a análise manual.

## Ordem de execução e verificação

1. Corrigir os links do menu e das localidades em homologação. Verificar as páginas de destino e a conservação dos filtros ao mudar de tela.
2. Comparar o inventário e as regras de busca da Stays com três cenários fornecidos pelo cliente. O painel exibiu o indicador “Preços Incompletos”, com valor 31. Cruzar o indicador por unidade e data antes de atribuir a ele qualquer divergência.
3. Corrigir divergências de conteúdo e o cabeçalho da busca. Revisar os títulos das páginas e o estado vazio de favoritos, respeitando as possibilidades do editor Stays.
4. Rodar o teste completo de reserva e login em cenário autorizado. Registrar a tela alcançada e as limitações externas. Validar o envio dos formulários com o responsável pelo destino operacional.
5. Completar a checagem visual em 390, 768 e 1440 px. Verificar, especialmente, a busca no topo, o acesso ao botão de reserva, galeria, formulários, mensagens e foco por teclado. Canonical, sitemap e desempenho também ficam para verificação técnica específica.
6. Apresentar as evidências, as correções demonstradas no protótipo e as dependências ao cliente. Pedir aprovação escrita da continuidade conforme as cláusulas 5.2 e 5.3. O aceite final do Anexo I é uma etapa posterior.

A auditoria observou o site em produção e o protótipo anterior já contém a rota neutra do catálogo. As correções acima ainda devem ser implementadas e validadas no ambiente autorizado.

## Inventário completo de URLs abertas

A segunda varredura abriu individualmente as 22 URLs do [sitemap público](https://www.f4let.com/sitemap.xml), os 12 endereços com nomes de imóvel vinculados pela home e as rotas adicionais abaixo. A abertura confirma o conteúdo observado. A disponibilidade e as tarifas dependem do cenário de busca.

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
