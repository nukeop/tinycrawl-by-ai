import Phaser from 'phaser';
import { PixelTextHelper } from '../utils/PixelTextHelper';
import { PixelScaleHelper } from '../utils/PixelScaleHelper';
import { debugLog } from '../utils/debug';
import { GAME_WIDTH, GAME_HEIGHT, ZOOM_LEVEL, SCENES } from '../utils/constants';

export type SceneTransitionConfig = {
  target: string;
  data?: Record<string, unknown>;
  fadeOutDuration?: number;
  fadeInDuration?: number;
  color?: number;
};

export class BaseScene extends Phaser.Scene {
  protected pixelTextHelper!: PixelTextHelper;
  protected pixelScaleHelper!: PixelScaleHelper;
  protected isTransitioning = false;
  
  constructor(key: string) {
    super({ key });
  }
  
  create(): void {
    // Initialize helpers
    this.pixelTextHelper = new PixelTextHelper(this);
    this.pixelScaleHelper = new PixelScaleHelper(this);
    
    // Apply pixel scaling to ensure pixel-perfect rendering
    this.pixelScaleHelper.initPixelScale();
    
    // Listen for resize events
    this.scale.on('resize', this.handleResize, this);
    
    debugLog(`Scene created: ${this.scene.key}`);
  }
  
  /**
   * Handle window/container resize events
   */
  protected handleResize(): void {
    // Safety check to ensure the scene is still active when resize is called
    if (!this.scene || !this.scene.manager || !this.scene.manager.isActive(this.scene.key)) {
      return;
    }
    
    // Re-apply pixel scaling after resize
    if (this.pixelScaleHelper) {
      this.pixelScaleHelper.initPixelScale();
    }
    
    debugLog(`Resize handled in scene: ${this.scene.key}`);
  }
  
  /**
   * Transition to another scene with a fade effect
   */
  protected transitionToScene(config: SceneTransitionConfig): void {
    if (this.isTransitioning) return;
    
    this.isTransitioning = true;
    const fadeOutDuration = config.fadeOutDuration || 250;
    const fadeInDuration = config.fadeInDuration || 250;
    const fadeColor = config.color || 0x000000;
    
    // Create a camera fade effect
    this.cameras.main.fadeOut(fadeOutDuration, fadeColor >> 16 & 0xff, fadeColor >> 8 & 0xff, fadeColor & 0xff);
    
    // Wait for fade out to complete
    this.cameras.main.once('camerafadeoutcomplete', () => {
      // Start the new scene
      this.scene.start(config.target, config.data);
      
      // Wait a frame to ensure the new scene is active
      this.time.delayedCall(10, () => {
        // Get the new scene and fade it in
        const targetScene = this.scene.get(config.target);
        if (targetScene.cameras && targetScene.cameras.main) {
          targetScene.cameras.main.fadeIn(
            fadeInDuration, 
            fadeColor >> 16 & 0xff, 
            fadeColor >> 8 & 0xff, 
            fadeColor & 0xff
          );
        }
      });
    });
    
    debugLog(`Transitioning from ${this.scene.key} to ${config.target}`);
  }
  
  /**
   * Pause the game and show a message
   */
  protected pauseGame(message = 'PAUSED'): void {
    this.scene.pause();
    
    // Create a semi-transparent overlay
    const overlay = this.add.rectangle(
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2,
      GAME_WIDTH,
      GAME_HEIGHT,
      0x000000,
      0.7
    );
    
    // Add pause text
    const pauseText = this.pixelTextHelper.createPixelText(
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2,
      message
    );
    pauseText.setOrigin(0.5);
    
    // Create a container for the pause elements
    const pauseContainer = this.add.container(0, 0, [overlay, pauseText]);
    pauseContainer.setDepth(1000);
    
    // Listen for key press to unpause
    const resumeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    resumeKey.once('down', () => {
      this.resumeGame(pauseContainer);
    });
    
    // Listen for click to unpause
    this.input.once('pointerdown', () => {
      this.resumeGame(pauseContainer);
    });
    
    debugLog(`Game paused in scene: ${this.scene.key}`);
  }
  
  /**
   * Resume the game
   */
  protected resumeGame(pauseContainer?: Phaser.GameObjects.Container): void {
    if (pauseContainer) {
      pauseContainer.destroy();
    }
    
    this.scene.resume();
    debugLog(`Game resumed in scene: ${this.scene.key}`);
  }
  
  /**
   * Helper method to get a reference to another scene
   */
  protected getScene<T extends Phaser.Scene>(key: string): T {
    return this.scene.get(key) as T;
  }
  
  /**
   * Clean up event listeners when scene is shut down
   */
  shutdown(): void {
    this.scale.off('resize', this.handleResize, this);
    super.shutdown();
  }
}
