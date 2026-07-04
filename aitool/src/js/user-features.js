/* ============================================================
   USER-FEATURES.JS — Favorites, Bookmarks, Recently Viewed,
   Compare Tools, Share, Reviews, Comments
   ============================================================ */

const FAV_KEY = 'aitoolshub_favorites';
const BOOK_KEY = 'aitoolshub_bookmarks';
const RECENT_KEY = 'aitoolshub_recent';
const COMPARE_KEY = 'aitoolshub_compare';
const REVIEWS_KEY = 'aitoolshub_reviews';
const COMMENTS_KEY = 'aitoolshub_comments';
const MAX_RECENT = 20;
const MAX_COMPARE = 3;

// ── Generic localStorage list helpers ────────────────────────
const getList = key => JSON.parse(localStorage.getItem(key) || '[]');
const saveList = (key, arr) => localStorage.setItem(key, JSON.stringify(arr));
const toggleInList = (key, id) => {
    const list = getList(key);
    const idx = list.indexOf(id);
    if (idx === -1) { list.push(id); } else { list.splice(idx, 1); }
    saveList(key, list);
    return idx === -1; // true = added
};
const isInList = (key, id) => getList(key).includes(id);

// ── Favorites ─────────────────────────────────────────────────
function toggleFavorite(toolId) {
    if (!isLoggedIn()) { showToast('Please login to save favorites.', 'info'); return false; }
    return toggleInList(FAV_KEY, toolId);
}
function isFavorite(toolId) { return isInList(FAV_KEY, toolId); }
function getFavorites() { return getList(FAV_KEY); }

// ── Bookmarks ─────────────────────────────────────────────────
function toggleBookmark(toolId) {
    if (!isLoggedIn()) { showToast('Please login to bookmark tools.', 'info'); return false; }
    return toggleInList(BOOK_KEY, toolId);
}
function isBookmarked(toolId) { return isInList(BOOK_KEY, toolId); }
function getBookmarks() { return getList(BOOK_KEY); }

// ── Recently Viewed ───────────────────────────────────────────
function addToRecentlyViewed(toolId) {
    let recent = getList(RECENT_KEY).filter(id => id !== toolId);
    recent.unshift(toolId);
    if (recent.length > MAX_RECENT) recent = recent.slice(0, MAX_RECENT);
    saveList(RECENT_KEY, recent);
}
function getRecentlyViewed() { return getList(RECENT_KEY); }

// ── Compare Tools ─────────────────────────────────────────────
function addToCompare(toolId) {
    const list = getList(COMPARE_KEY);
    if (list.includes(toolId)) { showToast('Already in compare list.', 'info'); return; }
    if (list.length >= MAX_COMPARE) { showToast(`Max ${MAX_COMPARE} tools can be compared at once.`, 'warning'); return; }
    list.push(toolId);
    saveList(COMPARE_KEY, list);
    updateCompareTray();
    showToast('Added to compare. 📊', 'success');
}
function removeFromCompare(toolId) {
    saveList(COMPARE_KEY, getList(COMPARE_KEY).filter(id => id !== toolId));
    updateCompareTray();
}
function clearCompare() { saveList(COMPARE_KEY, []); updateCompareTray(); }
function getCompareList() { return getList(COMPARE_KEY); }

function updateCompareTray() {
    const tray = document.getElementById('compareTray');
    if (!tray) return;
    const list = getList(COMPARE_KEY);
    if (list.length === 0) { tray.classList.remove('visible'); return; }
    tray.classList.add('visible');
    const slots = tray.querySelectorAll('.compare-slot');
    slots.forEach((slot, i) => {
        const toolId = list[i];
        if (toolId) {
            const tool = (typeof toolsData !== 'undefined') ? toolsData.find(t => t.id == toolId) : null;
            slot.innerHTML = tool
                ? `<span class="cs-icon">${tool.icon}</span><span class="cs-name">${tool.title}</span><button class="cs-remove" onclick="removeFromCompare(${tool.id})">✕</button>`
                : `<span>Tool #${toolId}</span><button class="cs-remove" onclick="removeFromCompare(${toolId})">✕</button>`;
            slot.classList.add('filled');
        } else {
            slot.innerHTML = `<span class="cs-empty">+ Add Tool</span>`;
            slot.classList.remove('filled');
        }
    });
    const count = document.getElementById('compareTrayCount');
    if (count) count.textContent = `${list.length} / ${MAX_COMPARE}`;
}

// ── Share Tool ────────────────────────────────────────────────
function shareTool(toolId) {
    const url = `${window.location.origin}${window.location.pathname.replace(/\/[^/]*$/, '/')  }tool.html?id=${toolId}`;
    if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => showToast('Link copied to clipboard! 🔗', 'success'));
    } else {
        const ta = document.createElement('textarea');
        ta.value = url; document.body.appendChild(ta); ta.select();
        document.execCommand('copy'); ta.remove();
        showToast('Link copied! 🔗', 'success');
    }
}

// ── Reviews ───────────────────────────────────────────────────
function getReviews(toolId) {
    return JSON.parse(localStorage.getItem(`${REVIEWS_KEY}_${toolId}`) || '[]');
}
function addReview(toolId, rating, text) {
    if (!isLoggedIn()) { showToast('Please login to submit a review.', 'info'); return false; }
    const user = getCurrentUser();
    const reviews = getReviews(toolId);
    if (reviews.find(r => r.userId === user.userId)) {
        showToast('You have already reviewed this tool.', 'warning'); return false;
    }
    reviews.unshift({
        userId: user.userId, user: user.name,
        rating, text, date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    });
    localStorage.setItem(`${REVIEWS_KEY}_${toolId}`, JSON.stringify(reviews));
    return true;
}

// ── Comments ─────────────────────────────────────────────────
function getComments(toolId) {
    return JSON.parse(localStorage.getItem(`${COMMENTS_KEY}_${toolId}`) || '[]');
}
function addComment(toolId, text) {
    if (!isLoggedIn()) { showToast('Please login to comment.', 'info'); return false; }
    const user = getCurrentUser();
    const comments = getComments(toolId);
    comments.unshift({
        userId: user.userId, user: user.name, avatar: user.avatar,
        text, date: new Date().toLocaleString()
    });
    localStorage.setItem(`${COMMENTS_KEY}_${toolId}`, JSON.stringify(comments));
    return true;
}

// ── Interactive card button wiring ────────────────────────────
function wireCardButtons() {
    document.querySelectorAll('[data-action]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const action = btn.dataset.action;
            const toolId = parseInt(btn.dataset.id);
            if (action === 'bookmark') {
                const added = toggleBookmark(toolId);
                if (added !== false) {
                    btn.classList.toggle('active', added);
                    btn.title = added ? 'Bookmarked!' : 'Bookmark';
                    showToast(added ? 'Bookmarked! 🔖' : 'Bookmark removed.', added ? 'success' : 'info');
                }
            } else if (action === 'favorite') {
                const added = toggleFavorite(toolId);
                if (added !== false) {
                    btn.classList.toggle('active', added);
                    showToast(added ? 'Added to favorites ❤️' : 'Removed from favorites.', added ? 'success' : 'info');
                }
            } else if (action === 'compare') {
                addToCompare(toolId);
            } else if (action === 'share') {
                shareTool(toolId);
            }
        });
        // Restore state
        const toolId = parseInt(btn.dataset.id);
        if (btn.dataset.action === 'bookmark' && isBookmarked(toolId)) btn.classList.add('active');
        if (btn.dataset.action === 'favorite' && isFavorite(toolId)) btn.classList.add('active');
    });
}

// ── Init ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    // Inject compare tray into body
    if (!document.getElementById('compareTray')) {
        const tray = document.createElement('div');
        tray.id = 'compareTray';
        tray.innerHTML = `
            <div class="compare-tray-inner">
                <div class="compare-tray-header">
                    <span class="compare-tray-title">⚖️ Compare Tools <span id="compareTrayCount">0/3</span></span>
                    <div class="compare-tray-actions">
                        <a href="compare.html" class="btn btn-primary btn-sm" id="goCompareBtn">Compare Now</a>
                        <button class="compare-tray-clear" onclick="clearCompare()">✕ Clear</button>
                    </div>
                </div>
                <div class="compare-slots">
                    <div class="compare-slot"></div>
                    <div class="compare-slot"></div>
                    <div class="compare-slot"></div>
                </div>
            </div>`;
        document.body.appendChild(tray);
    }
    updateCompareTray();
    wireCardButtons();
});
