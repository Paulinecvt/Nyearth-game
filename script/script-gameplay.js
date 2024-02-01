document.addEventListener('DOMContentLoaded', () => {


//DOM ELM
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
        if (this.positionY > 0) { 
            this.positionY -= 15;
            this.domElm.style.top = this.positionY + "vh";
        };
    };

    moveDown (){
        const screenHeight = 100;
        if (this.positionY + this.height < screenHeight) { 
            this.positionY += 15;
            this.domElm.style.top = this.positionY + "vh";
        };
    };

    moveRight(){
        const screenWidth = 100; 
        if (this.positionX + this.width + 10 < screenWidth) { 
            this.positionX += 15;
            this.domElm.style.left = this.positionX + "vw";
        };
    };

    moveLeft (){
        if (this.positionX > 0) {
            this.positionX -= 15;
            this.domElm.style.left = this.positionX + "vw";
        };
    };

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
        this.positionX = 100;
       // this.positionY = Math.floor(Math.random() * (window.innerHeight - this.height));
        this.positionY = Math.floor(Math.random()* (100 - this.height + 1));
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
        this.positionX -= 2;
        this.domElm.style.left = this.positionX + "vw"
        return this.positionX;
      };

      // Function to remove obstacles that are marked for removal
     removeObstacles() {
        obstacles = obstacles.filter(obstacle => obstacle.positionX + obstacle.width > 0);
     };
 }; //end of trash class
       

// INITIALIZING
 const player = new Player ();
 let obstacles = [];

 function startGame() {
    window.location.href = "gameplay.html";
}




let obstacleSpeed = 0; // starting speed

function createAndDisplayObstacles() {
    const newObstacle = new Trashes();
    obstacles.push(newObstacle);
    console.log('Trash is created from the position ' + newObstacle.positionY);
    //newObstacle.createDomElm();
    return newObstacle.positionY;
};

function moveTrashes(obstacleSpeed) {
    obstacles.forEach((obstacleInstance) => {
        obstacleInstance.moveLeft(obstacleSpeed);
        obstacleInstance.domElm.style.left = obstacleInstance.positionX + "vw";

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

    obstacles.forEach((obstacleInstance) => {
        obstacleInstance.removeObstacles();
    });
};

// EASY MODE
function moveTrashesLevel1e() {
    obstacleSpeed = 100;
    setInterval(() => {
        moveTrashes(obstacleSpeed);
    }, obstacleSpeed);
};

function moveTrashesLevel2e() {
    setTimeout(() => {
        console.log('level2');
        obstacleSpeed = 80;
        setInterval(() => {
            moveTrashes(obstacleSpeed);
        }, obstacleSpeed);
    }, 10000);
};

function moveTrashesLevel3e() {
    setTimeout(() => {
        console.log('level3');
        obstacleSpeed = 60;
        setInterval(() => {
            moveTrashes(obstacleSpeed);
        }, obstacleSpeed);
    }, 20000);
};

function gameplayEasy() {
    console.log('level1');
    moveTrashesLevel1e();
    setTimeout(() => {
        moveTrashesLevel2e();
    }, 10000); 
    setTimeout(() => {
        moveTrashesLevel3e();
    }, 20000); 
};
  
// HARD MODE
function moveTrashesLevel1h() {
    obstacleSpeed = 70;
    setInterval(() => {
        moveTrashes(obstacleSpeed);
    }, obstacleSpeed);
};

function moveTrashesLevel2h() {
    setTimeout(() => {
        console.log('level2');
        obstacleSpeed = 55;
        setInterval(() => {
            moveTrashes(obstacleSpeed);
        }, obstacleSpeed);
    }, 10000);
};

function moveTrashesLevel3h() {
    setTimeout(() => {
        console.log('level3');
        obstacleSpeed = 47;
        setInterval(() => {
            moveTrashes(obstacleSpeed);
        }, obstacleSpeed);
    }, 20000);
};

function gameplayHard() {
    console.log('level1');
    moveTrashesLevel1h(); // = level2 of easymode
    setTimeout(() => {
        moveTrashesLevel2h();
    }, 10000); // = level3 of easymode
    setTimeout(() => {
        moveTrashesLevel3h();
    }, 20000); // hard level
};

// position X > width > vw
// position Y > height > vh


//Progress Bar
const progressBar = document.getElementsByClassName('progressbar')[0];
setInterval(() => {
    const computedStyle = getComputedStyle(progressBar);
    const width = parseFloat(computedStyle.getPropertyValue('--width')) 
    progressBar.style.setProperty('--width', width +.01);
}, 5);



    


// USEFUL CONST
const easyBtn = document.getElementById("easy-btn");
const hardBtn = document.getElementById("hard-btn");
// Start easy mode 
easyBtn.addEventListener('click', () => {
    startGame();

    setInterval(() => {
        createAndDisplayObstacles();
    }, 2300);
    
    gameplayEasy();
      
    setTimeout(()=> {
        console.log("Victory");
        location.href = "victory.html"
    }, 54000);
});

// Start hard mode
hardBtn.addEventListener('click', () => {
    startGame();

    setInterval(() => {
        createAndDisplayObstacles();
    }, 1800);
    
    gameplayHard();
      
    setTimeout(()=> {
        console.log("Victory");
        location.href = "victory.html"
    }, 54000);
});

});