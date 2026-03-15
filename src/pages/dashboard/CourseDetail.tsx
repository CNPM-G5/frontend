// src/pages/dashboard/CourseDetail.tsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { courseApi, CourseDetailType } from '../../api/courseApi';
import { progressApi, CourseProgress } from '../../api/progressApi';

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<CourseDetailType | null>(null);
  const [progress, setProgress] = useState<CourseProgress | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        
        // Gọi song song cả 2 API để tiết kiệm thời gian chờ
        const [courseData, progressData] = await Promise.all([
          courseApi.getCourseByIdApi(id),
          progressApi.getCourseProgressApi(id).catch(() => null) // Nếu chưa có API progress thì bỏ qua không làm sập trang
        ]);
        
        setCourse(courseData);
        setProgress(progressData);
      } catch (err) {
        setError('Không thể tải thông tin khóa học.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="w-10 h-10 border-4 rounded-full border-t-primary border-primary/20 animate-spin"></div>
    </div>
  );

  if (error || !course) return (
    <div className="p-8 text-center">
      <h2 className="text-2xl text-red-400">{error || 'Không tìm thấy khóa học'}</h2>
      <Link to="/dashboard/courses" className="inline-block mt-4 transition-colors text-primary hover:text-primary-dark">Quay lại danh sách</Link>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto pb-20 relative">
      <Link to="/dashboard/courses" className="inline-flex items-center gap-2 mb-6 transition-colors text-text-muted hover:text-primary">
        <span>←</span> Quay lại danh sách khóa học
      </Link>

      {/* Header Khóa học */}
      <div className="pb-6 mb-8 border-b border-primary/20 relative overflow-hidden">
        <h1 className="mb-4 text-4xl font-bold leading-tight text-text-light relative z-10">
          {course.title}
        </h1>
        <p className="text-lg text-text-muted relative z-10 mb-6">
          {course.description}
        </p>

        {/* --- KHU VỰC PROGRESS BAR (MỚI THÊM) --- */}
        {progress && (
          <div className="relative z-10 p-5 border rounded-xl bg-background-sidebar border-primary/30 shadow-neon">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-text-light">Tiến độ học tập</span>
              <span className="text-sm font-bold text-primary">
                {progress.completed}/{progress.total} bài đã hoàn thành ({progress.percentage}%)
              </span>
            </div>
            
            {/* Thanh chứa */}
            <div className="w-full h-3 overflow-hidden border rounded-full bg-background-dark border-primary/20">
              {/* Thanh phần trăm chạy */}
              <div 
                className="h-full transition-all duration-1000 bg-gradient-primary shadow-[0_0_10px_rgba(0,210,255,0.8)]"
                style={{ width: `${progress.percentage}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none"></div>
      </div>

      {/* Danh sách bài học */}
      <div className="space-y-6">
        <h2 className="flex items-center gap-2 mb-4 text-2xl font-bold text-primary">
          <span className="text-3xl">📋</span> Danh sách bài học
        </h2>

        {(!course.lessons || course.lessons.length === 0) ? (
          <div className="p-8 text-center border rounded-xl bg-background-card border-primary/20 text-text-muted">
            Khóa học này đang được cập nhật nội dung...
          </div>
        ) : (
          <div className="space-y-4">
            {course.lessons
              .sort((a, b) => a.order_index - b.order_index)
              .map((lesson) => {
                const isCompleted = progress?.completed_lesson_ids?.includes(lesson.id) ||lesson.is_completed;
                return (
                  <Link 
                    to={`/dashboard/lesson/${lesson.id}`}
                    key={lesson.id} 
                    className={`flex items-center justify-between p-5 transition-all duration-300 border cursor-pointer rounded-xl group ${
                      isCompleted 
                        ? 'bg-primary/5 border-primary/50 shadow-[0_0_10px_rgba(0,210,255,0.1)]' 
                        : 'bg-background-card border-primary/20 hover:border-primary hover:shadow-neon'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Icon ✅ hoặc ○ */}
                      <div className={`flex items-center justify-center w-10 h-10 text-xl transition-colors ${
                        isCompleted ? 'text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]' : 'text-text-muted group-hover:text-primary'
                      }`}>
                        {isCompleted ? '✅' : '○'}
                      </div>
                      
                      {/* Tiêu đề bài học */}
                      <h3 className={`text-lg font-medium transition-colors ${
                        isCompleted ? 'text-primary' : 'text-text-light group-hover:text-primary'
                      }`}>
                        {lesson.title}
                      </h3>
                    </div>
                    
                    {/* Arrow Icon */}
                    <div className="flex items-center justify-center w-10 h-10 transition-all rounded-full text-text-muted group-hover:text-primary group-hover:bg-primary/10">
                      <svg className="w-6 h-6 transition-transform transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;