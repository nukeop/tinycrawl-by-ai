import Phaser from 'phaser';

export class ExplorationScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ExplorationScene' });
  }

  create(): void {
    // This is a placeholder for now
    // In later steps, we'll implement the actual exploration gameplay
    
    const centerX = this.scale.width / 2;
    const centerY = this.scale.height / 2;
    
    this.add.text(centerX, centerY, 'Exploration Mode', { 
      fontSize: '5px', 
      color: '#ffffff' 
    }).setOrigin(0.5);
    
    // Temporary way to transition to combat for testing
    this.input.on('pointerdown', () => {
      this.scene.start('CombatScene');
    });
  }
}
