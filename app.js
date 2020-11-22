const FLAG = "/!\\"

;(() => {

  var timeOut;
  var para = document.createElement("p");
  var node = document.createTextNode("0");
  para.appendChild(node);

  para.id = "timer";
  
  let timerSpan = document.createElement("span")
  timerSpan.append(para);
  document.body.prepend(timerSpan);
	
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
        this.showNumberCallback(x, y, this.plan[x][y])
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
        this.propagate(x, y, [])
      }

      return count
    }

    propagate(x, y, noCbList) {
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
            that.propagate(rx, ry, noCbList)
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


  let isPartyStopped = true
  function updateTimer(last_second) {
  	let timer = document.getElementById("timer");

    timeOut = setTimeout(() => {
      if (!isPartyStopped) {
        timer.innerHTML = last_second;
        updateTimer(last_second + 1)
      }
    }, 1000)
  }
    const difficulties = [{
        name:"easy",
        size:5
    },
    {
        name:"medium",
        size:10
    },
    {
        name:"hard",
        size:15
    }]
    
  function initGrille(baseSize) {
    
    //Reset de l'app
    let app = document.getElementById("app")
    app.innerHTML = '';
    
    clearTimeout(timeOut);
    updateTimer(0);

    // Adding difficulty
    for(let difficulty of difficulties) {
        let label = document.createElement("label")
        let text = document.createTextNode(difficulty.name); 
        label.appendChild(text);
        app.appendChild(label);
    
        let radio = document.createElement("input")
        radio.id = "difficulty"+ difficulty.name
        radio.setAttribute("type", "radio")
        app.appendChild(radio)
        radio.onclick = function () {
            initGrille(difficulty.size);
        }
        if(baseSize === difficulty.size) document.getElementById("difficulty" + difficulty.name).checked = true;
    
    }

    let arrayToDisplay = []
    for (let x = 0; x < baseSize; x++) {
      arrayToDisplay.push([])

      let breakLine = document.createElement("div")
      breakLine.classList.add("lineFlex")
      app.appendChild(breakLine)

      for (let y = 0; y < baseSize; y++) {
        arrayToDisplay[x].push(Math.random() < 0.9)

        let button = document.createElement("div")
        button.classList.add("cell")
        button.id = x + "and" + y

        button.onclick = function (_) {
          if (isPartyStopped) {
            isPartyStopped = false
  			clearTimeout(timeOut);
            updateTimer(0)
          }
          let playResult = window.Demineur.play(x, y)
          if (playResult < 0) {
            isPartyStopped = true
            if (!alert("You lost !")) location.reload()
          }
          button.classList.add("white")
        }

        button.oncontextmenu = (ev) => {
          ev.preventDefault()
          button.textContent = window.Demineur.toogleFlag(x, y)
        }
        breakLine.appendChild(button)
      }

      //Setting up window.Demineur
    }

    function checkSuccess() {
      let isSuccess = true
      window.Demineur.plan.forEach((x) =>
        x.forEach(
          (y) =>
            (isSuccess = isSuccess && (y === false || typeof y == "string"))
        )
      )
      if (isSuccess && !alert("You won, wanna replay?")) location.reload()
    }
    window.Demineur.setPlan(arrayToDisplay)
    window.Demineur.onNoBombCallBack = (x, y) => {
      let button = document.getElementById(x + "and" + y)
      button.classList.add("noBomb")
      checkSuccess()
    }

    window.Demineur.showNumberCallback = (x, y, number) => {
      if (number !== "0") {
        let button = document.getElementById(x + "and" + y)
        button.textContent = number.toString()
        button.classList.add("discovered")

        checkSuccess()
      }
    }
  }

  initGrille(5)
})()
