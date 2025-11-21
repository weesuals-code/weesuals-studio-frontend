import React from "react";
import {
  FaArrowRight,
  FaEnvelope,
  FaPhone,
  FaTiktok,
  FaInstagram,
  FaYoutube,
  FaFacebook,
  FaLinkedin,
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
                Conținut făcut cu grijă. Pentru branduri reale.
              </span>
              <span className="marquee-text">
                Conținut făcut cu grijă. Pentru branduri reale.
              </span>
              <span className="marquee-text">
                Conținut făcut cu grijă. Pentru branduri reale.
              </span>
            </div>
          </div>
        </section>
        <div className="footer-grid">
          <div className="logo-wrapper">
            <a href="./" className="logo-link">
              <img src={logo} alt="Title" className="logo-image" />
            </a>
            <p>Partenerul tău pentru marketing și content.</p>

          </div>
          <div className="footer-links">
            <h5>Pagini </h5>
            <a href="#work" className="footer-link">
              <FaArrowRight />
              <p>Proiecte</p>
            </a>
            <a href="#about" className="footer-link">
              <FaArrowRight />
              <p>Despre noi</p>
            </a>
            <a href="#services" className="footer-link">
              <FaArrowRight />
              <p>Servicii</p>
            </a>
            <a href="#contact" className="footer-link">
              <FaArrowRight />
              <p>Contact</p>
            </a>
          </div>
          <div className="footer-links">
            <h5>Contact</h5>
            <a
              href="mailto:weesualsstudio@gmail.com"
              target="_blank"
              rel="noopener"
              className="footer-link"
            >
              <FaEnvelope />
              <p>weesualsstudio@gmail.com</p>
            </a>
            <a
              href="tel:+40 741 791 013"
              target="_blank"
              rel="noopener"
              className="footer-link"
            >
              <FaPhone />
              <p>+40 741 791 013</p>
            </a>
          </div>
          <div className="footer-links">
            <h5>Social media</h5>
            <a
              href="https://www.tiktok.com/@weesuals.studio"
              target="_blank"
              rel="noopener"
              className="footer-link"
            >
              <FaTiktok />
              <p>TikTok</p>
            </a>
            <a
              href="https://www.instagram.com/weesuals.studio"
              target="_blank"
              rel="noopener"
              className="footer-link"
            >
              <FaInstagram />
              <p>Instagram</p>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61565831338527"
              target="_blank"
              rel="noopener"
              className="footer-link"
            >
              <FaFacebook />
              <p>Facebook</p>
            </a> <a
              href="https://ro.linkedin.com/company/weesuals-studio?trk=public_jobs_topcard-org-name"
              target="_blank"
              rel="noopener"
              className="footer-link"
            >
              <FaLinkedin />
              <p>Linkedin</p>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
