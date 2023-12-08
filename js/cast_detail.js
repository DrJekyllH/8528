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

    const searchParams = new URLSearchParams(window.location.search);
    let castbox = document.getElementById("content2");
    let name = document.getElementById("name");
    let profile = document.getElementById("profile");
    let intro = document.getElementById("intro");
    let link = document.getElementById("link");
    let video = document.getElementById("video");
    let left = document.getElementById("table_left");
    if (searchParams.get("id")) {
        openFile("https://api.8528.space/cast.php?id=" + searchParams.get("id"))
            .then((response) => {
                let data = JSON.parse(response);
                //console.log(data);
                if (data[1]) {
                    var namae_div = document.createElement('div');
                    namae_div.className = 'name_jp';
                    namae_div.innerHTML = data[1];
                    name.appendChild(namae_div);

                }
                if (data[2]) {
                    let namae_div = document.createElement('div');
                    namae_div.className = 'name_en';
                    namae_div.innerHTML = data[2];
                    name.appendChild(namae_div);
                }
                if (data[8]) {
                    //誕生日
                    let birthday_span = document.createElement('div');
                    birthday_span.className = 'birthday';
                    birthday_span.innerHTML = '誕生日：' + data[8];
                    profile.appendChild(birthday_span);

                }
                if (data[9]) {
                    //身長
                    let height_span = document.createElement('div');
                    height_span.className = 'height';
                    height_span.innerHTML = '身長：' + data[9];
                    profile.appendChild(height_span);

                }
                if (data[7]) {
                    //キャラ色
                    let color_span = document.createElement('div');
                    color_span.className = 'color';
                    color_span.innerHTML = 'カラー：' + data[7] + ' <span class="color-sample" style="background-color:' + data[7] + ';">&nbsp;</span>';
                    profile.appendChild(color_span);
                    let container = document.getElementById("container");
                    container.style.background = "linear-gradient(200deg, " + data[7] + ", #ffffff)";

                }
                if (data[6]) {
                    //推しマーク
                    let mark_span = document.createElement('div');
                    mark_span.className = 'mark';
                    mark_span.innerHTML = 'マーク：' + data[6];
                    profile.appendChild(mark_span);

                }

                if (data[10]) {
                    //ファンネーム
                    let fan_span = document.createElement('div');
                    fan_span.className = 'fan';
                    fan_span.innerHTML = 'ファンネーム：' + data[10];
                    profile.appendChild(fan_span);

                }

                if (data[11]) {
                    //おすすめ動画
                    data[11] = JSON.stringify(data[11]).replace(/"/g, '');
                    //console.log(data[11]);
                    const vid = new URL(data[11]).searchParams;
                    //console.log(vid.get("v"));
                    if (vid.get("v")) {
                        let video_span = document.createElement('div');
                        video_span.className = 'video';
                        video_span.innerHTML = '<iframe width="400" height="225" src="https://www.youtube.com/embed/' + vid.get("v") + '" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
                        video.appendChild(video_span);
                    }

                }

                if (data[12]) {
                    //Youtube
                    let link_span = document.createElement('span');
                    link_span.className = 'links';
                    link_span.innerHTML = '<a href="' + data[12] + '" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-youtube fa-2xl" style="color: #ff0000;"></i> Youtube</a>';
                    link.appendChild(link_span);
                }
                if (data[13]) {
                    //Twitch
                    let link_span = document.createElement('span');
                    link_span.className = 'links';
                    link_span.innerHTML = '<a href="' + data[13] + '" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-twitch fa-2xl" style="color: #6441a5;""></i> Twitch</a>';
                    link.appendChild(link_span);
                }
                if (data[14]) {
                    //X
                    let link_span = document.createElement('span');
                    link_span.className = 'links';
                    link_span.innerHTML = '<a href="' + data[14] + '" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-square-x-twitter fa-2xl" style="color: #000000;"></i> X（旧Twitter）</a>';
                    link.appendChild(link_span);
                }
                if (data[15]) {
                    //ショップ
                    let link_span = document.createElement('span');
                    link_span.className = 'links';
                    link_span.innerHTML = '<a href="' + data[15] + '" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-basket-shopping fa-2xl" style="color: #000000;"></i> ショップ</a>';
                    link.appendChild(link_span);
                }
                if (data[5]) {
                    //紹介文
                    data[5] = JSON.stringify(data[5]).replace(/\\r\\n|\\r|\\n/g, '<br>');
                    data[5] = JSON.parse(data[5]);
                    let intro_div = document.createElement('div');
                    intro_div.className = 'intro';
                    intro_div.innerHTML = data[5];
                    intro.appendChild(intro_div);
                }
                if (data[4]) {
                    var img = new Image();
                    img.onload = function () {
                        const loader = document.getElementById('loader');
                        loader.classList.add('loaded');
                    };
                    img.src = data[4];
                    img.style.width = "100%";
                    img.style.alignSelf = "flex-end";
                    left.appendChild(img);
                    //                   let tachie = document.createElement('img');
                    //                   tachie.src = data[4];
                    //                   tachie.width = 500;
                    //                   left.appendChild(tachie);
                } else {
                    const loader = document.getElementById('loader');
                    loader.classList.add('loaded');
                }

            });
    } else {


    }
    /*     openFile("https://api.8528.space/cast.php")
            .then((response) => {
                var data = JSON.parse(response);
                data.forEach(function (elm) {
                    console.log(elm[1]);
                    var div = document.createElement('div');
                    div.className = 'cast_box';
                    div.innerHTML = '<div class="cast_img"><a href="cast_detail.html?id=kanon_meimi"><img src="' + elm[2] + '" class="cast_icon"></a></div><div class="cast_name">' + elm[1] + '</div>';
                    castboxes.appendChild(div);
                    i = i++;
                    if (i > 4) {
                        castboxes.appendChild(document.createElement('br'));
                        i = 0;
                    }
                });
            }); */

}