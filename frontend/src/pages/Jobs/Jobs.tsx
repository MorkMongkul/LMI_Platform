import React, { useState, useEffect } from 'react';
import { jobService } from '../../services/jobService';
import { Job, JobFilters } from '../../types/job';
import { LocationIcon, BriefcaseIcon, TrendingUpIcon, BuildingIcon, ClockIcon } from '../../components/Icons';
import ErrorMessage from '../../components/ErrorMessage';
import './Jobs.css';

const JobsPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    total: 0,
    pages: 0
  });

  const [filters, setFilters] = useState<JobFilters>({
    search: '',
    location: '',
    employment_type: '',
    experience_level: '',
    industry: '',
    skill: '',
    page: 1,
    per_page: 10
  });

  useEffect(() => {
    fetchJobs();
    fetchStats();
  }, [filters.page]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await jobService.getJobs(filters);
      setJobs(response.data);
      setPagination(response.meta);
    } catch (err: any) {
      console.error('Error fetching jobs:', err);
      if (err.code === 'ERR_NETWORK' || err.message === 'Network Error') {
        setError('Unable to connect to the server. Please check if the backend is running.');
      } else if (err.response?.status === 500) {
        setError('Database connection failed. Please ensure the database is running.');
      } else {
        setError(err.response?.data?.message || 'Failed to load jobs data. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const statsData = await jobService.getJobStats();
      setStats(statsData);
    } catch (err: any) {
      console.error('Failed to fetch stats:', err);
      setStats(null);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters({ ...filters, page: 1 });
    fetchJobs();
  };

  const handleFilterChange = (key: keyof JobFilters, value: string) => {
    setFilters({ ...filters, [key]: value, page: 1 });
  };

  const applyFilters = () => {
    fetchJobs();
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      location: '',
      employment_type: '',
      experience_level: '',
      industry: '',
      skill: '',
      page: 1,
      per_page: 10
    });
    setTimeout(() => fetchJobs(), 100);
  };

  const formatSalary = (min: number, max: number) => {
    if (min && max) {
      return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
    } else if (min) {
      return `$${min.toLocaleString()}+`;
    } else if (max) {
      return `Up to $${max.toLocaleString()}`;
    }
    return 'Negotiable';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="jobs-page">
      <div className="jobs-header">
        <h1>Job Opportunities</h1>
        <p>Explore thousands of job opportunities in Cambodia</p>
      </div>

      {stats && (
        <div className="jobs-stats">
          <div className="stat-card">
            <h3>{stats.total_jobs?.toLocaleString() || 0}</h3>
            <p>Total Jobs</p>
          </div>
          <div className="stat-card">
            <h3>{stats.active_jobs?.toLocaleString() || 0}</h3>
            <p>Active Jobs</p>
          </div>
          <div className="stat-card">
            <h3>{stats.total_companies?.toLocaleString() || 0}</h3>
            <p>Companies</p>
          </div>
          <div className="stat-card">
            <h3>{stats.avg_salary ? `$${Math.round(stats.avg_salary).toLocaleString()}` : 'N/A'}</h3>
            <p>Average Salary</p>
          </div>
        </div>
      )}

      <div className="jobs-content">
        <aside className="filters-section">
          <h2>Filters</h2>
          
          <div className="filter-group">
            <label>Location</label>
            <input
              type="text"
              placeholder="e.g., Phnom Penh"
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label>Employment Type</label>
            <select
              value={filters.employment_type}
              onChange={(e) => handleFilterChange('employment_type', e.target.value)}
            >
              <option value="">All Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Experience Level</label>
            <select
              value={filters.experience_level}
              onChange={(e) => handleFilterChange('experience_level', e.target.value)}
            >
              <option value="">All Levels</option>
              <option value="Entry Level">Entry Level</option>
              <option value="Mid Level">Mid Level</option>
              <option value="Senior Level">Senior Level</option>
              <option value="Executive">Executive</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Industry</label>
            <input
              type="text"
              placeholder="e.g., Technology"
              value={filters.industry}
              onChange={(e) => handleFilterChange('industry', e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label>Required Skill</label>
            <input
              type="text"
              placeholder="e.g., Python"
              value={filters.skill}
              onChange={(e) => handleFilterChange('skill', e.target.value)}
            />
          </div>

          <button onClick={applyFilters} className="apply-filters-btn">
            Apply Filters
          </button>
          <button onClick={clearFilters} className="clear-filters-btn">
            Clear Filters
          </button>
        </aside>

        <main className="jobs-list-section">
          <div className="search-bar">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search jobs by title, company, or keywords..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </form>
          </div>

          {loading ? (
            <div className="loading">
              <div className="loading-spinner"></div>
              <p>Loading jobs...</p>
            </div>
          ) : error ? (
            <ErrorMessage
              title="Failed to Load Jobs"
              message={error}
              type="error"
              onRetry={fetchJobs}
            />
          ) : jobs.length === 0 ? (
            <div className="no-results">
              <p>No jobs found matching your criteria.</p>
            </div>
          ) : (
            <>
              <div className="jobs-list">
                {jobs.map((job) => (
                  <div key={job.id} className="job-card">
                    <div className="job-card-header">
                      <div>
                        <h3 className="job-title">{job.title}</h3>
                        <p className="job-company">{job.company}</p>
                      </div>
                      <div className="job-salary">
                        {formatSalary(job.salary_min, job.salary_max)}
                      </div>
                    </div>

                    <div className="job-details">
                      <div className="job-detail-item">
                        <span className="job-detail-icon"><LocationIcon size={18} /></span>
                        <span>{job.location}</span>
                      </div>
                      <div className="job-detail-item">
                        <span className="job-detail-icon"><BriefcaseIcon size={18} /></span>
                        <span>{job.employment_type}</span>
                      </div>
                      <div className="job-detail-item">
                        <span className="job-detail-icon"><TrendingUpIcon size={18} /></span>
                        <span>{job.experience_level}</span>
                      </div>
                      <div className="job-detail-item">
                        <span className="job-detail-icon"><BuildingIcon size={18} /></span>
                        <span>{job.industry}</span>
                      </div>
                      {job.posted_date && (
                        <div className="job-detail-item">
                          <span className="job-detail-icon"><ClockIcon size={18} /></span>
                          <span>{formatDate(job.posted_date)}</span>
                        </div>
                      )}
                    </div>

                    {job.skills && job.skills.length > 0 && (
                      <div className="job-skills">
                        {job.skills.slice(0, 8).map((skill, index) => (
                          <span key={index} className="skill-tag">
                            {skill}
                          </span>
                        ))}
                        {job.skills.length > 8 && (
                          <span className="skill-tag">+{job.skills.length - 8} more</span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="pagination">
                <button
                  onClick={() => setFilters({ ...filters, page: pagination.page - 1 })}
                  disabled={pagination.page === 1}
                >
                  Previous
                </button>
                <span>
                  Page {pagination.page} of {pagination.pages}
                </span>
                <button
                  onClick={() => setFilters({ ...filters, page: pagination.page + 1 })}
                  disabled={pagination.page === pagination.pages}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default JobsPage;