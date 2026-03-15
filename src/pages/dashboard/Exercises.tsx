const Exercises = () => {
  // Dữ liệu mẫu giả lập danh sách bài tập
  const mockExercises = [
    { id: 1, type: 'Trắc nghiệm', title: 'Quiz: Mô hình phát triển phần mềm', course: 'Nhập môn CNPM', deadline: '20/03/2026', status: 'completed' },
    { id: 2, type: 'Tự luận', title: 'Vẽ sơ đồ Use Case cho hệ thống ATM', course: 'Phân tích & Thiết kế', deadline: 'Hôm nay', status: 'pending' },
    { id: 3, type: 'Đồ án', title: 'Nộp source code Iteration 1', course: 'Quản lý Dự án CNPM', deadline: 'Quá hạn (12/03)', status: 'overdue' },
  ];

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="flex items-center gap-4 mb-8">
        <span className="flex items-center justify-center w-12 h-12 text-2xl border rounded-xl bg-primary/20 border-primary shadow-neon">📝</span>
        <div>
          <h1 className="text-3xl font-bold text-text-light">Bài tập & Kiểm tra</h1>
          <p className="text-text-muted">Hoàn thành các bài tập để củng cố kiến thức</p>
        </div>
      </div>

      <div className="grid gap-6">
        {mockExercises.map((ex) => (
          <div key={ex.id} className="flex flex-col md:flex-row md:items-center justify-between p-6 border rounded-xl bg-background-card border-primary/20 hover:border-primary hover:shadow-neon transition-all">
            
            <div className="flex-1 mb-4 md:mb-0">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 text-xs font-bold text-white uppercase rounded-full bg-gradient-primary">
                  {ex.type}
                </span>
                <span className="text-sm font-medium text-text-muted">📚 {ex.course}</span>
              </div>
              <h3 className="text-xl font-bold text-text-light">{ex.title}</h3>
              <p className="text-sm text-text-muted mt-1">Hạn nộp: <span className="font-medium text-text-light">{ex.deadline}</span></p>
            </div>

            <div className="flex items-center gap-4">
              {/* Hiển thị trạng thái (Status Badge) */}
              {ex.status === 'completed' && (
                <span className="px-4 py-2 text-sm font-bold text-green-400 border rounded-lg bg-green-500/10 border-green-500/30 flex items-center gap-2">
                  <span>✅</span> Đã chấm điểm
                </span>
              )}
              {ex.status === 'pending' && (
                <button className="px-6 py-2 font-bold text-background-dark transition-all rounded-lg bg-primary hover:bg-white hover:shadow-neon">
                  Làm bài ngay
                </button>
              )}
              {ex.status === 'overdue' && (
                <span className="px-4 py-2 text-sm font-bold text-red-400 border rounded-lg bg-red-500/10 border-red-500/30 flex items-center gap-2">
                  <span>❌</span> Khóa nộp bài
                </span>
              )}
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};
export default Exercises;