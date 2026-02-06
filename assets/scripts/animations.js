/**
 * Global Scroll Animations System
 * Automatically observes elements with the .animate-on-scroll class
 * and applies the .is-visible class when they enter the viewport.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Select all elements that should be animated
    // We can also auto-add this class to common elements if they don't have it
    const autoTargetSelectors = [
        '.service-card',
        '.gallery-item',
        '.process-step',
        '.stat-card',
        '.testimonial-card',
        '.hero-title',
        '.hero-description',
        '.hero-cta',
        '.section-header h2',
        '.section-header p'
    ];

    autoTargetSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('animate-on-scroll');
            // Add fade-up as default if no other animation class is present
            if (!el.classList.contains('fade-in') &&
                !el.classList.contains('slide-left') &&
                !el.classList.contains('slide-right') &&
                !el.classList.contains('zoom-in')) {
                el.classList.add('fade-up');
            }
        });
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px', // Trigger slightly before the bottom
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Run once
            }
        });
    }, observerOptions);

    // Observe all elements with the animation class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
});
