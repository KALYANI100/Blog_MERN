# MERN Blog with Authentication

A full-stack blog application built with MongoDB, Express, React, and Node.js featuring user authentication, registration, and blog CRUD operations with a modern white/blue theme and landing page.

## Project Structure

```
Backend/
├── models/
│   ├── User.js          # User schema with password hashing
│   └── Blog.js          # Blog schema with author reference
├── routes/
│   ├── auth.js          # Authentication endpoints (register, login, logout, me)
│   └── blogs.js         # Blog CRUD endpoints (protected)
├── middleware/
│   └── auth.js          # JWT authentication middleware
├── package.json         # Backend dependencies
└── server.js            # Express server setup

Frontend/
├── src/
│   ├── AuthContext.js   # Authentication context and provider
│   ├── Landing.js       # Beautiful landing page with features
│   ├── Login.js         # Login & Register component (white/blue theme)
│   ├── Blog.js          # Main blog component with CRUD (white/blue theme)
│   ├── App.js           # Main app component with routing logic
│   ├── index.js         # React entry point
│   └── ...other files
└── package.json         # Frontend dependencies
```

## Features

✅ Beautiful landing page with feature showcase
✅ User Registration with password confirmation
✅ User Login with JWT authentication
✅ Create, Read, Update, Delete (CRUD) blog posts
✅ Password hashing with bcryptjs
✅ Protected routes requiring authentication
✅ User-specific blog posts
✅ Persistent login with localStorage
✅ Modern white/blue theme with smooth animations
✅ Responsive design for all devices
✅ Clean, professional UI

## Design Theme

- **Color Scheme**: White & Blue (#0066cc primary)
- **Font Family**: Poppins (headings) + Inter (body)
- **Gradients**: Subtle light blue gradient backgrounds
- **Animations**: Smooth transitions and hover effects
- **Shadows**: Soft, modern box shadows for depth

## Setup Instructions

### Backend Setup

1. Navigate to the Backend folder:

   ```bash
   cd Backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   node server.js
   ```

   The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the Frontend folder:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

   The frontend will open at `http://localhost:3000`

## API Endpoints

### Authentication Routes (`/api/auth`)

- **POST /register** - Register a new user

  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }
  ```

- **POST /login** - Login user

  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- **GET /me** - Get current user (requires token)

- **POST /logout** - Logout user

### Blog Routes (`/api/blogs`)

- **GET /** - Get all blogs
- **POST /** - Create a blog (requires token)
- **GET /:id** - Get a specific blog
- **PUT /:id** - Update a blog (requires token, author only)
- **DELETE /:id** - Delete a blog (requires token, author only)
- **GET /user/:userId** - Get blogs by a specific user

## Authentication Flow

1. User registers or logs in from the Login component
2. Backend returns JWT token
3. Token is stored in localStorage
4. AuthContext manages authentication state globally
5. Protected routes check for valid token
6. Token is sent in Authorization header for protected requests

## Technologies Used

### Backend

- **Express.js** - Web framework
- **MongoDB/Mongoose** - Database
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **cors** - Cross-origin resource sharing

### Frontend

- **React** - UI library
- **Axios** - HTTP client
- **React Context API** - State management
- **LocalStorage** - Persistent authentication

## Environment Variables

The backend uses these settings (currently hardcoded, consider using .env):

- MongoDB connection string
- JWT secret key
- Server port (5000)

## Security Notes

- Passwords are hashed using bcryptjs before storing
- JWT tokens expire after 7 days
- Protected routes require valid authentication token
- Users can only edit/delete their own posts
- Password is excluded from API responses

## Future Enhancements

- [ ] Add .env file for sensitive data
- [ ] Implement password reset functionality
- [ ] Add email verification
- [ ] Implement blog post categories/tags
- [ ] Add search functionality
- [ ] Implement pagination
- [ ] Add comments on blog posts
- [ ] Implement user profiles
- [ ] Add social sharing features

## Troubleshooting

**Backend won't start:**

- Ensure MongoDB connection string is correct
- Check if port 5000 is available
- Verify all dependencies are installed

**Login fails:**

- Check if backend is running on port 5000
- Verify MongoDB is connected
- Check browser console for error details

**Frontend can't connect to backend:**

- Ensure backend is running
- Check CORS is enabled (it is by default)
- Verify API endpoint URLs in AuthContext.js and Blog.js

## Running Both Simultaneously

Open two terminals:

1. Terminal 1: `cd Backend && node server.js`
2. Terminal 2: `cd frontend && npm start`

The app should now be fully functional!
