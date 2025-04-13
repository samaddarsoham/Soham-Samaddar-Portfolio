import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../../context/AudioContext';

const NavbarContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(10px);
  background: rgba(5, 5, 16, 0.8);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
`;

const Logo = styled(motion.div)`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  
  span {
    color: ${({ theme }) => theme.colors.primary};
    margin-left: 0.5rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const NavLink = styled(motion.a)`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.primary};
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 100%;
  }
`;

const MobileMenuButton = styled(motion.button)`
  display: none;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1001;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background: rgba(5, 5, 16, 0.95);
  backdrop-filter: blur(10px);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

const MobileNavLink = styled(motion.a)`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.primary};
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 100%;
  }
`;

const AudioButton = styled(motion.button)`
  background: transparent;
  border: none;
  color: ${({ theme, isMuted }) => isMuted ? theme.colors.text : theme.colors.primary};
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid ${({ theme, isMuted }) => isMuted ? 'rgba(255, 255, 255, 0.2)' : theme.colors.primary};
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 0, 51, 0.1);
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isMuted, toggleMute } = useAudio();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  };

  const mobileMenuVariants = {
    closed: { 
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    open: { 
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <NavbarContainer 
      variants={navVariants}
      initial="hidden"
      animate="visible"
      style={{ 
        boxShadow: scrolled ? '0 5px 15px rgba(0, 0, 0, 0.1)' : 'none',
        padding: scrolled ? '0.5rem 2rem' : '1rem 2rem'
      }}
    >
      <Logo variants={itemVariants}>
        SOHAM<span>SAMADDAR</span>
      </Logo>
      
      <NavLinks>
        <NavLink href="#home" variants={itemVariants}>HOME</NavLink>
        <NavLink href="#about" variants={itemVariants}>ABOUT</NavLink>
        <NavLink href="#skills" variants={itemVariants}>SKILLS</NavLink>
        <NavLink href="#projects" variants={itemVariants}>PROJECTS</NavLink>
        <NavLink href="#achievements" variants={itemVariants}>ACHIEVEMENTS</NavLink>
        <NavLink href="#contact" variants={itemVariants}>CONTACT</NavLink>
        <AudioButton 
          onClick={toggleMute} 
          isMuted={isMuted}
          whileTap={{ scale: 0.95 }}
          variants={itemVariants}
        >
          {isMuted ? '🔇' : '🔊'}
        </AudioButton>
      </NavLinks>
      
      <MobileMenuButton 
        onClick={toggleMenu}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? '✕' : '☰'}
      </MobileMenuButton>
      
      <AnimatePresence>
        {isOpen && (
          <MobileMenu
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <MobileNavLink 
              href="#home" 
              onClick={toggleMenu}
              variants={itemVariants}
            >
              HOME
            </MobileNavLink>
            <MobileNavLink 
              href="#about" 
              onClick={toggleMenu}
              variants={itemVariants}
            >
              ABOUT
            </MobileNavLink>
            <MobileNavLink 
              href="#skills" 
              onClick={toggleMenu}
              variants={itemVariants}
            >
              SKILLS
            </MobileNavLink>
            <MobileNavLink 
              href="#projects" 
              onClick={toggleMenu}
              variants={itemVariants}
            >
              PROJECTS
            </MobileNavLink>
            <MobileNavLink 
              href="#achievements" 
              onClick={toggleMenu}
              variants={itemVariants}
            >
              ACHIEVEMENTS
            </MobileNavLink>
            <MobileNavLink 
              href="#contact" 
              onClick={toggleMenu}
              variants={itemVariants}
            >
              CONTACT
            </MobileNavLink>
            <AudioButton 
              onClick={toggleMute} 
              isMuted={isMuted}
              whileTap={{ scale: 0.95 }}
              variants={itemVariants}
            >
              {isMuted ? '🔇' : '🔊'}
            </AudioButton>
          </MobileMenu>
        )}
      </AnimatePresence>
    </NavbarContainer>
  );
};

export default Navbar;
