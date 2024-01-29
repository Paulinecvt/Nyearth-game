// PLAYER CLASS
class Player {
    constructor (){
        this.positionX = 10;
        this.positionY = 50;
        this.width = 20;
        this.height = 30;
        this.domElm = null;

        this.createDomElm();
    };

    //create element of player
    createDomElm(){
        this.domElm = document.createElement("div");
        this.domElm.setAttribute("class", "player");
        this.domElm.style.height = this.height + "%";
        this.domElm.style.width = this.width + "%";
        this.domElm.style.top = this.positionY+ "%";
        this.domElm.style.left = this.positionX + "%";
        this.domElm.style.transform = "translate(-50%, -50%)";
    
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElm);
    }; 

    //movements
    moveUp(){
        this.positionY-= 10;
    };

    moveDown (){
        this.positionY+= 10;
    };

}; // end of player class


//TRASHES CLASS
class Trashes {
    constructor () {
        this.positionX = 100;
        this.positionY = Math.floor(Math.random() * (100 - this.width + 1));;
        this.width = 20;
        this.height = 20;
        this.domElm = null;

        this.createDomElm();
    };

    // create element of the trashes
    createDomElm(){
        this.domElm = document.createElement("div");
        this.domElm.setAttribute("class", "trash");
        this.domElm.style.width = this.width + "%";
        this.domElm.style.height = this.height + "%"
        this.domElm.style.left = this.positionX + "%";
        this.domElm.style.bottom = this.positionY + "%";
        
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElm);
    };

    // trashes move to left
    moveLeft(){
        this.positionX -= 10;
        this.domElm.style.left = this.positionX + "%";
        if (this.positionX < 0) {
            this.positionX = 0;
        }
    };

    //random position generate
    createAndDisplayObstacles() {
        this.positionY = Math.floor(Math.random() * (100 - this.width + 1));
        obstacle.createDomElm();  
        console.log('trash ' + this.positionY)
    };

    // generate obstacles every 3sec
    setIntervalId = setInterval(() => {
        this.createAndDisplayObstacles();
    }, 3000);

    //move trashes
    moveTrashes() {
        setInterval(() => {
            this.positionX -= 10;
            console.log('trash is moving to '+this.positionX)
        }, 300)
        
    }
}; // end of trash class



// CONST
const player = new Player ();
const obstacle = new Trashes();




// EVENTS
// Move the player
document.addEventListener("keydown", (e) => {
    if (e.code === 'ArrowUp') {
        player.moveUp();
    } else if (e.code === 'ArrowDown') {
        player.moveDown();
    }
    player.domElm.style.top = player.positionY + '%';
});