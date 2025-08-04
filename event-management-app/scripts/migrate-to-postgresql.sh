#!/bin/bash

# Migration script from H2 to PostgreSQL
# This script helps migrate data from H2 to PostgreSQL

echo "🚀 Starting migration from H2 to PostgreSQL..."

# Check if PostgreSQL is running
if ! pg_isready -h localhost -p 5432; then
    echo "❌ PostgreSQL is not running. Please start PostgreSQL first."
    echo "   On macOS: brew services start postgresql"
    echo "   On Ubuntu: sudo systemctl start postgresql"
    exit 1
fi

# Create database if it doesn't exist
echo "📦 Creating database 'eventdb'..."
createdb eventdb 2>/dev/null || echo "Database 'eventdb' already exists"

# Run the schema script
echo "🔧 Setting up database schema..."
psql -d eventdb -f backend/src/main/resources/schema.sql

echo "✅ Migration setup completed!"
echo ""
echo "📋 Next steps:"
echo "1. Start the application with production profile:"
echo "   mvn spring-boot:run -Dspring-boot.run.profiles=prod"
echo ""
echo "2. Or use Docker Compose:"
echo "   docker-compose up --build"
echo ""
echo "3. Access the application:"
echo "   - Frontend: http://localhost:3000"
echo "   - Backend API: http://localhost:8080/api/events"
echo "   - PostgreSQL: localhost:5432" 