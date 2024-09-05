import React, { useState } from 'react';
import { ArrowLeft, FolderIcon, UserIcon, BoxIcon, MapPinIcon, BellIcon, LinkIcon, FileTextIcon } from 'lucide-react';
import { useTheme } from '../ThemeContext';

interface SettingsScreenProps {
  userId: string;
}

interface SettingsItemProps {
  icon: React.ReactNode;
  label: string;
  value?: React.ReactNode;
  hasChevron?: boolean;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ userId }) => {
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [syncWithGoogle, setSyncWithGoogle] = useState(true);

  const handleThemeToggle = () => {
    toggleTheme();
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="p-4">
        <div className="flex items-center mb-6">
          <ArrowLeft className="w-6 h-6 mr-4" />
          <h1 className="text-xl font-semibold flex-grow text-center">Prost.workspace</h1>
          <div className="w-6 h-6">...</div>
        </div>

        <div className="flex flex-col items-center mb-6">
          <img
            src="/api/placeholder/100/100"
            alt="User avatar"
            className="w-24 h-24 rounded-full mb-2"
          />
          <h2 className="text-xl font-semibold">User {userId}</h2>
        </div>

        <div className="space-y-4">
          <SettingsItem icon={<FolderIcon />} label="Projects" />
          <SettingsItem icon={<UserIcon />} label="Role" />
          <SettingsItem icon={<BoxIcon />} label="Subscription" value="Free" hasChevron />
          <SettingsItem icon={<MapPinIcon />} label="Language" value="Eng" hasChevron />
          <SettingsItem
            icon={<BellIcon />}
            label="Notifications"
            value={
              <ToggleSwitch
                isOn={notifications}
                onToggle={() => setNotifications(!notifications)}
              />
            }
          />
          <SettingsItem
            icon={<LinkIcon />}
            label="Sync with Google"
            value={
              <ToggleSwitch
                isOn={syncWithGoogle}
                onToggle={() => setSyncWithGoogle(!syncWithGoogle)}
              />
            }
          />
          <SettingsItem
            icon={<LinkIcon />}
            label="Dark theme"
            value={
              <ToggleSwitch
                isOn={theme === 'dark'}
                onToggle={handleThemeToggle}
              />
            }
          />
          <SettingsItem icon={<FileTextIcon />} label="About us" />
        </div>
      </div>
    </div>
  );
};

const SettingsItem: React.FC<SettingsItemProps> = ({ icon, label, value, hasChevron }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
    <div className="flex items-center">
      {icon}
      <span className="ml-3">{label}</span>
    </div>
    <div className="flex items-center">
      {value && <span className="mr-2">{value}</span>}
      {hasChevron && <span>›</span>}
    </div>
  </div>
);

interface ToggleSwitchProps {
  isOn: boolean;
  onToggle: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isOn, onToggle }) => (
  <div
    onClick={onToggle}
    className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${
      isOn ? 'bg-blue-500' : 'bg-gray-400 dark:bg-gray-600'
    }`}
  >
    <div
      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
        isOn ? 'translate-x-6' : ''
      }`}
    />
  </div>
);

export default SettingsScreen;