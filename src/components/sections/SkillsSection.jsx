import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const SkillsContainer = styled.section`
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

const SkillsContent = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1600px; // Increased from 1200px
  margin: 0 auto;
  padding: 0 1rem; // Reduced padding from 2rem
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

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); // Adjusted to match projects section
  gap: 1.5rem; // Matched gap with projects section
  margin-bottom: 4rem;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const SkillCategory = styled(motion.div)`
  background: rgba(10, 10, 30, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 2rem;
  transition: all 0.3s ease;
  height: 100%;
  width: 100%; // Ensure cards take full width of their grid cell

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const CategoryTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
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

const SkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const SkillTag = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: rgba(255, 0, 51, 0.1);
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const SkillIcon = styled.span`
  font-size: 1.2rem;
`;

const ThreeDContainer = styled.div`
  width: 100%;
  height: 400px;
  margin-top: 4rem;
  border-radius: 15px;
  overflow: hidden;
  background: rgba(10, 10, 30, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
  max-width: 1600px; // Added to match content width
  margin-left: auto;
  margin-right: auto;
`;

// 3D Skill Sphere component
const SkillSphere = () => {
  const skills = [
    'React', 'Node.js', 'JavaScript', 'HTML', 'CSS',
    'Three.js', 'GSAP', 'MongoDB', 'Express', 'Framer Motion',
    'Python', 'Java', 'C++', 'Git', 'Figma'
  ];

  return (
    <group>
      {skills.map((skill, i) => {
        const phi = Math.acos(-1 + (2 * i) / skills.length);
        const theta = Math.sqrt(skills.length * Math.PI) * phi;
        const radius = 5;

        return (
          <group
            key={skill}
            position={[
              radius * Math.cos(theta) * Math.sin(phi),
              radius * Math.sin(theta) * Math.sin(phi),
              radius * Math.cos(phi)
            ]}
            rotation={[0, 0, 0]}
          >
            <Text
              color={i % 2 === 0 ? '#ff0033' : '#00aaff'}
              fontSize={0.5}
              maxWidth={2}
              lineHeight={1}
              letterSpacing={0.02}
              textAlign="center"
              anchorX="center"
              anchorY="middle"
            >
              {skill}
            </Text>
          </group>
        );
      })}
    </group>
  );
};

const SkillsSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const sphereRef = useRef(null);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  useEffect(() => {
    // Rotate the skill sphere
    if (sphereRef.current) {
      const animation = gsap.to(sphereRef.current.rotation, {
        y: Math.PI * 2,
        duration: 40,
        repeat: -1,
        ease: 'none'
      });

      return () => {
        if (animation) {
          animation.kill();
        }
      };
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.1,
        duration: 0.6
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
        stiffness: 100,
        damping: 20
      }
    }
  };

  const tagVariants = {
    hidden: { scale: 0.8, opacity: 0 },
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
      scale: 1.1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <SkillsContainer id="skills">
      <SkillsContent>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <SectionTitle variants={itemVariants}>My Skills</SectionTitle>
          <SectionSubtitle variants={itemVariants}>
            A comprehensive collection of technologies and tools I've mastered throughout my journey as a full-stack developer.
          </SectionSubtitle>

          <SkillsGrid>
            <SkillCategory variants={itemVariants}>
              <CategoryTitle>Frontend</CategoryTitle>
              <SkillsList>
                <SkillTag variants={tagVariants} whileHover="hover">
                  <SkillIcon>🌐</SkillIcon> HTML
                </SkillTag>
                <SkillTag variants={tagVariants} whileHover="hover">
                  <SkillIcon>🎨</SkillIcon> CSS
                </SkillTag>
                <SkillTag variants={tagVariants} whileHover="hover">
                  <SkillIcon>💅</SkillIcon> Styled Components
                </SkillTag>
                <SkillTag variants={tagVariants} whileHover="hover">
                  <SkillIcon>🧩</SkillIcon> JavaScript
                </SkillTag>
                <SkillTag variants={tagVariants} whileHover="hover">
                  <SkillIcon>⚛️</SkillIcon> React
                </SkillTag>
                <SkillTag variants={tagVariants} whileHover="hover">
                  <SkillIcon>🔄</SkillIcon> GSAP
                </SkillTag>
                <SkillTag variants={tagVariants} whileHover="hover">
                  <SkillIcon>🎭</SkillIcon> Framer Motion
                </SkillTag>
                <SkillTag variants={tagVariants} whileHover="hover">
                  <SkillIcon>🔺</SkillIcon> Three.js
                </SkillTag>
              </SkillsList>
            </SkillCategory>

            <SkillCategory variants={itemVariants}>
              <CategoryTitle>Backend</CategoryTitle>
              <SkillsList>
                <SkillTag variants={tagVariants} whileHover="hover">
                  <SkillIcon>🟢</SkillIcon> Node.js
                </SkillTag>
                <SkillTag variants={tagVariants} whileHover="hover">
                  <SkillIcon>🚂</SkillIcon> Express
                </SkillTag>
                <SkillTag variants={tagVariants} whileHover="hover">
                  <SkillIcon>🍃</SkillIcon> MongoDB
                </SkillTag>
                <SkillTag variants={tagVariants} whileHover="hover">
                  <SkillIcon>🔄</SkillIcon> REST APIs
                </SkillTag>
                <SkillTag variants={tagVariants} whileHover="hover">
                  <SkillIcon>🔐</SkillIcon> Authentication
                </SkillTag>
                <SkillTag variants={tagVariants} whileHover="hover">
                  <SkillIcon>🔌</SkillIcon> WebSockets
                </SkillTag>
              </SkillsList>
            </SkillCategory>

            <SkillCategory variants={itemVariants}>
              <CategoryTitle>Languages</CategoryTitle>
              <SkillsList>
                <SkillTag variants={tagVariants} whileHover="hover">
                  <SkillIcon>🧩</SkillIcon> JavaScript
                </SkillTag>
                <SkillTag variants={tagVariants} whileHover="hover">
                  <SkillIcon>🐍</SkillIcon> Python
                </SkillTag>
                <SkillTag variants={tagVariants} whileHover="hover">
                  <SkillIcon>☕</SkillIcon> Java
                </SkillTag>
                <SkillTag variants={tagVariants} whileHover="hover">
                  <SkillIcon>⚡</SkillIcon> C
                </SkillTag>
                <SkillTag variants={tagVariants} whileHover="hover">
                  <SkillIcon>⚡</SkillIcon> C++
                </SkillTag>
                <SkillTag variants={tagVariants} whileHover="hover">
                  <SkillIcon>🦀</SkillIcon> Rust
                </SkillTag>
              </SkillsList>
            </SkillCategory>

            <SkillCategory variants={itemVariants}>
              <CategoryTitle>Tools</CategoryTitle>
              <SkillsList>
                <SkillTag variants={tagVariants} whileHover="hover">
                  <SkillIcon>🐙</SkillIcon> Git
                </SkillTag>
                <SkillTag variants={tagVariants} whileHover="hover">
                  <SkillIcon>⚡</SkillIcon> Vite
                </SkillTag>
                <SkillTag variants={tagVariants} whileHover="hover">
                  <SkillIcon>🎨</SkillIcon> Figma
                </SkillTag>
                <SkillTag variants={tagVariants} whileHover="hover">
                  <SkillIcon>💻</SkillIcon> VS Code
                </SkillTag>
                <SkillTag variants={tagVariants} whileHover="hover">
                  <SkillIcon>🐳</SkillIcon> Docker
                </SkillTag>
                <SkillTag variants={tagVariants} whileHover="hover">
                  <SkillIcon>🔄</SkillIcon> CI/CD
                </SkillTag>
              </SkillsList>
            </SkillCategory>
          </SkillsGrid>

          <ThreeDContainer variants={itemVariants}>
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <group ref={sphereRef}>
                <SkillSphere />
              </group>
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.5}
              />
            </Canvas>
          </ThreeDContainer>
        </motion.div>
      </SkillsContent>
    </SkillsContainer>
  );
};

export default SkillsSection;
