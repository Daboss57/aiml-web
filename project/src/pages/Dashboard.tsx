// src/components/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { BookOpen, Code, Trophy } from 'lucide-react';
import { supabase } from '../supabase'; // Import the singleton client

interface Lesson {
  id: string;
  title: string;
  description: string;
  order: number;
}

interface UserProgress {
  lesson_id: string;
  completed: boolean;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessonsAndProgress = async () => {
      try {
        // Fetch lessons
        const { data: lessonsData, error: lessonsError } = await supabase
          .from('lessons')
          .select('*')
          .order('order', { ascending: true });

        if (lessonsError) throw lessonsError;

        // Fetch user progress
        const { data: progressData, error: progressError } = await supabase
          .from('user_progress')
          .select('lesson_id, completed')
          .eq('user_id', user?.id);

        if (progressError) throw progressError;

        // Convert progress data to a map for easier lookup
        const progressMap = (progressData || []).reduce((acc: Record<string, boolean>, curr: UserProgress) => {
          acc[curr.lesson_id] = curr.completed;
          return acc;
        }, {});

        setLessons(lessonsData || []);
        setProgress(progressMap);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchLessonsAndProgress();
    }
  }, [user]);

  const calculateOverallProgress = (lessonId: string) => {
    return progress[lessonId] ? 100 : 0;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-t-2 border-b-2 border-purple-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-white">
          Welcome back, {user?.email?.split('@')[0]}!
        </h1>
        <p className="text-gray-300">
          Track your progress and continue your AI/ML learning journey.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {lessons.map((lesson, index) => (
          <motion.div
            key={lesson.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 transition-colors bg-white/10 backdrop-blur-lg rounded-xl hover:bg-white/20"
          >
            <div className="flex items-center mb-4">
              <div className="p-2 bg-purple-600 rounded-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="ml-3 text-xl font-semibold text-white">{lesson.title}</h3>
            </div>
            <p className="mb-4 text-gray-300">{lesson.description}</p>
            <div className="mb-4">
              <div className="w-full h-2 bg-gray-700 rounded-full">
                <div
                  className="h-2 transition-all duration-300 bg-purple-600 rounded-full"
                  style={{ width: `${calculateOverallProgress(lesson.id)}%` }}
                />
              </div>
              <p className="mt-1 text-sm text-gray-400">
                {calculateOverallProgress(lesson.id)}% Complete
              </p>
            </div>
            <Link
              to={`/lesson/${lesson.id}`}
              className="inline-flex items-center text-purple-400 hover:text-purple-300"
            >
              {progress[lesson.id] ? 'Review Lesson' : 'Start Lesson'}
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-6 mt-8 bg-white/10 backdrop-blur-lg rounded-xl"
      >
        <h2 className="mb-4 text-2xl font-bold text-white">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Link
            to="/editor"
            className="flex items-center p-4 transition-colors rounded-lg bg-purple-600/20 hover:bg-purple-600/30"
          >
            <Code className="w-6 h-6 text-purple-400" />
            <span className="ml-3 text-white">Open Code Editor</span>
          </Link>
          <Link
            to="/progress"
            className="flex items-center p-4 transition-colors rounded-lg bg-purple-600/20 hover:bg-purple-600/30"
          >
            <Trophy className="w-6 h-6 text-purple-400" />
            <span className="ml-3 text-white">View Progress</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
