import React from 'react';

interface TabNavigationProps {
  activeTab: 'Personal' | 'Work' | 'Inbox';
  setActiveTab: (tab: 'Personal' | 'Work' | 'Inbox') => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex space-x-2 mb-4">
      {['Personal', 'Work', 'Inbox'].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab as 'Personal' | 'Work' | 'Inbox')}
          className={`px-4 py-2 rounded-full ${
            activeTab === tab
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
          }`}
        >
          {tab} {tab === 'Work' && <span className="ml-1 px-1 bg-gray-300 dark:bg-gray-700 rounded">3</span>}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;