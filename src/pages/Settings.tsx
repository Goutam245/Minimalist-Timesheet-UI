import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import SettingsPage from '@/components/settings/SettingsPage';

const Settings: React.FC = () => {
  return (
    <AppLayout>
      <SettingsPage />
    </AppLayout>
  );
};

export default Settings;
