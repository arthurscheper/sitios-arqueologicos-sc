document.addEventListener('DOMContentLoaded', () => {
    async function loadSection(containerId, filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const html = await response.text();
            document.getElementById(containerId).innerHTML = html;

            const loadedContainer = document.getElementById(containerId);
            const carouselsInSection = loadedContainer.querySelectorAll('.carousel-container');
            
            carouselsInSection.forEach(carousel => {
                const carouselId = carousel.id;
                if (carouselId) {
                    if (typeof slideIndex === 'undefined' || slideIndex[carouselId] === undefined) {
                        if (typeof slideIndex === 'undefined') {
                            console.warn("slideIndex not found. Ensure carousel.js is loaded correctly and defines slideIndex globally or in a way accessible here.");
                            window.slideIndex = window.slideIndex || {};
                        }
                        slideIndex[carouselId] = 1; 
                    }

                    if (typeof showSlides === 'function') {
                        showSlides(1, carouselId);
                    } else {
                        console.error("showSlides function not found. Ensure carousel.js is loaded correctly.");
                    }
                }
            });

            const loadedSection = document.getElementById(containerId).querySelector('.animate-section');
            if (loadedSection) {
                observer.observe(loadedSection);
            }
        } catch (error) {
            console.error(`Could not load section ${filePath}:`, error);
        }
    }

    loadSection('inicio-container', 'sections/inicio.html');
    loadSection('introducao-container', 'sections/introducao.html');
    loadSection('tubarao-container', 'sections/tubarao.html');
    loadSection('congonhas-i-container', 'sections/congonhas-i.html');
    loadSection('congonhas-ii-container', 'sections/congonhas-ii.html');
    loadSection('sambaquis-container', 'sections/sambaquis.html');
    loadSection('pre-historia-container', 'sections/pre-historia.html');
    loadSection('ferramentas-cotidiano-container', 'sections/ferramentas-cotidiano.html');
    loadSection('arte-rupestre-container', 'sections/arte-rupestre.html');
    loadSection('zoolitos-container', 'sections/zoolitos.html');
    loadSection('referencias-container', 'sections/referencias.html');
    loadSection('footer-container', 'sections/footer.html'); 

    const sections = document.querySelectorAll('.animate-section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const navbar = document.getElementById('main-navbar');
    let lastScrollTop = 0;
    let navbarHeight = navbar.offsetHeight; 
    const hideThreshold = navbarHeight + 50;

    window.addEventListener('scroll', () => {
        if (window.innerWidth < 768) {
            let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

            if (currentScroll === 0) {
                navbar.classList.remove('navbar-hidden');
                navbar.classList.add('navbar-visible');
            } else if (currentScroll > lastScrollTop && currentScroll > hideThreshold) { 
                navbar.classList.remove('navbar-visible');
                navbar.classList.add('navbar-hidden');
            } else if (currentScroll < lastScrollTop) { 
                navbar.classList.remove('navbar-hidden');
                navbar.classList.add('navbar-visible');
            }
            lastScrollTop = currentScroll; 
        } else {
            navbar.classList.remove('navbar-hidden');
            navbar.classList.add('navbar-visible');
        }
    });

    const dropdownButton = document.getElementById('dropdownButton');
    const dropdownMenu = document.getElementById('dropdownMenu');

    if (dropdownButton && dropdownMenu) {
        dropdownButton.addEventListener('click', (event) => {
            event.stopPropagation();
            dropdownMenu.classList.toggle('hidden');
            dropdownMenu.classList.toggle('block');
        });

        document.addEventListener('click', (event) => {
            if (!dropdownMenu.contains(event.target) && !dropdownButton.contains(event.target)) {
                if (!dropdownMenu.classList.contains('hidden')) {
                    dropdownMenu.classList.add('hidden');
                    dropdownMenu.classList.remove('block');
                }
            }
        });
    }

    window.addEventListener('resize', () => {
        navbarHeight = navbar.offsetHeight;
        hideThreshold = navbarHeight + 50;
        if (window.innerWidth >= 768) {
            navbar.classList.remove('navbar-hidden');
            navbar.classList.add('navbar-visible');
        } else if (window.pageYOffset === 0) {
            navbar.classList.remove('navbar-hidden');
            navbar.classList.add('navbar-visible');
        }
    });
    if (window.pageYOffset === 0 && window.innerWidth < 768) {
        navbar.classList.remove('navbar-hidden');
        navbar.classList.add('navbar-visible');
    }
});