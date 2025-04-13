import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const FooterContainer = styled.footer`
  background: linear-gradient(to top, rgba(5, 5, 16, 1), rgba(5, 5, 16, 0.8));
  padding: 3rem 0 1rem;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${({ theme }) => theme.colors.primary}, transparent);
  }
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const FooterTop = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 2rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const FooterSection = styled.div`
  flex: 1;
  max-width: 300px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 100%;
  }
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.primary};
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 50px;
    height: 2px;
    background: ${({ theme }) => theme.colors.primary};
  }
`;

const FooterText = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.8;
  line-height: 1.6;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled(motion.a)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.2rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
    transform: translateY(-3px);
  }
`;

const QuickLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const QuickLink = styled.li`
  margin-bottom: 0.5rem;
  
  a {
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.8;
    transition: all 0.3s ease;
    display: inline-block;
    
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
      transform: translateX(5px);
    }
  }
`;

const FooterBottom = styled.div`
  width: 100%;
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

const Copyright = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.6;
`;

const ControlPanel = styled.div`
  width: 100%;
  background: rgba(10, 10, 30, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const PanelSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const PanelButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  padding: 0.5rem 1rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: rgba(255, 0, 51, 0.1);
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const PanelIndicator = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ active, theme }) => active ? theme.colors.success : 'rgba(255, 255, 255, 0.2)'};
  box-shadow: ${({ active }) => active ? '0 0 10px rgba(0, 255, 102, 0.7)' : 'none'};
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <ControlPanel>
          <PanelSection>
            <PanelIndicator active={true} />
            <FooterText>System Status: Online</FooterText>
          </PanelSection>
          
          <PanelSection>
            <PanelButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <span>⬆️</span> Back to Top
            </PanelButton>
            <PanelButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <span>📋</span> Sitemap
            </PanelButton>
          </PanelSection>
        </ControlPanel>
        
        <FooterTop>
          <FooterSection>
            <FooterTitle>About</FooterTitle>
            <FooterText>
              Soham Samaddar is a pre-final year IT student from Kolkata, passionate about futuristic web tech, 3D, AI, and full-stack development.
            </FooterText>
            <SocialLinks>
              <SocialLink 
                href="https://github.com/SohamSamaddar" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                GH
              </SocialLink>
              <SocialLink 
                href="https://linkedin.com/in/soham-samaddar" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                IN
              </SocialLink>
              <SocialLink 
                href="#" 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                TW
              </SocialLink>
            </SocialLinks>
          </FooterSection>
          
          <FooterSection>
            <FooterTitle>Quick Links</FooterTitle>
            <QuickLinks>
              <QuickLink><a href="#home">Home</a></QuickLink>
              <QuickLink><a href="#about">About</a></QuickLink>
              <QuickLink><a href="#skills">Skills</a></QuickLink>
              <QuickLink><a href="#projects">Projects</a></QuickLink>
              <QuickLink><a href="#achievements">Achievements</a></QuickLink>
              <QuickLink><a href="#contact">Contact</a></QuickLink>
            </QuickLinks>
          </FooterSection>
          
          <FooterSection>
            <FooterTitle>Contact</FooterTitle>
            <FooterText>
              Feel free to reach out for collaborations or just a friendly chat.
            </FooterText>
            <FooterText>
              <strong>Email:</strong> soham.samaddar@example.com
            </FooterText>
            <FooterText>
              <strong>Location:</strong> Kolkata, India
            </FooterText>
          </FooterSection>
        </FooterTop>
        
        <FooterBottom>
          <Copyright>
            &copy; {new Date().getFullYear()} Soham Samaddar. All rights reserved. | Designed with 💻 and ❤️
          </Copyright>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
