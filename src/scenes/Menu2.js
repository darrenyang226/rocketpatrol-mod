class Menu2 extends Phaser.Scene{
    constructor() {
        super("menuScene2");
    }

    init() {

    }
    preload() {
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

        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000000';
        this.add.text(game.config.width/2, game.config.height/2,
            'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            game.settings.spaceshipSpeed = 3;
            game.settings.gameTimer = 45000;
            game.settings.isPlayer2 = false;

            this.sound.play('sfx_select');
            this.scene.start('menuScene3');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            game.settings.spaceshipSpeed = 6;
            game.settings.gameTimer = 30000;
            game.settings.isPlayer2 = false;

            this.sound.play('sfx_select');
            this.scene.start('menuScene3');
        }
    }
}