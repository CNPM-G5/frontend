import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';

const DashboardLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-background-dark">
      {/* Sidebar cố định bên trái */}
      <Sidebar />

      {/* Cột nội dung chính bên phải */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header ở trên cùng */}
        <Header />

        {/* Phần Main Content: Nơi các trang con sẽ hiển thị ra (có thanh cuộn riêng) */}
        <main className="flex-1 p-6 overflow-y-auto relative">
           {/* Background hiệu ứng sao rơi vũ trụ cho phần nội dung (giống thiết kế) */}
           <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-dark/40 via-background-dark to-background-dark"></div>
           
           {/* Nội dung trang con */}
           <div className="relative z-10">
             <Outlet />
           </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;