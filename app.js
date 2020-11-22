const FLAG = "/!\\"

;(() => {
  window.Demineur = new (class Demineur {
    //Array à deux dimensions
    plan = [[]]
    flags = {}
    onNoBombCallBack = (x, y) => {}
    showNumberCallback = (x, y, number) => {}

    constructor() {
      this.setPlan = this.setPlan.bind(this)
      this.play = this.play.bind(this)
      this.getBombsArround = this.getBombsArround.bind(this)
      this.runThroughNeighboors = this.runThroughNeighboors.bind(this)
    }

    setPlan(arrTwoDimension) {
      this.plan = arrTwoDimension
    }

    toogleFlag(x, y) {
      if (!this.flags[x]) this.flags[x] = {}
      if (this.flags[x][y]) {
        delete this.flags[x][y]
        return undefined
      }
      this.flags[x][y] = true
      return FLAG
    }

    play(x, y) {
      if (this.plan[x][y]) {
        this.plan[x][y] = this.getBombsArround(x, y, true).toString()
        this.showNumberCallback(x, y, this.plan[(x, y)])
        return this.plan[x][y]
      } else return -1
    }

    getBombsArround(x, y, isFirst) {
      let count = 0

      this.runThroughNeighboors(x, y, (rx, ry) => {
        if (!this.plan[rx][ry]) {
          if (typeof this.plan[(rx, ry)] !== "number") count++
        }
      })

      if (count == 0 && isFirst) {
        this.porpagate(x, y, [])
      }

      return count
    }

    porpagate(x, y, noCbList) {
      let that = this
      this.runThroughNeighboors(x, y, (rx, ry) => {
        if (
          noCbList.find((l) => l == JSON.stringify({ rx, ry })) == undefined
        ) {
          noCbList.push(JSON.stringify({ rx, ry }))
          let bombsArround = that.getBombsArround(rx, ry, false)
          if (bombsArround == 0) {
            this.plan[rx][ry] = "0"
            this.onNoBombCallBack(rx, ry)
            that.porpagate(rx, ry, noCbList)
          } else {
            this.plan[rx][ry] = bombsArround.toString()
            this.showNumberCallback(rx, ry, bombsArround)
          }
        }
      })
    }

    runThroughNeighboors(x, y, cb) {
      for (let currentX = x - 1; currentX <= x + 1; currentX++) {
        if (currentX < 0 || currentX >= this.plan.length) continue
        for (let currentY = y - 1; currentY <= y + 1; currentY++) {
          if (currentY < 0 || currentY >= this.plan[currentX].length) continue
          if (currentX == x && currentY == y) continue
          cb.call(this, currentX, currentY)
        }
      }
    }
  })()

  let app = document.getElementById("app")

  //TODO Should be in the Demineur Model

  function initGrille(baseSize) {
    let arrayToDisplay = []
    for (let x = 0; x < baseSize; x++) {
      arrayToDisplay.push([])

      let breakLine = document.createElement("div")
      breakLine.classList.add("lineFlex")
      app.appendChild(breakLine)

      for (let y = 0; y < baseSize; y++) {
        arrayToDisplay[x].push(Math.random() < 0.87)

        let button = document.createElement("div")
        button.classList.add("cell")
        button.id = x + "and" + y

        button.onclick = function (_) {
          let playResult = window.Demineur.play(x, y)
          if (playResult >= 0) {
            button.textContent = playResult
            button.classList.add("discovered")
            button.classList.add("s" + playResult.toString())
          } else {
            if(!alert("You lost !")) location.reload();
          }
          // call function() create normal;
          button.classList.add("white")
        }

        button.oncontextmenu = (ev) => {
          ev.preventDefault()
          button.textContent = window.Demineur.toogleFlag(x, y)
        }
        breakLine.appendChild(button)
      }

      //Setting up window.Demineur
      window.Demineur.setPlan(arrayToDisplay)
      window.Demineur.onNoBombCallBack = (x, y) => {
        let button = document.getElementById(x + "and" + y)
        button.classList.add("noBomb")
      }
      window.Demineur.showNumberCallback = (x, y, number) => {
        let button = document.getElementById(x + "and" + y)
        button.textContent = number.toString()
        button.classList.add("discovered")
      }
    }
  }
  initGrille(15);
})()
