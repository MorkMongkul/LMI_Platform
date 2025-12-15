import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

const apiService = {
        // Get jobs with pagination and filters
        async getJobs(page = 1, filters = {}) {
                try {
                        const params = { page, ...filters };
                        const response = await axios.get(`${API_BASE_URL}/jobs`, { params });
                        return response.data;
                } catch (error) {
                        console.error('Error fetching jobs:', error);
                        // Return mock data for testing
                        return {
                                data: [
                                        {
                                                "company": "Cambodia Rice Federation",
                                                "degree_required": "High School",
                                                "employment_type": "Contract",
                                                "experience_level": "Executive",
                                                "id": "JOB09883",
                                                "industry": "Agriculture",
                                                "is_active": true,
                                                "languages_required": "Khmer, English",
                                                "location": "Kampong Speu",
                                                "posted_date": "2025-12-09",
                                                "salary_max": 5966.0,
                                                "salary_min": 3142.0,
                                                "skills": ["React", "Driving License", "Leadership", "PowerPoint", "JavaScript"],
                                                "title": "Farm Manager"
                                        }
                                ],
                                "meta": {
                                        "page": page,
                                        "pages": 500,
                                        "per_page": 20,
                                        "total": 10000
                                },
                                "success": true
                        };
                }
        },

        // Get job by ID
        async getJobById(jobId) {
                try {
                        const response = await axios.get(`${API_BASE_URL}/jobs/${jobId}`);
                        return response.data;
                } catch (error) {
                        console.error(`Error fetching job ${jobId}:`, error);
                        throw error;
                }
        }
};

export default apiService;