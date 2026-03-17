// src/pages/dashboard/Courses.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { courseApi } from '../../api/courseApi';
import { progressApi } from '../../api/progressApi';

const Courses = () => {
  const [coursesProgress, setCoursesProgress] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        setLoading(true);
        // 1. Lấy danh sách khóa học
        const res : any = await courseApi.getAllCoursesApi();
        const courses = Array.isArray(res) ? res : res.data || [];

        // 2. Lấy tiến độ cho từng khóa học
        const promises = courses.map(async (course: any) => {
          try {
            const progress = await progressApi.getCourseProgressApi(course.id);
            return { ...course, progressPercentage: progress.percentage || 0 };
          } catch (error) {
            return { ...course, progressPercentage: 0 };
          }
        });

        const fullData = await Promise.all(promises);
        setCoursesProgress(fullData);
      } catch (error) {
        console.error("Lỗi tải danh sách khóa học:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgressData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-text-light">Lộ trình học tập</h1>
        <p className="text-text-muted">Tiếp tục các khóa học bạn đang theo dõi</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="w-8 h-8 border-4 rounded-full border-t-primary border-[#e2dcd0] animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {coursesProgress.length > 0 ? coursesProgress.map((course, index) => {
            const orderNumber = (index + 1).toString().padStart(2, '0');
            return (
              <Link 
                to={`/dashboard/course/${course.id}`} 
                key={course.id}
                className="block p-8 transition-all bg-white border shadow-sm rounded-2xl border-[#e2dcd0] hover:border-primary hover:shadow-neon group"
              >
                <div className="mb-2 text-5xl font-black text-[#f0ebe1] transition-colors group-hover:text-[#e8dccb]">
                  {orderNumber}
                </div>
                <h3 className="mb-2 text-xl font-bold text-text-light line-clamp-1">
                  {course.title}
                </h3>
                <p className="mb-8 text-sm text-text-muted line-clamp-1">
                  {course.description || "Tổng quan về môn học"}
                </p>
                <div>
                  <div className="flex justify-between mb-2 text-sm font-bold">
                    <span className="text-text-muted">Tiến độ</span>
                    <span className="text-text-light">{course.progressPercentage}%</span>
                  </div>
                  <div className="w-full h-3 overflow-hidden bg-[#f0ebe1] rounded-full">
                    <div 
                      className="h-full transition-all duration-1000 bg-primary"
                      style={{ width: `${course.progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </Link>
            );
          }) : (
             <div className="col-span-full p-10 text-center bg-white border rounded-xl border-[#e2dcd0] text-text-muted">
                Bạn chưa có khóa học nào trên hệ thống.
             </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Courses;