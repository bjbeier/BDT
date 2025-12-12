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
    const currentPath = window.location.pathname.split('/').pop();

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
                        <li><a href="index.html" class="${currentPath === 'index.html' || currentPath === '' ? 'active' : ''}">Home</a></li>
                        <li><a href="${servicesHref}" class="${currentPath === 'index.html' && window.location.hash.includes('services') ? 'active' : ''}">Services</a></li>
                        <li><a href="prices.html" class="${currentPath === 'prices.html' ? 'active' : ''}">Pricing</a></li>
                        <!-- NEW BLOG LINK -->
                        <li><a href="blog.html" class="${currentPath === 'blog.html' ? 'active' : ''}">Blog</a></li>
                        <li><a href="${aboutHref}" class="${currentPath === 'index.html' && window.location.hash.includes('about') ? 'active' : ''}">About</a></li>
                        <li><a href="${contactHref}" class="${currentPath === 'index.html' && window.location.hash.includes('contact') ? 'active' : ''}">Contact</a></li>
                    </ul>
                </div>
            </nav>
        `;

        // Add menu toggle functionality
        const menuToggle = document.querySelector('[data-menu-toggle]');
        const navLinks = document.getElementById('navLinks');
        if (menuToggle && navLinks) {
            menuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('open');
            });
        }
    }

    if (footer) {
        footer.innerHTML = `
            <div class="container footer-content">
                <div class="footer-section">
                    <h4>Blue Droid Technologies</h4>
                    <p>Local, honest tech support serving Milford, OH, and surrounding areas.</p>
                </div>
                <div class="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="prices.html">Pricing</a></li>
                        <li><a href="blog.html">Blog</a></li>
                        <li><a href="${sectionHref('about')}">About Us</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Contact</h4>
                    <ul>
                        <li><a href="tel:5132126714">(513) 212-6714</a></li>
                        <li><a href="mailto:contact@bluedroidtech.com">contact@bluedroidtech.com</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; ${new Date().getFullYear()} Blue Droid Technologies. All rights reserved.</p>
            </div>
        `;
    }
}

// Call the layout renderer once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', renderSharedLayout);

// ==================== THEME SWITCHER LOGIC ====================
function setupThemeSwitcher() {
    const themeSwitch = document.getElementById('themeSwitch');
    const htmlElement = document.documentElement;
    const sunIcon = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');

    // Function to update the icons based on the current theme
    const updateIcons = (isDark) => {
        if (sunIcon && moonIcon) {
            sunIcon.style.display = isDark ? 'none' : 'block';
            moonIcon.style.display = isDark ? 'block' : 'none';
        }
    };

    // Initial icon state
    updateIcons(htmlElement.classList.contains('dark'));

    if (themeSwitch) {
        themeSwitch.addEventListener('click', () => {
            const isDark = htmlElement.classList.toggle('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateIcons(isDark);
        });
    }
}
document.addEventListener('DOMContentLoaded', setupThemeSwitcher);


// ==================== PARTICLE EFFECT (index.html only) ====================
function setupParticleEffect() {
    const canvas = document.getElementById('particleCanvas');

    // Only run if the canvas element exists (i.e., on index.html)
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    let w, h;
    function resizeCanvas() {
        w = canvas.width = canvas.offsetWidth;
        h = canvas.height = canvas.offsetHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // Initial call

    class Particle {
        constructor() {
            this.reset();
            this.x = Math.random() * w; // Start anywhere on load
            this.y = Math.random() * h;
        }

        reset() {
            this.size = Math.random() * 2 + 1;
            this.x = Math.random() < 0.5 ? 0 : w;
            this.y = Math.random() * h;
            this.opacity = Math.random() * 0.5 + 0.1;

            // Give them a slow, random movement towards the center
            const directionX = (w / 2 - this.x) > 0 ? 1 : -1;
            const directionY = (h / 2 - this.y) > 0 ? 1 : -1;
            this.speedX = directionX * (Math.random() * 0.5 + 0.1);
            this.speedY = directionY * (Math.random() * 0.5 + 0.1);
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) {
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
        ctx.clearRect(0, 0, w, h);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
    }
    animate();
}
document.addEventListener('DOMContentLoaded', setupParticleEffect);


// ==================== BLOG LOGIC (blog.html only) ====================

// Simulated Blog Data - Easily editable JSON structure
const blogPosts = [
    {
        id: 1,
        title: "The Ultimate Guide to Malware Removal (And Prevention)",
        date: "2025-11-20",
        author: "BJ Beier",
        tags: ["Cybersecurity", "Repair", "Windows"],
        excerpt: "Viruses and malware are common, but totally fixable. Learn the tell-tale signs of an infection and, more importantly, the three simple steps you can take to prevent them from happening in the first place.",
        link: "#post-1"
    },
    {
        id: 2,
        title: "Why Your Wi-Fi Signal Is Weak (And How to Fix It)",
        date: "2025-10-15",
        author: "BJ Beier",
        tags: ["Networking", "Tips", "Smart Home"],
        excerpt: "A slow internet connection often isn't your ISP's fault. It could be your router placement. Discover how to optimize your network for whole-home coverage and eliminate dead zones.",
        link: "#post-2"
    },
    {
        id: 3,
        title: "When to Upgrade vs. When to Repair Your PC",
        date: "2025-09-01",
        author: "BJ Beier",
        tags: ["Hardware", "Repair", "Upgrade"],
        excerpt: "Is your old machine worth saving? We break down the costs and benefits of upgrading components like SSDs and RAM versus buying a brand new computer. Save money by making the right choice.",
        link: "#post-3"
    },
    {
        id: 4,
        title: "Choosing the Best Backup Solution: Cloud vs. Local",
        date: "2025-08-28",
        author: "BJ Beier",
        tags: ["Data Backup", "Tips", "Security"],
        excerpt: "Don't wait for a crash to worry about backups. We compare cloud services like Dropbox and OneDrive with local solutions like external drives, helping you find the perfect 3-2-1 strategy.",
        link: "#post-4"
    },
    {
        id: 5,
        title: "Introducing New Flat-Rate Services for Milford Residents",
        date: "2025-07-05",
        author: "BJ Beier",
        tags: ["Local News", "Pricing"],
        excerpt: "We are excited to announce new transparent, flat-rate pricing for our most popular services, including SSD installs and data migration. Check out the new price list!",
        link: "prices.html"
    }
];

function setupBlog() {
    const postListElement = document.getElementById('post-list');
    const tagContainer = document.getElementById('tag-container');
    const timelineList = document.getElementById('timeline-list');
    
    // Check if we are on the blog page
    if (!postListElement) return;

    let activeTag = null;
    let activeMonth = null;

    // --- 1. POST RENDERING ---
    function renderPosts(filteredPosts = blogPosts) {
        postListElement.innerHTML = filteredPosts.map(post => {
            const date = new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            return `
                <article class="post-card" data-tags="${post.tags.join(',')}" data-date="${post.date}">
                    <a href="${post.link}">
                        <h2>${post.title}</h2>
                    </a>
                    <p class="post-meta">
                        Published on ${date} by <strong>${post.author}</strong>
                    </p>
                    <div class="tag-container">
                        ${post.tags.map(tag => `<span class="tag" data-tag="${tag}">${tag}</span>`).join('')}
                    </div>
                    <p class="post-excerpt">${post.excerpt}</p>
                    <a href="${post.link}" class="read-more">Read Full Post &rarr;</a>
                </article>
            `;
        }).join('');
    }

    // --- 2. TAGS & TIMELINE GENERATION ---
    const allTags = [...new Set(blogPosts.flatMap(post => post.tags))].sort();
    const months = [...new Set(blogPosts.map(post => new Date(post.date).getFullYear() + '-' + new Date(post.date).getMonth()))]
        .map(monthKey => {
            const [year, monthIndex] = monthKey.split('-');
            const date = new Date(year, monthIndex, 1);
            return {
                key: monthKey,
                name: date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
                posts: blogPosts.filter(p => new Date(p.date).getFullYear() == year && new Date(p.date).getMonth() == monthIndex).length
            };
        })
        .sort((a, b) => new Date(b.key) - new Date(a.key)); // Sort descending

    // Render tags
    tagContainer.innerHTML = `
        <span class="tag all-tags active" data-tag="all">All (${blogPosts.length})</span>
        ${allTags.map(tag => {
            const count = blogPosts.filter(post => post.tags.includes(tag)).length;
            return `<span class="tag" data-tag="${tag}">${tag} (${count})</span>`;
        }).join('')}
    `;

    // Render timeline
    timelineList.innerHTML = months.map(month => `
        <li class="timeline-item">
            <a href="#" data-month-key="${month.key}">${month.name} (${month.posts})</a>
        </li>
    `).join('');

    // --- 3. FILTERING LOGIC ---
    function applyFilter() {
        let filtered = blogPosts;

        if (activeTag && activeTag !== 'all') {
            filtered = filtered.filter(post => post.tags.includes(activeTag));
        }

        if (activeMonth) {
            filtered = filtered.filter(post => {
                const postMonthKey = new Date(post.date).getFullYear() + '-' + new Date(post.date).getMonth();
                return postMonthKey === activeMonth;
            });
        }
        
        // Sort posts by date, newest first
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

        renderPosts(filtered);
    }

    // Event listener for tag filtering
    tagContainer.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains('tag')) {
            // Clear all active classes
            document.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.timeline-list a').forEach(a => a.classList.remove('active'));

            activeTag = target.getAttribute('data-tag');
            activeMonth = null;
            
            target.classList.add('active');
            applyFilter();
        }
    });

    // Event listener for timeline filtering
    timelineList.addEventListener('click', (e) => {
        const target = e.target;
        if (target.tagName === 'A') {
            e.preventDefault();
            
            // Clear all active classes
            document.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.timeline-list a').forEach(a => a.classList.remove('active'));

            activeMonth = target.getAttribute('data-month-key');
            activeTag = 'all'; // Reset tag filter to 'all'
            
            // Set 'All' tag as active
            const allTag = document.querySelector('.tag.all-tags');
            if (allTag) allTag.classList.add('active');

            target.classList.add('active');
            applyFilter();
        }
    });

    // Initial render
    renderPosts();
}

document.addEventListener('DOMContentLoaded', setupBlog);