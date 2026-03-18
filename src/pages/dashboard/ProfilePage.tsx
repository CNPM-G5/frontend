import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getProfileApi } from '../../api/authApi';
import { progressApi, CompletedCourse } from '../../api/progressApi';

const ProfilePage = () => {
  const { user, login } = useAuth();
  const [completedCourses, setCompletedCourses] = useState<CompletedCourse[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(true);

  useEffect(() => {
    // Refresh user data từ server
    getProfileApi()
      .then((res) => {
        const token = localStorage.getItem('token');
        if (token) {
          login(token, res.data.user);
        }
      })
      .catch((err) => console.error('Error fetching profile:', err));
  }, []);

  useEffect(() => {
    progressApi.getCompletedCoursesApi()
      .then(setCompletedCourses)
      .catch(() => setCompletedCourses([]))
      .finally(() => setLoadingProgress(false));
  }, []);

  const joinDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('vi-VN')
    : 'Chưa cập nhật';

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex items-center gap-4 mb-8">
        <span className="flex items-center justify-center w-12 h-12 text-2xl border rounded-xl bg-primary/20 border-primary shadow-neon">👤</span>
        <div>
          <h1 className="text-3xl font-bold text-text-light">Hồ sơ cá nhân</h1>
          <p className="text-text-muted">Quản lý thông tin và tiến độ học tập của bạn</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Cột trái: Avatar & thông tin */}
        <div className="flex-1 p-8 text-center border rounded-xl bg-background-sidebar border-primary/20 flex flex-col items-center shadow-neon">
          <div className="relative mb-6">
            <div className="w-32 h-32 overflow-hidden border-4 rounded-full bg-background-dark border-primary shadow-[0_0_20px_rgba(0,210,255,0.3)]">
              {user?.avatar_url ? (
                <img 
                  key={user.avatar_url}
                  src={`${user.avatar_url}?t=${new Date().getTime()}`}
                  alt="Avatar" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="flex items-center justify-center w-full h-full text-6xl">🧑‍💻</span>
              )}
            </div>
            <span className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-2 border-background-sidebar rounded-full shadow-[0_0_10px_rgba(34,197,94,0.8)]"></span>
          </div>

          <h2 className="text-2xl font-bold text-text-light">{user?.name || 'Học viên IT'}</h2>
          <p className="text-primary font-medium mb-4">{user?.email || 'email@example.com'}</p>

          <div className="w-full h-px bg-primary/20 my-4"></div>

          <div className="flex justify-between w-full text-sm">
            <span className="text-text-muted">Vai trò:</span>
            <span className="font-bold text-text-light uppercase">{user?.role || 'User'}</span>
          </div>
          <div className="flex justify-between w-full text-sm mt-2">
            <span className="text-text-muted">Ngày tham gia:</span>
            <span className="font-bold text-text-light">{joinDate}</span>
          </div>
        </div>

        {/* Cột phải: Thống kê */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Khóa học đã hoàn thành */}
          <div className="p-6 border rounded-xl bg-background-card border-primary/20 hover:border-primary transition-colors duration-300">
            <h3 className="text-lg font-bold text-text-light mb-4 flex items-center gap-2">
              <span className="text-primary">🏆</span> Khóa học đã hoàn thành
            </h3>

            {loadingProgress ? (
              <div className="flex items-center gap-2 text-text-muted text-sm">
                <span className="w-4 h-4 border-2 rounded-full border-t-primary border-primary/20 animate-spin" />
                Đang tải...
              </div>
            ) : completedCourses.length === 0 ? (
              <p className="text-text-muted text-sm">Bạn chưa hoàn thành khóa học nào.</p>
            ) : (
              <>
                <div className="flex items-end gap-3 mb-4">
                  <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-primary drop-shadow-neon">
                    {completedCourses.length}
                  </span>
                  <span className="text-text-muted mb-2">khóa học</span>
                </div>
                <div className="space-y-2">
                  {completedCourses.map(c => (
                    <div key={c.id} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/20 text-sm">
                      <span className="text-green-400">✅</span>
                      <span className="text-text-light font-medium">{c.title}</span>
                      <span className="ml-auto text-text-muted">{c.totalLessons} bài</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Trạng thái tài khoản */}
          <div className="p-6 border rounded-xl bg-background-card border-primary/20 flex-1">
            <h3 className="text-lg font-bold text-text-light mb-4">Trạng thái tài khoản</h3>
            <div className="flex items-center gap-4 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-bold text-green-400">Tài khoản đang hoạt động</p>
                <p className="text-sm text-green-500/70">Bạn có thể truy cập toàn bộ nội dung khóa học.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
