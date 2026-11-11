import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Layout from '../components/layout/Layout';
import { FaUser, FaGraduationCap, FaBriefcase, FaGlobe, FaWallet } from 'react-icons/fa';
import { analyzeProfile } from '../services/api';

const ProfileInput = () => {
  const { formData, updateFormData, setLoading, saveSearchToHistory } = useAppContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const apiData = {
        age: formData.age,
        qualification: formData.qualification,
        experience: formData.experience,
        country: formData.preferredCountry,
        jobRole: formData.preferredJobRole,
        budget: formData.budget
      };

      const result = await analyzeProfile(apiData);
      saveSearchToHistory({ ...formData, result });
      setLoading(false);
      navigate('/results', { state: { result } });
    } catch (error) {
      console.error('Submission failed:', error);
      setLoading(false);
      alert('Failed to analyze profile. Please try again.');
    }
  };

  const inputClasses = "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all";
  const labelClasses = "block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2";

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Analyze Your Profile</h1>
          <p className="text-gray-600">Enter your details below to get personalized global career insights.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-2xl shadow-gray-100 space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Personal Info */}
            <div className="space-y-4">
              <label className={labelClasses}>
                <FaUser className="text-blue-500" /> Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={inputClasses}
                required
              />
            </div>
            <div className="space-y-4">
              <label className={labelClasses}>
                Age
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="25"
                className={inputClasses}
                required
              />
            </div>

            {/* Education */}
            <div className="space-y-4">
              <label className={labelClasses}>
                <FaGraduationCap className="text-blue-500" /> Highest Qualification
              </label>
              <select
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                className={inputClasses}
                required
              >
                <option value="">Select Qualification</option>
                <option value="Bachelors">Bachelor's Degree</option>
                <option value="Masters">Master's Degree</option>
                <option value="PhD">PhD</option>
                <option value="Diploma">Diploma</option>
              </select>
            </div>
            <div className="space-y-4">
              <label className={labelClasses}>
                Field of Study
              </label>
              <input
                type="text"
                name="fieldOfStudy"
                value={formData.fieldOfStudy}
                onChange={handleChange}
                placeholder="Computer Science"
                className={inputClasses}
                required
              />
            </div>

            {/* Experience */}
            <div className="space-y-4">
              <label className={labelClasses}>
                <FaBriefcase className="text-blue-500" /> Years of Experience
              </label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="3"
                className={inputClasses}
                required
              />
            </div>
            <div className="space-y-4">
              <label className={labelClasses}>
                Preferred Job Role
              </label>
              <input
                type="text"
                name="preferredJobRole"
                value={formData.preferredJobRole}
                onChange={handleChange}
                placeholder="Software Engineer"
                className={inputClasses}
                required
              />
            </div>

            {/* Preferences */}
            <div className="space-y-4">
              <label className={labelClasses}>
                <FaGlobe className="text-blue-500" /> Preferred Country
              </label>
              <select
                name="preferredCountry"
                value={formData.preferredCountry}
                onChange={handleChange}
                className={inputClasses}
                required
              >
                <option value="">Select Country</option>
                <option value="Germany">Germany</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
              </select>
            </div>
            <div className="space-y-4">
              <label className={labelClasses}>
                <FaWallet className="text-blue-500" /> Budget (INR)
              </label>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="10,00,000"
                className={inputClasses}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-2 text-lg active:scale-[0.98]"
          >
            Analyze My Profile
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ProfileInput;
