//Generiert Hintergrundbild und Text für Tab beim Laden der Seite Tagesplanung html

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
                }
                else if (inhalt.mittags == "true") {
                    mittagsArray.push(inhalt)
                }
                else if (inhalt.abends == "true"){
                  abendsArray.push(inhalt)
                }
              });
          });
        }
}

//carousel

   function moveToSelected(element) {

  if (element == "next") {
    var selected = $(".selected").next();
  } else if (element == "prev") {
    var selected = $(".selected").prev();
  } else {
    var selected = element;
  }

  var next = $(selected).next();
  var prev = $(selected).prev();
  var prevSecond = $(prev).prev();
  var nextSecond = $(next).next();

  $(selected).removeClass().addClass("selected");

  $(prev).removeClass().addClass("prev");
  $(next).removeClass().addClass("next");

  $(nextSecond).removeClass().addClass("nextRightSecond");
  $(prevSecond).removeClass().addClass("prevLeftSecond");

  $(nextSecond).nextAll().removeClass().addClass('hideRight');
  $(prevSecond).prevAll().removeClass().addClass('hideLeft');

}

$('#carousel div').click(function() {
  moveToSelected($(this));
});

$('#prev').click(function() {
  moveToSelected('prev');
});

$('#next').click(function() {
  moveToSelected('next');

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
