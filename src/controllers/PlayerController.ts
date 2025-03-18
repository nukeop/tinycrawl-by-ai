import Phaser from 'phaser';
import { Player } from '../entities/Player';
import { debugLog } from '../utils/debug';

export class PlayerController {
  private _player: Player;
  private _scene: Phaser.Scene;
  private _cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  
  constructor(scene: Phaser.Scene, player: Player) {
    this._player = player;
    this._scene = scene;
    this._cursors = scene.input.keyboard.createCursorKeys();
    
    // Set up click input for movement
    scene.input.on('pointerdown', this.handlePointerDown, this);
  }
  
  private handlePointerDown(pointer: Phaser.Input.Pointer): void {
    const centerX = this._scene.cameras.main.width / 2;
    
    // Determine if click was on left or right side of screen
    if (pointer.x < centerX) {
      this.movePlayerLeft();
    } else {
      this.movePlayerRight();
    }
  }
  
  private movePlayerLeft(): void {
    this._player.x -= 1;
    this._player.flipX = true;
    debugLog('Player moved left');
  }
  
  private movePlayerRight(): void {
    this._player.x += 1;
    this._player.flipX = false;
    debugLog('Player moved right');
  }
  
  public update(): void {
    // Handle keyboard input
    if (this._cursors.left.isDown) {
      this.movePlayerLeft();
    } else if (this._cursors.right.isDown) {
      this.movePlayerRight();
    }
    
    // Will add up/down movement later
  }
}
