import { useState, useEffect } from 'react';
import { adminApi } from '../../api/adminApi';
import { courseApi, Course, CourseDetailType } from '../../api/courseApi';
import { Lesson } from '../../api/courseApi';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState<'courses' | 'lessons'>('courses');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);

  // ==========================================
  // LOGIC QUẢN LÝ KHÓA HỌC (COURSES)
  // ==========================================
  
  const [courseForm, setCourseForm] = useState({ title: '', description: '', model_type: '' });
  const [editingCourseId, setEditingCourseId] = useState<number | null>(null);

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

  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseForm.title || !courseForm.description) {
      alert("Vui lòng điền đầy đủ thông tin khóa học!");
      return;
    }

    try {
      setIsSubmitting(true);
      if (editingCourseId) {
        await courseApi.updateCourseApi(editingCourseId, courseForm);
        alert("🎉 Cập nhật khóa học thành công!");
      } else {
        await courseApi.createCourseApi(courseForm);
        alert("🎉 Thêm khóa học thành công!");
      }
      
      setCourseForm({ title: '', description: '', model_type: '' });
      setEditingCourseId(null);
      loadCourses(); 
    } catch (error: any) {
      alert(error.response?.data?.message || "Có lỗi xảy ra khi lưu khóa học.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditCourseClick = (course: Course) => {
    setEditingCourseId(course.id);
    setCourseForm({
      title: course.title,
      description: course.description,
      model_type: (course as any).model_type || ''
    });
  };

  const handleDeleteCourse = async (id: number) => {
    const isConfirm = window.confirm(`⚠️ Bạn có chắc chắn muốn xóa khóa học #${id} này không? Mọi bài học bên trong sẽ bị mất!`);
    if (isConfirm) {
      try {
        await courseApi.deleteCourseApi(id);
        alert("🗑️ Đã xóa khóa học thành công!");
        loadCourses();
      } catch (error: any) {
        alert(error.response?.data?.message || "Không thể xóa. Vui lòng thử lại!");
      }
    }
  };

  // ==========================================
  // LOGIC QUẢN LÝ BÀI HỌC (LESSONS) - NEW STRUCTURE
  // ==========================================
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [courseDetail, setCourseDetail] = useState<CourseDetailType | null>(null);
  const [lessonAction, setLessonAction] = useState<'add' | 'edit' | 'delete' | null>(null);
  const [lessonForm, setLessonForm] = useState({ title: '', content: '', order_index: '' });
  const [editingLessonId, setEditingLessonId] = useState<number | null>(null);
  const [loadingLessons, setLoadingLessons] = useState(false);

  // Hàm tải bài học của khóa học được chọn
  const handleSelectCourse = async (courseId: number) => {
    setSelectedCourse(courseId);
    setLessonAction(null);
    setEditingLessonId(null);
    setLessonForm({ title: '', content: '', order_index: '' });

    try {
      setLoadingLessons(true);
      const detail = await courseApi.getCourseByIdApi(courseId.toString());
      setCourseDetail(detail);
    } catch (error) {
      console.error('Lỗi tải bài học:', error);
      alert('Không thể tải bài học. Vui lòng thử lại!');
    } finally {
      setLoadingLessons(false);
    }
  };

  // Hàm thêm bài học
  const handleAddLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lessonForm.title || !lessonForm.content || !lessonForm.order_index) {
      alert('Vui lòng điền đầy đủ thông tin bài học!');
      return;
    }

    const orderIndex = Number(lessonForm.order_index);
    const maxOrderIndex = (courseDetail?.lessons?.length || 0) + 1;

    // Validate order_index
    if (orderIndex < 1 || orderIndex > maxOrderIndex) {
      alert(`❌ Thứ tự bài học phải từ 1 đến ${maxOrderIndex}`);
      return;
    }

    try {
      setIsSubmitting(true);
      await adminApi.createLesson({
        course_id: selectedCourse,
        ...lessonForm,
        order_index: orderIndex
      });
      alert('🎉 Thêm bài học thành công!');
      setLessonForm({ title: '', content: '', order_index: '' });
      setLessonAction(null);
      if (selectedCourse) {
        handleSelectCourse(selectedCourse);
      }
    } catch (error: any) {
      alert(error.response?.data?.message || 'Có lỗi xảy ra khi thêm bài học!');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Hàm sửa bài học
  const handleSaveEditLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lessonForm.title || !lessonForm.content || !lessonForm.order_index || !editingLessonId) {
      alert('Vui lòng điền đầy đủ thông tin bài học!');
      return;
    }

    const orderIndex = Number(lessonForm.order_index);
    const maxOrderIndex = (courseDetail?.lessons?.length || 0) + 1;

    // Validate order_index
    if (orderIndex < 1 || orderIndex > maxOrderIndex) {
      alert(`❌ Thứ tự bài học phải từ 1 đến ${maxOrderIndex}`);
      return;
    }

    try {
      setIsSubmitting(true);
      await adminApi.updateLesson(editingLessonId, {
        title: lessonForm.title,
        content: lessonForm.content,
        order_index: orderIndex
      });
      alert('🎉 Cập nhật bài học thành công!');
      setLessonForm({ title: '', content: '', order_index: '' });
      setEditingLessonId(null);
      setLessonAction(null);
      if (selectedCourse) {
        handleSelectCourse(selectedCourse);
      }
    } catch (error: any) {
      alert(error.response?.data?.message || 'Có lỗi xảy ra khi cập nhật bài học!');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Hàm xóa bài học
  const handleDeleteLesson = async (lessonId: number, lessonTitle: string) => {
    const isConfirm = window.confirm(`⚠️ Bạn có chắc chắn muốn xóa bài học "${lessonTitle}" không?`);
    if (isConfirm) {
      try {
        await adminApi.deleteLesson(lessonId);
        alert('🗑️ Đã xóa bài học thành công!');
        setLessonAction(null);
        if (selectedCourse) {
          handleSelectCourse(selectedCourse);
        }
      } catch (error: any) {
        alert(error.response?.data?.message || 'Không thể xóa bài học. Vui lòng thử lại!');
      }
    }
  };

  // Hàm bấm nút Sửa (Đổ dữ liệu lên form)
  const handleEditLessonClick = (lesson: Lesson) => {
    setEditingLessonId(lesson.id);
    setLessonForm({
      title: lesson.title,
      content: '', // Backend không trả về content trong list, cần fetch riêng
      order_index: lesson.order_index.toString()
    });
    setLessonAction('edit');
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
          Quản lý Khóa học
        </button>
        <button 
          onClick={() => setActiveTab('lessons')}
          className={`pb-3 px-4 font-bold ${activeTab === 'lessons' ? 'text-primary border-b-2 border-primary' : 'text-text-muted hover:text-primary'}`}
        >
          Quản lý Bài học
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

      {/* TAB BÀI HỌC (LESSONS) - NEW STRUCTURE */}
      {activeTab === 'lessons' && (
        <div>
          {/* CHỌN KHÓA HỌC */}
          <div className="p-6 border rounded-xl bg-background-sidebar border-primary/20 mb-8">
            <select
              value={selectedCourse || ''}
              onChange={(e) => {
                const courseId = Number(e.target.value);
                if (courseId) {
                  handleSelectCourse(courseId);
                } else {
                  setSelectedCourse(null);
                  setCourseDetail(null);
                  setLessonAction(null);
                }
              }}
              className="w-full p-3 bg-background-dark border border-[#e2dcd0] outline-none rounded-lg text-text-light"
            >
              <option value="">-- Chọn khóa học --</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>
          </div>

          {/* CHỌN CHỨC NĂNG (Chỉ hiện khi đã chọn khóa học) */}
          {selectedCourse && courseDetail && (
            <div>
              <div className="p-6 border rounded-xl bg-background-sidebar border-primary/20 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <button
                    onClick={() => {
                      setLessonAction('add');
                      setEditingLessonId(null);
                      // Auto-fill order_index based on current number of lessons
                      const nextOrderIndex = (courseDetail?.lessons?.length || 0) + 1;
                      setLessonForm({ title: '', content: '', order_index: nextOrderIndex.toString() });
                    }}
                    className={`p-4 rounded-lg font-bold transition-all text-white ${
                      lessonAction === 'add'
                        ? 'bg-primary shadow-neon'
                        : 'bg-green-600 hover:bg-green-700'
                    }`}
                  >
                    Thêm Bài học
                  </button>
                  <button
                    onClick={() => {
                      setLessonAction('edit');
                      setEditingLessonId(null);
                      setLessonForm({ title: '', content: '', order_index: '' });
                    }}
                    className={`p-4 rounded-lg font-bold transition-all text-white ${
                      lessonAction === 'edit'
                        ? 'bg-primary shadow-neon'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    Sửa Bài học
                  </button>
                  <button
                    onClick={() => setLessonAction('delete')}
                    className={`p-4 rounded-lg font-bold transition-all text-white ${
                      lessonAction === 'delete'
                        ? 'bg-primary shadow-neon'
                        : 'bg-red-600 hover:bg-red-700'
                    }`}
                  >
                    Xóa Bài học
                  </button>
                </div>
              </div>

              {/* BƯỚC 3: THÊM BÀI HỌC */}
              {lessonAction === 'add' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1 p-6 border rounded-xl bg-background-sidebar border-primary/20 h-fit">
                    <h2 className="text-xl font-bold text-primary mb-6">Thêm Bài học mới</h2>
                    <form className="space-y-4" onSubmit={handleAddLesson}>
                      <div>
                        <label className="block text-xs font-bold text-text-muted uppercase mb-1">Tên bài học</label>
                        <input
                          type="text"
                          required
                          placeholder="Tiêu đề bài học"
                          value={lessonForm.title}
                          onChange={(e) => setLessonForm({...lessonForm, title: e.target.value})}
                          className="w-full p-3 bg-background-dark border border-[#e2dcd0] text-text-light outline-none focus:border-primary rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-text-muted uppercase mb-1">Nội dung</label>
                        <textarea
                          required
                          rows={5}
                          placeholder="Nội dung chi tiết bài học"
                          value={lessonForm.content}
                          onChange={(e) => setLessonForm({...lessonForm, content: e.target.value})}
                          className="w-full p-3 bg-background-dark border border-[#e2dcd0] text-text-light outline-none focus:border-primary rounded-lg resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-text-muted uppercase mb-1">Thứ tự bài học</label>
                        <input
                          type="number"
                          required
                          min="1"
                          max={(courseDetail?.lessons?.length || 0) + 1}
                          placeholder="1, 2, 3..."
                          value={lessonForm.order_index}
                          onChange={(e) => setLessonForm({...lessonForm, order_index: e.target.value})}
                          className="w-full p-3 bg-background-dark border border-[#e2dcd0] text-text-light outline-none focus:border-primary rounded-lg"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 font-bold text-white rounded-lg bg-primary hover:bg-primary-dark disabled:opacity-50 transition-all"
                      >
                        {isSubmitting ? "Đang lưu..." : "Lưu Bài học"}
                      </button>
                    </form>
                  </div>

                  <div className="lg:col-span-2 p-6 border rounded-xl bg-background-sidebar border-primary/20">
                    <h2 className="text-xl font-bold text-text-light mb-4">Danh sách Bài học hiện tại</h2>
                    {courseDetail.lessons && courseDetail.lessons.length > 0 ? (
                      <div className="space-y-3">
                        {courseDetail.lessons.map((lesson) => (
                          <div key={lesson.id} className="p-4 bg-background-dark rounded-lg border border-primary/10">
                            <p className="font-bold text-text-light">Bài {lesson.order_index}: {lesson.title}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-text-muted italic">Khóa học này chưa có bài học nào.</p>
                    )}
                  </div>
                </div>
              )}

              {/* BƯỚC 3: SỬA BÀI HỌC */}
              {lessonAction === 'edit' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1 p-6 border rounded-xl bg-background-sidebar border-primary/20 h-fit">
                    <h2 className="text-xl font-bold text-primary mb-6">Sửa Bài học</h2>
                    
                    {!editingLessonId ? (
                      <p className="text-text-muted">Chọn bài học từ danh sách bên phải để sửa.</p>
                    ) : (
                      <form className="space-y-4" onSubmit={handleSaveEditLesson}>
                        <div>
                          <label className="block text-xs font-bold text-text-muted uppercase mb-1">Tên bài học</label>
                          <input
                            type="text"
                            required
                            placeholder="Tiêu đề bài học"
                            value={lessonForm.title}
                            onChange={(e) => setLessonForm({...lessonForm, title: e.target.value})}
                            className="w-full p-3 bg-background-dark border border-[#e2dcd0] text-text-light outline-none focus:border-primary rounded-lg"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-text-muted uppercase mb-1">Nội dung</label>
                          <textarea
                            required
                            rows={5}
                            placeholder="Nội dung chi tiết bài học"
                            value={lessonForm.content}
                            onChange={(e) => setLessonForm({...lessonForm, content: e.target.value})}
                            className="w-full p-3 bg-background-dark border border-[#e2dcd0] text-text-light outline-none focus:border-primary rounded-lg resize-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-text-muted uppercase mb-1">Thứ tự bài học</label>
                          <input
                            type="number"
                            required
                            min="1"
                            max={(courseDetail?.lessons?.length || 0) + 1}
                            placeholder="1, 2, 3..."
                            value={lessonForm.order_index}
                            onChange={(e) => setLessonForm({...lessonForm, order_index: e.target.value})}
                            className="w-full p-3 bg-background-dark border border-[#e2dcd0] text-text-light outline-none focus:border-primary rounded-lg"
                          />
                        </div>

                        <div className="flex gap-3 pt-2">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingLessonId(null);
                              setLessonForm({ title: '', content: '', order_index: '' });
                            }}
                            className="w-1/3 py-3 font-bold transition-colors border rounded-lg text-text-muted border-[#e2dcd0] hover:bg-[#f0ebe1]"
                          >
                            Hủy
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-2/3 py-3 font-bold text-white rounded-lg bg-primary hover:bg-primary-dark disabled:opacity-50 transition-all"
                          >
                            {isSubmitting ? "Đang lưu..." : "Lưu thay đổi"}
                          </button>
                        </div>
                      </form>
                    )}
                  </div>

                  <div className="lg:col-span-2 p-6 border rounded-xl bg-background-sidebar border-primary/20">
                    <h2 className="text-xl font-bold text-text-light mb-4">Danh sách Bài học</h2>
                    {courseDetail.lessons && courseDetail.lessons.length > 0 ? (
                      <div className="space-y-2">
                        {courseDetail.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className={`p-4 rounded-lg border cursor-pointer transition-all ${
                              editingLessonId === lesson.id
                                ? 'bg-primary/20 border-primary'
                                : 'bg-background-dark border-primary/10 hover:border-primary/30'
                            }`}
                            onClick={() => handleEditLessonClick(lesson)}
                          >
                            <p className="font-bold text-text-light">Bài {lesson.order_index}: {lesson.title}</p>
                            {editingLessonId === lesson.id && (
                              <p className="text-primary text-xs mt-1">Đang chỉnh sửa</p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-text-muted italic">Khóa học này chưa có bài học nào.</p>
                    )}
                  </div>
                </div>
              )}

              {/* BƯỚC 3: XÓA BÀI HỌC */}
              {lessonAction === 'delete' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="lg:col-span-1 p-6 border rounded-xl bg-background-sidebar border-primary/20">
                    <h2 className="text-xl font-bold text-red-600 mb-6">Xóa Bài học</h2>
                    <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-4">
                      <p className="text-red-800 text-sm">
                        Cảnh báo: Hành động này không thể hoàn tác. Vui lòng chọn bài học và xác nhận xóa.
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-1 p-6 border rounded-xl bg-background-sidebar border-primary/20">
                    <h2 className="text-xl font-bold text-text-light mb-4">Chọn bài học để xóa</h2>
                    {courseDetail.lessons && courseDetail.lessons.length > 0 ? (
                      <div className="space-y-2">
                        {courseDetail.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="p-4 bg-background-dark rounded-lg border border-primary/10 hover:border-red-500 transition-all flex items-center justify-between"
                          >
                            <div className="flex-1">
                              <p className="font-bold text-text-light">Bài {lesson.order_index}: {lesson.title}</p>
                            </div>
                            <button
                              onClick={() => handleDeleteLesson(lesson.id, lesson.title)}
                              className="ml-4 px-4 py-2 font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-all"
                            >
                              Xóa
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-text-muted italic">Khóa học này chưa có bài học nào.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default AdminPage;