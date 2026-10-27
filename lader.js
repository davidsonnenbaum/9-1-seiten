/* 9-1.at · Lader
   Holt den Inhalt einer Seite aus diesem Repository und setzt ihn in WordPress ein.
   In WordPress steht pro Seite nur:  <div data-n9-seite="NAME"></div>  plus dieses Script. */
(function () {
  var BASIS = 'https://davidsonnenbaum.github.io/9-1-seiten/seiten/';

  // Gemeinsame Navigation für alle Seiten. Neue Seite ins Menü: hier eine Zeile ergänzen.
  var MENUE = [
    ['/', 'Offener Brief'],
    ['/anliegen', 'Die 9 Anliegen'],
    ['/karte', 'Karte'],
    ['/geschichten', 'Geschichten'],
    ['/faq', 'Wer wir sind & FAQ']
  ];

  function navigation() {
    var pfad = location.pathname.replace(/\/+$/, '') || '/';
    var nav = document.createElement('nav');
    nav.id = 'n9-nav';
    nav.setAttribute('aria-label', 'Hauptmenü');
    var links = MENUE.map(function (m) {
      var aktiv = m[0] === pfad ? ' aria-current="page"' : '';
      return '<li><a href="' + m[0] + '"' + aktiv + '>' + m[1].replace('&', '&amp;') + '</a></li>';
    }).join('');
    nav.innerHTML =
      '<div class="n9n-wrap">' +
        '<a class="n9n-marke" href="/">9-1.at<span>Bewegung 9. Jänner</span></a>' +
        '<button class="n9n-knopf" type="button" aria-expanded="false" aria-controls="n9n-liste">' +
          '<span aria-hidden="true"></span>Menü</button>' +
        '<ul id="n9n-liste">' + links +
          '<li class="n9n-cta"><a href="/#n9-unterschreiben">Unterschreiben</a></li></ul>' +
      '</div>';
    var knopf = nav.querySelector('.n9n-knopf');
    knopf.addEventListener('click', function () {
      var offen = nav.classList.toggle('offen');
      knopf.setAttribute('aria-expanded', offen ? 'true' : 'false');
    });
    // Klick auf "Unterschreiben" auf der Startseite: Menü schließen, zum Formular scrollen
    nav.querySelector('.n9n-cta a').addEventListener('click', function (e) {
      var ziel = document.getElementById('n9-unterschreiben');
      nav.classList.remove('offen'); knopf.setAttribute('aria-expanded', 'false');
      if (ziel) { e.preventDefault(); ziel.scrollIntoView({ behavior: 'smooth' }); history.replaceState(null, '', '#n9-unterschreiben'); }
    });
    return nav;
  }

  function laden(platz) {
    var name = platz.getAttribute('data-n9-seite');
    if (!/^[a-z-]+$/.test(name || '') || platz.getAttribute('data-n9-geladen')) return;
    platz.setAttribute('data-n9-geladen', '1');

    fetch(BASIS + name + '.html', { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
      .then(function (html) {
        platz.innerHTML = html;
        if (!document.getElementById('n9-nav')) platz.insertBefore(navigation(), platz.firstChild);
        // Scripts, die per innerHTML eingesetzt werden, laufen nicht von selbst: neu anlegen
        var alte = platz.querySelectorAll('script');
        for (var i = 0; i < alte.length; i++) {
          var alt = alte[i], neu = document.createElement('script');
          for (var j = 0; j < alt.attributes.length; j++) neu.setAttribute(alt.attributes[j].name, alt.attributes[j].value);
          neu.text = alt.text;
          alt.parentNode.replaceChild(neu, alt);
        }
        platz.style.minHeight = '';
        if (location.hash) { var z = document.getElementById(location.hash.slice(1)); if (z) z.scrollIntoView(); }
      })
      .catch(function () {
        platz.style.minHeight = '';
        platz.innerHTML = '<p style="padding:48px 16px;text-align:center;font:17px/1.5 Arial,sans-serif">Die Seite konnte gerade nicht geladen werden. Bitte lade sie in einem Moment neu.</p>';
      });
  }

  // Das WordPress-Theme setzt zwischen Blöcken automatisch Abstände (z. B. vor dem Platzhalter,
  // weil davor der unsichtbare Vorschau-Text steht). Das ergab oben einen weißen Streifen: hier auf null setzen.
  if (!document.getElementById('n9-lader-stil')) {
    var stil = document.createElement('style');
    stil.id = 'n9-lader-stil';
    stil.textContent = '[data-n9-seite]{margin-top:0!important;margin-bottom:0!important;padding-top:0!important;padding-bottom:0!important}' +
      'p[hidden]:has(+ [data-n9-seite]){display:none!important}' +
      // Navigation
      '#n9-nav{position:relative;width:100vw;max-width:100vw;left:calc(50% - 50vw);margin:0;padding:0;background:#a30c25;color:#fff;' +
        'font:700 15px/1.3 "Helvetica Neue",Helvetica,Arial,system-ui,-apple-system,"Segoe UI",sans-serif;-webkit-font-smoothing:antialiased;text-align:left;z-index:5}' +
      '#n9-nav *{box-sizing:border-box;margin:0;padding:0}' +
      '#n9-nav .n9n-wrap{max-width:1200px;margin:0 auto;padding:0 24px;display:flex;align-items:center;justify-content:space-between;gap:20px;min-height:56px}' +
      '#n9-nav a{color:#fff;text-decoration:none}' +
      '#n9-nav .n9n-marke{font-size:18px;font-weight:800;letter-spacing:-.01em;white-space:nowrap;display:flex;align-items:baseline;gap:10px}' +
      '#n9-nav .n9n-marke span{font-size:13px;font-weight:700;opacity:.85;letter-spacing:.04em;text-transform:uppercase}' +
      '#n9-nav ul{list-style:none;display:flex;align-items:center;gap:4px;flex-wrap:wrap;justify-content:flex-end}' +
      '#n9-nav li a{display:block;padding:8px 12px;border-radius:5px;white-space:nowrap}' +
      '#n9-nav li a:hover,#n9-nav li a:focus-visible{background:rgba(255,255,255,.14);outline:none}' +
      '#n9-nav li a[aria-current]{background:rgba(255,255,255,.2)}' +
      '#n9-nav .n9n-cta a{background:#fff;color:#a30c25;margin-left:8px}' +
      '#n9-nav .n9n-cta a:hover,#n9-nav .n9n-cta a:focus-visible{background:#fdf0f2}' +
      '#n9-nav .n9n-knopf{display:none;align-items:center;gap:10px;background:none;border:2px solid rgba(255,255,255,.6);color:#fff;border-radius:5px;padding:7px 12px;font:inherit;cursor:pointer}' +
      '#n9-nav .n9n-knopf span,#n9-nav .n9n-knopf span::before,#n9-nav .n9n-knopf span::after{display:block;width:16px;height:2px;background:#fff;position:relative}' +
      '#n9-nav .n9n-knopf span::before,#n9-nav .n9n-knopf span::after{content:"";position:absolute;left:0}' +
      '#n9-nav .n9n-knopf span::before{top:-5px}#n9-nav .n9n-knopf span::after{top:5px}' +
      '@media (max-width:1000px){#n9-nav .n9n-marke span{display:none}}' +
      '@media (max-width:820px){' +
        '#n9-nav .n9n-wrap{flex-wrap:wrap;padding:0 16px;gap:0}' +
        '#n9-nav .n9n-marke span{display:inline}' +
        '#n9-nav .n9n-knopf{display:inline-flex}' +
        '#n9-nav ul{display:none;width:100%;flex-direction:column;align-items:stretch;gap:2px;padding:4px 0 14px}' +
        '#n9-nav.offen ul{display:flex}' +
        '#n9-nav li a{padding:12px 10px;font-size:17px}' +
        '#n9-nav .n9n-cta a{margin:8px 0 0;text-align:center}}' +
      '@media (max-width:380px){#n9-nav .n9n-marke span{display:none}}';
    document.head.appendChild(stil);
  }

  var plaetze = document.querySelectorAll('[data-n9-seite]');
  for (var i = 0; i < plaetze.length; i++) {
    var v = plaetze[i].previousElementSibling;
    if (v && v.tagName === 'P' && v.hasAttribute('hidden')) v.style.setProperty('display', 'none', 'important');
    laden(plaetze[i]);
  }
})();
