# NTDS - NextGen Technova Digital Solutions

ntds/
├── index.html              # Homepage
├── services.html           # Services page
├── portfolio.html          # Portfolio/Projects page
├── about.html             # About Us page
├── blog.html              # Blog (powered by Dev.to API)
├── contact.html           # Contact page
├── staff-login.html       # Staff portal login
│
├── css/
│   ├── variables.css      # Color scheme, typography, spacing
│   ├── global.css         # Base styles, navbar, footer
│   ├── animations.css     # Scroll animations, transitions
│   └── responsive.css     # Mobile-first breakpoints
│
├── js/
│   ├── global.js          # Navbar, theme toggle, scroll animations
│   ├── counter.js         # Stats counter animation
│   └── blog-api.js        # Dev.to API integration
│
├── assets/
│   ├── images/
│   │   └── logo.png       # REPLACE WITH YOUR LOGO
│   └── icons/
│
└── README.md

## 🎨 Brand Colors

**Light Mode:**
- Primary: White (#FFFFFF)
- Accent: Dark Purple (#6A0DAD)
- Text: Dark Gray (#1A1A1A)

**Dark Mode:**
- Primary: Black (#0A0A0A)
- Accent: Purple (#8B5CF6)
- Text: White (#FFFFFF)

---

## ✨ Features

✅ **Sticky Navbar** - Not full-width, curved edges  
✅ **Dark/Light Mode Toggle** - User preference saved  
✅ **Loading Animation** - Fade in/out pulse effect with logo  
✅ **Scroll Animations** - Elements slide from different directions  
✅ **Stats Counter** - Count-up animation (0 to target number)  
✅ **Blog Integration** - Auto-fetch tech articles from Dev.to API  
✅ **Mobile Responsive** - Hamburger menu, optimized for all devices  
✅ **Active Page Highlighting** - Purple underline & text color  
✅ **Curvy Background Elements** - Organic shapes in purple shades  

---

## 📝 How to Use

### 1. **Replace Logo**
Add your NTDS logo to:
- `assets/images/logo.png`

The logo is used in:
- Loading screen
- Navbar
- Footer

### 2. **Customize Content**
Edit HTML files with your:
- Company information
- Services details
- Portfolio projects (dummy projects included)
- Contact information

### 3. **Deploy to GitHub Pages**

#### Step 1: Create GitHub Repository
```bash
# In your project folder
git init
git add .
git commit -m "Initial commit - NTDS website"
```

#### Step 2: Push to GitHub
```bash
# Create repo on GitHub, then:
git remote add origin https://github.com/yourusername/ntds.git
git branch -M main
git push -u origin main
```

#### Step 3: Enable GitHub Pages
1. Go to repo **Settings**
2. Scroll to **Pages** section
3. Source: Deploy from branch **main**
4. Folder: **/ (root)**
5. Save

Your site will be live at:  
`https://yourusername.github.io/ntds/`

---

## 🛠️ Technologies Used

- **HTML5** - Semantic structure
- **CSS3** - Custom styling, animations
- **Vanilla JavaScript** - No frameworks/libraries
- **Dev.to API** - Blog content
- **Google Fonts** - Space Grotesk & Inter

---

## 📱 Pages Overview

### 1. **Homepage (index.html)**
- Hero section
- Services overview
- Process flow (Consultation → Design → Development → Testing → Launch)
- Tech stack showcase
- Stats with counter animation
- Testimonials
- FAQ
- CTA section

### 2. **Services (services.html)**
- Website Development
- App Development
- Digital Marketing

### 3. **Portfolio (portfolio.html)**
- Project showcases (dummy data - replace with real projects)

### 4. **About Us (about.html)**
- Company story
- Mission & values

### 5. **Blog (blog.html)**
- Auto-fetched tech articles from Dev.to
- Filter by tags (JavaScript, PHP, Web Dev, etc.)

### 6. **Contact (contact.html)**
- Contact form
- Social media links

### 7. **Staff Login (staff-login.html)**
- Employee portal access
- Code-based authentication (connect your PHP backend)

---

## 🎯 Active Page Highlighting

The current page is automatically highlighted in the navbar with:
- **Purple text color**
- **Purple underline**

This works automatically via JavaScript.

---

## 🌙 Dark Mode

Toggle between light/dark themes using the moon/sun icon in the navbar.  
User preference is saved in `localStorage`.

---

## 📊 Stats Counter Animation

Add counter elements like this:

```html
<div class="counter" data-target="50" data-suffix="+">0</div>
```

**Attributes:**
- `data-target` - Final number to count to
- `data-suffix` - Text after number (e.g., +, %, K)

The counter animates when scrolled into view.

---

## 📝 Blog API (Dev.to)

The blog automatically fetches tech articles from Dev.to.

**No maintenance required!**  
Articles update automatically.

**Filter Tags:**
- JavaScript
- Web Development
- React
- PHP
- Programming

Edit tags in `blog.html` filter buttons.

---

## 🎨 Animations

Elements with class `.auto-animate` will randomly receive:
- `slide-up`
- `slide-down`
- `slide-left`
- `slide-right`
- `scale-up`
- `fade-in`

Mix and match for variety!

---

## 📞 Social Media

Update social links in footer:
- WhatsApp
- Instagram
- X (Twitter)
- TikTok

---

## 🔒 Staff Portal

The Staff Login page is a frontend interface.  
**You need to connect your PHP backend** for:
- Authentication
- Database
- Chatroom functionality

---

## 📄 License

© 2026 NextGen Technova Digital Solutions (NTDS)

---

## 👥 Team

Built for NTDS by the development team.

---

## 📧 Questions?

Contact us through the website or contribute to the repo!

**Happy Coding! 🚀**
