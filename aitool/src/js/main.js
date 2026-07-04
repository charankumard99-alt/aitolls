// Data is now loaded globally from data.js
const getLiveToolsData = () => JSON.parse(localStorage.getItem('aitoolshub_admin_tools')) || toolsData;
const getLiveCategoryData = () => JSON.parse(localStorage.getItem('aitoolshub_admin_categories')) || categoryData;

document.addEventListener('DOMContentLoaded', () => {
    const featuredContainer = document.getElementById('featuredSectionsContainer');
    const searchResultsSection = document.getElementById('searchResults');
    const toolsGrid = document.getElementById('toolsGrid');
    const filterTabs = document.querySelectorAll('.filter-tab');
    const searchInput = document.getElementById('searchInput');

    // ── Pagination & Infinite Scroll State ─────────────────────
    const TOOLS_PER_PAGE = 12;
    let currentPage = 1;
    let currentFiltered = [];
    let infiniteScrollMode = false;
    let infiniteObserver = null;

    // Section Definitions
    const sections = [
        { id: "trending", title: "Trending Tools 🔥", filter: t => t.isTrending },
        { id: "featured-ai", title: "Featured AI Tools 🤖", filter: t => t.isFeatured && t.category === 'ai' },
        { id: "featured-pdf", title: "Featured PDF Tools 📄", filter: t => t.isFeatured && t.category === 'pdf' },
        { id: "popular", title: "Most Popular ⭐️", filter: t => t.isPopular },
        { id: "recent", title: "Recently Added 🆕", filter: t => t.isNew },
        { id: "editors", title: "Editor's Choice 👑", filter: t => t.isEditorsChoice },
        { id: "free", title: "Top Free Tools 🎁", filter: t => t.price.toLowerCase().includes('free') },
        { id: "paid", title: "Top Paid Tools 💎", filter: t => !t.price.toLowerCase().includes('free') },
        { id: "recommended", title: "Recommended Tools 🎯", filter: t => t.isRecommended },
        { id: "new-releases", title: "New Releases 🚀", filter: t => t.isNew },
    ];

    // Helper to generate a single tool card HTML
    const generateCardHTML = (tool) => {
        const isFree = tool.price.toLowerCase().includes('free');
        const priceBadgeClass = isFree ? 'badge-free' : 'badge-paid';
        const priceText = isFree ? 'Free' : 'Paid';

        // Provide defaults for rating/users if they don't exist for the dynamic categories
        const rating = tool.rating || (Math.random() * (5.0 - 4.2) + 4.2).toFixed(1);
        const users = tool.users || Math.floor(Math.random() * 900 + 10) + 'K+';

        return `
            <div class="tool-card glass-card">
                <div class="card-header">
                    <div class="tool-icon">${tool.icon}</div>
                    <div class="card-header-text">
                        <h3 class="tool-title">${tool.title}</h3>
                        <div class="tool-badges">
                            <span class="badge badge-category">${tool.categoryLabel}</span>
                            <span class="badge ${priceBadgeClass}">${priceText}</span>
                        </div>
                    </div>
                </div>
                
                <p class="tool-desc">${tool.description}</p>
                
                <div class="card-stats">
                    <div class="stat">
                        <span class="stat-icon">⭐</span>
                        <span class="stat-val">${rating}/5</span>
                    </div>
                    <div class="stat">
                        <span class="stat-icon">👥</span>
                        <span class="stat-val">${users} Users</span>
                    </div>
                </div>
                
                <div class="card-footer">
                    <div class="card-action-icons">
                        <button class="action-btn" data-action="favorite" data-id="${tool.id}" title="Favorite" aria-label="Favorite">❤️</button>
                        <button class="action-btn" data-action="bookmark" data-id="${tool.id}" title="Bookmark" aria-label="Bookmark">🔖</button>
                        <button class="action-btn" data-action="compare" data-id="${tool.id}" title="Compare" aria-label="Compare">⚖️</button>
                        <button class="action-btn" data-action="share" data-id="${tool.id}" title="Share" aria-label="Share">📤</button>
                    </div>
                    <a href="tool.html?id=${tool.id}" class="btn-try">Visit Tool</a>
                </div>
            </div>
        `;
    };


    // 1. Render Featured Sections (Carousels) with scroll-reveal
    const renderFeaturedSections = () => {
        featuredContainer.innerHTML = '';
        
        sections.forEach(sec => {
            const filteredTools = getLiveToolsData().filter(sec.filter);
            if (filteredTools.length === 0) return;

            const sectionEl = document.createElement('section');
            sectionEl.className = 'featured-section reveal lazy-section';
            
            let cardsHTML = filteredTools.map(generateCardHTML).join('');

            sectionEl.innerHTML = `
                <div class="container">
                    <div class="section-header">
                        <h2 class="section-title">${sec.title}</h2>
                        <a href="#" class="view-all">View All &rarr;</a>
                    </div>
                    <div class="carousel-container">
                        <div class="tools-carousel">
                            ${cardsHTML}
                        </div>
                    </div>
                </div>
            `;
            featuredContainer.appendChild(sectionEl);
        });

        // Add Popular Categories Section
        const catSection = document.createElement('section');
        catSection.className = 'featured-section categories-section reveal lazy-section';
        let catsHTML = getLiveCategoryData().map(c => `
            <div class="category-card glass-card">
                <div class="cat-icon">${c.icon}</div>
                <h3 class="cat-title">${c.title}</h3>
                <span class="cat-count">${c.count}</span>
            </div>
        `).join('');

        catSection.innerHTML = `
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title">Popular Categories 📁</h2>
                </div>
                <div class="category-grid">
                    ${catsHTML}
                </div>
            </div>
        `;
        featuredContainer.appendChild(catSection);

        // Remove skeletons after render
        if (typeof removeSkeletons === 'function') removeSkeletons();
    };

    renderFeaturedSections();

    // ── 2. PAGINATION RENDERER ────────────────────────────────
    function renderPagination(totalItems) {
        const totalPages = Math.ceil(totalItems / TOOLS_PER_PAGE);
        // Remove old pagination
        const oldPag = document.getElementById('paginationControls');
        if (oldPag) oldPag.remove();

        if (totalPages <= 1) return;

        const pag = document.createElement('div');
        pag.className = 'pagination';
        pag.id = 'paginationControls';

        // Previous button
        pag.innerHTML += `<button class="pagination-btn" ${currentPage === 1 ? 'disabled' : ''} data-page="${currentPage - 1}">← Prev</button>`;

        // Page buttons (show max 7 with ellipsis)
        const maxVisible = 7;
        let pages = [];
        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            let start = Math.max(2, currentPage - 2);
            let end = Math.min(totalPages - 1, currentPage + 2);
            if (start > 2) pages.push('...');
            for (let i = start; i <= end; i++) pages.push(i);
            if (end < totalPages - 1) pages.push('...');
            pages.push(totalPages);
        }

        pages.forEach(p => {
            if (p === '...') {
                pag.innerHTML += `<span class="pagination-btn" style="cursor:default;border:none;">…</span>`;
            } else {
                pag.innerHTML += `<button class="pagination-btn ${p === currentPage ? 'active' : ''}" data-page="${p}">${p}</button>`;
            }
        });

        // Next button
        pag.innerHTML += `<button class="pagination-btn" ${currentPage === totalPages ? 'disabled' : ''} data-page="${currentPage + 1}">Next →</button>`;

        // Info
        const start = (currentPage - 1) * TOOLS_PER_PAGE + 1;
        const end = Math.min(currentPage * TOOLS_PER_PAGE, totalItems);
        pag.innerHTML += `<span class="pagination-info">Showing ${start}-${end} of ${totalItems}</span>`;

        toolsGrid.parentElement.appendChild(pag);

        // Bind clicks
        pag.querySelectorAll('.pagination-btn[data-page]').forEach(btn => {
            btn.addEventListener('click', () => {
                const page = parseInt(btn.dataset.page);
                if (isNaN(page) || page < 1 || page > totalPages) return;
                currentPage = page;
                renderFilteredResults();
                // Scroll to results
                searchResultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    }

    // ── 3. INFINITE SCROLL ────────────────────────────────────
    function setupInfiniteScroll(totalItems) {
        if (infiniteObserver) { infiniteObserver.disconnect(); infiniteObserver = null; }

        const totalPages = Math.ceil(totalItems / TOOLS_PER_PAGE);
        if (currentPage >= totalPages) return;

        // Remove old sentinel
        const oldSentinel = document.getElementById('scrollSentinel');
        if (oldSentinel) oldSentinel.remove();

        const sentinel = document.createElement('div');
        sentinel.className = 'scroll-sentinel';
        sentinel.id = 'scrollSentinel';
        sentinel.innerHTML = '<span class="loading-dots">Loading more tools</span>';
        toolsGrid.parentElement.appendChild(sentinel);

        infiniteObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && currentPage < totalPages) {
                currentPage++;
                const start = (currentPage - 1) * TOOLS_PER_PAGE;
                const pageTools = currentFiltered.slice(start, start + TOOLS_PER_PAGE);
                toolsGrid.innerHTML += pageTools.map(generateCardHTML).join('');

                if (currentPage >= totalPages) {
                    sentinel.remove();
                    infiniteObserver.disconnect();
                }
            }
        }, { rootMargin: '200px' });

        infiniteObserver.observe(sentinel);
    }

    // ── RENDER FILTERED RESULTS (with pagination or infinite) ─
    function renderFilteredResults() {
        const start = (currentPage - 1) * TOOLS_PER_PAGE;
        const pageTools = currentFiltered.slice(start, start + TOOLS_PER_PAGE);

        if (currentFiltered.length === 0) {
            toolsGrid.innerHTML = '<div style="grid-column: 1/-1; text-align:center; padding: 2rem; color: var(--text-secondary)">No tools found matching your criteria.</div>';
            // Remove pagination/sentinel
            const oldPag = document.getElementById('paginationControls');
            if (oldPag) oldPag.remove();
            const oldSentinel = document.getElementById('scrollSentinel');
            if (oldSentinel) oldSentinel.remove();
            return;
        }

        if (infiniteScrollMode && currentPage > 1) {
            // Append to existing for infinite scroll (already handled by observer)
        } else {
            toolsGrid.innerHTML = pageTools.map(generateCardHTML).join('');
        }

        if (infiniteScrollMode) {
            // Remove pagination, setup infinite
            const oldPag = document.getElementById('paginationControls');
            if (oldPag) oldPag.remove();
            setupInfiniteScroll(currentFiltered.length);
        } else {
            // Remove sentinel, setup pagination
            const oldSentinel = document.getElementById('scrollSentinel');
            if (oldSentinel) oldSentinel.remove();
            renderPagination(currentFiltered.length);
        }
    }

    // ── 4. Search & Filter Logic ──────────────────────────────
    let currentCategory = 'all';
    let currentSearchTerm = '';

    const handleSearchOrFilter = () => {
        // If searching or filtering by a specific category, show the grid and hide featured sections
        if (currentSearchTerm.trim() !== '' || currentCategory !== 'all') {
            featuredContainer.style.display = 'none';
            searchResultsSection.style.display = 'block';
            
            currentFiltered = getLiveToolsData().filter(tool => {
                const matchesCategory = currentCategory === 'all' || tool.category === currentCategory;
                const matchesSearch = tool.title.toLowerCase().includes(currentSearchTerm) || 
                                      tool.description.toLowerCase().includes(currentSearchTerm);
                return matchesCategory && matchesSearch;
            });

            currentPage = 1;
            renderFilteredResults();
        } else {
            // Revert to featured sections if "All Tools" and no search term
            featuredContainer.style.display = 'block';
            searchResultsSection.style.display = 'none';
            // Cleanup
            const oldPag = document.getElementById('paginationControls');
            if (oldPag) oldPag.remove();
            const oldSentinel = document.getElementById('scrollSentinel');
            if (oldSentinel) oldSentinel.remove();
        }
    };

    filterTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            filterTabs.forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            currentCategory = e.target.getAttribute('data-filter');
            handleSearchOrFilter();
        });
    });

    searchInput.addEventListener('input', (e) => {
        currentSearchTerm = e.target.value.toLowerCase();
        handleSearchOrFilter();
    });

    // Theme Toggle Logic
    const themeToggle = document.getElementById('themeToggle');
    const moonIcon = document.querySelector('.moon-icon');
    const sunIcon = document.querySelector('.sun-icon');
    
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        let newTheme = 'light';
        
        if (currentTheme !== 'dark') {
            newTheme = 'dark';
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'block';
        } else {
            moonIcon.style.display = 'block';
            sunIcon.style.display = 'none';
        }
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
});

