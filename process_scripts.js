// GSAP Animation Script for Process Page - Standard System
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Navbar Logic (Standard System) ---
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    window.addEventListener('scroll', () => {
        const logo = document.getElementById('navbar-logo');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            if (logo) logo.src = 'assets/icons/logo-primary.png';
        } else {
            navbar.classList.remove('scrolled');
            if (logo) logo.src = 'assets/icons/logo-white.png';
        }
    });

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // --- 2. Hero Animation (Matches Products) ---
    const heroTl = gsap.timeline();

    gsap.from(".hero-bg-img", {
        scale: 1.15,
        duration: 2,
        ease: "power2.out"
    });

    heroTl.from(".hero-eyebrow-center", {
        y: 20, opacity: 0, duration: 0.8, delay: 0.2, ease: "power3.out"
    })
        .from(".hero-title-center", {
            y: 30, opacity: 0, duration: 0.8, ease: "power3.out"
        }, "-=0.6")
        .from(".hero-desc-center", {
            y: 20, opacity: 0, duration: 0.6, ease: "power3.out"
        }, "-=0.4")
        .from(".hero-actions-center", {
            y: 20, opacity: 0, duration: 0.5, ease: "back.out(1.7)"
        }, "-=0.2");

    // --- 3. Section Reveal Animations (Standard Fade Up) ---
    const animateFadeIn = (selector) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
            gsap.utils.toArray(elements).forEach(element => {
                gsap.from(element, {
                    scrollTrigger: {
                        trigger: element,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    },
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out"
                });
            });
        }
    };

    // Apply to main blocks
    animateFadeIn(".journey-row");
    animateFadeIn(".standard-card");
    animateFadeIn(".split-layout");
    animateFadeIn(".final-cta-section");

});
