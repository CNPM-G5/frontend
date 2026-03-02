const Progress = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] p-8 border rounded-xl border-primary/20 bg-background-card shadow-neon">
      <span className="mb-4 text-6xl drop-shadow-neon">📊</span>
      <h2 className="mb-2 text-2xl font-bold text-text-light">Tiến độ học tập</h2>
      <p className="text-text-muted">Biểu đồ thống kê kết quả học tập sẽ hiển thị ở đây.</p>
    </div>
  );
};
export default Progress;