# SkillTrack — Mini Skill Progress Tracker

A small full-stack project to track learning progress.

## Tech Stack
- Frontend: React + Vite
- Styling: CSS
- Backend: FastAPI
- Validation: Pydantic
- Storage: In-memory Python list

## Features
- Add a skill
- Select category
- Set progress percentage
- Set learning status
- View all skills
- Delete a skill
- See overall progress
- REST API with FastAPI
- Pydantic request validation

## Project Structure

```text
skill-tracker/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   └── schemas.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Run Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend runs at `http://127.0.0.1:8000`

API documentation:
`http://127.0.0.1:8000/docs`

## Run Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Then open the URL shown by Vite.

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/skills` | Get all skills |
| POST | `/skills` | Add a skill |
| DELETE | `/skills/{id}` | Delete a skill |
| GET | `/stats` | Get progress statistics |

## What I Learned

This project demonstrates the basic full-stack flow:

```text
React Form
   ↓
fetch()
   ↓
HTTP Request
   ↓
FastAPI Endpoint
   ↓
Pydantic Validation
   ↓
Python Data
   ↓
JSON Response
   ↓
React UI
```

## Future Improvements
- Add a real database such as SQLite/PostgreSQL
- Add login/authentication
- Add edit functionality
- Add search and filters
