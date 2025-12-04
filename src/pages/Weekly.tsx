import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import WeeklyTimeGrid from '@/components/timesheet/WeeklyTimeGrid';

const Weekly: React.FC = () => {
  return (
    <AppLayout>
      <WeeklyTimeGrid />
    </AppLayout>
  );
};

export default Weekly;
