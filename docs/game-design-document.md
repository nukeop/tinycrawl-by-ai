# Tiny Crawl - Game Design Document

## Concept Overview

Tiny Crawl is a minimalist pixel RPG featuring extremely compact visuals (less than 3,000 pixels total) while delivering a complete dungeon crawling experience. Players navigate a 3D maze-like world, battle enemies, collect items, and level up their character - all within a tiny window.

## Visual Style

- Ultra-minimalist pixel art (8x8 characters, 5x5 font)
- Game displayed at approximately 60x40 pixels, scaled up for visibility
- Limited color palette focused on readability

## Core Mechanics

### World Navigation

- 2D side-scrolling movement (left/right)
- Vertical navigation via ladders
- Depth movement (toward/away from screen) to access different planes
- Non-linear world design with interconnected areas
- Environmental objects: doors, treasure chests, ladders

### Control Scheme

- Simple mouse-based controls:
  - Click left/right side of screen to move in that direction
  - Click on interactive objects (doors, chests) when standing next to them
  - Click on menu icons during combat
- Alternative keyboard controls:
  - Arrow keys for movement
  - Space/Enter for interaction
  - Number keys (1-5) for combat actions

### Game States

#### Attract Mode

- Animated title screen with parallax scrolling background
- Character walking animation and "Push spacebar to begin" prompt
- Gameplay demonstration animations on a cycle

#### Exploration

- Side-view exploration of interconnected dungeon floors
- Status bar at top showing current floor/location
- Health/MP bars visible during exploration
- Camera follows player with limited vertical scrolling for ramps

#### Combat

- Turn-based battle system
- Player character on left, up to 2 enemies on right
- Combat options via icon-based mini-menu:
  - Attack
  - Magic
  - Item
  - Defend
  - Run
- Simple animations for attacks and spells

#### Inventory Management

- Grid-based inventory system (6x3 slots)
- Large item preview on left side
- Item icons are 8x8 pixels
- Equipped items highlighted or in separate section

#### Character Stats

- Minimal stat tracking:
  - HP (Health Points)
  - MP (Magic Points)
  - ATK (Attack)
  - DEF (Defense)
  - Gold
- Additional stats accessible via tabs/pages

### Progression System

- Experience points and leveling
- Equipment upgrades that visibly change character appearance
- Stats increase with levels
- New abilities/spells unlocked at specific levels

### Items & Equipment

- Consumables: Health potions, magic potions, etc.
- Equipment: Weapons, armor, accessories
- Key items for progression/puzzles
- Equipment affects stats and combat options

### Combat System

- Initiative system determines turn order
- Basic actions:
  - Physical attacks (weapon-based)
  - Magic spells (consumes MP)
  - Item usage
  - Defending (reduces damage)
  - Fleeing (chance-based)
- Damage calculation based on ATK vs DEF stats
- Critical hits and misses
- Status effects (poison, sleep, etc.)

### Enemy Design

- Various enemy types with distinct abilities
- Boss enemies at the end of major sections
- Enemy difficulty scales with player progression

## Technical Specifications

### Display

- Base resolution: 60x40 pixels
- Scaled up 300%-500% for actual display
- Fixed aspect ratio

### UI Components

- Top bar: Location information
- Side bars: Health/magic indicators
- Menu screens:
  - Inventory
  - Character stats
  - Equipment
  - Save/load

### Audio

- Minimalist chiptune soundtrack
- Simple sound effects for actions and combat
- Audio cues for critical game events

## MVP Implementation Plan

### Phase 1: Core Systems

- Character movement and collision
- Basic room rendering
- Transition between rooms
- Simple UI elements

### Phase 2: Combat Mechanics

- Turn-based combat loop
- Basic enemy AI
- Combat actions implementation
- Health/damage system

### Phase 3: Progression

- Inventory system
- Item effects
- Character stats
- Level up mechanism

### Phase 4: Content Development

- World map design
- Enemy variety
- Item diversity
- Balancing

### Phase 5: Polish

- Sound implementation
- Visual effects
- Save/load functionality
- Attract mode and menus

## Technical Considerations

- Tile-based movement system
- Simple collision detection
- State management for game screens
- Efficient sprite storage and rendering

## Optional Features (Post-MVP)

- Multiple playable characters
- Expanded magic system
- Quest tracking
- Meta-progression between runs
- Randomized dungeon elements

## Art Requirements

- Character sprite (8x8px) with multiple animations:
  - Idle
  - Walking
  - Attack
  - Magic
  - Hurt
- Enemy sprites (8x8px)
- Environmental tiles (8x8px)
- UI elements (mix of 5x5px and 8x8px)
- Item icons (8x8px)

## Gameplay Flow

1. Player starts at dungeon entrance
2. Explores rooms and corridors
3. Encounters enemies in random or fixed battles
4. Collects treasures and equipment
5. Finds keys or solves puzzles to access new areas
6. Defeats boss enemies to progress deeper
7. Manages resources (health, magic, items)
8. Conquers the final dungeon level/boss
