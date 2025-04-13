import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import HolographicProfile from './HolographicProfile';

// Styled Components
const AboutContainer = styled.section`
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 120px 0;
  background: linear-gradient(to bottom, var(--background-color), var(--background-alt-color));

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:
      radial-gradient(circle at 20% 30%, var(--background-glow) 0%, transparent 30%),
      radial-gradient(circle at 80% 70%, rgba(119, 0, 255, 0.1) 0%, transparent 30%);
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
  background: var(--gradient-1);
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
    background: var(--gradient-1);
    border-radius: 3px;
    box-shadow: var(--neon-shadow);
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto;
  color: var(--text-secondary-color);
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const AboutLeft = styled(motion.div)`
  position: relative;
`;

const HolographicContainer = styled(motion.div)`
  width: 100%;
  height: 500px;
  position: relative;
  border-radius: ${({ theme }) => theme.sizes.borderRadius.medium};
  overflow: hidden;
  background: linear-gradient(45deg, rgba(0, 240, 255, 0.05), rgba(119, 0, 255, 0.05));
  border: 2px solid var(--primary-color);
  box-shadow: var(--neon-shadow);
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1000px;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, var(--background-glow) 0%, transparent 70%);
    z-index: 1;
    pointer-events: none;
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, transparent, rgba(0, 240, 255, 0.1), transparent);
    z-index: 2;
    pointer-events: none;
    animation: rotate 10s linear infinite;
  }
`;

const AboutRight = styled(motion.div)`
  position: relative;
`;

const BioText = styled(motion.div)`
  margin-bottom: 2rem;

  p {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
    color: var(--text-color);
    line-height: 1.8;
  }

  strong {
    color: var(--primary-color);
    font-weight: 600;
  }
`;

const StatsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 3rem;
`;

const StatCard = styled(motion.div)`
  background: var(--card-color);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
  border-radius: ${({ theme }) => theme.sizes.borderRadius.medium};
  padding: 1.5rem;
  text-align: center;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: var(--gradient-1);
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, var(--background-glow) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover:after {
    opacity: 1;
  }
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
  text-shadow: var(--neon-shadow);
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: var(--text-secondary-color);
  text-transform: uppercase;
  letter-spacing: 1px;
`;

// Timeline Components
const TimelineContainer = styled(motion.div)`
  margin-top: 5rem;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background: var(--gradient-1);
    box-shadow: var(--neon-shadow);
    z-index: 1;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    &:before {
      left: 30px;
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
  align-items: center;
  margin-bottom: 4rem;
  position: relative;

  &:last-child {
    margin-bottom: 0;
  }

  &:nth-child(even) {
    flex-direction: row-reverse;

    ${props => props.theme.breakpoints.md} {
      flex-direction: row;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-content: flex-start;
    margin-left: 30px;
  }
`;

const TimelineDot = styled(motion.div)`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--primary-color);
  border: 3px solid var(--background-color);
  box-shadow: var(--neon-shadow);
  z-index: 2;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    left: 30px;
  }
`;

const TimelineContent = styled(motion.div)`
  width: 45%;
  background: var(--card-color);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
  border-radius: ${({ theme }) => theme.sizes.borderRadius.medium};
  padding: 2rem;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 20px;
    width: 0;
    height: 0;
    border-style: solid;
  }

  ${TimelineItem}:nth-child(odd) & {
    margin-right: 5%;

    &:before {
      right: -10px;
      border-width: 10px 0 10px 10px;
      border-color: transparent transparent transparent var(--border-color);
    }
  }

  ${TimelineItem}:nth-child(even) & {
    margin-left: 5%;

    &:before {
      left: -10px;
      border-width: 10px 10px 10px 0;
      border-color: transparent var(--border-color) transparent transparent;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: calc(100% - 60px);
    margin-left: 30px !important;
    margin-right: 0 !important;

    &:before {
      left: -10px !important;
      right: auto !important;
      border-width: 10px 10px 10px 0 !important;
      border-color: transparent var(--border-color) transparent transparent !important;
    }
  }
`;

const TimelineDate = styled.div`
  display: inline-block;
  background: var(--primary-color);
  color: var(--background-color);
  font-weight: 600;
  padding: 0.3rem 1rem;
  border-radius: ${({ theme }) => theme.sizes.borderRadius.pill};
  margin-bottom: 1rem;
  font-size: 0.9rem;
  box-shadow: var(--neon-shadow);
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

// Holographic Badge Component
const HolographicBadge = styled(motion.div)`
  position: absolute;
  top: -30px;
  right: -30px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: var(--gradient-1);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--neon-shadow);
  z-index: 2;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    animation: rotate 10s linear infinite;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 70px;
    height: 70px;
    top: -20px;
    right: -20px;
  }
`;

const BadgeIcon = styled.div`
  font-size: 2.5rem;
  color: var(--background-color);
  z-index: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.8rem;
  }
`;

// Scanline Effect
const Scanline = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: rgba(0, 240, 255, 0.3);
  opacity: 0.7;
  z-index: 3;
  animation: scanline 2s linear infinite;
  pointer-events: none;
`;

const NewAboutSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Journey timeline data
  const journeyData = [
    {
      id: 1,
      date: '2021 - Present',
      title: 'IT Student',
      description: 'Pursuing my degree in Information Technology, focusing on web development, AI, and software engineering.',
      icon: '🎓'
    },
    {
      id: 2,
      date: '2022',
      title: 'NASA SpaceApps Winner',
      description: 'Won the NASA SpaceApps Hackathon with an innovative 3D Orrery and NEO tracker project.',
      icon: '🚀'
    },
    {
      id: 3,
      date: '2022 - 2023',
      title: 'Freelance Developer',
      description: 'Worked with various clients to build modern web applications and interactive experiences.',
      icon: '💻'
    },
    {
      id: 4,
      date: '2023',
      title: 'Open Source Contributor',
      description: 'Actively contributed to several open-source projects, focusing on React, Three.js, and web animations.',
      icon: '🔗'
    },
    {
      id: 5,
      date: '2023 - Present',
      title: 'Full-Stack Developer',
      description: 'Building comprehensive web solutions with modern technologies like React, Node.js, and MongoDB.',
      icon: '⚡'
    }
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
      boxShadow: '0 0 20px rgba(0, 240, 255, 1)',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    }
  };

  const badgeVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20,
        delay: 0.3
      }
    },
    hover: {
      scale: 1.1,
      rotate: 10,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    }
  };

  const handleTimelineItemHover = (index) => {
    setActiveIndex(index);
  };

  return (
    <AboutContainer id="about">
      <Scanline />
      <ContentWrapper>
        <SectionHeader
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <SectionTitle variants={itemVariants}>About Me</SectionTitle>
          <SectionSubtitle variants={itemVariants}>
            Discover my journey, skills, and passion for creating futuristic digital experiences
          </SectionSubtitle>
        </SectionHeader>

        <AboutContent>
          <AboutLeft
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            <HolographicContainer variants={itemVariants}>
              <HolographicProfile />
            </HolographicContainer>
          </AboutLeft>

          <AboutRight
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            <BioText variants={itemVariants}>
              <p>
                I'm <strong>Soham Samaddar</strong>, a pre-final year IT student from Kolkata, passionate about futuristic web technologies, 3D interfaces, AI applications, and full-stack development.
              </p>
              <p>
                My journey in tech began with a fascination for creating immersive digital experiences. Today, I specialize in building cutting-edge web applications that push the boundaries of what's possible on the web.
              </p>
              <p>
                When I'm not coding, you'll find me participating in hackathons, exploring new technologies, or collaborating on open-source projects.
              </p>
            </BioText>

            <StatsGrid variants={itemVariants}>
              <StatCard
                whileHover={{ scale: 1.05, y: -10 }}
                whileTap={{ scale: 0.95 }}
              >
                <StatNumber>25+</StatNumber>
                <StatLabel>Projects</StatLabel>
              </StatCard>
              <StatCard
                whileHover={{ scale: 1.05, y: -10 }}
                whileTap={{ scale: 0.95 }}
              >
                <StatNumber>10+</StatNumber>
                <StatLabel>Hackathons</StatLabel>
              </StatCard>
              <StatCard
                whileHover={{ scale: 1.05, y: -10 }}
                whileTap={{ scale: 0.95 }}
              >
                <StatNumber>15+</StatNumber>
                <StatLabel>Clients</StatLabel>
              </StatCard>
            </StatsGrid>
          </AboutRight>
        </AboutContent>

        <TimelineContainer
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <TimelineTitle variants={itemVariants}>My Journey</TimelineTitle>

          {journeyData.map((item, index) => (
            <TimelineItem key={item.id}>
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
                <TimelineDate>{item.date}</TimelineDate>
                <TimelineItemTitle>{item.title}</TimelineItemTitle>
                <TimelineItemDescription>{item.description}</TimelineItemDescription>

                <AnimatePresence>
                  {activeIndex === index && (
                    <HolographicBadge
                      variants={badgeVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      whileHover="hover"
                    >
                      <BadgeIcon>{item.icon}</BadgeIcon>
                    </HolographicBadge>
                  )}
                </AnimatePresence>
              </TimelineContent>
            </TimelineItem>
          ))}
        </TimelineContainer>
      </ContentWrapper>
    </AboutContainer>
  );
};

export default NewAboutSection;
