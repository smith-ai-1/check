import React from 'react';
import { Calendar, Inbox, Settings } from 'lucide-react';

interface BottomNavigationProps {
  activeSection: 'Meets' | 'Space' | 'Settings';
  setActiveSection: (section: 'Meets' | 'Space' | 'Settings') => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeSection, setActiveSection }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4">
      <div className="flex justify-around">
        <button
          onClick={() => setActiveSection('Meets')}
          className={`p-2 rounded-full ${activeSection === 'Meets' ? 'bg-blue-500' : ''}`}
        >
          <Calendar className="w-6 h-6" />
        </button>
        <button
          onClick={() => setActiveSection('Space')}
          className={`p-2 rounded-full ${activeSection === 'Space' ? 'bg-blue-500' : ''}`}
        >
          <Inbox className="w-6 h-6" />
        </button>
        <button
          onClick={() => setActiveSection('Settings')}
          className={`p-2 rounded-full ${activeSection === 'Settings' ? 'bg-blue-500' : ''}`}
        >
          <Settings className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default BottomNavigation;