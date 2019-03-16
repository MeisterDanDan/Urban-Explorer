//Generiert Hintergrundbild und Text für Tab beim Laden der Seite Dreamday html
let htmlListe = '';
let neuesHtml = '';
search = decodeURIComponent(window.location.href.slice(window.location.href.indexOf('?') + 8));
let stadtName = search.replace(/ /g,'');
stadtName = stadtName.toLowerCase();

function start() {
    document.body.style.backgroundImage = "url(\'" + "img/bg/" + search.replace(' ', '') + ".jpg" + "\')";
    document.body.style.backgroundSize = "cover";
    if (search === "new york") {
        document.getElementById("home-tab").innerHTML = "Dream Day für New York";
    } else {
        document.getElementById("home-tab").innerHTML = "Dream Day für " + search.charAt(0).toUpperCase() + search.slice(1);
    }

    let dreamdayArray = [];
    let databaseEntries = firebase.database().ref("staedte/" + stadtName);
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
                firebase.storage().ref(stadtName + "/").child(sPath).getDownloadURL().then(url => {
                    document.getElementById(name).src = url;
                });
        });
        document.getElementById("dreamDay").innerHTML = htmlListe;

    })
}

let counter=1;

function writeHtml(element) {
    let name = element.name.replace(/ /g,'');
    htmlListe += '<div id="'+counter+'" class="col-md-12 col-xs-12">'
        + '<div class="liste">'
        + "<img id="+name+" src='' width=300 height=180/>"
        + "<ul>"
        + '<b>' + element.name + '</b>'
        + '<li>' + "Informationen: " + element.informationen + '</li>'
        + '<li>' + "Adresse: " + element.adresse + '</li>'
        + '<li>' + "Preise: " + element.preise + '</li>'
        + '<li>' + "Öffnungszeiten: " + element.oeffnungszeiten + '</li>'
        + '<button onclick="austausch('+counter+')";>' + ",," + element.name + "''" +" austauschen" + '</button>'
        + '</ul>'
        + '</div>'
        + '</div>';
    counter++
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
function austausch(stelleAuslöser){
    let neueEinträge = [];
    var min = 0;
    switch (stelleAuslöser) {
        case 1:
            auslöser = 1;
            //Datenbank Restaurants auslesen
            firebase.database().ref("staedte/" + stadtName +"/restaurants").once('value', function(snapshot){
                snapshot.forEach(function(restaurant){
                    if (restaurant.val().morgens == 'true') {
                        neueEinträge.push(restaurant.val());
                    }
                })
             });
             var max = neueEinträge.length;
             var x = Math.floor(Math.random() * (max - min)) + min;
             neuesHtmlSchreiben(neueEinträge[x],auslöser);
             //Bild ersetzen
             let name = neueEinträge[x].name.replace(/ /g,'');;
             sPath = name;
             sPath = sPath.toLowerCase();
             sPath = sPath +'.jpg';
                 firebase.storage().ref(stadtName + "/").child(sPath).getDownloadURL().then(url => {
                     document.getElementById(name).src = url;
                 });
             document.getElementById(1).innerHTML = neuesHtml;
            break;
        case 2:
            auslöser = 2;
            //Datenbank Restaurants auslesen
            firebase.database().ref("staedte/" + stadtName +"/sehenswuerdigkeiten").once('value', function(snapshot){
                snapshot.forEach(function(sehenswuerdigkeit){
                    if (sehenswuerdigkeit.val().morgens == 'true') {
                        neueEinträge.push(sehenswuerdigkeit.val());
                    }
                })
            });
            var max = neueEinträge.length;
            var x = Math.floor(Math.random() * (max - min)) + min;
            neuesHtmlSchreiben(neueEinträge[x],auslöser);
            //Bild ersetzen
            let name2 = neueEinträge[x].name.replace(/ /g,'');;
            let sPath2 = name2;
            sPath2 = sPath2.toLowerCase();
            sPath2 = sPath2 +'.jpg';
             firebase.storage().ref(stadtName + "/").child(sPath2).getDownloadURL().then(url => {
                 document.getElementById(name2).src = url;
             });
             document.getElementById(2).innerHTML = neuesHtml;
            break;
        case 3:
            auslöser = 3;
            //Datenbank Restaurants auslesen
            firebase.database().ref("staedte/" + stadtName +"/restaurants").once('value', function(snapshot){
                snapshot.forEach(function(restaurant){
                    if (restaurant.val().mittags == 'true') {
                        neueEinträge.push(restaurant.val());
                    }
                })
            });
            var max = neueEinträge.length;
            var x = Math.floor(Math.random() * (max - min)) + min;
            neuesHtmlSchreiben(neueEinträge[x],auslöser);
            //Bild ersetzen
            let name3 = neueEinträge[x].name.replace(/ /g,'');;
            let sPath3 = name3;
            sPath3 = sPath3.toLowerCase();
            sPath3 = sPath3 +'.jpg';
             firebase.storage().ref(stadtName + "/").child(sPath3).getDownloadURL().then(url => {
                 document.getElementById(name3).src = url;
             });
             document.getElementById(3).innerHTML = neuesHtml;
            break;
        case 4:
            auslöser = 4;
            //Datenbank Restaurants auslesen
            firebase.database().ref("staedte/" + stadtName +"/sehenswuerdigkeiten").once('value', function(snapshot){
                snapshot.forEach(function(sehenswuerdigkeit){
                    if (sehenswuerdigkeit.val().mittags == 'true') {
                    neueEinträge.push(sehenswuerdigkeit.val());
                    }
                })
            });
            var max = neueEinträge.length;
            var x = Math.floor(Math.random() * (max - min)) + min;
            neuesHtmlSchreiben(neueEinträge[x],auslöser);
            //Bild ersetzen
            let name4 = neueEinträge[x].name.replace(/ /g,'');;
            let sPath4 = name4;
            sPath4 = sPath4.toLowerCase();
            sPath4 = sPath4 +'.jpg';
            firebase.storage().ref(stadtName + "/").child(sPath4).getDownloadURL().then(url => {
                document.getElementById(name4).src = url;
            });
            document.getElementById(4).innerHTML = neuesHtml;
            break;
        case 5:
            auslöser = 5;
            //Datenbank Restaurants auslesen
            firebase.database().ref("staedte/" + stadtName + "/sehenswuerdigkeiten").once('value', function(snapshot){
                snapshot.forEach(function(sehenswuerdigkeit){
                    if (sehenswuerdigkeit.val().abends == 'true') {
                        neueEinträge.push(sehenswuerdigkeit.val());
                    }
                })
            });
            var max = neueEinträge.length;
            var x = Math.floor(Math.random() * (max - min)) + min;
            neuesHtmlSchreiben(neueEinträge[x],auslöser);
            //Bild ersetzen
            let name5 = neueEinträge[x].name.replace(/ /g,'');;
            let sPath5 = name5;
            sPath5 = sPath5.toLowerCase();
            sPath5 = sPath5 +'.jpg';
            firebase.storage().ref(stadtName + "/").child(sPath5).getDownloadURL().then(url => {
                document.getElementById(name5).src = url;
            });
            document.getElementById(5).innerHTML = neuesHtml;
            break;
        case 6:
            auslöser = 6;
            //Datenbank Restaurants auslesen
            firebase.database().ref("staedte/" + stadtName +"/restaurants").once('value', function(snapshot){
                snapshot.forEach(function(restaurant){
                    if (restaurant.val().abends == 'true') {
                        neueEinträge.push(restaurant.val());
                    }
                })
            });
            var max = neueEinträge.length;
            var x = Math.floor(Math.random() * (max - min)) + min;
            neuesHtmlSchreiben(neueEinträge[x],auslöser);
            //Bild ersetzen
            let name6 = neueEinträge[x].name.replace(/ /g,'');;
            let sPath6 = name6;
            sPath6 = sPath6.toLowerCase();
            sPath6 = sPath6 +'.jpg';
            firebase.storage().ref(stadtName + "/").child(sPath6).getDownloadURL().then(url => {
                document.getElementById(name6).src = url;
            });
            document.getElementById(6).innerHTML = neuesHtml;
            break;
        case 7:
            auslöser = 7;
            //Datenbank Restaurants auslesen
            firebase.database().ref("staedte/" + stadtName +"/bars").once('value', function(snapshot){
                snapshot.forEach(function(bar){
                    neueEinträge.push(bar.val());
                })
            });
            var max = neueEinträge.length;
            var x = Math.floor(Math.random() * (max - min)) + min;
            neuesHtmlSchreiben(neueEinträge[x],auslöser);
            //Bild ersetzen
            let name7 = neueEinträge[x].name.replace(/ /g,'');;
            let sPath7 = name7;
            sPath7 = sPath7.toLowerCase();
            sPath7 = sPath7 +'.jpg';
            firebase.storage().ref(stadtName + "/").child(sPath7).getDownloadURL().then(url => {
                document.getElementById(name7).src = url;
            });
            document.getElementById(7).innerHTML = neuesHtml;
            break;
        default:
    }
}

function neuesHtmlSchreiben(element,auslöser){
    let name = element.name.replace(/ /g,'');
    neuesHtml = '<div id="'+auslöser+'" class="col-md-12 col-xs-12">'
        + '<div class="liste">'
        + "<img id="+name+" src='' width=300 height=180/>"
        + "<ul>"
        + '<b>' + element.name + '</b>' 
        + '<li>' + "Informationen: " + element.informationen + '</li>'
        + '<li>' + "Adresse: " + element.adresse + '</li>'
        + '<li>' + "Preise: " + element.preise + '</li>'
        + '<li>' + "Öffnungszeiten: " + element.oeffnungszeiten + '</li>'
        + '<button onclick="austausch('+auslöser+')";>' + ",," + element.name + "''" +" austauschen" + '</button>'
        + '</ul>'
        + '</div>'
        + '</div>';
}
