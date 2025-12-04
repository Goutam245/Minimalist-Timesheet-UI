import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Pencil, Trash2, ChevronDown, ChevronUp, GripVertical } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TimeEntry {
  [key: string]: number;
}

interface Task {
  id: string;
  name: string;
  entries: TimeEntry;
}

interface Project {
  id: string;
  name: string;
  color: string;
  tasks: Task[];
  expanded: boolean;
}

const initialProjects: Project[] = [
  {
    id: '1',
    name: 'Web Development',
    color: 'bg-chart-1',
    expanded: true,
    tasks: [
      { id: '1-1', name: 'Frontend Development', entries: { mon: 0, tue: 4, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 } },
      { id: '1-2', name: 'Backend API', entries: { mon: 0, tue: 3, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 } },
    ],
  },
  {
    id: '2',
    name: 'Design',
    color: 'bg-chart-2',
    expanded: true,
    tasks: [
      { id: '2-1', name: 'UI/UX Research', entries: { mon: 2, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 } },
    ],
  },
  {
    id: '3',
    name: 'Marketing',
    color: 'bg-chart-4',
    expanded: false,
    tasks: [
      { id: '3-1', name: 'Campaign Planning', entries: { mon: 0, tue: 0, wed: 5, thu: 0, fri: 0, sat: 0, sun: 0 } },
    ],
  },
];

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const dayLabels = { mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri', sat: 'Sat', sun: 'Sun' };
const dates = { mon: '02', tue: '03', wed: '04', thu: '05', fri: '06', sat: '07', sun: '08' };

const WeeklyTimeGrid: React.FC = () => {
  const { t } = useLanguage();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [editingCell, setEditingCell] = useState<{ taskId: string; day: string } | null>(null);

  const toggleProject = (projectId: string) => {
    setProjects(projects.map(p => 
      p.id === projectId ? { ...p, expanded: !p.expanded } : p
    ));
  };

  const getProjectTotal = (project: Project) => {
    return project.tasks.reduce((total, task) => {
      return total + Object.values(task.entries).reduce((a, b) => a + b, 0);
    }, 0);
  };

  const getTaskTotal = (task: Task) => {
    return Object.values(task.entries).reduce((a, b) => a + b, 0);
  };

  const getDayTotal = (day: string) => {
    return projects.reduce((total, project) => {
      return total + project.tasks.reduce((taskTotal, task) => {
        return taskTotal + (task.entries[day] || 0);
      }, 0);
    }, 0);
  };

  const getWeekTotal = () => {
    return days.reduce((total, day) => total + getDayTotal(day), 0);
  };

  const handleCellChange = (taskId: string, day: string, value: number) => {
    setProjects(projects.map(project => ({
      ...project,
      tasks: project.tasks.map(task => 
        task.id === taskId 
          ? { ...task, entries: { ...task.entries, [day]: value } }
          : task
      )
    })));
  };

  return (
    <div className="premium-card overflow-hidden animate-scale-in">
      {/* Header with Week Navigation */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">{t('nav.weeklyView')}</h2>
            <p className="text-sm text-muted-foreground mt-1">KW 49 • December 2024</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon-sm">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="px-4 py-2 rounded-lg bg-secondary text-sm font-medium">
              Dec 2 - Dec 8
            </span>
            <Button variant="outline" size="icon-sm">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Time Grid */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/30">
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider w-64">
                Project / Task
              </th>
              {days.map(day => (
                <th key={day} className="px-2 py-3 text-center min-w-[80px]">
                  <div className="text-xs font-semibold text-muted-foreground uppercase">
                    {dayLabels[day as keyof typeof dayLabels]}
                  </div>
                  <div className="text-sm font-medium text-foreground mt-0.5">
                    {dates[day as keyof typeof dates]}.12
                  </div>
                </th>
              ))}
              <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider min-w-[80px]">
                Total
              </th>
              <th className="px-4 py-3 w-24" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {projects.map((project) => (
              <React.Fragment key={project.id}>
                {/* Project Row */}
                <tr className="bg-muted/20 hover:bg-muted/40 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <GripVertical className="w-4 h-4 text-muted-foreground/50 cursor-grab" />
                      <button 
                        onClick={() => toggleProject(project.id)}
                        className="p-0.5 hover:bg-secondary rounded"
                      >
                        {project.expanded ? (
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        )}
                      </button>
                      <div className={cn("w-3 h-3 rounded-full", project.color)} />
                      <span className="font-medium text-foreground">{project.name}</span>
                    </div>
                  </td>
                  {days.map(day => (
                    <td key={day} className="px-2 py-3 text-center">
                      <div className="time-cell time-cell-empty opacity-50">-</div>
                    </td>
                  ))}
                  <td className="px-4 py-3 text-center">
                    <span className="font-semibold text-foreground">{getProjectTotal(project)}h</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 justify-end">
                      <Button variant="ghost" size="icon-sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon-sm">
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon-sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>

                {/* Task Rows */}
                {project.expanded && project.tasks.map((task) => (
                  <tr key={task.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 pl-16">
                      <span className="text-sm text-muted-foreground">{task.name}</span>
                    </td>
                    {days.map(day => {
                      const value = task.entries[day] || 0;
                      const isEditing = editingCell?.taskId === task.id && editingCell?.day === day;
                      
                      return (
                        <td key={day} className="px-2 py-2 text-center">
                          {isEditing ? (
                            <input
                              type="number"
                              step="0.5"
                              min="0"
                              max="24"
                              defaultValue={value || ''}
                              autoFocus
                              className="w-16 h-9 text-center rounded-lg border border-primary bg-primary/5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                              onBlur={(e) => {
                                handleCellChange(task.id, day, parseFloat(e.target.value) || 0);
                                setEditingCell(null);
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  handleCellChange(task.id, day, parseFloat((e.target as HTMLInputElement).value) || 0);
                                  setEditingCell(null);
                                }
                                if (e.key === 'Escape') {
                                  setEditingCell(null);
                                }
                              }}
                            />
                          ) : (
                            <div
                              onClick={() => setEditingCell({ taskId: task.id, day })}
                              className={cn(
                                "time-cell cursor-pointer",
                                value > 0 ? "time-cell-filled" : "time-cell-empty"
                              )}
                            >
                              {value > 0 ? value : '0'}
                            </div>
                          )}
                        </td>
                      );
                    })}
                    <td className="px-4 py-3 text-center">
                      <span className="text-sm font-medium text-foreground">{getTaskTotal(task)}h</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 justify-end opacity-0 hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon-sm">
                          <Pencil className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="icon-sm" className="text-destructive hover:text-destructive">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}

            {/* Totals Row */}
            <tr className="bg-primary/5 font-semibold">
              <td className="px-4 py-4 text-foreground">Daily Total</td>
              {days.map(day => (
                <td key={day} className="px-2 py-4 text-center">
                  <span className={cn(
                    "text-sm",
                    getDayTotal(day) >= 8 ? "text-success" : "text-foreground"
                  )}>
                    {getDayTotal(day)}h
                  </span>
                </td>
              ))}
              <td className="px-4 py-4 text-center">
                <span className="text-lg text-primary">{getWeekTotal()}h</span>
              </td>
              <td />
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer Actions */}
      <div className="p-6 border-t border-border bg-muted/20">
        <div className="flex items-center justify-between">
          <Button variant="outline" className="gap-2">
            <Plus className="w-4 h-4" />
            Add Project
          </Button>
          <div className="flex items-center gap-3">
            <Button variant="outline">Save Draft</Button>
            <Button className="gap-2">
              Submit Week
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyTimeGrid;
