// PLAYER CLASS
class Player {
    constructor (){
        this.positionX = 0;
        this.positionY = 40;
        this.width = 25;
        this.height = 23;

        this.createDomElm();
    };

    //create element of player
    createDomElm(){
        this.domElm = document.createElement("div");
        this.domElm.setAttribute("class", "player");
        this.domElm.style.height = this.height + "vh";
        this.domElm.style.width = this.width + "vw";
        this.domElm.style.top = this.positionY+ "vh";
        this.domElm.style.left = this.positionX + "vw";
       
    
        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElm);
    }; 

    //movements
    moveUp(){
        this.positionY-= 15;
        this.domElm.style.top = this.positionY + "vh"
    };

    moveDown (){
        this.positionY+= 15;
        this.domElm.style.top = this.positionY + "vh"
    };

    moveRight(){
        this.positionX += 15;
        this.domElm.style.left = this.positionX + "vw"
    };

    moveLeft (){
        this.positionX -= 15;
        this.domElm.style.left = this.positionX + "vw"
    }

}; // end of player class


// Array of image URLs for obstacles
const obstacleImages = [
    "./img/trash1.png",
    "./img/trash2.png",
    "./img/trash3.png",
    "./img/trash4.png",
    "./img/trash5.png"
 ];
 
 // Function to choose a random image URL
 function chooseRandomImage() {
    const randomIndex = Math.floor(Math.random() * obstacleImages.length);
    return obstacleImages[randomIndex];
 };



// TRASHES CLASS
class Trashes {
    constructor() {
        this.width = 10;
        this.height = 17;
       // this.positionX = 140;
        this.positionX = 100;
       // this.positionY = Math.floor(Math.random() * (window.innerHeight - this.height));
       this.positionY = Math.floor(Math.random()* (100 - this.width + 1));
        this.imageSrc = chooseRandomImage();

        this.createDomElm();
    };

    // Create element of the trashes
    createDomElm() {
        this.domElm = document.createElement("img");
        this.domElm.src = this.imageSrc;
        this.domElm.setAttribute("class", "trash");
        this.domElm.style.height = this.height + "vh";
        this.domElm.style.width = this.width + "vw";
        this.domElm.style.top = this.positionY+ "vh";
        this.domElm.style.left = this.positionX + "vw";
        

        const boardElm = document.getElementById("board");
        boardElm.appendChild(this.domElm);
    };

    // Move trashes to left
    moveLeft() {
        this.positionX -= 8;
        this.domElm.style.left = this.positionX + "vw"
        return this.positionX;
      };

      // Function to remove obstacles that are marked for removal
     removeObstacles() {
        obstacles = obstacles.filter(obstacle => obstacle.positionX + obstacle.width > 0);
     };
 }; //end of trash class
       



// CONST
const player = new Player ();
// CONST
let obstacles = [];




// Create and display obstacles
function createAndDisplayObstacles() {
    const newObstacle = new Trashes();
    obstacles.push(newObstacle);
    console.log('Trash is created from the position ' + newObstacle.positionY);
    //newObstacle.createDomElm();
    return newObstacle.positionY;
};


// Move trashes and detect collision
function moveTrashes() {
    
     setInterval(() => {
        obstacles.forEach((obstacleInstance) => {
            obstacleInstance.moveLeft();

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
            ) {  // Collision detected, trigger game over
                    console.log("Game over");
                    location.href = "gameover.html"

                };   
        });
    }, 200);

        obstacles.forEach((obstacleInstance) => {
            obstacleInstance.removeObstacles();
        })

};




setInterval(() => {
    createAndDisplayObstacles();
}, 3000);

moveTrashes();

setTimeout(()=> {
    console.log("Victory");
    location.href = "victory.html"
}, 54000);



// EVENTS
// Move the player

    
    document.addEventListener("keydown", (e) => {
    if (e.code === 'ArrowUp') {
        player.moveUp();
    } else if (e.code === 'ArrowDown') {
        player.moveDown(); 
    } else if (e.code === 'ArrowLeft'){
        player.moveLeft();
    } else if (e.code === 'ArrowRight'){
        player.moveRight();

    }

});


// position X > width > vw
// position Y > height > vh


//Progress Bar
const progressBar = document.getElementsByClassName('progressbar')[0];
setInterval(() => {
    const computedStyle = getComputedStyle(progressBar);
    const width = parseFloat(computedStyle.getPropertyValue('--width')) 
    progressBar.style.setProperty('--width', width +.01);
}, 5)