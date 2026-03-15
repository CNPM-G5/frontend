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
  }
};
