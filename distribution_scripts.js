// GSAP Animation Script for Distribution Page
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

    // --- 2. Hero Animation ---
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
        }, "-=0.2")
        .from(".pulse-dot", {
            scale: 0, opacity: 0, duration: 0.5, stagger: 0.1, ease: "back.out(2)"
        }, "-=1.0");

    // --- 3. Animated Counters ---
    const stats = document.querySelectorAll('.stat-val');
    stats.forEach(stat => {
        const target = +stat.getAttribute('data-target');

        gsap.to(stat, {
            scrollTrigger: {
                trigger: stat,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            innerText: target,
            duration: 2,
            snap: { innerText: 1 },
            ease: "power2.out",
            onUpdate: function () {
                stat.innerHTML = Math.ceil(this.targets()[0].innerText) + (target > 500 ? "+" : "");
            }
        });
    });

    // --- 4. Section Reveals ---
    const revealElements = [".reach-content", ".reach-image", ".channel-card", ".region-card-large", ".cta-grid"];

    revealElements.forEach(selector => {
        const els = document.querySelectorAll(selector);
        if (els.length > 0) {
            gsap.from(els, {
                scrollTrigger: {
                    trigger: els[0], /* Trigger on first element of group or specific wrapper logic needed for staggering but this is simple fade up */
                    start: "top 85%"
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
                clearProps: "all" // Clear for interaction
            });
        }
    });

    // --- 5. Tab Functionality ---
    const tabs = document.querySelectorAll('.tab-btn');
    const panels = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            // Add active
            tab.classList.add('active');
            const targetId = tab.getAttribute('data-tab');
            document.getElementById(targetId).classList.add('active');
        });
    });

});
