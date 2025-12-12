import api from './api';
import { JobsResponse, JobFilters, Job } from '../types/job';

export const jobService = {
  getJobs: async (filters: JobFilters = {}): Promise<JobsResponse> => {
    const params = new URLSearchParams();
    
    if (filters.search) params.append('search', filters.search);
    if (filters.location) params.append('location', filters.location);
    if (filters.employment_type) params.append('employment_type', filters.employment_type);
    if (filters.experience_level) params.append('experience_level', filters.experience_level);
    if (filters.industry) params.append('industry', filters.industry);
    if (filters.skill) params.append('skill', filters.skill);
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.per_page) params.append('per_page', filters.per_page.toString());

    const response = await api.get(`/api/jobs?${params.toString()}`);
    return response.data;
  },

  getJobById: async (id: number): Promise<Job> => {
    const response = await api.get(`/api/jobs/${id}`);
    return response.data.data;
  },

  getJobStats: async () => {
    const response = await api.get('/api/jobs/stats');
    return response.data.data;
  }
};
