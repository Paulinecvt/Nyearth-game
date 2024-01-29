// PLAYER CLASS
class Player {
    constructor (){
        this.positionX = 150;
        this.positionY = 300;
        this.width = 300;
        this.height = 150;
        this.domElm = null;

        this.createDomElm();
    };

    //create element of player
    createDomElm(){
        this.domElm = document.createElement("div");
        this.domElm.setAttribute("class", "player");
        this.domElm.style.height = this.height + "px";
        this.domElm.style.width = this.width + "px";
        this.domElm.style.top = this.positionY+ "px";
        this.domElm.style.left = this.positionX + "px";
        this.domElm.style.transform = "translate(-50%, -50%)";
    
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElm);
    }; 

    //movements
    moveUp(){
        this.positionY-= 30;
        return this.positionY;
    };

    moveDown (){
        this.positionY+= 30;
        return this.positionY;
    };

}; // end of player class




// TRASHES CLASS
class Trashes {
    constructor() {
        this.width = 120;
        this.height = 120;
        this.positionX = 100;
        this.positionY = Math.floor(Math.random() * (window.innerHeight - this.height));
        // this.domElm = null;

        this.createDomElm();
        
    
    };

    // Create element of the trashes
    createDomElm() {
        this.domElm = document.createElement("div");
        this.domElm.setAttribute("class", "trash");
        this.domElm.style.width = this.width + "px";
        this.domElm.style.height = this.height + "px";
        this.domElm.style.left = this.positionX + "px";
        this.domElm.style.bottom = this.positionY + "px";

        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElm);
    };

    // Move trashes to left
    moveLeft() {
        this.positionX -= 10;
        this.domElm.style.left = this.positionX + "%";
        return this.positionX;
    }; 
};



// CONST
const player = new Player ();
// CONST
let obstacles = [];




// Create and display obstacles
function createAndDisplayObstacles() {

    // Remove previous obstacles from the DOM
    obstacles.forEach((obstacle) => {
        obstacle.domElm.remove();
    });

    // Clear the obstacles array
    obstacles = [];

    //create new
    const newObstacle = new Trashes();
    obstacles.push(newObstacle);
    console.log('Trash is created from the position ' + newObstacle.positionY);
    return newObstacle.positionY;
};


// Move trashes and detect collision
function moveTrashes() {
    
     setInterval(() => {
        obstacles.forEach((obstacleInstance) => {
            obstacleInstance.moveLeft();
        
        });
    }, 150);
};

    setInterval(() => {

            obstacles.forEach((obstacleInstance) => {
            // Calculate the boundaries
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
                playerLeft < obstacleRight &&
                playerRight > obstacleLeft &&
                playerTop < obstacleBottom &&
                playerBottom > obstacleTop
            ) {
                    // Collision detected, trigger game over
                    console.log("Game over");
                } 
               
    });
}, 150);



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
    player.domElm.style.top = player.positionY + 'px';
    
});
