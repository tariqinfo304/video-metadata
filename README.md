# Video Management App

## 1. Introduction
This document provides an overview of the Video Management App, which includes functionalities for creating, modifying, fetching, and deleting video records. The app is built using Express.js and Sequelize, providing RESTful API routes for managing video data. Redis is utilized for caching, and JWT-based authentication is implemented to ensure secure access.

## 2. Technologies Used
- **Backend Framework**: Node, Express.js
- **Database**: Sequelize ORM with MySQL
- **Caching**: Redis
- **Authentication**: JWT
- **Testing**: Jest for unit tests

## 3. Application Architecture

### 3.1 Routes
- **Authentication Routes**:
  - `GET /auth/getToken`: Fetches a JWT token.
- **Video Routes**:
  - `POST /api/videos`: Create a new video.
  - `PUT /api/videos/:id`: Modify an existing video.
  - `GET /api/videos`: Fetch a list of videos based on filters.
  - `DELETE /api/videos/:id`: Remove a video by ID.

### 3.2 Middleware
- **authMiddleware**: Verifies the JWT token from the request header to secure routes requiring user authentication.

### 3.3 Controllers
- **Video Controller**: Contains the logic for handling video-related requests, such as creating, modifying, fetching, and deleting videos. It interacts with the video service and performs error handling.
- **Authentication Controller**: Handles the generation of JWT tokens.

### 3.4 Services
- **Video Service**: Manages the business logic for video data, including CRUD operations and interactions with the Sequelize ORM.

### 3.5 Models
- **Video Model**: Defines the schema for video records, including fields like title, description, duration, genre, and tags.

### 3.6 Caching
- Redis is used to cache video data for improved performance, especially when fetching videos based on filters like genre and tags.

## 4. Flow and Process

### 4.1 Video Management
1. **Create a Video**:
   - The client sends a `POST` request with video details (title, description, duration, genre, tags).
   - The server adds the video to the database and clears the cache.
2. **Modify a Video**:
   - A `PUT` request is sent with video ID and updated details.
   - The server updates the corresponding video record and clears the cache.
3. **Fetch Videos**:
   - A `GET` request with optional filters (genre, tags, limit, offset) is sent.
   - The server first checks if the requested data is available in the cache.
   - If not, it queries the database and caches the results.
4. **Delete a Video**:
   - A `DELETE` request with the video ID is sent.
   - The server deletes the video from the database and clears the cache.

### 4.2 Authentication
- The app uses JWT for authentication. To access secured routes (video-related operations), the client must provide a valid token in the `Authorization` header.
- The `authMiddleware` verifies the token and grants or denies access.

## 5. Testing
The app uses Jest for unit testing the video-related functionalities. The tests mock service methods like `addVideo`, `updateVideo`, `getVideos`, and `deleteVideo` to simulate different scenarios.

- Tests are conducted for the following actions:
  - Creating a video
  - Modifying a video
  - Fetching videos
  - Deleting a video

Each test verifies if the correct status code and response are returned.

## 6. Database Structure

### 6.1 Video Model
```javascript
class Video extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public duration!: number;
  public genre!: string;
  public tags!: string;
}
```
The Video model defines the schema for video records, which includes:
- `id`: Auto-incrementing integer (Primary Key)
- `title`: String
- `description`: String
- `duration`: Integer
- `genre`: String
- `tags`: String

The model uses Sequelize to define the structure and interact with the PostgreSQL database.

## 7. Sequelize Database Operations
- **addVideo**: Adds a new video to the database.
- **updateVideo**: Updates an existing video based on the provided ID.
- **getVideos**: Retrieves videos based on provided filters (genre, tags, limit, offset).
- **deleteVideo**: Deletes a video based on the provided ID.

## 8. Caching with Redis
- Redis is used for caching the list of videos based on query parameters like genre and tags. This improves performance by reducing database load.
- The cache is invalidated whenever a video is created, updated, or deleted.

## 9. Security
The app uses JWT for securing routes, ensuring that only authenticated users can perform video management operations. The `authMiddleware` checks the validity of the token before granting access to secure routes.
