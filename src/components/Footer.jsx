import { useState, useEffect } from 'react';
import { Mail, MessageCircle, MapPin, Copy, Check, Maximize2, Minimize2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import './Footer.css';

const Footer = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error | error-invalid-email | error-typo-blocked
  const [suggestedEmail, setSuggestedEmail] = useState(null);
  const [showPhoneWarning, setShowPhoneWarning] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isMessageExpanded, setIsMessageExpanded] = useState(false);

  useEffect(() => {
    if (showConfirmModal) {
      document.documentElement.classList.add('scroll-lock');
    } else {
      document.documentElement.classList.remove('scroll-lock');
    }
    return () => {
      document.documentElement.classList.remove('scroll-lock');
    };
  }, [showConfirmModal]);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('anas2301malik@gmail.com').then(() => {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    });
  };

  const checkEmailTypo = (email) => {
    const commonDomains = {
      'gamil.com': 'gmail.com',
      'gmial.com': 'gmail.com',
      'gmal.com': 'gmail.com',
      'gmaail.com': 'gmail.com',
      'gmaill.com': 'gmail.com',
      'gmaii.com': 'gmail.com',
      'gamil.co': 'gmail.com',
      'gmai.com': 'gmail.com',
      'gamil.net': 'gmail.net',
      'hotail.com': 'hotmail.com',
      'hotmial.com': 'hotmail.com',
      'hotamail.com': 'hotmail.com',
      'hotmaill.com': 'hotmail.com',
      'yaho.com': 'yahoo.com',
      'yhoo.com': 'yahoo.com',
      'yahooo.com': 'yahoo.com',
      'outlok.com': 'outlook.com',
      'outllok.com': 'outlook.com',
    };
    
    const parts = email.split('@');
    if (parts.length === 2) {
      const username = parts[0];
      const domain = parts[1].toLowerCase().trim();
      if (commonDomains[domain]) {
        return `${username}@${commonDomains[domain]}`;
      }
    }
    return null;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Reset general errors as the user types/modifies any field
    if (status.startsWith('error')) {
      setStatus('idle');
    }

    let finalValue = value;

    if (name === 'phone') {
      // Allow only numbers, spaces, +, -, and parentheses. Block all letters.
      finalValue = value.replace(/[^0-9+\s\-()]/g, '');
      
      // Check if it starts with + or 00 (common country code prefix)
      const hasPrefix = finalValue.startsWith('+') || finalValue.startsWith('00');
      setShowPhoneWarning(finalValue.length > 0 && !hasPrefix);
    }

    const updatedFormData = { ...formData, [name]: finalValue };
    setFormData(updatedFormData);

    // Save form draft to localStorage
    try {
      localStorage.setItem('anas_portfolio_form_draft', JSON.stringify(updatedFormData));
    } catch {
      // Ignore localStorage errors
    }

    if (name === 'email') {
      const suggestion = checkEmailTypo(value);
      setSuggestedEmail(suggestion);
    }
  };

  const applySuggestion = () => {
    if (suggestedEmail) {
      const updatedFormData = { ...formData, email: suggestedEmail };
      setFormData(updatedFormData);
      setSuggestedEmail(null);
      if (status === 'error-typo-blocked') {
        setStatus('idle');
      }
      // Save suggestion update to draft
      try {
        localStorage.setItem('anas_portfolio_form_draft', JSON.stringify(updatedFormData));
      } catch {
        // Ignore
      }
    }
  };

  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem('anas_portfolio_form_draft');
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        const restoredData = {
          name: parsed.name || '',
          email: parsed.email || '',
          phone: parsed.phone || '',
          message: parsed.message || ''
        };
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFormData(restoredData);

        if (restoredData.message.length > 120) {
          setIsMessageExpanded(true);
        }

        if (restoredData.phone) {
          const hasPrefix = restoredData.phone.startsWith('+') || restoredData.phone.startsWith('00');
          setShowPhoneWarning(restoredData.phone.length > 0 && !hasPrefix);
        }

        if (restoredData.email) {
          const suggestion = checkEmailTypo(restoredData.email);
          setSuggestedEmail(suggestion);
        }
      }
    } catch {
      // Ignore
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Strict Validation
    if (!isValidEmail(formData.email)) {
      setStatus('error-invalid-email');
      return;
    }

    if (suggestedEmail) {
      setStatus('error-typo-blocked');
      return;
    }

    setShowConfirmModal(true);
  };

  const confirmSubmit = async () => {
    setShowConfirmModal(false);
    setStatus('submitting');

    // Format message lines with RLM marker for Arabic language to prevent text reversal in email clients
    const formatBidiText = (text) => {
      if (!text) return text;
      if (language !== 'ar') return text;
      return '\u200F' + text.split('\n').join('\n\u200F');
    };

    const formattedMessage = formatBidiText(formData.message);

    try {
      // Using Formspree endpoint.
      const response = await fetch('https://formspree.io/f/mwvzrvgk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formattedMessage,
          _replyto: formData.email,
          _subject: `New Message from Portfolio: ${formData.name}`
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setSuggestedEmail(null);
        setIsMessageExpanded(false);
        try {
          localStorage.removeItem('anas_portfolio_form_draft');
        } catch {
          // Ignore
        }
        setTimeout(() => setStatus('idle'), 5000); // clear success msg after 5s
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
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

  return (
    <footer id="contact" className="footer-section">
      <div className="container">
        <div className="footer-top section-padding">
          {/* Left Column: Info & Contacts */}
          <div className="footer-info">
            <span className="section-subtitle">{t('contactSubtitle')}</span>
            <h2 className="section-title">{t('contactTitle')}</h2>
            <p className="footer-desc">
              {t('contactDesc')}
            </p>

            <div className="contact-list">
              <div className="contact-item">
                <div className="contact-icon-wrapper mail">
                  <Mail size={20} />
                </div>
                <div>
                  <h4>{t('email')}</h4>
                  <div className="email-copy-wrapper">
                    <a href="mailto:anas2301malik@gmail.com" className="contact-link" dir="ltr">
                      anas2301malik@gmail.com
                    </a>
                    <button
                      type="button"
                      className={`copy-email-btn ${copiedEmail ? 'copied' : ''}`}
                      onClick={handleCopyEmail}
                      aria-label="Copy email address"
                      title={language === 'ar' ? 'نسخ البريد الإلكتروني' : 'Copy email address'}
                    >
                      {copiedEmail ? <Check size={14} className="copied-icon animate-scale-up" /> : <Copy size={14} />}
                      {copiedEmail && (
                        <span className="copy-tooltip">
                          {language === 'ar' ? 'تم النسخ!' : 'Copied!'}
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon-wrapper whatsapp">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <h4>{t('whatsapp')}</h4>
                  <a href="https://wa.me/97433889949" target="_blank" rel="noopener noreferrer" className="contact-link" dir="ltr">
                    +974 3388 9949
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon-wrapper location">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4>{t('location')}</h4>
                  <p>{t('locationValue')}</p>
                </div>
              </div>
            </div>

            <div className="footer-social-area">
              <h4>{t('followMe')}</h4>
              <div className="social-links">
                <a 
                  href="https://github.com/an2so" 
                  className="social-link card" 
                  aria-label="GitHub" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <i className="devicon-github-original" style={{ fontSize: '24px' }}></i>
                </a>
                <a 
                  href="https://www.linkedin.com/in/anas-saadeh" 
                  className="social-link card" 
                  aria-label="LinkedIn" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <i className="devicon-linkedin-plain" style={{ fontSize: '24px' }}></i>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Contact Form */}
          <div className="footer-form-container card">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">{t('formName')}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t('formNamePlaceholder')}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">{t('formEmail')}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('formEmailPlaceholder')}
                  required
                />
                <div className={`typo-suggestion-wrapper ${suggestedEmail ? 'show' : ''}`}>
                  {suggestedEmail && (
                    <div className="typo-suggestion">
                      {t('formDidYouMean')}
                      <button
                        type="button"
                        className="suggestion-link"
                        onClick={applySuggestion}
                      >
                        {suggestedEmail}
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">{t('formPhone')}</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t('formPhonePlaceholder')}
                />
                <span className="phone-note">{t('formPhoneNote')}</span>
                <div className={`phone-warning-wrapper ${showPhoneWarning ? 'show' : ''}`}>
                  <span className="phone-warning">{t('formPhoneWarning')}</span>
                </div>
              </div>
              
              <div className="form-group">
                <div className="textarea-header">
                  <label htmlFor="message">{t('formMessage')}</label>
                  <button
                    type="button"
                    className={`textarea-expand-btn ${isMessageExpanded ? 'expanded' : ''}`}
                    onClick={() => setIsMessageExpanded(!isMessageExpanded)}
                    title={isMessageExpanded ? (language === 'ar' ? 'تصغير' : 'Collapse') : (language === 'ar' ? 'توسيع' : 'Expand')}
                    aria-label="Expand message box"
                  >
                    {isMessageExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                  </button>
                </div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t('formMessagePlaceholder')}
                  rows="4"
                  dir="auto"
                  className={isMessageExpanded ? 'expanded' : ''}
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="btn-primary w-full submit-btn"
                disabled={status === 'submitting' || suggestedEmail !== null}
              >
                {status === 'submitting' ? t('formSending') : t('formSend')}
              </button>

              {status === 'success' && (
                <div className="form-alert success">
                  {t('formSuccess')}
                </div>
              )}
              {status === 'error' && (
                <div className="form-alert error">
                  {t('formError')}
                </div>
              )}
              {status === 'error-invalid-email' && (
                <div className="form-alert error">
                  {t('formEmailInvalid')}
                </div>
              )}
              {status === 'error-typo-blocked' && (
                <div className="form-alert error">
                  {t('formEmailTypoBlocked')}
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="footer-bottom" dir="ltr">
          <ul className="footer-nav">
            <li><a href="#about" onClick={(e) => handleNavClick(e, 'about')}>{t('navAbout')}</a></li>
            <li><a href="#work" onClick={(e) => handleNavClick(e, 'work')}>{t('navWork')}</a></li>
            <li><a href="#services" onClick={(e) => handleNavClick(e, 'services')}>{t('navServices')}</a></li>
            <li><a href="#reviews" onClick={(e) => handleNavClick(e, 'reviews')}>{t('navReviews')}</a></li>
            <li><a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>{t('navContact')}</a></li>
          </ul>
          <p className="copyright">{t('copyright')}</p>
        </div>
      </div>

      {/* Visual Confirmation Modal */}
      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal-content card animate-fade-in" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <h3>{t('formConfirmEmailTitle')}</h3>
            <p className="modal-desc">{t('formConfirmEmailDesc')}</p>
            <div className="confirm-email-display">
              {formData.email}
            </div>
            
            {formData.phone && (
              <div className="confirm-phone-display">
                <span>{t('formPhone').split(' (')[0]}:</span> <span className="phone-number-value" dir="ltr">{formData.phone}</span>
              </div>
            )}
            
            <div className="modal-actions">
              <button
                type="button"
                className="btn-primary confirm-btn"
                onClick={confirmSubmit}
              >
                {t('formConfirmYes')}
              </button>
              <button
                type="button"
                className="btn-outline-subtle cancel-btn"
                onClick={() => setShowConfirmModal(false)}
              >
                {t('formConfirmNo')}
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
