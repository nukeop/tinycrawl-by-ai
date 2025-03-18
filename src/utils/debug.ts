export function logSystemInfo(): void {
  console.log('Tiny Crawl - System Information:');
  console.log(`- Browser: ${navigator.userAgent}`);
  console.log(`- Viewport Size: ${window.innerWidth}x${window.innerHeight}`);
  console.log(`- Pixel Ratio: ${window.devicePixelRatio}`);
  console.log(`- Phaser Version: ${Phaser.VERSION}`);
}

export function debugLog(message: string, ...data: unknown[]): void {
  const isDebug = process.env.NODE_ENV !== 'production';
  if (isDebug) {
    console.log(`[Tiny Crawl Debug]: ${message}`, ...data);
  }
}
