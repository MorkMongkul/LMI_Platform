import React, { useState, useEffect, useRef } from 'react';
// import '../styles/skillPages.css';
// import '../styles/jobpages.css';
import '../styles/UniversityPages.css'

const UniversityPage = () => {
        const [universities, setUniversities] = useState([]);
        const [loading, setLoading] = useState(true);
        const [sortBy, setSortBy] = useState('program_count');
        const [location, setLocation] = useState('All');
        const [universityType, setUniversityType] = useState('All');
        const [isFilterVisible, setIsFilterVisible] = useState(true);
        const lastScrollY = useRef(0);

        // Color mapping for university types
        const typeColors = {
                'Public': '#0057b8',
                'Private': '#28a745'
        };

        // Color mapping for locations
        const locationColors = {
                'Phnom Penh': '#0057b8',
                'Siem Reap': '#9C27B0',
                'Battambang': '#F57C00',
                'Kampong Thom': '#2E7D32',
                'Sihanoukville': '#0288D1',
                'Kampong Cham': '#C2185B',
                'Svay Rieng': '#0097A7',
                'default': '#6c757d'
        };

        useEffect(() => {
                fetchUniversities();
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

        const fetchUniversities = async () => {
                try {
                        setLoading(true);
                        const response = await fetch('http://localhost:5001/api/universities');
                        const data = await response.json();

                        if (data.success) {
                                setUniversities(data.data);
                        }
                } catch (error) {
                        console.error('Error fetching universities:', error);
                } finally {
                        setLoading(false);
                }
        };

        // Get unique filters from universities
        const locations = ['All', ...new Set(universities.map(uni => uni.location))];
        const universityTypes = ['All', ...new Set(universities.map(uni => uni.type))];

        // Filter and sort universities
        const filteredUniversities = universities
                .filter(uni => {
                        if (location !== 'All' && uni.location !== location) return false;
                        if (universityType !== 'All' && uni.type !== universityType) return false;
                        return true;
                })
                .sort((a, b) => {
                        if (sortBy === 'name') {
                                return a.name.localeCompare(b.name);
                        } else if (sortBy === 'established_year') {
                                return b.established_year - a.established_year;
                        }
                        // Default sort by program_count
                        return b[sortBy] - a[sortBy];
                });

        // Calculate age of university
        const getUniversityAge = (year) => {
                const currentYear = new Date().getFullYear();
                return currentYear - year;
        };

        // Get age category
        const getAgeCategory = (year) => {
                const age = getUniversityAge(year);
                if (age < 10) return 'New';
                if (age < 30) return 'Established';
                return 'Veteran';
        };

        // Get age color
        const getAgeColor = (year) => {
                const age = getUniversityAge(year);
                if (age < 10) return '#ffc107'; // Yellow for new
                if (age < 30) return '#28a745'; // Green for established
                return '#0057b8'; // Blue for veteran
        };

        // Calculate max program_count for percentage
        const maxProgramCount = universities.length > 0
                ? Math.max(...universities.map(uni => uni.program_count))
                : 0;

        return (
                <div className="skills-container">
                        {/* Fixed Header */}
                        <div className={`skills-fixed-header ${isFilterVisible ? 'visible' : 'hidden'}`}>
                                {/* Combined Filters in One Column */}
                                <div className="skills-filters">
                                        <div className="filter-section">
                                                {/* Combined Filter Group - Compact Two Column Layout */}
                                                <div className="combined-filter-group compact-filters">
                                                        {/* Filter Rows with Select Dropdowns in Two Columns */}
                                                        <div className="filter-row compact-row">
                                                                <div className="filter-group compact-filter">
                                                                        <i className="fas fa-map-marker-alt"></i>
                                                                        <select
                                                                                value={location}
                                                                                onChange={(e) => setLocation(e.target.value)}
                                                                                className="filter-select compact-select"
                                                                        >
                                                                                <option value="All">All Locations</option>
                                                                                {locations.filter(loc => loc !== 'All').map(loc => (
                                                                                        <option key={loc} value={loc}>{loc}</option>
                                                                                ))}
                                                                        </select>
                                                                </div>

                                                                <div className="filter-group compact-filter">
                                                                        <i className="fas fa-university"></i>
                                                                        <select
                                                                                value={universityType}
                                                                                onChange={(e) => setUniversityType(e.target.value)}
                                                                                className="filter-select compact-select"
                                                                        >
                                                                                <option value="All">All Types</option>
                                                                                {universityTypes.filter(type => type !== 'All').map(type => (
                                                                                        <option key={type} value={type}>{type}</option>
                                                                                ))}
                                                                        </select>
                                                                </div>
                                                        </div>
                                                </div>

                                                {/* Compact Sort Options */}
                                                <div className="sort-group">
                                                        <div className="sort-options">
                                                                <button
                                                                        className={`sort-btn ${sortBy === 'name' ? 'active' : ''}`}
                                                                        onClick={() => setSortBy('name')}
                                                                >
                                                                        <i className="fas fa-sort-alpha-down"></i>
                                                                        Name
                                                                </button>
                                                                <button
                                                                        className={`sort-btn ${sortBy === 'established_year' ? 'active' : ''}`}
                                                                        onClick={() => setSortBy('established_year')}
                                                                >
                                                                        <i className="fas fa-history"></i>
                                                                        Age
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
                                                        <i className="fas fa-university"></i>
                                                        University Alignment
                                                        <span className="count-badge">{filteredUniversities.length}</span>
                                                </h3>
                                                {!loading && filteredUniversities.length > 0 && (
                                                        <div className="active-filters">
                                                                {location !== 'All' && (
                                                                        <span className="active-filter-tag" style={{
                                                                                background: locationColors[location] || locationColors.default
                                                                        }}>
                                                                                <i className="fas fa-map-marker-alt"></i>
                                                                                {location}
                                                                                <button onClick={() => setLocation('All')}>
                                                                                        <i className="fas fa-times"></i>
                                                                                </button>
                                                                        </span>
                                                                )}
                                                                {universityType !== 'All' && (
                                                                        <span className="active-filter-tag" style={{
                                                                                background: typeColors[universityType]
                                                                        }}>
                                                                                <i className="fas fa-university"></i>
                                                                                {universityType}
                                                                                <button onClick={() => setUniversityType('All')}>
                                                                                        <i className="fas fa-times"></i>
                                                                                </button>
                                                                        </span>
                                                                )}
                                                                {(location !== 'All' || universityType !== 'All') && (
                                                                        <button
                                                                                className="clear-all-btn"
                                                                                onClick={() => {
                                                                                        setLocation('All');
                                                                                        setUniversityType('All');
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
                                                        <p>Loading university data...</p>
                                                </div>
                                        ) : (
                                                <div className="skills-grid">
                                                        {filteredUniversities.map(uni => {
                                                                const typeColor = typeColors[uni.type];
                                                                const locationColor = locationColors[uni.location] || locationColors.default;
                                                                const ageColor = getAgeColor(uni.established_year);
                                                                const ageCategory = getAgeCategory(uni.established_year);
                                                                const percentage = maxProgramCount > 0 ? (uni.program_count / maxProgramCount) * 100 : 0;

                                                                return (
                                                                        <div key={uni.id} className="skill-card">
                                                                                <div className="skill-header">
                                                                                        <div className="skill-title">
                                                                                                <h4>{uni.name}</h4>
                                                                                                <div className="university-type-badge" style={{ background: typeColor }}>
                                                                                                        {uni.type}
                                                                                                </div>
                                                                                        </div>
                                                                                        <div className="job-count">
                                                                                                <span className="count-number">{uni.program_count}</span>
                                                                                                <span className="count-label">programs</span>
                                                                                        </div>
                                                                                </div>

                                                                                <div className="skill-meta">
                                                                                        <div className="meta-item">
                                                                                                <i className="fas fa-map-marker-alt"></i>
                                                                                                <span>Location: </span>
                                                                                                <strong style={{ color: locationColor }}>
                                                                                                        {uni.location}
                                                                                                </strong>
                                                                                        </div>
                                                                                        <div className="meta-item">
                                                                                                <i className="fas fa-calendar-alt"></i>
                                                                                                <span>Established: </span>
                                                                                                <strong>{uni.established_year}</strong>
                                                                                        </div>
                                                                                        <div className="meta-item">
                                                                                                <i className="fas fa-history"></i>
                                                                                                <span>Age: </span>
                                                                                                <strong style={{ color: ageColor }}>
                                                                                                        {getUniversityAge(uni.established_year)} years ({ageCategory})
                                                                                                </strong>
                                                                                        </div>
                                                                                </div>

                                                                                <div className="skill-progress">
                                                                                        <div className="progress-info">
                                                                                                <span className="progress-label">
                                                                                                        <i className="fas fa-graduation-cap"></i>
                                                                                                        Program Coverage
                                                                                                </span>
                                                                                                <span className="progress-percentage">{Math.round(percentage)}%</span>
                                                                                        </div>
                                                                                        <div className="progress-bar">
                                                                                                <div
                                                                                                        className="progress-fill"
                                                                                                        style={{
                                                                                                                width: `${percentage}%`,
                                                                                                                background: typeColor
                                                                                                        }}
                                                                                                ></div>
                                                                                        </div>
                                                                                </div>

                                                                                <div className="skill-meta">
                                                                                        <div className="meta-item">
                                                                                                <i className="fas fa-chart-line"></i>
                                                                                                <span>Program Density: </span>
                                                                                                <strong>
                                                                                                        {uni.program_count > 8 ? 'High' :
                                                                                                                uni.program_count > 5 ? 'Medium' : 'Low'}
                                                                                                </strong>
                                                                                        </div>
                                                                                        <div className="meta-item">
                                                                                                <i className="fas fa-building"></i>
                                                                                                <span>Institution Type: </span>
                                                                                                <strong style={{ color: typeColor }}>{uni.type}</strong>
                                                                                        </div>
                                                                                </div>

                                                                                <div className="skill-footer">
                                                                                        <span className="skill-id">
                                                                                                <i className="fas fa-id-card"></i>
                                                                                                ID: {uni.id}
                                                                                        </span>
                                                                                        <div className="skill-actions">
                                                                                                <button className="action-btn" title="View programs">
                                                                                                        <i className="fas fa-eye"></i>
                                                                                                        <span>Programs</span>
                                                                                                </button>
                                                                                                <button className="action-btn" title="Compare">
                                                                                                        <i className="fas fa-balance-scale"></i>
                                                                                                        <span>Compare</span>
                                                                                                </button>
                                                                                        </div>
                                                                                </div>
                                                                        </div>
                                                                );
                                                        })}
                                                </div>
                                        )}

                                        {!loading && filteredUniversities.length === 0 && (
                                                <div className="no-results">
                                                        <i className="fas fa-search"></i>
                                                        <h4>No universities found</h4>
                                                        <p>Try adjusting your filters</p>
                                                </div>
                                        )}
                                </div>
                        </div>
                </div>
        );
};

export default UniversityPage;