function openFile(url) {
    const f = new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.addEventListener('load', (e) => resolve(request.responseText));
        request.send();
    });
    return f;
}

window.onload = function () {
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
        .then((response) => openFile("include/footer.html"))
        .then((response) => {
            const footerHTML = response;
            const footer = document.querySelector("#footer");
            footer.insertAdjacentHTML("afterbegin", footerHTML);
        });

    let castboxes = document.getElementById("content");
    openFile("https://api.8528.space/cast.php")
        .then((response) => {
            var data = JSON.parse(response);
            data.forEach(function (elm) {
                console.table(elm);
                var div = document.createElement('div');
                div.className = 'cast_box';
                div.innerHTML = '<div class="cast_img"><a href="cast_detail.html?id=' + elm["id"] + '"><img src="' + elm["アイコン"] + '" class="cast_icon"></a></div><div class="cast_name">' + elm["名前"] + '</div>';
                castboxes.appendChild(div);
            });
        })
        .then(() => {
            const loader = document.getElementById('loader');
            loader.classList.add('loaded');
        }).catch((e) => console.log(e));

}