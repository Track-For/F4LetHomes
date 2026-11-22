import re, sys
D = '/Users/luiz/Documents/Projetos/F4LetHomes/etapa-final/nova-home/'
src = open(sys.argv[1], encoding='utf-8').read()   # bloco no ar (exato)
out_blk, out_head = D + 'bloco-home-v3.html', D + '../identidade/home-faixa-busca.html'

def t3(pt, en, es):
    return '<span class="pt">%s</span><span class="en">%s</span><span class="es">%s</span>' % (pt, en, es)
GS = {'Natal': '6a6a52bc6fa9c250b57c233a', 'SMG': '6a6a525dcdd0300a0c79db5a', 'CC': '6abd09350be9b8d9a48a84e0',
      'BH': '6a6a4f956fa9c250b57c04fb', 'PG': '6afeddbaa04caa99cbe77cc1'}
def lk(g, frm='', to=''):
    p = 'search?groups%5B%5D=' + GS[g]
    if frm: p += '&amp;from=%s&amp;to=%s&amp;persons=2' % (frm, to)
    return 'href="/pt/%s" data-p="%s"' % (p, p)
s = src

# B
old = '<span class="cap"><span class="pt">Hospedagem por temporada · 5 destinos</span><span class="en">Holiday homes · 5 destinations</span><span class="es">Alquiler vacacional · 5 destinos</span></span>'
assert old in s
s = s.replace(old, '<span class="proof"><span>%s</span><span>%s</span><span>%s</span></span>' % (
    t3('5 destinos', '5 destinations', '5 destinos'), t3('Reserva direta', 'Direct booking', 'Reserva directa'), t3('Desde 2018', 'Since 2018', 'Desde 2018')))

# C (no lugar do letreiro)
i = s.find('<div class="ticker"'); j = s.find('</div></div>', i) + len('</div></div>')
assert i > 0
praia, serra, cid = t3('praia', 'beach', 'playa'), t3('serra', 'hills', 'sierra'), t3('cidade', 'city', 'ciudad')
chips = '<div class="chips"><span class="lbl">%s</span>' % t3('Ir direto para', 'Go straight to', 'Ir directo a')
for g, nome, tg in [('Natal', 'Natal', praia), ('SMG', 'São Miguel do Gostoso', praia), ('PG', 'Praia Grande', praia), ('CC', 'Cerro Corá', serra), ('BH', 'Belo Horizonte', cid)]:
    chips += '<a %s>%s <i>%s</i></a>' % (lk(g), nome, tg)
s = s[:i] + chips + '</div>' + s[j:]

# E
facts = {'Verano Ponta Negra': t3('Praia urbana · pôr do sol em Ponta Negra', 'City beach · sunset at Ponta Negra', 'Playa urbana · atardecer en Ponta Negra'),
         'Chalés Sonho de Verão · Pousada Pedra Baleia': t3('Praia · vento constante para kite', 'Beach · steady wind for kitesurfing', 'Playa · viento constante para kite'),
         'Residencial Santo Antônio': t3('Praia · litoral sul de São Paulo', 'Beach · São Paulo south coast', 'Playa · litoral sur de São Paulo'),
         'Colina Flamboyant': t3('Serra · noites frescas', 'Hills · cool nights', 'Sierra · noches frescas'),
         'BH Del Rey': t3('Cidade · Pampulha e Mercado Central', 'City · Pampulha and Mercado Central', 'Ciudad · Pampulha y Mercado Central')}
for k, v in facts.items():
    old = '<span>%s</span></div><span class="arr"' % k
    assert old in s, k
    s = s.replace(old, '<span>%s</span><span class="fact">%s</span></div><span class="arr"' % (k, v))

# F + G depois dos 3 passos
i = s.find('</ol>', s.find('<ol class="how">')); i = s.find('</div></section>', i) + len('</div></section>')
ativos = t3('Anúncios ativos', 'Active listings', 'Anuncios activos')
fg = '''
	<section class="chan"><div class="wrap">
		<div><span class="cap">%s</span><h2>%s</h2><p>%s</p></div>
		<ul><li class="me"><b>Site 4let</b><small>%s</small></li><li><b>Airbnb</b><small>%s</small></li><li><b>Booking.com</b><small>%s</small></li><li><b>Decolar</b><small>%s</small></li></ul>
		</div></section>''' % (
    t3('Onde você encontra a 4let', 'Where to find 4let', 'Dónde encontrar 4let'),
    t3('Os mesmos imóveis, em todos os canais', 'The same homes, on every channel', 'Los mismos inmuebles, en todos los canales'),
    t3('Você pode reservar pelo Airbnb, pelo Booking.com ou pela Decolar. Reservando aqui, você fala direto com a nossa equipe.',
       'You can book on Airbnb, Booking.com or Decolar. Book here and you deal directly with our team.',
       'Puede reservar por Airbnb, Booking.com o Decolar. Reservando aquí, habla directamente con nuestro equipo.'),
    t3('Reserva direta', 'Direct booking', 'Reserva directa'), ativos, ativos, ativos)
disp = t3('Ver disponibilidade', 'Check availability', 'Ver disponibilidad')
cards = [
    (lk('Natal', '2026-12-29', '2027-01-02'), '6b02446ba8df7a23c7a2da95', t3('29 dez → 2 jan', 'Dec 29 → Jan 2', '29 dic → 2 ene'),
     t3('Réveillon em Natal', "New Year's Eve in Natal", 'Año Nuevo en Natal'),
     t3('Virada com a praia de Ponta Negra a poucos passos.', 'Ring in the new year a short walk from Ponta Negra beach.', 'La Nochevieja a pocos pasos de la playa de Ponta Negra.'), disp),
    (lk('SMG', '2027-02-05', '2027-02-10'), '6b02446c7bd7fe01b0bac808', t3('5 → 10 fev 2027', 'Feb 5 → 10, 2027', '5 → 10 feb 2027'),
     t3('Carnaval em Gostoso', 'Carnival in Gostoso', 'Carnaval en Gostoso'),
     t3('Cinco noites na vila, longe dos blocos lotados da capital.', 'Five nights in the village, away from the crowded city parades.', 'Cinco noches en el pueblo, lejos de las comparsas llenas de la capital.'), disp),
    (lk('CC'), '6b02446bd4a62108d475bf64', t3('Férias de julho', 'July holidays', 'Vacaciones de julio'),
     t3('Inverno na serra', 'Winter in the hills', 'Invierno en la sierra'),
     t3('Cerro Corá com noites frescas e céu limpo para ver estrelas.', 'Cerro Corá, with cool nights and clear skies for stargazing.', 'Cerro Corá, con noches frescas y cielo despejado para ver estrellas.'),
     t3('Ver acomodações', 'See stays', 'Ver alojamientos'))]
fg += '''
	<section class="sec"><div class="wrap">
		<div class="row-head"><h2>%s</h2><a class="lnk" href="/pt/search" data-p="search">%s</a></div>
		<div class="dates">''' % (t3('Datas que lotam primeiro', 'Dates that book up first', 'Fechas que se llenan primero'), t3('Ver todas as datas', 'See all dates', 'Ver todas las fechas'))
for href, img, when, h3, p, go in cards:
    fg += '''
			<a %s><div class="dph" style="background-image:url('/media/%s/md')"></div><div class="bd"><span class="when">%s</span><h3>%s</h3><p>%s</p><span class="go">%s</span></div></a>''' % (href, img, when, h3, p, go)
fg += '''
		</div>
		</div></section>'''
s = s[:i] + fg + s[i:]

# H
old = '<a class="btn" href="/pt/proprietarios"'
assert old in s
s = s.replace(old, '<div class="ownstats"><div><b>2018</b><small>%s</small></div><div><b>5</b><small>%s</small></div><div><b>4</b><small>%s</small></div></div>\n\t\t' % (
    t3('no mercado desde', 'in business since', 'en el mercado desde'), t3('destinos', 'destinations', 'destinos'), t3('canais de venda', 'sales channels', 'canales de venta')) + old, 1)

# I
old = '<div class="wrap"><p class="fine">'
assert old in s
s = s.replace(old, '''<section class="final"><div class="wrap">
		<span class="cap muted">%s</span><h2 class="h2">%s</h2><p>%s</p>
		<a class="btn" href="#h4l-busca">%s</a>
		</div></section>
	''' % (t3('Próxima viagem', 'Next trip', 'Próximo viaje'), t3('Pronto para escolher a sua casa?', 'Ready to pick your home?', '¿Listo para elegir su casa?'),
           t3('Escolha o destino e as datas. A reserva é confirmada na hora, direto com a 4let.', 'Pick a destination and dates. Your booking is confirmed instantly, directly with 4let.', 'Elija destino y fechas. La reserva se confirma al instante, directo con 4let.'),
           t3('Buscar hospedagem', 'Find a stay', 'Buscar alojamiento')) + old, 1)

css = '''
<style>
	/* referências Meliá/Seazone (22/11/2026): números, atalhos, ficha, canais, datas, proprietário, chamada final */
	#h4l .hero .proof{display:inline-flex;flex-wrap:wrap;align-items:center;font-size:11.2px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;text-shadow:0 1px 10px rgba(0,0,0,.4)}
	#h4l .hero .proof>span+span::before{content:"";display:inline-block;width:4px;height:4px;border-radius:50%;background:currentColor;margin:0 12px 2px;vertical-align:middle;opacity:.8}
	#h4l .chips{max-width:var(--max);margin:18px auto 0;padding:0 20px;display:flex;flex-wrap:wrap;align-items:center;gap:10px}
	#h4l .chips .lbl{font-size:11px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);margin-right:6px}
	#h4l .chips a{display:inline-flex;align-items:center;gap:8px;padding:9px 16px;border:1px solid var(--line);border-radius:999px;background:var(--paper);font-size:14px;color:var(--ink);transition:border-color .2s}
	#h4l .chips a:hover{border-color:var(--ink)}
	#h4l .chips a i{font-style:normal;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}
	#h4l .tile .fact{display:block;margin-top:6px;font-size:12px;letter-spacing:.06em;color:var(--muted)}
	#h4l .tile .fact::before{content:"";display:inline-block;width:14px;height:1px;background:currentColor;vertical-align:middle;margin-right:8px}
	#h4l .chan{margin-top:110px;background:var(--ink);color:var(--paper)}
	#h4l .chan .wrap{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.6fr);gap:48px;align-items:center;padding-top:64px;padding-bottom:64px}
	#h4l .chan h2{font-size:clamp(26px,2.6vw,36px);font-weight:300;line-height:1.15;color:var(--paper);margin:10px 0 0}
	#h4l .chan p{color:#d9cdb9;margin-top:12px;max-width:44ch}
	#h4l .chan .cap{color:#b5a898}
	#h4l .chan ul{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));border-left:1px solid rgba(252,250,246,.18)}
	#h4l .chan li{padding:22px 20px;border-right:1px solid rgba(252,250,246,.18);display:grid;gap:6px}
	#h4l .chan li b{font-size:19px;font-weight:400}
	#h4l .chan li small{font-size:12px;color:#b5a898;letter-spacing:.04em}
	#h4l .chan li.me{background:rgba(252,250,246,.07)}
	#h4l .dates{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;margin-top:40px}
	#h4l .dates>a{display:grid;grid-template-rows:auto 1fr;overflow:hidden;color:var(--ink);border:1px solid var(--line);background:var(--paper);transition:border-color .25s}
	#h4l .dates>a:hover{border-color:var(--ink)}
	#h4l .dates .dph{width:100%;aspect-ratio:16/10;background:var(--surface) center/cover no-repeat}
	#h4l .dates .bd{display:grid;gap:8px;padding:20px 22px 22px;align-content:start}
	#h4l .dates .when{font-size:11px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:var(--muted)}
	#h4l .dates h3{font-size:22px;font-weight:400;margin:0}
	#h4l .dates p{color:var(--muted);font-size:15px;margin:0}
	#h4l .dates .go{margin-top:6px;font-size:11px;font-weight:500;letter-spacing:.16em;text-transform:uppercase}
	#h4l .dates .go::after{content:" →"}
	#h4l .ownstats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));margin:12px auto 6px;width:100%;max-width:640px;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
	#h4l .ownstats div{padding:18px 10px;display:grid;gap:4px;justify-items:center}
	#h4l .ownstats div+div{border-left:1px solid var(--line)}
	#h4l .ownstats b{font-size:30px;font-weight:300;line-height:1}
	#h4l .ownstats small{font-size:12px;letter-spacing:.06em;color:var(--muted)}
	#h4l .final{padding:110px 0 120px;text-align:center}
	#h4l .final .wrap{display:grid;justify-items:center;gap:18px}
	#h4l .final p{color:var(--muted);max-width:46ch;margin:0}
	@media (max-width:900px){#h4l .chan .wrap{grid-template-columns:1fr;gap:28px}#h4l .chan ul{grid-template-columns:1fr 1fr}#h4l .chan li{border-bottom:1px solid rgba(252,250,246,.18)}#h4l .dates{grid-template-columns:1fr}}
</style>'''
s = s.rstrip() + '\n' + css + '\n'
assert '`' not in s
open(out_blk, 'w', encoding='utf-8').write(s)

head = '''<style>/* home: faixa de aviso no topo (A) e busca fixa ao rolar (D) */
#a4l{position:fixed;top:0;left:0;right:0;z-index:60;height:36px;display:flex;align-items:center;justify-content:center;gap:8px;padding:0 16px;background:#2b231d;color:#efe7da;font:400 13px/1 "Jost",ui-sans-serif,system-ui,sans-serif;white-space:nowrap;overflow:hidden}
#a4l a{color:#fff!important;text-decoration:underline;text-underline-offset:3px;margin-left:6px}
#a4l i{font-style:normal;opacity:.45}
html.id4l body.__page_index.has-a4l #header{top:36px!important}
#d4l{position:fixed;left:0;right:0;top:0;z-index:49;background:#fcfaf6;border-bottom:1px solid #e4dccf;box-shadow:0 8px 24px rgba(43,35,29,.08);opacity:0;visibility:hidden;transform:translateY(-8px);transition:opacity .25s,transform .25s,visibility 0s .25s}
#d4l.on{opacity:1;visibility:visible;transform:none;transition:opacity .25s,transform .25s}
#d4l form{display:grid;grid-template-columns:1.4fr 1fr 1fr .8fr auto;max-width:1360px;margin:0 auto;padding:0 20px}
#d4l label{display:flex;flex-direction:column;gap:2px;margin:0;padding:9px 14px;border-left:1px solid #e4dccf;font:500 10px "Jost",sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#7a6d61;min-width:0}
#d4l label:first-child{border-left:0;padding-left:0}
#d4l select,#d4l input{border:0;background:transparent;font:400 14px "Jost",sans-serif;color:#2b231d;padding:0;height:auto;min-width:0;letter-spacing:0;text-transform:none;box-shadow:none;outline-offset:2px}
#d4l button{align-self:center;margin-left:14px;padding:10px 22px;border:1px solid #2b231d;background:#2b231d;color:#fcfaf6;font:500 11px "Jost",sans-serif;letter-spacing:.16em;text-transform:uppercase;cursor:pointer}
#d4l button:hover{background:transparent;color:#2b231d}
@media (max-width:700px){#a4l .x{display:none}}
@media (max-width:860px){#d4l{display:none}}
</style>
<script>
/* home: faixa de aviso no topo (A) e busca fixa ao rolar (D) */
document.addEventListener("DOMContentLoaded",function(){var b=document.body,r=document.getElementById("h4l");if(!b.classList.contains("__page_index")||!r)return;
var l=(document.documentElement.lang||"pt").slice(0,2);var T={pt:["Reserva direta com a 4let","confirmação na hora","atendimento pelo WhatsApp","Buscar datas","Destino","Check-in","Checkout","Hóspedes","Buscar"],en:["Book direct with 4let","instant confirmation","support on WhatsApp","Search dates","Destination","Check-in","Checkout","Guests","Search"],es:["Reserva directa con 4let","confirmación al instante","atención por WhatsApp","Buscar fechas","Destino","Entrada","Salida","Huéspedes","Buscar"]};if(!T[l])l="pt";var t=T[l];
var a=document.createElement("div");a.id="a4l";a.innerHTML="<span>"+t[0]+'</span><i class="x">·</i><span class="x">'+t[1]+'</span><i class="x">·</i><span class="x">'+t[2]+'</span><a href="#h4l-busca">'+t[3]+"</a>";b.insertBefore(a,b.firstChild);b.classList.add("has-a4l");
var src=document.getElementById("h4l-dest"),d=document.createElement("div");d.id="d4l";d.setAttribute("aria-hidden","true");
d.innerHTML='<form action="/'+l+'/search" method="get"><label>'+t[4]+'<select name="groups[]" tabindex="-1"></select></label><label>'+t[5]+'<input type="date" name="from" tabindex="-1"></label><label>'+t[6]+'<input type="date" name="to" tabindex="-1"></label><label>'+t[7]+'<select name="persons" tabindex="-1"><option>1</option><option selected>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option></select></label><button type="submit" tabindex="-1">'+t[8]+"</button></form>";
if(src)d.querySelector("select").innerHTML=src.innerHTML;b.appendChild(d);var f=d.querySelector("[name=from]"),g=d.querySelector("[name=to]");f.min=new Date().toISOString().slice(0,10);f.addEventListener("change",function(){g.min=f.value;if(g.value&&g.value<=f.value)g.value=""});
var h=document.getElementById("header"),s=document.getElementById("h4l-busca"),tk=false;
function u(){tk=false;var hb=h?h.getBoundingClientRect().bottom:36,on=s&&s.getBoundingClientRect().bottom<hb;d.style.top=hb+"px";if(on!==d.classList.contains("on")){d.classList.toggle("on",on);d.setAttribute("aria-hidden",on?"false":"true");Array.prototype.forEach.call(d.querySelectorAll("select,input,button"),function(x){x.tabIndex=on?0:-1})}}
window.addEventListener("scroll",function(){if(!tk){tk=true;requestAnimationFrame(u)}},{passive:true});window.addEventListener("resize",u);u()});
</script>
'''
assert '`' not in head
open(out_head, 'w', encoding='utf-8').write(head)
print(len(s), len(head))
