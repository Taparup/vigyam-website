// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const lightIcon = document.getElementById('theme-icon-light');
    const darkIcon = document.getElementById('theme-icon-dark');
    const html = document.documentElement;

    // Check for saved theme preference or default to 'light' mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    if (currentTheme === 'dark') {
        html.classList.add('dark');
        lightIcon.classList.remove('hidden');
        darkIcon.classList.add('hidden');
    } else {
        html.classList.remove('dark');
        lightIcon.classList.add('hidden');
        darkIcon.classList.remove('hidden');
    }

    themeToggle.addEventListener('click', function() {
        html.classList.toggle('dark');
        
        if (html.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
            lightIcon.classList.remove('hidden');
            darkIcon.classList.add('hidden');
        } else {
            localStorage.setItem('theme', 'light');
            lightIcon.classList.add('hidden');
            darkIcon.classList.remove('hidden');
        }
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        
        // Update aria-expanded attribute for accessibility
        const isExpanded = !mobileMenu.classList.contains('hidden');
        mobileMenuButton.setAttribute('aria-expanded', isExpanded);
        
        // Update button title
        mobileMenuButton.setAttribute('title', isExpanded ? 'Close mobile menu' : 'Open mobile menu');
    });

    // Close mobile menu when clicking on links
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
            mobileMenuButton.setAttribute('title', 'Open mobile menu');
        });
    });
}

// FAQ Accordion Functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question.querySelector('[data-lucide="chevron-down"]');
        
        question.addEventListener('click', () => {
            const isOpen = answer.style.maxHeight && answer.style.maxHeight !== '0px';
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherIcon = otherItem.querySelector('[data-lucide="chevron-down"]');
                    otherAnswer.style.maxHeight = '0px';
                    if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
                    otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                }
            });
            
            // Toggle current item
            if (isOpen) {
                answer.style.maxHeight = '0px';
                if (icon) icon.style.transform = 'rotate(0deg)';
                question.setAttribute('aria-expanded', 'false');
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                if (icon) icon.style.transform = 'rotate(180deg)';
                question.setAttribute('aria-expanded', 'true');
            }
        });
        
        // Initialize aria-expanded attribute
        question.setAttribute('aria-expanded', 'false');
    });
}

// Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            const header = document.querySelector('header');
            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: Math.max(targetPosition, 0),
                behavior: 'smooth'
            });
        });
    });
}

// Fade-in Animation on Scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            alert('Thank you for your message! We\'ll get back to you soon.');
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1500);
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Initialize Lucide Icons
function initLucideIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    } else {
        console.warn('Lucide icons library not loaded');
    }
}

// Sliding Nav Indicator
function initNavIndicator() {
    const nav = document.querySelector('header nav.nav-links');
    const selector = document.getElementById('nav-selector');
    if (!nav || !selector) return;
    const links = Array.from(nav.querySelectorAll('a[href^="#"]'));

    function setSelectorToLink(link) {
        const linkRect = link.getBoundingClientRect();
        const navRect = nav.getBoundingClientRect();
        const left = linkRect.left - navRect.left - 8; // padding compensation
        const width = linkRect.width + 16; // pill padding
        selector.style.left = left + 'px';
        selector.style.width = width + 'px';
        selector.style.display = 'block';
        // vertically center
        const top = (navRect.height / 2) - (selector.offsetHeight / 2);
        selector.style.top = top + 'px';
    }

    // Initialize to first link
    function initPosition() {
        const active = links[0];
        if (active) setSelectorToLink(active);
    }

    // Click handling
    links.forEach(link => {
        link.addEventListener('click', () => {
            setTimeout(() => setSelectorToLink(link), 50);
        });
    });

    // Scroll spy via IntersectionObserver
    const sections = links
        .map(l => document.querySelector(l.getAttribute('href')))
        .filter(Boolean);

    const observer = new IntersectionObserver((entries) => {
        const visible = entries
            .filter(e => e.isIntersecting)
            .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
            const id = '#' + visible.target.id;
            const activeLink = links.find(l => l.getAttribute('href') === id);
            if (activeLink) setSelectorToLink(activeLink);
        }
    }, { root: null, rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] });

    sections.forEach(sec => observer.observe(sec));

    // On load and resize
    initPosition();
    window.addEventListener('resize', initPosition);
}

// Sticky header shadow for smoothness on scroll
function initHeaderShadow() {
    const header = document.querySelector('header');
    if (!header) return;
    const update = () => {
        if (window.scrollY > 8) header.classList.add('header-stuck');
        else header.classList.remove('header-stuck');
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
}

// Bubble animation generator
function initBubbles() {
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const containers = document.querySelectorAll('.bubbles');
    if (containers.length === 0) return;
    
    containers.forEach(container => {
        if (reduceMotion) return; // Respect reduced motion
        // Generate bubbles
        for (let i = 0; i < 16; i++) {
            const bubble = document.createElement('span');
            const size = Math.floor(Math.random() * 16) + 8; // 8-24px
            const left = Math.random() * 100; // percent
            const delay = Math.random() * 8; // seconds
            const duration = 8 + Math.random() * 8; // 8-16s
            bubble.style.left = left + '%';
            bubble.style.width = size + 'px';
            bubble.style.height = size + 'px';
            bubble.style.animationDelay = delay + 's';
            bubble.style.animationDuration = duration + 's';
            container.appendChild(bubble);
        }
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    initMobileMenu();
    initFAQ();
    initSmoothScrolling();
    initScrollAnimations();
    initContactForm();
    initLucideIcons();
    initNavIndicator();
    initHeaderShadow();
    initBubbles();
});

