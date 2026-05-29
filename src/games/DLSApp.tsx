/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Target, Trophy, Award, Settings, Play, ShieldAlert, Sparkles, RefreshCw, Search, Check } from 'lucide-react';

// Full roster of international superstar and local Uzbek heroes
const ALL_PLAYERS_POOL = [
  { id: 'r9', name: 'Ronaldo Nazário', country: '🇧🇷', ovr: 99, position: 'ST', coinPrice: 2000, gemPrice: 200, category: 'Legendary' },
  { id: 'ronaldinho', name: 'Ronaldinho Gaúcho', country: '🇧🇷', ovr: 98, position: 'LW', coinPrice: 1900, gemPrice: 190, category: 'Legendary' },
  { id: 'zlatan', name: 'Zlatan Ibrahimović', country: '🇸🇪', ovr: 96, position: 'ST', coinPrice: 1600, gemPrice: 160, category: 'Legendary' },
  { id: 'mbappe', name: 'Kylian Mbappé', country: '🇫🇷', ovr: 97, position: 'LW', coinPrice: 1800, gemPrice: 180, category: 'Legendary' },
  { id: 'ronaldo', name: 'Cristiano Ronaldo', country: '🇵🇹', ovr: 96, position: 'ST', coinPrice: 1500, gemPrice: 150, category: 'Legendary' },
  { id: 'haaland', name: 'Erling Haaland', country: '🇳🇴', ovr: 96, position: 'ST', coinPrice: 1600, gemPrice: 160, category: 'Legendary' },
  { id: 'messi', name: 'Lionel Messi', country: '🇦🇷', ovr: 95, position: 'RW', coinPrice: 1450, gemPrice: 140, category: 'Legendary' },
  { id: 'bellingham', name: 'Jude Bellingham', country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', ovr: 94, position: 'MC', coinPrice: 1300, gemPrice: 130, category: 'Elite' },
  { id: 'vinicius', name: 'Vinícius Júnior', country: '🇧🇷', ovr: 94, position: 'LW', coinPrice: 1350, gemPrice: 135, category: 'Elite' },
  { id: 'debruyne', name: 'Kevin De Bruyne', country: '🇧🇪', ovr: 93, position: 'MC', coinPrice: 1250, gemPrice: 125, category: 'Elite' },
  { id: 'salah', name: 'Mohamed Salah', country: '🇪🇬', ovr: 92, position: 'RW', coinPrice: 1100, gemPrice: 110, category: 'Elite' },
  { id: 'kane', name: 'Harry Kane', country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', ovr: 91, position: 'ST', coinPrice: 1000, gemPrice: 100, category: 'Elite' },
  { id: 'shomurodov', name: 'Eldor Shomurodov', country: '🇺🇿', ovr: 88, position: 'ST', coinPrice: 800, gemPrice: 80, category: 'Uzbek Star' },
  { id: 'fayzullayev', name: 'Abbosbek Fayzullayev', country: '🇺🇿', ovr: 87, position: 'RW', coinPrice: 750, gemPrice: 75, category: 'Uzbek Star' },
  { id: 'husanov', name: 'Abduqodir Husanov', country: '🇺🇿', ovr: 86, position: 'CB', coinPrice: 700, gemPrice: 70, category: 'Uzbek Star' },
  { id: 'masharipov', name: 'Jaloliddin Masharipov', country: '🇺🇿', ovr: 85, position: 'LW', coinPrice: 600, gemPrice: 60, category: 'Uzbek Star' },
  { id: 'urunov', name: 'Oston Urunov', country: '🇺🇿', ovr: 84, position: 'LW', coinPrice: 550, gemPrice: 55, category: 'Uzbek Star' },
  { id: 'shukurov', name: 'Otabek Shukurov', country: '🇺🇿', ovr: 83, position: 'MC', coinPrice: 500, gemPrice: 50, category: 'Uzbek Star' },
  { id: 'yusupov', name: 'Utkir Yusupov', country: '🇺🇿', ovr: 82, position: 'GK', coinPrice: 400, gemPrice: 40, category: 'Uzbek Star' },
  { id: 'aliqulov', name: 'Husniddin Aliqulov', country: '🇺🇿', ovr: 81, position: 'CB', coinPrice: 350, gemPrice: 35, category: 'Uzbek Star' }
];

export const STADIUM_LEVELS = [
  { level: 1, name: "Mahalla maydoni ⚽", capacity: 1500, priceCoins: 0, priceGems: 0, bonus: 1.0 },
  { level: 2, name: "Tuman o'yingohi 🏟️", capacity: 5000, priceCoins: 500, priceGems: 10, bonus: 1.3 },
  { level: 3, name: "Viloyat stadioni 🏟️✨", capacity: 15000, priceCoins: 1200, priceGems: 25, bonus: 1.6 },
  { level: 4, name: "Milliy Arena 🇺🇿🏟️", capacity: 35000, priceCoins: 2500, priceGems: 50, bonus: 2.0 },
  { level: 5, name: "Grand Bunyodkor Arena 🌟🏟️", capacity: 60000, priceCoins: 5000, priceGems: 100, bonus: 2.5 },
  { level: 6, name: "Pakhtakor Central Stadium 🏆🏟️", capacity: 85000, priceCoins: 8000, priceGems: 180, bonus: 3.2 },
  { level: 7, name: "DLS Golden Colosseum 👑🏟️", capacity: 120000, priceCoins: 15000, priceGems: 300, bonus: 4.5 }
];

export default function DLSApp() {
  const [gameState, setGameState] = useState<'splash' | 'menu' | 'match'>('splash');
  const [progress, setProgress] = useState(0);

  // Economy & Inventory states
  const [coins, setCoins] = useState(2500);
  const [gems, setGems] = useState(150);
  
  // Starting inventory includes basic Uzbek star players
  const [ownedPlayerIds, setOwnedPlayerIds] = useState<string[]>([
    'shomurodov',
    'masharipov',
    'fayzullayev',
    'shukurov',
    'yusupov',
    'aliqulov'
  ]);

  // Player upgrades mapping: playerId -> extra ratings bonus added
  const [playerUpgrades, setPlayerUpgrades] = useState<Record<string, number>>({});

  // Stadium level state
  const [stadiumLevel, setStadiumLevel] = useState(1);

  // Active lineup positions mapped to Player IDs
  const [squad, setSquad] = useState<Record<string, string>>({
    ST: 'shomurodov',
    LW: 'masharipov',
    RW: 'fayzullayev',
    MC: 'shukurov',
    CB: 'aliqulov',
    GK: 'yusupov'
  });

  // Current interface tabs
  const [activeTab, setActiveTab] = useState<'tarkib' | 'bozor' | 'skaut' | 'kuchaytirish' | 'stadion'>('tarkib');
  const [searchQuery, setSearchQuery] = useState('');
  const [swapPosition, setSwapPosition] = useState<string | null>(null);

  // Scouting simulation states
  const [isScouting, setIsScouting] = useState(false);
  const [scoutedPlayer, setScoutedPlayer] = useState<any | null>(null);
  const [scoutingLog, setScoutingLog] = useState('');

  // Market alerts
  const [notif, setNotif] = useState<string | null>(null);

  // Match states
  const [formation, setFormation] = useState('4-3-3');
  const [matchLogs, setMatchLogs] = useState<string[]>([]);
  const [score, setScore] = useState({ us: 0, them: 0 });
  const [minute, setMinute] = useState(0);
  const [actionOption, setActionOption] = useState<'pass' | 'cross' | 'shoot' | null>(null);

  // Loading screen simulation
  useEffect(() => {
    if (gameState === 'splash') {
      const interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            setGameState('menu');
            return 100;
          }
          return p + 6;
        });
      }, 70);
      return () => clearInterval(interval);
    }
  }, [gameState]);

  // Helper to get dynamic OVR with training upgrades
  const getPlayerOvr = (playerId: string): number => {
    const p = ALL_PLAYERS_POOL.find(item => item.id === playerId);
    if (!p) return 70;
    const upgradeBonus = playerUpgrades[playerId] || 0;
    return p.ovr + upgradeBonus;
  };

  // Dynamic dynamic calculation of the squad's average OVR
  const calculateSquadRating = () => {
    const activeIds = Object.values(squad);
    let sum = 0;
    activeIds.forEach(id => {
      sum += getPlayerOvr(id as string);
    });
    return Math.round(sum / activeIds.length) || 70;
  };

  const showNotification = (msg: string) => {
    setNotif(msg);
    setTimeout(() => {
      setNotif(null);
    }, 3000);
  };

  // Give free items instantly so user can easily buy all players
  const handleGiftResources = () => {
    setCoins(c => c + 3000);
    setGems(g => g + 200);
    showNotification('🎁 Tekin 3000 Tilla & 200 Olmos qo\'shildi!');
  };

  // Buy a player
  const handlePurchasePlayer = (player: any, method: 'coins' | 'gems') => {
    if (ownedPlayerIds.includes(player.id)) {
      showNotification('Ta\'qiqlangan! Ushbu o\'yinchi tarkibingizda allaqachon mavjud.');
      return;
    }

    if (method === 'coins') {
      if (coins < player.coinPrice) {
        showNotification('Mablag\' yetarli emas! Tanga bering yoki tekin tanga oling.');
        return;
      }
      setCoins(c => c - player.coinPrice);
    } else {
      if (gems < player.gemPrice) {
        showNotification('Etarli olmos yo\'q! Skaut yordamida olmos ishlang yoki tekin sovg\'a oling.');
        return;
      }
      setGems(g => g - player.gemPrice);
    }

    setOwnedPlayerIds(prev => [...prev, player.id]);
    showNotification(`✅ ${player.name} sotib olindi! Tarkibingizga kiriting.`);
  };
  
  // Sell a player
  const handleSellPlayer = (playerId: string) => {
    const activeSquadIds = Object.values(squad);
    if (activeSquadIds.includes(playerId)) {
      showNotification("❌ Sotish imkonsiz! Ushbu o'yinchi asosiy tarkibda o'ynamoqda. Avval zaxiradagi boshqa o'yinchi bilan almashtiring.");
      return;
    }

    const player = ALL_PLAYERS_POOL.find(p => p.id === playerId);
    if (!player) return;

    // Refund 70% of purchase price in both Coins & Gems
    const refundCoins = Math.round(player.coinPrice * 0.70) || 100;
    const refundGems = Math.round(player.gemPrice * 0.70) || 10;

    setCoins(c => c + refundCoins);
    setGems(g => g + refundGems);
    
    // Remove from owned players
    setOwnedPlayerIds(prev => prev.filter(id => id !== playerId));
    
    // Clear upgrades
    if (playerUpgrades[playerId]) {
      setPlayerUpgrades(prev => {
        const copy = { ...prev };
        delete copy[playerId];
        return copy;
      });
    }

    showNotification(`💰 ${player.name} muvaffaqiyatli sotildi! +🪙 ${refundCoins} va +💎 ${refundGems} qaytarildi.`);
  };

  // Scouting recruit system using diamonds (or coins)
  const handleScoutPlayer = (tier: 'regular' | 'legendary') => {
    const costGems = tier === 'regular' ? 35 : 90;
    const costCoins = tier === 'regular' ? 600 : 1300;

    if (gems < costGems && coins < costCoins) {
      showNotification('Skayt chaqirish uchun mablag\' yetarli emas!');
      return;
    }

    // Deduct gems preferred, otherwise coins
    if (gems >= costGems) {
      setGems(g => g - costGems);
      setScoutingLog(`💎 ${costGems} olmosga yangi skaut jo'natildi...`);
    } else {
      setCoins(c => c - costCoins);
      setScoutingLog(`🪙 ${costCoins} tangaga yangi skaut jo'natildi...`);
    }

    setIsScouting(true);
    setScoutedPlayer(null);

    setTimeout(() => {
      // Pick random candidates not owned yet, or from the whole pool
      const unowned = ALL_PLAYERS_POOL.filter(p => !ownedPlayerIds.includes(p.id));
      const pool = unowned.length > 0 ? unowned : ALL_PLAYERS_POOL;

      // Filter by tier
      let filteredPool = pool;
      if (tier === 'legendary') {
        filteredPool = pool.filter(p => p.ovr >= 90);
      } else {
        filteredPool = pool.filter(p => p.ovr < 90);
      }

      if (filteredPool.length === 0) filteredPool = pool; // fallback

      const target = filteredPool[Math.floor(Math.random() * filteredPool.length)];
      setScoutedPlayer(target);
      setIsScouting(false);
    }, 1500);
  };

  const handleClaimScouted = () => {
    if (scoutedPlayer) {
      if (!ownedPlayerIds.includes(scoutedPlayer.id)) {
        setOwnedPlayerIds(prev => [...prev, scoutedPlayer.id]);
      }
      showNotification(`🎉 ${scoutedPlayer.name} zaxirangizga muvaffaqiyatli qo'shildi!`);
      setScoutedPlayer(null);
    }
  };

  // Match Play logic
  useEffect(() => {
    let timer: any;
    if (gameState === 'match' && minute < 90) {
      timer = setInterval(() => {
        setMinute(m => {
          const nextM = m + 15;
          const activeST = ALL_PLAYERS_POOL.find(p => p.id === squad.ST)?.name.split(' ')[1] || 'Hujumchi';
          const activeLW = ALL_PLAYERS_POOL.find(p => p.id === squad.LW)?.name.split(' ')[1] || 'Yarimhimoyachi';
          const activeRW = ALL_PLAYERS_POOL.find(p => p.id === squad.RW)?.name.split(' ')[1] || 'Hujumchi';

          if (nextM === 30) {
            setMatchLogs(prev => [`${activeST} qanotdan daxshatli reyd qildi! U raqib himoyachilarini chalg'itib jarima maydoniga kirdi!`, ...prev]);
            setActionOption('pass');
          } else if (nextM === 60) {
            setMatchLogs(prev => [`${activeLW} ajoyib burchak to'pini jarima maydonchasi ichiga uzatmoqda!`, ...prev]);
            setActionOption('cross');
          } else if (nextM === 75) {
            setMatchLogs(prev => [`${activeRW} jarima chizig'ida to'p bilan to'xtadi! To'g'ridan-to'g'ri zarba imkoniyati!`, ...prev]);
            setActionOption('shoot');
          } else if (nextM >= 90) {
            setMatchLogs(prev => ['Hakam uchrashuv yakunlanganligini bildiruvchi 3 ta hushtak chaldi!', ...prev]);
            clearInterval(timer);
            return 90;
          } else {
            const eventPool = [
              'O\'yin o\'rta chizig\'ida shiddatli va keskin kurash ketmoqda.',
              'Rivojlangan qarshi hujumni himoyachimiz jasorat bilan bartaraf etdi.',
              'Darvozabonimiz to\'pni raqib jarima maydoniga havoga tepib yubordi.'
            ];
            const randEv = eventPool[Math.floor(Math.random() * eventPool.length)];
            setMatchLogs(prev => [randEv, ...prev]);
          }

          return nextM;
        });
      }, 1500);
    }
    return () => clearInterval(timer);
  }, [gameState, minute]);

  const handleAction = (type: 'pass' | 'cross' | 'shoot') => {
    setActionOption(null);
    const randOutcome = Math.random() > 0.35; // 65% chance of goal success
    if (randOutcome) {
      setScore(prev => ({ ...prev, us: prev.us + 1 }));
      setMatchLogs(prev => ['GOOOL!!! To\'p darvozabon ustidan ajoyib tarzda to\'rga borib tushdi!', ...prev]);
    } else {
      setMatchLogs(prev => ['Afsus! Raqib himoyasi zarba yo\'lini to\'sib qoldi va burchakka chiqarib yubordi.', ...prev]);
    }
  };

  const startMatch = () => {
    setGameState('match');
    setMinute(0);
    setScore({ us: 0, them: 0 });
    setMatchLogs(['O\'yinga start berildi! Futbolchilar yashil chim ustiga chiqib kelishmoqda.']);
    setActionOption(null);
  };

  return (
    <div className="flex flex-col h-full bg-zinc-950 text-white font-sans text-xs overflow-hidden select-none animate-[fadeIn_0.5s]">
      
      {/* 1. SPLASH SCREEN */}
      {gameState === 'splash' && (
        <div className="flex-1 flex flex-col justify-center items-center p-6 space-y-6 bg-gradient-to-tr from-blue-900 to-black relative">
          <div className="relative w-16 h-16 rounded-xl bg-gradient-to-tr from-blue-600 to-amber-500 flex items-center justify-center shadow-xl border border-blue-400/20">
            <Award className="w-8 h-8 text-yellow-300" />
          </div>

          <div className="text-center space-y-1.5 animate-[fadeIn_0.5s]">
            <h1 className="text-sm font-bold tracking-widest text-blue-400 uppercase">DREAM LEAGUE 26</h1>
            <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">First Touch Athletics v14.0</p>
          </div>

          <div className="w-full max-w-[170px] space-y-1.5">
            <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-[8px] text-zinc-600 font-mono text-center">Yuklanmoqda... {progress}%</p>
          </div>
        </div>
      )}

      {/* 2. MAIN MENU DASHBOARD */}
      {gameState === 'menu' && (
        <div className="flex-1 flex flex-col justify-between bg-gradient-to-b from-zinc-900 via-zinc-950 to-blue-950/20 min-h-0">
          
          {/* Header Stats Bar */}
          <div className="p-3 bg-zinc-950/90 border-b border-white/5 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-extrabold text-blue-400 font-sans tracking-tight">DLS26</span>
              <div className="bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 font-bold px-1.5 py-0.5 rounded text-[8px] flex items-center">
                ★ {calculateSquadRating()} RATING
              </div>
            </div>

            {/* Currencies along with cheats/gift button */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 font-semibold text-[9px] bg-amber-500/10 border border-amber-500/20 rounded-md px-2 py-0.5">
                <span className="text-amber-400 text-[10px]">🪙</span>
                <span className="font-mono text-amber-300">{coins}</span>
              </div>
              <div className="flex items-center gap-1 font-semibold text-[9px] bg-sky-500/10 border border-sky-500/20 rounded-md px-2 py-0.5">
                <span className="text-sky-400 text-[10px]">💎</span>
                <span className="font-mono text-sky-300">{gems}</span>
              </div>
              <button 
                onClick={handleGiftResources}
                className="bg-red-500/20 text-red-300 border border-red-500/35 px-1.5 py-0.5 rounded text-[8px] font-bold active:scale-95"
                title="Tekin sovg'a olish"
              >
                +HADYA 🎁
              </button>
            </div>
          </div>

          {/* Toast notifications */}
          {notif && (
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2 z-50 bg-blue-600 border border-blue-400 text-white rounded-lg p-2 text-[9px] font-bold shadow-lg shadow-blue-500/25 px-4 text-center max-w-[280px]">
              {notif}
            </div>
          )}

          {/* Navigation Panel Tabs */}
          <div className="flex bg-zinc-950 shrink-0 font-bold border-b border-white/5 text-[8px] select-none overflow-x-auto scrollbar-none whitespace-nowrap">
            {[
              { id: 'tarkib', label: '🏟️ TARKIB' },
              { id: 'kuchaytirish', label: '⚡ MASHQLAR' },
              { id: 'stadion', label: '🏟️ STADION' },
              { id: 'bozor', label: '🛒 BOZOR' },
              { id: 'skaut', label: '🔍 SKAUT' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setSwapPosition(null);
                }}
                className={`flex-1 min-w-[65px] py-2.5 text-center border-b transition ${
                  activeTab === tab.id 
                    ? 'border-blue-500 text-blue-400 bg-white/5 font-extrabold' 
                    : 'border-transparent text-zinc-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Core scrollable screen based on the tab */}
          <div className="flex-1 overflow-y-auto px-4.5 py-3 min-h-0">
            
            {/* TAB 1: SQUAD MANAGER / KLUB TARKIBI */}
            {activeTab === 'tarkib' && (
              <div className="space-y-3">
                
                {/* Football Pitch simulation backdrop */}
                <div className="bg-gradient-to-b from-emerald-800 to-emerald-950 border border-emerald-600 rounded-2xl p-3 shadow-inner relative flex flex-col justify-between h-[210px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-800 to-emerald-950">
                  <div className="absolute inset-0 bg-white/2 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,_transparent_1px)] bg-[size:100%_40px] pointer-events-none rounded-2xl" />
                  <div className="absolute inset-x-0 top-1/2 h-[1px] bg-white/20 pointer-events-none" />
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-white/20 rounded-full pointer-events-none" />

                  {/* ST Row */}
                  <div className="flex justify-center z-10">
                    <button 
                      onClick={() => setSwapPosition(swapPosition === 'ST' ? null : 'ST')}
                      className={`p-1 bg-black/40 hover:bg-black/60 border border-white/10 rounded-lg flex flex-col items-center w-[75px] transition ${swapPosition === 'ST' ? 'ring-2 ring-yellow-400 bg-amber-950/40' : ''}`}
                    >
                      <span className="text-[7px] text-yellow-400 font-extrabold tracking-widest leading-none mb-1">ST 🎯</span>
                      <span className="font-extrabold text-[9px] truncate max-w-full block leading-none">{ALL_PLAYERS_POOL.find(p => p.id === squad.ST)?.name.split(' ')[1] || 'Bo\'sh'}</span>
                      <span className="font-mono text-[8px] text-zinc-400 leading-none mt-1">★ {getPlayerOvr(squad.ST)}</span>
                    </button>
                  </div>

                  {/* LW & RW Row */}
                  <div className="flex justify-between items-center px-4 z-10">
                    <button 
                      onClick={() => setSwapPosition(swapPosition === 'LW' ? null : 'LW')}
                      className={`p-1 bg-black/40 hover:bg-black/60 border border-white/10 rounded-lg flex flex-col items-center w-[75px] transition ${swapPosition === 'LW' ? 'ring-2 ring-yellow-400 bg-amber-950/40' : ''}`}
                    >
                      <span className="text-[7px] text-teal-400 font-extrabold tracking-widest leading-none mb-1">LW ⚡</span>
                      <span className="font-extrabold text-[9px] truncate max-w-full block leading-none">{ALL_PLAYERS_POOL.find(p => p.id === squad.LW)?.name.split(' ')[1] || 'Bo\'sh'}</span>
                      <span className="font-mono text-[8px] text-zinc-400 leading-none mt-1">★ {getPlayerOvr(squad.LW)}</span>
                    </button>

                    <button 
                      onClick={() => setSwapPosition(swapPosition === 'RW' ? null : 'RW')}
                      className={`p-1 bg-black/40 hover:bg-black/60 border border-white/10 rounded-lg flex flex-col items-center w-[75px] transition ${swapPosition === 'RW' ? 'ring-2 ring-yellow-400 bg-amber-950/40' : ''}`}
                    >
                      <span className="text-[7px] text-rose-400 font-extrabold tracking-widest leading-none mb-1">RW 🔥</span>
                      <span className="font-extrabold text-[9px] truncate max-w-full block leading-none">{ALL_PLAYERS_POOL.find(p => p.id === squad.RW)?.name.split(' ')[1] || 'Bo\'sh'}</span>
                      <span className="font-mono text-[8px] text-zinc-400 leading-none mt-1">★ {getPlayerOvr(squad.RW)}</span>
                    </button>
                  </div>

                  {/* MC & CB Row */}
                  <div className="flex justify-around items-center px-2 z-10">
                    <button 
                      onClick={() => setSwapPosition(swapPosition === 'MC' ? null : 'MC')}
                      className={`p-1 bg-black/40 hover:bg-black/60 border border-white/10 rounded-lg flex flex-col items-center w-[72px] transition ${swapPosition === 'MC' ? 'ring-2 ring-yellow-400 bg-amber-950/40' : ''}`}
                    >
                      <span className="text-[7px] text-orange-400 font-extrabold tracking-widest leading-none mb-1">MC ⚙️</span>
                      <span className="font-extrabold text-[9px] truncate max-w-full block leading-none">{ALL_PLAYERS_POOL.find(p => p.id === squad.MC)?.name.split(' ')[1] || 'Bo\'sh'}</span>
                      <span className="font-mono text-[8px] text-zinc-400 leading-none mt-1">★ {getPlayerOvr(squad.MC)}</span>
                    </button>

                    <button 
                      onClick={() => setSwapPosition(swapPosition === 'CB' ? null : 'CB')}
                      className={`p-1 bg-black/40 hover:bg-black/60 border border-white/10 rounded-lg flex flex-col items-center w-[72px] transition ${swapPosition === 'CB' ? 'ring-2 ring-yellow-400 bg-amber-950/40' : ''}`}
                    >
                      <span className="text-[7px] text-purple-400 font-extrabold tracking-widest leading-none mb-1">CB 🛡️</span>
                      <span className="font-extrabold text-[9px] truncate max-w-full block leading-none">{ALL_PLAYERS_POOL.find(p => p.id === squad.CB)?.name.split(' ')[1] || 'Bo\'sh'}</span>
                      <span className="font-mono text-[8px] text-zinc-400 leading-none mt-1">★ {getPlayerOvr(squad.CB)}</span>
                    </button>
                  </div>

                  {/* GK Row */}
                  <div className="flex justify-center z-10">
                    <button 
                      onClick={() => setSwapPosition(swapPosition === 'GK' ? null : 'GK')}
                      className={`p-1 bg-black/40 hover:bg-black/60 border border-white/10 rounded-lg flex flex-col items-center w-[72px] transition ${swapPosition === 'GK' ? 'ring-2 ring-yellow-400 bg-amber-950/40' : ''}`}
                    >
                      <span className="text-[7px] text-gray-300 font-extrabold tracking-widest leading-none mb-1">GK 🥅</span>
                      <span className="font-bold text-[9px] truncate max-w-full block leading-none">{ALL_PLAYERS_POOL.find(p => p.id === squad.GK)?.name.split(' ')[1] || 'Bo\'sh'}</span>
                      <span className="font-mono text-[8px] text-zinc-400 leading-none mt-1">★ {getPlayerOvr(squad.GK)}</span>
                    </button>
                  </div>
                </div>

                {/* Swap Options Panel */}
                {swapPosition && (
                  <div className="bg-zinc-900 border border-yellow-500/30 p-2.5 rounded-xl space-y-2 animate-[slideUp_0.2s_ease-out]">
                    <div className="flex justify-between items-center">
                      <span className="text-[8px] font-bold text-yellow-400 font-mono tracking-wider uppercase"> {swapPosition} UCHUN ALMASHTIRISH 🔄 </span>
                      <button onClick={() => setSwapPosition(null)} className="text-[7px] text-zinc-400 bg-zinc-800 px-1 py-0.5 rounded leading-none shrink-0">Yopish</button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-1.5 max-h-[100px] overflow-y-auto">
                      {ownedPlayerIds.map(oId => {
                        const originalP = ALL_PLAYERS_POOL.find(p => p.id === oId);
                        if (!originalP) return null;
                        const isCurrentActive = Object.values(squad).includes(oId);
                        
                        return (
                          <button
                            key={oId}
                            disabled={isCurrentActive}
                            onClick={() => {
                              setSquad(prev => {
                                // Prevent duplication
                                const nextSquad = { ...prev };
                                nextSquad[swapPosition] = oId;
                                return nextSquad;
                              });
                              setSwapPosition(null);
                            }}
                            className={`p-1.5 flex justify-between items-center rounded-lg border text-[9px] transition ${
                              isCurrentActive 
                                ? 'bg-zinc-950 border-zinc-800 text-zinc-650' 
                                : 'bg-zinc-800 hover:bg-zinc-750 border-white/5 text-gray-200'
                            }`}
                          >
                            <span className="font-bold text-[8px]">{originalP.country} {originalP.name.split(' ')[0]}</span>
                            <span className="font-bold text-emerald-400 bg-emerald-500/10 px-1 rounded-sm text-[8px]">★ {getPlayerOvr(oId)}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Sub title details */}
                <div className="bg-zinc-900/60 p-2 border border-white/5 rounded-xl">
                  <div className="flex justify-between items-center mb-1 text-[8px] text-zinc-400 font-extrabold uppercase font-mono tracking-wider">
                    <span>MILIY INVENTAR ({ownedPlayerIds.length} TA FUTBOLCHI)</span>
                    <span>Taktika: {formation}</span>
                  </div>
                  <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {ownedPlayerIds.map(plId => {
                      const pl = ALL_PLAYERS_POOL.find(p => p.id === plId);
                      if (!pl) return null;
                      const inLineup = Object.values(squad).includes(plId);
                      return (
                        <div key={plId} className="flex-shrink-0 bg-zinc-950 p-2 rounded-xl border border-white/5 flex flex-col items-center w-[58px] relative">
                          {inLineup && (
                            <span className="absolute top-[2px] right-[2px] bg-emerald-500 text-[6px] font-bold px-1 rounded text-black leading-none">FAOL</span>
                          )}
                          <span className="text-sm leading-none m-0">{pl.country}</span>
                          <span className="font-bold text-[8px] leading-tight text-center mt-1 truncate w-full">{pl.name.split(' ')[1] || pl.name.split(' ')[0]}</span>
                          <span className="font-bold text-[7px] text-zinc-500 uppercase mt-0.5">{pl.position}</span>
                          <span className="font-mono text-[8px] text-amber-400 mt-1">★ {getPlayerOvr(plId)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: PLAYER UPGRADES & TRAINING (KUCHAYTIRISH) */}
            {activeTab === 'kuchaytirish' && (
              <div className="space-y-3.5 animate-[fadeIn_0.3s]">
                <div className="bg-zinc-900 border border-white/5 p-3 rounded-2xl space-y-1 text-center">
                  <h3 className="font-extrabold text-[11px] text-yellow-400 flex items-center justify-center gap-1 uppercase tracking-wide">
                    <Sparkles className="w-3 h-3 text-yellow-400 animate-pulse" /> FUTBOLCHILARNING MASHG'ULOTI
                  </h3>
                  <p className="text-[8px] leading-relaxed text-zinc-400">
                    O'yinchilaringizni mashq qildiring va ularning reytingini (OVR) doimiy ravishda oshiring!
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-[8px] text-zinc-500 font-bold uppercase tracking-wider block">KLUB TARKIBIDAGI FUTBOLCHILAR:</span>
                  <div className="space-y-1.5 max-h-[190px] overflow-y-auto pr-1">
                    {ownedPlayerIds.map(plId => {
                      const pl = ALL_PLAYERS_POOL.find(p => p.id === plId);
                      if (!pl) return null;
                      const currentOvr = getPlayerOvr(plId);
                      const upgradeBonus = playerUpgrades[plId] || 0;
                      
                      return (
                        <div key={plId} className="bg-zinc-900 border border-white/5 p-2 rounded-xl flex items-center justify-between gap-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-base leading-none">{pl.country}</span>
                            <div>
                              <h4 className="font-extrabold text-[9px] text-white leading-none">{pl.name}</h4>
                              <p className="text-[7px] text-zinc-500 mt-1 uppercase font-semibold leading-none">
                                {pl.position} • Kuchaytirilgan: <span className="text-yellow-400">+{upgradeBonus} OVR</span>
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <div className="text-center bg-black/40 border border-white/5 px-1.5 py-0.5 rounded">
                              <span className="block text-[5px] text-zinc-550 font-bold tracking-widest leading-none">OVR</span>
                              <span className="text-[9px] font-mono font-bold text-emerald-400 leading-none">{currentOvr}</span>
                            </div>

                            <div className="flex flex-col gap-1">
                              <button
                                onClick={() => {
                                  if (coins < 200) {
                                    showNotification("Mablag' yetarli emas! Tanga bering yoki tekin tanga oling.");
                                    return;
                                  }
                                  setCoins(c => c - 200);
                                  setPlayerUpgrades(prev => ({
                                    ...prev,
                                    [plId]: (prev[plId] || 0) + 1
                                  }));
                                  showNotification(`⚡ ${pl.name} reytingi +1 darajaga oshdi!`);
                                }}
                                className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold px-1.5 py-0.5 rounded text-[7px] transition active:scale-95 leading-none"
                              >
                                🪙 200 (+1)
                              </button>
                              <button
                                onClick={() => {
                                  if (gems < 25) {
                                    showNotification("Mablag' yetarli emas! Olmos to'ldiring.");
                                    return;
                                  }
                                  setGems(g => g - 25);
                                  setPlayerUpgrades(prev => ({
                                    ...prev,
                                    [plId]: (prev[plId] || 0) + 3
                                  }));
                                  showNotification(`💎 ${pl.name} reytingi +3 darajaga oshdi!`);
                                }}
                                className="bg-sky-500 hover:bg-sky-600 text-white font-extrabold px-1.5 py-0.5 rounded text-[7px] transition active:scale-95 leading-none"
                              >
                                💎 25 (+3)
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: STADIUM UPGRADES (STADION RIVOJLANTIRISH) */}
            {activeTab === 'stadion' && (
              <div className="space-y-3.5 animate-[fadeIn_0.3s]">
                {(() => {
                  const currentStadium = STADIUM_LEVELS.find(s => s.level === stadiumLevel) || STADIUM_LEVELS[0];
                  const hasNextLevel = stadiumLevel < STADIUM_LEVELS.length;
                  const nextStadium = hasNextLevel ? STADIUM_LEVELS.find(s => s.level === stadiumLevel + 1) : null;

                  return (
                    <>
                      <div className="bg-gradient-to-tr from-zinc-900 to-indigo-950 border border-indigo-500/25 p-3 rounded-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-indigo-500/10 text-indigo-400 text-[6px] font-mono px-2 py-0.5 font-bold uppercase tracking-widest rounded-bl-xl border-l border-b border-white/5">
                          LVL {stadiumLevel} / {STADIUM_LEVELS.length}
                        </div>
                        
                        <div>
                          <p className="text-[7px] text-indigo-400 font-extrabold uppercase font-mono tracking-widest">SIZNING STADIONINGIZ</p>
                          <h3 className="font-extrabold text-[12px] text-white mt-1.5 truncate max-w-[200px] leading-none">{currentStadium.name}</h3>
                          
                          <div className="flex gap-4 mt-3">
                            <div>
                              <span className="block text-[6px] text-zinc-500 font-bold uppercase tracking-wider">SIG'IMI</span>
                              <span className="font-bold text-[10px] text-white font-mono">{currentStadium.capacity.toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="block text-[6px] text-zinc-500 font-bold uppercase tracking-wider">DAROMAD MULTIPLIER</span>
                              <span className="font-bold text-[10px] text-emerald-400 font-mono">+{Math.round((currentStadium.bonus - 1) * 100)}% ({currentStadium.bonus}x)</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-[7px] text-zinc-500 mt-3 border-t border-white/5 pt-2 leading-tight uppercase font-medium">
                          🏟️ Stadioningizni upgraded qilish orqali har bir uchrashuvdan so'ng oladigan tilla (Coins) miqdorini oshiring!
                        </div>
                      </div>

                      <div className="bg-zinc-900 border border-white/5 p-3 rounded-2xl space-y-2">
                        <span className="text-[8px] text-zinc-400 font-bold uppercase tracking-wider block">KEYINGI DARAXA STADION:</span>
                        
                        {hasNextLevel && nextStadium ? (
                          <div className="space-y-2.5">
                            <div className="bg-black/35 border border-white/5 p-2 rounded-xl flex justify-between items-center gap-1.5">
                              <div>
                                <span className="text-[6.5px] text-indigo-400 font-bold uppercase leading-none block">YANGI STADION</span>
                                <span className="font-extrabold text-[10px] text-white block mt-1 leading-none">{nextStadium.name}</span>
                                <div className="flex gap-2.5 mt-1 text-[7px] text-zinc-500 font-mono">
                                  <span>Sig'im: {nextStadium.capacity.toLocaleString()} kishi</span>
                                  <span>Bonus: {nextStadium.bonus}x tilla</span>
                                </div>
                              </div>
                              <span className="text-[6.5px] text-amber-400 font-mono font-bold uppercase">TAKMILLASHTIRISH 🛠️</span>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <button
                                onClick={() => {
                                  if (coins < nextStadium.priceCoins) {
                                    showNotification("Tilla yetarli emas! Tanga bering yoki +HADYA oling.");
                                    return;
                                  }
                                  setCoins(c => c - nextStadium.priceCoins);
                                  setStadiumLevel(stadiumLevel + 1);
                                  showNotification(`🏟️ Stadioningiz "${nextStadium.name}" darajasigacha ko'tarildi!`);
                                }}
                                className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold py-2 rounded-lg text-[8px] transition active:scale-95 flex flex-col items-center justify-center leading-tight shadow shadow-amber-500/10"
                              >
                                <span className="font-mono">🪙 {nextStadium.priceCoins}</span>
                                <span className="text-[5.5px] font-mono uppercase tracking-wider opacity-90 mt-0.5">Tilla</span>
                              </button>
                              
                              <button
                                onClick={() => {
                                  if (gems < nextStadium.priceGems) {
                                    showNotification("Olmos etarli emas! Skaut orqali yutib oling.");
                                    return;
                                  }
                                  setGems(g => g - nextStadium.priceGems);
                                  setStadiumLevel(stadiumLevel + 1);
                                  showNotification(`🏟️ Stadioningiz "${nextStadium.name}" darajasigacha ko'tarildi!`);
                                }}
                                className="bg-sky-500 hover:bg-sky-600 text-white font-extrabold py-2 rounded-lg text-[8px] transition active:scale-95 flex flex-col items-center justify-center leading-tight shadow shadow-sky-500/10"
                              >
                                <span className="font-mono">💎 {nextStadium.priceGems}</span>
                                <span className="text-[5.5px] font-mono uppercase tracking-wider opacity-90 mt-0.5">Olmos</span>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-amber-500/5 border border-amber-500/15 rounded-xl p-3 text-center space-y-1">
                            <span className="text-sm">🏆🏟️🏆</span>
                            <h4 className="font-bold text-[9px] text-amber-305 text-amber-400 uppercase tracking-widest">Maksimal Daraja!</h4>
                            <p className="text-[7.5px] text-zinc-500">Sizning uyingiz eng mahobatli va dunyodagi eng katta ko'lamli Arena hisoblanadi!</p>
                          </div>
                        )}
                      </div>
                    </>
                  );
                })()}
              </div>
            )}

            {/* TAB 2: TRANSFER MARKET (TRANSFERS) */}
            {activeTab === 'bozor' && (
              <div className="space-y-3">
                
                {/* Search query input */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Qidirish (ism, davlat, reyting)..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/5 pl-8 pr-3 py-1.5 rounded-lg text-[9px] outline-none text-white placeholder-zinc-500"
                  />
                  <Search className="w-3 h-3 text-zinc-500 absolute left-2.5 top-2.5" />
                </div>

                {/* Players Listing Grids */}
                <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto pr-1">
                  {ALL_PLAYERS_POOL.filter(item => {
                    const lName = item.name.toLowerCase();
                    const sName = searchQuery.toLowerCase();
                    return lName.includes(sName) || item.country.includes(sName) || item.ovr.toString().includes(sName) || item.category.toLowerCase().includes(sName);
                  }).map(pl => {
                    const isOwned = ownedPlayerIds.includes(pl.id);
                    return (
                      <div 
                        key={pl.id}
                        className={`bg-gradient-to-b p-2 rounded-2xl border flex flex-col justify-between ${
                          isOwned 
                            ? 'from-zinc-900 to-zinc-950 border-zinc-800' 
                            : pl.category === 'Legendary' 
                              ? 'from-amber-950/20 to-zinc-950 border-amber-500/20' 
                              : pl.category === 'Elite' 
                                ? 'from-sky-950/20 to-zinc-950 border-sky-500/20' 
                                : 'from-emerald-950/20 to-zinc-950 border-emerald-500/20'
                        }`}
                      >
                        {/* Upper card segments */}
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-lg leading-none block">{pl.country}</span>
                            <span className="font-extrabold text-[9px] leading-tight block mt-1 truncate max-w-[85px]">{pl.name}</span>
                            <span className="text-[7px] uppercase text-zinc-500 font-bold bg-zinc-900 px-1 py-0.2 rounded-sm leading-none mt-1 inline-block">{pl.position}</span>
                          </div>
                          
                          {/* OVR circular badge */}
                          <div className={`w-7 h-7 rounded-full border flex items-center justify-center font-bold text-xs ${
                            pl.category === 'Legendary' 
                              ? 'bg-amber-500/20 text-amber-300 border-amber-400/40 shadow shadow-amber-500/20' 
                              : pl.category === 'Elite' 
                                ? 'bg-sky-500/20 text-sky-300 border-sky-400/40' 
                                : 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
                          }`}>
                            {pl.ovr}
                          </div>
                        </div>

                        {/* Middle category visual styling */}
                        <div className="text-[7px] text-zinc-400 italic my-1 tracking-wider uppercase font-semibold font-mono">
                          {pl.category} Class
                        </div>

                        {/* Buying bottom action options */}
                        {isOwned ? (
                          <div className="space-y-1 mt-1.5 w-full">
                            <div className="w-full bg-zinc-900/60 py-1 rounded-lg text-emerald-400 font-bold text-center text-[7.5px] flex items-center justify-center gap-1 border border-zinc-800">
                              <Check className="w-2.5 h-2.5 text-emerald-400" /> SOTIB OLINGAN
                            </div>
                            <button
                              onClick={() => handleSellPlayer(pl.id)}
                              className="w-full bg-red-600/15 hover:bg-red-600/30 text-red-400 font-bold py-1 rounded text-[7.5px] transition flex flex-col items-center justify-center border border-red-500/20 active:scale-95 leading-tight"
                            >
                              SOTISH (🪙 {Math.round(pl.coinPrice * 0.70)} | 💎 {Math.round(pl.gemPrice * 0.70)})
                            </button>
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-1 mt-1.5 shrink-0 select-none">
                            <button
                              onClick={() => handlePurchasePlayer(pl, 'coins')}
                              className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold py-1 rounded text-[7px] transition flex flex-col items-center justify-center leading-tight active:scale-95"
                            >
                              <span>🪙 {pl.coinPrice}</span>
                              <span className="text-[5px] uppercase opacity-75 font-mono">Tilla</span>
                            </button>
                            <button
                              onClick={() => handlePurchasePlayer(pl, 'gems')}
                              className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-1 rounded text-[7px] transition flex flex-col items-center justify-center leading-tight active:scale-95"
                            >
                              <span>💎 {pl.gemPrice}</span>
                              <span className="text-[5px] uppercase opacity-90 font-mono">Olmos</span>
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 3: SCOUTING (SKAUT CHAQRISH) */}
            {activeTab === 'skaut' && (
              <div className="space-y-4">
                
                {/* Scouting top explanations */}
                <div className="bg-zinc-900 border border-white/5 p-3 rounded-2xl space-y-1 text-center">
                  <h3 className="font-extrabold text-xs text-blue-400 leading-none">🔍 AKADEMIYA SKAUT XIZMATI</h3>
                  <p className="text-[8.5px] leading-relaxed text-zinc-400 px-2 mt-1">
                    Dunyo va O'zbekiston bo'ylab skautlarni safarbar qiling! Skautlar sizga tasodifiy super-yulduzlar va elita o'yinchilarni olib kelishadi.
                  </p>
                </div>

                {/* Recruitment buttons options representation */}
                <div className="grid grid-cols-2 gap-3 shrink-0">
                  
                  {/* Option A: Regular Recruit */}
                  <div className="bg-gradient-to-b from-sky-950/20 to-zinc-950 border border-sky-500/20 p-3 rounded-2xl flex flex-col items-center text-center justify-between space-y-3">
                    <div className="text-xl">🏃‍♂️🔍</div>
                    <div>
                      <h4 className="font-bold text-[9px] uppercase tracking-wide text-sky-300">Oddiy Skaut</h4>
                      <p className="text-[7.5px] text-zinc-500 mt-0.5">80-89 OVR reytingli tasodifiy daxshat elita o'yinchi</p>
                    </div>
                    
                    <button 
                      onClick={() => handleScoutPlayer('regular')}
                      className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-1.5 rounded-xl text-[8px] uppercase tracking-wide transition active:scale-95"
                    >
                      Summa: 💎 35 olmos
                    </button>
                  </div>

                  {/* Option B: Legendary Recruit */}
                  <div className="bg-gradient-to-b from-amber-950/25 to-zinc-950 border border-amber-500/25 p-3 rounded-2xl flex flex-col items-center text-center justify-between space-y-3 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-yellow-500 text-slate-900 text-[6px] font-extrabold px-1 py-[1px] font-mono uppercase rounded-bl-md">HIGH</div>
                    <div className="text-xl">🌟🎩</div>
                    <div>
                      <h4 className="font-bold text-[9px] uppercase tracking-wide text-amber-300 flex items-center gap-1 justify-center leading-none">
                        <Sparkles className="w-3 h-3 text-yellow-300 animate-spin" /> Afsonaviy Skaut
                      </h4>
                      <p className="text-[7.5px] text-zinc-500 mt-0.5">90-97 OVR reytingli dunyoning eng afsonaviy yulduzlari</p>
                    </div>

                    <button 
                      onClick={() => handleScoutPlayer('legendary')}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold py-1.5 rounded-xl text-[8px] uppercase tracking-wide transition active:scale-95"
                    >
                      Summa: 💎 90 olmos
                    </button>
                  </div>

                </div>

                {/* Animating status bar or result cards */}
                {isScouting && (
                  <div className="bg-zinc-900 border border-white/5 p-4 rounded-2xl text-center space-y-2 animate-pulse">
                    <div className="w-8 h-8 rounded-full border-4 border-dashed border-sky-400/60 flex items-center justify-center mx-auto text-sm animate-spin">
                      ⚽
                    </div>
                    <p className="text-[9px] text-zinc-400 font-bold font-mono tracking-wider">{scoutingLog}</p>
                  </div>
                )}

                {/* Opened Scouting Recruit Reward overlay */}
                {scoutedPlayer && !isScouting && (
                  <div className="bg-gradient-to-tr from-blue-900/65 to-amber-950/50 border-2 border-amber-500/40 p-4 rounded-2xl text-center shadow-2xl relative animate-[fadeIn_0.5s] space-y-4">
                    <div className="absolute top-2 right-2 bg-yellow-400 font-extrabold px-1.5 py-0.5 text-slate-950 text-[7px] uppercase tracking-widest rounded leading-none animate-bounce">
                      NEW RECRUIT!
                    </div>

                    <h3 className="font-extrabold text-[10px] text-zinc-300 uppercase tracking-widest block leading-none">SKAUT RECRUIT NATIJASI:</h3>
                    
                    {/* Visual Player card preview */}
                    <div className="w-[110px] h-[155px] bg-gradient-to-b from-amber-400 via-amber-500 to-yellow-650 p-2.5 rounded-2xl border-4 border-yellow-300 shadow-xl relative mx-auto flex flex-col justify-between items-center text-slate-900 font-sans tracking-wide">
                      <div className="flex justify-between items-start w-full font-bold">
                        <span className="text-base font-mono leading-none">{scoutedPlayer.ovr}</span>
                        <span className="text-[6px] uppercase bg-black text-white px-1 rounded leading-none">OVR</span>
                      </div>

                      <div className="w-12 h-12 bg-white/40 rounded-full border border-white flex items-center justify-center text-2xl shadow-inner relative">
                        🏃‍♂️
                        <div className="absolute bottom-[-2px] bg-black text-white font-mono text-[5px] font-bold px-1 rounded-full leading-none uppercase">
                          {scoutedPlayer.position}
                        </div>
                      </div>

                      <div className="text-center space-y-0.5">
                        <h4 className="font-extrabold text-[9px] uppercase leading-none text-slate-950 truncate max-w-[95px] ">{scoutedPlayer.name}</h4>
                        <p className="text-[6.5px] text-slate-800 font-bold uppercase leading-none">{scoutedPlayer.country} COUNTRY</p>
                      </div>

                      <div className="flex gap-1 justify-center py-0.5 bg-black/15 w-full rounded text-[6.5px] font-bold font-mono text-center text-amber-900">
                        ★★★★★
                      </div>
                    </div>

                    <button 
                      onClick={handleClaimScouted}
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-extrabold py-2.5 rounded-xl text-[9px] uppercase tracking-widest shadow-lg shadow-emerald-500/20 active:scale-95 transition"
                    >
                      TAKRIBGA QO'SHISH (ADD TO TEAM) ✅
                    </button>
                  </div>
                )}

              </div>
            )}

          </div>

          {/* Under Match Launcher action button */}
          <div className="p-3 bg-zinc-950/90 border-t border-white/5 shrink-0 flex gap-2">
            <button
              onClick={startMatch}
              className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-extrabold py-3 rounded-xl shadow-lg shadow-blue-500/10 active:scale-98 uppercase tracking-widest text-[10px] transition"
            >
              JANGNI BOSHLASH (PLAY MATCH) ⚽
            </button>
          </div>

        </div>
      )}

      {/* 3. LIVE MATCH SCREEN */}
      {gameState === 'match' && (
        <div className="flex-1 flex flex-col justify-between bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 to-black select-none">
          
          {/* Dashboard live match header stats */}
          <div className="p-3.5 bg-zinc-950 border-b border-white/10 flex justify-between items-center shrink-0 z-10 text-[10px] font-mono">
            <span className="font-bold text-blue-400 animate-pulse">LIVE PLAY • {minute}' MIN</span>
            <div className="flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 rounded-md px-2.5 py-0.5 font-bold text-[9px]">
              <span>Siz:</span>
              <span className="text-yellow-400 font-extrabold">{score.us}</span>
              <span>-</span>
              <span className="text-red-450 text-red-400 font-extrabold">{score.them}</span>
              <span>Raqib</span>
            </div>
          </div>

          {/* Matches events action panels */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 flex flex-col justify-start">
            
            {actionOption ? (
              <div className="bg-blue-900/40 border-2 border-blue-400 p-4 rounded-xl flex flex-col gap-3 items-center text-center shadow-lg animate-bounce select-none">
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <h3 className="font-extrabold text-[10px] text-white uppercase tracking-widest">KIBER HUJUM QARORI!</h3>
                <p className="text-[8px] text-gray-200">Guruh g\'alabasini ta\'minlash yoki gol urish uchun jamoaviy harakat tanlang:</p>
                <div className="grid grid-cols-3 gap-2 w-full mt-1">
                  {(['pass', 'cross', 'shoot'] as const).map(op => (
                    <button
                      key={op}
                      onClick={() => handleAction(op)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-black font-extrabold py-2 rounded-xl text-[8.5px] uppercase tracking-wider transition-all cursor-pointer shadow-md"
                    >
                      {op === 'pass' ? 'PAS ↙' : op === 'cross' ? 'KROSS ↗' : 'URISH 🚀'}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-zinc-950/85 border border-white/5 p-4 rounded-xl text-center shadow flex flex-col items-center">
                <p className="text-[9px] font-mono leading-relaxed text-zinc-500 uppercase tracking-widest mb-1">DLS Match Engine</p>
                
                {minute >= 95 || minute === 90 ? (
                  (() => {
                    const currentStadium = STADIUM_LEVELS.find(s => s.level === stadiumLevel) || STADIUM_LEVELS[0];
                    const stadiumBonus = currentStadium.bonus;
                    const baseCoins = score.us > score.them ? 350 : 100;
                    const finalCoinsReward = Math.round(baseCoins * stadiumBonus);
                    const finalGemsReward = score.us > score.them ? 25 : 5;

                    return (
                      <div className="space-y-3.5 mt-1.5 animate-[fadeIn_0.4s]">
                        <h3 className="text-yellow-400 font-extrabold text-xs uppercase tracking-widest">Uchrashuv Yakunlandi!</h3>
                        <p className="text-[10px] text-gray-200 font-semibold leading-none">Yakuniy natija: <span className="font-mono text-sm font-bold text-white ml-2">{score.us} - {score.them}</span></p>
                        
                        {/* Rewards earned details */}
                        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-2.5 max-w-[245px] mx-auto text-[8.5px] text-emerald-300 font-bold space-y-1">
                          <p className="text-zinc-400 tracking-wider font-mono">🎁 ERISHILGAN MUKOFOTLAR: </p>
                          <p className="flex justify-between">
                            <span>🪙 +{finalCoinsReward} Tilla</span>
                            <span className="text-[7.5px] text-yellow-400 font-mono">({stadiumBonus}x stadion bonusi!)</span>
                          </p>
                          <p className="flex justify-between">
                            <span>💎 +{finalGemsReward} Olmos</span>
                            <span className="text-[7px] text-zinc-500 font-mono">Standart</span>
                          </p>
                        </div>

                        <button 
                          onClick={() => {
                            setCoins(c => c + finalCoinsReward); // Coin reward with stadium multiplier
                            setGems(g => g + finalGemsReward); // Gem reward
                            setGameState('menu');
                          }}
                          className="bg-blue-500 hover:bg-blue-600 font-extrabold px-6 py-2 rounded-xl text-white shadow-lg tracking-wider transition uppercase text-[9px] block mx-auto mt-2"
                        >
                          KLUBGA QAYTISH
                        </button>
                      </div>
                    );
                  })()
                ) : (
                  <div className="flex flex-col gap-2 py-3">
                    <p className="text-zinc-500 text-[9px] uppercase font-bold text-center tracking-widest animate-pulse leading-none">To'p maydon bo'ylab harakatlanmoqda...</p>
                    <div className="w-10 h-10 rounded-full border-4 border-dashed border-blue-500/50 flex items-center justify-center mx-auto text-lg animate-spin mt-2.5">
                      ⚽
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Live game matching logs */}
            <div className="space-y-1.5 mt-3 border-t border-white/5 pt-3 max-h-[125px] overflow-y-auto shrink-0 select-none">
              <span className="text-[8px] text-zinc-500 font-bold uppercase tracking-wider leading-none">MATNDAGI O'YIN TAFFSILOTI:</span>
              
              {matchLogs.map((log, idx) => (
                <div key={idx} className="bg-zinc-90 w-full bg-zinc-900 border border-white/5 px-2.5 py-1.5 rounded-lg text-[8.5px] leading-relaxed text-slate-300">
                  {log}
                </div>
              ))}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
