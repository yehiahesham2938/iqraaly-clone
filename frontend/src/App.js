import React, { useState } from 'react';
import Navbar from './components/Navbar.js';
import Player from './components/Player/player.js';
import MiniPlayer from './components/MiniPlayer/MiniPlayer.js';
import { AudioPlayerProvider } from './contexts/AudioPlayerContext';
import { useAudioPlayer } from './hooks/useAudioPlayer'; // Correct import path
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showFullPlayer, setShowFullPlayer] = useState(false);

  return (
    <AudioPlayerProvider>
      <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="container" style={{ paddingTop: '100px', margin: '0 auto', maxWidth: '1200px' }}>
          <h1 className="main-heading">Welcome to Iqraaly Clone</h1>
          
          <button 
            onClick={() => setShowFullPlayer(!showFullPlayer)}
            style={{
              background: '#6200ee',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '20px'
            }}
          >
            {showFullPlayer ? 'Hide Player' : 'Show Player'}
          </button>
          
          {showFullPlayer && <Player />}
          
          <div style={{ marginTop: '40px' }}>
            <h2>Available Audiobooks</h2>
            <AudiobookList />
          </div>
        </div>
        <MiniPlayer />
      </div>
    </AudioPlayerProvider>
  );
}


const AudiobookList = () => {
  const { audiobooks, loading, error, loadTrack, currentTrack } = useAudioPlayer();

  if (loading) return <p>Loading audiobooks...</p>;
  if (error) return <p>Error loading audiobooks: {error}</p>;
  if (!audiobooks || audiobooks.length === 0) return <p>No audiobooks available.</p>;

  return (
    <div className="audiobook-list">
      {audiobooks.map(book => (
        <div 
          key={book._id} 
          className={`audiobook-item ${currentTrack && currentTrack._id === book._id ? 'active' : ''}`}
          onClick={() => loadTrack(book)}
          style={{
            padding: '15px',
            margin: '10px 0',
            backgroundColor: currentTrack && currentTrack._id === book._id ? '#6200ee20' : '#f5f5f5',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <h3 style={{ margin: '0 0 5px 0' }}>{book.title}</h3>
            <p style={{ margin: 0, color: '#666' }}>By {book.author}</p>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              loadTrack(book);
            }}
            style={{
              background: '#6200ee',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Play
          </button>
        </div>
      ))}
    </div>
  );
};

export default App;