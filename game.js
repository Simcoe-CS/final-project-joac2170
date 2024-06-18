
// declares global variables
/** @type {HTMLCanvasElement} */
let canvas = document.getElementById("gameCanvas");
let c = canvas.getContext("2d");
let canvasBackgroundColor = "#a5f26b";
let platforms = [];
let gameStarted = false;
let animationFrameId;

// startscreen text
c.fillStyle = canvasBackgroundColor;
c.fillRect(0, 0, canvas.width, canvas.height);
c.fillStyle = "#2b1613";
c.font = "30px Verdana";
c.fillText("Click play to Start", 400, 200);


// Create game controller
let controller = new GameController();

// Listens for key events to move the ball.
window.addEventListener("keydown", function (event) { controller.keyListener(event); });
window.addEventListener("keyup", function (event) { controller.keyListener(event); });

// Create the ball 
let ball = new Ball(55, 420, 20, "navy", controller);  //xpos, ypos, radius, color


// Starts the game.  
function startGame() {
  if (!gameStarted) {
    clock();
    animationFrameId = window.requestAnimationFrame(updateGamePlay);
    gameStarted = true;
  }
}

// Continues to update the game play.
function updateGamePlay() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  generateLand();
  for (let i = 0; i < platforms.length; i++) {
    ball.platformHitBoxCheck(platforms[i]);
  }

  //update ball position and create the ball
  ball.update();
  ball.spawn();

  //triggers endgame screen
  if (ball.endgame) {
    endGame();
  }

  animationFrameId = window.requestAnimationFrame(updateGamePlay);
}

//timer for time spent in seconds (modified code version with referance code from: https://stackoverflow.com/questions/31106189/create-a-simple-10-second-countdown)
let timer;
function clock(stopClock = false) {
  if (stopClock) {
    //stops the timer when game ends
    clearInterval(timer);
    timer = null;
  }
  else {
    //starts the timer when game begins
    let count = 0;
    timer = setInterval(function () {
      count++;
      out1.innerHTML = "time: " + count;
    }, 1000);
  }
}

//draws endgame screen
function endGame() {
  c.fillStyle = "rgb(68, 83, 219)";	//Set the fill color
  c.fillRect(0, 0, 1080, 600);

  c.fillStyle = "rgb(7,7,93)";
  c.font = "30px Verdana";
  c.fillText("Level Complete", 400, 200);
  clock(true);
}

//lets player restart if they mess up or want to play again
function restart() {
  //reset gameStarted and platforms
  gameStarted = false;
  platforms = [];

  //stops clock and resets teh timer
  clock(true);
  out1.innerHTML = "time: " + 0;

  //cancel the animation
  cancelAnimationFrame(animationFrameId);
  animationFrameId = null;

  //recreate the ball and restart the game.
  ball = new Ball(55, 420, 20, "navy", controller);  //xpos, ypos, radius, color
  startGame();
}