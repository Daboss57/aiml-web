import React, { useEffect, useState } from 'react';
import { Search, Users, Code, Filter } from 'lucide-react';
import { useProjectStore } from '../store/projectStore';
import ProjectCard from '../components/Community/ProjectCard';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const CommunityPage: React.FC = () => {
  const { publicProjects, fetchPublicProjects, isLoading, error } = useProjectStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  useEffect(() => {
    fetchPublicProjects();
  }, [fetchPublicProjects]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const toggleFilter = (filter: string) => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };
  
  const filteredProjects = publicProjects.filter(project => {
    const matchesSearch = 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });
  
  return (
    <div className="px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="pb-5 mb-8 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900">Community Projects</h1>
        <p className="mt-2 text-sm text-gray-600">
          Explore projects created by other students and share your own
        </p>
      </div>
      
      <div className="flex flex-col justify-between mb-8 space-y-4 md:flex-row md:space-y-0">
        <div className="w-full md:w-2/3">
          <Input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={handleSearchChange}
            leftIcon={<Search size={18} />}
            fullWidth
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="flex items-center text-gray-700">
            <Filter size={18} className="mr-2" />
            Filter:
          </span>
          <Button
            variant={activeFilter === 'Latest' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => toggleFilter('Latest')}
          >
            Latest
          </Button>
          <Button
            variant={activeFilter === 'Popular' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => toggleFilter('Popular')}
          >
            Popular
          </Button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-primary-600"></div>
        </div>
      ) : error ? (
        <div className="py-12 text-center rounded-lg bg-red-50">
          <div className="mb-2 text-red-500">Error loading projects</div>
          <Button variant="primary" onClick={() => fetchPublicProjects()}>
            Try Again
          </Button>
        </div>
      ) : filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project}
              // In a real app, we'd fetch user info for each project
              user={project.profiles}
            />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center border-2 border-gray-300 border-dashed rounded-lg">
          <Users className="w-12 h-12 mx-auto text-gray-400" />
          <h3 className="mt-2 text-base font-medium text-gray-900">No projects found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || activeFilter
              ? 'Try adjusting your search or filters'
              : 'Be the first to share a project with the community!'}
          </p>
          <div className="mt-6">
            <Button
              variant="primary"
              icon={<Code size={16} className="mr-2" />}
              onClick={() => window.location.href = '/playground'}
            >
              Create a Project
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityPage;