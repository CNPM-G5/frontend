const Settings = () => {
  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex items-center gap-4 mb-8">
        <span className="flex items-center justify-center w-12 h-12 text-2xl border rounded-xl bg-primary/20 border-primary shadow-neon">⚙️</span>
        <div>
          <h1 className="text-3xl font-bold text-text-light">Cài đặt hệ thống</h1>
          <p className="text-text-muted">Tùy chỉnh trải nghiệm và bảo mật tài khoản</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Khối Cài đặt Tài khoản */}
        <div className="p-6 border rounded-xl bg-background-sidebar border-primary/20">
          <h2 className="mb-4 text-xl font-bold text-primary">Bảo mật tài khoản</h2>
          <form className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm text-text-muted mb-1">Mật khẩu hiện tại</label>
              <input type="password" placeholder="••••••••" className="w-full p-3 bg-background-dark border rounded-lg outline-none border-primary/40 text-text-light focus:border-primary focus:shadow-neon" />
            </div>
            <div>
              <label className="block text-sm text-text-muted mb-1">Mật khẩu mới</label>
              <input type="password" placeholder="••••••••" className="w-full p-3 bg-background-dark border rounded-lg outline-none border-primary/40 text-text-light focus:border-primary focus:shadow-neon" />
            </div>
            <button type="button" className="px-6 py-2 mt-2 font-bold text-white transition-all rounded-lg bg-gradient-primary hover:shadow-neon">
              Đổi mật khẩu
            </button>
          </form>
        </div>

        {/* Khối Tùy chỉnh Giao diện & Thông báo */}
        <div className="p-6 border rounded-xl bg-background-sidebar border-primary/20">
          <h2 className="mb-4 text-xl font-bold text-primary">Tùy chọn hiển thị & Thông báo</h2>
          
          <div className="space-y-4">
            {/* Toggle 1 */}
            <div className="flex items-center justify-between p-4 border rounded-lg bg-background-dark border-primary/10">
              <div>
                <p className="font-bold text-text-light">Chế độ tối (Dark Mode)</p>
                <p className="text-sm text-text-muted">Sử dụng giao diện nền tối bảo vệ mắt</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-neon"></div>
              </label>
            </div>

            {/* Toggle 2 */}
            <div className="flex items-center justify-between p-4 border rounded-lg bg-background-dark border-primary/10">
              <div>
                <p className="font-bold text-text-light">Thông báo Email</p>
                <p className="text-sm text-text-muted">Nhận email khi có bài tập hoặc khóa học mới</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Settings;