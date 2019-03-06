//Generiert Hintergrundbild und Text für Tab beim Laden der Seite Dreamday html
function start() {
    search = decodeURIComponent(window.location.href.slice(window.location.href.indexOf('?') + 8));
    document.body.style.backgroundImage = "url(\'" + "img/bg/" + search.replace(' ', '') + ".jpg" + "\')";
    document.body.style.backgroundSize = "cover";
    if (search === "new york") {
        document.getElementById("home-tab").innerHTML = "Dream Day für New York";
    } else {
        document.getElementById("home-tab").innerHTML = "Dream Day für " + search.charAt(0).toUpperCase() + search.slice(1);
    }
    /*firebase.database().ref("staedte/"+search.replace(' ', '')).once('value', function(snapshot){
        snapshot.forEach(function(kategorie){
         if(kategorie === restaurant){
             snapshot.forEach(function(restaurant){
                 if(restaurant.val().dreamdayMorgens1 === "true"){
                     document.getElementById('nameMorgens1').value = "Name: "+ restaurant.val().name;
                     document.getElementById('informationenMorgens1').value = "Informationen: "+ value = restaurant.val().informationen;
                }
             })
         }
     })
 });*/
}
