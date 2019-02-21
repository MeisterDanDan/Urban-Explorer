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
          var commit = ["error", "<h3>Reisen ist gut</h3><em>- paul</em>", "<h3>Reisen macht Spaß</h3><em>- paul</em>", "<h3>Reisen ist schön</h3><em>- paul</em>", "<h3>jaja</h3><em>- paul</em>", "<h3>neinnein</h3><em>- paul</em>", "<h3>jup</h3><em>- paul</em>", "<h3>lappen</h3><em>- paul</em>", "<h3>commit</h3><em>- paul</em>", "<h3>jojo</h3><em>- paul</em>", "<h3>Die beste Bildung findet ein gescheiter Mensch auf Reisen.</h3><em>- paul</em>"];

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
