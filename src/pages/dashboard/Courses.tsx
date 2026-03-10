// src/pages/dashboard/Courses.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { courseApi, Course } from '../../api/courseApi';

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await courseApi.getAllCoursesApi();
        setCourses(data);
      } catch (err) {
        setError('Không thể tải danh sách khóa học. Vui lòng thử lại!');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="w-10 h-10 border-4 rounded-full border-t-primary border-primary/20 animate-spin"></div>
    </div>
  );
  
  if (error) return <div className="p-8 text-center text-red-400 bg-red-500/10 rounded-xl border border-red-500/20">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-center mb-10">
        <div className="w-16 h-px bg-gradient-to-r from-transparent to-primary"></div>
        <h1 className="px-6 text-2xl font-bold tracking-widest text-transparent uppercase bg-clip-text bg-gradient-primary">
          Danh sách khóa học
        </h1>
        <div className="w-16 h-px bg-gradient-to-l from-transparent to-primary"></div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(courses) && courses.map((course) => (
          <div key={course.id} className="relative flex flex-col h-full p-6 transition-all duration-300 border group rounded-xl bg-background-card border-primary/20 hover:border-primary hover:shadow-neon hover:-translate-y-1">
            <h2 className="mb-2 text-xl font-bold transition-colors text-text-light group-hover:text-primary">
              {course.title}
            </h2>
            <p className="mb-4 text-sm text-text-muted line-clamp-3 flex-grow">
              {course.description}
            </p>
            
            <div className="flex items-center justify-between pt-4 mt-auto border-t border-primary/20">
              <span className="text-sm font-medium text-text-muted flex items-center gap-2">
                <span className="text-primary">📚</span> {course.lesson_count} bài học có sẵn 
              </span>
              {/* Route được trỏ chính xác theo App.tsx của bạn */}
              <Link 
                to={`/dashboard/course/${course.id}`} 
                className="px-4 py-2 text-sm font-semibold text-white transition-all rounded-lg bg-primary/20 hover:bg-gradient-primary hover:shadow-neon"
              >
                Xem chi tiết
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;