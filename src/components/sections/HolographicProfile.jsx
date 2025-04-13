import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import profilePic from '../../assets/images/ppic.jpeg';

const ProfileContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 5;
`;

const HologramCircle = styled(motion.div)`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 240, 255, 0.2) 0%, transparent 70%);
  border: 2px solid var(--primary-color);
  box-shadow: 0 0 30px rgba(0, 240, 255, 0.5);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(
      transparent, 
      rgba(0, 240, 255, 0.1), 
      transparent, 
      rgba(0, 240, 255, 0.1), 
      transparent
    );
    animation: rotate 10s linear infinite;
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, transparent 30%, rgba(0, 0, 20, 0.8) 100%);
    z-index: 1;
  }
`;

const ProfileImage = styled.div`
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background-image: url(${profilePic});
  background-size: cover;
  background-position: center;
  position: relative;
  z-index: 2;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    /* Removing the blue gradient overlay */
    background: transparent;
    z-index: 3;
  }
`;

const ScanEffect = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: linear-gradient(90deg, transparent, var(--primary-color), transparent);
  z-index: 4;
  filter: blur(2px);
  opacity: 0.7;
`;

const HologramText = styled(motion.div)`
  margin-top: 2rem;
  text-align: center;
  position: relative;
`;

const Name = styled(motion.h3)`
  font-size: 2rem;
  color: var(--primary-color);
  text-shadow: 0 0 10px var(--primary-color);
  margin-bottom: 0.5rem;
  font-family: var(--font-main);
  letter-spacing: 2px;
`;

const Title = styled(motion.p)`
  font-size: 1.2rem;
  color: var(--text-color);
  text-shadow: 0 0 5px var(--text-color);
  font-family: var(--font-secondary);
  letter-spacing: 1px;
  opacity: 0.9;
`;

const StatusIndicator = styled(motion.div)`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  
  &:before {
    content: '';
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--success-color);
    margin-right: 0.5rem;
    box-shadow: 0 0 10px var(--success-color);
    animation: pulse 2s infinite ease-in-out;
  }
`;

const Status = styled.span`
  font-size: 0.9rem;
  color: var(--text-secondary-color);
  font-family: var(--font-mono);
  letter-spacing: 1px;
`;

const FloatingIcons = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
  pointer-events: none;
`;

const FloatingIcon = styled(motion.div)`
  position: absolute;
  font-size: 1.5rem;
  color: var(--primary-color);
  opacity: 0.7;
  text-shadow: 0 0 5px var(--primary-color);
`;

const HolographicProfile = () => {
  const scanRef = useRef(null);
  
  useEffect(() => {
    if (scanRef.current) {
      const animation = () => {
        scanRef.current.animate(
          [
            { transform: 'translateY(0)' },
            { transform: 'translateY(100%)' }
          ],
          {
            duration: 2000,
            iterations: Infinity
          }
        );
      };
      
      animation();
    }
  }, []);
  
  const icons = [
    { id: 1, icon: '⚛️', x: '10%', y: '20%', duration: 3 },
    { id: 2, icon: '🚀', x: '80%', y: '15%', duration: 4 },
    { id: 3, icon: '💻', x: '20%', y: '80%', duration: 5 },
    { id: 4, icon: '🔮', x: '70%', y: '70%', duration: 3.5 },
    { id: 5, icon: '🌐', x: '50%', y: '30%', duration: 4.5 }
  ];
  
  return (
    <ProfileContainer>
      <HologramCircle
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <ProfileImage />
        <ScanEffect ref={scanRef} />
      </HologramCircle>
      
      <HologramText>
        <Name
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          SOHAM SAMADDAR
        </Name>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          Futuristic Full-Stack Developer
        </Title>
        <StatusIndicator
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <Status>ONLINE</Status>
        </StatusIndicator>
      </HologramText>
      
      <FloatingIcons>
        {icons.map((item) => (
          <FloatingIcon
            key={item.id}
            style={{ top: item.y, left: item.x }}
            animate={{ y: ['-10px', '10px', '-10px'] }}
            transition={{ 
              duration: item.duration, 
              repeat: Infinity, 
              ease: 'easeInOut' 
            }}
          >
            {item.icon}
          </FloatingIcon>
        ))}
      </FloatingIcons>
    </ProfileContainer>
  );
};

export default HolographicProfile;
