// src/pages/dashboard/Overview.tsx
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Overview = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-6xl mx-auto pb-20 space-y-12 font-sans">
      
      {/* 1. KHU VỰC HERO BANNER (LANDING) */}
<div className="relative overflow-hidden bg-background-brown rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between shadow-2xl border border-primary/20">

  {/* pattern nền */}
  <div
    className="absolute inset-0 opacity-5"
    style={{
      backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
      backgroundSize: "28px 28px"
    }}
  ></div>

  {/* glow background */}
  <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 blur-[120px] rounded-full"></div>
  <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-yellow-300/20 blur-[120px] rounded-full"></div>

  {/* nội dung */}
  <div className="relative z-10 md:w-2/3">

    <span className="inline-block py-1 px-4 mb-4 text-xs font-bold tracking-widest uppercase rounded-full text-primary bg-primary/10 border border-primary/20 backdrop-blur">
      Nền tảng học tập nội bộ
    </span>

    <h1 className="mb-6 text-4xl md:text-5xl font-bold leading-tight text-white">
      Chào mừng trở lại, <br />
      <span className="italic font-serif text-primary">
        {user?.name || "Kỹ sư tương lai"}!
      </span>
    </h1>

    <p className="mb-8 text-lg text-gray-400 max-w-lg leading-relaxed">
      Tiếp tục hành trình chinh phục Công nghệ phần mềm. Khám phá các bài học mới,
      tương tác với AI và nâng cao kỹ năng thực chiến của bạn mỗi ngày.
    </p>

    <div className="flex flex-wrap gap-4">

      <Link
        to="/dashboard/courses"
        className="px-8 py-4 font-bold tracking-widest text-white uppercase transition-all rounded-full bg-primary hover:bg-primary-dark shadow-neon hover:scale-105"
      >
        Vào Khóa Học Ngay
      </Link>

      <Link
        to="/dashboard/profile"
        className="px-8 py-4 font-bold transition-all border rounded-full text-gray-300 hover:text-white border-gray-600 hover:border-gray-400 hover:scale-105"
      >
        Xem Hồ Sơ
      </Link>

    </div>
  </div>

  {/* hình công nghệ bên phải */}
  <div className="hidden md:flex relative z-10 w-1/3 justify-center items-center">

    {/* glow */}
    <div className="absolute w-72 h-72 bg-gradient-to-tr from-primary to-cyan-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>

    {/* ảnh công nghệ */}
    <img
      src="https://cdn-icons-png.flaticon.com/512/1055/1055687.png"
      alt="technology"
      className="relative z-10 w-56 drop-shadow-2xl"
      style={{
        animation: "float 6s ease-in-out infinite"
      }}
    />

  </div>

  {/* CSS animation nhúng trực tiếp */}
  <style>
    {`
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-15px); }
        100% { transform: translateY(0px); }
      }
    `}
  </style>

</div>
      {/* 2. KHU VỰC FEATURES (TÍNH NĂNG NỔI BẬT) */}
      <div>
        <h2 className="text-2xl font-bold text-text-light mb-8 font-serif">Trải nghiệm của bạn</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-8 bg-white border border-[#e2dcd0] rounded-2xl hover:border-primary transition-colors hover:shadow-lg group">
            <div className="w-14 h-14 bg-[#f0ebe1] text-primary rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
              📚
            </div>
            <h3 className="text-xl font-bold text-text-light mb-3">Lộ trình bài bản</h3>
            <p className="text-text-muted leading-relaxed">
              Các khóa học được thiết kế chuẩn kỹ sư phần mềm, từ khái niệm cơ bản đến kiến trúc hệ thống chuyên sâu.
            </p>
          </div>

          <div className="p-8 bg-white border border-[#e2dcd0] rounded-2xl hover:border-primary transition-colors hover:shadow-lg group">
            <div className="w-14 h-14 bg-[#f0ebe1] text-primary rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
              🤖
            </div>
            <h3 className="text-xl font-bold text-text-light mb-3">Trợ lý AI Thông minh</h3>
            <p className="text-text-muted leading-relaxed">
              Tích hợp AI Chat bot giải đáp thắc mắc ngay trong từng bài học, giúp bạn hiểu sâu và gỡ rối code 24/7.
            </p>
          </div>

          <div className="p-8 bg-white border border-[#e2dcd0] rounded-2xl hover:border-primary transition-colors hover:shadow-lg group">
            <div className="w-14 h-14 bg-[#f0ebe1] text-primary rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
              📈
            </div>
            <h3 className="text-xl font-bold text-text-light mb-3">Theo dõi tiến độ</h3>
            <p className="text-text-muted leading-relaxed">
              Hệ thống tự động ghi nhận bài học hoàn thành, trực quan hóa qua biểu đồ tiến độ cá nhân hóa.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Overview;