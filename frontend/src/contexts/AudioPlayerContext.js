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
        seterror('Error playing audio. Please try again.');
        setisplaying(false);
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
  }, [currenttrack]);

  useEffect(() => {
    if (audioRef.current) {
      if (isplaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(err => {
            console.error('Error playing audio:', err);
            setisplaying(false);
          });
        }
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
    setvolume(value);
  };

  const handlePlaybackRateChange = (rate) => {
    setplaybackrate(rate);
  };

  const loadTrack = (track) => {
    // Check if the track is available offline
    const offlineTrack = offlineTracks.find(t => t._id === track._id);
    if (offlineTrack && offlineTrack.offlineUrl) {
      track.file_url = offlineTrack.offlineUrl;
    }
    setcurrenttrack(track);
    setisplaying(true);
    setcurrenttime(0);
    seterror(null);
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
      {currenttrack && (
        <audio
          ref={audioRef}
          src={currenttrack.file_url}
          preload="auto"
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setisplaying(false)}
        />
      )}
    </AudioPlayerContext.Provider>
  );
};