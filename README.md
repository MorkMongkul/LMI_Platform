# LMI-Platform

A full-stack application with Flask backend and React frontend.

## Tech Stack

- **Backend**: Python Flask, SQLAlchemy, PostgreSQL
- **Frontend**: React, TypeScript, Vite
- **Database**: PostgreSQL (via Docker Compose)

## Prerequisites

- Python 3.8+
- React.js , Typescript
- Docker and Docker Compose

## Setup Instructions

### 1. Start PostgreSQL Database

```bash
docker-compose up -d
```

This will start a PostgreSQL container with:
- User: `admin`
- Password: `password123`
- Database: `lmi_db`
- Port: `5434`

### 2. Backend Setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file in the `backend` directory:

```
FLASK_APP=app.py
FLASK_ENV=development
DATABASE_URL=postgresql://admin:password123@localhost:5434/lmi_db
```

Run the Flask application:

```bash
python app.py
```

The backend will be available at `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173` (default Vite port)

## Development

- Backend API runs on port `5000`
- Frontend dev server runs on port `5173` (Vite default)
- PostgreSQL runs on port `5434` (to avoid conflict with local PostgreSQL instances)

## Stopping Services

To stop the PostgreSQL container:

```bash
docker-compose down
```

To stop with data removal:

```bash
docker-compose down -v
```

