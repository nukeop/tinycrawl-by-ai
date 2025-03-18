import Phaser from 'phaser';
import { BootScene } from './scenes/BootScene';
import { MenuScene } from './scenes/MenuScene';
import { ExplorationScene } from './scenes/ExplorationScene';
import { CombatScene } from './scenes/CombatScene';
import { UIScene } from './scenes/UIScene';
import { ScalingTestScene } from './scenes/ScalingTestScene';
import { logSystemInfo } from './utils/debug';
import { GAME_WIDTH, GAME_HEIGHT, ZOOM_LEVEL, COLORS } from './utils/constants';

// Log system information
logSystemInfo();

// Game configuration
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  parent: 'game',
  backgroundColor: COLORS.BLACK,
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    zoom: ZOOM_LEVEL,
  },
  render: {
    antialias: false,
    pixelArt: true,
    roundPixels: true
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [BootScene, MenuScene, ExplorationScene, CombatScene, UIScene, ScalingTestScene],
};

// Initialize the game
new Phaser.Game(config);
