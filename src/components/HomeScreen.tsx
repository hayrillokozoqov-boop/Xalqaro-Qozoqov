/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  MessageSquareText, Play, Phone, Users, MailOpen, Settings, Calculator, 
  Image, Compass, CloudSun, FileText, Music, Clock, CalendarDays, MapPin, 
  FolderOpen, Mic, CreditCard, Languages, Activity, QrCode, BookOpen, 
  ShoppingBag, Heart, Paintbrush, HelpCircle, Mail, TrendingUp, Fingerprint, 
  Globe, Bomb, Trophy, Award, Train, Boxes, Grid, X, Hash, RotateCcw, Bird, Sun,
  Search, Sliders, ChevronDown
} from 'lucide-react';
import { AppConfig } from '../types';

// Map icon strings to actual Lucide components
const IconMap: Record<string, React.ComponentType<any>> = {
  MessageSquareText, Play, Phone, Users, MailOpen, Settings, Calculator, 
  Image, Compass, CloudSun, FileText, Music, Clock, CalendarDays, MapPin, 
  FolderOpen, Mic, CreditCard, Languages, Activity, QrCode, BookOpen, 
  ShoppingBag, Heart, Paintbrush, HelpCircle, Mail, TrendingUp, Fingerprint, 
  Globe, Bomb, Trophy, Award, Train, Boxes, Grid, X, Hash, RotateCcw, Bird, Sun
};

export default function HomeScreen({
  apps,
  onLaunchApp,
  onPullControlCenter,
  phoneLang
}: {
  apps: AppConfig[],
  onLaunchApp: (appId: string) => void,
  onPullControlCenter: () => void,
  phoneLang: 'uz' | 'en'
}) {
  const [activeTab, setActiveTab] = useState<'all' | 'apps' | 'games'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = apps.filter(app => {
    // Search matching
    const matchesSearch = 
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      app.uzName.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    // Tab matching
    if (activeTab === 'apps') return app.category === 'app';
    if (activeTab === 'games') return app.category === 'game';
    return true;
  });

  // Dock items
  const dockApps = apps.filter(a => ['phone', 'browser', 'telegram', 'youtube'].includes(a.id));

  return (
    <div className="flex-1 flex flex-col justify-between p-3.5 relative overflow-hidden font-sans text-xs">
      {/* Search & Top Action Pull Bar */}
      <div className="shrink-0 space-y-2.5 z-10">
        <div className="flex items-center gap-2">
          {/* Mock Pull down indicator to open Control Center */}
          <button 
            onClick={onPullControlCenter}
            className="flex-1 bg-white/10 hover:bg-white/15 border border-white/5 backdrop-blur py-1.5 rounded-full flex justify-center items-center gap-1 cursor-pointer"
          >
            <div className="w-8 h-1 bg-white/40 rounded-full animate-bounce" />
          </button>
        </div>

        {/* Input Bar */}
        <div className="relative">
          <input 
            type="text"
            placeholder={phoneLang === 'uz' ? 'Ilova yoki o\'yin qidirish...' : 'Search apps or games...'}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-white/10 border border-white/5 pl-8 pr-3 py-1.5 rounded-full text-white placeholder-white/50 text-[10px] backdrop-blur outline-none focus:bg-white/15 focus:border-white/15"
          />
          <Search className="w-3.5 h-3.5 text-white/50 absolute left-2.5 top-2" />
        </div>

        {/* Tabs picker */}
        <div className="flex gap-1 bg-black/25 p-0.5 rounded-full border border-white/5 backdrop-blur select-none text-[8px] font-bold">
          {[
            { id: 'all', label: phoneLang === 'uz' ? 'BARCHA' : 'ALL' },
            { id: 'apps', label: phoneLang === 'uz' ? '30ta ILOVA' : '30 APPS' },
            { id: 'games', label: phoneLang === 'uz' ? '10ta O\'YIN' : '10 GAMES' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-grow py-1 rounded-full transition uppercase ${activeTab === tab.id ? 'bg-white/15 text-white font-extrabold shadow-sm' : 'text-white/60 hover:text-white'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid view of all Icons */}
      <div className="flex-1 overflow-y-auto px-1 py-3 my-2 scrollbar-none">
        <div className="grid grid-cols-4 gap-3 justify-items-center">
          {filtered.map(app => {
            const IconComponent = IconMap[app.icon] || Grid;
            return (
              <button
                key={app.id}
                onClick={() => onLaunchApp(app.id)}
                className="flex flex-col items-center gap-1.5 w-14 cursor-pointer group transform hover:scale-[1.08] active:scale-[0.93] transition duration-150 relative select-none"
              >
                {/* Visual Icon card wrapper */}
                <div className={`w-11 h-11 rounded-xl shadow-md border border-white/5 flex items-center justify-center transition group-hover:shadow-lg ${app.color}`}>
                  <IconComponent className="w-5.5 h-5.5 text-white stroke-2" />
                </div>
                <span className="text-[8px] leading-tight text-white drop-shadow font-medium tracking-wide text-center truncate w-full">
                  {phoneLang === 'uz' ? app.uzName : app.name}
                </span>
              </button>
            );
          })}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-10 text-white/45 italic text-[10px]">Ilova topilmadi.</div>
        )}
      </div>

      {/* Bottom Shiny Sticky Dock icons */}
      <div className="bg-white/10 border border-white/5 backdrop-blur-md rounded-2xl p-2 px-3 flex justify-between items-center gap-2.5 shadow-xl shrink-0 z-10 my-1">
        {dockApps.map(app => {
          const IconComponent = IconMap[app.icon] || Grid;
          return (
            <button
              key={app.id}
              onClick={() => onLaunchApp(app.id)}
              className="flex-1 flex flex-col items-center gap-1 cursor-pointer transform hover:scale-108 active:scale-92 transition"
            >
              <div className={`w-10 h-10 rounded-xl shadow border border-white/5 flex items-center justify-center ${app.color}`}>
                <IconComponent className="w-5 h-5 text-white" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
