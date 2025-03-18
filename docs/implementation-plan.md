# Tiny Crawl - Implementation Plan

## Purpose

This document outlines the detailed implementation plan for Tiny Crawl, a minimalist pixel RPG. It provides a structured roadmap of development phases and steps, each with specific validation tests to ensure proper implementation.

## Phase 0: Project Setup

### Step 0.1: Initialize Project Structure

- Create project directory with Vite and TypeScript
- Set up ESLint, Prettier, and Jest
- Configure tsconfig.json with strict type checking
- **Test**: Verify build process works and TypeScript compiles without errors

### Step 0.2: Install Dependencies

- Install Phaser 3
- Set up any additional dev dependencies
- **Test**: Verify all packages load correctly without conflicts

### Step 0.3: Configure Development Environment

- Set up Vite dev server with hot reloading
- Configure Jest for unit testing
- Create initial placeholder HTML structure
- **Test**: Ensure dev server launches and displays a blank canvas

### Step 0.4: Create Base Project Files

- Implement main.ts entry point
- Create basic game configuration
- Set up asset loading placeholder
- **Test**: Game initializes in browser without errors

### Step 0.5: Implement Scaling System

- Create rendering canvas at 60x40 pixels
- Implement integer scaling (300%-500%)
- Configure pixel-perfect rendering
- **Test**: Render a test rectangle and verify it scales properly without blur

### Step 0.6: Configure for Web Embedding

- Create embedding API/interface for the game
- Configure iframe compatibility settings
- Implement responsive container adaptation
- Set up cross-origin resource sharing if needed
- **Test**: Verify game loads and functions correctly when embedded in an iframe on a test page

## Phase 1: Core Game Engine

### Step 1.1: Create Basic Scene System

- Implement scene management using Phaser's scene system
- Create BaseScene class for common functionality
- Set up scene transitions
- **Test**: Verify ability to switch between two test scenes

### Step 1.2: Implement Asset Management

- Create asset loading system
- Set up sprite sheet loading
- Implement texture management
- **Test**: Successfully load and display a test sprite

### Step 1.3: Setup Input System

- Configure mouse input detection
- Implement keyboard input handling
- Create input mapping system
- **Test**: Verify input events are captured and processed correctly

### Step 1.4: Create Camera System

- Set up game camera
- Implement camera following logic
- Configure camera bounds
- **Test**: Camera correctly follows a test object through a larger space

### Step 1.5: Implement Game Loop

- Set up core game loop timing
- Create update cycle management
- Implement pause functionality
- **Test**: Game loop maintains consistent frame rate and can be paused/resumed

## Phase 2: World and Movement Systems

### Step 2.1: Implement Tilemap System

- Create tile definition system
- Implement tilemap loading
- Set up collision layer
- **Test**: Load a simple test map and display it correctly

### Step 2.2: Create Player Entity

- Implement player sprite (8x8 pixels)
- Create player state management
- Set up player animation system
- **Test**: Player sprite displays and animations change based on state

### Step 2.3: Implement Movement System

- Create basic left/right movement
- Implement collision detection
- Add ladder climbing functionality
- Create depth movement (toward/away from screen)
- **Test**: Player moves correctly and responds to obstacles

### Step 2.4: Implement Room Transition System

- Create room boundary detection
- Implement room transition animation
- Set up room connection data structure
- **Test**: Player can move between rooms with proper transition

### Step 2.5: Add Interactive Objects

- Implement basic interactive object class
- Create door interactions
- Add chest interactions
- Set up ladder interactions
- **Test**: Player can interact with objects when standing next to them

## Phase 3: UI Systems

### Step 3.1: Create UI Framework

- Implement UI layer system
- Create UI component base class
- Set up UI input handling
- **Test**: UI layer displays on top of game world and accepts input

### Step 3.2: Implement Status Bar

- Create top status bar display
- Implement HP/MP bar rendering
- Add location display
- **Test**: Status information updates correctly based on player state

### Step 3.3: Create Menu System

- Implement menu overlay system
- Create menu navigation controls
- Add menu transition animations
- **Test**: Menu can be opened/closed and navigated

### Step 3.4: Implement Dialog System

- Create text rendering system for 5x5 font
- Implement dialog box display
- Add text typing animation
- **Test**: Dialog boxes display text correctly with proper animation

### Step 3.5: Add Inventory UI

- Create grid-based inventory display
- Implement item preview panel
- Add item selection and usage
- **Test**: Items can be selected, viewed, and used from inventory

## Phase 4: Combat System

### Step 4.1: Implement Combat State

- Create combat scene transition
- Set up combat positioning
- Implement turn order system
- **Test**: Game transitions to combat scene with entities properly positioned

### Step 4.2: Create Combat UI

- Implement combat action menu
- Create targeting system
- Add combat status indicators
- **Test**: All UI elements display and interact correctly during combat

### Step 4.3: Implement Combat Actions

- Create attack action
- Implement magic system
- Add item usage in combat
- Create defend action
- Add run/escape functionality
- **Test**: Each action executes correctly with proper effects

### Step 4.4: Add Enemy System

- Implement enemy entity class
- Create enemy AI decision making
- Add different enemy types
- **Test**: Enemies make appropriate combat decisions based on their type

### Step 4.5: Implement Combat Resolution

- Create damage calculation system
- Implement hit/miss determination
- Add critical hit system
- Create victory/defeat conditions
- **Test**: Combat resolves correctly with appropriate outcomes

## Phase 5: Progression Systems

### Step 5.1: Implement Character Stats

- Create stat management system
- Implement stat modification
- Add derived stats calculation
- **Test**: Stats affect gameplay mechanics appropriately

### Step 5.2: Add Experience and Leveling

- Create XP tracking
- Implement level up system
- Add stat growth on level up
- **Test**: Defeating enemies awards XP and level ups occur properly

### Step 5.3: Implement Equipment System

- Create equipment slots
- Implement equipment effects on stats
- Add visual changes based on equipment
- **Test**: Equipping items modifies player stats and appearance

### Step 5.4: Add Item Effects

- Implement consumable item effects
- Create equipment special abilities
- Add key item functionality
- **Test**: Items produce correct effects when used

### Step 5.5: Implement Magic System

- Create spell definition system
- Implement MP consumption
- Add spell effects
- Create spell learning/unlocking
- **Test**: Spells can be cast with correct effects and resource usage

## Phase 6: Content and Game Flow

### Step 6.1: Create World Map

- Design interconnected dungeon layout
- Implement room data structure
- Add location transitions
- **Test**: All rooms connect properly and can be navigated

### Step 6.2: Add Enemy Encounters

- Implement random encounter system
- Create fixed enemy placements
- Add encounter probability management
- **Test**: Encounters trigger appropriately based on location

### Step 6.3: Implement Boss Battles

- Create boss enemy type
- Add special boss mechanics
- Implement boss rooms
- **Test**: Boss battles function correctly with unique mechanics

### Step 6.4: Add Game Progression

- Implement key progression points
- Create story triggers
- Add progression gate mechanics
- **Test**: Game progression flows correctly through key points

### Step 6.5: Implement Save/Load System

- Create save state serialization
- Implement save/load UI
- Add auto-save functionality
- **Test**: Game state can be saved and restored correctly

## Phase 7: Audio and Polish

### Step 7.1: Implement Audio System

- Create sound effect player
- Add music playback
- Implement audio volume controls
- **Test**: Audio plays correctly in appropriate situations

### Step 7.2: Add Visual Effects

- Implement particle system
- Create combat effect animations
- Add environmental effects
- **Test**: Visual effects display correctly and enhance gameplay

### Step 7.3: Create Title Screen and Attract Mode

- Implement title screen
- Add attract mode animations
- Create game intro sequence
- **Test**: Title screen and attract mode function correctly

### Step 7.4: Implement Game Over and Victory

- Create game over sequence
- Add victory celebration
- Implement end credits
- **Test**: Game ends appropriately based on conditions

### Step 7.5: Polish and Bug Fixing

- Conduct playtesting
- Fix identified bugs
- Optimize performance
- Balance gameplay
- **Test**: Game runs smoothly without issues

## Phase 8: MVP Validation and Refinement

### Step 8.1: Feature Completeness Check

- Verify all MVP features are implemented
- Check for any missing functionality
- **Test**: All required features function as expected

### Step 8.2: Performance Optimization

- Audit frame rate performance
- Optimize render calls
- Reduce memory usage
- **Test**: Game maintains target frame rate on all target platforms

### Step 8.3: Compatibility Testing

- Test on different browsers
- Verify mobile compatibility
- Check different screen sizes
- Test embedding in various websites/platforms
- Verify iframe communication works properly
- **Test**: Game functions correctly across all target platforms and embedding scenarios

### Step 8.4: Final Balancing

- Adjust difficulty curve
- Balance enemy stats
- Tune player progression
- **Test**: Game provides appropriate challenge throughout

### Step 8.5: Prepare for Release

- Create build process
- Implement analytics (optional)
- Prepare distribution packages
- **Test**: Build process produces correct distributable packages

### Step 8.6: Website Embedding Preparation

- Create embedding documentation
- Implement size adaptation for different embedding contexts
- Add embedding code examples (iframe, script tag options)
- Create embedding configuration options (size, controls, etc.)
- **Test**: Game can be easily embedded in different website environments

## Post-MVP Features (Future Phases)

These features will be implemented after the core game is complete:

1. Multiple playable characters
2. Expanded magic system
3. Quest tracking
4. Meta-progression between runs
5. Randomized dungeon elements

Each of these features will have its own implementation plan when development reaches that stage.
