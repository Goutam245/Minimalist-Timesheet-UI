import React, { useState } from 'react';
import { Search, Filter, CheckCircle2, XCircle, Clock, Eye, MessageSquare, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ApprovalItem {
  id: string;
  employee: {
    name: string;
    avatar: string;
    role: string;
  };
  period: string;
  totalHours: number;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  projects: string[];
}

const approvalItems: ApprovalItem[] = [
  {
    id: '1',
    employee: {
      name: 'Alex Thompson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      role: 'Frontend Developer',
    },
    period: 'Week 49 (Dec 2-8)',
    totalHours: 42,
    submittedAt: '2 hours ago',
    status: 'pending',
    projects: ['Web Development', 'UI/UX Design'],
  },
  {
    id: '2',
    employee: {
      name: 'Maria Garcia',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      role: 'Product Designer',
    },
    period: 'Week 49 (Dec 2-8)',
    totalHours: 38,
    submittedAt: '5 hours ago',
    status: 'pending',
    projects: ['Design', 'Research'],
  },
  {
    id: '3',
    employee: {
      name: 'James Wilson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      role: 'Backend Developer',
    },
    period: 'Week 48 (Nov 25 - Dec 1)',
    totalHours: 45,
    submittedAt: '1 day ago',
    status: 'approved',
    projects: ['Web Development', 'API Integration'],
  },
  {
    id: '4',
    employee: {
      name: 'Emma Chen',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
      role: 'Marketing Lead',
    },
    period: 'Week 48 (Nov 25 - Dec 1)',
    totalHours: 35,
    submittedAt: '2 days ago',
    status: 'rejected',
    projects: ['Marketing', 'Analytics'],
  },
];

const statusConfig = {
  pending: { label: 'Pending', class: 'status-pending', icon: Clock },
  approved: { label: 'Approved', class: 'status-approved', icon: CheckCircle2 },
  rejected: { label: 'Rejected', class: 'status-rejected', icon: XCircle },
};

const ApprovalQueue: React.FC = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const filteredItems = filter === 'all' 
    ? approvalItems 
    : approvalItems.filter(item => item.status === filter);

  const pendingCount = approvalItems.filter(i => i.status === 'pending').length;

  const toggleSelectItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredItems.map(i => i.id));
    }
  };

  return (
    <div className="space-y-6 animate-scale-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">{t('approvals.title')}</h1>
          <p className="text-muted-foreground mt-1">
            {pendingCount} {t('approvals.pending').toLowerCase()} review{pendingCount !== 1 ? 's' : ''}
          </p>
        </div>
        {selectedItems.length > 0 && (
          <div className="flex items-center gap-2 animate-slide-up">
            <span className="text-sm text-muted-foreground">{selectedItems.length} selected</span>
            <Button variant="success" size="sm" className="gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Approve All
            </Button>
            <Button variant="outline" size="sm" className="gap-2 text-destructive">
              <XCircle className="w-4 h-4" />
              Reject All
            </Button>
          </div>
        )}
      </div>

      {/* Filters & Search */}
      <div className="premium-card p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  filter === status
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary"
                )}
              >
                {status === 'all' ? 'All' : t(`approvals.${status}`)}
                {status === 'pending' && (
                  <span className="ml-2 px-1.5 py-0.5 rounded-full bg-warning/20 text-warning text-xs">
                    {pendingCount}
                  </span>
                )}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search employees..."
                className="h-10 pl-10 pr-4 rounded-lg bg-secondary/50 border-0 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>
        </div>
      </div>

      {/* Approval List */}
      <div className="premium-card overflow-hidden">
        <table className="data-table">
          <thead>
            <tr>
              <th className="w-12">
                <input
                  type="checkbox"
                  checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20"
                />
              </th>
              <th>Employee</th>
              <th>Period</th>
              <th>Projects</th>
              <th className="text-center">Hours</th>
              <th>Status</th>
              <th>Submitted</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item, index) => {
              const StatusIcon = statusConfig[item.status].icon;
              return (
                <tr 
                  key={item.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => toggleSelectItem(item.id)}
                      className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20"
                    />
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <img
                        src={item.employee.avatar}
                        alt={item.employee.name}
                        className="w-10 h-10 rounded-xl object-cover"
                      />
                      <div>
                        <p className="font-medium text-foreground">{item.employee.name}</p>
                        <p className="text-sm text-muted-foreground">{item.employee.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="font-medium text-foreground">{item.period}</td>
                  <td>
                    <div className="flex flex-wrap gap-1">
                      {item.projects.map((project) => (
                        <span
                          key={project}
                          className="px-2 py-1 rounded-md bg-secondary text-xs text-secondary-foreground"
                        >
                          {project}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="text-center">
                    <span className={cn(
                      "font-semibold",
                      item.totalHours > 40 ? "text-warning" : "text-foreground"
                    )}>
                      {item.totalHours}h
                    </span>
                  </td>
                  <td>
                    <span className={cn("status-badge", statusConfig[item.status].class)}>
                      <StatusIcon className="w-3.5 h-3.5" />
                      {statusConfig[item.status].label}
                    </span>
                  </td>
                  <td className="text-muted-foreground text-sm">{item.submittedAt}</td>
                  <td>
                    <div className="flex items-center gap-1 justify-end">
                      <Button variant="ghost" size="icon-sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon-sm">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                      {item.status === 'pending' && (
                        <>
                          <Button variant="success" size="sm" className="ml-2">
                            {t('approvals.approve')}
                          </Button>
                          <Button variant="outline" size="sm" className="text-destructive">
                            {t('approvals.reject')}
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovalQueue;
