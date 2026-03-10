// src/api/courseApi.ts
import axiosClient from './axios'; // Import file axios bạn đã cấu hình ở Iteration 1

// Định nghĩa kiểu dữ liệu cho Khóa học để TypeScript hỗ trợ nhắc code
export interface Course {
  id: number;
  title: string;
  description: string;

  lesson_count: number;
}
export interface Lesson {
  id: number;
  course_id: number;
  title: string;
  order_index: number;
}

// Mở rộng Course thêm mảng lessons
export interface CourseDetailType extends Course {
  lessons: Lesson[];
}
export const courseApi = {
  // Hàm lấy tất cả khóa học
  getAllCoursesApi: async (): Promise<Course[]> => {
    const response = await axiosClient.get('/courses');
    
    // In ra cửa sổ Console để bạn nhìn rõ Backend đang trả về cái gì
    console.log("Dữ liệu từ Backend:", response.data);

    // Kiểm tra cấu trúc dữ liệu để bóc tách lấy đúng Mảng
    if (Array.isArray(response.data)) {
      return response.data; // Trường hợp Backend trả về thẳng mảng
    } else if (response.data && Array.isArray(response.data.data)) {
      return response.data.data; // Trường hợp Backend gói mảng trong thuộc tính 'data'
    } else if (response.data && Array.isArray(response.data.courses)) {
      return response.data.courses; // Trường hợp Backend gói mảng trong thuộc tính 'courses'
    }
    return []; 
  },

  // Hàm lấy chi tiết khóa học
  getCourseByIdApi: async (id: string): Promise<CourseDetailType> => {
    const response = await axiosClient.get(`/courses/${id}`);
    
    // 1. In log ra để bạn xem chính xác Backend đang gửi cái gì
    console.log(`Dữ liệu Course ${id} từ Backend:`, response.data);

    let courseData = response.data;

    // 2. Trường hợp Backend bọc tất cả trong biến 'data' (VD: { data: { id: 1, title: '...', lessons: [...] } })
    if (response.data && response.data.data) {
      courseData = response.data.data;
    }

    // 3. Trường hợp Backend tách riêng course và mảng lessons (VD: { course: {...}, lessons: [...] })
    if (response.data && response.data.course && Array.isArray(response.data.lessons)) {
      return {
        ...response.data.course,
        lessons: response.data.lessons
      };
    }

    // 4. Nếu Backend trả về một mảng bài học tên khác (ví dụ 'danh_sach_bai_hoc' hay 'CourseLessons')
    // Đoạn này ta lót sẵn một mảng rỗng nếu backend thực sự chưa trả về bài học nào
    if (!courseData.lessons) {
      courseData.lessons = []; // Đảm bảo FE không bị sập vì lỗi undefined.map
    }

    return courseData;
  }
};