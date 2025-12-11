/* js/main.js */

// ==================== UTILITIES ====================
// Prevent functions from firing too often (Performance)
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ==================== DARK MODE ====================
const themeSwitch = document.getElementById('themeSwitch');
const savedTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

if (savedTheme === 'dark') document.documentElement.classList.add('dark');

if (themeSwitch) {
    themeSwitch.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

// ==================== SMOOTH SCROLL ====================
document.addEventListener('click', function(e) {
    // Event delegation for smooth scroll (better than attaching to all links)
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
});

// ==================== HERO PARTICLES ====================
const heroSection = document.querySelector('.hero');
if (heroSection) {
    const canvas = document.createElement('canvas');
    Object.assign(canvas.style, {
        position: 'absolute', top: '0', left: '0', 
        width: '100%', height: '100%', zIndex: '2', pointerEvents: 'none'
    });
    heroSection.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let particlesArray = [];

    const setDimensions = () => {
        canvas.width = heroSection.offsetWidth;
        canvas.height = heroSection.offsetHeight;
    };
    setDimensions();
    
    // Optimized: Only resize after user STOPS resizing for 100ms
    window.addEventListener('resize', debounce(setDimensions, 100));

    class Particle {
        constructor() { this.reset(); }
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
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
        }
        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < 50; i++) particlesArray.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    }
    animate();
}