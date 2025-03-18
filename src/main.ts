import Phaser from 'phaser';
import { BootScene } from './scenes/BootScene';
import { MenuScene } from './scenes/MenuScene';
import { ExplorationScene } from './scenes/ExplorationScene';
import { CombatScene } from './scenes/CombatScene';
import { UIScene } from './scenes/UIScene';

// Game configuration
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 60,
  height: 40,
  parent: 'game',
  backgroundColor: '#000000',
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    zoom: 5, // 500% scaling for pixel crispness
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [BootScene, MenuScene, ExplorationScene, CombatScene, UIScene],
};

// Initialize the game
new Phaser.Game(config);
