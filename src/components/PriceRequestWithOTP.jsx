import React, { useState, useEffect } from 'react';
import './PriceRequestWithOTP.scss';

const PriceRequestWithOTP = ({ onSuccess }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('enterPhone'); // 'enterPhone', 'enterOTP', 'success'
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!phoneNumber) {
      setError('Please enter a phone number');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/otp/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: `+${phoneNumber.replace(/\D/g, '')}` }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send OTP');
      }

      setStep('enterOTP');
      startCountdown(300); // 5 minutes countdown
    } catch (err) {
      setError(err.message || 'Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 4) {
      setError('Please enter a valid 4-digit OTP');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/otp/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          phoneNumber: `+${phoneNumber.replace(/\D/g, '')}`,
          otp 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to verify OTP');
      }

      setStep('success');
      onSuccess(data.sessionToken);
    } catch (err) {
      setError(err.message || 'Failed to verify OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const startCountdown = (seconds) => {
    setCountdown(seconds);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleResendOTP = (e) => {
    e.preventDefault();
    if (countdown > 0) return;
    handleSendOTP(e);
  };

  return (
    <div className="otp-verification">
      {step === 'enterPhone' && (
        <form onSubmit={handleSendOTP} className="otp-form">
          <h3>Verify Your Phone Number</h3>
          <p>We'll send a verification code to your phone number</p>
          
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <div className="phone-input">
              <span>+</span>
              <input
                id="phone"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                placeholder="e.g., 40712345678"
                required
              />
            </div>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" disabled={isLoading} className="btn-primary">
            {isLoading ? 'Sending...' : 'Send Verification Code'}
          </button>
        </form>
      )}

      {step === 'enterOTP' && (
        <form onSubmit={handleVerifyOTP} className="otp-form">
          <h3>Enter Verification Code</h3>
          <p>We've sent a 4-digit code to +{phoneNumber}</p>
          
          <div className="form-group">
            <label htmlFor="otp">Verification Code</label>
            <input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
              placeholder="1234"
              maxLength={4}
              required
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <div className="resend-otp">
            <span>Didn't receive a code? </span>
            <button 
              type="button" 
              onClick={handleResendOTP} 
              disabled={countdown > 0}
              className={`resend-btn ${countdown > 0 ? 'disabled' : ''}`}
            >
              {countdown > 0 ? `Resend in ${formatTime(countdown)}` : 'Resend Code'}
            </button>
          </div>
          
          <button type="submit" disabled={isLoading} className="btn-primary">
            {isLoading ? 'Verifying...' : 'Verify Code'}
          </button>
        </form>
      )}

      {step === 'success' && (
        <div className="success-message">
          <h3>✓ Phone Number Verified</h3>
          <p>Your phone number has been successfully verified.</p>
        </div>
      )}
    </div>
  );
};

export default PriceRequestWithOTP;
