import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Layout from '../components/layout/Layout';
import { FaHistory, FaBookmark, FaUserCircle, FaCog, FaSignOutAlt } from 'react-icons/fa';

const Dashboard = () => {
  const { user, logout } = useAppContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const savedSearches = user.history || [];

  return (
    <Layout>
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl shadow-gray-50 flex flex-col items-center text-center space-y-4">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
              <FaUserCircle size={48} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>

          <nav className="bg-white p-4 rounded-3xl border border-gray-100 shadow-xl shadow-gray-50 space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-2xl font-bold text-sm">
              <FaBookmark /> My Saved Searches
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-2xl font-medium text-sm transition-colors">
              <FaHistory /> Profile History
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-2xl font-medium text-sm transition-colors">
              <FaCog /> Settings
            </button>
            <button 
              onClick={() => {
                logout();
                navigate('/');
              }} 
              className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-2xl font-medium text-sm transition-colors"
            >
              <FaSignOutAlt /> Logout
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-50">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Saved Searches</h2>
              <button className="text-blue-600 text-sm font-bold hover:underline">View All</button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {savedSearches.length > 0 ? savedSearches.map((search, i) => (
                <div 
                  key={i} 
                  onClick={() => navigate('/results', { state: { result: search.result } })}
                  className="p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-200 transition-colors cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-blue-600 border border-blue-50">
                      {search.preferredCountry || 'Global'}
                    </span>
                    <span className="text-xs text-gray-400">{search.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {search.preferredJobRole || 'Any Role'}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">Profile Analysis Result</p>
                </div>
              )) : (
                <div className="col-span-2 text-center text-gray-500 py-8 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                  No saved searches yet. Analyze your profile to get started!
                </div>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-10 rounded-[2.5rem] text-white space-y-6 relative overflow-hidden">
            <h2 className="text-2xl font-bold relative z-10">Complete Your Global Profile</h2>
            <p className="text-gray-400 max-w-md relative z-10">
              Adding your language proficiency scores will increase your eligibility accuracy by up to 25%.
            </p>
            <button className="px-8 py-3 bg-white text-gray-900 font-bold rounded-2xl hover:bg-gray-100 transition-all relative z-10">
              Update Profile
            </button>
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
