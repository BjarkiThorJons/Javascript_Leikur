var canvas = document.querySelector('canvas');

var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth -20;
var height = canvas.height = window.innerHeight - 20;

function random(min, max) {
  var num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}
let background = new Image();
background.src = "myndir/background.jpg"

let bomber = new Image();
bomber.src = "myndir/bomber.png"

let bomber2 = new Image();
bomber2.src = "myndir/bomber2.png"

let bomb = new Image();
bomb.src = "myndir/bomb.gif"

let boat = new Image();
boat.src = "myndir/boat.png"

function Player(x, y, size, size2, velX, velY){
  this.x = x;
  this.y = y;
  this.size = size;
  this.size2 = size2;
  this.velX = velX;
  this.velY = velY;
}
Player.prototype.draw = function(){
  ctx.drawImage(boat, this.x, this.y, this.size, this.size2);
}
Player.prototype.move = function(e){
    switch(e.keyCode) {
        case 37:
          player.x -= 10;
          console.log(player.x)
          break;
        case 39:
          player.x += 10;
          console.log(player.x)
          break;
    }   
  }
function Ball(x, velX, velY, color, size, bounce) {
  this.x = x; 
  this.y = 130;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
  this.bounce = bounce
}

Ball.prototype.draw = function() {
  ctx.drawImage(bomb, this.x, this.y, this.size, this.size);
}

Ball.prototype.update = function() {
  if ((this.x + this.size) >= width) {
    this.bounce = 1;
  }

  if ((this.x - this.size) <= - 40) {
    this.bounce = 1;
  }

  if ((this.y + this.size) >= height) {
    this.bounce = 1;
  }

  if ((this.y - this.size) <= 0) {
    this.bounce = 1;
  }

  this.x += this.velX;
  this.y += this.velY;
}

Ball.prototype.collisionDetect = function() {
  for (var j = 0; j < balls.length; j++) {
    if (!(this === balls[j])) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
       	this.bounce+=1
      }
    }
  }
}

player = new Player(
  100,
  height-50,
  100,
  28,
  )
let balls = [];
let x = 0
let max = 0
let yes = 1
let stig = 0
function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.50)';
  //ctx.fillRect(0, 0, width, height);
  ctx.drawImage(background, 0, 0, width, height);
  ctx.fillStyle = "white";
  ctx.font = "60px Old English Text MT";
  ctx.fillText(Math.round(stig),20,50);
  window.addEventListener("keydown", player.move, false);
  player.draw();
  max += 0.005;
  stig += 1;
  if (x >= width-100){
      yes = 0;
    };
    if (x <= 100){
      yes = 1;
    };
    if (yes == 1){
      x += 6;
      ctx.drawImage(bomber2, x-260, 0, 446, 150);

    }
    else{
      x -=6
      ctx.drawImage(bomber, x-200, 0, 446, 150);
    }
  while (balls.length < max) {
    var ball = new Ball(
      x,
      random(-7,7),
      random(3,7),
      'rgb(255,0,0)',
      //'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
      40
    );
    balls.push(ball);
  };
  
  for (var i = 0; i < balls.length; i++) {
  	balls[i].draw();
	  balls[i].update();
    if (balls[i].bounce == 1){
    	balls.splice(i,1);
    }

	
  }
  requestAnimationFrame(loop);
}


loop();