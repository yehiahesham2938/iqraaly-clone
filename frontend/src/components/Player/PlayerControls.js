import React from 'react';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import './Player.css';

const PlayerControls = () => {
  const { isPlaying, handlePlay, handlePause, audiobooks, currentTrack, loadTrack } = useAudioPlayer();

  const handlePrevious = () => {
    if (!currentTrack || !audiobooks.length) return;
    
    const currentIndex = audiobooks.findIndex(book => book._id === currentTrack._id);
    if (currentIndex > 0) {
      loadTrack(audiobooks[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (!currentTrack || !audiobooks.length) return;
    
    const currentIndex = audiobooks.findIndex(book => book._id === currentTrack._id);
    if (currentIndex < audiobooks.length - 1) {
      loadTrack(audiobooks[currentIndex + 1]);
    }
  };

  return (
    <div className="player-controls">
      <button className="player-control-button prev" onClick={handlePrevious}>
        <i className="fas fa-step-backward">⏮</i>
      </button>
      
      {isPlaying ? (
        <button className="player-control-button pause" onClick={handlePause}>
          <i className="fas fa-pause">⏸</i>
        </button>
      ) : (
        <button className="player-control-button play" onClick={handlePlay}>
          <i className="fas fa-play">▶️</i>
        </button>
      )}
      
      <button className="player-control-button next" onClick={handleNext}>
        <i className="fas fa-step-forward">⏭</i>
      </button>
    </div>
  );
};

export default PlayerControls;