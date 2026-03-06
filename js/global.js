window.addEventListener('load', () => {
  const loadingScreen = document.querySelector('.loading-screen');
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
  }, 2000); // 2 seconds
});

// THEME TOGGLE (DARK/LIGHT MODE)
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

// Update theme toggle icon
function updateThemeIcon() {
  const theme = html.getAttribute('data-theme');
  const icon = themeToggle.querySelector('svg');
  
  if (theme === 'dark') {
    icon.innerHTML = `
      <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    `;
  } else {
    icon.innerHTML = `
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor"/>
    `;
  }
}

updateThemeIcon();

// Toggle theme on click
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
  });
}

// MOBILE MENU TOGGLE
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

if (mobileMenuToggle && mobileMenu) {
  // Toggle menu
  mobileMenuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileMenuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    // Prevent body scroll when menu is open
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
  
  // Close mobile menu when a link is clicked
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuToggle.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
  
  // Close menu when clicking outside navbar (anywhere on the page)
  document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('open')) {
      const navbar = document.querySelector('.navbar');
      // If click is outside the entire navbar, close menu
      if (!navbar.contains(e.target)) {
        mobileMenu.classList.remove('open');
        mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });
  
  // Prevent event bubbling from navbar
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    navbar.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }
}

// COMING SOON NOTIFICATION FOR STAFF LOGIN
function showComingSoonNotification() {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'coming-soon-notification';
  notification.textContent = 'COMING SOON';
  
  // Add to body
  document.body.appendChild(notification);
  
  // Trigger animation
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Add click event to all staff login links
document.addEventListener('DOMContentLoaded', () => {
  const staffLoginLinks = document.querySelectorAll('a[href="staff-login.html"]');
  
  staffLoginLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      showComingSoonNotification();
    });
  });
});

// NAVBAR SCROLL EFFECT
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// ACTIVE PAGE HIGHLIGHT
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.navbar-menu a, .mobile-menu a');

navLinks.forEach(link => {
  const linkPage = link.getAttribute('href');
  if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
    link.classList.add('active');
  }
});

// SCROLL ANIMATIONS (INTERSECTION OBSERVER)
const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all elements with animate-on-scroll class
const animatedElements = document.querySelectorAll('.animate-on-scroll');
animatedElements.forEach(el => observer.observe(el));

// SMOOTH SCROLL FOR ANCHOR LINKS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      const offset = 100; // Account for fixed navbar
      const targetPosition = target.offsetTop - offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// UTILITY: Add Random Animation Classes
// This function randomly assigns different animation directions
function randomizeAnimations() {
  const animations = ['slide-up', 'slide-down', 'slide-left', 'slide-right', 'scale-up', 'fade-in'];
  const elements = document.querySelectorAll('.auto-animate');
  
  elements.forEach((el, index) => {
    const randomAnim = animations[Math.floor(Math.random() * animations.length)];
    el.classList.add('animate-on-scroll', randomAnim);
    
    // Add stagger delay
    if (index < 6) {
      el.classList.add(`stagger-${index + 1}`);
    }
  });
}

// Call on page load
document.addEventListener('DOMContentLoaded', randomizeAnimations);

// PREVENT FOUC (Flash of Unstyled Content)
document.documentElement.style.visibility = 'visible';
