import Phaser from 'phaser';
import { AssetManager } from '../utils/AssetManager';
import { PixelTextHelper } from '../utils/PixelTextHelper';
import { COLORS, FONT } from '../utils/constants';
import { debugLog } from '../utils/debug';

export class BootScene extends Phaser.Scene {
  private textHelper!: PixelTextHelper;
  
  constructor() {
    super({ key: 'BootScene' });
  }
  
  preload(): void {
    // Initialize text helper
    this.textHelper = new PixelTextHelper(this);
    
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
      
      // Generate placeholder sprites
      this.generatePlaceholderSprites();
      
      // Start the menu scene
      this.scene.start('MenuScene');
    });
    
    // Load assets from AssetManager
    AssetManager.loadAll(this);
  }
  
  create(): void {
    this.textHelper.createPixelText(2, 2, 'Loading...', FONT.TINY, COLORS.WHITE);
  }
  
  private generatePlaceholderSprites(): void {
    // Create player placeholder sprite
    this.createPlaceholderSprite('player', 0x3498db);
    
    // Create enemy placeholder sprite
    this.createPlaceholderSprite('enemy', 0xe74c3c);
    
    // Create basic tile placeholder sprites
    this.createPlaceholderSprite('tile_wall', 0x7f8c8d);
    this.createPlaceholderSprite('tile_floor', 0x95a5a6);
    
    debugLog('Generated placeholder sprites');
  }
  
  private createPlaceholderSprite(key: string, color: number): void {
    // Create a texture for this sprite using graphics
    const graphics = this.make.graphics({ x: 0, y: 0, add: false });
    
    // Draw an 8x8 square
    graphics.fillStyle(color);
    graphics.fillRect(0, 0, 8, 8);
    
    // Add a border
    graphics.lineStyle(1, 0xffffff, 0.8);
    graphics.strokeRect(0, 0, 8, 8);
    
    // Generate texture from graphics
    graphics.generateTexture(key, 8, 8);
    
    // Clean up graphics object
    graphics.destroy();
  }
}
