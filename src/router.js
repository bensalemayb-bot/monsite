// =========================================================================
// Binacore — Router minimal hash-based
// Expose window.__nav(route, anchor?) pour tous les composants.
// =========================================================================

(function () {
  'use strict';

  // Récupère la route actuelle (sans le croisillon). Défaut : /home.
  function currentRoute() {
    var h = window.location.hash || '';
    if (!h || h === '#' || h === '#/') return '/home';
    return h.replace(/^#/, '');
  }

  // Navigation centrale : route + ancre optionnelle.
  // - Si on est déjà sur la route et qu'une ancre est fournie : scroll smooth sur l'ancre.
  // - Sinon : change le hash, scroll top (ou vers l'ancre après un court délai pour laisser React render).
  window.__nav = function (route, anchor) {
    if (!anchor) anchor = null;
    var now = currentRoute();

    if (now === route && anchor) {
      var el = document.getElementById(anchor);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    if (now === route && !anchor) {
      // Même route sans ancre : juste scroll top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    window.location.hash = '#' + route;

    if (anchor) {
      // Laisse React re-render la nouvelle page avant de scroller vers l'ancre.
      setTimeout(function () {
        var el = document.getElementById(anchor);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 220);
    } else {
      // Scroll top à chaque changement de page.
      setTimeout(function () { window.scrollTo({ top: 0, behavior: 'auto' }); }, 10);
    }
  };

  // Redirection legacy #/cas-usage -> #/projets
  window.addEventListener('hashchange', function () {
    if (window.location.hash === '#/cas-usage') {
      window.location.hash = '#/projets';
    }
  });

  // Init : si pas de hash, poser /home
  if (!window.location.hash || window.location.hash === '#' || window.location.hash === '#/') {
    window.location.hash = '#/home';
  }

  // Expose pour l'app React
  window.__currentRoute = currentRoute;
})();
