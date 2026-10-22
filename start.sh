#!/usr/bin/env bash

# TripMate – Linux / macOS Startup Script
echo "=================================================="
echo " Starting TripMate – AI-Powered Budget Travel Planner"
echo "=================================================="

# Check for Node.js
if ! command -v node &> /dev/null
then
    echo " Node.js is not installed. Please install Node.js (v18 or higher)."
    exit 1
fi

echo "✓ Node.js detected: $(node -v)"
echo "✓ npm detected: $(npm -v)"

# Install dependencies if not already installed
if [ ! -d "backend/node_modules" ]; then
    echo "Installing backend dependencies..."
    cd backend && npm install && cd ..
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "Installing frontend dependencies..."
    cd frontend && npm install && cd ..
fi

echo " Starting Backend API server on http://localhost:5000..."
(cd backend && node src/server.js) &
BACKEND_PID=$!

echo " Starting Frontend Vite server on http://localhost:5173..."
(cd frontend && npm run dev) &
FRONTEND_PID=$!

trap "kill $BACKEND_PID $FRONTEND_PID; exit" SIGINT SIGTERM

echo "=================================================="
echo " TripMate is running!"
echo " Frontend: http://localhost:5173"
echo " Backend API: http://localhost:5000"
echo " Press Ctrl+C to terminate both servers."
echo "=================================================="

wait
