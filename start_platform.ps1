$ErrorActionPreference = "Stop"

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host " Turnpike Analyst - Platform Startup Script " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# Check Python and Node
$pythonCmd = "python"
if (Get-Command "py" -ErrorAction SilentlyContinue) { $pythonCmd = "py" }

Write-Host "`n[1/3] Verifying Backend Dependencies and Database Seeding..." -ForegroundColor Yellow
Set-Location -Path "$PSScriptRoot\backend"
& $pythonCmd -m pip install -r requirements.txt | Out-Null
Write-Host "Running DB seeder (this ensures collections, indices and default data)..."
& $pythonCmd -m scripts.seed_data

Write-Host "`n[2/3] Starting FastAPI Backend on port 8000..." -ForegroundColor Yellow
# Start Uvicorn in a new window so the terminal isn't blocked
Start-Process -FilePath $pythonCmd -ArgumentList "-m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000"

Write-Host "`n[3/3] Verifying Frontend Dependencies and Starting Vite Dev Server..." -ForegroundColor Yellow
Set-Location -Path "$PSScriptRoot\frontend\turnpike-insight-suite-main"

if (Get-Command "bun" -ErrorAction SilentlyContinue) {
    Write-Host "Bun detected. Installing dependencies with Bun..."
    bun install
    Write-Host "Starting Vite Dev Server..."
    Start-Process -FilePath "bun" -ArgumentList "run dev"
} elseif (Get-Command "npm" -ErrorAction SilentlyContinue) {
    Write-Host "NPM detected. Installing dependencies with npm..."
    npm install
    Write-Host "Starting Vite Dev Server..."
    Start-Process -FilePath "npm.cmd" -ArgumentList "run dev"
} else {
    Write-Host "Node package manager (bun or npm) not found!" -ForegroundColor Red
}

Write-Host "`n==========================================" -ForegroundColor Green
Write-Host " Both servers are launching in the background! " -ForegroundColor Green
Write-Host " Backend API: http://127.0.0.1:8000/docs" -ForegroundColor Green
Write-Host " Frontend UI: Usually http://localhost:5173 or http://localhost:3000" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
