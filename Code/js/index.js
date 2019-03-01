// Initialize Firebase
/*
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

      }, false);
*/

function suche(){
    console.log("js");
    var sucheingabe = document.getElementById("suchBar").value;
    var newURL = "suche.html?search=" + sucheingabe;
    document.location.href = newURL;
}