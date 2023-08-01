function openFile(url){
    const f = new Promise((resolve, reject) =>{
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.addEventListener('load', (e)=> resolve(request.responseText));
    request.send();
    });
    return f;
}

openFile("include/header.html")
    .then((response) => {
        const headerHTML = response;
        const header = document.querySelector("#header");
        header.insertAdjacentHTML("afterbegin", headerHTML);
        const headerNavLink = document.querySelectorAll('.js-header-nav-link');
        headerNavLink.forEach((targetLink) => {
            if (targetLink.href === location.href) {
                targetLink.parentElement.classList.add('is-current');
            }
        });
    })
    .then((response)=>openFile("include/footer.html"))
    .then((response)=>{
        const footerHTML = response;
        const footer = document.querySelector("#footer");
        footer.insertAdjacentHTML("afterbegin", footerHTML);
    });