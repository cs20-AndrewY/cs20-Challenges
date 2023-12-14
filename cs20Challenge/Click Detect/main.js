const canvas = document.getElementById('GameCanvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
let circles = [];
let rectangles = [];

class Circle{
    constructor(radius, x, y, speed) {
        this.radius = radius;
        this.x = x;
        this.y = y;
        this.dx = speed;
        this.dy = speed;
    }
}

class Rectangle{
    constructor(length, width, x, y, speed){
        this.length = length;
        this.width = width;
        this.x = x;
        this.y = y;
        this.dx = speed;
        this.dy = speed;
    }
}

for(let i = 0; i < 15; i++){
    circles.push(new Circle(Math.floor(Math.random() * 30 + 10), 
                            Math.floor(Math.random() * 550 + 50),
                            Math.floor(Math.random() * 550 + 50),
                            Math.floor(Math.random() * 3 + 1)));
    rectangles.push(new Rectangle(Math.floor(Math.random() * 40 + 20), 
                            Math.floor(Math.random() * 40 + 20),
                            Math.floor(Math.random() * 550 + 50),
                            Math.floor(Math.random() * 550 + 50),
                            Math.floor(Math.random() * 2 + 1)))
}

function drawObjects(){
    for(let i = 0; i < circles.length; i++){
        ctx.beginPath();
        ctx.arc(circles[i].x, circles[i].y, circles[i].radius, 0, Math.PI * 2);
        ctx.fillStyle = "limegreen";
        ctx.fill();
        ctx.closePath();
    }
    for(let i = 0; i < rectangles.length; i++){
        let r = rectangles[i];
        ctx.beginPath();
        ctx.rect(r.x, r.y, r.width, r.length);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
    }
}

function detectCollisions(){
    for(let i = 0; i < circles.length; i++){
        if(circles[i].x - circles[i].radius < 0 || circles[i].x + circles[i].radius >= width){
            circles[i].dx *= -1;
        }
        if(circles[i].y - circles[i].radius < 0 || circles[i].y + circles[i].radius >= height){
            circles[i].dy *= -1;
        }
    }
    for(let i = 0; i < rectangles.length; i++){
        if(rectangles[i].x <= 0 || rectangles[i].x + rectangles[i].width >= width){
            rectangles[i].dx *= -1;
        }
        if(rectangles[i].y <= 0 || rectangles[i].y + rectangles[i].length >= height){
            rectangles[i].dy *= -1;
        }
    }
}
function draw(){
    ctx.clearRect(0, 0, width, height);
    drawObjects();
    detectCollisions();
    for(let i = 0; i < circles.length; i++){
        circles[i].x += circles[i].dx;
        circles[i].y += circles[i].dy;
    }
    for(let i = 0; i < rectangles.length; i++){
        rectangles[i].x += rectangles[i].dx;
        rectangles[i].y += rectangles[i].dy;
    }
    requestAnimationFrame(draw);
}
draw();

canvas.addEventListener("mousedown", function(e){
    detectClick(canvas, e);
});
function detectClick(c, event){
    const rect = c.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    for(let i = 0; i < circles.length; i++){
        if(x >= circles[i].x - circles[i].radius 
            && x <= circles[i].x + circles[i].radius
            && y >= circles[i].y - circles[i].radius
            && y <= circles[i].y + circles[i].radius){
                circles.splice(i, 1);
                if(circles.length == 0){
                    alert("Game Over - You Win");
                    location.reload();
                }
            }
    }
    for(let i = 0; i < rectangles.length; i++){
        if(x >= rectangles[i].x && x <= rectangles[i].x + rectangles[i].width
        && y >= rectangles[i].y && y <= rectangles[i].y + rectangles[i].length){
            alert("Game Over - You Lose");
            location.reload();
        }
    }
}