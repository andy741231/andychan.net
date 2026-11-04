/*
 * Andy Chan — portfolio
 * Minimal progressive enhancement:
 *  - once-only scroll reveals + sheet entrances (content is fully
 *    readable without JS; the .js class gates the hidden-by-default
 *    reveal styles)
 *  - scrollspy for the section nav (plain anchors still work without it)
 *  - live local time in the hero (static fallback already in markup)
 */
(function () {
    'use strict';

    var root = document.documentElement;
    root.classList.add('js');

    // Houston local time — "Houston, TX · 4:12 PM CT"
    var timeEl = document.getElementById('local-time');
    if (timeEl && typeof Intl !== 'undefined') {
        try {
            var fmt = new Intl.DateTimeFormat('en-US', {
                timeZone: 'America/Chicago',
                hour: 'numeric',
                minute: '2-digit',
                timeZoneName: 'short'
            });
            var tick = function () {
                timeEl.textContent = fmt.format(new Date());
            };
            tick();
            setInterval(tick, 30000);
        } catch (e) {
            /* leave the static fallback text in place */
        }
    }

    var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    // ---- once-only reveals ----------------------------------------------
    var revealables = [].slice.call(document.querySelectorAll('[data-reveal]'));
    var sheetSections = [].slice.call(
        document.querySelectorAll('[data-section-reveal]')
    );

    function showAll(list, cls) {
        list.forEach(function (el) {
            el.classList.add(cls);
        });
    }

    if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) {
                        return;
                    }
                    entry.target.classList.add(
                        entry.target.hasAttribute('data-section-reveal')
                            ? 'has-entered'
                            : 'is-visible'
                    );
                    io.unobserve(entry.target);
                });
            },
            { threshold: 0, rootMargin: '0px 0px -32px 0px' }
        );
        revealables.forEach(function (el) {
            io.observe(el);
        });
        sheetSections.forEach(function (el) {
            io.observe(el);
        });
    } else {
        showAll(revealables, 'is-visible');
        showAll(sheetSections, 'has-entered');
    }

    // If the motion preference flips to reduce at runtime, anything still
    // waiting on the observer is shown immediately (load-time reduce is
    // covered by the CSS media rule).
    if (motionQuery.addEventListener) {
        motionQuery.addEventListener('change', function () {
            if (motionQuery.matches) {
                showAll(revealables, 'is-visible');
                showAll(sheetSections, 'has-entered');
            }
        });
    }

    // ---- scrollspy --------------------------------------------------------
    var header = document.querySelector('.site-header');
    var navPairs = []
        .map.call(
            document.querySelectorAll('.nav-links a[href^="#"]'),
            function (a) {
                var sec = document.getElementById(a.hash.slice(1));
                return sec ? { link: a, sec: sec } : null;
            }
        )
        .filter(Boolean);

    var headerOffset = 0;

    function setHeaderOffset() {
        var h = header ? header.getBoundingClientRect().height : 0;
        headerOffset = Math.round(h) + 12;
        root.style.setProperty('--header-offset', headerOffset + 'px');
    }

    function updateSpy() {
        var mark = headerOffset + Math.min(window.innerHeight * 0.25, 180);
        var active = null;
        navPairs.forEach(function (pair) {
            if (pair.sec.getBoundingClientRect().top <= mark) {
                active = pair;
            }
        });
        // docked at the very bottom -> contact is active
        if (
            navPairs.length &&
            window.innerHeight + window.scrollY >=
                document.documentElement.scrollHeight - 4
        ) {
            active = navPairs[navPairs.length - 1];
        }
        navPairs.forEach(function (pair) {
            if (pair === active) {
                pair.link.setAttribute('aria-current', 'location');
            } else {
                pair.link.removeAttribute('aria-current');
            }
        });
    }

    var scheduled = false;
    function scheduleSpy() {
        if (scheduled) {
            return;
        }
        scheduled = true;
        window.requestAnimationFrame(function () {
            scheduled = false;
            updateSpy();
        });
    }

    setHeaderOffset();
    updateSpy();
    window.addEventListener('scroll', scheduleSpy, { passive: true });
    window.addEventListener('resize', function () {
        setHeaderOffset();
        scheduleSpy();
    });
    window.addEventListener('load', function () {
        setHeaderOffset();
        scheduleSpy();
    });
    if ('ResizeObserver' in window) {
        var ro = new ResizeObserver(function () {
            setHeaderOffset();
            scheduleSpy();
        });
        if (header) {
            ro.observe(header);
        }
        var main = document.querySelector('main');
        if (main) {
            ro.observe(main);
        }
    }
})();
