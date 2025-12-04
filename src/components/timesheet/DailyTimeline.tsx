import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Clock, Play, Pause, MoreVertical } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TimeBlock {
  id: string;
  project: string;
  task: string;
  color: string;
  startHour: number;
  duration: number;
  description?: string;
}

const timeBlocks: TimeBlock[] = [
  { id: '1', project: 'Web Development', task: 'Frontend Development', color: 'bg-chart-1', startHour: 9, duration: 2.5, description: 'Working on dashboard components' },
  { id: '2', project: 'Design', task: 'UI/UX Research', color: 'bg-chart-2', startHour: 11.5, duration: 1, description: 'User interviews' },
  { id: '3', project: 'Web Development', task: 'Backend API', color: 'bg-chart-1', startHour: 13, duration: 3, description: 'API endpoint implementation' },
  { id: '4', project: 'Marketing', task: 'Campaign Planning', color: 'bg-chart-4', startHour: 16, duration: 1.5, description: 'Q1 campaign strategy' },
];

const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 8 PM

const DailyTimeline: React.FC = () => {
  const { t } = useLanguage();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formatHour = (hour: number) => {
    const h = hour % 12 || 12;
    const ampm = hour < 12 ? 'AM' : 'PM';
    return `${h}:00 ${ampm}`;
  };

  const getTotalHours = () => {
    return timeBlocks.reduce((total, block) => total + block.duration, 0);
  };

  return (
    <div className="space-y-6 animate-scale-in">
      {/* Header */}
      <div className="premium-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">{t('nav.dailyView')}</h2>
            <p className="text-sm text-muted-foreground mt-1">Track your time throughout the day</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon-sm">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="px-4 py-2 rounded-lg bg-secondary text-sm font-medium min-w-[140px] text-center">
              December 4, 2024
            </span>
            <Button variant="outline" size="icon-sm">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Day Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
            <p className="text-sm text-muted-foreground">Total Logged</p>
            <p className="text-2xl font-bold text-primary mt-1">{getTotalHours()}h</p>
          </div>
          <div className="p-4 rounded-xl bg-success/5 border border-success/10">
            <p className="text-sm text-muted-foreground">Target</p>
            <p className="text-2xl font-bold text-success mt-1">8h</p>
          </div>
          <div className="p-4 rounded-xl bg-info/5 border border-info/10">
            <p className="text-sm text-muted-foreground">Remaining</p>
            <p className="text-2xl font-bold text-info mt-1">{Math.max(0, 8 - getTotalHours())}h</p>
          </div>
        </div>
      </div>

      {/* Timeline View */}
      <div className="premium-card overflow-hidden">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Timeline</h3>
            <Button variant="subtle" size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Time Block
            </Button>
          </div>
        </div>

        <div className="p-6">
          <div className="relative">
            {/* Hour Grid */}
            <div className="absolute left-0 top-0 bottom-0 w-20 flex flex-col">
              {hours.map((hour) => (
                <div key={hour} className="h-16 flex items-start">
                  <span className="text-xs text-muted-foreground -mt-2">{formatHour(hour)}</span>
                </div>
              ))}
            </div>

            {/* Timeline Grid */}
            <div className="ml-24 relative">
              {/* Grid Lines */}
              {hours.map((hour) => (
                <div key={hour} className="h-16 border-t border-border" />
              ))}

              {/* Time Blocks */}
              <div className="absolute inset-0">
                {timeBlocks.map((block) => {
                  const top = (block.startHour - 8) * 64;
                  const height = block.duration * 64 - 4;

                  return (
                    <div
                      key={block.id}
                      className={cn(
                        "absolute left-0 right-0 rounded-xl p-3 cursor-pointer group transition-all hover:shadow-lg",
                        block.color,
                        "text-white"
                      )}
                      style={{ top: `${top}px`, height: `${height}px` }}
                    >
                      <div className="flex items-start justify-between h-full">
                        <div className="overflow-hidden">
                          <p className="font-medium text-sm truncate">{block.project}</p>
                          <p className="text-xs opacity-90 truncate">{block.task}</p>
                          {block.description && height > 60 && (
                            <p className="text-xs opacity-75 mt-1 truncate">{block.description}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-xs font-medium">{block.duration}h</span>
                          <Button variant="ghost" size="icon-sm" className="text-white hover:bg-white/20">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Current Time Indicator */}
              <div 
                className="absolute left-0 right-0 flex items-center z-10"
                style={{ top: `${(14 - 8) * 64}px` }}
              >
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <div className="flex-1 h-0.5 bg-destructive" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Timer */}
      <div className="premium-card p-6 border-2 border-primary/20 bg-primary/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center animate-pulse-glow">
              <Clock className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Currently Tracking</p>
              <p className="text-sm text-muted-foreground">Web Development • Frontend Development</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-3xl font-bold font-mono text-primary">01:23:45</p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <Pause className="w-5 h-5" />
              </Button>
              <Button variant="destructive" size="sm">
                Stop
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyTimeline;
