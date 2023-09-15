# Music-Streaming-App

## Backend for Music Streaming App

Welcome to the backend section for Music Streaming App! This repository contains the server-side code responsible for handling user authentication, managing playlists, and serving music-related data. This README will guide you through setting up the backend code and provide an overview of its structure and functionality.

### Table of Contents
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables)
- [Middleware](#middleware)
- [Routes](#routes)
- [Controllers](#controllers)
- [Models](#models)
- [Database](#database)
- [Authentication](#authentication)
- [Endpoints](#endpoints)
- [Contributing](#contributing)
- [License](#license)

### Prerequisites
Before setting up the backend, make sure you have the following software installed on your system:
- Node.js (v14.x or higher)
- MongoDB (v4.x or higher)
- Git (optional, but recommended for version control)

### Getting Started
Follow these steps to get the backend up and running on your local machine:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/Music-Streaming-App.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Music-Streaming-App
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and set the necessary environment variables (see [Environment Variables](#environment-variables)).

5. Start the server:
   ```bash
   npm start
   ```

6. Your backend server should now be running on `http://localhost:5000`.

### Folder Structure
The backend code is organized into the following main directories:

- **middleware**: Contains custom middleware functions used for authentication and request handling.
- **models**: Defines the data models (e.g., User, Song, Playlist) using Mongoose.
- **routes**: Contains route definitions for different API endpoints.
- **controllers**: Implements the logic for handling HTTP requests.
- **config**: Houses configuration files, if any.
- **uploads**: Stores uploaded files (e.g., song audio files).
- **tests**: Contains test files and configurations (if testing is implemented).

### Environment Variables
To run the backend code successfully, you need to set the following environment variables in your `.env` file:

- `MONGODB`: MongoDB connection URI.
- `TOKEN_KEY`: Secret key for JWT (JSON Web Token) generation.
- (Additional variables based on your specific configuration, if any.)

Here's an example `.env` file:

```env
MONGODB=mongodb://localhost:27017/your-music-app
TOKEN_KEY=your-secret-key
```

### Middleware
The `middleware` directory contains functions responsible for various tasks, such as user authentication (`verifyjwt`), handling cookies, and error handling. Middleware functions are used in the route definitions to add specific functionality to the routes.

### Routes
Routes define the API endpoints and their associated middleware and controller functions. Each route file is responsible for a specific set of related endpoints (e.g., user routes, song routes, playlist routes).

### Controllers
Controllers implement the logic for handling HTTP requests. They interact with the data models and services to perform actions such as user registration, song upload, playlist management, and more.

### Models
The `models` directory defines the data schemas using Mongoose. Each model (e.g., User, Song, Playlist) corresponds to a collection in the MongoDB database and provides methods for interacting with that data.

### Database
The backend uses MongoDB as its database. Make sure you have MongoDB installed and running. You can configure the database connection URI in the `.env` file.

### Authentication
The backend uses JWT (JSON Web Tokens) for user authentication. When a user registers or logs in, a token is generated and stored in a cookie for subsequent authentication on protected routes.

### Endpoints
The backend provides various endpoints for user registration, authentication, song management, playlist management, and more. Each endpoint is documented in the route files, and you can test them using tools like Postman or by integrating them with your frontend.

### Contributing
Feel free to contribute to the development of the backend by submitting issues, feature requests, or pull requests. Follow the standard Git branching workflow and maintain a clean and well-documented codebase.

### License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Thank you for using this backend code for my Music App! If you have any questions or need further assistance, please don't hesitate to reach out to the maintainers of this repository.
