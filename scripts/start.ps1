<#
.SYNOPSIS
AutoVAPT v1 - Start Application (PowerShell Version)

.DESCRIPTION
Starts the AutoVAPT backend and frontend services for local development.
Checks for environment configuration and dependencies.

.PARAMETER BackendOnly
Only start the backend service.

.PARAMETER FrontendOnly
Only start the frontend service.

.EXAMPLE
.\scripts\start.ps1
Starts both backend and frontend.
#>

param (
    [switch]$BackendOnly,
    [switch]$FrontendOnly
)

$ErrorActionPreference = "Stop"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectDir = Split-Path -Parent $ScriptDir

Set-Location $ProjectDir

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  AutoVAPT v1 - AI-Powered Penetration Testing" -ForegroundColor Cyan
Write-Host "================================================"
Write-Host ""

# 1. Check .env
if (-not (Test-Path ".env")) {
    Write-Host "[!] No .env file found. Creating from .env.example..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "IMPORTANT: Edit .env and configure your API keys!" -ForegroundColor Red
    Read-Host "Press Enter to continue..."
}

# 2. Start Backend
if (-not $FrontendOnly) {
    Write-Host "[*] Starting Backend (Port 8000)..." -ForegroundColor Green
    
    # Check for venv
    if (Test-Path ".venv\Scripts\Activate.ps1") {
        # We can't easily activate in the same scope and run async without a new window
        # So we start a new process that activates and runs uvicorn
        $BackendCmd = "powershell -NoExit -Command `".venv\Scripts\Activate.ps1; uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000`""
        Start-Process powershell -ArgumentList "-Id", "AutoVAPT_Backend", "-Command", $BackendCmd
    }
    elseif (Test-Path "venv\Scripts\Activate.ps1") {
        $BackendCmd = "powershell -NoExit -Command `"venv\Scripts\Activate.ps1; uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000`""
        Start-Process powershell -ArgumentList "-Id", "AutoVAPT_Backend", "-Command", $BackendCmd
    }
    else {
        # Assume python is in path
        $BackendCmd = "uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000"
        Start-Process powershell -ArgumentList "-NoExit", "-Command", $BackendCmd
    }
    
    Write-Host "    -> Backend launched in new window."
}

# 3. Start Frontend
if (-not $BackendOnly) {
    Write-Host "[*] Starting Frontend (Port 3000)..." -ForegroundColor Green
    
    if (Test-Path "frontend") {
        Set-Location "$ProjectDir\frontend"
        $FrontendCmd = "npm run dev"
        Start-Process powershell -ArgumentList "-NoExit", "-Command", $FrontendCmd
        Set-Location $ProjectDir
        Write-Host "    -> Frontend launched in new window."
    }
    else {
        Write-Host "[!] Frontend directory not found!" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host " AutoVAPT is starting..."
Write-Host "   - Backend API:   http://localhost:8000"
Write-Host "   - Web Interface: http://localhost:3000"
Write-Host "   - API Docs:      http://localhost:8000/docs"
Write-Host "================================================"
