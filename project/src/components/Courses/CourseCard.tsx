import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Users, BarChart2 } from 'lucide-react';
import Card, { CardContent } from '../ui/Card';
import Badge from '../ui/Badge';
import { Course } from '../../types';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const navigate = useNavigate();
  
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
  
  const handleClick = () => {
    navigate(`/courses/${course.id}`);
  };
  
  return (
    <Card className="h-full" hoverEffect onClick={handleClick}>
      <div className="relative">
        <img
          src={course.image_url || 'https://images.pexels.com/photos/5926382/pexels-photo-5926382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
          alt={course.title}
          loading="lazy"
          decoding="async"
          width={400}
          height={225}
          className="w-full h-40 object-cover transition-filter duration-200 blur-sm"
          onLoad={e => e.currentTarget.classList.remove('blur-sm')}
        />
        <Badge 
          variant={getLevelBadgeVariant(course.level)}
          className="absolute top-3 right-3"
        >
          {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
        </Badge>
      </div>
      
      <CardContent>
        <h3 className="text-lg font-semibold mb-2 text-gray-900">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
        
        <div className="flex items-center text-gray-500 text-sm space-x-4">
          <div className="flex items-center">
            <Clock size={16} className="mr-1" />
            <span>{course.duration} min</span>
          </div>
          
          <div className="flex items-center">
            <Users size={16} className="mr-1" />
            <span>150+ enrolled</span>
          </div>
          
          <div className="flex items-center">
            <BarChart2 size={16} className="mr-1" />
            <span>4.8/5</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;