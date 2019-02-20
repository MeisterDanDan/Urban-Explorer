// Start methode when DOM is loaded
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
