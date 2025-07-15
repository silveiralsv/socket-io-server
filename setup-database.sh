#!/bin/bash

echo "🚀 Setting up PostgreSQL Docker container for Socket.IO server..."

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOF
# Database Configuration
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/socket_io_db"

# JWT Secret (you should change this in production)
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Server Configuration
PORT=3001
EOF
    echo "✅ .env file created"
else
    echo "ℹ️  .env file already exists"
fi

# Start Docker containers
echo "🐳 Starting PostgreSQL Docker container..."
docker-compose up -d postgres

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL to be ready..."
sleep 5

# Run Prisma migrations
echo "🔄 Running Prisma migrations..."
npx prisma migrate deploy

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

echo "✅ Database setup complete!"
echo ""
echo "📊 Database Info:"
echo "   - Host: localhost"
echo "   - Port: 5432"
echo "   - Database: socket_io_db"
echo "   - User: postgres"
echo "   - Password: postgres"
echo ""
echo "🌐 Optional pgAdmin (if you started it):"
echo "   - URL: http://localhost:8080"
echo "   - Email: admin@admin.com"
echo "   - Password: admin"
echo ""
echo "🚀 You can now start your server with: npm run dev" 