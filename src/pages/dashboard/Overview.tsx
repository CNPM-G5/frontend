import { Link } from 'react-router-dom';

const Overview = () => {
  // Dữ liệu 6 bài học dựa trên bản thiết kế Frame 1 của bạn
  const courses = [
    { id: '01', title: '[Giới thiệu] Công nghệ phần mềm', desc: 'Tổng quan về môn học' },
    { 
      id: '02', 
      title: 'Mô hình phát triển phần mềm', 
      desc: 'Iterative Incremental, Waterfall, Agile...', 
      highlight: true // Đánh dấu đặc biệt cho thẻ này theo ý nhóm trưởng
    },
    { id: '03', title: 'Phân tích & Thiết kế Phần mềm', desc: 'Sơ đồ lớp, Sơ đồ trình tự (UML)...'},
    { id: '04', title: 'Quản lý Dự án Công nghệ phần mềm', desc: 'Lập kế hoạch, Tiến độ...' },
    { id: '05', title: 'Kiểm thử Phần mềm (Testing)', desc: 'Test Case, Kiểm thử tự động...' },
    { id: '06', title: 'Triển khai & Bảo trì', desc: 'Deployment, Bảo trì hệ thống...' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Tiêu đề trang */}
      <div className="flex items-center justify-center mb-10">
        <div className="w-16 h-px bg-gradient-to-r from-transparent to-primary"></div>
        <h1 className="px-6 text-2xl font-bold tracking-widest text-transparent uppercase bg-clip-text bg-gradient-primary">
          Nội dung môn học
        </h1>
        <div className="w-16 h-px bg-gradient-to-l from-transparent to-primary"></div>
      </div>

      {/* Lưới chứa 6 thẻ khóa học */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Link 
            to={`/dashboard/course/${course.id}`} // Đường dẫn dự kiến khi click vào thẻ
            key={course.id}
            className={`relative group p-6 rounded-xl border transition-all duration-300 bg-background-card flex flex-col h-full
              `}
          >
            <div className="flex items-start justify-between mb-4">
              <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-primary opacity-80">
                {course.id}
              </span>
            </div>
            
            <h3 className="mb-2 text-lg font-bold text-text-light group-hover:text-primary transition-colors">
              {course.title}
            </h3>
            
            <p className="mt-auto text-sm text-text-muted">
              {course.desc}
            </p>

            {/* Hiệu ứng viền sáng chạy dọc (Trang trí thêm cho ngầu) */}
            <div className="absolute top-0 left-0 w-1 h-full rounded-l-xl bg-gradient-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Overview;