import Phaser from 'phaser';

export type EntityConfig = {
  scene: Phaser.Scene;
  x: number;
  y: number;
  texture: string;
  frame?: string | number;
};

export class Entity extends Phaser.GameObjects.Sprite {
  protected _health: number;
  protected _isDead: boolean;

  constructor(config: EntityConfig) {
    super(config.scene, config.x, config.y, config.texture, config.frame);
    
    this._health = 100;
    this._isDead = false;
    
    // Add to scene
    config.scene.add.existing(this);
    
    // Set origin to center of sprite
    this.setOrigin(0.5, 0.5);
  }
  
  public damage(amount: number): void {
    this._health -= amount;
    
    if (this._health <= 0) {
      this._health = 0;
      this._isDead = true;
    }
  }
  
  public heal(amount: number): void {
    this._health += amount;
  }
  
  public get health(): number {
    return this._health;
  }
  
  public get isDead(): boolean {
    return this._isDead;
  }
  
  public update(): void {
    // Override in subclasses
  }
}
