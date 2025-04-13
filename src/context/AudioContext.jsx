import React, { createContext, useState, useEffect, useContext } from 'react';
import { Howl } from 'howler';

const AudioContext = createContext();

export const useAudio = () => useContext(AudioContext);

export const AudioProvider = ({ children }) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    try {
      const backgroundMusic = new Howl({
        src: ['/assets/audio/song.mp3'], // Update path to your audio file
        loop: true,
        volume: 0.9, // Updated to 90% volume
        autoplay: true,
        html5: true,
        preload: true,
        onload: () => {
          console.log('Audio loaded successfully');
          backgroundMusic.play();
        },
        onloaderror: (id, error) => console.error('Audio loading error:', error),
        onplayerror: (id, error) => {
          console.error('Audio play error:', error);
          // Attempt to recover from error
          backgroundMusic.once('unlock', function() {
            backgroundMusic.play();
          });
        },
      });

      setSound(backgroundMusic);

      // Handle autoplay restrictions
      const handleUserInteraction = () => {
        if (backgroundMusic && !backgroundMusic.playing()) {
          backgroundMusic.play();
          setIsPlaying(true);
        }
        document.removeEventListener('click', handleUserInteraction);
      };

      document.addEventListener('click', handleUserInteraction);

      return () => {
        document.removeEventListener('click', handleUserInteraction);
        if (backgroundMusic) {
          backgroundMusic.unload();
        }
      };
    } catch (error) {
      console.error('Error initializing audio:', error);
    }
  }, []);

  const togglePlay = () => {
    if (!sound) return;

    try {
      if (isPlaying) {
        sound.pause();
      } else {
        sound.play();
      }
      setIsPlaying(!isPlaying);
      setIsMuted(false);
    } catch (error) {
      console.error('Error toggling play:', error);
    }
  };

  const toggleMute = () => {
    if (!sound) return;

    try {
      sound.mute(!sound.mute());
      setIsMuted(!isMuted);
    } catch (error) {
      console.error('Error toggling mute:', error);
    }
  };

  const value = {
    sound,
    isPlaying,
    isMuted,
    togglePlay,
    toggleMute,
  };

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
};

export default AudioContext;
