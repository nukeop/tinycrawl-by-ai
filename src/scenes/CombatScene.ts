import Phaser from 'phaser';
import { Player } from '../entities/Player';
import { Enemy, EnemyConfig } from '../entities/Enemy';
import { CombatSystem, CombatAction } from '../systems/CombatSystem';
import { PixelTextHelper } from '../utils/PixelTextHelper';
import { COLORS, FONT } from '../utils/constants';
import { debugLog } from '../utils/debug';

export class CombatScene extends Phaser.Scene {
  private player!: Player;
  private enemies: Enemy[] = [];
  private combatSystem!: CombatSystem;
  private actionButtons: Phaser.GameObjects.Text[] = [];
  private combatLog!: Phaser.GameObjects.Text;
  private textHelper!: PixelTextHelper;
  
  constructor() {
    super({ key: 'CombatScene' });
  }
  
  init(data: { player?: Player }): void {
    // If a player is passed in, use it; otherwise create a placeholder
    if (data.player) {
      this.player = data.player;
    }
  }
  
  create(): void {
    // Initialize text helper
    this.textHelper = new PixelTextHelper(this);
    
    // If we don't have a player yet, create a placeholder one
    if (!this.player) {
      this.player = new Player({
        scene: this,
        x: 15,
        y: 20,
        texture: 'player'  // We'll load this texture in the BootScene later
      });
    }
    
    // Create some placeholder enemies
    this.createEnemies();
    
    // Initialize combat system
    this.combatSystem = new CombatSystem(this.player, this.enemies);
    
    // Create combat UI
    this.createCombatUI();
    
    // Create combat log
    this.combatLog = this.textHelper.createPixelText(2, 32, '', FONT.TINY, COLORS.WHITE);
    
    // Log start of combat
    this.logMessage('Combat started!');
  }
  
  private createEnemies(): void {
    // Create a simple enemy for now
    const enemyConfig: EnemyConfig = {
      scene: this,
      x: 45,
      y: 20,
      texture: 'enemy',  // We'll load this texture in the BootScene later
      health: 30,
      attack: 5,
      defense: 2,
      experienceValue: 20
    };
    
    const enemy = new Enemy(enemyConfig);
    this.enemies.push(enemy);
  }
  
  private createCombatUI(): void {
    const actions = [
      { text: 'Attack', action: CombatAction.ATTACK },
      { text: 'Defend', action: CombatAction.DEFEND },
      { text: 'Magic', action: CombatAction.MAGIC },
      { text: 'Item', action: CombatAction.ITEM },
      { text: 'Run', action: CombatAction.RUN }
    ];
    
    // Create action buttons
    actions.forEach((actionData, index) => {
      const x = 5 + (index * 10);
      
      const button = this.textHelper.createPixelTextButton(
        x, 
        27, 
        actionData.text,
        () => {
          if (this.combatSystem.isPlayerTurn) {
            this.combatSystem.executePlayerAction(actionData.action);
            this.updateCombatUI();
          }
        },
        FONT.TINY,
        COLORS.WHITE
      );
      
      this.actionButtons.push(button);
    });
  }
  
  private updateCombatUI(): void {
    // Update action buttons based on current state
    this.actionButtons.forEach(button => {
      button.setAlpha(this.combatSystem.isPlayerTurn ? 1 : 0.5);
    });
    
    // Check if combat has ended
    if (!this.combatSystem.isCombatActive) {
      if (!this.player.isDead) {
        this.logMessage('Victory!');
        // Return to exploration after a delay
        this.time.delayedCall(2000, () => {
          this.scene.start('ExplorationScene');
        });
      } else {
        this.logMessage('Defeat!');
        // Return to menu after a delay
        this.time.delayedCall(2000, () => {
          this.scene.start('MenuScene');
        });
      }
    }
  }
  
  private logMessage(message: string): void {
    debugLog(message);
    this.combatLog.text = message;
  }
  
  update(): void {
    // This will be used for animations and timers later
  }
}
