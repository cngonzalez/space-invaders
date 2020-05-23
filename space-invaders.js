class Game {
  constructor() {
      this.windowWidth = (Math.floor(window.innerWidth * .9)) - 800;
      let margin = this.windowWidth / 2;
      this.vulnerableEnemies = this.populateEnemies(margin);
      this.placePlayer(margin);
      this.outermost = margin;
      
      this.speed = 1000;
      this.movingLeft = 0;
      this.moveEnemies();
  }


  populateEnemies(margin) {
    let enemiesDiv = document.getElementById("enemies");
    enemiesDiv.innerHTML = "";
    let enemyTemplate = `<img src="./enemy.png" class="enemy"`;
    for (let i=0;i<5;i++) {
      let row = `<div class="enemy-row" style="margin-left:${margin}px">` 
      for (let j=0;j<10;j++) {
        row += (enemyTemplate + `id="${i}-${j}" />`);
      }
      row += `</div>`
      enemiesDiv.innerHTML += row;
    }
    let vulnerableEnemies = [];
    for (let j=0;j<10;j++) {
      vulnerableEnemies.push(
      new Enemy(4, j, margin, 0));
    }
    return vulnerableEnemies;
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

        //check for player obj to not go off-screen
        let cantMove = (
          (direction == 0 && parseInt(player.style.marginLeft.split("p")[0]) + 40  >= (window.innerWidth * .9)) ||
          (direction == 1 && parseInt(player.style.marginLeft.split("p")[0]) - 40 <=  0)
        );

        if (!cantMove) {game.moveObject(player, 40, direction)};
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

    enemyRows.forEach((enemyRow) => (this.moveObject(
    enemyRow[1], 20, this.movingLeft)));

    this.vulnerableEnemies.forEach((enemy) => (
      enemy.update(this.movingLeft, 20)));

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
      elem.style[relevantMargin] = `${(existingMargin || 0) + shift}px`; 
  }
}



class Enemy {
  constructor(i, j, leftMargin, topMargin) {
    this.i = i;
    this.j = j;
    this.leftBound = leftMargin + (j * 80) + 20;
    this.rightBound = this.leftBound + 40;
    this.bottomBound = topMargin + (i * 75) + 55;
  }

  update(direction, amount) {
    switch(direction) {
      case 0:
        this.leftBound -= amount;
        this.rightBound -= amount;
        break;
      case 1:
        this.leftBound += amount;
        this.rightBound += amount;
        break;
      case 2:
        this.bottomBound += amount;
    }
  }
}


let game;
document.addEventListener("DOMContentLoaded", function() {
  document.addEventListener("keydown", (e) => {
    if (typeof(game) == "undefined") {
      game = new Game();
    }
  });
});
