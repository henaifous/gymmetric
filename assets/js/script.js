/* ================================================
   GYMMETRIC LANDING PAGE — INTERACTIONS
   ================================================ */

(function () {
    'use strict';

    // ---------- Navbar scroll effect ----------
    const nav = document.getElementById('nav');
    let lastScroll = 0;

    function handleNavScroll() {
        const scrollY = window.scrollY;
        nav.classList.toggle('nav--scrolled', scrollY > 40);
        lastScroll = scrollY;
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });

    // ---------- Mobile menu ----------
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    let menuOpen = false;

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function () {
            menuOpen = !menuOpen;
            mobileMenu.classList.toggle('open', menuOpen);
            hamburger.classList.toggle('active', menuOpen);
            document.body.style.overflow = menuOpen ? 'hidden' : '';
        });

        // Close on link click
        mobileMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                menuOpen = false;
                mobileMenu.classList.remove('open');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ---------- Smooth scroll for anchor links ----------
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var target = document.querySelector(targetId);
            if (!target) return;
            e.preventDefault();
            var offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 72;
            var top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: top, behavior: 'smooth' });
        });
    });

    // ---------- Reveal on scroll (Intersection Observer) ----------
    var revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(function (el) {
            revealObserver.observe(el);
        });
    } else {
        // Fallback: show everything
        revealElements.forEach(function (el) {
            el.classList.add('visible');
        });
    }

    // ---------- Counter animation ----------
    var counters = document.querySelectorAll('.counter');

    if ('IntersectionObserver' in window) {
        var counterObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });

        counters.forEach(function (c) {
            counterObserver.observe(c);
        });
    }

    function animateCounter(el) {
        var target = parseInt(el.getAttribute('data-target'), 10);
        if (isNaN(target)) return;
        var duration = 1600;
        var startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease out cubic
            var eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target);
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target;
            }
        }

        requestAnimationFrame(step);
    }

    // ---------- Active nav link highlighting ----------
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav__links a');

    function updateActiveLink() {
        var scrollPos = window.scrollY + 120;
        sections.forEach(function (section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');
            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });

    // ---------- Stagger reveal for grid children ----------
    document.querySelectorAll('.features__grid, .showcase__cards, .privacy__grid, .pricing__grid').forEach(function (grid) {
        var children = grid.children;
        if ('IntersectionObserver' in window) {
            var gridObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        // Stagger each child
                        Array.from(children).forEach(function (child, i) {
                            setTimeout(function () {
                                child.classList.add('visible');
                            }, i * 100);
                        });
                        gridObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1
            });

            gridObserver.observe(grid);
        }
    });

    // ---------- Hero particles ----------
    var heroSection = document.getElementById('hero');
    if (heroSection) {
        var particleContainer = document.createElement('div');
        particleContainer.className = 'hero__particles';
        heroSection.appendChild(particleContainer);

        var particleCount = 16;
        for (var i = 0; i < particleCount; i++) {
            var p = document.createElement('span');
            p.className = 'hero__particle';
            p.style.setProperty('--x', (Math.random() * 90 + 5) + '%');
            p.style.setProperty('--y', (Math.random() * 85 + 5) + '%');
            p.style.setProperty('--size', (Math.random() * 4 + 2) + 'px');
            p.style.setProperty('--duration', (Math.random() * 6 + 4) + 's');
            p.style.setProperty('--delay', (Math.random() * 5) + 's');
            p.style.setProperty('--opacity', (Math.random() * 0.32 + 0.10).toFixed(2));
            particleContainer.appendChild(p);
        }
    }

    // ---------- Parallax for hero glow ----------
    var heroGlow = document.querySelector('.hero__bg-glow');

    if (heroGlow) {
        window.addEventListener('mousemove', function (e) {
            var x = (e.clientX / window.innerWidth - 0.5) * 30;
            var y = (e.clientY / window.innerHeight - 0.5) * 30;
            heroGlow.style.transform = 'translate(' + x + 'px, ' + y + 'px) scale(1)';
        }, { passive: true });
    }

})();
