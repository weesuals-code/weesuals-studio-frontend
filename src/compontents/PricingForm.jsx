// Updated PricingForm.jsx with matching class names
import React, { useState, useMemo } from 'react';
import './PricingForm.scss';

const PricingForm = () => {
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

    // Calculate prices
    const { basePrice, adCost, totalPrice } = useMemo(() => {
        const videoCost = videoPricing[videosPerWeek] || 0;
        const postCost = postPricing[postsPerWeek] || 0;
        const base = videoCost + postCost;
        const adCost = includeAdManagement ? (base >= 4000 ? 0 : adManagementPrice) : 0;

        return {
            basePrice: base,
            adCost: adCost,
            totalPrice: base + adCost
        };
    }, [videosPerWeek, postsPerWeek, includeAdManagement]);

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
                        <p>Prețuri</p>
                    </div>
                    <h2>Calculator Prețuri</h2>
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
                                    <span className="price-display">{videoPricing[videosPerWeek]} RON</span>
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
                                    <span className="price-display">{postPricing[postsPerWeek]} RON</span>
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
                                        Management Anunțuri {basePrice >= 4000 ? (
                                            <span className="free-badge">GRATUIT</span>
                                        ) : (
                                            <span className="price-hint">(600 RON - GRATUIT peste 4000 RON)</span>
                                        )}
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="total-price">
                            <h3>Total: <span className="highlight">{totalPrice} RON</span></h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PricingForm;