import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <h2 className="logo">🌟 <span>MentorConnect</span></h2>
                        <p>Empowering growth through meaningful mentorship and coaching.</p>
                    </div>
                    <div className="footer-links">
                        <h3>Platform</h3>
                        <ul>
                            <li><a href="#features">Features</a></li>
                            <li><a href="#testimonials">Testimonials</a></li>
                            <li><a href="/login">Find a Mentor</a></li>
                        </ul>
                    </div>
                    <div className="footer-links">
                        <h3>Company</h3>
                        <ul>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} MentorConnect. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
