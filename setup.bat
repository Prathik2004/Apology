@echo off
REM Quick Setup Script for Windows

echo 💕 Setting up Forever With You...
echo.

echo 📦 Installing Frontend Dependencies...
cd frontend
call npm install
echo ✅ Frontend ready
echo.

echo 🎉 Setup Complete!
echo.
echo To run the project:
echo   cd frontend ^&^& npm run dev
echo.
echo Then open http://localhost:3000
echo.
echo Happy coding! ❤️
pause
