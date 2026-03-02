import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  // Nếu chưa đăng nhập, chuyển hướng về /login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Nếu đã đăng nhập, render các route con bên trong
  return <Outlet />;
};

export default ProtectedRoute;