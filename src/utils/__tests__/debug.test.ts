import { debugLog } from '../debug';

// Mock console.log to verify it's called
const originalConsoleLog = console.log;
console.log = jest.fn();

describe('Debug Utilities', () => {
  afterAll(() => {
    // Restore console.log after tests
    console.log = originalConsoleLog;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('debugLog', () => {
    it('should log messages in non-production environment', () => {
      // Save original env
      const originalEnv = process.env.NODE_ENV;
      
      // Set to development
      process.env.NODE_ENV = 'development';
      
      debugLog('Test message');
      expect(console.log).toHaveBeenCalledWith('[Tiny Crawl Debug]: Test message');
      
      // Restore original env
      process.env.NODE_ENV = originalEnv;
    });

    it('should not log messages in production environment', () => {
      // Save original env
      const originalEnv = process.env.NODE_ENV;
      
      // Set to production
      process.env.NODE_ENV = 'production';
      
      debugLog('Test message');
      expect(console.log).not.toHaveBeenCalled();
      
      // Restore original env
      process.env.NODE_ENV = originalEnv;
    });
  });
});
