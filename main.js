import * as Classes from './classes.js'

console.log("alive");
var canvas = document.getElementById("gameCanvas");
var scoreDisplay = document.getElementById("scoreDisplay");
var player = new Classes.Player(canvas);
var movingElementSet = new Set();
// Add click listener
document.getRootNode().addEventListener("mousedown", () =>{
    player.jump();
});
// Listen for up arrow and spacebar
document.getRootNode().addEventListener("keydown", (e) =>{
    if (e.keyCode == 32 || e.keyCode == 38){ 
        player.jump();
    }
});





// Check collisions every 10 ms
var gameRunning = setInterval(() => {
    let playerHeight = parseInt(window.getComputedStyle(player.el).getPropertyValue("height"));
    let playerWidth = parseInt(window.getComputedStyle(player.el).getPropertyValue("width"));
    let playerLeft = parseInt(window.getComputedStyle(player.el).getPropertyValue("left"));
    let playerTop = parseInt(window.getComputedStyle(player.el).getPropertyValue("top"));
    let playerRight = playerLeft + playerWidth;
    let playerBottom = playerTop + playerHeight;


    // Check collisions with objects
    
    for (let obj of movingElementSet){
        let objWidth = parseInt(window.getComputedStyle(obj.el).getPropertyValue("width"));
        let objHeight = parseInt(window.getComputedStyle(obj.el).getPropertyValue("height"));


        let objTop = parseInt(window.getComputedStyle(obj.el).getPropertyValue("top"));
        let objLeft = parseInt(window.getComputedStyle(obj.el).getPropertyValue("left"));
        let objBottom = objTop + objHeight;
        let objRight = objLeft + objWidth;
        
        if (
            (
                (
                    objTop > playerTop  && // Top of obj below top of player
                    objTop < playerBottom // Top of obj above bottom of player
                ) || 
                (
                    objBottom < playerBottom &&// Bottom of obj above bottom of player
                    objBottom > playerTop // Bottom of obj below top of player
                )
            ) &&
            (
                (
                    objLeft > playerLeft && //left side of obj on right of left side of player
                    objLeft < playerRight // left side of obj on left of right side of player
                ) || 
                (
                    objRight > playerLeft && //right side of obj on right of left side of player
                    objRight < playerRight // right side of obj on left of right side of player
                ) 
            )
        ){
            obj.ProcessCollision(player);
        }

    }
    DisplayScore(player);
}, 10);




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

async function AddPearsContinuously(){
    while (true){
        await sleep(RandomNumberBetween(500, 1500));
        let height = RandomNumberBetween(50, 170);
        console.log(height);
        new Classes.Pear(height, canvas, movingElementSet);
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


AddPearsContinuously();
