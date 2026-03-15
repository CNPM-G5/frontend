// src/pages/dashboard/AdminPage.tsx
import { useState } from 'react';
import { adminApi } from '../../api/adminApi';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState<'courses' | 'lessons'>('courses');
  
  // --- STATE COURSE ---
  const [courseForm, setCourseForm] = useState({ title: '', description: '', model_type: '' });

  // --- STATE LESSON ---
  const [lessonForm, setLessonForm] = useState({ 
    course_id: '', 
    title: '', 
    content: '', 
    slide_url: '', 
    order_index: '' 
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- HÀM XÓA CHẠY THẬT ---
  const handleDelete = async (type: 'course' | 'lesson', id: number) => {
    const isConfirm = window.confirm(`Bạn có chắc chắn muốn xóa ${type === 'course' ? 'khóa học' : 'bài học'} này không?`);
    
    if (isConfirm) {
      try {
        if (type === 'course') {
          await adminApi.deleteCourse(id);
        } else {
          await adminApi.deleteLesson(id);
        }

        alert("🗑️ Đã xóa thành công!");
      } catch (error: any) {
        alert(error.response?.data?.message || "Không thể xóa. Vui lòng thử lại!");
      }
    }
  };

  // --- TẠO COURSE ---
  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!courseForm.title || !courseForm.description || !courseForm.model_type) {
      alert("Vui lòng điền đầy đủ thông tin khóa học!");
      return;
    }

    try {
      setIsSubmitting(true);

      await adminApi.createCourse(courseForm);

      alert("🎉 Thêm khóa học thành công!");

      setCourseForm({ title: '', description: '', model_type: '' });

    } catch (error: any) {
      console.error("Lỗi khi thêm khóa học:", error);
      alert(error.response?.data?.message || "Có lỗi xảy ra khi lưu khóa học.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- TẠO LESSON ---
  const handleCreateLesson = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!lessonForm.course_id || !lessonForm.title || !lessonForm.content || !lessonForm.order_index) {
      alert("Vui lòng điền đầy đủ các trường bắt buộc!");
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = {
        ...lessonForm,
        course_id: Number(lessonForm.course_id),
        order_index: Number(lessonForm.order_index)
      };

      await adminApi.createLesson(payload);

      alert("🎉 Thêm bài học thành công!");

      setLessonForm({
        course_id: '',
        title: '',
        content: '',
        slide_url: '',
        order_index: ''
      });

    } catch (error: any) {
      console.error("Lỗi khi thêm bài học:", error);
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
          className={`pb-3 px-4 font-bold ${activeTab === 'courses' ? 'text-primary border-b-2 border-primary' : 'text-text-muted'}`}
        >
          📚 Quản lý Khóa học
        </button>

        <button 
          onClick={() => setActiveTab('lessons')}
          className={`pb-3 px-4 font-bold ${activeTab === 'lessons' ? 'text-primary border-b-2 border-primary' : 'text-text-muted'}`}
        >
          📋 Quản lý Bài học
        </button>
      </div>

      {/* TAB COURSE */}
      {activeTab === 'courses' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-1 p-6 border rounded-xl bg-background-sidebar border-primary/20">
            <h2 className="text-xl font-bold text-primary mb-4">Thêm Khóa học mới</h2>

            <form className="space-y-4" onSubmit={handleCreateCourse}>

              <input
                type="text"
                placeholder="Tiêu đề"
                value={courseForm.title}
                onChange={(e)=>setCourseForm({...courseForm,title:e.target.value})}
                className="w-full p-3 bg-background-dark border rounded-lg"
              />

              <textarea
                placeholder="Mô tả"
                value={courseForm.description}
                onChange={(e)=>setCourseForm({...courseForm,description:e.target.value})}
                className="w-full p-3 bg-background-dark border rounded-lg"
              />

              <select
                value={courseForm.model_type}
                onChange={(e)=>setCourseForm({...courseForm,model_type:e.target.value})}
                className="w-full p-3 bg-background-dark border rounded-lg"
              >
                <option value="">Chọn model</option>
                <option value="waterfall">Waterfall</option>
                <option value="agile">Agile</option>
                <option value="iterative">Iterative</option>
              </select>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 font-bold text-white rounded-lg bg-gradient-primary disabled:opacity-50"
              >
                {isSubmitting ? "Đang xử lý..." : "Lưu Khóa học"}
              </button>

            </form>
          </div>

        </div>
      )}

      {/* TAB LESSON */}
      {activeTab === 'lessons' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* FORM LESSON */}
          <div className="lg:col-span-1 p-6 border rounded-xl bg-background-sidebar border-primary/20">
            <h2 className="text-xl font-bold text-primary mb-4">Thêm Bài học mới</h2>

            <form className="space-y-4" onSubmit={handleCreateLesson}>

              <input
                type="number"
                required
                placeholder="Course ID"
                value={lessonForm.course_id}
                onChange={(e)=>setLessonForm({...lessonForm,course_id:e.target.value})}
                className="w-full p-3 bg-background-dark border rounded-lg"
              />

              <input
                type="text"
                required
                placeholder="Tên bài học"
                value={lessonForm.title}
                onChange={(e)=>setLessonForm({...lessonForm,title:e.target.value})}
                className="w-full p-3 bg-background-dark border rounded-lg"
              />

              <textarea
                required
                placeholder="Nội dung"
                value={lessonForm.content}
                onChange={(e)=>setLessonForm({...lessonForm,content:e.target.value})}
                className="w-full p-3 bg-background-dark border rounded-lg"
              />

              <input
                type="url"
                placeholder="Slide URL"
                value={lessonForm.slide_url}
                onChange={(e)=>setLessonForm({...lessonForm,slide_url:e.target.value})}
                className="w-full p-3 bg-background-dark border rounded-lg"
              />

              <input
                type="number"
                required
                placeholder="Order index"
                value={lessonForm.order_index}
                onChange={(e)=>setLessonForm({...lessonForm,order_index:e.target.value})}
                className="w-full p-3 bg-background-dark border rounded-lg"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 font-bold text-white rounded-lg bg-gradient-primary disabled:opacity-50"
              >
                {isSubmitting ? "Đang lưu..." : "Lưu Bài học"}
              </button>

            </form>
          </div>

          {/* LIST LESSON */}
          <div className="lg:col-span-2 p-6 border rounded-xl bg-background-card border-primary/20">
            <h2 className="text-xl font-bold text-text-light mb-4">Danh sách Bài học</h2>
            <p className="text-text-muted italic">
              Dữ liệu danh sách bài học sẽ hiển thị ở đây...
            </p>
          </div>

        </div>
      )}

    </div>
  );
};

export default AdminPage;