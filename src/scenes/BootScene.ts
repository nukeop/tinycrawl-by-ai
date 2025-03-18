import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload(): void {
    // Create loading graphics
    const progress = this.add.graphics();
    
    // Register a loading progress event
    this.load.on('progress', (value: number) => {
      progress.clear();
      progress.fillStyle(0xffffff, 1);
      progress.fillRect(0, this.scale.height / 2, this.scale.width * value, 1);
    });

    this.load.on('complete', () => {
      progress.destroy();
      this.scene.start('MenuScene');
    });

    // Load assets here
    // We'll add actual asset loading later
  }

  create(): void {
    this.add.text(2, 2, 'Loading...', { fontSize: '5px', color: '#ffffff' });
  }
}
