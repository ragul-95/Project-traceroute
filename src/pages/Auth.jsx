import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Layout from '../components/layout/Layout';
import { FaGoogle, FaEnvelope, FaLock } from 'react-icons/fa';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const { login } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setAuthError('');
    if (isLogin) {
      const success = login(email, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setAuthError('Invalid email or password');
      }
    } else {
      setAuthError('Sign up is disabled for this demo. Use a test account.');
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto py-12">
        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-100 space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-gray-500 text-sm">
              {isLogin ? 'Log in to access your saved career routes.' : 'Start your journey to a global career today.'}
            </p>
          </div>

          <div className="space-y-4">
            <button className="w-full py-4 px-6 bg-white border border-gray-200 rounded-2xl flex items-center justify-center gap-3 font-bold text-gray-700 hover:bg-gray-50 transition-all active:scale-[0.98] shadow-sm">
              <FaGoogle className="text-red-500" /> Continue with Google
            </button>
            <div className="flex items-center gap-4 text-gray-300">
              <hr className="flex-grow border-gray-100" />
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">or email</span>
              <hr className="flex-grow border-gray-100" />
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {authError && (
              <div className="p-3 bg-red-50 text-red-600 text-sm font-medium rounded-xl border border-red-100">
                {authError}
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                  required
                />
              </div>
            </div>

            {isLogin && (
              <div className="text-right">
                <button className="text-xs font-bold text-blue-600 hover:underline">Forgot Password?</button>
              </div>
            )}

            <button className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 active:scale-[0.98]">
              {isLogin ? 'Log In' : 'Sign Up'}
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-500 font-medium">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 font-bold hover:underline"
              >
                {isLogin ? 'Sign Up' : 'Log In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Auth;
