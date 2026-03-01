import { useParams, Link } from 'react-router-dom';

const CourseDetail = () => {
  const { id } = useParams();

  if (id !== '02') {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl text-text-muted">Nội dung bài học {id} đang được cập nhật...</h2>
        <Link to="/dashboard" className="inline-block mt-4 transition-colors text-primary hover:text-primary-dark">Quay lại Tổng quan</Link>
      </div>
    );
  }

  return (
    
    <div className="flex items-start max-w-6xl gap-8 pb-20 mx-auto relative">
      
      {/* ================= CỘT TRÁI: NỘI DUNG CHÍNH ================= */}
      <div className="flex-1 max-w-4xl">
        {/* Nút quay lại */}
        <Link to="/dashboard" className="inline-flex items-center gap-2 mb-6 transition-colors text-text-muted hover:text-primary">
          <span>←</span> Quay lại Tổng quan
        </Link>

        {/* Header bài viết */}
        <div className="pb-6 mb-8 border-b border-primary/20">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 text-xs font-bold text-white uppercase rounded-full bg-gradient-primary">
              Tutorial
            </span>
            <span className="text-sm text-text-muted">Chương 02</span>
          </div>
          <h1 className="mb-4 text-4xl font-bold leading-tight text-text-light">
            Mô hình Tăng trưởng và Lặp <br/> (Iterative Incremental)
          </h1>
          <p className="text-lg text-text-muted">
            Hướng dẫn chi tiết cách chia nhỏ dự án phần mềm và phát triển lặp đi lặp lại để giảm thiểu rủi ro.
          </p>
        </div>

        {/* Nội dung chính (Gắn ID vào từng section để Mục lục trỏ tới) */}
        <div className="space-y-12 leading-relaxed text-text-light/90">
          
          {/* Section 1 */}
          <section id="khai-niem" className="scroll-mt-8">
            <h2 className="flex items-center gap-2 mb-4 text-2xl font-bold text-primary">
              <span className="text-3xl">1.</span> Khái niệm cốt lõi
            </h2>
            <p className="mb-4">
              Thay vì cố gắng xây dựng toàn bộ hệ thống ngay từ đầu (như mô hình Waterfall), mô hình này kết hợp hai yếu tố:
            </p>
            <ul className="pl-6 mb-4 space-y-2 list-disc">
              <li><strong>Iterative (Lặp):</strong> Làm đi làm lại một phần của hệ thống để làm mịn và cải thiện nó sau mỗi chu kỳ.</li>
              <li><strong>Incremental (Tăng trưởng):</strong> Bổ sung thêm các tính năng mới vào hệ thống sau mỗi vòng lặp.</li>
            </ul>
          </section>

          {/* Section 2 (Ví dụ) */}
          <section id="vi-du" className="p-6 border rounded-xl bg-background-card border-primary/20 shadow-neon scroll-mt-8">
            <h3 className="mb-3 text-xl font-bold text-text-light">💡 Ví dụ thực chiến</h3>
            <p className="mb-3 italic text-text-muted">
              Giả sử một nhóm sinh viên IT cần xây dựng một trang web Quản lý khóa học bằng React. Thay vì code toàn bộ từ A-Z rồi mới nộp:
            </p>
            <div className="space-y-3">
              <div className="p-3 border-l-2 rounded bg-background-sidebar border-primary">
                <strong className="text-primary">Vòng lặp 1 (Tuần 1-2):</strong> Làm khung giao diện cơ bản (Layout, Login) và mock data. Chạy thử nghiệm để chốt UI/UX.
              </div>
              <div className="p-3 border-l-2 rounded bg-background-sidebar border-primary">
                <strong className="text-primary">Vòng lặp 2 (Tuần 3-4):</strong> Tăng trưởng thêm tính năng kết nối Database (Backend). Lặp lại việc sửa lỗi UI ở vòng 1.
              </div>
              <div className="p-3 border-l-2 rounded bg-background-sidebar border-primary">
                <strong className="text-primary">Vòng lặp 3 (Tuần 5-6):</strong> Thêm tính năng phân quyền, nộp bài tập. Hoàn thiện và đóng gói.
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section id="uu-nhuoc-diem" className="scroll-mt-8">
            <h2 className="flex items-center gap-2 mb-4 text-2xl font-bold text-primary">
              <span className="text-3xl">2.</span> Ưu điểm và Nhược điểm
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="p-5 border rounded-lg border-green-500/30 bg-green-500/5">
                <h4 className="flex items-center gap-2 mb-2 font-bold text-green-400">✅ Ưu điểm</h4>
                <ul className="pl-5 text-sm space-y-1 list-disc">
                  <li>Sản phẩm có thể dùng được ngay từ những vòng lặp đầu.</li>
                  <li>Dễ dàng thích ứng khi yêu cầu (Requirement) thay đổi.</li>
                  <li>Rủi ro được phát hiện và xử lý sớm.</li>
                </ul>
              </div>
              <div className="p-5 border rounded-lg border-red-500/30 bg-red-500/5">
                <h4 className="flex items-center gap-2 mb-2 font-bold text-red-400">❌ Nhược điểm</h4>
                <ul className="pl-5 text-sm space-y-1 list-disc">
                  <li>Cần kiến trúc hệ thống ban đầu (Architecture) phải tốt, nếu không sẽ khó mở rộng.</li>
                  <li>Khó xác định chính xác tổng chi phí và thời gian ngay từ đầu.</li>
                </ul>
              </div>
            </div>
          </section>
          
          <div className="flex justify-end mt-12">
            <button className="px-6 py-3 font-bold text-white transition-all rounded-lg bg-gradient-primary hover:shadow-neon">
              Hoàn thành bài học & Tiếp tục →
            </button>
          </div>
        </div>
      </div>

      {/* ================= CỘT PHẢI: MỤC LỤC (TABLE OF CONTENTS) ================= */}
      {/* Lớp hidden lg:block để ẩn mục lục trên điện thoại, chỉ hiện trên màn hình to */}
      <div className="hidden lg:block w-64 sticky top-6 flex-shrink-0">
        <div className="p-5 border rounded-xl bg-background-card border-primary/20">
          <h3 className="mb-4 text-sm font-bold tracking-wider uppercase text-text-light">
            Mục lục bài học
          </h3>
          <nav className="flex flex-col space-y-3 text-sm">
            {/* Sử dụng thẻ a với href="#id" để neo (anchor) đến các section tương ứng */}
            <a href="#khai-niem" className="transition-all duration-300 text-text-muted hover:text-primary hover:translate-x-1">
              1. Khái niệm cốt lõi
            </a>
            <a href="#vi-du" className="ml-4 transition-all duration-300 text-text-muted hover:text-primary hover:translate-x-1">
              💡 Ví dụ thực chiến
            </a>
            <a href="#uu-nhuoc-diem" className="transition-all duration-300 text-text-muted hover:text-primary hover:translate-x-1">
              2. Ưu điểm và Nhược điểm
            </a>
          </nav>
        </div>
      </div>

    </div>
  );
};

export default CourseDetail;