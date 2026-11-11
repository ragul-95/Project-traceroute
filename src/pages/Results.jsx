import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Layout from '../components/layout/Layout';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { FaCheckCircle, FaBuilding, FaMoneyBillWave, FaPassport, FaHome } from 'react-icons/fa';

const Results = () => {
  const { formData, loading } = useAppContext();
  const location = useLocation();
  const result = location.state?.result;

  if (!result && !loading) {
    return <Navigate to="/profile" />;
  }

  // Use API data or fallback to mock
  const eligibilityScore = result?.score || 60;
  
  const data = [
    { name: 'Avg. Salary', amount: result?.salary ? parseInt(result.salary.replace(/[^0-9]/g, '')) : 65000, color: '#3b82f6' },
    { name: 'Cost of Living', amount: result?.cost ? parseInt(result.cost.replace(/[^0-9]/g, '')) : 1800, color: '#06b6d4' },
  ];

  if (loading) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xl font-medium text-gray-600">Analyzing your profile...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Analysis Results</h1>
            <p className="text-gray-500">Personalized insights for {formData.preferredCountry || 'your chosen destination'}.</p>
          </div>
          <div className="bg-white px-6 py-4 rounded-2xl border border-gray-100 shadow-lg flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Eligibility Score</p>
              <p className="text-2xl font-black text-blue-600">{eligibilityScore}%</p>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-blue-100 flex items-center justify-center relative">
               <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="transparent"
                  className="text-gray-100"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="transparent"
                  strokeDasharray="125.6"
                  strokeDashoffset={125.6 - (125.6 * eligibilityScore) / 100}
                  className="text-blue-600"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Insights Card */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-50 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <FaBuilding className="text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Job Insights</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-2">
                  <p className="text-sm font-medium text-gray-500">Demand Level</p>
                  <p className="text-2xl font-bold text-green-600">{result?.demandLevel || 'High'}</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-2">
                  <p className="text-sm font-medium text-gray-500">Active Openings</p>
                  <p className="text-2xl font-bold text-gray-900">{result?.activeOpenings || '6176+'}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-gray-700">Recommended Roles</h3>
                <div className="flex flex-wrap gap-2">
                  {(result?.roles || ['Senior backend developer', 'Lead backend developer', 'backend developer Consultant']).map(role => (
                    <span key={role} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Salary vs Cost of Living Chart */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-50 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-50 rounded-lg">
                  <FaMoneyBillWave className="text-cyan-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Salary vs. Cost of Living (Monthly)</h2>
              </div>
              
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                    <Tooltip 
                      cursor={{ fill: '#f9fafb' }}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="amount" radius={[8, 8, 0, 0]} barSize={60}>
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid md:grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <FaHome className="text-gray-400" />
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Estimated Savings</p>
                    <p className="text-lg font-bold text-gray-900">
                      {result?.currencySymbol || '€'} {Math.round(data[0].amount / 12) - data[1].amount} / mo
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <FaPassport className="text-gray-400" />
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Visa Category</p>
                    <p className="text-lg font-bold text-gray-900">{result?.visaCategory || 'Skilled Worker / Blue Card'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-8">
            {/* Visa Details */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-50 space-y-6">
              <h3 className="text-xl font-bold text-gray-900">Visa Requirements</h3>
              <ul className="space-y-4">
                {[
                  'Proof of Employment',
                  'Health Insurance',
                  'Valid Passport (6+ months)',
                  'Qualification Certificates',
                  'English Proficiency Proof'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600 text-sm">
                    <FaCheckCircle className="text-green-500 mt-1 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="pt-4 border-t border-gray-50 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Processing Time</span>
                  <span className="font-bold text-gray-900">4-8 Weeks</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Visa Fee</span>
                  <span className="font-bold text-gray-900">{result?.visa || '€75'}</span>
                </div>
              </div>
            </div>

            {/* Profile Summary */}
            <div className="bg-blue-600 p-8 rounded-3xl text-white space-y-6 shadow-xl shadow-blue-200">
              <h3 className="text-xl font-bold">Profile Summary</h3>
              <div className="space-y-4 opacity-90 text-sm">
                <div className="flex justify-between">
                  <span>Candidate</span>
                  <span className="font-bold">{formData.name || 'Ragul'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Experience</span>
                  <span className="font-bold">{formData.experience || '2'} Years</span>
                </div>
                <div className="flex justify-between">
                  <span>Qualification</span>
                  <span className="font-bold">{formData.qualification || 'Bachelors'}</span>
                </div>
              </div>
              <button className="w-full py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors">
                Download Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Results;
