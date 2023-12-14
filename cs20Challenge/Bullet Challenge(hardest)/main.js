const canvas = document.getElementById('GameCanvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
let rightPressed = false;
let leftPressed = false;
let downPressed = false;
let upPressed = false;
let mouseX = 0;
let mouseY = 0;

class Bullet{
    constructor(radius, x, y, dx, dy){
        this.radius = radius;
        this.x = x;
        this.y = y;
        this.dy = dx;
        this.dx = dy;
    }
}

class Enemy{
    constructor(radius, x, y, dx, dy){
        this.radius = radius;
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
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
    move(){
        this.x += this.dx;
        this.y += this.dy;
        this.dx = 0;
        this.dy = 0;
        if (rightPressed == true) {
            if (this.x + this.radius > canvas.width) {
              this.dx = 0;
            } else {
              this.dx = 3;
            }
          }
          if (leftPressed == true) {
            if (this.x - this.radius < 0) {
              this.dx = 0;
            } else {
                this.dx = -3;
            }
          }
          if (upPressed == true) {
            if (this.y - this.radius < 0) {
              this.dy = 0;
            } else {
                this.dy = -3;
            }
          }
          if (downPressed == true) {
            if (this.y + this.radius > canvas.height) {
              this.dy = 0;
            }
            else{
                this.dy = 3;
            }
          }
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.closePath();

        let dx = this.x - mouseX;
        let dy = this.y - mouseY;
        
        let dist = Math.sqrt(dx * dx + dy * dy);
        let ux = dx / dist;
        let uy = dy / dist;
        
        let x2 = mouseX + ux * (dist - this.radius);
        let y2 = mouseY + uy * (dist - this.radius);
        
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.closePath();
        
    }
}

let circles = [];
let bullets = [];
let player = new Player(30, width / 2, 500, 0, 0);

for(let i = 0; i < 15; i++){
    let circle = (new Enemy(Math.random() * 15 + 10,
                            Math.random() * width + 20,
                            Math.random() * 320 + 20,
                            2,
                            2));
    if(circle.radius + circle.x > width){
        circle.x = width - circle.radius * 2 - 10
    }
    circles.push(circle);
}

function createShapes(){
    for(let i = 0; i < circles.length; i++){
        ctx.beginPath();
        ctx.arc(circles[i].x, circles[i].y, circles[i].radius, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();
    }
    if(bullets.length > 0){
        for(let i = 0 ; i < bullets.length; i++){
        ctx.beginPath();
        ctx.arc(bullets[i].x, bullets[i].y, bullets[i].radius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();
        }
    }
    player.draw();
}

function moveObjects(){
    for(let i = 0; i < circles.length; i++){
        circles[i].x += circles[i].dx;
        circles[i].y += circles[i].dy;
        if(circles[i].x - circles[i].radius < 0 || circles[i].x + circles[i].radius >= width){
            circles[i].dx *= -1;
        }
        if(circles[i].y - circles[i].radius < 0 || circles[i].y + circles[i].radius >= 320){
            circles[i].dy *= -1;
        }
    }
}

function moveBullets(){
    for(let i = 0; i < bullets.length; i++){
        bullets[i].y += bullets[i].dy;
        bullets[i].x += bullets[i].dx;
        if(bullets[i].y < 0 || bullets[i].y > height) bullets.splice(i, 1);
        else if(bullets[i].x > width || bullets[i].x < 0) bullets.splice(i, 1);
    }
}
function detectCollisions(){
    for(let i = 0; i < bullets.length; i++){
        for(let j = 0; j < circles.length; j++){
            let dX = bullets[i].x - circles[j].x;
            let dY = bullets[i].y - circles[j].y;
            let distance = Math.sqrt(dX * dX + dY * dY);
            if(distance < bullets[i].radius + circles[j].radius){
                circles.splice(j, 1);
                bullets.splice(i, 1);
                break;
            }
        }
    }
}
function draw(){
    ctx.clearRect(0,0, width, height);
    createShapes();
    player.move();
    moveObjects();
    moveBullets();
    detectCollisions();
    requestAnimationFrame(draw);
}
draw();

document.addEventListener('keydown', keyDown, true);
document.addEventListener('keyup', keyUp, true);
canvas.addEventListener("mousedown", function(){
    let bullet = new Bullet(4, player.x, player.y, 3, 3);
    let dx = mouseX - player.x;
    let dy = mouseY - player.y;
    
    let dist = Math.sqrt(dx * dx + dy * dy);

    let ux = dx / dist;
    let uy = dy / dist;
    bullet.dx *= ux;
    bullet.dy *= uy;
    bullets.push(bullet);
});
canvas.addEventListener('mousemove', function(e){
    let CRect = canvas.getBoundingClientRect();
    mouseX = e.clientX - CRect.left;
    mouseY = e.clientY - CRect.top;
})
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