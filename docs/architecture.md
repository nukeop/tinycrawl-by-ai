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

_No architectural decisions have been documented yet._

## Technical Debt

_No technical debt has been identified yet._

## Future Considerations

_No future considerations have been documented yet._

## Architecture Diagrams

_Diagrams will be added as the architecture evolves._
