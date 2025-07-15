# Socket.IO Server with PostgreSQL

A Socket.IO server with dynamic topic support and PostgreSQL database integration using Prisma.

## Features

- 🔌 Dynamic Socket.IO topics and rooms
- 🗄️ PostgreSQL database with Prisma ORM
- 🔐 JWT authentication middleware
- 🐳 Docker PostgreSQL setup
- 📊 Optional pgAdmin for database management

## Quick Start

### 1. Setup Database

Run the setup script to start PostgreSQL and configure your environment:

```bash
./setup-database.sh
```

This script will:

- Create a `.env` file with database configuration
- Start PostgreSQL Docker container
- Run Prisma migrations
- Generate Prisma client

### 2. Manual Setup (Alternative)

If you prefer to set up manually:

#### Start PostgreSQL:

```bash
docker-compose up -d postgres
```

#### Create `.env` file:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/socket_io_db"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
PORT=3001
```

#### Run Prisma commands:

```bash
npx prisma migrate deploy
npx prisma generate
```

### 3. Install Dependencies

```bash
pnpm install
```

### 4. Start the Server

```bash
pnpm dev
```

The server will be available at `http://localhost:3001`

## Database Management

### pgAdmin (Optional)

If you want to use pgAdmin for database management:

```bash
docker-compose up -d
```

Then visit `http://localhost:8080` and login with:

- Email: `admin@admin.com`
- Password: `admin`

### Prisma Studio

For database management with Prisma Studio:

```bash
npx prisma studio
```

## Socket.IO API

### Connection

```javascript
const socket = io('http://localhost:3001', {
  auth: { token: 'your-jwt-token' },
})
```

### Dynamic Topics

#### Publish to any topic:

```javascript
socket.emit('publish', 'chat-room-1', { text: 'Hello world!' })
socket.emit('publish', 'notifications', {
  type: 'alert',
  content: 'New update',
})
```

#### Join/Leave rooms:

```javascript
socket.emit('join', 'chat-room-1')
socket.emit('leave', 'chat-room-1')
```

#### Room-specific messages:

```javascript
socket.emit('room_message', 'chat-room-1', { text: 'Hello room!' })
```

#### Listen to topics:

```javascript
socket.on('chat-room-1', (data) => {
  console.log(`${data.user}: ${data.message}`)
})

socket.on('room_message', (data) => {
  console.log(`Room ${data.topic}: ${data.user} - ${data.message}`)
})
```

## Docker Commands

### Start services:

```bash
docker-compose up -d
```

### Stop services:

```bash
docker-compose down
```

### View logs:

```bash
docker-compose logs postgres
```

### Reset database:

```bash
docker-compose down -v
docker-compose up -d postgres
npx prisma migrate reset
```

## Environment Variables

| Variable       | Description                  | Default                                                      |
| -------------- | ---------------------------- | ------------------------------------------------------------ |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://postgres:postgres@localhost:5432/socket_io_db` |
| `JWT_SECRET`   | Secret for JWT token signing | `your-super-secret-jwt-key-change-this-in-production`        |
| `PORT`         | Server port                  | `3001`                                                       |

## Database Schema

The application includes a `User` model with:

- `id` (auto-increment primary key)
- `email` (unique)
- `name`
- `password` (hashed)
- `isActive` (boolean, defaults to true)
- `createdAt` and `updatedAt` timestamps
