// Runs before the page renders so the saved theme is applied without a flash,
// and wires up service worker updates. Kept as a separate file because the
// CSP forbids inline scripts.
(function () {
  'use strict';

  // 1. theme, applied as early as possible to avoid a flash of the wrong theme
  var theme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', theme);

  // 2. service worker
  if (!('serviceWorker' in navigator)) return;

  window.addEventListener('load', function () {
    navigator.serviceWorker.register('./sw.js').catch(function (err) {
      console.warn('Service worker registration failed:', err);
    });

    var refreshing = false;

    // Ask the waiting worker to take over, then reload once it has.
    navigator.serviceWorker.addEventListener('controllerchange', function () {
      if (refreshing) return;
      refreshing = true;
      window.location.reload();
    });

    navigator.serviceWorker.addEventListener('message', function (event) {
      if (event.data && event.data.type === 'SW_READY') {
        window.dispatchEvent(new CustomEvent('phasmo:sw-ready'));
      }
    });

    // A newly installed worker only means "update" if one was already in
    // charge; on a first visit there is nothing to reload.
    let announced = false;
    function watch(registration) {
      if (!registration) return;

      function announce(worker) {
        if (!worker || announced || !navigator.serviceWorker.controller) return;
        announced = true;
        window.dispatchEvent(
          new CustomEvent('phasmo:sw-update', { detail: { worker: worker } })
        );
      }

      const check = () => {
        if (registration.waiting) announce(registration.waiting);
      };

      check();
      registration.addEventListener('updatefound', () => {
        const worker = registration.installing;
        if (!worker) return;
        worker.addEventListener('statechange', () => {
          if (worker.state === 'installed') announce(worker);
        });
      });
    }

    // ready resolves immediately on the very first load, so it covers that case
    // too; getRegistration covers the reload case. Announcing is guarded so the
    // update notice can only ever appear once.
    navigator.serviceWorker.ready.then(watch);
    navigator.serviceWorker.getRegistration().then(watch);
  });
})();
