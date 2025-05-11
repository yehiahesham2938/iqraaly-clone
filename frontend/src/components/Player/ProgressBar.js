import React, { useState, useEffect, useRef } from 'react';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import { formatTime } from '../../utils/formatTime';
import './Player.css';

const ProgressBar = () => {
  const { currentTime, duration, handleSeek, currentTrack } = useAudioPlayer();
  const [isDragging, setIsDragging] = useState(false);
  const [localTime, setLocalTime] = useState(currentTime);
  const [showPreview, setShowPreview] = useState(false);
  const [previewPosition, setPreviewPosition] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (!isDragging) {
      setLocalTime(currentTime);
    }
  }, [currentTime, isDragging]);

  const handleChange = (e) => {
    const value = parseFloat(e.target.value);
    setLocalTime(value);
    handleSeek(value);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    updatePreviewPosition(e);
    const slider = sliderRef.current;
    if (slider) {
      const rect = slider.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const newTime = Math.max(0, Math.min(duration, (x / rect.width) * duration));
      setLocalTime(newTime);
      handleSeek(newTime);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && sliderRef.current) {
      updatePreviewPosition(e);
      const slider = sliderRef.current;
      const rect = slider.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const newTime = Math.max(0, Math.min(duration, (x / rect.width) * duration));
      setLocalTime(newTime);
      handleSeek(newTime);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setShowPreview(false);
  };

  const updatePreviewPosition = (e) => {
    const slider = sliderRef.current;
    if (slider) {
      const rect = slider.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setPreviewPosition(percentage);
    }
  };

  const handleMouseEnter = () => {
    setShowPreview(true);
  };

  const handleMouseLeave = () => {
    if (!isDragging) {
      setShowPreview(false);
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, duration]);

  const progress = (localTime / duration) * 100 || 0;

  return (
    <div className="progress-container">
      <span className="time current-time">{formatTime(localTime)}</span>
      <div 
        className="progress-bar-wrapper"
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={localTime || 0}
          step="0.01"
          className="progress-bar"
          onChange={handleChange}
          aria-label="Audio progress"
        />
        <div
          className="progress-bar-fill"
          style={{ width: `${progress}%` }}
        />
        {showPreview && currentTrack?.cover_url && (
          <div 
            className="progress-preview"
            style={{ left: `${previewPosition}%` }}
          >
            <img 
              src={currentTrack.cover_url} 
              alt="Track preview" 
              className="preview-image"
            />
            <div className="preview-time">
              {formatTime((previewPosition / 100) * duration)}
            </div>
          </div>
        )}
      </div>
      <span className="time duration">{formatTime(duration)}</span>
    </div>
  );
};

export default ProgressBar;