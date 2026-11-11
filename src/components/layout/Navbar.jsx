import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaRoute } from 'react-icons/fa';

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore', path: '/profile' },
    { name: 'Compare', path: '/compare' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div 
            whileHover={{ rotate: 5, scale: 1.05 }}
            className="w-12 h-12 relative"
          >
            <img 
              src="/logo.png" 
              alt="Talent Route Logo" 
              className="w-full h-full object-contain rounded-xl shadow-lg shadow-blue-100 group-hover:shadow-blue-200 transition-shadow"
            />
          </motion.div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-gray-900 leading-none">
              TALENT <span className="text-blue-600">ROUTE</span>
            </span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
              Navigate Your Future
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                location.pathname === link.path ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/login"
            className="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition-all shadow-md shadow-blue-200 active:scale-95"
          >
            Login
          </Link>
        </div>

        {/* Mobile menu button could go here */}
      </div>
    </nav>
  );
};

export default Navbar;
