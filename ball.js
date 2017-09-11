function Ball() {
  this.x = 0;
  this.y = 0;
  this.vx = 0;
  this.vy = 0;
  this.width = 4;
  this.height = 4;
}

Ball.prototype.update = function() {
  this.x += this.vx;
  this.y += this.vy;
};

Ball.prototype.draw = function(p) {
  p.fillRect(this.x, this.y, this.width, this.height);
};
