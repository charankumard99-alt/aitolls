/* ============================================================
   ADMIN.JS — Admin Dashboard Engine for AI Tools Hub
   Uses localStorage for all persistence & SPA state management
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    // ── Local Storage Data Initialization ────────────────────
    const initLocalStorage = () => {
        if (!localStorage.getItem('aitoolshub_admin_tools')) {
            localStorage.setItem('aitoolshub_admin_tools', JSON.stringify(toolsData));
        }
        if (!localStorage.getItem('aitoolshub_admin_categories')) {
            localStorage.setItem('aitoolshub_admin_categories', JSON.stringify(categoryData));
        }
        if (!localStorage.getItem('aitoolshub_admin_reviews')) {
            const initialReviews = [
                { id: 1, toolId: 1, toolTitle: "ChatGPT Plus", user: "Sarah J.", rating: 5, date: "Oct 2025", text: "This tool has completely changed how I write code.", status: "approved" },
                { id: 2, toolId: 1, toolTitle: "ChatGPT Plus", user: "Mike R.", rating: 4, date: "Sep 2025", text: "Incredible AI, though limits can be annoying.", status: "pending" },
                { id: 3, toolId: 2, toolTitle: "Midjourney", user: "Alex P.", rating: 5, date: "Nov 2025", text: "Breathtaking image quality. Truly impressive.", status: "approved" }
            ];
            localStorage.setItem('aitoolshub_admin_reviews', JSON.stringify(initialReviews));
        }
        if (!localStorage.getItem('aitoolshub_admin_blog')) {
            const initialBlogs = [
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
            localStorage.setItem('aitoolshub_admin_blog', JSON.stringify(initialBlogs));
        }
        if (!localStorage.getItem('aitoolshub_admin_ads')) {
            const initialAds = [
                { id: 1, name: "Premium Sidebar Banner", imageUrl: "https://via.placeholder.com/300x250", targetLink: "https://example.com", placement: "sidebar", isActive: true },
                { id: 2, name: "Footer Mega Ad", imageUrl: "https://via.placeholder.com/728x90", targetLink: "https://example.com", placement: "footer", isActive: false }
            ];
            localStorage.setItem('aitoolshub_admin_ads', JSON.stringify(initialAds));
        }
        if (!localStorage.getItem('aitoolshub_admin_seo')) {
            const initialSEO = {
                siteTitle: "AI Tools Hub - Premium Directory",
                metaDesc: "Discover the best AI and PDF tools in our premium, hand-curated directory.",
                keywords: "ai tools, pdf tools, productivity, directory, tech",
                ogTitle: "AI Tools Hub",
                ogDesc: "The Ultimate Directory of Digital Utilities",
                ogImageUrl: "logo.svg",
                robots: "index"
            };
            localStorage.setItem('aitoolshub_admin_seo', JSON.stringify(initialSEO));
        }
    };

    initLocalStorage();

    // Data Accessors
    const getTools = () => JSON.parse(localStorage.getItem('aitoolshub_admin_tools') || '[]');
    const saveTools = (data) => localStorage.setItem('aitoolshub_admin_tools', JSON.stringify(data));
    const getCategories = () => JSON.parse(localStorage.getItem('aitoolshub_admin_categories') || '[]');
    const saveCategories = (data) => localStorage.setItem('aitoolshub_admin_categories', JSON.stringify(data));
    const getUsersList = () => JSON.parse(localStorage.getItem('aitoolshub_users') || '[]');
    const saveUsersList = (data) => localStorage.setItem('aitoolshub_users', JSON.stringify(data));
    const getReviews = () => JSON.parse(localStorage.getItem('aitoolshub_admin_reviews') || '[]');
    const saveReviews = (data) => localStorage.setItem('aitoolshub_admin_reviews', JSON.stringify(data));
    const getBlogPosts = () => JSON.parse(localStorage.getItem('aitoolshub_admin_blog') || '[]');
    const saveBlogPosts = (data) => localStorage.setItem('aitoolshub_admin_blog', JSON.stringify(data));
    const getAds = () => JSON.parse(localStorage.getItem('aitoolshub_admin_ads') || '[]');
    const saveAds = (data) => localStorage.setItem('aitoolshub_admin_ads', JSON.stringify(data));
    const getSEO = () => JSON.parse(localStorage.getItem('aitoolshub_admin_seo') || '{}');
    const saveSEO = (data) => localStorage.setItem('aitoolshub_admin_seo', JSON.stringify(data));

    // ── Auth Handling ──────────────────────────────────────────
    const loginScreen = document.getElementById('adminLoginScreen');
    const dashboardLayout = document.getElementById('adminDashboard');
    const loginForm = document.getElementById('adminLoginForm');
    const loginError = document.getElementById('loginError');

    const checkAdminSession = () => {
        const session = localStorage.getItem('aitoolshub_admin_session');
        if (session === 'active') {
            loginScreen.style.display = 'none';
            dashboardLayout.style.display = 'flex';
            renderActiveSection();
        } else {
            loginScreen.style.display = 'flex';
            dashboardLayout.style.display = 'none';
        }
    };

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('adminEmail').value.trim();
            const pass = document.getElementById('adminPassword').value;

            if (email === 'admin@aitoolshub.com' && pass === 'admin123') {
                localStorage.setItem('aitoolshub_admin_session', 'active');
                loginError.style.display = 'none';
                loginForm.reset();
                checkAdminSession();
            } else {
                loginError.textContent = "Invalid administrator credentials.";
                loginError.style.display = 'block';
            }
        });
    }

    const logoutBtn = document.getElementById('adminLogoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('aitoolshub_admin_session');
            checkAdminSession();
        });
    }

    // ── Toast Notification ────────────────────────────────────
    const showToast = (message, type = 'success') => {
        let container = document.getElementById('toastContainer');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toastContainer';
            document.body.appendChild(container);
        }
        const toast = document.createElement('div');
        const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;
        container.appendChild(toast);
        requestAnimationFrame(() => toast.classList.add('show'));
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 350);
        }, 3000);
    };

    // ── Confirmation Modal ────────────────────────────────────
    const confirmModal = document.getElementById('confirmModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const modalConfirmBtn = document.getElementById('modalConfirmBtn');
    const modalCancelBtn = document.getElementById('modalCancelBtn');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    let confirmCallback = null;

    const showConfirmModal = (title, message, callback) => {
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        confirmCallback = callback;
        confirmModal.classList.add('active');
    };

    const hideConfirmModal = () => {
        confirmModal.classList.remove('active');
        confirmCallback = null;
    };

    [modalCancelBtn, modalCloseBtn].forEach(btn => {
        if (btn) btn.addEventListener('click', hideConfirmModal);
    });

    if (modalConfirmBtn) {
        modalConfirmBtn.addEventListener('click', () => {
            if (confirmCallback) confirmCallback();
            hideConfirmModal();
        });
    }

    // ── Section Panel Navigation ──────────────────────────────
    const sidebarItems = document.querySelectorAll('.sidebar-item[data-section]');
    const sections = document.querySelectorAll('.admin-section');
    const topbarTitle = document.getElementById('topbarTitle');
    let activeSection = 'dashboard';

    sidebarItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            sidebarItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            activeSection = item.getAttribute('data-section');
            topbarTitle.textContent = item.querySelector('.sidebar-label').textContent;

            sections.forEach(sec => {
                if (sec.id === `section-${activeSection}`) {
                    sec.classList.add('active');
                } else {
                    sec.classList.remove('active');
                }
            });

            renderActiveSection();
            const sidebar = document.getElementById('adminSidebar');
            if (sidebar) sidebar.classList.remove('open'); // Close mobile menu on navigate
        });
    });

    // Mobile Sidebar Toggle
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('adminSidebar');
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.toggle('open');
        });
        document.addEventListener('click', (e) => {
            if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && e.target !== sidebarToggle) {
                sidebar.classList.remove('open');
            }
        });
    }

    // ── Rendering Engine ──────────────────────────────────────
    const renderActiveSection = () => {
        switch (activeSection) {
            case 'dashboard':
                renderDashboard();
                break;
            case 'analytics':
                renderAnalytics();
                break;
            case 'add-tool':
                renderAddTool();
                break;
            case 'edit-tool':
                renderEditTool();
                break;
            case 'delete-tool':
                renderDeleteTool();
                break;
            case 'categories':
                renderCategories();
                break;
            case 'users':
                renderUsers();
                break;
            case 'reviews':
                renderReviews();
                break;
            case 'blog':
                renderBlog();
                break;
            case 'featured':
                renderFeatured();
                break;
            case 'ads':
                renderAds();
                break;
            case 'seo':
                renderSEO();
                break;
        }
    };

    // ── DASHBOARD SECTION ─────────────────────────────────────
    const renderDashboard = () => {
        const tools = getTools();
        const users = getUsersList();
        const reviews = getReviews();
        const container = document.getElementById('section-dashboard');

        container.innerHTML = `
            <div class="stats-grid">
                <div class="stat-card purple">
                    <div class="stat-icon">🛠️</div>
                    <div class="stat-value">${tools.length}</div>
                    <div class="stat-label">Total Tools</div>
                </div>
                <div class="stat-card blue">
                    <div class="stat-icon">👥</div>
                    <div class="stat-value">${users.length + 42}</div>
                    <div class="stat-label">Total Users</div>
                </div>
                <div class="stat-card green">
                    <div class="stat-icon">⭐</div>
                    <div class="stat-value">${reviews.length}</div>
                    <div class="stat-label">Total Reviews</div>
                </div>
                <div class="stat-card orange">
                    <div class="stat-icon">👁️</div>
                    <div class="stat-value">28.4K</div>
                    <div class="stat-label">Page Views</div>
                </div>
            </div>

            <div class="dashboard-grid" style="display: grid; grid-template-columns: 2fr 1fr; gap: var(--spacing-lg); margin-top: var(--spacing-lg);">
                <div class="glass-card" style="padding: var(--spacing-lg);">
                    <h3 class="section-title" style="font-size: 1.2rem; margin-bottom: var(--spacing-md);">Recent Activity</h3>
                    <div class="activity-feed">
                        <div class="activity-item" style="display: flex; gap: 1rem; padding: 0.8rem 0; border-bottom: 1px solid var(--border-color);">
                            <div class="activity-icon">✅</div>
                            <div class="activity-text">
                                <strong>System Initialization</strong> completed successfully.
                                <div class="activity-time" style="font-size: 0.8rem; color: var(--text-secondary)">Just now</div>
                            </div>
                        </div>
                        <div class="activity-item" style="display: flex; gap: 1rem; padding: 0.8rem 0; border-bottom: 1px solid var(--border-color);">
                            <div class="activity-icon">📝</div>
                            <div class="activity-text">
                                Review approved for <strong>ChatGPT Plus</strong>.
                                <div class="activity-time" style="font-size: 0.8rem; color: var(--text-secondary)">2 hours ago</div>
                            </div>
                        </div>
                        <div class="activity-item" style="display: flex; gap: 1rem; padding: 0.8rem 0;">
                            <div class="activity-icon">➕</div>
                            <div class="activity-text">
                                New tool <strong>Figma AI</strong> added by Admin.
                                <div class="activity-time" style="font-size: 0.8rem; color: var(--text-secondary)">1 day ago</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="glass-card" style="padding: var(--spacing-lg);">
                    <h3 class="section-title" style="font-size: 1.2rem; margin-bottom: var(--spacing-md);">Quick Actions</h3>
                    <div class="quick-actions" style="display: flex; flex-direction: column; gap: var(--spacing-sm);">
                        <button class="btn btn-primary" id="btnQuickAdd">➕ Add New Tool</button>
                        <a href="index.html" class="btn btn-secondary" target="_blank">🌐 View Live Website</a>
                        <button class="btn btn-secondary" id="btnQuickBackup">💾 Backup Database</button>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('btnQuickAdd').addEventListener('click', () => {
            document.querySelector('.sidebar-item[data-section="add-tool"]').click();
        });
        document.getElementById('btnQuickBackup').addEventListener('click', () => {
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(localStorage));
            const downloadAnchor = document.createElement('a');
            downloadAnchor.setAttribute("href", dataStr);
            downloadAnchor.setAttribute("download", "aitoolshub_backup.json");
            document.body.appendChild(downloadAnchor);
            downloadAnchor.click();
            downloadAnchor.remove();
            showToast("Database backup downloaded successfully!");
        });
    };

    // ── ANALYTICS SECTION ─────────────────────────────────────
    const renderAnalytics = () => {
        const tools = getTools();
        const container = document.getElementById('section-analytics');

        // calculate stats
        const aiCount = tools.filter(t => t.category === 'ai').length;
        const pdfCount = tools.filter(t => t.category === 'pdf').length;
        const designCount = tools.filter(t => t.category === 'design').length;
        const writeCount = tools.filter(t => t.category === 'writing').length;
        const codeCount = tools.filter(t => t.category === 'coding').length;
        const total = tools.length || 1;

        const freeCount = tools.filter(t => t.price.toLowerCase().includes('free')).length;
        const paidCount = total - freeCount;
        const freePercentage = Math.round((freeCount / total) * 100);

        container.innerHTML = `
            <div class="analytics-layout" style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-lg);">
                <div class="glass-card chart-container" style="padding: var(--spacing-lg);">
                    <h3 class="section-title" style="font-size: 1.2rem; margin-bottom: var(--spacing-md);">Tools by Category</h3>
                    <div class="bar-chart" style="display: flex; justify-content: space-around; align-items: flex-end; height: 200px; padding-bottom: 20px; border-bottom: 1px solid var(--border-color);">
                        <div class="bar-group" style="display: flex; flex-direction: column; align-items: center; width: 40px;">
                            <div class="bar" style="background: var(--brand-primary); width: 100%; height: ${(aiCount/total)*150}px; border-radius: 4px; display: flex; align-items: flex-start; justify-content: center; padding-top: 4px; color: white; font-size: 0.8rem;">${aiCount}</div>
                            <span class="bar-label" style="font-size: 0.8rem; margin-top: 8px;">AI</span>
                        </div>
                        <div class="bar-group" style="display: flex; flex-direction: column; align-items: center; width: 40px;">
                            <div class="bar" style="background: var(--brand-secondary); width: 100%; height: ${(pdfCount/total)*150}px; border-radius: 4px; display: flex; align-items: flex-start; justify-content: center; padding-top: 4px; color: white; font-size: 0.8rem;">${pdfCount}</div>
                            <span class="bar-label" style="font-size: 0.8rem; margin-top: 8px;">PDF</span>
                        </div>
                        <div class="bar-group" style="display: flex; flex-direction: column; align-items: center; width: 40px;">
                            <div class="bar" style="background: var(--brand-accent); width: 100%; height: ${(designCount/total)*150}px; border-radius: 4px; display: flex; align-items: flex-start; justify-content: center; padding-top: 4px; color: white; font-size: 0.8rem;">${designCount}</div>
                            <span class="bar-label" style="font-size: 0.8rem; margin-top: 8px;">Design</span>
                        </div>
                        <div class="bar-group" style="display: flex; flex-direction: column; align-items: center; width: 40px;">
                            <div class="bar" style="background: var(--brand-warning); width: 100%; height: ${(writeCount/total)*150}px; border-radius: 4px; display: flex; align-items: flex-start; justify-content: center; padding-top: 4px; color: white; font-size: 0.8rem;">${writeCount}</div>
                            <span class="bar-label" style="font-size: 0.8rem; margin-top: 8px;">Write</span>
                        </div>
                        <div class="bar-group" style="display: flex; flex-direction: column; align-items: center; width: 40px;">
                            <div class="bar" style="background: var(--brand-success); width: 100%; height: ${(codeCount/total)*150}px; border-radius: 4px; display: flex; align-items: flex-start; justify-content: center; padding-top: 4px; color: white; font-size: 0.8rem;">${codeCount}</div>
                            <span class="bar-label" style="font-size: 0.8rem; margin-top: 8px;">Code</span>
                        </div>
                    </div>
                </div>

                <div class="glass-card" style="padding: var(--spacing-lg); display: flex; flex-direction: column; align-items: center; justify-content: center;">
                    <h3 class="section-title" style="font-size: 1.2rem; margin-bottom: var(--spacing-md); align-self: flex-start;">Pricing Model Split</h3>
                    <div class="donut-chart" style="width: 150px; height: 150px; border-radius: 50%; background: conic-gradient(var(--brand-success) ${freePercentage}%, var(--brand-primary) ${freePercentage}% 100%); position: relative; display: flex; align-items: center; justify-content: center; margin-bottom: var(--spacing-md);">
                        <div style="width: 100px; height: 100px; border-radius: 50%; background: var(--bg-primary); display: flex; flex-direction: column; align-items: center; justify-content: center;">
                            <strong style="font-size: 1.2rem;">${freePercentage}%</strong>
                            <span style="font-size: 0.75rem; color: var(--text-secondary)">Free Tools</span>
                        </div>
                    </div>
                    <div class="chart-legend" style="display: flex; gap: var(--spacing-md);">
                        <div class="legend-item"><span style="display:inline-block; width:12px; height:12px; background:var(--brand-success); border-radius:50%; margin-right:6px;"></span>Free (${freeCount})</div>
                        <div class="legend-item"><span style="display:inline-block; width:12px; height:12px; background:var(--brand-primary); border-radius:50%; margin-right:6px;"></span>Paid (${paidCount})</div>
                    </div>
                </div>
            </div>

            <div class="glass-card" style="padding: var(--spacing-lg); margin-top: var(--spacing-lg);">
                <h3 class="section-title" style="font-size: 1.2rem; margin-bottom: var(--spacing-md);">Top Rated Tools</h3>
                <div class="admin-table-wrap">
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>Tool</th>
                                <th>Category</th>
                                <th>Rating</th>
                                <th>Active Users</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tools.sort((a,b) => b.rating - a.rating).slice(0, 5).map(t => `
                                <tr>
                                    <td><span style="margin-right:8px;">${t.icon}</span><strong>${t.title}</strong></td>
                                    <td>${t.categoryLabel || t.category}</td>
                                    <td>⭐ ${t.rating || 'N/A'}</td>
                                    <td>${t.users || 'N/A'}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    };

    // ── ADD TOOL SECTION ──────────────────────────────────────
    const renderAddTool = () => {
        const container = document.getElementById('section-add-tool');
        container.innerHTML = `
            <div class="glass-card" style="padding: var(--spacing-lg);">
                <form class="admin-form" id="addToolForm">
                    <div class="form-row" style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-md);">
                        <div class="form-group">
                            <label for="addTitle">Tool Title</label>
                            <input type="text" id="addTitle" placeholder="e.g. ChatGPT" required>
                        </div>
                        <div class="form-group">
                            <label for="addCategory">Category</label>
                            <select id="addCategory">
                                <option value="ai">AI Models</option>
                                <option value="pdf">PDF Utilities</option>
                                <option value="design">Design</option>
                                <option value="writing">Writing</option>
                                <option value="coding">Coding</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group" style="margin-top: var(--spacing-md);">
                        <label for="addDesc">Description</label>
                        <textarea id="addDesc" rows="3" placeholder="Brief summary of the tool" required></textarea>
                    </div>

                    <div class="form-row" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--spacing-md); margin-top: var(--spacing-md);">
                        <div class="form-group">
                            <label for="addIcon">Icon (Emoji)</label>
                            <input type="text" id="addIcon" placeholder="🤖" required>
                        </div>
                        <div class="form-group">
                            <label for="addPrice">Pricing Info</label>
                            <input type="text" id="addPrice" placeholder="e.g. Free or $20/mo" required>
                        </div>
                        <div class="form-group">
                            <label for="addRating">Rating</label>
                            <input type="number" id="addRating" step="0.1" min="1" max="5" value="4.5" required>
                        </div>
                        <div class="form-group">
                            <label for="addUsers">Users Count</label>
                            <input type="text" id="addUsers" placeholder="e.g. 10M+" required>
                        </div>
                    </div>

                    <div class="form-group" style="margin-top: var(--spacing-md);">
                        <label for="addLink">Website URL</label>
                        <input type="url" id="addLink" placeholder="https://example.com" required>
                    </div>

                    <div style="margin-top: var(--spacing-lg);">
                        <label style="font-weight: 600; margin-bottom: var(--spacing-sm); display: block;">Featured Status</label>
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--spacing-md);">
                            <label class="checkbox-label" style="display: flex; align-items: center; gap: 8px;"><input type="checkbox" id="addIsTrending"> Trending</label>
                            <label class="checkbox-label" style="display: flex; align-items: center; gap: 8px;"><input type="checkbox" id="addIsFeatured"> Featured</label>
                            <label class="checkbox-label" style="display: flex; align-items: center; gap: 8px;"><input type="checkbox" id="addIsEditorsChoice"> Editor's Choice</label>
                            <label class="checkbox-label" style="display: flex; align-items: center; gap: 8px;"><input type="checkbox" id="addIsRecommended"> Recommended</label>
                            <label class="checkbox-label" style="display: flex; align-items: center; gap: 8px;"><input type="checkbox" id="addIsPopular"> Popular</label>
                            <label class="checkbox-label" style="display: flex; align-items: center; gap: 8px;"><input type="checkbox" id="addIsNew"> New</label>
                        </div>
                    </div>

                    <div class="form-actions" style="margin-top: var(--spacing-lg); display: flex; gap: var(--spacing-md);">
                        <button type="submit" class="btn btn-primary">Create Tool</button>
                        <button type="reset" class="btn btn-secondary">Reset Form</button>
                    </div>
                </form>
            </div>
        `;

        document.getElementById('addToolForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const tools = getTools();
            const newId = tools.length > 0 ? Math.max(...tools.map(t => t.id)) + 1 : 1;
            const categorySelect = document.getElementById('addCategory');
            const category = categorySelect.value;
            const categoryLabel = categorySelect.options[categorySelect.selectedIndex].text;

            const newTool = {
                id: newId,
                title: document.getElementById('addTitle').value.trim(),
                category: category,
                categoryLabel: categoryLabel,
                description: document.getElementById('addDesc').value.trim(),
                icon: document.getElementById('addIcon').value.trim() || '🔧',
                price: document.getElementById('addPrice').value.trim(),
                rating: parseFloat(document.getElementById('addRating').value),
                users: document.getElementById('addUsers').value.trim(),
                link: document.getElementById('addLink').value.trim(),
                isTrending: document.getElementById('addIsTrending').checked,
                isFeatured: document.getElementById('addIsFeatured').checked,
                isEditorsChoice: document.getElementById('addIsEditorsChoice').checked,
                isRecommended: document.getElementById('addIsRecommended').checked,
                isPopular: document.getElementById('addIsPopular').checked,
                isNew: document.getElementById('addIsNew').checked
            };

            tools.push(newTool);
            saveTools(tools);
            showToast(`"${newTool.title}" has been successfully added.`);
            document.getElementById('addToolForm').reset();
        });
    };

    // ── EDIT TOOL SECTION ─────────────────────────────────────
    const renderEditTool = () => {
        const container = document.getElementById('section-edit-tool');
        const tools = getTools();

        container.innerHTML = `
            <div class="glass-card" style="padding: var(--spacing-lg); margin-bottom: var(--spacing-lg);">
                <input type="text" class="admin-search-bar" id="editToolSearch" placeholder="Search tools by title or category..." style="width: 100%; padding: 0.8rem 1.2rem; border-radius: 100px; border: 1px solid var(--border-color); background: transparent; color: var(--text-primary);">
            </div>
            
            <div id="editFormArea" style="display: none; margin-bottom: var(--spacing-lg);"></div>

            <div class="glass-card" style="padding: var(--spacing-lg);">
                <div class="admin-table-wrap">
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>Icon</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="editToolsTableBody">
                            <!-- Populated dynamically -->
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        const renderTable = (filterText = '') => {
            const tbody = document.getElementById('editToolsTableBody');
            const filtered = tools.filter(t => 
                t.title.toLowerCase().includes(filterText.toLowerCase()) || 
                t.category.toLowerCase().includes(filterText.toLowerCase())
            );

            tbody.innerHTML = filtered.map(t => `
                <tr>
                    <td style="font-size: 1.5rem;">${t.icon}</td>
                    <td><strong>${t.title}</strong></td>
                    <td>${t.categoryLabel || t.category}</td>
                    <td>${t.price}</td>
                    <td>
                        <button class="btn btn-secondary btn-sm btn-edit" data-id="${t.id}">Edit</button>
                    </td>
                </tr>
            `).join('');

            // Add events to Edit buttons
            tbody.querySelectorAll('.btn-edit').forEach(btn => {
                btn.addEventListener('click', () => {
                    const id = parseInt(btn.getAttribute('data-id'));
                    showEditForm(id);
                });
            });
        };

        const showEditForm = (id) => {
            const tool = tools.find(t => t.id === id);
            if (!tool) return;

            const formArea = document.getElementById('editFormArea');
            formArea.innerHTML = `
                <div class="glass-card" style="padding: var(--spacing-lg); border: 1px solid var(--brand-primary);">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--spacing-md);">
                        <h4 style="font-size: 1.1rem; color: var(--brand-primary)">Editing: ${tool.title}</h4>
                        <button class="btn btn-secondary btn-sm" id="btnCancelEdit">Cancel</button>
                    </div>
                    <form class="admin-form" id="editForm">
                        <input type="hidden" id="editId" value="${tool.id}">
                        <div class="form-row" style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-md);">
                            <div class="form-group">
                                <label for="editTitle">Tool Title</label>
                                <input type="text" id="editTitle" value="${tool.title}" required>
                            </div>
                            <div class="form-group">
                                <label for="editCategory">Category</label>
                                <select id="editCategory">
                                    <option value="ai" ${tool.category === 'ai' ? 'selected' : ''}>AI Models</option>
                                    <option value="pdf" ${tool.category === 'pdf' ? 'selected' : ''}>PDF Utilities</option>
                                    <option value="design" ${tool.category === 'design' ? 'selected' : ''}>Design</option>
                                    <option value="writing" ${tool.category === 'writing' ? 'selected' : ''}>Writing</option>
                                    <option value="coding" ${tool.category === 'coding' ? 'selected' : ''}>Coding</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group" style="margin-top: var(--spacing-md);">
                            <label for="editDesc">Description</label>
                            <textarea id="editDesc" rows="3" required>${tool.description}</textarea>
                        </div>

                        <div class="form-row" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--spacing-md); margin-top: var(--spacing-md);">
                            <div class="form-group">
                                <label for="editIcon">Icon (Emoji)</label>
                                <input type="text" id="editIcon" value="${tool.icon}" required>
                            </div>
                            <div class="form-group">
                                <label for="editPrice">Pricing Info</label>
                                <input type="text" id="editPrice" value="${tool.price}" required>
                            </div>
                            <div class="form-group">
                                <label for="editRating">Rating</label>
                                <input type="number" id="editRating" step="0.1" min="1" max="5" value="${tool.rating || 4.5}" required>
                            </div>
                            <div class="form-group">
                                <label for="editUsers">Users Count</label>
                                <input type="text" id="editUsers" value="${tool.users || ''}" required>
                            </div>
                        </div>

                        <div class="form-group" style="margin-top: var(--spacing-md);">
                            <label for="editLink">Website URL</label>
                            <input type="url" id="editLink" value="${tool.link || '#'}" required>
                        </div>

                        <div class="form-actions" style="margin-top: var(--spacing-lg); display: flex; gap: var(--spacing-md);">
                            <button type="submit" class="btn btn-primary">Save Changes</button>
                        </div>
                    </form>
                </div>
            `;

            formArea.style.display = 'block';
            formArea.scrollIntoView({ behavior: 'smooth' });

            document.getElementById('btnCancelEdit').addEventListener('click', () => {
                formArea.style.display = 'none';
            });

            document.getElementById('editForm').addEventListener('submit', (e) => {
                e.preventDefault();
                const editId = parseInt(document.getElementById('editId').value);
                const list = getTools();
                const idx = list.findIndex(t => t.id === editId);

                if (idx !== -1) {
                    const categorySelect = document.getElementById('editCategory');
                    const category = categorySelect.value;
                    const categoryLabel = categorySelect.options[categorySelect.selectedIndex].text;

                    list[idx] = {
                        ...list[idx],
                        title: document.getElementById('editTitle').value.trim(),
                        category: category,
                        categoryLabel: categoryLabel,
                        description: document.getElementById('editDesc').value.trim(),
                        icon: document.getElementById('editIcon').value.trim(),
                        price: document.getElementById('editPrice').value.trim(),
                        rating: parseFloat(document.getElementById('editRating').value),
                        users: document.getElementById('editUsers').value.trim(),
                        link: document.getElementById('editLink').value.trim()
                    };

                    saveTools(list);
                    showToast("Tool details updated successfully!");
                    formArea.style.display = 'none';
                    renderEditTool(); // refresh
                }
            });
        };

        renderTable();

        document.getElementById('editToolSearch').addEventListener('input', (e) => {
            renderTable(e.target.value);
        });
    };

    // ── DELETE TOOL SECTION ───────────────────────────────────
    const renderDeleteTool = () => {
        const container = document.getElementById('section-delete-tool');
        const tools = getTools();

        container.innerHTML = `
            <div class="glass-card" style="padding: var(--spacing-lg);">
                <div class="admin-table-wrap">
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>Icon</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tools.map(t => `
                                <tr>
                                    <td style="font-size: 1.5rem;">${t.icon}</td>
                                    <td><strong>${t.title}</strong></td>
                                    <td>${t.categoryLabel || t.category}</td>
                                    <td>${t.price}</td>
                                    <td>
                                        <button class="btn btn-secondary btn-sm btn-delete" data-id="${t.id}" style="color: red; border-color: red;">Delete</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        container.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.getAttribute('data-id'));
                const tool = tools.find(t => t.id === id);
                if (!tool) return;

                showConfirmModal(
                    "Delete Tool",
                    `Are you sure you want to permanently delete "${tool.title}"? This cannot be undone.`,
                    () => {
                        const updated = tools.filter(t => t.id !== id);
                        saveTools(updated);
                        showToast(`"${tool.title}" has been deleted.`);
                        renderDeleteTool();
                    }
                );
            });
        });
    };

    // ── MANAGE CATEGORIES SECTION ─────────────────────────────
    const renderCategories = () => {
        const container = document.getElementById('section-categories');
        const categories = getCategories();

        container.innerHTML = `
            <div class="glass-card" style="padding: var(--spacing-lg); margin-bottom: var(--spacing-lg);">
                <h4 style="font-size: 1.1rem; margin-bottom: var(--spacing-md);">Add New Category</h4>
                <form class="admin-form" id="addCategoryForm" style="display: flex; gap: var(--spacing-md); align-items: flex-end;">
                    <div class="form-group" style="flex: 2;">
                        <label for="catTitle">Category Title</label>
                        <input type="text" id="catTitle" placeholder="e.g. Video Generators" required>
                    </div>
                    <div class="form-group" style="flex: 1;">
                        <label for="catIcon">Icon (Emoji)</label>
                        <input type="text" id="catIcon" placeholder="🎥" required>
                    </div>
                    <div class="form-group" style="flex: 1;">
                        <label for="catCount">Count Label</label>
                        <input type="text" id="catCount" placeholder="e.g. 0 tools" value="0 tools" required>
                    </div>
                    <button type="submit" class="btn btn-primary" style="height: 46px;">Add</button>
                </form>
            </div>

            <div class="glass-card" style="padding: var(--spacing-lg);">
                <div class="admin-table-wrap">
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>Icon</th>
                                <th>Title</th>
                                <th>Count Text</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${categories.map((c, idx) => `
                                <tr>
                                    <td style="font-size: 1.5rem;">${c.icon}</td>
                                    <td><strong>${c.title}</strong></td>
                                    <td>${c.count}</td>
                                    <td>
                                        <button class="btn btn-secondary btn-sm btn-delete-cat" data-index="${idx}" style="color: red; border-color: red;">Remove</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        document.getElementById('addCategoryForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const list = getCategories();
            const newCat = {
                id: document.getElementById('catTitle').value.toLowerCase().replace(/\s+/g, '-'),
                title: document.getElementById('catTitle').value.trim(),
                icon: document.getElementById('catIcon').value.trim() || '📁',
                count: document.getElementById('catCount').value.trim()
            };

            list.push(newCat);
            saveCategories(list);
            showToast("New category added.");
            renderCategories();
        });

        container.querySelectorAll('.btn-delete-cat').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.getAttribute('data-index'));
                const list = getCategories();
                const cat = list[idx];

                showConfirmModal(
                    "Remove Category",
                    `Are you sure you want to remove category "${cat.title}"?`,
                    () => {
                        list.splice(idx, 1);
                        saveCategories(list);
                        showToast("Category removed.");
                        renderCategories();
                    }
                );
            });
        });
    };

    // ── MANAGE USERS SECTION ──────────────────────────────────
    const renderUsers = () => {
        const container = document.getElementById('section-users');
        const users = getUsersList();

        if (users.length === 0) {
            container.innerHTML = `
                <div class="glass-card" style="padding: var(--spacing-xl); text-align: center; color: var(--text-secondary);">
                    <h4>No registered users found.</h4>
                    <p style="font-size: 0.95rem; margin-top: 8px;">Create accounts on the Signup page to see them list here.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div class="glass-card" style="padding: var(--spacing-lg);">
                <div class="admin-table-wrap">
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>Avatar</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Join Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${users.map(u => `
                                <tr>
                                    <td><span style="display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 50%; background: var(--gradient-primary); color: white; font-weight: 700; font-size: 0.85rem;">${u.avatar || 'U'}</span></td>
                                    <td><strong>${u.name}</strong></td>
                                    <td>${u.email}</td>
                                    <td>${u.joinDate || 'N/A'}</td>
                                    <td>
                                        <button class="btn btn-secondary btn-sm btn-delete-user" data-id="${u.id}" style="color: red; border-color: red;">Delete</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        container.querySelectorAll('.btn-delete-user').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                const list = getUsersList();
                const user = list.find(u => u.id === id);
                if (!user) return;

                showConfirmModal(
                    "Delete User Account",
                    `Are you sure you want to permanently delete user "${user.name}"?`,
                    () => {
                        const updated = list.filter(u => u.id !== id);
                        saveUsersList(updated);
                        showToast(`User account for "${user.name}" deleted.`);
                        renderUsers();
                    }
                );
            });
        });
    };

    // ── MANAGE REVIEWS SECTION ────────────────────────────────
    const renderReviews = () => {
        const container = document.getElementById('section-reviews');
        const reviews = getReviews();

        container.innerHTML = `
            <div class="glass-card" style="padding: var(--spacing-lg);">
                <div class="admin-table-wrap">
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Tool</th>
                                <th>Rating</th>
                                <th>Comment</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${reviews.map(r => {
                                const statusClass = r.status === 'approved' ? 'status-active' : r.status === 'rejected' ? 'status-inactive' : 'status-pending';
                                return `
                                    <tr>
                                        <td><strong>${r.user}</strong></td>
                                        <td>${r.toolTitle}</td>
                                        <td>⭐ ${r.rating}/5</td>
                                        <td style="max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${r.text}</td>
                                        <td><span class="status-badge ${statusClass}">${r.status}</span></td>
                                        <td>
                                            <div style="display:flex; gap:6px;">
                                                ${r.status !== 'approved' ? `<button class="btn btn-secondary btn-sm btn-approve-rev" data-id="${r.id}" style="border-color:green; color:green; padding:2px 8px;">Approve</button>` : ''}
                                                ${r.status === 'pending' ? `<button class="btn btn-secondary btn-sm btn-reject-rev" data-id="${r.id}" style="border-color:orange; color:orange; padding:2px 8px;">Reject</button>` : ''}
                                                <button class="btn btn-secondary btn-sm btn-delete-rev" data-id="${r.id}" style="border-color:red; color:red; padding:2px 8px;">Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        container.querySelectorAll('.btn-approve-rev').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.getAttribute('data-id'));
                const list = getReviews();
                const rev = list.find(r => r.id === id);
                if (rev) {
                    rev.status = 'approved';
                    saveReviews(list);
                    showToast("Review approved.");
                    renderReviews();
                }
            });
        });

        container.querySelectorAll('.btn-reject-rev').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.getAttribute('data-id'));
                const list = getReviews();
                const rev = list.find(r => r.id === id);
                if (rev) {
                    rev.status = 'rejected';
                    saveReviews(list);
                    showToast("Review rejected.");
                    renderReviews();
                }
            });
        });

        container.querySelectorAll('.btn-delete-rev').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.getAttribute('data-id'));
                showConfirmModal(
                    "Delete Review",
                    "Are you sure you want to delete this user review?",
                    () => {
                        const list = getReviews();
                        const updated = list.filter(r => r.id !== id);
                        saveReviews(updated);
                        showToast("Review deleted.");
                        renderReviews();
                    }
                );
            });
        });
    };

    // ── MANAGE BLOG SECTION ───────────────────────────────────
    const renderBlog = () => {
        const container = document.getElementById('section-blog');
        const blogs = getBlogPosts();

        container.innerHTML = `
            <div class="glass-card" style="padding: var(--spacing-lg); margin-bottom: var(--spacing-lg);">
                <h4 style="font-size: 1.1rem; margin-bottom: var(--spacing-md);">Publish New Blog Post</h4>
                <form class="admin-form" id="addBlogForm">
                    <div class="form-row" style="display: grid; grid-template-columns: 2fr 1fr; gap: var(--spacing-md);">
                        <div class="form-group">
                            <label for="blogTitle">Post Title</label>
                            <input type="text" id="blogTitle" placeholder="e.g. Exploring AI Capabilities in 2026" required>
                        </div>
                        <div class="form-group">
                            <label for="blogCategory">Category</label>
                            <select id="blogCategory">
                                <option value="AI News">AI News</option>
                                <option value="AI Tutorials">AI Tutorials</option>
                                <option value="Product Reviews">Product Reviews</option>
                                <option value="Comparisons">Comparisons</option>
                                <option value="Latest AI Trends">Latest AI Trends</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row" style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-md); margin-top: var(--spacing-md);">
                        <div class="form-group">
                            <label for="blogAuthor">Author</label>
                            <input type="text" id="blogAuthor" value="Admin" required>
                        </div>
                        <div class="form-group">
                            <label for="blogTags">Tags (Comma-separated)</label>
                            <input type="text" id="blogTags" placeholder="AI, Trends, Utilities" required>
                        </div>
                    </div>
                    <div class="form-group" style="margin-top: var(--spacing-md);">
                        <label for="blogContent">Content</label>
                        <textarea id="blogContent" rows="4" placeholder="Write post body here..." required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary" style="margin-top: var(--spacing-md);">Publish Post</button>
                </form>
            </div>

            <div class="glass-card" style="padding: var(--spacing-lg);">
                <div class="admin-table-wrap">
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Author</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${blogs.map((b, idx) => `
                                <tr>
                                    <td><strong>${b.title}</strong></td>
                                    <td><span class="badge badge-category" style="font-size:0.75rem;">${b.category || 'General'}</span></td>
                                    <td>${b.author}</td>
                                    <td>${b.date}</td>
                                    <td>
                                        <button class="btn btn-secondary btn-sm btn-delete-blog" data-index="${idx}" style="color: red; border-color: red;">Delete</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        document.getElementById('addBlogForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const list = getBlogPosts();
            const newBlog = {
                id: list.length + 1,
                title: document.getElementById('blogTitle').value.trim(),
                category: document.getElementById('blogCategory').value,
                author: document.getElementById('blogAuthor').value.trim(),
                date: new Date().toISOString().split('T')[0],
                tags: document.getElementById('blogTags').value.trim(),
                content: document.getElementById('blogContent').value.trim()
            };

            list.push(newBlog);
            saveBlogPosts(list);
            showToast("Blog post published!");
            renderBlog();
        });

        container.querySelectorAll('.btn-delete-blog').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.getAttribute('data-index'));
                const list = getBlogPosts();
                showConfirmModal(
                    "Delete Blog Post",
                    `Are you sure you want to delete "${list[idx].title}"?`,
                    () => {
                        list.splice(idx, 1);
                        saveBlogPosts(list);
                        showToast("Blog post deleted.");
                        renderBlog();
                    }
                );
            });
        });
    };

    // ── FEATURED TOOLS SECTION ────────────────────────────────
    const renderFeatured = () => {
        const container = document.getElementById('section-featured');
        const tools = getTools();

        container.innerHTML = `
            <div class="glass-card" style="padding: var(--spacing-lg);">
                <div class="admin-table-wrap">
                    <table class="admin-table" style="min-width: 900px;">
                        <thead>
                            <tr>
                                <th>Tool</th>
                                <th>Trending</th>
                                <th>Featured</th>
                                <th>Editor Choice</th>
                                <th>Recommended</th>
                                <th>Popular</th>
                                <th>New</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tools.map(t => `
                                <tr>
                                    <td><span style="margin-right:6px;">${t.icon}</span><strong>${t.title}</strong></td>
                                    <td><input type="checkbox" class="toggle-flag" data-id="${t.id}" data-flag="isTrending" ${t.isTrending ? 'checked' : ''}></td>
                                    <td><input type="checkbox" class="toggle-flag" data-id="${t.id}" data-flag="isFeatured" ${t.isFeatured ? 'checked' : ''}></td>
                                    <td><input type="checkbox" class="toggle-flag" data-id="${t.id}" data-flag="isEditorsChoice" ${t.isEditorsChoice ? 'checked' : ''}></td>
                                    <td><input type="checkbox" class="toggle-flag" data-id="${t.id}" data-flag="isRecommended" ${t.isRecommended ? 'checked' : ''}></td>
                                    <td><input type="checkbox" class="toggle-flag" data-id="${t.id}" data-flag="isPopular" ${t.isPopular ? 'checked' : ''}></td>
                                    <td><input type="checkbox" class="toggle-flag" data-id="${t.id}" data-flag="isNew" ${t.isNew ? 'checked' : ''}></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        container.querySelectorAll('.toggle-flag').forEach(chk => {
            chk.addEventListener('change', () => {
                const id = parseInt(chk.getAttribute('data-id'));
                const flag = chk.getAttribute('data-flag');
                const list = getTools();
                const tool = list.find(t => t.id === id);

                if (tool) {
                    tool[flag] = chk.checked;
                    saveTools(list);
                    showToast(`Updated featured settings for "${tool.title}".`);
                }
            });
        });
    };

    // ── MANAGE ADVERTISEMENTS SECTION ─────────────────────────
    const renderAds = () => {
        const container = document.getElementById('section-ads');
        const ads = getAds();

        container.innerHTML = `
            <div class="glass-card" style="padding: var(--spacing-lg); margin-bottom: var(--spacing-lg);">
                <h4 style="font-size: 1.1rem; margin-bottom: var(--spacing-md);">Configure Advertisement Slot</h4>
                <form class="admin-form" id="addAdForm">
                    <div class="form-row" style="display: grid; grid-template-columns: 2fr 1fr; gap: var(--spacing-md);">
                        <div class="form-group">
                            <label for="adName">Ad Campaign Name</label>
                            <input type="text" id="adName" placeholder="e.g. Cyber Monday Deal Banner" required>
                        </div>
                        <div class="form-group">
                            <label for="adPlacement">Placement Slot</label>
                            <select id="adPlacement">
                                <option value="header">Header Banner</option>
                                <option value="sidebar">Sidebar Widget</option>
                                <option value="footer">Footer Banner</option>
                                <option value="inline">Inline Card</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row" style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-md); margin-top: var(--spacing-md);">
                        <div class="form-group">
                            <label for="adImage">Image Banner URL</label>
                            <input type="url" id="adImage" placeholder="https://example.com/banner.png" required>
                        </div>
                        <div class="form-group">
                            <label for="adLink">Target Redirect Link</label>
                            <input type="url" id="adLink" placeholder="https://advertiser-site.com" required>
                        </div>
                    </div>
                    <label class="checkbox-label" style="display: flex; align-items: center; gap: 8px; margin-top: var(--spacing-md);"><input type="checkbox" id="adActive" checked> Set active immediately</label>
                    <button type="submit" class="btn btn-primary" style="margin-top: var(--spacing-md);">Add Slot Campaign</button>
                </form>
            </div>

            <div class="glass-card" style="padding: var(--spacing-lg);">
                <div class="admin-table-wrap">
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>Campaign</th>
                                <th>Placement</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${ads.map((ad, idx) => `
                                <tr>
                                    <td><strong>${ad.name}</strong></td>
                                    <td>${ad.placement}</td>
                                    <td><span class="status-badge ${ad.isActive ? 'status-active' : 'status-inactive'}">${ad.isActive ? 'Active' : 'Inactive'}</span></td>
                                    <td>
                                        <button class="btn btn-secondary btn-sm btn-toggle-ad" data-index="${idx}">${ad.isActive ? 'Deactivate' : 'Activate'}</button>
                                        <button class="btn btn-secondary btn-sm btn-delete-ad" data-index="${idx}" style="color:red; border-color:red; margin-left:6px;">Delete</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        document.getElementById('addAdForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const list = getAds();
            const newAd = {
                id: list.length + 1,
                name: document.getElementById('adName').value.trim(),
                placement: document.getElementById('adPlacement').value,
                imageUrl: document.getElementById('adImage').value.trim(),
                targetLink: document.getElementById('adLink').value.trim(),
                isActive: document.getElementById('adActive').checked
            };

            list.push(newAd);
            saveAds(list);
            showToast("Advertisement campaign configured!");
            renderAds();
        });

        container.querySelectorAll('.btn-toggle-ad').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.getAttribute('data-index'));
                const list = getAds();
                list[idx].isActive = !list[idx].isActive;
                saveAds(list);
                showToast("Ad status toggled.");
                renderAds();
            });
        });

        container.querySelectorAll('.btn-delete-ad').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.getAttribute('data-index'));
                const list = getAds();
                showConfirmModal(
                    "Delete Ad Campaign",
                    `Are you sure you want to remove ad "${list[idx].name}"?`,
                    () => {
                        list.splice(idx, 1);
                        saveAds(list);
                        showToast("Campaign deleted.");
                        renderAds();
                    }
                );
            });
        });
    };

    // ── MANAGE SEO SECTION ────────────────────────────────────
    const renderSEO = () => {
        const container = document.getElementById('section-seo');
        const seo = getSEO();

        container.innerHTML = `
            <div class="seo-layout" style="display: grid; grid-template-columns: 2fr 1fr; gap: var(--spacing-lg);">
                <div class="glass-card" style="padding: var(--spacing-lg);">
                    <h4 style="font-size: 1.1rem; margin-bottom: var(--spacing-md);">Edit Search Engine Optimization Settings</h4>
                    <form class="admin-form" id="seoForm">
                        <div class="form-group">
                            <label for="seoTitle">Site Meta Title</label>
                            <input type="text" id="seoTitle" value="${seo.siteTitle || ''}" required>
                        </div>
                        <div class="form-group" style="margin-top: var(--spacing-md);">
                            <label for="seoDesc">Meta Description</label>
                            <textarea id="seoDesc" rows="3" required>${seo.metaDesc || ''}</textarea>
                        </div>
                        <div class="form-group" style="margin-top: var(--spacing-md);">
                            <label for="seoKeys">Meta Keywords (Comma-separated)</label>
                            <input type="text" id="seoKeys" value="${seo.keywords || ''}" required>
                        </div>
                        <div class="form-row" style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-md); margin-top: var(--spacing-md);">
                            <div class="form-group">
                                <label for="seoOgTitle">OpenGraph Title</label>
                                <input type="text" id="seoOgTitle" value="${seo.ogTitle || ''}" required>
                            </div>
                            <div class="form-group">
                                <label for="seoRobots">Robots Directive</label>
                                <select id="seoRobots">
                                    <option value="index" ${seo.robots === 'index' ? 'selected' : ''}>index, follow</option>
                                    <option value="noindex" ${seo.robots === 'noindex' ? 'selected' : ''}>noindex, nofollow</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary" style="margin-top: var(--spacing-lg);">Save SEO Config</button>
                    </form>
                </div>

                <div class="glass-card" style="padding: var(--spacing-lg); height: fit-content;">
                    <h4 style="font-size: 1.1rem; margin-bottom: var(--spacing-md);">Search Result Preview</h4>
                    <div style="background: white; border: 1px solid #ddd; padding: 16px; border-radius: 8px; font-family: arial, sans-serif; color: #1a0dab;">
                        <div style="font-size: 12px; color: #202124; margin-bottom: 2px;">https://aitoolshub.com</div>
                        <div id="previewTitle" style="font-size: 19px; line-height: 1.3; margin-bottom: 4px; cursor: pointer; text-decoration: hover; word-break: break-all;">${seo.siteTitle || 'AI Tools Hub - Premium Directory'}</div>
                        <div id="previewDesc" style="font-size: 14px; color: #4d5156; line-height: 1.58; word-break: break-all;">${seo.metaDesc || 'Discover the best AI and PDF tools in our premium, hand-curated directory.'}</div>
                    </div>
                </div>
            </div>
        `;

        // Update live preview card
        const seoTitleInput = document.getElementById('seoTitle');
        const seoDescInput = document.getElementById('seoDesc');
        const previewTitle = document.getElementById('previewTitle');
        const previewDesc = document.getElementById('previewDesc');

        seoTitleInput.addEventListener('input', () => {
            previewTitle.textContent = seoTitleInput.value || 'AI Tools Hub - Premium Directory';
        });
        seoDescInput.addEventListener('input', () => {
            previewDesc.textContent = seoDescInput.value || 'Discover the best AI and PDF tools in our premium...';
        });

        document.getElementById('seoForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const config = {
                siteTitle: seoTitleInput.value.trim(),
                metaDesc: seoDescInput.value.trim(),
                keywords: document.getElementById('seoKeys').value.trim(),
                ogTitle: document.getElementById('seoOgTitle').value.trim(),
                ogDesc: seoDescInput.value.trim(),
                ogImageUrl: seo.ogImageUrl || 'logo.svg',
                robots: document.getElementById('seoRobots').value
            };

            saveSEO(config);
            showToast("SEO configurations updated successfully!");
        });
    };

    // ── Global Setup/Init ─────────────────────────────────────
    checkAdminSession();

    // Admin theme selector integration
    const adminThemeToggle = document.getElementById('adminThemeToggle');
    const moonIcon = document.querySelector('.moon-icon');
    const sunIcon = document.querySelector('.sun-icon');

    const updateAdminThemeIcons = () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (moonIcon && sunIcon) {
            moonIcon.style.display = isDark ? 'none' : 'block';
            sunIcon.style.display = isDark ? 'block' : 'none';
        }
    };

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
    updateAdminThemeIcons();

    if (adminThemeToggle) {
        adminThemeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateAdminThemeIcons();
        });
    }
});
