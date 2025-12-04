import React from 'react';
import { Clock, Users, Briefcase, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import AppLayout from '@/components/layout/AppLayout';
import StatCard from '@/components/dashboard/StatCard';
import WeeklyChart from '@/components/dashboard/WeeklyChart';
import ProjectBreakdown from '@/components/dashboard/ProjectBreakdown';
import RecentActivity from '@/components/dashboard/RecentActivity';
import QuickActions from '@/components/dashboard/QuickActions';

const Dashboard: React.FC = () => {
  const { t } = useLanguage();

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="page-header">
          <h1 className="page-title">{t('dashboard.title')}</h1>
          <p className="page-subtitle">{t('dashboard.welcome')}, Sarah! Here's your overview for this week.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title={t('dashboard.totalHours')}
            value="41.5h"
            subtitle={t('dashboard.thisWeek')}
            icon={Clock}
            color="primary"
            trend={{ value: 8.5, isPositive: true }}
          />
          <StatCard
            title={t('dashboard.activeProjects')}
            value="5"
            subtitle="3 in progress"
            icon={Briefcase}
            color="info"
          />
          <StatCard
            title={t('dashboard.pendingApprovals')}
            value="3"
            subtitle="Awaiting review"
            icon={Users}
            color="warning"
          />
          <StatCard
            title={t('dashboard.overtime')}
            value="1.5h"
            subtitle="Above 40h target"
            icon={TrendingUp}
            color="success"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weekly Chart - Spans 2 columns */}
          <div className="lg:col-span-2">
            <WeeklyChart />
          </div>
          
          {/* Quick Actions */}
          <div>
            <QuickActions />
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProjectBreakdown />
          <RecentActivity />
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
