const html = document.documentElement;
const header = document.getElementById("site-header");

const look = localStorage.getItem("kagunga.look") || "editorial";
const btn = localStorage.getItem("kagunga.btn") || "fill";

function press(attr, value) {
  document.querySelectorAll(`[${attr}]`).forEach((el) => {
    if (el.tagName !== "BUTTON") return;
    el.setAttribute("aria-pressed", String(el.getAttribute(attr) === value));
  });
}

function applyLook(value) {
  html.setAttribute("data-look", value);
  localStorage.setItem("kagunga.look", value);
  press("data-look", value);
}

function applyBtn(value) {
  html.setAttribute("data-btn", value);
  localStorage.setItem("kagunga.btn", value);
  press("data-btn", value);
}

applyLook(look);
applyBtn(btn);

document.querySelector(".studio")?.addEventListener("click", (event) => {
  const lookBtn = event.target.closest("[data-look]");
  const styleBtn = event.target.closest("[data-btn]");
  if (lookBtn?.tagName === "BUTTON") applyLook(lookBtn.getAttribute("data-look"));
  if (styleBtn?.tagName === "BUTTON") applyBtn(styleBtn.getAttribute("data-btn"));
});

function closePanels() {
  document.querySelectorAll(".panel").forEach((p) => p.classList.remove("open"));
  document.querySelectorAll(".chapter").forEach((b) => b.setAttribute("aria-expanded", "false"));
}

document.querySelectorAll(".chapter").forEach((button) => {
  button.addEventListener("click", () => {
    const id = button.getAttribute("aria-controls");
    const panel = id ? document.getElementById(id) : null;
    const open = button.getAttribute("aria-expanded") === "true";
    closePanels();
    if (!open && panel) {
      button.setAttribute("aria-expanded", "true");
      panel.classList.add("open");
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closePanels();
});

function onScroll() {
  const hero = document.querySelector(".hero");
  const heroBottom = hero ? hero.getBoundingClientRect().bottom : 0;
  const over = heroBottom > 96;
  header?.classList.toggle("is-over-hero", over);
  header?.classList.toggle("is-solid", !over);
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
  { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
);

document.querySelectorAll(".reveal, .reveal-img").forEach((el) => io.observe(el));

const form = document.getElementById("enquiry");
form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const message = String(data.get("message") || "").trim();
  const note = document.getElementById("form-note");
  if (!name || !message) {
    if (note) note.textContent = "Add your name and a short message.";
    return;
  }
  const body = `Name: ${name}\nOrganisation: ${data.get("org") || ""}\nInterest: ${data.get("interest") || ""}\n\n${message}`;
  window.location.href = `mailto:info@kagungafarms.co.tz?subject=${encodeURIComponent("Kagunga Farms enquiry")}&body=${encodeURIComponent(body)}`;
});
