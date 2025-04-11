import React from 'react';
import './AudioInfo.css';

const AudioInfo = ({ track }) => {
  if (!track) return null;

  return (
    <div className="audio-info">
      <div className="audio-thumbnail">
        <div className="placeholder-cover">📚</div>
      </div>
      <div className="audio-details">
        <h3 className="audio-title">{track.title}</h3>
        <p className="audio-artist">{track.author}</p>
      </div>
    </div>
  );
};

export default AudioInfo;