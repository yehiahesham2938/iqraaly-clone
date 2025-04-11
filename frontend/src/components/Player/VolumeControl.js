import React, { useState } from 'react';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import './Player.css';

const VolumeControl = () => {
  const { volume, handleVolumeChange } = useAudioPlayer();
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(volume);

  const toggleMute = () => {
    if (isMuted) {
      handleVolumeChange(prevVolume);
      setIsMuted(false);
    } else {
      setPrevVolume(volume);
      handleVolumeChange(0);
      setIsMuted(true);
    }
  };

  const handleChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    handleVolumeChange(newVolume);
    setIsMuted(newVolume === 0);
  };

  return (
    <div className="volume-control">
      <button className="volume-button" onClick={toggleMute}>
        {isMuted || volume === 0 ? (
          <i className="fas fa-volume-mute">🔇</i>
        ) : volume < 0.5 ? (
          <i className="fas fa-volume-down">🔉</i>
        ) : (
          <i className="fas fa-volume-up">🔊</i>
        )}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        className="volume-slider"
        onChange={handleChange}
      />
    </div>
  );
};

export default VolumeControl;