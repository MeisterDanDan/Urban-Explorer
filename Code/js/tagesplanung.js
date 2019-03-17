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

function storeMorgens(){
    
    var textMorgens = document.getElementById("storeMorgens").innerHTML;

    sessionStorage.setItem("textMorgens",textMorgens);
 
    displayMorgens(textMorgens);
}
    
function displayMorgens(textMorgens){
    var listMorgens = document.getElementById("content-morgens");
    var getMorgens = sessionStorage.getItem("textMorgens");
    listMorgens.innerHTML+="<div class='box'>"+getMorgens+"<button id='delete' onclick='delete(this)'>Löschen</button></div>";
}

function storeMittags(){
    var textMittags = document.getElementById("storeMittags").innerHTML;

    sessionStorage.setItem("textMittags",textMittags);
    
    displayMittags(textMittags);
}
    
function displayMittags(textMittags){
    var listMittags = document.getElementById("content-mittags");
    var getMittags = sessionStorage.getItem("textMittags");
    listMittags.innerHTML+="<div class='box'>"+getMittags+"<button id='delete' onclick='delete(this)'>Löschen</button></div>";
}

function storeAbends(){
    var textAbends = document.getElementById("storeAbends").innerHTML;

    sessionStorage.setItem("textAbends",textAbends);
    
    displayAbends(textAbends);
}
    
function displayAbends(textAbends){
    var listAbends = document.getElementById("content-abends");
    var getAbends = sessionStorage.getItem("textAbends");
    listAbends.innerHTML+="<div class='box'>"+getAbends+"<button id='delete' onclick='delete(this)'>Löschen</button></div>";
}

//drucken
function drucken() {
    window.print();
}

//delete

















