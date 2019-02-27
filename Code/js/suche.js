function start(){
    var search = decodeURIComponent(window.location.href.slice(window.location.href.indexOf('?') + 8));
    switch(search) {
        case 'Amsterdam':
            var bg = "url(\'" + "img/bg/amsterdam.jpg" +"\')";
            document.body.style.backgroundImage = bg;
            document.body.style.backgroundSize = "cover";
            document.getElementById("home-tab").innerHTML = "Amsterdam";
        break;
        case 'Dubai':
            var bg = "url(\'" + "img/bg/dubai.jpg" +"\')";
            document.body.style.backgroundImage = bg;
            document.body.style.backgroundSize = "cover";
            document.getElementById("home-tab").innerHTML = "Dubai";
        break;
        case 'New York':
            var bg = "url(\'" + "img/bg/newyork.jpg" +"\')";
            document.body.style.backgroundImage = bg;
            document.body.style.backgroundSize = "cover";
            document.getElementById("home-tab").innerHTML = "New York";
        break;
        case 'Rom':
            var bg = "url(\'" + "img/bg/rom.jpg" +"\')";
            document.body.style.backgroundImage = bg;
            document.body.style.backgroundSize = "cover";
            document.getElementById("home-tab").innerHTML = "Rom";
        break;
        case 'Paris':
            var bg = "url(\'" + "img/bg/paris.jpg" +"\')";
            document.body.style.backgroundImage = bg;
            document.body.style.backgroundSize = "cover";
            document.getElementById("home-tab").innerHTML = "Paris";
        break;
        case 'amsterdam':
            var bg = "url(\'" + "img/bg/amsterdam.jpg" +"\')";
            document.body.style.backgroundImage = bg;
            document.body.style.backgroundSize = "cover";
            document.getElementById("home-tab").innerHTML = "Amsterdam";
        break;
        case 'dubai':
            var bg = "url(\'" + "img/bg/dubai.jpg" +"\')";
            document.body.style.backgroundImage = bg;
            document.body.style.backgroundSize = "cover";
            document.getElementById("home-tab").innerHTML = "Dubai";
        break;
        case 'new york':
            var bg = "url(\'" + "img/bg/newyork.jpg" +"\')";
            document.body.style.backgroundImage = bg;
            document.body.style.backgroundSize = "cover";
            document.getElementById("home-tab").innerHTML = "New York";
        break;
        case 'rom':
            var bg = "url(\'" + "img/bg/rom.jpg" +"\')";
            document.body.style.backgroundImage = bg;
            document.body.style.backgroundSize = "cover";
            document.getElementById("home-tab").innerHTML = "Rom";
        break;
        case 'paris':
            var bg = "url(\'" + "img/bg/paris.jpg" +"\')";
            document.body.style.backgroundImage = bg;
            document.body.style.backgroundSize = "cover";
            document.getElementById("home-tab").innerHTML = "Paris";
        break;
        default:
        // code block
}
}
