/**
 * Department Timetable Generator - Light / Dark Mode Toggle
 * Defaults to light mode. The chosen mode is remembered in this browser
 * (localStorage) so the app opens in whichever mode was last used.
 * The actual colors live in css/theme.css; this file only tracks the
 * preference and flips the `data-theme` attribute on <html>.
 * (index.html also applies the stored preference inline, before first
 * paint, so switching pages/refreshing never flashes the wrong theme.)
 */

(function () {
  'use strict';

  var THEME_KEY = 'ece_tt_theme';

  function getStoredTheme() {
    try {
      return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light';
    } catch (e) {
      return 'light';
    }
  }

  function storeTheme(theme) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      // localStorage unavailable (e.g. private browsing restrictions): the
      // toggle still works for this visit, it just won't be remembered.
    }
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    var btn = document.getElementById('theme-toggle');
    var label = document.getElementById('theme-toggle-label');
    if (btn) btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    if (label) label.textContent = theme === 'dark' ? 'Dark Mode' : 'Light Mode';
  }

  document.addEventListener('DOMContentLoaded', function () {
    applyTheme(getStoredTheme());

    var toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      var next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      storeTheme(next);
    });
  });
})();
