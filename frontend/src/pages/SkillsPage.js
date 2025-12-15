import React, { useState, useEffect } from 'react';
import '../styles/skillPages.css'

const SkillsPage = () => {
        const [skills, setSkills] = useState([]);
        const [loading, setLoading] = useState(true);
        const [sortBy, setSortBy] = useState('job_count');
        const [skillType, setSkillType] = useState('All');
        const [demandLevel, setDemandLevel] = useState('All');

        // Color mapping for skill types
        const typeColors = {
                'Technical': '#0057b8',
                'Soft': '#28a745',
                'Language': '#ffc107'
        };

        useEffect(() => {
                fetchSkills();
        }, []);

        const fetchSkills = async () => {
                try {
                        setLoading(true);
                        const response = await fetch('http://localhost:5001/api/skills');
                        const data = await response.json();

                        if (data.success) {
                                setSkills(data.data);
                        }
                } catch (error) {
                        console.error('Error fetching skills:', error);
                } finally {
                        setLoading(false);
                }
        };

        // Get demand level based on job count
        const getDemandLevel = (jobCount) => {
                if (jobCount >= 1400) return 'High';
                if (jobCount >= 1350) return 'Medium';
                return 'Low';
        };

        // Filter and sort skills
        const filteredSkills = skills
                .filter(skill => {
                        if (skillType !== 'All' && skill.type !== skillType) return false;
                        if (demandLevel !== 'All' && getDemandLevel(skill.job_count) !== demandLevel) return false;
                        return true;
                })
                .sort((a, b) => {
                        if (sortBy === 'name') {
                                return a.name.localeCompare(b.name);
                        }
                        return b[sortBy] - a[sortBy];
                });

        // Get unique skill types and demand levels
        const skillTypes = ['All', ...new Set(skills.map(skill => skill.type))];
        const demandLevels = ['All', 'High', 'Medium', 'Low'];

        // Calculate max job_count for percentage calculation
        const maxJobCount = skills.length > 0 ? Math.max(...skills.map(skill => skill.job_count)) : 0;

        return (
                <div className="skills-container">
                        {/* Fixed Header */}
                        <div className="skills-fixed-header">
                                {/* Combined Filters in One Column */}
                                <div className="skills-filters">
                                        <div className="filter-section">
                                                {/* Combined Filter Group */}
                                                <div className="combined-filter-group">
                                                        {/* Skill Type Filters */}
                                                        <div className="filter-row">
                                                                {skillTypes.map(type => (
                                                                        <button
                                                                                key={type}
                                                                                className={`filter-btn ${skillType === type ? 'active' : ''}`}
                                                                                onClick={() => setSkillType(type)}
                                                                                style={{
                                                                                        background: skillType === type ? (typeColors[type] || '#0057b8') : 'white',
                                                                                        color: skillType === type ? 'white' : '#495057',
                                                                                        borderColor: typeColors[type] || '#e9ecef'
                                                                                }}
                                                                        >
                                                                                {type === 'All' ? 'All Types' : type}
                                                                        </button>
                                                                ))}
                                                        </div>

                                                        {/* Demand Level Filters */}
                                                        <div className="filter-row">
                                                                {demandLevels.map(level => (
                                                                        <button
                                                                                key={level}
                                                                                className={`filter-btn ${demandLevel === level ? 'active' : ''}`}
                                                                                onClick={() => setDemandLevel(level)}
                                                                                style={{
                                                                                        background: demandLevel === level ?
                                                                                                (level === 'High' ? '#0057b8' :
                                                                                                        level === 'Medium' ? '#28a745' :
                                                                                                                level === 'Low' ? '#ffc107' : '#6c757d') : 'white',
                                                                                        color: demandLevel === level ? 'white' : '#495057',
                                                                                        borderColor: level === 'High' ? '#0057b8' :
                                                                                                level === 'Medium' ? '#28a745' :
                                                                                                        level === 'Low' ? '#ffc107' : '#e9ecef'
                                                                                }}
                                                                        >
                                                                                {level === 'All' ? 'All Levels' : level}
                                                                        </button>
                                                                ))}
                                                        </div>
                                                </div>

                                                {/* Compact Sort Options */}
                                                <div className="sort-group">
                                                        <div className="sort-options">
                                                                <button
                                                                        className={`sort-btn ${sortBy === 'job_count' ? 'active' : ''}`}
                                                                        onClick={() => setSortBy('job_count')}
                                                                >
                                                                        <i className="fas fa-chart-line"></i>
                                                                        Demand
                                                                </button>
                                                                <button
                                                                        className={`sort-btn ${sortBy === 'name' ? 'active' : ''}`}
                                                                        onClick={() => setSortBy('name')}
                                                                >
                                                                        <i className="fas fa-sort-alpha-down"></i>
                                                                        Name
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
                                                        <i className="fas fa-tools"></i>
                                                        Skills Analysis
                                                        <span className="count-badge">{filteredSkills.length}</span>
                                                </h3>
                                                {!loading && filteredSkills.length > 0 && (
                                                        <div className="active-filters">
                                                                {skillType !== 'All' && (
                                                                        <span className="active-filter-tag" style={{ background: typeColors[skillType] }}>
                                                                                <i className="fas fa-tag"></i>
                                                                                {skillType}
                                                                                <button onClick={() => setSkillType('All')}>
                                                                                        <i className="fas fa-times"></i>
                                                                                </button>
                                                                        </span>
                                                                )}
                                                                {demandLevel !== 'All' && (
                                                                        <span className="active-filter-tag" style={{
                                                                                background: demandLevel === 'High' ? '#0057b8' :
                                                                                        demandLevel === 'Medium' ? '#28a745' : '#ffc107'
                                                                        }}>
                                                                                <i className="fas fa-chart-line"></i>
                                                                                {demandLevel} Demand
                                                                                <button onClick={() => setDemandLevel('All')}>
                                                                                        <i className="fas fa-times"></i>
                                                                                </button>
                                                                        </span>
                                                                )}
                                                                {(skillType !== 'All' || demandLevel !== 'All') && (
                                                                        <button
                                                                                className="clear-all-btn"
                                                                                onClick={() => {
                                                                                        setSkillType('All');
                                                                                        setDemandLevel('All');
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
                                                        <p>Loading skills data...</p>
                                                </div>
                                        ) : (
                                                <div className="skills-grid">
                                                        {filteredSkills.map(skill => {
                                                                const typeColor = typeColors[skill.type];
                                                                const percentage = maxJobCount > 0 ? (skill.job_count / maxJobCount) * 100 : 0;
                                                                const demand = getDemandLevel(skill.job_count);

                                                                return (
                                                                        <div key={skill.id} className="skill-card">
                                                                                <div className="skill-header">
                                                                                        <div className="skill-title">
                                                                                                <h4>{skill.name}</h4>
                                                                                                <div className="skill-type" style={{ background: typeColor }}>
                                                                                                        {skill.type}
                                                                                                </div>
                                                                                        </div>
                                                                                        <div className="job-count">
                                                                                                <span className="count-number">{skill.job_count.toLocaleString()}</span>
                                                                                                <span className="count-label">job references</span>
                                                                                        </div>
                                                                                </div>

                                                                                <div className="skill-meta">
                                                                                        <div className="meta-item">
                                                                                                <i className="fas fa-chart-line"></i>
                                                                                                <span>Demand: </span>
                                                                                                <strong style={{
                                                                                                        color: demand === 'High' ? '#0057b8' :
                                                                                                                demand === 'Medium' ? '#28a745' : '#ffc107'
                                                                                                }}>
                                                                                                        {demand}
                                                                                                </strong>
                                                                                        </div>
                                                                                        <div className="meta-item">
                                                                                                <i className="fas fa-graduation-cap"></i>
                                                                                                <span>Programs: {skill.program_count}</span>
                                                                                        </div>
                                                                                </div>

                                                                                <div className="skill-progress">
                                                                                        <div className="progress-info">
                                                                                                <span className="progress-label">
                                                                                                        <i className="fas fa-bullseye"></i>
                                                                                                        Market Relevance
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

                                                                                <div className="skill-footer">
                                                                                        <span className="skill-id">ID: {skill.id}</span>
                                                                                        <div className="skill-actions">
                                                                                                <button className="action-btn" title="View details">
                                                                                                        <i className="fas fa-eye"></i>
                                                                                                        <span>View</span>
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

                                        {!loading && filteredSkills.length === 0 && (
                                                <div className="no-results">
                                                        <i className="fas fa-search"></i>
                                                        <h4>No skills found</h4>
                                                        <p>Try adjusting your filters</p>
                                                </div>
                                        )}
                                </div>
                        </div>
                </div>
        );
};

export default SkillsPage;