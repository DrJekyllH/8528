const headerNavLink = document.querySelectorAll('.nav-link');

headerNavLink.forEach((targetLink) => {
  if (targetLink.href === location.href) {
    targetLink.parentElement.classList.add('is-current');
  }
});