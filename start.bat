@echo off
echo ==================================================
echo  Starting TripMate - AI-Powered Budget Travel Planner
echo  Backend: Java 17 (OpenJDK) REST API Server
echo  Frontend: React 19 + Vite (Port 5173)
echo ==================================================

where java >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: Java runtime is not found on PATH.
    pause
    exit /b
)

echo [1/2] Starting Java REST API Server on http://localhost:5000...
start "TripMate Java Backend" cmd /k "cd backend-java && run.bat"

timeout /t 2 >nul

echo [2/2] Starting React Vite Frontend on http://localhost:5173...
start "TripMate Frontend" cmd /k "cd frontend && npm run dev"

echo ==================================================
echo  TripMate is successfully launched!
echo  Frontend Web App:  http://localhost:5173
echo  Java REST API:     http://localhost:5000
echo ==================================================
