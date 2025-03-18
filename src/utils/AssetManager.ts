import Phaser from 'phaser';
import { debugLog } from './debug';

export enum AssetType {
  IMAGE,
  SPRITESHEET,
  AUDIO,
  JSON
}

type AssetInfo = {
  key: string;
  path: string;
  type: AssetType;
  frameConfig?: Phaser.Types.Loader.FileTypes.ImageFrameConfig;
};

export class AssetManager {
  private static assets: Map<string, AssetInfo> = new Map();
  
  public static registerAsset(
    key: string,
    path: string,
    type: AssetType,
    frameConfig?: Phaser.Types.Loader.FileTypes.ImageFrameConfig
  ): void {
    this.assets.set(key, { key, path, type, frameConfig });
  }
  
  public static loadAll(scene: Phaser.Scene): void {
    this.assets.forEach((asset) => {
      switch (asset.type) {
        case AssetType.IMAGE:
          scene.load.image(asset.key, asset.path);
          break;
        case AssetType.SPRITESHEET:
          if (asset.frameConfig) {
            scene.load.spritesheet(asset.key, asset.path, asset.frameConfig);
          } else {
            debugLog(`Missing frame config for spritesheet: ${asset.key}`);
          }
          break;
        case AssetType.AUDIO:
          scene.load.audio(asset.key, asset.path);
          break;
        case AssetType.JSON:
          scene.load.json(asset.key, asset.path);
          break;
      }
    });
  }
  
  public static getAssetInfo(key: string): AssetInfo | undefined {
    return this.assets.get(key);
  }
  
  public static hasAsset(key: string): boolean {
    return this.assets.has(key);
  }
}
