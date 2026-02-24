// ============================================
// NTDS - Counter Animation
// Animated count-up for statistics
// ============================================

function animateCounter(element, target, duration = 2000, suffix = '') {
  const start = 0;
  const increment = target / (duration / 16); // 60fps
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    
    // Format number with commas
    const formatted = Math.floor(current).toLocaleString();
    element.textContent = formatted + suffix;
  }, 16);
}

// Intersection Observer for counter animation
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      const counter = entry.target;
      const target = parseInt(counter.getAttribute('data-target'));
      const suffix = counter.getAttribute('data-suffix') || '';
      
      counter.classList.add('counted');
      animateCounter(counter, target, 2000, suffix);
    }
  });
}, {
  threshold: 0.5
});

// Observe all counter elements
document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => counterObserver.observe(counter));
});

// Alternative: Manual trigger for multiple counters in a section
function initCounters(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  
  const counters = container.querySelectorAll('.counter');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !container.classList.contains('counted')) {
        container.classList.add('counted');
        
        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'));
          const suffix = counter.getAttribute('data-suffix') || '';
          animateCounter(counter, target, 2000, suffix);
        });
      }
    });
  }, {
    threshold: 0.3
  });
  
  observer.observe(container);
}

// Export for use in other scripts if needed
window.initCounters = initCounters;
window.animateCounter = animateCounter;
