import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Circle, Lock } from 'lucide-react';
import { Lesson, Progress } from '../../types';

interface LessonListProps {
  lessons: Lesson[];
  courseId: string;
  userProgress?: Progress[];
  currentLessonId?: string;
}

const LessonList: React.FC<LessonListProps> = ({
  lessons,
  courseId,
  userProgress = [],
  currentLessonId,
}) => {
  const navigate = useNavigate();
  
  const isLessonCompleted = (lessonId: string) => {
    return userProgress.some(
      (progress) => progress.lesson_id === lessonId && progress.completed
    );
  };
  
  const isLessonUnlocked = (index: number) => {
    if (index === 0) return true; // First lesson is always unlocked
    
    // A lesson is unlocked if the previous lesson is completed
    const previousLessonId = lessons[index - 1]?.id;
    return isLessonCompleted(previousLessonId);
  };
  
  const handleLessonClick = (lesson: Lesson, index: number) => {
    if (isLessonUnlocked(index)) {
      navigate(`/courses/${courseId}/lessons/${lesson.id}`);
    }
  };
  
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-gray-50 py-3 px-4 border-b border-gray-200">
        <h3 className="text-base font-medium text-gray-900">Course Lessons</h3>
      </div>
      
      <ul className="divide-y divide-gray-200">
        {lessons.map((lesson, index) => {
          const isCompleted = isLessonCompleted(lesson.id);
          const isUnlocked = isLessonUnlocked(index);
          const isCurrent = lesson.id === currentLessonId;
          
          return (
            <li
              key={lesson.id}
              className={`
                px-4 py-3 flex items-center
                ${isUnlocked ? 'cursor-pointer hover:bg-gray-50' : 'opacity-70 cursor-not-allowed'}
                ${isCurrent ? 'bg-primary-50' : ''}
              `}
              onClick={() => handleLessonClick(lesson, index)}
            >
              <div className="mr-3 text-lg">
                {isCompleted ? (
                  <CheckCircle className="text-success-500" size={20} />
                ) : isUnlocked ? (
                  <Circle className={isCurrent ? 'text-primary-500' : 'text-gray-400'} size={20} />
                ) : (
                  <Lock className="text-gray-400" size={20} />
                )}
              </div>
              
              <div className="flex-1">
                <h4 className={`text-sm font-medium ${isCurrent ? 'text-primary-700' : 'text-gray-900'}`}>
                  {index + 1}. {lesson.title}
                </h4>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LessonList;