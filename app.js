// Arabic AI Prompts Website - JavaScript Functionality

class AIPromptsApp {
  constructor() {
    this.currentRoute = 'home';
    this.prompts = [];
    this.init();
  }

  async init() {
    await this.loadPrompts();
    this.setupEventListeners();
    this.setupNavigation();
    this.handleInitialRoute();
  }

  async loadPrompts() {
    try {
      const response = await fetch('prompts.json');
      this.prompts = await response.json();
    } catch (error) {
      console.error('Failed to load prompts:', error);
      this.prompts = [];
    }
  }

  setupEventListeners() {
    // Navigation toggle for mobile
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (navToggle && navList) {
      navToggle.addEventListener('click', () => {
        const isOpen = navList.classList.contains('open');
        navList.classList.toggle('open', !isOpen);
        navToggle.setAttribute('aria-expanded', String(!isOpen));
      });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav') && navList?.classList.contains('open')) {
        navList.classList.remove('open');
        navToggle?.setAttribute('aria-expanded', 'false');
      }
    });

    // Handle navigation clicks
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[data-route]');
      if (link) {
        e.preventDefault();
        const route = link.dataset.route;
        this.navigateTo(route);
        
        // Close mobile menu if open
        if (navList?.classList.contains('open')) {
          navList.classList.remove('open');
          navToggle?.setAttribute('aria-expanded', 'false');
        }
      }
    });

    // Handle browser back/forward
    window.addEventListener('popstate', (e) => {
      const route = e.state?.route || this.getRouteFromPath();
      this.currentRoute = route;
      this.renderContent(route);
      this.updateActiveNav();
      this.updatePageTitle(route);
    });
  }

  setupNavigation() {
    // Set active navigation state
    this.updateActiveNav();
  }

  getRouteFromPath() {
    const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
    const validRoutes = ['home', 'about', 'contact', 'prompts'];
    return validRoutes.includes(path) ? path : 'home';
  }

  navigateTo(route, pushState = true) {
    this.currentRoute = route;
    this.renderPage(route, pushState);
  }

  renderPage(route, pushState = true) {
    this.currentRoute = route;
    
    if (pushState) {
      const url = route === 'home' ? '/' : `/${route}`;
      window.history.pushState({ route }, '', url);
    }
    
    this.updateActiveNav();
    this.renderContent(route);
    this.updatePageTitle(route);
    
    // Focus main content for accessibility
    const main = document.getElementById('main');
    if (main) {
      main.focus();
    }
  }

  handleInitialRoute() {
    const route = this.getRouteFromPath();
    this.currentRoute = route;
    this.renderContent(route);
    this.updateActiveNav();
    this.updatePageTitle(route);
  }

  updateActiveNav() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      const isActive = link.dataset.route === this.currentRoute;
      link.classList.toggle('is-active', isActive);
    });
  }

  updatePageTitle(route) {
    const titles = {
      home: 'عزز ذكاءك الإصطناعي - Marwan.dev',
      about: 'عنّي - Marwan.dev',
      contact: 'تواصل - Marwan.dev',
      prompts: 'أوامري الخاصة - Marwan.dev'
    };
    document.title = titles[route] || titles.home;
  }

  renderContent(route) {
    const pageRoot = document.getElementById('page-root');
    if (!pageRoot) return;

    // Add transition effect
    pageRoot.classList.remove('is-ready');
    
    setTimeout(() => {
      pageRoot.innerHTML = this.getPageContent(route);
      
      // Setup page-specific functionality
      if (route === 'prompts') {
        this.setupPromptsPage();
      }
      
      // Add fade-in effect
      setTimeout(() => {
        pageRoot.classList.add('is-ready');
      }, 50);
    }, 150);
  }

  getPageContent(route) {
    switch (route) {
      case 'home':
        return this.getHomeContent();
      case 'about':
        return this.getAboutContent();
      case 'contact':
        return this.getContactContent();
      case 'prompts':
        return this.getPromptsContent();
      default:
        return this.getHomeContent();
    }
  }

  getHomeContent() {
    return `
      <section class="card hero">
        <h1 class="hxl">مرحباً</h1>
        <p class="lead">مدونة خاصة مختصة لتعزيز ذكاءك الإصطناعي بطريقة فصاحة اللغة</p>
        <div class="cta-row">
          <a class="btn btn-primary" data-route="contact" href="/contact">تواصل</a>
          <a class="btn btn-secondary" data-route="about" href="/about">عنّي</a>
          <a class="btn btn-boost" data-route="prompts" href="/prompts">
            <span class="btn-text">عزز بالأوامر</span>
            <svg class="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </section>

      <section class="grid two">
        <article class="card">
          <h2 class="h2">مهاراتي المتواضعة</h2>
          <ul class="checklist">
            <li>تنسيق أوامر مصممة لإعطاء أفضل النتائج.</li>
            <li>فهم عميق في موديلات الذكاء الاصطناعي وعملها.</li>
            <li>معرفة كبيرة في موديلات إنشاء الصور والفيديوهات.</li>
            <li>اختصاص أوامر باللغة العربية تحديداً.</li>
          </ul>
        </article>
        <article class="card">
          <div class="robot-wrap">
            <svg class="robot-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1C12.3631 1 12.6978 1.19689 12.8741 1.51436L22.8741 19.5143C23.2377 20.1687 22.7486 21 22 21L15.6363 21C15.2896 21 14.9675 20.8204 14.7854 20.5253L10.3787 13.3863C8.47776 10.3069 8.38895 6.4407 10.1464 3.27722L11.1258 1.51436C11.3022 1.19689 11.6368 1 12 1ZM12 4.05912C10.5615 6.64846 10.5044 9.78249 12.0805 12.3358L16.1942 19L20.3005 19L12 4.05912Z" fill="currentColor"></path>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M9.2727 21C9.66564 21 10.0222 20.7699 10.184 20.4118C10.8232 18.5999 10.7168 16.6428 10.2409 14.8C9.80541 13.1133 9.06064 11.2016 7.63993 10.0831C7.1613 9.74036 6.46941 9.89587 6.1835 10.4105L1.12581 19.5143C0.762257 20.1687 1.25136 21 1.99997 21H9.2727ZM8.30446 15.3C7.98569 14.0655 7.5767 13.2119 7.22782 12.649L3.69948 19H8.52032C8.65345 18.3163 8.75857 17.0586 8.30446 15.3Z" fill="currentColor"></path>
            </svg>
          </div>
        </article>
      </section>
    `;
  }

  getAboutContent() {
    return `
      <section class="card">
        <h1 class="h1">عنّي</h1>
        <p>
          أنا مروان عبدالحافظ، خبير أوامر ذكاء اصطناعي بمعرفة متواضعة، عندي الإيمان الكامل بقوة مخالطة لغتنا العربية بنماذج الذكاء الاصطناعي أقوى من باقي لغات العالم بمستويات متقدمة نظراً لقوة وبلاغة لغة القرآن وهذا سبب دخولي لهذا المجال
        </p>
        <div class="about-grid">
          <div>
            <h3 class="h3">ما هدفي؟</h3>
            <p>هدفي هو التوعية التقنية والتطوير بإستخدام اللغة العربية وحقن أوامر الذكاء الاصطناعي ببلاغة اللغة لإعطاء أقوى النتائج</p>
          </div>
          <div>
            <h3 class="h3">مجالات اهتمامي</h3>
            <ul class="skills-list">
              <li><span class="skill-dot"></span>هندسة الأوامر (Prompt Engineering)</li>
              <li><span class="skill-dot"></span>نماذج اللغة الكبيرة (LLMs)</li>
              <li><span class="skill-dot"></span>الذكاء الاصطناعي التوليدي</li>
              <li><span class="skill-dot"></span>التطبيقات العربية للذكاء الاصطناعي</li>
            </ul>
          </div>
        </div>
        <div class="about-highlight">
          <h3 class="h3">رؤيتي</h3>
          <p>
            أسعى لجعل التقنيات المتقدمة للذكاء الاصطناعي متاحة ومفهومة للمجتمع العربي، من خلال تطوير أوامر ونماذج تستفيد من قوة وثراء اللغة العربية لتحقيق نتائج استثنائية.
          </p>
        </div>
      </section>
    `;
  }

  getContactContent() {
    return `
      <section class="card hero">
        <h1 class="h1">تواصل معي</h1>
        <p class="lead">تابعني على منصة الانستغرام، جاهز للتواصل دائماً</p>
      </section>
      
      <section class="instagram-container">
        <div class="instagram-card">
          <div class="instagram-header">
            <div class="instagram-logo">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </div>
            <div class="instagram-info">
              <h2 class="instagram-title">Instagram</h2>
              <p class="instagram-handle">@mo.os</p>
            </div>
          </div>
          
          <div class="instagram-content">
            <div class="status-badge">
              <span class="status-text">نشط</span>
              <div class="status-indicator"></div>
            </div>
            
            <p class="instagram-description">
              حياكم الله، جاهز للتواصل
            </p>
            
            <a href="https://www.instagram.com/mo.os" target="_blank" rel="noopener noreferrer" class="instagram-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15,3 21,3 21,9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              متابعة على Instagram
            </a>
          </div>
        </div>
      </section>

      <section class="card">
        <h3 class="h3">طرق التواصل الأخرى</h3>
        <ul class="skills-list">
          <li><span class="skill-dot"></span>للاستفسارات التقنية: تواصل عبر Instagram</li>
          <li><span class="skill-dot"></span>للتعاون في المشاريع: مرحب بكم</li>
          <li><span class="skill-dot"></span>لطلب أوامر مخصصة: متوفر عبر التواصل المباشر</li>
        </ul>
      </section>
    `;
  }

  getPromptsContent() {
    const promptsHtml = this.prompts.map((prompt, index) => `
      <article class="prompt-card">
        <div class="prompt-header">
          <div class="prompt-number">${String(index + 1).padStart(2, '0')}</div>
          <h2 class="h2">${prompt.title}</h2>
        </div>
        
        <div class="prompt-description">
          <p>${prompt.description}</p>
        </div>
        
        <div class="prompt-content">
          <label class="prompt-label">الأمر:</label>
          <div class="prompt-textarea-wrapper">
            <textarea class="prompt-textarea" readonly rows="6" data-prompt="${prompt.id}">${prompt.prompt}</textarea>
            <div class="prompt-overlay">
              <button class="copy-btn-overlay" type="button" aria-label="نسخ الأمر" data-prompt="${prompt.id}">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2v1"></path>
                </svg>
                نسخ
              </button>
            </div>
          </div>
        </div>
        
        <div class="prompt-actions">
          <button class="btn btn-primary copy-btn" type="button" data-prompt="${prompt.id}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2v1"></path>
            </svg>
            نسخ الأمر
          </button>
          <span class="copy-status" role="status" aria-live="polite" data-prompt="${prompt.id}"></span>
        </div>
      </article>
    `).join('');

    return `
      <section class="card hero">
        <h1 class="h1">أوامري الخاصة</h1>
        <p class="lead">مجموعة من الأوامر المحسّنة والمختبرة لمساعدتك في الحصول على أفضل النتائج مع الذكاء الاصطناعي</p>
      </section>
      
      <section class="prompts-container">
        <div class="prompts-grid">
          ${promptsHtml}
        </div>
      </section>

      <section class="card instructions">
        <h3 class="h3">كيفية الاستخدام</h3>
        <div class="instruction-step">
          <span class="step-number">1</span>
          <span>اختر الأمر المناسب لاحتياجك</span>
        </div>
        <div class="instruction-step">
          <span class="step-number">2</span>
          <span>انسخ الأمر بالضغط على زر "نسخ الأمر"</span>
        </div>
        <div class="instruction-step">
          <span class="step-number">3</span>
          <span>الصق الأمر في منصة الذكاء الاصطناعي المفضلة لديك</span>
        </div>
        <div class="instruction-step">
          <span class="step-number">4</span>
          <span>ابدأ المحادثة واستمتع بالنتائج المحسّنة</span>
        </div>
      </section>
    `;
  }

  setupPromptsPage() {
    // Setup copy functionality for prompts
    const copyButtons = document.querySelectorAll('.copy-btn, .copy-btn-overlay');
    copyButtons.forEach(button => {
      button.addEventListener('click', (e) => this.handlePromptCopy(e));
    });
  }

  async handlePromptCopy(e) {
    const promptId = e.currentTarget.dataset.prompt;
    const textarea = document.querySelector(`textarea[data-prompt="${promptId}"]`);
    const status = document.querySelector(`.copy-status[data-prompt="${promptId}"]`);
    const button = e.currentTarget;
    
    if (!textarea || !status) return;

    try {
      await navigator.clipboard.writeText(textarea.value);
      
      // Update button text if it's the main copy button
      if (button.classList.contains('copy-btn')) {
        const originalHtml = button.innerHTML;
        button.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 6L9 17l-5-5"></path>
          </svg>
          تم النسخ!
        `;
        button.classList.add('btn-boost');
        
        setTimeout(() => {
          button.innerHTML = originalHtml;
          button.classList.remove('btn-boost');
        }, 2000);
      }
      
      // Update status
      status.textContent = "تم النسخ! ✓";
      status.className = "copy-status success";
      
      setTimeout(() => {
        status.textContent = "";
        status.className = "copy-status";
      }, 2000);
      
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
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new AIPromptsApp();
});
