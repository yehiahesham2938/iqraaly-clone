import React from 'react';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import PlayerControls from './PlayerControls';
import ProgressBar from './ProgressBar';
import VolumeControl from './VolumeControl';
import PlaybackSpeedControl from './PlaybackSpeedControl';
import './Player.css';

const Player = () => {
  const { 
    currentTrack,
    isPlaying,
    handlePlay,
    handlePause,
    handleSeek,
    handleVolumeChange,
    handlePlaybackRateChange
  } = useAudioPlayer();

  
  if (!currentTrack) {
    return (
      <div className="player-container empty-state">
        <p className="empty-message">🎵 Select a track to begin listening</p>
      </div>
    );
  }

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
      <div className="player-controls-wrapper">
        <ProgressBar />
        <PlayerControls />
        <div className="secondary-controls-group">
          <VolumeControl />
          <PlaybackSpeedControl />
          <button className="download-button" onClick={() => downloadAudio(currentTrack.file_url)}>
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default Player;