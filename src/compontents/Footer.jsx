import React from "react";
import {
  FaArrowRight,
  FaEnvelope,
  FaPhone,
  FaTiktok,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import logo from "../assets/img/logo.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <section className="marquee-section">
          <div className="marquee-container">
            <div className="marquee-content">
              <span className="marquee-text">
                Bring your vision to life—one frame at a time.
              </span>
              <span className="marquee-text">
                Bring your vision to life—one frame at a time.
              </span>
              <span className="marquee-text">
                Bring your vision to life—one frame at a time.
              </span>
            </div>
          </div>
        </section>
        <div className="footer-grid">
          <div className="logo-wrapper">
            <a href="./" className="logo-link">
              <img src={logo} alt="Title" className="logo-image" />
            </a>
          </div>
          <div className="footer-links">
            <h5>Quick links</h5>
            <a href="./#:S48s0AycK" className="footer-link">
              <FaArrowRight />
              <p>Projects</p>
            </a>
            <a href="./#about" className="footer-link">
              <FaArrowRight />
              <p>About</p>
            </a>
            <a href="./#services" className="footer-link">
              <FaArrowRight />
              <p>Services</p>
            </a>
            <a href="./#contact" className="footer-link">
              <FaArrowRight />
              <p>Contact</p>
            </a>
          </div>
          <div className="footer-links">
            <h5>Reach out</h5>
            <a
              href="mailto:yours@gmail.com"
              target="_blank"
              rel="noopener"
              className="footer-link"
            >
              <FaEnvelope />
              <p>yours@gmail.com</p>
            </a>
            <a
              href="tel:+123 456 789"
              target="_blank"
              rel="noopener"
              className="footer-link"
            >
              <FaPhone />
              <p>+123 456 789</p>
            </a>
          </div>
          <div className="footer-links">
            <h5>My socials</h5>
            <a
              href="https://www.tiktok.com/"
              target="_blank"
              rel="noopener"
              className="footer-link"
            >
              <FaTiktok />
              <p>TikTok</p>
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener"
              className="footer-link"
            >
              <FaInstagram />
              <p>Instagram</p>
            </a>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener"
              className="footer-link"
            >
              <FaYoutube />
              <p>Youtube</p>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
