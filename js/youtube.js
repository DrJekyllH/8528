onload = async () => {
//    const res = await fetch("https://www.youtube.com/@nomuranimu2nd");
//console.log(res);
    var request = new XMLHttpRequest();
    request.open('GET', 'https://api.8528.space/youtube.php', true);
    request.onload = function () {
      var data = this.response;
      console.log(data);
    }
    request.send();
}
