import React, { createContext, useState, useEffect, useRef } from 'react';

export const AudioPlayerContext = createContext();

export const AudioPlayerProvider = ({ children }) => {
  const [currenttrack, setcurrenttrack] = useState(null);
  const [isplaying, setisplaying] = useState(false);
  const [duration, setduration] = useState(0);
  const [currenttime, setcurrenttime] = useState(0);
  const [volume, setvolume] = useState(0.7);
  const [playbackrate, setplaybackrate] = useState(1);
  const [audiobooks, setaudiobooks] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchAudiobooks = async () => {  
      setloading(true);
      try {
        const response = await fetch('http://localhost:5000/api/audiobooks');
        if (!response.ok) {
          throw new Error('Failed to fetch audiobooks');
        }
        const data = await response.json();
        if (data.success) {
          setaudiobooks(data.audiobooks);
        }
      } catch (err) {
        seterror(err.message);
        console.error('Error fetching audiobooks:', err);
      } finally {
        setloading(false);
      }
    };

    fetchAudiobooks();
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isplaying) {
        audioRef.current.play().catch(err => {
          console.error('Error playing audio:', err);
          setisplaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isplaying, currenttrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackrate;
    }
  }, [playbackrate]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handlePlay = () => {
    setisplaying(true);
  };

  const handlePause = () => {
    setisplaying(false);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setduration(audioRef.current.duration);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setcurrenttime(audioRef.current.currentTime);
    }
  };

  const handleSeek = (value) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setcurrenttime(value);
    }
  };

  const handleVolumeChange = (value) => {
    if (audioRef.current) {
      audioRef.current.volume = value;
      setvolume(value);
    }
  };

  const handlePlaybackRateChange = (rate) => {
    setplaybackrate(rate);
  };

  const loadTrack = (track) => {
    setcurrenttrack(track);
    setisplaying(true);
    setcurrenttime(0);
  };

  return (
    <AudioPlayerContext.Provider
      value={{
        currenttrack,
        isplaying,
        duration,
        currenttime,
        volume,
        playbackrate,
        audiobooks,
        loading,
        error,
        audioRef,
        handlePlay,
        handlePause,
        handleSeek,
        handleVolumeChange,
        handlePlaybackRateChange,
        loadTrack,
        handleLoadedMetadata,
        handleTimeUpdate
      }}
    >
      {children}
      {currenttrack && (
        <audio
          ref={audioRef}
          src={currenttrack.file_url}
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setisplaying(false)}
        />
      )}
    </AudioPlayerContext.Provider>
  );
};