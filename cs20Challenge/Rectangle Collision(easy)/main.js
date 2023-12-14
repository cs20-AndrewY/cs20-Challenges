const canvas = document.getElementById('GameCanvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
const playerlength = 20;
let Playerx = playerlength;
let Playery = 200;
let dx = 0;
let dy = 0;
let obstacles = [];
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

for(let i = 0; i < 30; i++){
    let newobject = {x: Math.random() * width + playerlength + 20, 
        y: Math.random() * height,
        width: Math.floor(Math.random() * 180 + 30),
        height: Math.floor(Math.random() * 180 + 30)};
    if(Math.floor(Math.random() * 2) == 1){
        newobject.width = 10;
    } else{
        newobject.height = 10;
    }
    obstacles.push(newobject);
}

function drawPlayer(){
    ctx.beginPath();
    ctx.rect(Playerx, Playery, playerlength, playerlength);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function drawObstacles(){
    for(let i = 0; i < obstacles.length; i++){
        ctx.beginPath();
        ctx.rect(obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height);
        ctx.fillStyle = "#808080";
        ctx.fill();
        ctx.closePath();
        }
}

function detectCollision(){
  for(let i = 0; i < obstacles.length; i++){
    if(Playerx + playerlength > obstacles[i].x && Playerx < obstacles[i].x + obstacles[i].width
      && Playery + playerlength > obstacles[i].y && Playery < obstacles[i].y + obstacles[i].height){
        Playerx = playerlength;
        Playery = 200;
      }
  }
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawObstacles();
    requestAnimationFrame(draw);
    Playerx += dx;
    Playery += dy;
    detectCollision();
    dx = 0;
    dy = 0;
    if (rightPressed == true) {
      if (Playerx + playerlength > canvas.width) {
        dy = 0;
      } else {
        dx = 3;
      }
    }
    if (leftPressed == true) {
      if (Playerx - playerlength < 0) {
        dy = 0;
      } else {
        dx = -3;
      }
    }
    if (upPressed == true) {
      if (Playery - playerlength < 0) {
        dy = 0;
      } else {
        dy = -3;
      }
    }
    if (downPressed == true) {
      if (Playery + playerlength > canvas.height) {
        dy = 0;
      } else {
        dy = 3;
      }
    }
}
draw();

document.addEventListener('keydown', keyDown, true);
document.addEventListener('keyup', keyUp, true);

function keyDown(e) {
    if (e.keyCode == 68) {
        rightPressed = true;
    } else if (e.keyCode == 65) {
        leftPressed = true;
    } else if (e.keyCode == 87) {
        upPressed = true;
    } else if (e.keyCode == 83) {
        downPressed = true;
    }
}

function keyUp(e) {
    if (e.keyCode == 68) {
        rightPressed = false;
    } else if (e.keyCode == 65) {
        leftPressed = false;
    } else if (e.keyCode == 87) {
        upPressed = false;
    } else if (e.keyCode == 83) {
        downPressed = false;
    }
}