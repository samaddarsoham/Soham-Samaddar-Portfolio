import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ProjectsContainer = styled.section`
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

const ProjectsContent = styled.div`
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

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); // Adjusted minmax value
  gap: 1.5rem; // Slightly reduced gap
  margin-bottom: 3rem;
  width: 100%;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  background: rgba(10, 10, 30, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  overflow: hidden;
  height: 100%;
  position: relative;
  width: 100%; // Ensure cards take full width of their grid cell
`;

const ProjectImage = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(10, 10, 30, 0), rgba(10, 10, 30, 0.8));
    z-index: 1;
  }
  
  ${ProjectCard}:hover & img {
    transform: scale(1.1);
  }
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

const ProjectDescription = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1rem;
`;

const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const ProjectTag = styled.span`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  padding: 0.3rem 0.8rem;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.secondary};
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const ProjectLink = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${({ primary, theme }) => primary ? theme.colors.primary : 'transparent'};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ primary, theme }) => primary ? 'transparent' : theme.colors.primary};
  border-radius: 5px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ primary, theme }) => primary ? theme.colors.primary : 'rgba(255, 0, 51, 0.1)'};
    transform: translateY(-3px);
  }
`;

const ProjectModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(5, 5, 16, 0.9);
  backdrop-filter: blur(10px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  background: rgba(10, 10, 30, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 3px;
  }
`;

const ModalCloseButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 10;
  
  &:hover {
    background: rgba(255, 0, 51, 0.2);
  }
`;

const ModalImage = styled.div`
  width: 100%;
  height: 400px;
  overflow: hidden;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    background: linear-gradient(to bottom, rgba(10, 10, 30, 0), rgba(10, 10, 30, 1));
    z-index: 1;
  }
`;

const ModalBody = styled.div`
  padding: 2rem;
`;

const ModalTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const ModalDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
`;

const ModalTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 2rem;
`;

const ModalTag = styled.span`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.secondary};
`;

const ModalLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const ModalLink = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background: ${({ primary, theme }) => primary ? theme.colors.primary : 'transparent'};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ primary, theme }) => primary ? 'transparent' : theme.colors.primary};
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ primary, theme }) => primary ? theme.colors.primary : 'rgba(255, 0, 51, 0.1)'};
    transform: translateY(-3px);
  }
`;

const FilterContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 3rem;
`;

const FilterButton = styled(motion.button)`
  background: ${({ active, theme }) => active ? theme.colors.primary : 'rgba(255, 255, 255, 0.05)'};
  border: 1px solid ${({ active, theme }) => active ? theme.colors.primary : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 50px;
  padding: 0.5rem 1.5rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ active, theme }) => active ? theme.colors.primary : 'rgba(255, 0, 51, 0.1)'};
    transform: translateY(-3px);
  }
`;

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState([]);
  
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  // Sample project data
  const projects = [
    {
      id: 1,
      title: 'MEDISYNC',
      description: 'AI-powered healthcare platform for remote patient monitoring and diagnosis assistance.',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      tags: ['React', 'Node.js', 'TensorFlow', 'MongoDB'],
      category: 'ai',
      demoLink: '#',
      githubLink: '#',
      fullDescription: 'MEDISYNC is an advanced healthcare platform that leverages artificial intelligence to provide remote patient monitoring and diagnostic assistance. The system uses machine learning algorithms to analyze patient data and provide real-time insights to healthcare providers. Features include vital sign monitoring, symptom analysis, medication tracking, and telehealth integration.'
    },
    {
      id: 2,
      title: 'NASA SpaceApps Project',
      description: '3D Orrery and Near Earth Object tracker that won the NASA SpaceApps Hackathon.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80',
      tags: ['Three.js', 'React', 'NASA API', 'WebGL'],
      category: '3d',
      demoLink: '#',
      githubLink: '#',
      fullDescription: 'This project, which won the NASA SpaceApps Hackathon, is an interactive 3D Orrery (solar system model) and Near Earth Object tracker. It visualizes the positions of planets and potentially hazardous asteroids in real-time using data from NASA\'s APIs. Users can explore the solar system, track celestial objects, and learn about space phenomena through an immersive 3D interface.'
    },
    {
      id: 3,
      title: 'CITIZEN\'S ADVOCATE',
      description: 'Unified government complaint portal with real-time tracking and resolution system.',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io'],
      category: 'fullstack',
      demoLink: '#',
      githubLink: '#',
      fullDescription: 'CITIZEN\'S ADVOCATE is a comprehensive platform designed to streamline the process of filing and resolving citizen complaints to government agencies. The system features a user-friendly interface for submitting complaints, real-time tracking of complaint status, automated routing to relevant departments, and analytics dashboards for government officials to monitor resolution metrics and identify systemic issues.'
    },
    {
      id: 4,
      title: 'Virtual Herbal Garden',
      description: 'Interactive 3D exploration of medicinal plants with detailed information and uses.',
      image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      tags: ['Three.js', 'React', 'WebGL', 'GSAP'],
      category: '3d',
      demoLink: '#',
      githubLink: '#',
      fullDescription: 'The Virtual Herbal Garden is an immersive 3D experience that allows users to explore and learn about medicinal plants from around the world. Each plant is rendered in detailed 3D with interactive elements that provide information about its properties, traditional uses, scientific research, and cultivation methods. The project aims to preserve and share traditional knowledge about medicinal plants in an engaging digital format.'
    },
    {
      id: 5,
      title: 'Library Management System',
      description: 'Comprehensive digital library system with inventory management and user tracking.',
      image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      tags: ['React', 'Node.js', 'Express', 'MongoDB'],
      category: 'fullstack',
      demoLink: '#',
      githubLink: '#',
      fullDescription: 'This Library Management System is a full-featured digital solution for modern libraries. It includes modules for inventory management, patron records, circulation (check-in/check-out), reservations, fine calculation, and reporting. The system also features a public-facing catalog with advanced search capabilities, personalized recommendations, and integration with e-book platforms.'
    },
    {
      id: 6,
      title: 'AI Image Generator',
      description: 'Text-to-image generation tool using advanced machine learning models.',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      tags: ['React', 'TensorFlow.js', 'WebGL', 'API Integration'],
      category: 'ai',
      demoLink: '#',
      githubLink: '#',
      fullDescription: 'The AI Image Generator is a cutting-edge application that transforms text descriptions into vivid images using state-of-the-art machine learning models. Users can input detailed text prompts and adjust various parameters to control the style, composition, and content of the generated images. The application leverages optimized TensorFlow.js models to provide fast generation times even in browser environments.'
    }
  ];
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  useEffect(() => {
    // Filter projects based on selected category
    if (filter === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === filter));
    }
  }, [filter]);
  
  const openModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };
  
  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };
  
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
  
  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
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
      y: -10,
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
      borderColor: 'rgba(255, 0, 51, 0.3)',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    }
  };
  
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3,
        ease: 'easeIn'
      }
    }
  };

  return (
    <ProjectsContainer id="projects">
      <ProjectsContent>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <SectionTitle variants={itemVariants}>My Projects</SectionTitle>
          <SectionSubtitle variants={itemVariants}>
            A showcase of my best work, ranging from web applications to 3D experiences and AI solutions.
          </SectionSubtitle>
          
          <FilterContainer variants={itemVariants}>
            <FilterButton 
              active={filter === 'all'} 
              onClick={() => setFilter('all')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              All Projects
            </FilterButton>
            <FilterButton 
              active={filter === 'fullstack'} 
              onClick={() => setFilter('fullstack')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Full Stack
            </FilterButton>
            <FilterButton 
              active={filter === '3d'} 
              onClick={() => setFilter('3d')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              3D & Interactive
            </FilterButton>
            <FilterButton 
              active={filter === 'ai'} 
              onClick={() => setFilter('ai')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              AI & ML
            </FilterButton>
          </FilterContainer>
          
          <ProjectsGrid
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                variants={cardVariants}
                whileHover="hover"
                onClick={() => openModal(project)}
              >
                <ProjectImage>
                  <img src={project.image} alt={project.title} />
                </ProjectImage>
                <ProjectContent>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  <ProjectTags>
                    {project.tags.map((tag, index) => (
                      <ProjectTag key={index}>{tag}</ProjectTag>
                    ))}
                  </ProjectTags>
                  <ProjectLinks>
                    <ProjectLink 
                      href={project.demoLink} 
                      target="_blank"
                      rel="noopener noreferrer"
                      primary
                      onClick={(e) => e.stopPropagation()}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Live Demo
                    </ProjectLink>
                    <ProjectLink 
                      href={project.githubLink} 
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      GitHub
                    </ProjectLink>
                  </ProjectLinks>
                </ProjectContent>
              </ProjectCard>
            ))}
          </ProjectsGrid>
        </motion.div>
      </ProjectsContent>
      
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeModal}
          >
            <ModalContent
              variants={modalVariants}
              onClick={(e) => e.stopPropagation()}
            >
              <ModalCloseButton 
                onClick={closeModal}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </ModalCloseButton>
              <ModalImage>
                <img src={selectedProject.image} alt={selectedProject.title} />
              </ModalImage>
              <ModalBody>
                <ModalTitle>{selectedProject.title}</ModalTitle>
                <ModalDescription>{selectedProject.fullDescription}</ModalDescription>
                <ModalTags>
                  {selectedProject.tags.map((tag, index) => (
                    <ModalTag key={index}>{tag}</ModalTag>
                  ))}
                </ModalTags>
                <ModalLinks>
                  <ModalLink 
                    href={selectedProject.demoLink} 
                    target="_blank"
                    rel="noopener noreferrer"
                    primary
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Live Demo
                  </ModalLink>
                  <ModalLink 
                    href={selectedProject.githubLink} 
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Source
                  </ModalLink>
                </ModalLinks>
              </ModalBody>
            </ModalContent>
          </ProjectModal>
        )}
      </AnimatePresence>
    </ProjectsContainer>
  );
};

export default ProjectsSection;
