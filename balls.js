var canvas = document.querySelector('canvas');

var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

function random(min, max) {
  var num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}
var image = new Image();
image.src = "myndir/player2.png"


function Ball(x, y, velX, velY, color, size, bounce) {
  this.x = x;
  this.y = 100;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
  this.bounce = bounce
}

Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
}

Ball.prototype.update = function() {
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX);
    this.bounce = 1;
  }

  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
    this.bounce = 1;
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
    this.bounce = 1;
  }

  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
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

var balls = [];
var x = 0
var max = 50
var yes = 1
function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  while (balls.length < max) {
  	if (x >= width-100){
  		yes = 0;
  	};
  	if (x <= 100){
  		yes = 1;
  	};
  	if (yes == 1){
  		x += 6;
  	}
  	else{
  		x -=6
  	}
  	
    var ball = new Ball(
      x,
      random(0,height),
      random(-7,7),
      random(1,7),
      'rgb(255,0,0)',
      //'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
      random(10,20)
    );
    balls.push(ball);
  }
  ctx.drawImage(image, x, 100);
  for (var i = 0; i < balls.length; i++) {
  	balls[i].draw();
	balls[i].update();
    if (balls[i].bounce == 1){
    	 balls.splice(i,1)
    }
	
  }
  requestAnimationFrame(loop);
}


loop();