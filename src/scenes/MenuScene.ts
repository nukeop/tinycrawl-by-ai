import Phaser from 'phaser';
import { COLORS, FONT } from '../utils/constants';
import { PixelTextHelper } from '../utils/PixelTextHelper';

export class MenuScene extends Phaser.Scene {
  private textHelper!: PixelTextHelper;
  
  constructor() {
    super({ key: 'MenuScene' });
  }

  create(): void {
    // Initialize text helper
    this.textHelper = new PixelTextHelper(this);
    
    const centerX = Math.floor(this.scale.width / 2);
    const centerY = Math.floor(this.scale.height / 2);

    // Title text - ensure it's on pixel boundaries
    const titleText = this.textHelper.createPixelText(
      centerX, 
      centerY - 12, 
      'TINY CRAWL',
      FONT.SMALL,
      COLORS.WHITE
    );
    titleText.setOrigin(0.5);

    // Menu options
    const menuItems = [
      { text: 'START GAME', scene: 'ExplorationScene' },
      { text: 'SCALE TEST', scene: 'ScalingTestScene' }
    ];
    
    // Create menu options with the helper
    menuItems.forEach((item, index) => {
      const y = centerY + (index * 7);
      
      this.textHelper.createPixelTextButton(
        centerX,
        y,
        item.text,
        () => {
          this.scene.start(item.scene);
        },
        FONT.TINY,
        COLORS.WHITE
      ).setOrigin(0.5);
    });

    // Add simple animation to make the title pulse
    this.tweens.add({
      targets: titleText,
      alpha: { from: 1, to: 0.8 },
      duration: 1200,
      yoyo: true,
      repeat: -1
    });
  }
}
