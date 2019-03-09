// Funktion beim Laden der Seite
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

    // Ausgewählte Tageszeiten auslesen und Parameter setzen
    var morningP = document.getElementById("morningCheck").checked;
    var middayP = document.getElementById("middayCheck").checked;
    var eveningP = document.getElementById("eveningCheck").checked;

    // Name auslesen und Parameter setzen
    var nameP = document.getElementById("name").value;

    // Informationen auslesen und Parameter setzen
    var infoP = document.getElementById("info").value;

    // Name auslesen und Parameter setzen
    var adressP = document.getElementById("adress").value;

    // Preis auslesen und Parameter setzen
    var priceP = document.getElementById("price").value;

    // Öffnungszeiten auslesen und Parameter setzen
    var openingP = document.getElementById("opening").value;

    // Methodenaufruf zum speichern der Parameter in Firebase
    if(checkValues()){
        writeData(categorieP, eveningP, adressP, infoP, middayP, morningP, nameP, openingP, priceP);

        // Nach dem Speichern in Firebase -> Erfolgsmeldung und Weiterleitung zurück zur Suche-Seite
        alert('Der Eintrag wurde hinzugefügt!');
        setTimeout(function() {
            // Code, der erst nach 2 Sekunden ausgeführt wird
            var newURL = "suche.html?search=" + search;
            document.location.href = newURL;
        }, 1000);
    }else {
        return;
    }

    // Validation der eingegeben Werte
    function checkValues(){
        // Kategorie prüfen
        if (categorieP === undefined) {
            console.log("Kategorie Error");
            document.getElementById("categorieError").innerHTML = "Bitte Kategorie auswählen";
            return false;
        }else{
            document.getElementById("categorieError").innerHTML = "";
        }

        // Tageszeit prüfen
        if (morningP == false && middayP == false && eveningP == false) {
            console.log("Tageszeit Error");
            document.getElementById("daytimeError").innerHTML = "Bitte passende Tageszeit(en) auswählen";
            return false;
        }else{
            document.getElementById("daytimeError").innerHTML = "";
        }

        // Name prüfen
        if (nameP == '' || !isNaN(nameP)) {
            console.log("Name Error");
            document.getElementById("nameError").innerHTML = "Bitte geben Sie den Namen ein";
            return false;
        }else{
            document.getElementById("nameError").innerHTML = "";
        }

        // Informationen prüfen
        if (infoP == "" || !isNaN(infoP)) {
            console.log("Information Error");
            document.getElementById("informationError").innerHTML = "Bitte geben Sie eine Information ein";
            return false;
        }else{
            document.getElementById("informationError").innerHTML = "";
        }

        // Adresse prüfen
        if (adressP == "" || !isNaN(adressP)) {
            console.log("Adresse Error");
            document.getElementById("adressError").innerHTML = "Bitte geben Sie eine Adresse ein";
            return false;
        }else{
            document.getElementById("adressError").innerHTML = "";
        }

        // Preis prüfen
        if (priceP == "" || !isNaN(priceP)) {
            console.log("Preis Error");
            document.getElementById("priceError").innerHTML = "Bitte geben Sie eine Preisklasse ein";
            return false;
        }else{
            document.getElementById("priceError").innerHTML = "";
        }

        // Öffnungszeiten prüfen
        if (openingP == "" || !isNaN(openingP)) {
            console.log("Öffnungszeit Error");
            document.getElementById("openingError").innerHTML = "Bitte geben Sie die Öffnungszeiten ein";
            return false;
        }else{
            document.getElementById("openingError").innerHTML = "";
        }

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

        // Methode mit positivem Rückgabewert verlassen
        return true;
    }

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
