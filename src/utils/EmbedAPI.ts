import { debugLog } from './debug';
import { GAME_WIDTH, GAME_HEIGHT, ZOOM_LEVEL } from './constants';

export type EmbedConfig = {
  parentElement?: HTMLElement;
  zoom?: number;
  allowFullscreen?: boolean;
  enableAPI?: boolean;
};

export type GameEvent = {
  type: string;
  data?: unknown;
};

export class EmbedAPI {
  private static instance: EmbedAPI;
  private game: Phaser.Game | null = null;
  private listeners: Map<string, ((data: unknown) => void)[]> = new Map();
  private config: EmbedConfig = {
    zoom: ZOOM_LEVEL,
    allowFullscreen: false,
    enableAPI: true,
  };
  
  private constructor() {
    // Setup message listener for iframe communication
    if (window.addEventListener) {
      window.addEventListener('message', this.handleExternalMessage.bind(this), false);
      debugLog('EmbedAPI: Message listener registered');
    }
  }
  
  public static getInstance(): EmbedAPI {
    if (!EmbedAPI.instance) {
      EmbedAPI.instance = new EmbedAPI();
    }
    return EmbedAPI.instance;
  }
  
  public setGame(game: Phaser.Game): void {
    this.game = game;
    debugLog('EmbedAPI: Game instance registered');
  }
  
  public setConfig(config: Partial<EmbedConfig>): void {
    this.config = { ...this.config, ...config };
    debugLog('EmbedAPI: Configuration updated', this.config);
  }
  
  public addEventListener(eventName: string, callback: (data: unknown) => void): void {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, []);
    }
    this.listeners.get(eventName)?.push(callback);
    debugLog(`EmbedAPI: Added listener for event "${eventName}"`);
  }
  
  public removeEventListener(eventName: string, callback: (data: unknown) => void): void {
    const callbacks = this.listeners.get(eventName);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index !== -1) {
        callbacks.splice(index, 1);
        debugLog(`EmbedAPI: Removed listener for event "${eventName}"`);
      }
    }
  }
  
  public sendEvent(event: GameEvent): void {
    if (!this.config.enableAPI) return;
    
    // Send to parent if in iframe
    if (window.parent !== window) {
      window.parent.postMessage({
        source: 'tinycrawl',
        event: event.type,
        data: event.data
      }, '*');
      debugLog(`EmbedAPI: Sent event "${event.type}" to parent`, event.data);
    }
    
    // Call any registered listeners
    const callbacks = this.listeners.get(event.type);
    if (callbacks) {
      callbacks.forEach(callback => callback(event.data));
    }
  }
  
  private handleExternalMessage(event: MessageEvent): void {
    if (!this.config.enableAPI) return;
    
    // Validate that message is for us
    if (typeof event.data !== 'object' || event.data.target !== 'tinycrawl') {
      return;
    }
    
    debugLog('EmbedAPI: Received external message', event.data);
    
    // Handle specific commands
    switch (event.data.command) {
      case 'pause':
        if (this.game) {
          this.game.scene.pause(this.game.scene.getScenes(true)[0].scene.key);
          this.sendEvent({ type: 'gamePaused' });
        }
        break;
      case 'resume':
        if (this.game) {
          this.game.scene.resume(this.game.scene.getScenes(true)[0].scene.key);
          this.sendEvent({ type: 'gameResumed' });
        }
        break;
      case 'restart':
        if (this.game) {
          this.game.scene.start('BootScene');
          this.sendEvent({ type: 'gameRestarted' });
        }
        break;
      case 'setZoom':
        if (typeof event.data.value === 'number' && this.game) {
          const scale = this.game.scale as Phaser.Scale.ScaleManager;
          scale.setZoom(event.data.value);
          this.sendEvent({ type: 'zoomChanged', data: event.data.value });
        }
        break;
      default:
        debugLog(`EmbedAPI: Unknown command "${event.data.command}"`);
    }
  }
  
  public getEmbedStatus(): { inIframe: boolean; apiEnabled: boolean } {
    return {
      inIframe: window.self !== window.top,
      apiEnabled: this.config.enableAPI
    };
  }
  
  public getEmbedInfo(): {
    width: number;
    height: number;
    zoom: number;
    baseWidth: number;
    baseHeight: number;
  } {
    return {
      width: GAME_WIDTH * (this.config.zoom || ZOOM_LEVEL),
      height: GAME_HEIGHT * (this.config.zoom || ZOOM_LEVEL),
      zoom: this.config.zoom || ZOOM_LEVEL,
      baseWidth: GAME_WIDTH,
      baseHeight: GAME_HEIGHT
    };
  }
}
