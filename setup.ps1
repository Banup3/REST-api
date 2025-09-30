# PowerShell Setup Script for Task Manager Application

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Task Manager - Setup Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js installation
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js is installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js is not installed!" -ForegroundColor Red
    Write-Host "Please install Node.js from: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Check MongoDB
Write-Host "Checking MongoDB..." -ForegroundColor Yellow
$mongoInstalled = $false
try {
    mongod --version | Out-Null
    $mongoInstalled = $true
    Write-Host "✓ MongoDB is installed locally" -ForegroundColor Green
} catch {
    Write-Host "✗ MongoDB is not installed locally" -ForegroundColor Yellow
    Write-Host "You can:" -ForegroundColor Yellow
    Write-Host "  1. Use MongoDB Atlas (cloud - free)" -ForegroundColor Cyan
    Write-Host "  2. Install MongoDB locally" -ForegroundColor Cyan
    Write-Host "See INSTALL_MONGODB.md for instructions" -ForegroundColor Cyan
}

Write-Host ""

# Setup Backend
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Setting up Backend..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

if (Test-Path "backend/.env") {
    Write-Host "✓ Backend .env file already exists" -ForegroundColor Green
} else {
    Write-Host "Creating backend .env file..." -ForegroundColor Yellow
    Copy-Item "backend/.env.example" "backend/.env"
    Write-Host "✓ Created backend/.env from template" -ForegroundColor Green
    Write-Host "⚠ IMPORTANT: Edit backend/.env and update MONGODB_URI" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
Set-Location backend
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Backend dependencies installed successfully" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to install backend dependencies" -ForegroundColor Red
    exit 1
}
Set-Location ..

Write-Host ""

# Setup Frontend
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Setting up Frontend..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
Set-Location frontend
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Frontend dependencies installed successfully" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to install frontend dependencies" -ForegroundColor Red
    exit 1
}
Set-Location ..

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Setup Complete! 🎉" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Configure MongoDB:" -ForegroundColor Cyan
Write-Host "   - Edit backend/.env and set MONGODB_URI" -ForegroundColor White
Write-Host "   - See INSTALL_MONGODB.md for MongoDB setup options" -ForegroundColor White
Write-Host ""
Write-Host "2. Start Backend (Terminal 1):" -ForegroundColor Cyan
Write-Host "   cd backend" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "3. Start Frontend (Terminal 2):" -ForegroundColor Cyan
Write-Host "   cd frontend" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "4. Open your browser:" -ForegroundColor Cyan
Write-Host "   http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "📚 Documentation:" -ForegroundColor Yellow
Write-Host "   - README.md - Complete documentation" -ForegroundColor White
Write-Host "   - NEXT_STEPS.md - Detailed next steps" -ForegroundColor White
Write-Host "   - INSTALL_MONGODB.md - MongoDB setup guide" -ForegroundColor White
Write-Host ""
Write-Host "Happy coding! 🚀" -ForegroundColor Green
