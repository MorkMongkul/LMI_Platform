import React, { useState, useEffect, useRef } from 'react';
import '../styles/skillPages.css';
import '../styles/jobpages.css';

const JobsPage = () => {
        const [jobs, setJobs] = useState([]);
        const [loading, setLoading] = useState(true);
        const [sortBy, setSortBy] = useState('posted_date');
        const [location, setLocation] = useState('All');
        const [industry, setIndustry] = useState('All');
        const [employmentType, setEmploymentType] = useState('All');
        const [experienceLevel, setExperienceLevel] = useState('All');
        const [isFilterVisible, setIsFilterVisible] = useState(true);
        const lastScrollY = useRef(0);

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

        useEffect(() => {
                const handleScroll = () => {
                        const currentScrollY = window.scrollY;

                        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                                setIsFilterVisible(false);
                        } else if (currentScrollY < lastScrollY.current) {
                                setIsFilterVisible(true);
                        }

                        lastScrollY.current = currentScrollY;
                };

                window.addEventListener('scroll', handleScroll, { passive: true });
                return () => window.removeEventListener('scroll', handleScroll);
        }, []);

        const fetchJobs = async () => {
                try {
                        setLoading(true);
                        const response = await fetch('http://localhost:5001/api/jobs');
                        const data = await response.json();

                        if (data.success) {
                                setJobs(data.data);
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

        // Filter and sort jobs
        const filteredJobs = jobs
                .filter(job => {
                        if (location !== 'All' && job.location !== location) return false;
                        if (industry !== 'All' && job.industry !== industry) return false;
                        if (employmentType !== 'All' && job.employment_type !== employmentType) return false;
                        if (experienceLevel !== 'All' && job.experience_level !== experienceLevel) return false;
                        return true;
                })
                .sort((a, b) => {
                        if (sortBy === 'title') {
                                return a.title.localeCompare(b.title);
                        } else if (sortBy === 'salary') {
                                return (b.salary_min + b.salary_max) - (a.salary_min + a.salary_max);
                        }
                        // Default sort by posted date (newest first)
                        return new Date(b.posted_date) - new Date(a.posted_date);
                });

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

        // Calculate max salary for progress bar
        const maxSalary = jobs.length > 0 ? Math.max(...jobs.map(job => job.salary_max)) : 0;

        return (
                <div className="skills-container">
                        {/* Fixed Header */}
                        <div className={`skills-fixed-header ${isFilterVisible ? 'visible' : 'hidden'}`}>
                                {/* Combined Filters in One Column */}
                                <div className="skills-filters">
                                        <div className="filter-section">
                                                {/* Combined Filter Group */}
                                                <div className="combined-filter-group">
                                                        {/* Filter Rows with Select Dropdowns */}
                                                        <div className="filter-row">
                                                                <div className="filter-group">
                                                                        <i className="fas fa-map-marker-alt"></i>
                                                                        <select
                                                                                value={location}
                                                                                onChange={(e) => setLocation(e.target.value)}
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
                                                                                value={industry}
                                                                                onChange={(e) => setIndustry(e.target.value)}
                                                                                className="filter-select"
                                                                        >
                                                                                <option value="All">All Industries</option>
                                                                                {industries.filter(ind => ind !== 'All').map(industry => (
                                                                                        <option key={industry} value={industry}>{industry}</option>
                                                                                ))}
                                                                        </select>
                                                                </div>
                                                        </div>

                                                        <div className="filter-row">
                                                                <div className="filter-group">
                                                                        <i className="fas fa-clock"></i>
                                                                        <select
                                                                                value={employmentType}
                                                                                onChange={(e) => setEmploymentType(e.target.value)}
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
                                                                                value={experienceLevel}
                                                                                onChange={(e) => setExperienceLevel(e.target.value)}
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

                                                {/* Compact Sort Options */}
                                                <div className="sort-group">
                                                        <div className="sort-options">
                                                                <button
                                                                        className={`sort-btn ${sortBy === 'posted_date' ? 'active' : ''}`}
                                                                        onClick={() => setSortBy('posted_date')}
                                                                >
                                                                        <i className="fas fa-clock"></i>
                                                                        Recent
                                                                </button>
                                                                <button
                                                                        className={`sort-btn ${sortBy === 'title' ? 'active' : ''}`}
                                                                        onClick={() => setSortBy('title')}
                                                                >
                                                                        <i className="fas fa-sort-alpha-down"></i>
                                                                        Title
                                                                </button>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>

                        {/* Scrollable Content */}
                        <div className="skills-content-area">
                                <div className="skills-list">
                                        <div className="list-header">
                                                <h3>
                                                        <i className="fas fa-briefcase"></i>
                                                        Job Opportunities
                                                        <span className="count-badge">{filteredJobs.length}</span>
                                                </h3>
                                                {!loading && filteredJobs.length > 0 && (
                                                        <div className="active-filters">
                                                                {location !== 'All' && (
                                                                        <span className="active-filter-tag" style={{ background: '#0057b8' }}>
                                                                                <i className="fas fa-map-marker-alt"></i>
                                                                                {location}
                                                                                <button onClick={() => setLocation('All')}>
                                                                                        <i className="fas fa-times"></i>
                                                                                </button>
                                                                        </span>
                                                                )}
                                                                {industry !== 'All' && (
                                                                        <span className="active-filter-tag" style={{ background: industryColors[industry] || industryColors.default }}>
                                                                                <i className="fas fa-industry"></i>
                                                                                {industry}
                                                                                <button onClick={() => setIndustry('All')}>
                                                                                        <i className="fas fa-times"></i>
                                                                                </button>
                                                                        </span>
                                                                )}
                                                                {employmentType !== 'All' && (
                                                                        <span className="active-filter-tag" style={{ background: getEmploymentTypeColor(employmentType) }}>
                                                                                <i className="fas fa-clock"></i>
                                                                                {employmentType}
                                                                                <button onClick={() => setEmploymentType('All')}>
                                                                                        <i className="fas fa-times"></i>
                                                                                </button>
                                                                        </span>
                                                                )}
                                                                {experienceLevel !== 'All' && (
                                                                        <span className="active-filter-tag" style={{ background: getExperienceColor(experienceLevel) }}>
                                                                                <i className="fas fa-chart-line"></i>
                                                                                {experienceLevel}
                                                                                <button onClick={() => setExperienceLevel('All')}>
                                                                                        <i className="fas fa-times"></i>
                                                                                </button>
                                                                        </span>
                                                                )}
                                                                {(location !== 'All' || industry !== 'All' || employmentType !== 'All' || experienceLevel !== 'All') && (
                                                                        <button
                                                                                className="clear-all-btn"
                                                                                onClick={() => {
                                                                                        setLocation('All');
                                                                                        setIndustry('All');
                                                                                        setEmploymentType('All');
                                                                                        setExperienceLevel('All');
                                                                                }}
                                                                        >
                                                                                Clear All
                                                                        </button>
                                                                )}
                                                        </div>
                                                )}
                                        </div>

                                        {loading ? (
                                                <div className="loading-container">
                                                        <div className="loading-spinner"></div>
                                                        <p>Loading jobs data...</p>
                                                </div>
                                        ) : (
                                                <div className="skills-grid">
                                                        {filteredJobs.map(job => {
                                                                const industryColor = industryColors[job.industry] || industryColors.default;
                                                                const expColor = getExperienceColor(job.experience_level);
                                                                const empColor = getEmploymentTypeColor(job.employment_type);
                                                                const salaryPercentage = maxSalary > 0 ? (job.salary_max / maxSalary) * 100 : 0;

                                                                return (
                                                                        <div key={job.id} className="skill-card">
                                                                                <div className="skill-header">
                                                                                        <div className="skill-title">
                                                                                                <h4>{job.title}</h4>
                                                                                                <div className="skill-type" style={{ background: industryColor }}>
                                                                                                        {job.industry}
                                                                                                </div>
                                                                                        </div>
                                                                                        <div className="job-count">
                                                                                                <span className="count-number">{formatCurrency(job.salary_max)}</span>
                                                                                                <span className="count-label">max salary</span>
                                                                                        </div>
                                                                                </div>

                                                                                <div className="skill-meta">
                                                                                        <div className="meta-item">
                                                                                                <i className="fas fa-building"></i>
                                                                                                <span>{job.company}</span>
                                                                                        </div>
                                                                                        <div className="meta-item">
                                                                                                <i className="fas fa-map-marker-alt"></i>
                                                                                                <span>{job.location}</span>
                                                                                        </div>
                                                                                        <div className="meta-item">
                                                                                                <i className="fas fa-calendar-alt"></i>
                                                                                                <span>{formatDate(job.posted_date)}</span>
                                                                                        </div>
                                                                                </div>

                                                                                <div className="skill-meta">
                                                                                        <div className="meta-item">
                                                                                                <i className="fas fa-chart-line"></i>
                                                                                                <span>Experience: </span>
                                                                                                <strong style={{ color: expColor }}>
                                                                                                        {job.experience_level}
                                                                                                </strong>
                                                                                        </div>
                                                                                        <div className="meta-item">
                                                                                                <i className="fas fa-clock"></i>
                                                                                                <span>Type: </span>
                                                                                                <strong style={{ color: empColor }}>
                                                                                                        {job.employment_type}
                                                                                                </strong>
                                                                                        </div>
                                                                                        <div className="meta-item">
                                                                                                <i className="fas fa-graduation-cap"></i>
                                                                                                <span>Degree: {job.degree_required === 'NaN' ? 'Any' : job.degree_required}</span>
                                                                                        </div>
                                                                                </div>

                                                                                <div className="skill-progress">
                                                                                        <div className="progress-info">
                                                                                                <span className="progress-label">
                                                                                                        <i className="fas fa-dollar-sign"></i>
                                                                                                        Salary Range
                                                                                                </span>
                                                                                                <span className="progress-percentage">
                                                                                                        {formatCurrency(job.salary_min)} - {formatCurrency(job.salary_max)}
                                                                                                </span>
                                                                                        </div>
                                                                                        <div className="progress-bar">
                                                                                                <div
                                                                                                        className="progress-fill"
                                                                                                        style={{
                                                                                                                width: `${salaryPercentage}%`,
                                                                                                                background: industryColor
                                                                                                        }}
                                                                                                ></div>
                                                                                        </div>
                                                                                </div>

                                                                                <div className="skill-meta">
                                                                                        <div className="meta-item">
                                                                                                <i className="fas fa-tools"></i>
                                                                                                <span>Skills: {job.skills?.length || 0}</span>
                                                                                        </div>
                                                                                        <div className="meta-item">
                                                                                                <i className="fas fa-language"></i>
                                                                                                <span>Languages: {job.languages_required || 'Not specified'}</span>
                                                                                        </div>
                                                                                </div>

                                                                                <div className="skill-footer">
                                                                                        <span className="skill-id">
                                                                                                <i className={`fas fa-circle ${job.is_active ? 'active' : 'inactive'}`}></i>
                                                                                                {job.is_active ? 'Active' : 'Closed'}
                                                                                        </span>
                                                                                        <div className="skill-actions">
                                                                                                <button className="action-btn" title="View details">
                                                                                                        <i className="fas fa-eye"></i>
                                                                                                        <span>View</span>
                                                                                                </button>
                                                                                                <button className="action-btn" title="Save job">
                                                                                                        <i className="far fa-bookmark"></i>
                                                                                                        <span>Save</span>
                                                                                                </button>
                                                                                        </div>
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
                </div>
        );
};

export default JobsPage;