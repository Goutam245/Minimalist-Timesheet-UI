import React, { useState } from 'react';
import { Calendar, Download, Filter, TrendingUp, Users, Clock, Briefcase, BarChart3, PieChart, LineChart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RePieChart, Pie, Cell, LineChart as ReLineChart, Line, Area, AreaChart } from 'recharts';
import { cn } from '@/lib/utils';

const weeklyData = [
  { week: 'W45', hours: 38, target: 40 },
  { week: 'W46', hours: 42, target: 40 },
  { week: 'W47', hours: 40, target: 40 },
  { week: 'W48', hours: 45, target: 40 },
  { week: 'W49', hours: 35, target: 40 },
];

const projectData = [
  { name: 'Web Dev', value: 120, color: 'hsl(var(--chart-1))' },
  { name: 'Design', value: 80, color: 'hsl(var(--chart-2))' },
  { name: 'Marketing', value: 45, color: 'hsl(var(--chart-3))' },
  { name: 'Research', value: 30, color: 'hsl(var(--chart-4))' },
];

const teamData = [
  { name: 'Alex T.', hours: 42, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face' },
  { name: 'Maria G.', hours: 38, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face' },
  { name: 'James W.', hours: 45, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face' },
  { name: 'Emma C.', hours: 35, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop&crop=face' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-xl p-3 shadow-lg">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-lg font-bold text-primary">{payload[0].value}h</p>
      </div>
    );
  }
  return null;
};

const ReportsPage: React.FC = () => {
  const { t } = useLanguage();
  const [dateRange, setDateRange] = useState('month');

  const stats = [
    { label: 'Total Hours', value: '200h', change: '+12%', icon: Clock, color: 'primary' },
    { label: 'Team Members', value: '12', change: '+2', icon: Users, color: 'info' },
    { label: 'Active Projects', value: '8', change: '+1', icon: Briefcase, color: 'success' },
    { label: 'Avg. Daily', value: '7.5h', change: '+0.5h', icon: TrendingUp, color: 'warning' },
  ];

  return (
    <div className="space-y-6 animate-scale-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">{t('reports.title')}</h1>
          <p className="text-muted-foreground mt-1">Analyze team productivity and time allocation</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg bg-secondary p-1">
            {['week', 'month', 'quarter', 'year'].map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize",
                  dateRange === range
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {range}
              </button>
            ))}
          </div>
          <Button variant="outline" className="gap-2">
            <Calendar className="w-4 h-4" />
            Custom
          </Button>
          <Button className="gap-2">
            <Download className="w-4 h-4" />
            {t('reports.export')}
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div 
            key={stat.label}
            className="stat-card animate-scale-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                <p className="text-sm text-success mt-1">{stat.change}</p>
              </div>
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center",
                `bg-${stat.color}/10 text-${stat.color}`
              )}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Hours Chart */}
        <div className="premium-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-foreground">Hours by Week</h3>
              <p className="text-sm text-muted-foreground">Weekly time tracking overview</p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-muted-foreground">Actual</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-muted" />
                <span className="text-muted-foreground">Target</span>
              </div>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="hours" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorHours)" strokeWidth={2} />
                <Line type="monotone" dataKey="target" stroke="hsl(var(--muted-foreground))" strokeDasharray="5 5" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Project Distribution */}
        <div className="premium-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-foreground">Project Distribution</h3>
              <p className="text-sm text-muted-foreground">Time allocation by project</p>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="h-48 w-48">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={projectData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {projectData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </RePieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-3">
              {projectData.map((project, index) => (
                <div key={project.name} className="flex items-center justify-between animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: project.color }} />
                    <span className="text-sm font-medium text-foreground">{project.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-foreground">{project.value}h</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Performance */}
      <div className="premium-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-semibold text-foreground">Team Performance</h3>
            <p className="text-sm text-muted-foreground">Individual hours this week</p>
          </div>
          <Button variant="outline" size="sm">View All</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {teamData.map((member, index) => (
            <div 
              key={member.name}
              className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors animate-scale-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-xl object-cover" />
                <span className="font-medium text-foreground">{member.name}</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Hours</span>
                  <span className="font-semibold text-foreground">{member.hours}h</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div 
                    className={cn(
                      "h-full rounded-full transition-all duration-500",
                      member.hours >= 40 ? "bg-success" : member.hours >= 35 ? "bg-primary" : "bg-warning"
                    )}
                    style={{ width: `${(member.hours / 50) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
