import axiosClient from './axios';

export interface LessonProgress {
  id: number;
  title: string;
  orderIndex: number;
  completed: boolean;
  completedAt: string | null;
}

export interface CourseProgress {
  total: number;
  completed: number;
  percentage: number;
  completed_lesson_ids: number[];
  lessons: LessonProgress[];
}

export interface CompletedCourse {
  id: number;
  title: string;
  totalLessons: number;
}

export const progressApi = {
  getCourseProgressApi: async (courseId: string): Promise<CourseProgress> => {
    const response = await axiosClient.get(`/progress/${courseId}`);
    const d = response.data?.data;
    return {
      total: d.progress.totalLessons,
      completed: d.progress.completedLessons,
      percentage: d.progress.progressPercentage,
      completed_lesson_ids: (d.lessons as LessonProgress[])
        .filter(l => l.completed)
        .map(l => l.id),
      lessons: d.lessons,
    };
  },

  // Lấy danh sách khóa học đã hoàn thành 100%
  getCompletedCoursesApi: async (): Promise<CompletedCourse[]> => {
    const coursesRes = await axiosClient.get('/courses');
    const courses = coursesRes.data?.data ?? [];

    const results = await Promise.all(
      courses.map(async (c: any) => {
        try {
          const res = await axiosClient.get(`/progress/${c.id}`);
          const d = res.data?.data;
          const pct = d.progress.progressPercentage;
          if (pct === 100) {
            return { id: c.id, title: c.title, totalLessons: d.progress.totalLessons } as CompletedCourse;
          }
        } catch { /* bỏ qua nếu lỗi */ }
        return null;
      })
    );

    return results.filter(Boolean) as CompletedCourse[];
  }
};
