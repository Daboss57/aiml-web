export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  image_url: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  created_at: string;
  author_id: string;
}

export interface Lesson {
  id: string;
  course_id: string;
  title: string;
  description: string;
  order: number;
  content: string;
  code_template?: string;
  expected_output?: string;
  created_at: string;
}

export interface Progress {
  id: string;
  user_id: string;
  lesson_id: string;
  completed: boolean;
  code_submission?: string;
  created_at: string;
  updated_at: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  image_url: string;
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge_id: string;
  earned_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  title: string;
  description: string;
  code: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: string;
  project_id: string;
  user_id: string;
  content: string;
  created_at: string;
}