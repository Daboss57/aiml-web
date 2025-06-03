import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, BarChart2, Users, BookOpen, ArrowLeft } from 'lucide-react';
import { useCourseStore } from '../../store/courseStore';
import { useAuthStore } from '../../store/authStore';
import LessonList from '../../components/Courses/LessonList';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { 
    currentCourse, 
    lessons, 
    userProgress,
    isLoading, 
    error,
    fetchCourseById,
    fetchLessonsByCourse,
    fetchUserProgress
  } = useCourseStore();
  
  useEffect(() => {
    if (courseId) {
      fetchCourseById(courseId);
      fetchLessonsByCourse(courseId);
      
      if (user) {
        fetchUserProgress(user.id);
      }
    }
  }, [courseId, fetchCourseById, fetchLessonsByCourse, fetchUserProgress, user]);
  
  const handleStartCourse = () => {
    if (lessons.length > 0) {
      navigate(`/courses/${courseId}/lessons/${lessons[0].id}`);
    }
  };
  
  const getLevelBadgeVariant = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'success';
      case 'intermediate':
        return 'warning';
      case 'advanced':
        return 'error';
      default:
        return 'neutral';
    }
  };
  
  const completedLessonsCount = userProgress?.filter(
    (progress) => progress.completed && lessons.some(lesson => lesson.id === progress.lesson_id)
  ).length || 0;
  
  return (
    <div className="px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <Button
        variant="ghost"
        size="sm"
        className="inline-flex items-center mb-6"
        onClick={() => navigate('/courses')}
      >
        <ArrowLeft size={16} className="mr-1" />
        Back to Courses
      </Button>
      
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-primary-600"></div>
        </div>
      ) : error ? (
        <div className="py-12 text-center rounded-lg bg-red-50">
          <div className="mb-2 text-red-500">Error loading course</div>
          <Button 
            variant="primary" 
            onClick={() => courseId && fetchCourseById(courseId)}
          >
            Try Again
          </Button>
        </div>
      ) : currentCourse ? (
        <div>
          <div className="mb-10 overflow-hidden bg-white rounded-lg shadow-sm">
            <div className="relative">
              <img
                src={currentCourse.image_url}
                alt={currentCourse.title}
                loading="lazy"
                decoding="async"
                width={1200}
                height={400}
                className="object-cover w-full h-64 duration-200 transition-filter blur-sm"
                onLoad={e => e.currentTarget.classList.remove('blur-sm')}
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent">
                <div className="p-6 text-white">
                  <Badge variant={getLevelBadgeVariant(currentCourse.level)} className="mb-3">
                    {currentCourse.level.charAt(0).toUpperCase() + currentCourse.level.slice(1)}
                  </Badge>
                  <h1 className="text-3xl font-bold">{currentCourse.title}</h1>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  <span>{currentCourse.duration} min</span>
                </div>
                <div className="flex items-center">
                  <BookOpen size={16} className="mr-1" />
                  <span>{lessons.length} lessons</span>
                </div>
                <div className="flex items-center">
                  <Users size={16} className="mr-1" />
                  <span>150+ enrolled</span>
                </div>
                <div className="flex items-center">
                  <BarChart2 size={16} className="mr-1" />
                  <span>4.8/5 rating</span>
                </div>
              </div>
              
              <h2 className="mb-4 text-xl font-semibold">About this course</h2>
              <p className="mb-6 text-gray-700">{currentCourse.description}</p>
              
              <div className="flex items-center justify-between">
                <div>
                  {completedLessonsCount > 0 && (
                    <div className="text-sm text-gray-500">
                      You've completed {completedLessonsCount} of {lessons.length} lessons
                    </div>
                  )}
                </div>
                
                <Button
                  variant="primary"
                  onClick={handleStartCourse}
                  disabled={lessons.length === 0}
                >
                  {completedLessonsCount > 0 ? 'Continue Learning' : 'Start Learning'}
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="mb-4 text-xl font-semibold">What You'll Learn</h2>
              <div className="p-6 mb-8 bg-white rounded-lg shadow-sm">
                <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <li className="flex items-start">
                    <div className="flex items-center justify-center flex-shrink-0 w-5 h-5 rounded-full bg-primary-100">
                      <div className="w-2 h-2 rounded-full bg-primary-600"></div>
                    </div>
                    <span className="ml-2 text-gray-700">Understand core AI principles</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex items-center justify-center flex-shrink-0 w-5 h-5 rounded-full bg-primary-100">
                      <div className="w-2 h-2 rounded-full bg-primary-600"></div>
                    </div>
                    <span className="ml-2 text-gray-700">Build your first machine learning model</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex items-center justify-center flex-shrink-0 w-5 h-5 rounded-full bg-primary-100">
                      <div className="w-2 h-2 rounded-full bg-primary-600"></div>
                    </div>
                    <span className="ml-2 text-gray-700">Apply AI to real-world problems</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex items-center justify-center flex-shrink-0 w-5 h-5 rounded-full bg-primary-100">
                      <div className="w-2 h-2 rounded-full bg-primary-600"></div>
                    </div>
                    <span className="ml-2 text-gray-700">Master essential programming skills</span>
                  </li>
                </ul>
              </div>
              
              <h2 className="mb-4 text-xl font-semibold">Course Description</h2>
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <p className="mb-4 text-gray-700">
                  This comprehensive course is designed specifically for high school students with little to no prior experience in AI or programming. 
                  We'll start with the fundamentals and gradually introduce more advanced concepts.
                </p>
                <p className="mb-4 text-gray-700">
                  Throughout the course, you'll work on hands-on projects that reinforce your learning. 
                  By the end, you'll have a solid foundation in AI principles and be able to build your own intelligent applications.
                </p>
                <p className="text-gray-700">
                  This course combines theory with practice, making learning both fun and effective. 
                  Join us on this exciting journey into the world of artificial intelligence!
                </p>
              </div>
            </div>
            
            <div>
              <h2 className="mb-4 text-xl font-semibold">Course Content</h2>
              <LessonList 
                lessons={lessons} 
                courseId={courseId || ''}
                userProgress={userProgress}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-12 text-center">
          <h2 className="mb-2 text-xl font-semibold">Course not found</h2>
          <p className="mb-4 text-gray-600">The course you're looking for doesn't exist or has been removed.</p>
          <Button variant="primary" onClick={() => navigate('/courses')}>
            Browse Courses
          </Button>
        </div>
      )}
    </div>
  );
};

export default CourseDetailPage;