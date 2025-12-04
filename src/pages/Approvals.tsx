import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import ApprovalQueue from '@/components/approvals/ApprovalQueue';

const Approvals: React.FC = () => {
  return (
    <AppLayout>
      <ApprovalQueue />
    </AppLayout>
  );
};

export default Approvals;
