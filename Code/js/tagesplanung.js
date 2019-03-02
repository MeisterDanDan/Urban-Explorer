//Generiert Hintergrundbild und Text für Tab beim Laden der Seite Tagesplanung html
function start() {
    search = decodeURIComponent(window.location.href.slice(window.location.href.indexOf('?') + 8));
    document.body.style.backgroundImage = "url(\'" + "img/bg/" + search.replace(' ', '') + ".jpg" + "\')";
    document.body.style.backgroundSize = "cover";
    if (search === "new york") {
        document.getElementById("home-tab").innerHTML = "Eigene Tagesplanung für New York";
    } else {
        document.getElementById("home-tab").innerHTML = "Eigene Tagesplanung für " + search.charAt(0).toUpperCase() + search.slice(1);
    }
}
