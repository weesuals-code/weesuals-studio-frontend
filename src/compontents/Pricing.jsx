// Pricing.jsx
import React from "react";
import { FaCheck, FaRegArrowAltCircleRight } from "react-icons/fa";

function Pricing() {
  return (
    <section className="section pricing-section">
      <div className="pricing-container">
        <div className="pricing-header">
          <div className="section-tag">
            <div className="section-tag-inner">
              <div className="dot" />
              <p>Pricing</p>
            </div>
          </div>
          <h2 className="pricing-title">Simple, transparent pricing</h2>
        </div>
        <div className="pricing-cards">
          <div className="pricing-card short-form">
            <div className="card-top">
              <div className="section-tag">
                <div className="section-tag-inner">
                  <div className="dot" />
                  <p>Short-form video</p>
                </div>
              </div>
              <div className="price-wrapper">
                <div className="price-inner dark">
                  <h2>$40</h2>
                  <p>/video</p>
                </div>
              </div>
              <p className="description">Think reels, TikToks, and YouTube Shorts.</p>
            </div>
            <div className="features-list">
              <div className="feature-item">
                <div className="feature-icon dark-active">
                  <FaCheck />
                </div>
                <p>Up to 120 seconds duration</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon dark-active">
                  <FaCheck />
                </div>
                <p>Quick cuts, subtitles, transitions</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon dark-active">
                  <FaCheck />
                </div>
                <p>Licensed background music</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon dark-active">
                  <FaCheck />
                </div>
                <p>2 rounds of revisions</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon dark-active">
                  <FaCheck />
                </div>
                <p>3–5 day turnaround</p>
              </div>
            </div>
            <div className="button-wrapper">
              <a href="./#contact" className="hire-button primary">
                <div className="button-text-wrapper">
                  <p>Hire me</p>
                  <FaRegArrowAltCircleRight />
                </div>
              </a>
            </div>
          </div>
          <div className="pricing-card long-form">
            <div className="card-top">
              <div className="section-tag">
                <div className="section-tag-inner">
                  <div className="dot" />
                  <p>Long-form video</p>
                </div>
              </div>
              <div className="price-wrapper">
                <div className="price-inner light">
                  <h2>$100</h2>
                  <p>/video</p>
                </div>
              </div>
              <p className="description">Think YouTube videos, interviews, Podcasts, webinars.</p>
            </div>
            <div className="features-list">
              <div className="feature-item">
                <div className="feature-icon light-active">
                  <FaCheck />
                </div>
                <p>Up to 10 minutes duration</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon light-active">
                  <FaCheck />
                </div>
                <p>Sound mixing + clean cuts</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon light-active">
                  <FaCheck />
                </div>
                <p>Branded intro/outro</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon light-active">
                  <FaCheck />
                </div>
                <p>3 rounds of revisions</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon light-active">
                  <FaCheck />
                </div>
                <p>Delivery in 5–7 days</p>
              </div>
            </div>
            <div className="button-wrapper">
              <a href="./#contact" className="hire-button primary">
                <div className="button-text-wrapper">
                  <p>Hire me</p>
                  <FaRegArrowAltCircleRight />
                </div>
              </a>
            </div>
          </div>
          <div className="pricing-card regular-edits">
            <div className="card-wrapper">
              <h4 className="regular-title">Need regular edits?</h4>
              <p className="description">Whether it’s 4 videos or 20, I’ve got you.</p>
            </div>
            <div className="button-wrapper">
              <a href="./#contact" className="hire-button primary">
                <div className="button-text-wrapper">
                  <p>Contact</p>
                  <FaRegArrowAltCircleRight />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pricing;