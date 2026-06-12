@echo off
echo Starting TROPMET 2026 Backend...
cd backend
call venv\Scripts\activate
start cmd /k "uvicorn main:app --reload --port 8000"
cd ..\frontend
echo Starting TROPMET 2026 Frontend...
start cmd /k "npm run dev"
echo Both servers started!
echo Backend: http://localhost:8000
echo Frontend: http://localhost:5173
