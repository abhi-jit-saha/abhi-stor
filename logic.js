// Portfolio website JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initSmoothScrolling();
    initNavbarHighlight();
    initAnimations();
    initExternalLinks();
    
    console.log('Portfolio website loaded successfully!');
});

/**
 * Initialize smooth scrolling for navigation links
 */
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(targetId);
                
                // Close mobile menu if open
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            }
        });
    });
}

/**
 * Highlight navigation links based on scroll position
 */
function initNavbarHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link[href^="#"]');
    
    function highlightNavigation() {
        const scrollPosition = window.scrollY + 100;
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Throttle scroll events for better performance
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                highlightNavigation();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Initial highlight
    highlightNavigation();
}

/**
 * Update active navigation link
 */
function updateActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

/**
 * Initialize scroll animations
 */
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe cards and important elements
    const animatedElements = document.querySelectorAll('.card, .hero-content, .hero-image');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Handle external links with loading indicators
 */
function initExternalLinks() {
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    
    externalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add loading state
            const originalText = this.innerHTML;
            const loadingIcon = '<i class="fas fa-spinner fa-spin me-2"></i>';
            
            // Show loading for a brief moment
            this.innerHTML = loadingIcon + 'Opening...';
            this.style.pointerEvents = 'none';
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.pointerEvents = 'auto';
            }, 1000);
        });
    });
}

/**
 * Add typing effect to hero title (optional enhancement)
 */
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-content h1');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
}

/**
 * Initialize contact form interactions (if contact form is added later)
 */
function initContactForm() {
    const contactForm = document.querySelector('#contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Add form validation and submission logic here
        const formData = new FormData(this);
        const submitButton = this.querySelector('button[type="submit"]');
        
        // Show loading state
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual implementation)
        setTimeout(() => {
            submitButton.innerHTML = '<i class="fas fa-check me-2"></i>Message Sent!';
            submitButton.classList.remove('btn-primary');
            submitButton.classList.add('btn-success');
            
            // Reset form after 3 seconds
            setTimeout(() => {
                this.reset();
                submitButton.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Send Message';
                submitButton.classList.remove('btn-success');
                submitButton.classList.add('btn-primary');
                submitButton.disabled = false;
            }, 3000);
        }, 2000);
    });
}

/**
 * Add keyboard navigation support
 */
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Navigate sections with arrow keys
        if (e.ctrlKey || e.metaKey) {
            const sections = ['home', 'about', 'programs', 'notes', 'contact'];
            const currentHash = window.location.hash.replace('#', '') || 'home';
            const currentIndex = sections.indexOf(currentHash);
            
            if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
                e.preventDefault();
                window.location.hash = sections[currentIndex + 1];
            } else if (e.key === 'ArrowUp' && currentIndex > 0) {
                e.preventDefault();
                window.location.hash = sections[currentIndex - 1];
            }
        }
    });
}

/**
 * Initialize theme management (if dark/light mode toggle is needed)
 */
function initThemeManagement() {
    // This function can be expanded to handle theme switching
    // For now, we're using the fixed dark theme from Bootstrap
    
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Listen for system theme changes
    prefersDark.addEventListener('change', function(e) {
        console.log('System theme changed to:', e.matches ? 'dark' : 'light');
        // Handle theme change if needed
    });
}

/**
 * Add loading screen (optional)
 */
function initLoadingScreen() {
    window.addEventListener('load', function() {
        const loadingScreen = document.querySelector('#loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    });
}

/**
 * Performance monitoring and analytics (basic)
 */
function initAnalytics() {
    // Track page load time
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
    });
    
    // Track section views
    const sections = document.querySelectorAll('section[id]');
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log(`Section viewed: ${entry.target.id}`);
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// Back to Top Button
function initBackToTop() {
    const btn = document.getElementById('backToTop');
  
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        btn.style.display = 'block';
      } else {
        btn.style.display = 'none';
      }
    });
  
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  
  initBackToTop();

// Initialize additional features when called
// These are optional enhancements that can be enabled as needed
// initTypingEffect();
// initContactForm();
// initKeyboardNavigation();
// initThemeManagement();
// initLoadingScreen();
// initAnalytics();
