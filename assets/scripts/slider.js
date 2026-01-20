document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.testimonials-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.next-btn');
    const prevButton = document.querySelector('.prev-btn');
    const dotsContainer = document.querySelector('.slider-dots');

    if (!track || slides.length === 0) return;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            moveToSlide(index);
        });
        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.children);
    let currentIndex = 0;

    function moveToSlide(targetIndex) {
        if (targetIndex < 0) {
            targetIndex = slides.length - 1;
        } else if (targetIndex >= slides.length) {
            targetIndex = 0;
        }

        const slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = 'translateX(-' + (slideWidth * targetIndex) + 'px)';

        dots[currentIndex].classList.remove('active');
        dots[targetIndex].classList.add('active');

        currentIndex = targetIndex;
    }

    // Button Listeners
    nextButton.addEventListener('click', () => {
        moveToSlide(currentIndex + 1);
    });

    prevButton.addEventListener('click', () => {
        moveToSlide(currentIndex - 1);
    });

    // Window resize handling
    window.addEventListener('resize', () => {
        // Reset to current slide to fix alignment
        const slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = 'translateX(-' + (slideWidth * currentIndex) + 'px)';
    });
});
