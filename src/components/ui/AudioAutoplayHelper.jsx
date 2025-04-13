import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../../context/AudioContext';

const HelperContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  color: white;
  text-align: center;
  padding: 2rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: var(--primary-color);
  text-shadow: var(--neon-shadow);
`;

const Description = styled.p`
  font-size: 1.2rem;
  max-width: 600px;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const Button = styled(motion.button)`
  background: var(--primary-color);
  color: var(--background-color);
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: var(--neon-shadow);

  &:hover {
    background: var(--secondary-color);
  }
`;

const AudioAutoplayHelper = () => {
  const { sound, isPlaying, togglePlay } = useAudio();
  const [showHelper, setShowHelper] = useState(true);

  useEffect(() => {
    // Check if audio is already playing
    if (sound && isPlaying) {
      setShowHelper(false);
    }

    // Add event listener for user interaction
    const handleUserInteraction = () => {
      if (sound && !isPlaying) {
        togglePlay();
      }
      setShowHelper(false);
      document.removeEventListener('click', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
    };
  }, [sound, isPlaying, togglePlay]);

  const handleStartAudio = () => {
    if (sound && !isPlaying) {
      togglePlay();
    }
    setShowHelper(false);
  };

  return (
    <AnimatePresence>
      {showHelper && (
        <HelperContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Title>Enable Audio Experience</Title>
          <Description>
            This portfolio features an immersive audio experience with epic orchestral music.
            Click the button below to enable audio and enhance your browsing experience.
          </Description>
          <Button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStartAudio}
          >
            Start Audio Experience
          </Button>
        </HelperContainer>
      )}
    </AnimatePresence>
  );
};

export default AudioAutoplayHelper;
