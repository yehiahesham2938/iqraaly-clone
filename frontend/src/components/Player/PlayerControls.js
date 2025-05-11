import React from 'react';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import PlaybackSpeedControl from './PlaybackSpeedControl';
import VolumeControl from './VolumeControl';
import ProgressBar from './ProgressBar';
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
      {/* Progress Bar */}
      <ProgressBar />

      <div className="player-main-controls">
        {/* Previous Button */}
        <button className="player-control-button prev" onClick={handlePrevious}>
          <i className="fas fa-step-backward"></i>
        </button>

        {/* Play/Pause Button */}
        {isPlaying ? (
          <button className="player-control-button pause" onClick={handlePause}>
            <i className="fas fa-pause"></i>
          </button>
        ) : (
          <button className="player-control-button play" onClick={handlePlay}>
            <i className="fas fa-play"></i>
          </button>
        )}

        {/* Next Button */}
        <button className="player-control-button next" onClick={handleNext}>
          <i className="fas fa-step-forward"></i>
        </button>
      </div>

      <div className="player-secondary-controls">
        {/* Playback Speed Control */}
        <PlaybackSpeedControl />

        {/* Volume Control */}
        <VolumeControl />
      </div>
    </div>
  );
};

export default PlayerControls;