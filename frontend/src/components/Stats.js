import React from 'react';
import '../styles/Stats.css';

const Stats = () => {
        const stats = [
                { number: "10,000+", label: "Job Postings Analyzed" },
                { number: "100+", label: "University Programs Mapped" },
                { number: "AI-Powered", label: "Skill Recommendations" },
                { number: "Real-Time", label: "Market Analytics" }
        ];

        return (
                <section className="stats">
                        <div className="container stats-container">
                                {stats.map((stat, index) => (
                                        <div className="stat-item" key={index}>
                                                <div className="stat-number">{stat.number}</div>
                                                <div className="stat-label">{stat.label}</div>
                                        </div>
                                ))}
                        </div>
                </section>
        );
};

export default Stats;