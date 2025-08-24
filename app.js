import { createNanoEvents } from "nanoevents";

const emitter = createNanoEvents();
const routes = {
  home: document.getElementById("tpl-home"),
  about: document.getElementById("tpl-about"),
  contact: document.getElementById("tpl-contact"),
};

const root = document.getElementById("page-root");
const nav = document.querySelector(".nav");
const navList = document.getElementById("nav-list");
const navToggle = document.querySelector(".nav-toggle");
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const cursor = document.getElementById("cursor");
if (cursor) {
  let rafId = 0, cx = 0, cy = 0;
  const move = (x, y) => { cx = x; cy = y; cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%,-50%)`; };
  const onMouseMove = (e) => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => move(e.clientX, e.clientY));
    cursor.style.opacity = 1;
  };
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseleave", () => cursor.style.opacity = 0);
  document.addEventListener("mousedown", () => cursor.classList.add("is-click"));
  document.addEventListener("mouseup", () => cursor.classList.remove("is-click"));
  document.addEventListener("mouseover", e => {
    // disable hover state visuals
    cursor.classList.remove("is-hover");
  });
}

function setActive(route) {
  document.querySelectorAll(".nav-link").forEach(a => {
    a.classList.toggle("is-active", a.dataset.route === route);
  });
}

function render(route = "home", push = false) {
  const tpl = routes[route] || routes.home;
  root.classList.remove("is-ready");
  window.requestAnimationFrame(() => {
    root.replaceChildren(tpl.content.cloneNode(true));
    setTimeout(() => root.classList.add("is-ready"), 20);
  });
  if (push) history.pushState({ route }, "", route === "home" ? "/" : `/${route}`);
  setActive(route);
  // focus main for a11y
  document.getElementById("main")?.focus();
  emitter.emit("render", route);
}

function getRouteFromPath() {
  const path = location.pathname.replace(/^\/+/, "");
  const key = path || "home";
  return routes[key] ? key : "home";
}

// Intercept nav links
document.addEventListener("click", (e) => {
  const a = e.target.closest("a[data-link]");
  if (!a) return;
  e.preventDefault();
  const route = a.dataset.route || "home";
  if (navList.classList.contains("open")) toggleMenu(false);
  render(route, true);
});

// SPA back/forward
window.addEventListener("popstate", () => render(getRouteFromPath(), false));

// Mobile nav toggle
function toggleMenu(force) {
  const open = typeof force === "boolean" ? force : !navList.classList.contains("open");
  navList.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", String(open));
}
navToggle.addEventListener("click", () => toggleMenu());

// Initial render
render(getRouteFromPath(), false);

// Form handling (dummy async UX)
emitter.on("render", (route) => {
  if (route !== "contact") return;
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if (!form) return;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.textContent = "جارٍ الإرسال...";
    await new Promise(r => setTimeout(r, 800));
    status.textContent = "تم الاستلام! سأعود إليك قريباً.";
    form.reset();
  }, { once: true });
});

// Attach interactive 3D tilt on cards, pause over buttons/links
function bindCardTilt(scope = document) {
  // disabled: no hover-based tilt effects
}

emitter.on("render", () => bindCardTilt(root));
