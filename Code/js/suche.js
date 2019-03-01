let search;
let cities = ['amsterdam', 'dubai', 'new york', 'rom', 'paris'];

function start() {
    search = decodeURIComponent(window.location.href.slice(window.location.href.indexOf('?') + 8));
    if (cities.includes(search.toLowerCase())) {
        showTextAndJpg()
    } else {

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
    search = decodeURIComponent(window.location.href.slice(window.location.href.indexOf('?') + 8));
    var newURL = "tagesplanung.html?search=" + search;
    document.location.href = newURL;
}

// Weiterleitung auf die Seite Dream Day
function dreamdaySeite(){
    search = decodeURIComponent(window.location.href.slice(window.location.href.indexOf('?') + 8));
    var newURL = "dreamday.html?search=" + search;
    document.location.href = newURL;
}

// Weiterleitung auf die Seite Eintrag hinzufügen
function eintragSeite(){
    search = decodeURIComponent(window.location.href.slice(window.location.href.indexOf('?') + 8));
    var newURL = "add.html?search=" + search;
    document.location.href = newURL;
}
