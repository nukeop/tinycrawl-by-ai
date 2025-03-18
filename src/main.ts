import Phaser from 'phaser';
import { BootScene } from './scenes/BootScene';
import { MenuScene } from './scenes/MenuScene';
import { ExplorationScene } from './scenes/ExplorationScene';
import { CombatScene } from './scenes/CombatScene';
import { UIScene } from './scenes/UIScene';
import { ScalingTestScene } from './scenes/ScalingTestScene';
import { logSystemInfo } from './utils/debug';
import { GAME_WIDTH, GAME_HEIGHT, ZOOM_LEVEL, COLORS, SCENES } from './utils/constants';
import { EmbedAPI } from './utils/EmbedAPI';

// Log system information
logSystemInfo();

// Initialize EmbedAPI
const embedApi = EmbedAPI.getInstance();

// Parse embed parameters from URL if present
const urlParams = new URLSearchParams(window.location.search);
const urlZoom = urlParams.get('zoom') ? parseInt(urlParams.get('zoom') as string) : ZOOM_LEVEL;

// Configure embedding options
embedApi.setConfig({
  zoom: urlZoom,
  enableAPI: urlParams.get('api') !== 'false',
  allowFullscreen: urlParams.get('fullscreen') === 'true',
});

// Map scene keys to scene classes
const scenes = [
  BootScene,
  MenuScene,
  ExplorationScene,
  CombatScene,
  UIScene,
  ScalingTestScene
];

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
    zoom: embedApi.getEmbedInfo().zoom,
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
  scene: scenes,
};

// Initialize the game
const game = new Phaser.Game(config);

// Register game instance with EmbedAPI
embedApi.setGame(game);

// Register events
game.events.once('ready', () => {
  embedApi.sendEvent({ type: 'gameReady' });
});

// Expose API globally for external access if enabled
if (embedApi.getEmbedStatus().apiEnabled) {
  (window as unknown as { TinyCrawlAPI: EmbedAPI }).TinyCrawlAPI = embedApi;
}
