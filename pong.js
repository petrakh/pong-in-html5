function Game() {
  var canvas = document.getElementById("game");
  this.width = canvas.width;
  this.height = canvas.height;
  this.context = canvas.getContext("2d");
  this.context.fillStyle = "white";
  this.keys = new KeyListener();

  this.p1 = new Paddle(5, 0);
  this.p1.y = this.height/2 - this.p1.height/2;
  this.display1 = new Display(this.width/4, 25);
  this.p2 = new Paddle(this.width - 5 - 2, 0);
  this.p2.y = this.height/2 - this.p2.height/2;
  this.display2 = new Display(this.width*3/4, 25);

  this.ball = new Ball();
  this.ball.x = this.width/2;
  this.ball.y = this.height/2;
  this.ball.vy = Math.floor(Math.random()*12 - 6);
  this.ball.vx = 7 - Math.abs(this.ball.vy);
}

Game.prototype.draw = function () {
  this.context.clearRect(0, 0, this.width, this.height);
  this.context.fillRect(this.width/2, 0, 2, this.height);

  this.ball.draw(this.context);

  this.p1.draw(this.context);
  this.p2.draw(this.context);

  this.display1.draw(this.context);
  this.display2.draw(this.context);
};

Game.prototype.update = function () {
  if (this.paused)
    return;

  this.ball.update();
  this.display1.value = this.p1.score;
  this.display2.value = this.p2.score;

  if (this.keys.isPressed(83)) {
    this.p1.y = Math.min(this.height - this.p1.height, this.p1.y + 4);
  } else if (this.keys.isPressed(87)) {
    this.p1.y = Math.max(0, this.p1.y - 4);
  }

  if (this.keys.isPressed(40)) {
    this.p2.y = Math.min(this.height - this.p2.height, this.p2.y + 4);
  } else if (this.keys.isPressed(38)) {
    this.p2.y = Math.max(0, this.p2.y - 4);
  }

  if (this.ball.vx > 0) {
    if (this.p2.x <= this.ball.x + this.ball.width &&
          this.p2.x > this.ball.x - this.ball.vx + this.ball.width) {
            var collisionDiff = this.ball.x + this.ball.width - this.p2.x;
            var k = collisionDiff/this.ball.vx;
            var y = this.ball.vy*k + (this.ball.y - this.ball.vy);
            if (y >= this.p2.y && y + this.ball.height <= this.p2.y + this.p2.height) {
              this.ball.x = this.p2.x - this.ball.width;
              this.ball.y = Math.floor(this.ball.y - this.ball.vy + this.ball.vy*k);
              this.ball.vx = -this.ball.vx;
            }
          }
  } else {
    if (this.p1.x + this.p1.width >= this.ball.x) {
      var collisionDiff = this.p1.x + this.p1.width - this.ball.x;
      var k = collisionDiff/-this.ball.vx;
      var y = this.ball.vy*k + (this.ball.y - this.ball.vy);
      if (y >= this.p1.y && y + this.ball.height <= this.p1.y + this.p1.height) {
        this.ball.x = this.p1.x + this.p1.width;
        this.ball.y = Math.floor(this.ball.y - this.ball.vy + this.ball.vy*k);
        this.ball.vx = -this.ball.vx;
      }
    }
  }
  if ((this.ball.vy < 0 && this.ball.y <0) ||
          (this.ball.vy > 0 && this.ball.y + this.ball.height > this.height)) {
      this.ball.vy = -this.ball.vy;
  }

  if (this.ball.x >= this.width)
    this.score(this.p1);
  else if (this.ball.x + this.ball.width <= 0)
    this.score(this.p2);
};

Game.prototype.score = function(p) {
  p.score++;
  var player = p == this.p1 ? 0 : 1;

  this.ball.x = this.width/2;
  this.ball.y = p.y + p.height/2;

  this.ball.vy = Math.floor(Math.random()*12 - 6);
  this.ball.vx = 7 - Math.abs(this.ball.vy);
  if (player == 1)
      this.ball.vx *= -1;
};

var game = new Game();

function MainLoop() {
  game.update();
  game.draw();
  setTimeout(MainLoop, 1000/30);
}

MainLoop();
