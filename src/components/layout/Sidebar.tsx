import { useAuth } from '../../context/AuthContext'; // 1. Import useAuth
import { NavLink, useNavigate, Link } from 'react-router-dom';
const Sidebar = () => {
  const { user, logout } = useAuth(); // 2. Lấy thông tin user và hàm logout từ Context
  const navigate = useNavigate(); // 3. Dùng để chuyển hướng sau khi đăng xuất

  const menuItems = [
    { name: 'Tổng quan', path: '/dashboard' },
    { name: 'Khóa học', path: '/dashboard/courses' },
    { name: 'Hồ sơ', path: '/dashboard/profile'},
    { name: 'Cài đặt', path: '/dashboard/settings'},
  ];

  // Hàm xử lý Đăng xuất
  const handleLogout = () => {
    logout(); // Xóa token và state
    navigate('/login'); // Đá văng ra ngoài trang Đăng nhập
  };

  return (
    
    <aside className="relative z-20 flex flex-col w-64 h-screen border-r bg-background-sidebar border-primary/20 shadow-[5px_0_15px_rgba(0,210,255,0.05)]">
      {/* Logo */}
      <div className="flex items-center gap-3 p-6 border-b border-primary/20">
        <div className="flex items-center justify-center w-8 h-8 border-2 rounded-md border-primary shadow-neon">
          <span className="text-xs font-bold text-primary">PL</span>
        </div>
        <h1 className="text-xl font-bold text-text-light">PLearn</h1>
      </div>

      {/* Menu Links */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === '/dashboard'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-primary text-white shadow-neon border-l-4 border-white'
                  : 'text-text-muted hover:bg-primary/10 hover:text-primary hover:translate-x-1'
              }`
            }
          >
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <nav>
      {/* ... Các nút Tổng quan, Khóa học hiện tại của bạn ... */}

      {/* 2. CHỈ HIỂN THỊ NÚT NÀY NẾU LÀ ADMIN */}
      {user?.role === 'admin' && (
        <NavLink 
          to="/dashboard/admin" 
          className={({ isActive }) => `
            flex items-center gap-3 px-4 py-3 mt-4 mb-2 font-bold transition-all rounded-xl
            ${isActive 
              ? 'bg-primary text-white shadow-neon' 
              : 'text-text-muted hover:bg-background-sidebar hover:text-primary'}
          `}
        >
          <span className="text-xl">⚙️</span>
          Quản lý Hệ thống
        </NavLink>
      )}
    </nav>

      {/* User Profile (Góc dưới cùng) */}
      <div className="flex items-center justify-between p-4 m-4 border rounded-lg bg-background-card border-primary/20">
        <Link to="/dashboard/profile" className="flex items-center gap-3 transition-opacity cursor-pointer hover:opacity-70">
          <div className="flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-700 border rounded-full border-primary">
            <span className="text-lg">👤</span>
          </div>
          <div className="max-w-[100px] overflow-hidden">
            <p className="text-sm font-semibold truncate text-text-light" title={user?.email}>
              {user?.email || 'Guest'}
            </p>
            <p className="text-xs text-text-muted">Online</p>
          </div>
        </Link>
        
        {/* Nút Đăng xuất */}
        <button 
          onClick={handleLogout}
          className="p-2 transition-colors rounded-md text-text-muted hover:text-red-400 hover:bg-red-500/10"
          title="Đăng xuất"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;