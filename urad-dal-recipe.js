// urad-dal-recipe.js

const allRecipes = [
    { title: "Idli", desc: "Soft and fluffy steamed savory cakes made from a fermented rice and urad dal batter.", img: "assets/images/idli.avif", link: "urad-dal-idli-recipe.html" },
    { title: "Dosa", desc: "Classic South Indian breakfast made with a fermented urad dal and rice batter.", img: "assets/images/dosa.avif", link: "urad-dal-dosa-recipe.html" },
    { title: "Dal Makhani", desc: "Creamy and rich North Indian lentil delicacy loved worldwide.", img: "assets/images/dalfry.avif", link: "urad-dal-makhani-recipe.html" },
    { title: "Medu Vada", desc: "Crispy outside, soft inside lentil donuts - a perfect South Indian snack.", img: "assets/images/vada.avif", link: "urad-dal-medu-vada-recipe.html" },
    { title: "Urad Dal Papad", desc: "Crispy, crunchy, and sun-dried savory wafers made from urad dal.", img: "assets/images/papad.avif", link: "urad-dal-papad-recipe.html" },
    { title: "Urad Dal Khichdi", desc: "Comforting and healthy one-pot meal made with rice and urad dal.", img: "assets/images/khichdi.avif", link: "urad-dal-khichdi-recipe.html" },
    { title: "Bedmi Puri", desc: "Crispy, deep-fried whole wheat bread stuffed with a spiced urad dal mixture.", img: "assets/images/bedmipuri.avif", link: "urad-dal-bedmi-puri-recipe.html" },
    { title: "Dahi Vada", desc: "Soft lentil dumplings soaked in chilled yogurt and topped with sweet and spicy chutneys.", img: "assets/images/dahivada.avif", link: "urad-dal-dahi-vada-recipe.html" },
    { title: "Urad Dal Kachori", desc: "Crispy, deep-fried pastry stuffed with a savory, spiced urad dal filling.", img: "assets/images/uradkachori.avif", link: "urad-dal-kachori-recipe.html" },
    { title: "Bisi Bele Bath", desc: "Traditional Karnataka spicy rice and lentil dish cooked with vegetables and aromatic spices.", img: "assets/images/bisibath.avif", link: "urad-dal-bisi-bele-bath-recipe.html" },
    { title: "Urad Dal Uttapam", desc: "Thick, savory South Indian pancakes made from fermented batter and topped with vegetables.", img: "assets/images/uttapam.avif", link: "urad-dal-uttapam-recipe.html" },
    { title: "Urad Dal Halwa", desc: "Rich, decadent Indian dessert made with slow-roasted urad dal, ghee, and nuts.", img: "assets/images/uradhalwa.avif", link: "urad-dal-halwa-recipe.html" }
];

document.addEventListener('DOMContentLoaded', () => {
    // Randomize "You May Also Like" Section
    const relatedRecipesGrid = document.querySelector('.related-recipes-section .recipes-grid');
    if (relatedRecipesGrid && !document.querySelector('.recipes-filter')) {
        // We are on a single recipe page (has related section but no filter buttons)
        const currentPath = window.location.pathname.split('/').pop() || 'urad-dal-recipe.html';
        let availableRecipes = allRecipes.filter(r => r.link !== currentPath);
        
        // Shuffle the array
        for (let i = availableRecipes.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [availableRecipes[i], availableRecipes[j]] = [availableRecipes[j], availableRecipes[i]];
        }
        
        // Take 4 random recipes
        const randomRecipes = availableRecipes.slice(0, 4);
        
        // Populate the grid
        relatedRecipesGrid.innerHTML = '';
        randomRecipes.forEach(recipe => {
            const card = document.createElement('div');
            card.className = 'recipe-card';
            card.innerHTML = `
                <img src="${recipe.img}" alt="${recipe.title}" onerror="this.src='assets/images/6.avif'">
                <div class="recipe-card-content">
                    <h3>${recipe.title}</h3>
                    <p>${recipe.desc}</p>
                    <a href="${recipe.link}" class="view-recipe-link">View Recipe &rarr;</a>
                </div>
            `;
            relatedRecipesGrid.appendChild(card);
        });
    }

    // Recipe Filtering Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const recipeCards = document.querySelectorAll('.recipe-card');

    if (filterBtns.length > 0 && recipeCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                recipeCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'flex';
                        // Small opacity animation
                        card.style.opacity = '0';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transition = 'opacity 0.4s ease';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                        card.style.opacity = '0';
                    }
                });
            });
        });
    }

    // GSAP Animations (If GSAP is loaded)
    if (typeof gsap !== 'undefined') {
        gsap.from('.recipe-hero-content > *', {
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            delay: 0.2
        });

        gsap.from('.hero-dish-img', {
            scale: 0.8,
            opacity: 0,
            duration: 1.2,
            ease: 'back.out(1.5)',
            delay: 0.5
        });

        if (typeof ScrollTrigger !== 'undefined') {
            gsap.from('.recipe-card', {
                scrollTrigger: {
                    trigger: '.recipes-grid',
                    start: 'top 85%',
                },
                y: 50,
                opacity: 0,
                duration: 0.7,
                stagger: 0.1,
                ease: 'power2.out'
            });

            gsap.from('.recipe-cta-inner', {
                scrollTrigger: {
                    trigger: '.recipe-cta',
                    start: 'top 85%',
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            });

        }
    }
});
