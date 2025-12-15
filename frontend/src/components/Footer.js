import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
        return (
                <footer className="footer">
                        <div className="container footer-container">
                                <div className="footer-column">
                                        <h3>CLMI Platform</h3>
                                        <p>Cambodia Labor Market Intelligence Platform—bridging education and employment through data.</p>

                                </div>

                                <div className="footer-column">
                                        <h3>Contact & Support</h3>
                                        <ul>
                                                <li><i className="fas fa-envelope"></i> contact@clmi-kh.org</li>
                                                <li><i className="fas fa-map-marker-alt"></i> Faculty of Data Science, Cambodia</li>
                                                <li><i className="fas fa-calendar"></i> MVP Launch: Week 13, 2025</li>
                                        </ul>
                                </div>
                                <div className="footer-column">
                                        <h3>Our Member</h3>
                                        <ul>
                                                <li>MORK Mongkul</li>
                                                <li>PHALLY Makara</li>
                                                <li>HOUN Sithai</li>
                                                <li>PICH Daraphal</li>
                                                <li>ING Vitouratanak</li>
                                        </ul>
                                </div>
                        </div>
                        <div className="copyright">
                                <p>&copy; 2025 Cambodia Labor Market Intelligence Platform (CLMI). All rights reserved.</p>
                        </div>
                </footer>
        );
};

export default Footer;