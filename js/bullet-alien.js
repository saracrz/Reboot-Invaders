const OFFSET_ALIEN = 35;
const ALIEN_BULLET_SPEED = 8;

function BulletAlien(x,y) {
  this.x = x + OFFSET_ALIEN;
  this.y = y;

  this.createHTML = function() {
    this.elem = document.createElement("div");
    this.elem.className = "bullet-alien";
    var gameHTML = document.getElementById("game");
    gameHTML.appendChild(this.elem);
    this.elem.style.top = this.y + "px";
    this.elem.style.left = this.x + "px";
  };

  this.move = function(){
    if (this.y < 760) {
      this.y += ALIEN_BULLET_SPEED;
      this.elem.style.top = this.y + "px";
    }
  }
}