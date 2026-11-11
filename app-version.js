window.APP_VERSION = 'ver0.4.0';

document.querySelectorAll('[data-app-version]').forEach((element) => {
  element.textContent = window.APP_VERSION;
});
