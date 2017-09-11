function Paddle(x,y) {
  this.x = x;
  this.y = y;
  this.width = 2;
  this.height = 28;
  this.score = 0;
}

Paddle.prototype.draw = function(p) {
  p.fillRect(this.x, this.y, this.width, this.height);
};
