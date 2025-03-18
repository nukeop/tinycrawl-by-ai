import Phaser from 'phaser';
import { COLORS, FONT } from './constants';

export class PixelTextHelper {
  private scene: Phaser.Scene;
  
  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }
  
  /**
   * Create text that renders crisply in our pixel art style
   */
  public createPixelText(
    x: number, 
    y: number, 
    text: string, 
    size: string = FONT.TINY,
    color: string = COLORS.WHITE
  ): Phaser.GameObjects.Text {
    const pixelText = this.scene.add.text(
      Math.floor(x), // Ensure pixel alignment by using integer positions
      Math.floor(y),
      text,
      {
        fontFamily: FONT.FAMILY,
        fontSize: size,
        color: color,
        resolution: 1, // Critical for crisp rendering
        padding: { x: 1, y: 1 } // Add slight padding to prevent clipping
      }
    );
    
    // Force pixel alignment
    pixelText.setResolution(1);
    
    // Ensure the text is properly positioned on pixel boundaries
    pixelText.x = Math.floor(pixelText.x);
    pixelText.y = Math.floor(pixelText.y);
    
    return pixelText;
  }
  
  /**
   * Create a button with crisp pixel text
   */
  public createPixelTextButton(
    x: number,
    y: number,
    text: string,
    callback: () => void,
    size: string = FONT.TINY,
    color: string = COLORS.WHITE,
    hoverColor: string = '#3498db'
  ): Phaser.GameObjects.Text {
    const button = this.createPixelText(x, y, text, size, color);
    
    // Make it interactive
    button.setInteractive({ useHandCursor: true });
    
    // Add event listeners
    button.on('pointerdown', callback);
    button.on('pointerover', () => button.setTint(Phaser.Display.Color.HexStringToColor(hoverColor).color));
    button.on('pointerout', () => button.clearTint());
    
    return button;
  }
}
