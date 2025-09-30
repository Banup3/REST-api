# Scalable REST API with Authentication & Role-Based Access

A production-ready full-stack application featuring a Node.js/Express REST API with JWT authentication, role-based access control, and a modern React frontend.

## 🚀 Features

### Backend
- ✅ **Authentication & Authorization**
  - JWT-based authentication with access and refresh tokens
  - Password hashing using bcrypt
  - Role-based access control (User & Admin)
  - Protected routes with middleware

- ✅ **Task Management CRUD**
  - Create, Read, Update, Delete operations
  - Task filtering by status and priority
  - Pagination support
  - Task statistics and analytics

- ✅ **Security & Best Practices**
  - Input validation and sanitization
  - Rate limiting
  - Helmet.js for security headers
  - CORS configuration
  - Error handling middleware
  - Request logging with Winston

- ✅ **API Features**
  - RESTful API design
  - API versioning (v1)
  - Swagger/OpenAPI documentation
  - Comprehensive error responses
  - MongoDB with Mongoose ODM

### Frontend
- ✅ **Modern React UI**
  - Built with React 18 and Vite
  - Responsive design with Tailwind CSS
  - Beautiful UI with Lucide icons
  - Toast notifications

- ✅ **Authentication Flow**
  - User registration and login
  - Protected routes
  - JWT token management
  - Auto-redirect on token expiration

- ✅ **Task Management Interface**
  - Dashboard with task statistics
  - Create, edit, and delete tasks
  - Filter by status and priority
  - Search functionality
  - Real-time updates

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- npm or yarn

## 🛠️ Installation & Setup

### Option 1: Manual Setup

#### 1. Clone the repository
```bash
git clone <repository-url>
cd backendtask
```

#### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Update .env with your configuration
# Make sure MongoDB is running
```

#### 3. Frontend Setup
```bash
cd frontend
npm install
```

#### 4. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

The backend will run on `http://localhost:5000` and frontend on `http://localhost:3000`.

### Option 2: Docker Setup

#### 1. Using Docker Compose (Recommended)
```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

This will start:
- MongoDB on port 27017
- Backend API on port 5000
- Frontend on port 3000

## 📚 API Documentation

Once the backend is running, access the interactive API documentation at:
- **Swagger UI**: http://localhost:5000/api-docs

### API Endpoints

#### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/me` - Get current user profile
- `PUT /api/v1/auth/profile` - Update user profile
- `PUT /api/v1/auth/change-password` - Change password

#### Tasks
- `GET /api/v1/tasks` - Get all tasks (with filters)
- `GET /api/v1/tasks/:id` - Get single task
- `POST /api/v1/tasks` - Create new task
- `PUT /api/v1/tasks/:id` - Update task
- `DELETE /api/v1/tasks/:id` - Delete task
- `GET /api/v1/tasks/stats` - Get task statistics

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/scalable_api
JWT_SECRET=secret456
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your_refresh_token_secret_change_this
JWT_REFRESH_EXPIRE=30d
CORS_ORIGIN=http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 🧪 Testing the API

### Using the Frontend
1. Navigate to http://localhost:3000
2. Register a new account or use demo credentials
3. Login and access the dashboard
4. Create, edit, and manage tasks

### Using Swagger UI
1. Navigate to http://localhost:5000/api-docs
2. Click "Authorize" and enter your JWT token
3. Test all endpoints interactively

### Using Postman/Thunder Client

#### 1. Register a User
```bash
POST http://localhost:5000/api/v1/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

#### 2. Login
```bash
POST http://localhost:5000/api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### 3. Create a Task (Requires JWT Token)
```bash
POST http://localhost:5000/api/v1/tasks
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "title": "Complete project documentation",
  "description": "Write comprehensive README and API docs",
  "status": "pending",
  "priority": "high",
  "dueDate": "2025-10-15"
}
```

## 📁 Project Structure

```
backendtask/
├── backend/
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── controllers/     # Request handlers
│   │   ├── middleware/      # Custom middleware
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── utils/           # Utility functions
│   │   ├── app.js           # Express app setup
│   │   └── server.js        # Server entry point
│   ├── logs/                # Application logs
│   ├── .env.example         # Environment variables template
│   ├── package.json
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── context/         # Context providers
│   │   ├── pages/           # Page components
│   │   ├── utils/           # Utility functions
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Rate Limiting**: Prevent brute force attacks
- **Input Validation**: express-validator for request validation
- **Helmet.js**: Security headers
- **CORS**: Configured for specific origins
- **Error Handling**: Comprehensive error middleware
- **MongoDB Injection Prevention**: Mongoose sanitization

## 🎨 Frontend Features

- **Responsive Design**: Mobile-first approach
- **Modern UI**: Tailwind CSS with custom components
- **State Management**: React Context API
- **Protected Routes**: Authentication-based routing
- **Toast Notifications**: User feedback for actions
- **Loading States**: Better UX with loading indicators
- **Error Handling**: Graceful error messages

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/Render)
1. Set environment variables
2. Ensure MongoDB connection string is correct
3. Deploy using platform-specific commands

### Frontend Deployment (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Configure environment variables

### Docker Deployment
```bash
docker-compose up -d --build
```

## 📝 API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built with ❤️ as a demonstration of scalable REST API architecture.

## 🙏 Acknowledgments

- Express.js for the robust backend framework
- React for the powerful frontend library
- MongoDB for the flexible database
- Tailwind CSS for the beautiful styling

---

**Note**: Remember to change all default secrets and passwords in production!
