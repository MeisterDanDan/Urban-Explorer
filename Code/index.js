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
  const firestore = firebase.firestore();
  const settings = {timestampsInSnapshots: true};
  firestore.settings(settings);

//get zitat
db.collection("Zitate").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        const list_div = document.getElementById("commit");
        var info ="<h3>"+doc.data().Zitat+"</h3><em>"+doc.data().Autor+"</em>" ;
        list_div.innerHTML = info
    });
});
