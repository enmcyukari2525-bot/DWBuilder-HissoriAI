window.APP_VERSION = 'ver0.3';

document.querySelectorAll('[data-app-version]').forEach((element) => {
  element.textContent = window.APP_VERSION;
});
