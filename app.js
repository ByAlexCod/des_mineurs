(() => { 
	let app = document.getElementById('app');
    let arrayToDisplay = [];
	var buttons = [];

    for(let i = 0; i < 5; i++) {
        arrayToDisplay.push([]);
        for(let j = 0; j < 5; j++){
            arrayToDisplay[i].push(Math.random() < 0.7);
            if (arrayToDisplay[i]) {
            	buttons[i] = document.createElement('button');

            	buttons[i].onclick = function() {
					// call function() create normal;
				}

				buttons[i].classList.add("cell", "white");
				app.appendChild(buttons[i]);
            }
            else {
            	buttons[i] = document.createElement('button');

            	buttons[i].onclick = function() {
					if(!alert('Alert For your User!'))
						window.location.reload();
				}
            }
        }
		app.appendChild(buttons[i]);
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