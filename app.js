/* Arabic AI Prompts Website - GitHub Dark Theme Design System */

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

:root {
  /* GitHub Dark Theme Color System */
  --gh-canvas-default: #0d1117;
  --gh-canvas-overlay: #161b22;
  --gh-canvas-inset: #010409;
  --gh-canvas-subtle: #21262d;
  
  --gh-border-default: #30363d;
  --gh-border-muted: #21262d;
  --gh-border-subtle: rgba(240, 246, 252, 0.1);
  
  --gh-fg-default: #e6edf3;
  --gh-fg-muted: #7d8590;
  --gh-fg-subtle: #656d76;
  --gh-fg-on-emphasis: #ffffff;
  
  --gh-accent-fg: #2f81f7;
  --gh-accent-emphasis: #1f6feb;
  --gh-accent-subtle: rgba(56, 139, 253, 0.15);
  
  --gh-success-fg: #3fb950;
  --gh-success-emphasis: #238636;
  --gh-success-subtle: rgba(46, 160, 67, 0.15);
  
  --gh-danger-fg: #f85149;
  --gh-danger-emphasis: #da3633;
  
  --gh-warning-fg: #d29922;
  --gh-warning-emphasis: #9e6a03;
  
  --gh-neutral-emphasis: #6e7681;
  --gh-neutral-subtle: rgba(110, 118, 129, 0.4);
  
  /* Enhanced gradients and effects */
  --gradient-brand: linear-gradient(135deg, #2f81f7, #1f6feb);
  --gradient-success: linear-gradient(135deg, #3fb950, #238636);
  --gradient-card: linear-gradient(145deg, var(--gh-canvas-overlay), #1c2128);
  --gradient-border: linear-gradient(90deg, transparent, var(--gh-border-subtle), transparent);
  --gradient-instagram: linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
  
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  --shadow-glow: 0 0 40px rgba(47, 129, 247, 0.4);
  
  --radius: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  
  --transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --transition-fast: all 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

* {
  box-sizing: border-box;
}

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  background: var(--gh-canvas-default);
  color: var(--gh-fg-default);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', sans-serif;
  font-size: 14px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  min-height: 100vh;
  direction: rtl;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 16px;
}

/* Skip Link */
.skip-link {
  position: absolute;
  left: 16px;
  top: -40px;
  background: var(--gh-canvas-overlay);
  color: var(--gh-fg-default);
  padding: 8px 12px;
  border-radius: var(--radius);
  border: 1px solid var(--gh-border-default);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: var(--transition);
}

.skip-link:focus {
  top: 16px;
  outline: 2px solid var(--gh-accent-fg);
  outline-offset: 2px;
}

/* Header */
.site-header {
  position: sticky;
  top: 0;
  background: rgba(13, 17, 23, 0.8);
  backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid var(--gh-border-default);
  z-index: 50;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--gh-fg-default);
  text-decoration: none;
  transition: var(--transition);
}

.brand:hover {
  color: var(--gh-accent-fg);
}

.brand-mark {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: var(--gradient-brand);
  border-radius: var(--radius);
  font-weight: 600;
  font-size: 16px;
  color: var(--gh-fg-on-emphasis);
  box-shadow: var(--shadow-md);
}

.brand-name {
  font-size: 16px;
  font-weight: 600;
}

/* Navigation */
.nav {
  display: flex;
  align-items: center;
}

.nav-toggle {
  display: none;
  background: transparent;
  border: 1px solid var(--gh-border-default);
  color: var(--gh-fg-default);
  padding: 8px 12px;
  border-radius: var(--radius);
  cursor: pointer;
  font-size: 16px;
}

.nav-list {
  display: flex;
  gap: 4px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  display: inline-flex;
  align-items: center;
  color: var(--gh-fg-default);
  text-decoration: none;
  padding: 8px 16px;
  border-radius: var(--radius);
  font-weight: 500;
  font-size: 14px;
  transition: var(--transition);
  position: relative;
}

.nav-link:hover {
  background: var(--gh-canvas-subtle);
  color: var(--gh-fg-default);
}

.nav-link.is-active {
  background: var(--gh-accent-subtle);
  color: var(--gh-accent-fg);
}

/* Main Content */
.page {
  padding: 32px 0 64px;
}

.page-transition {
  opacity: 0;
  transform: translateY(8px);
  transition: var(--transition);
}

.page-transition.is-ready {
  opacity: 1;
  transform: translateY(0);
}

/* Cards */
.card {
  background: var(--gradient-card);
  border: 1px solid var(--gh-border-default);
  border-radius: var(--radius-lg);
  padding: 24px;
  transition: var(--transition);
  position: relative;
  overflow: hidden;
}

.card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--gradient-border);
  opacity: 0.6;
}

.card:hover {
  border-color: var(--gh-border-subtle);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

/* Hero Section */
.hero {
  padding: 48px 24px;
  text-align: center;
}

.hxl {
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 800;
  line-height: 1.2;
  margin: 0 0 16px;
  background: var(--gradient-brand);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.h1 {
  font-size: clamp(24px, 4vw, 32px);
  font-weight: 700;
  line-height: 1.3;
  margin: 0 0 16px;
  color: var(--gh-fg-default);
}

.h2 {
  font-size: 20px;
  font-weight: 600;
  line-height: 1.4;
  margin: 0 0 12px;
  color: var(--gh-fg-default);
}

.h3 {
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
  margin: 0 0 8px;
  color: var(--gh-fg-default);
}

.lead {
  font-size: 18px;
  line-height: 1.6;
  color: var(--gh-fg-muted);
  margin: 8px 0 24px;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: var(--radius);
  border: 1px solid var(--gh-border-default);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  transition: var(--transition);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background: transparent;
}

.btn:focus-visible {
  outline: 2px solid var(--gh-accent-fg);
  outline-offset: 2px;
}

.btn-primary {
  background: var(--gradient-brand);
  color: var(--gh-fg-on-emphasis);
  border-color: transparent;
  box-shadow: var(--shadow);
}

.btn-primary:hover {
  background: linear-gradient(135deg, #4285f4, #2f81f7);
  box-shadow: var(--shadow-lg);
  transform: translateY(-1px);
}

.btn-secondary {
  background: var(--gh-canvas-overlay);
  color: var(--gh-fg-default);
  border-color: var(--gh-border-default);
}

.btn-secondary:hover {
  background: var(--gh-canvas-subtle);
  border-color: var(--gh-border-subtle);
}

.btn-boost {
  background: linear-gradient(135deg, #238636, #2ea043);
  color: var(--gh-fg-on-emphasis);
  border-color: transparent;
  font-weight: 600;
  box-shadow: var(--shadow-md);
}

.btn-boost:hover {
  background: linear-gradient(135deg, #2ea043, #238636);
  box-shadow: var(--shadow-xl);
  transform: translateY(-2px);
}

.btn-boost .arrow-icon {
  transition: var(--transition);
}

.btn-boost:hover .arrow-icon {
  transform: translateX(-4px);
}

.btn-instagram {
  background: var(--gradient-instagram);
  color: var(--gh-fg-on-emphasis);
  border-color: transparent;
  font-weight: 600;
  box-shadow: var(--shadow-md);
}

.btn-instagram:hover {
  opacity: 0.9;
  transform: translateY(-1px);
  box-shadow: var(--shadow-lg);
}

.cta-row {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 24px;
}

/* Grid */
.grid {
  display: grid;
  gap: 24px;
  margin-top: 24px;
}

.grid.two {
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .grid.two {
    grid-template-columns: 1fr 1fr;
  }
}

/* Checklist */
.checklist {
  list-style: none;
  margin: 16px 0;
  padding: 0;
}

.checklist li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin: 12px 0;
  padding: 0;
}

.checklist li::before {
  content: "✓";
  color: var(--gh-success-fg);
  font-weight: 600;
  font-size: 16px;
  margin-top: 2px;
  flex-shrink: 0;
}

/* Robot Animation */
.robot-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  padding: 24px;
}

.robot-icon {
  width: clamp(120px, 25vw, 280px);
  height: auto;
  filter: drop-shadow(0 4px 12px rgba(47, 129, 247, 0.3));
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
}

/* Prompts System */
.prompts-container {
  margin-top: 24px;
}

.prompts-grid {
  display: grid;
  gap: 24px;
  margin-top: 24px;
}

@media (min-width: 768px) {
  .prompts-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.prompt-card {
  background: var(--gradient-card);
  border: 1px solid var(--gh-border-default);
  border-radius: var(--radius-lg);
  padding: 24px;
  transition: var(--transition);
  position: relative;
}

.prompt-card:hover {
  border-color: var(--gh-border-subtle);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.prompt-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.prompt-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: var(--gradient-brand);
  color: var(--gh-fg-on-emphasis);
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 14px;
  box-shadow: var(--shadow);
}

.prompt-description {
  margin-bottom: 16px;
}

.prompt-description p {
  margin: 0;
  color: var(--gh-fg-muted);
  line-height: 1.5;
}

.prompt-content {
  margin-bottom: 16px;
}

.prompt-label {
  display: block;
  color: var(--gh-fg-default);
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 8px;
}

.prompt-textarea-wrapper {
  position: relative;
}

.prompt-textarea {
  width: 100%;
  background: var(--gh-canvas-inset);
  color: var(--gh-fg-default);
  border: 1px solid var(--gh-border-default);
  border-radius: var(--radius);
  padding: 12px;
  font-family: 'JetBrains Mono', 'SF Mono', Consolas, monospace;
  font-size: 12px;
  line-height: 1.5;
  resize: none;
  outline: none;
  transition: var(--transition);
}

.prompt-textarea:focus {
  border-color: var(--gh-accent-fg);
  box-shadow: 0 0 0 3px var(--gh-accent-subtle);
}

.prompt-overlay {
  position: absolute;
  inset: 0;
  background: rgba(1, 4, 9, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius);
  opacity: 0;
  transition: var(--transition);
}

.prompt-card:hover .prompt-overlay {
  opacity: 1;
}

.copy-btn-overlay {
  background: var(--gradient-brand);
  color: var(--gh-fg-on-emphasis);
  border: none;
  border-radius: var(--radius);
  padding: 12px 16px;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  gap: 8px;
}

.copy-btn-overlay:hover {
  background: linear-gradient(135deg, #4285f4, #2f81f7);
  transform: scale(1.05);
}

.prompt-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.copy-status {
  font-size: 12px;
  color: var(--gh-fg-muted);
  transition: var(--transition);
}

.copy-status.success {
  color: var(--gh-success-fg);
  font-weight: 500;
}

.copy-status.error {
  color: var(--gh-danger-fg);
  font-weight: 500;
}

/* Instagram Contact */
.instagram-container {
  margin-top: 32px;
  display: flex;
  justify-content: center;
}

.instagram-card {
  background: var(--gradient-card);
  border: 1px solid var(--gh-border-default);
  border-radius: var(--radius-xl);
  padding: 32px;
  max-width: 500px;
  width: 100%;
  text-align: center;
  transition: var(--transition);
  position: relative;
  overflow: hidden;
}

.instagram-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--gradient-instagram);
}

.instagram-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
  border-color: var(--gh-border-subtle);
}

.instagram-header {
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: center;
  margin-bottom: 24px;
}

.instagram-logo {
  background: var(--gradient-instagram);
  border-radius: var(--radius-lg);
  padding: 16px;
  box-shadow: var(--shadow-md);
}

.instagram-logo svg {
  color: var(--gh-fg-on-emphasis);
  width: 32px;
  height: 32px;
}

.instagram-info {
  text-align: right;
}

.instagram-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 4px;
  background: var(--gradient-instagram);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.instagram-handle {
  font-size: 14px;
  color: var(--gh-fg-muted);
  margin: 0;
  font-weight: 500;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--gradient-success);
  color: var(--gh-fg-on-emphasis);
  padding: 8px 16px;
  border-radius: 99999px;
  font-weight: 500;
  font-size: 12px;
  margin-bottom: 16px;
  box-shadow: var(--shadow);
}

.status-indicator {
  width: 8px;
  height: 8px;
  background: var(--gh-fg-on-emphasis);
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.1); }
}

.instagram-description {
  color: var(--gh-fg-default);
  font-size: 16px;
  line-height: 1.5;
  margin: 0 0 24px;
}

.instagram-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--gradient-instagram);
  color: var(--gh-fg-on-emphasis);
  text-decoration: none;
  padding: 12px 24px;
  border-radius: var(--radius-lg);
  font-weight: 600;
  font-size: 14px;
  transition: var(--transition);
  box-shadow: var(--shadow-md);
}

.instagram-btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-lg);
}

/* About Page */
.about-grid {
  display: grid;
  gap: 24px;
  margin-top: 32px;
}

@media (min-width: 768px) {
  .about-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.about-highlight {
  background: var(--gh-canvas-subtle);
  border: 1px solid var(--gh-border-default);
  border-radius: var(--radius-lg);
  padding: 24px;
  margin-top: 32px;
}

.skills-list {
  list-style: none;
  padding: 0;
  margin: 16px 0;
}

.skills-list li {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 8px 0;
}

.skill-dot {
  width: 8px;
  height: 8px;
  background: var(--gh-accent-fg);
  border-radius: 50%;
  flex-shrink: 0;
}

/* Instructions */
.instructions {
  margin-top: 32px;
}

.instruction-step {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin: 16px 0;
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: var(--gradient-brand);
  color: var(--gh-fg-on-emphasis);
  border-radius: 50%;
  font-weight: 600;
  font-size: 12px;
  flex-shrink: 0;
  margin-top: 2px;
}

/* Footer */
.site-footer {
  border-top: 1px solid var(--gh-border-default);
  padding: 24px 0;
  margin-top: 64px;
}

.footer-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.end-panel {
  position: fixed;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 60;
}

.end-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px 16px;
  background: rgba(22, 27, 34, 0.9);
  border: 1px solid var(--gh-border-default);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  backdrop-filter: saturate(180%) blur(20px);
}

.end-copy {
  margin: 0;
  color: var(--gh-fg-default);
  font-weight: 600;
  font-size: 12px;
}

.gen-note {
  color: var(--gh-fg-muted);
  text-decoration: none;
  font-size: 11px;
  font-weight: 500;
  border-bottom: 1px dotted var(--gh-border-default);
  padding-bottom: 1px;
}

.gen-note:hover {
  color: var(--gh-accent-fg);
  border-bottom-color: var(--gh-accent-fg);
}

/* Responsive */
@media (max-width: 768px) {
  .container {
    padding: 0 12px;
  }

  .nav-toggle {
    display: block;
  }

  .nav-list {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(13, 17, 23, 0.95);
    backdrop-filter: saturate(180%) blur(20px);
    border: 1px solid var(--gh-border-default);
    border-top: none;
    border-radius: 0 0 var(--radius-lg) var(--radius-lg);
    padding: 8px;
    flex-direction: column;
    gap: 4px;
    display: none;
  }

  .nav-list.open {
    display: flex;
  }

  .nav-link {
    width: 100%;
    justify-content: center;
    padding: 12px 16px;
  }

  .hero {
    padding: 32px 16px;
  }

  .card {
    padding: 20px;
  }

  .prompt-card {
    padding: 20px;
  }

  .instagram-card {
    padding: 24px 20px;
    margin: 0 12px;
  }

  .instagram-header {
    flex-direction: column;
    text-align: center;
  }

  .instagram-info {
    text-align: center;
  }

  /* Mobile button alignment to match header */
  .cta-row {
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .btn {
    width: 100%;
    max-width: 280px;
    justify-content: center;
  }
}

/* Utility classes */
.hidden {
  display: none !important;
}

.fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--gh-canvas-inset);
}

::-webkit-scrollbar-thumb {
  background: var(--gh-border-default);
  border-radius: var(--radius);
}

::-webkit-scrollbar-thumb:hover {
  background: var(--gh-border-subtle);
}

/* Selection */
::selection {
  background: var(--gh-accent-subtle);
  color: var(--gh-fg-on-emphasis);
}
