(function () {
  document.querySelectorAll('[data-tisso-header]').forEach(function (header) {
    var toggle = header.querySelector('[data-menu-toggle]');
    var panel = header.querySelector('[data-menu-panel]');

    if (!toggle || !panel) return;

    var isOpen = false;

    function openPanel() {
      isOpen = true;
      header.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close menu');
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }

    function closePanel() {
      isOpen = false;
      header.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      // Set explicit height first so the collapse transition can run,
      // then animate to 0 on the next frame.
      panel.style.maxHeight = panel.scrollHeight + 'px';
      requestAnimationFrame(function () {
        panel.style.maxHeight = '0px';
      });
    }

    toggle.addEventListener('click', function () {
      if (isOpen) {
        closePanel();
      } else {
        openPanel();
      }
    });

    // Keep an open panel's height correct if the viewport is resized
    // (e.g. rotating a device, or resizing the theme editor preview).
    window.addEventListener('resize', function () {
      if (isOpen) {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });

    // Close the menu when a nav link inside the panel is clicked
    // (but not when the CTA button is clicked — that should just navigate).
    panel.addEventListener('click', function (event) {
      if (event.target.closest('.tisso-header__nav-link') && isOpen) {
        closePanel();
      }
    });

    // Close on Escape for keyboard users.
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && isOpen) {
        closePanel();
        toggle.focus();
      }
    });
  });
})();