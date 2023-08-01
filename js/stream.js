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

openFile("https://api.8528.space/stream.php?m=getstatus")
    .then((response) => {

    var urlformat = "https://www.youtube.com/watch?v=";
    var img_class = "video-thumbnail";
    var cont_class = "video-container";
    let upcoming = document.getElementsByClassName('upcoming')[0].getElementsByClassName('splide__track')[0].getElementsByClassName('splide__list')[0];
    let live = document.getElementsByClassName('live')[0].getElementsByClassName('splide__track')[0].getElementsByClassName('splide__list')[0];
    let video = document.getElementsByClassName('splide video')[0].getElementsByClassName('splide__track')[0].getElementsByClassName('splide__list')[0];
    let shorts = document.getElementsByClassName('splide shorts')[0].getElementsByClassName('splide__track')[0].getElementsByClassName('splide__list')[0];
        var data = JSON.parse(response);

    let pi = `
<div style="width: 384px; height: 216px; border: 1px solid; overflow:hidden;position:relative;">
<div style="position: absolute; left:5rem; bottom:5rem; border:1px solid; font-size:12rem; width: 100rem; z-index: -1;">
🐄･-･･･ ･-･ ･-･･ ･-･･ ･･ ---･- ･- -･<br>
🐈･-･･･ ･-- ---- ･･-･･ ･･ ･-･-･<br>
🍎･--- -･ ･ ･･ -･ ･-<br>
🐍･-･･･ - ･･･ ･- ---･- -･･-･<br>
🍊･- ･- ･-･･ -･･-･ --･-<br>
</div>
<div style="position: absolute; right:-80rem; bottom:-150rem; font-size:230rem; text-align: right; z-index: 1;">🐥</div>
</div>
<div class="video-title">嵐の前の静けさだっぴ・・・</div>`;

        data.forEach(function(elm) {
            switch (elm.status) {
                case "upcoming":
                    var parentbox = upcoming;
                    var plf_icon = '<i class="fa-brands fa-youtube" style="color: #ff0000;"></i>';
                    img_class = "video-thumbnail";
                    cont_class = "video-container";
                    urlformat = "https://www.youtube.com/watch?v=";
                    sch = `<span style="position: absolute; top:5rem; left:0rem; background-color: rgba(200,200,200,0.9); padding: 0rem 2rem 0rem 2rem; font-size: 12rem;">` + elm.schedule + ` 予定</span>`;
                    break;
                case "shorts":
                    var parentbox = shorts;
                    var plf_icon = '<i class="fa-brands fa-youtube" style="color: #ff0000;"></i>';
                    img_class = "shorts-thumbnail";
                    cont_class = "shorts-container";
                    urlformat = "https://www.youtube.com/shorts/";
                    sch = "";
                    break;
                case "live":
                    var parentbox = live;
                    img_class = "video-thumbnail";
                    cont_class = "video-container";
                    if (elm.platform == "Twitch") {
                        var plf_icon = '<i class="fa-brands fa-twitch" style="color: #402950;"></i>';
                        urlformat = "https://www.twitch.tv/";
                    } else {
                        var plf_icon = '<i class="fa-brands fa-youtube" style="color: #ff0000;"></i>';
                        urlformat = "https://www.youtube.com/watch?v=";
                    }
                    sch = "";
                    break;
                case "none":
                default:
                    var parentbox = video;
                    var plf_icon = '<i class="fa-brands fa-youtube" style="color: #ff0000;"></i>';
                    img_class = "video-thumbnail";
                    cont_class = "video-container";
                    urlformat = "https://www.youtube.com/watch?v=";
                    sch = "";
            }
            var title_alt = elm.title;
            if (elm.title.length > 48) elm.title = elm.title.substr(0, 46) + '…';

            var div = document.createElement('div');
            div.className = 'splide__slide';
            div.innerHTML = `
<div class="` + cont_class + `">
<a href="` + urlformat + elm.vid + `" class="video-link" target="_blank" rel="noopener" title="` + title_alt + `">
<div><img class="` + img_class + `" src="` + elm.turl + `">
`+ sch +`
</div>
<div class="video-title">` + elm.title + `</div></a>
<div class="video-channel"><a href="` + elm.curl + `" target="_blank" rel="noopener noreferrer">` + plf_icon + ` ` + elm.name + `</a><span style="margin-left:10rem;">更新: ` + elm.time + `</span></div>
</div>`;
            parentbox.appendChild(div);
        });

        const options = {
            perMove: 1,
            gap: 15,
            pagination: false,
            autoWidth: true,
            autoHeight: true,
            updateOnMove: true,
            type: 'loop',
            focus: 0,
            trimSpace: true,
            clones: 0,
            lazyLoad: true
        }

        if (live.children.length > 0) {
            new Splide('.live', options).mount();
        } else {
            let live_pi = document.getElementById('live-pi');
            live_pi.innerHTML = pi;
        }
        if (upcoming.children.length > 0) {
            new Splide('.upcoming', options).mount();
        } else {
            let upcoming_pi = document.getElementById('upcoming-pi');
            upcoming_pi.innerHTML = pi;
        }
        if (video.children.length > 0) {
            new Splide('.video', options).mount();
        } else {
            let video_pi = document.getElementById('video-pi');
            video_pi.innerHTML = pi;
        }
        if (shorts.children.length > 0) {
            new Splide('.shorts', options).mount();
        } else {
            let shorts_pi = document.getElementById('shorts-pi');
            shorts_pi.innerHTML = pi;
        }
//    }

})
.then(()=>{
    const loader = document.getElementById('loader');
    loader.classList.add('loaded');
}).catch((e)=> console.log(e));
