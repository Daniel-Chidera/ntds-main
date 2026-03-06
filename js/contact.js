document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  
  if (!form) return;
  
  const submitButton = form.querySelector('.btn-submit');
  
  form.addEventListener('submit', (e) => {
    submitButton.disabled = true;
    submitButton.classList.add('loading');
  });
});