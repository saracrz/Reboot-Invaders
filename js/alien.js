const AlienOFFSET_X = 240;
const AlienOFFSET_Y = 50;
const AlienSPEED = 5;

function Alien(x, y, idx) {
  this.initial_x = x;
  this.initial_y = y;
  this.x = x;
  this.y = y;
  this.direction = 1;
  this.rowIndex = idx;

  this.createHTML = function() {
    this.elem = document.createElement("div");
    this.elem.classList.add("alien");
    if (this.rowIndex % 2 == 0) {
      this.elem.classList.add("alien-classic");
    } else if(this.rowIndex% 3 == 0) {
      this.elem.classList.add("alien-invader");
    } else {
      this.elem.classList.add("alien-blue");
    }
    this.elem.style.top = this.y + "px";
    this.elem.style.left = this.x + "px";
    document.getElementById("game").appendChild(this.elem);
  };

  this.move = function() {
    if (this.direction === 1) {
      if (this.x < this.initial_x + AlienOFFSET_X) {
        this.x += AlienSPEED * this.direction;
        this.elem.style.left = this.x + "px";
      } else {
        this.y += AlienOFFSET_Y;
        this.elem.style.top = this.y + "px";
        this.direction *= -1;
      }
    } else {
      if (this.x > this.initial_x) {
        this.x += AlienSPEED * this.direction;
        this.elem.style.left = this.x + "px";
      } else {
        this.y += AlienOFFSET_Y;
        this.elem.style.top = this.y + "px";
        this.direction *= -1;
      }
    }
  }
}
