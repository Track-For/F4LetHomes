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
- **Pendente:**
  - Ajuste visual do campo "Tipo de imóvel" (espaçamento interno) está pronto no arquivo local (`bloco-proprietarios-v3-colar.html`), mas **não foi colado no painel**.
  - **Ativação do FormSubmit:** o primeiro envio dispara um e-mail de confirmação para o Lucio. Até ele clicar, os cadastros ficam retidos (30 dias, sem as fotos). Depois da ativação, trocar o e-mail no `action` pelo código aleatório que o FormSubmit envia.
  - **Aprovação do Lucio:** o Anexo I pede que o serviço de envio seja aprovado por ele, e que o aviso de privacidade seja fornecido por ele.
  - Fazer um envio de teste real depois da aprovação.

## O que falta do contrato (situação em 22/11/2026, 12h40)

**Sem depender do Lucio (não iniciado nesta sessão):**
- Teste de responsividade em 390, 768 e 1440 px (Anexo I, item g).
- Checagem de links internos quebrados (item a).
- GEO básico (dados estruturados da empresa no head_section).
- "Proprietários" no menu principal; telefones clicáveis no rodapé e no Contato.
- DNS na GoDaddy (SPF/DKIM do Mandrill): login do Luiz.
- Documentação técnica final para a entrega.

**Depende do Lucio:** aprovação do FormSubmit e ativação; aviso de privacidade; tarifas a partir de 15/12; credenciais de produção do Mercado Pago (Pix?); "88h" nos Termos; calendário Pedra Baleia; 3 propriedades e datas para o teste de busca; acesso ao Perfil da Empresa no Google; homologação final por escrito (depois: R$ 1.000, mensalidade e garantia de 30 dias).
