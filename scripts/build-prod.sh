#!/bin/bash

# Production optimization script for Doars Cricket Academy

echo "🏏 Doars Cricket Academy - Production Optimization"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2)
REQUIRED_VERSION="18.0.0"

if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" != "$REQUIRED_VERSION" ]; then
    print_error "Node.js version $NODE_VERSION is not supported. Please use Node.js 18 or higher."
    exit 1
fi

print_status "Node.js version check passed"

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist node_modules/.vite
print_status "Build artifacts cleaned"

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --silent
print_status "Dependencies installed"

# Run linting
echo "🔍 Running code quality checks..."
npm run lint
if [ $? -ne 0 ]; then
    print_warning "Linting issues found. Running auto-fix..."
    npm run lint:fix
fi
print_status "Code quality checks completed"

# Build for production
echo "🏗️ Building for production..."
npm run build:prod
if [ $? -ne 0 ]; then
    print_error "Production build failed"
    exit 1
fi
print_status "Production build completed"

# Check build size
echo "📊 Analyzing build size..."
BUILD_SIZE=$(du -sh dist | cut -f1)
print_status "Build size: $BUILD_SIZE"

# Verify critical files exist
if [ ! -f "dist/index.html" ]; then
    print_error "index.html not found in build output"
    exit 1
fi

if [ ! -d "dist/assets" ]; then
    print_error "Assets directory not found in build output"
    exit 1
fi

print_status "Build verification completed"

echo ""
echo "🎉 Production optimization completed successfully!"
echo ""
echo "📁 Build output: ./dist/"
echo "🌐 To preview: npm run preview:prod"
echo "🚀 Ready for deployment!"
echo ""
echo "Deployment checklist:"
echo "  □ Update environment variables on hosting platform"
echo "  □ Configure server for SPA routing"
echo "  □ Set up SSL certificate"
echo "  □ Configure CDN (optional)"
echo "  □ Set up monitoring and analytics"

exit 0
