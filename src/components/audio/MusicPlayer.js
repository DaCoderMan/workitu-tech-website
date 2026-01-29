'use client';

import { useState, useRef, useEffect } from 'react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [showControls, setShowControls] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Reset audio to start if it has ended
        if (audioRef.current.ended) {
          audioRef.current.currentTime = 0;
        }

        // Play returns a promise - handle it properly
        const playPromise = audioRef.current.play();

        if (playPromise !== undefined) {
          await playPromise;
          setIsPlaying(true);
        }
      }
    } catch (err) {
      console.error('Error playing audio:', err);
      setError(true);
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleCanPlay = () => {
    setIsLoaded(true);
    setError(false);
  };

  const handleError = () => {
    console.error('Audio file failed to load');
    setError(true);
    setIsLoaded(false);
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  // Don't render if there's an error loading
  if (error) {
    return null;
  }

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/workitu-song.m4a"
        loop
        preload="auto"
        onCanPlay={handleCanPlay}
        onEnded={handleEnded}
        onError={handleError}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />

      <div
        className={`fixed top-4 left-4 z-50 ${isPlaying ? 'playing' : ''}`}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <div className="relative">
          {/* Main Play Button */}
          <button
            onClick={togglePlay}
            disabled={!isLoaded}
            className={`p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl ${
              isLoaded
                ? 'bg-gold-500 hover:bg-gold-600 text-black cursor-pointer'
                : 'bg-gold-500/50 text-black/50 cursor-wait'
            } ${isPlaying ? 'animate-pulse' : ''}`}
            title={isPlaying ? 'Pause Workitu Tech Song' : 'Play Workitu Tech Song'}
            aria-label={isPlaying ? 'Pause music' : 'Play music'}
          >
            {isPlaying ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
          </button>

          {/* Song Title & Volume Controls */}
          <div
            className={`absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-black/90 backdrop-blur-sm rounded-lg px-4 py-3 border border-gold-500/20 transition-all duration-300 ${
              showControls ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          >
            <p className="text-gold-400 text-sm font-medium whitespace-nowrap mb-2">
              Workitu Tech Song
            </p>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-gold-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.816L4.617 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.617l3.766-3.816a1 1 0 011.617.816z" clipRule="evenodd" />
              </svg>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-gold-500/30 rounded-lg appearance-none cursor-pointer"
                aria-label="Volume"
              />
              <svg className="w-4 h-4 text-gold-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.816L4.617 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.617l3.766-3.816a1 1 0 011.617.816zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
