/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, Users, MailOpen, Settings, Calculator, Image, Compass, CloudSun, 
  FileText, Music, Clock, CalendarDays, MapPin, FolderOpen, Mic, CreditCard, 
  Languages, Activity, QrCode, BookOpen, ShoppingBag, Heart, Paintbrush, 
  HelpCircle, Mail, TrendingUp, Fingerprint, Globe, Play, Pause, Square, Plus, 
  Trash2, Search, Sparkles, Filter, ChevronRight, CheckCircle, Navigation,
  Volume2, VolumeX, Shuffle, RotateCcw, Download, Wifi, HeartHandshake, Eye, Map, Sliders, Check
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Note, Contact } from '../types';

// ==========================================
// 1. NOTES APP
// ==========================================
export function NotesApp() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('phone_notes');
    if (saved) return JSON.parse(saved);
    return [
      { id: '1', title: 'Bozorlik ro\'yxati 🛒', content: '- Osh uchun sabzi, guruch\n- FC Mobile o\'ynash uchun vaqt!\n- Non, yog\'', date: '29.05.2026', color: 'bg-yellow-105' },
      { id: '2', title: 'PUBG Strategiyasi 💣', content: 'Drop tushganda orqadan aylanib o\'tish kerak, jamoa bilan birga harakatlanish muhim.', date: '28.05.2026', color: 'bg-emerald-100' }
    ];
  });
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [noteColor, setNoteColor] = useState('bg-yellow-101');

  useEffect(() => {
    localStorage.setItem('phone_notes', JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = () => {
    if (!title.trim() && !content.trim()) return;
    const newN: Note = {
      id: Math.random().toString(),
      title: title.trim() || 'Sarlavhasiz qayd',
      content: content,
      date: new Date().toLocaleDateString('uz-UZ'),
      color: noteColor
    };
    setNotes([newN, ...notes]);
    setTitle('');
    setContent('');
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
    if (activeNote?.id === id) setActiveNote(null);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-800 font-sans text-xs overflow-hidden">
      <div className="bg-yellow-500 text-white p-3 flex justify-between items-center shrink-0 shadow-sm">
        <span className="font-bold text-sm tracking-wide flex items-center gap-1.5">
          <FileText className="w-4 h-4" /> Eslatmalar
        </span>
        <span className="text-[10px] bg-yellow-600 px-2 py-0.5 rounded-full">{notes.length} ta qayd</span>
      </div>

      <div className="flex-1 flex flex-col overflow-y-auto p-3 gap-3">
        {activeNote ? (
          <div className="flex-1 flex flex-col bg-white border rounded-xl overflow-hidden shadow">
            <div className={`p-3 border-b flex justify-between items-center ${activeNote.color}`}>
              <span className="font-bold text-slate-900 truncate">{activeNote.title}</span>
              <button onClick={() => setActiveNote(null)} className="text-xs text-sky-600 bg-white/80 px-2 py-1 rounded">Yopish</button>
            </div>
            <div className="flex-1 p-3 whitespace-pre-wrap leading-relaxed overflow-y-auto text-slate-700 select-text">
              {activeNote.content}
            </div>
          </div>
        ) : (
          <>
            {/* Create form */}
            <div className="bg-white border p-3 rounded-xl shadow-sm flex flex-col gap-2 shrink-0">
              <input 
                type="text" 
                placeholder="Sarlavha..." 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-100 border border-transparent rounded px-2.5 py-1.5 font-bold outline-none text-slate-800 placeholder-slate-400 focus:border-slate-300"
              />
              <textarea 
                placeholder="Tafsilotlar..." 
                value={content} 
                onChange={(e) => setContent(e.target.value)}
                className="w-full bg-slate-100 border border-transparent rounded px-2.5 py-1.5 h-16 outline-none text-slate-800 placeholder-slate-400 focus:border-slate-300 resize-none"
              />
              <div className="flex justify-between items-center">
                <div className="flex gap-1">
                  {['bg-yellow-101', 'bg-emerald-100', 'bg-sky-100', 'bg-rose-100'].map(c => (
                    <button 
                      key={c}
                      onClick={() => setNoteColor(c)}
                      className={`w-5 h-5 rounded-full border border-slate-300 ${c} ${noteColor === c ? 'ring-2 ring-yellow-500' : ''}`}
                    />
                  ))}
                </div>
                <button 
                  onClick={handleAddNote}
                  className="bg-yellow-500 text-white font-bold px-3 py-1 rounded-lg shadow-sm hover:bg-yellow-600"
                >
                  Qo'shish
                </button>
              </div>
            </div>

            {/* List */}
            <div className="flex flex-col gap-2">
              {notes.map(n => (
                <div 
                  key={n.id} 
                  className={`border rounded-xl p-3 shadow-sm flex justify-between items-start cursor-pointer hover:shadow-md transition text-slate-700 ${n.color || 'bg-white'}`}
                  onClick={() => setActiveNote(n)}
                >
                  <div className="flex-1 min-w-0 pr-2">
                    <h4 className="font-bold text-slate-900 truncate text-xs">{n.title}</h4>
                    <p className="text-[10px] text-slate-600 truncate mt-0.5">{n.content}</p>
                    <span className="text-[9px] text-slate-400 mt-1 block">{n.date}</span>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleDeleteNote(n.id); }}
                    className="p-1 rounded hover:bg-black/10 text-slate-400 hover:text-red-600 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              {notes.length === 0 && (
                <div className="text-center py-6 text-slate-400">Hech qanday qayd yozilmagan.</div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 2. MILLIY BANK APP
// ==========================================
export function BankApp() {
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem('bank_balance');
    return saved ? parseInt(saved) : 2500000; // UZS
  });
  const [cardNumber, setCardNumber] = useState('');
  const [sendAmount, setSendAmount] = useState('');
  const [cardHolder, setCardHolder] = useState('Xayrillo Qozaqov');
  const [transactions, setTransactions] = useState<Array<{ id: string, desc: string, amt: number, date: string, type: 'in' | 'out' }>>([
    { id: '1', desc: 'Sms xizmati faolligi', amt: -1000, date: '29.05.2026', type: 'out' },
    { id: '2', desc: 'Ish haqi to\'lovi', amt: 1200000, date: '28.05.2026', type: 'in' }
  ]);
  const [transferSuccess, setTransferSuccess] = useState(false);

  useEffect(() => {
    localStorage.setItem('bank_balance', balance.toString());
  }, [balance]);

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseInt(sendAmount);
    if (!cardNumber.trim() || isNaN(amt) || amt <= 0 || amt > balance) return;

    setBalance(prev => prev - amt);
    const newTx = {
      id: Math.random().toString(),
      desc: `Karta raqamiga o'tkazma: ...${cardNumber.slice(-4) || 'UZS'}`,
      amt: -amt,
      date: new Date().toLocaleDateString('uz-UZ'),
      type: 'out' as const
    };
    setTransactions([newTx, ...transactions]);
    setCardNumber('');
    setSendAmount('');
    setTransferSuccess(true);
    setTimeout(() => setTransferSuccess(false), 3000);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-white font-sans text-xs overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-600 to-cyan-600 p-3.5 flex justify-between items-center shrink-0">
        <span className="font-bold text-sm flex items-center gap-1.5"><CreditCard className="w-4 h-4 text-cyan-300" /> Human Bank Pay</span>
        <span className="text-[10px] bg-black/30 px-2.5 py-0.5 rounded-full border border-white/20 font-mono">ONLINE</span>
      </div>

      <div className="flex-1 overflow-y-auto p-3.5 flex flex-col gap-4">
        {/* Virtual Card View */}
        <div className="bg-gradient-to-br from-emerald-500 to-indigo-700 p-4 rounded-xl shadow-lg relative overflow-hidden shrink-0 border border-emerald-400/20">
          <div className="absolute right-[-20px] top-[-20px] w-28 h-28 bg-white/5 rounded-full blur-xl" />
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <span className="text-[9px] text-emerald-200 tracking-widest uppercase">UZCARD MILLIY KARTA</span>
              <span className="text-lg font-mono font-bold mt-1 text-white tracking-wide">{balance.toLocaleString('uz-UZ')} UZS</span>
            </div>
            <Sparkles className="w-5 h-5 text-yellow-300" />
          </div>

          <div className="mt-5 flex justify-between items-end font-mono">
            <span className="text-sm">8600 1234 5678 9010</span>
            <div className="flex flex-col text-right">
              <span className="text-[7px] text-gray-300 uppercase">muddat</span>
              <span className="text-[10px] text-white">09/30</span>
            </div>
          </div>
          <p className="text-[10px] text-gray-200 uppercase tracking-wide font-semibold mt-1">{cardHolder}</p>
        </div>

        {transferSuccess && (
          <div className="bg-emerald-500 text-white font-bold p-2.5 rounded-lg text-center animate-bounce text-[10px]">
            💸 Pul muvaffaqiyatli jo'natildi!
          </div>
        )}

        {/* Transfer form */}
        <form onSubmit={handleTransfer} className="bg-slate-800 border border-slate-700/60 p-3.5 rounded-xl flex flex-col gap-3 shrink-0">
          <h4 className="font-bold text-xs text-emerald-400">P2P Karta-Karta O'tkazmalari (0% Komissiya)</h4>
          <div className="flex flex-col gap-1">
            <label className="text-[9px] text-gray-400 font-medium">Karta raqami (16 xonali)</label>
            <input 
              type="text" 
              maxLength={16}
              placeholder="8600 ...." 
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
              className="bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white placeholder-slate-500 text-xs font-mono"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[9px] text-gray-400 font-medium">To'lov miqdori (UZS)</label>
            <input 
              type="number" 
              placeholder="Mablag' miqdori..." 
              value={sendAmount}
              onChange={(e) => setSendAmount(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white placeholder-slate-500 text-xs"
              required
            />
          </div>
          <button 
            type="submit" 
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-1.5 rounded-lg mt-1 tracking-wide shadow-md transition"
          >
            Yuborish (0% Komissiya)
          </button>
        </form>

        {/* Transaction history */}
        <div className="flex flex-col gap-2 flex-1">
          <h4 className="font-bold text-xs text-slate-300">Oxirgi tranzatsiyalar</h4>
          <div className="flex flex-col gap-1.5">
            {transactions.map(t => (
              <div key={t.id} className="bg-slate-850 border border-slate-800/80 p-2.5 rounded-lg flex justify-between items-center text-[10px]">
                <div className="min-w-0 flex flex-col">
                  <span className="font-semibold text-slate-100 truncate">{t.desc}</span>
                  <span className="text-[8px] text-slate-500 mt-0.5">{t.date}</span>
                </div>
                <span className={`font-mono font-bold shrink-0 ${t.type === 'in' ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {t.type === 'in' ? '+' : ''}{t.amt.toLocaleString('uz-UZ')} UZS
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. CALCULATION APP
// ==========================================
export function CalcApp() {
  const [expr, setExpr] = useState('');
  const [result, setResult] = useState('0');

  const handleKey = (key: string) => {
    if (key === 'C') {
      setExpr('');
      setResult('0');
    } else if (key === '=') {
      try {
        // Safe evaluation
        const sanitized = expr.replace(/×/g, '*').replace(/÷/g, '/');
        const res = Function(`"use strict"; return (${sanitized})`)();
        setResult(Number(res).toLocaleString('uz-UZ'));
      } catch (err) {
        setResult('Xato');
      }
    } else {
      setExpr(prev => prev + key);
    }
  };

  return (
    <div className="flex flex-col h-full bg-zinc-950 text-white font-sans text-xs overflow-hidden p-3.5">
      <div className="flex h-24 flex-col justify-end items-end pr-2 overflow-hidden shrink-0">
        <span className="text-zinc-500 text-sm font-mono tracking-widest break-all select-all">{expr || ' '}</span>
        <span className="text-white text-2xl font-bold font-mono tracking-wide mt-1 scrollbar-none truncate select-all">{result}</span>
      </div>

      <div className="grid grid-cols-4 gap-2 mt-4 flex-1">
        {['C', '(', ')', '÷', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', 'delete', '='].map(key => {
          const isOperator = ['÷', '×', '-', '+', '='].includes(key);
          const isAction = ['C', '(', ')', 'delete'].includes(key);

          const renderContent = () => {
            if (key === 'delete') return '⌫';
            return key;
          };

          return (
            <button
              key={key}
              onClick={() => {
                if (key === 'delete') {
                  setExpr(prev => prev.slice(0, -1));
                } else {
                  handleKey(key);
                }
              }}
              className={`rounded-full flex items-center justify-center font-bold text-base cursor-pointer transform hover:scale-105 active:scale-95 transition aspect-square ${
                isOperator ? 'bg-orange-500 text-white hover:bg-orange-600' :
                isAction ? 'bg-zinc-700 text-zinc-200 hover:bg-zinc-600' :
                'bg-zinc-800 text-white hover:bg-zinc-700'
              }`}
            >
              {renderContent()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ==========================================
// 4. MUSIC APP WITH CANVAS VISUALIZER
// ==========================================
export function MusicApp() {
  const tracks = [
    { title: 'O\'zbegim (Classic Tech Remix)', artist: 'Shermat Uzbek', duration: '3:45', stream: 'sc-1' },
    { title: 'Karvon G\'iyos', artist: 'S. Jo\'rayev', duration: '4:15', stream: 'sc-2' },
    { title: 'Tashkent Cyber Synthwave', artist: 'DJSam', duration: '2:50', stream: 'sc-3' },
    { title: 'Chayxona Ambient Mix', artist: 'Milli Chill', duration: '5:02', stream: 'sc-4' }
  ];

  const [activeTrackIdx, setActiveTrackIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(30); // percents
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        setProgress(p => (p >= 100 ? 0 : p + 0.5));
      }, 500);
      return () => clearInterval(timer);
    }
  }, [isPlaying]);

  // Waveform canvas helper
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let angle = 0;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#ec4899'; // pink-500 style

      const barCount = 18;
      const barWidth = 3;
      const spacing = 4;

      for (let i = 0; i < barCount; i++) {
        // dynamic height amplitude based on state
        const amplitude = isPlaying ? Math.sin(angle + i * 0.4) * 15 + 18 : 6;
        const x = i * (barWidth + spacing) + 12;
        const y = canvas.height - amplitude;

        ctx.fillRect(x, y, barWidth, amplitude);
      }
      angle += 0.15;
      animationRef.current = requestAnimationFrame(render);
    };

    render();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying]);

  const track = tracks[activeTrackIdx];

  return (
    <div className="flex flex-col h-full bg-slate-950 text-white font-sans text-xs overflow-hidden relative">
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-pink-900/40 to-transparent pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between p-3.5 border-b border-white/5 bg-black/40 z-10 shrink-0">
        <span className="font-bold text-sm tracking-wide flex items-center gap-1.5 text-pink-400">
          <Music className="w-4 h-4" /> Musiqa Pleyer
        </span>
        <Shuffle className="w-4 h-4 text-gray-400 hover:text-pink-400 cursor-pointer" />
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 items-center justify-center">
        {/* Cover Vinyl disc animation */}
        <div className="relative flex items-center justify-center my-2 shrink-0">
          <div className={`w-32 h-32 rounded-full bg-gradient-to-tr from-pink-600 to-indigo-700 flex items-center justify-center border-4 border-slate-900 shadow-xl relative overflow-hidden ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }}>
            <div className="w-10 h-10 rounded-full bg-slate-950 flex items-center justify-center border-2 border-slate-900 shadow-inner z-10">
              <div className="w-2.5 h-2.5 rounded-full bg-pink-500" />
            </div>
            <div className="absolute inset-2 border border-white/10 rounded-full" />
            <div className="absolute inset-6 border border-white/5 rounded-full" />
          </div>
          <Volume2 className="w-4 h-4 absolute top-1 right-1 text-pink-400 animate-pulse" />
        </div>

        {/* Track Title */}
        <div className="text-center w-full px-4 shrink-0">
          <h2 className="font-bold text-sm text-white truncate drop-shadow">{track.title}</h2>
          <p className="text-[10px] text-gray-400 mt-0.5">{track.artist}</p>
        </div>

        {/* Render Canvas waveform visualizer */}
        <div className="w-36 h-12 bg-black/20 rounded border border-white/5 shrink-0 flex items-center justify-center">
          <canvas ref={canvasRef} width={135} height={40} className="w-full h-full" />
        </div>

        {/* Playback seekbar */}
        <div className="w-full px-2 mt-1 shrink-0 flex flex-col gap-1">
          <div 
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              setProgress(Math.round((clickX / rect.width) * 100));
            }}
            className="w-full h-1.5 bg-slate-800 rounded-full cursor-pointer relative"
          >
            <div className="h-full bg-pink-500 rounded-full" style={{ width: `${progress}%` }} />
            <div className="absolute w-2.5 h-2.5 bg-white border border-pink-500 rounded-full top-[50%] translate-y-[-50%] pointer-events-none" style={{ left: `calc(${progress}% - 5px)` }} />
          </div>
          <div className="flex justify-between text-[8px] text-gray-400 font-mono mt-0.5">
            <span>01:15</span>
            <span>{track.duration}</span>
          </div>
        </div>

        {/* System Audio Player Controls */}
        <div className="flex items-center gap-5 mt-2 shrink-0">
          <button 
            onClick={() => {
              setActiveTrackIdx(p => (p === 0 ? tracks.length - 1 : p - 1));
              setProgress(15);
            }} 
            className="p-1 px-2 hover:bg-white/10 rounded"
          >
            ⏮
          </button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-3 bg-pink-500 hover:bg-pink-600 rounded-full text-white shadow-lg shadow-pink-500/20 active:scale-95 transform transition flex items-center justify-center"
          >
            {isPlaying ? <Pause className="w-4 h-4 text-white fill-current" /> : <Play className="w-4 h-4 text-white fill-current ml-0.5" />}
          </button>
          <button 
            onClick={() => {
              setActiveTrackIdx(p => (p === tracks.length - 1 ? 0 : p + 1));
              setProgress(10);
            }} 
            className="p-1 px-2 hover:bg-white/10 rounded"
          >
            ⏭
          </button>
        </div>

        {/* Playlist selection view */}
        <div className="w-full mt-3 flex-1 flex flex-col gap-1 border-t border-white/5 pt-3 overflow-y-auto">
          {tracks.map((t, i) => (
            <div 
              key={t.stream}
              onClick={() => {
                setActiveTrackIdx(i);
                setProgress(5);
                setIsPlaying(true);
              }}
              className={`flex justify-between items-center px-2.5 py-2 rounded-lg cursor-pointer transition text-[9px] ${activeTrackIdx === i ? 'bg-pink-500/10 text-pink-400 border border-pink-500/10' : 'hover:bg-white/5 text-gray-300'}`}
            >
              <span>{i+1}. {t.title} - <span className="text-gray-400">{t.artist}</span></span>
              <span>{t.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. WEATHER APP
// ==========================================
export function WeatherApp() {
  const cities = [
    { name: 'Toshkent', temp: '28°C', desc: 'Quyoshli, ochiq osmon', wind: '4.5 m/s', dynamic: 'https://images.unsplash.com/photo-1590055531615-f16d36fea8ec?auto=format&fit=crop&w=350&q=80', humidity: '28%', descUz: 'Ajoyib iliq havo tomosha qilish uchun qulay' },
    { name: 'Samarqand', temp: '27°C', desc: 'Yengil havo, sayohatbop', wind: '3.2 m/s', dynamic: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=350&q=80', humidity: '32%', descUz: 'Ziyoratgohlar bo\'ylab aylanadigan mukammal harorat' },
    { name: 'Buxoro', temp: '32°C', desc: 'Issiq shamol, ochiq osmon', wind: '6.1 m/s', dynamic: 'https://images.unsplash.com/photo-1627856013091-fed6e4e30025?auto=format&fit=crop&w=350&q=80', humidity: '18%', descUz: 'Qadimiy minoralar soyasida muzdekkina ob-havo' },
    { name: 'Xiva', temp: '31°C', desc: 'Quyoshli va quruq havo', wind: '4.0 m/s', dynamic: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=350&q=80', humidity: '22%', descUz: 'Ichan Qal\'a tomiga chiqish uchun bulutsiz osmon' }
  ];

  const [activeCityIdx, setActiveCityIdx] = useState(0);
  const data = cities[activeCityIdx];

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-sky-450 to-sky-600 text-white font-sans text-xs overflow-hidden">
      {/* Background card image of beautiful weather environment */}
      <div className="h-28 w-full bg-cover bg-center relative shrink-0" style={{ backgroundImage: `url(${data.dynamic})` }}>
        <div className="absolute inset-0 bg-sky-900/40" />
        <div className="absolute inset-x-3 bottom-2 flex justify-between items-end">
          <div className="flex flex-col">
            <span className="font-bold text-sm text-yellow-300 drop-shadow">{data.name}</span>
            <span className="text-[9px] text-gray-200 drop-shadow">{data.desc}</span>
          </div>
          <span className="text-xl font-bold text-white drop-shadow">{data.temp}</span>
        </div>
      </div>

      {/* Selector pills list */}
      <div className="flex gap-1 p-2 bg-slate-900/35 overflow-x-auto shrink-0 scrollbar-none">
        {cities.map((c, idx) => (
          <button 
            key={c.name}
            onClick={() => setActiveCityIdx(idx)}
            className={`px-3 py-1.5 rounded-full border border-white/10 text-[9px] font-bold shrink-0 transition ${activeCityIdx === idx ? 'bg-sky-500 border-sky-400' : 'bg-black/30 hover:bg-black/40 text-gray-200'}`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Information logs */}
      <div className="flex-1 p-3.5 flex flex-col gap-3 overflow-y-auto">
        <h4 className="font-bold text-xs text-sky-200 uppercase tracking-widest border-b border-white/10 pb-1">Jonli ko'rsatgichlar</h4>
        <div className="grid grid-cols-2 gap-2 text-slate-800 text-[10px]">
          <div className="bg-white border rounded-xl p-3 shadow-sm flex flex-col gap-1">
            <span className="text-slate-400 text-[8px] font-bold">SHAMOL TEZLIGI</span>
            <span className="font-bold text-slate-800">{data.wind}</span>
          </div>
          <div className="bg-white border rounded-xl p-3 shadow-sm flex flex-col gap-1">
            <span className="text-slate-400 text-[8px] font-bold">NAMTAK MUHIT</span>
            <span className="font-bold text-slate-800">{data.humidity}</span>
          </div>
          <div className="bg-white border rounded-xl p-3 shadow-sm flex flex-col gap-1">
            <span className="text-slate-400 text-[8px] font-bold">HAVO SIYOFATI</span>
            <span className="font-bold text-slate-800">Yuqori / Sog'lom</span>
          </div>
          <div className="bg-white border rounded-xl p-3 shadow-sm flex flex-col gap-1">
            <span className="text-slate-400 text-[8px] font-bold">QUYOSH NURI</span>
            <span className="font-bold text-slate-800">Maksimal UV</span>
          </div>
        </div>

        <div className="bg-white/10 border border-white/10 backdrop-blur rounded-xl p-3 mt-1 text-[10px] space-y-1 text-sky-100">
          <p className="font-semibold text-white">Turist tahlili:</p>
          <p className="leading-relaxed text-zinc-100">{data.descUz}</p>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 6. HEALTH APP (SALOMATLIK / STEPPER)
// ==========================================
export function HealthApp() {
  const [steps, setSteps] = useState(() => {
    const saved = localStorage.getItem('health_steps');
    return saved ? parseInt(saved) : 4850;
  });
  const [waterCups, setWaterCups] = useState(() => {
    const saved = localStorage.getItem('health_water');
    return saved ? parseInt(saved) : 3;
  });
  const [heartRate, setHeartRate] = useState(72);

  useEffect(() => {
    localStorage.setItem('health_steps', steps.toString());
  }, [steps]);

  useEffect(() => {
    localStorage.setItem('health_water', waterCups.toString());
  }, [waterCups]);

  // Simulate pulse rate pulse
  useEffect(() => {
    const heartTimer = setInterval(() => {
      setHeartRate(prev => {
        const delta = Math.floor(Math.random() * 5) - 2;
        const target = prev + delta;
        return target < 60 ? 60 : target > 110 ? 110 : target;
      });
    }, 2800);
    return () => clearInterval(heartTimer);
  }, []);

  const progressPercentage = Math.min((steps / 10000) * 100, 100);

  return (
    <div className="flex flex-col h-full bg-emerald-50 text-slate-800 font-sans text-xs overflow-hidden">
      <div className="bg-emerald-600 text-white p-3.5 flex justify-between items-center shrink-0">
        <span className="font-bold text-sm flex items-center gap-1.5"><Activity className="w-4 h-4 text-emerald-300 animate-pulse" /> Salomatlik Markazi</span>
        <span className="text-[8px] bg-emerald-700 px-2 py-0.5 rounded-full font-bold">120 FPS FAST</span>
      </div>

      <div className="flex-1 p-3.5 overflow-y-auto space-y-4">
        {/* Step progress gauge */}
        <div className="bg-white border rounded-xl p-4 shadow-sm flex flex-col items-center justify-center relative">
          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1">Kunlik qadamlar hujjati</span>
          
          <div className="relative w-28 h-28 flex items-center justify-center my-1">
            {/* Round circular ring representation using SVG */}
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="56" cy="56" r="46" stroke="#e2e8f0" strokeWidth="6" fill="transparent" />
              <circle 
                cx="56" 
                cy="56" 
                r="46" 
                stroke="#10b981" 
                strokeWidth="7" 
                fill="transparent" 
                strokeDasharray="290"
                strokeDashoffset={290 - (290 * progressPercentage) / 100}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col justify-center items-center">
              <span className="text-base font-bold text-slate-800">{steps.toLocaleString()}</span>
              <span className="text-[8px] text-slate-400">maqsad: 10,000</span>
            </div>
          </div>

          <button 
            onClick={() => setSteps(s => s + 150)}
            className="mt-2 text-[9px] font-bold bg-emerald-500 text-white px-4 py-1.5 rounded-full hover:bg-emerald-600 active:scale-95 transition flex items-center gap-1"
          >
            <Plus className="w-3 h-3" /> 150 Qadam simulyatsiya
          </button>
        </div>

        {/* Pulse & Water trackers */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Heart rate */}
          <div className="bg-white border rounded-xl p-3 shadow-sm flex flex-col">
            <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">YURAK URISHI</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-base font-bold text-rose-500 font-mono tracking-wider">{heartRate}</span>
              <span className="text-[8px] text-slate-400">BPM</span>
            </div>
            <div className="w-full h-4 bg-rose-50 overflow-hidden relative rounded mt-1.5 flex items-end">
              <span className="absolute inset-0 text-rose-300 font-mono text-[8px] text-center w-full select-none">♥ LIVE WAVE</span>
              <div 
                className="w-full bg-rose-500/20 animate-pulse" 
                style={{ height: `${(heartRate / 130) * 100}%` }} 
              />
            </div>
          </div>

          {/* Water cups tracker */}
          <div className="bg-white border rounded-xl p-3 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">KUNLIK SUV REMINDER</span>
              <div className="flex items-center gap-1.5 mt-1.5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div 
                    key={i} 
                    onClick={() => {
                      if (i < waterCups) {
                        setWaterCups(i);
                      } else {
                        setWaterCups(i + 1);
                      }
                    }}
                    className={`w-3.5 h-5 rounded-sm border cursor-pointer transition ${i < waterCups ? 'bg-sky-400 border-sky-400 shadow-sm' : 'bg-slate-100 border-slate-300 hover:bg-slate-200'}`}
                  />
                ))}
              </div>
            </div>
            <span className="text-[8px] text-slate-400 font-semibold text-right block mt-2">Ichildi: {waterCups * 250} ml</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 7. DIALER PHONE APP
// ==========================================
export function PhoneApp() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isCalling, setIsCalling] = useState(false);
  const [callHistory, setCallHistory] = useState<Array<{ name: string, num: string, time: string }>>([
    { name: 'Onam 🌸', num: '+998901234567', time: 'Bugun 11:15' },
    { name: 'Xayrillo (Coder)', num: '+998991122334', time: 'Kecha 14:02' }
  ]);

  const handleKeyPress = (num: string) => {
    setPhoneNumber(prev => prev + num);
  };

  const handleDial = () => {
    if (!phoneNumber.trim()) return;
    setIsCalling(true);
  };

  const handleEndCall = () => {
    setIsCalling(false);
    const newHistory = {
      name: phoneNumber === '+998901234567' ? 'Onam 🌸' : phoneNumber === '+998991122334' ? 'Xayrillo (Coder)' : 'Noma\'lum',
      num: phoneNumber,
      time: 'Hozirgina'
    };
    setCallHistory([newHistory, ...callHistory]);
    setPhoneNumber('');
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-white font-sans text-xs overflow-hidden">
      {isCalling ? (
        <div className="flex-1 bg-gradient-to-br from-emerald-800 to-slate-900 flex flex-col justify-center items-center p-6 space-y-6">
          <div className="w-18 h-18 bg-white/10 rounded-full flex items-center justify-center border-2 border-white/20 animate-pulse shadow-2xl relative">
            <Phone className="w-8 h-8 text-white fill-current animate-bounce" />
          </div>
          <div className="text-center space-y-1">
            <h2 className="text-base font-bold text-white tracking-wide">Qo'ng'iroq qilinmoqda...</h2>
            <p className="text-xs font-mono text-emerald-300">{phoneNumber}</p>
          </div>
          <button 
            onClick={handleEndCall}
            className="bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold p-3.5 rounded-full shadow-lg h-12 w-12 flex items-center justify-center"
          >
            ❌
          </button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col overflow-y-auto p-3 gap-3">
          <div className="flex flex-col items-center justify-center p-3 shrink-0">
            <input 
              type="text" 
              readOnly 
              placeholder="Raqam..." 
              value={phoneNumber}
              className="bg-transparent text-center text-white text-lg font-mono font-bold tracking-wider outline-none w-full border-b border-white/15 pb-1 focus:border-white/35"
            />
            {phoneNumber && (
              <button onClick={() => setPhoneNumber('')} className="text-[10px] text-zinc-400 hover:text-white mt-1">Tozalash</button>
            )}
          </div>

          {/* Keypad Grid */}
          <div className="grid grid-cols-3 gap-2.5 max-w-[210px] mx-auto shrink-0 my-1">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map(k => (
              <button 
                key={k}
                onClick={() => handleKeyPress(k)}
                className="w-12 h-12 bg-white/10 hover:bg-white/15 text-white rounded-full flex flex-col items-center justify-center text-sm font-semibold active:scale-90 transition font-mono border border-white/5 cursor-pointer shadow-sm"
              >
                {k}
              </button>
            ))}
          </div>

          <div className="flex justify-center shrink-0">
            <button 
              onClick={handleDial}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-7 py-2 rounded-full flex items-center gap-1.5 active:scale-95 shadow-lg tracking-wide transition transform"
            >
              <Phone className="w-4 h-4 fill-current" /> Qo'ng'iroq
            </button>
          </div>

          {/* History */}
          <div className="flex-1 border-t border-white/10 pt-2 flex flex-col gap-1.5 overflow-y-auto">
            <span className="font-semibold text-zinc-400 text-[10px] uppercase">QO'NG'IROQLAR TARIXI</span>
            {callHistory.map((h, i) => (
              <div 
                key={i} 
                onClick={() => setPhoneNumber(h.num)}
                className="flex justify-between items-center bg-slate-900 border border-white/5 hover:bg-slate-850 px-2.5 py-1.5 rounded-lg cursor-pointer transition text-[9px]"
              >
                <div className="flex flex-col">
                  <span className="font-bold text-white mb-0.5">{h.name}</span>
                  <span className="font-mono text-zinc-400 text-[8px]">{h.num}</span>
                </div>
                <span className="text-[8px] text-zinc-400">{h.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 8. ESCAPE ROOM GAME (VIKTORINA)
// ==========================================
export function QuizApp() {
  const questions = [
    { q: 'O\'zbekiston poytaxti qaysi shahar?', a: ['Samarqand', 'Toshkent', 'Buxoro', 'Andijon'], correct: 1 },
    { q: 'Dunyoda birinchi bo\'lib virtual telefon ilovasini kim kashf qildi?', a: ['Steve Jobs', 'Tim Cook', 'AI Studio Coder', 'Jeff Bezos'], correct: 2 },
    { q: 'Yurak urishini aniqlovchi dastur sensori nima uchun xizmat qiladi?', a: ['Zaryad tejash', 'BPM hisoblash', 'Shamol tezlash', 'Musiqa o\'ynash'], correct: 1 },
    { q: 'FC Mobile o\'yinining asosiy maqsadi nima?', a: ['Gollar urish', 'Qurol topish', 'Kitob o\'qish', 'Zikr qilish'], correct: 0 },
    { q: 'Tasbeh counter necha martadan zikr qilishga yordam beradi?', a: ['Faqat 15', 'Faqat 33 va 99', 'Istalgancha', 'Cheklangan 1000'], correct: 2 }
  ];

  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);

  const handleNext = () => {
    if (selectedOpt === null) return;
    if (selectedOpt === questions[idx].correct) setScore(s => s + 1);
    setSelectedOpt(null);

    if (idx + 1 < questions.length) {
      setIdx(idx + 1);
    } else {
      setDone(true);
    }
  };

  return (
    <div className="flex flex-col h-full bg-indigo-900 text-white font-sans text-xs overflow-hidden">
      <div className="bg-indigo-700 p-3.5 flex justify-between items-center shrink-0">
        <span className="font-bold text-xs flex items-center gap-1.5"><HelpCircle className="w-4 h-4" /> Aqlli Viktorina</span>
        <span className="text-[10px] font-bold font-mono text-indigo-200">SAVOL: {idx+1}/{questions.length}</span>
      </div>

      <div className="flex-1 p-4 flex flex-col justify-between overflow-y-auto">
        {done ? (
          <div className="flex-1 flex flex-col justify-center items-center text-center space-y-4">
            <div className="text-3xl">🏆</div>
            <h2 className="font-bold text-sm">O'yin yakunlandi!</h2>
            <p className="text-xs text-indigo-150">Sizning natijangiz: <span className="font-bold font-mono text-yellow-350">{score} ta to'g'ri</span></p>
            <button 
              onClick={() => { setIdx(0); setScore(0); setDone(false); }}
              className="bg-yellow-500 hover:bg-yellow-600 font-bold px-6 py-2 rounded-full shadow-lg cursor-pointer tracking-wider"
            >
              QAYTADAN BOSHLASH
            </button>
          </div>
        ) : (
          <>
            <div>
              <div className="bg-white/10 border border-white/5 p-4 rounded-xl shadow mt-2">
                <p className="text-xs font-semibold leading-relaxed text-indigo-50">{questions[idx].q}</p>
              </div>

              <div className="flex flex-col gap-2.5 mt-5">
                {questions[idx].a.map((opt, i) => (
                  <button 
                    key={i}
                    onClick={() => setSelectedOpt(i)}
                    className={`w-full text-left p-3 rounded-xl border font-medium text-xs transition cursor-pointer flex items-center justify-between ${
                      selectedOpt === i ? 'bg-yellow-505 border-yellow-300 text-white font-bold bg-yellow-600/85' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                    }`}
                  >
                    <span>{opt}</span>
                    {selectedOpt === i && <span className="text-[10px]">✔</span>}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={handleNext}
              disabled={selectedOpt === null}
              className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-indigo-850 disabled:text-indigo-600 py-2.5 rounded-full font-bold shadow-lg transition text-xs mt-4 uppercase tracking-wider"
            >
              Keyingi Savol
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 9. LIBRARIES READER BOOK READING
// ==========================================
export function LibraryApp() {
  const books = [
    { 
      title: 'Zumrad va Qimmat (Folklor)', 
      author: 'O\'zbek Xalq Ertagi',
      pages: [
        'Qadim-qadim zamonlarda bir chol bilan kampir bo\'lgan ekan. Ularning Zumrad ismli oqila, mehnatsevar va Qimmat ismli erka, dangasa qizlari bor ekan.',
        'Zumrad har kuni erta tongda turib hovlilarni suv sepib supurar, sigirlarni sog\'ar va kampirning barcha yumushlarini bajarar ekan. Qimmat esa faqat uxlab, chiroyli kiyimlar kiyish bilan band bo\'lar ekan.',
        'Bir kuni o\'gay ona qush uyasidan Zumradni jazolamoqchi bo\'lib o\'rmonga meva terish uchun yuboradi va uning sarguzashtlari shu tariqa boshlanadi...'
      ]
    },
    { 
      title: 'IT texnologiyalari sirlari', 
      author: 'Xayrillo Qozaqov',
      pages: [
        'Axborot texnologiyalari (IT) modernizatsiya va yuqori samaradorlik kalitidir. Virtual smartfonlar va simulyatorlar yordamida dunyoni kashf etish osonlashadi.',
        'Antigravity OS kabi operatsion tizimlar eng yuqori 120 FPS render chastotasiga asoslanadi va har qanday so\'rovni tanaffussiz, daxshatli tezlikda yuklaydi.',
        'React va Tailwind CSS ning kombinatsiyasi esa platformalarni nafaqat tezkor, balki foydalanuvchilar ko\'zlari uchun o\'ta yumshoq va chiroyli qiladi.'
      ]
    }
  ];

  const [selectedBookIdx, setSelectedBookIdx] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const book = selectedBookIdx !== null ? books[selectedBookIdx] : null;

  return (
    <div className="flex flex-col h-full bg-orange-50 text-slate-800 font-sans text-xs overflow-hidden">
      <div className="bg-amber-700 text-white p-3 flex justify-between items-center shrink-0">
        <span className="font-bold text-xs flex items-center gap-1.5"><BookOpen className="w-4 h-4 text-amber-300" /> Virtual Kutubxona</span>
        {book && <button onClick={() => { setSelectedBookIdx(null); setCurrentPage(0); }} className="text-[10px] bg-amber-800 px-2 py-0.5 rounded text-white font-medium">Kitoblar</button>}
      </div>

      <div className="flex-1 p-3.5 flex flex-col overflow-y-auto justify-between">
        {book ? (
          <>
            <div className="space-y-3.5 select-text">
              <div className="border-b border-amber-200 pb-1 flex justify-between items-end">
                <div>
                  <h3 className="font-bold text-slate-900 leading-tight text-xs">{book.title}</h3>
                  <span className="text-[9px] text-amber-600">{book.author}</span>
                </div>
                <span className="text-[9px] font-mono text-gray-400">VAROQ: {currentPage+1}/{book.pages.length}</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-700 bg-white p-3 rounded-xl border border-amber-100 shadow-sm min-h-[140px]">
                {book.pages[currentPage]}
              </p>
            </div>

            <div className="flex justify-between items-center mt-4">
              <button 
                onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                disabled={currentPage === 0}
                className="bg-amber-700 hover:bg-amber-800 text-white font-bold px-3 py-1.5 rounded-lg text-[9px] disabled:bg-slate-300 disabled:text-slate-500"
              >
                Orqaga
              </button>
              <button 
                onClick={() => setCurrentPage(p => Math.min(book.pages.length - 1, p + 1))}
                disabled={currentPage === book.pages.length - 1}
                className="bg-amber-700 hover:bg-amber-800 text-white font-bold px-3 py-1.5 rounded-lg text-[9px] disabled:bg-slate-300 disabled:text-slate-500"
              >
                Keyingi
              </button>
            </div>
          </>
        ) : (
          <div className="space-y-3">
            <p className="font-bold text-slate-600 text-[10px]">O'QISH UCHUN KITOBLAR ROYXATI:</p>
            <div className="flex flex-col gap-2.5">
              {books.map((b, idx) => (
                <div 
                  key={idx}
                  onClick={() => setSelectedBookIdx(idx)}
                  className="bg-white hover:bg-amber-100/30 border border-amber-200/50 p-3 rounded-xl cursor-pointer shadow-sm transition flex justify-between items-center"
                >
                  <div>
                    <h4 className="font-bold text-slate-800 hover:text-amber-700 text-xs">{b.title}</h4>
                    <span className="text-[9px] text-gray-400 mt-0.5 block">{b.author}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-amber-500" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 10. DIGITAL TASBEEH COUNTER FOR SPIRITUAL
// ==========================================
export function TasbehApp() {
  const [counts, setCounts] = useState(0);
  const [zikrIdx, setZikrIdx] = useState(0);
  const zikrs = [
    'Subhanallah (Alloh pokdir)',
    'Alhamdulillah (Allohga hamd bo\'lsin)',
    'Allahu Akbar (Alloh buyukdir)',
    'La ilaha illallah (Allohdan o\'zga iloh yo\'q)'
  ];

  const handleTouch = () => {
    setCounts(c => c + 1);
  };

  const handleReset = () => {
    setCounts(0);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-white font-sans text-xs overflow-hidden">
      <div className="bg-teal-600 text-white p-3 flex justify-between items-center shrink-0 shadow-sm">
        <span className="font-bold text-xs flex items-center gap-1.5"><Fingerprint className="w-4 h-4" /> Digital Tasbeh</span>
        <button onClick={handleReset} className="text-[10px] bg-teal-700 text-white font-bold px-2 py-0.5 rounded border border-teal-500">Nollash</button>
      </div>

      <div className="flex-1 p-4 flex flex-col justify-between items-center text-center">
        {/* Zikr phrase selectors */}
        <div className="w-full">
          <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest mb-1.5">Tanlangan zikr iborasi</p>
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none justify-center">
            {zikrs.map((z, idx) => (
              <button 
                key={idx}
                onClick={() => { setZikrIdx(idx); setCounts(0); }}
                className={`px-3 py-1.5 rounded-full border text-[8px] font-bold shrink-0 transition ${zikrIdx === idx ? 'bg-teal-500 border-teal-400 text-white' : 'bg-white/5 border-white/10 text-gray-300'}`}
              >
                {z.split(' ')[0]}
              </button>
            ))}
          </div>
          <div className="bg-teal-900/20 border border-teal-500/20 rounded-xl p-3 mt-3 text-teal-400 font-bold font-serif text-[11px] leading-tight select-text">
            {zikrs[zikrIdx]}
          </div>
        </div>

        {/* Big click gauge button */}
        <div className="my-4">
          <div className="text-3xl font-mono tracking-widest font-extrabold text-teal-400 drop-shadow select-all bg-teal-950/40 px-6 py-2 border border-teal-500/10 rounded-full">
            {counts.toLocaleString('uz-UZ')}
          </div>
          <p className="text-[8px] text-zinc-400 mt-1">maqsad: 33 yoki 99</p>
        </div>

        <button 
          onClick={handleTouch}
          className="w-28 h-28 rounded-full bg-gradient-to-tr from-teal-500 to-emerald-600 shadow-xl shadow-teal-500/20 flex items-center justify-center text-sm font-bold active:scale-90 hover:scale-102 transform transition duration-150 border-4 border-slate-900 cursor-pointer text-white"
        >
          BOSING
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 11. TOURISM APP
// ==========================================
export function TourApp() {
  const sights = [
    { 
      name: 'Registon guruhi, Samarqand', 
      img: 'https://images.unsplash.com/photo-1584646098025-e786b3edaebd?auto=format&fit=crop&w=400&q=80',
      desc: 'Registon maydoni XV–XVII asrlarda barpo etilgan uchta muhtasham madrasadan — Ulug\'bek madrasasi, Sherdor madrasasi va Tillaqori madrasasidan iborat Samarqand madaniy merosi obidasidir.' 
    },
    { 
      name: 'Ichan Qal\'a, Xiva', 
      img: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=400&q=80',
      desc: 'Ichan Qal\'a - Markaziy Osiyodagi yaxlit saqlanib qolgan yagona qadimiy ichki shahar obidasidir. Bu yerda Kalta Minor, Ko\'hna Ark va Juma masjidi joylashgan.' 
    },
    { 
      name: 'Ark qal\'asi, Buxoro', 
      img: 'https://images.unsplash.com/photo-1627856013091-fed6e4e30025?auto=format&fit=crop&w=400&q=80',
      desc: 'Ark qal\'asi - milodiy V asrdan boshlab Buxoro amirlarining qasri va hukumat saroyi bo\'lib xizmat qilgan eng yirik tarixiy me\'moriy obidadir.' 
    }
  ];

  const [sightIdx, setSightIdx] = useState(0);

  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-800 font-sans text-xs overflow-hidden">
      <div className="bg-lime-600 text-white p-3 flex justify-between items-center shrink-0">
        <span className="font-bold text-xs flex items-center gap-1.5"><Globe className="w-4 h-4" /> Sayyoh Guide</span>
      </div>

      <div className="flex-1 p-3.5 flex flex-col gap-3 overflow-y-auto">
        <div className="relative aspect-video rounded-xl overflow-hidden shadow">
          <img src={sights[sightIdx].img} alt={sights[sightIdx].name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-slate-900/30" />
          <h2 className="absolute bottom-2 left-3 font-bold text-white text-xs drop-shadow">{sights[sightIdx].name}</h2>
        </div>

        <div className="flex gap-1.5 justify-center">
          {sights.map((s, i) => (
            <button 
              key={i} 
              onClick={() => setSightIdx(i)}
              className={`w-2 h-2 rounded-full ${sightIdx === i ? 'bg-lime-600' : 'bg-slate-300'}`}
            />
          ))}
        </div>

        <div className="bg-white border rounded-xl p-3.5 shadow-sm space-y-1 select-text">
          <p className="font-bold text-slate-900 text-xs">{sights[sightIdx].name}:</p>
          <p className="leading-relaxed text-slate-600">{sights[sightIdx].desc}</p>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 12. CANVAS DRAW PAINT SKETCH
// ==========================================
export function PaintApp() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState('#ec4899');
  const [brushSize, setBrushSize] = useState(4);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas once
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let x, y;
    if ('touches' in e) {
      const rect = canvas.getBoundingClientRect();
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.nativeEvent.offsetX;
      y = e.nativeEvent.offsetY;
    }

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let x, y;
    if ('touches' in e) {
      const rect = canvas.getBoundingClientRect();
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.nativeEvent.offsetX;
      y = e.nativeEvent.offsetY;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDraw = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="flex flex-col h-full bg-slate-100 text-slate-800 font-sans text-xs overflow-hidden">
      <div className="bg-fuchsia-600 text-white p-3 flex justify-between items-center shrink-0">
        <span className="font-bold text-xs flex items-center gap-1.5"><Paintbrush className="w-4 h-4" /> Rasmxona</span>
        <button onClick={clearCanvas} className="text-[10px] bg-red-600 px-2 py-0.5 rounded text-white font-bold">Tozalash</button>
      </div>

      <div className="flex-1 bg-white relative">
        <canvas 
          ref={canvasRef} 
          width={300} 
          height={260} 
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={stopDraw}
          onMouseLeave={stopDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={stopDraw}
          className="w-full h-full cursor-crosshair touch-none"
        />
      </div>

      {/* Control sliders and color wheels */}
      <div className="bg-slate-900 text-white p-3 flex flex-col gap-2 shrink-0 border-t border-slate-800">
        <div className="flex justify-between items-center gap-4">
          <span className="text-[9px] text-zinc-400">BRUSH RADIUS: {brushSize}px</span>
          <input 
            type="range" 
            min="1" 
            max="12" 
            value={brushSize} 
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
            className="flex-1 accent-fuchsia-500 h-1 rounded"
          />
        </div>

        <div className="flex justify-between items-center">
          <span className="text-[9px] text-zinc-400">RANGLAR:</span>
          <div className="flex gap-2">
            {['#ec4899', '#ef4444', '#10b981', '#3b82f6', '#f59e0b', '#000000'].map(c => (
              <button 
                key={c}
                onClick={() => setColor(c)}
                className={`w-6 h-6 rounded-full border border-white/20 transform hover:scale-105 active:scale-90 transition ${color === c ? 'ring-2 ring-white scale-110' : ''}`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 13. VALYUTALAR / EXCHANGE DATA CHART APP
// ==========================================
export function RatesApp() {
  const currentRates = {
    USD: 12650,
    EUR: 13800,
    RUB: 142
  };

  const [selectedCur, setSelectedCur] = useState<'USD' | 'EUR' | 'RUB'>('USD');
  const [inputValue, setInputValue] = useState('100');
  const targetRate = currentRates[selectedCur];

  const calculatedValue = parseFloat(inputValue || '0') * targetRate;

  return (
    <div className="flex flex-col h-full bg-slate-950 text-white font-sans text-xs overflow-hidden">
      <div className="bg-emerald-600 text-white p-3 flex justify-between items-center shrink-0">
        <span className="font-bold text-xs flex items-center gap-1.5"><TrendingUp className="w-4 h-4" /> Valyutalar Kursi</span>
        <span className="text-[9px] font-mono bg-emerald-700 px-2 py-0.5 rounded-full">REALTIME</span>
      </div>

      <div className="flex-1 p-3.5 flex flex-col gap-4 overflow-y-auto justify-between">
        <div className="space-y-3">
          <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest leading-none">TANLANGAN VALYUTA MILLIY BANKIDA</p>
          
          <div className="flex gap-2.5">
            {(['USD', 'EUR', 'RUB'] as const).map(c => (
              <button 
                key={c}
                onClick={() => setSelectedCur(c)}
                className={`flex-1 p-2.5 rounded-xl border text-center transition flex flex-col cursor-pointer ${selectedCur === c ? 'bg-emerald-500/20 border-emerald-400 text-emerald-400 font-bold' : 'bg-white/5 border-white/10 text-gray-300'}`}
              >
                <span className="text-xs">{c}</span>
                <span className="font-mono text-[9px] mt-0.5">{currentRates[c].toLocaleString()} UZS</span>
              </button>
            ))}
          </div>

          {/* Calculator slider input conversion */}
          <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl flex flex-col gap-2 mt-4">
            <h4 className="font-bold text-xs text-emerald-400">Konvertor Kalkulyatori</h4>
            <div className="flex items-center gap-2">
              <input 
                type="number" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="bg-slate-950 border border-slate-700/50 rounded flex-1 px-2.5 py-1 text-white font-mono text-xs"
              />
              <span className="font-mono font-bold text-zinc-300">{selectedCur}</span>
            </div>
            
            <div className="border-t border-slate-800/60 pt-2 flex justify-between items-center mt-1">
              <span className="text-[10px] text-zinc-400 font-semibold">HISOB-KITOB NATIJASI:</span>
              <span className="text-xs font-mono font-bold text-white bg-slate-950 px-2 py-0.5 rounded">{calculatedValue.toLocaleString('uz-UZ')} UZS</span>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/5 rounded-xl p-3.5 text-[9px] leading-relaxed text-zinc-400">
          * Valyuta kursi ma'lumotlari so'nggi live tranzatsiyalar va Antigravity OS va Markaziy bank ma'lumotlari bo'yicha hisoblanadi.
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 14. PLAYMARKET / APPSTORE APP SHOWCASE
// ==========================================
export function MarketApp({ onTriggerNotification }: { onTriggerNotification?: (title: string, body: string) => void }) {
  const [downloadStates, setDownloadStates] = useState<Record<string, 'idle' | 'downloading' | 'completed'>>({});

  const startDownload = (appId: string, name: string) => {
    setDownloadStates(p => ({ ...p, [appId]: 'downloading' }));
    setTimeout(() => {
      setDownloadStates(p => ({ ...p, [appId]: 'completed' }));
      if (onTriggerNotification) onTriggerNotification('📥 Yuklash yakunlandi', `"${name}" ilovasi muvaffaqiyatli telefonga o'rnatildi.`);
    }, 3500);
  };

  const trendingApps = [
    { id: 'kun', name: 'Kun.uz Yangiliklari', category: 'Yangiliklar', rating: '4.8', size: '12 MB', icon: 'FileText' },
    { id: 'pay', name: 'Payme Milliy To\'lov', category: 'Moliya', rating: '4.9', size: '24 MB', icon: 'CreditCard' },
    { id: 'dota', name: 'DOTA Chess Quiz', category: 'O\'yinlar', rating: '4.7', size: '42 MB', icon: 'Award' }
  ];

  return (
    <div className="flex flex-col h-full bg-slate-900 text-white font-sans text-xs overflow-hidden">
      <div className="bg-indigo-600 text-white p-3 flex justify-between items-center shrink-0">
        <span className="font-bold text-xs flex items-center gap-1.5"><ShoppingBag className="w-4 h-4 text-emerald-300" /> Play Bozor</span>
      </div>

      <div className="flex-1 p-3.5 overflow-y-auto space-y-4">
        <h3 className="font-bold text-xs text-pink-400">Tavsiya etiladigan yangi ilovalar</h3>
        <div className="flex flex-col gap-2.5">
          {trendingApps.map(a => (
            <div key={a.id} className="bg-slate-850 border border-slate-800 p-3 rounded-xl flex justify-between items-center shadow-sm">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-10 h-10 bg-indigo-500/10 border border-indigo-500/10 text-indigo-400 rounded-lg flex items-center justify-center font-bold">
                  {a.name[0]}
                </div>
                <div className="min-w-0 flex flex-col">
                  <span className="font-bold text-slate-100 truncate text-[11px]">{a.name}</span>
                  <span className="text-[9px] text-zinc-400 mt-0.5">{a.category} • ★{a.rating}</span>
                </div>
              </div>

              <button 
                onClick={() => startDownload(a.id, a.name)}
                disabled={downloadStates[a.id] !== undefined}
                className={`text-[9px] font-bold px-3.5 py-1 rounded-full shadow transition-all ${
                  downloadStates[a.id] === 'downloading' ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed' :
                  downloadStates[a.id] === 'completed' ? 'bg-emerald-500 text-white cursor-not-allowed' :
                  'bg-sky-500 hover:bg-sky-600 text-white cursor-pointer'
                }`}
              >
                {downloadStates[a.id] === 'downloading' ? 'Yuklanmoqda...' :
                 downloadStates[a.id] === 'completed' ? 'O\'rnatildi' : 'Yuklash'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
