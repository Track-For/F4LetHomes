(function () {
  'use strict';

  // ---------- idioma ----------
  var params = new URLSearchParams(location.search);
  var lang = (params.get('lang') || document.documentElement.lang || navigator.language || 'pt').slice(0, 2).toLowerCase();
  if (['pt', 'en', 'es'].indexOf(lang) < 0) lang = 'pt';
  var LOCALE = { pt: 'pt-BR', en: 'en-US', es: 'es-AR' }[lang];

  var T = {
    pt: {
      secure: 'Pagamento seguro', title: 'Pagamento da reserva',
      lead: 'Confira os dados e escolha como pagar. A reserva é confirmada assim que o pagamento for aprovado.',
      testMode: 'Modo de teste: nenhum valor real será cobrado.',
      doneTitle: 'Reserva confirmada', doneText: 'Recebemos o seu pagamento. Você vai receber a confirmação por e-mail.',
      backSite: 'Voltar ao site', footer: 'Pagamento processado pelo Mercado Pago. A 4let Homes não armazena os dados do seu cartão.',
      reservation: 'Reserva', checkin: 'Check-in', checkout: 'Checkout', guests: 'Hóspedes', paid: 'Já pago', due: 'A pagar',
      nights: function (n) { return n === 1 ? '1 noite' : n + ' noites'; },
      noCode: 'Link de pagamento incompleto. Use o link que recebeu ao reservar ou fale com a gente.',
      notFound: 'Não encontramos esta reserva. Confira o link ou fale com a gente.',
      alreadyPaid: 'Esta reserva já está paga. Obrigado!',
      unavailable: 'Esta reserva não está disponível para pagamento (pode ter sido cancelada). Fale com a gente.',
      loadError: 'Não foi possível carregar o pagamento agora. Tente de novo em alguns minutos.',
      refused: 'O pagamento não foi aprovado. Confira os dados ou tente outro cartão ou o Pix.',
      waitingPix: 'Assim que o Pix for pago, esta página confirma a sua reserva sozinha.',
      retry: 'Tentar outra forma de pagamento',
    },
    en: {
      secure: 'Secure payment', title: 'Booking payment',
      lead: 'Check the details and choose how to pay. Your booking is confirmed as soon as the payment is approved.',
      testMode: 'Test mode: no real money will be charged.',
      doneTitle: 'Booking confirmed', doneText: 'We received your payment. You will get a confirmation by e-mail.',
      backSite: 'Back to the website', footer: 'Payment processed by Mercado Pago. 4let Homes does not store your card details.',
      reservation: 'Booking', checkin: 'Check-in', checkout: 'Check-out', guests: 'Guests', paid: 'Already paid', due: 'Amount due',
      nights: function (n) { return n === 1 ? '1 night' : n + ' nights'; },
      noCode: 'Incomplete payment link. Use the link you received when booking or contact us.',
      notFound: 'We could not find this booking. Check the link or contact us.',
      alreadyPaid: 'This booking is already paid. Thank you!',
      unavailable: 'This booking cannot be paid (it may have been cancelled). Please contact us.',
      loadError: 'We could not load the payment right now. Please try again in a few minutes.',
      refused: 'The payment was not approved. Check the details or try another card or Pix.',
      waitingPix: 'As soon as the Pix is paid, this page will confirm your booking automatically.',
      retry: 'Try another payment method',
    },
    es: {
      secure: 'Pago seguro', title: 'Pago de la reserva',
      lead: 'Revisa los datos y elige cómo pagar. La reserva se confirma en cuanto se apruebe el pago.',
      testMode: 'Modo de prueba: no se cobrará ningún valor real.',
      doneTitle: 'Reserva confirmada', doneText: 'Recibimos tu pago. Recibirás la confirmación por correo electrónico.',
      backSite: 'Volver al sitio', footer: 'Pago procesado por Mercado Pago. 4let Homes no almacena los datos de tu tarjeta.',
      reservation: 'Reserva', checkin: 'Check-in', checkout: 'Check-out', guests: 'Huéspedes', paid: 'Ya pagado', due: 'A pagar',
      nights: function (n) { return n === 1 ? '1 noche' : n + ' noches'; },
      noCode: 'Enlace de pago incompleto. Usa el enlace que recibiste al reservar o contáctanos.',
      notFound: 'No encontramos esta reserva. Revisa el enlace o contáctanos.',
      alreadyPaid: 'Esta reserva ya está pagada. ¡Gracias!',
      unavailable: 'Esta reserva no está disponible para pago (puede haber sido cancelada). Contáctanos.',
      loadError: 'No fue posible cargar el pago ahora. Inténtalo de nuevo en unos minutos.',
      refused: 'El pago no fue aprobado. Revisa los datos o prueba otra tarjeta o Pix.',
      waitingPix: 'En cuanto se pague el Pix, esta página confirmará tu reserva automáticamente.',
      retry: 'Probar otro medio de pago',
    },
  }[lang];

  document.documentElement.lang = LOCALE;
  document.title = T.title + ' · 4let Homes';
  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    var v = T[el.getAttribute('data-i18n')];
    if (typeof v === 'string') el.textContent = v;
  });

  // ---------- utilidades ----------
  var $ = function (id) { return document.getElementById(id); };
  var money = function (v, cur) { return new Intl.NumberFormat(LOCALE, { style: 'currency', currency: cur || 'BRL' }).format(v); };
  var date = function (iso) {
    var p = String(iso || '').split('-');
    if (p.length !== 3) return iso || '';
    return new Intl.DateTimeFormat(LOCALE, { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' })
      .format(new Date(Date.UTC(+p[0], +p[1] - 1, +p[2])));
  };
  var nights = function (a, b) { return Math.round((Date.parse(b) - Date.parse(a)) / 864e5); };
  var esc = function (s) { var d = document.createElement('div'); d.textContent = s == null ? '' : String(s); return d.innerHTML; };
  function msg(text, kind) { var m = $('message'); m.textContent = text; m.className = 'message' + (kind ? ' ' + kind : ''); m.hidden = !text; }
  function getJson(url) { return fetch(url, { headers: { Accept: 'application/json' } }).then(function (r) { return r.json().then(function (j) { j._status = r.status; return j; }); }); }
  function uuid() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) { var r = Math.random() * 16 | 0; return (c === 'x' ? r : (r & 3 | 8)).toString(16); });
  }

  // ---------- código da reserva: /r/CODIGO ou ?r=CODIGO ----------
  var m = location.pathname.match(/\/r\/([A-Za-z0-9]{4,16})\/?$/);
  var code = (m ? m[1] : params.get('r') || '').toUpperCase();

  var cfg, resv, bricks, paymentBrick, statusBrick, pollTimer;

  function renderSummary(r) {
    var n = nights(r.checkIn, r.checkOut);
    var html = '<h2>' + esc(r.listing || T.reservation) + '</h2>' +
      '<div class="code">' + esc(T.reservation) + ' ' + esc(r.code) + '</div><dl>' +
      '<div class="row"><dt>' + T.checkin + '</dt><dd>' + esc(date(r.checkIn)) + '</dd></div>' +
      '<div class="row"><dt>' + T.checkout + '</dt><dd>' + esc(date(r.checkOut)) + (n > 0 ? ' · ' + esc(T.nights(n)) : '') + '</dd></div>' +
      '<div class="row"><dt>' + T.guests + '</dt><dd>' + esc(r.guests) + '</dd></div>' +
      (r.paid > 0 ? '<div class="row"><dt>' + T.paid + '</dt><dd>' + esc(money(r.paid, r.currency)) + '</dd></div>' : '') +
      '</dl><div class="total"><span>' + T.due + '</span><strong>' + esc(money(Math.max(r.due, 0), r.currency)) + '</strong></div>';
    $('summary').innerHTML = html;
  }

  function showDone() {
    clearInterval(pollTimer);
    $('paymentBrick_container').innerHTML = '';
    msg('');
    $('done').hidden = false;
  }

  function retryButton() {
    var b = document.createElement('a');
    b.href = location.pathname + location.search;
    b.className = 'btn';
    b.style.marginTop = '18px';
    b.textContent = T.retry;
    $('statusScreenBrick_container').appendChild(b);
  }

  function poll(paymentId) {
    var tries = 0;
    clearInterval(pollTimer);
    pollTimer = setInterval(function () {
      if (++tries > 360) return clearInterval(pollTimer); // 30 min
      getJson('/api/payment-status?code=' + encodeURIComponent(code) + '&id=' + encodeURIComponent(paymentId))
        .then(function (s) {
          if (s.status === 'approved') showDone();
          else if (['rejected', 'cancelled', 'refunded', 'charged_back'].indexOf(s.status) >= 0) { clearInterval(pollTimer); msg(T.refused, 'error'); retryButton(); }
        })
        .catch(function () {});
    }, 5000);
  }

  function showStatus(paymentId, status) {
    if (paymentBrick) { try { paymentBrick.unmount(); } catch (e) {} }
    $('paymentBrick_container').innerHTML = '';
    if (status === 'approved') return showDone();
    bricks.create('statusScreen', 'statusScreenBrick_container', {
      initialization: { paymentId: paymentId },
      customization: { visual: { hideStatusDetails: false, hideTransactionDate: false, style: { theme: 'default' } } },
      callbacks: { onReady: function () {}, onError: function (e) { console.error(e); } },
    }).then(function (b) { statusBrick = b; });
    if (status === 'rejected' || status === 'cancelled') { msg(T.refused, 'error'); retryButton(); return; }
    msg(T.waitingPix);
    poll(paymentId);
  }

  function mountPayment() {
    var attemptId = uuid();
    return bricks.create('payment', 'paymentBrick_container', {
      initialization: { amount: resv.due },
      customization: {
        paymentMethods: { creditCard: 'all', debitCard: 'all', bankTransfer: ['pix'], maxInstallments: cfg.maxInstallments },
        visual: {
          style: {
            theme: 'default',
            customVariables: {
              baseColor: '#2b231d', baseColorFirstVariant: '#4a3f36', baseColorSecondVariant: '#7a6d61',
              textPrimaryColor: '#2b231d', textSecondaryColor: '#7a6d61', outlinePrimaryColor: '#e4dccf',
              formBackgroundColor: '#ffffff', borderRadiusSmall: '0px', borderRadiusMedium: '0px',
              borderRadiusLarge: '0px', borderRadiusFull: '0px', fontWeightNormal: '400', fontWeightSemiBold: '500',
            },
          },
        },
      },
      callbacks: {
        onReady: function () {},
        onError: function (e) {
          console.error('brick', e);
          if (e && e.type === 'critical') msg(T.loadError, 'error');
        },
        onSubmit: function (data) {
          msg('');
          return fetch('/api/process-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: code, selectedPaymentMethod: data.selectedPaymentMethod, formData: data.formData, attemptId: attemptId }),
          })
            .then(function (r) { return r.json().then(function (j) { j._status = r.status; return j; }); })
            .then(function (j) {
              if (j._status === 409 && j.error === 'already_paid') { showDone(); return; }
              if (j._status !== 200 || !j.id) { attemptId = uuid(); msg(T.refused, 'error'); throw new Error(j.error || 'payment_failed'); }
              showStatus(j.id, j.status);
            });
        },
      },
    }).then(function (b) { paymentBrick = b; });
  }

  function start() {
    $('brand').href = 'https://www.f4let.com/' + lang;
    if (!code) { $('summary').hidden = true; msg(T.noCode, 'error'); return; }

    Promise.all([getJson('/api/config'), getJson('/api/reservation?code=' + encodeURIComponent(code) + '&lang=' + lang)])
      .then(function (out) {
        cfg = out[0]; resv = out[1];
        if (cfg._status !== 200) throw new Error('config');
        if (cfg.siteUrl) { $('brand').href = cfg.siteUrl + '/' + lang; $('back-site').href = cfg.siteUrl + '/' + lang; }
        if (cfg.testMode) $('test-banner').hidden = false;
        if (resv._status === 404 || resv._status === 400) { $('summary').hidden = true; msg(T.notFound, 'error'); return; }
        if (resv._status !== 200) throw new Error('reservation');
        renderSummary(resv);
        if (resv.state === 'paid') { msg(T.alreadyPaid, 'ok'); return; }
        if (resv.state !== 'payable') { msg(T.unavailable, 'error'); return; }
        bricks = new window.MercadoPago(cfg.publicKey, { locale: LOCALE }).bricks();
        return mountPayment();
      })
      .catch(function (e) { console.error(e); msg(T.loadError, 'error'); });
  }

  start();
})();
