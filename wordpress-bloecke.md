# Blöcke für WordPress

Die Navigation oben (Offener Brief, Anliegen, Karte, Geschichten, Wer wir sind & FAQ, Unterschreiben) setzt `lader.js` auf jeder Seite automatisch ein. Menüpunkte ändern: Liste `MENUE` in `lader.js`.

Jeweils als Block **„Individuelles HTML"** einfügen (alten Inhalt der Seite ersetzen). Das ist nur einmal nötig.

## Startseite

```html
<p hidden aria-hidden="true">Für diese 9 Anliegen werden wir jetzt #zamhalten. Unterschreib den offenen Brief und sei am 9. Jänner dabei.</p>
<div data-n9-seite="startseite" style="min-height:100vh"></div>
<script src="https://davidsonnenbaum.github.io/9-1-seiten/lader.js" defer></script>
```

## Anliegen

```html
<p hidden aria-hidden="true">Die 9 Anliegen mit Fakten und Quellen: Wohnraum, Strom, Pflege, Medizin, Hitze, Dürre, Mitsprache, Rechenzentren, gerechte Steuern.</p>
<div data-n9-seite="anliegen" style="min-height:100vh"></div>
<script src="https://davidsonnenbaum.github.io/9-1-seiten/lader.js" defer></script>
```

## Karte

```html
<p hidden aria-hidden="true">Finde Events in deiner Nähe oder starte selbst eins. Am 9. Jänner werden wir in ganz Österreich #zamhalten.</p>
<div data-n9-seite="karte" style="min-height:100vh"></div>
<script src="https://davidsonnenbaum.github.io/9-1-seiten/lader.js" defer></script>
```

## Geschichten

```html
<p hidden aria-hidden="true">Hinter jeder Unterschrift steht ein Mensch. Hier erzählen Menschen aus ganz Österreich, was sie bewegt.</p>
<div data-n9-seite="geschichten" style="min-height:100vh"></div>
<script src="https://davidsonnenbaum.github.io/9-1-seiten/lader.js" defer></script>
```

## Wer wir sind & FAQ

Neue WordPress-Seite mit dem Titel **„Wer wir sind & FAQ“** und der Adresse (Permalink) **faq** anlegen.

```html
<p hidden aria-hidden="true">Wer steckt hinter der Bewegung 9. Jänner? Menschen aus dem Alltag, mit einer tiefen Sehnsucht nach Veränderung. Keine Partei.</p>
<div data-n9-seite="faq" style="min-height:100vh"></div>
<script src="https://davidsonnenbaum.github.io/9-1-seiten/lader.js" defer></script>
```

## Impressum

```html
<div data-n9-seite="impressum" style="min-height:100vh"></div>
<script src="https://davidsonnenbaum.github.io/9-1-seiten/lader.js" defer></script>
```

## Datenschutz

```html
<div data-n9-seite="datenschutz" style="min-height:100vh"></div>
<script src="https://davidsonnenbaum.github.io/9-1-seiten/lader.js" defer></script>
```

## Verhaltensregeln

```html
<div data-n9-seite="verhaltensregeln" style="min-height:100vh"></div>
<script src="https://davidsonnenbaum.github.io/9-1-seiten/lader.js" defer></script>
```

