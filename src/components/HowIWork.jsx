import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Lightbulb, Compass, Palette, Code2, Zap } from 'lucide-react';
import './HowIWork.css';

const steps = [
  {
    number: "1",
    icon: Lightbulb,
    titleKey: "step1Title",
    descKey: "step1Desc",
    color: "rgba(255, 8, 51, 0.04)",
  },
  {
    number: "2",
    icon: Compass,
    titleKey: "step2Title",
    descKey: "step2Desc",
    color: "rgba(255, 8, 51, 0.04)",
  },
  {
    number: "3",
    icon: Palette,
    titleKey: "step3Title",
    descKey: "step3Desc",
    color: "rgba(255, 8, 51, 0.04)",
  },
  {
    number: "4",
    icon: Code2,
    titleKey: "step4Title",
    descKey: "step4Desc",
    color: "rgba(255, 8, 51, 0.04)",
  },
  {
    number: "5",
    icon: Zap,
    titleKey: "step5Title",
    descKey: "step5Desc",
    color: "rgba(255, 8, 51, 0.04)",
  }
];

const HowIWork = () => {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 60, damping: 14 }
    }
  };

  return (
    <section id="how-i-work" className="section-padding how-i-work-section">
      <div className="container">
        <span className="section-subtitle">{t('howIWorkSubtitle')}</span>
        <h2 className="section-title">{t('howIWorkTitle')}</h2>

        <motion.div 
          className="how-i-work-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <motion.div 
                className="step-card card" 
                key={index}
                variants={cardVariants}
              >
                <div className="step-header">
                  <div className="step-icon-wrapper" style={{ background: step.color }}>
                    <IconComponent size={24} className="step-icon" />
                  </div>
                  <span className="step-number">{step.number}</span>
                </div>
                <h3 className="step-title">{t(step.titleKey)}</h3>
                <p className="step-description">{t(step.descKey)}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default HowIWork;
