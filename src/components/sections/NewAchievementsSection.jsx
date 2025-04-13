import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Styled Components
const AchievementsContainer = styled.section`
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 120px 0;
  background: linear-gradient(to bottom, var(--background-alt-color), var(--background-color));
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 30% 20%, rgba(255, 0, 85, 0.1) 0%, transparent 30%),
      radial-gradient(circle at 70% 80%, rgba(0, 240, 255, 0.1) 0%, transparent 30%);
    z-index: 0;
  }
`;

const ContentWrapper = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
`;

const SectionHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 5rem;
  position: relative;
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2.5rem, 8vw, 4rem);
  margin-bottom: 1.5rem;
  background: var(--gradient-2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 150px;
    height: 3px;
    background: var(--gradient-2);
    border-radius: 3px;
    box-shadow: var(--neon-pink-shadow);
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto;
  color: var(--text-secondary-color);
`;

// Futuristic Achievement Cards
const AchievementGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 5rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const AchievementCard = styled(motion.div)`
  position: relative;
  background: var(--card-color);
  backdrop-filter: blur(10px);
  border-radius: ${({ theme }) => theme.sizes.borderRadius.medium};
  padding: 2rem;
  overflow: hidden;
  height: 100%;
  z-index: 1;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, transparent, rgba(255, 0, 85, 0.05), transparent);
    z-index: -1;
  }
`;

const AchievementIcon = styled(motion.div)`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--gradient-2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  font-size: 2.5rem;
  box-shadow: var(--neon-pink-shadow);
  position: relative;
  z-index: 1;
  
  &:before {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    border-radius: 50%;
    background: var(--gradient-2);
    z-index: -1;
    opacity: 0.5;
    filter: blur(10px);
  }
`;

const AchievementTitle = styled(motion.h3)`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-color);
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 50px;
    height: 2px;
    background: var(--secondary-color);
    box-shadow: var(--neon-pink-shadow);
  }
`;

const AchievementDescription = styled(motion.p)`
  font-size: 1rem;
  color: var(--text-secondary-color);
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const AchievementMeta = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: auto;
`;

const AchievementDate = styled.div`
  font-size: 0.9rem;
  color: var(--secondary-color);
  font-family: var(--font-mono);
  letter-spacing: 1px;
  padding: 0.3rem 0.8rem;
  background: rgba(255, 0, 85, 0.1);
  border-radius: ${({ theme }) => theme.sizes.borderRadius.pill};
  border: 1px solid rgba(255, 0, 85, 0.3);
`;

const AchievementBadge = styled.div`
  font-size: 0.9rem;
  color: var(--text-color);
  font-family: var(--font-mono);
  letter-spacing: 1px;
  padding: 0.3rem 0.8rem;
  background: rgba(255, 0, 85, 0.2);
  border-radius: ${({ theme }) => theme.sizes.borderRadius.pill};
  border: 1px solid rgba(255, 0, 85, 0.3);
`;

// Futuristic Timeline
const TimelineContainer = styled(motion.div)`
  position: relative;
  margin-top: 5rem;
  padding: 3rem 0;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 100%;
    background: var(--gradient-2);
    border-radius: 2px;
    box-shadow: var(--neon-pink-shadow);
    z-index: 1;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    &:before {
      left: 20px;
    }
  }
`;

const TimelineTitle = styled(motion.h3)`
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2rem;
  color: var(--text-color);
  text-shadow: var(--text-shadow);
`;

const TimelineItem = styled(motion.div)`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 6rem;
  position: relative;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &:nth-child(even) {
    flex-direction: row-reverse;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      flex-direction: row;
    }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-content: flex-start;
    margin-left: 20px;
  }
`;

const TimelineDot = styled(motion.div)`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--secondary-color);
  border: 4px solid var(--background-color);
  box-shadow: var(--neon-pink-shadow);
  z-index: 2;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    left: 20px;
  }
`;

const TimelineContent = styled(motion.div)`
  width: 45%;
  background: var(--card-color);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 0, 85, 0.3);
  border-radius: ${({ theme }) => theme.sizes.borderRadius.medium};
  padding: 2rem;
  position: relative;
  box-shadow: var(--box-shadow);
  
  &:before {
    content: '';
    position: absolute;
    top: 10px;
    width: 0;
    height: 0;
    border-style: solid;
  }
  
  ${TimelineItem}:nth-child(odd) & {
    margin-right: 5%;
    
    &:before {
      right: -10px;
      border-width: 10px 0 10px 10px;
      border-color: transparent transparent transparent rgba(255, 0, 85, 0.3);
    }
  }
  
  ${TimelineItem}:nth-child(even) & {
    margin-left: 5%;
    
    &:before {
      left: -10px;
      border-width: 10px 10px 10px 0;
      border-color: transparent rgba(255, 0, 85, 0.3) transparent transparent;
    }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: calc(100% - 50px);
    margin-left: 30px !important;
    margin-right: 0 !important;
    
    &:before {
      left: -10px !important;
      right: auto !important;
      border-width: 10px 10px 10px 0 !important;
      border-color: transparent rgba(255, 0, 85, 0.3) transparent transparent !important;
    }
  }
`;

const TimelineDate = styled.div`
  display: inline-block;
  background: var(--secondary-color);
  color: var(--background-color);
  font-weight: 600;
  padding: 0.3rem 1rem;
  border-radius: ${({ theme }) => theme.sizes.borderRadius.pill};
  margin-bottom: 1rem;
  font-size: 0.9rem;
  box-shadow: var(--neon-pink-shadow);
`;

const TimelineItemTitle = styled.h4`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-color);
  text-shadow: var(--text-shadow);
`;

const TimelineItemDescription = styled.p`
  font-size: 1rem;
  color: var(--text-secondary-color);
  line-height: 1.6;
`;

// Floating Badges
const FloatingBadge = styled(motion.div)`
  position: absolute;
  background: var(--gradient-2);
  color: var(--text-color);
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.sizes.borderRadius.pill};
  font-size: 0.9rem;
  box-shadow: var(--neon-pink-shadow);
  z-index: 10;
  white-space: nowrap;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    border-radius: inherit;
    z-index: -1;
  }
`;

// Animated Particles
const ParticlesContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
`;

const Particle = styled(motion.div)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: ${props => props.color || 'var(--primary-color)'};
  box-shadow: 0 0 10px ${props => props.color || 'var(--primary-color)'};
  opacity: ${props => props.opacity || 0.7};
`;

// Animated Achievements Counter
const AchievementsCounter = styled(motion.div)`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 2rem;
  margin: 4rem 0;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: center;
  }
`;

const CounterItem = styled(motion.div)`
  text-align: center;
  position: relative;
  z-index: 1;
  
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 150px;
    height: 150px;
    background: radial-gradient(circle, rgba(255, 0, 85, 0.2) 0%, transparent 70%);
    border-radius: 50%;
    z-index: -1;
  }
`;

const CounterNumber = styled(motion.div)`
  font-size: 4rem;
  font-weight: 700;
  color: var(--text-color);
  text-shadow: var(--neon-pink-shadow);
  margin-bottom: 0.5rem;
  position: relative;
  display: inline-block;
  
  &:after {
    content: attr(data-symbol);
    position: absolute;
    top: 0;
    right: -20px;
    font-size: 2.5rem;
    color: var(--secondary-color);
  }
`;

const CounterLabel = styled.div`
  font-size: 1.2rem;
  color: var(--text-secondary-color);
  text-transform: uppercase;
  letter-spacing: 2px;
`;

// Animated Particles Component
const AnimatedParticles = () => {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 5 + 2,
    color: i % 2 === 0 ? 'var(--primary-color)' : 'var(--secondary-color)',
    opacity: Math.random() * 0.5 + 0.3,
    duration: Math.random() * 20 + 10
  }));
  
  return (
    <ParticlesContainer>
      {particles.map(particle => (
        <Particle
          key={particle.id}
          color={particle.color}
          opacity={particle.opacity}
          style={{ 
            top: `${particle.y}%`, 
            left: `${particle.x}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`
          }}
          animate={{
            y: ['-20px', '20px', '-20px'],
            x: ['-20px', '20px', '-20px'],
            opacity: [particle.opacity, particle.opacity * 0.5, particle.opacity]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}
    </ParticlesContainer>
  );
};

const NewAchievementsSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const [activeIndex, setActiveIndex] = useState(null);
  const [counters, setCounters] = useState({
    hackathons: 0,
    projects: 0,
    awards: 0,
    contributions: 0
  });
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
      
      // Animate counters
      const hackathonsInterval = setInterval(() => {
        setCounters(prev => ({
          ...prev,
          hackathons: prev.hackathons < 10 ? prev.hackathons + 1 : 10
        }));
      }, 200);
      
      const projectsInterval = setInterval(() => {
        setCounters(prev => ({
          ...prev,
          projects: prev.projects < 25 ? prev.projects + 1 : 25
        }));
      }, 80);
      
      const awardsInterval = setInterval(() => {
        setCounters(prev => ({
          ...prev,
          awards: prev.awards < 8 ? prev.awards + 1 : 8
        }));
      }, 250);
      
      const contributionsInterval = setInterval(() => {
        setCounters(prev => ({
          ...prev,
          contributions: prev.contributions < 15 ? prev.contributions + 1 : 15
        }));
      }, 130);
      
      return () => {
        clearInterval(hackathonsInterval);
        clearInterval(projectsInterval);
        clearInterval(awardsInterval);
        clearInterval(contributionsInterval);
      };
    }
  }, [controls, inView]);
  
  // Achievement data
  const achievements = [
    {
      id: 1,
      icon: '🏆',
      title: 'NASA SpaceApps Winner',
      description: 'Global winner in the NASA SpaceApps Challenge for creating an innovative 3D Orrery and NEO tracker.',
      date: 'October 2022',
      badge: 'Global Winner'
    },
    {
      id: 2,
      icon: '🚀',
      title: 'National Hackathon Champion',
      description: 'First place at the National Innovation Challenge with MEDISYNC, an AI-powered healthcare platform.',
      date: 'March 2023',
      badge: 'First Place'
    },
    {
      id: 3,
      icon: '💻',
      title: 'Open Source Recognition',
      description: 'Recognized for significant contributions to popular open-source projects in the React and Three.js ecosystems.',
      date: 'June 2023',
      badge: 'Top Contributor'
    }
  ];
  
  // Milestones data
  const milestones = [
    {
      id: 1,
      date: 'October 2022',
      title: 'NASA SpaceApps Challenge Winner',
      description: 'Developed a 3D interactive solar system model with Near Earth Object tracking capabilities. The project was selected as a global finalist among thousands of entries.'
    },
    {
      id: 2,
      date: 'March 2023',
      title: 'National Hackathon Champion',
      description: 'Led a team of four to develop MEDISYNC, an AI-powered healthcare platform that won first place at the National Innovation Challenge.'
    },
    {
      id: 3,
      date: 'June 2023',
      title: 'Open Source Contribution Recognition',
      description: 'Recognized for significant contributions to popular open-source projects in the React and Three.js ecosystems, with multiple pull requests merged into core libraries.'
    },
    {
      id: 4,
      date: 'September 2023',
      title: 'Tech Conference Speaker',
      description: 'Invited to speak at a regional tech conference about "The Future of Web Interfaces" where I demonstrated cutting-edge 3D and animation techniques for the web.'
    },
    {
      id: 5,
      date: 'December 2023',
      title: 'Innovation Award',
      description: 'Received the Young Innovator Award for developing CITIZEN\'S ADVOCATE, a unified government complaint portal that streamlines citizen-government interactions.'
    }
  ];
  
  // Floating badges data
  const floatingBadges = [
    { id: 1, text: 'NASA SpaceApps', x: '10%', y: '20%', delay: 0 },
    { id: 2, text: 'Global Winner', x: '80%', y: '15%', delay: 0.5 },
    { id: 3, text: 'Innovation Award', x: '20%', y: '80%', delay: 1 },
    { id: 4, text: 'Top Contributor', x: '70%', y: '70%', delay: 1.5 }
  ];
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.2,
        duration: 0.6
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20
      }
    }
  };
  
  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20
      }
    },
    hover: {
      y: -10,
      boxShadow: '0 20px 30px rgba(0, 0, 0, 0.2)',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    }
  };
  
  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20
      }
    },
    hover: {
      scale: 1.1,
      rotate: 15,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    }
  };
  
  const timelineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.3,
        duration: 0.6
      }
    }
  };
  
  const timelineItemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20
      }
    },
    hover: {
      scale: 1.03,
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    }
  };
  
  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    },
    hover: {
      scale: 1.5,
      boxShadow: '0 0 20px rgba(255, 0, 85, 1)',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    }
  };
  
  const badgeVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20
      }
    },
    floating: {
      y: ['-10px', '10px', '-10px'],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };
  
  const counterVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20
      }
    }
  };
  
  const handleTimelineItemHover = (index) => {
    setActiveIndex(index);
  };
  
  return (
    <AchievementsContainer id="achievements">
      <AnimatedParticles />
      
      <ContentWrapper>
        <SectionHeader
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <SectionTitle variants={itemVariants}>Achievements & Milestones</SectionTitle>
          <SectionSubtitle variants={itemVariants}>
            A showcase of my key accomplishments, awards, and professional journey
          </SectionSubtitle>
        </SectionHeader>
        
        {/* Floating Badges */}
        {floatingBadges.map(badge => (
          <FloatingBadge
            key={badge.id}
            style={{ top: badge.y, left: badge.x }}
            variants={badgeVariants}
            initial="hidden"
            animate={inView ? ["visible", "floating"] : "hidden"}
            transition={{ delay: badge.delay }}
          >
            {badge.text}
          </FloatingBadge>
        ))}
        
        {/* Achievements Counter */}
        <AchievementsCounter
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <CounterItem variants={counterVariants}>
            <CounterNumber data-symbol="+">
              {counters.hackathons}
            </CounterNumber>
            <CounterLabel>Hackathons</CounterLabel>
          </CounterItem>
          
          <CounterItem variants={counterVariants}>
            <CounterNumber data-symbol="+">
              {counters.projects}
            </CounterNumber>
            <CounterLabel>Projects</CounterLabel>
          </CounterItem>
          
          <CounterItem variants={counterVariants}>
            <CounterNumber data-symbol="+">
              {counters.awards}
            </CounterNumber>
            <CounterLabel>Awards</CounterLabel>
          </CounterItem>
          
          <CounterItem variants={counterVariants}>
            <CounterNumber data-symbol="+">
              {counters.contributions}
            </CounterNumber>
            <CounterLabel>Open Source</CounterLabel>
          </CounterItem>
        </AchievementsCounter>
        
        {/* Achievement Cards */}
        <AchievementGrid
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {achievements.map((achievement) => (
            <AchievementCard
              key={achievement.id}
              variants={cardVariants}
              whileHover="hover"
            >
              <AchievementIcon
                variants={iconVariants}
                whileHover="hover"
              >
                {achievement.icon}
              </AchievementIcon>
              <AchievementTitle>{achievement.title}</AchievementTitle>
              <AchievementDescription>{achievement.description}</AchievementDescription>
              <AchievementMeta>
                <AchievementDate>{achievement.date}</AchievementDate>
                <AchievementBadge>{achievement.badge}</AchievementBadge>
              </AchievementMeta>
            </AchievementCard>
          ))}
        </AchievementGrid>
        
        {/* Timeline */}
        <TimelineContainer
          variants={timelineVariants}
          initial="hidden"
          animate={controls}
        >
          <TimelineTitle variants={itemVariants}>My Journey</TimelineTitle>
          
          {milestones.map((milestone, index) => (
            <TimelineItem key={milestone.id}>
              <TimelineDot
                variants={dotVariants}
                whileHover="hover"
                onHoverStart={() => handleTimelineItemHover(index)}
                onHoverEnd={() => setActiveIndex(null)}
              />
              <TimelineContent
                variants={timelineItemVariants}
                whileHover="hover"
                onHoverStart={() => handleTimelineItemHover(index)}
                onHoverEnd={() => setActiveIndex(null)}
              >
                <TimelineDate>{milestone.date}</TimelineDate>
                <TimelineItemTitle>{milestone.title}</TimelineItemTitle>
                <TimelineItemDescription>{milestone.description}</TimelineItemDescription>
                
                <AnimatePresence>
                  {activeIndex === index && (
                    <FloatingBadge
                      style={{ top: '-20px', right: '-20px' }}
                      variants={badgeVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      Achievement Unlocked!
                    </FloatingBadge>
                  )}
                </AnimatePresence>
              </TimelineContent>
            </TimelineItem>
          ))}
        </TimelineContainer>
      </ContentWrapper>
    </AchievementsContainer>
  );
};

export default NewAchievementsSection;
