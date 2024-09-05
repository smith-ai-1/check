import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../ThemeContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold">Prost.workspace</h1>
      <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
        {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>
    </div>
  );
};

export default Header;