function Game() {
  var canvas = document.getElementById("game");
  this.width = canvas.width;
  this.height = canvas.height;
  this.context = canvas.getContext("2d");
  this.context.fillStyle = "white";
  this.keys = new KeyListener();

  this.p1 = new Paddle(5, 0);
  this.p1.y = this.height/2 - this.p1.height/2;
  this.p2 = new Paddle(this.width - 5 - 2, 0);
  this.p2.y = this.height/2 - this.p2.height/2;

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
};

Game.prototype.update = function () {
  if (this.paused)
    return;

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

  this.ball.update();
  if (this.ball.x > this.width || this.ball.x + this.ball.width <0) {
    this.ball.vx = -this.ball.vx;
  } else if (this.ball.y > this.height || this.ball.y + this.ball.height < 0) {
    this.ball.vy = -this.ball.vy;
  }
};

var game = new Game();

function MainLoop() {
  game.update();
  game.draw();
  setTimeout(MainLoop, 1000/30);
}

MainLoop();
