import { GAME_WIDTH, GAME_HEIGHT } from './constants';
import { debugLog } from './debug';
import { ResponsiveContainer } from './ResponsiveContainer';

/**
 * Initialize a responsive container for the game
 */
export function initResponsiveContainer(element: HTMLElement): ResponsiveContainer {
  const aspectRatio = GAME_WIDTH / GAME_HEIGHT;
  return new ResponsiveContainer(element, aspectRatio);
}

/**
 * Create an iframe for embedding the game
 */
export function createEmbedIframe(
  parentElement: HTMLElement, 
  width: number = 300,
  height: number = 200,
  options: {
    zoom?: number;
    enableAPI?: boolean;
    allowFullscreen?: boolean;
  } = {}
): HTMLIFrameElement {
  // Create iframe element
  const iframe = document.createElement('iframe');
  
  // Build URL with query parameters
  let src = window.location.href.split('?')[0]; // Base URL without query params
  const params = new URLSearchParams();
  
  if (options.zoom) params.set('zoom', options.zoom.toString());
  if (options.enableAPI === false) params.set('api', 'false');
  if (options.allowFullscreen) params.set('fullscreen', 'true');
  
  // Apply parameters if any exist
  if (params.toString()) {
    src += `?${params.toString()}`;
  }
  
  // Set iframe attributes
  iframe.src = src;
  iframe.width = width.toString();
  iframe.height = height.toString();
  iframe.style.border = 'none';
  iframe.style.display = 'block';
  iframe.setAttribute('allowtransparency', 'true');
  
  if (options.allowFullscreen) {
    iframe.setAttribute('allowfullscreen', 'true');
  }
  
  // Add to parent element
  parentElement.appendChild(iframe);
  debugLog('embedHelper: Created embed iframe');
  
  return iframe;
}

/**
 * Send a command to an embedded game
 */
export function sendCommandToEmbed(
  iframe: HTMLIFrameElement, 
  command: string, 
  value?: unknown
): void {
  iframe.contentWindow?.postMessage({
    target: 'tinycrawl',
    command,
    value
  }, '*');
  
  debugLog(`embedHelper: Sent command "${command}" to iframe`, value);
}
