function openFile(url) {
    const f = new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.addEventListener('load', (e) => resolve(request.responseText));
        request.send();
    });
    return f;
}

function embedVideo(url) {
    const hostname = urlParser(url).hostname

    const matchesTwitch = url.match(/twitch\.tv\/([^#?/]+)/)
    if (/twitch\.tv$/.test(hostname) && matchesTwitch) {
        return 'https://player.twitch.tv/?channel=' + matchesTwitch[1] + '&autoplay=false'
    }

    if (/(youtube\.com|youtu\.be)$/.test(hostname) && !/\/user\//.test(url) && !/\/channel\//.test(url)) {
        const matches = url.match(/(\/watch\?v=|youtu\.be\/)([^#&?/]+)/)
        if (!matches) return ''
        return 'https://www.youtube.com/embed/' + matches[2]
    }

    if (/(nicovideo\.jp|nico\.ms)$/.test(hostname) && !/live/.test(hostname)) {
        const matches = url.match(/(\/watch\/|nico\.ms\/)([^#&?/]+)/)
        if (!matches) return ''
        return 'https://embed.nicovideo.jp/watch/' + matches[2]
    }
    return ''
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
    let left = document.getElementById("pic");
    if (searchParams.get("id")) {
        openFile("https://api.8528.space/cast.php?id=" + searchParams.get("id"))
            .then((response) => {
                let data = JSON.parse(response);
                //                console.log(data);
                if (data["名前"]) {
                    var namae_div = document.createElement('div');
                    namae_div.className = 'name_jp';
                    namae_div.innerHTML = data["名前"];
                    name.appendChild(namae_div);
                }
                if (data["Name"]) {
                    let namae_div = document.createElement('div');
                    namae_div.className = 'name_en';
                    namae_div.innerHTML = data["Name"];
                    name.appendChild(namae_div);
                }
                if (data["誕生日"]) {
                    //誕生日
                    let birthday_span = document.createElement('div');
                    birthday_span.className = 'birthday';
                    birthday_span.innerHTML = '誕生日：' + data["誕生日"];
                    profile.appendChild(birthday_span);

                }
                if (data["身長"]) {
                    //身長
                    let height_span = document.createElement('div');
                    height_span.className = 'height';
                    height_span.innerHTML = '身長：' + data["身長"];
                    profile.appendChild(height_span);

                }
                if (data["テーマ色（コード）"]) {
                    //キャラ色
                    let iro = "";
                    if (data["テーマ色（日本語）"]) {
                        iro = data["テーマ色（日本語）"];
                    }
                    let color_span = document.createElement('div');
                    color_span.className = 'color';
                    color_span.innerHTML = 'カラー：' + iro + '(' + data["テーマ色（コード）"] + ') <span class="color-sample" style="background-color:' + data["テーマ色（コード）"] + ';">&nbsp;</span>';
                    profile.appendChild(color_span);
                    let container = document.getElementById("container");
                    container.style.background = "linear-gradient(200deg, " + data["テーマ色（コード）"] + ", #ffffff)";

                }
                if (data["推しマーク"]) {
                    //推しマーク
                    let mark_span = document.createElement('div');
                    mark_span.className = 'mark';
                    mark_span.innerHTML = 'マーク：' + data["推しマーク"];
                    profile.appendChild(mark_span);

                }

                if (data["ファンネーム"]) {
                    //ファンネーム
                    let fan_span = document.createElement('div');
                    fan_span.className = 'fan';
                    fan_span.innerHTML = 'ファンネーム：' + data["ファンネーム"];
                    profile.appendChild(fan_span);

                }

                if (data["おすすめ動画（Youtube）"]) {
                    //おすすめ動画
                    data["おすすめ動画（Youtube）"] = JSON.stringify(data["おすすめ動画（Youtube）"]).replace(/"/g, '');
                    //console.log(data[11]);
                    const vid = new URL(data["おすすめ動画（Youtube）"]).searchParams;
                    //console.log(vid.get("v"));
                    if (vid.get("v")) {
                        let video_span = document.createElement('div');
                        video_span.className = 'video';
                        video_span.innerHTML = '<iframe width="400" height="225" src="https://www.youtube.com/embed/' + vid.get("v") + '" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
                        video.appendChild(video_span);
                    }

                }

                if (data["YouTube"]) {
                    //Youtube
                    let link_span = document.createElement('span');
                    link_span.className = 'links';
                    link_span.innerHTML = '<a href="' + data["YouTube"] + '" target="_blank" rel="noopener noreferrer"><img src="images/YouTube_icon.svg" class="brand_logo"> Youtube</a>';
                    link.appendChild(link_span);
                }
                if (data["Twitch"]) {
                    //Twitch
                    let link_span = document.createElement('span');
                    link_span.className = 'links';
                    link_span.innerHTML = '<a href="' + data["Twitch"] + '" target="_blank" rel="noopener noreferrer"><img src="images/TwitchGlitchPurple.svg" class="brand_logo"> Twitch</a>';
                    link.appendChild(link_span);
                }
                if (data["TikTok"]) {
                    //Twitch
                    let link_span = document.createElement('span');
                    link_span.className = 'links';
                    link_span.innerHTML = '<a href="' + data["TickTok"] + '" target="_blank" rel="noopener noreferrer"><img src="images/tiktok-color-icon.svg" class="brand_logo"> TikTok</a>';
                    link.appendChild(link_span);
                }
                if (data["ツイキャス"]) {
                    //Twitch
                    let link_span = document.createElement('span');
                    link_span.className = 'links';
                    link_span.innerHTML = '<a href="' + data["ツイキャス"] + '" target="_blank" rel="noopener noreferrer"><img src="images/twitcasting.svg" class="brand_logo"> ツイキャス</a>';
                    link.appendChild(link_span);
                }
                if (data["X"]) {
                    //X
                    let link_span = document.createElement('span');
                    link_span.className = 'links';
                    link_span.innerHTML = '<a href="' + data["X"] + '" target="_blank" rel="noopener noreferrer"><img src="images/Twitter-X-App-Logo.svg" class="brand_logo"> X（旧Twitter）</a>';
                    link.appendChild(link_span);
                }
                if (data["マシュマロ"]) {
                    //ショップ
                    let link_span = document.createElement('span');
                    link_span.className = 'links';
                    link_span.innerHTML = '<a href="' + data["マシュマロ"] + '" target="_blank" rel="noopener noreferrer"><img src="images/marshmallow_logo.svg" class="brand_logo"> マシュマロ</a>';
                    link.appendChild(link_span);
                }
                if (data["BOOTH"]) {
                    //ショップ
                    let link_span = document.createElement('span');
                    link_span.className = 'links';
                    link_span.innerHTML = '<a href="' + data["BOOTH"] + '" target="_blank" rel="noopener noreferrer"><img src="images/Booth_logo_icon_r.svg" class="brand_logo"> BOOTH</a>';
                    link.appendChild(link_span);
                }
                if (data["FANBOX"]) {
                    //ショップ
                    let link_span = document.createElement('span');
                    link_span.className = 'links';
                    link_span.innerHTML = '<a href="' + data["FANBOX"] + '" target="_blank" rel="noopener noreferrer"><img src="images/fanbox.svg" class="brand_logo"></a>';
                    link.appendChild(link_span);
                }
                if (data["fansfer"]) {
                    //ショップ
                    let link_span = document.createElement('span');
                    link_span.className = 'links';
                    link_span.innerHTML = '<a href="' + data["fansfer"] + '" target="_blank" rel="noopener noreferrer"><img src="images/fansfer.svg" class="brand_logo"></a>';
                    link.appendChild(link_span);
                }
                if (data["ショップ"]) {
                    //ショップ
                    let link_span = document.createElement('span');
                    link_span.className = 'links';
                    link_span.innerHTML = '<a href="' + data["ショップ"] + '" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-basket-shopping fa-xl" style="color: #000000;"></i> ショップ</a>';
                    link.appendChild(link_span);
                }
                if (data["紹介文"]) {
                    //紹介文
                    data["紹介文"] = JSON.stringify(data["紹介文"]).replace(/\\r\\n|\\r|\\n/g, '<br>');
                    data["紹介文"] = JSON.parse(data["紹介文"]);
                    let intro_div = document.createElement('div');
                    intro_div.className = 'intro';
                    intro_div.innerHTML = data["紹介文"];
                    intro.appendChild(intro_div);
                }
                if (data["立ち絵（背景透過）"]) {
                    var img = new Image();
                    img.onload = function () {
                        const loader = document.getElementById('loader');
                        loader.classList.add('loaded');
                    };
                    img.src = data["立ち絵（背景透過）"];
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