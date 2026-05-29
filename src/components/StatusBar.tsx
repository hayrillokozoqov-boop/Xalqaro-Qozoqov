/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Wifi, Battery, BatteryCharging, Signal, Bluetooth } from 'lucide-react';

export default function StatusBar({ batteryCharge, isCharge }: { batteryCharge: number, isCharge: boolean }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex h-6 justify-between items-center px-4.5 bg-black/30 backdrop-blur-sm text-white text-[9px] font-semibold tracking-wide select-none z-[100] shrink-0">
      {/* Time */}
      <span className="font-mono font-bold tracking-wider">{time}</span>

      {/* Signals & Battery */}
      <div className="flex items-center gap-1.5 font-mono">
        <Signal className="w-3 h-3 text-white fill-current" />
        <span className="text-[8px] uppercase font-bold tracking-tight">5G</span>
        <Wifi className="w-3 h-3 text-white fill-current" />
        <Bluetooth className="w-3 h-3 text-white fill-current" />
        
        <div className="flex items-center gap-0.5">
          <span className="text-[8px] font-bold">{batteryCharge}%</span>
          {isCharge ? (
            <BatteryCharging className="w-3.5 h-3.5 text-emerald-450 text-emerald-400" />
          ) : (
            <Battery className="w-3.5 h-3.5 text-white" />
          )}
        </div>
      </div>
    </div>
  );
}
