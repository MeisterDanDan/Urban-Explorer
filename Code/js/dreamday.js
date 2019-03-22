//Generiert Hintergrundbild und Text für Tab beim Laden der Seite Dreamday html
let htmlListe = '';
let neuesHtml = '';
search = decodeURIComponent(window.location.href.slice(window.location.href.indexOf('?') + 8));
let stadtName = search.replace(/ /g,'');
stadtName = stadtName.toLowerCase();
let prüfungDoppelt = [];

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
            prüfungDoppelt.push(element);
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
        + '<button onclick="austausch(\'' + counter + '\',\'' + element.name + '\')";>' + ",," + element.name + "''" +" austauschen" + '</button>'
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
function austausch(stelleAuslöser, name){
    let neueEinträge = [];
    var min = 0;
    let nameAltesElement = name;
    switch (stelleAuslöser) {
        case "1":
            auslöser = 1;
            //Datenbank Restaurants auslesen
            firebase.database().ref("staedte/" + stadtName +"/restaurants").once('value', function(snapshot){
                snapshot.forEach(function(restaurant){
                    if (restaurant.val().morgens == 'true') {
                        neueEinträge.push(restaurant.val());
                    }
                })
             });
            for(let b=0; b<neueEinträge.length;b++){
                 if(neueEinträge[b].name == nameAltesElement){
                     neueEinträge.splice(b,1);
                     break;
                 }
             }
             for(let b=0; b<prüfungDoppelt.length;b++){
                  if(prüfungDoppelt[b].name == nameAltesElement){
                      prüfungDoppelt.splice(b,1);
                      break;
                  }
              }
             let neueAnzeige = arrayZusammenführer(neueEinträge, prüfungDoppelt, nameAltesElement);
             var max = neueAnzeige.length;
             var x = Math.floor(Math.random() * (max - min)) + min;
             prüfungDoppelt.push(neueAnzeige[x]);
             neuesHtmlSchreiben(neueAnzeige[x],auslöser);
             //Bild ersetzen
             let name = neueAnzeige[x].name.replace(/ /g,'');
             sPath = name;
             sPath = sPath.toLowerCase();
             sPath = sPath +'.jpg';
                 firebase.storage().ref(stadtName + "/").child(sPath).getDownloadURL().then(url => {
                     document.getElementById(name).src = url;
                 });
             document.getElementById(1).innerHTML = neuesHtml;
            break;
        case "2":
            auslöser = 2;
            //Datenbank Restaurants auslesen
            firebase.database().ref("staedte/" + stadtName +"/sehenswuerdigkeiten").once('value', function(snapshot){
                snapshot.forEach(function(sehenswuerdigkeit){
                    if (sehenswuerdigkeit.val().morgens == 'true') {
                        neueEinträge.push(sehenswuerdigkeit.val());
                    }
                })
            });
            for(let b=0; b<neueEinträge.length;b++){
                 if(neueEinträge[b].name == nameAltesElement){
                     neueEinträge.splice(b,1);
                     break;
                 }
             }
             for(let b=0; b<prüfungDoppelt.length;b++){
                  if(prüfungDoppelt[b].name == nameAltesElement){
                      prüfungDoppelt.splice(b,1);
                      break;
                  }
              }
             let neueAnzeige2 = arrayZusammenführer(neueEinträge, prüfungDoppelt, nameAltesElement);
             var max = neueAnzeige2.length;
             var x = Math.floor(Math.random() * (max - min)) + min;
             prüfungDoppelt.push(neueAnzeige2[x]);
             neuesHtmlSchreiben(neueAnzeige2[x],auslöser);
            //Bild ersetzen
            let name2 = neueAnzeige2[x].name.replace(/ /g,'');;
            let sPath2 = name2;
            sPath2 = sPath2.toLowerCase();
            sPath2 = sPath2 +'.jpg';
             firebase.storage().ref(stadtName + "/").child(sPath2).getDownloadURL().then(url => {
                 document.getElementById(name2).src = url;
             });
             document.getElementById(2).innerHTML = neuesHtml;
            break;
        case "3":
            auslöser = 3;
            //Datenbank Restaurants auslesen
            firebase.database().ref("staedte/" + stadtName +"/restaurants").once('value', function(snapshot){
                snapshot.forEach(function(restaurant){
                    if (restaurant.val().mittags == 'true') {
                        neueEinträge.push(restaurant.val());
                    }
                })
            });
            for(let b=0; b<neueEinträge.length;b++){
                 if(neueEinträge[b].name == nameAltesElement){
                     neueEinträge.splice(b,1);
                     break;
                 }
             }
             for(let b=0; b<prüfungDoppelt.length;b++){
                  if(prüfungDoppelt[b].name == nameAltesElement){
                      prüfungDoppelt.splice(b,1);
                      break;
                  }
              }
             let neueAnzeige3 = arrayZusammenführer(neueEinträge, prüfungDoppelt, nameAltesElement);
             var max = neueAnzeige3.length;
             var x = Math.floor(Math.random() * (max - min)) + min;
             prüfungDoppelt.push(neueAnzeige3[x]);
             neuesHtmlSchreiben(neueAnzeige3[x],auslöser);
            //Bild ersetzen
            let name3 = neueAnzeige3[x].name.replace(/ /g,'');;
            let sPath3 = name3;
            sPath3 = sPath3.toLowerCase();
            sPath3 = sPath3 +'.jpg';
             firebase.storage().ref(stadtName + "/").child(sPath3).getDownloadURL().then(url => {
                 document.getElementById(name3).src = url;
             });
             document.getElementById(3).innerHTML = neuesHtml;
            break;
        case "4":
            auslöser = 4;
            //Datenbank Restaurants auslesen
            firebase.database().ref("staedte/" + stadtName +"/sehenswuerdigkeiten").once('value', function(snapshot){
                snapshot.forEach(function(sehenswuerdigkeit){
                    if (sehenswuerdigkeit.val().mittags == 'true') {
                    neueEinträge.push(sehenswuerdigkeit.val());
                    }
                })
            });
            for(let b=0; b<neueEinträge.length;b++){
                 if(neueEinträge[b].name == nameAltesElement){
                     neueEinträge.splice(b,1);
                     break;
                 }
             }
             for(let b=0; b<prüfungDoppelt.length;b++){
                  if(prüfungDoppelt[b].name == nameAltesElement){
                      prüfungDoppelt.splice(b,1);
                      break;
                  }
              }
             let neueAnzeige4 = arrayZusammenführer(neueEinträge, prüfungDoppelt, nameAltesElement);
             var max = neueAnzeige4.length;
             var x = Math.floor(Math.random() * (max - min)) + min;
             prüfungDoppelt.push(neueAnzeige4[x]);
             neuesHtmlSchreiben(neueAnzeige4[x],auslöser);
            //Bild ersetzen
            let name4 = neueAnzeige4[x].name.replace(/ /g,'');;
            let sPath4 = name4;
            sPath4 = sPath4.toLowerCase();
            sPath4 = sPath4 +'.jpg';
            firebase.storage().ref(stadtName + "/").child(sPath4).getDownloadURL().then(url => {
                document.getElementById(name4).src = url;
            });
            document.getElementById(4).innerHTML = neuesHtml;
            break;
        case "5":
            auslöser = 5;
            //Datenbank Restaurants auslesen
            firebase.database().ref("staedte/" + stadtName + "/sehenswuerdigkeiten").once('value', function(snapshot){
                snapshot.forEach(function(sehenswuerdigkeit){
                    if (sehenswuerdigkeit.val().abends == 'true') {
                        neueEinträge.push(sehenswuerdigkeit.val());
                    }
                })
            });
            for(let b=0; b<neueEinträge.length;b++){
                 if(neueEinträge[b].name == nameAltesElement){
                     neueEinträge.splice(b,1);
                     break;
                 }
             }
             for(let b=0; b<prüfungDoppelt.length;b++){
                  if(prüfungDoppelt[b].name == nameAltesElement){
                      prüfungDoppelt.splice(b,1);
                      break;
                  }
              }
             let neueAnzeige5 = arrayZusammenführer(neueEinträge, prüfungDoppelt, nameAltesElement);
             var max = neueAnzeige5.length;
             var x = Math.floor(Math.random() * (max - min)) + min;
             prüfungDoppelt.push(neueAnzeige5[x]);
             neuesHtmlSchreiben(neueAnzeige5[x],auslöser);
            //Bild ersetzen
            let name5 = neueAnzeige5[x].name.replace(/ /g,'');;
            let sPath5 = name5;
            sPath5 = sPath5.toLowerCase();
            sPath5 = sPath5 +'.jpg';
            firebase.storage().ref(stadtName + "/").child(sPath5).getDownloadURL().then(url => {
                document.getElementById(name5).src = url;
            });
            document.getElementById(5).innerHTML = neuesHtml;
            break;
        case "6":
            auslöser = 6;
            //Datenbank Restaurants auslesen
            firebase.database().ref("staedte/" + stadtName +"/restaurants").once('value', function(snapshot){
                snapshot.forEach(function(restaurant){
                    if (restaurant.val().abends == 'true') {
                        neueEinträge.push(restaurant.val());
                    }
                })
            });
            for(let b=0; b<neueEinträge.length;b++){
                 if(neueEinträge[b].name == nameAltesElement){
                     neueEinträge.splice(b,1);
                     break;
                 }
             }
             for(let b=0; b<prüfungDoppelt.length;b++){
                  if(prüfungDoppelt[b].name == nameAltesElement){
                      prüfungDoppelt.splice(b,1);
                      break;
                  }
              }
             let neueAnzeige6 = arrayZusammenführer(neueEinträge, prüfungDoppelt, nameAltesElement);
             var max = neueAnzeige6.length;
             var x = Math.floor(Math.random() * (max - min)) + min;
             prüfungDoppelt.push(neueAnzeige6[x]);
             neuesHtmlSchreiben(neueAnzeige6[x],auslöser);
            //Bild ersetzen
            let name6 = neueAnzeige6[x].name.replace(/ /g,'');;
            let sPath6 = name6;
            sPath6 = sPath6.toLowerCase();
            sPath6 = sPath6 +'.jpg';
            firebase.storage().ref(stadtName + "/").child(sPath6).getDownloadURL().then(url => {
                document.getElementById(name6).src = url;
            });
            document.getElementById(6).innerHTML = neuesHtml;
            break;
        case "7":
            auslöser = 7;
            //Datenbank Restaurants auslesen
            firebase.database().ref("staedte/" + stadtName +"/bars").once('value', function(snapshot){
                snapshot.forEach(function(bar){
                    neueEinträge.push(bar.val());
                })
            });
            for(let b=0; b<neueEinträge.length;b++){
                 if(neueEinträge[b].name == nameAltesElement){
                     neueEinträge.splice(b,1);
                     break;
                 }
             }
             for(let b=0; b<prüfungDoppelt.length;b++){
                  if(prüfungDoppelt[b].name == nameAltesElement){
                      prüfungDoppelt.splice(b,1);
                      break;
                  }
              }
             let neueAnzeige7 = arrayZusammenführer(neueEinträge, prüfungDoppelt, nameAltesElement);
             var max = neueAnzeige7.length;
             var x = Math.floor(Math.random() * (max - min)) + min;
             prüfungDoppelt.push(neueAnzeige7[x]);
             neuesHtmlSchreiben(neueAnzeige7[x],auslöser);
            //Bild ersetzen
            let name7 = neueAnzeige7[x].name.replace(/ /g,'');;
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
        + '<button onclick="austausch(\'' + auslöser + '\',\'' + element.name + '\')";>' + ",," + element.name + "''" +" austauschen" + '</button>'
        + '</ul>'
        + '</div>'
        + '</div>';
}

function arrayZusammenführer(neueEinträge, prüfungDoppelt, nameAltesElement){
    let test = new Set();
    let duplicates = [];
    for (var i = 0; i < prüfungDoppelt.length; i++) {
        for (var j= 0; j < neueEinträge.length; j++) {
            if(prüfungDoppelt[i].name === neueEinträge[j].name){

                duplicates.push(neueEinträge[j])
            }
            else{
                test.add(neueEinträge[j]);
            }
        }
    }
    let aEntries = Array.from(test);
    let arrayDub =[];
    for(let k =0; k<aEntries.length;k++){
        arrayDub.push(aEntries[k]);
    }

    for(let k =0; k<duplicates.length;k++){
        var index = aEntries.indexOf(duplicates[k]);
        if(index >=0){
            aEntries.splice(index,1);
        }
    }


    return aEntries;

}
