# JavaScript Architecture Documentation

## Overview

This AR experience follows **SOLID principles** and **DRY (Don't Repeat Yourself)** pattern with modular ES6 JavaScript.

## Architecture Principles

### SOLID Principles Applied

#### 1. **Single Responsibility Principle (SRP)**
Each module/class has ONE reason to change:
- `config.js` - Only changes when configuration/story content changes
- `state.js` - Only changes when state structure changes
- `ui-controller.js` - Only changes when UI behavior changes
- `story-manager.js` - Only changes when story logic changes
- `marker-handler.js` - Only changes when marker behavior changes
- `main.js` - Only changes when app initialization changes

#### 2. **Open/Closed Principle (OCP)**
- `StoryManager` uses rule-based system - easy to add new story branches without modifying existing code
- New story paths can be added by extending rules array

#### 3. **Liskov Substitution Principle (LSP)**
- All controller classes follow consistent interfaces
- Can be easily mocked for testing

#### 4. **Interface Segregation Principle (ISP)**
- Each class exposes only the methods it needs
- No fat interfaces - small, focused APIs

#### 5. **Dependency Inversion Principle (DIP)**
- High-level modules (StoryManager) don't depend on low-level modules (UI)
- Dependencies are injected in main.js
- Easy to swap implementations for testing

### DRY Pattern

- **No code duplication**: UI updates centralized in UIController
- **Reusable methods**: All DOM operations in one place
- **Configuration constants**: All magic numbers/strings in config.js
- **State encapsulation**: Single source of truth for application state

## Module Structure

```
js/
├── config.js           # Configuration & story data
├── state.js            # State management (encapsulated)
├── ui-controller.js    # All DOM manipulations
├── story-manager.js    # Story progression logic
├── marker-handler.js   # AR marker event handling
├── main.js             # App initialization & orchestration
└── README.md           # This file
```

## Module Responsibilities

### config.js
**Purpose**: Configuration and constants
- Story data (chapters, paths)
- UI element IDs
- Timing constants
- No logic, just data

### state.js - `AppState`
**Purpose**: Application state management
- Private state variables (encapsulation)
- Getter methods (read-only access)
- Mutation methods (controlled state changes)
- State queries (completedSteps, canProgress, etc.)

**Methods**:
- `reset()` - Reset to initial state
- `markStepComplete(index)` - Mark progress step
- `setStudiedBooks(bool)` - Set books flag
- `setPath(path)` - Set success/failure path
- `completedSteps` - Get number of completed steps
- `canProgressToStep(index)` - Check if step can be unlocked

### ui-controller.js - `UIController`
**Purpose**: All DOM manipulations
- Element caching (performance)
- UI state updates
- Visual feedback
- Victory/failure screens

**Methods**:
- `showStory(chapter)` - Display story panel
- `hideStory()` - Hide story panel
- `updateProgressDots(progress, currentStep)` - Update progress UI
- `updateScanTarget(step)` - Update scan hint
- `showVictory(path)` - Show ending screen
- `showBeerContent(path)` - Show AR content
- `resetUI()` - Reset to initial UI state

### story-manager.js - `StoryManager`
**Purpose**: Story progression logic
- Rule-based progression system
- Branching path logic
- Story state coordination

**Methods**:
- `handleMarkerFound(markerIndex)` - Process marker scan
- `reset()` - Reset story progression

**Easy to extend**:
```javascript
// Add new story branch by adding to rules array
{
  markerIndex: 4,
  requiredStep: 3,
  storyKey: 'newChapter',
  onComplete: () => this._handleNewChapter()
}
```

### marker-handler.js - `MarkerHandler`
**Purpose**: AR marker event management
- Marker initialization
- Event listener attachment
- Marker found/lost handling

**Methods**:
- `attachEventListeners()` - Setup all marker events

### main.js - `UniLifeApp`
**Purpose**: Application orchestration
- Dependency injection
- Initialization
- Global function exposure (for onclick handlers)

**Initialization flow**:
1. Create AppState
2. Create UIController
3. Create StoryManager (inject state + UI)
4. Create MarkerHandler (inject storyManager + UI)
5. Setup event listeners
6. Expose global functions

## Data Flow

```
User Action (Marker Scan)
    ↓
MarkerHandler.onMarkerFound()
    ↓
StoryManager.handleMarkerFound()
    ↓
AppState.markStepComplete()
    ↓
UIController.updateUI()
    ↓
DOM Updates (Visual Feedback)
```

## Benefits of This Architecture

### 1. **Testability**
Each module can be tested independently:
```javascript
// Example: Test state without UI
const state = new AppState();
state.markStepComplete(0);
assert(state.completedSteps === 1);
```

### 2. **Maintainability**
- Bug in UI? Check UIController only
- Bug in story logic? Check StoryManager only
- Need new feature? Clear where to add it

### 3. **Scalability**
Easy to add:
- New story branches (add rules)
- New UI elements (extend UIController)
- New state properties (extend AppState)
- New markers (extend config)

### 4. **Reusability**
- UIController can be reused for different AR experiences
- State pattern can be reused for other stateful apps
- Story rule system can be adapted for different narratives

### 5. **Code Quality**
- No global variables (except window.resetStory for button)
- No magic numbers/strings (all in config)
- Clear separation of concerns
- Easy to understand and modify

## Adding New Features

### Example: Add a new story chapter

1. **Add to config.js**:
```javascript
export const STORY_DATA = {
  // ... existing
  newChapter: {
    title: "CHAPTER V: THE FINALE",
    story: "Your story...",
    target: "NEW_MARKER"
  }
};
```

2. **Add rule to story-manager.js**:
```javascript
{
  markerIndex: 4,
  requiredStep: 4,
  storyKey: 'newChapter',
  onComplete: () => this._handleNewChapter()
}
```

3. **Add marker HTML** (if needed)

That's it! No need to touch other files.

## Performance Optimizations

1. **Element caching**: DOM queries done once in constructor
2. **Event delegation**: Markers initialized once, not per event
3. **State encapsulation**: Prevents accidental state mutations
4. **Modular loading**: ES6 modules load only what's needed

## Future Improvements

- Add TypeScript for type safety
- Add unit tests for each module
- Add error boundary handling
- Add analytics tracking
- Add save/load functionality
- Add difficulty levels

---

**Clean Code. Clear Architecture. Easy Maintenance.** 🎓✨

