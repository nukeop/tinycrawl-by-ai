# Tiny Crawl - Technical Stack Documentation

## Purpose

This document details the technologies, frameworks, and tools selected for the development of Tiny Crawl. It explains the technical choices made and provides justification for the selected stack, serving as a reference for all developers working on the project.

## Core Technologies

- **Language**: TypeScript
- **Build Tool**: Vite
- **Package Manager**: npm or yarn

## Frontend Framework

- **Framework**: Phaser 3
  - Robust 2D game framework with TypeScript support
  - Handles rendering, input management, and game state
  - Supports scaling for our tiny pixel game display (60x40 pixels)
  - Built-in support for sprite animations and tile maps

## Game Architecture

- **Component-Based Design**: Using TypeScript classes for different game entities
- **State Management**: Phaser's scene system for different game states (menu, exploration, combat, etc.)
- **Asset Loading**: Phaser's built-in loader for sprites, audio, and other assets

## Rendering Approach

- **Pixel Art Rendering**: Canvas-based rendering via Phaser
- **Scaling**: Integer scaling (300%-500%) to maintain pixel crispness
- **Tiled Integration**: For level design and map creation

## Audio

- **Library**: Phaser's built-in audio system
- **Format**: Web Audio API with fallbacks to HTML5 Audio
- **Chiptune Creation**: Tools like BeepBox or FamiTracker for authentic 8-bit sound

## Storage

- **Save System**: LocalStorage for game saves
- **Data Structure**: JSON-based state serialization

## Input Management

- **Mouse Input**: Phaser's input system for click controls
- **Keyboard Support**: Arrow keys and hotkeys as alternative control method

## Development Tools

- **Code Structure**:

  - Entity-Component architecture for game objects
  - Scene-based organization for game states
  - Utility modules for common functionality

- **Code Quality**:

  - ESLint for code linting
  - Prettier for code formatting
  - Jest for unit testing

- **Prototyping Tools**:
  - Aseprite for pixel art creation
  - Tiled for level design

## Deployment

- **Bundling**: Vite for optimized bundle creation
- **Hosting Options**:
  - GitHub Pages for simple hosting
  - Vercel/Netlify for more advanced CI/CD pipelines
  - itch.io for game distribution

## Project Structure

```
tinycrawl/
├── src/
│   ├── assets/
│   │   ├── sprites/
│   │   ├── audio/
│   │   └── maps/
│   ├── scenes/
│   │   ├── BootScene.ts
│   │   ├── MenuScene.ts
│   │   ├── ExplorationScene.ts
│   │   ├── CombatScene.ts
│   │   └── UIScene.ts
│   ├── entities/
│   │   ├── Player.ts
│   │   ├── Enemy.ts
│   │   └── Item.ts
│   ├── systems/
│   │   ├── CombatSystem.ts
│   │   ├── InventorySystem.ts
│   │   └── ProgressionSystem.ts
│   ├── utils/
│   │   ├── constants.ts
│   │   └── helpers.ts
│   └── main.ts
├── public/
├── tests/
├── docs/
│   ├── game-design-document.md
│   └── technical-stack.md
├── package.json
├── tsconfig.json
├── vite.config.ts
└── index.html
```

## Technical Justifications

### Why Phaser 3?

Phaser 3 provides an ideal balance of features for Tiny Crawl:

1. **Ready-made game fundamentals**: Camera, sprites, input handling, and collision detection
2. **TypeScript support**: Strong typing for better code maintenance
3. **Scene management**: Perfect for our different game states
4. **Active community**: Abundant resources and plugins
5. **Performance**: Optimized for browser-based games
6. **Flexibility**: Can be used for both our pixel art style and UI needs

### Why Vite?

1. **Fast development**: Hot module replacement for quick iteration
2. **Small bundle size**: Efficient bundling for our minimalist game
3. **TypeScript integration**: Native TypeScript support
4. **Modern approach**: Uses ES modules for better code organization

### Alternatives Considered

- **Pixi.js**: More low-level than Phaser, would require building more game systems
- **Three.js**: Overkill for a 2D pixel art game
- **Custom WebGL**: Too much overhead for a small project
- **React + Canvas**: Unnecessary complexity for a game-focused application

## Performance Considerations

- **Asset Optimization**: Sprite sheets for efficient rendering
- **Memory Management**: Pooling for frequently created/destroyed objects
- **Loading Strategies**: Progressive loading for seamless gameplay
- **Scaling Algorithm**: Nearest-neighbor for proper pixel art scaling

## Browser Compatibility

- **Target Browsers**: Modern evergreen browsers (Chrome, Firefox, Safari, Edge)
- **Fallbacks**: Minimal polyfills for broader compatibility
- **Mobile Support**: Touch controls for mobile play

## Implementation Priorities

1. Core rendering and movement
2. Exploration mechanics
3. Combat system
4. Inventory and progression
5. UI and menus
6. Audio implementation
7. Save system
8. Polish and optimization

This technical stack provides a solid foundation for implementing all the requirements outlined in the game design document while maintaining simplicity and modern development practices.
