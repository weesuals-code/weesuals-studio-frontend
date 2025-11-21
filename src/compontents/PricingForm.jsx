import React, { useState, useMemo, useEffect, useRef } from 'react';
import './PricingForm.scss';
import '../components/PriceRequestWithOTP.scss';
import emailjs from '@emailjs/browser';

const PhoneVerificationModal = ({ 
  isOpen, 
  onClose, 
  onVerify, 
  price,
  videosPerWeek,
  postsPerWeek,
  includeAdManagement,
  videoPricing,
  postPricing,
  adManagementPrice
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [step, setStep] = useState('phone'); // 'phone' or 'otp' or 'success'
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState({ text: '', isError: false });
  const otpInputs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // Reset all state when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setPhoneNumber('');
      setOtp(['', '', '', '']);
      setStep('phone');
      setIsLoading(false);
      setError('');
      setMessage({ text: '', isError: false });
    }
  }, [isOpen]);

  // Generate a unique session ID for each device
  const getOrCreateSessionId = () => {
    let sessionId = localStorage.getItem('pricingFormSessionId');
    if (!sessionId) {
      sessionId = 'session-' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('pricingFormSessionId', sessionId);
    }
    return sessionId;
  };

  // Check if the user has to wait before making another request
  const checkRateLimit = () => {
    const sessionId = getOrCreateSessionId();
    const lastRequestTime = localStorage.getItem(`lastRequestTime_${sessionId}`);
    
    if (lastRequestTime) {
      const timeSinceLastRequest = Date.now() - parseInt(lastRequestTime, 10);
      const FIVE_MINUTES = 5 * 60 * 1000; // 5 minutes in milliseconds
      
      if (timeSinceLastRequest < FIVE_MINUTES) {
        const timeLeft = Math.ceil((FIVE_MINUTES - timeSinceLastRequest) / 1000);
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        setError(`Vă rugăm așteptați ${minutes}m ${seconds}s înainte de a trimite din nou.`);
        return false;
      }
    }
    return true;
  };

  // Update the last request time in localStorage
  const updateRateLimit = () => {
    const sessionId = getOrCreateSessionId();
    localStorage.setItem(`lastRequestTime_${sessionId}`, Date.now().toString());
  };

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    
    // Check rate limit before proceeding
    if (!checkRateLimit()) {
      return;
    }

    const raw = phoneNumber.replace(/\D/g, ''); // doar cifre

    if (!raw) {
      setError('Vă rugăm introduceți un număr de telefon valid');
      return;
    }

    // Validare lungime număr
    if (raw.length < 9 || raw.length > 11) {
      setError('Numărul de telefon pare incorect');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Update the rate limit timestamp
      updateRateLimit();
      
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/otp/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Session-ID': getOrCreateSessionId() // Send session ID with the request
        },
        body: JSON.stringify({ 
          phoneNumber: raw,
          userData: {
            videosPerWeek,
            postsPerWeek,
            includeAdManagement,
            videoCost: videoPricing[videosPerWeek],
            postCost: postPricing[postsPerWeek],
            adCost: includeAdManagement ? (videosPerWeek * videoPricing[videosPerWeek] + postsPerWeek * postPricing[postsPerWeek] >= 4000 ? 0 : adManagementPrice) : 0,
            totalPrice: videosPerWeek * videoPricing[videosPerWeek] + postsPerWeek * postPricing[postsPerWeek] + 
                      (includeAdManagement ? (videosPerWeek * videoPricing[videosPerWeek] + postsPerWeek * postPricing[postsPerWeek] >= 4000 ? 0 : adManagementPrice) : 0),
            requestedAt: new Date().toISOString(),
            sessionId: getOrCreateSessionId() // Include session ID in the user data
          }
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send OTP');
      }

      setStep('otp');
      setMessage({ 
        text: `Am trimis un cod de verificare pe numărul introdus`, 
        isError: false 
      });
    } catch (error) {
      setError(error.message || 'A apărut o eroare. Vă rugăm să încercați din mai târziu.');
    } finally {
      setIsLoading(false);
    }
};


  const handleOtpChange = (index, value) => {
    if (value && !/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only take the last character
    
    // Only update state if we have a valid single digit or empty string
    if (value === '' || /^\d$/.test(value)) {
      setOtp(newOtp);
      
      // Auto focus to next input or submit if last digit
      if (value && index < 3) {
        otpInputs[index + 1].current.focus();
      } else if (index === 3 && value) {
        // Auto-submit when last digit is entered
        const form = otpInputs[0].current.closest('form');
        if (form) {
          // Use setTimeout to ensure state is updated before submit
          setTimeout(() => {
            const finalOtp = [...newOtp];
            if (finalOtp.every(digit => /^\d$/.test(digit))) {
              form.requestSubmit();
            }
          }, 10);
        }
      }
    }
  };
  
  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      otpInputs[index - 1].current.focus();
    }
  };

  const handleOtpSubmit = async (e) => {
    e && e.preventDefault();
    const otpString = otp.join('');
    
    // Only validate length if we're not in the middle of auto-submit
    if (e && otpString.length !== 4) {
      setError('Vă rugăm introduceți un cod de 4 cifre');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Verify OTP
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/otp/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          phoneNumber,   // << FĂRĂ +
          otp 
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Invalid verification code');
      }
      
      // On successful verification
      setStep('success');
      onVerify(phoneNumber);
    } catch (error) {
      setError(error.message || 'Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>&times;</button>
        
        {step === 'phone' && (
          <div className="verification-step">
            <h2>Verifică-ți numărul de telefon</h2>
            <p className="verification-subtitle">Vom trimite un cod de verificare pe telefonul tău</p>
            
            <form onSubmit={handlePhoneSubmit} className="verification-form">
              <div className="form-group">
                <label className="form-label">Număr de telefon (fără prefixul +40)</label>
                <div className="phone-input">
                  <span className="phone-prefix">+40</span>
                 <input
  type="tel"
  value={phoneNumber}
  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
  placeholder="ex: 712345678"
  disabled={isLoading}
  required
  className="form-control"
/>
                </div>
              </div>
              
              {error && <div className="error-message">{error}</div>}
              
              <button type="submit" disabled={isLoading} className="btn btn-primary">
                {isLoading ? 'Se trimite...' : 'Trimite codul de verificare'}
              </button>
            </form>
          </div>
        )}
        
        {step === 'otp' && (
          <div className="verification-step">
            <h2>Introdu codul de verificare</h2>
            <p className="verification-subtitle">{message.text || 'Am trimis un cod de verificare'}</p>
            
            <form onSubmit={handleOtpSubmit} className="verification-form">
              <div className="form-group">
                <label className="form-label">Cod de verificare</label>
                <div className="otp-container">
                  {[0, 1, 2, 3].map((index) => (
                    <input
                      key={index}
                      ref={otpInputs[index]}
                      type="text"
                      value={otp[index] || ''}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      maxLength={1}
                      disabled={isLoading}
                      required
                      className="otp-input"
                      inputMode="numeric"
                      pattern="\d*"
                      autoFocus={index === 0 && !otp[0]}
                    />
                  ))}
                </div>
              </div>
              
              {error && <div className="error-message">{error}</div>}
              
              <button type="submit" disabled={isLoading} className="btn btn-primary">
                {isLoading ? 'Se verifică...' : 'Verifică codul'}
              </button>
              
              <button 
                type="button" 
                className="btn btn-link"
                onClick={() => {
                  setOtp(['', '', '', '']);
                  setStep('phone');
                }}
                disabled={isLoading}
              >
                Schimbă numărul de telefon
              </button>
            </form>
          </div>
        )}
        
        {step === 'success' && (
          <div className="verification-step success-message">
            <h2>Prețul tău personalizat</h2>
            <div className="price-display">
              <span className="price">{price} €</span>
              <span className="price-note">pe lună</span>
            </div>
            <p>Mulțumim că ai verificat numărul de telefon!</p>
            <div className="success-actions">
              <button 
                onClick={onClose} 
                className="btn btn-primary"
              >
                Închide
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const PricingForm = () => {
  // Initialize EmailJS when component mounts
  useEffect(() => {
    if (process.env.REACT_APP_EMAILJS_PUBLIC_KEY) {
      emailjs.init(process.env.REACT_APP_EMAILJS_PUBLIC_KEY);
    } else {
      console.warn('EmailJS public key is not set. Emails will not be sent.');
    }
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
    // Pricing data
    const videoPricing = {
        1: 1500,
        2: 2200,
        3: 3000,
        4: 4000,
        5: 4600,
        6: 5000,
        7: 5400
    };

    const postPricing = {
        1: 500,
        2: 900,
        3: 1200,
        4: 1400,
        5: 1600,
        6: 1800,
        7: 2000
    };

    const adManagementPrice = 600;

    // State
    const [videosPerWeek, setVideosPerWeek] = useState(1);
    const [postsPerWeek, setPostsPerWeek] = useState(1);
    const [includeAdManagement, setIncludeAdManagement] = useState(false);

    // Calculate prices (kept for submission, not displayed)
    const { basePrice, adCost, totalPrice, videoCost, postCost } = useMemo(() => {
        const videoCost = videoPricing[videosPerWeek] || 0;
        const postCost = postPricing[postsPerWeek] || 0;
        const base = videoCost + postCost;
        const adCost = includeAdManagement ? (base >= 4000 ? 0 : adManagementPrice) : 0;

        return {
            videoCost,
            postCost,
            basePrice: base,
            adCost: adCost,
            totalPrice: base + adCost
        };
    }, [videosPerWeek, postsPerWeek, includeAdManagement]);

    const handleGetPrice = async (email, userPhoneNumber) => {
      try {
        // First, get the token and price URL from our backend
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/price-request`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            phoneNumber: userPhoneNumber,
            priceData: {
              videosPerWeek,
              postsPerWeek,
              includeAdManagement,
              videoCost: videoPricing[videosPerWeek],
              postCost: postPricing[postsPerWeek],
              adCost: includeAdManagement ? (basePrice >= 4000 ? 0 : adManagementPrice) : 0,
              totalPrice,
              requestedAt: new Date().toISOString()
            }
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to process price request');
        }

        const { token, priceUrl } = await response.json();

        // Send email using EmailJS
        const templateParams = {
          to_email: email,
          price_url: priceUrl,
          from_name: 'Weesuals',
          to_name: email.split('@')[0],
          reply_to: 'no-reply@weesuals.com',
          message: `Here's your custom price quote from Weesuals. Click the link to view your personalized pricing.`
        };

        await emailjs.send(
          process.env.REACT_APP_EMAILJS_SERVICE_ID,
          process.env.REACT_APP_EMAILJS_PRICE_TEMPLATE_ID,
          templateParams,
        );

        // Save phone number for potential future use
        if (userPhoneNumber) {
          setPhoneNumber(userPhoneNumber);
        }

        return { success: true };
      } catch (error) {
        console.error('Error processing price request:', error);
        throw error;
      }
    };

    // Generate options for select inputs
    const renderOptions = (count) => {
        return Array.from({ length: 7 }, (_, i) => i + 1).map(num => {
            const label = count === 'videos'
                ? `${num} ${num === 1 ? 'videoclip' : 'videoclipuri'}/săptămână`
                : `${num} ${num === 1 ? 'postare' : 'postări'}/săptămână`;

            return (
                <option key={num} value={num}>
                    {label}
                </option>
            );
        });
    };

    return (
        <section className="pricing-form">
            <div className="form-container">
                <div className="form-header">
                    <div className="how-tag">
                        <div className="dot"></div>
                        <p>Costuri</p>
                    </div>
                    <h2>Calculator de costuri</h2>
                    <p style={{color:" #b8b8b8",
    fontSize: "20px",
    fontWeight: 500,
    lineHeight: 1.2,
    margin: "10px 0 0 0",
    letterSpacing: "-0.5px"
}}>Alege serviciile de care ai nevoie și vezi instant cât te costă colaborarea cu noi.
</p>
                </div>

                <div className="contact-content">
                    <div className="form-grid">
                        <div className="form-group">
                            <label className="form-label">
                                <span className="label-text">Editare Video</span>
                                <div className="form-input">
                                    <select 
                                        value={videosPerWeek}
                                        onChange={(e) => setVideosPerWeek(parseInt(e.target.value))}
                                    >
                                        {renderOptions('videos')}
                                    </select>
                                </div>
                            </label>
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                <span className="label-text">Postări pe Rețele Sociale</span>
                                <div className="form-input">
                                    <select 
                                        value={postsPerWeek}
                                        onChange={(e) => setPostsPerWeek(parseInt(e.target.value))}
                                    >
                                        {renderOptions('posts')}
                                    </select>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="form-label">
                            <span className="label-text">Servicii Adiționale</span>
                            <div className="radio-options">
                                <label className="radio-option">
                                    <input 
                                        type="checkbox"
                                        checked={includeAdManagement}
                                        onChange={(e) => setIncludeAdManagement(e.target.checked)}
                                    />
                                    <span className="radio-label">
                                        Add Management
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="form-group find-price-container">
                        <button 
                            className={`find-price-btn ${!(videosPerWeek > 0 || postsPerWeek > 0) ? 'disabled' : ''}`}
                            onClick={() => setIsModalOpen(true)}
                            disabled={!(videosPerWeek > 0 || postsPerWeek > 0)}
                        >
                            Find Price
                        </button>
                    </div>
                    
                    <PhoneVerificationModal
                        key={videosPerWeek + '-' + postsPerWeek + '-' + includeAdManagement}
                        isOpen={isModalOpen}
                        onClose={() => {
                            setIsModalOpen(false);
                        }}
                        onVerify={(phoneNumber) => {
                            // This will be called when OTP verification is successful
                            // The parent component will handle the form submission
                            console.log('Phone number verified:', phoneNumber);
                            // The actual form submission is handled by the parent's onVerify callback
                        }}
                        price={totalPrice}
                        videosPerWeek={videosPerWeek}
                        postsPerWeek={postsPerWeek}
                        includeAdManagement={includeAdManagement}
                        videoPricing={videoPricing}
                        postPricing={postPricing}
                        adManagementPrice={adManagementPrice}
                    />
                </div>
            </div>
        </section>
    );
};

export default PricingForm;