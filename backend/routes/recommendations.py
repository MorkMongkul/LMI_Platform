from flask import Blueprint, request, jsonify
from models import db, Job, Skill, Program

recommendations_bp = Blueprint('recommendations', __name__)

@recommendations_bp.route('/api/match/jobs', methods=['POST'])
def match_jobs():
    """
    Find jobs matching user skills
    Body: {
        "skills": ["Python", "SQL", "React"],
        "experience_level": "Mid Level" (optional),
        "location": "Phnom Penh" (optional)
    }
    """
    try:
        data = request.get_json()
        user_skills = set(s.lower() for s in data.get('skills', []))
        
        if not user_skills:
            return jsonify({'success': False, 'error': 'No skills provided'}), 400
            
        # Base query
        query = Job.query
        
        if level := data.get('experience_level'):
            query = query.filter(Job.experience_level == level)
            
        if location := data.get('location'):
            query = query.filter(Job.location.ilike(f'%{location}%'))
            
        # Get candidate jobs (optimize by filtering jobs that have at least one of the skills?)
        # For now, fetching active jobs and calculating match in memory
        # In production, use database text search or specialized search engine
        jobs = query.filter_by(is_active=True).all()
        
        matches = []
        for job in jobs:
            job_skills = set(s.name.lower() for s in job.skills)
            if not job_skills:
                continue
                
            common = user_skills.intersection(job_skills)
            match_score = len(common) / len(job_skills)
            
            if match_score > 0:
                matches.append({
                    'job': job.to_dict(),
                    'match_score': round(match_score * 100, 1),
                    'matching_skills': list(common),
                    'missing_skills': list(job_skills - user_skills)
                })
                
        # Sort by match score desc
        matches.sort(key=lambda x: x['match_score'], reverse=True)
        
        return jsonify({
            'success': True,
            'count': len(matches),
            'data': matches[:50]  # Return top 50 matches
        })
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@recommendations_bp.route('/api/match/skill-gap', methods=['POST'])
def analyze_skill_gap():
    """
    Identify missing skills for a target job
    Body: {
        "user_skills": ["Python"],
        "target_job_id": "JOB001"
    }
    """
    try:
        data = request.get_json()
        user_skills = set(s.lower() for s in data.get('user_skills', []))
        job_id = data.get('target_job_id')
        
        if not job_id:
            return jsonify({'success': False, 'error': 'Target job ID required'}), 400
            
        job = Job.query.get_or_404(job_id)
        job_skills = set(s.name.lower() for s in job.skills)
        
        missing = job_skills - user_skills
        
        # Find recommended programs for missing skills
        recommendations = []
        if missing:
            # Simple recommendation: Find programs that teach the most missing skills
            # This is expensive, optimization needed for large datasets
            all_programs = Program.query.all()
            
            for prog in all_programs:
                prog_skills = set(s.name.lower() for s in prog.skills)
                covered = missing.intersection(prog_skills)
                
                if covered:
                    recommendations.append({
                        'program': prog.to_dict(include_skills=False),
                        'covered_skills': list(covered),
                        'score': len(covered)
                    })
            
            recommendations.sort(key=lambda x: x['score'], reverse=True)
            
        return jsonify({
            'success': True,
            'job_title': job.title,
            'missing_skills': list(missing),
            'recommended_programs': recommendations[:5]
        })
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@recommendations_bp.route('/api/recommend/programs', methods=['POST'])
def recommend_programs():
    """
    Recommend programs based on target skills or career goal
    Body: {
        "target_skills": ["Python", "Data Science"],
        "degree_level": "Bachelor" (optional)
    }
    """
    try:
        data = request.get_json()
        target_skills = set(s.lower() for s in data.get('target_skills', []))
        
        if not target_skills:
            return jsonify({'success': False, 'error': 'Target skills required'}), 400
            
        query = Program.query
        
        if degree := data.get('degree_level'):
             # Map string to Enum if needed, or rely on frontend sending correct string
             pass 

        programs = query.all()
        results = []
        
        for prog in programs:
            prog_skills = set(s.name.lower() for s in prog.skills)
            common = target_skills.intersection(prog_skills)
            
            if common:
                results.append({
                    'program': prog.to_dict(),
                    'relevance_score': len(common),
                    'matched_skills': list(common)
                })
                
        results.sort(key=lambda x: x['relevance_score'], reverse=True)
        
        return jsonify({
            'success': True,
            'data': results[:20]
        })
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
