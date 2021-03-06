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
            writeHtmlMorgens(element, stadtName);
        });
        mittagsArray.forEach(function (element) {
            writeHtmlMittags(element, stadtName);
        });
        abendsArray.forEach(function (element) {
            writeHtmlAbends(element, stadtName);
        });

        document.getElementById("carousel1").innerHTML = htmlListe1;
        document.getElementById("carousel2").innerHTML = htmlListe2;
        document.getElementById("carousel3").innerHTML = htmlListe3;
    });
}

let counter1=0;

function writeHtmlMorgens(element, stadtName) {
    let name1 = element.name.replace(/ /g,'');

    htmlListe1 += "<div class="+counter1+" id='storeMorgens' onclick='moveToSelected(this)'>"
        + "<img id="+name1.toLowerCase()+"morgen"+" src='' />"
        + '<div id="text">'
        +"<i class='fas fa-times'onClick='removeDiv(this)'></i>"
        + "<h5>"+element.name+"</h5>"
        + "<hr>"
        + "<ul>"
        + '<li>' + "Informationen: " + element.informationen + '</li>'
        + '<li>' + "Adresse: " + element.adresse + '</li>'
        + '<li>' + "Preise: " + element.preise + '</li>'
        + '<li>' + "Öffnungszeiten: " + element.oeffnungszeiten + '</li>'
        + '</ul>'
        + '<button class="speichern" onclick="storeMorgens(this);infoMorgens()">Hinzufügen</button>'
        + '</div>'
        + '</div>';

        firebase.storage().ref(stadtName + "/").child(name1.toLowerCase()+'.jpg').getDownloadURL().then(function(url){ console.log("Die Morgens-URL: " +url);
        document.getElementById(name1.toLowerCase()+"morgen").src = url; });

    counter1++
    if(counter1==4){
        counter1=3;
    }
    else{}
}

let counter2=0;

function writeHtmlMittags(element, stadtName) {
    let name2 = element.name.replace(/ /g,'');

    htmlListe2 += "<div class="+counter2+" id='storeMittags' onclick='moveToSelected(this)'>"
        + "<img id="+name2.toLowerCase()+"mittag"+" src='' />"
        + '<div id="text">'
        +"<i class='fas fa-times'onClick='removeDiv(this)'></i>"
        + "<h5>"+element.name+"</h5>"
        + "<hr>"
        + "<ul>"
        + '<li>' + "Informationen: " + element.informationen + '</li>'
        + '<li>' + "Adresse: " + element.adresse + '</li>'
        + '<li>' + "Preise: " + element.preise + '</li>'
        + '<li>' + "Öffnungszeiten: " + element.oeffnungszeiten + '</li>'
        + '</ul>'
        + '<button class="speichern" onclick="storeMittags(this);infoMittags()">Hinzufügen</button>'
        + '</div>'
        + '</div>';

        firebase.storage().ref(stadtName + "/").child(name2.toLowerCase()+'.jpg').getDownloadURL().then(function(url){ console.log("Die Mittags-URL: " +url);
        document.getElementById(name2.toLowerCase()+"mittag").src = url; });

    counter2++
    if(counter2==4){
        counter2=3;
    }
    else{}
}

let counter3=0;

function writeHtmlAbends(element, stadtName) {
    let name3 = element.name.replace(/ /g,'');

    htmlListe3 += "<div class="+counter3+" id='storeAbends' onclick='moveToSelected(this)'>"
        + "<img id="+name3.toLowerCase()+"abend"+" src='' />"
        + '<div id="text">'
        + "<i class='fas fa-times'onClick='removeDiv(this)'></i>"
        + "<h5>"+element.name+"</h5>"
        + "<hr>"
        + "<ul>"
        + '<li>' + "Informationen: " + element.informationen + '</li>'
        + '<li>' + "Adresse: " + element.adresse + '</li>'
        + '<li>' + "Preise: " + element.preise + '</li>'
        + '<li>' + "Öffnungszeiten: " + element.oeffnungszeiten + '</li>'
        + '</ul>'
        
        + '<button class="speichern" onclick="storeAbends(this);infoAbends()">Hinzufügen</button>'
        + '</div>'
        + '</div>';

        firebase.storage().ref(stadtName + "/").child(name3.toLowerCase()+'.jpg').getDownloadURL().then(function(url){ console.log("Die Abends-URL: " +url);
        document.getElementById(name3.toLowerCase()+"abend").src = url; });

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
    listMorgens.innerHTML+="<div class='box'>"+getMorgens+"</div>";
}

function storeMittags(elem){
    var textMittags = $(elem).parents("#storeMittags").html();
    sessionStorage.setItem("textMittags",textMittags);
    displayMittags(textMittags);
}

function displayMittags(textMittags){
    var listMittags = document.getElementById("content-mittags");
    var getMittags = sessionStorage.getItem("textMittags");
    listMittags.innerHTML+="<div class='box'>"+getMittags+"</div>";
}

function storeAbends(elem){
    var textAbends = $(elem).parents("#storeAbends").html();
    sessionStorage.setItem("textAbends",textAbends);
    displayAbends(textAbends);
}

function displayAbends(textAbends){
    var listAbends = document.getElementById("content-abends");
    var getAbends = sessionStorage.getItem("textAbends");
    listAbends.innerHTML+="<div class='box'>"+getAbends+"</div>";
}

//drucken
function drucken() {
    window.print();
}
//delete
function removeDiv(elem){
    $(elem).parents('div').eq(1).remove();
}

//Erfolgreich hinzugefügt
function infoMorgens (){

   document.getElementById("add1").style.display = "block"; 
    setTimeout(function(){
  document.getElementById("add1").style.display = "none";               
},1500);
    }

function infoMittags (){

   document.getElementById("add2").style.display = "block"; 
    setTimeout(function(){
  document.getElementById("add2").style.display = "none";               
},1500);
    }

function infoAbends (){

   document.getElementById("add3").style.display = "block"; 
    setTimeout(function(){
  document.getElementById("add3").style.display = "none";               
},1500);
    }

$(document).ready(function () {
    $('.suche-box ul li a').click(function (ev) {
        $('.suche-box ul li').removeClass('selected');
        $(ev.currentTarget).parent('li').addClass('selected');
    });
});
