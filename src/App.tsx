import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// 1. Import các Context và Route bảo vệ
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Overview from './pages/dashboard/Overview';
import CourseDetail from './pages/dashboard/CourseDetail';
import Courses from './pages/dashboard/Courses';
import Exercises from './pages/dashboard/Exercises';
import Progress from './pages/dashboard/Progress';
import Settings from './pages/dashboard/Settings';

function App() {
  return (
    // 2. Bọc AuthProvider ngoài cùng để toàn app nhận được State Đăng nhập
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Public Routes: Ai cũng vào được */}
          <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
          <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />

          {/* Protected Routes: Bắt buộc Đăng nhập mới được vào */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Overview />} /> 
              <Route path="course/:id" element={<CourseDetail />} />
              <Route path="courses" element={<Courses />} />
              <Route path="exercises" element={<Exercises />} />
              <Route path="progress" element={<Progress />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>
          
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;