import { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { AudioProvider } from './context/AudioContext';
import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/theme';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// UI Components
import CustomCursor from './components/ui/CustomCursor';
import BackToTop from './components/ui/BackToTop';
import LoadingScreen from './components/ui/LoadingScreen';

// Section Components
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import SkillsSection from './components/sections/SkillsSection';
import ProjectsSection from './components/sections/ProjectsSection';
import AchievementsSection from './components/sections/AchievementsSection';
import ContactSection from './components/sections/ContactSection';

function App() {
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
    <ThemeProvider theme={theme}>
      <AudioProvider>
        <GlobalStyles />

        {loading ? (
          <LoadingScreen onFinishLoading={() => setLoading(false)} />
        ) : (
          <>
            {!isMobile && <CustomCursor />}
            <Navbar />
            <main>
              <HeroSection />
              <AboutSection />
              <SkillsSection />
              <ProjectsSection />
              <AchievementsSection />
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

export default App;
