class Demineur {
  //Array à deux dimensions
  plan = [[]];

  constructor() {
      this.setPlan = this.setPlan.bind(this)
      this.play = this.play.bind(this)
      this.getBombsArround = this.getBombsArround.bind(this)
      this.runThroughNeighboors = this.runThroughNeighboors.bind(this)
  }

  setPlan(arrTwoDimension) {
    this.plan = arrTwoDimension;
  }

  play(x, y) {
    if (this.plan[x][y]) {
      this.plan[x][y] = this.getBombsArround(x, y).toString();
      return this.plan[x][y];
    } else return -1;
  }

  getBombsArround(x, y) {
    let count = 0;
    this.runThroughNeighboors(x, y, (rx, ry) => {
      console.log(x + " " + y, this.plan[rx][ry]);
      if (!this.plan[rx][ry] && typeof this.plan[rx, ry] !== "number") count++;
    });
    return count;
  }

  runThroughNeighboors(x, y, cb) {
    console.log(this.plan);

    for (let currentX = x - 1; currentX <= x + 1; currentX++) {
      if (currentX < 0 || currentX >= this.plan.length) continue;
      for (let currentY = y - 1; currentY <= y + 1; currentY++) {
        if (currentY < 0 || currentY >= this.plan[currentX].length) continue;
        if (currentX == x && currentY == y) continue;
        cb.call(this, currentX, currentY);
      }
    }
  }
}

(() => {
  let app = document.getElementById("app");

  function initGrille(size) {
    let arrayToDisplay = [];

    let demineur = new Demineur();

    let baseSize = size;

    for (let i = 0; i < baseSize; i++) {
      arrayToDisplay.push([]);

      let breakLine = document.createElement("div");
      breakLine.classList.add("lineFlex")
      app.appendChild(breakLine);

      for (let j = 0; j < baseSize; j++) {
        arrayToDisplay[i].push(Math.random() < 0.80);

        let button = document.createElement("div");
        button.classList.add("cell");

        button.onclick = function (_) {
          let playResult = demineur.play(i, j);
          if (playResult >= 0) {
            button.textContent = playResult;
            button.classList.add("discovered");
            button.classList.add("s"+playResult.toString())
          } else {
            alert("You lost you fucking piece of shit")
          }
          // call function() create normal;
          button.classList.add("white");
        };
        breakLine.appendChild(button)
      }

      demineur.setPlan(arrayToDisplay);
    }


  }
  initGrille(12)

})();
