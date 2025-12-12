from flask import Blueprint, request, jsonify
from sqlalchemy import or_
from models import db, Job, Skill, Company, EmploymentType, ExperienceLevel

jobs_bp = Blueprint('jobs', __name__)

@jobs_bp.route('/api/jobs', methods=['GET'])
def get_jobs():
    """
    List all jobs with pagination and filtering
    Query Params:
    - page: int (default 1)
    - per_page: int (default 20)
    - location: str (filter by location)
    - industry: str (filter by industry)
    - level: str (Entry Level, Mid Level, Senior, Executive)
    - type: str (Full-time, Part-time, Contract, Internship)
    - skill: str (filter by skill name)
    - search: str (search in title/description)
    """
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        
        # Build query
        query = Job.query
        
        # Filters
        if request.args.get('is_active'):
            query = query.filter(Job.is_active == True)
            
        if location := request.args.get('location'):
            query = query.filter(Job.location.ilike(f'%{location}%'))
            
        if industry := request.args.get('industry'):
            query = query.join(Company).filter(Company.industry.ilike(f'%{industry}%'))
            
        if level := request.args.get('level'):
            query = query.filter(Job.experience_level == level)
            
        if job_type := request.args.get('type'):
            query = query.filter(Job.employment_type == job_type)
            
        if skill_name := request.args.get('skill'):
            query = query.join(Job.skills).filter(Skill.name.ilike(f'%{skill_name}%'))
            
        if search := request.args.get('search'):
            search_term = f"%{search}%"
            query = query.filter(
                or_(
                    Job.title.ilike(search_term),
                    Job.description.ilike(search_term)
                )
            )
            
        # Execute pagination
        pagination = query.order_by(Job.posted_date.desc()).paginate(
            page=page, per_page=per_page, error_out=False
        )
        
        return jsonify({
            'success': True,
            'data': [job.to_dict() for job in pagination.items],
            'meta': {
                'page': page,
                'per_page': per_page,
                'total': pagination.total,
                'pages': pagination.pages
            }
        })
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@jobs_bp.route('/api/jobs/<job_id>', methods=['GET'])
def get_job_detail(job_id):
    """Get single job details"""
    try:
        job = Job.query.get_or_404(job_id)
        return jsonify({
            'success': True,
            'data': job.to_dict()
        })
    except Exception as e:
        return jsonify({'success': False, 'error': 'Job not found'}), 404

@jobs_bp.route('/api/jobs/stats', methods=['GET'])
def get_job_stats():
    """Get job statistics for dashboard"""
    try:
        total_jobs = Job.query.count()
        active_jobs = Job.query.filter_by(is_active=True).count()
        total_companies = Company.query.count()
        
        # Calculate average salary
        avg_salary_result = db.session.query(
            db.func.avg((Job.salary_min_usd + Job.salary_max_usd) / 2)
        ).filter(Job.salary_min_usd.isnot(None), Job.salary_max_usd.isnot(None)).scalar()
        avg_salary = round(avg_salary_result) if avg_salary_result else None
        
        # Top industries
        top_industries = db.session.query(
            Company.industry, db.func.count(Job.id)
        ).join(Job).group_by(Company.industry)\
        .order_by(db.func.count(Job.id).desc()).limit(5).all()
        
        # Top locations
        top_locations = db.session.query(
            Job.location, db.func.count(Job.id)
        ).group_by(Job.location)\
        .order_by(db.func.count(Job.id).desc()).limit(5).all()
        
        return jsonify({
            'success': True,
            'data': {
                'total_jobs': total_jobs,
                'active_jobs': active_jobs,
                'total_companies': total_companies,
                'avg_salary': avg_salary,
                'top_industries': dict(top_industries),
                'top_locations': dict(top_locations)
            }
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
