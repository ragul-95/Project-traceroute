import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/layout/Layout';
import { FaCheck, FaExchangeAlt, FaArrowRight, FaInfoCircle } from 'react-icons/fa';

const countries = [
  { id: 'CA', name: 'Canada' },
  { id: 'DE', name: 'Germany' },
  { id: 'US', name: 'United States' },
  { id: 'GB', name: 'United Kingdom' },
  { id: 'AU', name: 'Australia' },
  { id: 'FR', name: 'France' },
  { id: 'NL', name: 'Netherlands' },
  { id: 'SG', name: 'Singapore' },
  { id: 'AE', name: 'United Arab Emirates' },
  { id: 'JP', name: 'Japan' },
];

const CompareCountries = () => {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [showComparison, setShowComparison] = useState(false);

  const toggleCountry = (id) => {
    if (selectedCountries.includes(id)) {
      setSelectedCountries(selectedCountries.filter(c => c !== id));
    } else if (selectedCountries.length < 3) {
      setSelectedCountries([...selectedCountries, id]);
    }
  };

  const comparisonData = [
    { feature: 'Avg. Salary (IT)', CA: '$6,200', DE: '$5,500', US: '$8,500', GB: '$5,800', AU: '$6,000', FR: '$4,800', NL: '$5,200', SG: '$7,200', AE: '$6,500', JP: '$5,000' },
    { feature: 'Living Cost', CA: '$2,500', DE: '$2,200', US: '$3,200', GB: '$2,800', AU: '$2,700', FR: '$2,400', NL: '$2,500', SG: '$3,500', AE: '$3,000', JP: '$2,600' },
    { feature: 'Visa Processing', CA: '4-6 Months', DE: '2-3 Months', US: '6-12 Months', GB: '3-4 Months', AU: '3-5 Months', FR: '2-4 Months', NL: '2-3 Months', SG: '1-2 Months', AE: '1-2 Months', JP: '2-4 Months' },
    { feature: 'Language Req.', CA: 'IELTS 7.0', DE: 'B1 German', US: 'IELTS 7.0', GB: 'IELTS 7.0', AU: 'IELTS 6.5', FR: 'B2 French', NL: 'English/Dutch', SG: 'English', AE: 'English', JP: 'N2 Japanese' },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold text-gray-900 tracking-tight"
          >
            Compare Your <span className="text-blue-600">Dream Destinations</span>
          </motion.h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Select up to three countries to compare salaries, living costs, and visa requirements side-by-side.
          </p>
        </div>

        {/* Selection Area */}
        <div className="bg-[#FFF9F6] rounded-[32px] p-8 border border-[#FFE8DE] shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-gray-800">
              Select Countries <span className="text-gray-400 font-medium ml-2">({selectedCountries.length}/3)</span>
            </h2>
            {selectedCountries.length > 0 && (
              <button 
                onClick={() => setSelectedCountries([])}
                className="text-sm text-red-500 font-semibold hover:underline"
              >
                Clear All
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {countries.map((country) => (
              <motion.div
                key={country.id}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleCountry(country.id)}
                className={`
                  cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 text-center
                  ${selectedCountries.includes(country.id) 
                    ? 'bg-white border-blue-500 shadow-xl shadow-blue-100 ring-4 ring-blue-50' 
                    : 'bg-white border-transparent shadow-sm hover:border-gray-200'}
                `}
              >
                <div className={`text-2xl font-black mb-1 ${selectedCountries.includes(country.id) ? 'text-blue-600' : 'text-gray-800'}`}>
                  {country.id}
                </div>
                <div className="text-sm text-gray-500 font-medium">
                  {country.name}
                </div>
                {selectedCountries.includes(country.id) && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center"
                  >
                    <FaCheck className="text-white text-[10px]" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (selectedCountries.length > 0) setShowComparison(true);
              }}
              disabled={selectedCountries.length === 0}
              className={`
                flex items-center gap-3 px-10 py-4 rounded-full text-lg font-bold transition-all
                ${selectedCountries.length > 0 
                  ? 'bg-[#F28C8C] text-white shadow-lg shadow-red-200 hover:bg-[#eb7a7a]' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
              `}
            >
              Compare Selected <FaArrowRight />
            </motion.button>
            
            <AnimatePresence>
              {selectedCountries.length === 0 && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-[#F28C8C] font-semibold flex items-center gap-2"
                >
                  <FaInfoCircle /> Select at least one country to compare
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Comparison Table */}
        <AnimatePresence>
          {showComparison && selectedCountries.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className="space-y-8 pb-20"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-gray-900">Comparison Result</h2>
                <button 
                  onClick={() => setShowComparison(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  Close Table
                </button>
              </div>

              <div className="overflow-x-auto bg-white rounded-[40px] border border-gray-100 shadow-2xl shadow-gray-100">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100">
                      <th className="p-10 text-sm font-bold text-gray-400 uppercase tracking-wider">Feature</th>
                      {selectedCountries.map(id => (
                        <th key={id} className="p-10 text-2xl font-black text-gray-900 text-center">
                          {id}
                          <div className="text-xs font-bold text-blue-600 uppercase mt-1">
                            {countries.find(c => c.id === id)?.name}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {comparisonData.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                        <td className="p-10 font-bold text-gray-700 text-lg">{row.feature}</td>
                        {selectedCountries.map(id => (
                          <td key={id} className="p-10 text-center text-gray-600 font-medium text-lg">
                            {row[id]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
};

export default CompareCountries;

