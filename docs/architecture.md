# Tiny Crawl - Architecture Documentation

## Purpose

This document outlines the architectural decisions made during the development of Tiny Crawl. It serves as a reference for understanding the high-level design patterns, component interactions, and technical choices that form the foundation of the game.

## Core Architecture

### Game Loop and State Management

The game uses Phaser 3's built-in game loop and scene management system. The architecture follows these principles:

- Clear separation between game logic and rendering
- Scene-based organization of game states
- Component-based entity design

### Data Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Input     │────▶│  Game State │────▶│  Renderer   │
│   System    │     │  Management │     │             │
└─────────────┘     └─────────────┘     └─────────────┘
       ▲                   │                   │
       │                   │                   │
       └───────────────────┴───────────────────┘
```

## Key Components

### Entity System

Game entities (player, enemies, interactive objects) follow a component-based approach:

- Base Entity class with common properties and methods
- Specialized entity types that extend the base class
- Component system for reusable behaviors

### Scene Organization

The game is divided into distinct scenes, each handling specific game states:

- BootScene: Initial loading and setup
- MenuScene: Title screen and main menu
- ExplorationScene: Game world navigation
- CombatScene: Turn-based battles
- UIScene: Overlaid UI that persists between scenes

### Rendering Approach

The rendering system uses these key strategies:

- Fixed 60x40 pixel viewport
- Integer scaling to maintain pixel crispness
- Layered rendering for UI elements
- Custom pixel font rendering

## Data Management

### State Persistence

Game state is managed using:

- Scene-specific state objects
- Global registry for cross-scene data
- LocalStorage for save/load functionality

### Asset Management

Assets are organized into:

- Sprite sheets for graphical elements
- Audio banks for sound effects and music
- Tilemaps for level layouts

## Architectural Decisions

### Scaling System (Current Date)

1. **Base Resolution**: The game uses a tiny 60x40 pixel viewport as the base resolution to maintain the minimalist pixel art aesthetic.

2. **Integer Scaling**: We've implemented 500% zoom (ZOOM_LEVEL = 5) to ensure each game pixel maps exactly to a 5x5 block of screen pixels. This preserves the crisp pixel art style without blurring.

3. **Pixel Art Rendering Optimizations**:

   - Set pixelArt: true in Phaser config
   - Disabled antialiasing
   - Enabled roundPixels option to prevent subpixel rendering
   - Added CSS properties for pixel-perfect rendering (image-rendering: pixelated)

4. **Placeholder Sprite Generation**: Until final art assets are ready, we're using Phaser's graphics API to generate placeholder sprites at runtime.

5. **Scaling Test Scene**: Added a dedicated scene to verify pixel-perfect rendering, including single-pixel lines and properly scaled sprites.

### Web Embedding System

1. **API Communication**: Implemented a two-way communication system using the `postMessage` API to allow parent frames to control the game and receive events.

2. **Singleton EmbedAPI**: Created a singleton API class to centralize embedding functionality and provide a consistent interface for both internal and external communication.

3. **Responsive Scaling**: Implemented a `ResponsiveContainer` class that dynamically adjusts the game's render size based on its container while maintaining aspect ratio.

4. **URL Parameters**: Added support for customizing the game's behavior when embedded through URL parameters (zoom level, API enablement, fullscreen support).

5. **Global API Access**: When API access is enabled, the EmbedAPI instance is exposed to the global scope for direct method calls from parent frames.

## Technical Debt

- The placeholder sprite generation in BootScene should eventually be replaced with proper sprite loading.

## Future Considerations

- Consider implementing a custom pixel font renderer for consistent text display
- Plan for responsive scaling on different sized embedding contexts

## Architecture Diagrams

_Diagrams will be added as the architecture evolves._
