import React from 'react';
import { Clock, CheckCircle2, XCircle, AlertCircle, FileText } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const activities = [
  {
    id: 1,
    type: 'submitted',
    title: 'Weekly timesheet submitted',
    project: 'Web Development',
    time: '2 hours ago',
    icon: FileText,
    color: 'text-info bg-info/10',
  },
  {
    id: 2,
    type: 'approved',
    title: 'Timesheet approved',
    project: 'Mobile App - Week 48',
    time: '5 hours ago',
    icon: CheckCircle2,
    color: 'text-success bg-success/10',
  },
  {
    id: 3,
    type: 'logged',
    title: '4 hours logged',
    project: 'UI/UX Design',
    time: 'Today at 3:30 PM',
    icon: Clock,
    color: 'text-primary bg-primary/10',
  },
  {
    id: 4,
    type: 'revision',
    title: 'Revision requested',
    project: 'Marketing Campaign',
    time: 'Yesterday',
    icon: AlertCircle,
    color: 'text-warning bg-warning/10',
  },
];

const RecentActivity: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="premium-card p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">{t('dashboard.recentActivity')}</h3>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div 
            key={activity.id}
            className="flex items-start gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors animate-slide-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", activity.color)}>
              <activity.icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{activity.title}</p>
              <p className="text-sm text-muted-foreground truncate">{activity.project}</p>
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
