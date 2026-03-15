// src/pages/dashboard/LessonPage.tsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { lessonApi, LessonDetail } from '../../api/lessonApi';
import AiChat from '../../components/common/AiChat';
import axiosClient from '../../api/axios';

const LessonPage = () => {
  const { id } = useParams<{ id: string }>();
  const [lesson, setLesson] = useState<LessonDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [completing, setCompleting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isCompleting, setIsCompleting] = useState(false);

  
  // Lấy dữ liệu bài học
  useEffect(() => {
    const fetchLesson = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await lessonApi.getLessonByIdApi(id);
        setLesson(data);
      } catch (err) {
        setError('Không thể tải nội dung bài học.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLesson();
  }, [id]);

  // Hàm xử lý khi bấm nút "Đánh dấu hoàn thành"
  const handleComplete = async () => {
    if (!id || !lesson) return;
    try {
      setCompleting(true);
      await lessonApi.completeLessonApi(id);
      
      // Cập nhật lại UI state ngay lập tức mà không cần gọi lại API
      setLesson({ ...lesson, is_completed: true });
    } catch (err) {
      alert('Có lỗi xảy ra khi lưu tiến độ. Vui lòng thử lại.');
      console.error(err);
    } finally {
      setCompleting(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="w-10 h-10 border-4 rounded-full border-t-primary border-primary/20 animate-spin"></div>
    </div>
  );

  if (error || !lesson) return (
    <div className="p-8 text-center">
      <h2 className="text-2xl text-red-400">{error || 'Không tìm thấy bài học'}</h2>
      <Link to="/dashboard/courses" className="inline-block mt-4 transition-colors text-primary hover:text-primary-dark">Về danh sách khóa học</Link>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto pb-20 relative">
      {/* Nút quay lại khóa học */}
      <Link to={`/dashboard/course/${lesson.course_id}`} className="inline-flex items-center gap-2 mb-6 transition-colors text-text-muted hover:text-primary">
        <span>←</span> Quay lại chi tiết khóa học
      </Link>

      {/* Tên bài học */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 text-xs font-bold text-white uppercase rounded-full bg-gradient-primary">
            Bài {lesson.order_index}
          </span>
        </div>
        <h1 className="text-4xl font-bold leading-tight text-text-light">{lesson.title}</h1>
      </div>

      {/* Khung nhúng Slide (Iframe) */}
      {lesson.slide_url && (
        <div className="w-full mb-10 overflow-hidden border rounded-xl border-primary/30 shadow-neon aspect-video bg-background-card">
          <iframe 
            src={lesson.slide_url} 
            title="Bài giảng Slide"
            className="w-full h-full"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* Nội dung bài giảng (Content) */}
      <div className="p-8 mb-10 border rounded-xl bg-background-card border-primary/20">
        <h3 className="mb-4 text-xl font-bold text-primary">Nội dung bài học</h3>
        <div className="leading-relaxed text-text-light/90 whitespace-pre-wrap">
          {lesson.content}
        </div>
      </div>

      {/* Khu vực Nút Hoàn thành */}
      <div className="flex justify-end pt-6 border-t border-primary/20">
        {lesson.is_completed ? (
          <div className="flex items-center gap-2 px-6 py-3 font-bold text-green-400 border border-green-500/30 rounded-lg bg-green-500/10">
            <span className="text-xl">✅</span> Đã hoàn thành bài học
          </div>
        ) : (
          <button 
            onClick={handleComplete}
            disabled={completing}
            className="flex items-center gap-2 px-6 py-3 font-bold text-white transition-all rounded-lg bg-gradient-primary hover:shadow-neon disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {completing ? (
              <span className="w-5 h-5 border-2 rounded-full border-t-white border-white/30 animate-spin"></span>
            ) : (
              <span>📝</span>
            )}
            {completing ? 'Đang lưu...' : 'Đánh dấu hoàn thành'}
          </button>
        )}
      </div>
      {lesson && <AiChat lessonId={lesson.id} />}
    </div>
  );
};

export default LessonPage;