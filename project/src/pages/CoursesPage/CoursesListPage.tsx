import React, { useEffect, useState } from 'react';
import { Search, Filter, Book } from 'lucide-react';
import { useCourseStore } from '../../store/courseStore';
import CourseCard from '../../components/Courses/CourseCard';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const CoursesListPage: React.FC = () => {
  const { courses, fetchCourses, isLoading, error } = useCourseStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const toggleFilter = (filter: string) => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };
  
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = !activeFilter || course.level === activeFilter.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });
  
  return (
    <div className="px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="pb-5 mb-8 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900">Courses</h1>
        <p className="mt-2 text-sm text-gray-600">
          Explore our AI and machine learning courses designed for high school students
        </p>
      </div>
      
      <div className="flex flex-col justify-between mb-8 space-y-4 md:flex-row md:space-y-0">
        <div className="w-full md:w-2/3">
          <Input
            type="text"
            placeholder="Search courses..."
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
            variant={activeFilter === 'Beginner' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => toggleFilter('Beginner')}
          >
            Beginner
          </Button>
          <Button
            variant={activeFilter === 'Intermediate' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => toggleFilter('Intermediate')}
          >
            Intermediate
          </Button>
          <Button
            variant={activeFilter === 'Advanced' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => toggleFilter('Advanced')}
          >
            Advanced
          </Button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-primary-600"></div>
        </div>
      ) : error ? (
        <div className="py-12 text-center rounded-lg bg-red-50">
          <div className="mb-2 text-red-500">Error loading courses</div>
          <Button variant="primary" onClick={() => fetchCourses()}>
            Try Again
          </Button>
        </div>
      ) : filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center border-2 border-gray-300 border-dashed rounded-lg">
          <Book className="w-12 h-12 mx-auto text-gray-400" />
          <h3 className="mt-2 text-base font-medium text-gray-900">No courses found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || activeFilter
              ? 'Try adjusting your search or filters'
              : 'Courses will be added soon!'}
          </p>
        </div>
      )}
    </div>
  );
};

export default CoursesListPage;