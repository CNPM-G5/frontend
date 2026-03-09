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

  // Hàm lấy chi tiết 1 khóa học
  getCourseByIdApi: async (id: string): Promise<CourseDetailType> => {
    const response = await axiosClient.get(`/courses/${id}`);
    return response.data;
  }
};