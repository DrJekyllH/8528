onload = async () => {

    const includeHeader = new XMLHttpRequest();
    includeHeader.open("GET", "include/header.html", true);
    includeHeader.onload = function() {    
            const headerHTML = includeHeader.responseText;
            const header = document.querySelector("#header");
            header.insertAdjacentHTML("afterbegin", headerHTML);
            const headerNavLink = document.querySelectorAll('.js-header-nav-link');
            headerNavLink.forEach((targetLink) => {
                if (targetLink.href === location.href) {
                    targetLink.parentElement.classList.add('is-current');
                }
            });     
    };
    includeHeader.send();

    //    const res = await fetch("https://www.youtube.com/@nomuranimu2nd");
    //console.log(res);
    var urlformat = "https://www.youtube.com/watch?v=";
    var img_class = "video-thumbnail";
    var cont_class = "video-container";
    let upcoming = document.getElementsByClassName('upcoming')[0].getElementsByClassName('splide__track')[0].getElementsByClassName('splide__list')[0];
    let live = document.getElementsByClassName('live')[0].getElementsByClassName('splide__track')[0].getElementsByClassName('splide__list')[0];
    let video = document.getElementsByClassName('splide video')[0].getElementsByClassName('splide__track')[0].getElementsByClassName('splide__list')[0];
    let shorts = document.getElementsByClassName('splide shorts')[0].getElementsByClassName('splide__track')[0].getElementsByClassName('splide__list')[0];
    var request = new XMLHttpRequest();
    request.open('GET', 'https://api.8528.space/stream.php?m=getstatus', true);
    request.onload = function() {
        var data = JSON.parse(this.response);

        data.forEach(function(elm) {
            switch (elm.status) {
                case "upcoming":
                    var parentbox = upcoming;
                    var plf_icon = '<i class="fa-brands fa-youtube" style="color: #ff0000;"></i>';
                    img_class = "video-thumbnail";
                    cont_class = "video-container";
                    urlformat = "https://www.youtube.com/watch?v=";
                    break;
                case "shorts":
                    var parentbox = shorts;
                    var plf_icon = '<i class="fa-brands fa-youtube" style="color: #ff0000;"></i>';
                    img_class = "shorts-thumbnail";
                    cont_class = "shorts-container";
                    urlformat = "https://www.youtube.com/shorts/";
                    break;
                case "live":
                    var parentbox = live;
                    img_class = "video-thumbnail";
                    cont_class = "video-container";
                    if (elm.platform == "Twitch") {
                        var plf_icon = '<i class="fa-brands fa-twitch" style="color: #402950;"></i>';
                        urlformat = "https://www.twitch.tv/";
                    } else {
                        var plf_icon = '<i class="fa-brands fa-youtube"></i>';
                        urlformat = "https://www.youtube.com/watch?v=";
                    }
                    break;
                case "none":
                default:
                    var parentbox = video;
                    var plf_icon = '<i class="fa-brands fa-youtube" style="color: #ff0000;"></i>';
                    img_class = "video-thumbnail";
                    cont_class = "video-container";
                    urlformat = "https://www.youtube.com/watch?v=";
            }
            var title_alt = elm.title;
            if (elm.title.length > 48) elm.title = elm.title.substr(0, 46) + '…';

            var div = document.createElement('div');
            div.className = 'splide__slide';
            div.innerHTML = `
<div class="` + cont_class + `">
<a href="` + urlformat + elm.vid + `" class="video-link" target="_blank" rel="noopener" title="` + title_alt + `">
<img class="` + img_class + `" src="` + elm.turl + `"><br>
<div class="video-title">` + elm.title + `</div></a>
<div class="video-channel"><a href="` + elm.curl + `" target="_blank" rel="noopener noreferrer">` + plf_icon + ` ` + elm.name + `</a><span style="margin-left:10rem;">更新: ` + elm.time + `</span></div>
</div>`;
            parentbox.appendChild(div);
        });


        const options = {
            perMove: 1,
            gap: 10,
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
            live_pi.innerHTML = '📦';
        }
        if (upcoming.children.length > 0) {
            new Splide('.upcoming', options).mount();
        } else {
            let upcoming_pi = document.getElementById('upcoming-pi');
            upcoming_pi.innerHTML = '🐣';
        }
        if (video.children.length > 0) {
            new Splide('.video', options).mount();
        } else {
            let video_pi = document.getElementById('video-pi');
            video_pi.innerHTML = '🐥';
        }
        if (shorts.children.length > 0) {
            new Splide('.shorts', options).mount();
        } else {
            let shorts_pi = document.getElementById('shorts-pi');
            shorts_pi.innerHTML = '🐤';
        }
    }
    request.send();

}