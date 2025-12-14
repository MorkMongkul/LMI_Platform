import React, { useState, useEffect } from 'react';
import '../styles/Dashboard.css';
import '../styles/jobpages.css'

const JobsPage = () => {
        const [jobs, setJobs] = useState([]);
        const [filteredJobs, setFilteredJobs] = useState([]);
        const [loading, setLoading] = useState(true);
        const [activeFilters, setActiveFilters] = useState({
                location: 'All',
                industry: 'All',
                employmentType: 'All',
                experienceLevel: 'All'
        });

        // Define color scheme based on industry
        const industryColors = {
                'Agriculture': '#2E7D32',
                'NGO/Non-Profit': '#0288D1',
                'Banking/Finance': '#F57C00',
                'Hospitality/Tourism': '#7B1FA2',
                'Manufacturing': '#5D4037',
                'Real Estate': '#0097A7',
                'Education': '#C2185B',
                'E-commerce': '#D32F2F',
                'Media/Advertising': '#1976D2',
                'IT/Software': '#388E3C',
                'Transportation': '#5C6BC0',
                'Retail': '#FBC02D',
                'Construction': '#795548',
                'default': '#0057b8'
        };

        useEffect(() => {
                fetchJobs();
        }, []);

        const fetchJobs = async () => {
                try {
                        setLoading(true);
                        const response = await fetch('http://localhost:5001/api/jobs');
                        const data = await response.json();

                        if (data.success) {
                                const jobsData = data.data;
                                setJobs(jobsData);
                                setFilteredJobs(jobsData);
                        }
                } catch (error) {
                        console.error('Error fetching jobs:', error);
                } finally {
                        setLoading(false);
                }
        };

        // Get unique filters from jobs
        const locations = ['All', ...new Set(jobs.map(job => job.location))];
        const industries = ['All', ...new Set(jobs.map(job => job.industry))];
        const employmentTypes = ['All', ...new Set(jobs.map(job => job.employment_type))];
        const experienceLevels = ['All', ...new Set(jobs.map(job => job.experience_level))];

        // Filter jobs based on active filters
        useEffect(() => {
                const filtered = jobs.filter(job => {
                        if (activeFilters.location !== 'All' && job.location !== activeFilters.location) return false;
                        if (activeFilters.industry !== 'All' && job.industry !== activeFilters.industry) return false;
                        if (activeFilters.employmentType !== 'All' && job.employment_type !== activeFilters.employmentType) return false;
                        if (activeFilters.experienceLevel !== 'All' && job.experience_level !== activeFilters.experienceLevel) return false;
                        return true;
                });
                setFilteredJobs(filtered);
        }, [activeFilters, jobs]);

        const handleFilterChange = (filterType, value) => {
                setActiveFilters(prev => ({
                        ...prev,
                        [filterType]: value
                }));
        };

        const formatCurrency = (amount) => {
                return new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                }).format(amount);
        };

        const formatDate = (dateString) => {
                const date = new Date(dateString);
                return date.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                });
        };

        const getExperienceColor = (level) => {
                switch (level) {
                        case 'Entry Level': return '#4CAF50';
                        case 'Mid Level': return '#2196F3';
                        case 'Senior': return '#FF9800';
                        case 'Executive': return '#9C27B0';
                        default: return '#6c757d';
                }
        };

        const getEmploymentTypeColor = (type) => {
                switch (type) {
                        case 'Full-time': return '#0057b8';
                        case 'Part-time': return '#28a745';
                        case 'Contract': return '#ffc107';
                        case 'Internship': return '#dc3545';
                        default: return '#6c757d';
                }
        };

        return (
                <div className="jobs-container">
                        {/* Fixed Header Section */}
                        <div className="jobs-fixed-header">


                                {/* Filter Section */}
                                <div className="filters-container">
                                        <div className="filter-group">
                                                <i className="fas fa-map-marker-alt"></i>
                                                <select
                                                        value={activeFilters.location}
                                                        onChange={(e) => handleFilterChange('location', e.target.value)}
                                                        className="filter-select"
                                                >
                                                        <option value="All">All Locations</option>
                                                        {locations.filter(loc => loc !== 'All').map(location => (
                                                                <option key={location} value={location}>{location}</option>
                                                        ))}
                                                </select>
                                        </div>

                                        <div className="filter-group">
                                                <i className="fas fa-industry"></i>
                                                <select
                                                        value={activeFilters.industry}
                                                        onChange={(e) => handleFilterChange('industry', e.target.value)}
                                                        className="filter-select"
                                                >
                                                        <option value="All">All Industries</option>
                                                        {industries.filter(ind => ind !== 'All').map(industry => (
                                                                <option key={industry} value={industry}>{industry}</option>
                                                        ))}
                                                </select>
                                        </div>

                                        <div className="filter-group">
                                                <i className="fas fa-clock"></i>
                                                <select
                                                        value={activeFilters.employmentType}
                                                        onChange={(e) => handleFilterChange('employmentType', e.target.value)}
                                                        className="filter-select"
                                                >
                                                        <option value="All">All Types</option>
                                                        {employmentTypes.filter(type => type !== 'All').map(type => (
                                                                <option key={type} value={type}>{type}</option>
                                                        ))}
                                                </select>
                                        </div>

                                        <div className="filter-group">
                                                <i className="fas fa-chart-line"></i>
                                                <select
                                                        value={activeFilters.experienceLevel}
                                                        onChange={(e) => handleFilterChange('experienceLevel', e.target.value)}
                                                        className="filter-select"
                                                >
                                                        <option value="All">All Levels</option>
                                                        {experienceLevels.filter(level => level !== 'All').map(level => (
                                                                <option key={level} value={level}>{level}</option>
                                                        ))}
                                                </select>
                                        </div>
                                </div>
                        </div>

                        {/* Scrollable Content Area */}
                        <div className="jobs-content-area">
                                <div className="jobs-content-header">
                                        <h3>Available Jobs <span className="jobs-count">{filteredJobs.length}</span></h3>
                                </div>

                                {loading ? (
                                        <div className="loading-container">
                                                <div className="loading-spinner"></div>
                                                <p>Loading jobs...</p>
                                        </div>
                                ) : (
                                        <div className="jobs-grid">
                                                {filteredJobs.map(job => {
                                                        const industryColor = industryColors[job.industry] || industryColors.default;
                                                        const expColor = getExperienceColor(job.experience_level);
                                                        const empColor = getEmploymentTypeColor(job.employment_type);

                                                        return (
                                                                <div key={job.id} className="job-card">
                                                                        {/* Job Header */}
                                                                        <div className="job-header">
                                                                                <div className="job-title-section">
                                                                                        <h4>{job.title}</h4>
                                                                                        <div className="company-info">
                                                                                                <i className="fas fa-building"></i>
                                                                                                <span>{job.company}</span>
                                                                                        </div>
                                                                                </div>
                                                                                <div className="job-status">
                                                                                        <span
                                                                                                className={`status-badge ${job.is_active ? 'active' : 'inactive'}`}
                                                                                        >
                                                                                                {job.is_active ? 'Active' : 'Closed'}
                                                                                        </span>
                                                                                </div>
                                                                        </div>

                                                                        {/* Job Meta */}
                                                                        <div className="job-meta">
                                                                                <div className="meta-item">
                                                                                        <i className="fas fa-map-marker-alt"></i>
                                                                                        <span>{job.location}</span>
                                                                                </div>
                                                                                <div className="meta-item">
                                                                                        <i className="fas fa-calendar-alt"></i>
                                                                                        <span>{formatDate(job.posted_date)}</span>
                                                                                </div>
                                                                                <div className="meta-item">
                                                                                        <i className="fas fa-graduation-cap"></i>
                                                                                        <span>{job.degree_required === 'NaN' ? 'Any' : job.degree_required}</span>
                                                                                </div>
                                                                        </div>

                                                                        {/* Job Details */}
                                                                        <div className="job-details">
                                                                                <div className="detail-row">
                                                                                        <div className="detail-col">
                                                                                                <div className="detail-label">Experience</div>
                                                                                                <div className="detail-value" style={{ color: expColor }}>
                                                                                                        {job.experience_level}
                                                                                                </div>
                                                                                        </div>
                                                                                        <div className="detail-col">
                                                                                                <div className="detail-label">Type</div>
                                                                                                <div className="detail-value" style={{ color: empColor }}>
                                                                                                        {job.employment_type}
                                                                                                </div>
                                                                                        </div>
                                                                                        <div className="detail-col">
                                                                                                <div className="detail-label">Salary</div>
                                                                                                <div className="detail-value salary">
                                                                                                        {formatCurrency(job.salary_min)} - {formatCurrency(job.salary_max)}
                                                                                                </div>
                                                                                        </div>
                                                                                </div>

                                                                                <div className="industry-badge" style={{ background: industryColor }}>
                                                                                        {job.industry}
                                                                                </div>
                                                                        </div>

                                                                        {/* Skills Section */}
                                                                        <div className="job-skills">
                                                                                <div className="skills-label">
                                                                                        <i className="fas fa-tools"></i>
                                                                                        <span>Skills Required</span>
                                                                                </div>
                                                                                <div className="skills-tags">
                                                                                        {job.skills?.slice(0, 4).map((skill, index) => (
                                                                                                <span key={index} className="skill-tag">
                                                                                                        {skill}
                                                                                                </span>
                                                                                        ))}
                                                                                        {job.skills?.length > 4 && (
                                                                                                <span className="skill-tag more">
                                                                                                        +{job.skills.length - 4}
                                                                                                </span>
                                                                                        )}
                                                                                </div>
                                                                        </div>

                                                                        {/* Languages */}
                                                                        <div className="languages-section">
                                                                                <div className="languages-label">
                                                                                        <i className="fas fa-language"></i>
                                                                                        <span>Languages</span>
                                                                                </div>
                                                                                <div className="languages-text">
                                                                                        {job.languages_required}
                                                                                </div>
                                                                        </div>

                                                                        {/* Actions */}
                                                                        <div className="job-actions">
                                                                                <button className="view-btn">
                                                                                        <i className="fas fa-eye"></i>
                                                                                        View Details
                                                                                </button>
                                                                                <button className="save-btn">
                                                                                        <i className="far fa-bookmark"></i>
                                                                                </button>
                                                                        </div>
                                                                </div>
                                                        );
                                                })}
                                        </div>
                                )}

                                {!loading && filteredJobs.length === 0 && (
                                        <div className="no-results">
                                                <i className="fas fa-search"></i>
                                                <h4>No jobs found</h4>
                                                <p>Try adjusting your filters</p>
                                        </div>
                                )}
                        </div>
                </div>
        );
};

export default JobsPage;