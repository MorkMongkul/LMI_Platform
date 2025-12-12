export interface Job {
  id: string | number;
  title: string;
  company: string;
  industry: string;
  location: string;
  employment_type: string;
  experience_level: string;
  salary_min: number;
  salary_max: number;
  degree_required: string;
  languages_required: string;
  is_active: boolean;
  posted_date: string;
  skills: string[];
}

export interface JobsResponse {
  success: boolean;
  data: Job[];
  meta: {
    page: number;
    per_page: number;
    total: number;
    pages: number;
  };
}

export interface JobFilters {
  search?: string;
  location?: string;
  employment_type?: string;
  experience_level?: string;
  industry?: string;
  skill?: string;
  page?: number;
  per_page?: number;
}
