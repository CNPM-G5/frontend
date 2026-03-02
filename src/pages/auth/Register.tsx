import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerApi } from '../../api/authApi';
import { useAuth } from '../../context/AuthContext';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await registerApi(form);
      login(res.data.token, res.data.user);
      navigate('/dashboard');
    } catch (err) {
      const errorMessage = (err as any).response?.data?.message || 'Đăng ký thất bại';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full max-w-md mx-auto">
      {/* Khung Tiêu đề nổi bật */}
      <div className="mb-8 bg-background-dark py-4 px-6 rounded-xl border border-primary/20 shadow-[0_0_15px_rgba(0,210,255,0.1)] flex justify-center">
        <h2 className="text-3xl font-bold text-text-light tracking-wide">
          Tạo tài khoản mới
        </h2>
      </div>

      {/* Form đăng ký */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="relative">
          {/* Tạm dùng icon text, sau này bạn có thể thay bằng icon xịn từ thư viện */}
          <span className="absolute left-4 top-3.5 text-primary opacity-70">👤</span>
          <input
            type="text"
            name="name"
            placeholder="Tên của bạn"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-3 pl-12 bg-transparent border rounded-lg outline-none border-primary/40 text-text-light focus:border-primary focus:shadow-neon transition-all"
          />
        </div>

        <div className="relative">
          <span className="absolute left-4 top-3.5 text-primary opacity-70">✉️</span>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-3 pl-12 bg-transparent border rounded-lg outline-none border-primary/40 text-text-light focus:border-primary focus:shadow-neon transition-all"
          />
        </div>

        <div className="relative">
          <span className="absolute left-4 top-3.5 text-primary opacity-70">🔒</span>
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full p-3 pl-12 bg-transparent border rounded-lg outline-none border-primary/40 text-text-light focus:border-primary focus:shadow-neon transition-all"
          />
        </div>

        <div className="relative">
          <span className="absolute left-4 top-3.5 text-primary opacity-70">🔒</span>
          <input
            type="password"
            placeholder="Nhập lại mật khẩu"
            required
            className="w-full p-3 pl-12 bg-transparent border rounded-lg outline-none border-primary/40 text-text-light focus:border-primary focus:shadow-neon transition-all"
          />
          <span className="absolute right-4 top-3.5 text-primary cursor-pointer hover:text-text-light">👁️</span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 mt-4 font-bold text-white transition-all rounded-lg bg-gradient-primary hover:shadow-neon tracking-wider uppercase disabled:opacity-50"
        >
          {loading ? 'Đang đăng ký...' : 'Đăng ký'}
        </button>
        {error && <div className="mt-4 p-3 bg-red-500/20 border border-red-500 rounded text-red-400 text-sm">{error}</div>}
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
}