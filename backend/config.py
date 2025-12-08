import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    """Configuration class for Flask application"""
    SQLALCHEMY_DATABASE_URI = os.getenv(
        'DATABASE_URL',
        'postgresql://admin:password123@localhost:5434/lmi_db'
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')

