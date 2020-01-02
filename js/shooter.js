function Shooter() {
  const SPEED = 20;
  const MIN_X = 10;
  const MAX_X = 700;
  this.left = 20;

  this.createHTML = function() {
    this.elem = document.createElement("div");
    this.elem.className = "shooter";
    var gameHTML = document.getElementById("game");
    gameHTML.appendChild(this.elem);
  };

  this.moveLeft = function () {
    if (this.left > MIN_X) {
      this.left -= SPEED;
      this.elem.style.left = this.left + 'px';
    }
  }

  this.moveRight = function () {
    if (this.left < MAX_X) {
      this.left += SPEED;
      this.elem.style.left = this.left + "px";
    }
  }
}