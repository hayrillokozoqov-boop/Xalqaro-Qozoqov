/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Home, ArrowLeft, RefreshCw, Power } from 'lucide-react';

import PhoneContainer from './components/PhoneContainer';
import StatusBar from './components/StatusBar';
import LockScreen from './components/LockScreen';
import ControlCenter from './components/ControlCenter';
import HomeScreen from './components/HomeScreen';

import { APPS_DATA } from './data/apps';
import { PhoneNotification } from './types';

// App imports
import YouTubeApp from './apps/YouTubeApp';
import TelegramApp from './apps/TelegramApp';
import { 
  NotesApp, BankApp, CalcApp, MusicApp, WeatherApp, HealthApp, 
  PhoneApp, QuizApp, LibraryApp, TasbehApp, TourApp, 
  PaintApp, RatesApp, MarketApp 
} from './apps/OtherApps';
import { 
  CameraApp, ContactsApp, SmsApp, BrowserApp, ClockApp, 
  CalendarApp, MapsApp, FilesApp, RecorderApp, QrApp, 
  MedicalApp, MailApp, FlashlightApp, SettingsApp 
} from './apps/UtilityApps';

// Game imports
import PUBGApp from './games/PUBGApp';
import FCApp from './games/FCApp';
import DLSApp from './games/DLSApp';
import { 
  SubwayGame, MinecraftGame, SnakeGame, FlappyGame, 
  TetrisGame, PuzzleGame, TicTacToeGame 
} from './games/OtherGames';

const INITIAL_NOTIFICATIONS: PhoneNotification[] = [
  { id: '1', title: 'Onam 🌸', body: 'Bolajonim, darsing tugadimi? Tezroq qayt.', time: '11:15', appName: 'Xabarlar', appIcon: 'MailOpen', appColor: 'bg-blue-500' },
  { id: '2', title: 'Kun.uz | Yangiliklar', body: 'FC Mobile va PUBG kiber ligasi boshlandi!', time: '12:04', appName: 'Telegram', appIcon: 'MessageSquareText', appColor: 'bg-sky-500' }
];

export default function App() {
  // Mobile Core state
  const [isLocked, setIsLocked] = useState(true);
  const [wallpaper, setWallpaper] = useState('https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=400&q=50');
  const [battery, setBattery] = useState(78);
  const [isCharging, setIsCharging] = useState(false);
  const [activeAppId, setActiveAppId] = useState<string | null>(null);
  const [isControlPull, setIsControlPull] = useState(false);
  const [wifiActive, setWifiActive] = useState(true);
  const [bluetoothActive, setBluetoothActive] = useState(true);
  const [brightness, setBrightness] = useState(80);
  const [volume, setVolume] = useState(70);
  const [isDark, setIsDark] = useState(true);
  const [phoneLang, setPhoneLang] = useState<'uz' | 'en'>('uz');
  const [isPowerOff, setIsPowerOff] = useState(false);
  const [notifications, setNotifications] = useState<PhoneNotification[]>(INITIAL_NOTIFICATIONS);

  // Auto charge increment timer
  useEffect(() => {
    let interval: any;
    if (isCharging && battery < 100) {
      interval = setInterval(() => {
        setBattery(b => Math.min(b + 1, 100));
      }, 5000); // add 1% every 5 seconds under charge state
    } else if (!isCharging && battery > 0) {
      interval = setInterval(() => {
        setBattery(b => Math.max(b - 1, 0));
      }, 35000); // slow discharge loop
    }
    return () => clearInterval(interval);
  }, [isCharging, battery]);

  const handleTriggerNotification = (title: string, body: string) => {
    const formattedTime = new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });
    const newNotif: PhoneNotification = {
      id: Math.random().toString(),
      title,
      body,
      time: formattedTime,
      appName: 'Tizim',
      appIcon: 'Bell',
      appColor: 'bg-teal-500'
    };
    setNotifications([newNotif, ...notifications.slice(0, 4)]);
  };

  const handleResetPhone = () => {
    setBattery(100);
    setWallpaper('https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=400&q=50');
    setNotifications(INITIAL_NOTIFICATIONS);
    setActiveAppId(null);
    setIsLocked(true);
  };

  const renderActiveApp = () => {
    if (!activeAppId) return null;

    switch (activeAppId) {
      // Functional chats & videos
      case 'telegram': 
        return <TelegramApp onTriggerNotification={handleTriggerNotification} />;
      case 'youtube': 
        return <YouTubeApp />;

      // Playable Games
      case 'pubg': 
        return <PUBGApp />;
      case 'fc': 
        return <FCApp />;
      case 'dls': 
        return <DLSApp />;
      case 'subway': 
        return <SubwayGame />;
      case 'minecraft': 
        return <MinecraftGame />;
      case 'snake': 
        return <SnakeGame />;
      case 'flappy': 
        return <FlappyGame />;
      case 'tetris': 
        return <TetrisGame />;
      case 'two_zero_four_eight': 
        return <PuzzleGame />;
      case 'tictactoe': 
        return <TicTacToeGame />;

      // Other custom apps
      case 'notes': 
        return <NotesApp />;
      case 'bank': 
        return <BankApp />;
      case 'calculator': 
        return <CalcApp />;
      case 'music': 
        return <MusicApp />;
      case 'weather': 
        return <WeatherApp />;
      case 'fitness': 
        return <HealthApp />;
      case 'phone': 
        return <PhoneApp />;
      case 'quiz': 
        return <QuizApp />;
      case 'books': 
        return <LibraryApp />;
      case 'tasbeh': 
        return <TasbehApp />;
      case 'tourism': 
        return <TourApp />;
      case 'paint': 
        return <PaintApp />;
      case 'rates': 
        return <RatesApp />;
      case 'store': 
        return <MarketApp onTriggerNotification={handleTriggerNotification} />;
      
      // Utility apps
      case 'camera': 
        return <CameraApp />;
      case 'contacts': 
        return <ContactsApp onSelectNumber={() => setActiveAppId('phone')} />;
      case 'messages': 
        return <SmsApp />;
      case 'browser': 
        return <BrowserApp />;
      case 'clock': 
        return <ClockApp />;
      case 'calendar': 
        return <CalendarApp />;
      case 'maps': 
        return <MapsApp />;
      case 'files': 
        return <FilesApp />;
      case 'recorder': 
        return <RecorderApp />;
      case 'qr': 
        return <QrApp />;
      case 'medical': 
        return <MedicalApp />;
      case 'mail': 
        return <MailApp />;
      case 'flashlight': 
        return <FlashlightApp />;

      case 'settings': 
        return (
          <SettingsApp 
            onWallpaperChange={setWallpaper}
            onResetPhone={handleResetPhone}
            phoneLang={phoneLang}
            onChangeLang={() => setPhoneLang(p => p === 'uz' ? 'en' : 'uz')}
            isDark={isDark}
            onToggleTheme={() => setIsDark(!isDark)}
          />
        );

      default:
        return (
          <div className="flex-1 flex items-center justify-center text-center p-6 text-white text-xs">
            Ilova ishga tushirildi: {activeAppId}
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-900'}`}>
      <div className="text-center space-y-6">
        
        {/* Real-time smartphone simulator */}
        <PhoneContainer
          batteryCharge={battery}
          isCharge={isCharging}
          onPlugCharge={() => setIsCharging(!isCharging)}
          onCloseScreen={() => setIsPowerOff(!isPowerOff)}
          isPowerOff={isPowerOff}
        >
          {/* Internal screens viewport */}
          <div 
            className="flex-grow flex flex-col relative overflow-hidden transition-all duration-300 h-full"
            style={{ 
              opacity: brightness / 100,
              filter: `contrast(${isDark ? '110%' : '100%'})`
            }}
          >
            {/* Background screen wallpaper under frames direction */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-all duration-300"
              style={{ backgroundImage: `url(${wallpaper})` }}
            />
            {/* Tint Overlay standard */}
            <div className="absolute inset-0 bg-black/15 pointer-events-none" />

            {/* Static Status Bar */}
            <StatusBar batteryCharge={battery} isCharge={isCharging} />

            {/* Lockscreen Layer */}
            {isLocked && (
              <LockScreen 
                onUnlock={() => setIsLocked(false)} 
                wallpaper={wallpaper}
                notifications={notifications}
                onOpenShortcut={(appId) => {
                  setIsLocked(false);
                  setActiveAppId(appId);
                }}
              />
            )}

            {/* Pull-down Control Center */}
            {isControlPull && (
              <ControlCenter 
                onClose={() => setIsControlPull(false)}
                wifiActive={wifiActive}
                onToggleWifi={() => setWifiActive(!wifiActive)}
                bluetoothActive={bluetoothActive}
                onToggleBluetooth={() => setBluetoothActive(!bluetoothActive)}
                brightness={brightness}
                onBrightnessChange={setBrightness}
                volume={volume}
                onVolumeChange={setVolume}
                isDark={isDark}
                onToggleTheme={() => setIsDark(!isDark)}
                phoneLang={phoneLang}
                onChangeLang={() => setPhoneLang(p => p === 'uz' ? 'en' : 'uz')}
                onOpenApp={setActiveAppId}
              />
            )}

            {/* View Port Screens Router */}
            <div className="flex-1 flex flex-col relative overflow-hidden min-h-0 z-10">
              {activeAppId ? (
                <div className="flex-1 flex flex-col bg-[#121214] overflow-hidden min-h-0">
                  
                  {/* Embedded Application Frame Content */}
                  <div className="flex-grow overflow-hidden min-h-0 h-full">
                    {renderActiveApp()}
                  </div>

                  {/* System Black Bar Navigation Keys */}
                  <div className="h-10 bg-black/90 border-t border-white/5 flex justify-around items-center px-6 shrink-0 text-white select-none z-50">
                    <button 
                      onClick={() => setActiveAppId(null)}
                      className="p-1 px-3.5 hover:bg-white/10 rounded-full text-zinc-400 hover:text-white flex items-center justify-center gap-1 cursor-pointer font-bold text-[8px]"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> ORQAGA
                    </button>
                    <button 
                      onClick={() => { setActiveAppId(null); setIsLocked(true); }}
                      className="p-1 px-4 hover:bg-white/10 rounded-full text-zinc-400 hover:text-white flex items-center justify-center gap-1 cursor-pointer font-bold text-[8px]"
                    >
                      <Home className="w-3.5 h-3.5" /> CHIQISH
                    </button>
                  </div>
                </div>
              ) : (
                <HomeScreen 
                  apps={APPS_DATA}
                  onLaunchApp={setActiveAppId}
                  onPullControlCenter={() => setIsControlPull(!isControlPull)}
                  phoneLang={phoneLang}
                />
              )}
            </div>
          </div>
        </PhoneContainer>
      </div>
    </div>
  );
}
