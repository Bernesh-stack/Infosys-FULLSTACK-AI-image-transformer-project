@echo off
echo ========================================
echo AI Image Transformer - Installation
echo ========================================
echo.

echo Installing Backend Dependencies...
cd server
call npm install
echo.

echo Installing Python Dependencies...
pip install -r transforms/requirements.txt
echo.

cd ..

echo Installing Frontend Dependencies...
cd client
call npm install
echo.

cd ..

echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Configure server/.env file
echo 2. Configure client/.env file
echo 3. Start MongoDB
echo 4. Run: start-dev.bat
echo.
pause
