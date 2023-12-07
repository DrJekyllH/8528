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
    let castboxes = document.getElementById("content");
    openFile("https://api.8528.space/cast.php")
        .then((response) => {
            var data = JSON.parse(response);
            data.forEach(function (elm) {
                console.table(elm);
                var div = document.createElement('div');
                div.className = 'cast_box';
                div.innerHTML = '<div class="cast_img"><a href="cast_detail.html?id=' + elm[0] + '"><img src="' + elm[3] + '" class="cast_icon"></a></div><div class="cast_name">' + elm[1] + '</div>';
                castboxes.appendChild(div);
            });
        });

}