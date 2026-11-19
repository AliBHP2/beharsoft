/* ==========================================================================
   Beharsoft — shared site script
   - Builds the header + footer on every page (edit them once, here).
   - English / Arabic switch: any element with data-ar="..." gets that Arabic
     text when Arabic is on. The English text is simply the element's content.
     The choice is remembered between pages.
   - Mobile menu, projects dropdown, and gallery lightbox.
   To add a project: add it to PROJECTS below and create its folder/index.html.
   ========================================================================== */

const PROJECTS = [
  { slug: 'nawyah',        en: 'Nawyah',         ar: 'النوية',         typeEn: 'Tank battle game', typeAr: 'لعبة معارك دبابات', thumb: '/assets/img/nawyah/tank-red.webp' },
  { slug: 'biogear',       en: 'Maher BioGear',  ar: 'ماهر بايوجير',  typeEn: 'Mobile shooter',   typeAr: 'لعبة جوال',          thumb: '/assets/img/biogear/icon.webp' },
  { slug: 'galaxy-prince', en: 'Galaxy Prince',  ar: 'أمير المجرة',   typeEn: 'Manga',            typeAr: 'مانجا',              thumb: '/assets/img/galaxy-prince/cover.webp' },
  { slug: 'my-lost-parts', en: 'My Lost Parts',  ar: 'أجزائي المفقودة', typeEn: 'Illustrated story', typeAr: 'قصة مصوّرة',      thumb: '/assets/img/my-lost-parts/goro.webp' },
  { slug: 'asmsam',        en: 'Asmsam',         ar: 'الصمصام',       typeEn: 'Strategy game',    typeAr: 'لعبة استراتيجية',    thumb: '/assets/img/brand/gear.webp' },
];
const CONTACT_EMAIL = 'hello@beharsoft.com';

const root = document.documentElement;
const page = document.body.dataset.page || 'home';
const L = (en, ar) => `<span data-ar="${ar.replace(/"/g, '&quot;')}">${en}</span>`;

/* ---------- Header ---------- */
function buildHeader() {
  const slot = document.querySelector('[data-site-header]');
  if (!slot) return;
  const items = PROJECTS.map(p =>
    `<a href="/${p.slug}/"${page === p.slug ? ' aria-current="page"' : ''}>${L(p.en, p.ar)}<span data-ar="${p.typeAr}">${p.typeEn}</span></a>`
  ).join('');
  slot.outerHTML = `
  <a class="skip-link" href="#main">${L('Skip to content', 'انتقل إلى المحتوى')}</a>
  <header class="topbar">
    <nav class="nav wrap" aria-label="Main">
      <a class="brand" href="/" aria-label="Beharsoft home"><span class="brand-mark">B</span><span>BEHAR<b>SOFT</b></span></a>
      <button class="menu-btn" type="button" aria-expanded="false" aria-controls="navlinks">${L('Menu', 'القائمة')}</button>
      <div class="navlinks" id="navlinks">
        <a href="/"${page === 'home' ? ' aria-current="page"' : ''}>${L('Home', 'الرئيسية')}</a>
        <div class="nav-projects">
          <button type="button" aria-expanded="false">${L('Projects', 'المشاريع')}</button>
          <div class="nav-menu">${items}</div>
        </div>
        <a href="/#about">${L('About', 'من نحن')}</a>
        <a href="/#contact">${L('Contact', 'تواصل')}</a>
        <button class="lang-btn" type="button" id="langToggle">العربية</button>
      </div>
    </nav>
  </header>`;
}

/* ---------- Footer ---------- */
function buildFooter() {
  const slot = document.querySelector('[data-site-footer]');
  if (!slot) return;
  const list = PROJECTS.map(p => `<li><a href="/${p.slug}/">${L(p.en, p.ar)}</a></li>`).join('');
  slot.outerHTML = `
  <footer class="footer">
    <div class="wrap">
      <div class="footer-grid">
        <div>
          <a class="brand" href="/"><span class="brand-mark">B</span><span>BEHAR<b>SOFT</b></span></a>
          <p style="margin-top:14px;max-width:340px">${L('An independent studio making games, manga and illustrated stories.', 'استوديو مستقل يصنع الألعاب والمانجا والقصص المصوّرة.')}</p>
        </div>
        <div><h4>${L('Projects', 'المشاريع')}</h4><ul>${list}</ul></div>
        <div><h4>${L('Studio', 'الاستوديو')}</h4><ul>
          <li><a href="/#about">${L('About', 'من نحن')}</a></li>
          <li><a href="/#contact">${L('Contact', 'تواصل')}</a></li>
          <li><a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></li>
        </ul></div>
      </div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} Beharsoft</span>
        <span>${L('Original worlds. Made with imagination.', 'عوالم أصيلة، صُنعت بالخيال.')}</span>
      </div>
    </div>
  </footer>`;
}

/* ---------- "More projects" strip (project pages) ---------- */
function buildMoreProjects() {
  const slot = document.querySelector('[data-more-projects]');
  if (!slot) return;
  slot.innerHTML = PROJECTS.filter(p => p.slug !== page).map(p =>
    `<a href="/${p.slug}/"><img src="${p.thumb}" alt="" loading="lazy"><div><strong>${L(p.en, p.ar)}</strong><span data-ar="${p.typeAr}">${p.typeEn}</span></div></a>`
  ).join('');
}

/* ---------- Language ---------- */
function getLang() {
  try {
    const saved = localStorage.getItem('lang');
    if (saved) return saved;
  } catch (e) { /* storage blocked */ }
  return (navigator.language || '').toLowerCase().startsWith('ar') ? 'ar' : 'en';
}
function setLang(lang) {
  root.lang = lang;
  root.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-ar]').forEach(el => {
    if (el.dataset.en === undefined) el.dataset.en = el.innerHTML;
    el.innerHTML = lang === 'ar' ? el.dataset.ar : el.dataset.en;
  });
  document.querySelectorAll('[data-ar-alt]').forEach(el => {
    if (el.dataset.enAlt === undefined) el.dataset.enAlt = el.alt;
    el.alt = lang === 'ar' ? el.dataset.arAlt : el.dataset.enAlt;
  });
  if (root.dataset.titleAr) {
    if (!root.dataset.titleEn) root.dataset.titleEn = document.title;
    document.title = lang === 'ar' ? root.dataset.titleAr : root.dataset.titleEn;
  }
  const btn = document.getElementById('langToggle');
  if (btn) btn.textContent = lang === 'ar' ? 'English' : 'العربية';
  try { localStorage.setItem('lang', lang); } catch (e) { /* ignore */ }
}

/* ---------- Menus ---------- */
function wireMenus() {
  const bar = document.querySelector('.topbar');
  const menuBtn = document.querySelector('.menu-btn');
  menuBtn?.addEventListener('click', () => {
    const open = bar.classList.toggle('menu-open');
    menuBtn.setAttribute('aria-expanded', open);
  });
  const dd = document.querySelector('.nav-projects');
  const ddBtn = dd?.querySelector('button');
  ddBtn?.addEventListener('click', e => {
    e.stopPropagation();
    const open = dd.classList.toggle('open');
    ddBtn.setAttribute('aria-expanded', open);
  });
  document.addEventListener('click', e => {
    if (dd && !dd.contains(e.target)) { dd.classList.remove('open'); ddBtn.setAttribute('aria-expanded', false); }
  });
  document.getElementById('langToggle')?.addEventListener('click', () => setLang(root.lang === 'ar' ? 'en' : 'ar'));
}

/* ---------- Lightbox for galleries ---------- */
function wireLightbox() {
  const links = [...document.querySelectorAll('a[data-lightbox]')];
  if (!links.length) return;
  const box = document.createElement('div');
  box.className = 'lightbox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.innerHTML = '<button class="close" aria-label="Close">✕</button><button class="prev" aria-label="Previous">‹</button><button class="next" aria-label="Next">›</button><div><img alt=""><div class="cap"></div></div>';
  document.body.appendChild(box);
  const img = box.querySelector('img'), cap = box.querySelector('.cap');
  let group = [], i = 0, lastFocus = null;
  const show = n => {
    i = (n + group.length) % group.length;
    const a = group[i];
    img.src = a.href;
    img.alt = a.querySelector('img')?.alt || '';
    cap.textContent = a.closest('figure')?.querySelector('figcaption')?.textContent || '';
  };
  const close = () => { box.classList.remove('open'); lastFocus?.focus(); };
  links.forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    lastFocus = a;
    group = links.filter(l => l.dataset.lightbox === a.dataset.lightbox);
    show(group.indexOf(a));
    box.classList.add('open');
    box.querySelector('.close').focus();
  }));
  box.querySelector('.close').onclick = close;
  box.querySelector('.prev').onclick = () => show(i - 1);
  box.querySelector('.next').onclick = () => show(i + 1);
  box.addEventListener('click', e => { if (e.target === box) close(); });
  document.addEventListener('keydown', e => {
    if (!box.classList.contains('open')) return;
    const rtl = root.dir === 'rtl';
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') show(rtl ? i - 1 : i + 1);
    if (e.key === 'ArrowLeft') show(rtl ? i + 1 : i - 1);
  });
}

buildHeader();
buildFooter();
buildMoreProjects();
setLang(getLang());
wireMenus();
wireLightbox();
