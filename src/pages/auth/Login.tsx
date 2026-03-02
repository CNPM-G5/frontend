import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // 1. Import hook useAuth
import { loginApi } from '../../api/authApi';
export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  interface LoginForm {
    email: string;
    password: string;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setForm((prevForm: LoginForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await loginApi(form);
      login(res.data.token, res.data.user);
      navigate('/dashboard');
    } catch (err: unknown) {
      const error = err as any;
      setError(error.response?.data?.message || 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
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
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 bg-transparent border rounded-lg outline-none border-primary/40 text-text-light focus:border-primary focus:shadow-neon transition-all"
          />
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="••••••"
            value={form.password}
            onChange={handleChange}
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
}