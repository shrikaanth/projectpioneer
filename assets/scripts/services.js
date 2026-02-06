// Project Pioneer Construction - Services Page JavaScript

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');

if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileNav.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
}

function closeMobileMenu() {
    if (mobileNav) {
        mobileNav.classList.remove('active');
    }
    if (mobileMenuBtn) {
        mobileMenuBtn.classList.remove('active');
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (mobileNav && mobileNav.classList.contains('active')) {
        if (!mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            closeMobileMenu();
        }
    }
});

// Close mobile menu when clicking on a link
const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeMobileMenu();
    });
});

// Header scroll effect
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 12px rgba(43, 47, 51, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(43, 47, 51, 0.1)';
    }
});

// FAQ Accordion functionality
const faqItems = document.querySelectorAll('[data-faq]');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all FAQ items
        faqItems.forEach(faq => {
            faq.classList.remove('active');
        });

        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Quote form submission
const quoteForm = document.getElementById('quoteForm');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');
const submitText = document.getElementById('submitText');
const submitLoading = document.getElementById('submitLoading');

if (quoteForm) {
    quoteForm.addEventListener('submit', () => {
        // Clear draft on submission
        localStorage.removeItem('servicesFormDraft');

        // Optional: Add analytics tracking here if desired
        if (window.gtag) {
            const serviceNeeded = document.getElementById('service_needed').value;
            gtag('event', 'generate_lead', {
                'event_category': 'Form',
                'event_label': 'Services Page Quote Form',
                'value': serviceNeeded
            });
        }
        console.log('Services form submitting to PHP...');
    });
}

// Email validation with visual feedback
const emailInput = document.getElementById('email');
if (emailInput) {
    emailInput.addEventListener('blur', function () {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.value && !emailRegex.test(this.value)) {
            this.style.borderColor = '#DC3545';
            this.setCustomValidity('Please enter a valid email address');
        } else if (this.value) {
            this.style.borderColor = '#28A745';
            this.setCustomValidity('');
        }
    });

    emailInput.addEventListener('input', function () {
        this.style.borderColor = '';
        this.setCustomValidity('');
    });
}

// Phone number formatting
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function (e) {
        // Remove all non-numeric characters
        let value = e.target.value.replace(/\D/g, '');

        // Format as (000) 000-0000
        if (value.length > 0) {
            if (value.length <= 3) {
                value = `(${value}`;
            } else if (value.length <= 6) {
                value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
            } else {
                value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
            }
        }

        e.target.value = value;
    });

    // Validate phone number on blur
    phoneInput.addEventListener('blur', function () {
        const cleanPhone = this.value.replace(/\D/g, '');
        if (this.value && cleanPhone.length < 10) {
            this.style.borderColor = '#DC3545';
            this.setCustomValidity('Please enter a valid 10-digit phone number');
        } else if (this.value) {
            this.style.borderColor = '#28A745';
            this.setCustomValidity('');
        }
    });
}

// Form input validation feedback
const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
formInputs.forEach(input => {
    // Mark invalid required fields on blur
    input.addEventListener('blur', function () {
        if (this.hasAttribute('required') && !this.value.trim()) {
            this.style.borderColor = '#DC3545';
        }
    });

    // Clear error state on input
    input.addEventListener('input', function () {
        if (this.style.borderColor === 'rgb(220, 53, 69)' && this.value.trim()) {
            this.style.borderColor = '';
        }
    });

    // Add focus effect
    input.addEventListener('focus', function () {
        if (this.style.borderColor !== 'rgb(220, 53, 69)') {
            this.style.borderColor = '';
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                closeMobileMenu();
            }
        }
    });
});

// Scroll progress indicator
function createScrollProgress() {
    const scrollProgress = document.createElement('div');
    scrollProgress.id = 'scroll-progress';
    scrollProgress.style.position = 'fixed';
    scrollProgress.style.top = '0';
    scrollProgress.style.left = '0';
    scrollProgress.style.height = '3px';
    scrollProgress.style.background = 'var(--primary-green)';
    scrollProgress.style.width = '0%';
    scrollProgress.style.zIndex = '9999';
    scrollProgress.style.transition = 'width 0.1s ease';
    document.body.appendChild(scrollProgress);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });
}

createScrollProgress();

// Intersection Observer for scroll animations
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

// Apply animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Animate service cards
    const serviceCards = document.querySelectorAll('.service-detail-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(card);
    });

    // Animate process steps
    const processSteps = document.querySelectorAll('.process-step');
    processSteps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(20px)';
        step.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        step.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(step);
    });

    // Animate FAQ items
    const faqCards = document.querySelectorAll('.faq-item');
    faqCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.transitionDelay = `${index * 0.08}s`;
        observer.observe(card);
    });

    // Animate quote form wrapper
    const formWrapper = document.querySelector('.quote-form-wrapper');
    if (formWrapper) {
        formWrapper.style.opacity = '0';
        formWrapper.style.transform = 'translateY(20px)';
        formWrapper.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(formWrapper);
    }
});

// Add ripple effect to buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Track service card clicks
const serviceDetailCards = document.querySelectorAll('.service-detail-card');
serviceDetailCards.forEach(card => {
    const serviceName = card.querySelector('h3').textContent;

    card.addEventListener('click', (e) => {
        // Only track if not clicking the button
        if (!e.target.classList.contains('btn')) {
            if (window.gtag) {
                gtag('event', 'service_card_click', {
                    'event_category': 'Engagement',
                    'event_label': serviceName
                });
            }
            console.log('Service card clicked:', serviceName);
        }
    });
});

// Track CTA button clicks
const ctaButtons = document.querySelectorAll('.service-detail-card .btn');
ctaButtons.forEach(button => {
    button.addEventListener('click', () => {
        const serviceName = button.closest('.service-detail-card').querySelector('h3').textContent;

        if (window.gtag) {
            gtag('event', 'cta_click', {
                'event_category': 'Engagement',
                'event_label': `Request Quote - ${serviceName}`,
                'value': serviceName
            });
        }
        console.log('CTA clicked for service:', serviceName);
    });
});

// Track FAQ interactions
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question h3').textContent;

    item.querySelector('.faq-question').addEventListener('click', () => {
        const isOpening = !item.classList.contains('active');

        if (isOpening && window.gtag) {
            gtag('event', 'faq_click', {
                'event_category': 'Engagement',
                'event_label': question
            });
        }
        console.log('FAQ clicked:', question, isOpening ? 'opened' : 'closed');
    });
});

// Auto-save form to localStorage (draft functionality)
const autoSaveForm = () => {
    if (!quoteForm) return;

    const formData = {
        full_name: document.getElementById('full_name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        service_needed: document.getElementById('service_needed').value,
        city: document.getElementById('city').value,
        timeline: document.getElementById('timeline').value,
        budget_range: document.getElementById('budget_range').value,
        project_details: document.getElementById('project_details').value
    };

    // Only save if there's some data
    const hasData = Object.values(formData).some(val => val && val.trim());
    if (hasData) {
        localStorage.setItem('servicesFormDraft', JSON.stringify(formData));
        console.log('Form auto-saved');
    }
};

// Restore form from localStorage
const restoreFormDraft = () => {
    const savedDraft = localStorage.getItem('servicesFormDraft');
    if (savedDraft) {
        try {
            const formData = JSON.parse(savedDraft);

            // Ask user if they want to restore
            const shouldRestore = confirm('We found a saved draft of your form. Would you like to restore it?');

            if (shouldRestore) {
                Object.keys(formData).forEach(key => {
                    const element = document.getElementById(key);
                    if (element && formData[key]) {
                        element.value = formData[key];
                    }
                });
                console.log('Form draft restored');
            } else {
                localStorage.removeItem('servicesFormDraft');
            }
        } catch (e) {
            console.error('Error restoring form draft:', e);
        }
    }
};

// Auto-save every 10 seconds
if (quoteForm) {
    setInterval(autoSaveForm, 10000);

    // Restore draft on page load
    restoreFormDraft();

    // Clear draft on successful submission
    quoteForm.addEventListener('submit', () => {
        localStorage.removeItem('servicesFormDraft');
    });
}

// Highlight current service based on URL hash
function highlightServiceFromHash() {
    const hash = window.location.hash;
    if (hash) {
        const serviceMap = {
            '#basement': 0,
            '#kitchen': 1,
            '#bathroom': 1,
            '#full-home': 2,
            '#commercial': 3
        };

        const cardIndex = serviceMap[hash.toLowerCase()];
        if (cardIndex !== undefined) {
            const cards = document.querySelectorAll('.service-detail-card');
            if (cards[cardIndex]) {
                setTimeout(() => {
                    cards[cardIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
                    cards[cardIndex].style.borderColor = 'var(--primary-green)';

                    setTimeout(() => {
                        cards[cardIndex].style.borderColor = '';
                    }, 3000);
                }, 500);
            }
        }
    }
}

// Call on page load and hash change
window.addEventListener('load', highlightServiceFromHash);
window.addEventListener('hashchange', highlightServiceFromHash);

// Parallax effect on page hero
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.page-hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent && scrolled < 400) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / 500);
        }
    }
});

// Keyboard navigation for FAQ
faqItems.forEach((item, index) => {
    const question = item.querySelector('.faq-question');

    question.setAttribute('tabindex', '0');
    question.setAttribute('role', 'button');
    question.setAttribute('aria-expanded', 'false');

    question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            question.click();
            question.setAttribute('aria-expanded', item.classList.contains('active') ? 'true' : 'false');
        }

        // Arrow key navigation
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const nextItem = faqItems[Math.min(index + 1, faqItems.length - 1)];
            nextItem.querySelector('.faq-question').focus();
        }

        if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prevItem = faqItems[Math.max(index - 1, 0)];
            prevItem.querySelector('.faq-question').focus();
        }
    });
});

// Service selection pre-fill from URL parameter
function prefillServiceFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const service = urlParams.get('service');

    if (service) {
        const serviceSelect = document.getElementById('service_needed');
        if (serviceSelect) {
            const options = Array.from(serviceSelect.options);
            const matchingOption = options.find(opt =>
                opt.value.toLowerCase().includes(service.toLowerCase())
            );

            if (matchingOption) {
                serviceSelect.value = matchingOption.value;

                // Scroll to form
                setTimeout(() => {
                    document.getElementById('quote-form').scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 500);
            }
        }
    }
}

window.addEventListener('load', prefillServiceFromURL);

// Log page information
console.log('Services Page Loaded - Project Pioneer Construction');
console.log('Supabase connection initialized');
console.log('Color Palette: Pioneer Navy (#0d2443), Steel Blue (#1E3A5F), Charcoal Slate (#2B2F33), Concrete White (#F4F6F5)');
console.log('FAQ accordion active');
console.log('Form auto-save enabled - drafts saved every 10 seconds');
console.log('Scroll animations active');
console.log('Analytics tracking ready');
console.log('URL-based service highlighting enabled');
