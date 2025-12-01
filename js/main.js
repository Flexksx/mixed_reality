/**
 * Main Application Entry Point
 * Dependency Inversion: Orchestrates dependencies
 * Single Responsibility: Application initialization and coordination
 */

import { CONFIG } from './config.js';
import { AppState } from './state.js';
import { UIController } from './ui-controller.js';
import { StoryManager } from './story-manager.js';
import { MarkerHandler } from './marker-handler.js';

class UniLifeApp {
    constructor() {
        this._initializeDependencies();
        this._setupEventListeners();
        this._exposeGlobalFunctions();
    }

    _initializeDependencies() {
        // Create instances following dependency injection pattern
        this.state = new AppState();
        this.ui = new UIController();
        this.storyManager = new StoryManager(this.state, this.ui);
        this.markerHandler = new MarkerHandler(this.storyManager, this.ui);
    }

    _setupEventListeners() {
        // Scene loaded event
        document.getElementById("scene").addEventListener("loaded", () => {
            this._onSceneLoaded();
        });

        // Attach marker listeners
        this.markerHandler.attachEventListeners();
    }

    _onSceneLoaded() {
        setTimeout(() => {
            this.ui.hideLoader();
        }, CONFIG.LOADER_DELAY);
    }

    _exposeGlobalFunctions() {
        // Expose reset function for button onclick
        window.resetStory = () => this.reset();
    }

    reset() {
        this.storyManager.reset();
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new UniLifeApp();
});

