import { messages as base } from "../i18n/messages.js";

const extraUrl = document.body.dataset.i18nExtra;
const extra = extraUrl ? (await import(extraUrl)).messages : { en: {}, sw: {} };

const header = document.getElementById("site-header");
const hero = document.querySelector(".hero");
const slides = [...document.querySelectorAll(".slide")];
const heroCopy = document.getElementById("hero-copy");
const heroCta = document.getElementById("hero-cta");
const dotsWrap = document.getElementById("dots");

const heroSlides = [
  {
    kicker: "hero.1.kicker",
    title: "hero.1.title",
    text: "hero.1.text",
    cta: "hero.1.cta",
    href: "/agriculture/avocado",
  },
  {
    kicker: "hero.2.kicker",
    title: "hero.2.title",
    text: "hero.2.text",
    cta: "hero.2.cta",
    href: "/livestock/poultry",
  },
  {
    kicker: "hero.3.kicker",
    title: "hero.3.title",
    text: "hero.3.text",
    cta: "hero.3.cta",
    href: "/agriculture/avocado",
  },
  {
    kicker: "hero.4.kicker",
    title: "hero.4.title",
    text: "hero.4.text",
    cta: "hero.4.cta",
    href: "/livestock/beef",
  },
];

let lang = localStorage.getItem("kagunga.lang") || "sw";
const pair = localStorage.getItem("kagunga.pair") || "a";
document.documentElement.dataset.pair = pair;
const cards = localStorage.getItem("kagunga.cards") || "";
if (cards) document.documentElement.dataset.cards = cards;
let current = 0;
let timer;

function t(key) {
  return extra[lang]?.[key] || base[lang]?.[key] || extra.en?.[key] || base.en[key] || key;
}

function applyI18n(animateHero = false) {
  document.documentElement.lang = lang === "sw" ? "sw" : "en";
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    if (el.closest("#hero-copy")) return;
    const key = el.getAttribute("data-i18n");
    if (key) el.textContent = t(key);
  });
  const title = document.querySelector("title[data-i18n]");
  if (title) document.title = t(title.getAttribute("data-i18n"));
  const desc = document.querySelector('meta[name="description"][data-i18n]');
  if (desc) desc.setAttribute("content", t(desc.getAttribute("data-i18n")));
  const langBtn = document.getElementById("lang-toggle");
  if (langBtn) {
    langBtn.setAttribute("aria-label", t("nav.lang"));
    langBtn.classList.toggle("is-en", lang === "en");
    langBtn.classList.toggle("is-sw", lang === "sw");
    langBtn.querySelectorAll(".lang-code").forEach((opt) => {
      opt.classList.toggle("is-on", opt.dataset.side === lang);
    });
  }
  paintWa();
  if (slides.length) paintHero(current, animateHero);
}

const waKeys = ["wa.1", "wa.2", "wa.3", "wa.4", "wa.5", "wa.6"];
let waIndex = 0;

function paintWa() {
  const el = document.getElementById("wa-prompt");
  if (el) el.textContent = t(waKeys[waIndex % waKeys.length]);
}

if (document.getElementById("wa-prompt")) {
  window.setInterval(() => {
    waIndex += 1;
    paintWa();
  }, 3800);
}

function paintHero(index, animate = true) {
  const item = heroSlides[index];
  if (!item || !heroCopy) return;
  const write = () => {
    const kicker = document.getElementById("hero-kicker");
    const titleEl = document.getElementById("hero-title");
    const text = document.getElementById("hero-text");
    if (kicker) kicker.textContent = t(item.kicker);
    if (titleEl) titleEl.textContent = t(item.title);
    if (text) text.textContent = t(item.text);
    if (heroCta) {
      heroCta.textContent = t(item.cta);
      heroCta.setAttribute("href", item.href);
    }
    heroCopy.classList.remove("is-swap");
  };
  const reveal = () => {
    write();
    heroCopy.classList.add("is-in");
    requestAnimationFrame(() => heroCopy.classList.remove("is-swap"));
  };
  if (!animate) {
    reveal();
    return;
  }
  heroCopy.classList.remove("is-in");
  heroCopy.classList.add("is-swap");
  window.setTimeout(reveal, 380);
}

function goTo(index) {
  current = (index + slides.length) % slides.length;
  hero?.classList.add("is-crossing");
  slides.forEach((slide, i) => {
    slide.classList.toggle("is-on", i === current);
  });
  dotsWrap?.querySelectorAll("button").forEach((dot, i) => dot.classList.toggle("is-on", i === current));
  paintHero(current);
  window.setTimeout(() => hero?.classList.remove("is-crossing"), 700);
}

function play() {
  clearInterval(timer);
  if (slides.length < 2) return;
  timer = setInterval(() => goTo(current + 1), 9000);
}

if (dotsWrap && slides.length) {
  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Slide ${i + 1}`);
    if (i === 0) dot.classList.add("is-on");
    dot.addEventListener("click", () => {
      goTo(i);
      play();
    });
    dotsWrap.appendChild(dot);
  });
  play();
}

document.getElementById("lang-toggle")?.addEventListener("click", () => {
  lang = lang === "en" ? "sw" : "en";
  localStorage.setItem("kagunga.lang", lang);
  applyI18n();
});

function closeDrops() {
  document.querySelectorAll(".has-drop").forEach((item) => {
    item.classList.remove("open");
    item.querySelector("button")?.setAttribute("aria-expanded", "false");
  });
}

function socialMarkup() {
  return `
    <a href="https://wa.me/255764979790" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><i class="fab fa-whatsapp" aria-hidden="true"></i></a>
    <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f" aria-hidden="true"></i></a>
    <a href="#" aria-label="Instagram"><i class="fab fa-instagram" aria-hidden="true"></i></a>
    <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin-in" aria-hidden="true"></i></a>
  `;
}

function paintChrome() {
  const menu = document.getElementById("nav-menu");
  if (menu && !menu.querySelector(".nav-reach-wrap")) {
    const item = document.createElement("li");
    item.className = "nav-reach-wrap";
    item.innerHTML = `
      <div class="nav-reach">
        <a href="tel:+255764979790" aria-label="0764 979 790"><i class="fas fa-phone" aria-hidden="true"></i><small>0764 979 790</small></a>
        <a href="mailto:info@kagungafarms.co.tz" aria-label="info@kagungafarms.co.tz"><i class="fas fa-envelope" aria-hidden="true"></i><small class="reach-at">info@kagungafarms.co.tz</small></a>
        <a href="/contact" aria-label="Magoda Street, Njombe"><i class="fas fa-location-dot" aria-hidden="true"></i><small>Magoda Street</small></a>
        <div class="social">${socialMarkup()}</div>
      </div>
    `;
    menu.appendChild(item);
  }
}

document.querySelectorAll(".has-drop").forEach((item) => {
  const button = item.querySelector(":scope > button");
  button?.addEventListener("click", (event) => {
    event.stopPropagation();
    const open = item.classList.contains("open");
    closeDrops();
    if (!open) {
      item.classList.add("open");
      button.setAttribute("aria-expanded", "true");
    } else {
      button.blur();
    }
  });
  item.addEventListener("mouseenter", () => {
    if (window.matchMedia("(max-width: 899px)").matches) return;
    closeDrops();
    item.classList.add("open");
    button?.setAttribute("aria-expanded", "true");
  });
  item.addEventListener("mouseleave", () => {
    if (window.matchMedia("(max-width: 899px)").matches) return;
    item.classList.remove("open");
    button?.setAttribute("aria-expanded", "false");
  });
});

document.addEventListener("click", () => closeDrops());

const toggle = document.querySelector(".nav-toggle");
const veil = document.getElementById("nav-veil");

function setMenu(open) {
  const menu = document.getElementById("nav-menu");
  menu?.classList.toggle("is-open", open);
  header?.classList.toggle("header-open", open);
  toggle?.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("nav-locked", open);
  if (veil) {
    veil.hidden = false;
    veil.setAttribute("aria-hidden", String(!open));
  }
  if (!open) closeDrops();
}

document.getElementById("nav-menu")?.addEventListener("click", (event) => {
  event.stopPropagation();
});

toggle?.addEventListener("click", () => {
  setMenu(!header?.classList.contains("header-open"));
});
document.querySelector(".nav-close")?.addEventListener("click", () => setMenu(false));
veil?.addEventListener("click", () => setMenu(false));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeDrops();
    setMenu(false);
  }
});

function onScroll() {
  if (!header?.classList.contains("is-over-hero")) return;
  header.classList.toggle("is-solid", window.scrollY > 16);
}

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -12% 0px" }
);

document.querySelectorAll(".rise").forEach((el) => {
  io.observe(el);
  const rect = el.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.88 && rect.bottom > 0) {
    el.classList.add("in");
    io.unobserve(el);
  }
});

document.getElementById("enquiry")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const message = String(data.get("message") || "").trim();
  if (!name || !message) return;
  const interest = String(data.get("interest") || "other");
  const inbox = interest === "partner" || interest === "buyer" ? "sales@kagungafarms.co.tz" : "info@kagungafarms.co.tz";
  const body = `Name: ${name}\nOrganisation: ${data.get("org") || ""}\nInterest: ${interest}\n\n${message}`;
  window.location.href = `mailto:${inbox}?subject=${encodeURIComponent("Kagunga Farms")}&body=${encodeURIComponent(body)}`;
});

paintChrome();
applyI18n(false);
