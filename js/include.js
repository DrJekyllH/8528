//onload = async () =>{
/*
fetch("include/header.html")
  .then(response => {
    return response.text()
  })
  .then(data => {
    document.querySelector("#header").innerHTML = data;
  });
*/
const includeHeader = new XMLHttpRequest();
includeHeader.open("GET", "include/header.html", true);
includeHeader.onreadystatechange = function () {
  if (includeHeader.readyState === 4 && includeHeader.status === 200) {
    const headerHTML = includeHeader.responseText;
    const header = document.querySelector("#header");
    header.insertAdjacentHTML("afterbegin", headerHTML);
	const headerNavLink = document.querySelectorAll('.js-header-nav-link');
	headerNavLink.forEach((targetLink) => {
		if (targetLink.href === location.href) {
	  targetLink.parentElement.classList.add('is-current');
	  }
	});
  }
};
includeHeader.send();

const includeFooter = new XMLHttpRequest();
includeFooter.open("GET", "include/footer.html", true);
includeFooter.onreadystatechange = function () {
  if (includeFooter.readyState === 4 && includeFooter.status === 200) {
    const footerHTML = includeFooter.responseText;
    const footer = document.querySelector("#footer");
    footer.insertAdjacentHTML("afterbegin", footerHTML);
  }
};
includeFooter.send();

//}