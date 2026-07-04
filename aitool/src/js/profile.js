/* ============================================================
   PROFILE.JS — Profile Dashboard Rendering
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Redirect if not logged in
    if (!isLoggedIn()) {
        window.location.href = 'auth.html';
        return;
    }

    const user = getCurrentUser();

    // Fill profile sidebar
    const av = document.getElementById('profileAvatar');
    if (av) av.textContent = user.avatar;
    const nm = document.getElementById('profileName');
    if (nm) nm.textContent = user.name;
    const em = document.getElementById('profileEmail');
    if (em) em.textContent = user.email;

    const users = JSON.parse(localStorage.getItem('aitoolshub_users') || '[]');
    const fullUser = users.find(u => u.id === user.userId || u.email === user.email);
    const joinEl = document.getElementById('profileJoin');
    if (joinEl && fullUser) joinEl.textContent = `Joined ${fullUser.joinDate}`;

    const provEl = document.getElementById('profileProvider');
    if (provEl && user.provider && user.provider !== 'email') {
        provEl.innerHTML = `<span class="badge badge-category" style="margin-top:0.5rem;">via ${user.provider}</span>`;
    }

    // Settings prefill
    const sName = document.getElementById('settingsName');
    const sEmail = document.getElementById('settingsEmail');
    if (sName) sName.value = user.name;
    if (sEmail) sEmail.value = user.email;

    // Tab navigation
    document.querySelectorAll('.profile-nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const tab = item.dataset.tab;
            document.querySelectorAll('.profile-nav-item').forEach(i => i.classList.remove('active'));
            document.querySelectorAll('.profile-tab').forEach(t => t.classList.remove('active'));
            item.classList.add('active');
            const tabEl = document.getElementById(`tab-${tab}`);
            if (tabEl) { tabEl.classList.add('active'); renderTab(tab); }
        });
    });

    // Stat card click → navigate to tab
    document.getElementById('statFavorites')?.addEventListener('click', () => switchTab('favorites'));
    document.getElementById('statBookmarks')?.addEventListener('click', () => switchTab('bookmarks'));

    // Sidebar logout
    document.getElementById('sidebarLogout')?.addEventListener('click', () => {
        logoutUser();
        window.location.href = 'index.html';
    });

    // Check hash to open specific tab
    const hash = window.location.hash.replace('#', '');
    if (hash) switchTab(hash);
    else renderTab('overview');
});

function switchTab(name) {
    const item = document.querySelector(`[data-tab="${name}"]`);
    if (item) item.click();
}

function renderTab(tab) {
    if (tab === 'overview') renderOverview();
    if (tab === 'favorites') renderFavorites();
    if (tab === 'bookmarks') renderBookmarks();
    if (tab === 'recent') renderRecent();
    if (tab === 'reviews') renderMyReviews();
    if (tab === 'comments') renderMyComments();
}

// ── Overview ─────────────────────────────────────────────────
function renderOverview() {
    const favs = getFavorites();
    const books = getBookmarks();
    const recent = getRecentlyViewed();

    document.getElementById('statFavCount').textContent = favs.length;
    document.getElementById('statBookCount').textContent = books.length;
    document.getElementById('statRecentCount').textContent = recent.length;

    // Count reviews
    let reviewCount = 0;
    toolsData.forEach(t => {
        const rs = getReviews(t.id);
        const user = getCurrentUser();
        if (rs.find(r => r.userId === user.userId)) reviewCount++;
    });
    document.getElementById('statReviewCount').textContent = reviewCount;

    // Quick access
    const qa = document.getElementById('quickAccess');
    const recentTools = recent.slice(0, 6).map(id => toolsData.find(t => t.id == id)).filter(Boolean);
    if (qa) {
        if (recentTools.length > 0) {
            qa.innerHTML = recentTools.map(t => `
                <a href="tool.html?id=${t.id}" class="quick-access-card">
                    <span style="font-size:1.5rem;">${t.icon}</span>
                    <div>
                        <div style="font-weight:700;font-size:0.9rem;">${t.title}</div>
                        <div style="font-size:0.78rem;color:var(--text-secondary);">${t.categoryLabel}</div>
                    </div>
                </a>`).join('');
        } else {
            qa.innerHTML = `<p style="color:var(--text-secondary);font-size:0.9rem;">No recently viewed tools. <a href="index.html" style="color:var(--brand-primary);">Start exploring →</a></p>`;
        }
    }
}

// ── Profile Tool Card ─────────────────────────────────────────
function profileToolCard(tool) {
    return `
        <div class="profile-tool-card">
            <div class="ptc-header">
                <span class="ptc-icon">${tool.icon}</span>
                <div>
                    <div class="ptc-name">${tool.title}</div>
                    <div class="ptc-cat">${tool.categoryLabel}</div>
                </div>
            </div>
            <p class="ptc-desc">${tool.description}</p>
            <div class="ptc-footer">
                <span class="badge ${tool.price.toLowerCase().includes('free') ? 'badge-free' : 'badge-paid'}">${tool.price}</span>
                <a href="tool.html?id=${tool.id}" class="btn-try">View Tool</a>
            </div>
        </div>`;
}

// ── Favorites ─────────────────────────────────────────────────
function renderFavorites() {
    const ids = getFavorites();
    const grid = document.getElementById('favoritesGrid');
    const empty = document.getElementById('favoritesEmpty');
    const tools = ids.map(id => toolsData.find(t => t.id == id)).filter(Boolean);
    if (!tools.length) { grid.style.display = 'none'; empty.style.display = 'block'; return; }
    empty.style.display = 'none'; grid.style.display = 'grid';
    grid.innerHTML = tools.map(profileToolCard).join('');
}

// ── Bookmarks ─────────────────────────────────────────────────
function renderBookmarks() {
    const ids = getBookmarks();
    const grid = document.getElementById('bookmarksGrid');
    const empty = document.getElementById('bookmarksEmpty');
    const tools = ids.map(id => toolsData.find(t => t.id == id)).filter(Boolean);
    if (!tools.length) { grid.style.display = 'none'; empty.style.display = 'block'; return; }
    empty.style.display = 'none'; grid.style.display = 'grid';
    grid.innerHTML = tools.map(profileToolCard).join('');
}

// ── Recently Viewed ───────────────────────────────────────────
function renderRecent() {
    const ids = getRecentlyViewed();
    const grid = document.getElementById('recentGrid');
    const empty = document.getElementById('recentEmpty');
    const tools = ids.map(id => toolsData.find(t => t.id == id)).filter(Boolean);
    if (!tools.length) { grid.style.display = 'none'; empty.style.display = 'block'; return; }
    empty.style.display = 'none'; grid.style.display = 'grid';
    grid.innerHTML = tools.map(profileToolCard).join('');
}

// ── My Reviews ───────────────────────────────────────────────
function renderMyReviews() {
    const user = getCurrentUser();
    const list = document.getElementById('myReviewsList');
    const empty = document.getElementById('reviewsEmpty');
    let html = '';
    toolsData.forEach(tool => {
        const reviews = getReviews(tool.id);
        const mine = reviews.find(r => r.userId === user.userId);
        if (mine) {
            html += `<div class="my-review-card">
                <div class="my-review-tool">${tool.icon} ${tool.title}</div>
                <div style="display:flex;gap:0.3rem;margin:0.4rem 0;">${generateStars(mine.rating)}</div>
                <p class="my-review-text">"${mine.text}"</p>
                <div class="my-review-date">${mine.date}</div>
            </div>`;
        }
    });
    if (!html) { list.innerHTML = ''; empty.style.display = 'block'; return; }
    empty.style.display = 'none';
    list.innerHTML = html;
}

// ── My Comments ──────────────────────────────────────────────
function renderMyComments() {
    const user = getCurrentUser();
    const list = document.getElementById('myCommentsList');
    const empty = document.getElementById('commentsEmpty');
    let html = '';
    toolsData.forEach(tool => {
        const comments = getComments(tool.id);
        const mine = comments.filter(c => c.userId === user.userId);
        mine.forEach(c => {
            html += `<div class="my-comment-card">
                <div class="my-review-tool">${tool.icon} ${tool.title}</div>
                <p class="my-review-text">${c.text}</p>
                <div class="my-review-date">${c.date}</div>
            </div>`;
        });
    });
    if (!html) { list.innerHTML = ''; empty.style.display = 'block'; return; }
    empty.style.display = 'none';
    list.innerHTML = html;
}

// ── Stars helper (needed on this page too) ────────────────────
function generateStars(rating) {
    const full = Math.floor(rating);
    let stars = '';
    for (let i = 0; i < full; i++) stars += '<span style="color:#f59e0b;">★</span>';
    for (let i = full; i < 5; i++) stars += '<span style="color:#d1d5db;">★</span>';
    return stars;
}

// ── Settings ─────────────────────────────────────────────────
function saveSettings() {
    const name = document.getElementById('settingsName')?.value.trim();
    if (!name) return;
    const session = JSON.parse(localStorage.getItem('aitoolshub_session') || '{}');
    session.name = name;
    session.avatar = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    localStorage.setItem('aitoolshub_session', JSON.stringify(session));
    // Update stored user
    const users = JSON.parse(localStorage.getItem('aitoolshub_users') || '[]');
    const idx = users.findIndex(u => u.email === session.email);
    if (idx !== -1) { users[idx].name = name; users[idx].avatar = session.avatar; localStorage.setItem('aitoolshub_users', JSON.stringify(users)); }
    showToast('Settings saved! ✅', 'success');
    document.getElementById('profileName').textContent = name;
    document.getElementById('profileAvatar').textContent = session.avatar;
}

function clearAllData() {
    if (!confirm('This will clear all your favorites, bookmarks, and history from this browser. Are you sure?')) return;
    ['aitoolshub_favorites','aitoolshub_bookmarks','aitoolshub_recent','aitoolshub_compare'].forEach(k => localStorage.removeItem(k));
    showToast('All data cleared.', 'info');
    renderOverview();
}
