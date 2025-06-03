import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';


// Layout
import MainLayout from './components/Layout/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/AuthPages/LoginPage';
import RegisterPage from './pages/AuthPages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CoursesListPage from './pages/CoursesPage/CoursesListPage';
import CourseDetailPage from './pages/CoursesPage/CourseDetailPage';
import LessonPage from './pages/CoursesPage/LessonPage';
import PlaygroundPage from './pages/PlaygroundPage';
import CommunityPage from './pages/CommunityPage';
import AboutPage from './pages/AboutPage';
import ProjectDetailPage from './pages/CommunityPage/ProjectDetailPage'

// Route Guard
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, initialized } = useAuthStore();
  
  if (!initialized) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-primary-600"></div>
      </div>
    );
  }
  
  return user ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  const { initialize } = useAuthStore();
  
  useEffect(() => {
    initialize();
  }, [initialize]);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Public Routes */}
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="courses" element={<CoursesListPage />} />
          <Route path="courses/:courseId" element={<CourseDetailPage />} />
          <Route path="community" element={<CommunityPage />} />
          <Route path="community/projects/:projectId" element={<ProjectDetailPage />} />
          
          {/* Protected Routes */}
          <Route path="dashboard" element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          } />
          <Route path="courses/:courseId/lessons/:lessonId" element={
            <PrivateRoute>
              <LessonPage />
            </PrivateRoute>
          } />
          <Route path="playground" element={
            <PrivateRoute>
              <PlaygroundPage />
            </PrivateRoute>
          } />
          
          
          {/* 404 Route */}
          <Route path="*" element={
            <div className="px-4 py-16 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
              <h1 className="mb-4 text-4xl font-bold text-gray-900">Page Not Found</h1>
              <p className="mb-8 text-xl text-gray-600">The page you're looking for doesn't exist or has been moved.</p>
              <button
                onClick={() => window.location.href = '/'}
                className="px-6 py-3 font-medium text-white transition-colors rounded-lg bg-primary-600 hover:bg-primary-700"
              >
                Go Back Home
              </button>
            </div>
          } />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;