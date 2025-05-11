import React from 'react';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import PlayerControls from './PlayerControls';
import './Player.css';

const Player = () => {
  const { 
    currentTrack,
    isPlaying
  } = useAudioPlayer();

  // Empty state
  if (!currentTrack) {
    return (
      <div className="player-container empty-state">
        <p className="empty-message">🎵 Select a track to begin listening</p>
      </div>
    );
  }

  const downloadAudio = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
        <PlayerControls />
        <div className="secondary-controls-group">
          <button className="download-button" onClick={() => downloadAudio(currentTrack.file_url)}>
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default Player;