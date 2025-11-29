@echo off
echo ========================================
echo AI Image Transformer - Development Mode
echo ========================================
echo.

echo Starting Backend Server...
start cmd /k "cd server && npm run dev"

timeout /t 3 /nobreak > nul

echo Starting Frontend Server...
start cmd /k "cd client && npm run dev"

echo.
echo ========================================
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo ========================================
echo.
echo Press any key to exit this window...
pause > nul
