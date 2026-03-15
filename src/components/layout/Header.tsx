import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="flex items-center justify-end h-16 px-6 border-b bg-background-dark border-primary/20 relative z-10">
      <div className="flex items-center gap-4">
        {/* Nút Thông báo */}
        <button className="relative p-2 transition-colors rounded-full text-text-muted hover:text-primary hover:bg-primary/10">
          <span className="text-xl">🔔</span>
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
        </button>

        {/* Nút Tin nhắn */}
        <button className="p-2 transition-colors rounded-full text-text-muted hover:text-primary hover:bg-primary/10">
          <span className="text-xl">💬</span>
        </button>

        {/* Divider */}
        <div className="w-px h-6 mx-2 bg-primary/30"></div>

        {/* Avatar nhỏ gọn */}
        <Link to="/dashboard/profile" className="flex items-center gap-2 transition-colors hover:text-primary cursor-pointer">
          <div className="flex items-center justify-center w-8 h-8 overflow-hidden border rounded-full bg-primary/20 border-primary shadow-neon">
             <span className="text-sm">👤</span>
          </div>
          <span className="text-xs">▼</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;