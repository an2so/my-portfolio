import { Monitor, ShoppingCart, Palette, Briefcase, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import './Services.css';

const services = [
  {
    icon: Monitor,
    titleKey: "webDev",
    descKey: "webDevDesc",
  },
  {
    icon: ShoppingCart,
    titleKey: "ecom",
    descKey: "ecomDesc",
  },
  {
    icon: Palette,
    titleKey: "serviceUI",
    descKey: "serviceUIDesc",
  },
  {
    icon: Briefcase,
    titleKey: "serviceBrand",
    descKey: "serviceBrandDesc",
  },
  {
    icon: Zap,
    titleKey: "serviceOptim",
    descKey: "serviceOptimDesc",
  }
];

const Services = () => {
  const { t } = useLanguage();

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 70,
        damping: 15,
        delay: i * 0.1
      }
    })
  };

  return (
    <section id="services" className="section-padding services-section">
      <div className="container">
        <span className="section-subtitle">{t('servicesSubtitle')}</span>
        <h2 className="section-title">{t('servicesTitle')}</h2>

        <div className="services-grid">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div 
                className="service-card card"
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={cardVariants}
              >
                <div className="service-icon-wrapper">
                  <IconComponent size={40} className="service-icon" />
                  <div className="service-icon-bg"></div>
                </div>
                
                <div className="service-content">
                  <h3 className="service-title">{t(service.titleKey)}</h3>
                  <div className="service-divider"></div>
                  <p className="service-desc">
                    {t(service.descKey)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
