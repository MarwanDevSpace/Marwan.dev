import { createNanoEvents } from "nanoevents";

const emitter = createNanoEvents();
const routes = {
  home: document.getElementById("tpl-home"),
  about: document.getElementById("tpl-about"),
  contact: document.getElementById("tpl-contact"),
  prompts: document.getElementById("tpl-prompts"),
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

const LS_KEY = "posts_v1";
let posts = JSON.parse(localStorage.getItem(LS_KEY) || "[]");
function savePosts(){ localStorage.setItem(LS_KEY, JSON.stringify(posts)); }

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

function renderPosts(){
  const wrap = root.querySelector("#page-root .card") || root.querySelector(".card");
  const host = root.querySelector(".card") || wrap;
  if(!host) return;
  const empty = host.querySelector(".muted");
  if(posts.length===0){ if(!empty){ const p=document.createElement("p");p.className="muted";p.textContent="لا توجد منشورات بعد.";host.append(p);} return; }
  if(empty) empty.remove();
  const list = document.createElement("div"); list.className="list";
  posts.slice().reverse().forEach(p=>{
    const a = document.createElement("article");
    a.className = "list-item";
    a.innerHTML = `
      ${p.image ? `<img alt="" src="${p.image}" style="border-radius:8px;max-height:260px;object-fit:cover">` : ""}
      <h3 class="h3">${p.title}</h3>
      <p>${p.body}</p>`;
    list.appendChild(a);
  });
  host.appendChild(list);
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

function showAdmin(){
  const shell = document.getElementById("admin-root");
  shell.innerHTML = `
    <section class="card admin-modal" role="dialog" aria-modal="true">
      <h2 class="h2">نشر منشور جديد</h2>
      <form class="form" id="admin-form">
        <div class="field">
          <label>العنوان</label>
          <input required name="title" placeholder="عنوان المنشور">
        </div>
        <div class="field">
          <label>رابط الصورة (اختياري)</label>
          <input name="image" type="url" placeholder="https://example.com/image.jpg">
        </div>
        <div class="field">
          <label>المحتوى</label>
          <textarea required name="body" rows="6" placeholder="نص المنشور"></textarea>
        </div>
        <div class="admin-actions">
          <button type="button" class="btn btn-secondary" id="admin-cancel">إغلاق</button>
          <button type="submit" class="btn btn-primary">نشر</button>
        </div>
      </form>
    </section>`;
  shell.hidden = false; shell.setAttribute("aria-hidden","false");
  shell.addEventListener("click",(e)=>{ if(e.target===shell){ shell.hidden=true; shell.setAttribute("aria-hidden","true"); }},{once:true});
  document.getElementById("admin-cancel").addEventListener("click",()=>{ shell.hidden=true; shell.setAttribute("aria-hidden","true"); });
  document.getElementById("admin-form").addEventListener("submit",(e)=>{
    e.preventDefault();
    const fd = new FormData(e.target);
    posts.push({ id: Date.now(), title: fd.get("title").toString().trim(), body: fd.get("body").toString().trim(), image: (fd.get("image")||"").toString().trim() });
    savePosts();
    shell.hidden = true; shell.setAttribute("aria-hidden","true");
    if(getRouteFromPath()==="prompts") { render("prompts", false); }
  }, { once:false });
}

function openGate(){
  const pass = prompt("ادخل الرقم السري");
  if(pass==="M.dev"){ showAdmin(); } else { alert("رقم سري غير صحيح"); }
}
window.M = {};
Object.defineProperty(window.M, "dev", { set(v){ if(v===true) openGate(); } });
