import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useLanguage } from '@/contexts/LanguageContext';

const data = [
  { day: 'Mon', hours: 8.5, target: 8 },
  { day: 'Tue', hours: 7.5, target: 8 },
  { day: 'Wed', hours: 9, target: 8 },
  { day: 'Thu', hours: 8, target: 8 },
  { day: 'Fri', hours: 6.5, target: 8 },
  { day: 'Sat', hours: 2, target: 0 },
  { day: 'Sun', hours: 0, target: 0 },
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

const WeeklyChart: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="premium-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{t('dashboard.thisWeek')}</h3>
          <p className="text-sm text-muted-foreground">Dec 2 - Dec 8, 2024</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-muted-foreground">Logged</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-muted" />
            <span className="text-muted-foreground">Target</span>
          </div>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="20%">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              tickFormatter={(value) => `${value}h`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted) / 0.3)' }} />
            <Bar 
              dataKey="hours" 
              radius={[6, 6, 0, 0]}
              fill="hsl(var(--primary))"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`}
                  fill={entry.hours >= entry.target ? 'hsl(var(--primary))' : 'hsl(var(--primary) / 0.6)'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyChart;
