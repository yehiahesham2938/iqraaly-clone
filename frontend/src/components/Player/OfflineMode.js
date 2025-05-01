import React from 'react';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import './Player.css';

const OfflineMode = () => {
  const { currenttrack } = useAudioPlayer();

  if (!currenttrack) return null;

  const handleDownload = () => {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = currenttrack.file_url;
    link.download = `${currenttrack.title || 'audio'}.mp3`; // Set the filename
    document.body.appendChild(link);
    link.click(); // Trigger the download
    document.body.removeChild(link); // Clean up
  };

  return (
    <div className="offline-mode">
      <button 
        className="offline-button download"
        onClick={handleDownload}
        title="Download MP3"
      >
        <i className="fas fa-download">⬇️</i>
      </button>
    </div>
  );
};

export default OfflineMode; 