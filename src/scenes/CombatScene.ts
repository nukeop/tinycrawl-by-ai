import Phaser from 'phaser';

export class CombatScene extends Phaser.Scene {
  constructor() {
    super({ key: 'CombatScene' });
  }

  create(): void {
    // This is a placeholder for now
    // In later steps, we'll implement the actual combat system
    
    const centerX = this.scale.width / 2;
    const centerY = this.scale.height / 2;
    
    this.add.text(centerX, centerY, 'Combat Mode', { 
      fontSize: '5px', 
      color: '#ffffff' 
    }).setOrigin(0.5);
    
    // Temporary way to transition back to exploration for testing
    this.input.on('pointerdown', () => {
      this.scene.start('ExplorationScene');
    });
  }
}
