import React from 'react';
import '../styles/HowItWorks.css';

const HowItWorks = () => {
        const steps = [
                { number: 1, title: "Data Collection", description: "We gather job postings and university program data from multiple reliable sources across Cambodia." },
                { number: 2, title: "Processing & Analysis", description: "Data is cleaned, categorized, and analyzed to identify trends, gaps, and opportunities." },
                { number: 3, title: "Visualization", description: "Insights are presented in an intuitive dashboard with charts, graphs, and interactive tools." },
                { number: 4, title: "Recommendation", description: "AI-driven chatbot provides personalized advice for skills, careers, and educational paths." }
        ];

        return (
                <section className="how-it-works" id="how-it-works">
                        <div className="container">
                                <div className="section-title">
                                        <h2>How CLMI Platform Works</h2>
                                        <p>From data collection to actionable insights—see how CLMI transforms labor market information into intelligence.</p>
                                </div>
                                <div className="steps">
                                        {steps.map((step) => (
                                                <div className="step" key={step.number}>
                                                        <div className="step-number">{step.number}</div>
                                                        <h3>{step.title}</h3>
                                                        <p>{step.description}</p>
                                                </div>
                                        ))}
                                </div>
                        </div>
                </section>
        );
};

export default HowItWorks;