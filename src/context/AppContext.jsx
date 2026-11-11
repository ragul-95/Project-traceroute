import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const MOCK_USERS = {
  'pranav@gmail.com': { name: 'Pranav', password: 'pranav', history: [] },
  'naresh@gmail.com': { name: 'Naresh', password: 'naresh', history: [] },
  'ragul@gmail.com': { name: 'Ragul M', password: 'ragul', history: [] },
};

export const AppProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    qualification: '',
    fieldOfStudy: '',
    experience: '',
    preferredCountry: '',
    preferredJobRole: '',
    budget: '',
    englishProficiency: '',
  });

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [usersDB, setUsersDB] = useState(() => {
    const saved = localStorage.getItem('talentRouteUsers');
    return saved ? JSON.parse(saved) : MOCK_USERS;
  });
  
  const [user, setUser] = useState(null);
  const [pendingSearch, setPendingSearch] = useState(null);

  useEffect(() => {
    localStorage.setItem('talentRouteUsers', JSON.stringify(usersDB));
  }, [usersDB]);

  useEffect(() => {
    if (user && usersDB[user.email]) {
      setUser({ email: user.email, ...usersDB[user.email] });
    }
  }, [usersDB]);

  const login = (email, password) => {
    const account = usersDB[email];
    if (account && account.password === password) {
      const loggedInUser = { email, ...account };
      setUser(loggedInUser);
      
      if (pendingSearch) {
        saveSearchToHistory(pendingSearch, email);
        setPendingSearch(null);
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const saveSearchToHistory = (searchData, userEmail = user?.email) => {
    if (!userEmail) {
      setPendingSearch(searchData);
      return;
    }
    
    setUsersDB(prev => {
      const userRecord = prev[userEmail];
      if (!userRecord) return prev;
      
      const newHistory = [{
        ...searchData,
        date: new Date().toLocaleDateString()
      }, ...(userRecord.history || [])];
      
      return {
        ...prev,
        [userEmail]: {
          ...userRecord,
          history: newHistory
        }
      };
    });
  };

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const clearFormData = () => {
    setFormData({
      name: '',
      age: '',
      qualification: '',
      fieldOfStudy: '',
      experience: '',
      preferredCountry: '',
      preferredJobRole: '',
      budget: '',
      englishProficiency: '',
    });
  };

  return (
    <AppContext.Provider
      value={{
        formData,
        updateFormData,
        clearFormData,
        results,
        setResults,
        loading,
        setLoading,
        error,
        setError,
        user,
        login,
        logout,
        saveSearchToHistory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
