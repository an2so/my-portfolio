import { Code2, Users, Rocket, Target, CheckCircle2, FileText, Award } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
  const { t, language } = useLanguage();

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
                <a 
                  className="btn-outline-subtle action-btn" 
                  href="/Anas_Malek_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('viewResume')} <FileText size={16} />
                </a>
                <a 
                  className="btn-outline-subtle action-btn" 
                  href="/Anas_Malek_Certificate.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('viewCert')} <Award size={16} />
                </a>
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
    </section>
  );
};

export default About;
