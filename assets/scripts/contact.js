// Project Pioneer Construction - Contact Page JavaScript

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

// Header scroll effect
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 12px rgba(43, 47, 51, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(43, 47, 51, 0.1)';
    }
});

// Contact form submission
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');
const submitText = document.getElementById('submitText');
const submitLoading = document.getElementById('submitLoading');

// Contact form submission logic removed to allow native PHP handling
if (contactForm) {
    // Only keeping analytics tracking if needed, otherwise letting browser handle POST
    contactForm.addEventListener('submit', () => {
        // Optional: Add analytics tracking here if desired, but do not preventDefault
        console.log('Form submitting to PHP...');
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
    // Animate contact cards
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Animate process steps
    const processSteps = document.querySelectorAll('.process-step');
    processSteps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateX(-20px)';
        step.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        step.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(step);
    });

    // Animate leadgen cards
    const leadgenCards = document.querySelectorAll('.leadgen-card');
    leadgenCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Animate form wrapper
    const formWrapper = document.querySelector('.form-wrapper');
    if (formWrapper) {
        formWrapper.style.opacity = '0';
        formWrapper.style.transform = 'translateY(20px)';
        formWrapper.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(formWrapper);
    }
});

// Track phone link clicks for analytics
const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
phoneLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.gtag) {
            gtag('event', 'phone_click', {
                'event_category': 'Contact',
                'event_label': 'Phone Call',
                'value': link.textContent
            });
        }
        console.log('Phone link clicked:', link.textContent);
    });
});

// Track email link clicks for analytics
const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
emailLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.gtag) {
            gtag('event', 'email_click', {
                'event_category': 'Contact',
                'event_label': 'Email',
                'value': link.textContent
            });
        }
        console.log('Email link clicked:', link.textContent);
    });
});

// Parallax effect on hero section
window.addEventListener('scroll', () => {
    const contactHero = document.querySelector('.contact-hero');
    if (contactHero) {
        const scrolled = window.pageYOffset;
        const heroContent = contactHero.querySelector('.hero-content');
        if (heroContent && scrolled < 500) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / 600);
        }
    }
});

// Character counter for project details textarea
const projectDetailsTextarea = document.getElementById('project_details');
if (projectDetailsTextarea) {
    const createCharCounter = () => {
        const counter = document.createElement('div');
        counter.style.fontSize = '0.75rem';
        counter.style.color = 'var(--gray-medium)';
        counter.style.marginTop = '0.25rem';
        counter.style.textAlign = 'right';
        counter.textContent = '0 characters';
        projectDetailsTextarea.parentElement.appendChild(counter);

        projectDetailsTextarea.addEventListener('input', function () {
            const length = this.value.length;
            counter.textContent = `${length} character${length !== 1 ? 's' : ''}`;

            if (length > 500) {
                counter.style.color = 'var(--primary-green)';
            } else {
                counter.style.color = 'var(--gray-medium)';
            }
        });
    };

    createCharCounter();
}

// Auto-save form to localStorage (draft functionality)
const autoSaveForm = () => {
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
        localStorage.setItem('contactFormDraft', JSON.stringify(formData));
        console.log('Form auto-saved');
    }
};

// Restore form from localStorage
const restoreFormDraft = () => {
    const savedDraft = localStorage.getItem('contactFormDraft');
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
                localStorage.removeItem('contactFormDraft');
            }
        } catch (e) {
            console.error('Error restoring form draft:', e);
        }
    }
};

// Auto-save every 10 seconds
if (contactForm) {
    setInterval(autoSaveForm, 10000);

    // Restore draft on page load
    restoreFormDraft();

    // Clear draft on successful submission
    contactForm.addEventListener('submit', () => {
        localStorage.removeItem('contactFormDraft');
    });
}

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
            }
        }
    });
});

console.log('Contact Page Loaded');
console.log('Page: Contact - Project Pioneer Construction');
console.log('Supabase connection initialized');
console.log('Color Palette: Pioneer Green (#1F7A54), Steel Blue (#1E3A5F), Charcoal Slate (#2B2F33), Concrete White (#F4F6F5)');
console.log('Form auto-save enabled - drafts saved every 10 seconds');
