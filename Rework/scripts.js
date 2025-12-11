// ==================== THEME INITIALIZATION ====================
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
}

// ==================== SHARED LAYOUT (NAV + FOOTER) ====================
function sectionHref(id) {
    // Use in-page anchor if the element exists, otherwise link back to index.html with hash
    return document.getElementById(id) ? `#${id}` : `index.html#${id}`;
}

function renderSharedLayout() {
    const header = document.getElementById('site-header');
    const footer = document.getElementById('site-footer');

    if (header) {
        const servicesHref = sectionHref('services');
        const aboutHref = sectionHref('about');
        const contactHref = sectionHref('contact');

        header.innerHTML = `
            <nav>
                <div class="nav-container">
                    <img src="images/logo.png"
                         alt="Blue Droid Technologies"
                         class="logo">
                    <button class="menu-toggle" data-menu-toggle aria-label="Toggle navigation">☰</button>
                    <ul class="nav-links" id="navLinks">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="${servicesHref}">Services</a></li>
                        <li><a href="prices.html">Pricing</a></li>
                        <li><a href="${aboutHref}">About</a></li>
                        <!-- <li><a href="blog.html">Blog</a></li> -->
                        <li><a href="${contactHref}">Contact</a></li>
                    </ul>
                    <a href="tel:5132126714" class="phone-btn">
                        <span class="full">Call or Text • (513) 212-6714</span>
                        <span class="short">(513) 212-6714</span>
                    </a>
                </div>
            </nav>
        `;
    }

    if (footer) {
        footer.innerHTML = `
            <div class="footer-content">
                <div class="footer-section">
                    <h4>Blue Droid Technologies</h4>
                    <p>Support Made Simple</p>
                    <p>Milford, OH</p>
                </div>
                <div class="footer-section">
                    <h4>Services</h4>
                    <ul>
                        <li><a href="${sectionHref('services')}">Residential Support</a></li>
                        <li><a href="${sectionHref('services')}">Business IT Services</a></li>
                        <li><a href="${sectionHref('services')}">Electronics Recycling</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="prices.html">Pricing</a></li>
                        <li><a href="${sectionHref('about')}">About</a></li>
                        <li><a href="${sectionHref('contact')}">Contact</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Contact</h4>
                    <ul>
                        <li><a href="tel:5132126714">(513) 212-6714</a></li>
                        <li><a href="mailto:contact@bluedroidtech.com">contact@bluedroidtech.com</a></li>
                        <li>
                            <a href="https://www.facebook.com/bluedroidtech" target="_blank" rel="noopener">
                                <svg width="24" height="24" viewBox="0 0 24 24"
                                     fill="currentColor"
                                     style="display:inline-block;vertical-align:middle;margin-right:8px;">
                                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.13 8.44 9.88v-6.99h-2.54v-2.89h2.54V9.84c0-2.51 1.58-3.88 3.88-3.88 1.13 0 2.3.2 2.3.2v2.53h-1.29c-1.27 0-1.67.79-1.67 1.6v1.92h2.97l-.48 2.89h-2.49V22c4.78-.75 8.44-4.89 8.44-9.88z"></path>
                                </svg>
                                Facebook
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 Blue Droid Technologies, LLC. All rights reserved.</p>
            </div>
        `;
    }
}

function initNav() {
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.querySelector('[data-menu-toggle]');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
}

// ==================== SMOOTH SCROLLING ====================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ==================== DARK MODE TOGGLE ====================
function initThemeSwitch() {
    const themeSwitch = document.getElementById('themeSwitch');
    if (!themeSwitch) return;

    themeSwitch.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

// ==================== ELEGANT PARTICLE MOTION FOR HERO ====================
function initHeroParticles() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;

    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '2';
    canvas.style.pointerEvents = 'none';
    heroSection.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    function setCanvasDimensions() {
        canvas.width = heroSection.offsetWidth;
        canvas.height = heroSection.offsetHeight;
    }
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 0.3 - 0.15;
            this.speedY = Math.random() * 0.3 - 0.15;
            this.opacity = Math.random() * 0.5 + 0.1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }

        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
    }

    const particlesArray = [];
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
        particlesArray.push(new Particle());
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
    }
    animate();
}

// ==================== NEWSLETTER FORM (if present) ====================
function handleNewsletter(event) {
    event.preventDefault();
    alert('Thank you for subscribing! Newsletter feature coming soon.');
    event.target.reset();
}

// ==================== MAIN INIT ====================
document.addEventListener('DOMContentLoaded', () => {
    renderSharedLayout();
    initNav();
    initThemeSwitch();
    initSmoothScroll();
    initHeroParticles();
});
