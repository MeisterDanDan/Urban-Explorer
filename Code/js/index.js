function cursor(){
    document.getElementById("suchBar").focus();
}

function suche(){
    var sucheingabe = document.getElementById("suchBar").value;
    var newURL = "suche.html?search=" + sucheingabe;
    document.location.href = newURL;
}

document.getElementById("suchBar").addEventListener("keyup",function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("suchButton").click();
    }
});
