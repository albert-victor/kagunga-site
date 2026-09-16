import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

const root = process.cwd();

function megaLink(href, titleKey, title, noteKey, note) {
  return `<a href="${href}"><span><strong data-i18n="${titleKey}">${title}</strong><em data-i18n="${noteKey}">${note}</em></span><i class="fas fa-arrow-right" aria-hidden="true"></i></a>`;
}

function mega(img, alt, labelKey, label, links) {
  return `<div class="mega">
                <div class="mega-visual">
                  <img src="${img}" alt="${alt}" width="640" height="400" />
                  <p class="mega-label" data-i18n="${labelKey}">${label}</p>
                </div>
                <div class="mega-links">
                    ${links}
                </div>
              </div>`;
}

function header(page, overHero = false) {
  const here = (id) => (page === id ? " is-here" : "");
  return `<header class="site-header ${overHero ? "is-over-hero" : "is-page"}" id="site-header">
      <div class="nav-veil" id="nav-veil" hidden></div>
      <div class="wrap nav-bar">
        <a class="logo" href="/">
          <img src="/public/art/kagunga-logo.png" width="108" height="118" alt="Kagunga Farms Company Limited" />
          <span>Kagunga Farms</span>
        </a>
        <nav class="nav-primary" aria-label="Primary">
          <ul class="nav-menu" id="nav-menu">
            <li class="nav-drawer-head">
              <img src="/public/art/kagunga-seal.png" width="80" height="88" alt="" />
              <button class="nav-close" type="button">
                <i class="fas fa-xmark" aria-hidden="true"></i>
                <span class="sr-only" data-i18n="nav.close">Close</span>
              </button>
            </li>
            <li${page === "home" ? ' class="is-here"' : ""}>
              <a href="/" data-i18n="nav.home">Home</a>
            </li>
            <li class="has-drop${here("avocado")}">
              <button type="button" aria-expanded="false"><span data-i18n="nav.avocado">Avocado</span> <i class="fas fa-chevron-down" aria-hidden="true"></i></button>
              ${mega(
                "/assets/images/avocado/avocado-farm.jpg",
                "Avocados on the tree",
                "nav.avocado",
                "Avocado",
                megaLink("/agriculture/avocado", "nav.avocado.plantation", "The plantation", "mega.avocado.a", "Walk the rows") +
                  megaLink("/contact", "nav.avocado.supply", "Work with us", "mega.avocado.b", "Agree the week")
              )}
            </li>
            <li class="has-drop${here("poultry")}">
              <button type="button" aria-expanded="false"><span data-i18n="nav.poultry">Poultry</span> <i class="fas fa-chevron-down" aria-hidden="true"></i></button>
              ${mega(
                "/assets/images/poultry/poultry.jpg",
                "Rooster and hens in the yard",
                "nav.poultry",
                "Poultry",
                megaLink("/livestock/poultry", "nav.poultry.overview", "On the farm", "mega.poultry.a", "The yard") +
                  megaLink("/contact", "nav.poultry.buyers", "Eggs and birds", "mega.poultry.b", "Eggs and birds")
              )}
            </li>
            <li class="has-drop${here("cattle")}">
              <button type="button" aria-expanded="false"><span data-i18n="nav.cattle">Cattle</span> <i class="fas fa-chevron-down" aria-hidden="true"></i></button>
              ${mega(
                "/assets/images/cow/27b322de-fa2f-4697-a182-e7c6e1ed694d.jpg",
                "Cattle on pasture",
                "nav.cattle",
                "Cattle",
                megaLink("/livestock/beef", "nav.cattle.beef", "Beef", "mega.cattle.a", "Meat animals") +
                  megaLink("/livestock/dairy", "nav.cattle.dairy", "Dairy", "mega.cattle.b", "Morning milk")
              )}
            </li>
            <li class="has-drop${here("goats")}">
              <button type="button" aria-expanded="false"><span data-i18n="nav.goats">Goats</span> <i class="fas fa-chevron-down" aria-hidden="true"></i></button>
              ${mega(
                "/assets/images/goat/image1024x768.jpg",
                "Goat beside a fence",
                "nav.goats",
                "Goats",
                megaLink("/livestock/goats", "nav.goats.overview", "Goat keeping", "mega.goats.a", "The flock") +
                  megaLink("/contact", "nav.goats.buyers", "Meat or breeding", "mega.goats.b", "Meat or breeding")
              )}
            </li>
            <li class="has-drop${here("about")}">
              <button type="button" aria-expanded="false"><span data-i18n="nav.about">About us</span> <i class="fas fa-chevron-down" aria-hidden="true"></i></button>
              ${mega(
                "/public/photos/unsplash-tea.jpg",
                "Highland ridge path",
                "nav.about",
                "About us",
                megaLink("/about", "nav.about.story", "The company", "mega.about.a", "Who we are") +
                  megaLink("/contact", "nav.about.njombe", "The highlands", "mega.about.b", "Njombe")
              )}
            </li>
            <li>
              <a href="/contact" data-i18n="nav.contact">Contact</a>
            </li>
            <li>
              <a class="nav-drawer-cta" href="/contact" data-i18n="nav.partner">Work with Kagunga</a>
            </li>
          </ul>
        </nav>
        <div class="nav-tools">
          <a class="nav-partner" href="/contact" data-i18n="nav.partner">Work with Kagunga</a>
          <button class="lang" type="button" id="lang-toggle" aria-label="Change language">
            <span class="lang-opt is-on" data-lang="en">ENG</span>
            <span class="lang-opt" data-lang="sw">SW</span>
          </button>
          <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-menu">
            <span class="burger" aria-hidden="true"><i></i><i></i><i></i></span>
            <span class="nav-toggle-label" data-i18n="nav.menu">Menu</span>
          </button>
        </div>
      </div>
    </header>`;
}

const footer = `<footer class="site-footer">
      <div class="wrap foot-grid">
        <div class="foot-brand">
          <a class="foot-home" href="/">
            <span class="foot-logo-box">
              <img class="foot-seal" src="/public/art/kagunga-logo.png" width="120" height="132" alt="Kagunga Farms Company Limited" />
            </span>
            <strong>Kagunga Farms Company Limited</strong>
          </a>
          <p class="foot-motto" data-i18n="footer.motto">Prayer and work</p>
          <p class="foot-blurb" data-i18n="footer.blurb">A farm on Magoda Street, Njombe Town.</p>
          <p class="social-label" data-i18n="social.follow">Follow us</p>
          <div class="social">
            <a href="https://wa.me/255764979790" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><i class="fab fa-whatsapp" aria-hidden="true"></i></a>
            <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f" aria-hidden="true"></i></a>
            <a href="#" aria-label="Instagram"><i class="fab fa-instagram" aria-hidden="true"></i></a>
            <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin-in" aria-hidden="true"></i></a>
          </div>
        </div>
        <nav class="foot-col" aria-labelledby="foot-work">
          <h3 id="foot-work" data-i18n="footer.work">The work</h3>
          <ul class="foot-links">
            <li><a href="/agriculture/avocado"><i class="fas fa-leaf" aria-hidden="true"></i><span data-i18n="footer.avocado">Avocado</span></a></li>
            <li><a href="/livestock/poultry"><i class="fas fa-egg" aria-hidden="true"></i><span data-i18n="nav.poultry">Poultry</span></a></li>
            <li><a href="/livestock/beef"><i class="fas fa-cow" aria-hidden="true"></i><span data-i18n="nav.cattle">Cattle</span></a></li>
            <li><a href="/livestock/goats"><i class="fas fa-mountain" aria-hidden="true"></i><span data-i18n="nav.goats">Goats</span></a></li>
            <li><a href="/sustainability"><i class="fas fa-seedling" aria-hidden="true"></i><span data-i18n="footer.land">Land</span></a></li>
          </ul>
        </nav>
        <nav class="foot-col" aria-labelledby="foot-talk">
          <h3 id="foot-talk" data-i18n="footer.talk">Talk to us</h3>
          <ul class="foot-links">
            <li><a href="/about"><i class="fas fa-building" aria-hidden="true"></i><span data-i18n="footer.about">About us</span></a></li>
            <li><a href="/insights"><i class="fas fa-file-lines" aria-hidden="true"></i><span data-i18n="footer.insights">Updates</span></a></li>
            <li><a href="/contact"><i class="fas fa-comments" aria-hidden="true"></i><span data-i18n="footer.contact">Contact</span></a></li>
            <li><a href="/terms"><i class="fas fa-scale-balanced" aria-hidden="true"></i><span data-i18n="footer.terms">Terms of service</span></a></li>
          </ul>
        </nav>
        <div class="foot-col foot-contact">
          <h3 data-i18n="footer.company">The company</h3>
          <ul class="foot-links">
            <li><a href="/contact"><i class="fas fa-location-dot" aria-hidden="true"></i><span>Magoda Street, Njombe Town</span></a></li>
            <li><a href="mailto:info@kagungafarms.co.tz"><i class="fas fa-envelope" aria-hidden="true"></i><span>info@kagungafarms.co.tz</span></a></li>
            <li><a href="tel:+255764979790"><i class="fas fa-phone" aria-hidden="true"></i><span>0764 979 790</span></a></li>
            <li><a href="https://wa.me/255764979790" target="_blank" rel="noopener noreferrer"><i class="fab fa-whatsapp" aria-hidden="true"></i><span>WhatsApp</span></a></li>
          </ul>
          <a class="btn btn-on-dark" href="/contact" data-i18n="partner.cta">Write to us</a>
        </div>
      </div>
      <div class="wrap foot-legal">
        <p data-i18n="footer.legal">© 2026 Kagunga Farms Company Limited</p>
        <a href="/terms" data-i18n="footer.terms">Terms of service</a>
      </div>
    </footer>
    <a class="wa-float" href="https://wa.me/255764979790" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp 0764 979 790">
      <i class="fab fa-whatsapp" aria-hidden="true"></i>
    </a>
    <script type="module" src="/src/scripts/app.js"></script>`;

function doc({ title, desc, titleKey, descKey, extra, page, overHero, canonical, jsonLd, main }) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title${titleKey ? ` data-i18n="${titleKey}"` : ""}>${title}</title>
    <meta name="description"${descKey ? ` data-i18n="${descKey}"` : ""} content="${desc}" />
    <link rel="canonical" href="${canonical}" />
    <script>document.documentElement.dataset.pair=localStorage.getItem("kagunga.pair")||"a"</script>
    <link rel="preload" href="/public/fonts/lora-600.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="preload" href="/public/fonts/source-sans-3-400.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="stylesheet" href="/src/styles/base.css" />
    <link rel="stylesheet" href="/src/styles/site.css" />
    ${jsonLd || ""}
  </head>
  <body${extra ? ` data-i18n-extra="${extra}"` : ""}>
    <a class="skip" href="#main">Skip to content</a>
    ${header(page, overHero)}
    <main id="main">
      ${main}
    </main>
    ${footer}
  </body>
</html>
`;
}

const crumbs = (items) =>
  `<p class="crumbs">${items
    .map((item, i) =>
      i === items.length - 1 ? `<span>${item.label}</span>` : `<a href="${item.href}">${item.label}</a> <span aria-hidden="true">/</span> `
    )
    .join("")}</p>`;

const home = doc({
  title: "Kagunga Farms Company Limited – Njombe",
  desc: "Kagunga Farms Company Limited, Magoda Street, Njombe Town. Avocado, poultry, cattle, and goats. Fruit is picked for packers and traders who serve export markets.",
  titleKey: "meta.title",
  descKey: "meta.desc",
  page: "home",
  overHero: true,
  canonical: "https://kagungafarms.co.tz/",
  jsonLd: `<script type="application/ld+json">{"@context":"https://schema.org","@type":"Organization","name":"Kagunga Farms Company Limited","address":{"@type":"PostalAddress","streetAddress":"Magoda Street","addressLocality":"Njombe Town","addressRegion":"Njombe","addressCountry":"TZ"},"email":"info@kagungafarms.co.tz","telephone":"+255764979790"}</script>`,
  main: `
      <section class="hero" id="top">
        <div class="slides" id="slides">
          <div class="slide is-on">
            <img src="/assets/slideshow/avocado-45.jpeg" alt="Avocados hanging on the tree" width="1600" height="1066" fetchpriority="high" />
          </div>
          <div class="slide">
            <img src="/assets/slideshow/poultry.jpg" alt="Hens in the farmyard" width="1280" height="853" loading="lazy" />
          </div>
          <div class="slide">
            <img src="/assets/slideshow/slideshow3.jpg" alt="Avocado fruit packed in crates from the orchard" width="750" height="1000" loading="lazy" />
          </div>
          <div class="slide">
            <img src="/assets/slideshow/55cf10f8-ee88-42ac-ad3b-973b73c973eb.jpg" alt="Cattle on the farm" width="1600" height="900" loading="lazy" />
          </div>
        </div>
        <div class="wrap hero-copy" id="hero-copy">
          <p class="kicker" id="hero-kicker">Avocado</p>
          <h1 id="hero-title">Fruit grown to leave the farm</h1>
          <p id="hero-text">27+ hectares in the highlands. Picked for export-oriented partners who already serve those markets.</p>
          <a class="btn btn-ghost" id="hero-cta" href="/agriculture/avocado">See the plantation</a>
        </div>
        <div class="dots" id="dots" role="tablist" aria-label="Hero slides"></div>
      </section>

      <section class="intro-band" id="about">
        <div class="wrap intro-inner rise">
          <p class="kicker" data-i18n="intro.kicker">Who we are</p>
          <h2 data-i18n="intro.title">A highland farm, one office</h2>
          <p data-i18n="intro.text">Kagunga Farms Company Limited grows avocado and keeps livestock in Njombe Town. Registration, address, and the longer story live on the About page.</p>
          <a class="btn btn-line" href="/about" data-i18n="intro.cta">About the company</a>
        </div>
      </section>

      <section class="section" id="direction">
        <div class="wrap">
          <p class="kicker rise" data-i18n="vision.kicker">Direction</p>
          <h2 class="rise measure" data-i18n="vision.title">Vision and mission</h2>
          <div class="vm-grid" style="margin-top: var(--space-12)">
            <article class="vm-card rise">
              <img src="/public/photos/unsplash-tea.jpg" alt="Highland ridge under open sky" width="1600" height="1066" loading="lazy" />
              <div>
                <p class="kicker" data-i18n="vision.h">Vision</p>
                <h3 data-i18n="vision.head">A farm you can walk</h3>
                <p class="muted" data-i18n="vision.text">A highland farm whose fruit and stock can be visited, inspected, and agreed from one place in Njombe Town.</p>
              </div>
            </article>
            <article class="vm-card rise" data-delay="2">
              <img src="/public/photos/avo-hands.jpg" alt="Hands holding avocado" width="1600" height="2000" loading="lazy" />
              <div>
                <p class="kicker" data-i18n="mission.h">Mission</p>
                <h3 data-i18n="mission.head">Grow, keep, and deal clearly</h3>
                <p class="muted" data-i18n="mission.text">Grow avocado for export-oriented partners. Keep cattle, goats, and poultry as working enterprises. Deal from Magoda Street.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="section" id="work">
        <div class="wrap">
          <p class="kicker rise" data-i18n="focus.kicker">The work</p>
          <h2 class="rise measure" data-i18n="focus.title">Five lines of the farm</h2>
          <p class="muted rise measure" data-i18n="focus.lead"></p>
          <div class="focus-grid" style="margin-top: var(--space-12)">
            <a class="focus-card rise" href="/agriculture/avocado">
              <img src="/public/photos/avo-cut.jpg" alt="Avocado fruit hanging on the tree in Njombe" width="1600" height="2000" loading="lazy" />
              <div class="card-copy">
                <p class="kicker" data-i18n="avo.kicker">Avocado</p>
                <h3 data-i18n="avo.title">The plantation</h3>
              </div>
            </a>
            <a class="focus-card rise" data-delay="2" href="/livestock/poultry">
              <img src="/public/photos/poultry-hens.jpg" alt="Hens in the farmyard" width="1600" height="2000" loading="lazy" />
              <div class="card-copy">
                <p class="kicker" data-i18n="nav.poultry">Poultry</p>
                <h3 data-i18n="live.poultry">Poultry – birds and eggs</h3>
              </div>
            </a>
            <a class="focus-card rise" data-delay="3" href="/livestock/beef">
              <img src="/public/photos/cattle-field.jpg" alt="Cattle walking a field track" width="2000" height="1333" loading="lazy" />
              <div class="card-copy">
                <p class="kicker" data-i18n="nav.cattle">Cattle</p>
                <h3 data-i18n="live.cattle">Cattle – beef and milk</h3>
              </div>
            </a>
            <a class="focus-card rise" href="/livestock/goats">
              <img src="/public/photos/unsplash-goats.jpg" alt="Goat grazing by a fence" width="2000" height="1333" loading="lazy" />
              <div class="card-copy">
                <p class="kicker" data-i18n="nav.goats">Goats</p>
                <h3 data-i18n="live.goats">Goats – small stock</h3>
              </div>
            </a>
            <a class="focus-card rise" data-delay="2" href="/sustainability">
              <img src="/public/photos/unsplash-field.jpg" alt="Young crop rows in dark soil" width="2000" height="1333" loading="lazy" />
              <div class="card-copy">
                <p class="kicker" data-i18n="land.kicker">The land</p>
                <h3 data-i18n="focus.land">The land</h3>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section class="section" id="why">
        <div class="wrap why-visual">
          <div class="rise">
            <img src="/public/photos/avo-cut.jpg" alt="Cut avocado on a wooden board" width="1600" height="2000" loading="lazy" />
          </div>
          <div>
            <p class="kicker rise" data-i18n="why.kicker">Why Kagunga</p>
            <h2 class="rise" data-i18n="why.title">Why partners work with this farm</h2>
            <div class="why-grid" style="margin-top: var(--space-8)">
              <article class="why-item rise">
                <i class="fas fa-mountain" aria-hidden="true"></i>
                <h3 data-i18n="why.1.title"></h3>
                <p class="muted" data-i18n="why.1.text"></p>
              </article>
              <article class="why-item rise" data-delay="2">
                <i class="fas fa-seedling" aria-hidden="true"></i>
                <h3 data-i18n="why.2.title"></h3>
                <p class="muted" data-i18n="why.2.text"></p>
              </article>
              <article class="why-item rise">
                <i class="fas fa-binoculars" aria-hidden="true"></i>
                <h3 data-i18n="why.3.title"></h3>
                <p class="muted" data-i18n="why.3.text"></p>
              </article>
              <article class="why-item rise" data-delay="2">
                <i class="fas fa-scale-balanced" aria-hidden="true"></i>
                <h3 data-i18n="why.4.title"></h3>
                <p class="muted" data-i18n="why.4.text"></p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section class="band" id="njombe">
        <img src="/public/photos/unsplash-tea.jpg" alt="A highland ridge path under a wide sky" width="1600" height="2000" loading="lazy" />
        <div class="wrap band-copy rise">
          <p class="kicker" data-i18n="njombe.kicker">The region</p>
          <h2 data-i18n="njombe.title"></h2>
          <p data-i18n="njombe.p1"></p>
          <a class="btn btn-ghost" href="/about" data-i18n="njombe.cta">More about the company</a>
        </div>
      </section>

      <section class="section" id="involve">
        <div class="wrap">
          <p class="kicker rise" data-i18n="involve.kicker">Work with us</p>
          <h2 class="rise measure" data-i18n="involve.title">Visit, offtake, or write</h2>
          <div class="involve-grid" style="margin-top: var(--space-12)">
            <article class="involve-card rise">
              <img src="/public/photos/cattle-pasture.jpg" alt="Cattle on the farm during a visit" width="2000" height="1333" loading="lazy" />
              <div class="card-copy">
                <h3 data-i18n="involve.1.title">Walk the farm</h3>
                <p data-i18n="involve.1.text"></p>
              </div>
            </article>
            <article class="involve-card rise" data-delay="2">
              <img src="/public/photos/poultry-hens.jpg" alt="Poultry in the farmyard" width="1600" height="2000" loading="lazy" />
              <div class="card-copy">
                <h3 data-i18n="involve.2.title">Agree offtake</h3>
                <p data-i18n="involve.2.text"></p>
              </div>
            </article>
            <article class="involve-card rise" data-delay="3">
              <img src="/assets/slideshow/slideshow3.jpg" alt="Avocado fruit packed in crates from the orchard" width="750" height="1000" loading="lazy" />
              <div class="card-copy">
                <h3 data-i18n="involve.3.title">Write first</h3>
                <p data-i18n="involve.3.text"></p>
              </div>
            </article>
          </div>
        </div>
      </section>

`,
});

function rail(items = []) {
  if (!items.length) return "";
  return `<div class="photo-rail">${items
    .map(
      ([src, alt]) =>
        `<img src="${src}" alt="${alt}" width="1600" height="1066" loading="lazy" />`
    )
    .join("")}</div>`;
}

function inner({ file, page, here, title, desc, titleKey, descKey, canonical, heroImg, heroAlt, kicker, h1, lead, rest, photos }) {
  const html = doc({
    title,
    desc,
    titleKey,
    descKey,
    extra: "/src/i18n/pages.js",
    page: here,
    overHero: false,
    canonical,
    main: `
      <section class="page-hero">
        <img src="${heroImg}" alt="${heroAlt}" width="2000" height="1333" fetchpriority="high" />
        <div class="wrap">
          <p class="kicker" data-i18n="${kicker}"></p>
          <h1 data-i18n="${h1}"></h1>
          <p data-i18n="${lead}"></p>
        </div>
      </section>
      <section class="section">
        <div class="wrap prose">
          ${crumbs([{ href: "/", label: "Home" }, ...page])}
          ${rail(photos)}
          ${rest}
        </div>
      </section>
`,
  });
  const path = join(root, file);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, html);
}

writeFileSync(join(root, "index.html"), home);

inner({
  file: "about/index.html",
  here: "about",
  page: [{ href: "/about", label: "About" }],
  title: "About Kagunga Farms Company Limited – Njombe Town",
  desc: "Registered agribusiness on Magoda Street, Njombe Town: orchard, livestock, and how to work with the company.",
  titleKey: "about.meta",
  canonical: "https://kagungafarms.co.tz/about",
  heroImg: "/public/photos/unsplash-tea.jpg",
  heroAlt: "Highland path along a green ridge",
  kicker: "about.kicker",
  h1: "about.title",
  lead: "about.lead",
  photos: [
    ["/public/photos/avo-rows.jpg", "Avocado rows in highland light"],
    ["/public/photos/cattle-pasture.jpg", "Cattle on pasture"],
    ["/public/photos/poultry-yard.jpg", "Poultry in the yard"],
  ],
  rest: `
          <h2 data-i18n="about.h2a"></h2>
          <p data-i18n="about.p1"></p>
          <p data-i18n="about.p2"></p>
          <h2 id="njombe" data-i18n="about.h2b"></h2>
          <p data-i18n="about.p3"></p>
          <h2 data-i18n="about.h2c"></h2>
          <p data-i18n="about.p4"></p>
          <p><a class="btn btn-fill" href="/contact" data-i18n="about.cta">Write to us</a></p>
`,
});

inner({
  file: "agriculture/index.html",
  here: "avocado",
  page: [{ href: "/agriculture", label: "Agriculture" }],
  title: "Agriculture at Kagunga Farms – orchard first",
  desc: "Highland agriculture led by a 27+ hectare avocado plantation in Njombe.",
  titleKey: "agri.meta",
  canonical: "https://kagungafarms.co.tz/agriculture",
  heroImg: "/public/photos/avo-rows.jpg",
  heroAlt: "Avocado trees in highland light",
  kicker: "agri.kicker",
  h1: "agri.title",
  lead: "agri.lead",
  photos: [
    ["/public/photos/avo-fruit.jpg", "Avocados on the tree"],
    ["/public/photos/avo-hands.jpg", "Hands holding avocado"],
    ["/public/photos/unsplash-field.jpg", "Crop rows in dark soil"],
  ],
  rest: `
          <p data-i18n="agri.p1"></p>
          <p data-i18n="agri.p2"></p>
          <p><a class="btn btn-fill" href="/agriculture/avocado" data-i18n="agri.cta">Ask us about avocado</a></p>
`,
});

inner({
  file: "agriculture/avocado/index.html",
  here: "avocado",
  page: [
    { href: "/agriculture", label: "Agriculture" },
    { href: "/agriculture/avocado", label: "Avocado" },
  ],
  title: "Avocado plantation – Kagunga Farms, Njombe",
  desc: "More than 27 hectares of avocado in Njombe. Fruit is picked for packers and traders who serve export markets.",
  titleKey: "avo.meta",
  canonical: "https://kagungafarms.co.tz/agriculture/avocado",
  heroImg: "/public/photos/avo-fruit.jpg",
  heroAlt: "Avocados hanging in the canopy",
  kicker: "avo.kicker",
  h1: "avo.title",
  lead: "avo.lead",
  photos: [
    ["/public/photos/avo-rows.jpg", "The plantation in rows"],
    ["/public/photos/avo-cut.jpg", "Avocado trees loaded with fruit"],
    ["/public/photos/avo-hands.jpg", "Fruit in the hand"],
  ],
  rest: `
          <h2 data-i18n="avo.h2a"></h2>
          <p data-i18n="avo.p1"></p>
          <p data-i18n="avo.p2"></p>
          <h2 id="supply" data-i18n="avo.h2b"></h2>
          <p data-i18n="avo.p3"></p>
          <h2 data-i18n="avo.h2c"></h2>
          <div class="need-list">
            <article class="need-item"><i class="fas fa-leaf" aria-hidden="true"></i><h3 data-i18n="avo.n1.title"></h3><p class="muted" data-i18n="avo.n1.text"></p></article>
            <article class="need-item"><i class="fas fa-binoculars" aria-hidden="true"></i><h3 data-i18n="avo.n2.title"></h3><p class="muted" data-i18n="avo.n2.text"></p></article>
            <article class="need-item"><i class="fas fa-truck" aria-hidden="true"></i><h3 data-i18n="avo.n3.title"></h3><p class="muted" data-i18n="avo.n3.text"></p></article>
            <article class="need-item"><i class="fas fa-earth-africa" aria-hidden="true"></i><h3 data-i18n="avo.n4.title"></h3><p class="muted" data-i18n="avo.n4.text"></p></article>
          </div>
          <h2 data-i18n="avo.h2d"></h2>
          <p data-i18n="avo.p4"></p>
          <p><a class="btn btn-fill" href="/contact" data-i18n="avo.cta">Ask about avocado</a></p>
`,
});

inner({
  file: "livestock/index.html",
  here: "poultry",
  page: [{ href: "/livestock", label: "Livestock" }],
  title: "Livestock – cattle, goats, and poultry | Kagunga Farms",
  desc: "Cattle, goats, and poultry beside the orchard at Kagunga Farms, Njombe Town.",
  titleKey: "live.meta",
  canonical: "https://kagungafarms.co.tz/livestock",
  heroImg: "/public/photos/cattle-pasture.jpg",
  heroAlt: "Cattle on pasture",
  kicker: "live.kicker",
  h1: "live.title",
  lead: "live.lead",
  photos: [
    ["/public/photos/poultry-yard.jpg", "Poultry in the yard"],
    ["/public/photos/cattle-field.jpg", "Cattle on a field track"],
    ["/public/photos/unsplash-goats.jpg", "Goat beside a fence"],
  ],
  rest: `
          <p data-i18n="live.intro"></p>

          <div class="chapter" id="poultry">
            <p class="kicker" data-i18n="poultry.kicker">Poultry</p>
            <h2 data-i18n="poultry.title"></h2>
            <p data-i18n="poultry.p1"></p>
            <img src="/public/photos/poultry-hens.jpg" alt="Brown hens standing in a farmyard" width="1600" height="2000" loading="lazy" />
            <h3 data-i18n="poultry.h2a"></h3>
            <p data-i18n="poultry.p2"></p>
            <h3 id="poultry-buyers" data-i18n="poultry.h2b"></h3>
            <div class="need-list">
              <article class="need-item"><i class="fas fa-egg" aria-hidden="true"></i><h3 data-i18n="poultry.n1.title"></h3><p class="muted" data-i18n="poultry.n1.text"></p></article>
              <article class="need-item"><i class="fas fa-clipboard-check" aria-hidden="true"></i><h3 data-i18n="poultry.n2.title"></h3><p class="muted" data-i18n="poultry.n2.text"></p></article>
              <article class="need-item"><i class="fas fa-warehouse" aria-hidden="true"></i><h3 data-i18n="poultry.n3.title"></h3><p class="muted" data-i18n="poultry.n3.text"></p></article>
              <article class="need-item"><i class="fas fa-truck" aria-hidden="true"></i><h3 data-i18n="poultry.n4.title"></h3><p class="muted" data-i18n="poultry.n4.text"></p></article>
            </div>
            <h3 data-i18n="poultry.h2c"></h3>
            <p data-i18n="poultry.p3"></p>
            <h3 data-i18n="poultry.h2d"></h3>
            <p data-i18n="poultry.p4"></p>
            <p><a class="btn btn-fill" href="/contact">Ask us about poultry</a></p>
          </div>

          <div class="chapter" id="cattle">
            <p class="kicker" data-i18n="cattle.kicker">Cattle</p>
            <h2 data-i18n="cattle.title"></h2>
            <p data-i18n="cattle.p1"></p>
            <p>
              <a class="btn btn-fill" href="/livestock/beef" data-i18n="cattle.cta.beef">Beef cattle</a>
              <a class="btn btn-line" href="/livestock/dairy" data-i18n="cattle.cta.dairy">Dairy</a>
            </p>
          </div>

          <div class="chapter" id="goats">
            <p class="kicker" data-i18n="goats.kicker">Goats</p>
            <h2 data-i18n="goats.title"></h2>
            <p data-i18n="goats.p1"></p>
            <img src="/public/photos/unsplash-goats.jpg" alt="Goat grazing beside a wooden fence" width="2000" height="1333" loading="lazy" />
            <h3 id="goats-buyers" data-i18n="goats.h2a"></h3>
            <div class="need-list">
              <article class="need-item"><i class="fas fa-feather" aria-hidden="true"></i><h3 data-i18n="goats.n1.title"></h3><p class="muted" data-i18n="goats.n1.text"></p></article>
              <article class="need-item"><i class="fas fa-mountain" aria-hidden="true"></i><h3 data-i18n="goats.n2.title"></h3><p class="muted" data-i18n="goats.n2.text"></p></article>
              <article class="need-item"><i class="fas fa-truck" aria-hidden="true"></i><h3 data-i18n="goats.n3.title"></h3><p class="muted" data-i18n="goats.n3.text"></p></article>
              <article class="need-item"><i class="fas fa-file-lines" aria-hidden="true"></i><h3 data-i18n="goats.n4.title"></h3><p class="muted" data-i18n="goats.n4.text"></p></article>
            </div>
            <h3 data-i18n="goats.h2b"></h3>
            <p data-i18n="goats.p2"></p>
            <p><a class="btn btn-fill" href="/contact">Ask us about goats</a></p>
          </div>
`,
});

inner({
  file: "livestock/dairy/index.html",
  here: "cattle",
  page: [
    { href: "/livestock", label: "Livestock" },
    { href: "/livestock/dairy", label: "Dairy" },
  ],
  title: "Dairy cattle – Kagunga Farms, Njombe",
  desc: "Morning milk from the herd at Kagunga Farms, Njombe Town.",
  titleKey: "dairy.meta",
  canonical: "https://kagungafarms.co.tz/livestock/dairy",
  heroImg: "/public/photos/dairy-cow.jpg",
  heroAlt: "Dairy cow in the stall",
  kicker: "dairy.kicker",
  h1: "dairy.title",
  lead: "dairy.lead",
  photos: [
    ["/public/photos/unsplash-dairy.jpg", "Fresh milk"],
    ["/public/photos/cattle-close.jpg", "Cattle close up"],
    ["/public/photos/dairy-cow.jpg", "A dairy cow"],
  ],
  rest: `
          <p data-i18n="dairy.p1"></p>
          <h2 data-i18n="dairy.h2a"></h2>
          <div class="need-list">
            <article class="need-item"><i class="fas fa-droplet" aria-hidden="true"></i><h3 data-i18n="dairy.n1.title"></h3><p class="muted" data-i18n="dairy.n1.text"></p></article>
            <article class="need-item"><i class="fas fa-truck" aria-hidden="true"></i><h3 data-i18n="dairy.n2.title"></h3><p class="muted" data-i18n="dairy.n2.text"></p></article>
            <article class="need-item"><i class="fas fa-cow" aria-hidden="true"></i><h3 data-i18n="dairy.n3.title"></h3><p class="muted" data-i18n="dairy.n3.text"></p></article>
          </div>
          <p data-i18n="dairy.p2"></p>
          <p><a class="btn btn-fill" href="/contact" data-i18n="dairy.cta">Ask about milk</a></p>
`,
});

inner({
  file: "livestock/beef/index.html",
  here: "cattle",
  page: [
    { href: "/livestock", label: "Livestock" },
    { href: "/livestock/beef", label: "Beef" },
  ],
  title: "Beef cattle – Kagunga Farms, Njombe",
  desc: "Cattle for meat at Kagunga Farms. See the animal first, then agree a price at the gate.",
  titleKey: "beef.meta",
  canonical: "https://kagungafarms.co.tz/livestock/beef",
  heroImg: "/public/photos/cattle-field.jpg",
  heroAlt: "Cattle in a highland-style pasture",
  kicker: "beef.kicker",
  h1: "beef.title",
  lead: "beef.lead",
  photos: [
    ["/public/photos/cattle-pasture.jpg", "Herd on pasture"],
    ["/public/photos/cattle-close.jpg", "Cattle close up"],
    ["/public/photos/cattle-field.jpg", "Cattle on a track"],
  ],
  rest: `
          <p data-i18n="beef.p1"></p>
          <h2 data-i18n="beef.h2a"></h2>
          <div class="need-list">
            <article class="need-item"><i class="fas fa-cow" aria-hidden="true"></i><h3 data-i18n="beef.n1.title"></h3><p class="muted" data-i18n="beef.n1.text"></p></article>
            <article class="need-item"><i class="fas fa-truck" aria-hidden="true"></i><h3 data-i18n="beef.n2.title"></h3><p class="muted" data-i18n="beef.n2.text"></p></article>
            <article class="need-item"><i class="fas fa-file-lines" aria-hidden="true"></i><h3 data-i18n="beef.n3.title"></h3><p class="muted" data-i18n="beef.n3.text"></p></article>
          </div>
          <p data-i18n="beef.p2"></p>
          <p><a class="btn btn-fill" href="/contact" data-i18n="beef.cta">Ask about cattle</a></p>
`,
});

inner({
  file: "sustainability/index.html",
  here: "about",
  page: [{ href: "/sustainability", label: "Land" }],
  title: "Land and keeping – Kagunga Farms",
  desc: "How Kagunga Farms keeps the land in Njombe: trees that stay, animals that return something to the soil.",
  titleKey: "land.meta",
  canonical: "https://kagungafarms.co.tz/sustainability",
  heroImg: "/public/photos/unsplash-field.jpg",
  heroAlt: "Soil and young plants in a field row",
  kicker: "land.kicker",
  h1: "land.title",
  lead: "land.lead",
  photos: [
    ["/public/photos/land-compost.webp", "Compost returned to the land"],
    ["/public/photos/avo-rows.jpg", "Orchard rows"],
    ["/public/photos/unsplash-field.jpg", "Field rows"],
  ],
  rest: `
          <p data-i18n="land.p1"></p>
          <p data-i18n="land.p2"></p>
          <p data-i18n="land.p3"></p>
          <p data-i18n="land.p4"></p>
`,
});

inner({
  file: "future/index.html",
  here: "about",
  page: [{ href: "/future", label: "Direction" }],
  title: "Direction – Kagunga Farms Company Limited",
  desc: "Where the company is headed: a stronger orchard, livestock as a business, partners who can visit.",
  titleKey: "future.meta",
  canonical: "https://kagungafarms.co.tz/future",
  heroImg: "/public/photos/njombe-hills.png",
  heroAlt: "Looking along a highland ridge",
  kicker: "future.kicker",
  h1: "future.title",
  lead: "future.lead",
  photos: [
    ["/public/photos/avo-rows.jpg", "The orchard ahead"],
    ["/public/photos/cattle-pasture.jpg", "The herds"],
    ["/public/photos/unsplash-tea.jpg", "Highland ridge"],
  ],
  rest: `
          <p data-i18n="future.p1"></p>
          <p data-i18n="future.p2"></p>
          <p data-i18n="future.p3"></p>
`,
});

inner({
  file: "insights/index.html",
  here: "about",
  page: [{ href: "/insights", label: "Notes" }],
  title: "Updates – Kagunga Farms",
  desc: "Updates from Kagunga Farms when there is something confirmed to say.",
  titleKey: "notes.meta",
  canonical: "https://kagungafarms.co.tz/insights",
  heroImg: "/public/photos/avo-hands.jpg",
  heroAlt: "Hands holding fruit",
  kicker: "notes.kicker",
  h1: "notes.title",
  lead: "notes.lead",
  photos: [
    ["/public/photos/avo-cut.jpg", "Cut avocado"],
    ["/public/photos/unsplash-field.jpg", "Field at low sun"],
  ],
  rest: `
          <h2 data-i18n="notes.h2"></h2>
          <p data-i18n="notes.p1"></p>
          <p data-i18n="notes.p2"></p>
`,
});

inner({
  file: "terms/index.html",
  here: "about",
  page: [{ href: "/terms", label: "Terms" }],
  title: "Terms of service – Kagunga Farms",
  desc: "How this website and an enquiry to Kagunga Farms Company Limited are used.",
  titleKey: "terms.meta",
  canonical: "https://kagungafarms.co.tz/terms",
  heroImg: "/public/photos/unsplash-field.jpg",
  heroAlt: "Highland field under open sky",
  kicker: "terms.kicker",
  h1: "terms.title",
  lead: "terms.lead",
  photos: [],
  rest: `
          <h2 data-i18n="terms.h2a"></h2>
          <p data-i18n="terms.p1"></p>
          <h2 data-i18n="terms.h2b"></h2>
          <p data-i18n="terms.p2"></p>
          <h2 data-i18n="terms.h2c"></h2>
          <p data-i18n="terms.p3"></p>
          <h2 data-i18n="terms.h2d"></h2>
          <p data-i18n="terms.p4"></p>
          <p><a class="btn btn-solid" href="/contact" data-i18n="about.cta">Write to us</a></p>
`,
});

const contact = doc({
  title: "Contact and partner enquiries – Kagunga Farms",
  desc: "Write, call, or visit Kagunga Farms Company Limited on Magoda Street, Njombe Town.",
  titleKey: "contact.meta",
  extra: "/src/i18n/pages.js",
  page: "about",
  overHero: false,
  canonical: "https://kagungafarms.co.tz/contact",
  main: `
      <section class="page-hero">
        <img src="/public/photos/njombe-hills.png" alt="Highland ridge under open sky" width="2000" height="1333" fetchpriority="high" />
        <div class="wrap">
          <p class="kicker" data-i18n="contact.kicker">Contact</p>
          <h1 data-i18n="contact.title"></h1>
          <p data-i18n="contact.lead"></p>
        </div>
      </section>
      <section class="section" id="partner">
        <div class="wrap contact-grid split">
          <div class="rise">
            ${crumbs([
              { href: "/", label: "Home" },
              { href: "/contact", label: "Contact" },
            ])}
            <h2 data-i18n="contact.partner.title"></h2>
            <p data-i18n="contact.partner.text"></p>
            <p>
              <strong data-i18n="contact.visit"></strong><br />
              <span data-i18n="contact.addr"></span>
            </p>
            <p>
              <a href="mailto:info@kagungafarms.co.tz"><i class="fas fa-envelope" aria-hidden="true"></i> info@kagungafarms.co.tz</a><br />
              <a href="tel:+255764979790"><i class="fas fa-phone" aria-hidden="true"></i> 0764 979 790</a>
            </p>
            <a class="wa" href="https://wa.me/255764979790" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26C.157 5.335 5.495 0 12.05 0a9.87 9.87 0 0 1 6.988 2.898A9.825 9.825 0 0 1 21.931 9.89c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
              WhatsApp 0764 979 790
            </a>
          </div>
          <form class="form rise" data-delay="2" id="enquiry">
            <div class="field">
              <label for="name" data-i18n="contact.name">Name</label>
              <input id="name" name="name" autocomplete="name" required />
            </div>
            <div class="field">
              <label for="org" data-i18n="contact.org">Organisation</label>
              <input id="org" name="org" autocomplete="organization" />
            </div>
            <div class="field">
              <label for="interest" data-i18n="contact.as">I am writing as</label>
              <select id="interest" name="interest">
                <option value="partner" data-i18n="contact.partner">Business partner</option>
                <option value="buyer" data-i18n="contact.buyer">Buyer</option>
                <option value="supplier" data-i18n="contact.supplier">Supplier</option>
                <option value="other" data-i18n="contact.other">Other</option>
              </select>
            </div>
            <div class="field">
              <label for="message" data-i18n="contact.message">Message</label>
              <textarea id="message" name="message" required></textarea>
            </div>
            <button class="btn btn-fill" type="submit" data-i18n="contact.send">Send message</button>
            <p class="muted" id="form-note" style="margin-top: 0.9rem" data-i18n="contact.note"></p>
          </form>
        </div>
      </section>
`,
});

mkdirSync(join(root, "contact"), { recursive: true });
writeFileSync(join(root, "contact/index.html"), contact);

writeFileSync(
  join(root, "robots.txt"),
  `User-agent: *\nAllow: /\nSitemap: https://kagungafarms.co.tz/sitemap.xml\n`
);

writeFileSync(
  join(root, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://kagungafarms.co.tz/</loc></url>
  <url><loc>https://kagungafarms.co.tz/about</loc></url>
  <url><loc>https://kagungafarms.co.tz/agriculture</loc></url>
  <url><loc>https://kagungafarms.co.tz/agriculture/avocado</loc></url>
  <url><loc>https://kagungafarms.co.tz/livestock</loc></url>
  <url><loc>https://kagungafarms.co.tz/livestock/poultry</loc></url>
  <url><loc>https://kagungafarms.co.tz/livestock/dairy</loc></url>
  <url><loc>https://kagungafarms.co.tz/livestock/beef</loc></url>
  <url><loc>https://kagungafarms.co.tz/livestock/goats</loc></url>
  <url><loc>https://kagungafarms.co.tz/sustainability</loc></url>
  <url><loc>https://kagungafarms.co.tz/future</loc></url>
  <url><loc>https://kagungafarms.co.tz/insights</loc></url>
  <url><loc>https://kagungafarms.co.tz/contact</loc></url>
  <url><loc>https://kagungafarms.co.tz/terms</loc></url>
</urlset>
`
);

console.log("pages written");
