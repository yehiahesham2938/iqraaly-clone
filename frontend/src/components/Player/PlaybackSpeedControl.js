import React, { useState } from 'react';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import './Player.css';

const PlaybackSpeedControl = () => {
  const { playbackRate, handlePlaybackRateChange } = useAudioPlayer();
  const [isSpeedMenuOpen, setIsSpeedMenuOpen] = useState(false);

  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];

  const toggleSpeedMenu = () => {
    setIsSpeedMenuOpen(!isSpeedMenuOpen);
  };

  const changeSpeed = (speed) => {
    handlePlaybackRateChange(speed);
    setIsSpeedMenuOpen(false);
  };

  return (
    <div className="playback-speed-control">
      <button 
        className="speed-button" 
        onClick={toggleSpeedMenu}
      >
        {playbackRate}x
      </button>
      
      {isSpeedMenuOpen && (
        <div className="speed-options">
          {speedOptions.map((speed) => (
            <button
              key={speed}
              className={`speed-option ${speed === playbackRate ? 'active' : ''}`}
              onClick={() => changeSpeed(speed)}
            >
              {speed}x
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlaybackSpeedControl;