/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AppConfig } from '../types';

export const APPS_DATA: AppConfig[] = [
  // 30 APPS
  {
    id: 'telegram',
    name: 'Telegram',
    uzName: 'Telegram',
    icon: 'MessageSquareText',
    color: 'bg-sky-500 hover:bg-sky-600 text-white',
    category: 'app',
    description: 'Cloud messaging app with super-fast communication, groups, bots and channels.',
    uzDescription: 'Tezkor, xavfsiz va guruhlar hamda kanallar bilan jihozlangan bulutli xabar almashish ilovasi.'
  },
  {
    id: 'youtube',
    name: 'YouTube',
    uzName: 'YouTube',
    icon: 'Play',
    color: 'bg-red-600 hover:bg-red-700 text-white',
    category: 'app',
    description: 'Video sharing platform where you can search, view, like, and comment on videos.',
    uzDescription: 'Videolarni qidirish, tomosha qilish, baholash va fikr qoldirish imkonini beruvchi platforma.'
  },
  {
    id: 'phone',
    name: 'Phone Dialer',
    uzName: 'Telefon',
    icon: 'Phone',
    color: 'bg-emerald-500 hover:bg-emerald-600 text-white',
    category: 'app',
    description: 'Make digital phone calls, type dial numbers and view call history.',
    uzDescription: 'Raqamlarni terish, qo\'ng\'iroqlar amalga oshirish va tarixni ko\'rish ilovasi.'
  },
  {
    id: 'contacts',
    name: 'Contacts',
    uzName: 'Kontaktlar',
    icon: 'Users',
    color: 'bg-amber-500 hover:bg-amber-600 text-white',
    category: 'app',
    description: 'Store, filter and organize contact information of friends and colleagues.',
    uzDescription: 'Do\'stlar va hamkasblarning kontakt ma\'lumotlarini saqlash va tartiblash.'
  },
  {
    id: 'messages',
    name: 'Messages',
    uzName: 'SMS Xabarlar',
    icon: 'MailOpen',
    color: 'bg-blue-500 hover:bg-blue-600 text-white',
    category: 'app',
    description: 'Send and receive secure, instant local SMS text messages.',
    uzDescription: 'Tezkor va xavfsiz SMS xabarlar yuborish va qabul qilish ilovasi.'
  },
  {
    id: 'settings',
    name: 'Settings',
    uzName: 'Sozlamalar',
    icon: 'Settings',
    color: 'bg-slate-500 hover:bg-slate-600 text-white',
    category: 'app',
    description: 'Configure phone system preferences like wallpapers, language, brightness and dark mode.',
    uzDescription: 'Telefon sozlamalari, fon rasmlari, til, yorqinlik va tungi rejimni boshqarish.'
  },
  {
    id: 'calculator',
    name: 'Calculator',
    uzName: 'Kalkulyator',
    icon: 'Calculator',
    color: 'bg-orange-500 hover:bg-orange-600 text-white',
    category: 'app',
    description: 'Solve mathematical operations using standard and scientific mode.',
    uzDescription: 'Matematik hisob-kitoblar va operatsiyalarni bajarish uchun qulay kalkulyator.'
  },
  {
    id: 'gallery',
    name: 'Gallery',
    uzName: 'Galereya',
    icon: 'Image',
    color: 'bg-purple-500 hover:bg-purple-600 text-white',
    category: 'app',
    description: 'Explore full resolution images, view slides and edit wallpapers.',
    uzDescription: 'Rasm va videolarni tomosha qilish hamda tahrirlash uchun galereya.'
  },
  {
    id: 'browser',
    name: 'Web Browser',
    uzName: 'Brauzer',
    icon: 'Compass',
    color: 'bg-cyan-500 hover:bg-cyan-600 text-white',
    category: 'app',
    description: 'Browse news, encyclopedia and virtual internet web pages.',
    uzDescription: 'Internet sahifalari bo\'ylab sayohat qilish hamda qidiruv xizmati.'
  },
  {
    id: 'weather',
    name: 'Weather',
    uzName: 'Ob-havo',
    icon: 'CloudSun',
    color: 'bg-teal-400 hover:bg-teal-500 text-white',
    category: 'app',
    description: 'Realtime weather forecast and stats for Tashkent, Samarkand and other cities.',
    uzDescription: 'Toshkent, Samarqand va boshqa shaharlarning jonli ob-havo ma\'lumotlari.'
  },
  {
    id: 'notes',
    name: 'Notes',
    uzName: 'Eslatmalar',
    icon: 'FileText',
    color: 'bg-yellow-500 hover:bg-yellow-600 text-white',
    category: 'app',
    description: 'Write, categorize and persistent save thoughts, lists and study logs.',
    uzDescription: 'Muhim eslatmalar, rejalar va qaydlarni yozib borish hamda saqlash.'
  },
  {
    id: 'music',
    name: 'Music Player',
    uzName: 'Musiqa Pleyer',
    icon: 'Music',
    color: 'bg-pink-500 hover:bg-pink-600 text-white',
    category: 'app',
    description: 'Play local melodies, adjust high-fidelity volume and see an active visualizer.',
    uzDescription: 'Musiqalarni tinglash, visualizator va pleylistlarni boshqarish.'
  },
  {
    id: 'clock',
    name: 'Clock & Timer',
    uzName: 'Soat & Budilnik',
    icon: 'Clock',
    color: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    category: 'app',
    description: 'Set custom alarms, view global timezones, and run the precise stopwatch or timer.',
    uzDescription: 'Budilnik o\'rnatish, jahon vaqti, sekundomer va taymer tizimi.'
  },
  {
    id: 'calendar',
    name: 'Calendar',
    uzName: 'Kalendar',
    icon: 'CalendarDays',
    color: 'bg-rose-500 hover:bg-rose-600 text-white',
    category: 'app',
    description: 'Keep track of schedules, highlight dates and add daily tasks with ease.',
    uzDescription: 'Kunlik rejalar, muhim sanalar eslatmasi va taqvim ko\'rinishi.'
  },
  {
    id: 'maps',
    name: 'Virtual Map',
    uzName: 'Xaritalar',
    icon: 'MapPin',
    color: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    category: 'app',
    description: 'Search cities in Uzbekistan, estimate distance and plan car navigator paths.',
    uzDescription: 'O\'zbekiston va boshqa davlatlar xaritasini ko\'rish, marshrut qurish.'
  },
  {
    id: 'files',
    name: 'File Manager',
    uzName: 'Fayllar',
    icon: 'FolderOpen',
    color: 'bg-neutral-600 hover:bg-neutral-700 text-white',
    category: 'app',
    description: 'Explore folders like Downloads, Documents, Images and monitor storage space.',
    uzDescription: 'Tizim papkalari, yuklangan fayllar va xotira boshqaruvi.'
  },
  {
    id: 'recorder',
    name: 'Voice Recorder',
    uzName: 'Diktofon',
    icon: 'Mic',
    color: 'bg-violet-600 hover:bg-violet-700 text-white',
    category: 'app',
    description: 'Record professional audio tapes with interactive voice waveform capture.',
    uzDescription: 'Ovoz yozib olish va to\'lqinli grafik orqali tahrirlash.'
  },
  {
    id: 'bank',
    name: 'Milliy Bank',
    uzName: 'Milliy Bank (Pay)',
    icon: 'CreditCard',
    color: 'bg-cyan-600 hover:bg-cyan-700 text-white',
    category: 'app',
    description: 'Manage virtual bank system, transfer money via card numbers with zero transaction fee.',
    uzDescription: 'Virtual bank kartalarini boshqarish va pul o\'tkazmalari tizimi.'
  },
  {
    id: 'translator',
    name: 'Translator',
    uzName: 'Tarjimon',
    icon: 'Languages',
    color: 'bg-sky-600 hover:bg-sky-700 text-white',
    category: 'app',
    description: 'Instant translation dictionary between Uzbek, English and Russian languages.',
    uzDescription: 'O\'zbek, Ingliz va Rus tillari o\'rtasida lahzali tarjima va so\'zlik.'
  },
  {
    id: 'fitness',
    name: 'Health Hub',
    uzName: 'Salomatlik',
    icon: 'Activity',
    color: 'bg-red-400 hover:bg-red-500 text-white',
    category: 'app',
    description: 'Track daily steps, active heart rate, calorie burn and water level reminders.',
    uzDescription: 'Qadamlar soni, yurak urishi chastotasi va kaloriya hisoblagich.'
  },
  {
    id: 'qr',
    name: 'QR Scanner',
    uzName: 'QR Skaner',
    icon: 'QrCode',
    color: 'bg-zinc-700 hover:bg-zinc-800 text-white',
    category: 'app',
    description: 'Generate customized QR labels and simulate code scanning.',
    uzDescription: 'QR kodlar yaratish va skanerlashni simulyatsiya qilish.'
  },
  {
    id: 'books',
    name: 'Library Reader',
    uzName: 'Kutubxona',
    icon: 'BookOpen',
    color: 'bg-amber-600 hover:bg-amber-700 text-white',
    category: 'app',
    description: 'Interactive reader of beautiful folklore, historical and science literature.',
    uzDescription: 'Badiiy va ilmiy kitoblarni o\'qish uchun virtual kutubxona.'
  },
  {
    id: 'store',
    name: 'Play Market',
    uzName: 'Play Bozor',
    icon: 'ShoppingBag',
    color: 'bg-indigo-500 hover:bg-indigo-600 text-white',
    category: 'app',
    description: 'Discover modern games, applications, download and rate popular apps.',
    uzDescription: 'Yangi o\'yin va ilovalarni yuklash, yangilash va boshqarish bozori.'
  },
  {
    id: 'medical',
    name: 'Medical Aid',
    uzName: 'Tibbiy Yordam',
    icon: 'Heart',
    color: 'bg-rose-500 hover:bg-rose-600 text-white',
    category: 'app',
    description: 'Virtual symptom diagnostic analyzer and emergency healthcare instructions.',
    uzDescription: 'Simptomlar asosida tibbiy maslahat va birinchi yordam ko\'rsatgichi.'
  },
  {
    id: 'paint',
    name: 'E-Sketch Paint',
    uzName: 'Rasmxona / Sketch',
    icon: 'Paintbrush',
    color: 'bg-fuchsia-500 hover:bg-fuchsia-600 text-white',
    category: 'app',
    description: 'Paint sketches directly on an interactive multi-color brush canvas.',
    uzDescription: 'Turli xil ranglar va mo\'yqalam bilan rasm chizish imkoniyati.'
  },
  {
    id: 'quiz',
    name: 'General Quiz',
    uzName: 'Viktorina',
    icon: 'HelpCircle',
    color: 'bg-purple-600 hover:bg-purple-700 text-white',
    category: 'app',
    description: 'Test your brain with 10 questions covering science, world flags and space physics.',
    uzDescription: 'Koinot, davlat bayroqlari va fanlardan tuzilgan qiziqarli test o\'yini.'
  },
  {
    id: 'mail',
    name: 'Mail Client',
    uzName: 'E-Pochta',
    icon: 'Mail',
    color: 'bg-blue-600 hover:bg-blue-700 text-white',
    category: 'app',
    description: 'Draft secure e-mails, read incoming business notifications and reports.',
    uzDescription: 'Elektron xatlar yozish, kiruvchi xabarlar va hisobotlarni tahlil qilish.'
  },
  {
    id: 'rates',
    name: 'Exchange Rates',
    uzName: 'Valyutalar Kursi',
    icon: 'TrendingUp',
    color: 'bg-emerald-500 hover:bg-emerald-600 text-white',
    category: 'app',
    description: 'Track exchange rates of USD, EUR and RUB to Uzbek Som with clean chart info.',
    uzDescription: 'Dollar, Yevro va Rublning so\'mga nisbatan kursi va grafiklati.'
  },
  {
    id: 'tasbeh',
    name: 'Digital Tasbeeh',
    uzName: 'Zikr (Tasbeh)',
    icon: 'Fingerprint',
    color: 'bg-teal-600 hover:bg-teal-700 text-white',
    category: 'app',
    description: 'Digital counter with responsive sound clicks and haptic vibrate feel list.',
    uzDescription: 'Zikrlar va duolarni hisoblash uchun ovozli raqamli tasbeh.'
  },
  {
    id: 'tourism',
    name: 'Uzbek Tour',
    uzName: 'Sayyoh (Turizm)',
    icon: 'Globe',
    color: 'bg-lime-600 hover:bg-lime-700 text-white',
    category: 'app',
    description: 'Discover the heritage of Samarkand, Bukhara, Khiva and navigate historical cards.',
    uzDescription: 'Samarqand, Buxoro, Xiva va Toshkentning tarixiy obidalari haqida qo\'llanma.'
  },

  // 10 GAMES
  {
    id: 'pubg',
    name: 'PUBG Mobile',
    uzName: 'PUBG Mobile',
    icon: 'Bomb',
    color: 'bg-amber-700 hover:bg-amber-800 text-amber-100',
    category: 'game',
    description: 'Full strategic survival shooter action game, land, collect supplies and eliminate enemies.',
    uzDescription: 'Haqiqiy jangovar strategiya simulyatori, qurol yig\'ish va dushmanlarni engish.'
  },
  {
    id: 'fc',
    name: 'FC Mobile',
    uzName: 'FC Mobile',
    icon: 'Trophy',
    color: 'bg-emerald-700 hover:bg-emerald-800 text-yellow-300',
    category: 'game',
    description: 'High-stake football soccer match builder, shoot, pass, cross, and play dynamic matches.',
    uzDescription: 'Haqiqiy futbol simulyatori: to\'p uzatish, jarima zarbalari va tarkib yig\'ish.'
  },
  {
    id: 'dls',
    name: 'DLS 26',
    uzName: 'DLS 26 (Soccer)',
    icon: 'Award',
    color: 'bg-blue-800 hover:bg-blue-900 text-blue-100',
    category: 'game',
    description: 'Dream League Soccer 2026 tactical simulation with match play and upgrade mechanisms.',
    uzDescription: 'DLS 2026 futbol ligasi, faol boshqaruv va taktik jamoani rivojlantirish.'
  },
  {
    id: 'subway',
    name: 'Subway Surfers',
    uzName: 'Subway Surfers',
    icon: 'Train',
    color: 'bg-yellow-400 hover:bg-yellow-500 text-gray-900',
    category: 'game',
    description: 'Endless lane-running arcade, swipe to dodge trains, jump blocks and swipe under obstacles.',
    uzDescription: 'Cheksiz yugurish, poyezdlar va to\'siqlardan sakrab o\'tib tangalarni yig\'ish.'
  },
  {
    id: 'minecraft',
    name: 'Minecraft Mini',
    uzName: 'Minecraft Mini',
    icon: 'Boxes',
    color: 'bg-green-700 hover:bg-green-800 text-lime-100',
    category: 'game',
    description: '2D sandbox construction building grid. Design houses, plant grids and manipulate structures.',
    uzDescription: '2D formatdagi bloklar dunyosi. O\'z uyingiz va inshootlaringizni qurish.'
  },
  {
    id: 'tetris',
    name: 'Tetris Arcade',
    uzName: 'Tetris Classic',
    icon: 'Grid',
    color: 'bg-sky-700 hover:bg-sky-800 text-white',
    category: 'game',
    description: 'Play standard visual blocks game, line clearances, rotations and high score leaderboard.',
    uzDescription: 'Bloklarni to\'g\'ri joylashtirish va butun qatorlarni o\'chirish o\'yini.'
  },
  {
    id: 'tictactoe',
    name: 'Tic-Tac-Toe',
    uzName: 'Tic-Tac-Toe',
    icon: 'X',
    color: 'bg-teal-500 hover:bg-teal-600 text-white',
    category: 'game',
    description: 'Classic three-in-a-row layout game with fully functional smart smart computer AI levels.',
    uzDescription: 'X va O o\'yini: aqlli kompyuter sun\'iy intellektiga qarshi kuchingizni sinang.'
  },
  {
    id: 'two_zero_four_eight',
    name: '2048 Blocks',
    uzName: '2048 Puzzle',
    icon: 'Hash',
    color: 'bg-amber-500 hover:bg-amber-600 text-white',
    category: 'game',
    description: 'Slide numbers on grid board to fuse matching block coefficients to secure 2048.',
    uzDescription: 'Raqamlarni birlashtirish orqali 2048 blokini hosil qilish boshqotirmasi.'
  },
  {
    id: 'snake',
    name: 'Snake Pro',
    uzName: 'Iloncha Classic',
    icon: 'RotateCcw',
    color: 'bg-emerald-500 hover:bg-emerald-600 text-white',
    category: 'game',
    description: 'Classic retro snake game, manipulate directions to digest apples, prevent wall collisions.',
    uzDescription: 'Klassik iloncha o\'yini, olma yeng va o\'z dumingizga urilib ketmang.'
  },
  {
    id: 'flappy',
    name: 'Flappy Bird',
    uzName: 'Flappy Bird',
    icon: 'Bird',
    color: 'bg-blue-400 hover:bg-blue-500 text-white',
    category: 'game',
    description: 'Physics active flappy mechanics runner, jump between narrow green pipelines to score score.',
    uzDescription: 'Qizil va yashil quvurlar orasidan qushchani mahorat bilan olib o\'tish.'
  }
];
