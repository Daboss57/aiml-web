import { create } from 'zustand';
import { Course, Lesson, Progress } from '../types';
import { 
  getCourses, 
  getCourseById, 
  getLessonsByCourse, 
  getLessonById, 
  saveProgress, 
  getUserProgress 
} from '../lib/supabase';

interface CourseState {
  courses: Course[];
  currentCourse: Course | null;
  lessons: Lesson[];
  currentLesson: Lesson | null;
  userProgress: Progress[];
  isLoading: boolean;
  error: string | null;
  fetchCourses: () => Promise<void>;
  fetchCourseById: (id: string) => Promise<void>;
  fetchLessonsByCourse: (courseId: string) => Promise<void>;
  fetchLessonById: (id: string) => Promise<void>;
  markLessonComplete: (userId: string, lessonId: string, code?: string) => Promise<void>;
  fetchUserProgress: (userId: string) => Promise<void>;
}

export const useCourseStore = create<CourseState>((set, get) => ({
  courses: [],
  currentCourse: null,
  lessons: [],
  currentLesson: null,
  userProgress: [],
  isLoading: false,
  error: null,

  fetchCourses: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await getCourses();
      if (error) throw new Error(error.message);
      set({ courses: data as Course[] });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchCourseById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await getCourseById(id);
      if (error) throw new Error(error.message);
      set({ currentCourse: data as Course });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchLessonsByCourse: async (courseId) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await getLessonsByCourse(courseId);
      if (error) throw new Error(error.message);
      set({ lessons: data as Lesson[] });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchLessonById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await getLessonById(id);
      if (error) throw new Error(error.message);
      set({ currentLesson: data as Lesson });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  markLessonComplete: async (userId, lessonId, code) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await saveProgress(userId, lessonId, true, code);
      if (error) throw new Error(error.message);
      
      // Update the user progress
      set((state) => {
        const updatedProgress = [...state.userProgress];
        const existingIndex = updatedProgress.findIndex(p => p.lesson_id === lessonId);
        
        if (existingIndex >= 0) {
          updatedProgress[existingIndex] = data as Progress;
        } else {
          updatedProgress.push(data as Progress);
        }
        
        return { userProgress: updatedProgress };
      });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchUserProgress: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await getUserProgress(userId);
      if (error) throw new Error(error.message);
      set({ userProgress: data as Progress[] });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },
}));