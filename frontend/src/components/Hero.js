import React from 'react';
import '../styles/Hero.css';

const Hero = ({ openAuthModal }) => {
        return (
                <section className="hero" id="home">
                        <div className="container hero-container">
                                <div className="hero-content">
                                        <h2>Find Your Perfect Career Path With AI-Powered Insights</h2>
                                        <p>The Cambodia Labor Market Intelligence Platform (CLMI) bridges the gap between education and employment by providing data-driven insights on job demand, skill trends, and educational alignment.</p>
                                        <button className="cta-button" onClick={openAuthModal}>
                                                Explore Dashboard <i className="fas fa-arrow-right"></i>
                                        </button>
                                </div>
                                <div className="hero-image">
                                        <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="CLMI Dashboard Preview" />
                                </div>
                        </div>
                </section>
        );
};

export default Hero;