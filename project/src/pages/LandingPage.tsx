import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Code2, GraduationCap, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <main className="relative">
        {/* Hero Section */}
        <div className="relative px-6 lg:px-8">
          <div className="mx-auto max-w-7xl py-20 sm:py-32 lg:py-40">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                The Future of AI/ML Education
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Join our 1-week intensive bootcamp and dive into the fascinating world of 
                Artificial Intelligence and Machine Learning. Perfect for high school and 
                middle school students.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  to="/register"
                  className="rounded-md bg-purple-600 px-8 py-3 text-lg font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                >
                  Get Started
                </Link>
                <Link
                  to="/about"
                  className="text-lg font-semibold leading-6 text-white hover:text-purple-400"
                >
                  Learn more <span aria-hidden="true">→</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-purple-400">
                Why Choose A.I.M.L?
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Everything you need to master AI/ML
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                {[
                  {
                    name: 'Interactive Learning',
                    description: 'Learn by doing with our interactive coding environment and real-time feedback system.',
                    icon: Code2,
                  },
                  {
                    name: 'Expert Guidance',
                    description: 'Get mentored by industry professionals and experienced educators in AI/ML.',
                    icon: GraduationCap,
                  },
                  {
                    name: 'Cutting-edge Curriculum',
                    description: 'Stay ahead with our constantly updated curriculum covering the latest in AI/ML.',
                    icon: Brain,
                  },
                ].map((feature) => (
                  <motion.div 
                    key={feature.name}
                    className="flex flex-col"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <dt className="text-base font-semibold leading-7 text-white">
                      <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600">
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </div>
                      {feature.name}
                    </dt>
                    <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-300">
                      <p className="flex-auto">{feature.description}</p>
                    </dd>
                  </motion.div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;