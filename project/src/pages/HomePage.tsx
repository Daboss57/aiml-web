import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, BookOpen, Code, Users, Shield, ChevronRight, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardContent } from '../components/ui/Card';
import heroImg from '../assets/images/hero.png';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: <BookOpen className="w-6 h-6 text-primary-600" />,
      title: 'Interactive AI/ML Lessons',
      description: 'Learn AI and machine learning concepts with interactive, hands-on lessons designed for high school students.',
    },
    {
      icon: <Code className="w-6 h-6 text-primary-600" />,
      title: 'Built-in Coding Environment',
      description: 'Practice coding directly in your browser with our integrated development environment.',
    },
    {
      icon: <Users className="w-6 h-6 text-primary-600" />,
      title: 'Community Projects',
      description: 'Share your projects and learn from others in our collaborative community platform.',
    },
    {
      icon: <Shield className="w-6 h-6 text-primary-600" />,
      title: 'Progress Tracking',
      description: 'Track your learning journey with badges, achievements, and personalized feedback.',
    },
  ];
  
  const courses = [
    {
      title: 'Introduction to AI Concepts',
      description: 'Learn the fundamental concepts behind artificial intelligence.',
      level: 'Beginner',
      image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      title: 'Machine Learning Fundamentals',
      description: 'Understand the core principles of machine learning algorithms.',
      level: 'Beginner',
      image: 'https://images.pexels.com/photos/8438923/pexels-photo-8438923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      title: 'Neural Networks & Deep Learning',
      description: 'Explore neural networks and deep learning architectures.',
      level: 'Intermediate',
      image: 'https://images.pexels.com/photos/5483071/pexels-photo-5483071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
  ];
  
  return (
    <div>
      {/* Hero Section */}
      <section className="text-white bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8 md:py-32">
          <div className="grid items-center grid-cols-1 gap-12 md:grid-cols-2">
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-4xl font-bold leading-tight md:text-5xl">
                The Future of AI Education for High School Students
              </h1>
              <p className="text-xl leading-relaxed text-gray-100">
                Interactive learning platform that makes AI and machine learning accessible, engaging, and fun for high school students. Build real projects and join a community of young AI enthusiasts.
              </p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <Button 
                  variant="accent"
                  size="lg"
                  onClick={() => navigate('/courses')}
                >
                  Explore Courses
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="text-white bg-transparent border-white hover:bg-white hover:text-primary-700"
                  onClick={() => navigate('/register')}
                >
                  Join for Free
                </Button>
              </div>
            </div>
            
            <div className="hidden md:block">
              <img 
                src={heroImg}
                loading="lazy"
                alt="Students learning AI" 
                className="rounded-lg shadow-xl animate-slide-up"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Why Choose NexusAI?
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Our platform is designed to make learning AI accessible and engaging
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card key={index} className="h-full transition-shadow duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center w-12 h-12 mb-5 rounded-lg bg-primary-100">
                    {feature.icon}
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Courses */}
      <section className="py-20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Courses</h2>
              <p className="mt-2 text-xl text-gray-600">Begin your AI journey with our expert-crafted courses</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate('/courses')}
              icon={<ChevronRight size={16} />}
            >
              View all courses
            </Button>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course, index) => (
              <Card key={index} className="h-full" hoverEffect onClick={() => navigate('/courses')}>
                <img
                  src={course.image}
                  alt={course.title}
                  className="object-cover w-full h-48"
                />
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">{course.title}</h3>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {course.level}
                    </span>
                  </div>
                  <p className="mb-4 text-gray-600">{course.description}</p>
                  <div className="flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary-600 hover:text-primary-700"
                      icon={<ArrowRight size={16} />}
                    >
                      Start Learning
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              What Students Say
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Hear from high school students who have transformed their understanding of AI
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center w-12 h-12 text-lg font-medium rounded-full bg-primary-100 text-primary-700">
                    M
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-semibold">Michael T.</p>
                    <p className="text-gray-500">High School Junior</p>
                  </div>
                </div>
                <p className="italic text-gray-600">
                  "NexusAI helped me understand complex AI concepts that seemed impossible before. The interactive lessons and coding environment made learning engaging and practical."
                </p>
              </CardContent>
            </Card>
            
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center w-12 h-12 text-lg font-medium rounded-full bg-secondary-100 text-secondary-700">
                    S
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-semibold">Sarah L.</p>
                    <p className="text-gray-500">High School Senior</p>
                  </div>
                </div>
                <p className="italic text-gray-600">
                  "I never thought I could build AI projects as a high school student. Thanks to NexusAI, I've completed several machine learning projects and even won my school's science fair!"
                </p>
              </CardContent>
            </Card>
            
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center w-12 h-12 text-lg font-medium rounded-full bg-accent-100 text-accent-700">
                    J
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-semibold">Jason K.</p>
                    <p className="text-gray-500">High School Sophomore</p>
                  </div>
                </div>
                <p className="italic text-gray-600">
                  "The community aspect of NexusAI is amazing. I've connected with other students interested in AI, collaborated on projects, and learned so much from sharing ideas."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 text-white bg-primary-600">
        <div className="max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
          <h2 className="mb-8 text-3xl font-bold">Ready to Start Your AI Journey?</h2>
          <p className="mb-8 text-xl text-gray-100">
            Join thousands of high school students who are learning AI and machine learning with NexusAI. No prior experience required.
          </p>
          <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Button 
              variant="accent"
              size="lg"
              onClick={() => navigate('/register')}
            >
              Create Free Account
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="text-white bg-transparent border-white hover:bg-white hover:text-primary-700"
              onClick={() => navigate('/courses')}
            >
              Browse Courses
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;