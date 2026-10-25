/* 9-1.at · Lader
   Holt den Inhalt einer Seite aus diesem Repository und setzt ihn in WordPress ein.
   In WordPress steht pro Seite nur:  <div data-n9-seite="NAME"></div>  plus dieses Script. */
(function () {
  var BASIS = 'https://davidsonnenbaum.github.io/9-1-seiten/seiten/';

  function laden(platz) {
    var name = platz.getAttribute('data-n9-seite');
    if (!/^[a-z-]+$/.test(name || '') || platz.getAttribute('data-n9-geladen')) return;
    platz.setAttribute('data-n9-geladen', '1');

    fetch(BASIS + name + '.html', { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
      .then(function (html) {
        platz.innerHTML = html;
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
        platz.innerHTML = '<p style="padding:48px 16px;text-align:center;font:17px/1.5 Arial,sans-serif">Die Seite konnte gerade nicht geladen werden. Bitte laden Sie sie in einem Moment neu.</p>';
      });
  }

  var plaetze = document.querySelectorAll('[data-n9-seite]');
  for (var i = 0; i < plaetze.length; i++) laden(plaetze[i]);
})();
