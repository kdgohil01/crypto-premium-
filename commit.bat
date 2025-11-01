@echo off
git add .
git commit -m "Fix backend for Vercel serverless"
git push
echo.
echo ==========================================
echo   Changes pushed! Vercel will auto-deploy
echo ==========================================
pause
