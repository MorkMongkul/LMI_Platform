import React from 'react';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';
import '../styles/Dashboard.css';

const DashboardLayout = ({ children }) => {
        return (
                <div className="dashboard-layout">
                        <Sidebar />
                        <div className="dashboard-content-area">
                                <DashboardHeader />
                                <main className="dashboard-main-content">
                                        {children}
                                </main>
                        </div>
                </div>
        );
};

export default DashboardLayout;