import React, { useState, useEffect } from 'react';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';

const PlaybackSpeedControl = () => {
  const { playbackrate, handlePlaybackRateChange } = useAudioPlayer();
  const [showOptions, setShowOptions] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(1.0);

  const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

  useEffect(() => {
    if (playbackrate) {
      setCurrentSpeed(playbackrate);
    }
  }, [playbackrate]);

  const handleSpeedChange = (speed) => {
    handlePlaybackRateChange(speed);
    setCurrentSpeed(speed);
    setShowOptions(false);
  };

  const formatSpeed = (speed) => {
    if (typeof speed !== 'number') return '1x';
    return speed === 1 ? '1x' : `${speed}x`;
  };

  return (
    <div className="playback-speed-control">
      <button 
        className="speed-button"
        onClick={() => setShowOptions(!showOptions)}
      >
        {formatSpeed(currentSpeed)}
      </button>
      {showOptions && (
        <div className="speed-options">
          {speeds.map((speed) => (
            <button
              key={speed}
              className={`speed-option ${speed === currentSpeed ? 'active' : ''}`}
              onClick={() => handleSpeedChange(speed)}
            >
              {formatSpeed(speed)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlaybackSpeedControl;