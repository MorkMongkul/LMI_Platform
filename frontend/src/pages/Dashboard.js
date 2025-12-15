import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import JobsPage from './JobsPage';
import RecommendationsPage from './RecommendationsPage';
import SkillsPage from './SkillsPage';
import UniversityPage from './UniversityPage';
import '../styles/Dashboard.css';

const Dashboard = () => {
        return (
                <div className="dashboard-container">
                        <DashboardLayout>
                                <Routes>
                                        <Route index element={<JobsPage />} />
                                        <Route path="jobs" element={<JobsPage />} />
                                        <Route path="recommendations" element={<RecommendationsPage />} />
                                        <Route path="skills" element={<SkillsPage />} />
                                        <Route path="university" element={<UniversityPage />} />
                                </Routes>
                        </DashboardLayout>
                </div>
        );
};

export default Dashboard;