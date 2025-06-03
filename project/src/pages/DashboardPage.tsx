import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, Award, Code, Activity } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useCourseStore } from '../store/courseStore';
import ProgressStats from '../components/Dashboard/ProgressStats';
import RecentActivity from '../components/Dashboard/RecentActivity';
import Card, { CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';

const DashboardPage: React.FC = () => {
  const { user } = useAuthStore();
  const { 
    courses, 
    lessons, 
    userProgress, 
    fetchCourses, 
    fetchLessonsByCourse,
    fetchUserProgress,
  } = useCourseStore();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  // Dummy data for initial rendering
  const stats = [
    { label: 'Courses', value: '3', icon: <BookOpen className="w-6 h-6 text-primary-600" /> },
    { label: 'Lessons Completed', value: userProgress?.filter(p => p.completed).length || '0', icon: <Award className="w-6 h-6 text-accent-500" /> },
    { label: 'Community Projects', value: '15', icon: <Users className="w-6 h-6 text-secondary-500" /> },
    { label: 'Practice Exercises', value: '28', icon: <Code className="w-6 h-6 text-green-600" /> },
  ];
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    const loadData = async () => {
      setIsLoading(true);
      try {
        await fetchCourses();
        
        // Load lessons for each course
        const coursesData = await fetchCourses();
        if (coursesData && coursesData.length > 0) {
          await Promise.all(coursesData.map(course => fetchLessonsByCourse(course.id)));
        }
        
        if (user) {
          await fetchUserProgress(user.id);
        }
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [user, navigate, fetchCourses, fetchLessonsByCourse, fetchUserProgress]);
  
  // Calculate total lessons
  const totalLessons = lessons.length;
  
  return (
    <div className="px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="pb-5 mb-5 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">
          Track your progress and continue your learning journey
        </p>
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-primary-600"></div>
        </div>
      ) : (
        <>
          {/* Stats Overview */}
          <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {stat.icon}
                    </div>
                    <div className="ml-5">
                      <p className="text-sm font-medium text-gray-500 truncate">
                        {stat.label}
                      </p>
                      <p className="mt-1 text-3xl font-semibold text-gray-900">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Continue Learning */}
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Continue Learning</h2>
          <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Your Courses</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/courses')}
                    >
                      View all
                    </Button>
                  </div>
                  
                  {courses.length > 0 ? (
                    <div className="space-y-4">
                      {courses.slice(0, 3).map((course) => (
                        <div 
                          key={course.id}
                          className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                          onClick={() => navigate(`/courses/${course.id}`)}
                        >
                          <div className="flex-shrink-0">
                            <img 
                              src={course.image_url || "https://images.pexels.com/photos/5483071/pexels-photo-5483071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} 
                              alt={course.title}
                              className="object-cover w-16 h-16 rounded"
                            />
                          </div>
                          <div className="flex-1 ml-4">
                            <h4 className="text-base font-medium text-gray-900">{course.title}</h4>
                            <p className="text-sm text-gray-500 line-clamp-1">{course.description}</p>
                          </div>
                          <div className="ml-4">
                            <div className="bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                              {course.level}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center">
                      <Activity className="w-12 h-12 mx-auto text-gray-400" />
                      <h3 className="mt-2 text-base font-medium text-gray-900">No courses yet</h3>
                      <p className="mt-1 text-sm text-gray-500">Get started by exploring our courses</p>
                      <div className="mt-6">
                        <Button
                          variant="primary"
                          onClick={() => navigate('/courses')}
                        >
                          Browse Courses
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div>
              <ProgressStats 
                progress={userProgress} 
                totalLessons={totalLessons} 
              />
            </div>
          </div>
          
          {/* Recent Activity */}
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Activity</h2>
          <RecentActivity 
            progress={userProgress}
            lessons={lessons}
            courses={courses}
          />
        </>
      )}
    </div>
  );
};

export default DashboardPage;