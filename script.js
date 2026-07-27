/* ==========================================================================
   TARINI PRASAD PATI - PORTFOLIO INTERACTIVE SCRIPT (v2.0)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initParticleCanvas();
    initTypewriter();
    initScrollProgress();
    initNavigation();
    initSkillsFilter();
    initProjectsFilter();
    initModals();
    initContactForm();
    initBackToTop();
    initScrollAnimations();
});

/* ---------- 1. PARTICLE CANVAS ANIMATION ---------- */
function initParticleCanvas() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(width / 20), 60);

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            radius: Math.random() * 2 + 1,
            color: Math.random() > 0.5 ? 'rgba(139, 92, 246, ' : 'rgba(6, 182, 212, ',
            alpha: Math.random() * 0.5 + 0.2
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach((p, index) => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color + p.alpha + ')';
            ctx.fill();

            // Connect nearby particles
            for (let j = index + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(139, 92, 246, ${0.15 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        });

        requestAnimationFrame(animate);
    }

    animate();
}

/* ---------- 2. TYPEWRITER EFFECT ---------- */
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;

    const words = [
        "Frontend Web Specialist",
        "Full-Stack Developer",
        "Mechanical & Coding Hybrid",
        "UI/UX & Interactive Creator"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at full word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

/* ---------- 3. SCROLL PROGRESS BAR ---------- */
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${progress}%`;
    });
}

/* ---------- 4. NAVIGATION & MOBILE DRAWER ---------- */
function initNavigation() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavClose = document.getElementById('mobile-nav-close');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-link');

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => mobileNav.classList.add('active'));
    }

    if (mobileNavClose && mobileNav) {
        mobileNavClose.addEventListener('click', () => mobileNav.classList.remove('active'));
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileNav) mobileNav.classList.remove('active');
        });
    });

    // Active Nav Link Highlight on Scroll
    const sections = document.querySelectorAll('section[id], header[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link').forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === `#${current}`) {
                a.classList.add('active');
            }
        });
    });
}

/* ---------- 5. SKILLS FILTER & METERS ---------- */
function initSkillsFilter() {
    const filterBtns = document.querySelectorAll('#skills-filter .filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            skillCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* ---------- 6. PROJECTS FILTER & MODAL DATA ---------- */
const projectData = {
    spotify: {
        title: "Spotify Web Music Clone",
        icon: "fab fa-spotify",
        category: "Clones",
        tags: ["HTML5", "CSS3 Grid/Flex", "JavaScript"],
        desc: "A fully responsive music player UI inspired by Spotify. Features track list layout, responsive playback bar, custom dark gradients, playlist sidebar, and slick audio visual vibe.",
        features: [
            "Pixel-perfect responsive Spotify Web player interface",
            "Sidebar navigation with playlists & dynamic active states",
            "Sleek media control bar with volume slider simulation",
            "Custom Glassmorphic music card hover effects"
        ]
    },
    whatsapp: {
        title: "WhatsApp Web Clone",
        icon: "fab fa-whatsapp",
        category: "Clones",
        tags: ["HTML5", "CSS3", "JavaScript"],
        desc: "Interactive WhatsApp Web user interface featuring chat list, real-time message bubble layout, contact search bar, responsive chat pane, and dark mode UI polish.",
        features: [
            "Authentic WhatsApp Web chat panel layout",
            "Interactive chat item selection with chat area swap",
            "Message bubble rendering with timestamp indicators",
            "Responsive layout for mobile and desktop screens"
        ]
    },
    portfolio: {
        title: "Modern Glassmorphism Portfolio",
        icon: "fas fa-user-tie",
        category: "Web Apps",
        tags: ["HTML5", "CSS3 Systems", "JavaScript ES6"],
        desc: "High-performance personal developer portfolio built with glassmorphism 2.0 aesthetics, filterable skills matrix, project detail modals, dynamic particle canvas background, and smooth scroll progress.",
        features: [
            "Glassmorphism 2.0 card styling with glowing borders",
            "Particle starfield background canvas animation",
            "Interactive skills filter & project detail modal popups",
            "Click-to-copy email toast notification system"
        ]
    },
    calculator: {
        title: "Interactive Smart Calculator",
        icon: "fas fa-calculator",
        category: "Tools",
        tags: ["HTML5", "CSS Grid", "JavaScript Logic"],
        desc: "Sleek glassmorphic web calculator with full arithmetic evaluation, keyboard input support, clear/delete history, and smooth keypress micro-animations.",
        features: [
            "Grid layout with glass button click feedback",
            "Full arithmetic operations (+, -, *, /) and decimal support",
            "Error prevention and live display evaluation",
            "Dark neon key theme with hover shine"
        ]
    },
    login: {
        title: "Glassmorphic Login Portal",
        icon: "fas fa-sign-in-alt",
        category: "Web Apps",
        tags: ["HTML5", "CSS3 Glass", "JS Form Logic"],
        desc: "Modern responsive authentication page with floating form labels, show/hide password toggle, smooth gradient background blobs, and form validation.",
        features: [
            "Animated glowing backdrop blur card container",
            "Interactive password visibility toggle button",
            "Responsive layout with subtle micro-animations",
            "Clean UI design system for authentication flows"
        ]
    },
    todo: {
        title: "Smart To-Do List App",
        icon: "fas fa-tasks",
        category: "Web Apps",
        tags: ["HTML5", "CSS3 Glass", "JS LocalStorage"],
        desc: "Feature-rich productivity task management app with priority tagging, status filter views, task completion toggles, and automatic LocalStorage persistence.",
        features: [
            "Add, edit, toggle complete, and delete daily tasks",
            "Category badges (Work, Coding, Personal, High Priority)",
            "Automatic browser LocalStorage integration for persistent tasks",
            "Filter tasks by status (All, Active, Completed)",
            "Responsive dark glass design with smooth completion animations"
        ]
    }
};

function initProjectsFilter() {
    const filterBtns = document.querySelectorAll('#projects-filter .filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* ---------- 7. MODALS MANAGER ---------- */
function initModals() {
    const modalOverlay = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');

    if (modalClose && modalOverlay) {
        modalClose.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

function openProjectModal(key) {
    const data = projectData[key];
    if (!data) return;

    const modalOverlay = document.getElementById('project-modal');
    const modalIcon = document.getElementById('modal-icon');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalTags = document.getElementById('modal-tags');
    const modalFeatures = document.getElementById('modal-features');

    if (modalIcon) modalIcon.className = `${data.icon} modal-header-icon`;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalDesc) modalDesc.textContent = data.desc;

    if (modalTags) {
        modalTags.innerHTML = data.tags.map(t => `<span class="tech-tag">${t}</span>`).join('');
    }

    if (modalFeatures) {
        modalFeatures.innerHTML = data.features.map(f => `<li><i class="fas fa-check-circle"></i> <span>${f}</span></li>`).join('');
    }

    if (modalOverlay) modalOverlay.classList.add('active');
}

function closeModal() {
    const modalOverlay = document.getElementById('project-modal');
    if (modalOverlay) modalOverlay.classList.remove('active');
}

/* ---------- 8. TOAST SYSTEM & COPY EMAIL ---------- */
function showToast(message, icon = 'fas fa-check-circle') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="${icon}"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(100%) scale(0.8)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function copyEmail() {
    const email = "t.tarini2009@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
        showToast("Email address copied to clipboard!", "fas fa-copy");
    }).catch(() => {
        showToast(`Email: ${email}`, "fas fa-envelope");
    });
}

/* ---------- 9. CONTACT FORM HANDLER ---------- */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Sending...`;

        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            contactForm.reset();
            showToast("Thank you! Your message has been sent.", "fas fa-paper-plane");
        }, 1200);
    });
}

/* ---------- 10. BACK TO TOP BUTTON ---------- */
function initBackToTop() {
    const backBtn = document.getElementById('back-to-top');
    if (!backBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backBtn.classList.add('visible');
        } else {
            backBtn.classList.remove('visible');
        }
    });

    backBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ---------- 11. SCROLL REVEAL ANIMATIONS ---------- */
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    const animatedElements = document.querySelectorAll('.glass-card, .stat-card, .skill-card, .project-card, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}
