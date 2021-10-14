export class Player {
    /**
     * Class for the player element;
     * @param {Element} canvas 
     */
    constructor(canvas){
        this.el = document.createElement("div");
        this.el.classList.add("player");
        canvas.appendChild(this.el);
    }

    jump(){
        if (this.el.classList.contains("jumping")) return;
        this.el.classList.add("jumping");
        setTimeout(() => {
            this.el.classList.remove("jumping");
        }, 300);
    }

}


export class MovingElement{
    /**
     * Abstract class for elements moving across the screen
     * @param {number} height Y location of the moving element
     * @param {Element} canvas Game canvas to add the moving element to
     */
    constructor(height, canvas){
        this.el = document.createElement("div");
        this.el.classList.add("movingElement");
        this.el.style.top = `${height}px`;
        this.el.addEventListener('animationend', () => {
            this.el.remove();
        })
        canvas.appendChild(this.el);
    }
}

export class Pear extends MovingElement {
    /**
     * Create a pear and add it to the canvas
     * 
     * @param {number} height Y location of the pear
     * @param {Element} canvas Game canvas to add the pear to
     */
    constructor(height, canvas){
        super(height, canvas);
        this.el.classList.add("pear");
    }
}