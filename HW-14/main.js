(function slider() {
    const prev = document.querySelector('.js--slider__prev');
    const next = document.querySelector('.js--slider__next');
    const list = document.querySelector('.js--list');
    const dots = document.querySelectorAll('.js--dot');
    const slides = list.querySelectorAll('li');

    function updateButtons() {
        const activeIndex = [...slides].findIndex(slide => slide.classList.contains('active'));
        prev.style.display = activeIndex === 0 ? 'none' : 'flex';
        next.style.display = activeIndex === slides.length - 1 ? 'none' : 'flex';
    }

    function updateDots() {
        const activeIndex = [...slides].findIndex(slide => slide.classList.contains('active'));
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
        });
    }

    function showSlide(index) {
        const activeClassName = 'active';
        const activeElement = list.querySelector(`.${activeClassName}`);
        const newActiveElement = slides[index];

        if (newActiveElement && activeElement !== newActiveElement) {
            activeElement.classList.remove(activeClassName);
            newActiveElement.classList.add(activeClassName);
            updateButtons();
            updateDots();
        }
    }

    next.addEventListener('click', function () {
        const activeIndex = [...slides].findIndex(slide => slide.classList.contains('active'));
        if (activeIndex < slides.length - 1) {
            showSlide(activeIndex + 1);
        }
    });

    prev.addEventListener('click', function () {
        const activeIndex = [...slides].findIndex(slide => slide.classList.contains('active'));
        if (activeIndex > 0) {
            showSlide(activeIndex - 1);
        }
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', function () {
            showSlide(index);
        });
    });

    updateButtons();
    updateDots();
})();
