// GSAP Animation Script for Contact Page (v2)
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Navbar Logic (Standard) ---
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });


    // --- 2. Hero Animations (Split Layout) ---
    const heroTl = gsap.timeline();

    heroTl.from(".hero-eyebrow", {
        y: 20, opacity: 0, duration: 0.6, delay: 0.2, ease: "power3.out"
    })
        .from(".hero-title", {
            y: 30, opacity: 0, duration: 0.8, ease: "power3.out"
        }, "-=0.4")
        .from(".hero-desc", {
            y: 20, opacity: 0, duration: 0.6, ease: "power3.out"
        }, "-=0.4")
        .from(".hero-visual", {
            scale: 0.95, opacity: 0, duration: 1, ease: "power2.out"
        }, "-=0.6")
        .from(".float-badge", {
            y: 20, opacity: 0, duration: 0.6, ease: "back.out(1.7)"
        }, "-=0.4");


    // --- 3. Quick Connect Cards (Overlap Reveal) ---
    gsap.from(".connect-card", {
        scrollTrigger: {
            trigger: ".quick-connect-section",
            start: "top 80%"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
    });


    // --- 4. Form Section Reveal ---
    gsap.from(".info-sidebar", {
        scrollTrigger: {
            trigger: ".form-section",
            start: "top 75%"
        },
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    });

    gsap.from(".premium-form-card", {
        scrollTrigger: {
            trigger: ".form-section",
            start: "top 75%"
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2
    });


    // --- 5. FAQ Accordion Logic ---
    const accItems = document.querySelectorAll('.accordion-item');

    accItems.forEach(item => {
        const header = item.querySelector('.accordion-header');

        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all
            accItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.accordion-body').style.maxHeight = 0;
            });

            // Open clicked if not active
            if (!isActive) {
                item.classList.add('active');
                const body = item.querySelector('.accordion-body');
                body.style.maxHeight = body.scrollHeight + "px";
            }
        });
    });

});
