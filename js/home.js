// SERVICE TABS
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-panel');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetTab = button.getAttribute('data-tab');
    
    // Remove active class from all buttons and contents
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Add active class to clicked button and corresponding content
    button.classList.add('active');
    document.getElementById(targetTab).classList.add('active');
  });
});

// FAQ ACCORDION
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  
  question.addEventListener('click', () => {
    // Check if this item is already active
    const isActive = item.classList.contains('active');
    
    // Close all FAQ items
    faqItems.forEach(faq => faq.classList.remove('active'));
    
    // If it wasn't active, open it
    if (!isActive) {
      item.classList.add('active');
    }
  });
});

// AUTO-CLOSE FAQ WHEN CLICKING OUTSIDE
document.addEventListener('click', (e) => {
  if (!e.target.closest('.faq-item')) {
    faqItems.forEach(faq => faq.classList.remove('active'));
  }
});
