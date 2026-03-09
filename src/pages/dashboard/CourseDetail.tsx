// src/pages/dashboard/CourseDetail.tsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { courseApi, CourseDetailType } from '../../api/courseApi';

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<CourseDetailType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourseDetail = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await courseApi.getCourseByIdApi(id);
        setCourse(data);
      } catch (err) {
        setError('Không thể tải thông tin khóa học.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourseDetail();
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
      {/* Nút quay lại */}
      <Link to="/dashboard/courses" className="inline-flex items-center gap-2 mb-6 transition-colors text-text-muted hover:text-primary">
        <span>←</span> Quay lại danh sách khóa học
      </Link>

      {/* Header Khóa học */}
      <div className="pb-6 mb-8 border-b border-primary/20 relative overflow-hidden">
        <h1 className="mb-4 text-4xl font-bold leading-tight text-text-light relative z-10">
          {course.title}
        </h1>
        <p className="text-lg text-text-muted relative z-10">
          {course.description}
        </p>
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none"></div>
      </div>

      {/* Danh sách bài học (Yêu cầu chính của Iteration 2) */}
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
              .map((lesson, index) => (
                <Link 
                  to={`/dashboard/lesson/${lesson.id}`} 
                  key={lesson.id} 
                  className="flex items-center justify-between p-5 transition-all duration-300 border cursor-pointer bg-background-card rounded-xl border-primary/20 hover:border-primary hover:shadow-neon group"
                  >
                  <div className="flex items-center gap-4">
                    {/* Số thứ tự */}
                    <div className="flex items-center justify-center w-12 h-12 text-lg font-bold transition-colors border rounded-lg bg-primary/10 text-primary border-primary/30 group-hover:bg-primary group-hover:text-background-dark">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    {/* Tiêu đề bài học */}
                    <h3 className="text-lg font-medium transition-colors text-text-light group-hover:text-primary">
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;