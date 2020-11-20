(() => { 
	let app = document.getElementById('app');
    let arrayToDisplay = [];

    for(let i = 0; i < 5; i++) {
        arrayToDisplay.push([]);
        for(let j = 0; j < 5; j++){
            arrayToDisplay[i].push(Math.random() < 0.7);

            let button = document.createElement('button');
			button.classList.add("cell", "white");
			app.appendChild(button);

            if (arrayToDisplay[i][j]) {
            	button.onclick = function() {
					// call function() create normal;
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

})();