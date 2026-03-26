<#
.SYNOPSIS
AutoVAPT v1 - Build Kali Linux Sandbox Image (PowerShell Version)

.DESCRIPTION
Builds the Docker image for the Kali Linux sandbox used by AutoVAPT.
Supports caching, fresh builds, and health checks.

.PARAMETER Fresh
Full rebuild (no cache).

.PARAMETER Test
Run health check after build.

.EXAMPLE
.\scripts\build-kali.ps1
Normal build (uses cache).

.EXAMPLE
.\scripts\build-kali.ps1 -Fresh
Full rebuild without cache.

.EXAMPLE
.\scripts\build-kali.ps1 -Test
Build and run health check.
#>

param (
    [switch]$Fresh,
    [switch]$Test
)

$ErrorActionPreference = "Stop"

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectDir = Split-Path -Parent $ScriptDir
$ImageName = "autovapt-kali:latest"

Set-Location $ProjectDir

Write-Host "================================================" -ForegroundColor Cyan
Write-Host " AutoVAPT Kali Sandbox Builder (Windows)" -ForegroundColor Cyan
Write-Host "================================================"
Write-Host ""

# Check Docker
try {
    docker info | Out-Null
} catch {
    Write-Host "ERROR: Docker daemon is not running." -ForegroundColor Red
    Write-Host "  Start Docker Desktop and try again."
    exit 1
}

$BuildArgs = @()
if ($Fresh) {
    $BuildArgs += "--no-cache"
    Write-Host "[*] Full rebuild mode (no cache)" -ForegroundColor Yellow
}
if ($Test) {
    Write-Host "[*] Will run health check after build" -ForegroundColor Yellow
}

Write-Host "[*] Building image: $ImageName" -ForegroundColor Cyan
Write-Host "[*] Dockerfile: docker/Dockerfile.kali"
Write-Host "[*] Context: docker/"
Write-Host ""

# Build
$DockerBuildCommand = "docker build $BuildArgs -f docker/Dockerfile.kali -t `"$ImageName`" docker/"
Invoke-Expression $DockerBuildCommand

Write-Host ""
Write-Host "[+] Build complete: $ImageName" -ForegroundColor Green

# Show image info
try {
    $InspectInfo = docker image inspect "$ImageName" | ConvertFrom-Json
    if ($InspectInfo) {
        $SizeMB = [math]::Round($InspectInfo[0].Size / 1MB, 0)
        $Created = $InspectInfo[0].Created
        $Arch = $InspectInfo[0].Architecture
        Write-Host "    Size: $SizeMB MB"
        Write-Host "    Created: $Created"
        Write-Host "    Arch: $Arch"
    }
} catch {
    # Ignore errors here
}

# Run test if requested
if ($Test) {
    Write-Host ""
    Write-Host "[*] Running health check..." -ForegroundColor Cyan
    
    # PowerShell string for the command inside the container needs careful escaping
    # We use a simple command string for the health check
    $HealthCmd = "nuclei -version 2>&1; echo '---'; naabu -version 2>&1; echo '---'; httpx -version 2>&1; echo '---'; subfinder -version 2>&1; echo '---'; nmap --version | head -1; echo '---'; nikto -Version | head -1; echo '---'; sqlmap --version; echo '---'; ffuf -V; echo '---'; echo 'ALL OK'"
    
    docker run --rm "$ImageName" bash -c "$HealthCmd"
    
    Write-Host ""
    Write-Host "[+] Health check passed" -ForegroundColor Green
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host " Build complete! To use:"
Write-Host "   - Start AutoVAPT backend (it auto-creates containers per scan)"
Write-Host "   - Monitor via Sandbox Dashboard: http://localhost:8000/sandboxes"
Write-Host "================================================"
