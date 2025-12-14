import React from 'react';

const SkillsPage = () => {
        return (
                <div className="page-content">
                        <h2>Skills Analysis</h2>
                        <p>Analyze your skills and identify gaps with market requirements.</p>

                        <div className="skills-section">
                                <div className="skill-category">
                                        <h3>Technical Skills</h3>
                                        <div className="skill-bars">
                                                <div className="skill-bar">
                                                        <span>JavaScript</span>
                                                        <div className="bar-container">
                                                                <div className="bar" style={{ width: '85%', background: '#0057b8' }}></div>
                                                        </div>
                                                        <span>85%</span>
                                                </div>
                                                <div className="skill-bar">
                                                        <span>React</span>
                                                        <div className="bar-container">
                                                                <div className="bar" style={{ width: '75%', background: '#0057b8' }}></div>
                                                        </div>
                                                        <span>75%</span>
                                                </div>
                                                <div className="skill-bar">
                                                        <span>Python</span>
                                                        <div className="bar-container">
                                                                <div className="bar" style={{ width: '60%', background: '#0057b8' }}></div>
                                                        </div>
                                                        <span>60%</span>
                                                </div>
                                        </div>
                                </div>

                                <div className="skill-category">
                                        <h3>Soft Skills</h3>
                                        <div className="skill-bars">
                                                <div className="skill-bar">
                                                        <span>Communication</span>
                                                        <div className="bar-container">
                                                                <div className="bar" style={{ width: '90%', background: '#ffc107' }}></div>
                                                        </div>
                                                        <span>90%</span>
                                                </div>
                                                <div className="skill-bar">
                                                        <span>Leadership</span>
                                                        <div className="bar-container">
                                                                <div className="bar" style={{ width: '70%', background: '#ffc107' }}></div>
                                                        </div>
                                                        <span>70%</span>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>
        );
};

export default SkillsPage;