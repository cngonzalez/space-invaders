class Game {

constructor() {
    this.windowWidth = (window.innerWidth * .9) - 800;
    let margin = this.windowWidth / 2;
    this.populateEnemies(margin);
    this.outermost = margin;
    this.speed = 500;
    this.movingLeft = 0;
    this.placePlayer();
    this.moveEnemies();
  }


  populateEnemies(margin) {
    //represents objs remaining in  each enemy col
    this.enemies = Array(10).fill(5);
    document.getElementById("enemies").innerHTML = "";
    let enemyTemplate = `<img src="./enemy.png" class="enemy" />`
    let row = `<div class="enemy-row" style="margin-left:${margin}px">` 
    row += (enemyTemplate.repeat(10))
    row += `</div>`
    document.getElementById("enemies").innerHTML = row.repeat(5);
  }

  placePlayer() {}


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
    }

    let existingMargin = parseInt(
      elem.style[relevantMargin].split("p")[0]);

    elem.style[relevantMargin] = `${(existingMargin || 0) + shift}px`; 
    
  }
}


let game;
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("enemies").innerHTML = "";
  game = new Game();
});


function moveRight(img) {
  setTimeout(() => {
    let leftPos = parseInt(img.style.left.split("p")[0]);
    img.style.left = `${leftPos + 50}px`;
    moveRight(img);
    }, 250);
}
