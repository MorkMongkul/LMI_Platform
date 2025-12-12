from flask import Blueprint, request, jsonify
from models import db, University, Program, UniversityType, DegreeLevel

universities_bp = Blueprint('universities', __name__)

@universities_bp.route('/api/universities', methods=['GET'])
def get_universities():
    """
    List universities with filtering
    Query Params:
    - type: str (Public, Private)
    - location: str
    - search: str (name)
    """
    try:
        query = University.query
        
        if u_type := request.args.get('type'):
            try:
                # Case-insensitive match for Enum
                type_enum = UniversityType[u_type.upper()]
                query = query.filter(University.university_type == type_enum)
            except KeyError:
                pass
                
        if location := request.args.get('location'):
            query = query.filter(University.location.ilike(f'%{location}%'))
            
        if search := request.args.get('search'):
            query = query.filter(University.name.ilike(f'%{search}%'))
            
        universities = query.order_by(University.name).all()
        
        return jsonify({
            'success': True,
            'count': len(universities),
            'data': [u.to_dict(include_programs=False) for u in universities]
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@universities_bp.route('/api/universities/<int:id>', methods=['GET'])
def get_university_detail(id):
    """Get university details including programs"""
    try:
        university = University.query.get_or_404(id)
        return jsonify({
            'success': True,
            'data': university.to_dict(include_programs=True)
        })
    except Exception as e:
        return jsonify({'success': False, 'error': 'University not found'}), 404

@universities_bp.route('/api/programs', methods=['GET'])
def get_programs():
    """
    List all programs with advanced filtering
    Query Params:
    - category: str (e.g. IT/Software)
    - degree: str (Bachelor, Master, etc.)
    - university_id: int
    - max_tuition: float
    - search: str
    """
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        query = Program.query
        
        if category := request.args.get('category'):
            query = query.filter(Program.program_category == category)
            
        if degree := request.args.get('degree'):
            try:
                degree_enum = DegreeLevel[degree.replace(' ', '_').upper()]
                query = query.filter(Program.degree_level == degree_enum)
            except KeyError:
                pass
                
        if uni_id := request.args.get('university_id'):
            query = query.filter(Program.university_id == uni_id)
            
        if max_tuition := request.args.get('max_tuition', type=float):
            query = query.filter(Program.annual_tuition_usd <= max_tuition)
            
        if search := request.args.get('search'):
            query = query.filter(Program.program_name.ilike(f'%{search}%'))
            
        pagination = query.order_by(Program.program_name).paginate(
            page=page, per_page=per_page, error_out=False
        )
        
        return jsonify({
            'success': True,
            'data': [p.to_dict() for p in pagination.items],
            'meta': {
                'page': page,
                'per_page': per_page,
                'total': pagination.total,
                'pages': pagination.pages
            }
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@universities_bp.route('/api/programs/<int:id>', methods=['GET'])
def get_program_detail(id):
    """Get program details"""
    try:
        program = Program.query.get_or_404(id)
        return jsonify({
            'success': True,
            'data': program.to_dict(include_skills=True)
        })
    except Exception as e:
        return jsonify({'success': False, 'error': 'Program not found'}), 404
