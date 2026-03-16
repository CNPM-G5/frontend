import { useState } from 'react';
import { changePasswordApi } from '../../api/authApi';

const Settings = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChangePassword = async () => {
    setMessage(null);
    if (!oldPassword || !newPassword || !confirmPassword) {
      setMessage({ type: 'error', text: 'Vui lòng điền đầy đủ thông tin.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'Mật khẩu mới không khớp.' });
      return;
    }
    if (newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Mật khẩu mới phải có ít nhất 6 ký tự.' });
      return;
    }
    try {
      setLoading(true);
      await changePasswordApi({ oldPassword, newPassword });
      setMessage({ type: 'success', text: 'Đổi mật khẩu thành công!' });
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Đổi mật khẩu thất bại. Vui lòng thử lại.';
      setMessage({ type: 'error', text: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex items-center gap-4 mb-8 relative">
        {/* Glow blur background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 60% 80% at 10% 50%, rgba(var(--color-primary-rgb, 99,102,241), 0.18) 0%, transparent 70%)",
            filter: "blur(8px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <div className="space-y-6">
          {/* Đổi mật khẩu */}
          <div className="p-6 border rounded-xl bg-background-sidebar border-primary/20">
            <h2 className="mb-4 text-xl font-bold text-primary">Bảo mật tài khoản</h2>

            {message && (
              <div className={`mb-4 px-4 py-3 rounded-lg text-sm font-medium border ${message.type === 'success'
                ? 'bg-green-500/10 border-green-500/30 text-green-400'
                : 'bg-red-500/10 border-red-500/30 text-red-400'
                }`}>
                {message.type === 'success' ? '✅' : '❌'} {message.text}
              </div>
            )}

            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm text-text-muted mb-1">Mật khẩu hiện tại</label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={e => setOldPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full p-3 bg-background-dark border rounded-lg outline-none border-primary/40 text-text-light focus:border-primary focus:shadow-neon transition-all"
                />
              </div>
              <div>
                <label className="block text-sm text-text-muted mb-1">Mật khẩu mới</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full p-3 bg-background-dark border rounded-lg outline-none border-primary/40 text-text-light focus:border-primary focus:shadow-neon transition-all"
                />
              </div>
              <div>
                <label className="block text-sm text-text-muted mb-1">Xác nhận mật khẩu mới</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full p-3 bg-background-dark border rounded-lg outline-none border-primary/40 text-text-light focus:border-primary focus:shadow-neon transition-all"
                />
              </div>
              <button
                onClick={handleChangePassword}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2 mt-2 font-bold text-white transition-all rounded-lg bg-gradient-primary hover:shadow-neon disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading && <span className="w-4 h-4 border-2 rounded-full border-t-white border-white/30 animate-spin" />}
                {loading ? 'Đang lưu...' : 'Đổi mật khẩu'}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>

  );
};

export default Settings;
