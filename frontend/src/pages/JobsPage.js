import React, { useState, useEffect } from 'react';
import '../styles/Dashboard.css';

const JobsPage = () => {
        const [jobs, setJobs] = useState([]);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
                // Fetch jobs from your API
                fetch('http://localhost:5001/api/jobs')
                        .then(response => response.json())
                        .then(data => {
                                if (data.success) {
                                        setJobs(data.data.slice(0, 10)); // Show first 10 jobs
                                }
                                setLoading(false);
                        })
                        .catch(error => {
                                console.error('Error fetching jobs:', error);
                                setLoading(false);
                        });
        }, []);

        return (
                <div className="jobs-page">
                        <div className="page-header">
                                <h2>Jobs Dashboard</h2>
                                <p className="subtitle">Browse job market data from Cambodia</p>
                        </div>

                        <div className="stats-cards">
                                <div className="stat-card" style={{ background: '#0057b8' }}>
                                        <i className="fas fa-briefcase"></i>
                                        <div>
                                                <h3>10,000+</h3>
                                                <p>Total Jobs</p>
                                        </div>
                                </div>
                                <div className="stat-card" style={{ background: '#28a745' }}>
                                        <i className="fas fa-chart-line"></i>
                                        <div>
                                                <h3>25%</h3>
                                                <p>Growth Rate</p>
                                        </div>
                                </div>
                                <div className="stat-card" style={{ background: '#ffc107' }}>
                                        <i className="fas fa-dollar-sign"></i>
                                        <div>
                                                <h3>$2,500</h3>
                                                <p>Avg. Salary</p>
                                        </div>
                                </div>
                        </div>

                        <div className="jobs-list">
                                <h3>Recent Job Postings</h3>
                                {loading ? (
                                        <div className="loading">Loading jobs...</div>
                                ) : (
                                        <div className="jobs-grid">
                                                {jobs.map(job => (
                                                        <div key={job.id} className="job-card">
                                                                <div className="job-header">
                                                                        <h4>{job.title}</h4>
                                                                        <span className="company">{job.company}</span>
                                                                </div>
                                                                <div className="job-details">
                                                                        <p><i className="fas fa-map-marker-alt"></i> {job.location}</p>
                                                                        <p><i className="fas fa-money-bill-wave"></i> ${job.salary_min} - ${job.salary_max}</p>
                                                                        <p><i className="fas fa-industry"></i> {job.industry}</p>
                                                                </div>
                                                                <div className="job-skills">
                                                                        {job.skills?.slice(0, 3).map((skill, index) => (
                                                                                <span key={index} className="skill-tag">{skill}</span>
                                                                        ))}
                                                                </div>
                                                        </div>
                                                ))}
                                        </div>
                                )}
                        </div>
                </div>
        );
};

export default JobsPage;