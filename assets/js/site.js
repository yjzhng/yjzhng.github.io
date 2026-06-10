// Theme toggle: auto / light / dark, persisted in localStorage. The data-theme
// attribute is already set early by the inline script in <head> (no flash);
// here we wire up the buttons and keep the active one highlighted.
(function () {
  function mark(theme) {
    document.querySelectorAll('.theme-toggle button').forEach(function (b) {
      b.classList.toggle('active', b.dataset.themeValue === theme);
    });
  }
  function apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (e) {}
    mark(theme);
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('.theme-toggle button');
    if (b) apply(b.dataset.themeValue);
  });
  var current = 'auto';
  try { current = localStorage.getItem('theme') || 'auto'; } catch (e) {}
  mark(current);
})();

// Instant tab switching: swap only the #content node, keep navbar + sidebar.
// No animation, supports back/forward, falls back to a full load on any error.
(function () {
  var SELECTOR = '#content';

  // Re-execute <script> tags in freshly inserted content (innerHTML scripts don't run).
  function runScripts(container) {
    container.querySelectorAll('script').forEach(function (old) {
      var s = document.createElement('script');
      for (var i = 0; i < old.attributes.length; i++) {
        s.setAttribute(old.attributes[i].name, old.attributes[i].value);
      }
      s.textContent = old.textContent;
      old.parentNode.replaceChild(s, old);
    });
    if (window.twttr && window.twttr.widgets) {
      try { window.twttr.widgets.load(container); } catch (e) {}
    }
  }

  // Highlight the tab matching the given path.
  function setActive(path) {
    document.querySelectorAll('.tabs a').forEach(function (a) {
      var href = new URL(a.href).pathname;
      var on = (href === '/') ? (path === '/' || path === '/index.html')
                              : (path.indexOf(href) === 0);
      a.classList.toggle('active', on);
    });
  }

  function swap(html, url) {
    var doc = new DOMParser().parseFromString(html, 'text/html');
    var fresh = doc.querySelector(SELECTOR);
    var cur = document.querySelector(SELECTOR);
    if (!fresh || !cur) return false;
    cur.replaceWith(fresh);
    document.title = doc.title;
    setActive(new URL(url, location.href).pathname);
    runScripts(fresh);
    window.scrollTo(0, 0);
    return true;
  }

  function navigate(url, push) {
    fetch(url).then(function (r) { return r.text(); }).then(function (html) {
      if (swap(html, url)) {
        if (push) history.pushState({ pjax: true }, '', url);
      } else {
        location.href = url;
      }
    }).catch(function () { location.href = url; });
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest('.tabs a[href]');
    if (!a) return;
    var url = new URL(a.href);
    if (url.origin !== location.origin) return;
    if (a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    if (url.pathname === location.pathname) return;
    navigate(a.href, true);
  });

  window.addEventListener('popstate', function () { navigate(location.href, false); });
})();
