(function () {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  var isFinePointer = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
  var prefersReducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!isFinePointer || prefersReducedMotion) return;
  if (document.querySelector('.custom-cursor-dart')) return;

  document.documentElement.classList.add('has-custom-cursor');

  var style = document.createElement('style');
  style.textContent = [
    'html.has-custom-cursor, html.has-custom-cursor *, html.has-custom-cursor *::before, html.has-custom-cursor *::after { cursor: none !important; }',
    '.custom-cursor-dart { position: fixed; top: 0; left: 0; width: 30px; height: 30px; pointer-events: none; z-index: 99999; will-change: transform, opacity; opacity: 0; transition: opacity 0.16s ease; }',
    '.custom-cursor-dart-svg { width: 100%; height: 100%; display: block; overflow: visible; transform-origin: 5px 5px; filter: drop-shadow(0 3px 7px rgba(14, 24, 40, 0.36)); transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), filter 0.2s ease; }',
    '.custom-cursor-dart.is-active .custom-cursor-dart-svg { transform: scale(1.16) rotate(-4deg); filter: drop-shadow(0 5px 12px rgba(184, 138, 59, 0.48)); }',
    '.custom-cursor-dart.is-pressed .custom-cursor-dart-svg { transform: scale(0.9) rotate(-2deg); }',
    '.custom-cursor-dart .cursor-dart-path { fill: url(#portfolio-cursor-gold); stroke: #0e1828; stroke-width: 1.25px; transition: fill 0.18s ease, stroke 0.18s ease; }',
    '.custom-cursor-dart.is-active .cursor-dart-path { fill: url(#portfolio-cursor-navy); stroke: #f0c46c; stroke-width: 1.5px; }',
  ].join('\n');
  document.head.appendChild(style);

  var dart = document.createElement('div');
  dart.className = 'custom-cursor-dart';
  dart.setAttribute('aria-hidden', 'true');
  dart.innerHTML =
    '<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="custom-cursor-dart-svg">' +
    '<defs>' +
    '<linearGradient id="portfolio-cursor-gold" x1="4" y1="4" x2="26" y2="29" gradientUnits="userSpaceOnUse">' +
    '<stop offset="0%" stop-color="#f0c46c" />' +
    '<stop offset="52%" stop-color="#c99b4a" />' +
    '<stop offset="100%" stop-color="#9e7127" />' +
    '</linearGradient>' +
    '<linearGradient id="portfolio-cursor-navy" x1="4" y1="4" x2="26" y2="29" gradientUnits="userSpaceOnUse">' +
    '<stop offset="0%" stop-color="#1e3150" />' +
    '<stop offset="100%" stop-color="#0e1828" />' +
    '</linearGradient>' +
    '</defs>' +
    '<path d="M 5.0 6.8 Q 4.2 3.5 7.2 5.1 L 26.8 15.3 Q 29.8 16.9 26.4 17.4 L 16.5 18.5 L 10.8 27.6 Q 8.9 30.6 8.4 27.1 Z" class="cursor-dart-path" />' +
    '</svg>';
  document.body.appendChild(dart);

  var targetX = window.innerWidth * 0.5;
  var targetY = window.innerHeight * 0.35;
  var currentX = targetX;
  var currentY = targetY;
  var rafId = 0;
  var isMoving = false;
  var hasMoved = false;

  var INTERACTIVE_SELECTOR =
    'a, button, [role="button"], summary, input, select, textarea, label, [data-cursor], .cursor-pointer';

  function updateInteractiveState(target) {
    var el = target instanceof Element ? target : document.elementFromPoint(targetX, targetY);
    if (el && el.closest(INTERACTIVE_SELECTOR)) {
      dart.classList.add('is-active');
    } else {
      dart.classList.remove('is-active');
    }
  }

  function tick() {
    var dx = targetX - currentX;
    var dy = targetY - currentY;
    if (Math.abs(dx) < 0.4 && Math.abs(dy) < 0.4) {
      currentX = targetX;
      currentY = targetY;
      dart.style.transform =
        'translate3d(' + currentX.toFixed(1) + 'px, ' + currentY.toFixed(1) + 'px, 0) translate(-4.7px, -4.7px)';
      isMoving = false;
      return;
    }
    currentX += dx * 0.72;
    currentY += dy * 0.72;
    dart.style.transform =
      'translate3d(' + currentX.toFixed(1) + 'px, ' + currentY.toFixed(1) + 'px, 0) translate(-4.7px, -4.7px)';
    rafId = window.requestAnimationFrame(tick);
  }

  window.addEventListener(
    'mousemove',
    function (e) {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!hasMoved) {
        currentX = targetX;
        currentY = targetY;
        hasMoved = true;
      }
      if (e.target instanceof HTMLIFrameElement) {
        dart.style.opacity = '0';
        return;
      }
      dart.style.opacity = '1';
      updateInteractiveState(e.target);
      if (!isMoving) {
        isMoving = true;
        rafId = window.requestAnimationFrame(tick);
      }
    },
    { passive: true }
  );

  window.addEventListener(
    'scroll',
    function () {
      if (hasMoved) updateInteractiveState(null);
    },
    { passive: true }
  );

  window.addEventListener(
    'mousedown',
    function () {
      dart.classList.add('is-pressed');
    },
    { passive: true }
  );

  window.addEventListener(
    'mouseup',
    function () {
      dart.classList.remove('is-pressed');
    },
    { passive: true }
  );

  window.addEventListener('blur', function () {
    dart.classList.remove('is-pressed');
    dart.style.opacity = '0';
  });

  document.addEventListener(
    'mouseleave',
    function () {
      dart.style.opacity = '0';
    },
    { passive: true }
  );
})();
