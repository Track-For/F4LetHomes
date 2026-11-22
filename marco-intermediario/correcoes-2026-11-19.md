# 4Let Homes | Validação dos fluxos e correções (19/11/2026)

**Track For · Marco intermediário (Cláusula 5.2-b e 5.3)**

Fiz a verificação no site público (www.f4let.com, PT/EN/ES), no HTML servido pela Stays e no DNS do domínio. Na primeira rodada não tive acesso ao painel da Stays. Na segunda rodada (19/11, 08h00–08h50) apliquei as correções direto no painel. O registro do que foi feito está logo abaixo. O diagnóstico original vem em seguida, a partir de "Resumo dos 5 problemas relatados".

## Registro de aplicação no painel da Stays (19/11/2026, 08h00–08h50)

Regra seguida: print ou anotação do valor antigo antes de cada mudança, validação no site público depois. Não mexi em tarifas, políticas de cancelamento, pagamentos nem cobrança.

### Situação final dos 5 problemas

| # | Problema | Situação após a sessão |
|---|---|---|
| 1 | Código de login não chega no e-mail | **Pendente (externo).** O DNS continua sem autorizar o Mandrill. Os 3 registros estão prontos abaixo; precisam ser aplicados por quem tem acesso à GoDaddy |
| 2 | Cliques em cidades (404/volta para a home) | **Corrigido.** Os 5 cards funcionam nas 3 línguas. Cabo Frio, que não tem mais imóvel, foi trocado por Praia Grande |
| 3 | Imóvel existe na Stays e não aparece no site | **Corrigido.** A causa era a falta de conexão no canal Site. Pedra Baleia, RSA Praia Grande e Verano T1905 entraram na busca |
| 4 | Imóvel pede e-mail ao dono ("Enviar pedido") | **Corrigido.** Reserva instantânea ligada em 7 unidades, com aprovação do Luiz. As 14 unidades estão em "Reserve já" |
| 5 | Depoimentos falsos na home | **Corrigido.** Os depoimentos foram removidos e o bloco "Viva a Experiência" está no ar em PT, EN e ES |

### 1. Cards de cidades da home (Editor do site → Hotsites → Homepage → 2 blocos "IMAGEM - Mini banner")

| Card | Valor antigo | Valor novo (PT; EN/ES com `/en/` e `/es/`) | Aceite (PT/EN/ES) |
|---|---|---|---|
| Natal | Tipo "acomodações" → prédio VA04I | Link → `/pt/search?groups%5B%5D=6a6a52bc6fa9c250b57c233a` | 200. A Stays redireciona para `/building/VA04I`, que lista VA03I + VA09I |
| Cabo Frio → **Praia Grande** | Título "Cabo Frio", tipo "acomodações", nenhum prédio (`href=""`), foto `cabo-frio.jpg` | Título "Praia Grande" (PT/EN/ES), Link → `/pt/search?groups%5B%5D=6afeddbaa04caa99cbe77cc1`, foto da praia de Praia Grande com o morro ao fundo (`/media/6afef42f6c856c35cb9c12ac/md`; Unsplash, de Josilene da Silva, Unsplash License; arquivo em `fotos-cidades/praia-grande.jpg`, créditos em `fotos-cidades/CREDITOS.md`). A primeira versão usava a foto da sala do imóvel e foi trocada a pedido do Luiz | 200. A Stays redireciona para `/building/PK01J` |
| Belo Horizonte | Tipo "acomodações" → prédio VA02I | Link → `/pt/search?groups%5B%5D=6a6a4f956fa9c250b57c04fb` | 200, vai para `/building/VA02I` |
| São Miguel do Gostoso | Link `https://www.f4let.com/pt/search?persons=1&cities[]=São Miguel do Gostoso` | Link → `/pt/search?groups%5B%5D=6a6a525dcdd0300a0c79db5a` | 200, lista Chalés + Pedra Baleia |
| Cerro Corá | Tipo "acomodações" → prédio VA06I | Link → `/pt/search?groups%5B%5D=6abd09350be9b8d9a48a84e0` | 200, vai para `/building/VA06I` |

**Cabo Frio (decisão do Luiz em 19/11):** a 4Let não tem mais imóveis em Cabo Frio. O anúncio antigo, VA07I "4let Cabo Frio" (Peró), já estava inativo e sem diárias e continua assim. Em vez de remover o card, troquei-o por Praia Grande. Também **desativei o grupo "Rio de Janeiro"** (`6a6a507b85a23af6292bb6ef`), que aparecia no filtro do site como "Cabo Frio". O filtro agora lista: Belo Horizonte, Cerro Corá, Natal, Praia Grande, São Miguel do Gostoso e Todos os Anúncios. Para desfazer, basta marcar Ativo = Sim no grupo.

**Rio das Ostras-RJ (vai entrar em breve):** o card ainda não foi criado. Sem imóvel publicado, ele levaria a uma busca vazia, o mesmo problema do Cabo Frio. Quando o anúncio estiver no ar:
1. conectar o anúncio no canal Site;
2. criar o grupo "Rio das Ostras" (Página web + Em destaque) e incluir o anúncio também em All Listings;
3. usar o espaço livre do 2º bloco de banners (hoje há 2 slots vazios, com os títulos-modelo "Minas Gerais" e "São Miguel do Gostoso"), com uma foto da cidade ou do imóvel e link para a busca do grupo;
4. ligar a reserva instantânea do anúncio.

Com isso a home fica com 3 cards em cada linha.

### 2. Imóveis que existiam e não apareciam (Channel Manager → Site Stays → Anúncios do site)

**Causa raiz confirmada:** três anúncios estavam **desconectados do canal Site**. O agrupamento não aparecia na busca porque a unidade não estava conectada.

| Anúncio | Antes | Depois |
|---|---|---|
| PK01J 4let RSA Praia Grande (agrupamento, nível propriedade) | Não conectado (`/pt/building/PK01J` = 404) | Conectado. `/pt/building/PK01J` = 200 |
| EE03J T4402PPB Pedra Baleia (unidade, nível acomodação) | Não conectado (o EE01J abria vazio) | Conectado. Aparece na busca sem datas |
| VA09I T1905VPN 4let Verano Ponta Negra (unidade) | Não conectado (fora de qualquer busca) | Conectado. Aparece dentro do Verano Ponta Negra |

**Grupos (Catálogo → Grupos):**

| Grupo | Antes | Depois |
|---|---|---|
| Natal (`6a6a52bc…233a`) | Só VA03I | VA03I + **VA09I** |
| **Praia Grande** (novo, `6afeddbaa04caa99cbe77cc1`) | Não existia | Criado com PK03J; Página web + Em destaque; título PT/EN/ES "Praia Grande". Já aparece no filtro "Selecionar localidade" |
| All Listings / "Todos os Anúncios" | Já tinha as 14 unidades | Sem alteração |
| São Miguel do Gostoso | Já tinha EE03J | Sem alteração; o problema era só a conexão |
| Rio de Janeiro ("Cabo Frio" no site) | Ativo, só com o VA07I inativo | **Desativado** (sai do filtro do site; não foi apagado) |

**Aceite da busca (2 hóspedes):**

| Busca | Prédios listados | Pedra Baleia | Santo Antônio |
|---|---|---|---|
| Sem datas | Colina, Chalés, Verano, Del Rey, **Pedra Baleia**, **RSA Praia Grande** | ✅ | ✅ |
| 08–10/12/2026 | Colina, Chalés, Verano, RSA Praia Grande | ❌ indisponível | ✅ |
| 10–14/01/2027 | Colina, Chalés, Del Rey | ❌ indisponível | ❌ indisponível |

As ausências com data **não vêm de configuração do site**:
- **EE03J (Pedra Baleia):** tem diária (R$ 660/noite), mas o calendário tem **bloqueios manuais** (ST03J, RK06J, OM01J, RG03J) que cobrem quase todo o período de nov/2026 a out/2027. A Central de Validação também aponta falta de tarifa a partir de 18/01/2027. Não alterei; a operação precisa liberar o calendário.
- **PK03J (Santo Antônio):** tem diária (R$ 259,75), mas está indisponível de 10 a 14/01 por ocupação ou bloqueio.
- **Verano (VA03I/VA09I) e Del Rey em parte das datas:** indisponíveis por ocupação, bloqueio ou falta de tarifa futura (os 12 anúncios sem tarifa estão listados em `revalidacao-stays.md`).

### 3. Depoimentos falsos → "Viva a Experiência"

- **Fotos:** `natal.jpg`, `tourinhos.jpg` e `pampulha.jpg` foram redimensionadas para 1600 px e **sem metadados EXIF**. A `tourinhos.jpg` original tinha coordenadas GPS do celular. Subi as 3 em Gerenciador de mídias → Galeria:
  - natal → `/media/6afee029a04caa99cbe7c3d2/md`
  - tourinhos → `/media/6afee029a04caa99cbe7c3d0/md`
  - pampulha → `/media/6afee029411145a006c33fb4/md`
  - Cerro Corá continua com `/media/6a76c1dbff5eb71c3b74660c/md` (foto do prédio; o ideal é uma foto da serra)
- **Home:** adicionei um bloco "HTML - Inserção de código" com `viva-a-experiencia/bloco-stays-multilingue.html` e **removi** o bloco "DEPOIMENTOS - Avaliações com foto e texto". Os textos removidos foram:
  - "Mariana S.": "Ótima experiência! O espaço estava organizado, confortável e exatamente como apresentado…"
  - "Rafael M.": "A hospedagem foi tranquila do início ao fim…"
  - "Camila R.": "Ambiente limpo, aconchegante e muito bem equipado…"
  - "Lucas R.": "Fui muito bem atendido e tive todo o suporte necessário…"
  - Havia também fotos de banco de imagens no lugar dos hóspedes.
- **Multilíngue:** o bloco HTML da Stays tem um único campo de código. O arquivo traz as 3 versões, e o CSS mostra só a da língua da página (`<html lang>`). EN e ES já saem traduzidos, com links para `/en/` e `/es/`. Fontes separadas: `bloco-stays-pt.html`, `bloco-stays-en.html`, `bloco-stays-es.html`.
- **Transfer do aeroporto:** **não publicado**, porque o serviço não está confirmado. O trecho está guardado em `viva-a-experiencia/bloco-transfer-pendente.html`.
- **Aceite:** o bloco aparece no lugar dos depoimentos nas 3 línguas. Os 12 links (4 por língua) respondem 200. Layout: 4 colunas em 1440 px, 2 colunas em 768 px e carrossel deslizante em 390 px. O botão flutuante do WhatsApp continua com a mensagem "Quero falar sobre reservas".

### 4. Reserva instantânea (Acomodações → [unidade] → Distribuição → Configurações sobre reservas)

Com aprovação do Luiz nesta sessão (19/11), mudei de **Individual → Não** para **Individual → Sim**:

| Unidade | Antes | Depois | Aceite (2 hóspedes) |
|---|---|---|---|
| WX01I Colina Duplo T8404 | Individual / Não | Individual / Sim | 08–10/12: **Reserve já**, R$ 742,00. Abre "Qual é o seu e-mail?" |
| HZ01J Colina Triplo T8403 | Individual / Não | Individual / Sim | 08–10/12: **Reserve já**, R$ 923,00 |
| ZJ04I Chalé T1303 | Individual / Não | Individual / Sim | 08–10/12: **Reserve já**, R$ 1.479,00 |
| VA01I BH Del Rey | Individual / Não | Individual / Sim | 10–14/01: **Reserve já**, R$ 1.112,00 |
| VA03I Verano P0604 | Individual / Não | Individual / Sim | (fora do roteiro original) |
| VA09I Verano T1905 | Individual / Não | Individual / Sim | (fora do roteiro original) |
| EE03J Pedra Baleia | Individual / Não | Individual / Sim | (calendário bloqueado nas datas de teste) |

As outras 7 unidades já estavam em Sim. Hoje as **14 de 14** estão com reserva instantânea. Para voltar alguma unidade ao modo pedido, é só marcar "Não" na mesma tela.

### 5. DNS / código de login

Conferido às 08h50: nada mudou. `TXT @ = "v=spf1 include:spf.em.secureserver.net ?all"`, `mte1._domainkey` e `mte2._domainkey` inexistentes. Sem acesso à GoDaddy nesta sessão. Os 3 registros da seção "1. Código de login por e-mail" continuam valendo e ainda falta o aviso à Stays.

### 6. Correções de conteúdo e SEO

| Item | Resultado |
|---|---|
| Sobre nós, H1 vazio | O título "Conheça a 4let Homes" / "Meet 4let Homes" / "Conozca 4let Homes" passou de H2 para **H1** (mesmo estilo inline, sem mudança visual) nas 3 línguas. O template ainda gera um `<h1>` vazio porque o campo "Título" da página está em branco; preenchê-lo duplicaria o título na tela |
| Política de Cancelamento, "Consumir" | **Já estava corrigido** ("Código de Defesa do Consumidor"). Sem alteração. Achado: as versões EN e ES da política estão **vazias** |
| Termos, "88h até 88h" | **Não alterado.** Confirmado no ar ("sair apenas entre as 88h até 88h, necessitamos de uma taxa…"). Falta o horário correto |
| Sitemap com `/pt/home` | Vem do hotsite "Home" (`/home`, ativo e **sem nenhum bloco**). Dá para desativá-lo no Editor do site → Hotsites, o que tira a URL do sitemap, mas `/pt/home` passaria a dar 404. Não desativei para não quebrar algum link externo; recomendo desativar depois de confirmar que nenhum anúncio usa essa URL |

### Novos pontos encontrados nesta sessão

- **VA09I com endereço errado:** cadastro "Rua da Campina, 140, **Apto. 604**", igual ao VA03I, sendo que o código é T1905.
- **Chalés Sonho de Verão:** o agrupamento tem 6 anúncios, mas só 4 vão para o site. LF05J (Standard) e LF06J (Premium) estão como rascunho.
- **6 agrupamentos em rascunho** na lista de acomodações (HB Verano, Wyndham Paulista, HB Serra etc.). Conferir se devem ser publicados ou arquivados.
- **Rolagem horizontal de 2 px no celular**, causada pelo cabeçalho mobile do template (botões de login e fechar menu). Já existia antes do bloco novo.
- **Política de Cancelamento sem versão EN/ES.**

### Verificação pública final (19/11, 08h50)

- Cards da home: **15 de 15** combinações (5 cards × 3 línguas) com HTTP 200. Conferido de novo depois da troca Cabo Frio → Praia Grande.
- Páginas: `/pt/building/PK01J`, `/pt/building/EE01J`, `/pt/apartment/EE03J`, `/pt/apartment/VA09I` e `/pt/apartment/PK03J` = 200.
- Sitemap: passou a incluir EE03J, EE01J, PK01J, PK03J e VA09I. `/pt/home` continua listada.
- Botões: WX01I, HZ01J, ZJ04I e VA01I = "Reserve já".
- DNS: sem mudança (pendente).

---

## Resumo dos 5 problemas relatados

| # | Problema relatado | Causa encontrada | Situação |
|---|---|---|---|
| 1 | Código de login não chega no e-mail | O DNS de f4let.com não autoriza o servidor de envio da Stays (Mandrill): SPF sem `spf.mandrillapp.com` e sem as chaves DKIM `mte1`/`mte2` | Correção pronta (DNS na GoDaddy + aviso à Stays) |
| 2 | Clique em cidade vai para 404 ou volta para a home | Card **Cabo Frio** com link vazio (volta para a home) em PT/EN/ES; grupo "Cabo Frio" sem nenhum imóvel; agrupamento **PK01J** retorna 404 | Correção pronta (editor da home + grupos) |
| 3 | Imóvel existe na Stays, mas não aparece no site | **Pedra Baleia** e **Residencial Santo Antônio (Praia Grande)** ficam fora da busca e de "Todos os Anúncios" | Correção pronta (canal Site + grupos) |
| 4 | Imóvel pede e-mail ao proprietário e não deixa finalizar | Reserva instantânea desligada no nível individual: **WX01I, HZ01J, ZJ04I** e agora também **VA01I** (em janeiro) | Correção pronta (configuração de reservas), depende de aprovação da operação |
| 5 | Depoimentos falsos na home | Os 4 depoimentos ("Mariana S.", "Rafael M.", "Camila R.", "Lucas R.") são textos genéricos sem hóspede real | **Substituição desenvolvida**: novo bloco "Viva a Experiência" com roteiros |

---

## 1. Código de login por e-mail

**Evidência (DNS consultado em 19/11):**

| Registro | Valor atual | O que deveria ter |
|---|---|---|
| SPF (TXT @) | `v=spf1 include:spf.em.secureserver.net ?all` | incluir `spf.mandrillapp.com` (Stays) e `spf.protection.outlook.com` (o MX é Microsoft 365) |
| DKIM `mte1._domainkey` | inexistente | CNAME → `dkim1.mandrillapp.com` |
| DKIM `mte2._domainkey` | inexistente | CNAME → `dkim2.mandrillapp.com` |
| DMARC | `p=none` | pode ficar assim por enquanto |
| MX | `f4let-com.mail.protection.outlook.com` | ok |

O site usa `reservas.br@f4let.com` como e-mail da operação. Se esse endereço for o remetente das mensagens automáticas, o código de login sai pela Stays (Mandrill) em nome de um domínio que não autoriza esse envio. Gmail, Outlook e afins tendem a mandar a mensagem para o spam ou descartá-la. A [documentação da Stays](https://academy.stays.net/pt-BR/support/solutions/articles/36000080446) exige exatamente esses registros.

**Correção (GoDaddy → DNS de f4let.com, servidores `domaincontrol.com`):**

1. **Editar** o TXT do SPF existente (não criar um segundo SPF):
   `v=spf1 include:spf.protection.outlook.com include:spf.em.secureserver.net include:spf.mandrillapp.com ~all`
2. Criar CNAME `mte1._domainkey` → `dkim1.mandrillapp.com`
3. Criar CNAME `mte2._domainkey` → `dkim2.mandrillapp.com`
4. Informar à Stays (chat ou sac@stays.net) o remetente desejado (ex.: `reservas.br@f4let.com`) e confirmar o e-mail "Verify your domain for Mandrill".

**Aceite:** pedir o código de login com um Gmail e um Outlook de teste. O código precisa chegar na caixa de entrada em até 2 minutos, com `spf=pass` e `dkim=pass` em "Mostrar original". Se continuar sem chegar com o DNS certo, abrir chamado na Stays com horário, e-mail testado e print. A Cláusula 3.3 exige esse registro.

## 2. Cliques em cidades (404 / volta para a home)

**Evidência (home PT, EN e ES):**

| Card | Link atual | Resultado |
|---|---|---|
| Natal | `/pt/building/VA04I` | ok (Verano Ponta Negra) |
| **Cabo Frio** | **vazio (`href=""`)** | **recarrega a home**. Não há nenhum imóvel em Cabo Frio, e o grupo "Cabo Frio" da busca retorna zero |
| Belo Horizonte | `/pt/building/VA02I` | ok |
| São Miguel do Gostoso | busca por cidade | abre só os Chalés; a Pedra Baleia fica de fora (ver item 3) |
| Cerro Corá | `/pt/building/VA06I` | **voltou a abrir (200)**. Em 18/11 retornava 404; o agrupamento foi conectado |

Ainda retornam 404: `/pt/building/PK01J` (RSA Praia Grande), `/pt/apartment/EE01J` e `/pt/apartment/PK01J`. Os dois últimos são códigos de agrupamento usados como unidade. Também há uma divergência: o filtro "Selecionar localidade" oferece **Cabo Frio**, sem imóveis, mas não oferece **Praia Grande**, que tem imóvel.

**Correção (Editor do site → Página inicial → bloco de banners de cidades), nas três línguas:**

- Card **Cabo Frio**: o único imóvel do litoral fora do RN é em **Praia Grande/SP** (Vila Mirim, PK03J). Recomendo trocar o card para **Praia Grande** com link `/pt/apartment/PK03J` (EN: `/en/...`, ES: `/es/...`). Se a 4Let estiver captando imóvel em Cabo Frio, outra opção é tirar o card até haver oferta. A decisão é do Lucio.
- Trocar os links dos cards para a **busca por grupo**, que mostra todos os imóveis da cidade e não só um prédio:
  - Natal → `/pt/search?groups%5B%5D=6a6a52bc6fa9c250b57c233a`
  - Belo Horizonte → `/pt/search?groups%5B%5D=6a6a4f956fa9c250b57c04fb`
  - São Miguel do Gostoso → `/pt/search?groups%5B%5D=6a6a525dcdd0300a0c79db5a`
  - Cerro Corá → `/pt/search?groups%5B%5D=6abd09350be9b8d9a48a84e0`
- **Grupos (Stays → Site → Grupos/Localidades):** excluir ou esvaziar "Cabo Frio" e criar "Praia Grande" com o PK03J.

**Aceite:** clicar nos 5 cards em PT, EN e ES. Nenhum pode voltar para a home nem dar 404, e cada um deve listar todos os imóveis da cidade.

## 3. Imóvel existe na Stays e não aparece no site

**Evidência:** a busca "Todos os Anúncios", com ou sem datas, lista só **Del Rey, Verano, Colina e Chalés**. Ficam de fora:

- **Pousada Pedra Baleia (EE01J / unidade EE03J, São Miguel do Gostoso):** a página do agrupamento abre, mas não lista a unidade e mostra "Todos os anúncios estão reservados" mesmo sem datas. A unidade EE03J só abre pelo link direto. O grupo "São Miguel do Gostoso" também não a inclui. Além disso, a Central de Validação aponta o T4402PPB (Pedra Baleia) sem tarifa a partir de 18/01/2027.
- **Residencial Santo Antônio (PK03J, Praia Grande):** abre pelo link direto e oferece "Reserve já", mas não aparece em nenhuma busca. O agrupamento PK01J não está conectado no canal Site (404), e não existe grupo "Praia Grande".

**Correção (Stays):**

1. **Distribuição → Anúncios do site:** conectar o agrupamento **PK01J** em nível propriedade e conferir se a unidade **EE03J** está vinculada e conectada dentro do EE01J.
2. **Grupos:** incluir a Pedra Baleia no grupo "São Miguel do Gostoso" e no "Todos os Anúncios". Incluir o Santo Antônio no novo grupo "Praia Grande" e no "Todos os Anúncios".
3. **Tarifas e calendário da EE03J:** conferir se há diária e se o calendário está aberto nas próximas datas.

**Aceite:** buscar sem datas e com 08–10/12 e 10–14/01 para 2 hóspedes. Pedra Baleia e Santo Antônio precisam aparecer na listagem e no filtro da cidade, e `/pt/building/PK01J` deve abrir.

## 4. Imóvel pede e-mail do proprietário e não finaliza no site

**Evidência (19/11, 2 hóspedes):** o botão exibido em cada unidade, lido direto do HTML:

| Unidade | 08–10/12 | 10–14/01 |
|---|---|---|
| WX01I Colina Duplo T8404 | **Enviar pedido** | – |
| HZ01J Colina Triplo T8403 | **Enviar pedido** | **Enviar pedido** |
| ZJ04I Chalé T1303 | **Enviar pedido** | **Enviar pedido** |
| **VA01I BH Del Rey** | – | **Enviar pedido** (caso novo) |
| WU01I, YM01I, VA05I, ZJ01I, ZJ02I, ZJ06I, PK03J | Reserve já | Reserve já (onde houve disponibilidade) |

"Enviar pedido" é o modo **solicitação de reserva** da Stays: o hóspede manda um pedido e espera a aprovação. Nos três primeiros, a configuração individual já tinha sido confirmada no painel em 18/11 como **Reserva instantânea → Individual → Não**. O VA01I precisa ser conferido.

**Correção (Stays → Acomodações → [unidade] → Distribuição → Configurações sobre reservas):** em WX01I, HZ01J, ZJ04I e VA01I, mudar a reserva instantânea para **Sim** ou "usar configuração geral". Antes, a operação precisa confirmar se algum proprietário exige aprovação prévia. Nesse caso, a unidade continua em solicitação e isso fica registrado como decisão comercial.

**Aceite:** repetir as mesmas datas. O botão deve mostrar **Reserve já** e avançar até a identificação do hóspede com unidade, datas e preço corretos.

## 5. Depoimentos falsos → "Viva a Experiência" com roteiros

**Entregue:**

- `viva-a-experiencia/bloco-stays.html`: bloco pronto para colar num componente HTML da home da Stays. O CSS fica isolado (`#viva4let`), não há dependências externas e o bloco se adapta a qualquer tela: 4 colunas no desktop, 2 no tablet e carrossel deslizante no celular.
- `viva-a-experiencia/previa.html`: prévia local, para abrir no navegador.

**Conteúdo:** quatro roteiros reais, cada um com link para a busca da cidade, o que liga o desejo à reserva:

1. **Natal:** Ponta Negra, Morro do Careca, buggy em Genipabu e lagoas.
2. **São Miguel do Gostoso:** kitesurf, falésias e piscinas de Tourinhos, centrinho da vila.
3. **Belo Horizonte:** Lagoa da Pampulha, Igrejinha de Niemeyer, Mercado Central.
4. **Cerro Corá:** serra, clima ameno e trilhas na Serra de Santana.

Mais uma faixa **"Chegou? A gente busca você no aeroporto"** que leva ao WhatsApp para combinar o transfer.

**Como aplicar:**

1. Subir `fotos-cidades/natal.jpg`, `tourinhos.jpg` e `pampulha.jpg` na mídia da Stays e trocar `IMG_NATAL`, `IMG_TOURINHOS` e `IMG_PAMPULHA` pelas URLs `/media/<id>/md`.
2. Na home, remover o componente de depoimentos e inserir um componente HTML no mesmo lugar, com o conteúdo do arquivo.
3. Repetir nas versões EN e ES; o texto traduzido fica para a próxima etapa, se o cliente quiser.

> **Atenção:** a faixa do transfer só pode ir ao ar se a 4Let tiver o serviço ou parceiro de verdade. Do contrário, troca um conteúdo falso por outro. Os nomes dos parceiros (transfer, passeios de buggy, escola de kite) precisam vir do Lucio. Quando vierem, cada roteiro pode ganhar o selo "com parceiro X".

**Aceite:** o bloco aparece no lugar dos depoimentos em 390, 768 e 1440 px. Os quatro links abrem a busca da cidade e o botão abre o WhatsApp com a mensagem pronta.

---

## Outros pontos de melhoria encontrados

| Ponto | Detalhe | Prioridade |
|---|---|---|
| Sitemap lista `/pt/home` | A rota abre sem o conteúdo principal; deveria ser `/pt/` | Média (SEO) |
| Sitemap sem a Pousada Pedra Baleia (EE03J) e com EE01J | Vai se resolver junto com o item 3 | Média |
| Catálogo sem datas mostra "( noites)" | Texto do template sem número de noites | Baixa |
| Sobre nós com H1 vazio | Usar "Conheça a 4let Homes" como H1 | Média (SEO) |
| Termos: "88h até 88h" | Faixa de horário errada numa regra publicada; pedir o texto certo à operação | Alta (jurídico) |
| Política de Cancelamento: "Código de Defesa do Consumir" | Erro de digitação | Baixa |
| 12 anúncios sem tarifa no futuro | Colina a partir de 15/12/2026; lista completa em `revalidacao-stays.md` | **Alta**: quando chegarem essas datas, os imóveis vão sumir da busca |
| Card de Cerro Corá usa foto de prédio | Para o roteiro de serra, pedir uma foto da paisagem da região | Baixa |
| Divergência de quartos no BH Del Rey | 1 quarto no card e 2 na descrição | Média |

## O que fica para a próxima etapa (dias 9–15)

- Checkout com pagamento (Mercado Pago ativo, "Canais de pagamento por anúncio" desativado). Requer um e-mail de teste autorizado para passar da identificação e ver os meios de pagamento.
- Recuperação de senha e "Minha reserva", depois do DNS de e-mail corrigido.
- Área do proprietário (formulário do Anexo I com 5 fotos, aviso de privacidade e envio para lucio.risi@vallues.co).
- Modernização visual das demais seções, SEO técnico (títulos, H1, sitemap, canonical) e as 2 rodadas de revisão.
- Comparação de busca com as 3 propriedades e datas de referência que o cliente precisa enviar (Anexo I, item b).

## O que preciso do cliente para liberar o marco

1. Acesso ao DNS da GoDaddy (ou alguém da 4Let aplica os 3 registros do item 1).
2. Decisão sobre o card de Cabo Frio: trocar por Praia Grande ou retirar.
3. Confirmação de quais unidades podem ter reserva instantânea (item 4).
4. Confirmação de que o transfer do aeroporto existe e nomes de parceiros, se houver.
5. As 3 propriedades e datas de referência para o teste de busca.
6. **Aprovação por escrito da continuidade**, para a liberação da parcela de R$ 600 (Cláusula 5.2-b).
