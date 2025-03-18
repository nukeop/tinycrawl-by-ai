import Phaser from 'phaser';
import { BaseScene } from './BaseScene';
import { Player } from '../entities/Player';
import { PlayerController } from '../controllers/PlayerController';
import { createBasicTilemap } from '../utils/TilemapHelper';
import { COLORS, FONT, SCENES } from '../utils/constants';

export class ExplorationScene extends BaseScene {
  private player!: Player;
  private controller!: PlayerController;
  private statusText!: Phaser.GameObjects.Text;
  
  constructor() {
    super(SCENES.EXPLORATION);
  }
  
  create(): void {
    // Call parent create method first to initialize helpers
    super.create();
    
    // Create a basic tilemap (we'll replace this with actual game data later)
    const tilemap = createBasicTilemap(this, 15, 10);
    
    // We'll load these textures in the BootScene later
    // For now, we'll just create a placeholder
    const graphics = this.add.graphics();
    graphics.fillStyle(0x222222);
    graphics.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);
    
    // Draw some floor tiles
    graphics.fillStyle(0x444444);
    for (let y = 1; y < 9; y++) {
      for (let x = 1; x < 14; x++) {
        graphics.fillRect(x * 4, y * 4, 4, 4);
      }
    }
    
    // Create player
    this.player = new Player({
      scene: this,
      x: 30,
      y: 20,
      texture: 'player' // We'll load this texture in the BootScene later
    });
    
    // Create controller
    this.controller = new PlayerController(this, this.player);
    
    // Add status text
    this.statusText = this.pixelTextHelper.createPixelText(
      30, 
      2, 
      'Dungeon Floor 1',
      FONT.TINY,
      COLORS.WHITE
    ).setOrigin(0.5, 0);
    
    // Add combat trigger (temporary for testing)
    const combatTrigger = this.pixelTextHelper.createPixelTextButton(
      30,
      35,
      'Enter Combat',
      () => {
        this.transitionToScene({ 
          target: SCENES.COMBAT, 
          data: { player: this.player } 
        });
      },
      FONT.TINY,
      COLORS.WHITE
    ).setOrigin(0.5);
    
    // Add escape key to pause
    this.input.keyboard.on('keydown-ESC', () => {
      this.pauseGame();
    });
  }
  
  update(): void {
    // Update player controller
    this.controller.update();
    
    // Update player
    this.player.update();
  }
}
