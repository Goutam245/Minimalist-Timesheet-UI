import React, { createContext, useContext, useState, useCallback } from 'react';

type Language = 'en' | 'de';

interface Translations {
  [key: string]: {
    en: string;
    de: string;
  };
}

const translations: Translations = {
  // Navigation
  'nav.dashboard': { en: 'Dashboard', de: 'Dashboard' },
  'nav.timeEntry': { en: 'Time Entry', de: 'Zeiterfassung' },
  'nav.weeklyView': { en: 'Weekly View', de: 'Wochenansicht' },
  'nav.dailyView': { en: 'Daily View', de: 'Tagesansicht' },
  'nav.approvals': { en: 'Approvals', de: 'Genehmigungen' },
  'nav.reports': { en: 'Reports', de: 'Berichte' },
  'nav.settings': { en: 'Settings', de: 'Einstellungen' },
  'nav.logout': { en: 'Logout', de: 'Abmelden' },
  
  // Dashboard
  'dashboard.title': { en: 'Dashboard', de: 'Dashboard' },
  'dashboard.welcome': { en: 'Welcome back', de: 'Willkommen zurück' },
  'dashboard.totalHours': { en: 'Total Hours', de: 'Gesamtstunden' },
  'dashboard.thisWeek': { en: 'This Week', de: 'Diese Woche' },
  'dashboard.thisMonth': { en: 'This Month', de: 'Diesen Monat' },
  'dashboard.pendingApprovals': { en: 'Pending Approvals', de: 'Ausstehende Genehmigungen' },
  'dashboard.activeProjects': { en: 'Active Projects', de: 'Aktive Projekte' },
  'dashboard.overtime': { en: 'Overtime', de: 'Überstunden' },
  'dashboard.recentActivity': { en: 'Recent Activity', de: 'Letzte Aktivitäten' },
  'dashboard.quickActions': { en: 'Quick Actions', de: 'Schnellaktionen' },
  
  // Time Entry
  'time.entry': { en: 'Time Entry', de: 'Zeiterfassung' },
  'time.hours': { en: 'Hours', de: 'Stunden' },
  'time.project': { en: 'Project', de: 'Projekt' },
  'time.task': { en: 'Task', de: 'Aufgabe' },
  'time.description': { en: 'Description', de: 'Beschreibung' },
  'time.save': { en: 'Save', de: 'Speichern' },
  'time.submit': { en: 'Submit', de: 'Einreichen' },
  'time.total': { en: 'Total', de: 'Gesamt' },
  
  // Week days
  'day.mon': { en: 'Mon', de: 'Mo' },
  'day.tue': { en: 'Tue', de: 'Di' },
  'day.wed': { en: 'Wed', de: 'Mi' },
  'day.thu': { en: 'Thu', de: 'Do' },
  'day.fri': { en: 'Fri', de: 'Fr' },
  'day.sat': { en: 'Sat', de: 'Sa' },
  'day.sun': { en: 'Sun', de: 'So' },
  
  // Approvals
  'approvals.title': { en: 'Approval Queue', de: 'Genehmigungswarteschlange' },
  'approvals.pending': { en: 'Pending', de: 'Ausstehend' },
  'approvals.approved': { en: 'Approved', de: 'Genehmigt' },
  'approvals.rejected': { en: 'Rejected', de: 'Abgelehnt' },
  'approvals.approve': { en: 'Approve', de: 'Genehmigen' },
  'approvals.reject': { en: 'Reject', de: 'Ablehnen' },
  
  // Reports
  'reports.title': { en: 'Reports', de: 'Berichte' },
  'reports.generate': { en: 'Generate Report', de: 'Bericht erstellen' },
  'reports.export': { en: 'Export', de: 'Exportieren' },
  'reports.dateRange': { en: 'Date Range', de: 'Zeitraum' },
  
  // Settings
  'settings.title': { en: 'Settings', de: 'Einstellungen' },
  'settings.profile': { en: 'Profile', de: 'Profil' },
  'settings.preferences': { en: 'Preferences', de: 'Einstellungen' },
  'settings.language': { en: 'Language', de: 'Sprache' },
  'settings.notifications': { en: 'Notifications', de: 'Benachrichtigungen' },
  'settings.security': { en: 'Security', de: 'Sicherheit' },
  
  // Common
  'common.search': { en: 'Search', de: 'Suchen' },
  'common.filter': { en: 'Filter', de: 'Filtern' },
  'common.add': { en: 'Add', de: 'Hinzufügen' },
  'common.edit': { en: 'Edit', de: 'Bearbeiten' },
  'common.delete': { en: 'Delete', de: 'Löschen' },
  'common.cancel': { en: 'Cancel', de: 'Abbrechen' },
  'common.confirm': { en: 'Confirm', de: 'Bestätigen' },
  'common.loading': { en: 'Loading...', de: 'Laden...' },
  'common.noData': { en: 'No data available', de: 'Keine Daten verfügbar' },
  
  // Login
  'login.title': { en: 'Welcome Back', de: 'Willkommen zurück' },
  'login.subtitle': { en: 'Sign in to your account', de: 'Melden Sie sich bei Ihrem Konto an' },
  'login.email': { en: 'Email', de: 'E-Mail' },
  'login.password': { en: 'Password', de: 'Passwort' },
  'login.signIn': { en: 'Sign In', de: 'Anmelden' },
  'login.forgotPassword': { en: 'Forgot password?', de: 'Passwort vergessen?' },
  'login.rememberMe': { en: 'Remember me', de: 'Angemeldet bleiben' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = useCallback((key: string): string => {
    const translation = translations[key];
    if (!translation) return key;
    return translation[language] || translation.en || key;
  }, [language]);

  const isRTL = false; // German is LTR

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
