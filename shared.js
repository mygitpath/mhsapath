/*
 * shared.js — myHSAPath common behaviours
 * Single source of truth for all shared JS
 * Handles: mobile nav, responsive layout, scroll effects
 */

(function() {

  /* ─── MOBILE NAV ────────────────────────────────────── */
  function initMobileNav() {
    var btn   = document.querySelector('.mobile-menu-btn');
    var drawer = document.getElementById('mobileDrawer');
    var overlay = document.getElementById('mobileOverlay');
    if (!btn || !drawer) return;

    function open() {
      drawer.classList.add('open');
      if (overlay) overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      btn.setAttribute('aria-expanded', 'true');
    }
    function close() {
      drawer.classList.remove('open');
      if (overlay) overlay.classList.remove('active');
      document.body.style.overflow = '';
      btn.setAttribute('aria-expanded', 'false');
    }

    btn.addEventListener('click', function() {
      drawer.classList.contains('open') ? close() : open();
    });
    if (overlay) overlay.addEventListener('click', close);
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') close();
    });
  }

  /* ─── RESPONSIVE LAYOUT ─────────────────────────────── */
  function applyResponsive() {
    var w = window.innerWidth;
    var isTablet = w <= 1100;
    var isMobile = w <= 640;

    // Legal/disclosure wrap
    ['legalWrap','disclosureWrap'].forEach(function(id) {
      var el = document.getElementById(id);
      if (!el) return;
      if (isTablet) {
        el.style.gridTemplateColumns = '1fr';
        el.style.gap = '2rem';
        el.style.padding = '2.5rem 5% 4rem';
      } else {
        el.style.gridTemplateColumns = '220px 1fr';
        el.style.gap = '4rem';
        el.style.padding = '4rem 5% 5rem';
      }
      var toc = el.querySelector('.toc, aside');
      if (toc) toc.style.position = isTablet ? 'static' : 'sticky';
    });

    // Two-col grids
    document.querySelectorAll('.two-col').forEach(function(el) {
      el.style.gridTemplateColumns = isTablet ? '1fr' : '';
    });
  }

  /* ─── SKIP LINK ─────────────────────────────────────── */
  function initSkipLink() {
    var skip = document.querySelector('.skip-link');
    if (skip) {
      skip.addEventListener('focus', function() {
        skip.style.transform = 'translateY(0)';
      });
      skip.addEventListener('blur', function() {
        skip.style.transform = '';
      });
    }
  }

  /* ─── INIT ──────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function() {
    initMobileNav();
    initSkipLink();
    applyResponsive();
  });
  window.addEventListener('resize', applyResponsive);
  window.addEventListener('orientationchange', function() {
    setTimeout(applyResponsive, 150);
  });

})();
