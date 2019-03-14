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

    let stadtName = search.replace(' ', '')
    let dreamdayArray = [];
    let databaseEntries = firebase.database().ref("staedte/" + stadtName.toLowerCase());
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
        dreamdayArray.forEach(function (element) {
            writeHtml(element);
        });
        dreamdayArray.forEach(function (element) {
            let name = element.name.replace(/ /g,'');
            let sPath = name;
            sPath = sPath.toLowerCase();
            sPath = sPath +'.jpg';
                firebase.storage().ref().child(sPath).getDownloadURL().then(url => {
                    console.log(url);
                    document.getElementById(name).src = url;
                });
        });
        document.getElementById("dreamDay").innerHTML = htmlListe;

    })
}

let id;
let i = 0;

function writeHtml(element) {
    id = 'dreamDayZeile' + i;
    let name = element.name.replace(/ /g,'');
    htmlListe += '<div class="col-md-12 col-xs-12">'
        + '<div class="liste">'
        + "<img id="+name+" src='' width=300 height=180/>"
        + "<ul id='" + element.dreamday + "'>"
        + '<b>' + element.name + '</b>' + '</li>'
        + '<li>' + "Informationen: " + element.informationen + '</li>'
        + '<li>' + "Adresse: " + element.adresse + '</li>'
        + '<li>' + "Preise: " + element.preise + '</li>'
        + '<li>' + "Öffnungszeiten: " + element.oeffnungszeiten + '</li>'
        + '<li>' + '<button onclick="austausch(id)">' + ",," + element.name + "''" +" austauschen" + '</button>' + '</li>'
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

function drucken() {
    window.print();
}
function austausch(id){
    console.log(id);
}
