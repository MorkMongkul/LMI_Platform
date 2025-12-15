# Data Folder

This folder contains all data files used by the LMI Platform backend.

##  Structure

### Raw Data Files
- `ai_job_dataset.csv` - Main AI jobs dataset with 15,000+ job postings
- Future: `universities_cambodia.csv`, `companies.csv`, `skills_master.csv`

### Processed Data
- Future: `processed_jobs.json`, `university_programs.json`

### Scripts
- Future: `data_import.py`, `data_cleaning.py`

##  Current Data

**AI Jobs Dataset (`ai_job_dataset.csv`)**:
- **Records**: 15,001 job postings
- **Fields**: job_id, job_title, salary_usd, experience_level, company info, skills, etc.
- **Source**: AI job market data for analysis and platform features

##  Usage

This data will be used for:
- Database seeding during development
- Job search and filtering features
- Skill recommendation algorithms
- Market analytics and insights
- Educational pathway mapping

##  Notes

- All CSV files should include headers
- Data validation scripts should be added here
- Consider adding data versioning for large datasets