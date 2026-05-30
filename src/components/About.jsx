import { useState, useEffect } from 'react';
import { Code2, Users, Rocket, Target, CheckCircle2, FileText, Award } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
  const { t, language } = useLanguage();
  const [modalType, setModalType] = useState(null); // null | 'resume' | 'certificate'

  useEffect(() => {
    if (modalType) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [modalType]);

  const isRtl = language === 'ar';
  const slideLeft = isRtl ? 50 : -50;
  const slideRight = isRtl ? -50 : 50;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 80, damping: 12 }
    }
  };

  return (
    <section id="about" className="section-padding about-section">
      <div className="container">
        <span className="section-subtitle">{t('aboutSubtitle')}</span>
        <h2 className="section-title">{t('aboutTitle')}</h2>

        {/* Top Grid: Profile Photo Card (Left) & Biography (Right) */}
        <div className="about-grid">
          {/* Left Column: Profile Card with Photo and Action Buttons */}
          <motion.div 
            className="about-profile-container"
            initial={{ opacity: 0, x: slideLeft }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="about-profile-card card">
              <div className="about-profile-img-wrapper">
                <img 
                  src="/anas-profile.png" 
                  alt="Anas Malek" 
                  className="about-profile-img" 
                />
              </div>
              
              <div className="about-actions">
                <button 
                  className="btn-outline-subtle action-btn" 
                  onClick={() => setModalType('resume')}
                  type="button"
                >
                  {t('viewResume')} <FileText size={16} />
                </button>
                <button 
                  className="btn-outline-subtle action-btn" 
                  onClick={() => setModalType('certificate')}
                  type="button"
                >
                  {t('viewCert')} <Award size={16} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Bio Content, Features, Stats Grid and Stats Description */}
          <motion.div 
            className="about-info-container"
            initial={{ opacity: 0, x: slideRight }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="about-text-wrapper">
              {t('aboutText').split('\n\n').map((para, i) => (
                <p className="about-paragraph" key={i}>
                  {para}
                </p>
              ))}
            </div>

            <div className="about-features">
              <div className="feature-item">
                <div className="feature-icon">
                  <Code2 size={24} />
                </div>
                <div>
                  <h4 className="feature-title">{t('cleanCode')}</h4>
                  <p className="feature-desc">{t('cleanCodeDesc')}</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <Users size={24} />
                </div>
                <div>
                  <h4 className="feature-title">{t('problemSolver')}</h4>
                  <p className="feature-desc">{t('problemSolverDesc')}</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <Rocket size={24} />
                </div>
                <div>
                  <h4 className="feature-title">{t('fastLearner')}</h4>
                  <p className="feature-desc">{t('fastLearnerDesc')}</p>
                </div>
              </div>
            </div>

            <div className="about-stats-container">
              <motion.div 
                className="stats-grid"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1
                    }
                  }}
                }
              >
                <motion.div className="stat-card card" variants={cardVariants}>
                  <Target size={32} className="stat-icon" />
                  <h3 className="stat-number">2+</h3>
                  <p className="stat-label">{t('yearsExp')}</p>
                </motion.div>
                
                <motion.div className="stat-card card" variants={cardVariants}>
                  <Code2 size={32} className="stat-icon" />
                  <h3 className="stat-number">10+</h3>
                  <p className="stat-label">{t('techLearned')}</p>
                </motion.div>

                <motion.div className="stat-card card" variants={cardVariants}>
                  <CheckCircle2 size={32} className="stat-icon" />
                  <h3 className="stat-number">100%</h3>
                  <p className="stat-label">{t('commitment')}</p>
                </motion.div>
              </motion.div>

              <div className="stats-text-wrapper">
                {t('statsText').split('\n').map((line, i) => (
                  <p className="stats-text-line" key={i}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Resume/Certificate Viewer Modal */}
      {modalType && (
        <div className="about-modal-overlay" onClick={() => setModalType(null)}>
          <div className="about-modal-content card" onClick={(e) => e.stopPropagation()}>
            <div className="about-modal-header">
              <h3>
                {modalType === 'resume' ? t('viewResume') : t('viewCert')}
              </h3>
            </div>
            
            <div className="about-modal-body">
              {modalType === 'resume' ? (
                <div className="about-modal-pages">
                  <img 
                    src="/Anas_Malek_CV.jpg" 
                    alt="Anas Malek Resume Page 1" 
                    className="about-modal-media"
                  />
                  <img 
                    src="/Anas_Malek_CV1.jpg" 
                    alt="Anas Malek Resume Page 2" 
                    className="about-modal-media"
                  />
                </div>
              ) : (
                <img 
                  src="/Anas_Malek_Certificate.jpg" 
                  alt="Anas Malek Certificate" 
                  className="about-modal-media"
                />
              )}
            </div>
            
            <div className="about-modal-footer">
              <a 
                href={modalType === 'resume' ? '/Anas_Malek_CV.pdf' : '/Anas_Malek_Certificate.pdf'} 
                download
                className="btn-primary"
              >
                {language === 'ar' ? 'تحميل بصيغة PDF' : 'Download as PDF'}
              </a>
              <button 
                className="btn-outline-subtle" 
                onClick={() => setModalType(null)}
              >
                {language === 'ar' ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default About;
