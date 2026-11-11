import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaGlobeAmericas, FaChartLine, FaPassport, FaArrowRight } from 'react-icons/fa';
import Layout from '../components/layout/Layout';

const Home = () => {
  const features = [
    {
      icon: <FaChartLine className="text-blue-500" size={24} />,
      title: 'Job Insights',
      description: 'Get real-time data on job availability and average salaries for your role abroad.',
    },
    {
      icon: <FaGlobeAmericas className="text-cyan-500" size={24} />,
      title: 'Country Comparison',
      description: 'Compare cost of living, quality of life, and opportunities across multiple countries.',
    },
    {
      icon: <FaPassport className="text-indigo-500" size={24} />,
      title: 'Visa Guidance',
      description: 'Understand visa requirements, costs, and processing times for your preferred destination.',
    },
  ];

  return (
    <Layout>
      <div className="flex flex-col items-center text-center space-y-16">
        {/* Hero Section */}
        <div className="space-y-6 max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight"
          >
            Find Your Path to <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">Global Opportunities</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-600 leading-relaxed"
          >
            Smart career guidance platform helping you explore jobs and studies abroad based on your personal profile and budget.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 pt-4"
          >
            <Link
              to="/profile"
              className="px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center gap-2 group"
            >
              Get Started
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/compare"
              className="px-8 py-4 bg-white text-gray-700 font-bold rounded-2xl hover:bg-gray-50 transition-all border border-gray-200 shadow-sm"
            >
              Explore Countries
            </Link>
          </motion.div>
        </div>

        {/* Features Overview */}
        <div className="grid md:grid-cols-3 gap-8 w-full">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-50 text-left space-y-4 hover:border-blue-100 transition-colors"
            >
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[3rem] p-12 text-white relative overflow-hidden"
        >
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to take the next step?</h2>
            <p className="text-blue-50 max-w-xl mx-auto text-lg">
              Join thousands of professionals and students who have found their dream opportunities abroad with Talent Route.
            </p>
            <Link
              to="/login"
              className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-2xl hover:bg-blue-50 transition-all shadow-lg"
            >
              Create Free Account
            </Link>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400/20 rounded-full -ml-32 -mb-32 blur-3xl"></div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Home;
