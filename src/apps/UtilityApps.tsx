/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, Users, Mail, Compass, Clock, Calendar, Map, Folder, Mic, QrCode, 
  Heart, Sun, Star, Trash2, Plus, Phone, MessageSquare, Search, Play, Pause,
  Share2, Shield, Info, ArrowLeft, RotateCcw, Power, Moon, Check, ChevronRight
} from 'lucide-react';
import { Contact } from '../types';

// ==========================================
// 1. CAMERA APP
// ==========================================
export function CameraApp() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [streamActive, setStreamActive] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [filter, setFilter] = useState(''); // grayscale, sepia, invert

  useEffect(() => {
    async function startCam() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setStreamActive(true);
        }
      } catch (err) {
        console.warn('Camera access denied or unavailable, using mock rendering.', err);
        setStreamActive(false);
      }
    }
    startCam();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  const capturePhoto = () => {
    if (streamActive && videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.filter = filter;
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        setPhoto(canvas.toDataURL('image/png'));
      }
    } else {
      // Mock captured photo
      setPhoto('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=480&q=80');
    }
  };

  return (
    <div className="flex flex-col h-full bg-black text-white font-sans text-xs overflow-hidden">
      <div className="bg-zinc-900 px-3.5 py-2.5 flex justify-between items-center shrink-0 border-b border-white/5">
        <span className="font-bold flex items-center gap-1.5"><Camera className="w-4 h-4 text-rose-500" /> Kamera UZ</span>
        {photo && <button onClick={() => setPhoto(null)} className="text-[10px] bg-sky-600 px-2.5 py-0.5 rounded text-white font-bold">Rasmxona</button>}
      </div>

      <div className="flex-1 relative flex items-center justify-center bg-zinc-950 overflow-hidden">
        {photo ? (
          <img src={photo} alt="captured" className="w-full h-full object-cover" style={{ filter }} />
        ) : (
          <>
            {streamActive ? (
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover transform scale-x-[-1]" style={{ filter }} />
            ) : (
              <div className="text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center mx-auto text-zinc-500 animate-pulse">
                  📷
                </div>
                <div>
                  <p className="text-zinc-300 font-bold">Jonli kamera topilmadi</p>
                  <p className="text-zinc-500 text-[10px] mt-1">Smartfoningiz kamerasidan rasm simulyatsiyasi uchun tayyor.</p>
                </div>
              </div>
            )}
            <div className="absolute top-2.5 left-2.5 bg-black/60 px-2 py-0.5 rounded border border-white/10 text-[8px] font-mono tracking-widest text-[#00ffcc]">
              REC
            </div>
          </>
        )}
      </div>

      {/* Camera shutter panel */}
      <div className="bg-zinc-950 p-3.5 border-t border-white/5 flex flex-col gap-3 shrink-0">
        {!photo && (
          <div className="flex gap-2 overflow-x-auto justify-center pb-1 scrollbar-none">
            {[{ name: 'Asliy', f: '' }, { name: 'Sepiya', f: 'sepia(80%)' }, { name: 'Qoramtir', f: 'grayscale(100%)' }, { name: 'Invert', f: 'invert(90%)' }].map(item => (
              <button 
                key={item.name}
                onClick={() => setFilter(item.f)}
                className={`px-3 py-1 rounded-full border text-[9px] font-bold ${filter === item.f ? 'bg-rose-500 border-rose-400 text-white' : 'bg-zinc-900 border-white/10 text-zinc-400'}`}
              >
                {item.name}
              </button>
            ))}
          </div>
        )}

        <div className="flex justify-center items-center my-1.5">
          {photo ? (
            <div className="text-center text-[10px] text-zinc-400">Rasm galereyaga muvaffaqiyatli saqlandi!</div>
          ) : (
            <button 
              onClick={capturePhoto}
              className="w-12 h-12 rounded-full border-4 border-zinc-700 bg-white hover:bg-zinc-200 active:scale-90 transition-all shadow-lg flex items-center justify-center cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-rose-600" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. CONTACTS MANAGEMENT APP
// ==========================================
export function ContactsApp({ onSelectNumber }: { onSelectNumber?: (phone: string) => void }) {
  const [contacts, setContacts] = useState<Contact[]>([
    { id: '1', name: 'Ali (Maktab do\'stim)', phone: '+998991122334', email: 'ali_uz@gmail.com', favorite: true },
    { id: '2', name: 'Onam 🌸', phone: '+998901234567', email: 'onajonim@mail.uz', favorite: true },
    { id: '3', name: 'Laylo PUBG Team', phone: '+998934567890', email: 'laylo_pro@gmail.com', favorite: false },
    { id: '4', name: 'Vali FC Mobile', phone: '+998941235678', email: 'vali_chelsea@gmail.com', favorite: false },
    { id: '5', name: 'Hamid DLS Expert', phone: '+998918889900', email: 'hamidjon@mail.ru', favorite: false }
  ]);

  const [search, setSearch] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [showAdd, setShowAdd] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const newC: Contact = {
      id: Math.random().toString(),
      name: name.trim(),
      phone: phone,
      email: email.trim() || 'info@gmail.com',
      favorite: false
    };

    setContacts([newC, ...contacts]);
    setName('');
    setPhone('');
    setEmail('');
    setShowAdd(false);
  };

  const filtered = contacts.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-800 font-sans text-xs overflow-hidden">
      <div className="bg-amber-500 text-white p-3.5 flex justify-between items-center shrink-0">
        <span className="font-bold text-sm flex items-center gap-1.5"><Users className="w-4 h-4" /> Kontaktlar</span>
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className="text-[10px] bg-amber-600 font-bold px-3 py-1 rounded-lg border border-amber-400 text-white flex items-center gap-1"
        >
          {showAdd ? 'Bekor' : <Plus className="w-3 h-3" />}
        </button>
      </div>

      <div className="flex-1 p-3.5 flex flex-col gap-3 overflow-y-auto">
        {showAdd ? (
          <form onSubmit={handleAdd} className="bg-white border p-3.5 rounded-xl shadow flex flex-col gap-2.5">
            <h4 className="font-bold text-xs text-amber-600 border-b border-slate-100 pb-1">Yangi Kontakt Qo'shish</h4>
            <input 
              type="text" 
              placeholder="Ism sharif..." 
              value={name} 
              onChange={e => setName(e.target.value)}
              className="w-full bg-slate-100 border border-transparent rounded px-2.5 py-1.5 font-semibold text-slate-800"
              required
            />
            <input 
              type="text" 
              placeholder="Telefon raqam..." 
              value={phone} 
              onChange={e => setPhone(e.target.value)}
              className="w-full bg-slate-100 border border-transparent rounded px-2.5 py-1.5 font-mono text-slate-800"
              required
            />
            <input 
              type="email" 
              placeholder="Email (ixtiyoriy)..." 
              value={email} 
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-slate-100 border border-transparent rounded px-2.5 py-1.5 text-slate-800"
            />
            <button type="submit" className="bg-amber-550 bg-amber-500 text-white font-bold py-1.5 rounded-lg text-xs mt-1">SAQLASH</button>
          </form>
        ) : (
          <>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Kontaktlardan qidirish..." 
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-slate-100 border border-transparent pl-8 pr-3 py-1.5 text-xs rounded-lg text-slate-800"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>

            <div className="flex flex-col gap-2">
              {filtered.map(c => (
                <div key={c.id} className="bg-white border rounded-xl p-3 shadow-sm flex justify-between items-center hover:shadow-md transition">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-white font-bold flex items-center justify-center text-xs">
                      {c.name[0]}
                    </div>
                    <div className="min-w-0 flex flex-col">
                      <span className="font-bold text-slate-900 truncate flex items-center gap-1 text-xs">
                        {c.name} {c.favorite && <span className="text-yellow-500">★</span>}
                      </span>
                      <span className="font-mono text-[9px] text-zinc-500 mt-0.5">{c.phone}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => onSelectNumber && onSelectNumber(c.phone)}
                      className="p-1.5 rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-200"
                    >
                      <Phone className="w-3.5 h-3.5 fill-current" />
                    </button>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="text-center py-6 text-slate-400">Kontaktlar topilmadi.</div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 3. SMS MESSAGES APP
// ==========================================
export function SmsApp() {
  const [threads, setThreads] = useState([
    { id: '1', name: 'Onam 🌸', latest: 'Bolajonim, darsing tugadimi? Uyga tezroq kel.', time: '11:15', messages: [
      { id: 'm1', sender: 'them', text: 'Salom, darsda emasmisan? Zaryadka olib kelgin.', time: '10:00' },
      { id: 'm2', sender: 'me', text: 'Xo\'p bo\'ladi onajon, hozir boraman.', time: '10:15' },
      { id: 'm3', sender: 'them', text: 'Bolajonim, darsing tugadimi? Uyga tezroq kel.', time: '11:15' }
    ]},
    { id: '2', name: 'Ali (Do\'st)', latest: 'Men PUBGdamiz, tezroq kir bro!', time: '10:45', messages: [
      { id: 'a1', sender: 'them', text: 'Do\'stim bugun kiber chempionat ekan.', time: '09:00' },
      { id: 'a2', sender: 'me', text: 'Biz tayyormiz, jamoa ham yig\'ildi.', time: '09:30' },
      { id: 'a3', sender: 'them', text: 'Men PUBGdamiz, tezroq kir bro!', time: '10:45' }
    ]}
  ]);

  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [val, setVal] = useState('');

  const thread = threads.find(t => t.id === activeThreadId);

  const handleSend = () => {
    if (!val.trim() || !activeThreadId) return;
    const newM = {
      id: Math.random().toString(),
      sender: 'me',
      text: val.trim(),
      time: 'Hozir'
    };

    setThreads(prev => prev.map(t => {
      if (t.id === activeThreadId) {
        return {
          ...t,
          latest: val.trim(),
          time: 'Hozir',
          messages: [...t.messages, newM]
        };
      }
      return t;
    }));
    setVal('');
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-800 font-sans text-xs overflow-hidden">
      <div className="bg-blue-600 text-white p-3 flex justify-between items-center shrink-0">
        <span className="font-bold text-xs flex items-center gap-1.5"><Mail className="w-5 h-5 text-zinc-100" /> SMS Xabarlar</span>
        {activeThreadId && <button onClick={() => setActiveThreadId(null)} className="text-[10px] bg-blue-700 px-2.5 py-0.5 rounded text-white font-bold">Mavzular</button>}
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        {thread ? (
          <div className="flex-1 flex flex-col min-h-0 bg-slate-100 justify-between">
            <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2.5 max-h-full">
              {thread.messages.map(m => {
                const isMe = m.sender === 'me';
                return (
                  <div 
                    key={m.id}
                    className={`p-2.5 rounded-xl max-w-[80%] text-[11px] leading-relaxed relative ${isMe ? 'bg-blue-600 text-white self-end rounded-tr-none' : 'bg-white border text-slate-700 self-start rounded-tl-none'}`}
                  >
                    {m.text}
                    <span className="text-[8px] text-right block mt-1 opacity-60 font-mono">{m.time}</span>
                  </div>
                );
              })}
            </div>

            <div className="bg-white p-2 border-t flex gap-1.5 shrink-0 items-center">
              <input 
                type="text" 
                placeholder="SMS matni..." 
                value={val}
                onChange={e => setVal(e.target.value)}
                className="bg-slate-100 border border-transparent rounded-full flex-1 px-4 py-1.5 text-xs text-slate-800 outline-none"
              />
              <button 
                onClick={handleSend}
                className="bg-blue-600 text-white font-bold p-1.5 px-3 rounded-full text-[10px]"
              >
                Send
              </button>
            </div>
          </div>
        ) : (
          <div className="overflow-y-auto flex-1">
            {threads.map(t => (
              <div 
                key={t.id} 
                onClick={() => setActiveThreadId(t.id)}
                className="flex gap-3 px-3.5 py-2.5 border-b hover:bg-slate-100 cursor-pointer items-center justify-between"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-xs">
                    {t.name[0]}
                  </div>
                  <div className="min-w-0 flex flex-col">
                    <span className="font-bold text-slate-900 truncate text-xs">{t.name}</span>
                    <span className="text-slate-500 text-[10px] mt-0.5 truncate">{t.latest}</span>
                  </div>
                </div>
                <span className="text-[8px] text-gray-400 shrink-0">{t.time}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 4. WEB BROWSER APP MOCK
// ==========================================
export function BrowserApp() {
  const [url, setUrl] = useState('https://google.uz');
  const [search, setSearch] = useState('');
  const [content, setContent] = useState('Google Uzbekistan qidirish tizimiga xush kelibsiz. Istalgan axborotingizni biz orqali qidiring!');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    setUrl(`https://google.uz/search?q=${search}`);
    setContent(`Siz qidirgan "${search}" bo'yicha eng sara virtual ma'lumotlar:\n\n1. O'zbekistonda 120 FPS da ishlaydigan eng tezkor Virtual Smartfonlar sotuvda.\n2. PUBG Mobile va FC Mobile 2026 kiber o'yinlar hisob-kitoblari.\n3. Oliy darajada tahrirlangan sayyohlik viza xizmatlari.`);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-white font-sans text-xs overflow-hidden">
      <div className="bg-slate-800 p-2.5 flex items-center gap-2 shrink-0 border-b border-slate-700">
        <Compass className="w-4 h-4 text-cyan-400" />
        <span className="font-medium text-[10px] font-mono tracking-tight bg-slate-950 px-2.5 py-1 rounded-md flex-1 text-zinc-400 select-all">{url}</span>
      </div>

      <div className="flex-1 p-3.5 flex flex-col overflow-y-auto bg-slate-950 justify-between">
        <div className="space-y-4">
          <form onSubmit={handleSearch} className="relative mt-2">
            <input 
              type="text" 
              placeholder="Google orqali qidirish..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg w-full px-2.5 py-1.5 text-white pl-8 text-xs focus:border-slate-700 outline-none"
            />
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-2.5" />
          </form>

          <div className="bg-slate-900/60 p-3.5 rounded-xl border border-white/5 space-y-1 text-slate-300 leading-relaxed text-[11px] select-text">
            <p className="font-bold text-white text-xs">VIRTUAL INTERNET VIEWER:</p>
            <p className="whitespace-pre-wrap">{content}</p>
          </div>
        </div>

        <div className="flex gap-2 text-[9px] font-mono text-zinc-500 justify-center">
          <span>Google.uz</span> • <span>Wikipedia.org</span> • <span>Kun.uz</span>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. CLOCK, TIMER, ALARMS APP
// ==========================================
export function ClockApp() {
  const [activeTab, setActiveTab] = useState<'clock' | 'stopwatch' | 'timer'>('clock');
  
  // Stopwatch states
  const [stopTime, setStopTime] = useState(0);
  const [stopActive, setStopActive] = useState(false);

  // Timer states
  const [timerSeconds, setTimerSeconds] = useState(60);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    let interval: any;
    if (stopActive) {
      interval = setInterval(() => {
        setStopTime(s => s + 10); // milliseconds
      }, 10);
    }
    return () => clearInterval(interval);
  }, [stopActive]);

  useEffect(() => {
    let interval: any;
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(s => s - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timerSeconds]);

  const formatStopwatch = (ms: number) => {
    const min = Math.floor(ms / 60000);
    const sec = Math.floor((ms % 60000) / 1000);
    const mil = Math.floor((ms % 1000) / 10);
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}.${mil.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-white font-sans text-xs overflow-hidden">
      <div className="bg-indigo-600 text-white p-3 flex justify-between items-center shrink-0">
        <span className="font-bold text-xs flex items-center gap-1.5"><Clock className="w-4 h-4" /> Soat & Taymer</span>
      </div>

      <div className="flex gap-1.5 p-2 bg-slate-900 border-b border-slate-800 shrink-0">
        {[{ id: 'clock', n: 'Jahon vaqti' }, { id: 'stopwatch', n: 'Sekundomer' }, { id: 'timer', n: 'Taymer' }].map(t => (
          <button 
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`flex-1 py-1.5 text-[9px] font-bold rounded-lg transition ${activeTab === t.id ? 'bg-indigo-500 text-white' : 'bg-slate-950 hover:bg-slate-900 text-zinc-400'}`}
          >
            {t.n}
          </button>
        ))}
      </div>

      <div className="flex-1 p-4 flex flex-col justify-center items-center text-center">
        {activeTab === 'clock' && (
          <div className="space-y-4">
            <div className="w-24 h-24 rounded-full border-2 border-indigo-500 flex items-center justify-center text-white text-base font-bold font-mono tracking-widest relative mx-auto shadow-lg shadow-indigo-500/10">
              {new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })}
              <div className="absolute w-12 h-0.5 bg-indigo-500 origin-left left-12 top-12 transform rotate-45" />
            </div>
            <p className="font-bold text-xs">Toshkent, O'zbekiston (UTC+5)</p>
          </div>
        )}

        {activeTab === 'stopwatch' && (
          <div className="space-y-4">
            <div className="text-2xl font-mono tracking-widest font-bold text-white bg-slate-900 px-5 py-2.5 rounded-xl border border-white/5 shadow">
              {formatStopwatch(stopTime)}
            </div>
            <div className="flex gap-2.5 justify-center">
              <button 
                onClick={() => setStopActive(!stopActive)}
                className={`px-5 py-1.5 rounded-full font-bold text-[10px] uppercase shadow tracking-wider cursor-pointer ${stopActive ? 'bg-red-500 hover:bg-red-600' : 'bg-emerald-500 hover:bg-emerald-600'}`}
              >
                {stopActive ? 'To\'xtatish' : 'Boshlash'}
              </button>
              <button 
                onClick={() => { setStopTime(0); setStopActive(false); }}
                className="bg-zinc-800 hover:bg-zinc-700 font-bold px-5 py-1.5 rounded-full text-[10px] uppercase shadow tracking-wider cursor-pointer"
              >
                Nollash
              </button>
            </div>
          </div>
        )}

        {activeTab === 'timer' && (
          <div className="space-y-4">
            <div className="text-2xl font-mono tracking-widest font-bold text-white bg-slate-900 px-5 py-2.5 rounded-xl border border-white/5 shadow relative overflow-hidden">
              {timerSeconds} soniya
              {timerActive && <div className="absolute bottom-0 left-0 h-1 bg-indigo-500 animate-[pulse_1.5s_infinite]" style={{ width: `${(timerSeconds/60)*100}%` }} />}
            </div>
            <div className="flex gap-2.5 justify-center">
              <button 
                onClick={() => setTimerActive(!timerActive)}
                className={`px-5 py-1.5 rounded-full font-bold text-[10px] uppercase shadow tracking-wider cursor-pointer ${timerActive ? 'bg-red-500' : 'bg-emerald-500'}`}
              >
                {timerActive ? 'To\'xtatish' : 'Boshlash'}
              </button>
              <button 
                onClick={() => { setTimerSeconds(60); setTimerActive(false); }}
                className="bg-zinc-800 hover:bg-zinc-700 font-bold px-5 py-1.5 rounded-full text-[10px] uppercase shadow tracking-wider cursor-pointer"
              >
                Nollash
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 6. CALENDAR APP
// ==========================================
export function CalendarApp() {
  const [events, setEvents] = useState<Record<number, string>>({
    15: 'PUBG Milliy Chempionatini tomosha qilish',
    29: 'Yangi telefon simulyator yaratilishi'
  });

  const [selectedDay, setSelectedDay] = useState(29);
  const [eventText, setEventText] = useState('');

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleAddEvent = () => {
    if (!eventText.trim()) return;
    setEvents({ ...events, [selectedDay]: eventText.trim() });
    setEventText('');
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-800 font-sans text-xs overflow-hidden">
      <div className="bg-rose-500 text-white p-3.5 flex justify-between items-center shrink-0">
        <span className="font-bold text-sm flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Taqvim hujjati</span>
        <span className="text-[10px] bg-rose-600 px-2 py-0.5 rounded-full font-bold">MAY 2026</span>
      </div>

      <div className="flex-1 p-3.5 overflow-y-auto space-y-3.5">
        <div className="grid grid-cols-7 gap-1 bg-white p-2.5 rounded-xl border shadow-sm">
          {['D', 'S', 'C', 'P', 'J', 'S', 'Y'].map(d => (
            <span key={d} className="text-center font-bold text-gray-400 text-[9px] py-1">{d}</span>
          ))}
          {/* Days */}
          {daysInMonth.map(day => {
            const hasEv = events[day] !== undefined;
            return (
              <button 
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`w-7 h-7 rounded-lg text-[10px] font-bold font-mono transition flex items-center justify-center relative cursor-pointer ${
                  selectedDay === day ? 'bg-rose-500 text-white' : 'hover:bg-slate-100 text-slate-800'
                }`}
              >
                {day}
                {hasEv && (
                  <div className={`absolute bottom-0.5 w-1 h-1 rounded-full ${selectedDay === day ? 'bg-white' : 'bg-rose-500'}`} />
                )}
              </button>
            );
          })}
        </div>

        <div className="bg-white border rounded-xl p-3.5 space-y-2.5 shadow-sm">
          <p className="font-bold text-slate-900 border-b border-slate-100 pb-1 flex items-center justify-between text-xs">
            <span>Rejalar ({selectedDay}-May):</span>
            <span className="text-[9px] text-gray-400">Taqvim faolligi</span>
          </p>

          {events[selectedDay] ? (
            <div className="p-2 bg-rose-50 border border-rose-100 rounded-lg text-rose-700 leading-relaxed font-semibold">
              {events[selectedDay]}
            </div>
          ) : (
            <div className="text-[10px] text-zinc-400 italic">Hech qanday reja topilmadi. Taftish qiling.</div>
          )}

          <div className="flex gap-1.5 mt-2">
            <input 
              type="text" 
              placeholder="Yangi reja matni..." 
              value={eventText}
              onChange={e => setEventText(e.target.value)}
              className="bg-slate-150 border border-slate-300 rounded-lg flex-1 px-3 py-1.5 text-[10px] text-slate-800"
            />
            <button 
              onClick={handleAddEvent}
              className="bg-rose-500 hover:bg-rose-600 text-white font-bold p-1 py-1.5 rounded-lg text-[9px] flex items-center gap-1 shrink-0 px-2.5"
            >
              Qo'shish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 7. VIRTUAL MAP APP
// ==========================================
export function MapsApp() {
  const [selCity, setSelCity] = useState('Toshkent');
  const details = {
    Toshkent: { coords: '41.2995° N, 69.2401° E', desc: 'Samolyot maydoni, Chorsu bozori va kiber arenalar daxshat darajada mashhur.' },
    Samarqand: { coords: '39.6542° N, 66.9597° E', desc: 'Registon saroylari, Registon maydoni va eng lazzatli parmuda somsalari sizni kutadi.' },
    Buxoro: { coords: '39.7747° N, 64.4286° E', desc: 'Minorai Kalon va Mirzo Ulug\'bek soborlari bilan to\'la qadimiy muhit.' }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-white font-sans text-xs overflow-hidden">
      <div className="bg-emerald-600 text-white p-3 flex justify-between items-center shrink-0">
        <span className="font-bold text-xs flex items-center gap-1.5"><Map className="w-4 h-4 text-emerald-300 animate-pulse" /> Virtual Map O'zbekiston</span>
      </div>

      <div className="flex-1 relative flex items-center justify-center bg-slate-950 overflow-hidden shrink-0 min-h-[160px]">
        {/* Draw a gorgeous stylized vector map using SVGs */}
        <svg className="w-40 h-40 opacity-40 absolute" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="40" stroke="#047857" strokeWidth="1" strokeDasharray="3" />
          <path d="M 20 20 L 80 80 M 80 20 L 20 80" stroke="#047857" strokeWidth="0.5" />
          <circle cx="50" cy="30" r="4" fill="#047857" className="animate-ping" />
          <polyline points="20,10 50,30 80,70" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        <div className="z-10 bg-slate-900/90 border border-white/5 p-3 rounded-xl max-w-[210px] shadow-lg flex flex-col gap-1 text-center backdrop-blur">
          <span className="text-xs font-bold text-emerald-400">{selCity}</span>
          <span className="font-mono text-[8px] text-slate-400 tracking-wider">Koordinatalar: {details[selCity].coords}</span>
          <p className="text-[10px] leading-relaxed text-zinc-300 mt-1">{details[selCity].desc}</p>
        </div>
      </div>

      <div className="p-2 bg-slate-900 border-t border-white/5 flex gap-1.5 overflow-x-auto justify-center shrink-0">
        {['Toshkent', 'Samarqand', 'Buxoro'].map(city => (
          <button 
            key={city}
            onClick={() => setSelCity(city)}
            className={`px-3 py-1 rounded-full border text-[9px] font-bold ${selCity === city ? 'bg-emerald-500 border-emerald-400' : 'bg-slate-950 border-white/5 text-gray-400'}`}
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 8. FOLDERS / STORAGE FILES
// ==========================================
export function FilesApp() {
  const files = [
    { name: 'Kiber_PUBG_Video.mp4', size: '42 MB', type: 'video' },
    { name: 'DLS_Sustems.plist', size: '150 KB', type: 'doc' },
    { name: 'FC_Lineup_2026.png', size: '3.4 MB', type: 'photo' },
    { name: 'Osh_Shovla_Yegulik.pdf', size: '1.2 MB', type: 'doc' }
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-800 font-sans text-xs overflow-hidden">
      <div className="bg-neutral-700 text-white p-3 flex justify-between items-center shrink-0">
        <span className="font-bold text-xs flex items-center gap-1.5"><Folder className="w-4 h-4 text-amber-500" /> Fayllar hujjati</span>
        <span className="text-[9px] bg-neutral-800 px-2.5 py-0.5 rounded-full font-bold">Xotira: 142 GB / 256 GB</span>
      </div>

      <div className="flex-1 p-3.5 overflow-y-auto space-y-3.5">
        <div className="bg-white border rounded-xl p-3.5 shadow-sm space-y-2">
          <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">XALQARO TIZIM XOTIRASI</p>
          <div className="w-full h-2.5 bg-slate-200 rounded-full relative overflow-hidden">
            <div className="h-full bg-yellow-500 rounded-full" style={{ width: '55%' }} />
          </div>
          <span className="text-[9px] text-slate-500 block text-right font-medium">Bosh joy: 114 GB ochiq xotira tarkibi</span>
        </div>

        <div className="space-y-1.5">
          {files.map(f => (
            <div key={f.name} className="bg-white border hover:bg-slate-100/50 p-2.5 rounded-xl cursor-pointer transition flex justify-between items-center text-[10px]">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-base truncate">📂</span>
                <span className="font-medium text-slate-800 truncate">{f.name}</span>
              </div>
              <span className="font-mono text-[9px] text-gray-400 font-bold shrink-0">{f.size}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 9. DIKTOFON RECORDER APP
// ==========================================
export function RecorderApp() {
  const [isRecording, setIsRecording] = useState(false);
  const [records, setRecords] = useState<Array<{ name: string, length: string }>>([
    { name: 'Ovoz 1 - FC Strategiya', length: '00:45' },
    { name: 'Yangi zikr ovozi', length: '01:02' }
  ]);

  const handleRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      setRecords([{ name: `Ovoz ${records.length + 1} - Yangi yozuv`, length: '00:05' }, ...records]);
    } else {
      setIsRecording(true);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-white font-sans text-xs overflow-hidden">
      <div className="bg-violet-600 text-white p-3 flex justify-between items-center shrink-0">
        <span className="font-bold text-xs flex items-center gap-1.5"><Mic className="w-4 h-4 text-violet-300" /> Diktofon</span>
      </div>

      <div className="flex-1 p-4 flex flex-col justify-between items-center text-center">
        <div className="w-full">
          <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest mb-1">Ovoz diapazoni to'lqini</p>
          <div className="h-16 w-full flex items-center justify-center gap-1 relative overflow-hidden bg-slate-900 border border-white/5 rounded-xl">
            {Array.from({ length: 15 }).map((_, i) => (
              <div 
                key={i} 
                className={`w-1 bg-violet-500 rounded transition-all duration-300 ${isRecording ? 'animate-[pulse_1s_infinite]' : ''}`} 
                style={{ height: isRecording ? `${Math.floor(Math.random() * 40) + 12}px` : '4px', animationDelay: `${i * 0.1}s` }} 
              />
            ))}
            {!isRecording && <span className="absolute inset-x-0 mx-auto text-[10px] text-zinc-400 mt-1 font-semibold italic">Yozib olish kutilmoqda...</span>}
          </div>
        </div>

        <button 
          onClick={handleRecord}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg active:scale-95 transform transition cursor-pointer border-4 border-slate-900 ${isRecording ? 'bg-red-600 shadow-red-500/20' : 'bg-red-500 hover:bg-red-600 shadow-red-500/10'}`}
        >
          {isRecording ? <div className="w-4 h-4 bg-white rounded-none" /> : <div className="w-5 h-5 bg-white rounded-full" />}
        </button>

        <div className="w-full flex flex-col gap-1.5 border-t border-white/10 pt-3 max-h-[105px] overflow-y-auto">
          {records.map((r, i) => (
            <div key={i} className="bg-slate-900 border border-white/5 px-2.5 py-1.5 rounded-lg flex justify-between items-center text-[9px]">
              <span className="font-semibold text-zinc-100">{r.name}</span>
              <span className="font-mono text-zinc-400 shrink-0">{r.length}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 10. QR SCANNER APP MOCK
// ==========================================
export function QrApp() {
  const [val, setVal] = useState('Xayrillo Master');
  const [qrGen, setQrGen] = useState(false);

  return (
    <div className="flex flex-col h-full bg-zinc-950 text-white font-sans text-xs overflow-hidden">
      <div className="bg-zinc-800 p-3 flex justify-between items-center shrink-0 border-b border-white/5">
        <span className="font-bold text-xs flex items-center gap-1.5"><QrCode className="w-4 h-4 text-emerald-400" /> QR Kontroller</span>
      </div>

      <div className="flex-1 p-3.5 flex flex-col justify-between items-center">
        {qrGen ? (
          <div className="space-y-4 text-center">
            <div className="w-28 h-28 bg-white p-3 rounded-lg flex items-center justify-center mx-auto shadow border-4 border-slate-800">
              {/* Retro square representation */}
              <div className="grid grid-cols-4 gap-1.5 w-full h-full">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className={`w-full h-full ${i % 3 === 0 || i % 5 === 0 ? 'bg-zinc-950' : 'bg-white'}`} />
                ))}
              </div>
            </div>
            <p className="text-[9px] text-zinc-400">QR kod yozildi: <span className="font-bold underline text-white">{val}</span></p>
            <button onClick={() => setQrGen(false)} className="text-[10px] bg-sky-500 py-1 px-4 rounded-full font-bold">Qayta yozish</button>
          </div>
        ) : (
          <div className="space-y-3.5 w-full">
            <h4 className="font-bold text-xs text-center mt-2">QR simulyator yorlig'i</h4>
            <input 
              type="text" 
              placeholder="Yaratish uchun matn..." 
              value={val}
              onChange={e => setVal(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg w-full px-2.5 py-1.5 focus:border-slate-700 outline-none text-white text-xs"
            />
            <button 
              onClick={() => setQrGen(true)}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 rounded-lg text-xs"
            >
              QR KODNI YARATISH
            </button>
          </div>
        )}
        <div className="bg-white/5 border border-white/5 rounded-xl p-3 text-[9px] leading-relaxed text-zinc-400">
          Ushbu QR xabarlar to'plami smartfonlar tahlili uchun avtomatik foydalanish tizimiga moslashtirilgan.
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 11. MEDICAL CHECKS
// ==========================================
export function MedicalApp() {
  const symptoms = [
    { title: 'Bosh og\'rig\'i 🤕', solution: 'Muzdekkina suv iching, qorong\'i va tinch xonada 15 daqiqa dam oling.' },
    { title: 'Isitma va Shamollash 🤒', solution: 'Ko\'proq limonli issiq choy iching, vitamin C iste\'mol qiling va vrachga xabar bering.' },
    { title: 'Horg\'inlik 😴', solution: 'Smartfon ekranini biroz o\'chirib, chuqur nafas oling va o\'z vaqtida uxlang.' }
  ];

  const [activeSym, setActiveSym] = useState(0);

  return (
    <div className="flex flex-col h-full bg-rose-550 bg-rose-50 text-slate-800 font-sans text-xs overflow-hidden">
      <div className="bg-rose-500 text-white p-3.5 flex justify-between items-center shrink-0">
        <span className="font-bold text-sm flex items-center gap-1.5"><Heart className="w-4 h-4 text-rose-350 fill-current animate-pulse" /> Tibbiy Qo'llanma</span>
      </div>

      <div className="flex-1 p-3.5 space-y-4 overflow-y-auto">
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">Kasallik alomatini tanlang:</p>
        
        <div className="flex flex-col gap-2">
          {symptoms.map((s, i) => (
            <div 
              key={i}
              onClick={() => setActiveSym(i)}
              className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between font-semibold text-xs ${activeSym === i ? 'bg-rose-500/10 border-rose-450 text-rose-700' : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'}`}
            >
              <span>{s.title}</span>
              {activeSym === i && <span className="text-rose-500">★</span>}
            </div>
          ))}
        </div>

        <div className="bg-white border rounded-xl p-3.5 mt-2 shadow-sm space-y-1.5">
          <p className="font-bold text-rose-600 text-xs">Birinchi yordam yechimi:</p>
          <p className="leading-relaxed text-slate-650">{symptoms[activeSym].solution}</p>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 12. MAIL APP CLIENT
// ==========================================
export function MailApp() {
  const mails = [
    { sender: 'Xayrillo (Master)', title: 'Smartfon operatsion tizimi', desc: 'Telefon simulyatori 30 ta ilova va 10 ta o\'yin bilan 100% tayyor!', date: 'Kecha 17:02' },
    { sender: 'Play Bozor', title: 'PUBG yangilanish hisoboti', desc: 'Sizning PUBG mobile o\'yiningiz ochiq xarita versiyaga yuklandi.', date: 'Ilgari kun' }
  ];

  const [mailIdx, setMailIdx] = useState<number | null>(null);

  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-800 font-sans text-xs overflow-hidden">
      <div className="bg-blue-600 text-white p-3 flex justify-between items-center shrink-0">
        <span className="font-bold text-xs flex items-center gap-1.5"><Mail className="w-4 h-4" /> E-Pochta</span>
        {mailIdx !== null && <button onClick={() => setMailIdx(null)} className="text-[10px] bg-blue-700 px-2.5 py-0.5 rounded text-white font-bold">Xatlar</button>}
      </div>

      <div className="flex-1 p-3.5 overflow-y-auto">
        {mailIdx !== null ? (
          <div className="bg-white border rounded-xl p-4 shadow-sm space-y-3 select-text">
            <div className="border-b border-slate-100 pb-1.5">
              <h3 className="font-bold text-slate-800 text-xs">{mails[mailIdx].title}</h3>
              <p className="text-[9px] text-gray-400 mt-1">Kimdan: <span className="text-gray-600 font-bold">{mails[mailIdx].sender}</span> • {mails[mailIdx].date}</p>
            </div>
            <p className="leading-relaxed text-slate-650 text-[11px]">
              {mails[mailIdx].desc}
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {mails.map((m, idx) => (
              <div 
                key={idx}
                onClick={() => setMailIdx(idx)}
                className="bg-white hover:bg-slate-100/50 border rounded-xl p-3 cursor-pointer shadow-sm transition flex justify-between items-center text-[10px]"
              >
                <div className="min-w-0 flex flex-col pr-3">
                  <span className="font-bold text-slate-900 truncate">{m.sender}</span>
                  <span className="text-slate-500 font-semibold truncate mt-0.5">{m.title}</span>
                </div>
                <span className="text-[8px] text-gray-400 shrink-0">{m.date}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 13. FLASHLIGHT APP WIDGET
// ==========================================
export function FlashlightApp() {
  const [on, setOn] = useState(false);

  return (
    <div className="flex flex-col h-full bg-slate-950 text-white font-sans text-xs overflow-hidden">
      <div className="bg-zinc-850 p-3.5 flex justify-between items-center shrink-0 border-b border-white/5">
        <span className="font-bold text-xs flex items-center gap-1.5"><Sun className={`w-4 h-4 ${on ? 'text-yellow-400 animate-spin' : 'text-zinc-500'}`} /> Chiroq</span>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center text-center p-6 space-y-5 animate-[fadeIn_0.5s]">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center border-4 transform transition-all duration-300 ${on ? 'bg-yellow-400 text-slate-950 border-yellow-200 scale-105 shadow-xl shadow-yellow-500/20' : 'bg-transparent border-zinc-700 text-zinc-500'}`}>
          <Power className="w-8 h-8 fill-current" />
        </div>

        <div>
          <h3 className="font-bold text-xs">{on ? 'Chiroq yoqildi!' : 'Chiroq o\'chirilgan.'}</h3>
          <p className="text-zinc-500 text-[10px] mt-1">Smartfon kamerasida LED chiroq o't olishi simulyatsiyasi.</p>
        </div>

        <button 
          onClick={() => setOn(!on)}
          className={`px-6 py-2 rounded-full font-bold text-[10px] uppercase shadow tracking-wider transition cursor-pointer ${on ? 'bg-white text-zinc-950 font-bold' : 'bg-yellow-500 hover:bg-yellow-600 text-white'}`}
        >
          {on ? 'O\'CHIRISH' : 'YOQISH'}
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 14. SETTINGS CONFIG
// ==========================================
export function SettingsApp({ 
  onWallpaperChange, 
  onResetPhone,
  phoneLang,
  onChangeLang,
  isDark,
  onToggleTheme
}: { 
  onWallpaperChange: (url: string) => void,
  onResetPhone: () => void,
  phoneLang: 'uz' | 'en',
  onChangeLang: () => void,
  isDark: boolean,
  onToggleTheme: () => void
}) {
  const wallPresets = [
    { name: 'Kosmik Tun', url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=400&q=50' },
    { name: 'Yashil Vodiy', url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=400&q=50' },
    { name: 'Oltin Tong', url: 'https://images.unsplash.com/photo-1518063319789-7217e6706b04?auto=format&fit=crop&w=400&q=50' }
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-800 font-sans text-xs overflow-hidden">
      <div className="bg-slate-500 text-white p-3.5 flex justify-between items-center shrink-0 shadow-sm">
        <span className="font-bold text-sm flex items-center gap-1.5"><Info className="w-4 h-4" /> Sozlamalar</span>
      </div>

      <div className="flex-1 p-3.5 overflow-y-auto space-y-4">
        {/* Theme and lang switcher */}
        <div className="bg-white border p-3.5 rounded-xl shadow-sm space-y-2.5">
          <h4 className="font-bold text-slate-800 text-xs text-slate-400 border-b pb-1">Tizimni Sozlash</h4>
          <div className="flex justify-between items-center text-[10px]">
            <span className="font-semibold">Mundarija Tili (Language)</span>
            <button 
              onClick={onChangeLang}
              className="bg-sky-500 text-white font-bold px-3 py-1 rounded"
            >
              {phoneLang === 'uz' ? 'O\'zbekcha (UZ)' : 'English (EN)'}
            </button>
          </div>

          <div className="flex justify-between items-center text-[10px] mt-1">
            <span className="font-semibold">Interfeys rejimi (Theme)</span>
            <button 
              onClick={onToggleTheme}
              className="bg-slate-700 text-white font-bold p-1 px-2.5 rounded flex items-center gap-1.5"
            >
              {isDark ? <Moon className="w-3 h-3" /> : <Sun className="w-3 h-3" />}
              {isDark ? 'Tungi' : 'Yorug\''}
            </button>
          </div>
        </div>

        {/* Wallpaper selections */}
        <div className="bg-white border p-3.5 rounded-xl shadow-sm space-y-2.5">
          <h4 className="font-bold text-slate-800 text-xs text-slate-400 border-b pb-1">Orqa Fon Rasmi (Wallpapers)</h4>
          <div className="flex gap-2 justify-center">
            {wallPresets.map(w => (
              <div 
                key={w.name}
                onClick={() => onWallpaperChange(w.url)}
                className="grow cursor-pointer text-center relative aspect-video class-wall rounded-md overflow-hidden bg-cover bg-center border border-slate-200 hover:scale-103 transition"
                style={{ backgroundImage: `url(${w.url})` }}
              >
                <div className="absolute inset-0 bg-black/30 hover:bg-black/10" />
                <span className="absolute bottom-1 w-full text-center text-[8px] font-bold text-white leading-none truncate">{w.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* System parameters logs */}
        <div className="bg-white border p-3.5 rounded-xl shadow-sm space-y-2.5">
          <h4 className="font-bold text-slate-800 text-xs text-slate-400 border-b pb-1">Telefon Tafsilotlari</h4>
          <div className="grid grid-cols-2 gap-1.5 text-[8px] font-mono text-slate-500">
            <div>Operatsion Tizim: <span className="font-bold text-slate-700">UZ OS v12.1</span></div>
            <div>Tizim tezligi: <span className="font-bold text-emerald-600">120 FPS</span></div>
            <div>Operativ xotira: <span className="font-bold text-slate-700">12 GB RAM</span></div>
            <div>Doimiy xotira: <span className="font-bold text-slate-700">256 GB ROM</span></div>
          </div>
        </div>

        {/* Reset container button */}
        <div className="bg-red-50 border border-red-200 p-3 rounded-xl shadow-sm mt-3">
          <h4 className="font-bold text-red-700 text-xs mb-1">Xavfli zona</h4>
          <p className="text-[9px] text-red-500 leading-tight mb-2">Telefon xotirasini butunlay tozalab, zavod sozlamalariga qaytarish.</p>
          <button 
            onClick={onResetPhone}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-1.5 rounded-lg text-xs"
          >
            SOZLAMALARNI NOLLASH
          </button>
        </div>
      </div>
    </div>
  );
}
