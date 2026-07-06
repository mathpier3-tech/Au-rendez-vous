// ==================== SCROLL PROGRESS BAR ====================
const progressBar = document.getElementById('scrollProgressBar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    if (progressBar) {
        progressBar.style.width = scrollPercent + '%';
    }
});

// ==================== STAGGERED REVEALS ====================
const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = parseInt(entry.target.dataset.delay || '0');
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay);
            staggerObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.menu-display-item').forEach((el, i) => {
    const col = el.closest('.menu-display-column');
    const isRight = col && Array.from(col.parentNode.children).indexOf(col) === 1;
    el.classList.add(isRight ? 'reveal-stagger-right' : 'reveal-stagger');
    el.dataset.delay = i * 30;
    staggerObserver.observe(el);
});

document.querySelectorAll('.menu-display-category h4').forEach((el, i) => {
    el.classList.add('reveal-stagger-title');
    el.dataset.delay = i * 80;
    staggerObserver.observe(el);
});

document.querySelectorAll('.newsletter-form input, .newsletter-form textarea, .newsletter-form button').forEach((el, i) => {
    el.classList.add('reveal-stagger');
    el.style.transitionDelay = `${i * 0.08}s`;
    el.dataset.delay = i * 80;
    staggerObserver.observe(el);
});

document.querySelectorAll('.contact-item').forEach((el, i) => {
    el.classList.add('reveal-stagger');
    el.dataset.delay = i * 100;
    staggerObserver.observe(el);
});

document.querySelectorAll('.form-row').forEach((el, i) => {
    el.classList.add('reveal-stagger');
    el.dataset.delay = i * 80;
    staggerObserver.observe(el);
});

document.querySelectorAll('.story-text p').forEach((el, i) => {
    el.classList.add('reveal-stagger');
    el.dataset.delay = i * 120;
    staggerObserver.observe(el);
});

document.querySelectorAll('.story-image, .map-container').forEach((el, i) => {
    el.classList.add('reveal-stagger');
    el.dataset.delay = i * 150;
    staggerObserver.observe(el);
});

document.querySelectorAll('.footer-col').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 0.1}s`;
    observer.observe(el);
});



// ==================== THREE.JS BACKGROUND ====================
const canvas = document.getElementById('bg-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
camera.position.z = 30;

// Particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 2000;
const posArray = new Float32Array(particlesCount * 3);
const colorsArray = new Float32Array(particlesCount * 3);

const goldColor = new THREE.Color('#C9A96E');
const creamColor = new THREE.Color('#F5F0E8');
const wineColor = new THREE.Color('#722F37');

for (let i = 0; i < particlesCount * 3; i += 3) {
    posArray[i] = (Math.random() - 0.5) * 100;
    posArray[i + 1] = (Math.random() - 0.5) * 100;
    posArray[i + 2] = (Math.random() - 0.5) * 50;

    const colorChoice = Math.random();
    const color = colorChoice < 0.5 ? goldColor : colorChoice < 0.8 ? creamColor : wineColor;
    colorsArray[i] = color.r;
    colorsArray[i + 1] = color.g;
    colorsArray[i + 2] = color.b;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.12,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const pointLight1 = new THREE.PointLight(0xC9A96E, 1, 50);
pointLight1.position.set(10, 10, 10);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0x722F37, 0.8, 50);
pointLight2.position.set(-10, -10, 5);
scene.add(pointLight2);

// Mouse
let mouseX = 0, mouseY = 0;
let targetX = 0, targetY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
});

// Animation
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();

    targetX += (mouseX - targetX) * 0.02;
    targetY += (mouseY - targetY) * 0.02;

    particlesMesh.rotation.y = elapsed * 0.05;
    particlesMesh.rotation.x = targetY * 0.1;
    particlesMesh.rotation.y += targetX * 0.05;

    camera.position.x += (targetX * 3 - camera.position.x) * 0.02;
    camera.position.y += (targetY * 2 - camera.position.y) * 0.02;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ==================== LOADING SCREEN ====================
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loading-screen').classList.add('hidden');
    }, 2200);
});

// ==================== NAVBAR ====================
const navbar = document.getElementById('navbar');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('active'));
});

// ==================== SCROLL REVEAL ====================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

function initReveal() {
    document.querySelectorAll('.story-text').forEach(el => {
        el.classList.add('reveal-left');
        observer.observe(el);
    });
    document.querySelectorAll('.story-visual').forEach(el => {
        el.classList.add('reveal-right');
        observer.observe(el);
    });
    document.querySelectorAll('.specialty-card').forEach((el, i) => {
        el.classList.add('reveal-scale');
        el.style.transitionDelay = `${i * 0.1}s`;
        observer.observe(el);
    });
    document.querySelectorAll('.reservation-info').forEach(el => {
        el.classList.add('reveal-left');
        observer.observe(el);
    });
    document.querySelectorAll('.reservation-form-container').forEach(el => {
        el.classList.add('reveal-right');
        observer.observe(el);
    });
    document.querySelectorAll('.gallery-item').forEach((el, i) => {
        el.classList.add('reveal-scale');
        el.style.transitionDelay = `${i * 0.05}s`;
        observer.observe(el);
    });
    document.querySelectorAll('.review-card').forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${i * 0.05}s`;
        observer.observe(el);
    });
    document.querySelectorAll('.menu-display').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
    document.querySelectorAll('.google-rating-top').forEach(el => {
        el.classList.add('reveal-scale');
        observer.observe(el);
    });
}

initReveal();

// ==================== LANGUAGE TOGGLE ====================
const langToggle = document.getElementById('langToggle');
let currentLang = 'fr';

const translations = {
    fr: {
        accueil: 'Accueil',
        story: 'Notre Histoire',
        menu: 'La Carte',
        specialties: 'Spécialités',
        gallery: 'Galerie',
        reviews: 'Avis',
        reservation: 'Réservation',
        storyTitle: 'Notre Histoire',
        storyP1: "Niché au coeur du village de Callian, <strong>Au Rendez-Vous</strong> vous accueille dans un cadre chaleureux et authentique. Notre restaurant perpétue les traditions culinaires provençales avec passion et savoir-faire.",
        storyP2: "Chaque plat raconte l'histoire de notre terroir, avec des produits frais sélectionnés auprès de nos producteurs locaux.",
        years: "Années d'expérience",
        recipes: "Recettes traditionnelles",
        producers: "Producteurs locaux",
        specialtiesTitle: 'Nos Spécialités',
        galleryTitle: 'Le Restaurant',
        menuTitle: 'Notre Carte',
        reviewsTitle: 'Ce que disent nos clients',
        resTitle: 'Réservez votre table',
        resDesc: "Rejoignez-nous pour un moment de convivilité et de gourmandise au coeur de Callian.",
        address: 'Adresse',
        phone: 'Téléphone',
        hours: 'Horaires',
        name: 'Nom',
        email: 'Email',
        tel: 'Téléphone',
        guests: 'Couverts',
        date: 'Date',
        time: 'Heure',
        message: 'Message (optionnel)',
        submit: 'Confirmer la réservation',
        heroSub: 'Restaurant Traditionnel',
        heroLoc: 'Callian 83440 - Provence',
        heroTag: "Une expérience culinaire authentique au coeur de la Provence",
        btnRes: 'Réserver une table',
        btnMenu: 'Découvrir la carte'
    },
    en: {
        accueil: 'Home',
        story: 'Our Story',
        menu: 'Menu',
        specialties: 'Specialties',
        gallery: 'Gallery',
        reviews: 'Reviews',
        reservation: 'Reservation',
        storyTitle: 'Our Story',
        storyP1: "Nestled in the heart of Callian village, <strong>Au Rendez-Vous</strong> welcomes you in a warm and authentic setting. Our restaurant perpetuates Provençal culinary traditions with passion and expertise.",
        storyP2: "Each dish tells the story of our terroir, with fresh products selected from our local producers.",
        years: "Years of experience",
        recipes: "Traditional recipes",
        producers: "Local producers",
        specialtiesTitle: 'Our Specialties',
        galleryTitle: 'The Restaurant',
        menuTitle: 'Our Menu',
        reviewsTitle: 'What our customers say',
        resTitle: 'Book your table',
        resDesc: "Join us for a moment of friendliness and gourmet pleasure in the heart of Callian.",
        address: 'Address',
        phone: 'Phone',
        hours: 'Opening Hours',
        name: 'Name',
        email: 'Email',
        tel: 'Phone',
        guests: 'Guests',
        date: 'Date',
        time: 'Time',
        message: 'Message (optional)',
        submit: 'Confirm reservation',
        heroSub: 'Traditional Restaurant',
        heroLoc: 'Callian 83440 - Provence',
        heroTag: "An authentic culinary experience in the heart of Provence",
        btnRes: 'Book a table',
        btnMenu: 'Discover the menu'
    }
};

function applyLanguage(lang) {
    currentLang = lang;
    const t = translations[lang];
    
    document.querySelectorAll('[data-fr]').forEach(el => {
        const key = el.getAttribute('data-' + lang);
        if (key) el.textContent = key;
    });

    document.querySelectorAll('.hero-subtitle').forEach(el => el.textContent = t.heroSub);
    document.querySelectorAll('.hero-location').forEach(el => el.textContent = t.heroLoc);
    document.querySelectorAll('.hero-tagline').forEach(el => el.textContent = t.heroTag);
    document.querySelectorAll('.section-label').forEach(el => {
        if (el.dataset.key && t[el.dataset.key]) el.textContent = t[el.dataset.key];
    });

    if (lang === 'en') {
        langToggle.querySelector('.lang-fr').style.display = 'none';
        langToggle.querySelector('.lang-en').style.display = 'inline';
    } else {
        langToggle.querySelector('.lang-fr').style.display = 'inline';
        langToggle.querySelector('.lang-en').style.display = 'none';
    }
}

langToggle.addEventListener('click', () => {
    applyLanguage(currentLang === 'fr' ? 'en' : 'fr');
});

// ==================== STAT COUNTER ====================
const statNumbers = document.querySelectorAll('.stat-number');
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.target);
            let current = 0;
            const increment = target / 60;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    entry.target.textContent = target + '+';
                    clearInterval(timer);
                } else {
                    entry.target.textContent = Math.floor(current);
                }
            }, 30);
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(num => statObserver.observe(num));

// ==================== RATING COUNTER ====================
const ratingNumbers = document.querySelectorAll('.rating-number');
const ratingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const target = parseFloat(entry.target.dataset.target);
        const duration = 1500;

        if (entry.isIntersecting) {
            entry.target.textContent = '0.0';
            const startTime = performance.now();
            function updateRating(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeOut = 1 - Math.pow(1 - progress, 3);
                entry.target.textContent = (target * easeOut).toFixed(1);
                if (progress < 1) {
                    requestAnimationFrame(updateRating);
                }
            }
            requestAnimationFrame(updateRating);
        } else {
            entry.target.textContent = '0.0';
        }
    });
}, { threshold: 0.5 });

ratingNumbers.forEach(num => ratingObserver.observe(num));

// ==================== RESERVATION FORM ====================
const form = document.getElementById('reservationForm');
const dateInput = document.getElementById('date');

const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

function showToast(message) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const guests = document.getElementById('guests').value;
    const message = document.getElementById('message').value;

    const formattedDate = new Date(date).toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    try {
        const response = await fetch('https://formspree.io/f/mjgqlwqd', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                nom: name,
                email: email,
                telephone: phone,
                date: formattedDate,
                heure: time,
                nombre_personnes: guests,
                message: message || 'Aucun message',
                _subject: 'Nouvelle reservation - ' + name
            })
        });

        if (response.ok) {
            showToast('Reservation confirmee ! ' + name + ', ' + guests + ' personnes le ' + formattedDate + ' a ' + time + '. A bientot !');
            form.reset();
        } else {
            showToast('Erreur serveur. Reessayez.');
        }
    } catch (err) {
        showToast('Erreur reseau. Verifiez votre connexion.');
    }
});

// ==================== 3D TILT EFFECT ====================
document.querySelectorAll('[data-tilt]').forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / centerY * -12;
        const rotateY = (x - centerX) / centerX * 12;
        const scale = 1.05;

        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale}) translateZ(20px)`;
        el.style.boxShadow = `${-rotateY * 2}px ${rotateX * 2}px 40px rgba(0,0,0,0.2)`;
    });

    el.addEventListener('mouseleave', () => {
        el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1) translateZ(0)';
        el.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
    });
});

// 3D effect on review cards
document.querySelectorAll('.review-card').forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / centerY * -5;
        const rotateY = (x - centerX) / centerX * 5;

        el.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    el.addEventListener('mouseleave', () => {
        el.style.transform = 'perspective(500px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// 3D effect on menu display items
document.querySelectorAll('.menu-display-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
        el.style.transform = 'translateX(5px)';
        el.style.transition = 'transform 0.3s ease';
    });
    el.addEventListener('mouseleave', () => {
        el.style.transform = 'translateX(0)';
    });
});



// Parallax scroll effect on hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        heroBg.style.backgroundPositionY = 50 + scrolled * 0.3 + '%';
    }
});

// ==================== SMOOTH ANCHOR SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.hostname !== window.location.hostname) return;
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ==================== LIGHTBOX ====================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
let currentLightboxIndex = 0;
let lightboxImages = [];

function openLightbox(imgSrc, index) {
    lightboxImg.src = imgSrc;
    lightbox.classList.add('active');
    currentLightboxIndex = index;
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function navigateLightbox(direction) {
    currentLightboxIndex += direction;
    if (currentLightboxIndex < 0) currentLightboxIndex = lightboxImages.length - 1;
    if (currentLightboxIndex >= lightboxImages.length) currentLightboxIndex = 0;
    lightboxImg.src = lightboxImages[currentLightboxIndex];
}

document.querySelectorAll('.gallery-item').forEach((item, index) => {
    const img = item.querySelector('img');
    lightboxImages.push(img.src);
    item.addEventListener('click', () => openLightbox(img.src, lightboxImages.length - 1));
});

// Specialty images lightbox
document.querySelectorAll('.specialty-img').forEach((item, index) => {
    const img = item.querySelector('img');
    lightboxImages.push(img.src);
    item.addEventListener('click', () => openLightbox(img.src, lightboxImages.length - 1));
    item.style.cursor = 'pointer';
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
lightboxNext.addEventListener('click', () => navigateLightbox(1));

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
});

console.log('Au Rendez-Vous - Site chargé avec succès');

// ==================== THEME PICKER ====================
document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const theme = btn.dataset.theme;
        document.body.className = '';
        if (theme !== 'doré') document.body.classList.add('theme-' + theme);
        document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        localStorage.setItem('theme', theme);
    });
});

const savedTheme = localStorage.getItem('theme');
if (savedTheme && savedTheme !== 'doré') {
    document.body.classList.add('theme-' + savedTheme);
    document.querySelector(`[data-theme="${savedTheme}"]`)?.classList.add('active');
}

// ==================== NOTIFICATION POPUP ====================
function showNotificationPopup() {
    if (localStorage.getItem('notificationDismissed') === 'true') return;

    const popup = document.createElement('div');
    popup.className = 'notification-popup';
    popup.innerHTML = `
        <div class="notification-content">
            <button class="notification-close">&times;</button>
            <h3>Special Offer!</h3>
            <p>Get 10% off your next visit! Show this notification to our staff.</p>
            <button class="btn btn-primary btn-full notification-btn">Got it!</button>
        </div>
    `;
    document.body.appendChild(popup);
    setTimeout(() => popup.classList.add('show'), 100);
    
    popup.querySelector('.notification-close').addEventListener('click', () => {
        popup.classList.remove('show');
        setTimeout(() => popup.remove(), 500);
    });
    popup.querySelector('.notification-btn').addEventListener('click', () => {
        localStorage.setItem('notificationDismissed', 'true');
        popup.classList.remove('show');
        setTimeout(() => popup.remove(), 500);
        const loyaltySection = document.getElementById('fidelite');
        if (loyaltySection) {
            loyaltySection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

setInterval(() => showNotificationPopup(), 25000);
setTimeout(() => showNotificationPopup(), 25000);

// ==================== LOYALTY CARD ====================
function createLoyaltyCard() {
    const section = document.createElement('section');
    section.className = 'section loyalty-section';
    section.id = 'fidelite';
    section.innerHTML = `
        <div class="container">
            <span class="section-label center">Programme Fidélité</span>
            <div class="section-title-3d"><h2 class="center">Carte Fidélité</h2></div>
            <div class="loyalty-card">
                <div class="loyalty-header">
                    <span class="loyalty-brand">Au Rendez-Vous</span>
                    <span class="loyalty-subtitle">Carte Fidélité</span>
                </div>
                <div class="loyalty-stamps">
                    ${Array(10).fill('').map((_, i) => `<div class="stamp" data-index="${i}"><span class="stamp-icon">&#9733;</span></div>`).join('')}
                </div>
                <p class="loyalty-info">10 repas achetés = 1 offert!</p>
                <div class="loyalty-form">
                    <input type="text" id="loyaltyName" placeholder="Votre nom">
                    <input type="email" id="loyaltyEmail" placeholder="Votre email">
                    <textarea id="loyaltyMessage" placeholder="Votre message (optionnel)" rows="2"></textarea>
                    <button class="btn btn-primary" id="loyaltyStart">Commencer</button>
                </div>
            </div>
        </div>
    `;
    
    const reservationSection = document.getElementById('reservation');
    reservationSection.parentNode.insertBefore(section, reservationSection.nextSibling);
    
    let stamps = parseInt(localStorage.getItem('loyaltyStamps') || '0');
    const stampsEl = section.querySelectorAll('.stamp');
    
    function updateStamps() {
        stampsEl.forEach((s, i) => {
            s.classList.toggle('filled', i < stamps);
        });
        localStorage.setItem('loyaltyStamps', stamps);
    }
    updateStamps();
    
    section.querySelector('.loyalty-stamps').addEventListener('click', (e) => {
        const stamp = e.target.closest('.stamp');
        if (stamp && !stamp.classList.contains('filled')) {
            stamps++;
            updateStamps();
            if (stamps >= 10) {
                showToast('Bravo! Vous avez gagné un repas offert!');
                stamps = 0;
                setTimeout(() => updateStamps(), 2000);
            }
        }
    });

    section.querySelector('#loyaltyStart').addEventListener('click', async () => {
        const name = section.querySelector('#loyaltyName').value.trim();
        const email = section.querySelector('#loyaltyEmail').value.trim();
        const message = section.querySelector('#loyaltyMessage').value.trim();

        if (!name) {
            showToast('Veuillez entrer votre nom');
            return;
        }
        if (!email || !email.includes('@')) {
            showToast('Veuillez entrer un email valide');
            return;
        }

        try {
            const response = await fetch('https://formspree.io/f/mjgqlwqd', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    nom: name,
                    email: email,
                    message: message || 'Aucun message',
                    _subject: 'Nouvelle inscription carte fidelite'
                })
            });

            if (response.ok) {
                localStorage.setItem('loyaltyEmail', email);
                showToast('Bienvenue ' + name + '! Votre carte fidelite est prete.');
                section.querySelector('.loyalty-form').style.display = 'none';
            } else {
                showToast('Erreur serveur. Reessayez.');
            }
        } catch (err) {
            showToast('Erreur reseau. Verifiez votre connexion.');
        }
    });

    const savedEmail = localStorage.getItem('loyaltyEmail');
    if (savedEmail) {
        section.querySelector('.loyalty-form').style.display = 'none';
    }
}
createLoyaltyCard();

// ==================== LOYALTY CSS ====================
const loyaltyStyles = document.createElement('style');
loyaltyStyles.textContent = `
    .notification-popup {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.4s ease;
    }
    .notification-popup.show {
        opacity: 1;
        visibility: visible;
    }
    .notification-content {
        background: var(--cream);
        padding: 40px;
        max-width: 400px;
        text-align: center;
        position: relative;
        border: 2px solid var(--gold);
    }
    .notification-close {
        position: absolute;
        top: 10px;
        right: 15px;
        font-size: 1.5rem;
        background: none;
        border: none;
        cursor: pointer;
        color: var(--text);
    }
    .notification-content h3 {
        font-family: 'Playfair Display', serif;
        font-size: 1.8rem;
        color: var(--dark);
        margin-bottom: 15px;
    }
    .notification-content p {
        color: var(--text-light);
        margin-bottom: 20px;
        line-height: 1.6;
    }
    .loyalty-section {
        background: var(--dark);
    }
    .loyalty-section h2 {
        color: var(--cream);
    }
    .loyalty-card {
        max-width: 500px;
        margin: 0 auto;
        background: linear-gradient(135deg, var(--dark) 0%, #2a1a1a 100%);
        border: 2px solid var(--gold);
        padding: 40px;
        text-align: center;
    }
    .loyalty-header {
        margin-bottom: 30px;
    }
    .loyalty-brand {
        display: block;
        font-family: 'Playfair Display', serif;
        font-size: 1.8rem;
        color: var(--gold);
    }
    .loyalty-subtitle {
        color: var(--cream);
        font-size: 0.9rem;
        letter-spacing: 2px;
    }
    .loyalty-stamps {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 10px;
        margin-bottom: 20px;
    }
    .stamp {
        width: 50px;
        height: 50px;
        border: 2px solid rgba(201, 169, 110, 0.3);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        transition: all 0.3s ease;
        cursor: pointer;
    }
    .stamp-icon {
        font-size: 1.2rem;
        color: rgba(201, 169, 110, 0.2);
        transition: all 0.3s ease;
    }
    .stamp.filled {
        background: var(--gold);
        border-color: var(--gold);
    }
    .stamp.filled .stamp-icon {
        color: var(--dark);
    }
    .stamp:hover {
        border-color: var(--gold);
        transform: scale(1.1);
    }
    .loyalty-info {
        color: var(--cream);
        font-style: italic;
        margin-bottom: 20px;
    }
    .loyalty-form {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }
    .loyalty-form input, .loyalty-form textarea {
        flex: 1;
        min-width: 100%;
        padding: 12px 15px;
        border: 1px solid rgba(201, 169, 110, 0.3);
        background: rgba(255,255,255,0.05);
        color: var(--cream);
        font-family: 'Lato', sans-serif;
    }
    .loyalty-form textarea {
        resize: vertical;
    }
    .loyalty-form input::placeholder, .loyalty-form textarea::placeholder {
        color: rgba(255,255,255,0.4);
    }
    @media (max-width: 600px) {
        .stamp { width: 40px; height: 40px; }
        .loyalty-form { flex-direction: column; }
    }
`;
document.head.appendChild(loyaltyStyles);

// ==================== NEWSLETTER ====================
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('newsletterName').value.trim();
        const email = document.getElementById('newsletterEmail').value.trim();
        const message = document.getElementById('newsletterMessage').value.trim();

        if (!name) {
            showToast('Veuillez entrer votre nom');
            return;
        }
        if (!email || !email.includes('@')) {
            showToast('Veuillez entrer un email valide');
            return;
        }

        try {
            const response = await fetch('https://formspree.io/f/mjgqlwqd', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    nom: name,
                    email: email,
                    message: message || 'Aucun message',
                    _subject: 'Nouvelle inscription newsletter'
                })
            });

            if (response.ok) {
                showToast('Merci ' + name + '! Vous etes inscrit a notre newsletter.');
                newsletterForm.reset();
            } else {
                showToast('Erreur serveur. Reessayez.');
            }
        } catch (err) {
            showToast('Erreur reseau. Verifiez votre connexion.');
        }
    });
}

// ==================== QUIZ ====================
const quizQuestions = [
    {
        question: "Vous êtes plutôt...",
        options: ["Sucré", "Salé", "Les deux!"]
    },
    {
        question: "Votre mood du moment?",
        options: ["Réconfortant", "Léger & Frais", "Audacieux"]
    },
    {
        question: "Pour une soirée, vous choisissez...",
        options: ["Un classique intemporel", "Qu chose de nouveau", "Le plat du chef"]
    },
    {
        question: "Votre dessert idéal?",
        options: ["Crème & vanille", "Fruits & fraîcheur", "Chocolat & gourmandise"]
    },
    {
        question: "Vous partagez votre dessert?",
        options: ["Oui, toujours!", "Non, c'est à moi!", "Ça dépend du dessert"]
    }
];

const quizResults = {
    "Coupe Chantilly": {
        name: "Le Classique Gourmand",
        desc: "Vous êtes fidèle aux classiques qui fonctionnent toujours. La Coupe Chantilly est faite pour vous: généreuse, réconfortante, et toujours réussie.",
        img: "images/plat-1.jpg"
    },
    "Salade de Fruits": {
        name: "Le Frais & Léger",
        desc: "Vous appréciez la légèreté et la fraîcheur. La Salade de Fruits d'Été est votre choix parfait: colorée, vitaminée, et pleine de saveurs.",
        img: "images/plat-2.jpg"
    },
    "Coupe Fruits Rouges": {
        name: "Le Passionné",
        desc: "Vous êtes audacieux et plein de caractère. La Coupe Fruits Rouges vous correspond: intense, gourmande, et inoubliable.",
        img: "images/plat-3.jpg"
    },
    "Meringue Chantilly": {
        name: "Le Traditionnel",
        desc: "Vous avez le goût des belles traditions. La Meringue Chantilly est votre dessert: croustillante, fondante, un pur bonheur provençal.",
        img: "images/plat-4.jpg"
    }
};

let currentQuestion = 0;
let answers = [];

function renderQuiz() {
    const content = document.getElementById('quizContent');
    if (!content) return;

    if (currentQuestion >= quizQuestions.length) {
        const resultKey = getResult();
        const result = quizResults[resultKey];
        content.innerHTML = `
            <div class="quiz-result">
                <img src="${result.img}" alt="${resultKey}" class="quiz-result-img">
                <h3>${result.name}</h3>
                <p>${result.desc}</p>
                <button class="btn btn-primary" onclick="resetQuiz()">Recommencer</button>
            </div>
        `;
        document.getElementById('quizProgressBar').style.width = '100%';
        return;
    }

    const q = quizQuestions[currentQuestion];
    document.getElementById('quizProgressBar').style.width = ((currentQuestion / quizQuestions.length) * 100) + '%';

    content.innerHTML = `
        <div class="quiz-question">${q.question}</div>
        <div class="quiz-options">
            ${q.options.map((opt, i) => `<button class="quiz-option" data-index="${i}">${opt}</button>`).join('')}
        </div>
    `;

    content.querySelectorAll('.quiz-option').forEach(btn => {
        btn.addEventListener('click', () => {
            answers[currentQuestion] = parseInt(btn.dataset.index);
            currentQuestion++;
            renderQuiz();
        });
    });
}

function getResult() {
    const score = answers.reduce((a, b) => a + b, 0);
    if (score <= 3) return "Coupe Chantilly";
    if (score <= 5) return "Salade de Fruits";
    if (score <= 7) return "Coupe Fruits Rouges";
    return "Meringue Chantilly";
}

function resetQuiz() {
    currentQuestion = 0;
    answers = [];
    renderQuiz();
}

const quizModal = document.getElementById('quizModal');
const openQuizBtn = document.getElementById('openQuiz');
const closeQuizBtn = document.getElementById('closeQuiz');

if (openQuizBtn) {
    openQuizBtn.addEventListener('click', () => {
        quizModal.classList.add('active');
        renderQuiz();
        document.body.style.overflow = 'hidden';
    });
}

if (closeQuizBtn) {
    closeQuizBtn.addEventListener('click', () => {
        quizModal.classList.remove('active');
        document.body.style.overflow = '';
    });
}

if (quizModal) {
    quizModal.addEventListener('click', (e) => {
        if (e.target === quizModal) {
            quizModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}
