export class MovingElement{
    /**
     * 
     * @param {number} height Y location of the pear
     * @param {Element} canvas Game canvas to add the pear to
     */
    constructor(height, canvas){
        this.el = document.createElement("div");
        this.el.classList.add("movingElement");
        this.el.style.top = `${height}px`;
        canvas.appendChild(this.el);
    }


}