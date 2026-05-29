/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Lock, Unlock, Phone, Sparkles, MessageSquare, Bell } from 'lucide-react';
import { PhoneNotification } from '../types';

export default function LockScreen({ 
  onUnlock, 
  wallpaper,
  notifications,
  onOpenShortcut
}: { 
  onUnlock: () => void, 
  wallpaper: string,
  notifications: PhoneNotification[],
  onOpenShortcut: (appId: string) => void
}) {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }));
      setDate(now.toLocaleDateString('uz-UZ', { weekday: 'long', day: 'numeric', month: 'long' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      className="absolute inset-0 bg-cover bg-center flex flex-col justify-between p-6 z-[90] font-sans overflow-hidden select-none animate-[fadeIn_0.5s]"
      style={{ backgroundImage: `url(${wallpaper})` }}
    >
      <div className="absolute inset-0 bg-black/35 backdrop-blur-[3px]" />

      {/* Top Lock Badge & Clock */}
      <div className="relative z-10 text-center space-y-1 mt-6">
        <Lock className="w-4 h-4 text-white/70 mx-auto animate-pulse" />
        <h1 className="text-4xl font-light tracking-wide text-white drop-shadow-md font-sans">{time}</h1>
        <p className="text-[10px] uppercase font-bold tracking-widest text-[#00ffcc] drop-shadow-sm">{date}</p>
      </div>

      {/* Middle Lockscreen Notifications */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-h-[175px] overflow-y-auto gap-2.5 my-3 px-1 scrollbar-none">
        {notifications.map(n => (
          <div 
            key={n.id}
            onClick={() => onOpenShortcut(n.appIcon === 'MessageSquareText' ? 'telegram' : 'messages')}
            className="bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/5 rounded-2xl p-3 flex gap-3 text-white cursor-pointer hover:scale-[1.02] transform transition duration-150 shadow"
          >
            <div className={`w-8 h-8 rounded-xl ${n.appColor} flex items-center justify-center font-bold text-sm shrink-0`}>
              💬
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex justify-between items-center mb-0.5">
                <span className="font-bold text-[10px] tracking-wide text-emerald-300 leading-none truncate uppercase">{n.appName}</span>
                <span className="text-[8px] text-zinc-350 shrink-0">{n.time}</span>
              </div>
              <p className="font-bold text-[10px] text-white truncate leading-none mt-1">{n.title}</p>
              <p className="text-[9px] text-zinc-200 mt-0.5 truncate leading-tight">{n.body}</p>
            </div>
          </div>
        ))}
        {notifications.length === 0 && (
          <div className="text-center text-[9px] text-zinc-400 italic">Hech qanday xabar yo'q.</div>
        )}
      </div>

      {/* Bottom sliding unlock area */}
      <div className="relative z-10 text-center space-y-5 mb-4">
        <div className="flex justify-between items-center px-6 text-white text-xs">
          <button 
            onClick={() => onOpenShortcut('flashlight')}
            className="p-3 bg-white/10 hover:bg-white/20 active:scale-95 rounded-full backdrop-blur-md border border-white/5 shadow-md flex items-center justify-center transition"
          >
            🔦
          </button>
          <button 
            onClick={() => onOpenShortcut('camera')}
            className="p-3 bg-white/10 hover:bg-white/20 active:scale-95 rounded-full backdrop-blur-md border border-white/5 shadow-md flex items-center justify-center transition"
          >
            📷
          </button>
        </div>

        <button 
          onClick={onUnlock}
          className="w-full bg-white/15 hover:bg-white/20 border border-white/10 backdrop-blur-md py-2.5 rounded-full flex items-center justify-center gap-2 transform active:scale-98 transition shadow-lg text-white font-bold text-[10px] uppercase tracking-widest cursor-pointer hover:border-white/20"
        >
          <Unlock className="w-3.5 h-3.5 text-[#00ffcc] fill-current animate-bounce" /> Ekran Qulfini Ochish
        </button>
      </div>
    </div>
  );
}
