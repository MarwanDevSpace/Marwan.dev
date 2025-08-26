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

const cursor = document.getElementById("cursor");
if (cursor) {
  let rafId = 0, cx = 0, cy = 0;
  const move = (x, y) => { 
    cx = x; cy = y; 
    cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%,-50%)`; 
  };
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

// Contact page handling (Instagram focus)
emitter.on("render", (route) => {
  if (route !== "contact") return;
  console.log("Instagram contact page rendered");
});

// Prompts system
const PROMPTS_DATA = [
  {
    id: "1",
    title: "المساعد الشرعي",
    description: "أمر لإنشاء مساعد شرعي يقوم بالبحث والتحليل الفقهي والأصولي بأسلوب عربي فصيح وبلاغة علمية",
    prompt: "أنت المساعد الشرعي 👨🏻‍⚕️، خبير في الفقه وأصوله وعلوم الشريعة كافة. مهمتك هي خدمة المستخدم بالبحث والتحليل الشرعي الدقيق، جامعاً بين عمق الفقه وصفاء البيان، متتبعاً المسائل من جذورها في أصولها ومصادرها، ومفصلاً فروعها بأدق استنباط.\n\nمهمتك أن تكون عوناً في العلم، تستقصي النصوص من الكتاب والسنة، وتتأمل في كلام أهل العلم من المذاهب، ثم تقدّم جواباً مبنياً على التحليل الشرعي الرصين، مطرزاً ببلاغة عربية تليق بعظمة هذا العلم.\n\nالمنهجية:\n1- البحث الموسع في النصوص الشرعية والمراجع الفقهية.\n2- الاستدلال بالأدلة الشرعية مع عزوها لمصادرها.\n3- بيان الخلاف الفقهي إن وُجد مع الترجيح المدعوم بالحجة.\n4- استخدام أسلوب عربي فصيح وبلاغة قوية توصل المعلومة بوضوح.\n\nاكتب الإجابة باللغة العربية الفصحى، مبنية على أصول العلم، مع بيان الحكم الشرعي والتحليل الوافي."
  }
];

// Render prompts page
emitter.on("render", (route) => {
  if (route !== "prompts") return;
  
  console.log("Rendering prompts page...");
  
  // Wait a bit for DOM to be ready
  setTimeout(() => {
    renderPrompts();
  }, 100);
});

function renderPrompts() {
  const list = document.getElementById("prompts-list");
  if (!list) {
    console.error("Prompts list element not found!");
    return;
  }
  
  console.log(`Rendering ${PROMPTS_DATA.length} prompts...`);
  
  // Clear the list
  list.innerHTML = "";
  
  // Render each prompt
  PROMPTS_DATA.forEach((prompt, index) => {
    const card = createPromptCard(prompt, index);
    list.appendChild(card);
  });
  
  // Add event listeners
  addPromptEventListeners();
  
  console.log("Prompts rendered successfully!");
}

function createPromptCard(prompt, index) {
  const card = document.createElement("article");
  card.className = "prompt-card";
  card.innerHTML = `
    <div class="prompt-header">
      <div class="prompt-number">${String(index + 1).padStart(2, '0')}</div>
      <h2 class="h2">${prompt.title}</h2>
    </div>
    
    <div class="prompt-description">
      <p class="muted">${prompt.description}</p>
    </div>
    
    <div class="prompt-content">
      <label class="prompt-label">الأمر:</label>
      <div class="prompt-textarea-wrapper">
        <textarea class="prompt-textarea" readonly rows="6">${prompt.prompt}</textarea>
        <div class="prompt-overlay">
          <button class="copy-btn-overlay" type="button" aria-label="نسخ الأمر">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2v1"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <div class="prompt-actions">
      <button class="btn btn-primary copy-btn" type="button">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2v1"></path>
        </svg>
        نسخ الأمر
      </button>
      <span class="copy-status" role="status" aria-live="polite"></span>
    </div>
  `;
  
  return card;
}

function addPromptEventListeners() {
  console.log("Adding prompt event listeners...");
  
  // Handle main copy buttons
  document.querySelectorAll(".copy-btn").forEach(btn => {
    btn.addEventListener("click", handleCopy);
  });
  
  // Handle overlay copy buttons
  document.querySelectorAll(".copy-btn-overlay").forEach(btn => {
    btn.addEventListener("click", handleCopy);
  });
  
  console.log("Event listeners added successfully!");
}

async function handleCopy(e) {
  const card = e.currentTarget.closest(".prompt-card");
  const textarea = card.querySelector(".prompt-textarea");
  const status = card.querySelector(".copy-status");
  
  try {
    await navigator.clipboard.writeText(textarea.value);
    status.textContent = "تم النسخ! ✓";
    status.className = "copy-status success";
    
    setTimeout(() => {
      status.textContent = "";
      status.className = "copy-status";
    }, 2000);
    
    console.log("Prompt copied successfully!");
  } catch (error) {
    console.error("Failed to copy prompt:", error);
    status.textContent = "فشل النسخ";
    status.className = "copy-status error";
    
    setTimeout(() => {
      status.textContent = "";
      status.className = "copy-status";
    }, 2000);
  }
}
