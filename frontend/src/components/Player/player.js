import React from 'react';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import PlayerControls from './PlayerControls';
import ProgressBar from './ProgressBar';
import VolumeControl from './VolumeControl';
import PlaybackSpeedControl from './PlaybackSpeedControl';
import AudioInfo from '../AudioInfo/AudioInfo';
import './Player.css';

const Player = () => {
  const { currentTrack } = useAudioPlayer();

  if (!currentTrack) {
    return null;
  }

  return (
    <div className="player-container">
      <AudioInfo track={currentTrack} />
      <div className="player-controls-wrapper">
        <ProgressBar />
        <div className="player-controls-row">
          <PlayerControls />
          <VolumeControl />
          <PlaybackSpeedControl />
        </div>
      </div>
    </div>
  );
};

export default Player;