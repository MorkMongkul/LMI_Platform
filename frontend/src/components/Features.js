import React from 'react';
import '../styles/Features.css';

const Features = () => {
        const features = [
                {
                        icon: "fas fa-chart-bar",
                        title: "Analytics Dashboard",
                        description: "Visualize job demand, skill trends, and sector growth with interactive charts and maps."
                },
                {
                        icon: "fas fa-robot",
                        title: "AI Career Chatbot",
                        description: "Get personalized skill and career recommendations based on your profile and market data."
                },
                {
                        icon: "fas fa-university",
                        title: "University Alignment",
                        description: "Compare university programs with market needs to guide curriculum development."
                },
                {
                        icon: "fas fa-database",
                        title: "Live Data Pipeline",
                        description: "Continuously updated job postings and program information from trusted sources."
                }
        ];

        return (
                <section className="features" id="features">
                        <div className="container">
                                <div className="section-title">
                                        <h2>Powerful Features for Smarter Decisions</h2>
                                        <p>CLMI provides comprehensive tools for students, universities, employers, and policymakers to navigate Cambodia's labor market.</p>
                                </div>
                                <div className="features-grid">
                                        {features.map((feature, index) => (
                                                <div className="feature-card" key={index}>
                                                        <div className="feature-icon">
                                                                <i className={feature.icon}></i>
                                                        </div>
                                                        <h3>{feature.title}</h3>
                                                        <p>{feature.description}</p>
                                                </div>
                                        ))}
                                </div>
                        </div>
                </section>
        );
};

export default Features;