/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#b88645', // Màu Vàng Nâu (Gold) của nút bấm
        'primary-dark': '#9c7038',
        background: {
          dark: '#fdfbf7',    // Đổi nền đen thành nền Kem Sáng (áp dụng cho toàn bộ web)
          sidebar: '#f5f0e6', // Nền sidebar (Kem đậm hơn một chút để phân biệt)
          card: '#ffffff',    // Nền thẻ Card (Trắng tinh)
          brown: '#23201c',   // Màu nâu đen đậm (Dành riêng cho nửa trái của form Đăng nhập)
        },
        text: {
          light: '#23201c',   // Chữ trắng cũ giờ đổi thành Chữ Đen Nâu để nổi trên nền kem
          muted: '#7a756d',   // Chữ xám phụ
          white: '#ffffff',   // Chữ trắng (Chỉ dùng cho các đoạn text nằm trên nền nâu đậm)
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #cda059, #b88645)',
      },
      boxShadow: {
        'neon': '0 4px 15px rgba(184, 134, 69, 0.2)', // Đổi bóng neon xanh thành bóng vàng sang trọng
      }
    },
  },
  plugins: [],
}