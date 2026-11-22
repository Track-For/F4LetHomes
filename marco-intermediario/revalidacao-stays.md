# 4Let Homes | Revalidação do domínio e auditoria da Stays

## Correção aplicada e comprovada

No **Editor do site → Menus → Menu Asuperior padrão → Acomodações**, o item do tipo Link apontava para `/pt/search?from=2026-08-01&to=2026-08-31&persons=1`. Troquei o endereço para `https://www.f4let.com/pt/search`, mantendo o nome do item. Após salvar o item e o menu, a Stays exibiu “Menu salvo com sucesso”. Abri a home pública, conferi a nova URL do item e cliquei nela. O catálogo abriu sem datas fixas. O texto incompleto da contagem de noites ainda aparece no catálogo sem período.

[Home pública](https://www.f4let.com/) · [Catálogo](https://www.f4let.com/pt/search)

## Revisão página por página

Os endereços dos imóveis, a evidência individual e os testes anteriores estão no [inventário de páginas](auditoria-paginas.md#inventário-completo-de-urls-abertas). A rodada atual reabriu as URLs dos imóveis do sitemap, as páginas institucionais e os empreendimentos abaixo. A busca e os formulários foram verificados por navegação e leitura da interface. O teste de checkout com pagamento exige um cenário autorizado.

| Página | Resultado e correção |
|---|---|
| Home pública | Abriu com a busca e o menu corrigido. Cabo Frio aponta para a home. Cerro Corá aponta para o agrupamento VA06I, que retorna erro. Confirmar a oferta de Cabo Frio e resolver a conexão de Cerro Corá antes de alterar os cards. |
| /pt/home | Reabriu como página com cabeçalho e rodapé, sem o conteúdo principal da home na inspeção anterior. A URL consta no sitemap. Usar a home pública no sitemap e verificar se a Stays oferece redirecionamento para essa rota. |
| Busca | Abre pelo menu corrigido. Sem datas, mostra três resultados e “( noites)” sem número. A busca de Cerro Corá sem datas retornou zero. Conferir conexão e agrupamento antes de usar o filtro de cidade como alternativa ao card. |
| BH Del Rey · VA02I | Abre e aparece como Conectado no canal Site. A unidade VA01I abriu. Conferir a divergência de um quarto no card e dois na descrição, antes de alterar o cadastro. |
| Verano Ponta Negra · VA04I | Abre e aparece como Conectado. VA03I abre. O teste anterior mostrou preço ao lado da mensagem de indisponibilidade. Distinguir tarifa de referência de cotação para as datas selecionadas. |
| Chalés Sonho de Verão · ZI01I | Abre e aparece como Conectado, com quatro acomodações no painel. ZJ01I, ZJ02I, ZJ04I e ZJ06I abriram individualmente. O teste anterior em ZJ01I chegou à cotação de R$ 880 para duas noites. |
| Colina Flamboyant · VA06I | O endereço público retorna 404. VA05I, WU01I, WX01I, YM01I e HZ01J abriram individualmente. A conexão no nível da propriedade explica a diferença entre o agrupamento e as unidades, conforme a seção seguinte. |
| Pousada Pedra Baleia · EE01J | Abre, está conectada e tem uma acomodação exibida no canal Site. A página direta EE03J abriu. O agrupamento havia mostrado “Todos os anúncios estão reservados” sem período explícito. Comparar com uma consulta datada e o calendário da unidade. |
| RSA Praia Grande · PK01J | Agrupamento público retorna 404 e o canal Site não exibe o selo Conectado. A unidade PK03J abriu. Confirmar com a operação se deseja divulgar também o agrupamento. |
| Contato | Reabriu. O formulário inclui CAPTCHA de imagem, origem e preferência de canal. Revisar acessibilidade e validar entrega com envio de teste autorizado. |
| Solicitação de reserva · Del Rey | Reabriu. Verificar se datas, hóspedes e imóvel aparecem no formulário ao chegar por uma cotação. |
| Sobre nós | Reabriu. Corrigir H1 vazio e usar o título visível “Conheça a 4let Homes” como título principal. |
| Favoritos | Reabriu. Revisar mensagem e ação na lista vazia. Testar salvar e remover uma unidade na mesma sessão. |
| Termos e Condições | Reabriu. Corrigir título de navegador e pedir à operação a faixa correta no trecho “88h até 88h”, que afeta a regra publicada. |
| Política de Privacidade | Reabriu. Revisar o título do navegador e acentuação. Usar aviso aprovado pelo cliente no futuro formulário do proprietário. |
| Política de Cancelamento | Reabriu. Corrigir “Código de Defesa do Consumir” e confirmar conteúdo comercial com o cliente antes de publicar ajustes. |
| Login e Minha Reserva | Entradas do site identificadas. O login já abriu o modal em teste anterior. Recuperação, código e consulta de reserva exigem conta ou referência dedicada. |
| Área do proprietário | A navegação auditada não oferece entrada dedicada. Implementar formulário conforme o Anexo I e validar o canal de recebimento. |

## Onde a operação da Stays está falhando

### Colina Flamboyant está ativa no cadastro e desconectada no canal Site

Na tela [Acomodações](https://fletho.stays.net/i/building/VA06I), o endereço VA06I aparece **ATIVO**, com **13 acomodações** no cadastro. Em [Anúncios do site](https://fletho.stays.net/i/chmanager/website/apartments/0), o agrupamento exibe **5 acomodações** e o botão **Connect** em **Nível propriedade**. Os agrupamentos Del Rey, Verano, Chalés e Pedra Baleia exibem **Conectado**. O link de prévia do painel aponta para o mesmo identificador que retorna 404 no site.

**Correção proposta.** Confirmar quais unidades devem ficar na página pública e as informações exibidas no endereço. Então conectar apenas o agrupamento VA06I no canal Site e abrir a prévia, o card da home e cinco páginas individuais. Conferir inventário, preço, calendário e o aparecimento no sitemap. A conexão não foi acionada durante a auditoria. O catálogo geral e o canal Site mostram contagens diferentes e a alteração publicaria o agrupamento.

### Central de Validação sinaliza períodos sem tarifa

O ícone do painel marcava **31**. Dentro do bloco **Preços Incompletos**, a lista expandida mostrou **12 anúncios** com os seguintes intervalos. O contador do cabeçalho e a quantidade de linhas no bloco são observações distintas.

| Anúncio | Período exibido sem diária |
|---|---|
| T8405PCF · Colina | 15/12/2026 a 18/11/2027 |
| T8402PCF · Colina | 15/12/2026 a 18/05/2028 |
| T8404PCF · Colina | 15/12/2026 a 18/05/2028 |
| T4402PPB · Pedra Baleia | 18/01/2027 a 18/05/2028 |
| T8401PCF · Colina | 01/02/2027 a 18/05/2028 |
| T1905VPN · Verano | 01/02/2027 a 18/11/2027 |
| T1301CSV · Chalés | 15/02/2027 a 18/05/2028 |
| T1303CSV · Chalés | 15/02/2027 a 18/05/2028 |
| P0604VPN · Verano | 01/03/2027 a 18/11/2027 |
| T0073RSA · Santo Antônio | 01/08/2027 a 18/05/2028 |
| T8403PCF · Colina | 25/09/2027 a 18/11/2027 |
| T0404RDR · Del Rey | 01/10/2027 a 18/05/2028 |

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

## Próxima validação

Para os cenários de busca e reserva, comparar no mínimo **Del Rey, Verano e Chalés** com as combinações de data e hóspedes aprovadas pelo cliente. Para cada caso, registrar conexão do anúncio, restrições, bloqueios, diária e resultado público, depois confirmar a transferência de preço, datas e hóspedes ao checkout quando disponível. O painel oferece configurações específicas para pesquisa, preços, cartões, formulários, cobrança e página de checkout. Mudanças de preço, política, integração, cobrança e publicação de novos agrupamentos devem partir dos valores e escolhas confirmados pela operação.
