@echo off
setlocal

cd /d "%~dp0"

echo ==========================================
echo Central Cash Platform - Development Start
echo Folder: %CD%
echo URL: http://localhost:3006/ar/portal
echo ==========================================
echo.

where npm.cmd >nul 2>nul
if errorlevel 1 (
  echo npm.cmd was not found. Please install Node.js first.
  pause
  exit /b 1
)

call npm.cmd run dev

if errorlevel 1 (
  echo.
  echo The platform stopped with an error.
  pause
  exit /b 1
)

endlocal
