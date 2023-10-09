// Getting reference to Canvas object
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d');

// Setting dimensions of canvas
const canvasWidth = canvas.width
const canvasHeight = canvas.height
const radius = 10
const paddleHeight = 80

let gameOver = false

let nameLeft = window.prompt("What is the name of the player on the left?")

let nameRight = window.prompt("What is the name of the player on the right?")


// render rect
function renderBackground() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

//render paddle left
function renderPaddle(y) {
  ctx.fillStyle = 'white';
  ctx.fillRect(10, y, 15, paddleHeight);
}

//render paddle right
function renderPaddle2(y) {
  ctx.fillStyle = 'white';
  ctx.fillRect(675, y, 15, paddleHeight);
}

//render circles
function renderBall(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fillStyle = 'red';
  ctx.fill();  
}

//count points
let pointsLeft = 0;
let pointsRight = 0;

function countPoints() {
  if (x + radius === canvasWidth) {
    pointsLeft += 1
    console.log(`Points right: ${pointsLeft}`)
  }
  if (x - radius === 0) {
    pointsRight += 1
    console.log(`Points right: ${pointsRight}`)
  }
}

//render points of each player
function renderText() {
  ctx.font = "30px Robotic";
  ctx.fillStyle = "red";
  ctx.textAlign = "center";
  ctx.fillText(pointsLeft, 250, 100);
  ctx.fillText(pointsRight, 450, 100); 
}

//render the middle line
function middleLine() {
  ctx.beginPath();
  ctx.setLineDash([5, 5]);
  ctx.moveTo(canvasWidth/2, 0)
  ctx.lineTo(canvasWidth/2, canvasHeight)
  ctx.strokeStyle = "white"
  ctx.stroke()
}


// Create variables to track the state of each paddle
let leftPaddleUp = false;
let leftPaddleDown = false;
let rightPaddleUp = false;
let rightPaddleDown = false;

// Paddle movement right
document.addEventListener('keydown', function (event) {
  const { key } = event;
  switch (key) {
    case 'w':
      leftPaddleUp = true;
      break;
    case 's':
      leftPaddleDown = true;
      break;
    case 'ArrowUp':
      rightPaddleUp = true;
      break;
    case 'ArrowDown':
      rightPaddleDown = true;
      break;
  }
});
// Paddle movement
document.addEventListener('keyup', function (event) {
  const { key } = event;
  switch (key) {
    case 'w':
      leftPaddleUp = false;
      break;
    case 's':
      leftPaddleDown = false;
      break;
    case 'ArrowUp':
      rightPaddleUp = false;
      break;
    case 'ArrowDown':
      rightPaddleDown = false;
      break;
  }
});

let x = 100
let y = 100
let vx = +2
let vy = 0
let paddleY = 200
let paddleY2 = 200

let game = setInterval(function() {
  renderBackground()
  renderBall(x, y)
  renderPaddle(paddleY, "white")
  renderPaddle2(paddleY2, "white")
  countPoints()
  renderText()
  middleLine()

  x += vx 
  y += vy  

  //Movement paddles
  if (leftPaddleUp && paddleY > 0) {
    paddleY -= 5;
  }
  if (leftPaddleDown && paddleY + paddleHeight < canvasHeight) {
    paddleY += 5;
  }

  if (rightPaddleUp && paddleY2 > 0) {
    paddleY2 -= 5;
  }
  if (rightPaddleDown && paddleY2 + paddleHeight < canvasHeight) {
    paddleY2 += 5;
  }


  //Movement ball
    // Bounce off right paddle
if (x + radius >= canvasWidth - 20 && y + radius >= paddleY2 && y - radius <= paddleY2 + paddleHeight && vx > 0) {
  vx = -vx;
  //Here we check if it hits the upper or lower part of the paddle and if its in the first or second 25% of it
  //If its in the 25% more near to the middle
  if (y <= paddleY2 + paddleHeight / 2 && y >= paddleY2 + (paddleHeight/2)/2 ) {
    vy = -1
    //If its in the 25% more far to the middle
  } else if (y <= paddleY2 + paddleHeight / 2 && y <= paddleY2 + (paddleHeight/2)/2 ) {
    vy = -2
  }
  //Here we check if it hits the upper or lower part of the paddle and if its in the first or second 25% of it
  //If its in the 25% more near to the middle
  if (y >= paddleY2 + paddleHeight / 2 && y <= paddleY2 + paddleHeight - (paddleHeight / 2) / 2) {
    vy = 1; 
  //If its in the 25% more far to the middle
  } else if (y >= paddleY2 + paddleHeight / 2 && y >= paddleY2 + paddleHeight - (paddleHeight / 2) / 2) {
    vy = 2; 
  }
  
}
  // Bounce off left paddle
if (x - radius <= 20 && y + radius >= paddleY && y - radius <= paddleY + paddleHeight && vx < 0) {
  vx = -vx;
  //Here we check if it hits the upper or lower part of the paddle and if its in the first or second 25% of it
  //If its in the 25% more near to the middle
  if (y <= paddleY + paddleHeight / 2 && y >= paddleY + (paddleHeight/2)/2 ) {
    vy = -1
  //If its in the 25% more far to the middle
  } else if (y <= paddleY + paddleHeight / 2 && y <= paddleY + (paddleHeight/2)/2) {
    vy = -2
  }
  //Here we check if it hits the upper or lower part of the paddle and if its in the first or second 25% of it
  //If its in the 25% more near to the middle
  if (y >= paddleY + paddleHeight / 2 && y <= paddleY + paddleHeight - (paddleHeight / 2) / 2) {
    vy = 1; 
  //If its in the 25% more far to the middle
  } else if (y >= paddleY + paddleHeight / 2 && y >= paddleY + paddleHeight - (paddleHeight / 2) / 2) {
    vy = 2; 
  }
}

  //bounce off right
if (x + radius === canvasWidth) {
  vx = -vx;
  ctx.fillStyle = 'red';
  ctx.fillRect(canvasWidth/2, 0, canvasWidth, canvasHeight);
}
  //bounce off left
if (x - radius === 0) {
  vx = -vx;
  ctx.fillStyle = 'red';
  ctx.fillRect(0, 0, canvasWidth /2, canvasHeight);
}
  //bounce off top
if (y - radius === 0) {
  vy = -vy 
}
  //bounce off bottom
if (y + radius === canvasHeight) {
  vy = -vy 
}

//This is the winning condition for left
if (pointsLeft >= 6) {
  clearInterval()
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  ctx.font = "30px Arial";
  ctx.fillStyle = "red";
  ctx.textAlign = "center";
  ctx.fillText(`${nameLeft} wins`, canvasWidth/2, canvasHeight/2);
  console.log("GameOver")
  clearInterval(game)

//This is the winning condition for right
} else if (pointsRight >= 6) {
  clearInterval()
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  ctx.font = "30px Arial";
  ctx.fillStyle = "red";
  ctx.textAlign = "center";
  ctx.fillText(`${nameRight} wins`, canvasWidth/2, canvasHeight/2);
  console.log("GameOver")
  clearInterval(game)
}

}, 10)





