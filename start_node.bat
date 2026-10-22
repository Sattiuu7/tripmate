@echo off
echo ==================================================
echo  Starting TripMate with Node.js Backend (Optional)
echo ==================================================

echo Starting Node.js Backend on http://localhost:5000...
start "TripMate Node Backend" cmd /k "cd backend && npm run dev"

timeout /t 2 >nul

echo Starting Frontend on http://localhost:5173...
start "TripMate Frontend" cmd /k "cd frontend && npm run dev"
