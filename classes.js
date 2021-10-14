export class Player {
    /**
     * Class for the player element;
     * @param {Element} canvas 
     */
    constructor(canvas){
        this.score = 0;
        this.paused = false;
        this.el = document.createElement("div");
        this.el.classList.add("player");
        canvas.appendChild(this.el);
    }

    jump(){
        if (this.el.classList.contains("jumping")) return;
        this.el.classList.add("jumping");
        setTimeout(() => {
            if (this.paused) return;
            this.el.classList.remove("jumping");
        }, 500);
    }

}


export class MovingElement{
    /**
     * Abstract class for elements moving across the screen
     * @param {number} height Y location of the moving element
     * @param {Element} canvas Game canvas to add the moving element to
     * @param {Set} elementSet Set of elements to which this element belongs. Element will be auto deleted after animation end
     */
    constructor(height, canvas, elementSet){
        this.elementSet = elementSet;
        this.el = document.createElement("div");
        this.el.classList.add("movingElement");
        this.el.style.top = `${height}px`;
        this.el.addEventListener('animationend', () => {
            this.Destroy();
        });
        canvas.appendChild(this.el);
        this.elementSet?.add(this);
    }

    /**
     * Process collision with player
     * @param {Player} player 
     */
    ProcessCollision (player){

    }

    Destroy () {
        this.el.remove();
        this.elementSet?.delete(this);
    }
}

export class Pear extends MovingElement {
    /**
     * Create a pear and add it to the canvas
     * 
     * @param {number} height Y location of the pear
     * @param {Element} canvas Game canvas to add the pear to
     * @param {Set} elementSet Set of elements to which this element belongs. Element will be auto deleted after animation end
     */
    constructor(height, canvas, elementSet){
        super(height, canvas, elementSet);
        this.el.classList.add("pear");
        this.worth = 1;
    }

    /**
     * Process pear collision with player
     * @param {Player} player 
     */
     ProcessCollision (player){
        super.ProcessCollision(player);
        this.Destroy();
        player.score += this.worth;
    }
}

export class GigaPear extends Pear {
    constructor(height, canvas, elementSet){
        super(height, canvas, elementSet);
        this.worth = 10;
        this.el.style.filter = "hue-rotate(270deg)";
    }
}

export class Gavel extends MovingElement {
    /**
     * Create a gavel obstacle, which the player must avoid
     * @param {number} height 
     * @param {Element} canvas 
     * @param {Set} elementSet 
     */
    constructor(height, canvas, elementSet, gameState){
        super(height, canvas, elementSet);
        this.el.classList.add("gavel");
    }

    /**
     * Process gavel collision with player
     * @param {Player} player 
     */
     ProcessCollision (player){
        super.ProcessCollision(player);
        return true;
    }
}