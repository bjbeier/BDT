const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://bluedroidtech.com';
const POSTS_PATH = path.join(__dirname, 'CMS', 'posts.json');
const SITEMAP_PATH = path.join(__dirname, 'sitemap.xml');

const STATIC_PAGES = [
    { url: '/', priority: 1.0 },
    { url: '/prices.html', priority: 0.8 },
    { url: '/blog.html', priority: 0.8 }
];

function formatDate(date) {
    return date.toISOString().split('T')[0];
}

async function generateSitemap() {
    let posts = [];
    try {
        const data = fs.readFileSync(POSTS_PATH, 'utf8');
        posts = JSON.parse(data);
    } catch (error) {
        console.error('Error reading posts.json:', error);
    }

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Static pages
    const today = formatDate(new Date());
    STATIC_PAGES.forEach(page => {
        xml += '  <url>\n';
        xml += `    <loc>${DOMAIN}${page.url}</loc>\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += `    <priority>${page.priority.toFixed(2)}</priority>\n`;
        xml += '  </url>\n';
    });

    // Blog posts
    posts.forEach(post => {
        xml += '  <url>\n';
        xml += `    <loc>${DOMAIN}/post.html?slug=${post.slug}</loc>\n`;
        xml += `    <lastmod>${post.date || today}</lastmod>\n`;
        xml += `    <priority>0.80</priority>\n`;
        xml += '  </url>\n';
    });

    xml += '</urlset>';

    fs.writeFileSync(SITEMAP_PATH, xml);
    console.log(`Sitemap generated at ${SITEMAP_PATH}`);
}

generateSitemap();
