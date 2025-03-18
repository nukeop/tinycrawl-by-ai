import { Entity, EntityConfig } from './Entity';

export class Player extends Entity {
  private _magic: number;
  private _attack: number;
  private _defense: number;
  private _experience: number;
  private _level: number;

  constructor(config: EntityConfig) {
    super(config);
    
    // Initialize player-specific properties
    this._magic = 50;
    this._attack = 10;
    this._defense = 5;
    this._experience = 0;
    this._level = 1;
    
    // Enable physics on the player if needed
    if (config.scene.physics && config.scene.physics.world) {
      config.scene.physics.world.enable(this);
    }
  }
  
  public get magic(): number {
    return this._magic;
  }
  
  public get attack(): number {
    return this._attack;
  }
  
  public get defense(): number {
    return this._defense;
  }
  
  public get experience(): number {
    return this._experience;
  }
  
  public get level(): number {
    return this._level;
  }
  
  public addExperience(amount: number): void {
    this._experience += amount;
    this.checkLevelUp();
  }
  
  private checkLevelUp(): void {
    // Simple level formula: 100 * level
    const nextLevelThreshold = 100 * this._level;
    
    if (this._experience >= nextLevelThreshold) {
      this._level++;
      this._attack += 2;
      this._defense += 1;
      this._health += 10;
      this._magic += 5;
      
      // Emit level up event for UI to display
      this.emit('levelUp', this._level);
    }
  }
  
  public update(): void {
    // Will be implemented later with movement controls
  }
}
