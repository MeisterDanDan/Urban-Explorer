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
