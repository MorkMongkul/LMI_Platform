import React from 'react';
import '../styles/Header.css';

const Header = ({ openAuthModal }) => {
        return (
                <header className="header">
                        <div className="container header-container">
                                <div className="logo">
                                        <i className="fas fa-chart-line"></i>
                                        <h1>CLMI <span>Platform</span></h1>
                                </div>
                                <nav>
                                        <ul>
                                                <li><a href="#home">Home</a></li>
                                                <li><a href="#features">Features</a></li>
                                                <li><a href="#how-it-works">How It Works</a></li>
                                                <li><a href="#about">About</a></li>
                                        </ul>
                                </nav>
                                <button className="cta-button" onClick={openAuthModal}>Get Started</button>
                        </div>
                </header>
        );
};



export default Header;

