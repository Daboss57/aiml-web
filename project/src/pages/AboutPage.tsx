import React from 'react';
import { Users, BookOpen, Award, MessageSquare, Mail } from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardContent } from '../components/ui/Card';
import storyImg from '../assets/images/story.png';
import noelImg from '../assets/images/noel.png';
import aryanImg from '../assets/images/aryan2.jpg';
import nishuImg from '../assets/images/nishu.jpg';

const AboutPage: React.FC = () => {
  const team = [
    {
      name: 'Noel Bobby',
      role: 'Co-Founder & CTO',
      bio: 'Senior at Kimball High School, majoring in Biomedical Engineering with a passion for AI and robotics.',
      image: noelImg,
    },
    {
      name: 'Aryan Mishra',
      role: 'Co-Founder & Marketing Director',
      bio: 'Senior at Kimball High School, aspiring to major in Computer Science with a passion for AI and creative technology',
      image: aryanImg,
    },
    
  ];
  
  const values = [
    {
      icon: <BookOpen className="w-8 h-8 text-primary-600" />,
      title: 'Peer-Driven Learning',
      description: 'Lessons designed by fellow high schoolers, with relatable examples and bite-sized explanations.',
    },
    {
      icon: <Users className="w-8 h-8 text-primary-600" />,
      title: 'Hands-On Practice',
      description: 'Interactive code exercises and mini-projects help you apply concepts and build confidence.',
    },
    {
      icon: <Award className="w-8 h-8 text-primary-600" />,
      title: 'Community Support',
      description: 'Join a friendly online community to ask questions, share ideas, and tackle challenges together.',
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-primary-600" />,
      title: 'Student-First Updates',
      description: 'We iterate based on fellow learners’ feedback so the curriculum stays fresh and relevant.',
    },
  ];
  
  return (
    <div className="px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">About NexusAI</h1>
        <p className="max-w-3xl mx-auto text-xl text-gray-600">
          We're on a mission to make AI education accessible, engaging, and empowering for high school students around the world.
        </p>
      </div>
      
      {/* Our Story */}
      <div className="mb-20">
        <div className="grid items-center grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Our Story</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                NexusAI was created by two passionate high schoolers who believe AI and machine learning should be accessible to everyone.
                As first-timers ourselves, we know how overwhelming the field can feel.
                That’s why we built step-by-step lessons, interactive code exercises, and a supportive community to help peers break into AI with confidence.
              </p>
              <p>
                We noticed that while AI was rapidly transforming our world, high school students had few opportunities to learn about this technology in an accessible and engaging way.
              </p>
              <p>
                Our platform was built from the ground up with high school students in mind. We've created a learning environment that combines rigorous content with interactive exercises, making complex AI concepts understandable and exciting.
              </p>
            </div>
          </div>
          <div>
            <img 
              src={storyImg}
              loading="lazy"
              alt="Team collaboration" 
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
      
      {/* Our Values */}
      <div className="mb-20">
        <h2 className="mb-10 text-3xl font-bold text-center text-gray-900">Our Values</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <Card key={index} className="h-full">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100">
                  {value.icon}
                </div>
                <h3 className="mb-3 text-xl font-semibold text-gray-900">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Our Team */}
      <div className="mb-20">
        <h2 className="mb-10 text-3xl font-bold text-center text-gray-900">Meet Our Team</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <Card key={index} className="h-full">
              <img 
                src={member.image}
                loading="lazy"
                alt={member.name} 
                className="object-cover object-center w-full h-64"
              />
              <CardContent className="p-6">
                <h3 className="mb-1 text-xl font-semibold text-gray-900">{member.name}</h3>
                <p className="mb-3 text-primary-600">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Join Us CTA */}
      <div className="p-8 text-center text-white bg-primary-600 rounded-2xl md:p-12">
        <h2 className="mb-4 text-3xl font-bold">Join Our Mission</h2>
        <p className="max-w-3xl mx-auto mb-8 text-xl">
          Whether you're a student eager to learn, a teacher looking for resources, or a professional wanting to contribute, we'd love to have you join our community.
        </p>
        <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <Button 
            variant="accent"
            size="lg"
            onClick={() => window.open('https://forms.gle/GE8BfVh3RP9fSLvd9', '_blank')}
          >
            Join NexusAI
          </Button>
          <Button 
            variant="outline"
            size="lg"
            icon={<Mail size={18} />}
            className="text-white bg-transparent border-white hover:bg-white hover:text-primary-700"
            onClick={() => window.open('https://forms.gle/amfXX2L841YbVUMB7', '_blank')}
          >
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;