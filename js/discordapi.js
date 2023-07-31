
function discord_widget(){
var request = new XMLHttpRequest();
    request.open('GET', 'https://api.8528.space/discord.php', true);
    request.onload = function() {
        var data = JSON.parse(this.response);
        innerhtml = `<div><i class="fa-brands fa-discord" style="color: #7289da;"></i> ` + data.online + `</div>`;
        widget = document.getElementById('discord');
        widget.innerHTML = innerhtml;
        setTimeout(discord_widget, 60000);
    }
    request.send();
}
discord_widget();