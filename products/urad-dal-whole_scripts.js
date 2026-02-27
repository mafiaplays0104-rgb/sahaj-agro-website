/*!
 * SAHAJ AGRO — URAD DAL REDESIGN v3.0
 * All-New Animation Techniques — Zero Duplication from v2.0
 *
 * New Techniques Used:
 * - Letter-spacing collapse (hero eyebrow)
 * - Clip-path curtain lift (hero title words)
 * - Polygon diagonal wipe (hero image pane)
 * - Text Scramble (intro paragraphs)
 * - skewX reveal (intro header)
 * - Perspective rotateX fold (grade cards)
 * - scaleY unfold (spec table)
 * - IntersectionObserver + CSS transitions (spec bars, nutrition bars)
 * - Blur-in reveal (logistics cards)
 * - Page-flip rotateY (timeline steps)
 * - SVG path stroke-dashoffset scrub (timeline connector)
 * - Typewriter character reveal (nutrition values)
 * - Clip-path marquee section reveal (apps)
 * - GSAP horizontal pin parade (advantage stats)
 * - CSS clip-path accordion (FAQ — no GSAP height)
 * - Perspective rotateX fold (CTA title)
 * - Ripple on click (buttons)
 */

window.addEventListener('load', function () {

    /* ══════════════════════════════════════════
       GUARD
       ══════════════════════════════════════════ */
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP not loaded. Animations skipped.');
        return;
    }
    gsap.registerPlugin(ScrollTrigger);

    /* Native browser scroll — no smooth scroll library */

    /* ══════════════════════════════════════════
       2. SCROLL PROGRESS BAR
       ══════════════════════════════════════════ */
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        ScrollTrigger.create({
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            onUpdate: self => { progressBar.style.width = (self.progress * 100) + '%'; }
        });
    }

    /* ══════════════════════════════════════════
       3. NAVBAR
       ══════════════════════════════════════════ */
    const navbar = document.querySelector('.navbar');
    const navLogo = document.getElementById('navbar-logo');
    if (navbar) {
        ScrollTrigger.create({
            start: 'top -80',
            onEnter: () => {
                navbar.classList.add('is-scrolled');
                navbar.classList.add('scrolled');
                if (navLogo) navLogo.src = '../assets/icons/logo-primary.png';
            },
            onLeaveBack: () => {
                navbar.classList.remove('is-scrolled');
                navbar.classList.remove('scrolled');
                if (navLogo) navLogo.src = '../assets/icons/logo-white.png';
            }
        });
    }
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        document.addEventListener('click', e => {
            if (!navbar.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }

    /* ══════════════════════════════════════════
       4. HERO — Premium Awwwards Redesign Sequence
       ══════════════════════════════════════════ */

    try {
        // Set initial states for hero elements
        gsap.set('.hero__eyebrow-premium', { opacity: 0, y: 20 });
        gsap.set('.hero__eyebrow-line', { scaleX: 0 });
        gsap.set('.title-word', { y: '110%', opacity: 0 }); // Hide text below its container line
        gsap.set('.hero__desc-premium', { opacity: 0, x: -30 });
        gsap.set('.hero__actions-premium .btn', { opacity: 0, y: 20 });

        gsap.set('.hero__visual-backdrop', { scale: 0.8, opacity: 0, rotation: -10 });
        gsap.set('.hero__visual-accent', { scale: 0.8, opacity: 0, rotation: 10 });
        gsap.set('.hero__image-wrapper', { scale: 0.9, opacity: 0, filter: 'blur(10px)' });
        gsap.set('.hero__circular-badge', { scale: 0, opacity: 0 });
        gsap.set('.parallax-grain', { scale: 0, opacity: 0 });

        gsap.set('.hero__stats-glass', { y: '100%', opacity: 0 });

        const heroTl = gsap.timeline({ delay: 0.2 });

        // 1. Background elements reveal
        heroTl.to('.hero__visual-backdrop', {
            scale: 1,
            opacity: 1,
            rotation: -5,
            duration: 1.5,
            ease: "expo.out"
        }, 0)
            .to('.hero__visual-accent', {
                scale: 1,
                opacity: 1,
                rotation: 5,
                duration: 1.5,
                ease: "expo.out"
            }, 0.2);

        // 2. Main Image pop
        heroTl.to('.hero__image-wrapper', {
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.6,
            ease: "power3.out"
        }, 0.3);

        // 3. Eyebrow animation
        heroTl.to('.hero__eyebrow-premium', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        }, 0.4)
            .to('.hero__eyebrow-line', {
                scaleX: 1,
                duration: 0.6,
                ease: "power2.inOut"
            }, 0.6);

        // 4. Staggered clip-path text reveal
        heroTl.to('.title-word', {
            y: '0%',
            opacity: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: "expo.out"
        }, 0.5);

        // 5. Description slide in
        heroTl.to('.hero__desc-premium', {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out"
        }, 1.2);

        // 6. Buttons pop up
        heroTl.to('.hero__actions-premium .btn', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.5)"
        }, 1.4);

        // 7. Badges and grains pop
        heroTl.to('.hero__circular-badge', {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "elastic.out(1, 0.5)"
        }, 1.6)
            .to('.parallax-grain', {
                scale: 1,
                opacity: 0.8,
                duration: 0.8,
                stagger: 0.1,
                ease: "back.out(2)"
            }, 1.7);

        // 8. Bottom Stats bar slide up
        heroTl.to('.hero__stats-glass', {
            y: '0%',
            opacity: 1,
            duration: 1,
            ease: "expo.out"
        }, 1.8);

        // Number Counter Logic
        const heroStats = document.getElementById('heroStats');
        if (heroStats) {
            const statNums = heroStats.querySelectorAll('.stat-val');
            statNums.forEach(numEl => {
                const target = parseFloat(numEl.getAttribute('data-target'));
                const isDecimal = target % 1 !== 0;
                gsap.to({ val: 0 }, {
                    val: target,
                    duration: 2,
                    delay: 2.2, // Wait for bar to slide up
                    ease: 'power2.out',
                    snap: isDecimal ? { val: 0.1 } : { val: 1 },
                    onUpdate: function () {
                        const v = this.targets()[0].val;
                        numEl.textContent = isDecimal ? v.toFixed(1) : Math.round(v);
                    }
                });
            });
        }

        // --- Interactive Mouse Parallax Effect ---
        const heroSection = document.getElementById('hero');
        if (heroSection && window.matchMedia("(pointer: fine)").matches) {
            heroSection.addEventListener('mousemove', (e) => {
                const xPos = (e.clientX / window.innerWidth - 0.5) * 2;
                const yPos = (e.clientY / window.innerHeight - 0.5) * 2;

                // Move image and background layers in opposite directions
                gsap.to('.hero__image-wrapper', {
                    x: xPos * 20,
                    y: yPos * 20,
                    rotateY: xPos * 5,
                    rotateX: -yPos * 5,
                    duration: 1,
                    ease: "power2.out"
                });

                gsap.to('.hero__visual-backdrop', {
                    x: xPos * -15,
                    y: yPos * -15,
                    duration: 1.5,
                    ease: "power2.out"
                });

                // Move grains
                gsap.to('.grain-1', { x: xPos * 40, y: yPos * 40, duration: 1, ease: 'power1.out' });
                gsap.to('.grain-2', { x: xPos * -30, y: yPos * -30, duration: 1.2, ease: 'power1.out' });
                gsap.to('.grain-3', { x: xPos * 25, y: yPos * 25, duration: 0.8, ease: 'power1.out' });
            });

            // Reset on mouse leave
            heroSection.addEventListener('mouseleave', () => {
                gsap.to(['.hero__image-wrapper', '.hero__visual-backdrop', '.parallax-grain'], {
                    x: 0, y: 0, rotateY: 0, rotateX: 0, duration: 1.5, ease: "power3.out"
                });
            });
        }

        // ScrollTrigger: subtle parallax exit
        gsap.to('.hero__text-content', {
            y: -80,
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero--premium',
                start: 'top top',
                end: '80% top',
                scrub: 1,
            }
        });

        gsap.to('.hero__visual-premium', {
            y: -120,
            scale: 0.95,
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero--premium',
                start: 'top top',
                end: '90% top',
                scrub: 1,
            }
        });

    } catch (e) {
        console.warn('Hero animation error:', e);
        document.querySelectorAll('.hero__eyebrow-premium, .title-word, .hero__desc-premium, .hero__actions-premium .btn, .hero__visual-backdrop, .hero__visual-accent, .hero__image-wrapper, .hero__circular-badge, .parallax-grain, .hero__stats-glass').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.style.filter = 'none';
        });
        document.querySelectorAll('.hero__eyebrow-line').forEach(el => el.style.transform = 'scaleX(1)');
    }


    /* ══════════════════════════════════════════
       5. TEXT SCRAMBLE CLASS
       NEW: characters randomize → resolve to correct text
       ══════════════════════════════════════════ */
    class TextScramble {
        constructor(el) {
            this.el = el;
            this.chars = '!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            this.update = this.update.bind(this);
        }
        setText(newText) {
            const oldText = this.el.innerText;
            const length = Math.max(oldText.length, newText.length);
            const promise = new Promise(resolve => this.resolve = resolve);
            this.queue = [];
            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '';
                const to = newText[i] || '';
                const start = Math.floor(Math.random() * 16);
                const end = start + Math.floor(Math.random() * 18);
                this.queue.push({ from, to, start, end });
            }
            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            return promise;
        }
        update() {
            let output = '';
            let complete = 0;
            for (let i = 0; i < this.queue.length; i++) {
                const { from, to, start, end } = this.queue[i];
                if (this.frame >= end) { complete++; output += to; }
                else if (this.frame >= start) {
                    if (!this.queue[i].char || Math.random() < 0.28) {
                        this.queue[i].char = this.chars[Math.floor(Math.random() * this.chars.length)];
                    }
                    output += `<span style="color:var(--gold)">${this.queue[i].char}</span>`;
                } else { output += from; }
            }
            this.el.innerHTML = output;
            if (complete === this.queue.length) { this.resolve(); }
            else { this.frameRequest = requestAnimationFrame(this.update); this.frame++; }
        }
    }

    /* ══════════════════════════════════════════
       6. INTRO SECTION — Scroll-Pinned Storytelling
       5-step scroll-controlled pin with Ken Burns image
       ══════════════════════════════════════════ */
    const introSection = document.getElementById('intro');
    if (introSection) {
        const introImg = introSection.querySelector('.intro__img-wrapper');
        const introImgEl = introSection.querySelector('.intro__img-wrapper img');
        const introBadge = introSection.querySelector('.intro__img-badge');
        const introHeader = introSection.querySelector('.intro-header');
        const introDivider = introSection.querySelector('.intro-header .divider');
        const introParas = introSection.querySelectorAll('.scramble-text');
        const introText = introSection.querySelector('.intro__text');

        // ─── Initial states — image starts tilted on Y axis (12°) ───
        gsap.set(introImg, { opacity: 0, rotateY: 12, transformPerspective: 800, transformOrigin: 'center center' });
        gsap.set(introBadge, { opacity: 0, scale: 0, rotation: -20 });
        gsap.set(introHeader, { opacity: 0, y: 60 });
        gsap.set(introText, { opacity: 0 });
        if (introDivider) gsap.set(introDivider, { scaleX: 0, transformOrigin: 'left' });
        introParas.forEach(p => gsap.set(p, { opacity: 0, y: 40 }));

        // ─── Pinned master timeline ───
        const introTl = gsap.timeline({
            scrollTrigger: {
                trigger: '#intro',
                start: 'top top',
                end: '+=400%',
                pin: true,
                scrub: 0.8,
                anticipatePin: 1,
                pinSpacing: true,
            }
        });

        // ── STEP 1: Image rotateY 12 → 8 ──
        introTl
            .to(introImg, {
                opacity: 1, rotateY: 8,
                duration: 1.5, ease: 'none',
            }, 0)
            .to(introText, {
                opacity: 1,
                duration: 0.8, ease: 'none',
            }, 0.5)
            .to(introHeader, {
                opacity: 1, y: 0,
                duration: 1, ease: 'none',
            }, 0.5)
            .to(introDivider, {
                scaleX: 1,
                duration: 0.7, ease: 'none',
            }, 1.0)
            .to(introBadge, {
                opacity: 1, scale: 1, rotation: 0,
                duration: 0.6, ease: 'none',
            }, 1.2);

        // ── STEP 2: Para 1 + image rotateY 8 → 4 ──
        if (introParas[0]) {
            introTl.to(introParas[0], {
                opacity: 1, y: 0,
                duration: 1, ease: 'none',
            }, 2.0);
        }
        introTl.to(introImg, {
            rotateY: 4,
            duration: 1.2, ease: 'none',
        }, 2.0);

        // ── STEP 3: Para 2 + image rotateY 4 → 2 ──
        if (introParas[1]) {
            introTl.to(introParas[1], {
                opacity: 1, y: 0,
                duration: 1, ease: 'none',
            }, 3.5);
        }
        introTl.to(introImg, {
            rotateY: 2,
            duration: 1.2, ease: 'none',
        }, 3.5);

        // ── STEP 4: Para 3 + image rotateY 2 → 0 (flat) with glow ──
        if (introParas[2]) {
            introTl.to(introParas[2], {
                opacity: 1, y: 0,
                duration: 1, ease: 'none',
            }, 5.0);
        }
        introTl.to(introImg, {
            rotateY: 0,
            duration: 1.2, ease: 'none',
            onStart: () => introImg && introImg.classList.add('intro-glow'),
            onReverseComplete: () => introImg && introImg.classList.remove('intro-glow'),
        }, 5.0);

        // Pin releases after step 4 — section stays visible, next section scrolls in naturally
    }

    /* ══════════════════════════════════════════
       7. GRADE HEADERS
       ══════════════════════════════════════════ */
    animateSectionHeader('.grade-header');

    /* ══════════════════════════════════════════
       8. GRADE CARDS — Perspective lid-unfold (rotateX)
       NEW: entirely different from banned translateY stagger
       ══════════════════════════════════════════ */
    const gradeCards = document.querySelectorAll('.grade-card');
    if (gradeCards.length) {
        ScrollTrigger.create({
            trigger: '.grade-grid',
            start: 'top 82%',
            once: true,
            onEnter: () => {
                gradeCards.forEach((card, i) => {
                    gsap.to(card, {
                        rotateX: 0,
                        opacity: 1,
                        duration: 1,
                        ease: 'expo.out',
                        delay: i * 0.18,
                        onComplete: () => {
                            // Animate badge slide in after card appears
                            const badge = card.querySelector('.grade-card__badge');
                            if (badge) {
                                gsap.to(badge, {
                                    x: 0, opacity: 1,
                                    duration: 0.6, ease: 'expo.out',
                                });
                            }
                        }
                    });
                });
            }
        });
    }

    /* ══════════════════════════════════════════
       9. SPEC TABLE — scaleY unfold + bar fill
       NEW: scaleY from top (not banned translateX rows)
       ══════════════════════════════════════════ */
    animateSectionHeader('.spec-header');
    const specWrap = document.querySelector('.spec-table-wrap');
    if (specWrap) {
        const specObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // scaleY unfold
                    gsap.to(specWrap, {
                        scaleY: 1, opacity: 1,
                        duration: 0.9, ease: 'expo.out',
                    });
                    // Fill progress bars after table appears
                    setTimeout(() => {
                        document.querySelectorAll('.spec-bar').forEach(bar => {
                            const pct = bar.getAttribute('data-pct');
                            bar.style.setProperty('--pct', pct + '%');
                            bar.classList.add('is-filled');
                        });
                    }, 600);
                    specObserver.disconnect();
                }
            });
        }, { threshold: 0.15 });
        specObserver.observe(specWrap);
    }

    /* ══════════════════════════════════════════
       10. EXPORT SECTION
       NEW: blur-in for logistics cards + section header
       ══════════════════════════════════════════ */
    animateSectionHeader('.export-header');
    const blurItems = document.querySelectorAll('.blur-in');
    blurItems.forEach((item, i) => {
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    gsap.to(item, {
                        filter: 'blur(0px)',
                        opacity: 1,
                        duration: 1,
                        ease: 'power2.out',
                        delay: i * 0.15,
                    });
                    obs.disconnect();
                }
            });
        }, { threshold: 0.2 });
        obs.observe(item);
    });

    /* ══════════════════════════════════════════
       11. TIMELINE — Page-flip rotateY + SVG path scrub
       NEW: rotateY page-flip (not banned translateY stagger)
       ══════════════════════════════════════════ */
    animateSectionHeader('.infra-header');

    const infroIntro = document.querySelector('.infra-intro');
    if (infroIntro) {
        ScrollTrigger.create({
            trigger: infroIntro,
            start: 'top 85%',
            once: true,
            onEnter: () => {
                gsap.to(infroIntro, {
                    opacity: 1,
                    z: 0,
                    duration: 1,
                    ease: 'expo.out',
                });
            }
        });
    }

    const timelineSteps = document.querySelectorAll('.timeline__step');
    timelineSteps.forEach((step, i) => {
        const isLeft = step.classList.contains('timeline__step--left');
        ScrollTrigger.create({
            trigger: step,
            start: 'top 82%',
            once: true,
            onEnter: () => {
                gsap.to(step, {
                    rotateY: 0,
                    opacity: 1,
                    duration: 1.1,
                    ease: 'expo.out',
                    delay: i * 0.1,
                    onComplete: () => { step.classList.add('is-visible'); }
                });
            }
        });
    });

    // SVG connector scrub
    const timelinePath = document.querySelector('.timeline__path');
    if (timelinePath) {
        const timeline = document.querySelector('.timeline');
        // Measure path length dynamically
        const pathLength = timelinePath.getTotalLength ? timelinePath.getTotalLength() : 2000;
        timelinePath.style.strokeDasharray = pathLength;
        timelinePath.style.strokeDashoffset = pathLength;

        gsap.to(timelinePath, {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: {
                trigger: timeline,
                start: 'top 75%',
                end: 'bottom 60%',
                scrub: 1.5,
            }
        });
    }

    /* ══════════════════════════════════════════
       12. NUTRITION BAR METERS + TYPEWRITER VALUES
       NEW: IntersectionObserver bar fill + typewriter reveal
       ══════════════════════════════════════════ */
    animateSectionHeader(document.querySelector('#nutrition .section-header'));

    // Nutrition box Z-depth reveal
    const nutritionBox = document.querySelector('.nutrition-bars-box');
    if (nutritionBox) {
        const nObs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    gsap.to(nutritionBox, {
                        opacity: 1, z: 0,
                        duration: 1.2, ease: 'expo.out',
                    });
                    startNutritionBars();
                    nObs.disconnect();
                }
            });
        }, { threshold: 0.2 });
        nObs.observe(nutritionBox);
    }

    function typewriterValue(el, text, delay) {
        el.textContent = '';
        let i = 0;
        setTimeout(() => {
            const interval = setInterval(() => {
                el.textContent += text[i];
                i++;
                if (i >= text.length) clearInterval(interval);
            }, 60);
        }, delay);
    }

    function startNutritionBars() {
        const bars = document.querySelectorAll('.bar-meter');
        bars.forEach((meter, idx) => {
            const pct = meter.getAttribute('data-pct');
            const value = meter.getAttribute('data-value');
            const fill = meter.querySelector('.bar-meter__fill');
            const valueEl = meter.querySelector('.bar-meter__value');
            setTimeout(() => {
                fill.style.width = pct + '%';
                typewriterValue(valueEl, value, 400);
            }, idx * 180);
        });
    }

    // Nutrition text Z-depth reveal
    const nutritionText = document.querySelector('.nutrition__text');
    if (nutritionText) {
        ScrollTrigger.create({
            trigger: nutritionText,
            start: 'top 82%',
            once: true,
            onEnter: () => {
                gsap.to(nutritionText, {
                    opacity: 1, z: 0,
                    duration: 1.2, ease: 'expo.out',
                });
            }
        });
    }

    /* ══════════════════════════════════════════
       13. APPLICATIONS MARQUEE REVEAL
       NEW: clip-path from right (not standard left-wipe)
       ══════════════════════════════════════════ */
    const marqueeSection = document.querySelector('.marquee-section');
    const marqueeRows = document.querySelectorAll('.marquee-row');
    if (marqueeSection && marqueeRows.length > 0) {
        ScrollTrigger.create({
            trigger: marqueeSection,
            start: 'top 85%',
            once: true,
            onEnter: () => {
                const tl = gsap.timeline();
                tl.to(marqueeSection, {
                    clipPath: 'inset(0 0 0 0%)',
                    duration: 1.2,
                    ease: 'expo.inOut',
                })
                    .to(marqueeRows, {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        stagger: 0.2,
                        ease: 'power2.out'
                    }, '-=0.4');
            }
        });
    }
    /* ══════════════════════════════════════════
       14. ADVANTAGE — Horizontal slide-in panels (GSAP)
       NEW: panels fly in from right one-by-one (not count-up)
       ══════════════════════════════════════════ */
    animateSectionHeader('.adv-header');
    const advPanels = document.querySelectorAll('.adv-panel');
    if (advPanels.length) {
        ScrollTrigger.create({
            trigger: '.advantage-parade',
            start: 'top 80%',
            once: true,
            onEnter: () => {
                advPanels.forEach((panel, i) => {
                    gsap.to(panel, {
                        x: 0,
                        opacity: 1,
                        duration: 1.2,
                        ease: 'expo.out',
                        delay: i * 0.18,
                        onComplete: () => {
                            // Scan line draws after panel arrives
                            const line = panel.querySelector('.adv-panel__line');
                            if (line) {
                                gsap.to(line, {
                                    scaleX: 1,
                                    duration: 0.6,
                                    ease: 'expo.out',
                                });
                            }
                            // Typewriter for label text
                            const pEl = panel.querySelector('p');
                            if (pEl) {
                                const txt = pEl.textContent;
                                typewriterValue(pEl, txt, 0);
                            }
                        }
                    });
                });
            }
        });
    }

    const faqDetails = document.querySelectorAll('.faq-details');
    if (faqDetails.length > 0) {
        ScrollTrigger.create({
            trigger: '.faq-accordion',
            start: 'top 82%',
            once: true,
            onEnter: () => {
                gsap.to(faqDetails, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power2.out',
                });
            }
        });
    }

    /* ══════════════════════════════════════════
       16. CTA BANNER — perspective rotateX fold
       NEW: rotateX forward-fold (not banned translateY)
       ══════════════════════════════════════════ */
    const ctaTl = gsap.timeline({
        scrollTrigger: { trigger: '.cta-banner', start: 'top 75%', once: true }
    });
    ctaTl
        .to('.cta-title', {
            opacity: 1,
            rotateX: 0,
            transformOrigin: 'top center',
            duration: 1.2,
            ease: 'expo.out',
        }, 0)
        .to('.cta-sub', { opacity: 1, duration: 0.8, ease: 'power2.out' }, 0.4)
        .to('.cta-btn', { opacity: 1, duration: 0.7, ease: 'power2.out' }, 0.6)
        .to('.cta-links', { opacity: 1, duration: 0.7, ease: 'power2.out' }, 0.8);

    /* ══════════════════════════════════════════
       17. RIPPLE EFFECT ON BUTTONS
       NEW: CSS ::after pseudo ripple on click
       ══════════════════════════════════════════ */
    document.querySelectorAll('.btn-ripple').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const r = btn.getBoundingClientRect();
            const x = e.clientX - r.left;
            const y = e.clientY - r.top;
            btn.style.setProperty('--rpx', x + 'px');
            btn.style.setProperty('--rpy', y + 'px');
            btn.classList.remove('ripple-active');
            void btn.offsetWidth; // reflow
            btn.classList.add('ripple-active');
        });
    });

    /* ══════════════════════════════════════════
       HELPER: Section header reveal (skewX)
       ══════════════════════════════════════════ */
    function animateSectionHeader(selector) {
        const el = typeof selector === 'string' ? document.querySelector(selector) : selector;
        if (!el) return;
        ScrollTrigger.create({
            trigger: el,
            start: 'top 88%',
            once: true,
            onEnter: () => {
                const eyebrow = el.querySelector('.eyebrow');
                const h2 = el.querySelector('h2');
                const divider = el.querySelector('.divider');
                const tl = gsap.timeline();
                if (eyebrow) tl.from(eyebrow, { opacity: 0, x: -20, duration: 0.7, ease: 'power2.out' });
                if (h2) tl.from(h2, { opacity: 0, skewX: -4, duration: 0.9, ease: 'expo.out' }, '-=0.3');
                if (divider) tl.fromTo(divider, { scaleX: 0 }, { scaleX: 1, transformOrigin: 'left', duration: 0.6, ease: 'expo.out' }, '-=0.4');
            }
        });
    }

    /* ══════════════════════════════════════════
       FINALIZE
       ══════════════════════════════════════════ */
    ScrollTrigger.refresh();

}); // end window.onload
