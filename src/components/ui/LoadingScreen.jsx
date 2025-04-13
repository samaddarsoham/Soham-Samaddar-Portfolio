import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const LoadingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  padding: 0 2rem;
`;

const LogoContainer = styled(motion.div)`
  margin-bottom: 2rem;
  font-size: 3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  
  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  margin-bottom: 1rem;
  overflow: hidden;
  position: relative;
`;

const ProgressBar = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  border-radius: 2px;
`;

const LoadingText = styled(motion.div)`
  font-family: var(--font-mono);
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 2rem;
  width: 100%;
  height: 100px;
  overflow: hidden;
`;

const TerminalLine = styled(motion.div)`
  display: flex;
  margin-bottom: 0.5rem;
`;

const TerminalPrompt = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  margin-right: 0.5rem;
`;

const TerminalCommand = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
`;

const TerminalOutput = styled.span`
  color: rgba(255, 255, 255, 0.7);
`;

const LoadingScreen = ({ onFinishLoading }) => {
  const [progress, setProgress] = useState(0);
  const [terminalLines, setTerminalLines] = useState([]);

  const terminalCommands = [
    { command: 'initialize system', output: 'System initialization in progress...' },
    { command: 'load_modules()', output: 'Loading core modules: UI, 3D, Animation' },
    { command: 'connect_database()', output: 'Establishing secure connection...' },
    { command: 'render_components()', output: 'Rendering UI components...' },
    { command: 'optimize_performance()', output: 'Optimizing for maximum performance...' },
    { command: 'launch_application()', output: 'Application ready. Welcome, user!' },
  ];

  useEffect(() => {
    let currentProgress = 0;
    let currentLine = 0;
    
    const progressInterval = setInterval(() => {
      if (currentProgress < 100) {
        const increment = Math.random() * 10;
        currentProgress = Math.min(currentProgress + increment, 100);
        setProgress(currentProgress);
        
        // Add terminal lines based on progress
        if (currentProgress > currentLine * (100 / terminalCommands.length) && currentLine < terminalCommands.length) {
          setTerminalLines(prev => [
            ...prev, 
            terminalCommands[currentLine]
          ]);
          currentLine++;
        }
      } else {
        clearInterval(progressInterval);
        setTimeout(() => {
          onFinishLoading();
        }, 1000);
      }
    }, 400);
    
    return () => clearInterval(progressInterval);
  }, [onFinishLoading]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.3
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        when: 'afterChildren',
        staggerChildren: 0.1,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    },
    exit: { 
      y: -20, 
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  const terminalLineVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 30
      }
    }
  };

  return (
    <AnimatePresence>
      <LoadingContainer
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <LoadingContent>
          <LogoContainer
            variants={itemVariants}
          >
            SOHAM<span>SAMADDAR</span>
          </LogoContainer>
          
          <ProgressBarContainer>
            <ProgressBar
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          </ProgressBarContainer>
          
          <LoadingText variants={itemVariants}>
            {terminalLines.map((line, index) => (
              <TerminalLine
                key={index}
                variants={terminalLineVariants}
                initial="hidden"
                animate="visible"
              >
                <TerminalPrompt>{'>'}</TerminalPrompt>
                <TerminalCommand>{line.command}</TerminalCommand>
                {line.output && (
                  <>
                    <br />
                    <TerminalOutput>{line.output}</TerminalOutput>
                  </>
                )}
              </TerminalLine>
            ))}
          </LoadingText>
          
          <motion.div
            variants={itemVariants}
            style={{ textAlign: 'center' }}
          >
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.7)' }}
            >
              Loading... {Math.round(progress)}%
            </motion.p>
          </motion.div>
        </LoadingContent>
      </LoadingContainer>
    </AnimatePresence>
  );
};

export default LoadingScreen;
