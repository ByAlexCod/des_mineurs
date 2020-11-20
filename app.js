(() => { 
	let app = document.getElementById('app');
    let arrayToDisplay = [];

    for(let i = 0; i < 5; i++) {
        arrayToDisplay.push([]);

        let breakLine = document.createElement('br');
		app.appendChild(breakLine);

        for(let j = 0; j < 5; j++){
            arrayToDisplay[i].push(Math.random() < 0.7);

            let button = document.createElement('button');
			button.classList.add("cell");
			app.appendChild(button);

            if (arrayToDisplay[i][j]) {
            	button.onclick = function() {
					// call function() create normal;
					button.classList.add("white");
				}
            }
            else {
            	button.onclick = function() {
					if(!alert('You lost you fucking piece of shit'))
						window.location.reload();
				}
            }
        }
    }
    
    Window.Demineur = new Demineur(arrayToDisplay);


    class Demineur {
        //Array à deux dimensions
        #plan = [[]];
        constructor(plan) {
            this.#plan = plan;
        }

        play(x, y) {
            if(this.#plan[x][y]) {
                this.#plan[x][y] = this.getBombsArround(x, y)
                return true;
            } else return false;
        }

        getBombsArround(x, y) {
            let count = 0;
            this.runThroughNeighboors(x, y, (rx, ry) =>{ 
                if(!this.#plan[rx][ry]) count ++;
            } )
            return count;
        }

        runThroughNeighboors(x, y, cb) {
            for(let xi = x - 1 < 0 ? x - 1 : x; xi <= x + 1 < this.#plan.length ?  x + 1 : x; xi ++) {
                for(let yi = - 1 < 0 ? y - 1 : y; yi <= this.#plan[xi].length ? y + 1 : y; yi ++) {
                    if(xi === x && yi === y) continue;
                    cb(xi, yi);
                }
            }
        }
    }
    
})();