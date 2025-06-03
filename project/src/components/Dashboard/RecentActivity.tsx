import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, CheckCircle, Code } from 'lucide-react';
import Card, { CardContent, CardHeader } from '../ui/Card';
import { Progress, Lesson, Course } from '../../types';

interface RecentActivityProps {
  progress: Progress[];
  lessons: Lesson[];
  courses: Course[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ progress, lessons, courses }) => {
  const navigate = useNavigate();
  
  // Sort progress by most recent updates
  const recentActivities = [...progress]
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 5);
  
  const getActivityDetails = (activity: Progress) => {
    const lesson = lessons.find(l => l.id === activity.lesson_id);
    if (!lesson) return null;
    
    const course = courses.find(c => c.id === lesson.course_id);
    if (!course) return null;
    
    return { lesson, course };
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };
  
  const handleActivityClick = (activity: Progress) => {
    const details = getActivityDetails(activity);
    if (details) {
      navigate(`/courses/${details.course.id}/lessons/${activity.lesson_id}`);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
      </CardHeader>
      <CardContent>
        {recentActivities.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {recentActivities.map((activity) => {
              const details = getActivityDetails(activity);
              if (!details) return null;
              
              return (
                <li 
                  key={activity.id} 
                  className="py-3 flex cursor-pointer hover:bg-gray-50"
                  onClick={() => handleActivityClick(activity)}
                >
                  <div className="mr-4">
                    {activity.completed ? (
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Code className="h-5 w-5 text-blue-600" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {details.lesson.title}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {details.course.title}
                    </p>
                  </div>
                  
                  <div className="text-sm text-gray-500 flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {formatDate(activity.updated_at)}
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-500">No recent activity yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;