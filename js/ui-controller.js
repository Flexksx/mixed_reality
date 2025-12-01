/**
 * UI Controller
 * Single Responsibility: Handles all DOM manipulations and UI updates
 * DRY: Centralizes all UI logic in one place
 */

import { CONFIG } from './config.js';

export class UIController {
  constructor() {
    this.elements = this._initializeElements();
  }

  _initializeElements() {
    return {
      loader: document.getElementById("loader"),
      scanTarget: document.getElementById("scan-target"),
      chapterPanel: document.getElementById("chapter-panel"),
      panelTitle: document.getElementById("panel-title"),
      panelStory: document.getElementById("panel-story"),
      victorySuccess: document.getElementById("victory-success"),
      victoryFailure: document.getElementById("victory-failure"),
      beerSuccess: document.getElementById("beer-success"),
      beerFailure: document.getElementById("beer-failure"),
      dots: CONFIG.PROGRESS_DOTS.map(id => document.getElementById(id))
    };
  }

  hideLoader() {
    this.elements.loader.classList.add("hidden");
  }

  showStory(chapter) {
    this.elements.panelTitle.textContent = chapter.title;
    this.elements.panelStory.innerHTML = chapter.story;
    this.elements.chapterPanel.classList.add("show");
  }

  hideStory() {
    this.elements.chapterPanel.classList.remove("show");
  }

  updateProgressDots(progress, currentStep) {
    this.elements.dots.forEach((dot, index) => {
      dot.classList.toggle("active", progress[index]);
      dot.classList.toggle("current", index === currentStep && currentStep < 4);
    });
  }

  updateScanTarget(step) {
    if (step < CONFIG.SCAN_TARGETS.length) {
      this.elements.scanTarget.textContent = CONFIG.SCAN_TARGETS[step];
    } else {
      this.elements.scanTarget.textContent = "COMPLETE";
    }
  }

  showVictory(path) {
    const victoryElement = path === 'success' 
      ? this.elements.victorySuccess 
      : this.elements.victoryFailure;
    
    victoryElement.classList.add("show");
  }

  hideVictories() {
    this.elements.victorySuccess.classList.remove("show");
    this.elements.victoryFailure.classList.remove("show");
  }

  showBeerContent(path) {
    const element = path === 'success' 
      ? this.elements.beerSuccess 
      : this.elements.beerFailure;
    
    element.setAttribute("visible", "true");
  }

  hideBeerContents() {
    this.elements.beerSuccess.setAttribute("visible", "false");
    this.elements.beerFailure.setAttribute("visible", "false");
  }

  resetUI() {
    this.hideVictories();
    this.hideBeerContents();
    this.hideStory();
    
    this.elements.dots.forEach((dot, index) => {
      dot.classList.remove("active");
      dot.classList.toggle("current", index === 0);
    });
    
    this.elements.scanTarget.textContent = CONFIG.SCAN_TARGETS[0];
  }
}

