import React, { useState } from 'react';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import './Player.css';

const PlaybackSpeedControl = () => {
  const { playbackRate = 1.0, handlePlaybackRateChange } = useAudioPlayer();
  const [isOpen, setIsOpen] = useState(false);

  const speedOptions = [0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0];

  const handleSpeedChange = (speed) => {
    handlePlaybackRateChange(speed);
    setIsOpen(false);
  };

  const formatSpeed = (speed) => {
    if (typeof speed !== 'number') return '1.00x';
    return speed.toFixed(2) + 'x';
  };

  return (
    <div className="playback-speed-control">
      <button
        className="speed-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Current speed: ${formatSpeed(playbackRate)}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {formatSpeed(playbackRate)}
      </button>
      {isOpen && (
        <div className="speed-options" role="menu">
          {speedOptions.map((speed) => (
            <button
              key={speed}
              className={`speed-option ${speed === playbackRate ? 'active' : ''}`}
              onClick={() => handleSpeedChange(speed)}
              role="menuitem"
              aria-label={`Set speed to ${speed}x`}
            >
              {speed.toFixed(2)}x
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlaybackSpeedControl;