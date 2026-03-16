import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../../api/axios'; 
import { registerApi } from '../../api/authApi';

const Register = () => {
  const navigate = useNavigate();
  
  // Các state lưu trữ thông tin đăng ký
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.MouseEvent) => {
    e.preventDefault();
    setError('');

    // 1. Dọn dẹp khoảng trắng
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    // 2. Kiểm tra điều kiện cơ bản (Validation)
    if (!cleanName || !cleanEmail || !cleanPassword) {
      setError('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    if (cleanPassword !== confirmPassword.trim()) {
      setError('Mật khẩu nhập lại không khớp!');
      return;
    }

    setLoading(true);
      try {
        await registerApi({ 
          name: cleanName, 
          email: cleanEmail, 
          password: cleanPassword 
        });
        
        alert(' Đăng ký thành công! Vui lòng đăng nhập.');
        navigate('/login'); 
        
      } catch (err: any) {
        setError(err.response?.data?.message || 'Đăng ký thất bại. Email này có thể đã được sử dụng!');
      } finally {
        setLoading(false);
      }
  };

  return (
    <div className="flex min-h-screen font-sans w-full m-0 p-0 absolute top-0 left-0 bg-background-dark">
      
      {/* NỬA TRÁI (Màu nâu đen) - Giữ nguyên thiết kế branding */}
      <div className="hidden md:flex md:w-1/2 bg-background-brown p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="flex items-center justify-center w-10 h-10 border rounded border-primary text-primary font-bold">PL</div>
            <span className="text-xl font-bold text-text-white">Plearn</span>
          </div>

          <p className="mb-4 text-xs font-bold tracking-widest uppercase text-primary">Bắt đầu hành trình</p>
          <h1 className="mb-6 text-5xl font-bold leading-tight text-text-white">
            Xây Dựng Sự Nghiệp <br /> Cùng Cộng Đồng <br /> Kỹ Sư
          </h1>
          <p className="max-w-md mb-12 leading-relaxed text-text-muted">
            Tạo tài khoản ngay hôm nay để truy cập toàn bộ hệ thống khóa học, bài tập thực hành và lộ trình thăng tiến chuẩn quốc tế.
          </p>
        </div>
      </div>

      {/* NỬA PHẢI (Màu kem sáng) - Khu vực Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 relative bg-background-dark overflow-y-auto">
        
        {/* Cụm Toggle Đăng nhập / Đăng ký (Đã đảo màu sáng cho nút Đăng Ký) */}
        <div className="absolute flex p-1 rounded-full top-8 bg-background-sidebar border border-[#e2dcd0]">
          <Link to="/login" className="px-8 py-2 font-bold transition-colors text-text-muted hover:text-text-light">Đăng Nhập</Link>
          <button className="px-8 py-2 font-bold text-white transition-all rounded-full bg-primary shadow-neon">Đăng Ký</button>
        </div>

        <div className="w-full max-w-md mt-20 mb-10">
          <h2 className="mb-2 font-serif text-3xl font-bold text-text-light">Tạo tài khoản mới </h2>
          <p className="mb-8 text-sm text-text-muted">
            Đã có tài khoản? <Link to="/login" className="font-bold transition-colors text-primary hover:text-primary-dark">Đăng nhập tại đây</Link>
          </p>

          {/* HIỂN THỊ LỖI */}
          {error && (
            <div className="p-3 mb-6 text-sm font-medium text-red-500 border rounded-lg bg-red-500/10 border-red-500/50">
              ⚠️ {error}
            </div>
          )}

          {/* SỬ DỤNG THẺ DIV ĐỂ TRÁNH LỖI CHỚP TẮT (RELOAD) */}
          <div className="space-y-5">
            <div>
              <label className="block mb-2 text-xs font-bold tracking-wider uppercase text-text-muted">Tên của bạn</label>
              <input 
                type="text" 
                placeholder="VD: Nguyễn Văn A"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full py-3 px-4 transition-colors bg-white border border-[#e2dcd0] rounded-lg outline-none text-text-light focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block mb-2 text-xs font-bold tracking-wider uppercase text-text-muted">Email</label>
              <input 
                type="email" 
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-3 px-4 transition-colors bg-white border border-[#e2dcd0] rounded-lg outline-none text-text-light focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-xs font-bold tracking-wider uppercase text-text-muted">Mật khẩu</label>
                <input 
                  type="password" 
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-3 px-4 transition-colors bg-white border border-[#e2dcd0] rounded-lg outline-none text-text-light focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block mb-2 text-xs font-bold tracking-wider uppercase text-text-muted">Nhập lại</label>
                <input 
                  type="password" 
                  placeholder="Xác nhận mật khẩu"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full py-3 px-4 transition-colors bg-white border border-[#e2dcd0] rounded-lg outline-none text-text-light focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <button 
              type="button" 
              onClick={handleRegister}
              disabled={loading}
              className="w-full py-4 mt-8 font-bold tracking-widest text-white uppercase transition-all rounded-lg bg-primary hover:bg-primary-dark disabled:opacity-50 shadow-neon"
            >
              {loading ? 'Đang xử lý...' : 'Đăng ký ngay'}
            </button>
            
            <p className="text-xs text-center text-text-muted mt-4">
              Bằng việc đăng ký, bạn đồng ý với <a href="#" className="underline hover:text-primary">Điều khoản dịch vụ</a> và <a href="#" className="underline hover:text-primary">Chính sách bảo mật</a> của chúng tôi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;