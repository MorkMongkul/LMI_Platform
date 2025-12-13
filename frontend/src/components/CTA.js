import React from 'react';
import '../styles/CTA.css';

const CTA = ({ openAuthModal }) => {
        return (
                <section className="cta" id="get-started">
                        <div className="container">
                                <h2>Ready to Transform Cambodia's Labor Market?</h2>
                                <p>Join students, universities, employers, and policymakers in making data-driven decisions for a better future.</p>
                                <button
                                        className="cta-button"
                                        onClick={openAuthModal}
                                        style={{ backgroundColor: '#ffd700', color: '#0057b8' }}
                                >
                                        Get Started With CLMI Today
                                </button>
                        </div>
                </section>
        );
};

export default CTA;