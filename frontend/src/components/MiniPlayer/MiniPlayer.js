import React from 'react';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import { formatTime } from '../../utils/formatTime';
import './MiniPlayer.css';

const MiniPlayer = () => {
  const { 
    currentTrack, 
    isPlaying, 
    handlePlay, 
    handlePause,
    currentTime,
    duration
  } = useAudioPlayer();

  if (!currentTrack) {
    return null;
  }

  const progress = (currentTime / duration) * 100 || 0;

  return (
    <div className="mini-player">
      <div className="mini-player-progress">
        <div 
          className="mini-player-progress-fill" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="mini-player-content">
        <div className="mini-player-info">
          <div className="mini-player-thumbnail">
            <div className="placeholder-cover">📚</div>
          </div>
          <div className="mini-player-text">
            <div className="mini-player-title">{currentTrack.title}</div>
            <div className="mini-player-artist">{currentTrack.author}</div>
          </div>
        </div>
        
        <div className="mini-player-controls">
          {isPlaying ? (
            <button className="mini-player-button" onClick={handlePause}>
              <i className="fas fa-pause">⏸</i>
            </button>
          ) : (
            <button className="mini-player-button" onClick={handlePlay}>
              <i className="fas fa-play">▶️</i>
            </button>
          )}
          <div className="mini-player-time">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniPlayer;