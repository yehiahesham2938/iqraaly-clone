import React from 'react';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import { getImageUrl, handleImageError } from '../../utils/imageUtils';
import OfflineMode from '../Player/OfflineMode';
import './AudioInfo.css';

const AudioInfo = ({ track }) => {
  const { loadTrack, currenttrack } = useAudioPlayer();

  // Use the current track if available, otherwise use the passed track
  const displayTrack = currenttrack || track;

  if (!displayTrack) {
    return (
      <div className="audio-info-empty">
        <p>No track selected</p>
      </div>
    );
  }

  return (
    <div className="audio-info">
      <div className="audio-thumbnail">
        {displayTrack.cover ? (
          <img 
            src={getImageUrl(displayTrack.cover)} 
            alt="Track cover" 
            className="audio-cover"
            onError={(e) => handleImageError(e, 'book')}
          />
        ) : (
          <div className="placeholder-cover">
            {displayTrack.title ? displayTrack.title.charAt(0).toUpperCase() : '🎵'}
          </div>
        )}
      </div>
      <div className="audio-details">
        <h3 className="audio-title">{displayTrack.title || 'Untitled Track'}</h3>
        <p className="audio-artist">{displayTrack.author || 'Unknown Artist'}</p>
      </div>
      <div className="audio-actions">
        <button 
          className="audio-play-button"
          onClick={() => loadTrack(displayTrack)}
        >
          Play
        </button>
        <OfflineMode />
      </div>
    </div>
  );
};

export default AudioInfo;