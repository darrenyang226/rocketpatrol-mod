class Menu extends Phaser.Scene{
    constructor() {
        super("menuScene");
    }

    init() {

    }
    preload() {
        this.load.audio('sfx_select', './assets/assets_blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/assets_explosion38.wav');
        this.load.audio('sfx_rocket', './assets/assets_rocket_shot.wav');
    }
    create() {
        let menuConfig = {
            fontfamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#76716B',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0 
        }

        this.add.text(game.config.width/2,
            game.config.height/2 - borderUISize - borderPadding, 
            'ROCKET PATROL', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#7EDCBE';
        menuConfig.color = '#000000';
        this.add.text(game.config.width/2, game.config.height/2,
            'Press ← to use arrow contols', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding,
            'and f button to shoot', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize*2 +
            borderPadding*2, 'or press → to use mouse controls', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize*3 +
            borderPadding*3, 'and click to shoot', menuConfig).setOrigin(0.5);

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        
        game.settings = {
            spaceshipSpeed: 0,
            gameTimer: 0,
            isPlayer2: false,
            score1: 0,
            score2: 0,
            mouseCon: false
        }
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.sound.play('sfx_select');
            this.scene.start('menuScene2');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            game.settings.mouseCon = true;
            this.sound.play('sfx_select');
            this.scene.start('menuScene2');
        }
    }
}