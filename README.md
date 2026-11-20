# beharsoft.com

The Beharsoft website, served by GitHub Pages at https://www.beharsoft.com.
It is plain HTML/CSS/JS — no build step. Edit a file, commit, and it's live.

## Layout

```
index.html              Home / landing page (about the studio)
nawyah/index.html       → /nawyah/
biogear/index.html      → /biogear/
galaxy-prince/index.html→ /galaxy-prince/   (أمير المجرة)
my-lost-parts/index.html→ /my-lost-parts/
insectmen-jungle/index.html → /insectmen-jungle/
asmsam/index.html       → /asmsam/
404.html                Shown for missing pages
assets/css/theme.css    The shared theme (colours, fonts, every component)
assets/js/site.js       Header, footer, project list, language switch, lightbox
assets/img/<project>/   Web-ready images (WebP, resized) — generated from images/
assets/img/og/          Social-share preview images (1200×630)
images/                 Original full-size artwork, one folder per project (not loaded by the pages)
tools/build_images.py   Turns images/ originals into the web images in assets/img/
```

## Common edits

- **Header / footer / project menu** — edit `PROJECTS` at the top of `assets/js/site.js`.
  Every page picks it up.
- **Arabic text** — add `data-ar="..."` to any element. The element's normal content is the
  English; the `data-ar` value is shown when Arabic is selected. For image alt text use
  `data-ar-alt`. For the page title, set `data-title-ar` on `<html>`.
- **Project colour** — each page has `class="theme-<project>"` on `<body>`; the colours are
  under "Project accents" in `theme.css`.
- **Add a project** — copy one of the project folders, change the text and images, add a
  line to `PROJECTS` in `site.js`, add a card to `index.html`, and add the URL to
  `sitemap.xml`.
- **New or changed images** — put the original in `images/<Project>/`, add a line for it to
  `IMAGES` in `tools/build_images.py` (output name, source file, max size), then run
  `python3 tools/build_images.py`. It writes the resized WebP to `assets/img/<project>/`;
  reference that path in the page. Replacing an original and re-running updates the site image.

Gallery images open full-size when wrapped in `<a href="..." data-lightbox="group-name">`.
