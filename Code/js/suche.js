let search;
let cities = ['amsterdam', 'dubai', 'new york', 'rom', 'paris'];
search = decodeURIComponent(window.location.href.slice(window.location.href.indexOf('?') + 8));

function start() {
    if (cities.includes(search.toLowerCase())) {
        showTextAndJpg()
    } else {
        document.body.style.backgroundImage = "url(\'" +"img/bg/welt.jpg"+"\')";
        document.body.style.backgroundSize = "cover";
        alert('Diese Stadt ist leider noch nicht vorhanden!');
        document.location.href = 'index.html';
    }
}

function showTextAndJpg() {
    document.body.style.backgroundImage = "url(\'" + "img/bg/" + search.replace(' ', '') + ".jpg" + "\')";
    document.body.style.backgroundSize = "cover";
    if (search === "new york") {
        document.getElementById("home-tab").innerHTML = "New York";
    } else {
        document.getElementById("home-tab").innerHTML = search.charAt(0).toUpperCase() + search.slice(1);
    }
}

// Weiterleitung auf die Seite Tagesplanung
function tagesplanungSeite(){
    var newURL = "tagesplanung.html?search=" + search;
    document.location.href = newURL;
}

// Weiterleitung auf die Seite Dream Day
function dreamdaySeite(){
    var newURL = "dreamday.html?search=" + search;
    document.location.href = newURL;
}

// Weiterleitung auf die Seite Eintrag hinzufügen
function eintragSeite(){
    var newURL = "add.html?search=" + search;
    document.location.href = newURL;
}
