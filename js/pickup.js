let player;
var img_class = "video-thumbnail";
var cont_class = "video-container";

const request = fetch('https://api.8528.space/stream.php?p=1')
.then(response=> response.json())
.then(data=>{
if(data.length > 0){
switch (data[0].status) {
	case "live":
		img_class = "video-thumbnail";
		cont_class = "video-container";
		if (data[0].platform == "Twitch") {
			var plf_icon = '<i class="fa-brands fa-twitch" style="color: #402950;"></i>';
			urlformat = "https://www.twitch.tv/";
		} else {
			var plf_icon = '<i class="fa-brands fa-youtube" style="color: #ff0000;"></i>';
			urlformat = "https://www.youtube.com/watch?v=";
		}
		break;
	case "none":
	default:
		var plf_icon = '<i class="fa-brands fa-youtube style="color: #ff0000;"></i>';
		img_class = "video-thumbnail";
		cont_class = "video-container";
		urlformat = "https://www.youtube.com/watch?v=";
}

var title_alt = data[0].title;
if (data[0].title.length > 48) data[0].title = data[0].title.substr(0, 46) + '…';


let innerHTML = `
<a href="` + urlformat + data[0].vid + `" class="video-link" target="_blank" rel="noopener" title="` + title_alt + `">
<img class="pickup-video-thumnail" src="` + data[0].turl + `"><br>
<div class="video-title">` + data[0].title + `</div></a>
<div class="video-channel"><a href="` + data[0].curl + `" target="_blank" rel="noopener noreferrer">` + plf_icon + ` ` + data[0].name + `</a><span style="margin-left:10rem;">更新: ` + data[0].time + `</span></div>
`;
}else{
innerHTML=`
<div style="width: 384px; height: 216px; border: 1px solid; display:flex; align-items:center; flex-direction: column; overflow:hidden;">
<h1 class="buruburu" style="filter:drop-shadow(5px -1px 2px #808080);">🐥</h1>
<span style="color: transparent;text-shadow: 0 0 10px rgba(0,0,0,1); font-size: 200rem;">𝕏</span>
</div>
<div class="video-title">嵐の前の静けさだっぴ・・・</div>
`;
}

let player = document.getElementById('player');
player.innerHTML = innerHTML;

});

