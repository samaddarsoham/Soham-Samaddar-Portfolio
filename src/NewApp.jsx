import { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { AudioProvider } from './context/AudioContext';
import FuturisticGlobalStyles from './styles/FuturisticGlobalStyles';
import futuristicTheme from './styles/futuristicTheme';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// UI Components
import CustomCursor from './components/ui/CustomCursor';
import BackToTop from './components/ui/BackToTop';
import LoadingScreen from './components/ui/LoadingScreen';
import AudioAutoplayHelper from './components/ui/AudioAutoplayHelper';

// Section Components
import HeroSection from './components/sections/HeroSection';
import NewAboutSection from './components/sections/NewAboutSection';
import SkillsSection from './components/sections/SkillsSection';
import ProjectsSection from './components/sections/ProjectsSection';
import RefinedAchievementsSection from './components/sections/RefinedAchievementsSection';
import ContactSection from './components/sections/ContactSection';

function NewApp() {
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);

    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <ThemeProvider theme={futuristicTheme}>
      <AudioProvider>
        <FuturisticGlobalStyles />

        {loading ? (
          <LoadingScreen onFinishLoading={() => setLoading(false)} />
        ) : (
          <>
            <AudioAutoplayHelper />
            {!isMobile && <CustomCursor />}
            <Navbar />
            <main>
              <HeroSection />
              <NewAboutSection />
              <SkillsSection />
              <ProjectsSection />
              <RefinedAchievementsSection />
              <ContactSection />
            </main>
            <Footer />
            <BackToTop />
          </>
        )}
      </AudioProvider>
    </ThemeProvider>
  );
}

export default NewApp;
