import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { MonitorSmartphone, Palette, Webhook, Cloud, BrainCircuit } from 'lucide-react';
import './TechStack.css';

const categories = [
  {
    nameKey: 'frontend',
    technologies: [
      { name: 'HTML5', icon: 'devicon-html5-plain colored' },
      { name: 'CSS3', icon: 'devicon-css3-plain colored' },
      { name: 'JavaScript', icon: 'devicon-javascript-plain colored' },
      { name: 'React.js', icon: 'devicon-react-original colored' },
      { name: 'Tailwind CSS', icon: 'devicon-tailwindcss-original colored' },
      { name: 'Responsive Design', icon: 'lucide', lucideIcon: MonitorSmartphone },
      { name: 'UI/UX Principles', icon: 'lucide', lucideIcon: Palette },
    ]
  },
  {
    nameKey: 'backend',
    technologies: [
      { name: 'Node.js', icon: 'devicon-nodejs-plain colored' },
      { name: 'Express.js', icon: 'devicon-express-original' },
      { name: 'MongoDB', icon: 'devicon-mongodb-plain colored' },
      { name: 'REST APIs', icon: 'lucide', lucideIcon: Webhook },
    ]
  },
  {
    nameKey: 'tools',
    technologies: [
      { name: 'Git & GitHub', icon: 'devicon-github-original' },
      { name: 'Visual Studio Code', icon: 'devicon-vscode-plain colored' },
      { name: 'Oracle APEX', icon: 'devicon-oracle-original colored' },
      { name: 'Vercel / Netlify', icon: 'lucide', lucideIcon: Cloud },
      { name: 'AI Automation', icon: 'lucide', lucideIcon: BrainCircuit },
    ]
  }
];

const TechStack = () => {
  const { t } = useLanguage();

  return (
    <section id="techstack" className="section-padding techstack-section">
      <div className="container">
        <span className="section-subtitle">{t('techSubtitle')}</span>
        <h2 className="section-title">{t('techTitle')}</h2>

        <div className="tech-table card">
          {categories.map((category, index) => (
            <motion.div 
              className="tech-row" 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="tech-category">
                <h3>{t(category.nameKey)}</h3>
              </div>
              <div className="tech-items">
                {category.technologies.map((tech, i) => (
                  <div className="tech-item" key={i}>
                    {tech.icon === 'lucide' ? (
                      <tech.lucideIcon size={24} className="tech-lucide-icon" style={{ color: 'var(--primary)' }} />
                    ) : (
                      <i className={tech.icon}></i>
                    )}
                    <span>{tech.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
