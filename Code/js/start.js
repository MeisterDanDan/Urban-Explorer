// Random Zitate und Random Bilder
window.addEventListener("DOMContentLoaded", function() {

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
    //console.log(firebase);

    var database = firebase.database();
    var ref = database.ref('zitate');

    ref.on('value', gotData);

    // Get the Quote from the Firebase Database
    function gotData(data){
        var quotes = data.val();
        var i = quotes.length;

        // Create a random var with the array length
        var randomcom = Math.floor(Math.random() * i);

        // Set the Quote
        document.getElementById("commit").innerHTML = quotes[randomcom];
        document.getElementById("commit").style.WebkitAnimation = "top-fade 2s";
        document.getElementById("commit").style.animation = "top-fade 2s";
        document.getElementById("commit").style.backgroundColor = "rgba(255,255,255,0.5)";
    }


    // Create a random var between 1 and 10
    var random = Math.floor((Math.random() * 10) + 1);

    // Create an Array with the relative paths
    var bgIMG = ["error", "img/bg/amsterdam.jpg", "img/bg/paris.jpg", "img/bg/rom.jpg", "img/bg/berlin.jpg", "img/bg/newyork.jpg", "img/bg/barcelona.jpg", "img/bg/singapur.jpg", "img/bg/porto.jpg", "img/bg/losangeles.jpg", "img/bg/tokyo.jpg"];

    // Create the var for setting the background path
    var bg = "url(\'" + bgIMG[random]+"\')";

    // Set the background with random number and bgIMG Array
    document.body.style.backgroundImage = bg;
    document.body.style.backgroundSize = "cover";
    document.body.style.WebkitAnimation = "fadein 3s";
    document.body.style.animation = "fadein 3s";

}, false);
