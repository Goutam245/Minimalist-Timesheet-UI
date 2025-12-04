import React, { useState } from 'react';
import { User, Bell, Shield, Globe, Palette, Mail, Smartphone, Key, Camera, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const SettingsPage: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState('profile');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    weekly: true,
    approvals: true,
  });

  const tabs = [
    { id: 'profile', label: t('settings.profile'), icon: User },
    { id: 'notifications', label: t('settings.notifications'), icon: Bell },
    { id: 'security', label: t('settings.security'), icon: Shield },
    { id: 'preferences', label: t('settings.preferences'), icon: Palette },
  ];

  return (
    <div className="space-y-6 animate-scale-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">{t('settings.title')}</h1>
        <p className="text-muted-foreground mt-1">Manage your account settings and preferences</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Tabs */}
        <div className="w-64 shrink-0">
          <nav className="premium-card p-2 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'profile' && (
            <div className="space-y-6 animate-fade-in">
              <div className="premium-card p-6">
                <h2 className="text-lg font-semibold text-foreground mb-6">Profile Information</h2>
                
                {/* Avatar */}
                <div className="flex items-center gap-6 mb-8">
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
                      alt="Profile"
                      className="w-24 h-24 rounded-2xl object-cover ring-4 ring-primary/20"
                    />
                    <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Sarah Johnson</h3>
                    <p className="text-sm text-muted-foreground">Product Manager</p>
                    <p className="text-xs text-muted-foreground mt-1">Member since January 2024</p>
                  </div>
                </div>

                {/* Form */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
                    <input type="text" defaultValue="Sarah" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
                    <input type="text" defaultValue="Johnson" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <input type="email" defaultValue="sarah.johnson@company.com" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                    <input type="tel" defaultValue="+1 (555) 123-4567" className="input-field" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">Job Title</label>
                    <input type="text" defaultValue="Product Manager" className="input-field" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">Department</label>
                    <select className="input-field">
                      <option>Product</option>
                      <option>Engineering</option>
                      <option>Design</option>
                      <option>Marketing</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end mt-6 pt-6 border-t border-border">
                  <Button>{t('time.save')} Changes</Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6 animate-fade-in">
              <div className="premium-card p-6">
                <h2 className="text-lg font-semibold text-foreground mb-6">Notification Preferences</h2>
                
                <div className="space-y-4">
                  {[
                    { key: 'email', icon: Mail, label: 'Email Notifications', desc: 'Receive updates via email' },
                    { key: 'push', icon: Smartphone, label: 'Push Notifications', desc: 'Receive push notifications on your device' },
                    { key: 'weekly', icon: Bell, label: 'Weekly Summary', desc: 'Get a weekly summary of your time entries' },
                    { key: 'approvals', icon: Check, label: 'Approval Alerts', desc: 'Get notified when your timesheet is approved or rejected' },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                          <item.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{item.label}</p>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }))}
                        className={cn(
                          "w-12 h-7 rounded-full transition-colors relative",
                          notifications[item.key as keyof typeof notifications] ? "bg-primary" : "bg-muted"
                        )}
                      >
                        <div className={cn(
                          "absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform",
                          notifications[item.key as keyof typeof notifications] ? "translate-x-6" : "translate-x-1"
                        )} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6 animate-fade-in">
              <div className="premium-card p-6">
                <h2 className="text-lg font-semibold text-foreground mb-6">Security Settings</h2>
                
                <div className="space-y-6">
                  <div className="p-4 rounded-xl border border-border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                          <Key className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Password</p>
                          <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
                        </div>
                      </div>
                      <Button variant="outline">Change Password</Button>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center text-success">
                          <Shield className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Two-Factor Authentication</p>
                          <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                        </div>
                      </div>
                      <Button variant="success">Enable 2FA</Button>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-destructive/20 bg-destructive/5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-destructive">Delete Account</p>
                        <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                      </div>
                      <Button variant="destructive" className="opacity-60 hover:opacity-100">Delete Account</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="space-y-6 animate-fade-in">
              <div className="premium-card p-6">
                <h2 className="text-lg font-semibold text-foreground mb-6">Display Preferences</h2>
                
                <div className="space-y-6">
                  {/* Language */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">{t('settings.language')}</label>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setLanguage('en')}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors",
                          language === 'en' ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                        )}
                      >
                        <span className="text-2xl">🇬🇧</span>
                        <div className="text-left">
                          <p className="font-medium text-foreground">English</p>
                          <p className="text-xs text-muted-foreground">United States</p>
                        </div>
                        {language === 'en' && <Check className="w-5 h-5 text-primary ml-2" />}
                      </button>
                      <button
                        onClick={() => setLanguage('de')}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors",
                          language === 'de' ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                        )}
                      >
                        <span className="text-2xl">🇩🇪</span>
                        <div className="text-left">
                          <p className="font-medium text-foreground">Deutsch</p>
                          <p className="text-xs text-muted-foreground">Germany</p>
                        </div>
                        {language === 'de' && <Check className="w-5 h-5 text-primary ml-2" />}
                      </button>
                    </div>
                  </div>

                  {/* Time Format */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">Time Format</label>
                    <div className="flex gap-3">
                      <button className="flex items-center gap-2 px-4 py-3 rounded-xl border border-primary bg-primary/5">
                        <span className="font-medium">12-hour</span>
                        <span className="text-sm text-muted-foreground">(2:30 PM)</span>
                        <Check className="w-4 h-4 text-primary ml-2" />
                      </button>
                      <button className="flex items-center gap-2 px-4 py-3 rounded-xl border border-border hover:border-primary/50">
                        <span className="font-medium">24-hour</span>
                        <span className="text-sm text-muted-foreground">(14:30)</span>
                      </button>
                    </div>
                  </div>

                  {/* Week Start */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">Week Starts On</label>
                    <select className="input-field w-64">
                      <option>Monday</option>
                      <option>Sunday</option>
                      <option>Saturday</option>
                    </select>
                  </div>

                  {/* Timezone */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">Timezone</label>
                    <select className="input-field w-full max-w-md">
                      <option>UTC+06:00 - Bangladesh Standard Time (BST)</option>
                      <option>UTC-05:00 - Eastern Time (ET)</option>
                      <option>UTC+00:00 - Greenwich Mean Time (GMT)</option>
                      <option>UTC+01:00 - Central European Time (CET)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
