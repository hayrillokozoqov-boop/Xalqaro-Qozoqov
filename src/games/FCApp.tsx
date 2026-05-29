/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Target, Trophy, Sparkles, RefreshCw, Star, Play, Award } from 'lucide-react';

export default function FCApp() {
  const [gameState, setGameState] = useState<'splash' | 'menu' | 'pk' | 'lootbox'>('splash');
  const [progress, setProgress] = useState(0);
  const [goals, setGoals] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [keeperPos, setKeeperPos] = useState<'left' | 'center' | 'right'>('center');
  const [ballState, setBallState] = useState<'idle' | 'kicked'>('idle');
  const [shootTarget, setShootTarget] = useState<'left' | 'center' | 'right'>('center');
  const [resultMsg, setResultMsg] = useState('To\'pingizni tanlang va darvozabonni aldab gol uring!');
  const [cards, setCards] = useState<Array<{ name: string, ovr: number, team: string }>>([]);

  const cardList = [
    { name: 'Eldor Shomurodov 🇺🇿', ovr: 88, team: 'Uzbekistan' },
    { name: 'Jaloliddin Masharipov 🇺🇿', ovr: 85, team: 'Uzbekistan' },
    { name: 'Abduqodir Husanov 🇺🇿', ovr: 86, team: 'Uzbekistan' },
    { name: 'Cristiano Ronaldo 🇵🇹', ovr: 96, team: 'Portugal' },
    { name: 'Lionel Messi 🇦🇷', ovr: 95, team: 'Argentina' },
    { name: 'Kylian Mbappe 🇫🇷', ovr: 97, team: 'France' }
  ];

  // Splash progress bars
  useEffect(() => {
    if (gameState === 'splash') {
      const interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            setGameState('menu');
            return 100;
          }
          return p + 5;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [gameState]);

  const handleShoot = (target: 'left' | 'center' | 'right') => {
    if (ballState === 'kicked') return;

    setBallState('kicked');
    setShootTarget(target);
    setAttempts(a => a + 1);

    // Keeper AI choice
    const positions: Array<'left' | 'center' | 'right'> = ['left', 'center', 'right'];
    const keeperChoice = positions[Math.floor(Math.random() * positions.length)];
    setKeeperPos(keeperChoice);

    setTimeout(() => {
      if (target === keeperChoice) {
        setResultMsg('Darvozabon qaytardi! Daxshatli seyv.');
      } else {
        setGoals(g => g + 1);
        setResultMsg('GOOOL!!! Koptok darvoza toriga mukammal joylandi!');
      }
    }, 800);
  };

  const resetShootState = () => {
    setBallState('idle');
    setKeeperPos('center');
  };

  const openPlayerPack = () => {
    const randomCard = cardList[Math.floor(Math.random() * cardList.length)];
    setCards([randomCard, ...cards]);
    setGameState('lootbox');
  };

  return (
    <div className="flex flex-col h-full bg-zinc-950 text-white font-sans text-xs overflow-hidden select-none">
      {gameState === 'splash' && (
        <div className="flex-1 flex flex-col justify-center items-center p-6 space-y-6 bg-gradient-to-tr from-emerald-900 to-black relative">
          <div className="relative w-16 h-16 rounded-xl bg-gradient-to-tr from-emerald-600 to-amber-500 flex items-center justify-center shadow-xl border border-emerald-400/20">
            <Trophy className="w-8 h-8 text-yellow-300 animate-pulse" />
          </div>

          <div className="text-center space-y-1.5 animate-[fadeIn_0.5s]">
            <h1 className="text-sm font-bold tracking-widest text-emerald-400 uppercase">EA SPORTS FC 24</h1>
            <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">Antigravity Mobile Engine</p>
          </div>

          <div className="w-full max-w-[170px] space-y-1.5">
            <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-[8px] text-zinc-600 font-mono text-center">Tizim yuklanmoqda... {progress}%</p>
          </div>
        </div>
      )}

      {gameState === 'menu' && (
        <div className="flex-1 flex flex-col justify-between p-4.5 bg-gradient-to-b from-zinc-900 via-zinc-950 to-emerald-950/20">
          <div className="text-center space-y-1 mt-3">
            <h2 className="text-lg font-extrabold tracking-widest text-emerald-400 uppercase">FC MOBILE CODES</h2>
            <p className="text-[10px] text-zinc-400">Pena zarbasi silsilasini bajaring</p>
          </div>

          <div className="bg-zinc-900/40 border border-white/5 p-4 rounded-xl space-y-4 shadow flex flex-col items-center">
            <div className="w-12 h-12 bg-emerald-700/20 border border-emerald-500/20 rounded-full flex items-center justify-center">
              ⚽
            </div>
            <p className="text-center text-[10px] text-zinc-400 px-4 leading-relaxed">
              Penaltini aniq tepib gol urish bo'yicha chempionat zaryadi va daxshat chempionlar kartasini ochib borish!
            </p>
          </div>

          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => {
                setGameState('pk');
                setGoals(0);
                setAttempts(0);
                resetShootState();
              }}
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-black font-extrabold py-3 rounded-xl shadow-lg active:scale-95 uppercase tracking-wide text-[10px] transition"
            >
              PENALTI REJIMI 🎯
            </button>
            <button
              onClick={openPlayerPack}
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-black font-extrabold py-3 rounded-xl shadow-lg active:scale-95 uppercase tracking-wide text-[10px] transition"
            >
              PACK OCHISH CARD 🎁
            </button>
          </div>
        </div>
      )}

      {gameState === 'pk' && (
        <div className="flex-1 flex flex-col relative justify-between bg-gradient-to-b from-sky-900/30 to-emerald-950">
          {/* Header */}
          <div className="p-3 bg-zinc-900/90 border-b border-white/10 flex justify-between items-center shrink-0 z-10 font-mono">
            <span>GOALS: {goals} / {attempts}</span>
            <button 
              onClick={() => setGameState('menu')}
              className="text-[9px] bg-zinc-800 border border-white/10 px-2.5 py-1 rounded text-zinc-400 cursor-pointer text-white"
            >
              Menu
            </button>
          </div>

          {/* Goal Post View Canvas */}
          <div className="flex-1 relative border-b border-emerald-800/40 flex flex-col justify-end items-center">
            {/* Goal Post Structure */}
            <div className="absolute top-4 w-[190px] h-[75px] border-4 border-white/90 border-b-transparent rounded-t relative flex items-end justify-center bg-zinc-900/30">
              <div className="absolute inset-0 bg-[linear-gradient(90deg,_rgba(255,255,255,0.05)_1px,_transparent_1px)] bg-[size:10px_10px]" />
              
              {/* Goalkeeper */}
              <div 
                className="absolute bottom-0 w-8 h-10 bg-rose-600/90 border border-red-400 rounded-b-none rounded-t-lg shadow flex flex-col items-center justify-center transition-all duration-300"
                style={{
                  left: keeperPos === 'left' ? '15px' : keeperPos === 'right' ? '145px' : '82px'
                }}
              >
                <div className="w-3 h-3 bg-amber-300 rounded-full" />
                <span className="text-[7px] font-bold text-white mt-0.5">GK</span>
              </div>
            </div>

            {/* Soccer Ball */}
            <div 
              className={`absolute w-8 h-8 rounded-full bg-white select-none shadow flex items-center justify-center text-lg transition-all duration-700 font-bold border-2 border-slate-900 ${
                ballState === 'kicked' ? 'animate-[bounce_0.8s]' : ''
              }`}
              style={{
                bottom: ballState === 'kicked' ? '65px' : '20px',
                left: ballState === 'kicked' 
                  ? (shootTarget === 'left' ? '70px' : shootTarget === 'right' ? '210px' : '140px')
                  : '140px',
                scale: ballState === 'kicked' ? '0.5' : '1'
              }}
            >
              ⚽
            </div>
          </div>

          {/* Controls Shoot Panels */}
          <div className="bg-zinc-950 p-3.5 border-t border-white/10 flex flex-col gap-3 shrink-0 z-10 text-center">
            <span className="text-[9px] text-zinc-400 font-semibold">{resultMsg}</span>
            {ballState === 'kicked' ? (
              <button 
                onClick={resetShootState}
                className="w-full bg-emerald-500 hover:bg-emerald-600 font-bold py-2 rounded-xl text-black flex items-center justify-center gap-1.5 transition"
              >
                <RefreshCw className="w-3.5 h-3.5" /> QAYTA ZARBA TERISHI
              </button>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {(['left', 'center', 'right'] as const).map(target => (
                  <button
                    key={target}
                    onClick={() => handleShoot(target)}
                    className="bg-zinc-800 hover:bg-zinc-750 font-bold py-2 rounded-xl border border-white/5 text-[9px] uppercase tracking-wide cursor-pointer text-white"
                  >
                    {target === 'left' ? 'CHAPPA ↙' : target === 'right' ? 'O\'NGGA ↘' : 'O\'RTA ⬆'}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {gameState === 'lootbox' && (
        <div className="flex-1 flex flex-col justify-between p-4.5 bg-gradient-to-tr from-amber-900 to-black animate-[fadeIn_0.5s]">
          <div className="text-center mt-3">
            <h2 className="text-sm font-extrabold text-amber-400 uppercase tracking-widest flex items-center gap-1.5 justify-center">
              <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" /> CARD UNLOCKED!
            </h2>
            <p className="text-[9px] text-zinc-500">Iltimos sovg'a o'yinchi cardini oling</p>
          </div>

          {/* Pack Opening Card Deck */}
          {cards.length > 0 && (
            <div className="w-[145px] h-[215px] bg-gradient-to-b from-amber-400 via-amber-500 to-yellow-650 p-3.5 rounded-2xl border-4 border-yellow-300 shadow-2xl relative mx-auto flex flex-col justify-between items-center text-slate-900 font-sans tracking-wide">
              {/* Card attributes */}
              <div className="flex justify-between items-start w-full font-bold">
                <span className="text-xl font-mono leading-none">{cards[0].ovr}</span>
                <span className="text-[7px] uppercase bg-black text-white px-1 py-0.2 rounded leading-none">OVR</span>
              </div>

              {/* Soccer avatar icon representation */}
              <div className="w-16 h-16 bg-white/40 rounded-full border-2 border-white flex items-center justify-center text-4xl shadow-inner relative">
                👤
                <div className="absolute bottom-[-2px] bg-black text-white font-mono text-[7px] font-bold px-1.5 rounded-full border border-yellow-405 leading-none">
                  GOLD
                </div>
              </div>

              {/* Title descriptions */}
              <div className="text-center space-y-1">
                <h4 className="font-extrabold text-[10px] uppercase leading-none text-slate-900 truncate max-w-[125px] ">{cards[0].name.split(' ')[0]}</h4>
                <p className="text-[7px] text-slate-800 font-bold uppercase leading-none">{cards[0].team}</p>
              </div>

              <div className="flex gap-1 justify-center py-1 bg-black/10 w-full rounded text-[8px] font-bold font-mono text-center text-orange-900">
                ★★★★★
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <button
              onClick={openPlayerPack}
              className="flex-grow bg-amber-500 hover:bg-amber-600 text-black font-extrabold py-2.5 rounded-xl text-[9px] transition inline-flex items-center justify-center gap-1.5"
            >
              YANGI CARD OCHISH 🎁
            </button>
            <button
              onClick={() => setGameState('menu')}
              className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-2.5 px-4 rounded-xl text-[9px] tracking-wide"
            >
              Makyob
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
