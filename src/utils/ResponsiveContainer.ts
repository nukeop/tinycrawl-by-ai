import { debugLog } from './debug';

export class ResponsiveContainer {
  private container: HTMLElement;
  private gameCanvas: HTMLCanvasElement | null = null;
  private observer: ResizeObserver | null = null;
  private aspectRatio: number;
  
  constructor(container: HTMLElement, aspectRatio: number) {
    this.container = container;
    this.aspectRatio = aspectRatio;
    
    this.setupResizeObserver();
    this.findGameCanvas();
    this.adjustCanvasSize();
    
    // Also listen for window resize events
    window.addEventListener('resize', this.adjustCanvasSize.bind(this));
  }
  
  private setupResizeObserver(): void {
    if (typeof ResizeObserver !== 'undefined') {
      this.observer = new ResizeObserver(() => {
        this.adjustCanvasSize();
      });
      
      this.observer.observe(this.container);
      debugLog('ResponsiveContainer: ResizeObserver initialized');
    } else {
      debugLog('ResponsiveContainer: ResizeObserver not supported');
    }
  }
  
  private findGameCanvas(): void {
    // Find canvas within the container
    const canvas = this.container.querySelector('canvas');
    if (canvas) {
      this.gameCanvas = canvas;
      debugLog('ResponsiveContainer: Game canvas found');
    } else {
      // If not found immediately, try again after a short delay
      setTimeout(() => {
        this.findGameCanvas();
      }, 100);
    }
  }
  
  private adjustCanvasSize(): void {
    if (!this.gameCanvas) {
      this.findGameCanvas();
      return;
    }
    
    const containerWidth = this.container.clientWidth;
    const containerHeight = this.container.clientHeight;
    
    // Calculate dimensions that maintain aspect ratio
    let width = containerWidth;
    let height = width / this.aspectRatio;
    
    if (height > containerHeight) {
      height = containerHeight;
      width = height * this.aspectRatio;
    }
    
    // Apply new dimensions
    this.gameCanvas.style.width = `${width}px`;
    this.gameCanvas.style.height = `${height}px`;
    
    debugLog(`ResponsiveContainer: Adjusted size to ${width}x${height}`);
  }
  
  public destroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
    window.removeEventListener('resize', this.adjustCanvasSize.bind(this));
    debugLog('ResponsiveContainer: Destroyed');
  }
}
