import React from 'react';
import './AudioInfo.css';

const AudioInfo = ({ track }) => {
  if (!track) {
    return (
      <div className="audio-info-empty">
        <p>No track selected</p>
      </div>
    );
  }

  return (
    <div className="audio-info">
      <div className="audio-thumbnail">
        {track.cover ? (
          <img src={track.cover} alt="Track cover" className="audio-cover" />
        ) : (
          <div className="placeholder-cover">
            {track.title ? track.title.charAt(0).toUpperCase() : '🎵'}
          </div>
        )}
      </div>
      <div className="audio-details">
        <h3 className="audio-title">{track.title || 'Untitled Track'}</h3>
        <p className="audio-artist">{track.author || 'Unknown Artist'}</p>
      </div>
    </div>
  );
};

export default AudioInfo;