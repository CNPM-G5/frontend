import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { courseApi, CourseDetailType } from '../../api/courseApi';
import { progressApi, CourseProgress } from '../../api/progressApi';
import { HiCheckCircle } from "react-icons/hi"; // Heroicons
import { FaRegCircle } from "react-icons/fa";   // FontAwesome

const stripMarkdown = (text: string) =>
  text?.replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/(\*|_)(.*?)\1/g, '$2')
    .replace(/\\\s*$/gm, '')
    .replace(/\\(.)/g, '$1')
    .trim() || '';

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

        // Gọi song song 2 API: Lấy thông tin khóa học VÀ Lấy tiến độ 
        const [courseData, progressData] = await Promise.all([
          courseApi.getCourseByIdApi(id),
          progressApi.getCourseProgressApi(id).catch(() => null) // Nếu API lỗi tạm thời bỏ qua để không sập trang
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
      <div className="w-10 h-10 border-4 border-[#e2dcd0] rounded-full border-t-primary animate-spin"></div>
    </div>
  );

  if (error || !course) return (
    <div className="p-8 text-center">
      <h2 className="text-2xl text-red-500">{error || 'Không tìm thấy khóa học'}</h2>
      <Link to="/dashboard/courses" className="inline-block mt-4 font-bold transition-colors text-primary hover:text-primary-dark">Quay lại danh sách</Link>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <Link to="/dashboard/courses" className="inline-flex items-center gap-2 mb-6 text-sm font-bold tracking-wider uppercase transition-colors text-text-muted hover:text-primary">
        <span>←</span> Quay lại danh sách
      </Link>

      {/* Header Khóa học */}
      <div className="mb-10">
        <h1 className="mb-4 text-4xl font-bold leading-tight text-text-light">
          {stripMarkdown(course.title)}
        </h1>
        <p className="text-lg text-text-muted">
          {stripMarkdown(course.description)}
        </p>
      </div>

      {/* --- KHU VỰC PROGRESS BAR THEO CHUẨN KEM VÀNG --- */}
      {progress && (
        <div className="p-6 mb-10 bg-white border shadow-sm rounded-xl border-[#e2dcd0]">
          <div className="flex items-center justify-between mb-3">
            <span className="font-bold uppercase tracking-wider text-xs text-text-muted">Tiến độ khóa học</span>
            <span className="text-sm font-bold text-primary">
              {progress.completed}/{progress.total} bài đã hoàn thành ({progress.percentage}%) {/* Text yêu cầu  */}
            </span>
          </div>

          {/* Thanh chứa nền xám nhạt */}
          <div className="w-full h-3 overflow-hidden bg-[#f0ebe1] rounded-full">
            {/* Thanh phần trăm chạy màu Vàng Nâu */}
            <div
              className="h-full transition-all duration-1000 bg-primary"
              style={{ width: `${progress.percentage}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Danh sách bài học */}
      <div className="space-y-6">
        <h2 className="font-serif text-2xl font-bold text-text-light">
          Danh sách bài học
        </h2>

        {(!course.lessons || course.lessons.length === 0) ? (
          <div className="p-8 text-center bg-white border rounded-xl border-[#e2dcd0] text-text-muted">
            Khóa học này đang được cập nhật nội dung...
          </div>
        ) : (
          <div className="space-y-4">
            {/* Xử lý lỗi map() bằng Array.isArray() */}
            {Array.isArray(course.lessons) && course.lessons
              .sort((a, b) => a.order_index - b.order_index)
              .map((lesson) => {

                // Logic kiểm tra hoàn thành 
                const isCompleted = progress?.completed_lesson_ids?.includes(lesson.id) || lesson.is_completed;

                return (
                  <Link
                    to={`/dashboard/lesson/${lesson.id}`}
                    key={lesson.id}
                    className={`flex items-center justify-between p-5 transition-all duration-300 border cursor-pointer rounded-xl group ${isCompleted
                      ? 'bg-[#faf7f0] border-primary/30' // Nền bài đã học
                      : 'bg-white border-[#e2dcd0] hover:border-primary' // Nền bài chưa học
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Icon ✅ hoặc ○  */}
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm transition-colors ${isCompleted ? 'bg-green-100 text-green-600' : 'bg-[#f0ebe1] text-text-muted group-hover:bg-primary/10 group-hover:text-primary'
                        }`}>
                        {isCompleted ? <HiCheckCircle className="text-green-600 w-6 h-6" /> : <FaRegCircle className="w-6 h-6" />}
                      </div>

                      <h3 className={`text-lg font-medium transition-colors ${isCompleted ? 'text-text-light' : 'text-text-muted group-hover:text-primary'
                        }`}>
                        {lesson.title}
                      </h3>
                    </div>

                    <div className="text-text-muted group-hover:text-primary">
                      <svg className="w-5 h-5 transition-transform transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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