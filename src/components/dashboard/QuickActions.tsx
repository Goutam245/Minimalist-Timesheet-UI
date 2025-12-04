import React from 'react';
import { Plus, FileText, Download, Upload, Calendar, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const QuickActions: React.FC = () => {
  const { t } = useLanguage();

  const actions = [
    { icon: Plus, label: 'New Entry', variant: 'default' as const },
    { icon: FileText, label: 'Submit Week', variant: 'subtle' as const },
    { icon: Download, label: 'Export', variant: 'outline' as const },
    { icon: Upload, label: 'Import', variant: 'outline' as const },
  ];

  return (
    <div className="premium-card p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">{t('dashboard.quickActions')}</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <Button 
            key={action.label}
            variant={action.variant}
            className="h-auto py-4 flex-col gap-2 animate-scale-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <action.icon className="w-5 h-5" />
            <span className="text-xs">{action.label}</span>
          </Button>
        ))}
      </div>

      {/* Current Timer */}
      <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center animate-pulse-glow">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Currently tracking</p>
              <p className="text-xs text-muted-foreground">Web Development • Frontend</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-primary font-mono">02:34:15</p>
            <Button variant="ghost" size="sm" className="text-xs text-destructive hover:text-destructive">
              Stop
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
