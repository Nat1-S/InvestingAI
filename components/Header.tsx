
import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { SunIcon, MoonIcon, HebrewIcon, EnglishIcon } from './icons/Icons';

const Header: React.FC = () => {
  const { theme, setTheme, language, setLanguage, t } = useAppContext();

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const toggleLanguage = () => setLanguage(language === 'en' ? 'he' : 'en');

  return (
    <header className="sticky top-0 z-10 bg-light-surface/80 dark:bg-dark-surface/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <svg className="w-8 h-8 text-brand-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h1 className="text-xl font-bold tracking-tight text-light-text dark:text-dark-text">{t('appTitle')}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={toggleLanguage} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary">
              {language === 'en' ? <HebrewIcon /> : <EnglishIcon />}
            </button>
            <button onClick={toggleTheme} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary">
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
