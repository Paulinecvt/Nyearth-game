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

    moveUp(){
        this.positionY-= 10;
    };

    moveDown (){
        this.positionY+= 10;
    };

};


//TRASHES CLASS
class Trashes {
    constructor (positionX, positionY, width, height) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.width = width;
        this.height = height;
        this.domElm = null;

        this.createDomElm();
    };

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

    moveLeft(){
        this.positionX -= 10;
        this.domElm.style.left = this.positionX + "%";
        if (this.positionX < 0) {
            this.positionX = 0;
        }
    };

    generateObstacle () {
        const positionX = Math.floor(Math.random() * (100 - this.width + 1));
        const positionY = 100;
        const width = 20;
        const height = 20;
        return new Trashes(positionX, positionY, width, height);
    }

    // move obstacles & detect collision
    moveAndDetectCollision (trashes, player) {
        trashes.forEach((obstacleInstance) => {

            // 1. move current obstacle
            obstacleInstance.moveLeft();

            // 2. detect if there's a collision between the current obstacle and the player
            if (player.positionX < obstacleInstance.positionX + obstacleInstance.width &&
                player.positionX + player.width > obstacleInstance.positionX &&
                player.positionY < obstacleInstance.positionY + obstacleInstance.height &&
                player.positionY + player.height > obstacleInstance.positionY) {
                console.log("game over");

            }

        });
    }

};

// CONST
const player = new Player ();
const trashes = [];

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


