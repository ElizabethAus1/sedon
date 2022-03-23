<style>
video{
        transform: scaleX(-1);
        -o-transform: scaleX(-1);
        -ms-transform: scaleX(-1);
        -moz-transform: scaleX(-1);
        -webkit-transform: scaleX(-1);
}
#allow {
    margin-top: 100px;
    background: none repeat scroll 0 0 #e67e22;
    border: 2px solid white;
    color: white;
    font-size: 20px;
    line-height: 40px;
    min-height: 40px;
}
.button {
    background: none repeat scroll 0 0 rgb(98, 172, 21);
    border: medium none;
    border-radius: 2px;
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
    display: none;
    font: 1.25em "Abel",Helvetica,sans-serif;
    outline: medium none;
    padding: 0.75em 1em;
    text-shadow: 0 -1px 0 rgb(91, 129, 17);
}
.button:hover {
    background: none repeat scroll 0 0 rgb(111, 186, 34);
    transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1) 10ms;
}
.button:active {box-shadow: 0 1px 4px 0 rgb(65, 105, 23) inset;}
#button {width: 100%;height: 30px}
.item {
    background: none repeat scroll 0 0 white;
    display: inline-block;
    margin: 20px 10px;
    padding: 10px 0;
    width: 300px;
}
</style>

<h1>Захват видео с камеры</h1>

<div id="allow"> Разрешите использовать камеру  <br/> ( Сверху текущей страницы )</div>

<div class="item">
    <span> video </span>
    <video id="video" width="320" height="240" autoplay="autoplay" ></video>
</div>
<div class="item">
    <span> canvas </span>
    <canvas id="canvas" width="320" height="240" ></canvas>
</div>

<input id="button" type="button" value="Нажми чтобы сделать фото-снимок" />

<script>
    function video_zaxvat() {
        var canvas = document.getElementById('canvas');
        var video = document.getElementById('video');
        var button = document.getElementById('button');
        var allow = document.getElementById('allow');
        var context = canvas.getContext('2d');
        var videoStreamUrl = false;

        // функция которая будет выполнена при нажатии на кнопку захвата кадра
        var captureMe = function () {
            if (!videoStreamUrl) alert('То-ли вы не нажали "разрешить" в верху окна, то-ли что-то не так с вашей видеокамерой');
            // переворачиваем canvas зеркально по горизонтали
            context.translate(canvas.width, 0);
            context.scale(-1, 1);
            // отрисовываем на канвасе текущий кадр видео
            context.drawImage(video, 0, 0, video.width, video.height);
            // получаем data: url изображения c canvas
            var base64dataUrl = canvas.toDataURL('image/png');
            context.setTransform(1, 0, 0, 1, 0, 0); // убираем все кастомные трансформации canvas
            // на этом этапе можно спокойно отправить  base64dataUrl на сервер и сохранить его там как файл
            // но мы добавим эти тестовые снимки в наш пример:
            var img = new Image();
            img.src = base64dataUrl;
            window.document.body.appendChild(img);
        };

        button.addEventListener('click', captureMe);

        // navigator.getUserMedia  и   window.URL.createObjectURL
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        window.URL.createObjectURL = window.URL.createObjectURL || window.URL.webkitCreateObjectURL || window.URL.mozCreateObjectURL || window.URL.msCreateObjectURL;

        // запрашиваем разрешение на доступ к поточному видео камеры
        navigator.getUserMedia({video: true}, function (stream) {
            // разрешение от пользователя получено - скрываем подсказку
            allow.style.display = "none";
            // получаем url поточного видео
            videoStreamUrl = window.URL.createObjectURL(stream);
            // устанавливаем как источник для video
            video.src = videoStreamUrl;
        }, function () {
            console.log('что-то не так с видео или пользователь запретил его использовать');
        });
    }
</script>
