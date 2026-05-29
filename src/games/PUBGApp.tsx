/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Target, Trophy, Swords, Zap, RefreshCw, Crosshair, HelpCircle, Shield, Sparkles } from 'lucide-react';

export default function PUBGApp() {
  const [gameState, setGameState] = useState<'splash' | 'menu' | 'playing' | 'winner' | 'gameover'>('splash');
  const [landingSection, setLandingSection] = useState('Pochinki');
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(100);
  const [enemyPosition, setEnemyPosition] = useState({ x: 50, y: 50 });
  const [ammo, setAmmo] = useState(30);
  const [weapon, setWeapon] = useState('M416');
  const [feedback, setFeedback] = useState('Xavfli zonaga tushdingiz! Dushmanlarni nishonga o\'ling.');

  // Loading animation simulation
  useEffect(() => {
    if (gameState === 'splash') {
      const interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            setGameState('menu');
            return 100;
          }
          return p + 4;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [gameState]);

  // Handle enemy spawn loops
  useEffect(() => {
    if (gameState === 'playing') {
      const interval = setInterval(() => {
        // Spawn enemy in random spot
        const randX = Math.floor(Math.random() * 80) + 10;
        const randY = Math.floor(Math.random() * 65) + 15;
        setEnemyPosition({ x: randX, y: randY });

        // Enemy shoots user if not eliminated
        setHealth(h => {
          const nextH = h - 12;
          if (nextH <= 0) {
            setGameState('gameover');
            return 0;
          }
          setFeedback('Dushman sizga o\'t ochdi! Tezroq otishingiz lozim.');
          return nextH;
        });
      }, 1800);

      return () => clearInterval(interval);
    }
  }, [gameState]);

  const handleShootEnemy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (ammo <= 0) {
      setFeedback('O\'q tugadi! Qurolni qayta yuklang.');
      return;
    }

    setAmmo(a => a - 1);
    setScore(s => {
      const nextS = s + 1;
      if (nextS >= 10) {
        setGameState('winner');
      }
      return nextS;
    });

    setFeedback('Dushman bartaraf etildi! Qalbingizga omonlik.');
    
    // Instantly respawn in new spot
    setEnemyPosition({
      x: Math.floor(Math.random() * 80) + 10,
      y: Math.floor(Math.random() * 65) + 15
    });
  };

  const reloadWeapon = () => {
    setAmmo(30);
    setFeedback('Qurol qayta yuklandi. O\'t ochishga tayyor!');
  };

  return (
    <div className="flex flex-col h-full bg-zinc-950 text-white font-sans text-xs overflow-hidden select-none">
      {gameState === 'splash' && (
        <div className="flex-1 flex flex-col justify-center items-center p-6 space-y-6 bg-gradient-to-b from-zinc-900 to-black relative">
          <div className="relative w-16 h-16 rounded-xl bg-gradient-to-tr from-amber-600 to-red-650 flex items-center justify-center shadow-2xl border border-amber-500/30">
            <Swords className="w-9 h-9 text-amber-400" />
            <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-600 rounded-full animate-ping" />
          </div>

          <div className="text-center space-y-1.5 animate-[fadeIn_0.5s]">
            <h1 className="text-sm font-bold tracking-widest text-amber-500 uppercase">PUBG MOBILE</h1>
            <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">Antigravity Turbo Engine v12.1</p>
          </div>

          {/* Loading bar */}
          <div className="w-full max-w-[170px] space-y-1.5">
            <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-[8px] text-zinc-600 font-mono text-center">Yuklanmoqda... {progress}%</p>
          </div>
        </div>
      )}

      {gameState === 'menu' && (
        <div className="flex-1 flex flex-col justify-between p-4.5 bg-gradient-to-br from-zinc-900 via-zinc-950 to-amber-950/20">
          <div className="text-center space-y-1 mt-3">
            <h2 className="text-lg font-extrabold tracking-widest text-amber-400">PUBG BATTLEGROUND</h2>
            <p className="text-[10px] text-zinc-400">Desant tushish joyini belgilang</p>
          </div>

          {/* Map hotspots selections */}
          <div className="grid grid-cols-3 gap-2 shrink-0">
            {['Pochinki', 'School', 'Military Base'].map(area => (
              <button
                key={area}
                onClick={() => setLandingSection(area)}
                className={`py-2 px-1.5 border rounded-lg font-bold text-[9px] uppercase tracking-wide transition-all ${
                  landingSection === area 
                    ? 'bg-amber-500 border-amber-400 text-black shadow-lg scale-102' 
                    : 'bg-zinc-900 border-white/10 text-zinc-400 hover:bg-zinc-800'
                }`}
              >
                {area}
              </button>
            ))}
          </div>

          {/* Weapon selection */}
          <div className="space-y-1 bg-zinc-900/40 p-2.5 rounded-lg border border-white/5 shrink-0">
            <span className="text-[8px] text-zinc-500 font-bold uppercase tracking-widest">Qurol turini tanlang</span>
            <div className="grid grid-cols-2 gap-2 mt-1">
              {['M416 (Avtomat)', 'AWM (Mergan)'].map(w => (
                <button
                  key={w}
                  onClick={() => setWeapon(w.split(' ')[0])}
                  className={`py-1 rounded font-bold text-[8px] tracking-wide transition ${
                    weapon === w.split(' ')[0] 
                      ? 'bg-slate-700 text-white' 
                      : 'bg-zinc-800/40 text-zinc-400'
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              setGameState('playing');
              setScore(0);
              setHealth(100);
              setAmmo(30);
            }}
            className="w-full bg-amber-500 hover:bg-amber-600 text-black font-extrabold py-3 rounded-xl shadow-lg shadow-amber-500/20 active:scale-98 uppercase tracking-widest text-[11px] transition"
          >
            JANGNI BOSHLASH ⚔️
          </button>
        </div>
      )}

      {gameState === 'playing' && (
        <div className="flex-1 flex flex-col justify-between relative bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-805 from-zinc-800 to-black">
          {/* Status logs */}
          <div className="p-3 bg-zinc-900/90 border-b border-white/10 flex justify-between items-center shrink-0 z-10 select-none">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <span className="text-red-500 text-xs">♥</span>
                <span className="font-mono font-bold">{health}%</span>
              </div>
              <div className="w-16 h-1.5 bg-zinc-800 rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-red-600" style={{ width: `${health}%` }} />
              </div>
            </div>

            <div className="flex items-center gap-1.5 font-mono">
              <Trophy className="w-3.5 h-3.5 text-yellow-500" />
              <span className="font-bold">{score} / 10 ta</span>
            </div>
          </div>

          {/* Fire Zone Area */}
          <div 
            onClick={() => setAmmo(a => Math.max(0, a - 1))}
            className="flex-1 relative cursor-crosshair overflow-hidden border border-red-500/10"
          >
            <p className="absolute bottom-2 inset-x-0 text-center text-[10px] text-zinc-400 font-semibold italic bg-black/40 py-1">{feedback}</p>

            {/* Target dots representing enemies */}
            <button
              onClick={handleShootEnemy}
              className="absolute w-10 h-10 rounded-full bg-rose-600 border-2 border-red-400 animate-pulse flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-rose-600/50 cursor-pointer hover:scale-105 active:scale-90 transition-all z-10"
              style={{ left: `${enemyPosition.x}%`, top: `${enemyPosition.y}%` }}
            >
              <Target className="w-6 h-6 text-white fill-current animate-ping" />
            </button>
          </div>

          {/* User firearm stats & interaction */}
          <div className="p-3 bg-zinc-950 border-t border-white/10 flex justify-between items-center gap-4 shrink-0 z-10">
            <div className="flex flex-col">
              <span className="text-[8px] text-zinc-500 font-bold uppercase tracking-wider">HUDUD: {landingSection}</span>
              <span className="font-extrabold text-sm text-yellow-500">{weapon}</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right flex flex-col">
                <span className="text-[10px] font-bold text-zinc-400">O'Q DONASI</span>
                <span className="font-mono text-sm font-bold">{ammo} / 30</span>
              </div>
              <button
                onClick={reloadWeapon}
                className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold p-2 px-3 rounded-lg border border-white/5 text-[9px] flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3 text-yellow-300" /> QAYTA
              </button>
            </div>
          </div>
        </div>
      )}

      {gameState === 'winner' && (
        <div className="flex-1 flex flex-col justify-center items-center text-center p-6 bg-gradient-to-br from-amber-700 to-zinc-950 space-y-5">
          <div className="text-4xl animate-bounce">🍗</div>
          <div className="space-y-1.5 animate-[fadeIn_0.5s]">
            <h2 className="text-lg font-extrabold text-yellow-300 tracking-widest uppercase">WINNER WINNER CHICKEN DINNER!</h2>
            <p className="text-[10px] text-gray-300 leading-relaxed font-semibold">Siz jami <span className="font-mono font-bold text-white text-xs">{score} nafar</span> raqibni yengib elita chempioniga aylandingiz.</p>
          </div>
          <button
            onClick={() => setGameState('menu')}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-extrabold px-6 py-2 rounded-full tracking-wider shadow-lg shadow-yellow-500/20 active:scale-95"
          >
            DASHBORD TAFTISH
          </button>
        </div>
      )}

      {gameState === 'gameover' && (
        <div className="flex-1 flex flex-col justify-center items-center text-center p-6 bg-gradient-to-br from-red-900 to-black space-y-5 animate-[fadeIn_0.5s]">
          <div className="text-4xl">💀</div>
          <div className="space-y-1.5">
            <h2 className="text-base font-extrabold text-red-500 tracking-widest uppercase">SIZ BARTARAF ETILDINGIZ!</h2>
            <p className="text-[10px] text-red-200">Afsus, salomatligingiz tugadi va Pochinki zonasi dushmanlariga yutqazdingiz.</p>
          </div>
          <button
            onClick={() => setGameState('menu')}
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded-full tracking-wider shadow-lg cursor-pointer"
          >
            YANGIDAN QAYTA CHIQISH
          </button>
        </div>
      )}
    </div>
  );
}
