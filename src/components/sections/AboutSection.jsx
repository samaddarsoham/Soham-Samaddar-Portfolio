import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const AboutContainer = styled.section`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 100px 0;
  background: linear-gradient(to bottom, #0a0a20, #050510);
`;

const AboutContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const AboutLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const AboutRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: transparent;
  border-radius: 20px;
  padding: 3rem;
  z-index: 5;
  position: relative;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;
  color: #ffffff;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.7);

  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 150px;
    height: 6px;
    background: #ff0033;
    box-shadow: 0 0 15px rgba(255, 0, 51, 0.8);
  }
`;

const AboutText = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
`;

const AboutHighlight = styled(motion.div)`
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
`;

const HighlightCard = styled(motion.div)`
  background: rgba(10, 10, 30, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 1.5rem;
  flex: 1;
  min-width: 150px;
  text-align: center;

  h3 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 700;
  }

  p {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.7);
  }
`;

const TimelineContainer = styled(motion.div)`
  position: relative;
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  z-index: 20;
`;

const TimelineItem = styled(motion.div)`
  position: relative;
  background: #000000;
  border: 3px solid #00aaff;
  border-radius: 15px;
  padding: 2rem;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow: hidden;
  box-shadow: 0 0 30px rgba(0, 170, 255, 0.5);
  margin-bottom: 2.5rem;

  &:nth-child(odd) {
    border-color: #ff0033;
    box-shadow: 0 0 30px rgba(255, 0, 51, 0.3);

    &:before {
      background: #ff0033;
      box-shadow: 0 0 20px rgba(255, 0, 51, 0.8);
    }
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, transparent, rgba(0, 170, 255, 0.05), transparent);
    z-index: -1;
  }

  &:after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(0, 170, 255, 0.1) 0%, transparent 70%);
    z-index: -2;
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  &:hover:after {
    opacity: 1;
  }
`;

const TimelineDateWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
`;

const TimelineYear = styled.div`
  font-size: 2.5rem;
  color: #ffffff;
  font-weight: 800;
  text-shadow: 0 0 20px rgba(0, 170, 255, 1);
  letter-spacing: 2px;
  line-height: 1;

  ${TimelineItem}:nth-child(odd) & {
    text-shadow: 0 0 20px rgba(255, 0, 51, 1);
  }
`;

const TimelineDuration = styled.div`
  font-size: 1.2rem;
  color: #ffffff;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  background: #00aaff;
  padding: 0.3rem 0.8rem;
  border-radius: 5px;
  margin-top: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 170, 255, 0.7);

  ${TimelineItem}:nth-child(odd) & {
    background: #ff0033;
    box-shadow: 0 0 10px rgba(255, 0, 51, 0.7);
  }
`;

const TimelineDate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: #00aaff;
    box-shadow: 0 0 15px #00aaff;
  }

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 50%;
    height: 1px;
    background: #00aaff;
    filter: blur(1px);
  }

  ${TimelineItem}:nth-child(odd) & {
    background: rgba(255, 0, 51, 0.2);
    border-color: #ff0033;
    text-shadow: 0 0 10px rgba(255, 0, 51, 0.7);

    &:before {
      background: #ff0033;
      box-shadow: 0 0 15px #ff0033;
    }
  }
`;

const TimelineIcon = styled.div`
  font-size: 3rem;
  color: #00aaff;
  text-shadow: 0 0 15px rgba(0, 170, 255, 1);
  background: rgba(0, 170, 255, 0.1);
  border: 2px solid #00aaff;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  box-shadow: 0 0 20px rgba(0, 170, 255, 0.5);

  ${TimelineItem}:nth-child(odd) & {
    color: #ff0033;
    text-shadow: 0 0 15px rgba(255, 0, 51, 1);
    background: rgba(255, 0, 51, 0.1);
    border-color: #ff0033;
    box-shadow: 0 0 20px rgba(255, 0, 51, 0.5);
  }
`;

const TimelineTitle = styled.h3`
  font-size: 2.2rem;
  margin-bottom: 1rem;
  color: #ffffff;
  font-weight: 800;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
  position: relative;
  display: inline-block;
  letter-spacing: 1px;
  border-bottom: 3px solid #00aaff;
  padding-bottom: 0.5rem;
  box-shadow: 0 5px 10px -5px rgba(0, 170, 255, 0.7);

  ${TimelineItem}:nth-child(odd) & {
    border-bottom: 3px solid #ff0033;
    box-shadow: 0 5px 10px -5px rgba(255, 0, 51, 0.7);
  }
`;

const TimelineDescription = styled.p`
  font-size: 1.4rem;
  color: #ffffff;
  line-height: 1.7;
  font-weight: 500;
  position: relative;
  z-index: 30;
  margin-top: 1.5rem;
  padding: 1.5rem;
  background: rgba(0, 170, 255, 0.1);
  border-radius: 10px;
  border-left: 4px solid #00aaff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);

  ${TimelineItem}:nth-child(odd) & {
    background: rgba(255, 0, 51, 0.1);
    border-left: 4px solid #ff0033;
  }
`;

const GlitchCounter = styled(motion.div)`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  position: relative;
  display: inline-block;

  &:after {
    content: attr(data-value);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: ${({ theme }) => theme.colors.secondary};
    clip-path: inset(0 0 0 0);
    transform: translateX(-2px);
    opacity: 0.5;
  }

  &:before {
    content: attr(data-value);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: ${({ theme }) => theme.colors.primary};
    clip-path: inset(0 0 0 0);
    transform: translateX(2px);
    opacity: 0.3;
  }
`;

const AboutSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const timelineRef = useRef(null);
  const counterRefs = useRef([]);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  useEffect(() => {
    // Timeline animation
    if (timelineRef.current) {
      gsap.from(timelineRef.current.children, {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 80%',
        }
      });
    }

    // Counter animation
    counterRefs.current.forEach((counter, index) => {
      if (!counter) return;

      const targetNumber = parseInt(counter.getAttribute('data-value'), 10);

      gsap.to(counter, {
        innerHTML: targetNumber,
        duration: 2,
        ease: 'power2.out',
        snap: { innerHTML: 1 },
        scrollTrigger: {
          trigger: counter,
          start: 'top 80%',
        },
        onUpdate: () => {
          counter.setAttribute('data-value', Math.floor(gsap.getProperty(counter, 'innerHTML')));
        }
      });
    });
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
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    }
  };

  const timelineItemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        when: 'beforeChildren',
        staggerChildren: 0.1
      }
    },
    hover: {
      scale: 1.02,
      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    }
  };

  const timelineContentVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20
      }
    }
  };

  const timelineDateVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -5 },
    visible: {
      opacity: 1,
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
      boxShadow: '0 0 30px rgba(0, 170, 255, 0.5)',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <AboutContainer id="about">
      <AboutContent>
        <AboutLeft>
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            <SectionTitle variants={itemVariants}>About Me</SectionTitle>
            <AboutText variants={itemVariants}>
              I'm Soham Samaddar, a pre-final year IT student from Kolkata, passionate about futuristic web technologies, 3D interfaces, AI applications, and full-stack development.
            </AboutText>
            <AboutText variants={itemVariants}>
              My journey in tech began with a fascination for creating immersive digital experiences. Today, I specialize in building cutting-edge web applications that push the boundaries of what's possible on the web.
            </AboutText>
            <AboutText variants={itemVariants}>
              When I'm not coding, you'll find me participating in hackathons, exploring new technologies, or collaborating on open-source projects.
            </AboutText>

            <AboutHighlight>
              <HighlightCard
                variants={cardVariants}
                whileHover="hover"
              >
                <GlitchCounter
                  ref={el => counterRefs.current[0] = el}
                  data-value="25"
                >
                  0
                </GlitchCounter>
                <p>Projects Completed</p>
              </HighlightCard>

              <HighlightCard
                variants={cardVariants}
                whileHover="hover"
              >
                <GlitchCounter
                  ref={el => counterRefs.current[1] = el}
                  data-value="10"
                >
                  0
                </GlitchCounter>
                <p>Hackathons</p>
              </HighlightCard>

              <HighlightCard
                variants={cardVariants}
                whileHover="hover"
              >
                <GlitchCounter
                  ref={el => counterRefs.current[2] = el}
                  data-value="15"
                >
                  0
                </GlitchCounter>
                <p>Satisfied Clients</p>
              </HighlightCard>
            </AboutHighlight>
          </motion.div>
        </AboutLeft>

        <AboutRight>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            <SectionTitle variants={itemVariants}>My Journey</SectionTitle>

            <TimelineContainer variants={itemVariants}>
              <div ref={timelineRef}>
                <TimelineItem
                  variants={timelineItemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                >
                  <TimelineDateWrapper>
                    <TimelineDate
                      variants={timelineDateVariants}
                      whileHover="hover"
                    >
                      <TimelineIcon>🎓</TimelineIcon>
                      <TimelineYear>2021</TimelineYear>
                      <TimelineDuration>Present</TimelineDuration>
                    </TimelineDate>
                  </TimelineDateWrapper>
                  <motion.div variants={timelineContentVariants}>
                    <TimelineTitle>IT Student</TimelineTitle>
                    <TimelineDescription>
                      Pursuing my degree in Information Technology, focusing on web development, AI, and software engineering.
                    </TimelineDescription>
                  </motion.div>
                </TimelineItem>

                <TimelineItem>
                  <TimelineDateWrapper>
                    <TimelineDate>
                      <TimelineIcon>🌌</TimelineIcon>
                      <TimelineYear>2022</TimelineYear>
                      <TimelineDuration>Oct</TimelineDuration>
                    </TimelineDate>
                  </TimelineDateWrapper>
                  <div>
                    <TimelineTitle>NASA SpaceApps Winner</TimelineTitle>
                    <TimelineDescription>
                      Won the NASA SpaceApps Hackathon with an innovative 3D Orrery and NEO tracker project.
                    </TimelineDescription>
                  </div>
                </TimelineItem>

                <TimelineItem>
                  <TimelineDateWrapper>
                    <TimelineDate>
                      <TimelineIcon>💻</TimelineIcon>
                      <TimelineYear>2022</TimelineYear>
                      <TimelineDuration>2022-2023</TimelineDuration>
                    </TimelineDate>
                  </TimelineDateWrapper>
                  <div>
                    <TimelineTitle>Freelance Developer</TimelineTitle>
                    <TimelineDescription>
                      Worked with various clients to build modern web applications and interactive experiences.
                    </TimelineDescription>
                  </div>
                </TimelineItem>

                <TimelineItem>
                  <TimelineDateWrapper>
                    <TimelineDate>
                      <TimelineIcon>🔗</TimelineIcon>
                      <TimelineYear>2023</TimelineYear>
                      <TimelineDuration>Jun</TimelineDuration>
                    </TimelineDate>
                  </TimelineDateWrapper>
                  <div>
                    <TimelineTitle>Open Source Contributor</TimelineTitle>
                    <TimelineDescription>
                      Actively contributed to several open-source projects, focusing on React, Three.js, and web animations.
                    </TimelineDescription>
                  </div>
                </TimelineItem>

                <TimelineItem>
                  <TimelineDateWrapper>
                    <TimelineDate>
                      <TimelineIcon>🚀</TimelineIcon>
                      <TimelineYear>2023</TimelineYear>
                      <TimelineDuration>Present</TimelineDuration>
                    </TimelineDate>
                  </TimelineDateWrapper>
                  <div>
                    <TimelineTitle>Full-Stack Developer</TimelineTitle>
                    <TimelineDescription>
                      Building comprehensive web solutions with modern technologies like React, Node.js, and MongoDB.
                    </TimelineDescription>
                  </div>
                </TimelineItem>
              </div>
            </TimelineContainer>
          </motion.div>
        </AboutRight>
      </AboutContent>
    </AboutContainer>
  );
};

export default AboutSection;
