// Validation der gesamten Daten für den Eintrag
function checkValues(categorieP, eveningP, adressP, infoP, middayP, morningP, nameP, openingP, priceP, file){
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

    // Typ des hochzuladenden Bilds prüfen
    if(file.type =="image/jpg" || file.type =="image/png" || file.type =="image/jpeg"){
        document.getElementById("fileError").innerHTML = "";
    }else{
        console.log("Bildformat Error");
        document.getElementById("fileError").innerHTML = "Bitte ein Bild vom Typ .jpg, .jpeg oder .png hochladen";
        return false;
    }

    // Größe des hochzuladenden Bilds in Byte prüfen 
    if(file.size > 1000000){
        console.log("Bildgröße Error");
        document.getElementById("fileError").innerHTML = "Bitte nur Bilder bis max. 1MiB hochladen";
        return false;
    }else{
        document.getElementById("fileError").innerHTML = "";
    }

    // Ausgabe der Parameter in der Konsole
    /*
    console.log(dataPath);
    console.log(categorieP);
    console.log(morningP);
    console.log(middayP);
    console.log(eveningP);
    console.log(nameP);
    console.log(infoP);
    console.log(adressP);
    console.log(priceP);
    console.log(openingP);
    console.log(fileName);
    */
    // Methode mit positivem Rückgabewert verlassen
    return true;
}
