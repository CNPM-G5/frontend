/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Hệ thống màu tùy chỉnh dựa trên Figma của bạn
        primary: {
          DEFAULT: '#00d2ff', // Xanh neon sáng (dùng cho viền, chữ nổi bật, nút bấm)
          dark: '#005bb5',    // Xanh đậm (dùng cho gradient hoặc hover)
        },
        background: {
          dark: '#030816',    // Màu nền tối nhất (không gian vũ trụ phía sau)
          card: '#0a1128',    // Màu nền của các form, box, thẻ bài học
          sidebar: '#050b1a', // Màu nền cho thanh Sidebar
        },
        text: {
          light: '#f1f5f9',   // Màu chữ trắng sáng (tiêu đề)
          muted: '#94a3b8',   // Màu chữ xám nhạt (mô tả phụ)
        }
      },
      boxShadow: {
        // Hiệu ứng viền phát sáng đặc trưng trong thiết kế
        'neon': '0 0 10px rgba(0, 210, 255, 0.4), 0 0 20px rgba(0, 210, 255, 0.2)', 
        'neon-strong': '0 0 15px rgba(0, 210, 255, 0.6), 0 0 30px rgba(0, 210, 255, 0.4)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #005bb5, #00d2ff)',
      } , 
      animation: { 'spin-slow' : 'spin 3s linear infinite'} 
    },
  },
  plugins: [],
}