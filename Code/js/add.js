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

// Funktion um die Bildvorschau anzuzeigen
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

    // Das Bild mit der FileAPI laden
    try {
        var file = document.querySelector('input[type=file]').files[0];

        // Den passenden Bildnamen generieren
        var fileTerm = nameP.replace(/\s/g, '');
        var fileType = decodeURIComponent(file.name.slice(file.name.indexOf('.')));
        var fileName = fileTerm.toLowerCase() + fileType.toLowerCase();

        document.getElementById("fileError").innerHTML = "";
    } catch (e) {
        console.log(e);
        console.log("Kein Bild Error");
        document.getElementById("fileError").innerHTML = "Bitte ein Bild hochladen";
    } finally {

    }


    // Methodenaufruf zum speichern der Parameter in Firebase
    if(checkValues(categorieP, eveningP, adressP, infoP, middayP, morningP, nameP, openingP, priceP, file)){
        writeData(categorieP, eveningP, adressP, infoP, middayP, morningP, nameP, openingP, priceP);

        // Nach dem Speichern in Firebase -> Erfolgsmeldung und Weiterleitung zurück zur Suche-Seite
        var modal = document.getElementById('myModal');
        modal.style.display = "block";

        setTimeout(function() {
            // Code, der erst nach 1 Sekunde ausgeführt wird
            var newURL = "suche.html?search=" + search;
            document.location.href = newURL;
        }, 1000);
    }else {
        return;
    }

    // Einträge an Firebase Datenbank pushen
    function writeData(categorieP, eveningP, adressP, infoP, middayP, morningP, nameP, openingP, priceP){
        addImage();
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

    // Bild an Firebase Storage pushen
    function addImage(){
        // Die entsprechende Referenz zum Firebase Storage herstellen
        var imgPath = search.toLowerCase();
        var storageRef = firebase.storage().ref(imgPath.replace(/\s/g, '') +"/" +fileName);

        // Bild in Firebase pushen
        storageRef.put(file);
    }
}
