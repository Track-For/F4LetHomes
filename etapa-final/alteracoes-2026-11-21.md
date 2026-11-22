# 4Let Homes · Etapa final · O que foi feito e o que falta

Atualizado em 22/11/2026. Tudo foi aplicado direto no painel da Stays (fletho.stays.net) e conferido no site público (www.f4let.com) logo depois de salvar. O registro cronológico original, item por item, está em `alteracoes-2026-11-21-v1-cronologico.md`.

## Situação geral

| Área | Situação |
|---|---|
| Identidade visual (fonte, cores, botões, campos) | No ar, site inteiro |
| Cabeçalho e rodapé | No ar, site inteiro |
| Home nova (visual do protótipo) | No ar, com animações e parallax |
| Busca (lista de hospedagens) | No ar |
| Páginas de empreendimento e de anúncio | No ar |
| Checkout | No ar (etapa de dados e hóspedes conferida; pagamento não testado) |
| Sobre nós | No ar, conteúdo reescrito em PT/EN/ES |
| Contato | No ar (só visual) |
| Proprietários | No ar, PT/EN/ES; falta o formulário com fotos |
| SEO técnico | Feito; restam limitações da Stays |
| Celular e tablet | **Nada foi testado em tela pequena** |
| Venda direta | **Bloqueada**: Mercado Pago em modo teste |
| Tarifas | **12 anúncios ficam sem diária a partir de 15/12/2026** |

---

# Parte 1 · O que foi feito

## 1. Identidade visual no site inteiro

- **Onde:** Editor do site → Editar HTML → `head_section` (template `67eafb6ee3339c6d519fc2a3`, antes vazio).
- **O que muda:**
  - Fonte Jost e fundo creme (#fcfaf6).
  - Texto e botões em marrom-escuro (#2b231d).
  - Cantos retos em botões, campos, cartões e janelas.
  - Ícones e etiquetas na paleta.
- **Seleções:** o texto das listas de seleção não sai mais em caixa alta. Isso corrigiu, por exemplo, o "EMAIL" da página de Contato.
- **Para ver o visual antigo só no seu navegador:** abrir qualquer página com `?id4l=0`, e `?id4l=1` para voltar.

## 2. Cabeçalho e rodapé

- **Cabeçalho, no computador:**
  - Largura total, menu à esquerda, logo no centro, e idioma/favoritos/chat/login à direita.
  - Na home fica transparente sobre a foto, com logo branco e degradê suave, e ganha fundo claro ao rolar.
- **Cabeçalho em telas menores:**
  - Entre 768 e 991 px, o mesmo desenho em versão compacta.
  - No celular, menu à esquerda, logo no centro e favoritos/chat à direita.
- **Rodapé:**
  - Fundo claro e 3 colunas alinhadas: Menu | Contatos | Redes sociais + Pagamento, com títulos em PT/EN/ES.
  - Instagram como botão com "@4lethomes".
  - Formas de pagamento em selos do mesmo tamanho. O logo da Cielo era branco e não aparecia; agora aparece.
  - Marca "4LET HOMES" grande e linha de copyright com espaço para o botão do WhatsApp.

## 3. Home nova

- **Como foi publicada:** um bloco "HTML - Inserção de código" no fim do hotsite **Homepage** mostra a home do protótipo e esconde por CSS os 6 blocos antigos. Os blocos antigos continuam salvos.
- **Conteúdo:**
  - Abertura com 4 fotos que se alternam e busca integrada à busca da Stays.
  - Faixa de cidades e "A edição de verão".
  - 5 destinos, "Como funciona", destaque da serra (Cerro Corá) e diário "Viva a Experiência".
  - Chamada para proprietários, que leva a /proprietarios.
  - Créditos das fotos.
  - Textos em PT/EN/ES.
- **Ajustes feitos depois de publicar:**
  - O botão "Encontrar hospedagem" saiu da abertura.
  - "Buracos" corrigidos na edição de verão.
  - A edição de verão ganhou uma nova disposição: título e texto numa linha, e as duas fotos lado a lado com a mesma altura.
  - Animações e parallax (ver item 4).
- **Busca:** testada com destino (Gostoso → 2 unidades) e com campos vazios (mostra todos os empreendimentos).

## 4. Home: animações e parallax

- **Entrada:** os blocos aparecem com fade e deslize ao entrar na tela, em sequência. As fotos da edição de verão e da serra se revelam com uma faixa da cor do fundo que se recolhe.
- **Parallax:**
  - A foto do topo se move mais devagar que a página.
  - O título do topo sobe e esmaece ao rolar.
  - As fotos da edição de verão, da serra e dos destinos deslizam dentro da moldura.
- **Acessibilidade:** quem tem "reduzir movimento" ligado no sistema vê a página parada. Sem JavaScript, tudo aparece normalmente.
- **Problema já resolvido:** a classe `in` da animação coincidia com uma classe da home e sobrepôs o título por alguns minutos. Foi corrigido com uma regra extra. Em mudanças futuras, usar outro nome de classe.

## 5. Busca (lista de hospedagens)

- **Página e filtros:** página mais larga (até 1360 px), com os filtros num painel creme fixo ao rolar.
- **Título:** "Encontramos X unidades" grande e leve.
- **Cartões em telas a partir de 1200 px:**
  - Três colunas: foto (36%) | informações | coluna de preço com "Ver detalhes".
  - Comodidades em 2 colunas e cartões com cerca de 290 px de altura.
- **Cartões entre 768 e 1199 px:** preço e botão ficam abaixo do texto.
- **Mesma aba:** clicar numa acomodação abre na mesma aba, mantendo datas e hóspedes no endereço. Ctrl/Cmd+clique continua abrindo nova aba. Isso também vale para as unidades na página do empreendimento.

## 6. Páginas de empreendimento e de anúncio

- **Galeria:** fotos mais altas e setas claras. Quando há uma foto só, ela ocupa a largura do conteúdo.
- **Layout:** texto à esquerda e painel de reserva (400 px) à direita, fixo ao rolar.
- **Empreendimento:**
  - "Escolha a unidade" logo abaixo do título, com cartões no estilo da busca.
  - Painel "Consulte datas e preços" à direita.
- **Anúncio:**
  - Título grande e características em etiquetas finas.
  - Regras com "sim" em verde-claro e "não" em terracota.
  - Comodidades com marcador discreto.
  - Painel com preço grande, "Reserve já" em destaque e subtotal alinhado.

## 7. Checkout

- **Título:** "Finalize sua reserva" (EN/ES).
- **Formulário:** painéis numerados (01 Dados pessoais, 02 Hóspedes…), campos no padrão do site e erros em terracota discreto, no lugar do verde forte.
- **Resumo:** fixo ao rolar, com "Total da reserva" em destaque.
- **Escopo:** só visual. Campos, validação e pagamento da Stays não mudaram.

## 8. Sobre nós

- **Texto:** os mesmos textos, reescritos no visual da home, em PT/EN/ES.
- **Estrutura:**
  - Abertura com foto do Verano Ponta Negra.
  - Faixa com 3 dados: 2018 · São Paulo/SP · Site e Booking.com.
  - Bloco "jornada do hóspede" com foto da Pousada Colina.
  - 4 etapas numeradas.
  - Botões "Ver acomodações" e "Fale conosco".
- **Fotos:** a foto do Unsplash saiu. As fotos agora são dos próprios anúncios na Stays e não exigem crédito.

## 9. Contato

- Título "Fale com a 4let" (EN/ES) com subtítulo.
- Painel "Atendimento" à esquerda, com WhatsApp e e-mail.
- Formulário à direita, com campos em linha fina.

## 10. Proprietários (www.f4let.com/pt/proprietarios, também /en e /es)

- **Conteúdo:**
  - Abertura e "O que fazemos": canais, Central de Reservas, check-in e manutenção.
  - Destinos e 3 passos.
  - Contato por WhatsApp e e-mail.
- **Qualquer cidade:** a seção de destinos agora diz "Seu imóvel pode estar em qualquer cidade". A lista termina com "Sua cidade · Novo destino" e há o botão "Cadastrar imóvel em outra cidade".
- **Descrição de SEO:** sem limitar a cidades, nos 3 idiomas.
- **Correções de layout:**
  - Largura total.
  - O título do bloco final era invisível (marrom sobre marrom); agora aparece.

## 11. SEO técnico

- **Auditoria:** título, description, H1 e canonical das 26 URLs do sitemap, nos 3 idiomas (78 páginas).
- **Grupo PK01J (Residencial Santo Antônio):** ganhou título e H1, que estavam vazios.
- **Títulos EN/ES de 9 anúncios:** ficaram iguais ao PT.
- **Política de Cancelamento:** traduzida para EN/ES.
- **Termos e Privacidade:** títulos e H1 em EN/ES.
- **Descriptions:** criadas para Cancelamento, Termos e Privacidade nos 3 idiomas.
- **Proprietários e Sobre nós:** têm SEO nos 3 idiomas.

---

# Parte 2 · O que falta

## A. Depende do cliente (pauta do café com o Lucio, 27/11)

1. **Tarifas a partir de 15/12/2026. Maior urgência.**
   - 12 anúncios ficam sem diária e somem da busca um dia depois da entrega prevista.
   - A lista está em `marco-intermediario/revalidacao-stays.md`.
2. **Mercado Pago em modo teste.**
   - As credenciais são TEST- e só aceitam cartão. Sem as credenciais de produção não há venda direta pelo site.
   - Perguntar se querem Pix.
3. **Termos e Condições:** trocar o "88h" pelo horário correto.
4. **Pedra Baleia:**
   - O calendário está bloqueado até out/2027. Quais datas podem abrir?
   - O nome está "Single" em PT e "Double/Duplo" em EN/ES. Qual é o certo?
5. **Rio das Ostras:** quando entra o anúncio. Quando entrar: conectar ao canal Site, criar o grupo e incluir na home, na busca e na lista de cidades.
6. **Fotos próprias:**
   - Pedir foto real da serra/Cerro Corá. Hoje a home usa foto da Wikimedia, que exige crédito.
   - Pedir fotos das cidades em geral, para eliminar os créditos de terceiros.
7. **Área do proprietário:** confirmar se o plano Stays inclui acesso do proprietário (extrato e calendário).
8. **Entrega final:**
   - Confirmar 14/12/2026 (data do pedido P00001 no Odoo).
   - Definir as 3 propriedades e as datas para o teste de busca (Anexo I, item b).
   - Na entrega, emitir a NF de R$ 1.000.
9. **Formulário do Anexo I** (cadastro de imóvel com até 5 fotos e aviso de privacidade, enviado ao e-mail do Lucio): precisa de um serviço externo que receba arquivos. Decidir qual usar. Até lá, o cadastro é feito por WhatsApp e e-mail.
10. **Extra opcional:** tracking com GTM + GA4, fora do contrato. Antes, confirmar se a Stays aceita a tag no site inteiro, incluindo o checkout.

## B. Depende do Luiz

- **DNS na GoDaddy (SPF + DKIM do Mandrill):**
  - Os registros estão prontos em `marco-intermediario/correcoes-2026-11-19.md`.
  - O Lucio já mandou o acesso. Falta fazer o login, porque o Claude não digita senha.
- **Testar no celular e no tablet** todas as páginas: home, busca, empreendimento, anúncio, checkout, Sobre nós, Contato e Proprietários. Nada foi testado em tela pequena, porque a janela do Chrome não encolhe pelo controle remoto.
- **Testar a etapa de pagamento do checkout:** preencher os dados e avançar até o pagamento, sem concluir. Se algo destoar do visual, mandar print.

## C. Ajustes possíveis no site (sem depender de ninguém)

- **Proprietários no menu:** pôr "Proprietários" no menu principal. Hoje a página só é acessada pela home.
- **Corpo de Termos e Privacidade em EN/ES:** os títulos já estão traduzidos, mas o texto segue em português. Os Termos só depois de corrigir o "88h".
- **Menu do rodapé em EN/ES:** os links (Termos, Privacidade, Cancelamento) aparecem em português nas versões EN e ES. É preciso ajustar o cadastro de menus da Stays.
- **Telefone e WhatsApp no rodapé e no Contato:** são texto fixo, sem link. Para ficarem clicáveis é preciso mexer no modelo do rodapé.
- **Descrições dos anúncios:** há parágrafos vazios que criam espaços grandes no texto. A limpeza é feita no cadastro de cada anúncio.
- **Hotsite "Nova home (prévia do protótipo)"** (`/nova-home-previa`, inativo): ficou redundante e pode ser apagado.
- **Efeitos em outras páginas:** dá para levar animações e parallax para Sobre nós e Proprietários, se o cliente gostar dos da home.
- **Arquivo local da home:** `nova-home/bloco-home-producao.html` está desatualizado (falta o ajuste dos "buracos", feito direto no painel). Antes de editar o bloco da home, partir da cópia `nova-home/home-no-ar-2026-11-22.html` ou do código do painel.

## D. Limitações da Stays (sem correção pelo painel)

- **Sitemap e robots.txt** são gerados pela Stays, e a URL vazia `/pt/home` entra no sitemap.
- **Contato** não tem campo de SEO, por ser página do sistema.
- **Sobre nós** tem um `<h1>` vazio vindo do modelo da página. Está escondido na tela, mas continua no HTML.
- **Textos fixos da Stays:**
  - "Please select an item in the list." aparece em inglês nos formulários.
  - "( NOITES)" aparece vazio na busca sem datas.
  - "| Rua…" sai no endereço dos cartões.
  - "POR / … / POR NOITE" no preço do anúncio.

---

# Parte 3 · Referência

## Onde fica cada coisa no painel

- **head_section** (todo o CSS e os scripts do site): Editor do site → Editar HTML → head_section (lápis).
- **Home:** Editor do site → Hotsites → Homepage → último bloco "HTML - Inserção de código".
- **Proprietários:** Editor do site → Hotsites → Proprietários (ID `6b0249551eab8c5e59953b36`) → bloco HTML. O SEO fica em "Configurações".
- **Sobre nós:** Editor do site → Páginas → Sobre nós (`/i/content-managment/page/6a2425c4779bbe13d9ff0b08`). Abas PT/EN/ES. Usar o botão `<>` para o modo código e sair dele antes de trocar de aba e salvar.

## Arquivos locais (pasta `etapa-final/`)

| Arquivo | O que é |
|---|---|
| `identidade/head_section.html` | Cópia completa do head_section no ar (630 linhas) |
| `identidade/head_section-v2…v13-backup.html` | Versões anteriores, uma antes de cada mudança |
| `identidade/reserva.css` | Empreendimento e anúncio |
| `identidade/busca-v2.css` | Cartões da busca |
| `identidade/rodape-v2.css` | Rodapé |
| `identidade/sobre-contato.css` | Sobre nós e Contato |
| `identidade/proprietarios-v2.css` | Layout de Proprietários |
| `identidade/checkout.css` | Checkout |
| `identidade/mesma-aba.html` | Script de abrir acomodações na mesma aba |
| `identidade/home-edicao-v2.css` | Nova disposição da edição de verão |
| `identidade/home-efeitos.html` | Animações e parallax da home |
| `sobre/sobre-{pt,en,es}.html` | Conteúdo novo da Sobre nós (antigo em `sobre/backup-sobre-*.html`) |
| `proprietarios/bloco-proprietarios.html` | Bloco atual de Proprietários (anterior em `-v1-backup.html`) |
| `paginas/cancelamento-{en,es}.html` | Traduções da Política de Cancelamento |
| `nova-home/home-no-ar-2026-11-22.html` | HTML da home no ar em 22/11 |

## Como desfazer

- **Qualquer mudança visual:** substituir o conteúdo do head_section pelo backup da versão anterior à mudança (`identidade/head_section-vN-backup.html`). Cada bloco também está marcado com um comentário e pode ser apagado sozinho.
- **Tudo de visual de uma vez:** esvaziar o head_section e salvar.
- **Home antiga:** apagar o último bloco HTML do hotsite Homepage.
- **Sobre nós antiga:** colar `sobre/backup-sobre-{pt,en,es}.html` de volta em cada aba.
