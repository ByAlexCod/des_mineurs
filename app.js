class Demineur {
    //Array à deux dimensions
    plan = [[]];

    setPlan(arrTwoDimension) {
        this.plan = arrTwoDimension;
    }

    play(x, y) {
        if(this.plan[x][y]) {
            this.plan[x][y] = this.getBombsArround(x, y)
            return this.plan[x][y];
        } else return -1;
    }

    getBombsArround(x, y) {
        let count = 0;
        this.runThroughNeighboors(x, y, 
            (rx, ry) =>{ 
                console.log(x + " " + y, this.plan[rx][ry]);
                if(!this.plan[rx][ry]) count ++;
            } )
        return count;
    }

    runThroughNeighboors(x, y, cb) {
        console.log(this.plan);

        for(let currentX = x - 1; currentX <= x + 1; currentX ++) {
            if(currentX < 0 || currentX >= this.plan.length) continue;
            for(let currentY = y - 1; currentY <= y + 1; currentY ++) {
                if(currentY < 0 || currentY >=  this.plan[currentX].length) continue;
                if(currentX == x && currentY == y) continue;
                cb(currentX, currentY)
            }
        }
    }
}


(() => { 
	let app = document.getElementById('app');
    let arrayToDisplay = [];

    let demineur = new Demineur();

    let baseSize = 10;

    for(let i = 0; i < baseSize; i++) {
        arrayToDisplay.push([]);

        let breakLine = document.createElement('br');
		app.appendChild(breakLine);

        for(let j = 0; j < baseSize; j++){
            arrayToDisplay[i].push(Math.random() < 0.7);

            let button = document.createElement('button');
			button.classList.add("cell");
			app.appendChild(button);

            	button.onclick = function(_) {
                    let playResult = demineur.play(i, j)
                    if(playResult >= 0) {
                       button.textContent = playResult
                    } else {
                        if(!alert('You lost you fucking piece of shit'))
						Window.location.reload();
                    }
					// call function() create normal;
					button.classList.add("white");
				}
            
            
            
        }
    }

    demineur.setPlan(arrayToDisplay);
    


    
    
})();