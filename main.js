import * as Classes from './classes.js'

console.log("alive");
var canvas = document.getElementById("gameCanvas");
var player = new Classes.Player(canvas);
// Add click listener
document.getRootNode().addEventListener("click", () =>{
    player.jump();
});
// Listen for up arrow and spacebar
document.getRootNode().addEventListener("keydown", (e) =>{
    if (e.keyCode == 32 || e.keyCode == 38){ 
        player.jump();
    }
});


new Classes.Pear(0, canvas)