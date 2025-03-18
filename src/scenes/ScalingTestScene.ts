import Phaser from 'phaser';
import { BaseScene } from './BaseScene';
import { COLORS, FONT, SCENES } from '../utils/constants';

export class ScalingTestScene extends BaseScene {
  constructor() {
    super('ScalingTestScene');
  }
  
  create(): void {
    // Call parent create method first to initialize helpers
    super.create();
    
    // Draw test pattern to verify pixel rendering
    this.pixelScaleHelper.drawTestPattern();
    
    // Add 1px test lines
    const graphics = this.add.graphics();
    graphics.lineStyle(1, 0xffffff);
    
    // Horizontal line
    graphics.beginPath();
    graphics.moveTo(10, 25);
    graphics.lineTo(50, 25);
    graphics.closePath();
    graphics.strokePath();
    
    // Vertical line
    graphics.beginPath();
    graphics.moveTo(30, 15);
    graphics.lineTo(30, 35);
    graphics.closePath();
    graphics.strokePath();
    
    // Add text with our helper
    this.pixelTextHelper.createPixelText(30, 5, 'SCALE TEST', FONT.TINY, COLORS.WHITE)
      .setOrigin(0.5, 0);
    
    // Text rendering comparison
    this.pixelTextHelper.createPixelText(12, 16, 'CRISP', FONT.TINY, '#ff0000');
    
    // Regular text for comparison
    this.add.text(36, 16, 'NORMAL', { 
      fontSize: FONT.TINY, 
      color: '#00ff00' 
    });
    
    // Add some test sprites
    this.add.sprite(15, 30, 'player');
    this.add.sprite(45, 30, 'enemy');
    
    // Add return button with the helper
    this.pixelTextHelper.createPixelTextButton(
      30, 
      38, 
      'RETURN',
      () => {
        this.transitionToScene({ target: SCENES.MENU });
      },
      FONT.TINY,
      COLORS.WHITE
    ).setOrigin(0.5);
  }
}
