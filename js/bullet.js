const OFFSET_SHOOTER = 35;
const BULLET_SPEED = 8;

function Bullet(x) {
  this.x = x + OFFSET_SHOOTER;
  this.y = 700;

  this.createHTML = function() {
    this.elem = document.createElement("div");
    this.elem.className = "bullet";
    var gameHTML = document.getElementById("game");
    gameHTML.appendChild(this.elem);
    this.elem.style.top = this.y + "px";
    this.elem.style.left = this.x + "px";
    jumpOne.play();
  };

  this.move = function(){
    if (this.y > 0) {
      this.y -= BULLET_SPEED;
      this.elem.style.top = this.y + "px";
    } 
  }
}