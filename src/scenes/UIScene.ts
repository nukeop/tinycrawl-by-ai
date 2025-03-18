import Phaser from 'phaser';

export class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene', active: true });
  }

  create(): void {
    // This scene will remain active and on top of other scenes
    // It will handle persistent UI elements

    // For now, just add a simple status bar at the top
    const graphics = this.add.graphics();
    graphics.fillStyle(0x333333, 0.8);
    graphics.fillRect(0, 0, this.scale.width, 5);
    
    // We'll implement actual UI elements in later steps
  }
}
