import React from 'react';
import Navbar from './Navbar';
import { motion } from 'framer-motion';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </div>
      </main>
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
              <span className="font-black text-gray-900 tracking-tight">TALENT <span className="text-blue-600">ROUTE</span></span>
            </div>
            <div className="text-gray-400 text-sm font-medium">
              &copy; {new Date().getFullYear()} Talent Route. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-sm font-bold text-gray-600">
              <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
