import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Home from './pages/Home';
import ProfileInput from './pages/ProfileInput';
import Results from './pages/Results';
import CompareCountries from './pages/CompareCountries';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<ProfileInput />} />
          <Route path="/results" element={<Results />} />
          <Route path="/compare" element={<CompareCountries />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Auth />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
