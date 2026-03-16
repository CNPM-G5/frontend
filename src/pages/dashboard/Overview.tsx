import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { courseApi } from '../../api/courseApi';
import { progressApi } from '../../api/progressApi';

const Overview = () => {
  const [coursesProgress, setCoursesProgress] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        setLoading(true);
        // 1. Gọi API lấy danh sách toàn bộ khóa học
        const res : any = await courseApi.getAllCoursesApi();
        // Xử lý an toàn để luôn lấy ra mảng
        const courses = Array.isArray(res) ? res : res.data || [];

        // 2. Lấy % tiến độ cho từng khóa học
        const promises = courses.map(async (course: any) => {
          try {
            const progress = await progressApi.getCourseProgressApi(course.id);
            return { ...course, progressPercentage: progress.percentage || 0 };
          } catch (error) {
            // Nếu API progress lỗi (ví dụ user chưa học bài nào), mặc định 0%
            return { ...course, progressPercentage: 0 };
          }
        });

        const fullData = await Promise.all(promises);
        setCoursesProgress(fullData);
      } catch (error) {
        console.error("Lỗi tải tiến độ trang chủ:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgressData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto pb-20">
      {/* KHU VỰC 6 MỤC THỐNG KÊ (Giữ nguyên code cũ của bạn ở đây) */}
      {/* KHU VỰC MỚI: TIẾN ĐỘ KHÓA HỌC (Chuẩn UI thiết kế mới) */}
      <h2 className="text-2xl font-bold text-text-light mb-6">Khóa học của bạn</h2>
      
      {loading ? (
        <div className="flex justify-center py-10">
          <div className="w-8 h-8 border-4 rounded-full border-t-primary border-[#e2dcd0] animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {coursesProgress.map((course, index) => {
            // Format số thứ tự thành 01, 02, 03...
            const orderNumber = (index + 1).toString().padStart(2, '0');
            
            return (
              <Link 
                to={`/dashboard/course/${course.id}`} 
                key={course.id}
                className="block p-8 transition-all bg-white border shadow-sm rounded-2xl border-[#e2dcd0] hover:border-primary hover:shadow-neon group"
              >
                {/* Số thứ tự in mờ (Typography nhấn mạnh) */}
                <div className="mb-2 text-5xl font-black text-[#f0ebe1] transition-colors group-hover:text-[#e8dccb]">
                  {orderNumber}
                </div>
                
                {/* Tiêu đề & Mô tả */}
                <h3 className="mb-2 text-xl font-bold text-text-light line-clamp-1">
                  {course.title}
                </h3>
                <p className="mb-8 text-sm text-text-muted line-clamp-1">
                  {course.description || "Tổng quan về môn học"}
                </p>
                
                {/* Thanh Progress */}
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
          })}
        </div>
      )}
    </div>
  );
};

export default Overview;