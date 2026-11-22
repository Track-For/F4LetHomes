import re, os
S = os.path.dirname(os.path.abspath(__file__))
P = '/Users/luiz/Documents/Projetos/F4LetHomes/etapa-final'
live = open(P + '/nova-home/home-no-ar-2026-11-22.html', encoding='utf-8').read()
blk = open(S + '/h4l.html', encoding='utf-8').read()
novas = open(S + '/novas.html', encoding='utf-8').read()
efeitos = open(P + '/identidade/home-efeitos.html', encoding='utf-8').read()

# estilos do site que valem para a home (identidade + bloco)
css = []
for m in re.finditer(r'<style[^>]*>(.*?)</style>', live, flags=re.S):
    c = m.group(1)
    if ('id4l' in c or '#h4l' in c) and '__page_search' not in c and 'appDetails' not in c \
       and 'checkout' not in c[:200] and 'sobre n' not in c[:80] and 'proprie' not in c[:80]:
        css.append(c)
css = '\n'.join(css).replace("@import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600&display=swap');", '')

def tag(fonte, nome):
    return '<span class="nv-tag"><b>%s</b> · %s</span>' % (nome, fonte)

GS = {'Natal': '6a6a52bc6fa9c250b57c233a', 'SMG': '6a6a525dcdd0300a0c79db5a', 'CC': '6abd09350be9b8d9a48a84e0',
      'BH': '6a6a4f956fa9c250b57c04fb', 'PG': '6afeddbaa04caa99cbe77cc1'}
def busca(g, frm='', to=''):
    q = 'groups%5B%5D=' + GS[g]
    if frm: q += '&from=%s&to=%s&persons=2' % (frm, to)
    return 'https://www.f4let.com/pt/search?' + q

# B: prova no topo
old = '<span class="cap"><span class="pt">Hospedagem por temporada · 5 destinos</span>'
assert old in blk
blk = blk.replace(old, '<span class="proof nv" id="i-b">' + tag('Seazone', 'B. Números de confiança') +
                  '<span>5 destinos</span><span>Reserva direta</span><span>Desde 2018</span></span><span class="cap" hidden><span class="pt">Hospedagem por temporada · 5 destinos</span>', 1)

# C: atalhos no lugar do letreiro
i = blk.find('<div class="ticker"'); j = blk.find('</div></div>', i) + len('</div></div>')
chips = ('<div class="chips nv" id="i-c">' + tag('Seazone', 'C. Atalhos de destino') + '<span>Ir direto para</span>'
         '<a href="%s" target="_blank" rel="noopener">Natal <i>praia</i></a>'
         '<a href="%s" target="_blank" rel="noopener">São Miguel do Gostoso <i>praia</i></a>'
         '<a href="%s" target="_blank" rel="noopener">Praia Grande <i>praia</i></a>'
         '<a href="%s" target="_blank" rel="noopener">Cerro Corá <i>serra</i></a>'
         '<a href="%s" target="_blank" rel="noopener">Belo Horizonte <i>cidade</i></a></div>') % (
             busca('Natal'), busca('SMG'), busca('PG'), busca('CC'), busca('BH'))
blk = blk[:i] + chips + blk[j:]

# E: ficha rápida nos destinos
facts = {'Verano Ponta Negra': 'Praia urbana · pôr do sol em Ponta Negra',
         'Chalés Sonho de Verão · Pousada Pedra Baleia': 'Praia · vento constante para kite',
         'Residencial Santo Antônio': 'Praia · litoral sul de São Paulo',
         'Colina Flamboyant': 'Serra · noites frescas',
         'BH Del Rey': 'Cidade · Pampulha e Mercado Central'}
for k, v in facts.items():
    old = '<span>%s</span></div><span class="arr"' % k
    assert old in blk, k
    blk = blk.replace(old, '<span>%s</span><span class="fact">%s</span></div><span class="arr"' % (k, v))
blk = blk.replace('<div class="row">', '<div class="row nv" id="i-e">' + tag('Meliá', 'E. Ficha rápida de cada destino'), 1)

# F + G depois dos 3 passos (fim da 1ª seção .sec)
i = blk.find('</ol>', blk.find('<ol class="how">')); i = blk.find('</div></section>', i) + len('</div></section>')
fg = ('''
	<section class="chan nv" id="i-f">''' + tag('Meliá', 'F. Faixa de canais') + '''<div class="wrap">
		<div><span class="cap">Onde você encontra a 4let</span><h2>Os mesmos imóveis, em todos os canais</h2>
		<p>Você pode reservar pelo Airbnb, pelo Booking.com ou pela Decolar. Reservando aqui, você fala direto com a nossa equipe.</p></div>
		<ul><li class="me"><b>Site 4let</b><small>Reserva direta</small></li><li><b>Airbnb</b><small>Anúncios ativos</small></li><li><b>Booking.com</b><small>Anúncios ativos</small></li><li><b>Decolar</b><small>Anúncios ativos</small></li></ul>
	</div></section>
	<section class="sec nv" id="i-g">''' + tag('Seazone', 'G. Datas que lotam') + '''<div class="wrap">
		<div class="row-head"><h2>Datas que lotam primeiro</h2><a class="lnk" href="https://www.f4let.com/pt/search" target="_blank" rel="noopener">Ver todas as datas</a></div>
		<div class="dates">
			<a href="%s" target="_blank" rel="noopener"><div class="ph" style="background-image:url('media/6b02446ba8df7a23c7a2da95.jpg')"></div><div class="bd"><span class="when">29 dez → 2 jan</span><h3>Réveillon em Natal</h3><p>Virada com a praia de Ponta Negra a poucos passos.</p><span class="go">Ver disponibilidade</span></div></a>
			<a href="%s" target="_blank" rel="noopener"><div class="ph" style="background-image:url('media/6b02446c7bd7fe01b0bac808.jpg')"></div><div class="bd"><span class="when">5 → 10 fev 2027</span><h3>Carnaval em Gostoso</h3><p>Cinco noites na vila, longe dos blocos lotados da capital.</p><span class="go">Ver disponibilidade</span></div></a>
			<a href="%s" target="_blank" rel="noopener"><div class="ph" style="background-image:url('media/6b02446bd4a62108d475bf64.jpg')"></div><div class="bd"><span class="when">Férias de julho</span><h3>Inverno na serra</h3><p>Cerro Corá com noites frescas e céu limpo para ver estrelas.</p><span class="go">Ver acomodações</span></div></a>
		</div>
	</div></section>''') % (busca('Natal', '2026-12-29', '2027-01-02'), busca('SMG', '2027-02-05', '2027-02-10'), busca('CC'))
blk = blk[:i] + fg + blk[i:]

# H: números no bloco do proprietário
old = '<a class="btn" href="/pt/proprietarios"'
assert old in blk
blk = blk.replace(old, '<div class="ownstats nv" id="i-h">' + tag('Seazone', 'H. Números para o proprietário') +
                  '<div><b>2018</b><small>no mercado desde</small></div><div><b>5</b><small>destinos</small></div><div><b>4</b><small>canais de venda</small></div></div>' + old, 1)

# I: CTA final antes dos créditos
old = '<div class="wrap"><p class="fine">'
assert old in blk
blk = blk.replace(old, '''<section class="final nv" id="i-i">''' + tag('Seazone', 'I. Chamada final') + '''<div class="wrap">
		<span class="cap muted">Próxima viagem</span><h2 class="h2">Pronto para escolher a sua casa?</h2>
		<p>Escolha o destino e as datas. A reserva é confirmada na hora, direto com a 4let.</p>
		<a class="btn" href="#h4l-busca">Buscar hospedagem</a></div></section>''' + old, 1)

# links relativos → site real; imagens → arquivos locais
blk = re.sub(r"url\('/media/([a-z0-9]+)'\)", r"url('media/\1.jpg')", blk)
blk = re.sub(r'href="/', 'href="https://www.f4let.com/', blk)
blk = blk.replace('data-p=', 'data-x=')
blk = re.sub(r'<a ([^>]*href="https://www\.f4let\.com[^"]*")', r'<a target="_blank" rel="noopener" \1', blk)
blk = blk.replace('action="/pt/search"', 'action="https://www.f4let.com/pt/search" target="_blank"')

header = '''<div id="pv-bar" class="nv">''' + tag('Seazone + Meliá', 'A. Faixa de aviso') + '''Reserva direta com a 4let<span class="sep">·</span>confirmação na hora<span class="sep">·</span>atendimento pelo WhatsApp<a href="#h4l-busca">Buscar datas</a></div>
<header id="pv-hd"><div class="in">
	<nav><a href="#">Home</a><a href="#">Acomodações</a><a href="#">Contato</a><a href="#">Sobre nós</a></nav>
	<a href="#"><img class="logo" src="media/logo.png" alt="4let Homes"></a>
	<div class="ut"><a href="#">PT</a><a href="#">Chat</a><a href="#">Login</a></div>
</div>
<div class="mini nv" id="i-d">''' + tag('Meliá', 'D. Busca fixa ao rolar') + '''<form action="https://www.f4let.com/pt/search" method="get" target="_blank">
	<label>Destino<select id="pv-dest" name="groups[]"><option value="">Todos os destinos</option><option value="%s">Natal, RN</option><option value="%s">São Miguel do Gostoso, RN</option><option value="%s">Cerro Corá, RN</option><option value="%s">Belo Horizonte, MG</option><option value="%s">Praia Grande, SP</option></select></label>
	<label>Check-in<input type="date" id="pv-from" name="from"></label>
	<label>Checkout<input type="date" id="pv-to" name="to"></label>
	<label>Hóspedes<select id="pv-persons" name="persons"><option>1</option><option selected>2</option><option>3</option><option>4</option><option>5</option><option>6</option></select></label>
	<button type="submit">Buscar</button>
</form></div></header>''' % (GS['Natal'], GS['SMG'], GS['CC'], GS['BH'], GS['PG'])

panel = '''<aside id="pv-panel" aria-label="O que mudou nesta prévia"><header><b>9 ideias novas (em azul)</b><button class="gh" id="pv-min" type="button" style="flex:0 0 auto;padding:6px 12px">Recolher</button></header>
<ol>
<li><a href="#pv-bar">Faixa de aviso no topo</a><small>Seazone e Meliá usam para promoções e vantagens</small></li>
<li><a href="#i-b">Números de confiança acima do título</a><small>Seazone: “+3.800 imóveis · 51 cidades”</small></li>
<li><a href="#i-c">Atalhos de destino abaixo da busca</a><small>Seazone, no lugar do letreiro que só passava</small></li>
<li><a href="#i-d">Busca fixa ao rolar a página</a><small>Meliá: role a página para ver aparecer no topo</small></li>
<li><a href="#i-e">Ficha rápida de cada destino</a><small>Meliá: faixa “moeda · idioma · clima”</small></li>
<li><a href="#i-f">Faixa escura com os canais de venda</a><small>Meliá: faixa “Conheça nossas marcas”</small></li>
<li><a href="#i-g">Datas que lotam primeiro</a><small>Seazone: “Destinos e eventos”, com busca já preenchida</small></li>
<li><a href="#i-h">Números no bloco do proprietário</a><small>Seazone: “Cases de sucesso”</small></li>
<li><a href="#i-i">Chamada final antes do rodapé</a><small>Seazone: “Pronto para a sua próxima aventura?”</small></li>
</ol>
<div class="row2"><button id="pv-tog" type="button">Ver sem marcações</button></div></aside>'''

script = '''<script>
(function(){var d=document.documentElement;d.lang="pt";d.classList.add("id4l","nv-on");document.body.classList.add("__page_index");
var hd=document.getElementById("pv-hd"),bar=document.getElementById("pv-bar"),hero=document.querySelector("#h4l .hero"),srch=document.getElementById("h4l-busca");
function sc(){var y=window.scrollY,b=bar.offsetHeight;hd.classList.toggle("solid",y>b+40);hd.style.top=y>b+40?"":b+"px";var s=srch.getBoundingClientRect();hd.classList.toggle("show-mini",s.bottom<70)}
window.addEventListener("scroll",sc,{passive:true});window.addEventListener("resize",sc);sc();
var t=document.getElementById("pv-tog");t.addEventListener("click",function(){var on=d.classList.toggle("nv-on");t.textContent=on?"Ver sem marcações":"Mostrar marcações"});
var p=document.getElementById("pv-panel"),m=document.getElementById("pv-min");m.addEventListener("click",function(){var x=p.classList.toggle("min");m.textContent=x?"Abrir":"Recolher"});
var f=document.getElementById("h4l-from"),g=document.getElementById("h4l-to");if(f){f.min=new Date().toISOString().slice(0,10);f.addEventListener("change",function(){g.min=f.value})}
})();
</script>'''

page = ('''<title>Prévia Home 4let</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600&display=swap">
<style>:root{color-scheme:light}html,body{background:#fcfaf6;color:#2b231d}body{overflow-x:hidden}
#h4l .hero{margin-top:0}</style>
<style>''' + css + '''</style>
''' + novas.replace('[[CSS]]', '') + efeitos + header + blk + '''
<footer id="pv-ft"><p><b>Prévia</b>: a home atual do f4let.com com as ideias novas marcadas em azul.<br><small>Os links de busca abrem o site real em outra aba. Nada disso está publicado.</small></p></footer>
''' + panel + script)
os.makedirs(S + '/prev4l', exist_ok=True)
open(S + '/prev4l/index.html', 'w', encoding='utf-8').write(page)
print(len(page))
