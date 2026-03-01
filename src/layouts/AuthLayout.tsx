import { ReactNode } from 'react';
// 1. Import ảnh từ thư mục assets
import robotImg from '../assets/images/robot.png'; 

interface AuthLayoutProps {
  children: ReactNode; 
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-background-dark">
      <div className="flex flex-col w-full max-w-5xl overflow-hidden border md:flex-row bg-background-card border-primary/30 rounded-2xl shadow-neon">
        
        {/* CỘT TRÁI: Đã thay thế bằng ảnh Robot */}
        <div className="relative hidden w-1/2 p-10 md:flex flex-col items-center justify-center overflow-hidden">
          
          {/* Vùng phát sáng phía sau Robot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 blur-[80px] rounded-full z-0"></div>
          
          {/* 2. Thẻ hiển thị ảnh Robot */}
          <img 
            src={robotImg} 
            alt="Software Hub Robot" 
            className="relative z-10 object-contain w-80 h-80 drop-shadow-[0_0_25px_rgba(0,210,255,0.4)] hover:scale-105 transition-transform duration-500"
          />
          
          <div className="relative z-10 mt-8 text-center">
            <h2 className="text-2xl font-bold tracking-wider text-text-light uppercase">
              Software Engineering Hub
            </h2>
            <p className="mt-2 text-text-muted">Build your future with code</p>
          </div>
          
          {/* Hiệu ứng lưới/đường nét background (giữ nguyên) */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-dark via-background-card to-background-card pointer-events-none"></div>
        </div>

        {/* CỘT PHẢI: Nơi chứa Form */}
        <div className="flex flex-col justify-center w-full p-8 z-10 md:w-1/2 md:p-12 bg-background-sidebar shadow-[-10px_0_30px_rgba(0,0,0,0.5)]">
          {children}
        </div>
        
      </div>
    </div>
  );
};

export default AuthLayout;