from flask import Flask, jsonify
from flask_cors import CORS
from config import Config
from models import db

app = Flask(__name__)
app.config.from_object(Config)

# Enable CORS
CORS(app)

# Initialize SQLAlchemy
db.init_app(app)

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


