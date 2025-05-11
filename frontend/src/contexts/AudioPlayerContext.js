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
  const [isBuffering, setIsBuffering] = useState(false);
  const [bufferProgress, setBufferProgress] = useState(0);
  const [offlineTracks, setOfflineTracks] = useState(() => {
    const saved = localStorage.getItem('offlineTracks');
    return saved ? JSON.parse(saved) : [];
  });
  const audioRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('offlineTracks', JSON.stringify(offlineTracks));
  }, [offlineTracks]);

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
      const audio = audioRef.current;

      const handleWaiting = () => {
        setIsBuffering(true);
      };

      const handleCanPlay = () => {
        setIsBuffering(false);
      };

      const handleProgress = () => {
        if (audio.buffered.length > 0) {
          const bufferedEnd = audio.buffered.end(audio.buffered.length - 1);
          const duration = audio.duration || 1;
          const progress = (bufferedEnd / duration) * 100;
          setBufferProgress(progress);
        }
      };

      const handleError = (e) => {
        console.error('Audio error:', e);
        setError('Error playing audio. Please try again.');
        setIsPlaying(false);
      };

      audio.addEventListener('waiting', handleWaiting);
      audio.addEventListener('canplay', handleCanPlay);
      audio.addEventListener('progress', handleProgress);
      audio.addEventListener('error', handleError);

      return () => {
        audio.removeEventListener('waiting', handleWaiting);
        audio.removeEventListener('canplay', handleCanPlay);
        audio.removeEventListener('progress', handleProgress);
        audio.removeEventListener('error', handleError);
      };
    }
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(err => {
            console.error('Error playing audio:', err);
            setIsPlaying(false);
          });
        }
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
    setVolume(value);
  };

  const handlePlaybackRateChange = (rate) => {
    setPlaybackRate(rate);
  };

  const loadTrack = (track) => {
    // Check if the track is available offline
    const offlineTrack = offlineTracks.find(t => t._id === track._id);
    if (offlineTrack && offlineTrack.offlineUrl) {
      track.file_url = offlineTrack.offlineUrl;
    }
    setCurrentTrack(track);
    setIsPlaying(true);
    setCurrentTime(0);
    setError(null);
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
        isBuffering,
        bufferProgress,
        offlineTracks,
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
          preload="auto"
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
        />
      )}
    </AudioPlayerContext.Provider>
  );
};