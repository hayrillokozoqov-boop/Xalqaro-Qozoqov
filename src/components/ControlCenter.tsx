/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Wifi, Bluetooth, Sun, Volume2, Info, Moon, Settings, 
  Power, Languages, VolumeX, ShieldCheck, ZapOff, Sparkles, X
} from 'lucide-react';

export default function ControlCenter({
  onClose,
  wifiActive,
  onToggleWifi,
  bluetoothActive,
  onToggleBluetooth,
  brightness,
  onBrightnessChange,
  volume,
  onVolumeChange,
  isDark,
  onToggleTheme,
  phoneLang,
  onChangeLang,
  onOpenApp
}: {
  onClose: () => void,
  wifiActive: boolean,
  onToggleWifi: () => void,
  bluetoothActive: boolean,
  onToggleBluetooth: () => void,
  brightness: number,
  onBrightnessChange: (e: number) => void,
  volume: number,
  onVolumeChange: (e: number) => void,
  isDark: boolean,
  onToggleTheme: () => void,
  phoneLang: 'uz' | 'en',
  onChangeLang: () => void,
  onOpenApp: (appId: string) => void
}) {
  return (
    <div className="absolute top-6 inset-x-0 h-[285px] bg-[#121214]/95 border-b border-white/5 backdrop-blur-xl rounded-b-3xl p-4 z-[85] flex flex-col justify-between text-white font-sans text-xs select-none shadow-2xl animate-[slideDown_0.3s_ease-out]">
      {/* Top row */}
      <div className="flex justify-between items-center shrink-0 border-b border-white/5 pb-2">
        <span className="font-extrabold text-[10px] uppercase tracking-widest text-[#00ffcc] flex items-center gap-1.5 leading-none">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Boshqaruv Paneli
        </span>
        <button 
          onClick={onClose}
          className="p-1 rounded-full bg-white/5 hover:bg-white/10 text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Grid of quick switches */}
      <div className="grid grid-cols-4 gap-2 shrink-0 my-2">
        {/* WiFi */}
        <button 
          onClick={onToggleWifi}
          className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-1 cursor-pointer transition ${
            wifiActive ? 'bg-sky-500 text-white shadow-md' : 'bg-white/5 hover:bg-white/10 text-gray-400'
          }`}
        >
          <Wifi className="w-4 h-4" />
          <span className="text-[7px] font-bold uppercase tracking-wider leading-none">WiFi</span>
        </button>

        {/* Bluetooth */}
        <button 
          onClick={onToggleBluetooth}
          className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-1 cursor-pointer transition ${
            bluetoothActive ? 'bg-blue-600 text-white shadow-md' : 'bg-white/5 hover:bg-white/10 text-gray-400'
          }`}
        >
          <Bluetooth className="w-4 h-4" />
          <span className="text-[7px] font-bold uppercase tracking-wider leading-none">BT</span>
        </button>

        {/* Dark theme */}
        <button 
          onClick={onToggleTheme}
          className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-1 cursor-pointer transition ${
            isDark ? 'bg-indigo-600 text-white shadow-md' : 'bg-white/5 hover:bg-white/10 text-gray-400'
          }`}
        >
          <Moon className="w-4 h-4" />
          <span className="text-[7px] font-bold uppercase tracking-wider leading-none">Tema</span>
        </button>

        {/* Language */}
        <button 
          onClick={onChangeLang}
          className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-gray-200 flex flex-col items-center justify-center gap-1 cursor-pointer transition"
        >
          <Languages className="w-4 h-4" />
          <span className="text-[7px] font-bold uppercase tracking-wider leading-none">{phoneLang === 'uz' ? 'UZ' : 'EN'}</span>
        </button>
      </div>

      {/* Sliders for Volume and Brightness */}
      <div className="space-y-2.5 shrink-0 my-1 bg-white/5 p-3 rounded-2xl border border-white/5">
        <div className="flex items-center gap-3">
          <Sun className="w-4 h-4 text-yellow-400 shrink-0" />
          <div className="flex-1 relative flex items-center">
            <input 
              type="range" 
              min="20" 
              max="100" 
              value={brightness}
              onChange={e => onBrightnessChange(parseInt(e.target.value))}
              className="w-full bg-zinc-800 accent-[#00ffcc] h-1 rounded-full outline-none cursor-pointer"
            />
          </div>
          <span className="font-mono text-[8px] font-bold shrink-0">{brightness}%</span>
        </div>

        <div className="flex items-center gap-3">
          <Volume2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <div className="flex-1 relative flex items-center">
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={volume}
              onChange={e => onVolumeChange(parseInt(e.target.value))}
              className="w-full bg-zinc-800 accent-emerald-450 h-1 rounded-full outline-none cursor-pointer"
            />
          </div>
          <span className="font-mono text-[8px] font-bold shrink-0">{volume}%</span>
        </div>
      </div>

      {/* Mini quick access shortcuts */}
      <div className="flex justify-between items-center shrink-0">
        <span className="text-[8px] text-zinc-500 font-bold uppercase tracking-widest flex items-center gap-1 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> system: secured
        </span>
        <button 
          onClick={() => { onOpenApp('settings'); onClose(); }}
          className="text-[8px] font-bold bg-white/5 border border-white/10 hover:bg-white/15 px-3 py-1 rounded"
        >
          Tizim Sozlamalari ⚙️
        </button>
      </div>
    </div>
  );
}
