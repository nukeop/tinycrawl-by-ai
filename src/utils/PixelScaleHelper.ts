import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT, ZOOM_LEVEL } from './constants';

export class PixelScaleHelper {
  private scene: Phaser.Scene;
  
  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }
  
  /**
   * Initialize the scaling for pixel-perfect rendering
   */
  public initPixelScale(): void {
    // Set zoom level for pixel-perfect scaling
    this.scene.cameras.main.setZoom(ZOOM_LEVEL);
    
    // Ensure camera is centered
    this.scene.cameras.main.centerOn(GAME_WIDTH / 2, GAME_HEIGHT / 2);
    
    // Disable smoothing for pixel art
    this.scene.cameras.main.setRoundPixels(true);
  }
  
  /**
   * Draw a test pattern to verify pixel-perfect rendering
   */
  public drawTestPattern(): Phaser.GameObjects.Container {
    const container = this.scene.add.container(0, 0);
    
    // Draw a grid pattern
    const graphics = this.scene.add.graphics();
    
    // Background
    graphics.fillStyle(0x222222);
    graphics.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    
    // Grid lines
    graphics.lineStyle(1, 0x555555, 0.5);
    
    // Vertical lines
    for (let x = 0; x <= GAME_WIDTH; x += 10) {
      graphics.beginPath();
      graphics.moveTo(x, 0);
      graphics.lineTo(x, GAME_HEIGHT);
      graphics.closePath();
      graphics.strokePath();
    }
    
    // Horizontal lines
    for (let y = 0; y <= GAME_HEIGHT; y += 10) {
      graphics.beginPath();
      graphics.moveTo(0, y);
      graphics.lineTo(GAME_WIDTH, y);
      graphics.closePath();
      graphics.strokePath();
    }
    
    // Add some colored squares to test pixels
    const testSquares = [
      { x: 10, y: 10, color: 0xff0000 },
      { x: 20, y: 10, color: 0x00ff00 },
      { x: 30, y: 10, color: 0x0000ff },
      { x: 40, y: 10, color: 0xffff00 }
    ];
    
    testSquares.forEach(square => {
      const box = this.scene.add.graphics();
      box.fillStyle(square.color);
      box.fillRect(square.x, square.y, 8, 8);
      container.add(box);
    });
    
    container.add(graphics);
    
    return container;
  }
}
