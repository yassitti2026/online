/**
 * Jessie Santos - Modern Executive Resume Portfolio Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initSkillFiltering();
  initActiveNav();
  initPrintButton();
});

/* ==========================================================================
   1. Theme Management (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;

  // Retrieve saved preference or default to dark
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

  let currentTheme = savedTheme || (systemPrefersLight ? 'light' : 'dark');
  root.setAttribute('data-theme', currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      currentTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', currentTheme);
      localStorage.setItem('theme', currentTheme);
    });
  }
}

/* ==========================================================================
   2. Mobile Navigation Drawer
   ========================================================================== */
function initMobileMenu() {
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!mobileBtn || !navMenu) return;

  mobileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navMenu.classList.toggle('open');
  });

  // Close when clicking any nav link
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileBtn.contains(e.target)) {
      navMenu.classList.remove('open');
    }
  });
}

/* ==========================================================================
   3. Interactive Skills Filter & Search
   ========================================================================== */
function initSkillFiltering() {
  const searchInput = document.getElementById('skillSearch');
  const clearBtn = document.getElementById('clearSearchBtn');
  const categoryPills = document.querySelectorAll('.filter-pill');
  const skillCards = document.querySelectorAll('.skill-category-card');
  const noMatchAlert = document.getElementById('noSkillsMatch');

  let activeCategory = 'all';

  function applyFilter() {
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    let totalVisibleSkills = 0;

    // Toggle clear search button visibility
    if (clearBtn) {
      clearBtn.style.display = query.length > 0 ? 'block' : 'none';
    }

    skillCards.forEach((card) => {
      const cardCategory = card.getAttribute('data-category');
      const matchesCategory = activeCategory === 'all' || cardCategory === activeCategory;
      const chips = card.querySelectorAll('.skill-chip');
      let cardHasMatchingSkill = false;

      chips.forEach((chip) => {
        const text = chip.textContent.toLowerCase();
        const matchesQuery = query === '' || text.includes(query);

        if (matchesCategory && matchesQuery) {
          chip.style.display = '';
          if (query !== '' && text.includes(query)) {
            chip.classList.add('highlight');
          } else {
            chip.classList.remove('highlight');
          }
          cardHasMatchingSkill = true;
          totalVisibleSkills++;
        } else {
          chip.style.display = 'none';
          chip.classList.remove('highlight');
        }
      });

      // Show/hide card based on category and matching chips
      if (matchesCategory && (query === '' || cardHasMatchingSkill)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });

    if (noMatchAlert) {
      noMatchAlert.style.display = totalVisibleSkills === 0 ? 'block' : 'none';
    }
  }

  // Category Pill Click Listeners
  categoryPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      categoryPills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      activeCategory = pill.getAttribute('data-category');
      applyFilter();
    });
  });

  // Search Input Listeners
  if (searchInput) {
    searchInput.addEventListener('input', applyFilter);
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      applyFilter();
      searchInput.focus();
    });
  }
}

/* ==========================================================================
   4. Copy to Clipboard Utility with Toast
   ========================================================================== */
window.copyToClipboard = function(text, successMessage = 'Copied to clipboard!') {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => showToast(successMessage))
      .catch(() => fallbackCopy(text, successMessage));
  } else {
    fallbackCopy(text, successMessage);
  }
};

function fallbackCopy(text, successMessage) {
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    textArea.style.top = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showToast(successMessage);
  } catch (err) {
    showToast('Failed to copy. Please copy manually.');
  }
}

let toastTimeout;
function showToast(message) {
  const toast = document.getElementById('toastNotification');
  const toastMsg = document.getElementById('toastMessage');

  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

/* ==========================================================================
   5. Active Section Navigation Observer
   ========================================================================== */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
}

/* ==========================================================================
   6. Print Button Handler
   ========================================================================== */
function initPrintButton() {
  const printBtn = document.getElementById('printBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}
