import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const projects = [
  { name: 'Web Development', hours: 14.5, color: 'bg-chart-1', percentage: 36 },
  { name: 'Mobile App', hours: 10, color: 'bg-chart-2', percentage: 25 },
  { name: 'UI/UX Design', hours: 8.5, color: 'bg-chart-3', percentage: 21 },
  { name: 'Marketing Campaign', hours: 5, color: 'bg-chart-4', percentage: 13 },
  { name: 'Client Meetings', hours: 2, color: 'bg-chart-5', percentage: 5 },
];

const ProjectBreakdown: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="premium-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.activeProjects')}</h3>
        <span className="text-sm text-muted-foreground">40h total</span>
      </div>

      {/* Progress Bar */}
      <div className="h-3 rounded-full bg-muted overflow-hidden flex mb-6">
        {projects.map((project, index) => (
          <div
            key={project.name}
            className={`${project.color} transition-all duration-500`}
            style={{ width: `${project.percentage}%`, animationDelay: `${index * 100}ms` }}
          />
        ))}
      </div>

      {/* Project List */}
      <div className="space-y-4">
        {projects.map((project, index) => (
          <div 
            key={project.name} 
            className="flex items-center justify-between animate-slide-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${project.color}`} />
              <span className="text-sm font-medium text-foreground">{project.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-foreground">{project.hours}h</span>
              <span className="text-xs text-muted-foreground w-10 text-right">{project.percentage}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectBreakdown;
