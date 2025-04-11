import React from 'react';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import { formatTime } from '../../utils/formatTime';
import './Player.css';

const ProgressBar = () => {
  const { 
    currentTime, 
    duration, 
    handleSeek 
  } = useAudioPlayer();
  
  const progress = (currentTime / duration) * 100 || 0;
  
  const handleChange = (e) => {
    const value = parseFloat(e.target.value);
    handleSeek(value);
  };

  return (
    <div className="progress-container">
      <span className="time current-time">{formatTime(currentTime)}</span>
      <div className="progress-bar-wrapper">
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime || 0}
          step="0.01"
          className="progress-bar"
          onChange={handleChange}
        />
        <div 
          className="progress-bar-fill" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <span className="time duration">{formatTime(duration)}</span>
    </div>
  );
};

export default ProgressBar;