/*
 * Andy Chan — portfolio
 * Minimal progressive enhancement: once-only scroll reveals.
 * Content is fully readable without JS — the .js class gates the
 * hidden-by-default reveal styles in portfolio.css.
 */
(function () {
    'use strict';

    var root = document.documentElement;
    root.classList.add('js');

    // Nothing to enhance when reduced motion is preferred —
    // CSS shows everything immediately in that case.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    var revealables = Array.prototype.slice.call(
        document.querySelectorAll('[data-reveal]')
    );

    if (!('IntersectionObserver' in window)) {
        revealables.forEach(function (el) {
            el.classList.add('is-visible');
        });
        return;
    }

    var observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0, rootMargin: '0px 0px -32px 0px' }
    );

    revealables.forEach(function (el) {
        observer.observe(el);
    });
})();
