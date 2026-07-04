/* ============================================================
   EXTRAS.JS — Scroll-to-Top, Loading Skeletons, Scroll-Reveal,
   Breadcrumbs, Newsletter, Lazy Loading, Accessibility, PWA
   ============================================================ */

// ── 1. SCROLL-TO-TOP ──────────────────────────────────────────
(function initScrollToTop() {
    const btn = document.createElement('button');
    btn.className = 'scroll-top-btn';
    btn.id = 'scrollTopBtn';
    btn.setAttribute('aria-label', 'Scroll to top');
    btn.title = 'Back to top';
    btn.innerHTML = '↑';
    document.body.appendChild(btn);

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                btn.classList.toggle('visible', window.scrollY > 300);
                ticking = false;
            });
            ticking = true;
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();


// ── 2. LOADING SKELETONS ──────────────────────────────────────
(function initSkeletons() {
    const target = document.getElementById('featuredSectionsContainer') || document.getElementById('toolsGrid');
    if (!target) return;

    // Only inject skeletons if container is empty (before JS render)
    if (target.children.length === 0 || target.innerHTML.trim() === '') {
        const skeletonCount = 8;
        const skeletonWrapper = document.createElement('div');
        skeletonWrapper.className = 'skeleton-wrapper';
        skeletonWrapper.id = 'skeletonLoader';

        for (let i = 0; i < skeletonCount; i++) {
            skeletonWrapper.innerHTML += `
                <div class="skeleton-card glass-card">
                    <div class="skeleton-header">
                        <div class="skeleton-icon skeleton-shimmer"></div>
                        <div class="skeleton-text-group">
                            <div class="skeleton-line skeleton-shimmer" style="width:70%"></div>
                            <div class="skeleton-line skeleton-shimmer short" style="width:40%"></div>
                        </div>
                    </div>
                    <div class="skeleton-body">
                        <div class="skeleton-line skeleton-shimmer"></div>
                        <div class="skeleton-line skeleton-shimmer" style="width:85%"></div>
                        <div class="skeleton-line skeleton-shimmer" style="width:60%"></div>
                    </div>
                    <div class="skeleton-footer">
                        <div class="skeleton-line skeleton-shimmer" style="width:30%;height:32px;border-radius:8px"></div>
                        <div class="skeleton-line skeleton-shimmer" style="width:25%;height:32px;border-radius:8px"></div>
                    </div>
                </div>`;
        }
        target.appendChild(skeletonWrapper);
    }
})();

/** Remove skeletons once real content is rendered */
function removeSkeletons() {
    const loader = document.getElementById('skeletonLoader');
    if (loader) {
        loader.style.opacity = '0';
        loader.style.transition = 'opacity 0.4s ease';
        setTimeout(() => loader.remove(), 400);
    }
}


// ── 3. SCROLL-REVEAL ANIMATIONS ───────────────────────────────
(function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    // Observe existing elements
    function observeRevealElements() {
        document.querySelectorAll('.reveal:not(.revealed)').forEach(el => observer.observe(el));
    }

    // Initial pass + mutation observer for dynamically added content
    document.addEventListener('DOMContentLoaded', observeRevealElements);

    const mutationObs = new MutationObserver(() => {
        requestAnimationFrame(observeRevealElements);
    });
    mutationObs.observe(document.body, { childList: true, subtree: true });
})();


// ── 4. BREADCRUMB NAVIGATION ──────────────────────────────────
(function initBreadcrumbs() {
    document.addEventListener('DOMContentLoaded', () => {
        const container = document.getElementById('breadcrumbNav');
        if (!container) return;

        const page = location.pathname.split('/').pop() || 'index.html';
        const crumbs = [{ label: '🏠 Home', href: 'index.html' }];

        switch (page) {
            case 'tool.html':
                crumbs.push({ label: 'Tools', href: 'index.html#explore' });
                // Dynamic tool name added by tool.js
                const toolName = document.getElementById('breadcrumbToolName');
                if (toolName) crumbs.push({ label: toolName.textContent || 'Tool Details', href: null });
                break;
            case 'blog.html':
                crumbs.push({ label: 'Blog', href: null });
                break;
            case 'profile.html':
                crumbs.push({ label: 'My Profile', href: null });
                break;
            case 'compare.html':
                crumbs.push({ label: 'Compare Tools', href: null });
                break;
            case 'auth.html':
                crumbs.push({ label: 'Sign In / Register', href: null });
                break;
            default:
                break;
        }

        container.innerHTML = crumbs.map((c, i) => {
            const isLast = i === crumbs.length - 1;
            if (isLast || !c.href) {
                return `<span class="breadcrumb-current" aria-current="page">${c.label}</span>`;
            }
            return `<a href="${c.href}" class="breadcrumb-link">${c.label}</a><span class="breadcrumb-sep">›</span>`;
        }).join('');
    });
})();

/** Update breadcrumb with dynamic tool name (called from tool.js) */
function updateBreadcrumbTool(toolName) {
    const container = document.getElementById('breadcrumbNav');
    if (!container) return;
    container.innerHTML = `
        <a href="index.html" class="breadcrumb-link">🏠 Home</a>
        <span class="breadcrumb-sep">›</span>
        <a href="index.html#explore" class="breadcrumb-link">Tools</a>
        <span class="breadcrumb-sep">›</span>
        <span class="breadcrumb-current" aria-current="page">${toolName}</span>`;
}


// ── 5. NEWSLETTER FORM HANDLER ────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.footer-newsletter-form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = form.querySelector('.footer-newsletter-input');
            if (input && input.value) {
                if (typeof showToast === 'function') {
                    showToast('Thanks for subscribing to our newsletter! 📬', 'success');
                }
                input.value = '';
            }
        });
    });

    // Blog sidebar newsletter too
    const blogForm = document.getElementById('blogNewsletterForm');
    if (blogForm) {
        blogForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (typeof showToast === 'function') {
                showToast('Thanks for subscribing! 📬', 'success');
            }
            blogForm.reset();
        });
    }
});


// ── 6. LAZY LOADING (Intersection Observer for Sections) ──────
(function initLazyLoad() {
    document.addEventListener('DOMContentLoaded', () => {
        const lazySections = document.querySelectorAll('.lazy-section');
        if (!lazySections.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('lazy-loaded');
                    observer.unobserve(entry.target);
                }
            });
        }, { rootMargin: '200px' });

        lazySections.forEach(sec => observer.observe(sec));
    });
})();


// ── 7. ACCESSIBILITY ENHANCEMENTS ─────────────────────────────
(function initAccessibility() {
    // Focus-visible polyfill class
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') document.body.classList.add('keyboard-nav');
    });
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });

    // Skip link focus handler
    document.addEventListener('DOMContentLoaded', () => {
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(skipLink.getAttribute('href'));
                if (target) {
                    target.setAttribute('tabindex', '-1');
                    target.focus();
                }
            });
        }
    });
})();


// ── 8. HAMBURGER MENU (Mobile) ────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburgerBtn');
    const nav = document.querySelector('.main-nav');
    if (!hamburger || !nav) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('nav-open');
        document.body.classList.toggle('nav-overlay-active');
    });

    // Close on nav link click
    nav.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            nav.classList.remove('nav-open');
            document.body.classList.remove('nav-overlay-active');
        });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            nav.classList.remove('nav-open');
            document.body.classList.remove('nav-overlay-active');
        }
    });
});


// ── 9. PWA — SERVICE WORKER REGISTRATION ──────────────────────
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('SW registered:', reg.scope))
            .catch(err => console.log('SW registration failed:', err));
    });
}


// ── 10. SMOOTH SCROLL for anchor links ────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
