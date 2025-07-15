# Socket.IO Server API Documentation

## Authentication

All endpoints require authentication via JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Message Endpoints

### Create Message
**POST** `/message`

Create a new message in a specific room.

**Request Body:**
```json
{
  "text": "Hello world!",
  "roomId": 1
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "text": "Hello world!",
    "createdAt": "2024-01-07T10:30:00.000Z",
    "updatedAt": "2024-01-07T10:30:00.000Z",
    "roomId": 1,
    "userId": 1,
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    },
    "room": {
      "id": 1,
      "name": "General"
    }
  }
}
```

### Get All Messages
**GET** `/message`

Get all messages with optional filtering and pagination.

**Query Parameters:**
- `roomId` (optional): Filter by room ID
- `userId` (optional): Filter by user ID
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)

**Example:** `GET /message?roomId=1&page=1&limit=10`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "text": "Hello world!",
      "createdAt": "2024-01-07T10:30:00.000Z",
      "updatedAt": "2024-01-07T10:30:00.000Z",
      "user": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com"
      },
      "room": {
        "id": 1,
        "name": "General"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  }
}
```

### Get Message by ID
**GET** `/message/:id`

Get a specific message by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "text": "Hello world!",
    "createdAt": "2024-01-07T10:30:00.000Z",
    "updatedAt": "2024-01-07T10:30:00.000Z",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    },
    "room": {
      "id": 1,
      "name": "General"
    }
  }
}
```

### Update Message
**PUT** `/message/:id`

Update a message (only the message author can update).

**Request Body:**
```json
{
  "text": "Updated message text"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "text": "Updated message text",
    "createdAt": "2024-01-07T10:30:00.000Z",
    "updatedAt": "2024-01-07T10:35:00.000Z",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    },
    "room": {
      "id": 1,
      "name": "General"
    }
  }
}
```

### Delete Message
**DELETE** `/message/:id`

Delete a message (only the message author can delete).

**Response:**
```json
{
  "success": true,
  "message": "Message deleted successfully"
}
```

### Get Messages by Room
**GET** `/message/room/:roomId`

Get all messages from a specific room with pagination.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)

**Example:** `GET /message/room/1?page=1&limit=10`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "text": "Hello world!",
      "createdAt": "2024-01-07T10:30:00.000Z",
      "updatedAt": "2024-01-07T10:30:00.000Z",
      "user": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com"
      },
      "room": {
        "id": 1,
        "name": "General"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 15,
    "pages": 2
  }
}
```

## Room Endpoints

### Create Room
**POST** `/room`

Create a new chat room.

**Request Body:**
```json
{
  "name": "General Chat"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "General Chat",
    "createdAt": "2024-01-07T10:30:00.000Z",
    "updatedAt": "2024-01-07T10:30:00.000Z",
    "_count": {
      "messages": 0
    }
  }
}
```

### Get All Rooms
**GET** `/room`

Get all rooms with message count.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "General Chat",
      "createdAt": "2024-01-07T10:30:00.000Z",
      "updatedAt": "2024-01-07T10:30:00.000Z",
      "_count": {
        "messages": 5
      }
    }
  ]
}
```

### Get Room by ID
**GET** `/room/:id`

Get a specific room by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "General Chat",
    "createdAt": "2024-01-07T10:30:00.000Z",
    "updatedAt": "2024-01-07T10:30:00.000Z",
    "_count": {
      "messages": 5
    }
  }
}
```

### Update Room
**PUT** `/room/:id`

Update a room name.

**Request Body:**
```json
{
  "name": "Updated Room Name"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Updated Room Name",
    "createdAt": "2024-01-07T10:30:00.000Z",
    "updatedAt": "2024-01-07T10:35:00.000Z",
    "_count": {
      "messages": 5
    }
  }
}
```

### Delete Room
**DELETE** `/room/:id`

Delete a room (only if it has no messages).

**Response:**
```json
{
  "success": true,
  "message": "Room deleted successfully"
}
```

## Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

### Common Error Codes:
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (missing or invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found (resource doesn't exist)

## Socket.IO Events

### Connection
```javascript
const socket = io('http://localhost:3001', {
  auth: { token: 'your-jwt-token' }
})
```

### Dynamic Topics
```javascript
// Publish to any topic
socket.emit('publish', 'chat-room-1', { text: 'Hello world!' })

// Join/Leave rooms
socket.emit('join', 'chat-room-1')
socket.emit('leave', 'chat-room-1')

// Room-specific messages
socket.emit('room_message', 'chat-room-1', { text: 'Hello room!' })
```

### Listening to Events
```javascript
// Listen to any topic
socket.on('chat-room-1', (data) => {
  console.log(`${data.user}: ${data.message}`)
})

// Listen to room messages
socket.on('room_message', (data) => {
  console.log(`Room ${data.topic}: ${data.user} - ${data.message}`)
})
``` 