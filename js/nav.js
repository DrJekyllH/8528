window.addEventListener('DOMContentLoaded', function(){
	const headerNavLink = document.querySelectorAll('.js-header-nav-link');
	headerNavLink.forEach((targetLink) => {
		if (targetLink.href === location.href) {
	  targetLink.parentElement.classList.add('is-current');
	  }
	});
});