import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ContactContainer = styled.section`
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

const ContactContent = styled.div`
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

const ContactLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ContactRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 1rem;
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

const ContactText = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.9);
`;

const ContactInfo = styled(motion.div)`
  margin-bottom: 2rem;
`;

const ContactInfoItem = styled(motion.div)`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ContactIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const ContactDetails = styled.div`
  h4 {
    font-size: 1.1rem;
    margin-bottom: 0.3rem;
  }

  p, a {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.8);
  }

  a {
    transition: color 0.3s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const SocialLink = styled(motion.a)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
    transform: translateY(-5px);
  }
`;

const ContactForm = styled(motion.form)`
  background: rgba(10, 10, 30, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 2.5rem;
`;

const FormGroup = styled(motion.div)`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
`;

const FormInput = styled.input`
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  transition: all 0.3s ease;
  font-family: var(--font-main);

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 10px rgba(255, 0, 51, 0.2);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  transition: all 0.3s ease;
  min-height: 150px;
  resize: vertical;
  font-family: var(--font-main);

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 10px rgba(255, 0, 51, 0.2);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const SubmitButton = styled(motion.button)`
  display: inline-block;
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: all 0.5s ease;
  }

  &:hover:before {
    left: 100%;
  }
`;

const FormSuccess = styled(motion.div)`
  background: rgba(0, 255, 102, 0.1);
  border: 1px solid rgba(0, 255, 102, 0.3);
  border-radius: 5px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  color: #00ff66;
  display: flex;
  align-items: center;

  span {
    margin-right: 0.5rem;
  }
`;

const FormError = styled(motion.div)`
  background: rgba(255, 0, 51, 0.1);
  border: 1px solid rgba(255, 0, 51, 0.3);
  border-radius: 5px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;

  span {
    margin-right: 0.5rem;
  }
`;

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Please fill in all required fields.'
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Please enter a valid email address.'
      });
      return;
    }

    // In a real application, you would send the form data to a server here
    // For this demo, we'll just simulate a successful submission
    setTimeout(() => {
      setFormStatus({
        submitted: true,
        success: true,
        message: 'Your message has been sent successfully! I will get back to you soon.'
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      // Reset form status after 5 seconds
      setTimeout(() => {
        setFormStatus({
          submitted: false,
          success: false,
          message: ''
        });
      }, 5000);
    }, 1000);
  };

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

  const formVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: '0 5px 15px rgba(255, 0, 51, 0.3)',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <ContactContainer id="contact">
      <ContactContent>
        <ContactLeft>
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            <SectionTitle variants={itemVariants}>Get In Touch</SectionTitle>
            <ContactText variants={itemVariants}>
              Feel free to reach out for collaborations, project inquiries, or just a friendly chat. I'm always open to discussing new projects and creative ideas.
            </ContactText>

            <ContactInfo variants={containerVariants}>
              <ContactInfoItem variants={itemVariants}>
                <ContactIcon>📧</ContactIcon>
                <ContactDetails>
                  <h4>Email</h4>
                  <a href="mailto:samaddarsoham@gmail.com">samaddarsoham@gmail.com</a>
                </ContactDetails>
              </ContactInfoItem>

              <ContactInfoItem variants={itemVariants}>
                <ContactIcon>📱</ContactIcon>
                <ContactDetails>
                  <h4>Phone</h4>
                  <p>+91 8777606198</p>
                </ContactDetails>
              </ContactInfoItem>

              <ContactInfoItem variants={itemVariants}>
                <ContactIcon>📍</ContactIcon>
                <ContactDetails>
                  <h4>Location</h4>
                  <p>Kolkata, India</p>
                </ContactDetails>
              </ContactInfoItem>
            </ContactInfo>

            <SocialLinks variants={containerVariants}>
              <SocialLink
                href="https://github.com/SohamSamaddar"
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                GH
              </SocialLink>
              <SocialLink
                href="https://linkedin.com/in/soham-samaddar"
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                IN
              </SocialLink>
              <SocialLink
                href="#"
                variants={itemVariants}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                TW
              </SocialLink>
              <SocialLink
                href="#"
                variants={itemVariants}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                IG
              </SocialLink>
            </SocialLinks>
          </motion.div>
        </ContactLeft>

        <ContactRight>
          <ContactForm
            variants={formVariants}
            initial="hidden"
            animate={controls}
            onSubmit={handleSubmit}
          >
            {formStatus.submitted && (
              formStatus.success ? (
                <FormSuccess
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <span>✓</span> {formStatus.message}
                </FormSuccess>
              ) : (
                <FormError
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <span>✕</span> {formStatus.message}
                </FormError>
              )
            )}

            <FormGroup variants={itemVariants}>
              <FormLabel htmlFor="name">Name *</FormLabel>
              <FormInput
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup variants={itemVariants}>
              <FormLabel htmlFor="email">Email *</FormLabel>
              <FormInput
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup variants={itemVariants}>
              <FormLabel htmlFor="subject">Subject</FormLabel>
              <FormInput
                type="text"
                id="subject"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup variants={itemVariants}>
              <FormLabel htmlFor="message">Message *</FormLabel>
              <FormTextarea
                id="message"
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <SubmitButton
              type="submit"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Send Message
            </SubmitButton>
          </ContactForm>
        </ContactRight>
      </ContactContent>
    </ContactContainer>
  );
};

export default ContactSection;
