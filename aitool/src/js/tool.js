// Mock gallery images for tools that don't have real ones
const mockGalleryImages = [
    "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&q=80&w=600&h=380",
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=600&h=380",
    "https://images.unsplash.com/photo-1696521001756-a6f2b6bde15b?auto=format&fit=crop&q=80&w=600&h=380",
    "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=600&h=380",
    "https://images.unsplash.com/photo-1659535871577-5b6e30dc3c9b?auto=format&fit=crop&q=80&w=600&h=380",
    "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?auto=format&fit=crop&q=80&w=600&h=380",
];

const mockFeatures = [
    "Intelligent AI-powered suggestions",
    "Real-time collaboration support",
    "Cloud sync across all devices",
    "Advanced customization options",
    "API access for developers",
    "Priority customer support"
];

const mockPricing = [
    { plan: "Free", price: "$0", features: ["Basic access", "Limited usage", "Community support"] },
    { plan: "Pro", price: "$15/mo", features: ["Unlimited usage", "Priority support", "Advanced features", "API access"] },
    { plan: "Enterprise", price: "Custom", features: ["Everything in Pro", "Custom integrations", "Dedicated account manager", "SLA guarantee"] }
];

const mockPros = ["Excellent user interface", "Fast and reliable performance", "Regularly updated with new features", "Strong community & support"];
const mockCons = ["Limited features on free tier", "Can be expensive for heavy users", "Occasional rate limits"];
const mockFaqs = [
    { q: "Is there a free trial?", a: "Yes, most plans offer a 14-day free trial with no credit card required." },
    { q: "Can I cancel anytime?", a: "Yes, you can cancel your subscription at any time from your account settings." },
    { q: "Is my data secure?", a: "All data is encrypted in transit and at rest using industry-standard AES-256 encryption." }
];
const mockReviews = [
    { user: "Alex P.", rating: 5, date: "Nov 2025", text: "Absolutely transformed my workflow. I can't imagine going back to the old way of doing things." },
    { user: "Maria S.", rating: 4, date: "Oct 2025", text: "Great tool overall. The interface is clean and intuitive. Could use a few more export options." },
    { user: "James K.", rating: 5, date: "Sep 2025", text: "The best tool in its category, hands down. Worth every penny of the subscription." }
];

const getLiveToolsData = () => JSON.parse(localStorage.getItem('aitoolshub_admin_tools')) || toolsData;

// --- Theme Toggle (shared with main.js logic) ---
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const moonIcon = document.querySelector('.moon-icon');
    const sunIcon = document.querySelector('.sun-icon');
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (moonIcon) moonIcon.style.display = 'none';
        if (sunIcon) sunIcon.style.display = 'block';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
            localStorage.setItem('theme', isDark ? 'light' : 'dark');
            if (moonIcon) moonIcon.style.display = isDark ? 'block' : 'none';
            if (sunIcon) sunIcon.style.display = isDark ? 'none' : 'block';
        });
    }
}

// --- Star Rating Generator ---
function generateStars(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    let stars = '';
    for (let i = 0; i < full; i++) stars += '<span class="star full">★</span>';
    if (half) stars += '<span class="star half">★</span>';
    for (let i = full + (half ? 1 : 0); i < 5; i++) stars += '<span class="star empty">★</span>';
    return stars;
}

// --- Lightbox Logic ---
let galleryImages = [];
let lightboxIndex = 0;

function openLightbox(index) {
    lightboxIndex = index;
    document.getElementById('lightboxImg').src = galleryImages[index];
    document.getElementById('lightbox').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
}

function lightboxNav(dir) {
    lightboxIndex = (lightboxIndex + dir + galleryImages.length) % galleryImages.length;
    document.getElementById('lightboxImg').src = galleryImages[lightboxIndex];
}

// --- Main Render Function ---
function renderToolPage(tool) {
    // Page title
    document.title = `${tool.title} — AI Tools Hub`;

    // Breadcrumb
    if (typeof updateBreadcrumbTool === 'function') {
        updateBreadcrumbTool(tool.title);
    }

    // Hero Banner
    const banner = tool.heroBanner || `https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200&h=400`;
    document.getElementById('toolHeroBanner').style.backgroundImage = `url('${banner}')`;

    // Hero card
    document.getElementById('toolIcon').textContent = tool.icon;
    document.getElementById('toolName').textContent = tool.title;
    document.getElementById('toolHeroDesc').textContent = tool.description;

    const isFree = tool.price.toLowerCase().includes('free');
    const catBadge = document.getElementById('toolCategoryBadge');
    const priceBadge = document.getElementById('toolPriceBadge');
    catBadge.textContent = tool.categoryLabel;
    priceBadge.textContent = isFree ? 'Free' : 'Paid';
    priceBadge.classList.add(isFree ? 'badge-free' : 'badge-paid');
    if (tool.isTrending) document.getElementById('toolTrendingBadge').style.display = 'inline';
    if (tool.isEditorsChoice) document.getElementById('toolEditorsBadge').style.display = 'inline';

    // Stats
    document.getElementById('toolRating').textContent = `${tool.rating || '4.8'} ⭐`;
    document.getElementById('starRow').innerHTML = generateStars(tool.rating || 4.8);
    document.getElementById('toolUsers').textContent = tool.users || '500K+';
    document.getElementById('toolPriceHero').textContent = tool.price;

    // Visit Button
    document.getElementById('visitWebsiteBtn').href = tool.link === '#' ? '#' : tool.link;
    document.getElementById('sidebarVisitBtn').href = tool.link === '#' ? '#' : tool.link;

    // Overview
    document.getElementById('toolOverview').textContent = tool.overview || `${tool.title} is a powerful tool in the ${tool.categoryLabel} category. It helps thousands of users streamline their workflows, save time, and achieve better results. With a growing user base of ${tool.users || '500K+'} users worldwide, it has established itself as one of the most trusted tools in its category.`;

    // Features
    const features = tool.features || mockFeatures;
    document.getElementById('featuresList').innerHTML = features.map(f =>
        `<li class="feature-item"><span class="feature-check">✓</span>${f}</li>`
    ).join('');

    // Gallery
    galleryImages = tool.screenshots || mockGalleryImages;
    const galleryGrid = document.getElementById('galleryGrid');
    galleryGrid.innerHTML = galleryImages.map((src, i) =>
        `<div class="gallery-item" data-index="${i}" style="background-image: url('${src}')">
            <div class="gallery-overlay"><span>🔍 View</span></div>
         </div>`
    ).join('');
    galleryGrid.querySelectorAll('.gallery-item').forEach(el => {
        el.addEventListener('click', () => openLightbox(parseInt(el.dataset.index)));
    });

    // Pricing
    const pricing = tool.pricingDetails || mockPricing;
    document.getElementById('pricingGrid').innerHTML = pricing.map((p, i) =>
        `<div class="pricing-card glass-card ${i === 1 ? 'pricing-featured' : ''}">
            ${i === 1 ? '<div class="pricing-popular-badge">Most Popular</div>' : ''}
            <h3 class="pricing-plan">${p.plan}</h3>
            <div class="pricing-price">${p.price}</div>
            <ul class="pricing-features">
                ${p.features.map(f => `<li><span>✓</span>${f}</li>`).join('')}
            </ul>
            <a href="#" class="btn ${i === 1 ? 'btn-primary' : 'btn-secondary'}" style="width:100%;text-align:center;margin-top:auto;">
                ${p.price === '$0' || p.price === 'Custom' ? 'Get Started' : 'Start Free Trial'}
            </a>
        </div>`
    ).join('');

    // Pros & Cons
    const pros = tool.pros || mockPros;
    const cons = tool.cons || mockCons;
    document.getElementById('prosList').innerHTML = pros.map(p => `<li><span class="pro-icon">✅</span>${p}</li>`).join('');
    document.getElementById('consList').innerHTML = cons.map(c => `<li><span class="con-icon">❌</span>${c}</li>`).join('');

    // FAQs
    const faqs = tool.faqs || mockFaqs;
    document.getElementById('faqsList').innerHTML = faqs.map((f, i) =>
        `<div class="faq-item glass-card" data-index="${i}">
            <div class="faq-question" onclick="toggleFaq(this)">
                <span>${f.q}</span>
                <span class="faq-icon">+</span>
            </div>
            <div class="faq-answer">${f.a}</div>
        </div>`
    ).join('');

    // Reviews
    const reviews = tool.reviews || mockReviews;
    const avgRating = reviews.reduce((a, r) => a + r.rating, 0) / reviews.length;
    document.getElementById('reviewsSummary').innerHTML = `
        <div class="reviews-avg">
            <div class="reviews-avg-score">${avgRating.toFixed(1)}</div>
            <div>
                <div class="star-row">${generateStars(avgRating)}</div>
                <div class="reviews-count">Based on ${reviews.length} reviews</div>
            </div>
        </div>`;
    document.getElementById('reviewsList').innerHTML = reviews.map(r =>
        `<div class="review-card glass-card">
            <div class="review-header">
                <div class="review-avatar">${r.user.charAt(0)}</div>
                <div>
                    <div class="review-name">${r.user}</div>
                    <div class="review-date">${r.date}</div>
                </div>
                <div class="review-stars">${generateStars(r.rating)}</div>
            </div>
            <p class="review-text">"${r.text}"</p>
        </div>`
    ).join('');

    // Sidebar: Alternatives
    const alternatives = getLiveToolsData().filter(t => t.id !== tool.id && t.category === tool.category).slice(0, 4);
    const renderSidebarTool = t => `
        <a href="tool.html?id=${t.id}" class="sidebar-tool-item">
            <span class="sidebar-tool-icon">${t.icon}</span>
            <div>
                <div class="sidebar-tool-name">${t.title}</div>
                <div class="sidebar-tool-meta">${t.categoryLabel} · ${t.price}</div>
            </div>
        </a>`;
    document.getElementById('alternativesList').innerHTML = alternatives.map(renderSidebarTool).join('') || '<p style="color:var(--text-secondary);font-size:0.9rem;">No alternatives found.</p>';

    // Sidebar: Related Tools (different category)
    const related = getLiveToolsData().filter(t => t.id !== tool.id && t.category !== tool.category && t.isPopular).slice(0, 4);
    document.getElementById('relatedList').innerHTML = related.map(renderSidebarTool).join('') || '<p style="color:var(--text-secondary);font-size:0.9rem;">No related tools found.</p>';

    // Bottom Related Carousel
    const carouselTools = getLiveToolsData().filter(t => t.id !== tool.id).slice(0, 6);
    document.getElementById('relatedToolsCarousel').innerHTML = carouselTools.map(t =>
        `<div class="tool-card glass-card" style="min-width:300px;flex-shrink:0;">
            <div class="card-header">
                <div class="tool-icon">${t.icon}</div>
                <div class="card-header-text">
                    <h3 class="tool-title">${t.title}</h3>
                    <div class="tool-badges">
                        <span class="badge badge-category">${t.categoryLabel}</span>
                        <span class="badge ${t.price.toLowerCase().includes('free') ? 'badge-free' : 'badge-paid'}">${t.price.toLowerCase().includes('free') ? 'Free' : 'Paid'}</span>
                    </div>
                </div>
            </div>
            <p class="tool-desc">${t.description}</p>
            <div class="card-footer">
                <div class="card-action-icons">
                    <button class="action-btn" title="Bookmark">🔖</button>
                    <button class="action-btn" title="Compare">⚖️</button>
                </div>
                <a href="tool.html?id=${t.id}" class="btn-try">Visit Tool</a>
            </div>
        </div>`
    ).join('');
}

// --- FAQ Toggle ---
function toggleFaq(el) {
    const item = el.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(f => {
        f.classList.remove('open');
        f.querySelector('.faq-icon').textContent = '+';
    });
    if (!isOpen) {
        item.classList.add('open');
        item.querySelector('.faq-icon').textContent = '−';
    }
}

// --- Sticky Tab Highlight ---
function initStickyTabs() {
    const sections = document.querySelectorAll('.detail-section, #video-demo');
    const tabs = document.querySelectorAll('.detail-tab');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(sec => {
            if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
        });
        tabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.getAttribute('href') === `#${current}`) tab.classList.add('active');
        });
    });
}

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initStickyTabs();

    // Lightbox events
    document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
    document.getElementById('lightboxPrev').addEventListener('click', () => lightboxNav(-1));
    document.getElementById('lightboxNext').addEventListener('click', () => lightboxNav(1));
    document.getElementById('lightbox').addEventListener('click', e => {
        if (e.target === document.getElementById('lightbox')) closeLightbox();
    });

    // Get tool ID from URL
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));

    if (!id || !getLiveToolsData()) {
        document.getElementById('toolDetailMain').innerHTML = `
            <div class="container" style="padding: 5rem 0; text-align:center;">
                <h2>Tool not found</h2>
                <p style="color:var(--text-secondary);margin-top:1rem;">The tool you are looking for does not exist.</p>
                <a href="index.html" class="btn btn-primary" style="margin-top:2rem;">← Back to Directory</a>
            </div>`;
        return;
    }

    const tool = getLiveToolsData().find(t => t.id === id);
    if (!tool) {
        document.getElementById('toolDetailMain').innerHTML = `
            <div class="container" style="padding: 5rem 0; text-align:center;">
                <h2>Tool not found</h2>
                <a href="index.html" class="btn btn-primary" style="margin-top:2rem;">← Back to Directory</a>
            </div>`;
        return;
    }

    renderToolPage(tool);
});
