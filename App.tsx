
import React, { useContext, useEffect } from 'react';
import { AppContext } from './contexts/AppContext';
import Header from './components/Header';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("AppContext must be used within an AppProvider");
  }

  const { theme, language } = context;

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);
    root.lang = language;
    root.dir = language === 'he' ? 'rtl' : 'ltr';
  }, [theme, language]);

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text font-sans transition-colors duration-300">
      <Header />
      <main>
        <Dashboard />
      </main>
    </div>
  );
};

export default App;
