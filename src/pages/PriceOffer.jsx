import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PriceOffer.scss';

const PriceOffer = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [offer, setOffer] = useState(null);

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/price-offer/${token}`);
        if (response.data.success && response.data.offer) {
          setOffer({
            ...response.data.offer,
            // Ensure createdAt is a valid date string
            createdAt: response.data.offer.createdAt || new Date().toISOString()
          });
        } else {
          throw new Error('Invalid offer data received');
        }
      } catch (err) {
        console.error('Error fetching offer:', err);
        setError(err.response?.data?.error || 'Failed to load price offer');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchOffer();
    } else {
      setError('No token provided');
      setLoading(false);
    }
  }, [token]);

  if (loading) {
    return (
      <div className="price-offer-loading">
        <div className="spinner"></div>
        <p>Loading your price quote...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="price-offer-error">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/')} className="back-button">
          Back to Home
        </button>
      </div>
    );
  }

  if (!offer) {
    return (
      <div className="price-offer-error">
        <h2>Offer Not Found</h2>
        <p>{error || 'We couldn\'t find the price quote you\'re looking for.'}</p>
        <button onClick={() => navigate('/')} className="back-button">
          Back to Home
        </button>
      </div>
    );
  }

  const { priceData } = offer;
  const { videosPerWeek, postsPerWeek, includeAdManagement, videoCost, postCost, adCost, totalPrice } = priceData;

  return (
    <div className="price-offer-container">
      <div className="price-offer-card">
        <h1>Your Custom Price Quote</h1>
        <p className="offer-valid">This quote is valid for 24 hours</p>
        
        <div className="price-details">
          <div className="price-row">
            <span>Video Editing ({videosPerWeek} {videosPerWeek === 1 ? 'video' : 'videos'}/week)</span>
            <span>{videoCost} RON</span>
          </div>
          
          <div className="price-row">
            <span>Social Media Posts ({postsPerWeek} {postsPerWeek === 1 ? 'post' : 'posts'}/week)</span>
            <span>{postCost} RON</span>
          </div>
          
          {includeAdManagement && (
            <div className="price-row highlight">
              <span>Ad Management {adCost === 0 && '(Free for orders over 4000 RON)'}</span>
              <span>{adCost === 0 ? 'FREE' : `${adCost} RON`}</span>
            </div>
          )}
          
          <div className="divider"></div>
          
          <div className="price-row total">
            <span>Total Price (RON)</span>
            <span>{totalPrice} RON</span>
          </div>
        </div>
        
        <div className="cta-section">
          <p>Ready to get started? Contact us to book your package!</p>
          <button 
            onClick={() => navigate('/#contact')} 
            className="contact-button"
          >
            Contact Us
          </button>
        </div>
        
        <div className="disclaimer">
          <p>This is an automatically generated quote. Final pricing may vary based on specific requirements.</p>
          <p>Quote generated on: {new Date(offer.createdAt?.toDate ? offer.createdAt.toDate() : offer.createdAt || new Date()).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default PriceOffer;
