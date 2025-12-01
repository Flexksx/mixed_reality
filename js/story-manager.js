/**
 * Story Manager
 * Single Responsibility: Handles story progression logic
 * Open/Closed Principle: Easy to extend with new story branches
 */

import { STORY_DATA, PATHS } from './config.js';

export class StoryManager {
  constructor(state, uiController) {
    this.state = state;
    this.ui = uiController;
    this._initializeStoryRules();
  }

  _initializeStoryRules() {
    // Define progression rules - easy to extend
    this.rules = [
      {
        markerIndex: 0,
        requiredStep: 0,
        storyKey: 'university',
        onComplete: () => this._handleStandardProgress(0)
      },
      {
        markerIndex: 1,
        requiredStep: 1,
        storyKey: 'laptop',
        onComplete: () => this._handleStandardProgress(1)
      },
      {
        markerIndex: 2,
        requiredStep: 2,
        storyKey: 'books',
        onComplete: () => this._handleBooksProgress()
      },
      {
        markerIndex: 3,
        requiredStep: 2, // Beer can be scanned after step 2
        storyKey: null, // Determined dynamically
        onComplete: () => this._handleBeerProgress()
      }
    ];
  }

  handleMarkerFound(markerIndex) {
    const rule = this.rules[markerIndex];
    if (!rule) return;

    const currentStep = this.state.completedSteps;
    
    // Check if this marker can be processed
    if (this._canProcessMarker(markerIndex, currentStep, rule.requiredStep)) {
      rule.onComplete();
    }
  }

  _canProcessMarker(markerIndex, currentStep, requiredStep) {
    // Beer marker (index 3) can be scanned after step 2 or 3
    if (markerIndex === 3) {
      return currentStep >= requiredStep;
    }
    // Other markers must be in sequence
    return currentStep === requiredStep;
  }

  _handleStandardProgress(stepIndex) {
    this.state.markStepComplete(stepIndex);
    const storyKey = this.rules[stepIndex].storyKey;
    this.ui.showStory(STORY_DATA[storyKey]);
    this._updateUI();
  }

  _handleBooksProgress() {
    this.state.markStepComplete(2);
    this.state.setStudiedBooks(true);
    this.ui.showStory(STORY_DATA.books);
    this._updateUI();
  }

  _handleBeerProgress() {
    this.state.markStepComplete(3);
    
    const path = this.state.studiedBooks ? PATHS.SUCCESS : PATHS.FAILURE;
    this.state.setPath(path);
    
    const storyKey = path === PATHS.SUCCESS ? 'beerSuccess' : 'beerFailure';
    this.ui.showStory(STORY_DATA[storyKey]);
    this.ui.showBeerContent(path);
    this.ui.showVictory(path);
    
    this._updateUI();
  }

  _updateUI() {
    const currentStep = this.state.completedSteps;
    this.ui.updateProgressDots(this.state.progress, currentStep);
    this.ui.updateScanTarget(currentStep);
  }

  reset() {
    this.state.reset();
    this.ui.resetUI();
  }
}

