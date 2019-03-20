//Generiert Hintergrundbild und Text für Tab beim Laden der Seite Tagesplanung html
let htmlListe1 = '';
let htmlListe2 = '';
let htmlListe3 = '';
function start() {

    search = decodeURIComponent(window.location.href.slice(window.location.href.indexOf('?') + 8));

    let stadtName = search.replace(/ /g,'');

    stadtName = stadtName.toLowerCase();

    document.body.style.backgroundImage = "url(\'" + "img/bg/" + search.replace(' ', '') + ".jpg" + "\')";

    document.body.style.backgroundSize = "cover";

    if (search === "new york") {

        document.getElementById("home-tab").innerHTML = "Tagesplanung für New York";

    } else {

        document.getElementById("home-tab").innerHTML = "Tagesplanung für " + search.charAt(0).toUpperCase() + search.slice(1);

    }

    let morgensArray = [];
    let mittagsArray = [];
    let abendsArray = [];
    let databaseEntries = firebase.database().ref("staedte/" + stadtName );
    databaseEntries.on("value", function (snapshot) {
        snapshot.forEach(function (kategorie) {
            Object.keys(kategorie.val()).map((key) => {
                let inhalt = kategorie.val()[key];
                if (inhalt.morgens == "true") {
                    morgensArray.push(inhalt)
                }else{}
                if (inhalt.mittags == "true") {
                    mittagsArray.push(inhalt)
                }else{}
                if (inhalt.abends == "true"){
                  abendsArray.push(inhalt)
                }else{}
              });
          });
        morgensArray.forEach(function (element) {
            writeHtmlMorgens(element);
        });
        mittagsArray.forEach(function (element) {
            writeHtmlMittags(element);
        });
        abendsArray.forEach(function (element) {
            writeHtmlAbends(element);
        });
        morgensArray.forEach(function (element) {
            let name1 = element.name.replace(/ /g,'');
            let sPath1 = name1;
            sPath1 = sPath1.toLowerCase();
            sPath1 = sPath1 +'.jpg';
                firebase.storage().ref(stadtName + "/").child(sPath1).getDownloadURL().then(url => {
                    document.getElementById(name1).src = url;
                });
        });

        mittagsArray.forEach(function (element) {
            let name2 = element.name.replace(/ /g,'');
            let sPath2 = name2;
            sPath2 = sPath2.toLowerCase();
            sPath2 = sPath2 +'.jpg';
                firebase.storage().ref(stadtName + "/").child(sPath2).getDownloadURL().then(url => {
                    document.getElementById(name2).src = url;
                });
        });

        abendsArray.forEach(function (element) {
            let name3 = element.name.replace(/ /g,'');
            let sPath3= name3;
            sPath3 = sPath3.toLowerCase();
            sPath3 = sPath3 +'.jpg';
                firebase.storage().ref(stadtName + "/").child(sPath3).getDownloadURL().then(url => {
                    document.getElementById(name3).src = url;
                });
        });


        document.getElementById("carousel1").innerHTML = htmlListe1;
        document.getElementById("carousel2").innerHTML = htmlListe2;
        document.getElementById("carousel3").innerHTML = htmlListe3;
        })

}

let counter1=0;

function writeHtmlMorgens(element) {
  let name1 = element.name.replace(/ /g,'');
    htmlListe1 += "<div class="+counter1+" id='storeMorgens' onclick='moveToSelected(this)'>"
        + "<img id="+name1+" src='' />"
        + '<div id="text">'
        + "<h5>"+element.name+"</h5>"
        + "<hr>"
        + "<ul>"
        + '<li>' + "Informationen: " + element.informationen + '</li>'
        + '<li>' + "Adresse: " + element.adresse + '</li>'
        + '<li>' + "Preise: " + element.preise + '</li>'
        + '<li>' + "Öffnungszeiten: " + element.oeffnungszeiten + '</li>'
        + '</ul>'
        + '<button id="speichern" onclick="storeMorgens(this);this.disabled=true">Hinzufügen</button>'
        + '</div>'
        + '</div>';
    counter1++
    if(counter1==4){
        counter1=3;
    }
    else{}
}

let counter2=0;

function writeHtmlMittags(element) {
  let name2 = element.name.replace(/ /g,'');
    htmlListe2 += "<div class="+counter2+" id='storeMittags' onclick='moveToSelected(this)'>"
        + "<img id="+name2+" src='' />"
        + '<div id="text">'
        + "<h5>"+element.name+"</h5>"
        + "<hr>"
        + "<ul>"
        + '<li>' + "Informationen: " + element.informationen + '</li>'
        + '<li>' + "Adresse: " + element.adresse + '</li>'
        + '<li>' + "Preise: " + element.preise + '</li>'
        + '<li>' + "Öffnungszeiten: " + element.oeffnungszeiten + '</li>'
        + '</ul>'
        + '<button id="speichern" onclick="storeMittags(this);this.disabled=true">Hinzufügen</button>'
        + '</div>'
        + '</div>';
    counter2++
    if(counter2==4){
        counter2=3;
    }
    else{}
}

let counter3=0;

function writeHtmlAbends(element) {
  let name3 = element.name.replace(/ /g,'');
    htmlListe3 += "<div class="+counter3+" id='storeAbends' onclick='moveToSelected(this)'>"
        + "<img id="+name3+" src='' />"
        + '<div id="text">'
        + "<h5>"+element.name+"</h5>"
        + "<hr>"
        + "<ul>"
        + '<li>' + "Informationen: " + element.informationen + '</li>'
        + '<li>' + "Adresse: " + element.adresse + '</li>'
        + '<li>' + "Preise: " + element.preise + '</li>'
        + '<li>' + "Öffnungszeiten: " + element.oeffnungszeiten + '</li>'
        + '</ul>'
        + '<button id="speichern" onclick="storeAbends(this);this.disabled=true">Hinzufügen</button>'
        + '</div>'
        + '</div>';
    counter3++
    if(counter3==4){
        counter3=3;
    }
    else{}
}


//carousel

   function moveToSelected(element) {

  if (element == "1") {
    var selected = $("0").next();
  } else if (element == "-1") {
    var selected = $("0").prev();
  } else {
    var selected = element;
  }

  var next = $(selected).next();
  var prev = $(selected).prev();
  var prevSecond = $(prev).prev();
  var nextSecond = $(next).next();

  $(selected).removeClass().addClass("0");

  $(prev).removeClass().addClass("-1");
  $(next).removeClass().addClass("1");

  $(nextSecond).removeClass().addClass("2");
  $(prevSecond).removeClass().addClass("-2");

  $(nextSecond).nextAll().removeClass().addClass('3');
  $(prevSecond).prevAll().removeClass().addClass('-3');

}

$('#carousel div').click(function() {
  moveToSelected($(this));
});

$('-1').click(function() {
  moveToSelected('-1');
});

$('1').click(function() {
  moveToSelected('1');

});



function storeMorgens(elem){

    var textMorgens = $(elem).parents("#storeMorgens").html();

    sessionStorage.setItem("textMorgens",textMorgens);

    displayMorgens(textMorgens);
}

function displayMorgens(textMorgens){
    var listMorgens = document.getElementById("content-morgens");
    var getMorgens = sessionStorage.getItem("textMorgens");
    listMorgens.innerHTML+="<div class='box'>"+getMorgens+"<button id='delete' onClick='removeDiv(this)' >Löschen</button></div>";
}

function storeMittags(elem){
    var textMittags = $(elem).parents("#storeMittags").html();

    sessionStorage.setItem("textMittags",textMittags);

    displayMittags(textMittags);
}

function displayMittags(textMittags){
    var listMittags = document.getElementById("content-mittags");
    var getMittags = sessionStorage.getItem("textMittags");
    listMittags.innerHTML+="<div class='box'>"+getMittags+"<button id='delete' onClick='removeDiv(this)'>Löschen</button></div>";
}

function storeAbends(elem){
    var textAbends = $(elem).parents("#storeAbends").html();

    sessionStorage.setItem("textAbends",textAbends);

    displayAbends(textAbends);
}

function displayAbends(textAbends){
    var listAbends = document.getElementById("content-abends");
    var getAbends = sessionStorage.getItem("textAbends");
    listAbends.innerHTML+="<div class='box'>"+getAbends+"<button id='delete' onClick='removeDiv(this)'>Löschen</button></div>";
}

//drucken
function drucken() {
    window.print();
}
//delete
function removeDiv(elem){
    $(elem).parent('div').remove();
}
