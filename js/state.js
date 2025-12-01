/**
 * Application State Manager
 * Single Responsibility: Manages all application state
 * Encapsulation: State is private and accessed through methods
 */

export class AppState {
  constructor() {
    this.reset();
  }

  reset() {
    this._progress = [false, false, false, false];
    this._studiedBooks = false;
    this._currentPath = null;
  }

  // Getters (Read-only access to state)
  get progress() {
    return [...this._progress]; // Return copy to prevent external modification
  }

  get studiedBooks() {
    return this._studiedBooks;
  }

  get currentPath() {
    return this._currentPath;
  }

  get completedSteps() {
    return this._progress.filter(step => step).length;
  }

  get isComplete() {
    return this._progress.every(step => step);
  }

  // State mutations
  markStepComplete(stepIndex) {
    if (stepIndex >= 0 && stepIndex < this._progress.length) {
      this._progress[stepIndex] = true;
    }
  }

  setStudiedBooks(value) {
    this._studiedBooks = value;
  }

  setPath(path) {
    this._currentPath = path;
  }

  // Queries
  isStepComplete(stepIndex) {
    return this._progress[stepIndex] || false;
  }

  canProgressToStep(stepIndex) {
    const completedSteps = this.completedSteps;
    return stepIndex === completedSteps;
  }
}

