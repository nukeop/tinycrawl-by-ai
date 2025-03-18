import { Player } from '../entities/Player';
import { Enemy } from '../entities/Enemy';
import { debugLog } from '../utils/debug';

export enum CombatAction {
  ATTACK,
  DEFEND,
  MAGIC,
  ITEM,
  RUN
}

export class CombatSystem {
  private _player: Player;
  private _enemies: Enemy[];
  private _isPlayerTurn: boolean;
  private _isCombatActive: boolean;
  
  constructor(player: Player, enemies: Enemy[]) {
    this._player = player;
    this._enemies = enemies;
    this._isPlayerTurn = true; // Player goes first
    this._isCombatActive = true;
  }
  
  public executePlayerAction(action: CombatAction, targetIndex = 0): void {
    if (!this._isPlayerTurn || !this._isCombatActive) return;
    
    const target = this._enemies[targetIndex];
    if (!target || target.isDead) return;
    
    switch (action) {
      case CombatAction.ATTACK:
        this.performAttack(this._player, target);
        break;
      case CombatAction.DEFEND:
        // Implementation for defend will come later
        break;
      case CombatAction.MAGIC:
        // Implementation for magic will come later
        break;
      case CombatAction.ITEM:
        // Implementation for items will come later
        break;
      case CombatAction.RUN:
        this.attemptEscape();
        return; // Early return as combat may end
      default:
        debugLog('Invalid combat action', action);
        return;
    }
    
    // End player turn
    this._isPlayerTurn = false;
    
    // Check if combat should end
    if (this.checkCombatEnd()) return;
    
    // Process enemy turns
    this.processEnemyTurns();
  }
  
  private performAttack(attacker: Player | Enemy, target: Player | Enemy): void {
    // Simple damage formula: attacker's attack - target's defense
    const damage = Math.max(1, attacker.attack - target.defense);
    target.damage(damage);
    
    debugLog(`${attacker.constructor.name} attacks for ${damage} damage!`);
    
    // Return if target died
    if (target.isDead) {
      debugLog(`${target.constructor.name} was defeated!`);
      
      // If player defeated an enemy, award experience
      if (attacker instanceof Player && target instanceof Enemy) {
        attacker.addExperience(target.experienceValue);
        debugLog(`Player gained ${target.experienceValue} experience!`);
      }
    }
  }
  
  private attemptEscape(): void {
    // 50% chance to escape
    const escaped = Math.random() > 0.5;
    
    if (escaped) {
      debugLog('Successfully escaped from combat!');
      this._isCombatActive = false;
    } else {
      debugLog('Failed to escape!');
      this._isPlayerTurn = false;
      this.processEnemyTurns();
    }
  }
  
  private processEnemyTurns(): void {
    // Process each living enemy's turn
    for (const enemy of this._enemies) {
      if (enemy.isDead) continue;
      
      // Simple AI: Always attack the player
      this.performAttack(enemy, this._player);
      
      // Check if player died
      if (this._player.isDead) {
        debugLog('Player was defeated!');
        this._isCombatActive = false;
        return;
      }
    }
    
    // After all enemies have acted, it's the player's turn again
    this._isPlayerTurn = true;
  }
  
  private checkCombatEnd(): boolean {
    // Check if all enemies are defeated
    const allEnemiesDefeated = this._enemies.every(enemy => enemy.isDead);
    
    if (allEnemiesDefeated) {
      debugLog('All enemies defeated!');
      this._isCombatActive = false;
      return true;
    }
    
    // Check if player is defeated
    if (this._player.isDead) {
      debugLog('Player was defeated!');
      this._isCombatActive = false;
      return true;
    }
    
    return false;
  }
  
  public get isPlayerTurn(): boolean {
    return this._isPlayerTurn;
  }
  
  public get isCombatActive(): boolean {
    return this._isCombatActive;
  }
  
  public get player(): Player {
    return this._player;
  }
  
  public get enemies(): Enemy[] {
    return this._enemies;
  }
}
