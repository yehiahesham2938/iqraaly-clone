import React from 'react';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import { formatTime } from '../../utils/formatTime';
import { getImageUrl, handleImageError } from '../../utils/imageUtils';
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
    handleSeek,
    isBuffering,
    bufferProgress,
    handlePrevious,
    handleNext
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
      <div className="mini-player-content">
        <div className="mini-player-left">
          <VolumeControl />
        </div>

        <div className="mini-player-center">
          <div className="mini-player-info">
            <div className="mini-player-thumbnail">
              <img 
                src={getImageUrl(currenttrack.cover)} 
                alt={currenttrack.title}
                onError={(e) => handleImageError(e, 'book')}
              />
            </div>
            <div className="mini-player-text">
              <div className="mini-player-title">{currenttrack.title}</div>
              <div className="mini-player-artist">{currenttrack.author}</div>
            </div>
          </div>

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
            <div 
              className="mini-player-buffer-fill" 
              style={{ width: `${bufferProgress}%` }}
            ></div>
          </div>

          <div className="mini-player-controls">
            <button className="mini-player-button prev" onClick={handlePrevious}>
              <i className="fas fa-step-backward"></i>
            </button>
            {isBuffering ? (
              <div className="buffering-indicator">
                <div className="buffering-spinner"></div>
              </div>
            ) : (
              <button className="mini-player-button play-pause" onClick={isplaying ? handlePause : handlePlay}>
                <i className={`fas fa-${isplaying ? 'pause' : 'play'}`}></i>
              </button>
            )}
            <button className="mini-player-button next" onClick={handleNext}>
              <i className="fas fa-step-forward"></i>
            </button>
          </div>
        </div>

        <div className="mini-player-right">
          <PlaybackSpeedControl />
        </div>
      </div>
    </div>
  );
};

export default MiniPlayer;