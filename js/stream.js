onload = async () => {

    const loader = document.getElementById('loader');
    loader.classList.add('loaded');

let header = getElementById('header');
header.innerHTML = `
<div class="logo">
<a class="nav-logo" href="index.html"><span class="logo-box">📦</span><span class="logo-piyo1">🐣</span><span class="logo-name">#8528p</span></a>
</div>
<div class="pc-nav">
    <ul id="nav">
      <li><a class="js-header-nav-link nav-item" href="index.html">HOME</a></li>
      <li><a class="js-header-nav-link nav-item" href="about.html">ABOUT</a></li>
      <li><a class="js-header-nav-link nav-item" href="streams.html">STREAMS</a></li>
      <li><a class="js-header-nav-link nav-item" href="faq.html">FAQ</a></li>
      <li><a class="js-header-nav-link nav-item" href="terms.html">TERMS</a></li>
      <li><a class="js-header-nav-link nav-item" href="entry.html">ENTRY</a></li>
    </ul>
<script>
const headerNavLink = document.querySelectorAll('.js-header-nav-link');

headerNavLink.forEach((targetLink) => {
  if (targetLink.href === location.href) {
console.log(targetLink.href +"   "+ location.href);
  targetLink.parentElement.classList.add('is-current');
  }
});
</script>
</div>
<div class="sp-nav">
      <input type="checkbox" id="sp-nav-check">
      <label for="sp-nav-check" class="sp-nav-box">
        <span></span>
      </label>
      <div class="sp-nav-content">
        <ul class="sp-nav-list">
          <li class="sp-nav-item">
            <a class="sp-nav-link" href="index.html">HOME</a>
          </li>
          <li class="sp-nav-item">
            <a class="sp-nav-link" href="about.html">ABOUT</a>
          </li>
          <li class="sp-nav-item">
            <a class="sp-nav-link" href="streams.html">STREAMS</a>
          </li>
          <li class="sp-nav-item">
            <a class="sp-nav-link" href="faq.html">FAQ</a>
          </li>
          <li class="sp-nav-item">
            <a class="sp-nav-link" href="terms.html">TERMS</a>
          </li>
          <li class="sp-nav-item">
            <a class="sp-nav-link" href="entry.html">ENTRY</a>
          </li>
        </ul>
      </div>
</div>
<div class="spacer">
</div>
`;

let footer = getElementById('footer');
footer.innerHTML = `
<div id="footer">
運営： ジキル博士の研究室
</div>
`;

includeHeader.send();
includeFooter.send();

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