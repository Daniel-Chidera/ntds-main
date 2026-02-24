const DEVTO_API = 'https://dev.to/api/articles';
const ARTICLES_PER_PAGE = 9;

// Fetch articles from Dev.to
async function fetchArticles(tag = '', page = 1) {
  try {
    const params = new URLSearchParams({
      per_page: ARTICLES_PER_PAGE,
      page: page,
      tag: tag
    });
    
    const response = await fetch(`${DEVTO_API}?${params}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }
    
    const articles = await response.json();
    return articles;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

// Display articles in the blog container
function displayArticles(articles, containerId = 'blog-container') {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  container.innerHTML = '';
  
  if (articles.length === 0) {
    container.innerHTML = '<p class="text-center">No articles found.</p>';
    return;
  }
  
  articles.forEach((article, index) => {
    const articleCard = createArticleCard(article, index);
    container.appendChild(articleCard);
  });
}

// Create article card element
function createArticleCard(article, index) {
  const card = document.createElement('article');
  card.className = 'blog-card animate-on-scroll slide-up stagger-' + ((index % 3) + 1);
  
  // Format date
  const date = new Date(article.published_at);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  // Get reading time
  const readingTime = article.reading_time_minutes || 5;
  
  card.innerHTML = `
    <div class="blog-card-image">
      ${article.cover_image 
        ? `<img src="${article.cover_image}" alt="${article.title}" loading="lazy">` 
        : '<div class="blog-placeholder"></div>'}
    </div>
    <div class="blog-card-content">
      <div class="blog-card-meta">
        <span class="blog-date">${formattedDate}</span>
        <span class="blog-reading-time">${readingTime} min read</span>
      </div>
      <h3 class="blog-title">${article.title}</h3>
      <p class="blog-description">${article.description || 'Read more about this topic...'}</p>
      <div class="blog-card-footer">
        <div class="blog-author">
          <img src="${article.user.profile_image_90}" alt="${article.user.name}" class="author-avatar">
          <span class="author-name">${article.user.name}</span>
        </div>
        <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="blog-read-more">
          Read More →
        </a>
      </div>
      ${article.tag_list.length > 0 ? `
        <div class="blog-tags">
          ${article.tag_list.slice(0, 3).map(tag => 
            `<span class="blog-tag">#${tag}</span>`
          ).join('')}
        </div>
      ` : ''}
    </div>
  `;
  
  return card;
}

// Filter articles by tag
function filterArticlesByTag(tag) {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-tag') === tag) {
      btn.classList.add('active');
    }
  });
  
  loadArticles(tag);
}

// Load articles (main function)
async function loadArticles(tag = '', page = 1) {
  const container = document.getElementById('blog-container');
  const loadingIndicator = document.getElementById('loading-indicator');
  
  if (loadingIndicator) {
    loadingIndicator.style.display = 'block';
  }
  
  if (container) {
    container.innerHTML = '<p class="text-center">Loading articles...</p>';
  }
  
  const articles = await fetchArticles(tag, page);
  
  if (loadingIndicator) {
    loadingIndicator.style.display = 'none';
  }
  
  displayArticles(articles);
  
  // Re-observe animated elements
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });
  
  animatedElements.forEach(el => observer.observe(el));
}

// Initialize blog on page load
document.addEventListener('DOMContentLoaded', () => {
  const blogPage = document.getElementById('blog-container');
  
  if (blogPage) {
    // Load initial articles
    loadArticles();
    
    // Setup filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const tag = btn.getAttribute('data-tag');
        filterArticlesByTag(tag);
      });
    });
    
    // Setup load more button if exists
    const loadMoreBtn = document.getElementById('load-more');
    let currentPage = 1;
    
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', async () => {
        currentPage++;
        const activeFilter = document.querySelector('.filter-btn.active');
        const tag = activeFilter ? activeFilter.getAttribute('data-tag') : '';
        
        const articles = await fetchArticles(tag, currentPage);
        
        if (articles.length > 0) {
          articles.forEach((article, index) => {
            const card = createArticleCard(article, index);
            document.getElementById('blog-container').appendChild(card);
          });
        } else {
          loadMoreBtn.textContent = 'No More Articles';
          loadMoreBtn.disabled = true;
        }
      });
    }
  }
});

// Export for external use
window.loadArticles = loadArticles;
window.filterArticlesByTag = filterArticlesByTag;
