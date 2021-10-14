import * as Classes from './classes.js'

console.log("alive");
var canvas = document.getElementById("gameCanvas");
var scoreDisplay = document.getElementById("scoreDisplay");
var player = new Classes.Player(canvas);
var movingElementSet = new Set();
var gameState = {running: true};
// Add click listener
document.getRootNode().addEventListener("mousedown", () =>{
    if (!gameState.running) location.reload();
    player.jump();
});
// Listen for up arrow and spacebar
document.getRootNode().addEventListener("keydown", (e) =>{
    if (e.keyCode == 32 || e.keyCode == 38){ 
        if (!gameState.running) location.reload();
        player.jump();
    }
});




function touching(d1,d2){
    return (d1.x < d2.x + d2.width  && d1.x + d1.width  > d2.x &&
    d1.y < d2.y + d2.height && d1.y + d1.height > d2.y);
}
var playerHeight = parseInt(window.getComputedStyle(player.el).getPropertyValue("height"));
var playerWidth = parseInt(window.getComputedStyle(player.el).getPropertyValue("width"));

// Check collisions every 16 ms
setInterval(() => {
    if (!gameState.running) return;

    let playerBox = {
        x: parseInt(window.getComputedStyle(player.el).getPropertyValue("left")) ,
        y: parseInt(window.getComputedStyle(player.el).getPropertyValue("top")),
        width: playerWidth,
        height: playerHeight
    }

    // Check collisions with objects
    for (let obj of movingElementSet){
        let objBox = {
            x: parseInt(window.getComputedStyle(obj.el).getPropertyValue("left")),
            y: parseInt(window.getComputedStyle(obj.el).getPropertyValue("top")),
            width: parseInt(window.getComputedStyle(obj.el).getPropertyValue("width")),
            height: parseInt(window.getComputedStyle(obj.el).getPropertyValue("height"))
        }

        if (touching(playerBox, objBox)){
            let collisionResult = obj.ProcessCollision(player);
            if (collisionResult === true){
                StopGame();
            }
        }

    }
    DisplayScore(player);
}, 16);




// Helper methods

/**
 * Get a random integer between min and max
 * @param {Number} min 
 * @param {Number} max 
 */
function RandomNumberBetween(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

function StopGame(){
    gameState.running = false;
    player.el.style.animationPlayState = 'paused';
    player.paused = true;
    for (let obj of movingElementSet){
        obj.el.style.animationPlayState = 'paused';
    }
    player.el.style.backgroundImage = "url(Images/Stop.png)";
}

async function AddPearsContinuously(){

    while (true){
        await sleep(RandomNumberBetween(1500, 2500));
        if (gameState.running === false) return;
        let height = RandomNumberBetween(50, 170);
        if (RandomNumberBetween(1, 20) == 6){
            new Classes.GigaPear(height, canvas, movingElementSet);
        }
        else {
            new Classes.Pear(height, canvas, movingElementSet);
        }
    }
    
}

async function AddGavelsContinously(){
    while (true){
        await sleep(RandomNumberBetween(1750, 3000));
        if (gameState.running === false) return;
        let height = RandomNumberBetween(50, 170);
        new Classes.Gavel(height, canvas, movingElementSet);
        
    }
    
}


/**
 * Display score of player
 * @param {Player} player 
 */
 function DisplayScore(player){
    if (player.score == 1) scoreDisplay.textContent = `${player.score} Kevin Punt`;
    else scoreDisplay.textContent = `${player.score} Kevin Punten`;
}

new Classes.Pear(120, canvas, movingElementSet)
AddPearsContinuously();
AddGavelsContinously();