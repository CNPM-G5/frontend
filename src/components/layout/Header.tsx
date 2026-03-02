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
        <button className="flex items-center gap-2 transition-colors hover:text-primary">
          <div className="w-8 h-8 border rounded-full bg-primary/20 border-primary shadow-neon"></div>
          <span className="text-xs">▼</span>
        </button>
      </div>
    </header>
  );
};

export default Header;