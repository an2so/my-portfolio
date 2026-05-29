import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import HowIWork from './components/HowIWork';
import Services from './components/Services';
import TechStack from './components/TechStack';
import Work from './components/Work';
import Reviews from './components/Reviews';
import Footer from './components/Footer';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ArrowUp } from 'lucide-react';

function AppContent() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
      
    });
  };

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <HowIWork />
        <Services />
        <TechStack />
        <Work />
        <Reviews />
      </main>
      <Footer />

      <button
        className={`scroll-to-top ${showTopBtn ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
        type="button"
      >
        <ArrowUp size={24} />
      </button>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
