import { FolderGit2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import './Work.css';

const Work = () => {
  const { t } = useLanguage();

  const renderDescription = (description) => {
    const [firstSentence, ...rest] = description.split('. ');

    if (rest.length === 0) {
      return description;
    }

    return (
      <>
        {firstSentence}.
        <br />
        {rest.join('. ')}
      </>
    );
  };

  return (
    <section id="work" className="section-padding work-section">
      <div className="container">
        <span className="section-subtitle">{t('workSubtitle')}</span>
        <h2 className="section-title">{t('workTitle')}</h2>

        <motion.div 
          className="work-placeholder"
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="folder-icon-container">
            <FolderGit2 size={48} className="folder-icon" />
          </div>
          <h3 className="work-placeholder-title">{t('comingSoon')}</h3>
          <p className="work-placeholder-desc">{renderDescription(t('workDesc'))}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Work;
