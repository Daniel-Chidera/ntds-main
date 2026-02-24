document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  
  if (!form) return;
  
  const submitButton = form.querySelector('.btn-submit');
  
  // Form submission
  form.addEventListener('submit', (e) => {
    // Show loading state
    submitButton.disabled = true;
    submitButton.classList.add('loading');
    
    // PHP will handle the rest
    // Form will submit normally to your PHP endpoint
  });
});
