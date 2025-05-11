import React from 'react';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import PlayerControls from './PlayerControls';
import { getImageUrl, handleImageError } from '../../utils/imageUtils';
import VolumeControl from './VolumeControl';
import PlaybackSpeedControl from './PlaybackSpeedControl';
import { formatTime } from '../../utils/formatTime';
import './Player.css';

const Player = () => {
  const { 
    currentTrack,
    isPlaying,
    playbackrate = 1.0,
    handlePlaybackRateChange,
    handlePlay,
    handlePause,
    handlePrevious,
    handleNext,
    currentTime,
    duration,
    handleSeek,
    isBuffering,
    bufferProgress
  } = useAudioPlayer();

  // Return null if no track is selected
  if (!currentTrack) {
    return null;
  }

  const progress = (currentTime / duration) * 100 || 0;

  const handleProgressChange = (e) => {
    const value = parseFloat(e.target.value);
    handleSeek(value);
  };

  const downloadAudio = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`player-container ${isPlaying ? 'is-playing' : ''}`}>
      <div className="player-left-controls">
        <div className="player-track-info">
          <img 
            src={getImageUrl(currentTrack.cover)} 
            alt={currentTrack.title}
            onError={(e) => handleImageError(e, 'book')}
          />
          <div>
            <h4>{currentTrack.title}</h4>
            <p>{currentTrack.author}</p>
          </div>
        </div>
        <VolumeControl />
        <button className="download-button" onClick={() => downloadAudio(currentTrack.file_url)}>
          <i className="fas fa-download"></i>
        </button>
      </div>

      <div className="player-center">
        <div className="player-progress-section">
          <div className="player-progress">
            <span className="player-time current">{formatTime(currentTime)}</span>
            <div className="player-progress-bar">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime || 0}
                step="0.01"
                className="player-progress-input"
                onChange={handleProgressChange}
              />
              <div 
                className="player-progress-fill" 
                style={{ width: `${progress}%` }}
              ></div>
              <div 
                className="player-buffer-fill" 
                style={{ width: `${bufferProgress}%` }}
              ></div>
            </div>
            <span className="player-time duration">{formatTime(duration)}</span>
          </div>
          
          <div className="player-main-controls">
            <button className="player-control-button next" onClick={handleNext}>
              <i className="fas fa-step-forward"></i>
            </button>
            {isBuffering ? (
              <div className="buffering-indicator">
                <div className="buffering-spinner"></div>
              </div>
            ) : (
              <button className="player-control-button play-pause" onClick={isPlaying ? handlePause : handlePlay}>
                <i className={`fas fa-${isPlaying ? 'pause' : 'play'}`}></i>
              </button>
            )}
            <button className="player-control-button prev" onClick={handlePrevious}>
              <i className="fas fa-step-backward"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="player-right-controls">
        <PlaybackSpeedControl />
      </div>
    </div>
  );
};

export default Player;