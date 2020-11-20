(() => { 
    let arrayToDisplay = [];
    for(let i= 0; i<5; i++) {
        arrayToDisplay.push([]);
        for(let j=0; j<5; j++){
            arrayToDisplay[i].push(Math.random() < 0.7);
        }
    }
})();