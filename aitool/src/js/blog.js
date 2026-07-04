/* ============================================================
   BLOG ENGINE LOGIC — Seeding, Search, Filters, Modal Reader
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    // --- Data Accessor ---
    const getBlogPosts = () => {
        const localBlogs = localStorage.getItem('aitoolshub_admin_blog');
        if (localBlogs) {
            return JSON.parse(localBlogs);
        }
        // Fallback seed if local storage wasn't initialized yet
        return [
            {
                id: 1,
                title: "OpenAI Launches GPT-5: A New Era of Reasoning",
                category: "AI News",
                author: "Sarah Jenkins",
                date: "2026-06-25",
                tags: "GPT-5, OpenAI, AI News",
                content: "OpenAI has officially launched its next-generation model, GPT-5. The model shows massive improvements in multi-step reasoning, coding capabilities, and complex problem-solving. In initial benchmarks, GPT-5 outperformed previous models by over 35% in advanced logic tasks. The release features a larger context window and significantly reduced latency, making it the most practical model for complex automation tasks in enterprise workflows."
            },
            {
                id: 2,
                title: "How to Build an AI Assistant with Node.js and Gemini",
                category: "AI Tutorials",
                author: "David Chen",
                date: "2026-06-28",
                tags: "Gemini, Node.js, Tutorial",
                content: "In this step-by-step tutorial, we explore how to integrate the Google Gemini API into a Node.js application to build a fully functional AI assistant. We will cover environment setups, API key authentication, streaming responses, and managing conversational history. By the end of this guide, you will have a custom assistant ready to be integrated into your website backend."
            },
            {
                id: 3,
                title: "Claude 3.5 Sonnet: The Ultimate Developer Review",
                category: "Product Reviews",
                author: "Alex Rivera",
                date: "2026-06-30",
                tags: "Claude 3.5, Anthropic, Review",
                content: "We take an in-depth look at Anthropic's Claude 3.5 Sonnet. As developers, we tested its code generation speed, error correction, context recall, and ability to follow instruction sets. Sonnet stands out as a highly context-aware assistant, providing cleaner code drafts than competitor models while reducing debugging cycles dramatically. Here is our full feature-by-feature breakdown."
            },
            {
                id: 4,
                title: "ChatGPT Plus vs Claude Pro: Which Is Worth the $20?",
                category: "Comparisons",
                author: "Elena Petrova",
                date: "2026-07-01",
                tags: "ChatGPT, Claude, Comparison",
                content: "Choosing between ChatGPT Plus and Claude Pro can be tough. Both cost $20 per month but offer very different strengths. ChatGPT Plus shines in web browsing integration, custom GPT customizability, and image generation via DALL-E 3. Claude Pro, on the other hand, excels in deep code analysis, writing style matching, and working with huge file uploads. In this article, we compare their pricing, speed, accuracy, and UI to help you decide."
            },
            {
                id: 5,
                title: "Top 5 Agentic AI Design Patterns in 2026",
                category: "Latest AI Trends",
                author: "Marcus Vance",
                date: "2026-07-02",
                tags: "Trends, Agentic AI, Architecture",
                content: "As we move into the second half of 2026, agentic AI frameworks have taken center stage. Simple prompt engineering is giving way to complex multi-agent architectures. In this article, we review the top five design patterns dominating AI development today: the router pattern, orchestrator-workers pattern, self-reflection loop, memory-retrieval pattern, and human-in-the-loop interfaces."
            }
        ];
    };

    // --- DOM Elements ---
    const searchInput = document.getElementById('blogSearchInput');
    const categoryChips = document.getElementById('blogCategoryChips');
    const featuredContainer = document.getElementById('featuredPostContainer');
    const feedContainer = document.getElementById('blogFeedContainer');
    const sidebarRecent = document.getElementById('sidebarRecentPosts');
    const newsletterForm = document.getElementById('blogNewsletterForm');

    // Reader modal elements
    const readerModal = document.getElementById('readerModal');
    const readerTitle = document.getElementById('readerTitle');
    const readerCategory = document.getElementById('readerCategory');
    const readerAuthor = document.getElementById('readerAuthor');
    const readerDate = document.getElementById('readerDate');
    const readerContent = document.getElementById('readerContentText');
    const readerTags = document.getElementById('readerTags');
    const readerCloseBtn = document.getElementById('readerCloseBtn');

    let currentCategory = 'All';
    let currentSearchTerm = '';

    // --- Render Article Layouts ---
    const openReader = (post) => {
        readerTitle.textContent = post.title;
        readerCategory.textContent = post.category;
        readerAuthor.textContent = `By ${post.author}`;
        
        // format date
        const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        readerDate.textContent = formattedDate;
        readerContent.innerHTML = post.content.split('\n\n').map(p => `<p style="margin-bottom:1rem;">${p}</p>`).join('');

        // tags
        readerTags.innerHTML = post.tags.split(',').map(tag => 
            `<span class="reader-tag">#${tag.trim()}</span>`
        ).join('');

        readerModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeReader = () => {
        readerModal.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (readerCloseBtn) {
        readerCloseBtn.addEventListener('click', closeReader);
    }
    if (readerModal) {
        readerModal.addEventListener('click', (e) => {
            if (e.target === readerModal) closeReader();
        });
    }

    const renderBlogFeed = () => {
        const posts = getBlogPosts();
        feedContainer.innerHTML = '';

        // Filter logic
        const filtered = posts.filter(post => {
            const matchesCategory = currentCategory === 'All' || post.category === currentCategory;
            const matchesSearch = post.title.toLowerCase().includes(currentSearchTerm) ||
                                  post.content.toLowerCase().includes(currentSearchTerm) ||
                                  post.tags.toLowerCase().includes(currentSearchTerm);
            return matchesCategory && matchesSearch;
        });

        // 1. Render Featured Banner (If "All" and no search term, take first post)
        if (currentCategory === 'All' && currentSearchTerm === '' && posts.length > 0) {
            const featuredPost = posts[0];
            featuredContainer.style.display = 'block';
            featuredContainer.innerHTML = `
                <div class="featured-post-banner glass-card" data-id="${featuredPost.id}">
                    <div class="featured-post-image">📰</div>
                    <div class="featured-post-details">
                        <span class="blog-card-category">${featuredPost.category}</span>
                        <h2 class="featured-post-title">${featuredPost.title}</h2>
                        <p class="featured-post-summary">${featuredPost.content}</p>
                        <div class="featured-post-meta">
                            <span>👤 ${featuredPost.author}</span>
                            <span>•</span>
                            <span>📅 ${featuredPost.date}</span>
                        </div>
                    </div>
                </div>
            `;
            featuredContainer.querySelector('.featured-post-banner').addEventListener('click', () => openReader(featuredPost));
        } else {
            featuredContainer.style.display = 'none';
        }

        // 2. Render Feed Grid
        // If "All" and no search term, we skip the first post since it is in the banner
        const gridPosts = (currentCategory === 'All' && currentSearchTerm === '') ? filtered.slice(1) : filtered;

        if (gridPosts.length === 0) {
            feedContainer.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 3rem; color:var(--text-secondary);">No articles found matching your criteria.</div>`;
        } else {
            gridPosts.forEach(post => {
                const card = document.createElement('div');
                card.className = 'blog-card glass-card';
                card.innerHTML = `
                    <span class="blog-card-category">${post.category}</span>
                    <h3 class="blog-card-title">${post.title}</h3>
                    <p class="blog-card-excerpt">${post.content}</p>
                    <div class="blog-card-meta">
                        <span>👤 ${post.author}</span>
                        <span>📅 ${post.date}</span>
                    </div>
                `;
                card.addEventListener('click', () => openReader(post));
                feedContainer.appendChild(card);
            });
        }

        // 3. Render Sidebar Recent Posts widget (Always show last 3 posts)
        sidebarRecent.innerHTML = '';
        posts.slice(0, 3).forEach(post => {
            const item = document.createElement('div');
            item.className = 'recent-post-item';
            item.innerHTML = `
                <span class="recent-title">${post.title}</span>
                <span class="recent-meta">${post.category} • ${post.date}</span>
            `;
            item.addEventListener('click', () => openReader(post));
            sidebarRecent.appendChild(item);
        });
    };

    // --- Search & Filter Listeners ---
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearchTerm = e.target.value.toLowerCase();
            renderBlogFeed();
        });
    }

    if (categoryChips) {
        categoryChips.querySelectorAll('.chip').forEach(chip => {
            chip.addEventListener('click', () => {
                categoryChips.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                currentCategory = chip.getAttribute('data-category');
                renderBlogFeed();
            });
        });
    }

    // Newsletter handling
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('.newsletter-input');
            const email = emailInput.value.trim();
            if (email) {
                let container = document.getElementById('toastContainer');
                if (!container) {
                    container = document.createElement('div');
                    container.id = 'toastContainer';
                    document.body.appendChild(container);
                }
                const toast = document.createElement('div');
                toast.className = `toast toast-success`;
                toast.innerHTML = `<span class="toast-icon">✅</span><span>Thanks for subscribing to our Newsletter!</span>`;
                container.appendChild(toast);
                requestAnimationFrame(() => toast.classList.add('show'));
                setTimeout(() => {
                    toast.classList.remove('show');
                    setTimeout(() => toast.remove(), 350);
                }, 3000);
                newsletterForm.reset();
            }
        });
    }

    // --- Theme Selector Sync ---
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

    // Run initial feed render
    renderBlogFeed();
});
