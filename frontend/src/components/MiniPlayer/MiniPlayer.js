import React from 'react';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import { formatTime } from '../../utils/formatTime';
import VolumeControl from '../Player/VolumeControl';
import PlaybackSpeedControl from '../Player/PlaybackSpeedControl';
import './MiniPlayer.css';

const MiniPlayer = () => {
  const { 
    currenttrack, 
    isplaying, 
    handlePlay, 
    handlePause, 
    currenttime, 
    duration,
    handleSeek
  } = useAudioPlayer();

  if (!currenttrack) {
    return null;
  }

  const progress = (currenttime / duration) * 100 || 0;

  const handleProgressChange = (e) => {
    const value = parseFloat(e.target.value);
    handleSeek(value);
  };

  return (
    <div className="mini-player">
      <div className="mini-player-progress">
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currenttime || 0}
          step="0.01"
          className="mini-player-progress-bar"
          onChange={handleProgressChange}
        />
        <div 
          className="mini-player-progress-fill" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="mini-player-content">
        <div className="mini-player-info">
          <div className="mini-player-thumbnail">
            <img src={currenttrack.cover_url} alt={currenttrack.title} />
          </div>
          <div className="mini-player-text">
            <div className="mini-player-title">{currenttrack.title}</div>
            <div className="mini-player-artist">{currenttrack.author}</div>
          </div>
        </div>
        
        <div className="mini-player-controls">
          <div className="mini-player-main-controls">
            <button className="mini-player-button" onClick={handlePause}>
              {isplaying ? '⏸' : '▶️'}
            </button>
            <div className="mini-player-time">
              {formatTime(currenttime)} / {formatTime(duration)}
            </div>
          </div>

          <div className="mini-player-secondary-controls">
            <VolumeControl />
            <PlaybackSpeedControl />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniPlayer;