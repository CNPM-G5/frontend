import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // 1. Import hook useAuth

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // 2. Lấy hàm login từ Context

  // 3. Khai báo state để lưu trữ dữ liệu người dùng nhập
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Hàm xử lý khi bấm nút Đăng nhập
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Xóa lỗi cũ trước khi kiểm tra lại

    // Bước 1: Form Validation cơ bản
    if (!email || !password) {
      setError('Vui lòng nhập đầy đủ Email và Mật khẩu nhé!');
      return;
    }

    if (!email.includes('@')) {
      setError('Email không đúng định dạng!');
      return;
    }

    // Bước 2: Giả lập gọi API (Sau này có API thật, bạn sẽ dùng axiosClient ở đây)
    // Tạm thời quy định tài khoản đúng là: admin@gmail.com / 123456
    if (email === 'admin@gmail.com' && password === '123456') {
      
      // Tạo một token và thông tin user giả để đưa cho AuthContext
      const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.gia-lap-token';
      const fakeUser = { id: '1', username: 'Sinh Viên IT', email: email };
      const fakeUser2 = { id: '2', username: 'Sinh Viên IT2', email: email };
      
      // Gọi hàm login (nó sẽ lưu token vào localStorage và cập nhật state toàn app)
      login(fakeToken, fakeUser);
      
      // Mở cửa vào Dashboard!
      navigate('/dashboard');
      
    } else {
      // Nếu nhập sai
      setError('Tài khoản hoặc mật khẩu không chính xác!');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Logo và Tiêu đề */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center w-10 h-10 border-2 rounded-lg border-primary shadow-neon">
          <span className="font-bold text-primary">SH</span>
        </div>
        <h1 className="text-2xl font-bold text-text-light">Software Hub</h1>
      </div>

      <h2 className="mb-6 text-3xl font-semibold text-text-light">Welcome Back</h2>

      {/* Hiển thị thông báo lỗi màu đỏ nếu có */}
      {error && (
        <div className="p-3 mb-6 text-sm border rounded-lg bg-red-500/10 border-red-500/50 text-red-400">
          ⚠️ {error}
        </div>
      )}

      {/* Form đăng nhập */}
      <form className="space-y-5" onSubmit={handleLogin}>
        <div>
          <input 
            type="email" 
            placeholder="you@example.com" 
            value={email} // Ràng buộc value với state
            onChange={(e) => setEmail(e.target.value)} // Cập nhật state khi gõ
            className="w-full p-3 bg-transparent border rounded-lg outline-none border-primary/40 text-text-light focus:border-primary focus:shadow-neon transition-all"
          />
        </div>
        
        <div>
          <input 
            type="password" 
            placeholder="••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-transparent border rounded-lg outline-none border-primary/40 text-text-light focus:border-primary focus:shadow-neon transition-all"
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer text-text-muted hover:text-text-light">
            <input type="checkbox" className="w-4 h-4 accent-primary" />
            Remember me
          </label>
          <a href="#" className="transition-colors text-primary hover:text-primary-dark">
            Forgot password?
          </a>
        </div>

        <button 
          type="submit" 
          className="w-full py-3 font-semibold text-white transition-all rounded-lg bg-gradient-primary hover:shadow-neon"
        >
          Đăng nhập
        </button>

        <div className="flex items-center justify-center gap-2 my-4 text-text-muted">
          <span className="w-1/4 h-px bg-text-muted/30"></span>
          <span className="text-sm">hoặc</span>
          <span className="w-1/4 h-px bg-text-muted/30"></span>
        </div>

        <button 
          type="button" 
          className="flex items-center justify-center w-full gap-2 py-3 font-semibold transition-all bg-transparent border rounded-lg text-text-light border-text-muted/40 hover:border-primary hover:text-primary"
        >
          <span className="font-bold text-red-500">G</span> Đăng nhập bằng Google
        </button>
      </form>

      {/* Nút chuyển sang trang đăng ký */}
      <div className="flex items-center justify-center mt-6 text-sm">
        <span className="mr-2 text-text-muted">Chưa có tài khoản?</span>
        <Link to="/register" className="px-3 py-1 font-semibold transition-colors border rounded text-primary hover:text-primary-dark border-primary/30">
          Đăng ký ngay
        </Link>
      </div>
    </div>
  );
};

export default Login;