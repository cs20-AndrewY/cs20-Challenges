const canvas = document.getElementById('GameCanvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
let food = [];
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let regenCycle = Date.now();

const randColor = () =>  {
    return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
}

class Food{
    constructor(radius, x, y, colour){
        this.radius = radius;
        this.x = x;
        this.y = y;
        this.colour = colour;
    }
}

class Player{
    constructor(radius, x, y, dx, dy){
        this.radius = radius;
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
    }
}
let player = new Player(10, width / 2, height / 2, 0, 0);

for(let i = 0; i < 60; i++){
    food.push(new Food(Math.random() * 15 + 5, 
    Math.random() * width, 
    Math.random() * height,
    randColor()));
}

function drawShapes(){
    for(let i = 0; i < food.length; i++){
        ctx.beginPath();
        ctx.arc(food[i].x, food[i].y, food[i].radius, 0, Math.PI * 2);
        ctx.fillStyle = food[i].colour;
        ctx.fill();
        ctx.closePath();
    }
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
}

function detectCollisions(){
    for(let i = 0; i < food.length; i++){
        let dX = player.x - food[i].x;
        let dY = player.y - food[i].y;
        let distance = Math.sqrt(dX * dX + dY * dY);
        if(distance < player.radius + food[i].radius){
          if(player.radius < 60)
            player.radius += food[i].radius / 8;
          else{
            player.radius += food[i].radius / 8 * 60 / player.radius;
          }
            food.splice(i, 1);
        }
    }
}

function regen(){
  if(regenCycle <= Date.now() - 1000 * food.length / 60){
    food.push(new Food(Math.random() * 15 + 5, 
    Math.random() * width, 
    Math.random() * height,
    randColor()));
    regenCycle = Date.now();
  }
}

function draw(){
    ctx.clearRect(0, 0, width, height);
    drawShapes();
    detectCollisions();
    if(food.length < 60){
      regen();
    }
    player.x += player.dx;
    player.y += player.dy;
    player.dx = 0;
    player.dy = 0;
    if (rightPressed == true) {
        if (player.x + player.radius > canvas.width) {
          player.dy = 0;
        } else {
          player.dx = 3;
        }
      }
      if (leftPressed == true) {
        if (player.x - player.radius < 0) {
          player.dy = 0;
        } else {
          player.dx = -3;
        }
      }
      if (upPressed == true) {
        if (player.y - player.radius < 0) {
          player.dy = 0;
        } else {
          player.dy = -3;
        }
      }
      if (downPressed == true) {
        if (player.y + player.radius > canvas.height) {
          player.dy = 0;
        } else {
          player.dy = 3;
        }
      }
    requestAnimationFrame(draw);
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