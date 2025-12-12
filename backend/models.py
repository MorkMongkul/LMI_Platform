from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from enum import Enum

db = SQLAlchemy()

# Enums
class SkillType(Enum):
    TECHNICAL = "Technical"
    SOFT = "Soft"
    LANGUAGE = "Language"

class EmploymentType(Enum):
    FULL_TIME = "Full-time"
    PART_TIME = "Part-time"
    CONTRACT = "Contract"
    INTERNSHIP = "Internship"

class ExperienceLevel(Enum):
    ENTRY_LEVEL = "Entry Level"
    MID_LEVEL = "Mid Level"
    SENIOR = "Senior"
    EXECUTIVE = "Executive"

class DegreeLevel(Enum):
    NONE = "None"
    HIGH_SCHOOL = "High School"
    DIPLOMA = "Diploma"
    BACHELOR = "Bachelor"
    MASTER = "Master"
    PHD = "PhD"

class UniversityType(Enum):
    PUBLIC = "Public"
    PRIVATE = "Private"

# Association Tables
job_skills = db.Table('job_skills',
    db.Column('job_id', db.String(20), db.ForeignKey('jobs.id'), primary_key=True),
    db.Column('skill_id', db.Integer, db.ForeignKey('skills.id'), primary_key=True)
)

program_skills = db.Table('program_skills',
    db.Column('program_id', db.String(20), db.ForeignKey('programs.id'), primary_key=True),
    db.Column('skill_id', db.Integer, db.ForeignKey('skills.id'), primary_key=True)
)

# Models
class Company(db.Model):
    __tablename__ = 'companies'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False, unique=True, index=True)
    industry = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    jobs = db.relationship('Job', backref='company', lazy='dynamic', cascade='all, delete-orphan')
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'industry': self.industry,
            'job_count': self.jobs.count()
        }

class Skill(db.Model):
    __tablename__ = 'skills'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True, index=True)
    skill_type = db.Column(db.Enum(SkillType), nullable=False, default=SkillType.TECHNICAL)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'type': self.skill_type.value if self.skill_type else None,
            'job_count': len(self.jobs),
            'program_count': len(self.programs)
        }

class Job(db.Model):
    __tablename__ = 'jobs'
    
    id = db.Column(db.String(20), primary_key=True)
    title = db.Column(db.String(200), nullable=False, index=True)
    company_id = db.Column(db.Integer, db.ForeignKey('companies.id'), nullable=False, index=True)
    
    # Location and Type
    location = db.Column(db.String(100), index=True)
    employment_type = db.Column(db.String(50))
    experience_level = db.Column(db.String(50), index=True)
    
    # Compensation
    salary_min_usd = db.Column(db.Float)
    salary_max_usd = db.Column(db.Float)
    
    # Requirements
    degree_required = db.Column(db.String(50))
    languages_required = db.Column(db.String(200))
    
    # Metadata
    description = db.Column(db.Text)
    posted_date = db.Column(db.Date, index=True)
    is_active = db.Column(db.Boolean, default=True, index=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    skills = db.relationship('Skill', secondary=job_skills, lazy='subquery',
                           backref=db.backref('jobs', lazy=True))
    
    def to_dict(self, include_skills=True):
        return {
            'id': self.id,
            'title': self.title,
            'company': self.company.name if self.company else None,
            'industry': self.company.industry if self.company else None,
            'location': self.location,
            'employment_type': self.employment_type,
            'experience_level': self.experience_level,
            'salary_min': self.salary_min_usd,
            'salary_max': self.salary_max_usd,
            'degree_required': self.degree_required,
            'languages_required': self.languages_required,
            'is_active': self.is_active,
            'posted_date': self.posted_date.isoformat() if self.posted_date else None,
            'skills': [skill.name for skill in self.skills] if include_skills else None
        }

class University(db.Model):
    __tablename__ = 'universities'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False, unique=True, index=True)
    university_type = db.Column(db.String(20))
    location = db.Column(db.String(100), index=True)
    established_year = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    programs = db.relationship('Program', backref='university', lazy='dynamic', cascade='all, delete-orphan')
    
    def to_dict(self, include_programs=False):
        data = {
            'id': self.id,
            'name': self.name,
            'type': self.university_type,
            'location': self.location,
            'established_year': self.established_year,
            'program_count': self.programs.count()
        }
        if include_programs:
            data['programs'] = [p.to_dict(include_skills=False) for p in self.programs]
        return data

class Program(db.Model):
    __tablename__ = 'programs'
    
    id = db.Column(db.String(20), primary_key=True)
    university_id = db.Column(db.Integer, db.ForeignKey('universities.id'), nullable=False, index=True)
    
    # Program Details
    program_name = db.Column(db.String(200), nullable=False, index=True)
    program_category = db.Column(db.String(100), index=True)
    degree_level = db.Column(db.String(50), index=True)
    
    # Academic Info
    duration_years = db.Column(db.Integer)
    annual_tuition_usd = db.Column(db.Float)
    enrollment_capacity = db.Column(db.Integer)
    
    # Quality Indicators
    accredited = db.Column(db.Boolean, default=False)
    languages_of_instruction = db.Column(db.String(200))
    in_demand_field = db.Column(db.Boolean, default=False, index=True)
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    skills = db.relationship('Skill', secondary=program_skills, lazy='subquery',
                           backref=db.backref('programs', lazy=True))
    
    def to_dict(self, include_skills=True):
        return {
            'id': self.id,
            'university': self.university.name if self.university else None,
            'university_type': self.university.university_type if self.university else None,
            'location': self.university.location if self.university else None,
            'program_name': self.program_name,
            'category': self.program_category,
            'degree_level': self.degree_level,
            'duration_years': self.duration_years,
            'tuition_usd': self.annual_tuition_usd,
            'enrollment_capacity': self.enrollment_capacity,
            'accredited': self.accredited,
            'languages': self.languages_of_instruction,
            'in_demand': self.in_demand_field,
            'skills': [skill.name for skill in self.skills] if include_skills else None
        }


