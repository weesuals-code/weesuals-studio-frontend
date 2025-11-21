import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav>
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>

      <div className="links">
        <div className="link">
          <a href="#work">Proiecte</a>
        </div>
        <div className="link">
          <a href="#about">Despre noi</a>
        </div>
        <div className="link">
          <a href="#services">Servicii</a>
        </div>
        <div className="link blue">
          <a href="#contact">Contact</a>
        </div>
        {/* <div className="link admin">
          <Link to="/admin/login">Admin</Link>
        </div> */}
      </div>

      {/* Mobile menu button */}
      <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Mobile menu */}
      <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
        <div className="mobile-link">
          <a href="#work">Projects</a>
        </div>
        <div className="mobile-link">
          <a href="#about">About</a>
        </div>
        <div className="mobile-link">
          <a href="#services">Services</a>
        </div>
        <div className="mobile-link blue">
          <a href="#contact">CTA</a>
        </div>
        {/* <div className="mobile-link admin">
          <Link to="/admin/login">Admin</Link>
        </div> */}
      </div>
    </nav>
  );
}

export default Navbar;
