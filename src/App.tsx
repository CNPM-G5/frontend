import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LessonPage from './pages/dashboard/LessonPage';
// 1. Import các Context và Route bảo vệ
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';

import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Overview from './pages/dashboard/Overview';
import CourseDetail from './pages/dashboard/CourseDetail';
import Courses from './pages/dashboard/Courses';
import Settings from './pages/dashboard/Settings';

import AdminRoute from './components/common/AdminRoute';
import AdminPage from './pages/dashboard/AdminPage';
import ProfilePage from './pages/dashboard/ProfilePage';
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
          <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route path="/dashboard">
              <Route index element={<Overview />} />
              <Route path="course/:id" element={<CourseDetail />} />
              <Route path="courses" element={<Courses />} />
              <Route path="lesson/:id" element={<LessonPage />} /> 
              <Route path="admin" element={
                <AdminRoute>
                  <AdminPage />
                </AdminRoute>
              } />              
              <Route path="profile" element={<ProfilePage />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
