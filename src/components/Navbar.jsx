import { useState, useEffect } from 'react';
import { PhoneCall, Moon, Sun, Menu, X, Info, Cpu, FolderGit2, Star, Mail } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('isScrolled') === 'true';
    }
    return false;
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isInitialMount, setIsInitialMount] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');

  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    let isRestoring = true;
    const timeout = setTimeout(() => {
      isRestoring = false;
      setIsInitialMount(false);
    }, 150);

    const handleScroll = () => {
      const isPageScrolled = window.scrollY > 50;
      
      if (isRestoring && sessionStorage.getItem('isScrolled') === 'true') {
        return;
      }
      
      setScrolled(isPageScrolled);
      sessionStorage.setItem('isScrolled', isPageScrolled ? 'true' : 'false');
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const sectionIds = ['hero', 'about', 'how-i-work', 'services', 'techstack', 'work', 'reviews', 'contact'];
    
    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id === 'how-i-work') {
            setActiveSection('about');
          } else if (id === 'techstack') {
            setActiveSection('services');
          } else {
            setActiveSection(id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToTop = (e) => {
    e.preventDefault();
    closeMobileMenu();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    closeMobileMenu();
    setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 30,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* dir="ltr" on <nav> itself: locks the entire navbar against RTL reflow */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${isInitialMount ? 'no-transition' : ''}`} dir="ltr">
        <div className="container navbar-container">
          <a href="#" onClick={scrollToTop} className="logo logo-link">
            <span className="logo-icon">&lt;/&gt;</span>
            <span className="logo-text">Anas</span>
            <span className="logo-accent">Malek</span>
          </a>

          <ul className="nav-links">
            <li><a href="#about" className={activeSection === 'about' ? 'active' : ''} onClick={(e) => handleNavClick(e, 'about')}>{t('navAbout')}</a></li>
            <li><a href="#services" className={activeSection === 'services' ? 'active' : ''} onClick={(e) => handleNavClick(e, 'services')}>{t('navServices')}</a></li>
            <li><a href="#work" className={activeSection === 'work' ? 'active' : ''} onClick={(e) => handleNavClick(e, 'work')}>{t('navWork')}</a></li>
            <li><a href="#reviews" className={activeSection === 'reviews' ? 'active' : ''} onClick={(e) => handleNavClick(e, 'reviews')}>{t('navReviews')}</a></li>
            <li><a href="#contact" className={activeSection === 'contact' ? 'active' : ''} onClick={(e) => handleNavClick(e, 'contact')}>{t('navContact')}</a></li>
          </ul>

          <div className="nav-actions">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme" type="button">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="lang-switch">
              <button
                className={language === 'en' ? 'active' : ''}
                onClick={() => toggleLanguage('en')}
                type="button"
                aria-label="Switch language to English"
              >EN</button>
              <button
                className={language === 'ar' ? 'active' : ''}
                onClick={() => toggleLanguage('ar')}
                type="button"
                aria-label="Switch language to Arabic"
              >AR</button>
            </div>
            <a 
              className="btn-primary nav-btn desktop-btn" 
              href="https://wa.me/97433889949" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              {t('bookCall')} <PhoneCall size={16} />
            </a>
            <button
              className="mobile-menu-btn"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              type="button"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer — nav links + Book a Call CTA; lang switcher stays in top bar */}
      <div className={`mobile-drawer-overlay ${isMobileMenuOpen ? 'open' : ''}`} onClick={closeMobileMenu} aria-hidden="true"></div>
      <div
        className={`mobile-drawer ${isMobileMenuOpen ? 'open' : ''}`}
        dir="ltr"
      >
        <div className="mobile-drawer-header">
          <a href="#" onClick={scrollToTop} className="logo logo-link" dir="ltr">
            <span className="logo-icon">&lt;/&gt;</span>
            <span className="logo-text">Anas</span>
            <span className="logo-accent">Malek</span>
          </a>
          <button className="close-menu-btn" onClick={closeMobileMenu} aria-label="Close menu" type="button">
            <X size={24} />
          </button>
        </div>

        <ul className="mobile-nav-links" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          <li>
            <a href="#about" className={activeSection === 'about' ? 'active' : ''} onClick={(e) => handleNavClick(e, 'about')}>
              <Info size={18} className="drawer-icon" /> <span>{t('navAbout')}</span>
            </a>
          </li>
          <li>
            <a href="#services" className={activeSection === 'services' ? 'active' : ''} onClick={(e) => handleNavClick(e, 'services')}>
              <Cpu size={18} className="drawer-icon" /> <span>{t('navServices')}</span>
            </a>
          </li>
          <li>
            <a href="#work" className={activeSection === 'work' ? 'active' : ''} onClick={(e) => handleNavClick(e, 'work')}>
              <FolderGit2 size={18} className="drawer-icon" /> <span>{t('navWork')}</span>
            </a>
          </li>
          <li>
            <a href="#reviews" className={activeSection === 'reviews' ? 'active' : ''} onClick={(e) => handleNavClick(e, 'reviews')}>
              <Star size={18} className="drawer-icon" /> <span>{t('navReviews')}</span>
            </a>
          </li>
          <li>
            <a href="#contact" className={activeSection === 'contact' ? 'active' : ''} onClick={(e) => handleNavClick(e, 'contact')}>
              <Mail size={18} className="drawer-icon" /> <span>{t('navContact')}</span>
            </a>
          </li>
        </ul>

        <div className="mobile-drawer-actions">
          <a 
            className="btn-primary w-full" 
            href="https://wa.me/97433889949" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={closeMobileMenu}
          >
            {t('bookCall')} <PhoneCall size={16} />
          </a>
        </div>

      </div>
    </>
  );
};

export default Navbar;
