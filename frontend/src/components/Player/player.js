import React from 'react';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import PlayerControls from './PlayerControls';
import ProgressBar from './ProgressBar';
import VolumeControl from './VolumeControl';
import PlaybackSpeedControl from './PlaybackSpeedControl';
import './Player.css';

const Player = () => {
  const { currentTrack, isPlaying, isLoading, error } = useAudioPlayer();

  // Loading state
  if (isLoading) {
    return (
      <div className="player-container loading-state">
        <div className="loading-spinner"></div>
        <p>Loading audio player...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="player-container error-state">
        <p className="error-message">⚠️ Error: {error.message}</p>
        <button 
          className="retry-button"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  // Empty state
  if (!currentTrack) {
    return (
      <div className="player-container empty-state">
        <p className="empty-message">🎵 Select a track to begin listening</p>
      </div>
    );
  }

  // Main player UI
  return (
    <div className={`player-container ${isPlaying ? 'is-playing' : ''}`}>
      <div className="player-info-section">
        <div className="player-track-info">
          <img src={currentTrack.cover_url} alt={currentTrack.title} />
          <div>
            <h4>{currentTrack.title}</h4>
            <p>{currentTrack.author}</p>
          </div>
        </div>
      </div>
      
      <div className="player-controls-wrapper">
        <ProgressBar />
        <PlayerControls />
        <div className="secondary-controls-group">
          <VolumeControl />
          <PlaybackSpeedControl />
        </div>
      </div>
    </div>
  );
};

export default Player;