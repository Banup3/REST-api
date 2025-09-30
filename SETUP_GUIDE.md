# Quick Setup Guide

## 🚀 Quick Start (5 Minutes)

### Prerequisites
- Node.js 16+ installed
- MongoDB installed and running (or use Docker)

### Step 1: Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend (in new terminal)
cd frontend
npm install
```

### Step 2: Configure Environment

```bash
# In backend directory
cp .env.example .env
```

Edit `backend/.env` and set:
```env
MONGODB_URI=mongodb://localhost:27017/scalable_api
JWT_SECRET=your_secret_key_here
```

### Step 3: Start MongoDB

**Option A - Local MongoDB:**
```bash
mongod
```

**Option B - Docker:**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:7.0
```

### Step 4: Run the Application

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

### Step 5: Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Docs**: http://localhost:5000/api-docs

## 🐳 Docker Quick Start (Even Faster!)

```bash
# From project root
docker-compose up -d

# View logs
docker-compose logs -f
```

That's it! Everything is running:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- MongoDB: localhost:27017

## 📝 Testing the Application

### 1. Register a New User
- Go to http://localhost:3000
- Click "Register"
- Fill in the form (you can select "admin" role)
- Click "Create account"

### 2. Create Tasks
- After login, you'll see the dashboard
- Click "New Task" button
- Fill in task details
- Click "Create Task"

### 3. Manage Tasks
- View all your tasks on the dashboard
- Filter by status or priority
- Search tasks
- Edit or delete tasks

## 🔧 Troubleshooting

### MongoDB Connection Error
```bash
# Make sure MongoDB is running
mongod --version

# Or use Docker
docker ps | grep mongo
```

### Port Already in Use
```bash
# Backend (port 5000)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Frontend (port 3000)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Dependencies Issues
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📚 API Testing

### Using Swagger UI
1. Go to http://localhost:5000/api-docs
2. Click "Authorize" button
3. Enter: `Bearer <your-token>` (get token from login response)
4. Test any endpoint

### Using Postman
1. Import `POSTMAN_COLLECTION.json`
2. Set `base_url` variable to `http://localhost:5000/api/v1`
3. Run "Login User" request
4. Token will be auto-saved
5. Test other endpoints

## 🎯 Key Features to Test

### Authentication
- ✅ User registration with role selection
- ✅ Login with email/password
- ✅ JWT token authentication
- ✅ Protected routes
- ✅ Role-based access (user vs admin)

### Task Management
- ✅ Create tasks with title, description, status, priority
- ✅ View all tasks with pagination
- ✅ Filter by status (pending/in-progress/completed)
- ✅ Filter by priority (low/medium/high)
- ✅ Search tasks
- ✅ Update task details
- ✅ Delete tasks
- ✅ View task statistics

### Security Features
- ✅ Password hashing (bcrypt)
- ✅ JWT token validation
- ✅ Input validation
- ✅ Rate limiting
- ✅ CORS protection
- ✅ Error handling

## 🔐 Default Test Accounts

After starting the app, you can create test accounts:

**Admin Account:**
- Email: admin@example.com
- Password: admin123
- Role: admin

**User Account:**
- Email: user@example.com
- Password: user123
- Role: user

## 📊 Project Structure Overview

```
backend/
├── src/
│   ├── config/         # Database, Swagger config
│   ├── controllers/    # Business logic
│   ├── middleware/     # Auth, validation, errors
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API endpoints
│   └── utils/          # Helper functions

frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── context/        # Auth context
│   ├── pages/          # Route pages
│   └── utils/          # API client
```

## 🚀 Next Steps

1. **Explore the API**: Check Swagger docs at http://localhost:5000/api-docs
2. **Test the Frontend**: Create tasks and test all CRUD operations
3. **Review the Code**: Check the well-structured codebase
4. **Customize**: Modify according to your needs
5. **Deploy**: Use Docker or deploy to cloud platforms

## 💡 Tips

- The frontend auto-saves JWT tokens in localStorage
- Tokens expire after 7 days (configurable in .env)
- Admin users can see all tasks, regular users see only their own
- All API responses follow a consistent format
- Comprehensive error messages for debugging

## 📞 Need Help?

- Check the main README.md for detailed documentation
- Review API docs at /api-docs
- Check logs in backend/logs/ directory
- Use Postman collection for API testing

Happy coding! 🎉
