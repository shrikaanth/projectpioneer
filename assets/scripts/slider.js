document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.testimonials-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.next-btn');
    const prevButton = document.querySelector('.prev-btn');
    const dotsContainer = document.querySelector('.slider-dots');

    // Autoplay configuration
    const AUTOPLAY_INTERVAL = 5000; // 5 seconds
    let autoPlayTimer;

    if (!track || slides.length === 0) return;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            moveToSlide(index);
            resetAutoPlay();
        });
        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.children);
    let currentIndex = 0;

    function moveToSlide(targetIndex) {
        // Loop back to start if at end
        if (targetIndex >= slides.length) {
            targetIndex = 0;
        }
        // Loop to end if at start (going backwards)
        else if (targetIndex < 0) {
            targetIndex = slides.length - 1;
        }

        const slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = 'translateX(-' + (slideWidth * targetIndex) + 'px)';

        // Update active dot
        const currentDot = dotsContainer.querySelector('.active');
        if (currentDot) currentDot.classList.remove('active');
        if (dots[targetIndex]) dots[targetIndex].classList.add('active');

        currentIndex = targetIndex;
    }

    function startAutoPlay() {
        autoPlayTimer = setInterval(() => {
            moveToSlide(currentIndex + 1);
        }, AUTOPLAY_INTERVAL);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayTimer);
    }

    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    // Button Listeners
    nextButton.addEventListener('click', () => {
        moveToSlide(currentIndex + 1);
        resetAutoPlay();
    });

    prevButton.addEventListener('click', () => {
        moveToSlide(currentIndex - 1);
        resetAutoPlay();
    });

    // Pause on hover
    track.parentElement.addEventListener('mouseenter', stopAutoPlay);
    track.parentElement.addEventListener('mouseleave', startAutoPlay);

    // Initial play
    startAutoPlay();

    // Window resize handling
    window.addEventListener('resize', () => {
        // Reset to current slide to fix alignment
        const slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = 'translateX(-' + (slideWidth * currentIndex) + 'px)';
    });
});
