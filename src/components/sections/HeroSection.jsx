import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { useAudio } from '../../context/AudioContext';

// Styled components
const HeroContainer = styled.section`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(to bottom, #050510, #0a0a20);
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 800px;
  padding: 0 2rem;
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.1;

  span {
    display: block;
  }

  .highlight {
    color: ${({ theme }) => theme.colors.primary};
    position: relative;
    display: inline-block;

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 5px;
      background: ${({ theme }) => theme.colors.primary};
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 0.5s ease;
    }

    &.animate:after {
      transform: scaleX(1);
      transform-origin: left;
    }
  }
`;

const HeroSubtitle = styled(motion.div)`
  font-size: clamp(1.2rem, 4vw, 1.8rem);
  margin-bottom: 2.5rem;
  color: rgba(255, 255, 255, 0.8);
  font-family: var(--font-secondary);
`;

const HeroCTA = styled(motion.a)`
  display: inline-block;
  padding: 1rem 2.5rem;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.1rem;
  font-weight: 600;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  z-index: 1;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background: ${({ theme }) => theme.colors.primary};
    z-index: -1;
    transition: width 0.3s ease;
  }

  &:hover:before {
    width: 100%;
  }
`;

const CanvasContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9rem;
  opacity: 0.7;
  z-index: 2;
`;

const ScrollIcon = styled(motion.div)`
  width: 30px;
  height: 50px;
  border: 2px solid ${({ theme }) => theme.colors.text};
  border-radius: 20px;
  margin-bottom: 10px;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 6px;
    height: 6px;
    background: ${({ theme }) => theme.colors.text};
    border-radius: 50%;
  }
`;

const AudioButton = styled(motion.button)`
  position: absolute;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(10, 10, 30, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: ${({ theme, isMuted }) => isMuted ? theme.colors.text : theme.colors.primary};
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
`;

// 3D Model component
const Model = () => {
  // This is a placeholder - in a real implementation, you would load an actual model
  // For now, we'll create a simple sphere
  return (
    <Float
      speed={1.5}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <mesh>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial
          color="#00aaff"
          emissive="#003366"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
};

// Particles component
const Particles = () => {
  const particlesRef = useRef();

  useEffect(() => {
    if (!particlesRef.current) return;

    const particles = particlesRef.current;
    const count = 200;
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      scales[i] = Math.random();
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    // Animation
    const animation = gsap.to(particles.attributes.scale.array, {
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      onUpdate: () => {
        if (particles.attributes.scale) {
          particles.attributes.scale.needsUpdate = true;
        }
      }
    });

    return () => {
      if (animation) {
        animation.kill();
      }
    };
  }, []);

  return (
    <points>
      <bufferGeometry ref={particlesRef} />
      <pointsMaterial
        size={0.05}
        color="#ffffff"
        sizeAttenuation={true}
        transparent={true}
        alphaMap={new THREE.TextureLoader().load('/textures/particle.png')}
        depthWrite={false}
      />
    </points>
  );
};

const HeroSection = () => {
  const { isMuted, toggleMute, togglePlay, isPlaying } = useAudio();
  const highlightRef = useRef(null);

  useEffect(() => {
    // Start playing music when component mounts
    if (!isPlaying) {
      togglePlay();
    }

    // Add highlight animation
    const timeout = setTimeout(() => {
      highlightRef.current?.classList.add('animate');
    }, 2000);

    return () => clearTimeout(timeout);
  }, [isPlaying, togglePlay]);

  const containerVariants = {
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

  const scrollVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 2,
        duration: 0.6
      }
    }
  };

  const scrollIconVariants = {
    animate: {
      y: [0, 10, 0],
      transition: {
        y: {
          repeat: Infinity,
          duration: 1.5,
          ease: 'easeInOut'
        }
      }
    }
  };

  return (
    <HeroContainer id="home">
      <CanvasContainer>
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Model />
          <Particles />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
          <Environment preset="night" />
        </Canvas>
      </CanvasContainer>

      <HeroContent>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <HeroTitle variants={itemVariants}>
            <span>Hi, I'm <span className="highlight" ref={highlightRef}>Soham</span></span>
            <span>Futuristic Full-Stack Developer</span>
          </HeroTitle>

          <HeroSubtitle variants={itemVariants}>
            <TypeAnimation
              sequence={[
                'Building next-gen web experiences',
                1000,
                'Crafting 3D interactive interfaces',
                1000,
                'Creating AI-powered applications',
                1000,
                'Winning hackathons',
                1000
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </HeroSubtitle>

          <HeroCTA
            href="#about"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Enter My World
          </HeroCTA>
        </motion.div>
      </HeroContent>

      <ScrollIndicator
        variants={scrollVariants}
        initial="hidden"
        animate="visible"
      >
        <ScrollIcon
          variants={scrollIconVariants}
          animate="animate"
        />
        <span>Scroll Down</span>
      </ScrollIndicator>

      <AudioButton
        onClick={toggleMute}
        isMuted={isMuted}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isMuted ? '🔇' : '🔊'}
      </AudioButton>
    </HeroContainer>
  );
};

export default HeroSection;
