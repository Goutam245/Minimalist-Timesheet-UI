import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import DailyTimeline from '@/components/timesheet/DailyTimeline';

const Daily: React.FC = () => {
  return (
    <AppLayout>
      <DailyTimeline />
    </AppLayout>
  );
};

export default Daily;
