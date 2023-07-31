function minecraft_widget(){
var request = new XMLHttpRequest();
    request.open('GET', 'https://api.8528.space/minecraft.php', true);
    request.onload = function() {
        var data = JSON.parse(this.response);
        innerhtml = `<div><i class="fa-solid fa-cube" style="color: #57b545;"></i> ` + data.online + `/` + data.max + `</div>`;
        widget = document.getElementById('minecraft');
        widget.innerHTML = innerhtml;
        setTimeout(minecraft_widget, 60000);
    }
    request.send();
}
minecraft_widget();