import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, Shield, Zap, Database } from 'lucide-react';

const Home = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: <Shield className="h-8 w-8 text-primary-600" />,
      title: 'Secure Authentication',
      description: 'JWT-based authentication with password hashing and role-based access control'
    },
    {
      icon: <Zap className="h-8 w-8 text-primary-600" />,
      title: 'Fast & Scalable',
      description: 'Built with performance in mind using Node.js, Express, and MongoDB'
    },
    {
      icon: <Database className="h-8 w-8 text-primary-600" />,
      title: 'RESTful API',
      description: 'Well-structured API with versioning, validation, and comprehensive error handling'
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-primary-600" />,
      title: 'Task Management',
      description: 'Complete CRUD operations for managing tasks with status and priority tracking'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 sm:text-6xl md:text-7xl">
            Scalable REST API
            <span className="block text-primary-600">with Authentication</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600">
            A production-ready REST API with JWT authentication, role-based access control,
            and comprehensive task management features.
          </p>
          <div className="mt-10 flex justify-center space-x-4">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-3 border border-primary-600 text-base font-medium rounded-lg text-primary-600 bg-white hover:bg-primary-50 transition"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary-100 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* API Documentation Link */}
        <div className="mt-20 text-center">
          <div className="bg-white rounded-xl shadow-md p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              API Documentation
            </h2>
            <p className="text-gray-600 mb-6">
              Explore our comprehensive API documentation with Swagger UI
            </p>
            <a
              href="http://localhost:5000/api-docs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition"
            >
              View API Docs
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
