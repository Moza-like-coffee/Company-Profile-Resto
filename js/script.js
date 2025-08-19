// Mobile Navigation with Enhanced Features
document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const header = document.getElementById('header');
  
  // Mobile Menu Toggle
  const toggleMobileMenu = () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('active');
    
    // Toggle body scroll lock when menu is open
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  };

  // Close mobile menu when clicking outside or on a link
  const closeMobileMenu = () => {
    navToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  };

  // Initialize menu state
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Toggle navigation menu');
  navToggle.setAttribute('aria-controls', 'navMenu');

  // Event Listeners
  navToggle.addEventListener('click', toggleMobileMenu);

  // Close when clicking on nav links
  document.querySelectorAll('#navMenu a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
      closeMobileMenu();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      closeMobileMenu();
      navToggle.focus();
    }
  });

  // Header Scroll Effect with Throttle
  let lastScrollY = window.scrollY;
  let ticking = false;

  const updateHeader = () => {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
      
      // Hide header on scroll down (optional)
      if (window.scrollY > lastScrollY && window.scrollY > 200) {
        header.classList.add('hidden');
      } else {
        header.classList.remove('hidden');
      }
    } else {
      header.classList.remove('scrolled', 'hidden');
    }
    lastScrollY = window.scrollY;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  });

  // Menu Category Filter with Modern Approach
  const categoryBtns = document.querySelectorAll('.category-btn');
  const menuItems = document.querySelectorAll('.menu-item');
  
  if (categoryBtns.length && menuItems.length) {
    categoryBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Get filter category from data attribute
        const filter = btn.dataset.category || 'all';
        
        // Update UI state
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter items with animation
        menuItems.forEach(item => {
          if (filter === 'all' || item.dataset.category === filter) {
            item.style.display = '';
            setTimeout(() => {
              item.classList.add('visible');
            }, 50);
          } else {
            item.classList.remove('visible');
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // Responsive Adjustments
  const handleResize = () => {
    // Close mobile menu if window is resized to desktop breakpoint
    if (window.innerWidth >= 768) {
      closeMobileMenu();
    }
  };

  window.addEventListener('resize', handleResize);

  // Touch device detection for hover effects
  const isTouchDevice = () => {
    return 'ontouchstart' in window || 
           navigator.maxTouchPoints > 0 || 
           navigator.msMaxTouchPoints > 0;
  };

  if (isTouchDevice()) {
    document.body.classList.add('touch-device');
  }
});