import Phaser from 'phaser';
import { PixelScaleHelper } from '../utils/PixelScaleHelper';
import { PixelTextHelper } from '../utils/PixelTextHelper';
import { COLORS, FONT } from '../utils/constants';

export class ScalingTestScene extends Phaser.Scene {
  private pixelHelper!: PixelScaleHelper;
  private textHelper!: PixelTextHelper;
  
  constructor() {
    super({ key: 'ScalingTestScene' });
  }
  
  create(): void {
    // Initialize helpers
    this.pixelHelper = new PixelScaleHelper(this);
    this.textHelper = new PixelTextHelper(this);
    
    this.pixelHelper.initPixelScale();
    
    // Draw test pattern to verify pixel rendering
    this.pixelHelper.drawTestPattern();
    
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
    this.textHelper.createPixelText(30, 5, 'SCALE TEST', FONT.TINY, COLORS.WHITE)
      .setOrigin(0.5, 0);
    
    // Text rendering comparison
    this.textHelper.createPixelText(12, 16, 'CRISP', FONT.TINY, '#ff0000');
    
    // Regular text for comparison
    this.add.text(36, 16, 'NORMAL', { 
      fontSize: FONT.TINY, 
      color: '#00ff00' 
    });
    
    // Add some test sprites
    this.add.sprite(15, 30, 'player');
    this.add.sprite(45, 30, 'enemy');
    
    // Add return button with the helper
    this.textHelper.createPixelTextButton(
      30, 
      38, 
      'RETURN',
      () => {
        this.scene.start('MenuScene');
      },
      FONT.TINY,
      COLORS.WHITE
    ).setOrigin(0.5);
  }
}
