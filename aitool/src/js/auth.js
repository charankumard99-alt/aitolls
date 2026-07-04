/* ============================================================
   AUTH.JS — Authentication System for AI Tools Hub
   Uses localStorage for demo/portfolio purposes
   ============================================================ */

const AUTH_KEY = 'aitoolshub_users';
const SESSION_KEY = 'aitoolshub_session';

// ── Helpers ──────────────────────────────────────────────────
const encode = str => btoa(encodeURIComponent(str));
const decode = str => { try { return decodeURIComponent(atob(str)); } catch { return ''; } };

function getUsers() {
    return JSON.parse(localStorage.getItem(AUTH_KEY) || '[]');
}
function saveUsers(users) {
    localStorage.setItem(AUTH_KEY, JSON.stringify(users));
}

// ── Core Auth API ─────────────────────────────────────────────
function registerUser(name, email, password) {
    const users = getUsers();
    if (users.find(u => u.email === email)) {
        return { success: false, error: 'An account with this email already exists.' };
    }
    const user = {
        id: Date.now().toString(),
        name,
        email,
        passwordHash: encode(password),
        avatar: name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
        joinDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
        provider: 'email'
    };
    users.push(user);
    saveUsers(users);
    createSession(user);
    return { success: true, user };
}

function loginUser(email, password) {
    const users = getUsers();
    const user = users.find(u => u.email === email && decode(u.passwordHash) === password);
    if (!user) return { success: false, error: 'Invalid email or password.' };
    createSession(user);
    return { success: true, user };
}

function socialLogin(provider, mockName, mockEmail) {
    const users = getUsers();
    let user = users.find(u => u.email === mockEmail);
    if (!user) {
        user = {
            id: Date.now().toString(),
            name: mockName,
            email: mockEmail,
            passwordHash: '',
            avatar: mockName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
            joinDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
            provider
        };
        users.push(user);
        saveUsers(users);
    }
    createSession(user);
    return { success: true, user };
}

function logoutUser() {
    localStorage.removeItem(SESSION_KEY);
    updateHeaderAuth();
    showToast('You have been logged out.', 'info');
}

function createSession(user) {
    const session = { userId: user.id, name: user.name, email: user.email, avatar: user.avatar, provider: user.provider };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function getCurrentUser() {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
}

function isLoggedIn() {
    return !!getCurrentUser();
}

function isCurrentUserAdmin() {
    const user = getCurrentUser();
    return user && user.email === 'admin@aitoolshub.com';
}

// ── Header Auth UI ────────────────────────────────────────────
function updateHeaderAuth() {
    const user = getCurrentUser();
    const loginBtn = document.getElementById('headerLoginBtn');
    const signupBtn = document.getElementById('headerSignupBtn');
    const avatarWrap = document.getElementById('headerAvatarWrap');

    if (!loginBtn && !avatarWrap) return; // header elements not found

    if (user) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (signupBtn) signupBtn.style.display = 'none';
        if (avatarWrap) {
            avatarWrap.style.display = 'flex';
            const avatarEl = document.getElementById('headerAvatar');
            const avatarName = document.getElementById('headerAvatarName');
            if (avatarEl) avatarEl.textContent = user.avatar;
            if (avatarName) avatarName.textContent = user.name.split(' ')[0];
        }
        // Show/hide admin link
        const adminLink = document.getElementById('adminDashboardLink');
        if (adminLink) {
            adminLink.style.display = isCurrentUserAdmin() ? 'block' : 'none';
        }
    } else {
        if (loginBtn) loginBtn.style.display = '';
        if (signupBtn) signupBtn.style.display = '';
        if (avatarWrap) avatarWrap.style.display = 'none';
    }
}

// ── Toast Notification ────────────────────────────────────────
function showToast(message, type = 'success') {
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : type === 'info' ? 'ℹ️' : '⚠️';
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;
    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 350);
    }, 3000);
}

// ── Init on Every Page ────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    updateHeaderAuth();

    // Avatar dropdown toggle
    const avatarWrap = document.getElementById('headerAvatarWrap');
    const avatarDropdown = document.getElementById('avatarDropdown');
    if (avatarWrap && avatarDropdown) {
        avatarWrap.addEventListener('click', (e) => {
            e.stopPropagation();
            avatarDropdown.classList.toggle('open');
        });
        document.addEventListener('click', () => avatarDropdown.classList.remove('open'));
    }

    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            logoutUser();
            window.location.href = 'index.html';
        });
    }

    // Theme toggle (shared across pages)
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
});
