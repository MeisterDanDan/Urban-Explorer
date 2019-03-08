
function start() {
    search = decodeURIComponent(window.location.href.slice(window.location.href.indexOf('?') + 8));
    document.body.style.backgroundImage = "url(\'" + "img/bg/" + search.replace(' ', '') + ".jpg" + "\')";
    document.body.style.backgroundSize = "cover";
    if (search === "new york") {
        document.getElementById("home-tab").innerHTML = "Eintrag für New York hinzufügen";
    } else {
        document.getElementById("home-tab").innerHTML = "Eintrag für " + search.charAt(0).toUpperCase() + search.slice(1) + " hinzufügen";
    }
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

// Funktion um die eingegeben Daten auszulesen und an Firebase zu senden
function addFirebaseEntry(){
    // Grundlegenden Pfad für die Datenbankeinträge erzuegen
    var dataPath = search;
    if (search === "new york") {
        dataPath = "staedte/" + dataPath.replace(/\s/g, '');
    }else{
        dataPath = dataPath.replace(/\s/g, '');
        dataPath = "staedte/" + dataPath.toLowerCase();
    }
    console.log(dataPath);

    // Ausgewählte Kategorie auslesen und Parameter setzen
    var categories = ['sehenswuerdigkeiten', 'restaurants', 'bars'];
    var e = document.getElementById("selectKategorie");
    var catValue = e.options[e.selectedIndex].value;
    var categorieP = categories[catValue];

    // Ausgewählte Tageszeit auslesen und Parameter setzen
    var daytime = document.querySelector('input[name="daytimeRadio"]:checked').value;
    if (daytime === "morgens"){
        morningP="true";
        middayP="false";
        eveningP="false";
    }else if(daytime === "mittags"){
        morningP="false";
        middayP="true";
        eveningP="false";
    }else{
        morningP="false";
        middayP="false";
        eveningP="true";
    }

    // Name auslesen und Parameter setzen
    var nameP = document.getElementById("name").value;
    /*if (name2.value == "" || !isNaN(name2.value)) {
      document.getElementById("name-error2").innerHTML = "Bitte geben Sie Ihren Nachnamen ein";
      return false;
    }*/

    // Informationen auslesen und Parameter setzen
    var infoP = document.getElementById("info").value;

    // Name auslesen und Parameter setzen
    var adressP = document.getElementById("adress").value;

    // Preis auslesen und Parameter setzen
    var priceP = document.getElementById("price").value;

    // Öffnungszeiten auslesen und Parameter setzen
    var openingP = document.getElementById("opening").value;

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

    // Ausgabe der Parameter in der Konsole
    console.log(categorieP);
    console.log(morningP);
    console.log(middayP);
    console.log(eveningP);
    console.log(nameP);
    console.log(infoP);
    console.log(adressP);
    console.log(priceP);
    console.log(openingP);

    // Methodenaufruf zum speichern der Parameter in Firebase
    writeData(categorieP, eveningP, adressP, infoP, middayP, morningP, nameP, openingP, priceP);

    // Nach dem Speichern in Firebase -> Erfolgsmeldung und Weiterleitung zurück zur Suche-Seite
    //alert('Der Eintrag wurde hinzugefügt!');
    //var newURL = "suche.html?search=" + search;
    //document.location.href = newURL;

    // Eintrag an Firebase pushen
    function writeData(categorieP, eveningP, adressP, infoP, middayP, morningP, nameP, openingP, priceP){
        var postData ={
            abends: eveningP,
            adresse: adressP,
            informationen: infoP,
            mittags: middayP,
            morgens: morningP,
            name: nameP,
            oeffnungszeiten: openingP,
            preise: priceP
        };

        // Get a key for a new Post.
        var newPostKey = firebase.database().ref().child(categorieP).push().key;

        // Write the new post's data simultaneously in the posts list and the user's post
        var updates = {};
            updates[dataPath +'/' +categorieP +'/' +newPostKey] = postData;

        return firebase.database().ref().update(updates);
    }

}
