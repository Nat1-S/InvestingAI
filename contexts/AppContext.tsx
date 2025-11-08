
import React, { createContext, useState, ReactNode, useCallback } from 'react';
import { Theme, Language, AppContextType } from '../types';
import { translations } from '../constants';

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [language, setLanguage] = useState<Language>('en');

  const t = useCallback((key: string): string => {
    return translations[language][key] || key;
  }, [language]);

  return (
    <AppContext.Provider value={{ theme, setTheme, language, setLanguage, t }}>
      {children}
    </AppContext.Provider>
  );
};
