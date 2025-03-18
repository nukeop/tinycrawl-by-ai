import { Entity, EntityConfig } from './Entity';

export type EnemyConfig = EntityConfig & {
  health: number;
  attack: number;
  defense: number;
  experienceValue: number;
};

export class Enemy extends Entity {
  private _attack: number;
  private _defense: number;
  private _experienceValue: number;

  constructor(config: EnemyConfig) {
    super(config);
    
    // Set enemy-specific properties
    this._health = config.health;
    this._attack = config.attack;
    this._defense = config.defense;
    this._experienceValue = config.experienceValue;
  }
  
  public get attack(): number {
    return this._attack;
  }
  
  public get defense(): number {
    return this._defense;
  }
  
  public get experienceValue(): number {
    return this._experienceValue;
  }
  
  public update(): void {
    // Basic AI will be implemented later
  }
}
