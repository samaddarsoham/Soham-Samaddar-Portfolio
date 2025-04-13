import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const AchievementsContainer = styled.section`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 100px 0;
  background: linear-gradient(to bottom, #050510, #0a0a20);
`;

const AchievementsContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-align: center;
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100px;
    height: 4px;
    background: ${({ theme }) => theme.colors.primary};
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  margin-bottom: 3rem;
  text-align: center;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  color: rgba(255, 255, 255, 0.8);
`;

const TimelineContainer = styled.div`
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 0;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      left: 30px;
    }
  }
`;

const TimelineItem = styled(motion.div)`
  display: flex;
  justify-content: flex-end;
  padding-right: 30px;
  position: relative;
  margin-bottom: 100px;
  width: 50%;
  
  &:nth-child(even) {
    align-self: flex-end;
    justify-content: flex-start;
    padding-left: 30px;
    padding-right: 0;
    left: 50%;
    
    .timeline-content {
      align-items: flex-start;
      text-align: left;
      
      &:before {
        left: -15px;
        right: auto;
        border-width: 10px 15px 10px 0;
        border-color: transparent rgba(10, 10, 30, 0.5) transparent transparent;
      }
    }
    
    .timeline-dot {
      left: -8px;
      right: auto;
    }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
    padding-left: 70px;
    padding-right: 0;
    left: 0;
    
    &:nth-child(even) {
      left: 0;
      padding-left: 70px;
      
      .timeline-content {
        align-items: flex-start;
        text-align: left;
        
        &:before {
          left: -15px;
          right: auto;
          border-width: 10px 15px 10px 0;
          border-color: transparent rgba(10, 10, 30, 0.5) transparent transparent;
        }
      }
      
      .timeline-dot {
        left: 26px;
        right: auto;
      }
    }
    
    .timeline-dot {
      left: 26px;
    }
  }
`;

const TimelineDot = styled.div`
  position: absolute;
  right: -8px;
  top: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  border: 3px solid ${({ theme }) => theme.colors.background};
  z-index: 1;
`;

const TimelineContent = styled(motion.div)`
  background: rgba(10, 10, 30, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
  position: relative;
  max-width: 500px;
  
  &:before {
    content: '';
    position: absolute;
    right: -15px;
    top: 10px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 10px 0 10px 15px;
    border-color: transparent transparent transparent rgba(10, 10, 30, 0.5);
  }
`;

const TimelineDate = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const TimelineTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const TimelineDescription = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
`;

const TimelineBadge = styled.div`
  background: rgba(255, 0, 51, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-top: 1rem;
  display: inline-block;
`;

const AchievementCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
`;

const AchievementCard = styled(motion.div)`
  background: rgba(10, 10, 30, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const AchievementIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 2px;
    background: ${({ theme }) => theme.colors.primary};
  }
`;

const AchievementTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const AchievementDescription = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
`;

const AchievementsSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const timelineRef = useRef(null);
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  useEffect(() => {
    // Timeline animation
    if (timelineRef.current) {
      const timelineItems = timelineRef.current.querySelectorAll('.timeline-item');
      
      gsap.from(timelineItems, {
        opacity: 0,
        y: 100,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 80%',
        }
      });
    }
  }, []);
  
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
  
  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
      borderColor: 'rgba(255, 0, 51, 0.3)',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <AchievementsContainer id="achievements">
      <AchievementsContent>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <SectionTitle variants={itemVariants}>Achievements & Milestones</SectionTitle>
          <SectionSubtitle variants={itemVariants}>
            A chronological journey through my key achievements, awards, and professional milestones.
          </SectionSubtitle>
          
          <TimelineContainer ref={timelineRef}>
            <TimelineItem className="timeline-item">
              <TimelineDot />
              <TimelineContent>
                <TimelineDate>October 2022</TimelineDate>
                <TimelineTitle>NASA SpaceApps Challenge Winner</TimelineTitle>
                <TimelineDescription>
                  Developed a 3D interactive solar system model with Near Earth Object tracking capabilities. The project was selected as a global finalist among thousands of entries.
                </TimelineDescription>
                <TimelineBadge>Global Winner</TimelineBadge>
              </TimelineContent>
            </TimelineItem>
            
            <TimelineItem className="timeline-item">
              <TimelineDot />
              <TimelineContent>
                <TimelineDate>March 2023</TimelineDate>
                <TimelineTitle>National Hackathon Champion</TimelineTitle>
                <TimelineDescription>
                  Led a team of four to develop MEDISYNC, an AI-powered healthcare platform that won first place at the National Innovation Challenge.
                </TimelineDescription>
                <TimelineBadge>First Place</TimelineBadge>
              </TimelineContent>
            </TimelineItem>
            
            <TimelineItem className="timeline-item">
              <TimelineDot />
              <TimelineContent>
                <TimelineDate>June 2023</TimelineDate>
                <TimelineTitle>Open Source Contribution Recognition</TimelineTitle>
                <TimelineDescription>
                  Recognized for significant contributions to popular open-source projects in the React and Three.js ecosystems, with multiple pull requests merged into core libraries.
                </TimelineDescription>
                <TimelineBadge>Top Contributor</TimelineBadge>
              </TimelineContent>
            </TimelineItem>
            
            <TimelineItem className="timeline-item">
              <TimelineDot />
              <TimelineContent>
                <TimelineDate>September 2023</TimelineDate>
                <TimelineTitle>Tech Conference Speaker</TimelineTitle>
                <TimelineDescription>
                  Invited to speak at a regional tech conference about "The Future of Web Interfaces" where I demonstrated cutting-edge 3D and animation techniques for the web.
                </TimelineDescription>
                <TimelineBadge>Featured Speaker</TimelineBadge>
              </TimelineContent>
            </TimelineItem>
            
            <TimelineItem className="timeline-item">
              <TimelineDot />
              <TimelineContent>
                <TimelineDate>December 2023</TimelineDate>
                <TimelineTitle>Innovation Award</TimelineTitle>
                <TimelineDescription>
                  Received the Young Innovator Award for developing CITIZEN'S ADVOCATE, a unified government complaint portal that streamlines citizen-government interactions.
                </TimelineDescription>
                <TimelineBadge>Innovation Award</TimelineBadge>
              </TimelineContent>
            </TimelineItem>
          </TimelineContainer>
          
          <AchievementCards>
            <AchievementCard
              variants={cardVariants}
              whileHover="hover"
            >
              <AchievementIcon>🏆</AchievementIcon>
              <AchievementTitle>10+ Hackathons</AchievementTitle>
              <AchievementDescription>
                Participated in over 10 hackathons, winning top prizes in 5 of them with innovative solutions to real-world problems.
              </AchievementDescription>
            </AchievementCard>
            
            <AchievementCard
              variants={cardVariants}
              whileHover="hover"
            >
              <AchievementIcon>🚀</AchievementIcon>
              <AchievementTitle>NASA Collaboration</AchievementTitle>
              <AchievementDescription>
                Worked with NASA data and APIs to create educational tools that help visualize space phenomena and track celestial objects.
              </AchievementDescription>
            </AchievementCard>
            
            <AchievementCard
              variants={cardVariants}
              whileHover="hover"
            >
              <AchievementIcon>📝</AchievementIcon>
              <AchievementTitle>Published Research</AchievementTitle>
              <AchievementDescription>
                Co-authored a research paper on "Immersive Web Interfaces for Scientific Visualization" published in a peer-reviewed journal.
              </AchievementDescription>
            </AchievementCard>
          </AchievementCards>
        </motion.div>
      </AchievementsContent>
    </AchievementsContainer>
  );
};

export default AchievementsSection;
