import React, { createContext, useState, useEffect, useRef } from 'react';

export const AudioPlayerContext = createContext();

export const AudioPlayerProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [audiobooks, setAudiobooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const audioRef = useRef(null);


  useEffect(() => {
    const fetchAudiobooks = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/audiobooks');
        if (!response.ok) {
          throw new Error('Failed to fetch audiobooks');
        }
        const data = await response.json();
        if (data.success) {
          setAudiobooks(data.audiobooks);
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching audiobooks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAudiobooks();
  }, []);


  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(err => {
          console.error('Error playing audio:', err);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);


  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);


  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleSeek = (value) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setCurrentTime(value);
    }
  };

  const handleVolumeChange = (value) => {
    if (audioRef.current) {
      audioRef.current.volume = value;
      setVolume(value);
    }
  };

  const handlePlaybackRateChange = (rate) => {
    setPlaybackRate(rate);
  };

  const loadTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    setCurrentTime(0);
  };

  return (
    <AudioPlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        duration,
        currentTime,
        volume,
        playbackRate,
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
      {currentTrack && (
        <audio
          ref={audioRef}
          src={currentTrack.file_url}
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
        />
      )}
    </AudioPlayerContext.Provider>
  );
};