
function start() {
    search = decodeURIComponent(window.location.href.slice(window.location.href.indexOf('?') + 8));
    document.body.style.backgroundImage = "url(\'" + "img/bg/" + search.replace(' ', '') + ".jpg" + "\')";
    document.body.style.backgroundSize = "cover";
    if (search === "new york") {
        document.getElementById("home-tab").innerHTML = "Eintrag für New York hinzufügen";
    } else {
        document.getElementById("home-tab").innerHTML = "Eintrag für " + search.charAt(0).toUpperCase() + search.slice(1) + " hinzufügen";
    }

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAlsu8WQwzfgwHy8k--CnnaXO2xYZ-B0yc",
        authDomain: "urban-explorer-f661d.firebaseapp.com",
        databaseURL: "https://urban-explorer-f661d.firebaseio.com",
        projectId: "urban-explorer-f661d",
        storageBucket: "urban-explorer-f661d.appspot.com",
        messagingSenderId: "683954933321"
    };

    firebase.initializeApp(config);


    //var database = firebase.database();
    //var ref = database.ref('zitate');
}

// Funktion für das Bild hochladen mit Vorschau
function previewFile(){
    var preview = document.querySelector(".imgSelector"); //selects the query named img
    var file    = document.querySelector('input[type=file]').files[0]; //sames as here
    var reader  = new FileReader();

    reader.onloadend = function () {
        preview.src = reader.result;
    }

    if (file) {
        reader.readAsDataURL(file); //reads the data as a URL
    } else {
        preview.src = "";
    }
}

previewFile();  //calls the function named previewFile()

function addFirebaseEntry(){



    // Ausgewählte Kategorie auslesen
    var e = document.getElementById("selectKategorie");
    var kategorie = e.options[e.selectedIndex].text;

    // Ausgewählte Tageszeit auslesen
    var tageszeit = document.querySelector('input[name="daytimeRadio"]:checked').value;

    // Name auslesen
    var name = document.getElementById("name").value;

    // Name auslesen
    var info = document.getElementById("info").value;

    // Name auslesen
    var adress = document.getElementById("adress").value;

    // Name auslesen
    var price = document.getElementById("price").value;

    // Name auslesen
    var opening = document.getElementById("opening").value;

    // Name auslesen
    var tips = document.getElementById("tips").value;


    //validation
    /*
      var name= document.querySelector("#employeeName");
      if (name.value == "" || !isNaN(name.value)) {
        document.getElementById("name-error").innerHTML = "Bitte geben Sie Ihren Vornamen ein";
        return false;
      }

      else{
        document.getElementById("name-error").innerHTML = "";
      }
      var name2= document.querySelector("#employeeName2");
     if (name2.value == "" || !isNaN(name2.value)) {
       document.getElementById("name-error2").innerHTML = "Bitte geben Sie Ihren Nachnamen ein";
       return false;
     }
     else{
       document.getElementById("name-error2").innerHTML = "";
     }

      var tel= document.querySelector("#employeePhone");
      if (tel.value == "" || isNaN(tel.value)){
        document.getElementById("tel-error").innerHTML = "Bitte geben Sie Ihre Telefonnummer ein";
        return false;
      }

      else{
        document.getElementById("tel-error").innerHTML = "";
      }

      var email= document.querySelector("#employeeMail");
      if (email.value == "" || email.value.indexOf("@") <= 0){
        document.getElementById("email-error").innerHTML = "Bitte geben Sie Ihre Emailadresse ein";
        return false;
      }

      else{
        document.getElementById("email-error").innerHTML = "";
      }
      var stellenbezeichnung= document.querySelector("#employeeJobTitle");
      if (stellenbezeichnung.value == ""){
        stellenbezeichnung.value = "-";
      }
      else{

      }
      var raum= document.querySelector("#employeeRoom");
      if (raum.value ==""){
        raum.value = "-";
      }
      else{
      }
    */

    //Ausgabe aller  Daten in der Konsole
    console.log(kategorie);
    console.log(tageszeit);
    console.log(name);
    console.log(info);
    console.log(adress);
    console.log(price);
    console.log(opening);
    console.log(tips);
    console.log(firebase);
    // Weiterleitung bei erfolgreichem Speichern auf die "Suche Seite" der entsprechenden Stadt
    /*
    if(true){
        alert('Der Eintrag wurde hinzugefügt!');
        var newURL = "suche.html?search=" + search;
        document.location.href = newURL;
    }
    */
}
