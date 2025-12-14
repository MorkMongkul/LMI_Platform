import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboardheader.css'

const DashboardHeader = () => {
        const navigate = useNavigate();

        // Get user from localStorage
        const user = JSON.parse(localStorage.getItem('clmi_user') || '{}');

        const handleAIRecClick = () => {
                navigate('/dashboard/recommendations');
        };

        return (
                <header className="dashboard-header">
                        <div className="header-left">
                                <div className="clmi-logo">
                                        <i className="fas fa-chart-line clmi-logo-icon"></i>
                                        <div className="clmi-logo-text">
                                                <span className="clmi-logo-main">CLMI</span>
                                                <span className="clmi-platform-text">Platform</span>
                                        </div>
                                </div>
                        </div>

                        <div className="header-right">
                                <div className="welcome-user">
                                        <span className="welcome-text">Welcome,</span>
                                        <span className="user-name">{user.name || 'User'}</span>
                                </div>

                                <button
                                        className="ai-recommendation-btn"
                                        onClick={handleAIRecClick}
                                        title="Get AI Recommendations"
                                >
                                        <div className="ai-btn-icon">
                                                <i className="fas fa-robot"></i>
                                                <div className="ai-pulse"></div>
                                        </div>
                                        <span className="ai-btn-text">AI Rec</span>
                                </button>
                        </div>
                </header>
        );
};

export default DashboardHeader;