import { Quote, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import './Reviews.css';

const Reviews = () => {
  const { t } = useLanguage();

  return (
    <section id="reviews" className="section-padding reviews-section">
      <div className="container">
        <span className="section-subtitle">{t('reviewsSubtitle')}</span>
        <h2 className="section-title">{t('reviewsTitle')}</h2>

        <div className="reviews-grid">
          {[1, 2, 3].map((item, index) => (
            <motion.div 
              className="review-card card" 
              key={item}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Quote className="quote-icon" size={32} fill="currentColor" />
              <p className="review-text">{t('reviewPlaceholder')}</p>
              <div className="review-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={16} className="star-icon" fill="currentColor" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
