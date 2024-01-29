class Trashes {
    constructor (){
        this.positionX = Math.floor(Math.random() * (100 - this.width + 1));
        this.positionY = 100;
        this.width = 20;
        this.height = 20;
        this.domElm = null;

        this.createDomElm();
    };
    
    createDomElm(){
        this.domElm = document.createElement("div");
        this.domElm.setAttribute("class", "trash");
        this.domElm.style.width = this.width + "vw";
        this.domElm.style.height = this.height + "vh"
        this.domElm.style.left = this.positionX + "vw";
        this.domElm.style.bottom = this.positionY + "vh";
        
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElm);
    };
};