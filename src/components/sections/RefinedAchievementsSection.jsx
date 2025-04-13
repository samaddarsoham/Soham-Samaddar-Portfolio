import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';

// Styled Components
const AchievementsContainer = styled.section`
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 120px 0;
  background: linear-gradient(to bottom, var(--background-alt-color), var(--background-color));
`;

const GlowingOrbs = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  opacity: 0.7;
`;

const Orb = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.3;
  z-index: 0;
`;

const GridLines = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  z-index: 0;
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

// Achievements Showcase
const ShowcaseContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 6rem;
  margin-bottom: 6rem;
`;

const ShowcaseItem = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  &:nth-child(even) {
    direction: rtl;
    text-align: right;

    .showcase-content {
      direction: ltr;
      text-align: right;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: 2rem;

    &:nth-child(even) {
      direction: ltr;

      .showcase-content {
        text-align: left;
      }
    }
  }
`;

const ShowcaseImageContainer = styled(motion.div)`
  position: relative;
  height: 400px;
  border-radius: ${({ theme }) => theme.sizes.borderRadius.large};
  overflow: hidden;
  box-shadow: var(--box-shadow);

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, rgba(255, 0, 85, 0.2), rgba(0, 240, 255, 0.2));
    z-index: 1;
    opacity: 0.7;
  }

  &:after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: var(--gradient-2);
    border-radius: inherit;
    z-index: -1;
  }
`;

const ShowcaseImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${ShowcaseImageContainer}:hover & {
    transform: scale(1.05);
  }
`;

const ShowcaseContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  &.showcase-content {
    /* This class is used for RTL support */
  }
`;

const ShowcaseBadge = styled(motion.div)`
  display: inline-block;
  background: var(--gradient-2);
  color: var(--text-color);
  font-weight: 600;
  padding: 0.5rem 1.5rem;
  border-radius: ${({ theme }) => theme.sizes.borderRadius.pill};
  font-size: 0.9rem;
  box-shadow: var(--neon-pink-shadow);
  margin-bottom: 0.5rem;
`;

const ShowcaseTitle = styled(motion.h3)`
  font-size: 2.5rem;
  color: var(--text-color);
  text-shadow: var(--text-shadow);
  margin-bottom: 1rem;
`;

const ShowcaseDescription = styled(motion.p)`
  font-size: 1.1rem;
  color: var(--text-secondary-color);
  line-height: 1.8;
  margin-bottom: 1.5rem;
`;

const ShowcaseDetails = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: 1rem;
`;

const ShowcaseDetail = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .icon {
    font-size: 1.2rem;
    color: var(--secondary-color);
  }

  .text {
    font-size: 1rem;
    color: var(--text-secondary-color);
  }
`;

// Stats Grid
const StatsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin: 5rem 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled(motion.div)`
  background: var(--card-color);
  backdrop-filter: blur(10px);
  border-radius: ${({ theme }) => theme.sizes.borderRadius.medium};
  padding: 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: var(--box-shadow);

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: var(--gradient-2);
  }

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background: linear-gradient(to top, rgba(255, 0, 85, 0.05), transparent);
    z-index: -1;
  }
`;

const StatIcon = styled(motion.div)`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: var(--secondary-color);
  text-shadow: var(--neon-pink-shadow);
`;

const StatNumber = styled(motion.div)`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text-color);
  text-shadow: var(--text-shadow);
  font-family: var(--font-main);
`;

const StatLabel = styled(motion.div)`
  font-size: 1.1rem;
  color: var(--text-secondary-color);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: var(--font-secondary);
`;

// Timeline
const TimelineContainer = styled(motion.div)`
  position: relative;
  margin-top: 6rem;
  padding: 3rem 0;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background: var(--gradient-2);
    border-radius: 1px;
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
  margin-bottom: 4rem;
  font-size: 2.5rem;
  color: var(--text-color);
  text-shadow: var(--text-shadow);

  span {
    background: var(--gradient-2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
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
    margin-left: 30px;
  }
`;

const TimelineDot = styled(motion.div)`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--secondary-color);
  border: 3px solid var(--background-color);
  box-shadow: var(--neon-pink-shadow);
  z-index: 2;
  position: absolute;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    left: 30px;
  }
`;

const TimelineContent = styled(motion.div)`
  width: 45%;
  background: var(--card-color);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 0, 85, 0.2);
  border-radius: ${({ theme }) => theme.sizes.borderRadius.medium};
  padding: 2rem;
  position: relative;
  box-shadow: var(--box-shadow);

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
      border-color: transparent transparent transparent rgba(255, 0, 85, 0.2);
    }
  }

  ${TimelineItem}:nth-child(even) & {
    margin-left: 5%;

    &:before {
      left: -10px;
      border-width: 10px 10px 10px 0;
      border-color: transparent rgba(255, 0, 85, 0.2) transparent transparent;
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
      border-color: transparent rgba(255, 0, 85, 0.2) transparent transparent !important;
    }
  }
`;

const TimelineDate = styled(motion.div)`
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

const TimelineItemTitle = styled(motion.h4)`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-color);
  text-shadow: var(--text-shadow);
`;

const TimelineItemDescription = styled(motion.p)`
  font-size: 1rem;
  color: var(--text-secondary-color);
  line-height: 1.6;
`;

const RefinedAchievementsSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [counters, setCounters] = useState({
    hackathons: 0,
    projects: 0,
    awards: 0,
    contributions: 0
  });

  const orbsRef = useRef(null);

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

  useEffect(() => {
    // Create glowing orbs
    if (orbsRef.current) {
      const orbs = [
        { color: 'rgba(255, 0, 85, 0.3)', size: '300px', x: '20%', y: '20%' },
        { color: 'rgba(0, 240, 255, 0.3)', size: '400px', x: '70%', y: '60%' },
        { color: 'rgba(119, 0, 255, 0.3)', size: '350px', x: '80%', y: '10%' }
      ];

      orbs.forEach(orb => {
        const orbElement = document.createElement('div');
        orbElement.style.width = orb.size;
        orbElement.style.height = orb.size;
        orbElement.style.background = orb.color;
        orbElement.style.left = orb.x;
        orbElement.style.top = orb.y;
        orbElement.className = 'orb';

        orbsRef.current.appendChild(orbElement);

        gsap.to(orbElement, {
          x: 'random(-100, 100)',
          y: 'random(-100, 100)',
          duration: 'random(20, 40)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      });
    }
  }, []);

  // Showcase data
  const showcaseData = [
    {
      id: 1,
      title: 'NASA International SpaceApps Challenge',
      description: 'Led a team that qualified in the Top 9% Globally in the world\'s largest hackathon. Our project was selected as a Regional Winner and Global Nominee among thousands of entries.',
      badge: 'Global Nominee',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80',
      details: [
        { icon: '🗓️', text: '2024' },
        { icon: '🌎', text: 'Top 9% Globally' },
        { icon: '👥', text: 'Team Lead' }
      ]
    },
    {
      id: 2,
      title: 'VyomDrishti - Drone Search & Rescue',
      description: 'Developed an innovative drone-based project for locating missing persons using advanced face detection technology. The system helps search teams efficiently scan large areas and identify lost individuals.',
      badge: 'Innovation',
      image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      details: [
        { icon: '🤖', text: 'AI Face Detection' },
        { icon: '🚁', text: 'Drone Technology' },
        { icon: '🔍', text: 'Search & Rescue' }
      ]
    },
    {
      id: 3,
      title: 'College Placement Management System',
      description: 'Designed and developed the entire placement website for my college, streamlining the complete placement process. The system manages student profiles, company registrations, interview scheduling, and result tracking.',
      badge: 'Full Stack',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      details: [
        { icon: '🎓', text: 'College Project' },
        { icon: '💼', text: 'Placement System' },
        { icon: '🖥️', text: 'Full Stack Development' }
      ]
    },
    {
      id: 4,
      title: 'ADS Interior Works',
      description: 'Created a sophisticated website for an interior design company featuring interactive 3D room visualizations. Users can customize materials, colors, and furniture arrangements in real-time.',
      badge: '3D Interactive',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      details: [
        { icon: '🏠', text: 'Interior Design' },
        { icon: '🎨', text: '3D Visualization' },
        { icon: '⚛️', text: 'React & Three.js' }
      ]
    }
  ];

  // Stats data
  const statsData = [
    { id: 1, icon: '🏆', number: 10, label: 'Hackathons' },
    { id: 2, icon: '💻', number: 25, label: 'Projects' },
    { id: 3, icon: '🎬', number: 25, label: 'Film Awards' },
    { id: 4, icon: '🎸', number: 5, label: 'Instruments' }
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
    hidden: { y: 30, opacity: 0 },
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

  const showcaseVariants = {
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

  const showcaseItemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20
      }
    }
  };

  const imageVariants = {
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

  const contentVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        when: 'beforeChildren',
        staggerChildren: 0.1
      }
    }
  };

  const contentItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20
      }
    }
  };

  const statCardVariants = {
    hidden: { opacity: 0, y: 30 },
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
      y: -10,
      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
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
    hidden: { opacity: 0, y: 30 },
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
      scale: 1.02,
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
    }
  };

  return (
    <AchievementsContainer id="achievements">
      <GlowingOrbs ref={orbsRef} />
      <GridLines />

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

        {/* Stats Grid */}
        <StatsGrid
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {statsData.map((stat) => (
            <StatCard
              key={stat.id}
              variants={statCardVariants}
              whileHover="hover"
            >
              <StatIcon>{stat.icon}</StatIcon>
              <StatNumber>
                {stat.id === 1 ? counters.hackathons :
                 stat.id === 2 ? counters.projects :
                 stat.id === 3 ? counters.awards :
                 counters.contributions}+
              </StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsGrid>

        {/* Showcase */}
        <ShowcaseContainer
          variants={showcaseVariants}
          initial="hidden"
          animate={controls}
        >
          {showcaseData.map((item, index) => (
            <ShowcaseItem
              key={item.id}
              variants={showcaseItemVariants}
            >
              <ShowcaseImageContainer
                variants={imageVariants}
              >
                <ShowcaseImage src={item.image} alt={item.title} />
              </ShowcaseImageContainer>

              <ShowcaseContent
                className="showcase-content"
                variants={contentVariants}
              >
                <ShowcaseBadge variants={contentItemVariants}>
                  {item.badge}
                </ShowcaseBadge>
                <ShowcaseTitle variants={contentItemVariants}>
                  {item.title}
                </ShowcaseTitle>
                <ShowcaseDescription variants={contentItemVariants}>
                  {item.description}
                </ShowcaseDescription>
                <ShowcaseDetails>
                  {item.details.map((detail, i) => (
                    <ShowcaseDetail
                      key={i}
                      variants={contentItemVariants}
                    >
                      <span className="icon">{detail.icon}</span>
                      <span className="text">{detail.text}</span>
                    </ShowcaseDetail>
                  ))}
                </ShowcaseDetails>
              </ShowcaseContent>
            </ShowcaseItem>
          ))}
        </ShowcaseContainer>

        {/* Additional information about Soham */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          style={{ marginTop: '6rem', textAlign: 'center' }}
        >
          <motion.h3
            variants={itemVariants}
            style={{
              fontSize: '2rem',
              marginBottom: '2rem',
              background: 'var(--gradient-2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              display: 'inline-block'
            }}
          >
            About Me
          </motion.h3>

          <motion.div
            variants={itemVariants}
            style={{
              maxWidth: '800px',
              margin: '0 auto',
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: 'var(--text-secondary-color)'
            }}
          >
            <p style={{ marginBottom: '1.5rem' }}>
              Currently pursuing my B.Tech in Information Technology from Netaji Subhash Engineering College, Kolkata.
              I serve as the Vice Chairman of IEEE CS Society of NSEC Student Chapter 1 and am an active member of the WEB TEAM
              at NooBuild Community, managing a community of 2000+ coding enthusiasts focused on technology, hackathons, and competitive coding.
            </p>

            <p style={{ marginBottom: '1.5rem' }}>
              Beyond technology, I'm a multi-instrumentalist and singer with my own Progressive Rock Band - HOURGLASS.
              I'm also a cricketer and fast bowler who has played for the Cricket Association of Bengal and now represent my college in University Cups.
            </p>

            <p>
              As a filmmaker and music composer, I've created more than 5 short films that have won 25+ awards nationally and internationally,
              including the prestigious Dada Saheb Phalke Award.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            style={{
              marginTop: '2rem',
              fontSize: '1rem',
              color: 'var(--primary-color)'
            }}
          >
            <a href="mailto:samaddarsoham@gmail.com" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--primary-color)',
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              border: '1px solid var(--primary-color)',
              borderRadius: '5px',
              transition: 'all 0.3s ease'
            }}>
              <span style={{ fontSize: '1.2rem' }}>✉️</span> samaddarsoham@gmail.com
            </a>
          </motion.div>
        </motion.div>
      </ContentWrapper>
    </AchievementsContainer>
  );
};

export default RefinedAchievementsSection;
