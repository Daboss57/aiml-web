// src/components/Lesson.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../supabase'; // Import the singleton client
import { useAuth } from '../contexts/AuthContext';
import ReactMarkdown from 'react-markdown';
import CodeEditor from '../components/CodeEditor';
import { CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  content: string;
  description: string;
  order: number;
}

const LessonPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [nextLesson, setNextLesson] = useState<Lesson | null>(null);
  const [prevLesson, setPrevLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    // If not authenticated, redirect to login
    if (!user) {
      navigate('/login', { replace: true });
      return;
    }

    const fetchLessonAndProgress = async () => {
      try {
        setLoading(true);
        
        // Fetch current lesson
        const { data: lessonData, error: lessonError } = await supabase
          .from('lessons')
          .select('*')
          .eq('id', id)
          .single();

        if (lessonError) {
          console.error('Error fetching lesson:', lessonError);
          return;
        }

        if (!lessonData) {
          console.error('Lesson not found');
          return;
        }

        // Fetch next and previous lessons
        const { data: adjacentLessons, error: adjacentError } = await supabase
          .from('lessons')
          .select('*')
          .or(`order.eq.${lessonData.order - 1},order.eq.${lessonData.order + 1}`)
          .order('order');

        if (adjacentError) {
          console.error('Error fetching adjacent lessons:', adjacentError);
        } else {
          setPrevLesson(adjacentLessons.find((l: Lesson) => l.order < lessonData.order) || null);
          setNextLesson(adjacentLessons.find((l: Lesson) => l.order > lessonData.order) || null);
        }

        // Fetch user progress
        const { data: progressData, error: progressError } = await supabase
          .from('user_progress')
          .select('completed')
          .eq('lesson_id', id)
          .eq('user_id', user.id)
          .single();

        if (!progressError && progressData) {
          setCompleted(progressData.completed);
        }

        setLesson(lessonData);
      } catch (error) {
        console.error('Error in fetchLessonAndProgress:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLessonAndProgress();
  }, [id, user, navigate]);

  const handleComplete = async () => {
    if (!user || !id) return;

    try {
      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          lesson_id: id,
          completed: true
        }, {
          onConflict: 'user_id,lesson_id'
        });

      if (error) throw error;
      setCompleted(true);
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  if (!user) {
    return null; // Will redirect to login
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-t-2 border-b-2 border-purple-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-white">Lesson not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="px-4 py-8 mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">{lesson.title}</h1>
          <div className="flex items-center space-x-4">
            {prevLesson && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(`/lesson/${prevLesson.id}`)}
                className="flex items-center px-4 py-2 space-x-2 text-white rounded-md bg-purple-600/20"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </motion.button>
            )}
            {!completed && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleComplete}
                className="flex items-center px-4 py-2 space-x-2 text-white bg-green-600 rounded-md"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Mark Complete</span>
              </motion.button>
            )}
            {nextLesson && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(`/lesson/${nextLesson.id}`)}
                className="flex items-center px-4 py-2 space-x-2 text-white bg-purple-600 rounded-md"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            )}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-invert max-w-none"
        >
          <ReactMarkdown>{lesson.content}</ReactMarkdown>
        </motion.div>
        
        <div className="mt-8">
          <CodeEditor />
        </div>
      </div>
    </div>
  );
};

export default LessonPage;
