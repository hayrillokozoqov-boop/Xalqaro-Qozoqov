/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Send, Search, Check, CheckCheck, Menu, ArrowLeft, Bot, MessageSquare, Info, ShieldAlert } from 'lucide-react';
import { Chat, Message } from '../types';

const INITIAL_CHATS: Chat[] = [
  {
    id: 'kunuz',
    name: '🔴 Kun.uz | Rasmiy Kanal',
    avatar: 'K',
    isChannel: true,
    unreadCount: 3,
    messages: [
      { id: 'k1', sender: 'news', senderName: 'Kun.uz', text: 'Toshkent shahrida yangi IT-Texnopark va virtual texnologiyalar markazi ishga tushirildi. Bu yerda yoshlar uchun barcha sharoitlar yaratilgan.', time: '14:20' },
      { id: 'k2', sender: 'news', senderName: 'Kun.uz', text: 'FC Mobile va PUBG Mobile bo\'yicha O\'zbekiston kiber-chempionatlari start oldi. G\'oliblarga katta pul mukofotlari va\'da qilingan.', time: '15:10' },
      { id: 'k3', sender: 'news', senderName: 'Kun.uz', text: 'Ob-havo: Ertaga yurtimizda havo iliq va ochiq bo\'ladi, ba\'zi joylarda kichik bulutlar bo\'lishi kutilmoqda. Samolyot reyslari o\'z vaqtida amalga oshiriladi.', time: '16:04' }
    ]
  },
  {
    id: 'helper_bot',
    name: '🤖 Virtual Yordamchi Bot',
    avatar: 'V',
    isBot: true,
    unreadCount: 0,
    messages: [
      { id: 'b1', sender: 'bot', senderName: 'Yordamchi', text: 'Assalomu alaykum! Men sizning virtual yordamchingizman. Menga istalgan savolingizni bering yoki quyidagi buyruqlarni yuboring:\n\n/start - Ishga tushirish\n/obhavo - Toshkent ob-havosi\n/valyuta - Kurslar\n/yinlar - Mashhur o\'yinlar ro\'yxati\n/info - Simulyator haqida', time: '10:00' }
    ]
  },
  {
    id: 'friends_group',
    name: '👥 Do\'stlar Guruhi',
    avatar: 'G',
    unreadCount: 1,
    messages: [
      { id: 'g1', sender: 'system', senderName: 'Tizim', text: 'Vali, Ali va Laylo guruhga qo\'shildi.', time: '11:15' },
      { id: 'g2', sender: 'bot', senderName: 'Laylo', text: 'Salom hammaga! Bugun kechki payt PUBG o\'ynaymizmi? Squad yig\'aylik.', time: '11:18' },
      { id: 'g3', sender: 'bot', senderName: 'Vali', text: 'Zor g\'oya! Men DLS 26 o\'ynayotgandim, hozir bo\'shab PUBG ga kiraman.', time: '11:20' },
      { id: 'g4', sender: 'bot', senderName: 'Ali', text: 'Men ham tayyorman, faqat FC Mobile da bitta penalty ceriyasini tugatib olay.', time: '11:22' }
    ]
  },
  {
    id: 'ali_uz',
    name: 'Ali (Do\'st)',
    avatar: 'A',
    unreadCount: 0,
    messages: [
      { id: 'a1', sender: 'bot', senderName: 'Ali', text: 'Sinfdosh, yangi telefon simulyatoring daxshatku, operatsion tizimi juda tez ishlayapti, qoyil!', time: 'Kecha' },
      { id: 'a2', sender: 'user', senderName: 'Siz', text: 'Rahmat! Uni ustida ko\'p ishladim, hamma ilovalari va PUBG, FC Mobile o\'yinlari ham bor.', time: 'Kecha' },
      { id: 'a3', sender: 'bot', senderName: 'Ali', text: 'Bo\'ldimi unda hozir darsdan keyin sinab ko\'raman!', time: '09:45' }
    ]
  }
];

export default function TelegramApp({ onTriggerNotification }: { onTriggerNotification?: (title: string, body: string) => void }) {
  const [chats, setChats] = useState<Chat[]>(INITIAL_CHATS);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of chat messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeChat?.messages]);

  const handleSendMessage = () => {
    if (!messageText.trim() || !activeChat) return;

    const formattedTime = new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = {
      id: Math.random().toString(),
      sender: 'user',
      senderName: 'Siz',
      text: messageText,
      time: formattedTime
    };

    const updatedMessages = [...activeChat.messages, userMsg];

    setChats(prev => prev.map(c => {
      if (c.id === activeChat.id) {
        return { ...c, messages: updatedMessages, unreadCount: 0 };
      }
      return c;
    }));

    setActiveChat(prev => {
      if (!prev) return null;
      return { ...prev, messages: updatedMessages };
    });

    const userText = messageText.trim();
    setMessageText('');

    // BOT RESPONSE
    if (activeChat.isBot) {
      setTimeout(() => {
        let botReply = '';
        const norm = userText.toLowerCase();

        if (norm.includes('start')) {
          botReply = 'Qaytadan xush kelibsiz! Men sizning eng tezkor smartfon yordamchingizman. Qaysi buyruqni tanlaysiz?\n\n/obhavo\n/valyuta\n/yinlar\n/info';
        } else if (norm.includes('obhavo') || norm.includes('havo')) {
          botReply = '🌤 Toshkent shahrida hozir: +28°C, Quyoshli. Namlik: 30%. Shamol: 4 m/s. Ajoyib havo bo\'lmoqda!';
        } else if (norm.includes('valyuta') || norm.includes('kurs')) {
          botReply = '💵 Valyuta kurslari (Simulyatsiya):\n1 USD = 12,650 UZS\n1 EUR = 13,800 UZS\n1 RUB = 142 UZS';
        } else if (norm.includes('yin') || norm.includes('o\'yin') || norm.includes('games')) {
          botReply = '🎮 Sizning smartfoningizda quyidagi daxshatli o\'yinlar o\'rnatilgan:\n1. PUBG Mobile\n2. FC Mobile\n3. DLS 26\n4. Subway Surfers\n5. Minecraft Mini\n6. Tetris\n7. Snake\n8. Flappy Bird\n... va jami 10ta o\'yin!';
        } else if (norm.includes('info') || norm.includes('haqida')) {
          botReply = '📱 Smartfon Versiyasi: Antigravity OS v12.1. Tizim tezligi: 120 FPS. Operativ xotira (RAM): 12 GB. Doimiy xotira (ROM): 256 GB. Hamma narsa daxshat tezlikda ishlamoqda!';
        } else {
          botReply = `Siz yubordingiz: "${userText}". Kechirasiz, men hali o'rganishda davom etyapman. Menga buyruq yuboring, masalan "/obhavo" yoki "/yinlar".`;
        }

        const replyMsg: Message = {
          id: Math.random().toString(),
          sender: 'bot',
          senderName: 'Yordamchi Bot',
          text: botReply,
          time: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })
        };

        setChats(prev => prev.map(c => {
          if (c.id === 'helper_bot') {
            const upd = [...c.messages, replyMsg];
            if (activeChat.id !== 'helper_bot') {
              if (onTriggerNotification) onTriggerNotification('🤖 Botdan Xabar', botReply.slice(0, 40) + '...');
              return { ...c, messages: upd, unreadCount: c.unreadCount + 1 };
            }
            return { ...c, messages: upd };
          }
          return c;
        }));

        if (activeChat.id === 'helper_bot') {
          setActiveChat(prev => {
            if (!prev) return null;
            return { ...prev, messages: [...prev.messages, replyMsg] };
          });
        }
      }, 1200);
    } else if (activeChat.id === 'friends_group') {
      setTimeout(() => {
        const responses = [
          'Vali: Zo\'r-ku! Hozir zvenoga qo\'shilishingni kutamiz.',
          'Ali: Ooo, gap yo\'q! Bizda daxshat tarkib bo\'ladi.',
          'Laylo: Kim kirdi PUBG ga? Men xonani ochdim, kiringlar!',
          'Vali: Men hozir guruhga zaryadkam yetgancha qo\'ng\'iroq qilaman.'
        ];
        const randomRes = responses[Math.floor(Math.random() * responses.length)];
        const [senderName, ...textParts] = randomRes.split(':');
        const textContent = textParts.join(':').trim();

        const replyMsg: Message = {
          id: Math.random().toString(),
          sender: 'bot',
          senderName: senderName.trim(),
          text: textContent,
          time: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })
        };

        setChats(prev => prev.map(c => {
          if (c.id === 'friends_group') {
            const upd = [...c.messages, replyMsg];
            if (activeChat.id !== 'friends_group') {
              if (onTriggerNotification) onTriggerNotification(`👥 Do'stlar Guruhi: ${senderName}`, textContent);
              return { ...c, messages: upd, unreadCount: c.unreadCount + 1 };
            }
            return { ...c, messages: upd };
          }
          return c;
        }));

        if (activeChat.id === 'friends_group') {
          setActiveChat(prev => {
            if (!prev) return null;
            return { ...prev, messages: [...prev.messages, replyMsg] };
          });
        }
      }, 1500);
    } else if (activeChat.id === 'ali_uz') {
      setTimeout(() => {
        const replyMsg: Message = {
          id: Math.random().toString(),
          sender: 'bot',
          senderName: 'Ali',
          text: 'Super! Men do\'stlar guruhida yozdim. Hozir PUBG ga kirvoman, sen ham kir, o\'yinni boshlaylik!',
          time: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })
        };

        setChats(prev => prev.map(c => {
          if (c.id === 'ali_uz') {
            const upd = [...c.messages, replyMsg];
            if (activeChat.id !== 'ali_uz') {
              if (onTriggerNotification) onTriggerNotification('Ali (Do\'st)', replyMsg.text);
              return { ...c, messages: upd, unreadCount: c.unreadCount + 1 };
            }
            return { ...c, messages: upd };
          }
          return c;
        }));

        if (activeChat.id === 'ali_uz') {
          setActiveChat(prev => {
            if (!prev) return null;
            return { ...prev, messages: [...prev.messages, replyMsg] };
          });
        }
      }, 1500);
    }
  };

  const filteredChats = chats.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-slate-900 text-white font-sans text-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-3.5 py-3 border-b border-slate-800 bg-sky-600 sticky top-0 z-10 shrink-0">
        {activeChat ? (
          <button
            onClick={() => {
              // mark read
              setChats(prev => prev.map(c => c.id === activeChat.id ? { ...c, unreadCount: 0 } : c));
              setActiveChat(null);
            }}
            className="p-1 rounded hover:bg-sky-700 text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        ) : (
          <Menu className="w-5 h-5 text-white cursor-pointer" />
        )}
        <div className="flex-1">
          {activeChat ? (
            <div className="flex flex-col">
              <span className="font-bold text-sm truncate">{activeChat.name}</span>
              <span className="text-[10px] text-sky-100 uppercase tracking-wider">
                {activeChat.isBot ? 'bot' : activeChat.isChannel ? 'kanal' : 'onlayn'}
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span className="font-bold text-base tracking-wide flex items-center gap-1.5">
                <MessageSquare className="w-5 h-5 fill-current text-white" />
                Telegram
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-1 flex flex-col min-h-0">
        {activeChat ? (
          <div className="flex-1 flex flex-col bg-[url('https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=400&q=50')] bg-cover bg-blend-soft-light bg-slate-950/90 overflow-hidden relative">
            {/* Message Area */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-3.5 py-4 flex flex-col gap-3 min-h-0 max-h-full"
            >
              {activeChat.messages.map((m) => {
                const isMe = m.sender === 'user';
                const isSys = m.sender === 'system';

                if (isSys) {
                  return (
                    <div key={m.id} className="mx-auto bg-slate-800/80 border border-slate-700/50 backdrop-blur text-gray-300 text-[10px] px-2.5 py-1 rounded-full text-center max-w-[85%]">
                      {m.text}
                    </div>
                  );
                }

                return (
                  <div
                    key={m.id}
                    className={`flex flex-col max-w-[80%] ${
                      isMe ? 'self-end items-end' : 'self-start items-start'
                    }`}
                  >
                    {!isMe && (
                      <span className="text-[10px] text-sky-400 font-semibold mb-0.5 ml-1">
                        {m.senderName}
                      </span>
                    )}
                    <div
                      className={`p-2.5 rounded-2xl shadow-sm text-xs leading-relaxed break-words whitespace-pre-wrap ${
                        isMe
                          ? 'bg-sky-600 text-white rounded-tr-none'
                          : 'bg-slate-800 border border-slate-700/60 text-slate-100 rounded-tl-none'
                      }`}
                    >
                      {m.text}
                      <div className={`text-[9px] mt-1 text-right block ${isMe ? 'text-sky-200' : 'text-slate-400'}`}>
                        {m.time}
                        {isMe && <span className="ml-1 text-[9px]">✔✔</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input Bar */}
            {activeChat.isChannel ? (
              <div className="p-3 bg-slate-900/95 border-t border-slate-800 flex items-center justify-center text-xs text-sky-400 font-bold backdrop-blur">
                📢 XABARLAR YOZISH CHEKLANGAN (FAQAT OHIROQ)
              </div>
            ) : (
              <div className="p-2.5 bg-slate-900 border-t border-slate-800 flex gap-2 items-center sticky bottom-0 shrink-0">
                <input
                  type="text"
                  placeholder="Xabar yozing..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 bg-slate-800 border border-slate-700/30 rounded-full px-4 py-1.5 text-xs outline-none focus:border-slate-600 text-white"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!messageText.trim()}
                  className="p-2 rounded-full bg-sky-600 hover:bg-sky-500 disabled:bg-slate-800 disabled:text-slate-600 cursor-pointer text-white flex items-center justify-center shrink-0 transition"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex flex-col min-h-0">
            {/* Search Input */}
            <div className="p-2.5 bg-slate-850 border-b border-slate-800 flex items-center sticky top-0 z-10 shrink-0">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Chatlar, botlar, kanallarni qidirish..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700/40 text-xs px-2.5 py-1.5 pl-8 rounded-lg outline-none text-white focus:border-slate-600"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            {/* Chats List */}
            <div className="flex-1 overflow-y-auto">
              {filteredChats.map((c) => {
                const lastMsg = c.messages[c.messages.length - 1];
                return (
                  <div
                    key={c.id}
                    onClick={() => setActiveChat(c)}
                    className="flex gap-3 px-3.5 py-2.5 border-b border-slate-800/40 hover:bg-slate-800/40 cursor-pointer items-center transition"
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white ${
                      c.isBot ? 'bg-gradient-to-tr from-purple-600 to-indigo-600' :
                      c.isChannel ? 'bg-gradient-to-tr from-amber-600 to-red-600' :
                      'bg-gradient-to-tr from-sky-500 to-blue-600'
                    }`}>
                      {c.isBot ? <Bot className="w-5 h-5 text-white" /> : c.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="font-semibold text-xs leading-none truncate text-slate-100">{c.name}</span>
                        <span className="text-[9px] text-slate-500 shrink-0">{lastMsg?.time || ''}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate leading-tight pr-4">
                        {lastMsg ? `${lastMsg.senderName}: ${lastMsg.text}` : 'Hech qanday xabar yo\'q.'}
                      </p>
                    </div>
                    {c.unreadCount > 0 && (
                      <span className="w-4.5 h-4.5 bg-sky-600 text-white rounded-full text-[9px] font-bold flex items-center justify-center shrink-0">
                        {c.unreadCount}
                      </span>
                    )}
                  </div>
                );
              })}
              {filteredChats.length === 0 && (
                <div className="text-center py-12 text-slate-500 text-xs">
                  Chatlar topilmadi.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
