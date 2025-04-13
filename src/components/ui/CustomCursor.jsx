import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CursorOuter = styled(motion.div)`
  position: fixed;
  width: 40px;
  height: 40px;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
  transition: transform 0.1s ease;
`;

const CursorInner = styled(motion.div)`
  position: fixed;
  width: 8px;
  height: 8px;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
`;

const CursorDot = styled(motion.div)`
  position: fixed;
  width: 4px;
  height: 4px;
  background-color: white;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
`;

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', mouseMove);

    const handleMouseDown = () => setCursorVariant('click');
    const handleMouseUp = () => setCursorVariant('default');
    const handleMouseEnterLink = () => setCursorVariant('hover');
    const handleMouseLeaveLink = () => setCursorVariant('default');

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const links = document.querySelectorAll('a, button');
    links.forEach((link) => {
      link.addEventListener('mouseenter', handleMouseEnterLink);
      link.addEventListener('mouseleave', handleMouseLeaveLink);
    });

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      
      links.forEach((link) => {
        link.removeEventListener('mouseenter', handleMouseEnterLink);
        link.removeEventListener('mouseleave', handleMouseLeaveLink);
      });
    };
  }, []);

  // Update event listeners when DOM changes
  useEffect(() => {
    const handleMouseEnterLink = () => setCursorVariant('hover');
    const handleMouseLeaveLink = () => setCursorVariant('default');

    const updateLinkListeners = () => {
      const links = document.querySelectorAll('a, button');
      links.forEach((link) => {
        link.addEventListener('mouseenter', handleMouseEnterLink);
        link.addEventListener('mouseleave', handleMouseLeaveLink);
      });
    };

    // Use MutationObserver to detect DOM changes
    const observer = new MutationObserver(updateLinkListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    updateLinkListeners();

    return () => {
      observer.disconnect();
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      opacity: 0.8,
    },
    hover: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      scale: 1.5,
      borderColor: '#00aaff',
      opacity: 0.5,
    },
    click: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      scale: 0.8,
      borderColor: '#ff0033',
      opacity: 1,
    },
  };

  const innerVariants = {
    default: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      opacity: 1,
    },
    hover: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      scale: 2,
      backgroundColor: '#00aaff',
    },
    click: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      scale: 0.5,
      backgroundColor: '#ff0033',
    },
  };

  const dotVariants = {
    default: {
      x: mousePosition.x - 2,
      y: mousePosition.y - 2,
      opacity: 0.5,
    },
    hover: {
      x: mousePosition.x - 2,
      y: mousePosition.y - 2,
      opacity: 0,
    },
    click: {
      x: mousePosition.x - 2,
      y: mousePosition.y - 2,
      scale: 2,
      opacity: 1,
    },
  };

  return (
    <>
      <CursorOuter
        variants={variants}
        animate={cursorVariant}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
      <CursorInner
        variants={innerVariants}
        animate={cursorVariant}
        transition={{ type: 'spring', stiffness: 800, damping: 28 }}
      />
      <CursorDot
        variants={dotVariants}
        animate={cursorVariant}
        transition={{ type: 'spring', stiffness: 1000, damping: 28 }}
      />
    </>
  );
};

export default CustomCursor;
