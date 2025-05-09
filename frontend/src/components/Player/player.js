import React, { useEffect, useRef, useState } from 'react';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import PlayerControls from './PlayerControls';
import ProgressBar from './ProgressBar';
import VolumeControl from './VolumeControl';
import PlaybackSpeedControl from './PlaybackSpeedControl';
import './Player.css';

const Player = ({ track }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    console.log('Play/Pause button clicked');
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play().then(() => {
          console.log('Audio play triggered');
          setIsPlaying(true);
        }).catch(error => console.error('Error playing audio:', error));
      } else {
        audioRef.current.pause();
        console.log('Audio pause triggered');
        setIsPlaying(false);
      }
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      console.log('Initializing audio with URL:', track.file_url);
      audioRef.current.src = track.file_url;
      audioRef.current.load(); // Ensure the audio is loaded
      audioRef.current.onloadedmetadata = () => {
        console.log('Audio duration:', audioRef.current.duration);
      };
      audioRef.current.ontimeupdate = () => {
        console.log('Current time:', audioRef.current.currentTime);
      };
      audioRef.current.onplay = () => {
        console.log('Audio is playing');
        setIsPlaying(true);
      };
      audioRef.current.onpause = () => {
        console.log('Audio is paused');
        setIsPlaying(false);
      };
      audioRef.current.onerror = (e) => {
        console.error('Audio error:', e);
      };
    }
  }, [track]);

  const handleLoadedMetadata = () => {
    // Update UI with audio duration
    console.log('Audio duration:', audioRef.current.duration);
  };

  const handleTimeUpdate = () => {
    // Update UI with current time
    console.log('Current time:', audioRef.current.currentTime);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('timeupdate', handleTimeUpdate);
      return () => {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, []);

  // Empty state
  if (!track) {
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

  // Main player UI
  return (
    <div className={`player-container ${isPlaying ? 'is-playing' : ''}`}>
      <audio ref={audioRef} controls style={{ display: 'none' }} />
      <div className="player-controls-wrapper">
        <ProgressBar />
        <PlayerControls togglePlayPause={handlePlayPause} isPlaying={isPlaying} />
        <div className="secondary-controls-group">
          <VolumeControl />
          <PlaybackSpeedControl />
          <button className="download-button" onClick={() => downloadAudio(track.file_url)}>
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default Player;