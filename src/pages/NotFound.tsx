import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full p-4 bg-background-dark">
      <div className="text-center max-w-md">
        <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-4xl font-bold text-text-light mb-4">Trang không tìm thấy</h2>
        <p className="text-text-muted text-lg mb-8">
          Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
        </p>
        
        <div className="flex flex-col gap-4">
          <Link 
            to="/login"
            className="px-6 py-3 font-bold text-white transition-all rounded-lg bg-primary hover:bg-primary-dark shadow-neon"
          >
            Về Trang Đăng Nhập
          </Link>
          <Link 
            to="/dashboard"
            className="px-6 py-3 font-bold text-primary transition-all rounded-lg border-2 border-primary hover:bg-primary hover:text-white"
          >
            Về Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
