import React, { createContext, useState, useEffect, useContext } from 'react';
import { Howl } from 'howler';
import songFile from '../assets/audio/song.mp3';

const AudioContext = createContext();

export const useAudio = () => useContext(AudioContext);

export const AudioProvider = ({ children }) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false); // Set to unmuted by default

  useEffect(() => {
    try {
      // Use the local song.mp3 file from assets/audio folder
      const backgroundMusic = new Howl({
        src: [songFile], // Local audio file
        loop: true,
        volume: 0.75, // Set to 75% volume as requested
        autoplay: true, // Set to autoplay
        html5: false, // Set to false for better compatibility
        format: ['mp3'],
        onload: () => {
          console.log('Audio loaded successfully');
          backgroundMusic.play(); // Ensure it plays when loaded
        },
        onloaderror: (id, error) => console.error('Audio loading error:', error),
        onplayerror: (id, error) => console.error('Audio play error:', error),
      });

      setSound(backgroundMusic);

      // Try to play the audio as soon as possible
      setTimeout(() => {
        try {
          backgroundMusic.play();
          setIsPlaying(true);
        } catch (error) {
          console.error('Error playing audio on mount:', error);
        }
      }, 1000);

      return () => {
        backgroundMusic.unload();
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
