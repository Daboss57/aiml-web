import { createClient } from '@supabase/supabase-js';

// Replace with your own Supabase URL and anon key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function signUp(email: string, password: string, fullName: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });
  
  return { data, error };
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getCurrentUser() {
  const { data } = await supabase.auth.getUser();
  return data?.user;
}

export async function updateUserProfile(fullName: string, avatarUrl?: string) {
  const { data, error } = await supabase.auth.updateUser({
    data: {
      full_name: fullName,
      avatar_url: avatarUrl,
    },
  });
  
  return { data, error };
}

// Course-related functions
export async function getCourses() {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: false });
  
  return { data, error };
}

export async function getCourseById(id: string) {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('id', id)
    .single();
  
  return { data, error };
}

// Lesson-related functions
export async function getLessonsByCourse(courseId: string) {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('course_id', courseId)
    .order('order', { ascending: true });
  
  return { data, error };
}

export async function getLessonById(id: string) {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('id', id)
    .single();
  
  return { data, error };
}

// Progress tracking
export async function saveProgress(userId: string, lessonId: string, completed: boolean, codeSubmission?: string) {
  const { data, error } = await supabase
    .from('progress')
    .upsert({
      user_id: userId,
      lesson_id: lessonId,
      completed,
      code_submission: codeSubmission,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();
  
  return { data, error };
}

export async function getUserProgress(userId: string) {
  const { data, error } = await supabase
    .from('progress')
    .select('*')
    .eq('user_id', userId);
  
  return { data, error };
}

// Projects
export async function saveProject(userId: string, title: string, description: string, code: string, isPublic: boolean) {
  const { data, error } = await supabase
    .from('projects')
    .insert({
      user_id: userId,
      title,
      description,
      code,
      is_public: isPublic,
    })
    .select()
    .single();
  
  return { data, error };
}

export async function getPublicProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*, profiles:user_id(*)')
    .eq('is_public', true)
    .order('created_at', { ascending: false });
  
  return { data, error };
}

export async function getUserProjects(userId: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  return { data, error };
}