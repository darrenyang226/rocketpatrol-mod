class Rocket extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this); 
        this.isFiring = false;   
        this.moveSpeed = game.settings.spaceshipSpeed/3*2;   
        this.sfxRocket = scene.sound.add('sfx_rocket'); 
    }

    update() {
        if(!game.settings.mouseCon){
            if(!this.isFiring) {
                if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                    this.x -= this.moveSpeed;
                } else if (keyRIGHT.isDown && this.x <= game.config.width -
                borderUISize - this.width) {
                    this.x += this.moveSpeed;
                }
            }
            if(Phaser.Input.Keyboard.JustDown(keyS) && !this.isFiring) {  //F
                this.isFiring = true;
                this.sfxRocket.play();  
            }
            
            if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
                this.y -= this.moveSpeed;
            }
            
            if(this.y <= borderUISize * 3 + borderPadding) {
                this.reset();
            }
        }else {
            
            if (!this.isFiring && input.x >= borderUISize + this.width
                && input.x <= game.config.width - borderUISize - this.width) { 
                this.x = input.x;
            }
            if(mouse.isDown && !this.isFiring) {
                this.isFiring = true;
                this.sfxRocket.play();   
            }
            
            if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
                this.y -= this.moveSpeed;
            }
        
            if(this.y <= borderUISize * 3 + borderPadding) {
                this.reset();
            }
        }
    }

    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize -borderPadding - 6;
    }
}