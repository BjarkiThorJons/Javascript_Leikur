//Bjarki Þór Jónsson
// Styllingar fyrir canvas
var canvas = document.querySelector('canvas');

var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth -20;
var height = canvas.height = window.innerHeight - 20;

function random(min, max) {
  var num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}
// Loadar myndum
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

let boat2 = new Image();
boat2.src = "myndir/boat2.png"

let explosion = new Image();
explosion.scr = "myndir/explosion.jpg"


var song = document.createElement("audio");
song.src = "audio/flight_of_the_bumblebee_2.mp3";
song.loop = true;
song.volume = 0.3
song.play();

var explosionS = document.createElement("audio");
explosionS.src = "audio/Explosion.mp3";
explosionS.volume = 0.2


// Object constructor fyrir player
function Player(x, y, size, size2, velX, velY, rotate){
  this.x = x;
  this.y = y;
  this.size = size;
  this.size2 = size2;
  this.velX = velX;
  this.velY = velY;
  this.rotate = rotate
}
// Prototype function fyrir player sem prentar myndina
Player.prototype.draw = function(){
  if (this.rotate === 0){
    ctx.drawImage(boat, this.x, this.y, this.size, this.size2);
  }
  else {
    ctx.drawImage(boat2, this.x, this.y, this.size, this.size2);
  }
  if (this.hit === 1)
    ctx.drawImage(explosion, this.x, this.y);
}
// Prototype function til að hreyfa playerinn 
Player.prototype.move = function(e){
    switch(e.keyCode) {
        case 37:
          player.rotate = 1
          if (player.x > 0){
            player.x -= 30;
          }
          break;
        case 39:
          if (player.x + player.size < width){
            player.x += 30;
          }
          player.rotate = 0 
          break;
    }   
  }
Player.prototype.update = function(){
  this.x += this.velX;
  this.y += this.velY;
}
// Object constructor fyrir boltana
function Ball(x, y, velX, velY, color, size, bounce) {
  this.x = x; 
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
  this.bounce = bounce
}
// Prototype function fyrir Ball sem prentar myndina
Ball.prototype.draw = function() {
  ctx.drawImage(bomb, this.x, this.y, this.size, this.size);
}
// Prototype function fyrir Ball sem fynnur út hvort boltinn snertir endana á skjánumn
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
      var dx = balls[j].x;
      var dy = balls[j].y;
      //var distance = Math.sqrt(dx * dx + dy * dy);
      
      if (dx >= player.x && dx <= player.x + player.size){
          if (dy >= player.y && dy <= player.y + player.size2){
            max = 0
            player.x = 100
            x = 100
            //song.currentTime = 0
            explosionS.play();
            if (stig > highScore){
              highScore = stig
            }
            stig = 0
        }
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
let highScore = 0
function loop() {
  song.play();
  ctx.fillStyle = 'rgba(0, 0, 0, 0.50)';
  ctx.drawImage(background, 0, 0, width, height);
  ctx.fillStyle = "white";
  ctx.font = "60px Old English Text MT";
  ctx.fillText(Math.round(stig),20,50);
  ctx.fillText(Math.round(highScore),20,100);
  window.addEventListener("keydown", player.move, false);
  player.draw();
  if (max <= 10){
    max += 0.005;
  };
  console.log(max)
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
      130,
      random(-7,7),
      random(3,7),
      'rgb(255,0,0)',
      40
    );
    balls.push(ball);
  };

  for (var i = 0; i < balls.length; i++) {
  	balls[i].draw();
	  balls[i].update();
    balls[i].collisionDetect();
    if (balls[i].bounce == 1){
    	balls.splice(i,1);
    }

	
  }
  requestAnimationFrame(loop);
}


loop();
