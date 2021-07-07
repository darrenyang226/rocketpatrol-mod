class Play extends Phaser.Scene{
    constructor() {
        super("playScene");
    }

    init() {

    }
    preload() {
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('rocket2', './assets/rocket_B.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('spaceship2', './assets/Spaceship_C.png');
        this.load.image('spaceship3', './assets/Spaceship_D.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('starfield2', './assets/starfield_B.png');
        this.load.spritesheet('explosion', './assets/explosion_B.png',
            {frameWidth: 30, frameHeight: 25, startFrame: 0, endFrame: 9});
    }
    create() {
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield2').setOrigin(0, 0);
        this.p1Rocket = new Rocket(this, game.config.width/2,
            game.config.height - borderUISize - borderPadding - 6,
            'rocket2').setOrigin(0.5, 0);
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6,
            borderUISize*4, 'spaceship3', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship2(this, game.config.width + borderUISize*3,
            borderUISize*5 + borderPadding*2, 'spaceship2', 0, 50).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 +
            borderPadding*4, 'spaceship3', 0, 10).setOrigin(0, 0);
        
        this.add.rectangle(0, borderUISize + borderPadding,
            game.config.width, 
            borderUISize * 2, 0x00FF00).setOrigin(0,0);

        this.add.rectangle(0,0, game.config.width,
            borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0,game.config.height - borderUISize, 
            game.config.width,
            borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0,0, borderUISize, 
            game.config.height, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(game.config.width - borderUISize, 0,
            borderUISize,
            game.config.height, 0xFFFFFF).setOrigin(0,0);

        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S); //F
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyCLICK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        input = this.input;
        mouse = this.input.mousePointer;

        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        this.p1Score = 0;
        let scoreConfig = {
            fontfamily: 'Courier',
            fontSzie: '28px',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 150,
        }

        this.add.text(borderUISize + borderPadding,
            borderUISize + borderPadding*2, "Player 1 score: ", scoreConfig);
        
        scoreConfig.align = 'right';
        scoreConfig.fixedWidth = 50;
        this.scoreLeft = this.add.text(borderUISize*6,
            borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        
        this.gameOver = false;

        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            if (!game.settings.isPlayer2) {
                this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
                this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu',
                scoreConfig).setOrigin(0.5);
            } else {
                this.add.text(game.config.width/2, game.config.height/2, 'Round End', scoreConfig).setOrigin(0.5);
                this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press → to Second Player or ← for Menu',
                scoreConfig).setOrigin(0.5);
                game.settings.score1 = this.p1Score;
            }
            this.gameOver = true;
        }, null, this);
    }
    update() {

        if (this.gameOver && !game.settings.isPlayer2 && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.sound.play('sfx_select');
            this.scene.restart();
        }

        if (this.gameOver && !game.settings.isPlayer2 && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.sound.play('sfx_select');
            this.scene.start("menuScene");
        }

        if (this.gameOver && game.settings.isPlayer2 && Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            this.sound.play('sfx_select');
            this.scene.start("playScene2");
        }
 
        if (this.gameOver && game.settings.isPlayer2 && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.sound.play('sfx_select');
            this.scene.start("menuScene");
        }
        this.starfield.tilePositionX -= 4;  

        if (!this.gameOver) {
            this.p1Rocket.update();            
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }


        if (this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
    }
    checkCollision(rocket, ship) {
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true;
        } else {
            return false;
        }
    }
    shipExplode(ship) {
        ship.alpha = 0;
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');                 
        boom.on('animationcomplete', () => {        
            ship.reset();                           
            ship.alpha = 1;                        
            boom.destroy();                         
        });
    
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');
    }
}