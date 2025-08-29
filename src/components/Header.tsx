/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import type { Theme } from '../App';
import { useLanguage } from '../context/LanguageContext';

const QrCodeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M15 3H21V9H19V5H15V3ZM9 3H5V5H9V3ZM15 21H19V17H21V21H15V19ZM9 21H5V19H9V21ZM3 15H5V19H3V15ZM3 9H5V5H3V9ZM9 15H15V9H9V15ZM19 15H17V9H19V15ZM11 13H13V11H11V13Z" />
  </svg>
);

const SunIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
  </svg>
);

const MoonIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
  </svg>
);

interface HeaderProps {
    theme: Theme;
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

const Header: React.FC<HeaderProps> = ({ theme, setTheme }) => {
  const { language, setLanguage, translations } = useLanguage();

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <header className="w-full py-4 px-4 sm:px-6 md:px-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700/80 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
            <QrCodeIcon className="w-7 h-7 text-gray-800 dark:text-gray-200" />
            <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              {translations.header.title}
            </h1>
        </div>
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 p-1 rounded-full bg-gray-200 dark:bg-gray-800">
                <button
                    onClick={() => setLanguage('en')}
                    className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors ${language === 'en' ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}
                >
                    EN
                </button>
                 <button
                    onClick={() => setLanguage('pt')}
                    className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors ${language === 'pt' ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}
                >
                    PT
                </button>
            </div>
            <button onClick={toggleTheme} aria-label="Toggle theme" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                {theme === 'light' ? <MoonIcon className="w-5 h-5 text-gray-700" /> : <SunIcon className="w-5 h-5 text-yellow-400" />}
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;