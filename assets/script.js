/**
 * Simone Juhasc - Nail Designer Website
 * JavaScript Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // ===================================
    // Theme Toggle
    // ===================================
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check for saved theme preference, then system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        if (savedTheme === 'dark') {
            htmlElement.setAttribute('data-theme', 'dark');
        }
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        htmlElement.setAttribute('data-theme', 'dark');
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                htmlElement.setAttribute('data-theme', 'dark');
            } else {
                htmlElement.removeAttribute('data-theme');
            }
        }
    });

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');

            if (currentTheme === 'dark') {
                htmlElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
            } else {
                htmlElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // ===================================
    // Mobile Navigation Toggle
    // ===================================
    const navToggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && nav) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            nav.classList.toggle('active');
        });

        // Close mobile nav when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                nav.classList.remove('active');
            });
        });
    }

    // ===================================
    // Header Scroll Effect
    // ===================================
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 10) {
            header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.08)';
        } else {
            header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
        }
    });

    // ===================================
    // Active Navigation Link
    // ===================================
    const sections = document.querySelectorAll('section[id]');

    const highlightNav = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    };

    window.addEventListener('scroll', highlightNav);

    // ===================================
    // Services Tabs
    // ===================================
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');

            // Update buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Update content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId) {
                    content.classList.add('active');
                }
            });
        });
    });

    // ===================================
    // More Services Accordion
    // ===================================
    const moreServicesBtn = document.getElementById('more-services-btn');
    const moreServicesContent = document.getElementById('more-services-content');

    if (moreServicesBtn && moreServicesContent) {
        moreServicesBtn.addEventListener('click', () => {
            moreServicesBtn.classList.toggle('active');
            moreServicesContent.classList.toggle('active');

            const isExpanded = moreServicesContent.classList.contains('active');
            moreServicesBtn.setAttribute('aria-expanded', isExpanded);

            // Update button text
            const btnText = moreServicesBtn.querySelector('span');
            btnText.textContent = isExpanded ? 'Ver menos' : 'Ver mais serviços';
        });
    }

    // ===================================
    // FAQ Accordion
    // ===================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // ===================================
    // Testimonials Slider
    // ===================================
    const testimonialsTrack = document.getElementById('testimonials-track');
    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');

    if (testimonialsTrack && prevBtn && nextBtn) {
        let currentSlide = 0;
        const cards = testimonialsTrack.querySelectorAll('.testimonial-card');
        const totalCards = cards.length;

        const getVisibleCards = () => {
            if (window.innerWidth >= 992) return 3;
            if (window.innerWidth >= 768) return 2;
            return 1;
        };

        const updateSlider = () => {
            const visibleCards = getVisibleCards();
            const maxSlide = Math.max(0, totalCards - visibleCards);

            if (currentSlide > maxSlide) {
                currentSlide = maxSlide;
            }

            const cardWidth = cards[0].offsetWidth;
            const gap = 16; // var(--spacing-md)
            const offset = currentSlide * (cardWidth + gap);

            testimonialsTrack.style.transform = `translateX(-${offset}px)`;
        };

        prevBtn.addEventListener('click', () => {
            if (currentSlide > 0) {
                currentSlide--;
                updateSlider();
            }
        });

        nextBtn.addEventListener('click', () => {
            const visibleCards = getVisibleCards();
            const maxSlide = Math.max(0, totalCards - visibleCards);

            if (currentSlide < maxSlide) {
                currentSlide++;
                updateSlider();
            }
        });

        // Update on resize
        window.addEventListener('resize', () => {
            updateSlider();
        });

        // Auto-play (optional)
        let autoPlayInterval;

        const startAutoPlay = () => {
            autoPlayInterval = setInterval(() => {
                const visibleCards = getVisibleCards();
                const maxSlide = Math.max(0, totalCards - visibleCards);

                if (currentSlide < maxSlide) {
                    currentSlide++;
                } else {
                    currentSlide = 0;
                }
                updateSlider();
            }, 5000);
        };

        const stopAutoPlay = () => {
            clearInterval(autoPlayInterval);
        };

        // Start auto-play
        startAutoPlay();

        // Pause on hover
        testimonialsTrack.addEventListener('mouseenter', stopAutoPlay);
        testimonialsTrack.addEventListener('mouseleave', startAutoPlay);
    }

    // ===================================
    // Smooth Scroll for Anchor Links
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===================================
    // Intersection Observer for Animations
    // ===================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

    // Observe gallery items
    document.querySelectorAll('.gallery-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(item);
    });

    // Observe testimonial cards
    document.querySelectorAll('.testimonial-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

    // ===================================
    // Gallery Lightbox
    // ===================================
    const lightbox = document.getElementById('lightbox');

    if (lightbox) {
        const lightboxImg = lightbox.querySelector('.lightbox-img');
        const lightboxCounter = lightbox.querySelector('.lightbox-counter');
        const galleryItems = document.querySelectorAll('.gallery-item');
        let currentIndex = 0;

        const openLightbox = (index) => {
            currentIndex = index;
            updateLightbox();
            lightbox.classList.add('active');
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.classList.add('lightbox-open');
        };

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            lightbox.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('lightbox-open');
        };

        const updateLightbox = () => {
            const img = galleryItems[currentIndex].querySelector('img');
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightboxCounter.textContent = `${currentIndex + 1} / ${galleryItems.length}`;
        };

        const prevImage = () => {
            currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            updateLightbox();
        };

        const nextImage = () => {
            currentIndex = (currentIndex + 1) % galleryItems.length;
            updateLightbox();
        };

        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => openLightbox(index));
        });

        lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
        lightbox.querySelector('.lightbox-overlay').addEventListener('click', closeLightbox);
        lightbox.querySelector('.lightbox-prev').addEventListener('click', prevImage);
        lightbox.querySelector('.lightbox-next').addEventListener('click', nextImage);

        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;

            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'ArrowRight') nextImage();
        });
    }

    // ===================================
    // WhatsApp Click Tracking (Analytics Ready)
    // ===================================
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        link.addEventListener('click', () => {
            // Track WhatsApp click (ready for Google Analytics)
            if (typeof gtag === 'function') {
                gtag('event', 'click', {
                    'event_category': 'WhatsApp',
                    'event_label': 'Contact Click'
                });
            }
        });
    });

    // ===================================
    // Service Card Hover Effect Enhancement
    // ===================================
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.borderColor = 'var(--color-primary-light)';
        });

        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('featured')) {
                card.style.borderColor = 'transparent';
            }
        });
    });

});
