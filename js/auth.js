/**
 * Department Timetable Generator - Login Gate
 * Shows a login screen until one of the department usernames signs in with the
 * shared password; then reveals the app shell. Client-side only (this is a static
 * site with no backend), so this is a basic access gate, not real authentication.
 * The signed-in state is kept in sessionStorage, so it clears when the tab closes.
 */

(function () {
  'use strict';

  var VALID_USERNAMES = ['HoD', 'HoD_ic', 'TT_admin_1', 'TT_admin_2', 'dev'];
  var PASSWORD = 'Admin@PSG';
  var SESSION_KEY = 'ece_tt_auth_user';

  function getStoredUser() {
    try {
      return sessionStorage.getItem(SESSION_KEY);
    } catch (e) {
      return null;
    }
  }

  function storeUser(username) {
    try {
      sessionStorage.setItem(SESSION_KEY, username);
    } catch (e) {
      // sessionStorage unavailable (e.g. private browsing restrictions): the
      // session simply won't be remembered on refresh, login still works.
    }
  }

  function showApp() {
    var loginScreen = document.getElementById('login-screen');
    var appShell = document.getElementById('app-shell');
    if (loginScreen) loginScreen.style.display = 'none';
    if (appShell) appShell.style.display = '';
  }

  function showLogin() {
    var loginScreen = document.getElementById('login-screen');
    var appShell = document.getElementById('app-shell');
    if (loginScreen) loginScreen.style.display = 'flex';
    if (appShell) appShell.style.display = 'none';
  }

  document.addEventListener('DOMContentLoaded', function () {
    var storedUser = getStoredUser();
    if (storedUser && VALID_USERNAMES.indexOf(storedUser) !== -1) {
      showApp();
    } else {
      showLogin();
    }

    var form = document.getElementById('login-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var usernameInput = document.getElementById('login-username');
      var passwordInput = document.getElementById('login-password');
      var errorBox = document.getElementById('login-error');

      var username = (usernameInput.value || '').trim();
      var password = passwordInput.value || '';

      if (VALID_USERNAMES.indexOf(username) !== -1 && password === PASSWORD) {
        storeUser(username);
        if (errorBox) errorBox.style.display = 'none';
        passwordInput.value = '';
        showApp();
      } else {
        if (errorBox) {
          errorBox.textContent = 'Incorrect username or password. Please try again.';
          errorBox.style.display = 'block';
        }
        passwordInput.value = '';
        passwordInput.focus();
      }
    });
  });
})();
