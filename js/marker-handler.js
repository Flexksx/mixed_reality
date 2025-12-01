/**
 * Marker Handler
 * Single Responsibility: Manages AR marker events
 * DRY: Centralizes all marker-related logic
 */

import { CONFIG } from './config.js';

export class MarkerHandler {
  constructor(storyManager, uiController) {
    this.storyManager = storyManager;
    this.ui = uiController;
    this.markers = this._initializeMarkers();
  }

  _initializeMarkers() {
    return Object.values(CONFIG.MARKER_IDS).map(id => 
      document.getElementById(id)
    ).filter(marker => marker !== null);
  }

  attachEventListeners() {
    this.markers.forEach((marker, index) => {
      this._attachMarkerEvents(marker, index);
    });
  }

  _attachMarkerEvents(marker, index) {
    marker.addEventListener("markerFound", () => {
      this._onMarkerFound(index);
    });
    
    marker.addEventListener("markerLost", () => {
      this._onMarkerLost();
    });
  }

  _onMarkerFound(markerIndex) {
    this.storyManager.handleMarkerFound(markerIndex);
  }

  _onMarkerLost() {
    this.ui.hideStory();
  }
}

