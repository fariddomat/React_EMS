import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer id="footer" className="footer position-relative dark-background">
      <div className="container footer-top">
        <div className="row gy-4">
          {/* Footer About */}
          <div className="col-lg-4 col-md-6">
            <div className="footer-about">
              <Link to="/" className="logo sitename">EMS</Link>
              <div className="footer-contact pt-3">
                <p>123 Event Street</p>
                <p>Kafrram - Marmarita</p>
                <p className="mt-3"><strong>Phone:</strong> <span>+963 999 999 999</span></p>
                <p><strong>Email:</strong> <span>contact@ems.com</span></p>
              </div>
              {/* Social Links */}
              <div className="social-links d-flex mt-4">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-twitter"></i></a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-facebook"></i></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-instagram"></i></a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-linkedin"></i></a>
              </div>
            </div>
          </div>

          {/* Useful Links */}
          <div className="col-lg-2 col-md-4 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/events">Services</Link></li>
              <li><Link to="/companies">Companies</Link></li>
              <li><Link to="/contact-us">Contact Us</Link></li>
            </ul>
          </div>

        

          {/* Newsletter */}
          <div className="col-lg-4 col-md-12 footer-newsletter">
            <h4>Subscribe </h4>
            <p>Stay updated with the latest news and events happening with EMS2.</p>
           
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="container text-center mt-4">
        <p>© <strong>EMS</strong> 2024. All Rights Reserved.</p>
        <div className="credits">
          Designed by <a href="https://yourwebsite.com" target="_blank" rel="noopener noreferrer">EMS</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
