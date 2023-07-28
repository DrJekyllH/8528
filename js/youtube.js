onload = async () => {
//    const res = await fetch("https://www.youtube.com/@nomuranimu2nd");
//console.log(res);
    var urlformat = "https://www.youtube.com/watch?v="
    let upcoming = document.getElementsByClassName('upcoming')[0].getElementsByClassName('splide__track')[0].getElementsByClassName('splide__list')[0];
    let live = document.getElementsByClassName('live')[0].getElementsByClassName('splide__track')[0].getElementsByClassName('splide__list')[0];
    let video = document.getElementsByClassName('splide video')[0].getElementsByClassName('splide__track')[0].getElementsByClassName('splide__list')[0];
    let shorts = document.getElementsByClassName('splide shorts')[0].getElementsByClassName('splide__track')[0].getElementsByClassName('splide__list')[0];
    var request = new XMLHttpRequest();
    request.open('GET', 'https://api.8528.space/youtube.php', true);
    request.onload = function () {
      var data = JSON.parse(this.response);
            data.forEach(function(elm){
console.log(elm.status);
switch(elm.status){
case "upcoming":
var parentbox = upcoming;
break;
case "shorts":
urlformat = 'https://www.youtube.com/shorts/';
var parentbox = shorts;
break;
case "live":
var parentbox = live;
break;
case "none":
default:
var parentbox = video;
}
           var div = document.createElement('div');
           div.className = 'splide__slide test';
           div.innerHTML = `
<a href="` +urlformat  + elm.vid + `" target="_blank" rel="noopener noreferrer" ><img class="video-thumbnail" src="` + elm.turl + `" width=240></a>
`;
           parentbox.appendChild(div);
      });


const options = {
  perMove: 1, 
  gap: 3,
  autoWidth: true,
  autoHeight: true,
  updateOnMove: true,
  type: 'loop',
  focus:1,
  trimSpace: true,
  clones: 0
}

if(live.children.length > 0){new Splide( '.live',options ).mount();
}else{
let live_pi = document.getElementById('live-pi');
live_pi.innerHTML = '📦';
} 
if(upcoming.children.length > 0){ new Splide( '.upcoming',options ).mount();
}else{
let upcoming_pi = document.getElementById('upcoming-pi');
upcoming_pi.innerHTML = '🐣';
}
if(video.children.length > 0){ new Splide( '.video',options ).mount();
}else{
let video_pi = document.getElementById('video-pi');
video_pi.innerHTML = '🐥';
}
if(shorts.children.length > 0){ new Splide( '.shorts',options ).mount();
}else{
let shorts_pi = document.getElementById('shorts-pi');
shorts_pi.innerHTML = '🐤';
}
    }
    request.send();




}
