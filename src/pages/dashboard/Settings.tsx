import { useState, useContext, useEffect } from 'react';
import { changePasswordApi, updateProfileApi, uploadAvatarApi } from '../../api/authApi';
import { AuthContext } from '../../context/AuthContext';

const Settings = () => {
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newName, setNewName] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (user) {
      setNewName(user.name || '');
      setAvatarPreview(user.avatar_url || '');
    }
  }, [user]);

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

  const handleUpdateName = async () => {
    setMessage(null);
    if (!newName.trim()) {
      setMessage({ type: 'error', text: 'Tên tài khoản không được trống.' });
      return;
    }
    if (newName === user?.name) {
      setMessage({ type: 'error', text: 'Tên tài khoản mới phải khác tên hiện tại.' });
      return;
    }
    try {
      setLoading(true);
      console.log('Calling updateProfileApi with name:', newName);
      const res = await updateProfileApi({ name: newName });
      console.log('Response:', res);
      setMessage({ type: 'success', text: 'Cập nhật tên thành công!' });
      authContext?.login(localStorage.getItem('token') || '', res.data.user);
    } catch (err: any) {
      console.error('Error:', err.response?.data || err.message);
      const msg = err?.response?.data?.message || 'Cập nhật tên thất bại. Vui lòng thử lại.';
      setMessage({ type: 'error', text: msg });
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadAvatar = async () => {
    setMessage(null);
    if (!avatarFile) {
      setMessage({ type: 'error', text: 'Vui lòng chọn ảnh.' });
      return;
    }
    try {
      setLoading(true);
      console.log('Uploading avatar file:', avatarFile.name);
      const res = await uploadAvatarApi(avatarFile);
      console.log('Upload response:', res);
      setMessage({ type: 'success', text: 'Cập nhật ảnh đại diện thành công!' });
      setAvatarFile(null);
      authContext?.login(localStorage.getItem('token') || '', res.data.user);
    } catch (err: any) {
      console.error('Upload error:', err.response?.data || err.message);
      const msg = err?.response?.data?.message || 'Cập nhật ảnh thất bại. Vui lòng thử lại.';
      setMessage({ type: 'error', text: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-20">
      {/* Message Alert */}
      {message && (
        <div className={`mb-6 px-4 py-3 rounded-lg text-sm font-medium border ${message.type === 'success'
          ? 'bg-green-500/10 border-green-500/30 text-green-400'
          : 'bg-red-500/10 border-red-500/30 text-red-400'
          }`}>
          {message.type === 'success' ? '✅' : '❌'} {message.text}
        </div>
      )}

      {/* Grid 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Đổi mật khẩu */}
        <div className="p-6 border rounded-xl bg-background-sidebar border-primary/20 relative">
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
          <div className="relative z-10">
            <h2 className="mb-4 text-xl font-bold text-primary">Bảo mật tài khoản</h2>

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

        {/* Đổi tên tài khoản */}
        <div className="p-6 border rounded-xl bg-background-sidebar border-primary/20 relative">
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
          <div className="relative z-10">
            <h2 className="mb-4 text-xl font-bold text-primary">Thông tin tài khoản</h2>

            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm text-text-muted mb-1">Tên tài khoản</label>
                <input
                  type="text"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="Nhập tên mới"
                  className="w-full p-3 bg-background-dark border rounded-lg outline-none border-primary/40 text-text-light focus:border-primary focus:shadow-neon transition-all"
                />
              </div>

              <button
                onClick={handleUpdateName}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2 mt-2 font-bold text-white transition-all rounded-lg bg-gradient-primary hover:shadow-neon disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading && <span className="w-4 h-4 border-2 rounded-full border-t-white border-white/30 animate-spin" />}
                {loading ? 'Đang lưu...' : 'Cập nhật tên'}
              </button>
            </div>
          </div>
        </div>

        {/* Đổi ảnh đại diện */}
        <div className="p-6 border rounded-xl bg-background-sidebar border-primary/20 relative">
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
          <div className="relative z-10">
            <h2 className="mb-4 text-xl font-bold text-primary">Ảnh đại diện</h2>

            <div className="space-y-4 max-w-md">
              <div className="flex flex-col items-center gap-4">
                {/* Avatar preview */}
                <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center overflow-hidden border-2 border-primary/40">
                  {avatarPreview ? (
                    <img 
                      src={avatarPreview} 
                      alt="Avatar preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-3xl text-white">👤</span>
                  )}
                </div>
                <div className="w-full">
                  <label className="block text-sm text-text-muted mb-2">Chọn ảnh</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarSelect}
                    className="text-sm text-text-light w-full"
                  />
                </div>
              </div>

              {avatarFile && (
                <button
                  onClick={handleUploadAvatar}
                  disabled={loading}
                  className="w-full flex items-center gap-2 px-6 py-2 font-bold text-white transition-all rounded-lg bg-gradient-primary hover:shadow-neon disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading && <span className="w-4 h-4 border-2 rounded-full border-t-white border-white/30 animate-spin" />}
                  {loading ? 'Đang tải...' : 'Cập nhật ảnh'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Settings;
