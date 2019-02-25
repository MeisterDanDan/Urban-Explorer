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

var db = firebase.firestore();


//random zitate
      window.addEventListener("DOMContentLoaded", function() {
          // Create a random var between 1 and 10
          var randomcom = Math.floor((Math.random() * 10) + 1);
          // Create an Array with the relative paths of the background pictures
          var commit = ["error", "<h3>Reisen ist das beste, ja das einzige Heilmittel gegen Kummer.</h3><em>-Alfred de Musset</em>", "<h3>Zögere nie, weit fortzugehen, hinter alle Meere, alle Grenzen, alle Länder, allen Glaubens.</h3><em>Amin Maalouf</em>", "<h3>Was ist Reisen? Ein Ortswechsel? Keineswegs! Beim Reisen wechselt man seine Meinungen und Vorurteile.</h3><em>-  Anatole France</em>", "<h3>Man entdeckt keine neuen Erdteile, ohne den Mut zu haben, alte Küsten aus den Augen zu verlieren.</h3><em>-  André Gide</em>", "<h3>Eine lange Reise hört nicht am Ziel auf. Ein Stück von uns wird im Geiste immer weiterreisen.</h3><em>-  Andreas Bechstein</em>", "<h3>Das Reisen lehrt Toleranz. </h3><em>- Benjamin Disraeli</em>", "<h3>Wir reisen an weit entfernte Orte um fasziniert die Menschen zu beobachten, die wir daheim zu ignorieren. </h3><em>- Dagobert D. Runes</em>", "<h3>Einmal im Jahr solltest du einen Ort besuchen, an dem du noch nie warst.</h3><em>- Dalai Lama</em>", "<h3>Abenteuer ohne Risiko ist Disneyland.</h3><em>- Doug Coupland</em>", "<h3>Die beste Bildung findet ein gescheiter Mensch auf Reisen.</h3><em>- Johann Wolfgang von Goethe</em>"];

          // Set the background with random number and bgIMG Array
          //document.getElementById('bgID').style.background-image = url("img/paris.jpg");

          document.getElementById("commit").innerHTML = commit[randomcom];
      }, false);

//bg pictures
      window.addEventListener("DOMContentLoaded", function() {
          // Create a random var between 1 and 10
          var random = Math.floor((Math.random() * 10) + 1);
          // Create an Array with the relative paths
          var bgIMG = ["error", "img/bg/amsterdam.jpg", "img/bg/paris.jpg", "img/bg/rom.jpg", "img/bg/berlin.jpg", "img/bg/newyork.jpg", "img/bg/barcelona.jpg", "img/bg/singapur.jpg", "img/bg/porto.jpg", "img/bg/losangeles.jpg", "img/bg/tokyo.jpg"];
          // Create the var for setting the background path
          var bg = "url(\'" + bgIMG[random]+"\')";

          // Set the background with random number and bgIMG Array
          document.body.style.backgroundImage = bg;
          document.body.style.backgroundSize = "cover";

      }, false);
