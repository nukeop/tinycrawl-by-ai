import Phaser from 'phaser';
import { BaseScene } from './BaseScene';
import { COLORS, FONT, SCENES } from '../utils/constants';

export class MenuScene extends BaseScene {
  constructor() {
    super(SCENES.MENU);
  }

  create(): void {
    // Call parent create method first to initialize helpers
    super.create();
    
    const centerX = Math.floor(this.scale.width / 2);
    const centerY = Math.floor(this.scale.height / 2);

    // Title text - with smaller text for better fit
    const titleText = this.pixelTextHelper.createPixelText(
      centerX, 
      centerY - 8, 
      'TINY CRAWL',
      FONT.SMALL,
      COLORS.WHITE
    );
    titleText.setOrigin(0.5);

    // Menu options with shorter text
    const menuItems = [
      { text: 'PLAY', scene: SCENES.EXPLORATION },
      { text: 'TEST', scene: 'ScalingTestScene' }
    ];
    
    // Create menu options with the helper
    menuItems.forEach((item, index) => {
      const y = centerY + (index * 5); // Reduced spacing
      
      this.pixelTextHelper.createPixelTextButton(
        centerX,
        y,
        item.text,
        () => {
          this.transitionToScene({ target: item.scene });
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
    
    // Add escape key to pause
    this.input.keyboard.on('keydown-ESC', () => {
      this.pauseGame();
    });
  }
}
