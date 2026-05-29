/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Power, Activity, Sparkles, BatteryCharging } from 'lucide-react';

export default function PhoneContainer({
  children,
  batteryCharge,
  isCharge,
  onPlugCharge,
  onCloseScreen,
  isPowerOff
}: {
  children: React.ReactNode,
  batteryCharge: number,
  isCharge: boolean,
  onPlugCharge: () => void,
  onCloseScreen: () => void,
  isPowerOff: boolean
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[580px] p-4.5 bg-slate-900 select-none animate-[fadeIn_0.5s]">
      {/* Visual chassis representation with side volume + power keys */}
      <div className="relative flex items-center justify-center">
        {/* Left volume bars */}
        <div className="absolute left-[-3px] top-[140px] w-[3px] h-[35px] bg-[#27272a] rounded-l" />
        <div className="absolute left-[-3px] top-[185px] w-[3px] h-[35px] bg-[#27272a] rounded-l" />

        {/* Right Power key */}
        <button 
          onClick={onCloseScreen}
          className="absolute right-[-3px] top-[130px] w-[3px] h-[45px] bg-[#27272a] rounded-r hover:bg-zinc-800 focus:outline-none cursor-pointer"
        />

        {/* Shiny Phone Bezel wrapper */}
        <div className="w-[305px] h-[550px] rounded-[42px] border-[10px] border-[#18181b] bg-[#09090b] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] relative flex flex-col overflow-hidden ring-1 ring-white/10 z-10">
          
          {/* Dynamic Speaker notch */}
          <div className="absolute top-[2px] left-1/2 transform -translate-x-1/2 w-28 h-5.5 bg-[#18181b] rounded-b-[18px] z-[200] flex justify-center items-start">
            <div className="w-10 h-1 bg-[#27272a] rounded-full mt-1.5" />
            <div className="w-2.5 h-2.5 bg-[#000] rounded-full border border-white/5 ml-2.5 mt-0.5" />
          </div>

          {/* Internal screens */}
          {isPowerOff ? (
            <div className="flex-1 bg-black flex flex-col justify-center items-center gap-3">
              <Power className="w-8 h-8 text-zinc-700 animate-pulse" />
              <span className="text-[10px] text-zinc-600 font-mono tracking-widest uppercase">UZ PHONE SHUTDOWN</span>
            </div>
          ) : (
            children
          )}

          {/* Home indicator strip */}
          <div className="absolute bottom-[2px] left-1/2 transform -translate-x-1/2 w-24 h-1 bg-white/35 rounded-full z-[200] pointer-events-none" />
        </div>
      </div>

      {/* External Accessory dock button: Plugin charging connector */}
      <div className="mt-4 flex gap-3.5 items-center justify-center text-white text-[10px]">
        <button 
          onClick={onPlugCharge}
          className={`px-4 py-1.5 rounded-full border flex items-center gap-1.5 cursor-pointer shadow transition-all ${
            isCharge ? 'bg-emerald-600 border-emerald-500 text-white font-extrabold' : 'bg-slate-800 border-slate-700 text-zinc-350 hover:bg-slate-700'
          }`}
        >
          <BatteryCharging className="w-3.5 h-3.5" />
          {isCharge ? 'QUVVATLANISH FAOL (' + batteryCharge + '%)' : 'QUVVATLAGICHNI ULASH'}
        </button>
      </div>
    </div>
  );
}
