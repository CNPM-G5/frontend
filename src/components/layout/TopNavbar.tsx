// src/components/layout/TopNavbar.tsx
import { Link } from 'react-router-dom';

const TopNavbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-md px-6 py-4 flex items-center justify-between">
      <div className="font-bold text-xl tracking-wider">
        <Link to="/courses">IT Learning</Link>
      </div>
      <div className="flex gap-4 items-center">
        <span className="text-sm">Xin chào, Học viên</span>
        <button className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded text-sm transition">
          Đăng xuất
        </button>
      </div>
    </nav>
  );
};

export default TopNavbar;