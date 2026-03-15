// src/components/common/AdminRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ReactElement } from 'react';
export default function AdminRoute({ children }: { children: ReactElement  }) {
    const { user, loading } = useAuth();

    // Đang kiểm tra token thì hiện loading
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background-dark">
                <div className="w-10 h-10 border-4 rounded-full border-t-primary border-primary/20 animate-spin"></div>
            </div>
        );
    }

    // Nếu chưa đăng nhập HOẶC role không phải admin -> Đá về login
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    if (user.role !== 'admin') {
        return <Navigate to="/dashboard" replace />; // Đã login nhưng không có quyền
    }

    // Nếu qua được ải kiểm tra, cho phép hiển thị trang Admin
    return children;
}