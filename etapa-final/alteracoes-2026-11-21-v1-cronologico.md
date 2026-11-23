# 4Let Homes · Etapa final · Alterações de 21/11/2026

Tudo aplicado direto no painel da Stays e conferido no site público (www.f4let.com) logo depois de salvar.

## 1. SEO técnico

Auditoria de título, description, H1 e canonical das 26 URLs do sitemap, nos 3 idiomas (78 páginas). Script em `scratchpad/seo.py`.

| Item | Antes | Depois |
|---|---|---|
| Grupo PK01J (Residencial Santo Antônio, Praia Grande) | Página sem `<title>` e com H1 vazio em PT/EN/ES | "4let Residencial Santo Antônio" nos 3 idiomas |
| Títulos EN/ES de 9 anúncios | "Standard - 01/02/03", "4let - Chalés Sonho de Verão - Standard" (4 iguais), "4let Pousada Colina Standard 03", Verano sem código | Iguais ao PT: VA05I, WU01I, WX01I, HZ01J (Colina), ZJ01I, ZJ02I, ZJ04I, ZJ06I (Chalés), VA09I (Verano T1905) |
| Política de Cancelamento EN/ES | Texto em português nas 3 línguas; título ES em português | Texto traduzido para inglês e espanhol, mesma formatação e imagem; títulos "Cancellation Policy" e "Política de Cancelación" |
| Termos e Condições EN/ES | `<title>` e H1 em português | "Terms and Conditions" e "Términos y Condiciones" |
| Política de Privacidade EN/ES | `<title>` e H1 em português | "Privacy Policy" e "Política de Privacidad" |
| Meta description de Cancelamento, Termos e Privacidade | Vazia | Escrita nos 3 idiomas |

Textos das traduções da Política de Cancelamento: `paginas/cancelamento-en.html` e `paginas/cancelamento-es.html`.

Já tinham description antes desta rodada: home (3 idiomas), Sobre nós, anúncios e grupos.

## 2. Não dá para corrigir pelo painel (limitação da Stays)

- **Sitemap e robots.txt** são gerados pela Stays. A URL `/pt/home` (vazia) entra no sitemap automaticamente.
- **Sobre nós** tem um `<h1>` vazio vindo do modelo da página, além do H1 do conteúdo. Efeito pequeno; corrigir exige reescrever o HTML do bloco. Fica para a modernização visual.
- **Contato** não tem campo de SEO (página do sistema).

## 3. Pendente, mas sem depender do Lucio

- **DNS GoDaddy (SPF + DKIM Mandrill):** registros prontos em `marco-intermediario/correcoes-2026-11-19.md`. Falta o login na GoDaddy (feito pelo Luiz no navegador).
- **Texto de Termos e Privacidade em EN/ES:** os títulos já estão traduzidos, o corpo segue em português. Termos só depois de corrigir o "88h".
- **Sobre nós** usa foto hospedada no Unsplash (link externo). Trocar por foto da biblioteca da Stays na modernização.

## 4. Nova home (visual do protótipo) montada na Stays, ainda inativa

- **Hotsite novo:** "Nova home (prévia do protótipo)", ID `6b02434e7bd7fe01b0baa537`, URL `/nova-home-previa`. Está **inativo**: o público recebe 404. A home atual não foi tocada.
- **Conteúdo:** um único bloco "HTML - Inserção de código" com abertura (4 fotos que se alternam), busca, faixa de cidades, edição de verão, 5 destinos, "como funciona", destaque da serra, diário "Viva a Experiência", chamada para proprietários e créditos das fotos. Textos em PT/EN/ES, trocados pelo `lang` da página.
- **Busca:** envia para a busca oficial da Stays (`/{idioma}/search` com `groups[]`, `from`, `to`, `persons`). Testado: datas AAAA-MM-DD funcionam, e campos vazios mostram todos os 6 empreendimentos.
- **Fotos:** 10 imagens otimizadas na pasta `NovaHome2026` do Gerenciador de mídias (`/media/<id>`). Originais em `nova-home/img/`.
- **Código:** `nova-home/bloco-final.html` (é o que está no ar no hotsite). CSS restrito a `#h4l`. O bloco de ajustes no final compensa o `html{font-size:10px}` e o `.row` do Bootstrap da Stays.
- **Diferenças em relação ao protótipo:** o cabeçalho e o rodapé são os da Stays (não dá para trocar só nesta página); a área do proprietário com dados fictícios ficou de fora; a chamada para proprietários leva à página de Contato até o formulário do Anexo I existir.
- **Para publicar:** ativar o hotsite para revisão por link e, depois da aprovação, trocar a home (mover o bloco para o hotsite Homepage ou definir este como página inicial).

## 5. Identidade visual aplicada no site inteiro (no ar)

- **Onde:** Editor do site → Editar HTML → `head_section` (antes vazio). Código em `identidade/head_section.html`; a versão de teste fica em `identidade/head_section-modo-teste.html`.
- **O que muda:** fonte Jost, fundo creme (#fcfaf6), texto e botões em marrom-escuro (#2b231d), menu em caixa alta espaçada, cantos retos em botões, campos, cartões e janelas, rodapé escuro, ícones e etiquetas na paleta. Disposição das páginas intacta.
- **Testado antes de ligar:** home, busca com datas, página de anúncio com painel de reserva, etapa de identificação do checkout.
- **Como desfazer:** apagar o conteúdo do `head_section` e salvar. Para ver o visual antigo só no seu navegador: abrir qualquer página com `?id4l=0` (e `?id4l=1` para voltar).

## 6. Página para proprietários (no ar)

- **Endereço:** www.f4let.com/pt/proprietarios (também /en e /es). Hotsite "Proprietários", ID `6b0249551eab8c5e59953b36`, ativo, com SEO nos 3 idiomas.
- **Conteúdo:** abertura, "O que fazemos" (canais Airbnb/Booking.com/Decolar e site, Central de Reservas e concierge, documentação de check-in, manutenção), destinos, 3 passos e contato por WhatsApp (31) 99680-2468 e e-mail reservas.br@f4let.com. Só fatos do site, do painel e do texto "Sobre nós"; nada de comissão ou números.
- **Código:** `proprietarios/bloco-proprietarios.html`.
- **Falta:** o formulário do Anexo I (até 5 fotos, aviso de privacidade, envio ao e-mail do Lucio) precisa de um serviço externo que receba arquivos; a página ainda não está no menu; a chamada da nova home ainda aponta para Contato.

## 7. Nova home no ar (substitui a home antiga)

- Um bloco "HTML - Inserção de código" foi adicionado ao hotsite **Homepage** (o último da lista). Ele mostra a home do protótipo de ponta a ponta e esconde por CSS os 6 blocos antigos (`data-block-id` 60c0c603…, 6a6b5fb8…, 6abd0adb…, 6a6a4bcb…, 6a7f3a6b…, 6afee07c…), que continuam salvos.
- **Desfazer:** apagar esse último bloco HTML da Homepage; a home antiga volta inteira.
- Código: `nova-home/bloco-home-producao.html` (+ regra de largura total no fim). Botão de proprietários aponta para /proprietarios.
- Testado no ar: PT e EN, abertura de ponta a ponta, busca com destino (Gostoso → 2 unidades).

## 8. Cabeçalho e rodapé como no protótipo (no ar)

- No `head_section` (código em `identidade/head_section.html`; versão anterior em `head_section-v2-backup.html`).
- **Cabeçalho (computador):** largura total, menu à esquerda, logo oficial no centro, idioma/favoritos/chat/login à direita. Na home fica transparente sobre a foto, com logo branco, e ganha fundo claro ao rolar. No celular segue o menu da Stays.
- **Rodapé:** fundo claro, linha fina, títulos pequenos em caixa alta, marca "4LET HOMES" grande e linha de copyright.
- Conferido na home (topo e rolando) e na busca.
- Degradê preto suave (160 px) só no topo da home, atrás do cabeçalho transparente; some ao rolar. "HOME" ativo em branco sobre a foto; contador de favoritos sem o quadrado claro.

## 9. Cabeçalho novo em todas as larguras

- Antes, abaixo de 992 px (meia tela, tablet, celular) aparecia o cabeçalho da Stays. Agora: 768–991 px com o mesmo desenho compacto; celular com menu à esquerda, logo no centro, favoritos/chat à direita. Backup anterior em `identidade/head_section-v3-backup.html`.
- Não testado em tela estreita: a janela do Chrome não encolhe pelo controle remoto e o site bloqueia iframe.

## 10. "Buracos" na home (pedido do cliente)

- Causa: na "edição de verão" a foto grande era retrato 4:5 (cerca de 1000 px de altura, quase só céu) e o texto ao lado começava com recuo de 140 px, deixando um vazio grande.
- Ajuste no bloco da home (fim do código): foto grande em 3:2 com enquadramento na praia, texto e foto menor (16:9) centralizados ao lado. Só em telas acima de 860 px; no celular segue empilhado.

- Botão "Encontrar hospedagem" removido da abertura (hero) da home, a pedido.

## 11. Página de busca (lista de hospedagens) no visual da home

- **Onde:** fim do `head_section` (código em `identidade/head_section.html`; versão anterior em `identidade/head_section-v4-backup.html`). Vale só para a página de busca (`body.__page_search`); o funcionamento da Stays não mudou.
- **Layout:** página mais larga (até 1360 px), filtros num painel creme com campos em linha fina, fixos ao rolar (telas grandes).
- **Título:** "Encontramos X unidades" grande e leve, com a linha de noites em caixa alta pequena.
- **Cartões:** sem caixa, separados por linhas finas; foto maior (40% da largura) com zoom suave ao passar o mouse; nome em 26 px; tipo (Pousada, Chalé) em caixa alta pequena; etiqueta "quartos restantes" com borda fina em vez do verde; comodidades em cinza com ícones discretos; "Veja mais amenities" como link sublinhado.
- **Preço e botão:** preço em 30 px abaixo do texto; a seta virou o botão "Ver detalhes" ("View stay" / "Ver alojamiento" em EN/ES).
- **Ajustes após conferir:** o par "Veja mais/Veja menos" aparecia junto (corrigido) e o botão ocupava a largura toda (agora do tamanho do texto).
- **Conferido no ar:** busca com todos os destinos (6 unidades), PT.
- **Não testado:** celular (a janela do Chrome não encolhe pelo controle remoto) e a busca com datas preenchidas.

## 12. Pauta do café com o Lucio (27/11)

1. **Tarifas a partir de 15/12/2026.** 12 anúncios ficam sem diária e somem da busca um dia depois da entrega prevista. Lista em `marco-intermediario/revalidacao-stays.md`. Maior urgência.
2. **Mercado Pago em modo teste.** Credenciais TEST- e só cartão. Sem credenciais de produção não há venda direta. Perguntar também se querem Pix.
3. **Termos:** horário correto no lugar de "88h".
4. **Pedra Baleia:** calendário bloqueado até out/2027. Quais datas podem abrir? E o nome: "Single" em PT, "Double/Duplo" em EN/ES. Qual é o certo?
5. **Rio das Ostras:** quando entra o anúncio e uma foto da cidade.
6. **Cerro Corá:** o mini banner usa a foto da piscina do Verano (Natal). Pedir foto da serra.
7. **Área do proprietário:** o plano Stays inclui acesso do proprietário (extrato e calendário)?
8. **Entrega final:** confirmar 14/12/2026 (data do pedido P00001 no Odoo) e as 3 propriedades + datas para o teste de busca (Anexo I, item b).
9. **Extra opcional:** tracking com GTM + GA4, fora do contrato. Antes, confirmar se a Stays aceita a tag no site inteiro.

## 13. Páginas de anúncio e de empreendimento no visual da home (22/11)

- **Onde:** fim do `head_section` (código em `identidade/reserva.css`; versão anterior em `identidade/head_section-v5-backup.html`). Vale para `/apartment/...` e `/building/...`; o funcionamento da reserva não mudou.
- **Galeria:** fotos mais altas (até 580 px) e setas em círculo claro, sem a fileira de pontinhos. Quando há uma foto só (caso do Residencial Santo Antônio), ela ocupa a largura do conteúdo em vez de deixar metade da tela vazia.
- **Colunas:** conteúdo até 1360 px, texto à esquerda e painel de reserva de 400 px à direita, fixo ao rolar.
- **Empreendimento:** "Escolha a unidade" logo abaixo do título, com cartões no estilo da busca (foto, tipo, comodidades, preço e botão "Ver detalhes"); painel "Consulte datas e preços" à direita. Textos em PT/EN/ES.
- **Anúncio:** título grande e leve, características em etiquetas com borda fina, descrição mais legível, regras em lista com "sim" em verde-claro e "não" em terracota, comodidades com marcador discreto, camas em cartões retos.
- **Painel de reserva:** preço grande, campos com linha fina, botão "Reserve já" em destaque, subtotal alinhado, E-mail/Chat discretos e comparação com Airbnb/Expedia em cinza.
- **Conferido no ar:** PK01J (PT), ZI01I (EN) e PK03J com datas preenchidas (subtotal e "Reserve já").
- **Não testado:** celular e tablet (a janela do Chrome não encolhe pelo controle remoto).

## 14. Busca: cartões reorganizados (22/11)

- **Onde:** fim do `head_section` (código em `identidade/busca-v2.css`; versão anterior em `identidade/head_section-v6-backup.html`).
- **Antes:** o preço caía para baixo do texto, a coluna de texto ficava estreita (comodidades quebrando em 3 linhas) e a foto esticava até ~530 px de altura.
- **Agora (telas a partir de 1200 px):** foto (36%) | informações | preço e "Ver detalhes" numa coluna de 200 px separada por linha fina, alinhados embaixo. Comodidades em 2 colunas; endereço menor. Cartões com ~290 px de altura.
- **768–1199 px:** foto e informações lado a lado, preço e botão em linha embaixo do texto. Celular: igual ao anterior (empilhado).
- **Conferido no ar:** busca com datas (PT), incluindo "Veja mais / Veja menos amenities".
- **Não testado:** tablet e celular.

## 15. Rodapé reorganizado (22/11)

- **Onde:** fim do `head_section` (código em `identidade/rodape-v2.css`; versão anterior em `identidade/head_section-v7-backup.html`). Vale para o site inteiro.
- **Causa do Instagram deslocado:** o modelo da Stays tem 4 colunas e a 2ª está vazia, empurrando o ícone para o meio da tela, sem título.
- **Agora:** 3 colunas alinhadas: Menu | Contatos | Redes sociais + Pagamento (títulos em PT/EN/ES). Instagram virou botão quadrado com "@4lethomes" ao lado, que escurece ao passar o mouse. Formas de pagamento em selos do mesmo tamanho; o logo da Cielo, antes branco e invisível, agora aparece. Ícones de contato alinhados. Linha de copyright com espaço para o botão do WhatsApp não cobrir o "powered by".
- **Celular:** colunas empilhadas, alinhadas à esquerda (não testado).
- **Conferido no ar:** PK01J (PT).

## 16. Sobre nós e Contato no visual do site (22/11)

**Sobre nós** (Editor do site → Páginas → Sobre nós, conteúdo PT/EN/ES reescrito; CSS no `head_section`)
- Antes: bloco com estilos fixos no texto (azul, Arial, cantos arredondados, faixas coloridas) e foto do Unsplash.
- Agora: mesmos textos, no visual da home: abertura com título grande e foto da piscina do Verano Ponta Negra; faixa com 3 dados (2018 · São Paulo/SP · Site e Booking.com); bloco "Cuidamos de toda a jornada do hóspede" com foto da Pousada Colina; 4 etapas numeradas (Reservas, Check-in, Suporte, Check-out); frase de fechamento com botões "Ver acomodações" e "Fale conosco".
- Fotos: dos próprios anúncios na Stays (`/image/d235/...`), sem link externo nem exigência de crédito.
- Código: `sobre/sobre-pt.html`, `sobre-en.html`, `sobre-es.html`. Conteúdo antigo: `sobre/backup-sobre-{pt,en,es}.html`.

**Contato** (só CSS; página do sistema)
- Título "Fale com a 4let" (EN "Get in touch", ES "Hable con nosotros") com subtítulo, no lugar de "ENTRE EM CONTATO CONOSCO!".
- Painel "Atendimento" à esquerda com as duas perguntas e "Prefere falar agora?" com WhatsApp e e-mail; formulário à direita com campos em linha fina e botão "Enviar mensagem" largo.

- CSS em `identidade/sobre-contato.css`; versão anterior do head_section em `identidade/head_section-v8-backup.html`.
- Conferido no ar: Sobre nós PT/EN/ES e Contato PT. Não testado no celular.

## 17. Proprietários: correções de layout (22/11)

- **Onde:** fim do `head_section` (código em `identidade/proprietarios-v2.css`; versão anterior em `identidade/head_section-v9-backup.html`). O bloco do hotsite não foi alterado.
- **Bug corrigido:** o título "Vamos conversar sobre o seu imóvel" (bloco escuro final) estava invisível: a regra antiga `[id^=C] h2` do head_section pintava o título de marrom sobre fundo marrom.
- **Layout:** a página saía numa caixa de ~1110 px (contêiner do hotsite). Agora ocupa a largura total como a home: abertura mais alta (até 820 px) e alinhada a 1360 px, bloco escuro de ponta a ponta, bloco de destinos mais compacto (1280 px, texto com menos recuo), títulos no peso leve do site.
- **Conferido no ar:** PT. Não testado no celular.

## 18. Checkout no visual da home (22/11)

- **Onde:** fim do `head_section` (código em `identidade/checkout.css`; versão anterior em `identidade/head_section-v10-backup.html`). Vale para `/customer/{idioma}/booking` (`body.__page_booking`). Só CSS: campos, validação e pagamento da Stays não mudaram.
- **Título** "Finalize sua reserva" (EN "Complete your booking", ES "Finalice su reserva").
- **Formulário:** painéis brancos com borda fina e numeração automática (01 Dados pessoais, 02 Hóspedes; os blocos seguintes numeram sozinhos), rótulos em caixa alta pequena, campos de 48 px no padrão do site, seleções sem caixa dupla, campos travados em creme. Aviso de erro em terracota discreto (antes verde forte). Botão "Continuar" grande, à direita.
- **Resumo da reserva:** cartão fixo ao rolar (400 px), foto, nome, datas e hóspedes, valores alinhados e "Total da reserva" em destaque (32 px).
- Também: o texto das seleções (bootstrap-select) deixou de sair em caixa alta no site inteiro (corrige o "EMAIL" da página de Contato).
- **Conferido no ar:** etapa de dados pessoais e hóspedes, PT, logado. Testado antes com CSS temporário na aba.
- **Não testado:** etapa de pagamento (exige preencher e enviar os dados), versão deslogada, EN/ES e celular.

## 19. Proprietários: imóvel em qualquer cidade (22/11)

- Seção de destinos reescrita (PT/EN/ES) no bloco do hotsite Proprietários: "Onde já estamos" · "Seu imóvel pode estar em qualquer cidade", texto dizendo que a 4let abre novas cidades, lista das cidades atuais com a linha final "Sua cidade · Novo destino" e botão "Cadastrar imóvel em outra cidade" (leva ao bloco de contato).
- Descrição de SEO do hotsite trocada nos 3 idiomas (antes citava só Natal, Gostoso, Cerro Corá, BH e Praia Grande).
- Código: `proprietarios/bloco-proprietarios.html`; versão anterior em `proprietarios/bloco-proprietarios-v1-backup.html`. Conferido no ar (PT).

## 20. Acomodações abrem na mesma aba (22/11)

- A Stays abre os cartões da busca e as unidades do empreendimento em nova aba (`target="_blank"`). Um script no fim do `head_section` (`identidade/mesma-aba.html`) faz o clique comum abrir na mesma aba, mantendo o endereço (com datas e hóspedes). Ctrl/Cmd+clique continua abrindo em nova aba. Vale só para links internos de `/apartment/` e `/building/`.
- Versão anterior do head_section: `identidade/head_section-v11-backup.html`.
- Conferido no ar: busca → empreendimento e empreendimento → unidade, ambos na mesma aba.

## 21. Home: nova disposição da "edição de verão" (22/11)

- **Onde:** fim do `head_section` (código em `identidade/home-edicao-v2.css`; versão anterior em `identidade/head_section-v12-backup.html`). O bloco da home não foi alterado; a regra só vale acima de 860 px (celular segue empilhado).
- **Antes:** foto grande à esquerda; título, texto e foto menor empilhados à direita, o que deixava espaços vazios.
- **Agora:** linha de abertura com "Temporada 2026/27 / A edição de verão" à esquerda e o texto + "Ver todas as acomodações" à direita; abaixo, as duas fotos lado a lado com a mesma altura (Gostoso 2/3, Forte dos Reis Magos 1/3), legendas mantidas.
- **Desfazer:** apagar o último bloco `<style>` do head_section (volta a versão do item 10).
- Cópia do HTML da home no ar antes da mudança: `nova-home/home-no-ar-2026-11-22.html` (o arquivo `bloco-home-producao.html` não tem o ajuste do item 10, feito direto no painel).

## 22. Home: animações de entrada e parallax (22/11)

- **Onde:** fim do `head_section` (código em `identidade/home-efeitos.html`; versão anterior em `identidade/head_section-v13-backup.html`). Só roda na home (`body.__page_index`).
- **Entrada:** título, textos, cartões de destinos, passos, diário e chamada para proprietários aparecem com fade + deslize de baixo para cima ao entrar na tela, em sequência (110 ms entre itens do mesmo grupo). As fotos da edição de verão e da serra se revelam com uma faixa da cor do fundo que se recolhe.
- **Parallax:** a foto do topo se move a 35% da rolagem e o título do topo sobe e esmaece ao rolar; as fotos da edição de verão, da serra e dos cartões de destinos deslizam levemente dentro da moldura.
- **Acessibilidade:** quem tem "reduzir movimento" ligado no sistema vê a página parada; sem JavaScript, tudo aparece normalmente (as classes só são aplicadas pelo script).
- **Correção no mesmo dia:** a classe `in` usada pela animação coincidia com `.hero .in` da home e sobrepôs o título e a linha "Hospedagem por temporada" por alguns minutos; corrigido com uma regra no fim do head_section.
- **Desfazer:** apagar os blocos `<style>`, `<script>` e `<style>` finais do head_section (os três marcados "home: animação de entrada e parallax" e "corrige colisão").
- Conferido no ar (computador, PT). Não testado no celular.

---

## 22/11/2026 (tarde) · Formulário do proprietário (Anexo I, item f)

- **Onde:** hotsite Proprietários (`/i/content-managment/hotsite/6b0249551eab8c5e59953b36`), seção "Cadastro de imóvel" (`#p4l-contato`). Código em `proprietarios/form-cadastro.html`; bloco completo em `proprietarios/bloco-proprietarios-v3.html`. Backup do bloco anterior: `proprietarios/bloco-proprietarios-v3-antes-backup.html`.
- **Campos:** nome, e-mail, telefone/WhatsApp, cidade/UF, endereço ou região, tipo de imóvel, quartos, capacidade de hóspedes, descrição, até 5 fotos (JPG/PNG/WEBP, até 5 MB cada) e aceite do aviso de privacidade (link para `/politica-de-privacidade`). PT/EN/ES.
- **Validação:** campos obrigatórios destacados, e-mail conferido, mensagem de erro e de sucesso ("Cadastro enviado", ao voltar com `?enviado=1`).
- **Envio:** FormSubmit (gratuito, sem conta) para `lucio.risi@vallues.co`, com confirmação automática ao proprietário (`_autoresponse`), modelo em tabela, proteção anti-spam (honeypot + reCAPTCHA do FormSubmit).
- **Fotos:** o FormSubmit limita 10 MB por envio. O formulário reduz cada foto no navegador para JPEG de até 1600 px (~250–400 KB) antes de enviar.
- **Testado no site:** validação com campos vazios; seleção de 3 fotos de 3000×2000 px reduzidas para ~253 KB cada e colocadas nos campos de envio. O envio real foi interceptado, nada foi mandado.
- **Ajuste visual:** espaçamento do campo "Tipo de imóvel" corrigido e publicado (o CSS da Stays zerava o padding do select).
- **Pendente:**
  - **Ativação do FormSubmit:** o primeiro envio dispara um e-mail de confirmação para o Lucio. Até ele clicar, os cadastros ficam retidos (30 dias, sem as fotos). Depois da ativação, trocar o e-mail no `action` pelo código aleatório que o FormSubmit envia.
  - **Aprovação do Lucio:** o Anexo I pede que o serviço de envio seja aprovado por ele, e que o aviso de privacidade seja fornecido por ele.
  - Fazer um envio de teste real depois da aprovação.

## 22/11/2026 (tarde) · Outros itens sem depender do Lucio

### Links internos (Anexo I, item a)
- Varredura de 94 páginas em PT/EN/ES (home, busca, proprietários, privacidade, anúncios, empreendimentos e o que elas linkam) com script próprio.
- **Nenhum link interno quebrado.** Os únicos 404 eram endereços inventados como ponto de partida do teste e um trecho de código lido como link por engano.

### Responsividade (Anexo I, item g)
- Teste em 390 e 768 px (1440 é a tela de trabalho) de: home, busca, empreendimento, anúncio, Contato, Sobre nós, Proprietários e Política de Privacidade. Como o site bloqueia ser aberto em quadro (`X-Frame-Options: DENY`), cada página foi carregada como conteúdo direto (`srcdoc`) num quadro da largura certa.
- **Problema achado e corrigido:** nas páginas de texto (Privacidade, Termos, Cancelamento) o menu móvel fechado da Stays fica fora da tela à direita e criava rolagem lateral (421 px a mais em 390 px). Corrigido com `html.id4l,html.id4l body{overflow-x:clip}` no head_section (`identidade/overflow-fix.html`). Depois disso, nenhuma página rola para o lado nas duas larguras.
- Formulário do proprietário conferido visualmente em 390 px: uma coluna, campos legíveis.
- **Ainda vale** abrir o site num celular de verdade (iPhone e Android) para conferir toque, teclado e o fluxo de reserva.

### GEO básico (cláusula 2.2)
- Dados estruturados JSON-LD (Organization + WebSite) no head_section, em todas as páginas: nome, site, logo, descrição, ano de início (2018), e-mail, telefone, Instagram (@4lethomes), as 5 cidades atendidas e idiomas de atendimento. Código em `identidade/geo-telefones.html`.

### Telefones clicáveis
- No rodapé (e no Contato, quando o número aparece como texto): o (31) 99680-2468 abre o WhatsApp e o (11) 95347-1786 abre a ligação. Conferido no site.

### Menu principal
- Item "Proprietários" / "Owners" / "Propietarios" adicionado ao "Menu Asuperior padrão", apontando para o hotsite Proprietários. Conferido nas três línguas.

### Backups desta etapa
- head_section antes do JSON-LD/telefones: `identidade/head_section-v19-backup.html`; antes da correção de rolagem: `identidade/head_section-v20-backup.html`.

## O que falta do contrato (situação em 22/11/2026, fim da tarde)

**Depende do Luiz:**
- DNS na GoDaddy (SPF/DKIM do Mandrill): fazer o login e aplicar os registros de `marco-intermediario/correcoes-2026-11-19.md`. Depois, testar login e recuperação de acesso (Anexo I, item e).
- Conferir o site num celular de verdade.
- Documentação técnica final para a entrega (este registro serve de base).

**Depende do Lucio:**
- Aprovar o FormSubmit e clicar na ativação; fornecer ou validar o aviso de privacidade do formulário.
- Tarifas a partir de 15/12/2026 (12 anúncios ficam sem diária).
- Credenciais de produção do Mercado Pago (e se quer Pix), para o teste de pagamento (item d).
- Corrigir o "88h" nos Termos; calendário e nome do Pedra Baleia.
- Indicar 3 propriedades e datas para o teste de busca (item b).
- Acesso ao Perfil da Empresa no Google (cláusula 2.2), ou registro de que não é elegível.
- Homologação final por escrito. Depois: cobrar R$ 1.000 e emitir a NF; começam a mensalidade de R$ 200 e a garantia de 30 dias.
- Registrar por escrito o novo prazo (14/12?) e as suspensões por pendências de terceiros (cláusula 4.1).

## 22/11/2026 (noite) · Mercado Pago de produção

- **Risco conferido:** a página de checkout (`/customer/pt/booking`) ainda expõe o access token do Mercado Pago no campo `signature` do `paymentMethods` (hoje `TEST-`, 72 caracteres). O Luiz decidiu não acionar a Stays. Cuidados combinados: registrar com o Lucio que o risco é conhecido, ativar alertas de estorno/pagamento no Mercado Pago e renovar o Access Token em caso de movimento estranho.
- **Conta certa:** as credenciais precisam ser da conta **VALLUESCO LTDA**, não da conta pessoal do Luiz (o dinheiro das reservas vai para a conta dona da aplicação).
- **Bloqueio atual:** na conta Valluesco, o acesso do Luiz (colaborador) não abre a área de integrações/credenciais (erro "Estamos com um problema"). O Luiz vai pedir ao Lucio a permissão de Integrações/Credenciais.
- **Próximos passos quando liberar:** Luiz copia a Public Key e o Access Token de produção e cola em Stays → App Center → Mercado Pago; depois tokenização = Não (aguardando ok), decisão sobre o acréscimo de 4,98%, verificar Pix e testar até a tela de pagamento (Anexo I, item d).

## 22/11/2026 (noite, continuação) · Mercado Pago em produção

- **Feito:** o Lucio liberou o acesso; o Luiz ativou as credenciais de produção da aplicação **VLC-F4LET** (nº 7596280370215606, conta VALLUESCO) e colou Public Key e Access Token na Stays (App Center → Mercado Pago → canal → Configurações de API). O checkout já usa `APP_USR-`.
- **Como está no ar:** só cartão de crédito, até 3x, com acréscimo de 4,98%. O canal da Stays não oferece Pix. Redirecionamento ao ambiente do Mercado Pago = Sim (testei "Não", não mudou nada e voltei).
- **Risco em aberto:** o access token de **produção** aparece no HTML público da página de reserva (campo `signature`). Não há ajuste no painel da Stays nem restrição no Mercado Pago que resolva. O Luiz não quer acionar a Stays.
- **Saídas levantadas (decisão adiada pelo Luiz):**
  - A) Ativar a API Externa da Stays (R$ 95/mês), cobrar por uma função na Vercel que guarda o token, com Checkout Pro (Pix + cartão) e webhook marcando a reserva paga. Em seguida, desativar o canal MP na Stays e renovar as credenciais.
  - B) Desativar o canal MP e cobrar por link de pagamento manual.
- **Teste de pagamento (item d):** chegou ao formulário de dados do hóspede. Falta preencher e clicar em Continuar para ver a tela de pagamento.

## 22/11/2026 (noite) · DNS na GoDaddy (SPF + DKIM do Mandrill)

- O Luiz fez o login na GoDaddy; eu apliquei os registros em Domínios → f4let.com → DNS. O backup do estado anterior está em `dns-godaddy-backup-2026-11-22.md`.
- **SPF (TXT @, editado):** `v=spf1 include:spf.protection.outlook.com include:spf.em.secureserver.net include:spf.mandrillapp.com ~all` (antes: `v=spf1 include:spf.em.secureserver.net ?all`).
- **CNAME criado:** `mte1._domainkey` → `dkim1.mandrillapp.com`.
- **CNAME criado:** `mte2._domainkey` → `dkim2.mandrillapp.com`.
- **Conferido:** os três aparecem no Google DNS (8.8.8.8) e no servidor da GoDaddy (ns23) logo após salvar. Nenhum outro registro foi alterado.
- **Próximo:** testar o código de login e a recuperação de acesso do site (Anexo I, item e) com um Gmail e um Outlook. O código deve chegar na caixa de entrada com `spf=pass` e `dkim=pass`.

## 22/11/2026 (noite) · Calendário da página do imóvel

- **Problema:** na página do imóvel (/apartment), o calendário de datas abria para cima e ficava atrás das fotos da galeria.
- **Causa:** o painel de reserva (`#panelBook`) é *sticky* e prendia o calendário numa camada abaixo da galeria.
- **Correção:** `html.id4l #panelBook{z-index:30}` no fim do head_section. O cabeçalho (z 50) continua por cima. Conferido no site público (4let Verano Ponta Negra).
- **Arquivos:** código em `identidade/calendario-fix.html`; backup anterior em `identidade/head_section-v21-backup.html`.

## 22/11/2026 (noite) · Acesso próprio do Luiz à Stays

- **Problema relatado pelo Lucio:** os usuários que ele criava ("Criar Acesso Básico") não apareciam na lista; com o Gmail do Luiz dava "O Login já pertence a outro usuário!".
- **Causa:**
  - O Gmail já existia como cadastro de **hóspede**, criado nos testes de reserva.
  - A lista de Usuários abre filtrada por administradores (`?admins=1`), e o acesso básico nasce sem permissão. Os usuários existiam, só não apareciam nesse filtro.
- **Feito pelo Luiz,** com o login master, porque o Claude Code bloqueia o assistente de conceder permissão de administrador:
  - Liberou `fhellippe04092001@gmail.com` (e `contato@trackfor.com.br`, se as permissões foram salvas) como **Administrador do sistema**, sem cartão de crédito e sem Financeiro.
- **Teste:** login com o Gmail em janela anônima às 17h55 entrou no painel.
- **A fazer:**
  - Confirmar o acesso ao Editor do site e ao App Center com o usuário próprio.
  - Testar o login do `contato@trackfor.com.br`.
  - Mandar a mensagem ao Lucio pedindo o ok por escrito.
  - No fim do projeto, o Lucio reduz ou remove esses acessos.

## O que falta do contrato (situação em 22/11/2026, noite)

Substitui a lista "fim da tarde" acima.

**Feito hoje à noite (sai da lista):**
- Credenciais de produção do Mercado Pago: aplicadas, o checkout usa `APP_USR-`.
- DNS da GoDaddy (SPF + DKIM do Mandrill): aplicado e conferido no DNS público.
- Calendário sobreposto pelas fotos: corrigido.
- Acesso próprio do Luiz à Stays: liberado.

**Depende do Luiz:**
- **Item e (login e recuperação de acesso):** no site, pedir o código de login de hóspede e a recuperação de senha com um Gmail e um Outlook. Conferir se chega na caixa de entrada com `SPF: PASS` e `DKIM: PASS`. Se não chegar com o DNS certo, o próximo suspeito é a verificação do domínio no Mandrill, que só a Stays faz.
- **Item d (pagamento):** preencher os dados do hóspede no checkout e ir até a tela do Mercado Pago, sem pagar. O teste parou no formulário.
- **Mercado Pago, decisão adiada:**
  - O access token de produção fica exposto no HTML do checkout.
  - Saída A: API Externa da Stays (R$ 95/mês) + função na Vercel + Checkout Pro com Pix.
  - Saída B: desativar o canal e cobrar por link manual.
  - Enquanto isso, ativar os alertas no Mercado Pago da Valluesco e decidir se mantém o acréscimo de 4,98% no cartão.
- Conferir o site num celular de verdade.
- Documentação técnica final para a entrega (este registro serve de base).
- Mandar ao Lucio a mensagem sobre os acessos à Stays.

**Depende do Lucio:**
- Confirmar por escrito os acessos de administrador liberados ao Luiz.
- Aprovar o FormSubmit e clicar na ativação; fornecer ou validar o aviso de privacidade do formulário.
- Tarifas a partir de 15/12/2026 (12 anúncios ficam sem diária).
- Decidir sobre o Pix (o canal da Stays só oferece cartão) e sobre o token exposto (saídas A ou B).
- Corrigir o "88h" nos Termos; calendário e nome do Pedra Baleia.
- Indicar 3 propriedades e datas para o teste de busca (item b).
- Acesso ao Perfil da Empresa no Google (cláusula 2.2), ou registro de que não é elegível.
- Homologação final por escrito. Depois: cobrar R$ 1.000 e emitir a NF; começam a mensalidade de R$ 200 e a garantia de 30 dias.
- Registrar por escrito o novo prazo (14/12?) e as suspensões por pendências de terceiros (cláusula 4.1).

## 22/11/2026 (noite) · Checkout preenche o endereço pelo CEP

- **Pedido do Luiz:** ao digitar o CEP no checkout, preencher o resto do endereço sozinho.
- **Como funciona:** quando o CEP tem 8 dígitos, um script no head_section consulta o ViaCEP (serviço gratuito, sem chave) e preenche Endereço, Bairro, Cidade, País (Brasil), Estado e UF. Depois o cursor vai para o Número. Se o país escolhido não for o Brasil, ou se o CEP não existir, o script não faz nada.
- **Detalhe técnico:** a Stays recarrega a lista de estados depois de trocar o país e apagava o estado escolhido. Por isso o script reaplica o estado durante 4 s.
- **Conferido no site público:** 59090-100 (Natal/RN), 30130-010 (Belo Horizonte/MG) e 01310-100 (São Paulo/SP).
- **Arquivos:** código em `identidade/cep-autofill.html`; backup anterior em `identidade/head_section-v22-backup.html`. Desfazer = apagar a última linha do head_section.

## 22/11/2026 (noite) · Botão "Aplicar" do código promocional

- **Problema:** no checkout, o botão "Aplicar" ficava estreito (a Stays limita a largura a 60 px), com o texto vazando para fora da borda, e desalinhado do campo.
- **Correção:** o campo e o botão ficam lado a lado e alinhados embaixo. O botão tem a mesma altura do campo (48 px), é preenchido em grafite com texto branco e não tem mais o limite de largura. O botão "×" (remover cupom aplicado) segue o mesmo estilo.
- **Arquivos:** `identidade/cupom-fix.css` (última linha do head_section); backup anterior em `identidade/head_section-v23-backup.html`.

## 22/11/2026 (noite) · Testes do Luiz: todos passaram

- **Item e (login e recuperação de acesso):** OK. O código chega por e-mail com o SPF e o DKIM novos.
- **Item d (pagamento):** OK. O fluxo chega à tela do Mercado Pago (sem pagamento real).
- **Celular de verdade:** OK.
- Também conferidos no fluxo real: o endereço preenchido pelo CEP e o botão "Aplicar" do cupom.

**O que ainda falta (situação em 22/11/2026, fim da noite):**
- Luiz: decidir o token exposto do Mercado Pago (A ou B) e o acréscimo de 4,98%; ligar os alertas no MP; documentação técnica final.
- Lucio: ativar o FormSubmit; tarifas a partir de 15/12; "88h" nos Termos e Pedra Baleia; foto do mini banner de Cerro Corá; 3 imóveis e datas para o item b; Perfil da Empresa no Google; confirmar os acessos de administrador; prazo por escrito; homologação final (depois: NF de R$ 1.000).

## 22/11/2026 (fim da noite) · Token do Mercado Pago retirado da Stays

- O Luiz tirou o access token de produção da Stays (guardou fora) e colocou um valor aleatório no lugar. O token deixa de aparecer no HTML do checkout.
- **Em aberto:**
  - O token antigo ficou público desde a ativação e continua válido até ser renovado no painel do Mercado Pago (app VLC-F4LET → Credenciais de produção).
  - Com o valor aleatório, o canal MP segue ativo, mas o pagamento falha no fim do checkout. Decidir: desativar o canal e cobrar por link (saída B) ou desligar a reserva instantânea até a saída A.

## 22/11/2026 (fim da noite) · Pagamento: decisão pelo checkout transparente e pesquisa da API da Stays

- **Decisão do Luiz:** checkout transparente do Mercado Pago (Payment Brick com cartão e Pix), numa página própria (`pagamento.f4let.com/<reserva>`) na Vercel, fora do checkout da Stays.
- **API Externa da Stays (https://stays.net/external-api/): é viável.**
  - `GET /external/v1/booking/reservations/{id}`: devolve `price._f_total`, `stats._f_totalPaid` e `type` (`reserved` = pré-reserva, `booked` = confirmada).
  - `POST .../reservations/{id}/payments`: lança o pagamento (`type: credit`, `status: completed`, `_f_val`, `paymentDate`, `_f_fee`).
  - `PATCH .../reservations/{id}`: muda `type` para `booked`. `DELETE` cancela.
  - Webhooks `reservation.created/modified/canceled`, assinados com RSA SHA256, com 3 tentativas. A resposta esperada é `{succeed:true}`.
  - Autenticação: Basic `client_id:client_secret`. As credenciais e a URL do webhook são pedidas ao suporte da Stays.
- **A confirmar:** sem o canal MP, se a reserva do site nasce como `reserved` e se a página final mostra o código (para redirecionar pelo head_section). Precisa de uma reserva de teste.
- **Pendências:** renovar o token de produção do MP; credenciais de teste do MP; pedir a API Externa à Stays (pelo Lucio); regras de parcelas, acréscimo, desconto no Pix e prazo de cancelamento; orçamento fora do contrato.
- **22/11/2026 ~21h:** o Luiz renovou as credenciais de produção da aplicação VLC-F4LET no Mercado Pago. O token que ficou público deixou de valer. O token novo não foi colado na Stays (o canal MP sai de lá) e vai só para a Vercel quando o transparente estiver pronto.
- **22/11/2026 ~21h15:** canal Mercado Pago marcado como **Não conectado** na Stays (App Center → Pagamento e Segurança → Mercado Pago; a mudança pede um código por e-mail, que o Luiz validou). O app MP continua "Ativo", e o canal pode ser reconectado no mesmo lugar. No checkout público, todos os `paymentMethods` estão vazios e nenhum token aparece no HTML. O app **Link de pagamento** já está ativo na Stays, para cobrar manualmente.
- **Falta ver:** o que o hóspede vê depois de "Continuar" sem canal de pagamento (se a reserva nasce como pré-reserva e qual é a tela final). Precisa de uma reserva de teste, a cancelar depois.

## 22/11/2026 (noite) · Checkout transparente desenvolvido (pasta `pagamento/`)

- **O que é:** página própria `pagamento.f4let.com/r/<código>` (Vercel) com o Payment Brick do Mercado Pago (cartão até 3x, débito e Pix), no visual do site, em PT/EN/ES. O valor vem da reserva na Stays. Com o pagamento aprovado, a função lança o pagamento na reserva e muda a reserva de `reserved` para `booked`.
- **Segurança:** o Access Token e as credenciais da Stays ficam só nas variáveis da Vercel. O webhook confere a assinatura do MP e reconsulta o pagamento. A confirmação não duplica (testado com chamadas simultâneas). A página não mostra dados pessoais do hóspede.
- **Testes:** 12 testes automatizados passando (`npm test`), com a Stays e o MP simulados; página conferida no navegador com reservas falsas (a pagar, já paga, em inglês).
- **Ligação com a Stays:** script `pagamento/integracao-stays/head_section-pagamento.html` (página de confirmação → página de pagamento). **Não instalado**; só depois do teste real.
- **Para ligar:** publicar na Vercel, criar o CNAME `pagamento` na GoDaddy e cadastrar `MP_PUBLIC_KEY`, `MP_ACCESS_TOKEN`, `MP_WEBHOOK_SECRET`, `STAYS_CLIENT_ID` e `STAYS_CLIENT_SECRET`. Passo a passo em `pagamento/README.md`.
