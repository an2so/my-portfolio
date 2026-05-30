import { ArrowDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import './Hero.css';

const Hero = () => {
  const t = useLanguage().t;
  const theme = useTheme().theme;

  // Hide the video temporarily on initial mount if reload occurs while scrolled down
  const [hideVideoOnLoad, setHideVideoOnLoad] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('isScrolled') === 'true';
    }
    return false;
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHideVideoOnLoad(false);
    }, 200);
    return () => clearTimeout(timeout);
  }, []);

  const handleScrollToWork = (e) => {
    e.preventDefault();
    setTimeout(() => {
      const element = document.getElementById('work');
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 30,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  return (
    <section id="hero" className="hero-section">
      <div className={`hero-background ${hideVideoOnLoad ? 'hide-media' : ''}`}>
        <video
          autoPlay
          loop
          muted
          defaultMuted
          playsInline
          preload="auto"
          className={`hero-video-bg ${theme === 'dark' ? 'active' : ''}`}
        >
          <source src="/videos/hero-bg-dark.mp4" type="video/mp4" />
        </video>
        <video
          autoPlay
          loop
          muted
          defaultMuted
          playsInline
          preload="auto"
          className={`hero-video-bg ${theme === 'light' ? 'active' : ''}`}
        >
          <source src="/videos/hero-bg-light.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
      </div>


      <motion.div 
        className="container hero-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="hero-content">
          <motion.div className="role-badge" variants={itemVariants}>
            <span className="dot"></span> {t('role')}
          </motion.div>

          <motion.h1 className="hero-title" variants={itemVariants}>
            {t('heroTitle1')} <br />
            {t('heroTitle2')} <span className="text-accent">{t('heroTitleHighlight')}</span>
          </motion.h1>

          <motion.p className="hero-description" variants={itemVariants}>
            {t('heroDesc')}
          </motion.p>

          <motion.div variants={itemVariants}>
            <a href="#work" onClick={handleScrollToWork} className="btn-outline hero-btn">
              {t('viewWork')} <ArrowDown size={18} />
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;



