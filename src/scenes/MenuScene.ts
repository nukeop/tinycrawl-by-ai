import Phaser from 'phaser';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create(): void {
    const centerX = this.scale.width / 2;
    const centerY = this.scale.height / 2;

    // Title text
    this.add.text(centerX, centerY - 10, 'TINY CRAWL', { 
      fontSize: '8px', 
      color: '#ffffff'
    }).setOrigin(0.5);

    // Start game option
    const startText = this.add.text(centerX, centerY + 5, 'START', { 
      fontSize: '5px', 
      color: '#ffffff' 
    }).setOrigin(0.5);
    
    startText.setInteractive({ useHandCursor: true });
    startText.on('pointerdown', () => {
      this.scene.start('ExplorationScene');
    });

    // Add simple animation to make the start text blink
    this.tweens.add({
      targets: startText,
      alpha: { from: 1, to: 0.5 },
      duration: 800,
      yoyo: true,
      repeat: -1
    });
  }
}
