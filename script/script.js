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
};

// TRASHES CLASS
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


// CONST
const player = new Player ();
const trashes = [];
const playerDiv = document.querySelector('.player');
/*
//generate obstacles 
setInterval(() => {
    const newObstacle = new Trashes();
    trashes.push(newObstacle);
}, 3000);

// move obstacles & detect collision
setInterval(() => {
    trashes.forEach((obstacleInstance) => {

        // 1. move current obstacle
        obstacleInstance.moveDown();
        
        // 2. detect if there's a collision between the current obstacle and the player
        if (player.positionX < obstacleInstance.positionX + obstacleInstance.width &&
            player.positionX + player.width > obstacleInstance.positionX &&
            player.positionY < obstacleInstance.positionY + obstacleInstance.height &&
            player.positionY + player.height > obstacleInstance.positionY) {
            console.log("game over");
            location.href = "gameover.html";
        }

    });
}, 30);

*/

// EVENTS
function direction () {
    playerDiv.addEventListener('keydown', handleKeyDown);
};

function handleKeyDown(event) {
    if (event.key === 'ArrowUp') {
        this.moveTop();
    } else if (event.key === 'ArrowDown') {
        this.moveBottom();
    }
};

function moveTop() {
    if (event.key === 'ArrowUp'){
     player.positionY += 5;  
    };  
};
function moveBottom() {
    if (event.key === 'ArrowDown')
        player.positionY -= 5;
};
