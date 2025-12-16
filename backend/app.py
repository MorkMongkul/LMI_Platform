from flask import Flask, jsonify
from flask_cors import CORS
from flask_swagger_ui import get_swaggerui_blueprint
from config import Config
from models import db

# Import blueprints
from routes.jobs import jobs_bp
from routes.skills import skills_bp
from routes.universities import universities_bp
from routes.analytics import analytics_bp
from routes.chatbot import chatbot
app = Flask(__name__)
app.config.from_object(Config)

# Enable CORS
CORS(app)

# Initialize SQLAlchemy
db.init_app(app)

# Swagger UI configuration
SWAGGER_URL = '/swagger'
API_URL = '/static/swagger.json'
swaggerui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name': "LMI Platform API"
    }
)
app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)

# Register Blueprints
app.register_blueprint(jobs_bp)
app.register_blueprint(skills_bp)
app.register_blueprint(universities_bp)
app.register_blueprint(analytics_bp)
app.register_blueprint(chatbot)

@app.route('/')
def index():
    """Test route to verify the API is running"""
    return jsonify({
        'message': 'CLMI Platform API is running!',
        'status': 'success'
    })

@app.route('/api/health')
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'database': 'connected' if db.engine else 'disconnected'
    })

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, host='0.0.0.0', port=5001)


