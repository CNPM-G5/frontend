import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="w-full max-w-md mx-auto">
      {/* Khung Tiêu đề nổi bật */}
      <div className="mb-8 bg-background-dark py-4 px-6 rounded-xl border border-primary/20 shadow-[0_0_15px_rgba(0,210,255,0.1)] flex justify-center">
        <h2 className="text-3xl font-bold text-text-light tracking-wide">
          Tạo tài khoản mới
        </h2>
      </div>

      {/* Form đăng ký */}
      <form className="space-y-4">
        <div className="relative">
          {/* Tạm dùng icon text, sau này bạn có thể thay bằng icon xịn từ thư viện */}
          <span className="absolute left-4 top-3.5 text-primary opacity-70">👤</span>
          <input 
            type="text" 
            placeholder="Tên của bạn" 
            className="w-full p-3 pl-12 bg-transparent border rounded-lg outline-none border-primary/40 text-text-light focus:border-primary focus:shadow-neon transition-all"
          />
        </div>
        
        <div className="relative">
          <span className="absolute left-4 top-3.5 text-primary opacity-70">✉️</span>
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full p-3 pl-12 bg-transparent border rounded-lg outline-none border-primary/40 text-text-light focus:border-primary focus:shadow-neon transition-all"
          />
        </div>

        <div className="relative">
          <span className="absolute left-4 top-3.5 text-primary opacity-70">🔒</span>
          <input 
            type="password" 
            placeholder="Mật khẩu" 
            className="w-full p-3 pl-12 bg-transparent border rounded-lg outline-none border-primary/40 text-text-light focus:border-primary focus:shadow-neon transition-all"
          />
        </div>

        <div className="relative">
          <span className="absolute left-4 top-3.5 text-primary opacity-70">🔒</span>
          <input 
            type="password" 
            placeholder="Nhập lại mật khẩu" 
            className="w-full p-3 pl-12 bg-transparent border rounded-lg outline-none border-primary/40 text-text-light focus:border-primary focus:shadow-neon transition-all"
          />
          <span className="absolute right-4 top-3.5 text-primary cursor-pointer hover:text-text-light">👁️</span>
        </div>

        <button 
          type="button" 
          className="w-full py-3 mt-4 font-bold text-white transition-all rounded-lg bg-gradient-primary hover:shadow-neon tracking-wider uppercase"
        >
          Đăng ký
        </button>
      </form>

      {/* Chuyển hướng về trang Đăng nhập */}
      <div className="flex items-center justify-center mt-6 text-sm">
        <span className="text-text-muted mr-2">Đã có tài khoản?</span>
        <Link to="/login" className="text-primary hover:text-primary-dark transition-colors font-semibold border border-primary/30 px-3 py-1 rounded">
          Đăng nhập
        </Link>
      </div>
    </div>
  );
};

export default Register;