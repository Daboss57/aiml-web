import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { useCourseStore } from '../../store/courseStore';
import { useAuthStore } from '../../store/authStore';
import LessonList from '../../components/Courses/LessonList';
import Button from '../../components/ui/Button';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';


const LessonPage: React.FC = () => {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { 
    currentCourse, 
    currentLesson, 
    lessons,
    userProgress,
    isLoading,
    error,
    fetchCourseById,
    fetchLessonById,
    fetchLessonsByCourse,
    fetchUserProgress,
    markLessonComplete
  } = useCourseStore();

  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (courseId && lessonId) {
      fetchCourseById(courseId);
      fetchLessonById(lessonId);
      fetchLessonsByCourse(courseId);
      if (user) fetchUserProgress(user.id);
    }
  }, [courseId, lessonId, fetchCourseById, fetchLessonById, fetchLessonsByCourse, fetchUserProgress, user]);

  useEffect(() => {
    if (userProgress && lessonId) {
      const progress = userProgress.find(p => p.lesson_id === lessonId);
      setIsCompleted(progress?.completed || false);
    }
  }, [userProgress, lessonId]);

  const handleCompleteLesson = async () => {
    if (user && lessonId) {
      try {
        await markLessonComplete(user.id, lessonId, ''); // no code submission
        setIsCompleted(true);

        const currentIndex = lessons.findIndex(l => l.id === lessonId);
        if (currentIndex < lessons.length - 1) {
          const nextLesson = lessons[currentIndex + 1];
          navigate(`/courses/${courseId}/lessons/${nextLesson.id}`);
        }
      } catch (error) {
        console.error('Error marking lesson as complete:', error);
      }
    }
  };

  const getCurrentLessonIndex = () => {
    return lessons.findIndex(lesson => lesson.id === lessonId);
  };

  const isFirstLesson = getCurrentLessonIndex() === 0;
  const isLastLesson = getCurrentLessonIndex() === lessons.length - 1;

  return (
    <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar */}
        <div className="w-full lg:w-1/4">
          <div className="sticky top-20">
            <Button
              variant="ghost"
              size="sm"
              className="inline-flex items-center mb-4"
              onClick={() => navigate(`/courses/${courseId}`)}
            >
              <ArrowLeft size={16} className="mr-1" />
              Back to Course
            </Button>
            <LessonList
              lessons={lessons}
              courseId={courseId || ''}
              userProgress={userProgress}
              currentLessonId={lessonId}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-3/4">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-primary-600"></div>
            </div>
          ) : error ? (
            <div className="py-12 text-center rounded-lg bg-red-50">
              <div className="mb-2 text-red-500">Error loading lesson</div>
              <Button 
                variant="primary" 
                onClick={() => lessonId && fetchLessonById(lessonId)}
              >
                Try Again
              </Button>
            </div>
          ) : currentLesson ? (
            <div>
              <div className="mb-6 overflow-hidden bg-white rounded-lg shadow-sm">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold">{currentLesson.title}</h1>
                    {isCompleted && (
                      <div className="flex items-center text-green-600">
                        <CheckCircle size={18} className="mr-1" />
                        <span>Completed</span>
                      </div>
                    )}
                  </div>

                  <div className="prose max-w-none">
                    <p>{currentLesson.description}</p>
                    <ReactMarkdown 
                      children={currentLesson.content}
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                    />
                  </div>

                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={() => {
                    const i = getCurrentLessonIndex();
                    if (i > 0) navigate(`/courses/${courseId}/lessons/${lessons[i - 1].id}`);
                  }}
                  disabled={isFirstLesson}
                  icon={<ArrowLeft size={16} />}
                >
                  Previous Lesson
                </Button>

                {isCompleted ? (
                  <Button
                    variant="primary"
                    onClick={() => {
                      const i = getCurrentLessonIndex();
                      if (i < lessons.length - 1)
                        navigate(`/courses/${courseId}/lessons/${lessons[i + 1].id}`);
                    }}
                    disabled={isLastLesson}
                    icon={<ArrowRight size={16} className="ml-1" />}
                    iconPosition="right"
                  >
                    {isLastLesson ? 'Finish Course' : 'Next Lesson'}
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    onClick={handleCompleteLesson}
                    icon={<CheckCircle size={16} className="ml-1" />}
                    iconPosition="right"
                  >
                    Complete & Continue
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="py-12 text-center">
              <h2 className="mb-2 text-xl font-semibold">Lesson not found</h2>
              <p className="mb-4 text-gray-600">The lesson you're looking for doesn't exist or has been removed.</p>
              <Button variant="primary" onClick={() => navigate(`/courses/${courseId}`)}>
                Back to Course
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonPage;
