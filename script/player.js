class Player {
    constructor (){
        this.positionX = 50;
        this.positionY = 50;
        this.width = 20;
        this.height = 20;
        this.domElm = null;

        this.createDomElm();
    };

createDomElm(){
    this.domElm = document.createElement("div");
    this.domElm.setAttribute("class", "player");
    this.domElm.style.height = this.height + "vh";
    this.domElm.style.width = this.width + "vw";
    this.domElm.style.left = this.positionX + "vh";
    this.domElm.style.bottom = this.positionY + "vw";

    const boardElm = document.getElementById("board");
    boardElm.appendChild(this.domElm);
};

moveLeft() {
    if (this.positionX > 0) {
        this.positionX--;
        this.domElm.style.left = this.positionX + "vh";
    }
}
moveRight() {
    if (this.positionX + this.width < 100) {
        this.positionX++;
        this.domElm.style.left = this.positionX + "vw";
    }
}


}