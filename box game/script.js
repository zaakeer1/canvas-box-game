const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.lineWidth = 4;

var rectPosX = 200;
var rectPosY = 20;
var rectHeight = 50;
var rectWidth = 50;
var leftLimit = 25;
var rightLimit = 1225-rectWidth;
var ground = 350;


var arr = [];

for(var j =0; j<8; j++){

    var g = Math.floor(Math.random() * 3) * rectHeight + 200 ;
    for(var i = 0; i < 3*rectWidth; i++) {
        arr.push(g);
    }
}

for (var i =0; i<arr.length; i+=50){
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(i+50+100, arr[i]);
    ctx.lineTo(i+100, arr[i]);
    ctx.stroke();
}
console.log(arr);

class Square {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        // this.color = "white"; //if you wanted to add a fillStyle
        this.dx = 0;
        this.dy = 0;
        this.f = 0;
        this.ground = 300;
        
    }

    // draws the object

    draw() {

        ctx.strokeStyle = 'red';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(10, this.ground + rectHeight + ctx.lineWidth/2);
        ctx.lineTo(1225, this.ground + rectHeight + ctx.lineWidth/2);
        ctx.stroke();

        for (var i =0; i<arr.length; i+=50){
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(i+25+50, arr[i]);
            ctx.lineTo(i+25, arr[i]);
            ctx.stroke();
        }
        ctx.fillRect(this.x, this.y, rectHeight, rectWidth);
    }

    jump() {
        if (this.f == 1){
            // console.log("called : " + this.f)
            this.dy = -11;
        }
        return ;

    }

    // updates anything related to the object
    update() {
        //increasingly adds 0.5 to the dy or dx
        // console.log(this.x)
        var X = parseInt(this.x)
        // console.log(arr[X])
        if (controller1.up && this.f == 0) {
            
            this.f = 1;
            this.jump();
            console.log("dy : " + this.dy);
            
            
        }
        
        else if (this.y < arr[X]-rectHeight - ctx.lineWidth/2){

            this.dy += 0.5;
            // console.log("dy : " + this.dy);
        }
        else if (this.y >= arr[X]-rectHeight - ctx.lineWidth/2 ){
            // console.log("f: " + this.f)
            this.dy = 0;
            this.y = arr[X]- rectHeight - ctx.lineWidth/2 ;
            this.f = 0;
        }
        // else if (this.f == 0 && this.y >= arr[rectPosX]-rectHeight - ctx.lineWidth/2 ){
        //     this.dy = 0;
        //     this.y = arr[rectPosX]- rectHeight - ctx.lineWidth/2 ;
        // }
        // else {
        //     this.dy = 0
        // }


        // else if (controller1.down) {
        //     this.dy = 3
        // }
        if (controller1.right) {this.dx += 0.5}
        else if (controller1.left) {this.dx += -0.5};
        //if dy or dx is being added to so will the x and y. If not then they are 0.
        this.temp = this.x + this.dx
        this.x = Math.max(leftLimit, Math.min(this.temp, rightLimit));  
        this.y += this.dy;
        //Multiplying by a number less then 1 will prevent the object from gaining infinite speed and also cause the object to stop. Can be changed to anything below 1. This will also change how rigidly the circle comes to a stop. it can slide or absuplty stop.
        
        this.dx *= 0.95;
        // this.dy *= 0.5;
        //calling the draw() in here so I don't have to call it in the animate loop. Either way works.
        // console.log(this.y)
        this.draw(); 
    }
}
  
class Controller {
    constructor() {
        this.up = false;
        this.right = false;
        this.down = false;
        this.left = false;
      
        let keyEvent = (e) => {
            //if the condition is true it will set up/down/left/right to the true or false. e.type will either be 'keyup' or 'keydown'.
            if (e.code == "KeyW") {this.up = e.type == 'keydown'};
            if (e.code == "KeyD") {this.right = e.type == 'keydown'};
            if (e.code == "KeyS") {this.down = e.type == 'keydown'};
            if (e.code == "KeyA") {this.left = e.type == 'keydown'};
        
        }
        addEventListener('keydown', keyEvent);
        addEventListener('keyup', keyEvent);
    }
}
  
//Create instances of you classes
let square1 = new Square(rectPosX, rectPosY);
//can add more circles if you want
//let circle2 = new Square(100, 100, 20, 0, Math.Pi*2);
let controller1 = new Controller();
  
function animate() {
    ctx.fillStyle = 'white';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    square1.update();

    requestAnimationFrame(animate)
}

animate();




window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.beginPath();
    ctx.moveTo(10, ground + rectHeight + ctx.lineWidth/2);
    ctx.lineTo(1225, ground + rectHeight + ctx.lineWidth/2);
    ctx.stroke();
    ctx.fillStyle = 'white';
    ctx.fillRect(20, 20, 50, 50);
})

// document.addEventListener('keydown',function(event){
//     const key = event.key;
//     // console.log(key)
//     if (key == 'ArrowRight'){
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         rectPosX += 2;
//         ctx.fillRect(rectPosX, rectPosY, rectHeight, rectWidth);
//     }
//     else if (key == 'ArrowLeft'){
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         rectPosX -= 2;
//         ctx.fillRect(rectPosX, rectPosY, rectHeight, rectWidth);
//     }
// })
// ctx.fillStyle = 'white';
// ctx.fillRect(rectPosX, rectPosY, rectHeight, rectWidth);