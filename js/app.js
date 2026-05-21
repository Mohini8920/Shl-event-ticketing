/* ============================================
   SHL TICKETING SYSTEM — GLOBAL APP LOGIC
   ============================================ */

// ---- Theme Management ----
const ThemeManager = {
  init() {
    const saved = localStorage.getItem('shl-theme') || 'light';
    this.set(saved);
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.addEventListener('click', () => this.toggle());
    });
  },

  set(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('shl-theme', theme);
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    });
  },

  toggle() {
    const current = document.documentElement.getAttribute('data-theme');
    this.set(current === 'dark' ? 'light' : 'dark');
  },

  get() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }
};

// ---- Navbar Scroll Effect ----
const NavbarManager = {
  init() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    // Mobile menu
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    if (menuBtn && mobileNav) {
      menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
      });

      mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          menuBtn.classList.remove('active');
          mobileNav.classList.remove('active');
          document.body.style.overflow = '';
        });
      });
    }
  }
};

// ---- Scroll Reveal ----
const ScrollReveal = {
  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Stagger children if present
          const children = entry.target.querySelectorAll('.reveal-child');
          children.forEach((child, i) => {
            child.style.transitionDelay = `${i * 0.1}s`;
            child.classList.add('revealed');
          });
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }
};

// ---- Counter Animation ----
const CounterAnimation = {
  animate(element, target, duration = 2000) {
    const start = 0;
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.round(start + (target - start) * eased);

      element.textContent = current.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  },

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = 'true';
          const target = parseInt(entry.target.dataset.count);
          this.animate(entry.target, target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-count]').forEach(el => observer.observe(el));
  }
};

// ---- Toast Notifications ----
const Toast = {
  container: null,

  init() {
    this.container = document.createElement('div');
    this.container.className = 'toast-container';
    document.body.appendChild(this.container);
  },

  show(title, message, type = 'info', duration = 4000) {
    if (!this.container) this.init();

    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    };

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${icons[type]}</span>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close" onclick="this.parentElement.remove()">✕</button>
    `;

    this.container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
};

// ---- Modal Manager ----
const Modal = {
  open(id) {
    const backdrop = document.getElementById(id);
    if (backdrop) {
      backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  },

  close(id) {
    const backdrop = document.getElementById(id);
    if (backdrop) {
      backdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  },

  init() {
    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          backdrop.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    });

    document.querySelectorAll('.modal-close').forEach(btn => {
      btn.addEventListener('click', () => {
        const backdrop = btn.closest('.modal-backdrop');
        if (backdrop) {
          backdrop.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    });
  }
};

// ---- Accordion ----
const Accordion = {
  init() {
    document.querySelectorAll('.accordion-header').forEach(header => {
      header.addEventListener('click', () => {
        const item = header.parentElement;
        const isActive = item.classList.contains('active');

        // Close siblings
        item.parentElement.querySelectorAll('.accordion-item').forEach(sibling => {
          sibling.classList.remove('active');
        });

        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  }
};

// ---- Tabs ----
const Tabs = {
  init() {
    document.querySelectorAll('.tabs').forEach(tabGroup => {
      const buttons = tabGroup.querySelectorAll('.tab-btn');
      const contentId = tabGroup.dataset.tabs;

      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          // Update buttons
          buttons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          // Update content
          const target = btn.dataset.tab;
          const parent = contentId ? document.getElementById(contentId) : tabGroup.parentElement;
          if (parent) {
            parent.querySelectorAll('.tab-content').forEach(content => {
              content.classList.remove('active');
            });
            const targetContent = parent.querySelector(`[data-tab-content="${target}"]`);
            if (targetContent) targetContent.classList.add('active');
          }
        });
      });
    });
  }
};

// ---- Form Validation ----
const FormValidator = {
  validate(form) {
    let isValid = true;
    const required = form.querySelectorAll('[required]');

    required.forEach(field => {
      const group = field.closest('.form-group');
      const error = group ? group.querySelector('.form-error') : null;

      if (!field.value.trim()) {
        field.classList.add('error');
        if (error) error.style.display = 'flex';
        isValid = false;
      } else {
        field.classList.remove('error');
        if (error) error.style.display = 'none';
      }

      // Email validation
      if (field.type === 'email' && field.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
          field.classList.add('error');
          if (error) {
            error.style.display = 'flex';
            error.textContent = 'Please enter a valid email address';
          }
          isValid = false;
        }
      }

      // Phone validation
      if (field.type === 'tel' && field.value) {
        const phoneRegex = /^[\+]?[0-9\s\-]{10,15}$/;
        if (!phoneRegex.test(field.value)) {
          field.classList.add('error');
          if (error) {
            error.style.display = 'flex';
            error.textContent = 'Please enter a valid phone number';
          }
          isValid = false;
        }
      }
    });

    return isValid;
  },

  init() {
    document.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(field => {
      field.addEventListener('input', () => {
        field.classList.remove('error');
        const error = field.closest('.form-group')?.querySelector('.form-error');
        if (error) error.style.display = 'none';
      });
    });
  }
};

// ---- Utility Functions ----
const Utils = {
  formatCurrency(amount, currency = '₹') {
    return `${currency}${amount.toLocaleString('en-IN')}`;
  },

  formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  },

  formatDateLong(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  },

  getRelativeTime(dateStr) {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = date - now;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    if (days < 0) return `${Math.abs(days)} days ago`;
    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    if (days < 30) return `In ${days} days`;
    if (days < 365) return `In ${Math.floor(days / 30)} months`;
    return `In ${Math.floor(days / 365)} years`;
  },

  truncate(str, length = 100) {
    return str.length > length ? str.substring(0, length) + '...' : str;
  },

  debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  },

  generateId(prefix = 'id') {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  },

  getUrlParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  },

  setUrlParam(name, value) {
    const url = new URL(window.location);
    url.searchParams.set(name, value);
    window.history.pushState({}, '', url);
  },

  smoothScrollTo(elementId) {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
};

// ---- Simple QR Code Generator ----
const QRGenerator = {
  generate(text, size = 200) {
    // Simple QR code visual using canvas (visual representation)
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, size, size);

    // Generate pattern based on text hash
    const hash = this.hashCode(text);
    const cellSize = Math.floor(size / 25);
    const offset = Math.floor((size - cellSize * 25) / 2);

    ctx.fillStyle = '#1A1A2E';

    // Position detection patterns (corners)
    this.drawFinderPattern(ctx, offset, offset, cellSize);
    this.drawFinderPattern(ctx, offset + cellSize * 18, offset, cellSize);
    this.drawFinderPattern(ctx, offset, offset + cellSize * 18, cellSize);

    // Data modules (pseudo-random based on hash)
    let seed = Math.abs(hash);
    for (let row = 0; row < 25; row++) {
      for (let col = 0; col < 25; col++) {
        // Skip finder pattern areas
        if ((row < 8 && col < 8) || (row < 8 && col > 16) || (row > 16 && col < 8)) continue;

        seed = (seed * 1103515245 + 12345) & 0x7fffffff;
        if (seed % 3 !== 0) {
          ctx.fillRect(offset + col * cellSize, offset + row * cellSize, cellSize, cellSize);
        }
      }
    }

    return canvas.toDataURL();
  },

  drawFinderPattern(ctx, x, y, cellSize) {
    // Outer border
    ctx.fillRect(x, y, cellSize * 7, cellSize * 7);
    // Inner white
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(x + cellSize, y + cellSize, cellSize * 5, cellSize * 5);
    // Inner black
    ctx.fillStyle = '#1A1A2E';
    ctx.fillRect(x + cellSize * 2, y + cellSize * 2, cellSize * 3, cellSize * 3);
  },

  hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash;
  }
};

// ---- Mini Chart (SVG) ----
const MiniChart = {
  bar(container, data, color = '#6C3CE1') {
    const maxVal = Math.max(...data.map(d => d.count));
    const width = container.offsetWidth;
    const height = 120;
    const barWidth = Math.floor(width / data.length) - 8;

    let svg = `<svg width="${width}" height="${height + 30}" viewBox="0 0 ${width} ${height + 30}">`;

    data.forEach((item, i) => {
      const barHeight = (item.count / maxVal) * height;
      const x = i * (barWidth + 8) + 4;
      const y = height - barHeight;

      svg += `<rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" 
                     rx="4" fill="${color}" opacity="0.8">
                <animate attributeName="height" from="0" to="${barHeight}" dur="0.6s" 
                         begin="${i * 0.08}s" fill="freeze"/>
                <animate attributeName="y" from="${height}" to="${y}" dur="0.6s" 
                         begin="${i * 0.08}s" fill="freeze"/>
              </rect>`;
      svg += `<text x="${x + barWidth / 2}" y="${height + 20}" text-anchor="middle" 
                    font-size="11" fill="var(--text-tertiary)" font-family="Inter">${item.date}</text>`;
    });

    svg += '</svg>';
    container.innerHTML = svg;
  },

  donut(container, data, size = 160) {
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2 - 20;
    const innerRadius = radius * 0.6;
    const colors = ['#6C3CE1', '#F59E0B', '#10B981', '#3B82F6', '#EF4444'];

    let svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">`;
    let startAngle = -90;

    data.forEach((item, i) => {
      const angle = (item.percentage / 100) * 360;
      const endAngle = startAngle + angle;

      const x1 = centerX + radius * Math.cos(startAngle * Math.PI / 180);
      const y1 = centerY + radius * Math.sin(startAngle * Math.PI / 180);
      const x2 = centerX + radius * Math.cos(endAngle * Math.PI / 180);
      const y2 = centerY + radius * Math.sin(endAngle * Math.PI / 180);
      const ix1 = centerX + innerRadius * Math.cos(endAngle * Math.PI / 180);
      const iy1 = centerY + innerRadius * Math.sin(endAngle * Math.PI / 180);
      const ix2 = centerX + innerRadius * Math.cos(startAngle * Math.PI / 180);
      const iy2 = centerY + innerRadius * Math.sin(startAngle * Math.PI / 180);

      const largeArc = angle > 180 ? 1 : 0;

      svg += `<path d="M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} 
                        L ${ix1} ${iy1} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${ix2} ${iy2} Z" 
                    fill="${colors[i % colors.length]}" opacity="0.85"/>`;

      startAngle = endAngle;
    });

    svg += `<text x="${centerX}" y="${centerY - 5}" text-anchor="middle" font-size="20" font-weight="800" 
                  fill="var(--text-primary)" font-family="Outfit">${data.reduce((a, b) => a + b.count, 0).toLocaleString()}</text>`;
    svg += `<text x="${centerX}" y="${centerY + 14}" text-anchor="middle" font-size="11" 
                  fill="var(--text-tertiary)" font-family="Inter">Total</text>`;

    svg += '</svg>';
    container.innerHTML = svg;
  }
};

// ---- Initialize All ----
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  NavbarManager.init();
  ScrollReveal.init();
  CounterAnimation.init();
  Modal.init();
  Accordion.init();
  Tabs.init();
  FormValidator.init();
  Toast.init();
});
