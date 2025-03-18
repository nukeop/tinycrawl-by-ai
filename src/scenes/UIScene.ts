import { BaseScene } from './BaseScene';
import { SCENES } from '../utils/constants';

export class UIScene extends BaseScene {
  constructor() {
    super(SCENES.UI);
  }

  create(): void {
    // Call parent create method first to initialize helpers
    super.create();
    
    // This scene will remain active and on top of other scenes
    // It will handle persistent UI elements
    
    // For now, just add a simple status bar at the top
    const graphics = this.add.graphics();
    graphics.fillStyle(0x333333, 0.8);
    graphics.fillRect(0, 0, this.scale.width, 5);
    
    // We'll implement actual UI elements in later steps
  }
}
