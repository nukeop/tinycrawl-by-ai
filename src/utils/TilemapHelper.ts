import Phaser from 'phaser';

export enum TileType {
  EMPTY = 0,
  WALL = 1,
  FLOOR = 2,
  DOOR = 3,
  LADDER_UP = 4,
  LADDER_DOWN = 5,
  CHEST = 6,
  TRAP = 7
}

export function createBasicTilemap(scene: Phaser.Scene, width: number, height: number): number[][] {
  // Create a basic tilemap with walls around the edges and floor in the middle
  const map: number[][] = [];
  
  for (let y = 0; y < height; y++) {
    const row: number[] = [];
    for (let x = 0; x < width; x++) {
      if (x === 0 || y === 0 || x === width - 1 || y === height - 1) {
        row.push(TileType.WALL);
      } else {
        row.push(TileType.FLOOR);
      }
    }
    map.push(row);
  }
  
  return map;
}

export function renderTilemap(
  scene: Phaser.Scene, 
  tilemap: number[][], 
  tileSize: number, 
  spritesheet: string
): void {
  for (let y = 0; y < tilemap.length; y++) {
    for (let x = 0; x < tilemap[y].length; x++) {
      const tileType = tilemap[y][x];
      
      if (tileType !== TileType.EMPTY) {
        // Place a tile at position x, y with the appropriate frame
        scene.add.sprite(x * tileSize, y * tileSize, spritesheet, tileType - 1)
          .setOrigin(0, 0);
      }
    }
  }
}
