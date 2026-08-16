/* ==========================================================================
   TARINI PRASAD PATI - PORTFOLIO INTERACTIVE & VISUAL ENGINE (v2.5)
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

    // New Advanced Features v2.5
    initCustomCursor();
    initAudioSynth();
    initThemePicker();
    init3DTiltCards();
    initConfettiCanvas();
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
            typeSpeed = 2000;
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
        menuToggle.addEventListener('click', () => {
            mobileNav.classList.add('active');
            playSynthSound(440, 0.05, 'sine');
        });
    }

    if (mobileNavClose && mobileNav) {
        mobileNavClose.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            playSynthSound(330, 0.05, 'sine');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileNav) mobileNav.classList.remove('active');
            playSynthSound(520, 0.04, 'triangle');
        });
    });

    const sections = document.querySelectorAll('section[id], header[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 140;
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
            playSynthSound(600, 0.04, 'sine');

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
    trinetra_tactical: {
        title: "TRINETRA-TACTICAL (Innovation Mission - Bharat 2047)",
        icon: "fas fa-shield-alt",
        category: "Defense Mechatronics",
        tags: ["Defense Mechatronics", "Passive Radar", "Stealth Sensors", "Bharat 2047"],
        desc: "Next-Generation Passive Border Surveillance & Tactical Mechatronics System designed for Viksit Bharat @ 2047. Features stealth high-altitude sensors, passive RF/thermal scanning, and real-time autonomous border threat detection.",
        features: [
            "Passive non-emitting radar detection for zero stealth signature",
            "High-altitude automated thermal-optical sensor tracking pods",
            "Real-time tactical telemetry & border threat telemetry dashboard",
            "Aligned with Innovation Mission - Viksit Bharat 2047 defense initiative"
        ]
    },
    hydraulic_brake: {
        title: "Hydraulic Disc Brake System & FEA Analysis",
        icon: "fas fa-car-side",
        category: "Mechanical CAD",
        tags: ["SolidWorks", "ANSYS FEA", "Hydraulics", "CAD Modeling"],
        desc: "3D CAD modeling and finite element thermal-stress analysis of an automotive ventilated disc brake caliper assembly under emergency braking loads.",
        features: [
            "Complete 3D CAD modeling of rotor disc & dual-piston caliper",
            "ANSYS Finite Element Analysis (FEA) under emergency braking loads",
            "Thermal dissipation simulation to prevent brake fade & rotor warping",
            "Pascal's law hydraulic pressure & master cylinder force calculations"
        ]
    },
    conveyor_system: {
        title: "Automated Conveyor & Pick-and-Place System",
        icon: "fas fa-cogs",
        category: "Mechatronics",
        tags: ["AutoCAD", "Kinematics", "Pneumatics", "PLC Automation"],
        desc: "Design and kinematic optimization of an industrial belt conveyor integrated with pneumatic pick-and-place robotic grippers for high-speed assembly lines.",
        features: [
            "Kinematic chain calculations for belt speed, tension & motor torque",
            "Pneumatic cylinder sizing & directional valve layout",
            "AutoCAD 2D mechanical drafting & assembly exploded views",
            "Sensor placement for automated material detection & sorting"
        ]
    },
    heat_exchanger: {
        title: "Shell & Tube Solar Heat Exchanger",
        icon: "fas fa-fire-alt",
        category: "Thermal Eng",
        tags: ["Thermodynamics", "Heat Transfer", "MATLAB", "SolidWorks"],
        desc: "Thermal and structural design of a high-efficiency shell-and-tube heat exchanger for solar hot water storage systems, utilizing counter-flow heat transfer.",
        features: [
            "Logarithmic Mean Temperature Difference (LMTD) calculations",
            "Tube pitch & baffle spacing optimization for maximum effectiveness",
            "Overall heat transfer coefficient (U-value) thermal modeling",
            "Pressure drop analysis across tube side and shell side fluid channels"
        ]
    },
    ic_engine: {
        title: "4-Stroke IC Engine Crankshaft Kinematics",
        icon: "fas fa-wrench",
        category: "Mechanical CAD",
        tags: ["Theory of Machines", "SolidWorks", "Dynamics", "CAD-CAM"],
        desc: "Dynamic force balance and CAD kinematic animation of a 4-stroke single cylinder internal combustion engine crankshaft, piston, and connecting rod assembly.",
        features: [
            "Piston displacement, velocity & acceleration equation plotting",
            "Dynamic counterweight balancing to eliminate primary engine vibrations",
            "Connecting rod inertia & gas pressure force analysis",
            "SolidWorks motion simulation and stress analysis at top dead center (TDC)"
        ]
    },
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
        title: "Unique Chat Application",
        icon: "fas fa-comments",
        category: "Web Apps",
        tags: ["HTML5", "CSS3", "JavaScript", "AI Chat UI"],
        desc: "Real-time dual-panel chat interface featuring Tarini & Ashika chat views, AI assistant prompt bar, custom dark theme & quick media controls.",
        features: [
            "Dual-panel interactive Tarini & Ashika conversation layout",
            "AI Assistant prompt integration bar",
            "Emoji & quick media action toolbar",
            "Custom neon dark-mode UI styling"
        ]
    },
    portfolio: {
        title: "Modern Glassmorphism Portfolio",
        icon: "fas fa-user-tie",
        category: "Web Apps",
        tags: ["HTML5", "CSS3 Systems", "JavaScript ES6"],
        desc: "High-performance personal developer portfolio built with glassmorphism 3.0 aesthetics, filterable skills matrix, project detail modals, dynamic particle canvas background, and smooth scroll progress.",
        features: [
            "Glassmorphism 3.0 card styling with glowing borders",
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
            playSynthSound(640, 0.04, 'sine');

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

/* ---------- 7. MODALS MANAGER & LIVE SIMULATORS ---------- */
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
    playSynthSound(700, 0.06, 'triangle');
    const data = projectData[key];
    if (!data) return;

    const modalOverlay = document.getElementById('project-modal');
    const modalIcon = document.getElementById('modal-icon');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalTags = document.getElementById('modal-tags');
    const modalFeatures = document.getElementById('modal-features');
    const modalSimulator = document.getElementById('modal-simulator');

    if (modalIcon) modalIcon.className = `${data.icon} modal-header-icon`;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalDesc) modalDesc.textContent = data.desc;

    if (modalTags) {
        modalTags.innerHTML = data.tags.map(t => `<span class="tech-tag">${t}</span>`).join('');
    }

    if (modalFeatures) {
        modalFeatures.innerHTML = data.features.map(f => `<li><i class="fas fa-check-circle"></i> <span>${f}</span></li>`).join('');
    }

    // Render Mini-App Live Simulator inside Modal
    if (modalSimulator) {
        modalSimulator.innerHTML = renderSimulatorHTML(key);
        bindSimulatorEvents(key);
    }

    if (modalOverlay) modalOverlay.classList.add('active');
}

function closeModal() {
    playSynthSound(350, 0.05, 'sine');
    const modalOverlay = document.getElementById('project-modal');
    if (modalOverlay) modalOverlay.classList.remove('active');
}

function renderSimulatorHTML(key) {
    if (key === 'whatsapp') {
        return `
            <div style="margin-bottom: 0.6rem; border-radius: 10px; overflow: hidden; border: 1px solid rgba(0,255,170,0.3); background: rgba(0,0,0,0.4);">
                <img src="images/proj_unique_chat.jpg" alt="Unique Chat UI" style="width: 100%; max-height: 160px; object-fit: contain; display: block; margin: 0 auto;" />
            </div>
            <div class="sim-header-title" style="color: #00ffaa;"><i class="fas fa-comments"></i> Live Unique Chat Simulator</div>
            <div class="sim-whatsapp-box">
                <div class="sim-chat-logs" id="sim-chat-logs">
                    <div class="msg-bubble msg-incoming">Hi Tarini &amp; Ashika! Loved your Unique Chat UI layout.</div>
                    <div class="msg-bubble msg-outgoing">Hello! Dual-panel real-time chat with AI assistant prompt bar is live!</div>
                </div>
                <div class="sim-chat-input-row">
                    <input type="text" id="sim-wa-input" class="form-input" placeholder="Type a message in Unique Chat..." style="padding: 0.5rem 0.8rem; font-size: 0.85rem;" />
                    <button class="btn btn-primary" id="sim-wa-send" style="padding: 0.5rem 1rem; font-size: 0.85rem;"><i class="fas fa-paper-plane"></i></button>
                </div>
            </div>
        `;
    } else if (key === 'spotify') {
        return `
            <div style="margin-bottom: 0.6rem; border-radius: 10px; overflow: hidden; border: 1px solid rgba(255,255,255,0.12); background: rgba(0,0,0,0.4);">
                <img src="images/proj_spotify.jpg" alt="Spotify Player UI" style="width: 100%; max-height: 150px; object-fit: contain; display: block; margin: 0 auto;" />
            </div>
            <div class="sim-header-title"><i class="fab fa-spotify" style="color: #1db954;"></i> Live Spotify Audio Visualizer</div>
            <div class="sim-spotify-widget">
                <div style="display: flex; align-items: center; justify-content: space-between; background: rgba(255,255,255,0.05); padding: 0.8rem; border-radius: var(--radius-md);">
                    <div style="display: flex; align-items: center; gap: 0.8rem;">
                        <i class="fas fa-compact-disc fa-spin" style="font-size: 1.8rem; color: #1db954;"></i>
                        <div>
                            <strong style="color: #fff; font-size: 0.9rem;">Cyber Synthwave Track</strong>
                            <p style="font-size: 0.75rem; color: var(--text-muted);">Tarini Pati • Portfolio Beats</p>
                        </div>
                    </div>
                    <div class="sim-audio-bars">
                        <div class="bar"></div><div class="bar"></div><div class="bar"></div><div class="bar"></div><div class="bar"></div>
                    </div>
                </div>
                <button class="btn btn-glass" id="sim-spotify-play" style="width: 100%; justify-content: center; font-size: 0.85rem; padding: 0.5rem;">
                    <i class="fas fa-play" id="sim-spot-icon"></i> <span id="sim-spot-text">Playing Beat Synth</span>
                </button>
            </div>
        `;
    } else if (key === 'calculator') {
        return `
            <div style="margin-bottom: 0.6rem; border-radius: 10px; overflow: hidden; border: 1px solid rgba(255,255,255,0.12); background: rgba(0,0,0,0.4);">
                <img src="images/proj_calculator.jpg" alt="Calculator UI" style="width: 100%; max-height: 150px; object-fit: contain; display: block; margin: 0 auto;" />
            </div>
            <div class="sim-header-title"><i class="fas fa-calculator" style="color: var(--gold);"></i> Live Glass Calculator Simulator</div>
            <div class="sim-calc-grid">
                <div class="sim-calc-display" id="sim-calc-disp">0</div>
                <button class="sim-calc-btn" data-val="C" style="color: #ef4444;">C</button>
                <button class="sim-calc-btn" data-val="/">/</button>
                <button class="sim-calc-btn" data-val="*">*</button>
                <button class="sim-calc-btn" data-val="-" style="color: var(--cyan);">-</button>

                <button class="sim-calc-btn" data-val="7">7</button>
                <button class="sim-calc-btn" data-val="8">8</button>
                <button class="sim-calc-btn" data-val="9">9</button>
                <button class="sim-calc-btn" data-val="+" style="color: var(--cyan);">+</button>

                <button class="sim-calc-btn" data-val="4">4</button>
                <button class="sim-calc-btn" data-val="5">5</button>
                <button class="sim-calc-btn" data-val="6">6</button>
                <button class="sim-calc-btn" data-val="=" style="grid-row: span 2; background: var(--primary); color: white;">=</button>

                <button class="sim-calc-btn" data-val="1">1</button>
                <button class="sim-calc-btn" data-val="2">2</button>
                <button class="sim-calc-btn" data-val="3">3</button>

                <button class="sim-calc-btn" data-val="0" style="grid-column: span 2;">0</button>
                <button class="sim-calc-btn" data-val=".">.</button>
            </div>
        `;
    } else if (key === 'todo') {
        return `
            <div style="margin-bottom: 0.6rem; border-radius: 10px; overflow: hidden; border: 1px solid rgba(255,255,255,0.12); background: rgba(0,0,0,0.4);">
                <img src="images/proj_todo.jpg" alt="To-Do App UI" style="width: 100%; max-height: 150px; object-fit: contain; display: block; margin: 0 auto;" />
            </div>
            <div class="sim-header-title"><i class="fas fa-tasks" style="color: var(--emerald);"></i> Live To-Do List Simulator</div>
            <div class="sim-todo-list">
                <div class="sim-todo-item"><span>⚡ Build modern glassmorphic web app</span> <input type="checkbox" checked /></div>
                <div class="sim-todo-item"><span>🎨 Add 3D card tilt & particle canvas</span> <input type="checkbox" checked /></div>
                <div class="sim-todo-item"><span>🚀 Launch responsive portfolio</span> <input type="checkbox" /></div>
            </div>
        `;
    } else if (key === 'login') {
        return `
            <div style="margin-bottom: 0.6rem; border-radius: 10px; overflow: hidden; border: 1px solid rgba(255,255,255,0.12); background: rgba(0,0,0,0.4);">
                <img src="images/proj_login.jpg" alt="Login Portal UI" style="width: 100%; max-height: 150px; object-fit: contain; display: block; margin: 0 auto;" />
            </div>
            <div class="sim-header-title"><i class="fas fa-lock" style="color: var(--pink);"></i> Live Login Authentication Simulator</div>
            <div style="display: flex; flex-direction: column; gap: 0.8rem;">
                <input type="text" class="form-input" value="developer@tarini.com" readonly style="font-size: 0.85rem;" />
                <div style="position: relative;">
                    <input type="password" id="sim-pass" class="form-input" value="secret12345" readonly style="font-size: 0.85rem; width: 100%;" />
                    <button id="sim-pass-toggle" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; color: var(--cyan); cursor: pointer;"><i class="fas fa-eye"></i></button>
                </div>
                <button class="btn btn-primary" onclick="showToast('Authentication Successful!', 'fas fa-check-circle')" style="padding: 0.5rem; justify-content: center; font-size: 0.85rem;"><i class="fas fa-sign-in-alt"></i> Test Login</button>
            </div>
        `;
    } else if (key === 'hydraulic_brake') {
        return `
            <div style="margin-bottom: 0.6rem; border-radius: 10px; overflow: hidden; border: 1px solid rgba(255,255,255,0.12); background: rgba(0,0,0,0.4);">
                <img src="images/proj_hydraulic_brake.jpg" alt="Hydraulic Disc Brake CAD" style="width: 100%; max-height: 160px; object-fit: contain; display: block; margin: 0 auto;" />
            </div>
            <div class="sim-header-title"><i class="fas fa-car-side" style="color: #f43f5e;"></i> Interactive Hydraulic Brake Force Simulator</div>
            <div style="background: rgba(255,255,255,0.03); padding: 1rem; border-radius: var(--radius-md); font-size: 0.85rem; color: #fff;">
                <div style="margin-bottom: 0.8rem;">
                    <label>Pedal Force (N): <span id="brake-pedal-val" style="color: var(--cyan); font-weight: 600;">300 N</span></label>
                    <input type="range" id="brake-slider" min="100" max="800" value="300" style="width: 100%; margin-top: 0.3rem;" />
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem; background: rgba(0,0,0,0.3); padding: 0.8rem; border-radius: 8px;">
                    <div>Fluid Pressure: <br><strong id="brake-press" style="color: var(--gold); font-size: 1.1rem;">38.2 Bar</strong></div>
                    <div>Braking Torque: <br><strong id="brake-torque" style="color: var(--emerald); font-size: 1.1rem;">485 Nm</strong></div>
                </div>
            </div>
        `;
    } else if (key === 'conveyor_system') {
        return `
            <div style="margin-bottom: 0.6rem; border-radius: 10px; overflow: hidden; border: 1px solid rgba(255,255,255,0.12); background: rgba(0,0,0,0.4);">
                <img src="images/proj_conveyor_system.jpg" alt="Conveyor System CAD" style="width: 100%; max-height: 160px; object-fit: contain; display: block; margin: 0 auto;" />
            </div>
            <div class="sim-header-title"><i class="fas fa-cogs" style="color: var(--cyan);"></i> Conveyor Belt Power &amp; Torque Estimator</div>
            <div style="background: rgba(255,255,255,0.03); padding: 1rem; border-radius: var(--radius-md); font-size: 0.85rem; color: #fff;">
                <div style="margin-bottom: 0.8rem;">
                    <label>Conveyor Belt Load (kg): <span id="conveyor-load-val" style="color: var(--cyan); font-weight: 600;">150 kg</span></label>
                    <input type="range" id="conveyor-slider" min="50" max="500" value="150" style="width: 100%; margin-top: 0.3rem;" />
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem; background: rgba(0,0,0,0.3); padding: 0.8rem; border-radius: 8px;">
                    <div>Motor Torque: <br><strong id="conveyor-torque" style="color: var(--gold); font-size: 1.1rem;">22.5 Nm</strong></div>
                    <div>Required Power: <br><strong id="conveyor-power" style="color: var(--emerald); font-size: 1.1rem;">1.85 kW</strong></div>
                </div>
            </div>
        `;
    } else if (key === 'heat_exchanger') {
        return `
            <div style="margin-bottom: 0.6rem; border-radius: 10px; overflow: hidden; border: 1px solid rgba(255,255,255,0.12); background: rgba(0,0,0,0.4);">
                <img src="images/proj_heat_exchanger.jpg" alt="Solar Heat Exchanger CAD" style="width: 100%; max-height: 160px; object-fit: contain; display: block; margin: 0 auto;" />
            </div>
            <div class="sim-header-title"><i class="fas fa-fire-alt" style="color: var(--gold);"></i> Solar Heat Exchanger Thermal Estimator</div>
            <div style="background: rgba(255,255,255,0.03); padding: 1rem; border-radius: var(--radius-md); font-size: 0.85rem; color: #fff;">
                <div style="margin-bottom: 0.8rem;">
                    <label>Solar Heat Input (kW): <span id="heat-input-val" style="color: var(--gold); font-weight: 600;">25 kW</span></label>
                    <input type="range" id="heat-slider" min="5" max="60" value="25" style="width: 100%; margin-top: 0.3rem;" />
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem; background: rgba(0,0,0,0.3); padding: 0.8rem; border-radius: 8px;">
                    <div>Water Temp Out: <br><strong id="heat-out-temp" style="color: #f43f5e; font-size: 1.1rem;">68.5 °C</strong></div>
                    <div>Thermal Efficiency: <br><strong style="color: var(--emerald); font-size: 1.1rem;">92.4 %</strong></div>
                </div>
            </div>
        `;
    } else if (key === 'ic_engine') {
        return `
            <div style="margin-bottom: 0.6rem; border-radius: 10px; overflow: hidden; border: 1px solid rgba(255,255,255,0.12); background: rgba(0,0,0,0.4);">
                <img src="images/proj_ic_engine.jpg" alt="4-Stroke IC Engine CAD" style="width: 100%; max-height: 160px; object-fit: contain; display: block; margin: 0 auto;" />
            </div>
            <div class="sim-header-title"><i class="fas fa-wrench" style="color: var(--emerald);"></i> IC Engine RPM &amp; Power Simulator</div>
            <div style="background: rgba(255,255,255,0.03); padding: 1rem; border-radius: var(--radius-md); font-size: 0.85rem; color: #fff;">
                <div style="margin-bottom: 0.8rem;">
                    <label>Engine Speed (RPM): <span id="engine-rpm-val" style="color: var(--emerald); font-weight: 600;">3500 RPM</span></label>
                    <input type="range" id="engine-slider" min="1000" max="7000" value="3500" style="width: 100%; margin-top: 0.3rem;" />
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem; background: rgba(0,0,0,0.3); padding: 0.8rem; border-radius: 8px;">
                    <div>Piston Velocity: <br><strong id="engine-vel" style="color: var(--cyan); font-size: 1.1rem;">11.6 m/s</strong></div>
                    <div>Engine Output: <br><strong id="engine-bhp" style="color: var(--gold); font-size: 1.1rem;">42.8 BHP</strong></div>
                </div>
            </div>
        `;
    } else if (key === 'trinetra_tactical') {
        return `
            <div style="margin-bottom: 0.6rem; border-radius: 10px; overflow: hidden; border: 1px solid rgba(0,255,170,0.3); background: #02140a;">
                <img src="images/proj_trinetra.svg" alt="TRINETRA-TACTICAL HUD" style="width: 100%; max-height: 160px; object-fit: contain; display: block;" />
            </div>
            <div class="sim-header-title" style="color: #00ffaa;"><i class="fas fa-microchip"></i> PROOF-OF-CONCEPT (POC) HARDWARE ARCHITECTURE</div>
            
            <div style="background: rgba(0,255,170,0.05); border: 1px solid rgba(0,255,170,0.25); padding: 1.2rem; border-radius: var(--radius-md); font-size: 0.9rem; color: #fff;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; padding-bottom: 0.6rem; border-bottom: 1px solid rgba(0,255,170,0.2);">
                    <span style="color: #00ffaa; font-weight: 700; letter-spacing: 1px;">TOTAL PROTOTYPE BUDGET</span>
                    <strong style="color: var(--gold); background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.3); padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.85rem;">UNDER ₹2,500 INR</strong>
                </div>

                <div style="display: flex; flex-direction: column; gap: 0.6rem;">
                    <div style="display: flex; justify-content: space-between; background: rgba(0,0,0,0.3); padding: 0.6rem 0.8rem; border-radius: 6px; border-left: 3px solid #00ffaa;">
                        <span><strong style="color: #00ffaa;">ESP32 Nodes (x3)</strong></span>
                        <span style="color: var(--text-muted);">Mesh &amp; Sensing</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; background: rgba(0,0,0,0.3); padding: 0.6rem 0.8rem; border-radius: 6px; border-left: 3px solid var(--cyan);">
                        <span><strong style="color: var(--cyan);">Piezoelectric Units</strong></span>
                        <span style="color: var(--text-muted);">Passive Detection</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; background: rgba(0,0,0,0.3); padding: 0.6rem 0.8rem; border-radius: 6px; border-left: 3px solid var(--emerald);">
                        <span><strong style="color: var(--emerald);">Li-Po Battery</strong></span>
                        <span style="color: var(--text-muted);">Field Power</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; background: rgba(0,0,0,0.3); padding: 0.6rem 0.8rem; border-radius: 6px; border-left: 3px solid var(--pink);">
                        <span><strong style="color: var(--pink);">Flutter UI</strong></span>
                        <span style="color: var(--text-muted);">AR Dashboard</span>
                    </div>
                </div>
            </div>
        `;
    } else {
        return `
            <div style="margin-bottom: 1rem; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1);">
                <img src="images/proj_portfolio.jpg" alt="Portfolio Spec" style="width: 100%; max-height: 200px; object-fit: cover; display: block;" />
            </div>
            <div class="sim-header-title"><i class="fas fa-code-branch" style="color: var(--cyan);"></i> Live Architecture Specs</div>
            <p style="font-size: 0.85rem; color: var(--text-light);">Clean HTML5 semantic structure, modular CSS variables theme palette, ES6 Vanilla JS engine, zero bloat, ultra fast performance.</p>
        `;
    }
}

function bindSimulatorEvents(key) {
    if (key === 'whatsapp') {
        const input = document.getElementById('sim-wa-input');
        const sendBtn = document.getElementById('sim-wa-send');
        const logs = document.getElementById('sim-chat-logs');

        const sendMessage = () => {
            const text = input.value.trim();
            if (!text) return;
            playSynthSound(500, 0.04, 'sine');

            const outMsg = document.createElement('div');
            outMsg.className = 'msg-bubble msg-outgoing';
            outMsg.textContent = text;
            logs.appendChild(outMsg);
            input.value = '';
            logs.scrollTop = logs.scrollHeight;

            setTimeout(() => {
                playSynthSound(600, 0.05, 'triangle');
                const inMsg = document.createElement('div');
                inMsg.className = 'msg-bubble msg-incoming';
                inMsg.textContent = "Thanks for your message! Tarini will connect with you right away.";
                logs.appendChild(inMsg);
                logs.scrollTop = logs.scrollHeight;
            }, 800);
        };

        if (sendBtn) sendBtn.addEventListener('click', sendMessage);
        if (input) input.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });
    } else if (key === 'spotify') {
        const playBtn = document.getElementById('sim-spotify-play');
        const icon = document.getElementById('sim-spot-icon');
        const text = document.getElementById('sim-spot-text');
        let playing = true;

        if (playBtn) {
            playBtn.addEventListener('click', () => {
                playing = !playing;
                playSynthSound(playing ? 520 : 320, 0.06, 'triangle');
                if (playing) {
                    icon.className = "fas fa-pause";
                    text.textContent = "Playing Cyber Synthwave Beat";
                } else {
                    icon.className = "fas fa-play";
                    text.textContent = "Music Paused";
                }
            });
        }
    } else if (key === 'calculator') {
        const disp = document.getElementById('sim-calc-disp');
        const btns = document.querySelectorAll('.sim-calc-btn');
        let currentExpr = '0';

        btns.forEach(b => {
            b.addEventListener('click', () => {
                playSynthSound(480, 0.03, 'sine');
                const val = b.getAttribute('data-val');
                if (val === 'C') {
                    currentExpr = '0';
                } else if (val === '=') {
                    try {
                        currentExpr = String(eval(currentExpr));
                    } catch (e) {
                        currentExpr = 'Error';
                    }
                } else {
                    if (currentExpr === '0' || currentExpr === 'Error') currentExpr = val;
                    else currentExpr += val;
                }
                disp.textContent = currentExpr;
            });
        });
    } else if (key === 'login') {
        const passToggle = document.getElementById('sim-pass-toggle');
        const passInput = document.getElementById('sim-pass');
        if (passToggle && passInput) {
            passToggle.addEventListener('click', () => {
                const isPass = passInput.type === 'password';
                passInput.type = isPass ? 'text' : 'password';
                passToggle.innerHTML = isPass ? '<i class="fas fa-eye-slash"></i>' : '<i class="fas fa-eye"></i>';
                playSynthSound(600, 0.04, 'sine');
            });
        }
    } else if (key === 'hydraulic_brake') {
        const slider = document.getElementById('brake-slider');
        const valTxt = document.getElementById('brake-pedal-val');
        const pressTxt = document.getElementById('brake-press');
        const torqueTxt = document.getElementById('brake-torque');
        if (slider) {
            slider.addEventListener('input', (e) => {
                const val = parseFloat(e.target.value);
                valTxt.textContent = `${val} N`;
                pressTxt.textContent = `${(val * 0.127).toFixed(1)} Bar`;
                torqueTxt.textContent = `${(val * 1.616).toFixed(0)} Nm`;
            });
        }
    } else if (key === 'conveyor_system') {
        const slider = document.getElementById('conveyor-slider');
        const loadTxt = document.getElementById('conveyor-load-val');
        const torqueTxt = document.getElementById('conveyor-torque');
        const powerTxt = document.getElementById('conveyor-power');
        if (slider) {
            slider.addEventListener('input', (e) => {
                const val = parseFloat(e.target.value);
                loadTxt.textContent = `${val} kg`;
                torqueTxt.textContent = `${(val * 0.15).toFixed(1)} Nm`;
                powerTxt.textContent = `${(val * 0.0123).toFixed(2)} kW`;
            });
        }
    } else if (key === 'heat_exchanger') {
        const slider = document.getElementById('heat-slider');
        const valTxt = document.getElementById('heat-input-val');
        const tempTxt = document.getElementById('heat-out-temp');
        if (slider) {
            slider.addEventListener('input', (e) => {
                const val = parseFloat(e.target.value);
                valTxt.textContent = `${val} kW`;
                tempTxt.textContent = `${(30 + val * 1.54).toFixed(1)} °C`;
            });
        }
    } else if (key === 'ic_engine') {
        const slider = document.getElementById('engine-slider');
        const rpmTxt = document.getElementById('engine-rpm-val');
        const velTxt = document.getElementById('engine-vel');
        const bhpTxt = document.getElementById('engine-bhp');
        if (slider) {
            slider.addEventListener('input', (e) => {
                const val = parseFloat(e.target.value);
                rpmTxt.textContent = `${val} RPM`;
                velTxt.textContent = `${(val * 0.0033).toFixed(1)} m/s`;
                bhpTxt.textContent = `${(val * 0.0122).toFixed(1)} BHP`;
            });
        }
    } else if (key === 'trinetra_tactical') {
        const slider = document.getElementById('tri-slider');
        const altTxt = document.getElementById('tri-alt-val');
        const covTxt = document.getElementById('tri-coverage');
        if (slider) {
            slider.addEventListener('input', (e) => {
                const val = parseFloat(e.target.value);
                altTxt.textContent = `${val} M`;
                covTxt.textContent = `${(val * 0.0495).toFixed(1)} KM`;
            });
        }
    }
}

/* ---------- 8. TOAST SYSTEM & COPY EMAIL ---------- */
function showToast(message, icon = 'fas fa-check-circle') {
    playSynthSound(580, 0.05, 'sine');
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

/* ---------- 9. CONTACT FORM HANDLER & CONFETTI ---------- */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        const nameInput = document.getElementById('contact-name');
        const emailInput = document.getElementById('contact-email');
        const messageInput = document.getElementById('contact-message');

        const name = nameInput ? nameInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const message = messageInput ? messageInput.value.trim() : '';

        if (!name || !email || !message) {
            showToast("Please fill in all fields.", "fas fa-exclamation-circle");
            return;
        }

        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Sending to Gmail...`;

        fetch("https://formsubmit.co/ajax/t.tarini2009@gmail.com", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                message: message,
                _subject: `📩 New Portfolio Message from ${name}`,
                _captcha: "false"
            })
        })
        .then(res => res.json())
        .then(data => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            contactForm.reset();

            // Trigger celebration sound & confetti
            playSuccessChime();
            launchConfetti();

            showToast("Success! Message sent directly to your Gmail.", "fas fa-paper-plane");
        })
        .catch(err => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            contactForm.reset();

            playSuccessChime();
            launchConfetti();

            showToast("Message sent! Check your Gmail inbox.", "fas fa-paper-plane");
        });
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
        playSynthSound(600, 0.05, 'triangle');
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

/* ==========================================================================
   ADVANCED MODULES v2.5
   ========================================================================== */

/* ---------- 12. CUSTOM NEON CURSOR ---------- */
function initCustomCursor() {
    const dot = document.getElementById('cursor-dot');
    const glow = document.getElementById('cursor-glow');

    if (!dot || !glow || window.innerWidth < 768) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        dot.style.left = `${mouseX}px`;
        dot.style.top = `${mouseY}px`;
    });

    function animateCursor() {
        glowX += (mouseX - glowX) * 0.15;
        glowY += (mouseY - glowY) * 0.15;

        glow.style.left = `${glowX}px`;
        glow.style.top = `${glowY}px`;

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card, .stat-card, .contact-item, .chip-btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => glow.classList.add('active'));
        el.addEventListener('mouseleave', () => glow.classList.remove('active'));
    });
}

/* ---------- 13. WEB AUDIO SYNTHESIZER ---------- */
let audioCtx = null;
let soundEnabled = true;

function initAudioSynth() {
    const toggleBtn = document.getElementById('sound-toggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        toggleBtn.classList.toggle('active', soundEnabled);
        toggleBtn.innerHTML = soundEnabled ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>';
        showToast(soundEnabled ? "Audio FX Enabled" : "Audio FX Muted", soundEnabled ? "fas fa-volume-up" : "fas fa-volume-mute");

        if (soundEnabled) playSynthSound(520, 0.05, 'sine');
    });
}

function playSynthSound(freq = 440, duration = 0.05, type = 'sine') {
    if (!soundEnabled) return;
    try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
        // Silent catch if audio context blocked
    }
}

function playSuccessChime() {
    if (!soundEnabled) return;
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
        setTimeout(() => playSynthSound(freq, 0.1, 'triangle'), idx * 80);
    });
}

/* ---------- 14. THEME PICKER ---------- */
function initThemePicker() {
    const pills = document.querySelectorAll('.theme-pill');
    const savedTheme = localStorage.getItem('tarini_portfolio_theme') || 'violet';

    setTheme(savedTheme);

    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            const theme = pill.getAttribute('data-theme');
            setTheme(theme);
            playSynthSound(500, 0.04, 'sine');
        });
    });
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('tarini_portfolio_theme', theme);

    document.querySelectorAll('.theme-pill').forEach(p => {
        p.classList.toggle('active', p.getAttribute('data-theme') === theme);
    });
}

/* ---------- 15. 3D PARALLAX CARD TILT ---------- */
function init3DTiltCards() {
    const cards = document.querySelectorAll('.tilt-card, .project-card, .skill-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
}

/* ---------- 16. DEVELOPER INTERACTIVE TERMINAL ---------- */
function initDeveloperTerminal() {
    const form = document.getElementById('terminal-form');
    const input = document.getElementById('terminal-input');
    const body = document.getElementById('terminal-body');
    const chips = document.querySelectorAll('.chip-btn');

    if (!form || !input || !body) return;

    const executeCommand = (cmdStr) => {
        const cmd = cmdStr.trim().toLowerCase();
        if (!cmd) return;

        // Print input prompt line
        const promptLine = document.createElement('div');
        promptLine.className = 'term-line';
        promptLine.innerHTML = `<span class="term-prompt">tarini@dev:~$</span> <span class="text-cyan">${cmdStr}</span>`;
        body.appendChild(promptLine);

        // Process logic
        let responseHTML = '';
        playSynthSound(450, 0.04, 'sine');

        switch (cmd) {
            case 'whoami':
                responseHTML = `<div class="term-line output-line"><strong class="text-cyan">Tarini Prasad Pati</strong> | Full-Stack & Frontend Developer. Building clean, high-performance glassmorphism web apps. Diploma in Mechanical Engineering + Web Master.</div>`;
                break;
            case 'skills':
                responseHTML = `<div class="term-line output-line">HTML5 (95%) • CSS3 Glassmorphism (90%) • JavaScript ES6+ (82%) • Python Logic (75%) • Canva & CapCut (88%)</div>`;
                break;
            case 'projects':
                responseHTML = `<div class="term-line output-line">1. <span class="text-pink">WhatsApp Web Clone</span> 2. <span class="text-emerald">Spotify Player</span> 3. <span class="text-cyan">Glassmorphism Portfolio</span> 4. <span class="text-cyan">Smart Calculator</span> 5. <span class="text-pink">Login Portal</span> 6. <span class="text-emerald">To-Do List</span></div>`;
                break;
            case 'contact':
                responseHTML = `<div class="term-line output-line">Email: <span class="text-cyan">t.tarini2009@gmail.com</span> | Location: Odisha, India | Status: <span class="text-emerald">Open for Hire!</span></div>`;
                break;
            case 'theme':
                responseHTML = `<div class="term-line output-line">Themes available: <span class="text-pink">violet</span>, <span class="text-emerald">emerald</span>, <span class="text-cyan">ocean</span>, <span class="text-pink">crimson</span>. Use the theme picker in navbar!</div>`;
                break;
            case 'clear':
                body.innerHTML = '';
                input.value = '';
                return;
            case 'help':
                responseHTML = `<div class="term-line output-line">Available commands: <span class="text-cyan">whoami</span>, <span class="text-cyan">skills</span>, <span class="text-cyan">projects</span>, <span class="text-cyan">contact</span>, <span class="text-cyan">theme</span>, <span class="text-cyan">clear</span>, <span class="text-cyan">help</span></div>`;
                break;
            default:
                responseHTML = `<div class="term-line output-line text-muted">Command not found: '${cmd}'. Type <span class="text-cyan">'help'</span> for available commands.</div>`;
                break;
        }

        const resLine = document.createElement('div');
        resLine.className = 'term-line';
        resLine.innerHTML = responseHTML;
        body.appendChild(resLine);

        input.value = '';
        body.scrollTop = body.scrollHeight;
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        executeCommand(input.value);
    });

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            const command = chip.getAttribute('data-cmd');
            executeCommand(command);
        });
    });
}

/* ---------- 17. CANVAS CONFETTI EXPLOSION ---------- */
function initConfettiCanvas() {
    // Loaded lazily on trigger
}

function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const pieces = [];
    const colors = ['#8b5cf6', '#06b6d4', '#ec4899', '#10b981', '#f59e0b', '#ffffff'];

    for (let i = 0; i < 90; i++) {
        pieces.push({
            x: width / 2,
            y: height / 2,
            vx: (Math.random() - 0.5) * 16,
            vy: (Math.random() - 0.7) * 16,
            size: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            rotSpeed: (Math.random() - 0.5) * 10,
            opacity: 1
        });
    }

    let frame = 0;
    function renderConfetti() {
        ctx.clearRect(0, 0, width, height);

        let activePieces = 0;
        pieces.forEach(p => {
            if (p.opacity <= 0) return;
            activePieces++;

            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.25;
            p.rotation += p.rotSpeed;
            p.opacity -= 0.012;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.globalAlpha = Math.max(0, p.opacity);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            ctx.restore();
        });

        frame++;
        if (activePieces > 0 && frame < 150) {
            requestAnimationFrame(renderConfetti);
        } else {
            ctx.clearRect(0, 0, width, height);
        }
    }

    renderConfetti();
}
