class Game {
  constructor() {
      this.windowWidth = (window.innerWidth * .9) - 800;
      let margin = this.windowWidth / 2;
      this.populateEnemies(margin);
      this.outermost = margin;
      
      this.speed = 500;
      this.movingLeft = 0;
      this.placePlayer(margin);
      this.moveEnemies();
  }


  populateEnemies(margin) {
    this.enemies = Array(10).fill(5);
    document.getElementById("enemies").innerHTML = "";
    let enemyTemplate = `<img src="./enemy.png" class="enemy" />`
    let row = `<div class="enemy-row" style="margin-left:${margin}px">` 
    row += (enemyTemplate.repeat(10))
    row += `</div>`
    document.getElementById("enemies").innerHTML = row.repeat(5);
  }


  placePlayer() {
    let margin = (window.innerWidth / 2) - 30;
    let playerHTML = `<img 
        src="./player.png"
        id="player"
        style="margin-left:${margin}px;"/>`
    document.getElementById("player-bar").innerHTML = playerHTML;
    document.addEventListener("keydown", (e) => {
      this.changePlayerDirection(e,this);
    });
  }


  changePlayerDirection(e,game) {
      let direction;
      if (e.key == "ArrowRight") {
        direction = 0;
      } else if (e.key == "ArrowLeft") {
        direction = 1;
      }

      if (typeof(direction) != "undefined") {
        let player = document.getElementById("player");
        game.moveObject(player, 40, direction);
      }
  }


  moveEnemies() {
    let enemyRows = Object.entries(
      document.getElementsByClassName("enemy-row"));
    if (this.outermost >= this.windowWidth) {
      this.moveObject(enemyRows[0][1], 15, 2);
      this.speed -= 15;
      this.movingLeft = Boolean(this.movingLeft) ? 0 : 1;
      this.outermost = 0;
    }

    enemyRows.forEach((enemyRow) => this.moveObject(
    enemyRow[1], 20, this.movingLeft));

    setTimeout(() => {
      this.outermost = this.outermost + 20;
      this.moveEnemies();
    }, this.speed)
  }


  moveObject(elem, shift, direction) {
    let relevantMargin;
    switch (direction) {
      case 0:
        relevantMargin = "marginLeft";
        break;
      case 1:
        relevantMargin = "marginLeft";
        shift = -shift;
        break;
      case 2:
        relevantMargin = "marginTop";
        break;
      case 3:
        relevantMargin = "marginBottom";
    }

    let existingMargin = parseInt(
      elem.style[relevantMargin].split("p")[0]);
    
    //check for player obj to not go off-screen
    let cantMove = (
      (direction == 0 && existingMargin + shift  >= (window.innerWidth * .9)) ||
      (direction == 1 && existingMargin + shift <=  0)
    )
    console.log(existingMargin + shift);
    if (!cantMove) {
        elem.style[relevantMargin] = `${(existingMargin || 0) + shift}px`; 
    }
  }
}


let game;
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("enemies").innerHTML = "";
  game = new Game();
});
