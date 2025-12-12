from flask import Blueprint, request, jsonify
from models import db, Skill, Job, Program, SkillType

skills_bp = Blueprint('skills', __name__)

@skills_bp.route('/api/skills', methods=['GET'])
def get_skills():
    """
    List all skills with filtering
    Query Params:
    - type: str (Technical, Soft, Language)
    - search: str (filter by name)
    - min_jobs: int (filter by minimum job count)
    """
    try:
        query = Skill.query
        
        # Filters
        if skill_type := request.args.get('type'):
            try:
                # Case-insensitive match for Enum
                s_type = SkillType[skill_type.upper()]
                query = query.filter(Skill.skill_type == s_type)
            except KeyError:
                pass # Ignore invalid type
                
        if search := request.args.get('search'):
            query = query.filter(Skill.name.ilike(f'%{search}%'))
            
        # Get all skills matching criteria
        skills = query.all()
        
        # Manual filtering for job count (since it's a property, not a column)
        # For large datasets, this should be optimized with a JOIN + GROUP BY
        min_jobs = request.args.get('min_jobs', 0, type=int)
        
        result = []
        for skill in skills:
            job_count = len(skill.jobs)
            if job_count >= min_jobs:
                data = skill.to_dict()
                result.append(data)
                
        # Sort by name
        result.sort(key=lambda x: x['name'])
        
        return jsonify({
            'success': True,
            'count': len(result),
            'data': result
        })
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@skills_bp.route('/api/skills/top', methods=['GET'])
def get_top_skills():
    """
    Get most in-demand skills sorted by job count
    Query Params:
    - limit: int (default 10)
    - type: str (Technical, Soft, Language)
    """
    try:
        limit = request.args.get('limit', 10, type=int)
        skill_type_str = request.args.get('type')
        
        # Optimized query using GROUP BY
        query = db.session.query(
            Skill, 
            db.func.count(Job.id).label('job_count')
        ).join(Skill.jobs).group_by(Skill.id)
        
        if skill_type_str:
            try:
                s_type = SkillType[skill_type_str.upper()]
                query = query.filter(Skill.skill_type == s_type)
            except KeyError:
                pass
                
        # Order by job count desc
        top_skills = query.order_by(db.text('job_count DESC')).limit(limit).all()
        
        result = []
        for skill, count in top_skills:
            data = skill.to_dict()
            # Ensure count is accurate from the aggregate query
            data['job_count'] = count
            result.append(data)
            
        return jsonify({
            'success': True,
            'data': result
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@skills_bp.route('/api/skills/<int:skill_id>/jobs', methods=['GET'])
def get_jobs_by_skill(skill_id):
    """Get all jobs requiring a specific skill"""
    try:
        skill = Skill.query.get_or_404(skill_id)
        
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        
        # Paginate the jobs relationship
        # Note: skill.jobs is a list/query based on lazy loading config
        # Ideally, we should query Job directly filtering by skill
        
        pagination = Job.query.filter(Job.skills.any(id=skill_id))\
            .order_by(Job.posted_date.desc())\
            .paginate(page=page, per_page=per_page, error_out=False)
            
        return jsonify({
            'success': True,
            'skill': skill.name,
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

@skills_bp.route('/api/skills/<int:skill_id>/programs', methods=['GET'])
def get_programs_by_skill(skill_id):
    """Get university programs teaching a specific skill"""
    try:
        skill = Skill.query.get_or_404(skill_id)
        
        # This relies on the program_skills table being populated
        programs = Program.query.filter(Program.skills.any(id=skill_id)).all()
        
        return jsonify({
            'success': True,
            'skill': skill.name,
            'count': len(programs),
            'data': [p.to_dict() for p in programs]
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
