import { useState, useEffect } from 'react';
import { adminApi } from '../../api/adminApi';
import { courseApi, Course } from '../../api/courseApi';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState<'courses' | 'lessons'>('courses');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);

  // ==========================================
  // LOGIC QUẢN LÝ KHÓA HỌC (COURSES)
  // ==========================================
  
  const [courseForm, setCourseForm] = useState({ title: '', description: '', model_type: '' });
  const [editingCourseId, setEditingCourseId] = useState<number | null>(null); // State kiểm tra đang Thêm hay Sửa

  // Hàm tải lại danh sách khóa học
  const loadCourses = async () => {
    try {
      const data = await courseApi.getAllCoursesApi();
      setCourses(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  // Hàm Lưu (Dùng chung cho cả Thêm mới và Cập nhật)
  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseForm.title || !courseForm.description) {
      alert("Vui lòng điền đầy đủ thông tin khóa học!");
      return;
    }

    try {
      setIsSubmitting(true);
      if (editingCourseId) {
        // GỌI API SỬA
        await courseApi.updateCourseApi(editingCourseId, courseForm);
        alert("🎉 Cập nhật khóa học thành công!");
      } else {
        // GỌI API THÊM MỚI
        await courseApi.createCourseApi(courseForm);
        alert("🎉 Thêm khóa học thành công!");
      }
      
      // Reset form và tải lại bảng
      setCourseForm({ title: '', description: '', model_type: '' });
      setEditingCourseId(null);
      loadCourses(); 
    } catch (error: any) {
      alert(error.response?.data?.message || "Có lỗi xảy ra khi lưu khóa học.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Hàm bấm nút Sửa (Đổ dữ liệu lên form)
  const handleEditCourseClick = (course: Course) => {
    setEditingCourseId(course.id);
    setCourseForm({
      title: course.title,
      description: course.description,
      model_type: (course as any).model_type || '' // Fallback nếu API có trả về
    });
  };

  // Hàm bấm nút Xóa
  const handleDeleteCourse = async (id: number) => {
    const isConfirm = window.confirm(`⚠️ Bạn có chắc chắn muốn xóa khóa học #${id} này không? Mọi bài học bên trong sẽ bị mất!`);
    if (isConfirm) {
      try {
        await courseApi.deleteCourseApi(id);
        alert("🗑️ Đã xóa khóa học thành công!");
        loadCourses(); // Tải lại bảng
      } catch (error: any) {
        alert(error.response?.data?.message || "Không thể xóa. Vui lòng thử lại!");
      }
    }
  };


  // ==========================================
  // LOGIC QUẢN LÝ BÀI HỌC (LESSONS) - Giữ nguyên của bạn
  // ==========================================
  const [lessonForm, setLessonForm] = useState({ course_id: '', title: '', content: '', order_index: '' });

  const handleCreateLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await adminApi.createLesson({
        ...lessonForm,
        course_id: Number(lessonForm.course_id),
        order_index: Number(lessonForm.order_index)
      });
      alert("🎉 Thêm bài học thành công!");
      setLessonForm({ course_id: '', title: '', content: '', order_index: '' });
    } catch (error: any) {
      alert(error.response?.data?.message || "Có lỗi xảy ra khi lưu bài học!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-20">

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8">
        <span className="flex items-center justify-center w-12 h-12 text-2xl border rounded-xl bg-primary/20 border-primary shadow-neon">🛡️</span>
        <div>
          <h1 className="text-3xl font-bold text-text-light">Bảng điều khiển Admin</h1>
          <p className="text-text-muted">Quản lý toàn bộ hệ thống khóa học và bài học</p>
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-4 mb-8 border-b border-primary/20">
        <button 
          onClick={() => setActiveTab('courses')}
          className={`pb-3 px-4 font-bold ${activeTab === 'courses' ? 'text-primary border-b-2 border-primary' : 'text-text-muted hover:text-primary'}`}
        >
          📚 Quản lý Khóa học
        </button>
        <button 
          onClick={() => setActiveTab('lessons')}
          className={`pb-3 px-4 font-bold ${activeTab === 'lessons' ? 'text-primary border-b-2 border-primary' : 'text-text-muted hover:text-primary'}`}
        >
          📋 Quản lý Bài học
        </button>
      </div>

      {/* TAB KHÓA HỌC (COURSES) */}
      {activeTab === 'courses' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* CỘT TRÁI: FORM THÊM / SỬA */}
          <div className="lg:col-span-1 p-6 border rounded-xl bg-background-sidebar border-primary/20 h-fit">
            <h2 className="text-xl font-bold text-primary mb-6">
              {editingCourseId ? 'Sửa Khóa học' : 'Thêm Khóa học mới'}
            </h2>

            <form className="space-y-4" onSubmit={handleSaveCourse}>
              <div>
                <label className="block text-xs font-bold text-text-muted uppercase mb-1">Tên khóa học</label>
                <input
                  type="text"
                  required
                  placeholder="Tiêu đề"
                  value={courseForm.title}
                  onChange={(e)=>setCourseForm({...courseForm,title:e.target.value})}
                  className="w-full p-3 bg-background-dark border border-[#e2dcd0] text-text-light outline-none focus:border-primary rounded-lg"
                />
              </div>

              <div>
                 <label className="block text-xs font-bold text-text-muted uppercase mb-1">Mô tả</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Mô tả chi tiết"
                  value={courseForm.description}
                  onChange={(e)=>setCourseForm({...courseForm,description:e.target.value})}
                  className="w-full p-3 bg-background-dark border border-[#e2dcd0] text-text-light outline-none focus:border-primary rounded-lg resize-none"
                />
              </div>

              <div className="pt-2 flex gap-3">
                {/* Nút Hủy (Chỉ hiện khi đang ở chế độ Sửa) */}
                {editingCourseId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingCourseId(null);
                      setCourseForm({ title: '', description: '', model_type: '' });
                    }}
                    className="w-1/3 py-3 font-bold transition-colors border rounded-lg text-text-muted border-[#e2dcd0] hover:bg-[#f0ebe1]"
                  >
                    Hủy
                  </button>
                )}
                
                {/* Nút Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`py-3 font-bold text-white rounded-lg transition-all ${editingCourseId ? 'w-2/3 bg-primary hover:bg-primary-dark' : 'w-full bg-primary hover:bg-primary-dark'} disabled:opacity-50`}
                >
                  {isSubmitting ? "Đang xử lý..." : (editingCourseId ? "Lưu thay đổi" : "Tạo khóa học")}
                </button>
              </div>
            </form>
          </div>

          {/* CỘT PHẢI: BẢNG DANH SÁCH KHÓA HỌC */}
          <div className="lg:col-span-2 p-6 border rounded-xl bg-background-sidebar border-primary/20 overflow-hidden">
            <h2 className="text-xl font-bold text-text-light mb-4">Danh sách Khóa học</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-primary/20 text-text-muted text-sm uppercase tracking-wider">
                    <th className="pb-3 pr-4">ID</th>
                    <th className="pb-3 pr-4">Tên khóa học</th>
                    <th className="pb-3 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="py-6 text-center text-text-muted italic">Chưa có khóa học nào.</td>
                    </tr>
                  ) : (
                    courses.map((course) => (
                      <tr key={course.id} className="border-b border-primary/10 hover:bg-[#faf7f0] transition-colors">
                        <td className="py-4 pr-4 font-medium text-text-muted">#{course.id}</td>
                        <td className="py-4 pr-4 font-bold text-text-light">{course.title}</td>
                        <td className="py-4 text-right space-x-4">
                          <button 
                            onClick={() => handleEditCourseClick(course)}
                            className="font-medium text-primary hover:text-primary-dark transition-colors"
                          >
                            Sửa
                          </button>
                          <button 
                            onClick={() => handleDeleteCourse(course.id)}
                            className="font-medium text-red-500 hover:text-red-700 transition-colors"
                          >
                            Xóa
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB BÀI HỌC (LESSONS) - GIỮ NGUYÊN */}
      {activeTab === 'lessons' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 p-6 border rounded-xl bg-background-sidebar border-primary/20">
            <h2 className="text-xl font-bold text-primary mb-4">Thêm Bài học mới</h2>
            <form className="space-y-4" onSubmit={handleCreateLesson}>
              <select
                required
                value={lessonForm.course_id}
                onChange={(e) => setLessonForm({...lessonForm, course_id: e.target.value})}
                className="w-full p-3 bg-background-dark border border-[#e2dcd0] outline-none rounded-lg text-text-light"
              >
                <option value="">-- Chọn khóa học --</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>
              <input
                type="text" required placeholder="Tên bài học"
                value={lessonForm.title}
                onChange={(e)=>setLessonForm({...lessonForm,title:e.target.value})}
                className="w-full p-3 bg-background-dark border border-[#e2dcd0] outline-none text-text-light focus:border-primary rounded-lg"
              />
              <textarea
                required placeholder="Nội dung"
                value={lessonForm.content}
                onChange={(e)=>setLessonForm({...lessonForm,content:e.target.value})}
                className="w-full p-3 bg-background-dark border border-[#e2dcd0] outline-none text-text-light focus:border-primary rounded-lg"
              />
              <input
                type="number" required placeholder="Thứ tự bài học (1, 2, 3...)"
                value={lessonForm.order_index}
                onChange={(e)=>setLessonForm({...lessonForm,order_index:e.target.value})}
                className="w-full p-3 bg-background-dark border border-[#e2dcd0] outline-none text-text-light focus:border-primary rounded-lg"
              />
              <button
                type="submit" disabled={isSubmitting}
                className="w-full py-3 font-bold text-white rounded-lg bg-primary hover:bg-primary-dark disabled:opacity-50"
              >
                {isSubmitting ? "Đang lưu..." : "Lưu Bài học"}
              </button>
            </form>
          </div>
          <div className="lg:col-span-2 p-6 border rounded-xl bg-background-sidebar border-primary/20">
            <h2 className="text-xl font-bold text-text-light mb-4">Danh sách Bài học</h2>
            <p className="text-text-muted italic">Tính năng liệt kê bài học sẽ được cập nhật sau...</p>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminPage;