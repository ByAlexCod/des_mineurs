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

})();