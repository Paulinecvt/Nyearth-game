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




// TRASHES CLASS
class Trashes {
    constructor() {
        this.width = 10;
        this.height = 20;
        this.positionX = 100;
        this.positionY = Math.floor(Math.random() * (100 - this.width + 1));
        // this.domElm = null;

        this.createDomElm();
        
    
    };

    // Create element of the trashes
    createDomElm() {
        this.domElm = document.createElement("div");
        this.domElm.setAttribute("class", "trash");
        this.domElm.style.width = this.width + "%";
        this.domElm.style.height = this.height + "%";
        this.domElm.style.left = this.positionX + "%";
        this.domElm.style.bottom = this.positionY + "%";

        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElm);
    };

    // Move trashes to left
    moveLeft() {
        this.positionX -= 10;
        this.domElm.style.left = this.positionX + "%";
    };

    

    // Remove trash
    removeTrash() {
        this.domElm.remove();
        clearInterval(this.moveTrashesInterval);
    };

    
};



// CONST
const player = new Player ();
// CONST
let obstacles = [];




// Create and display obstacles
function createAndDisplayObstacles() {
    const newObstacle = new Trashes();
    obstacles.push(newObstacle);
    console.log('Trash is created from the position ' + newObstacle.positionY);
};

// Move trashes and detect collision
function moveTrashes() {
    setInterval(() => {
        obstacles.forEach((obstacleInstance) => {
            obstacleInstance.moveLeft();

            // Calculate the boundaries of the player and the obstacle
            const obstacleLeft = obstacleInstance.positionX;
            const obstacleRight = obstacleInstance.positionX + obstacleInstance.width;
            const obstacleTop = obstacleInstance.positionY;
            const obstacleBottom = obstacleInstance.positionY + obstacleInstance.height;

            const playerLeft = player.positionX;
            const playerRight = player.positionX + player.width;
            const playerTop = player.positionY;
            const playerBottom = player.positionY + player.height;

            // Check for collision between player and obstacle
            if (
                playerTop < obstacleBottom &&
                playerBottom > obstacleTop &&
                playerLeft < obstacleRight &&
                playerRight > obstacleLeft
            ) {
                    // Collision detected, trigger game over
                    console.log("Game over");
                };
    });
}, 30);
};

setInterval(() => {
    createAndDisplayObstacles();
}, 3000);

moveTrashes();


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