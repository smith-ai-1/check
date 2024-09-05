import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useEntities } from '../hooks/useEntities';
import { useTheme } from '../ThemeContext';
import Header from './Header';
import TabNavigation from './TabNavigation';
import BottomNavigation from './BottomNavigation';
import EntityList from './shared/EntityList';
import ErrorMessage from './ErrorMessage';
import SettingsScreen from './SettingsScreen';
import { GET_WORKSPACES } from '../apolloConfig';

interface MainContentProps {
  userId: string;
}

const MainContent: React.FC<MainContentProps> = ({ userId }) => {
  const [activeTab, setActiveTab] = useState<'Personal' | 'Work' | 'Inbox'>('Personal');
  const [activeSection, setActiveSection] = useState<'Meets' | 'Space' | 'Settings'>('Space');

  const { theme } = useTheme();
  const {
    entities,
    loading: entitiesLoading,
    error: entitiesError,
    refetchEntities,
    handleAddEntity,
    handleEditEntity,
    handleDeleteEntity
  } = useEntities(userId);

  const {
    data: workspacesData,
    loading: workspacesLoading,
    error: workspacesError
  } = useQuery(GET_WORKSPACES, {
    variables: { userId },
  });

  useEffect(() => {
    refetchEntities();
  }, [refetchEntities]);

  if (entitiesLoading || workspacesLoading) return <p className="text-center text-white">Loading...</p>;
  if (entitiesError) return <ErrorMessage message={entitiesError} />;
  if (workspacesError) return <ErrorMessage message={workspacesError.message} />;

  const renderContent = () => {
    switch (activeSection) {
      case 'Meets':
      case 'Space':
        return (
          <EntityList
            entities={entities.filter((entity) => entity.type === (activeSection === 'Meets' ? 'meet' : 'task'))}
            onAddEntity={handleAddEntity}
            onEditEntity={handleEditEntity}
            onDeleteEntity={handleDeleteEntity}
            workspaces={workspacesData?.workspaces || []}
            activeTab={activeTab}
            entityType={activeSection === 'Meets' ? 'meet' : 'task'}
            userId={userId}
          />
        );
      case 'Settings':
        return <SettingsScreen userId={userId} />;
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="p-4 pb-20">
        <Header />
        {activeSection !== 'Settings' && (
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        )}
        {renderContent()}
      </div>
      <BottomNavigation activeSection={activeSection} setActiveSection={setActiveSection} />
    </div>
  );
};

export default MainContent;