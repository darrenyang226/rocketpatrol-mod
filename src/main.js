let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [Menu, Menu2, Menu3, Play, Play2]
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let keyS, keyR, keyLEFT, keyRIGHT, keyCLICK, input, mouse; 


//Name: Darren Yang, Project title: Rocket Patrol Modified, 7/07/2021, took estimated 4 days to complete.
//Aimed for intermediate tier, 
//create a new spaceship type(20)
//Implement an alternating two-player mode (20),
//Create new artwork for all of the in-game assets (rocket, spaceships, explosion) (20)  
//Implement mouse control for player movement and mouse click to fire (20)
// Credit: James Liu (two-player mode, mouse control), https://www.youtube.com/watch?v=88DS3Z8nOdY (Score, general coding)
//https://steemit.com/utopian-io/@onepice/move-objects-according-to-the-mouse-position-with-phaser-3?fbclid=IwAR1skVmm8R2uDRqeFeqJ-F7Zxj9KlVVaa-qZWjP6vY1IoHonr4SW_z-RkV8(mouse control)

