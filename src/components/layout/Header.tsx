import React from 'react';
import { Bell, Search, Globe, Moon, Sun, Plus } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeaderProps {
  sidebarCollapsed: boolean;
}

const Header: React.FC<HeaderProps> = ({ sidebarCollapsed }) => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header 
      className={cn(
        "fixed top-0 right-0 h-16 bg-card/80 backdrop-blur-xl border-b border-border z-40 transition-all duration-300",
        sidebarCollapsed ? "left-20" : "left-64"
      )}
    >
      <div className="h-full px-6 flex items-center justify-between">
        {/* Search */}
        <div className="relative w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={t('common.search')}
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-secondary/50 border-0 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Quick Add */}
          <Button size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">{t('common.add')}</span>
          </Button>

          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'de' : 'en')}
            className="lang-toggle"
          >
            <Globe className="w-4 h-4" />
            <span>{language === 'en' ? 'EN' : 'DE'}</span>
          </button>

          {/* Notifications */}
          <button className="relative w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center hover:bg-secondary transition-colors">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-destructive" />
          </button>

          {/* User Avatar */}
          <div className="flex items-center gap-3 pl-3 border-l border-border">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-foreground">Sarah Johnson</p>
              <p className="text-xs text-muted-foreground">Product Manager</p>
            </div>
            <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-primary/20">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
