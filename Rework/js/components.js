/* js/components.js */

const SiteComponents = {
    nav: `
    <nav>
        <div class="nav-container">
            <a href="index.html">
                <img src="images/logo-transparent.png" alt="Blue Droid Technologies" class="logo">
            </a>
            <button class="menu-toggle" aria-label="Toggle Menu">☰</button>
            <ul class="nav-links" id="navLinks">
                <li><a href="index.html" data-page="home">Home</a></li>
                <li><a href="index.html#services">Services</a></li>
                <li><a href="prices.html" data-page="pricing">Pricing</a></li>
                <li><a href="index.html#about">About</a></li>
                <li><a href="index.html#contact">Contact</a></li>
            </ul>
            <a href="tel:5132126714" class="phone-btn">
                <span class="full">Call or Text • (513) 212-6714</span>
                <span class="short">(513) 212-6714</span>
            </a>
        </div>
    </nav>`,

    footer: `
    <footer>
        <div class="footer-content">
            <div class="footer-section">
                <h4>Blue Droid Technologies</h4>
                <p>Support Made Simple</p>
                <p>Milford, OH</p>
            </div>
            <div class="footer-section">
                <h4>Services</h4>
                <ul>
                    <li><a href="index.html#services">Residential Support</a></li>
                    <li><a href="index.html#services">Business IT Services</a></li>
                    <li><a href="index.html#services">Electronics Recycling</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>Quick Links</h4>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="prices.html">Pricing</a></li>
                    <li><a href="index.html#about">About</a></li>
                    <li><a href="index.html#contact">Contact</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>Contact</h4>
                <ul>
                    <li><a href="tel:5132126714">(513) 212-6714</a></li>
                    <li><a href="mailto:contact@bluedroidtech.com">contact@bluedroidtech.com</a></li>
                    <li><a href="https://www.facebook.com/bluedroidtech" target="_blank" rel="noopener">Facebook</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; ${new Date().getFullYear()} Blue Droid Technologies, LLC. All rights reserved.</p>
        </div>
    </footer>`
};

// Inject Components and Highlight Active Link
document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject Nav
    const navPlaceholder = document.getElementById('app-nav');
    if (navPlaceholder) navPlaceholder.outerHTML = SiteComponents.nav;

    // 2. Inject Footer
    const footerPlaceholder = document.getElementById('app-footer');
    if (footerPlaceholder) footerPlaceholder.outerHTML = SiteComponents.footer;

    // 3. Highlight Active Link
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const links = document.querySelectorAll('.nav-links a');
    
    links.forEach(link => {
        const linkPage = link.getAttribute('href');
        // Simple check: if current URL matches link href
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });

    // 4. Initialize Mobile Menu Toggle (Must be done AFTER injection)
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => navLinks.classList.remove('active'));
        });
    }
});