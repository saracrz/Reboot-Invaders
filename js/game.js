function Game() {
  this.playing = false;
  this.timerId;
  this.shooter = new Shooter();
  this.aliens = [];
  this.bullets = [];
  this.alienBullets = [];
  this.score = 0;
  this.lives = 3;
  this.gameHTML = document.getElementById('game');
  this.scoreHTML = document.getElementById('score');

  for (var row = 50, rowIndex = 1; row < 201; row += 75, rowIndex++) {
    for (var col=20; col<490; col+=90) {
      this.aliens.push(new Alien(col, row, rowIndex));
    }
  }

  this.createAlienBullet = function() {
    var alien = this.aliens[parseInt(Math.random() * this.aliens.length)];
    var alienBullet = new BulletAlien(alien.x, alien.y);
    alienBullet.createHTML();
    this.alienBullets.push(alienBullet);
  };

  this.moveAliens = function() {
    this.aliens.forEach(function(alien) {
      alien.move();
    });
  };

  this.moveBullets = function() {
    // move shooter bullets
    this.bullets.forEach(function(bullet) {
      bullet.move();
    });
    // move alien bullets
    this.alienBullets.forEach(function(bullet) {
      bullet.move();
    });
  };

  this.collision = function () {
    // Remove bullets that didn't hit
    for (var i = 0; i < this.bullets.length; i++) {
      if (this.bullets[i].y <= 0) {
        this.gameHTML.removeChild(this.bullets[i].elem);
        this.bullets.splice(i, 1);
      }
    };

    // Detect if aliens bullet impact starship
    for (var j = 0; j < this.alienBullets.length; j++) {
      if ( this.alienBullets[j].y >= 726 &&
           this.alienBullets[j].y <= 770 &&
           this.alienBullets[j].x > this.shooter.left - 20 &&
           this.alienBullets[j].x < this.shooter.left + 80
        ) {
        this.gameHTML.removeChild(this.alienBullets[i].elem);
        this.alienBullets.splice(i, 1);
        document.getElementById('lives-section').removeChild(document.getElementsByClassName('live')[this.lives-1]);
        if (this.lives > 1) {
          this.lives--;
        } else {
          game.gameOver();
        }
        return;
      }
    }
    // Remove alien bullets that didn't hit
    for (var i = 0; i < this.alienBullets.length; i++) {
      if (this.alienBullets[i].y >= 760) {
        this.gameHTML.removeChild(this.alienBullets[i].elem);
        this.alienBullets.splice(i, 1);
      }
    };
    // Detect if aliens impact starship
    for (var j = 0; j < this.aliens.length; j++) {
      if (this.aliens[j].y + 50 >= 740){
        game.gameOver();
        return;
      }
    }

    for (var i = 0; i < this.bullets.length; i++) {
      for (var j = 0; j < this.aliens.length; j++) {
        var bullet_x_min = this.bullets[i].x;
        var bullet_x_max = this.bullets[i].x + 30;
        var bullet_y_min = this.bullets[i].y;
        var bullet_y_max = this.bullets[i].y + 50;
        var aliens_x_min = this.aliens[j].x;
        var aliens_x_max = this.aliens[j].x + 70;
        var aliens_y_min = this.aliens[j].y;
        var aliens_y_max = this.aliens[j].y + 50;

        if (bullet_x_min <= aliens_x_max &&
            bullet_x_max >= aliens_x_min &&
            bullet_y_min <= aliens_y_max &&
            bullet_y_max >= aliens_y_min ) {

          this.gameHTML.removeChild(this.bullets[i].elem);
          this.bullets.splice(i,1);

          this.gameHTML.removeChild(this.aliens[j].elem);
          this.aliens.splice(j,1);
          jumpFour.play();
          this.score += 50;
          this.scoreHTML.innerHTML = 'SCORE: '+this.score;
          return;

        }
      }
    }
  };

  this.win = function () {
    if (this.aliens.length == 0) {
      var p2 = document.createElement("p");
      p2.classList.add("win");
      document.getElementById("game").appendChild(p2);
      p2.innerText = "YOU WIN!";
      jumpEnd.play();
      this.stop();
    }
  }


  this.start = function () {
    this.welcome = document.getElementById('pre-game');
    this.gameHTML.removeChild(this.welcome);
    this.shooter.createHTML();
    this.aliens.forEach(function(alien){
      alien.createHTML();
    });

    window.addEventListener( "keydown", function(event) {
        if (event.key === "ArrowLeft") { this.shooter.moveLeft(); }
        if (event.key === "ArrowRight") { this.shooter.moveRight(); }
        if (event.key === ' ')    {
          var newBullet = new Bullet(this.shooter.left);
          newBullet.createHTML();
          this.bullets.push(newBullet);
        }
      }.bind(this)
    );

    this.timerAliens      = setInterval(this.moveAliens.bind(this), 80);
    this.timerBullet      = setInterval(this.moveBullets.bind(this), 20);
    this.timerAlienBullet = setInterval(this.createAlienBullet.bind(this), 1500); // <--
    this.intervalStep     = setInterval(this.collision.bind(this), 80);
    this.timerWin         = setInterval(this.win.bind(this), 80);

    this.stop = function() {
      window.clearInterval(this.timerAliens);
      window.clearInterval(this.timerBullet);
      window.clearInterval(this.intervalStep);
      window.clearInterval(this.timerWin);
      window.clearInterval(this.timerAlienBullet);
    }

    this.gameOver = function () {
      this.stop();
      this.gameHTML.removeChild(document.getElementsByClassName('shooter')[0])
      var p = document.createElement("p");
      p.classList.add("game-over");
      document.getElementById("game").appendChild(p);
      p.innerText = "GAME OVER";
      jumpSix.play();
    }
  }
}

game = new Game();

document.addEventListener("DOMContentLoaded", function (event) {
  document.getElementById("play-button").addEventListener("click", function(){
    game.start();
  });
  document.getElementById("reset-button").addEventListener("click", function() {
    game.stop();
  });
  document.getElementById("future-button").addEventListener("click", function(){
    for (var s = 2; s < document.getElementsByTagName('link').length; s++) {
      document.styleSheets[s].disabled = true;
    }
    var link = document.createElement('link');
    link.setAttribute('href', './css/future.css');
    link.setAttribute('rel', 'stylesheet')
    document.head.appendChild(link);
  })

  document.getElementById("retro-button").addEventListener("click", function () {
    var stylesRemove = document.getElementsByTagName('link')
    for (var s = 2; s < stylesRemove.length; s++) {
      document.styleSheets[s].disabled = true;
    }
    var link = document.createElement('link');
    link.setAttribute('href', './css/styles.css');
    link.setAttribute('rel', 'stylesheet')
    document.head.appendChild(link);
  })


});
