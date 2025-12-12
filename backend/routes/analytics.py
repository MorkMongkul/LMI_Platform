from flask import Blueprint, jsonify, request
from sqlalchemy import func
from models import db, Job, Company, Skill, University, Program

analytics_bp = Blueprint('analytics', __name__)

@analytics_bp.route('/api/analytics/overview', methods=['GET'])
def get_overview():
    """Get platform-wide statistics for the dashboard"""
    try:
        total_jobs = Job.query.count()
        active_jobs = Job.query.filter_by(is_active=True).count()
        total_companies = Company.query.count()
        total_skills = Skill.query.count()
        total_universities = University.query.count()
        total_programs = Program.query.count()
        
        return jsonify({
            'success': True,
            'data': {
                'jobs': {
                    'total': total_jobs,
                    'active': active_jobs
                },
                'companies': total_companies,
                'skills': total_skills,
                'education': {
                    'universities': total_universities,
                    'programs': total_programs
                }
            }
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@analytics_bp.route('/api/analytics/salary-trends', methods=['GET'])
def get_salary_trends():
    """
    Get average salary analytics
    Query Params:
    - by: 'experience' or 'industry' (default: experience)
    """
    try:
        group_by = request.args.get('by', 'experience')
        
        if group_by == 'industry':
            # Join with Company to get industry
            results = db.session.query(
                Company.industry,
                func.avg((Job.salary_min_usd + Job.salary_max_usd) / 2).label('avg_salary'),
                func.count(Job.id).label('job_count')
            ).join(Job).filter(Job.salary_min_usd > 0)\
            .group_by(Company.industry)\
            .having(func.count(Job.id) > 5)\
            .order_by(func.avg((Job.salary_min_usd + Job.salary_max_usd) / 2).desc())\
            .limit(10).all()
            
            data = [{'label': r[0], 'value': round(r[1], 2), 'count': r[2]} for r in results]
            
        else: # by experience level
            results = db.session.query(
                Job.experience_level,
                func.avg((Job.salary_min_usd + Job.salary_max_usd) / 2).label('avg_salary'),
                func.count(Job.id).label('job_count')
            ).filter(Job.salary_min_usd > 0)\
            .group_by(Job.experience_level).all()
            
            # Custom sort order for experience levels could be added here
            data = [{'label': r[0], 'value': round(r[1], 2), 'count': r[2]} for r in results]
            
        return jsonify({
            'success': True,
            'group_by': group_by,
            'data': data
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@analytics_bp.route('/api/analytics/job-trends', methods=['GET'])
def get_job_trends():
    """
    Get job market distribution
    Query Params:
    - type: 'location', 'industry', 'employment_type'
    """
    try:
        trend_type = request.args.get('type', 'location')
        limit = request.args.get('limit', 10, type=int)
        
        if trend_type == 'industry':
            query = db.session.query(
                Company.industry.label('label'),
                func.count(Job.id).label('count')
            ).join(Job).group_by(Company.industry)
            
        elif trend_type == 'employment_type':
            query = db.session.query(
                Job.employment_type.label('label'),
                func.count(Job.id).label('count')
            ).group_by(Job.employment_type)
            
        else: # location
            query = db.session.query(
                Job.location.label('label'),
                func.count(Job.id).label('count')
            ).group_by(Job.location)
            
        results = query.order_by(func.count(Job.id).desc()).limit(limit).all()
        
        return jsonify({
            'success': True,
            'type': trend_type,
            'data': [{'label': r.label, 'count': r.count} for r in results]
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
