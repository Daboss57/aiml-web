import { create } from 'zustand';
import { Project } from '../types';
import { saveProject, getPublicProjects, getUserProjects } from '../lib/supabase';

interface ProjectState {
  userProjects: Project[];
  publicProjects: Project[];
  isLoading: boolean;
  error: string | null;
  saveUserProject: (userId: string, title: string, description: string, code: string, isPublic: boolean) => Promise<void>;
  fetchUserProjects: (userId: string) => Promise<void>;
  fetchPublicProjects: () => Promise<void>;
}

export const useProjectStore = create<ProjectState>((set) => ({
  userProjects: [],
  publicProjects: [],
  isLoading: false,
  error: null,

  saveUserProject: async (userId, title, description, code, isPublic) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await saveProject(userId, title, description, code, isPublic);
      if (error) throw new Error(error.message);
      
      set((state) => ({
        userProjects: [data as Project, ...state.userProjects],
      }));
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  fetchUserProjects: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await getUserProjects(userId);
      if (error) throw new Error(error.message);
      set({ userProjects: data as Project[] });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchPublicProjects: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await getPublicProjects();
      if (error) throw new Error(error.message);
      set({ publicProjects: data as Project[] });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },
}));