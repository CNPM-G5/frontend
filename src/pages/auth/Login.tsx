import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { loginApi, getProfileApi } from '../../api/authApi'; // Import API từ code cũ của bạn

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  // States quản lý form và trạng thái y như code cũ
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Logic xử lý y hệt code cũ của bạn
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Validate email format @gmail.com
      if (!email.toLowerCase().endsWith('@gmail.com')) {
        setError('Email phải có định dạng @gmail.com');
        setLoading(false);
        return;
      }

      // 1. Gọi API lấy dữ liệu
      const res = await loginApi({ email, password });
      
      // 2. Chuyền token và user vào AuthContext để hệ thống ghi nhớ (Hết bị đá văng)
      login(res.data.token, res.data.user);
      
      // 3. Fetch full profile để đảm bảo avatar_url được load đúng
      try {
        const profileRes = await getProfileApi();
        login(res.data.token, profileRes.data.user);
      } catch (err) {
        // Nếu fetch profile thất bại, vẫn dùng data từ login
        console.warn('Could not fetch full profile, using login data');
      }
      
      // 4. Chuyển hướng thành công
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen font-sans bg-background-dark w-full m-0 p-0 absolute top-0 left-0">
      
      {/* NỬA TRÁI (Màu nâu đen) */}
      <div className="hidden md:flex md:w-1/2 bg-background-brown p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="flex items-center justify-center w-10 h-10 border rounded border-primary text-primary font-bold">PL</div>
            <span className="text-xl font-bold text-text-white">PLearn</span>
          </div>

          <p className="mb-4 text-xs font-bold tracking-widest uppercase text-primary">Công nghệ phần mềm </p>
          <h1 className="mb-6 text-5xl font-bold leading-tight text-text-white">
            Học Lập Trình <br /> Theo Chuẩn <br /> Công Nghiệp
          </h1>
          <p className="max-w-md mb-12 leading-relaxed text-text-muted">
            Nền tảng học Software Engineering toàn diện — từ kiến trúc hệ thống đến DevOps. Dành cho sinh viên CNTT và lập trình viên chuyên nghiệp.
          </p>
        </div>
      </div>

      {/* NỬA PHẢI (Màu kem sáng) - Khu vực Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 relative bg-background-dark">
        <div className="absolute flex p-1 rounded-full top-8 bg-background-sidebar border border-[#e2dcd0]">
          <button className="px-8 py-2 font-bold text-white transition-all rounded-full bg-primary shadow-neon">Đăng Nhập</button>
          <Link to="/register" className="px-8 py-2 font-bold transition-colors text-text-muted hover:text-text-light">Đăng Ký</Link>
        </div>

        <div className="w-full max-w-md mt-16">
          <h2 className="mb-2 font-serif text-3xl font-bold text-text-light">Chào mừng trở lại</h2>
          <p className="mb-8 text-sm text-text-muted">
            Chưa có tài khoản? <Link to="/register" className="font-bold transition-colors text-primary hover:text-primary-dark">Đăng ký miễn phí</Link>
          </p>

          {/* HIỂN THỊ LỖI (Được mang từ code cũ sang) */}
          {error && (
            <div className="p-3 mb-6 text-sm font-medium text-red-500 border rounded-lg bg-red-500/10 border-red-500/50">
               {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block mb-2 text-xs font-bold tracking-wider uppercase text-text-muted">Email</label>
              <input 
                type="email" 
                name="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-3 px-4 transition-colors bg-white border border-[#e2dcd0] rounded-lg outline-none text-text-light focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block mb-2 text-xs font-bold tracking-wider uppercase text-text-muted">Mật khẩu</label>
              <input 
                type="password" 
                name="password"
                required
                placeholder="Nhập mật khẩu..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-3 px-4 transition-colors bg-white border border-[#e2dcd0] rounded-lg outline-none text-text-light focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 mt-6 font-bold tracking-widest text-white uppercase transition-all rounded-lg bg-primary hover:bg-primary-dark disabled:opacity-50"
            >
              {loading ? 'Đang xử lý...' : 'Đăng nhập'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;