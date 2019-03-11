//Generiert Hintergrundbild und Text für Tab beim Laden der Seite Dreamday html
let htmlListe = '';

function start() {
    search = decodeURIComponent(window.location.href.slice(window.location.href.indexOf('?') + 8));
    document.body.style.backgroundImage = "url(\'" + "img/bg/" + search.replace(' ', '') + ".jpg" + "\')";
    document.body.style.backgroundSize = "cover";
    if (search === "new york") {
        document.getElementById("home-tab").innerHTML = "Dream Day für New York";
    } else {
        document.getElementById("home-tab").innerHTML = "Dream Day für " + search.charAt(0).toUpperCase() + search.slice(1);
    }


    let dreamdayArray = [];
    let databaseEntries = firebase.database().ref("staedte/" + search.replace(' ', ''));
    databaseEntries.on("value", function (snapshot) {
        snapshot.forEach(function (kategorie) {
            Object.keys(kategorie.val()).map((key) => {
                let inhalt = kategorie.val()[key];
                if (inhalt.dreamday) {
                    dreamdayArray.push(inhalt)
                }
            });

        });
        dreamdayArray.sort(compare);
        let iCount = 0;
        let test = 'centralpark.jpg';
        dreamdayArray.forEach(function (element) {
            let sPath = element.name.replace(/ /g,'')
        sPath = sPath.toLowerCase();
        sPath = sPath +'.jpg';
            firebase.storage().ref().child(sPath).getDownloadURL().then(url => {
                console.log(url);
                writeHtml(element, url);
                iCount++;
                if (iCount >= dreamdayArray.length ) {
                    document.getElementById("dreamDay").innerHTML = htmlListe;
                }
            });
        });
        document.getElementById("dreamDay").innerHTML = htmlListe
    })
}

let id;
let i = 0;

function writeHtml(element, url) {
    id = 'dreamDayZeile' + i;
    htmlListe += '<div class="col-md-12 col-xs-12">'
        + '<div class="liste">'
        + "<img src='" + url + "' width=300 height=180/>"
        + "<ul id='" + id + "'>"
        + '<li>' + "Name: " + '<b>' + element.name + '</b>' + '</li>'
        + '<li>' + "Informationen: " + element.informationen + '</li>'
        + '<li>' + "Adresse: " + element.adresse + '</li>'
        + '<li>' + "Preise: " + element.preise + '</li>'
        + '<li>' + "Öffnungszeiten: " + element.oeffnungszeiten + '</li>'
        + '<li>' + '<button onclick="test()">' + "Neue Attraktion Laden" + '</button>' + '</li>'
        + '</ul>'
        + '</div>'
        + '</div>';
    i++
}

function compare(objectA, objectB) {
    if (objectA.dreamday < objectB.dreamday)
        return -1;
    if (objectA.dreamday > objectB.dreamday)
        return 1;
    return 0;
}

function test() {
    alert("test")
}
