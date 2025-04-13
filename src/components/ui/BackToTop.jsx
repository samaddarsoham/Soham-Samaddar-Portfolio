import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const BackToTopButton = styled(motion.button)`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(10, 10, 30, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 100;
  box-shadow: 0 0 15px rgba(0, 170, 255, 0.3);
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }
  
  &:hover:before {
    opacity: 0.3;
  }
`;

const RocketIcon = styled(motion.div)`
  position: relative;
  width: 24px;
  height: 24px;
  
  &:before {
    content: '🚀';
    font-size: 24px;
  }
`;

const Flames = styled(motion.div)`
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 20px;
  
  &:before {
    content: '🔥';
    font-size: 20px;
  }
`;

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.8,
      rotate: 45
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 15
      }
    },
    exit: { 
      opacity: 0, 
      y: 20,
      scale: 0.8,
      rotate: -45,
      transition: {
        duration: 0.3
      }
    },
    hover: {
      scale: 1.1,
      boxShadow: '0 0 20px rgba(0, 170, 255, 0.5)',
    }
  };

  const rocketVariants = {
    idle: { y: 0 },
    hover: { 
      y: -5,
      transition: {
        yoyo: Infinity,
        duration: 0.5
      }
    }
  };

  const flameVariants = {
    idle: { opacity: 0, scale: 0 },
    hover: { 
      opacity: 1, 
      scale: 1,
      transition: {
        yoyo: Infinity,
        duration: 0.2
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <BackToTopButton
          onClick={scrollToTop}
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          whileHover="hover"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <RocketIcon
            variants={rocketVariants}
            animate={isHovered ? 'hover' : 'idle'}
          />
          <Flames
            variants={flameVariants}
            animate={isHovered ? 'hover' : 'idle'}
          />
        </BackToTopButton>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
