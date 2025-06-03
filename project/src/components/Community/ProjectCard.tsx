import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ThumbsUp, MessageSquare } from 'lucide-react';
import Card, { CardContent } from '../ui/Card';
import { Project, User } from '../../types';

interface ProjectCardProps {
  project: Project;
  user?: User;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, user }) => {
  const navigate = useNavigate();
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  const handleClick = () => {
    navigate(`/community/projects/${project.id}`);
  };
  
  // Simulate some fake metrics
  const likes = Math.floor(Math.random() * 50) + 1;
  const comments = Math.floor(Math.random() * 10);
  
  return (
    <Card className="h-full" hoverEffect onClick={handleClick}>
      <CardContent>
        <div className="flex items-center mb-4">
          <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-medium">
            {user?.full_name?.charAt(0) || 'U'}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{user?.full_name || 'Anonymous User'}</p>
            <div className="flex items-center text-xs text-gray-500">
              <Calendar size={14} className="mr-1" />
              <span>{formatDate(project.created_at)}</span>
            </div>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold mb-2 text-gray-900">{project.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description}</p>
        
        <div className="flex items-center justify-between text-gray-500 text-sm">
          <div className="flex space-x-4">
            <div className="flex items-center">
              <ThumbsUp size={16} className="mr-1" />
              <span>{likes}</span>
            </div>
            <div className="flex items-center">
              <MessageSquare size={16} className="mr-1" />
              <span>{comments}</span>
            </div>
          </div>
          
          <div className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs font-medium">
            Project
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;