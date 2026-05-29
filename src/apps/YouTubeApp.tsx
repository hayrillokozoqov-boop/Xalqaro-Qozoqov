/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, ThumbsUp, Heart, Play, CornerDownLeft, MessageSquare, ArrowLeft } from 'lucide-react';
import { VideoItem } from '../types';

const INITIAL_VIDEOS: VideoItem[] = [
  {
    id: '1',
    title: 'FC Mobile 24 - Dunyo Chempionati Final O\'yini 🇺🇿',
    channel: 'FC Mobile UZ',
    views: '124,500 marta',
    time: '2 kun oldin',
    duration: '10:45',
    thumbnail: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'Udtb8Wscx0Y', // FC Mobile gameplay ID
    likes: '12,400',
    comments: [
      { user: 'Jasur_99', text: 'Tarkib daxshat yig\'ilibdi, men ham kutyapman shu o\'yinni!' },
      { user: 'Bexruz_FC', text: 'Zarba juda aniq chiqdi, qoyil!' }
    ]
  },
  {
    id: '2',
    title: 'PUBG MOBILE - 100 kishi bilan o\'ta xavfli zonalarda omon qolish!',
    channel: 'Uzbek Cyber Gamer',
    views: '342,000 marta',
    time: '5 soat oldin',
    duration: '18:22',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'pIq1O_uclJ4', // PUBG Mobile dynamic stream ID
    likes: '45,210',
    comments: [
      { user: 'Azizbek_PUBG', text: 'Omon qolish darslari uchun rahmat bro!' },
      { user: 'Farhod_S', text: 'Grafika maksimal darajada qo\'yilibdi.' }
    ]
  },
  {
    id: '3',
    title: 'Samarqand Afsonasi - Sharq Gavhari bo\'ylab Sayohat (4K Vlog)',
    channel: 'Uzbekistan Travel',
    views: '98,000 marta',
    time: '1 hafta oldin',
    duration: '12:15',
    thumbnail: 'https://images.unsplash.com/photo-1584646098025-e786b3edaebd?auto=format&fit=crop&w=600&q=80',
    videoUrl: '88TjX4SgDmg', // Uzbekistan tourism/Samarkand
    likes: '8,900',
    comments: [
      { user: 'Laziz_Art', text: 'Registon maydoni har gal hayajonga soladi.' },
      { user: 'Elena_K', text: 'Beautiful culture, greetings from Germany!' }
    ]
  },
  {
    id: '4',
    title: 'DLS 26 - Yangi tahrirlar, transferlar va o\'yin boshqaruvi',
    channel: 'DLS Liga UZ',
    views: '54,000 marta',
    time: '3 kun oldin',
    duration: '08:40',
    thumbnail: 'https://images.unsplash.com/photo-1518063319789-7217e6706b04?auto=format&fit=crop&w=600&q=80',
    videoUrl: '7C602kSWhcI', // DLS gameplay
    likes: '3,120',
    comments: [
      { user: 'Sardor_FC', text: 'DLS 26 kutayotganlar bormi? Klass bosamiz.' },
      { user: 'Jahon_Sport', text: 'Yangi yuzlar mukammal yasalibdi.' }
    ]
  },
  {
    id: '5',
    title: 'Vositachisiz Yangi Texnologiyalar: Kelajak Smartfonlari',
    channel: 'TexnoXabar',
    views: '215,000 marta',
    time: '1 oy oldin',
    duration: '14:30',
    thumbnail: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
    videoUrl: '820_vVdofR8', // Tech review
    likes: '19,800',
    comments: [
      { user: 'Murodjon', text: 'Virtual tizimlar haqiqatdan juda tez rivojlanmoqda.' }
    ]
  }
];

export default function YouTubeApp() {
  const [videos, setVideos] = useState<VideoItem[]>(INITIAL_VIDEOS);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');
  const [likedVideos, setLikedVideos] = useState<Record<string, boolean>>({});

  const filteredVideos = videos.filter(v =>
    v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.channel.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLike = (id: string) => {
    const isAlreadyLiked = likedVideos[id];
    setLikedVideos(prev => ({ ...prev, [id]: !isAlreadyLiked }));

    setVideos(prev =>
      prev.map(v => {
        if (v.id === id) {
          const currentLikes = parseInt(v.likes.replace(/,/g, ''));
          const nextLikes = isAlreadyLiked ? currentLikes - 1 : currentLikes + 1;
          return { ...v, likes: nextLikes.toLocaleString() };
        }
        return v;
      })
    );

    if (selectedVideo && selectedVideo.id === id) {
      setSelectedVideo(prev => {
        if (!prev) return null;
        const currentLikes = parseInt(prev.likes.replace(/,/g, ''));
        const nextLikes = isAlreadyLiked ? currentLikes - 1 : currentLikes + 1;
        return { ...prev, likes: nextLikes.toLocaleString() };
      });
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !selectedVideo) return;

    const author = userName.trim() || 'Foydalanuvchi';
    const updatedComment = { user: author, text: newComment.trim() };

    setVideos(prev =>
      prev.map(v => {
        if (v.id === selectedVideo.id) {
          return { ...v, comments: [updatedComment, ...v.comments] };
        }
        return v;
      })
    );

    setSelectedVideo(prev => {
      if (!prev) return null;
      return { ...prev, comments: [updatedComment, ...prev.comments] };
    });

    setNewComment('');
  };

  return (
    <div className="flex flex-col h-full bg-zinc-950 text-white font-sans text-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-800 bg-zinc-900 sticky top-0 z-10 shrink-0">
        <div className="flex items-center gap-2">
          {selectedVideo && (
            <button
              onClick={() => setSelectedVideo(null)}
              className="p-1 rounded-full hover:bg-zinc-800"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
          )}
          <span className="flex items-center gap-1 font-bold text-lg tracking-tight text-red-500">
            <span className="bg-red-600 text-white rounded px-1.5 py-0.2 mr-0.5 text-xs">YT</span>
            YouTube
          </span>
        </div>
        {!selectedVideo && (
          <div className="relative flex-1 max-w-[170px] ml-4">
            <input
              type="text"
              placeholder="Qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-800 text-xs px-2.5 py-1 pl-7 rounded-full border border-transparent focus:border-zinc-700 outline-none text-white text-zinc-300"
            />
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-2" />
          </div>
        )}
      </div>

      {/* Main Body */}
      <div className="flex-1 overflow-y-auto">
        {selectedVideo ? (
          <div className="flex flex-col pb-6">
            {/* Embedded Iframe Video Player */}
            <div className="w-full aspect-video bg-black relative">
              <iframe
                title={selectedVideo.title}
                src={`https://www.youtube.com/embed/${selectedVideo.videoUrl}?autoplay=1&mute=1&controls=1&loading=lazy`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>

            {/* Video Details */}
            <div className="p-3.5">
              <h1 className="font-semibold text-base leading-tight mt-1 text-zinc-100">
                {selectedVideo.title}
              </h1>
              <p className="text-zinc-400 text-xs mt-1">
                {selectedVideo.views} • {selectedVideo.time}
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 mt-3.5 pb-3.5 border-b border-zinc-800">
                <button
                  onClick={() => handleLike(selectedVideo.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                    likedVideos[selectedVideo.id]
                      ? 'bg-red-600 text-white'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{selectedVideo.likes}</span>
                </button>
                <div className="text-xs text-zinc-400">
                  Kanal: <span className="text-zinc-200 font-semibold">{selectedVideo.channel}</span>
                </div>
              </div>

              {/* Comment Input */}
              <div className="mt-4">
                <h3 className="font-semibold text-sm flex items-center gap-1.5 text-zinc-200">
                  <MessageSquare className="w-4 h-4 text-zinc-400" />
                  Fikrlar ({selectedVideo.comments.length})
                </h3>

                <form onSubmit={handleAddComment} className="mt-2.5 bg-zinc-900 border border-zinc-800 p-2.5 rounded-lg flex flex-col gap-2">
                  <input
                    type="text"
                    placeholder="Ismingiz (ixtiyoriy)..."
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full bg-zinc-800 border border-transparent rounded px-2.5 py-1 text-xs outline-none text-zinc-200"
                  />
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Fikringizni yozing..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="w-full bg-zinc-800 border border-transparent rounded px-2.5 py-1.5 pr-8 text-xs outline-none text-zinc-200"
                      required
                    />
                    <button
                      type="submit"
                      className="absolute right-1 top-1 p-1 text-red-500 hover:text-red-400 rounded"
                    >
                      <CornerDownLeft className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>

              {/* Comment List */}
              <div className="mt-4 flex flex-col gap-2.5">
                {selectedVideo.comments.map((c, i) => (
                  <div key={i} className="bg-zinc-900/60 p-2.5 rounded-md border border-zinc-800/40">
                    <div className="flex items-center gap-1">
                      <div className="w-5 h-5 rounded-full bg-red-800 flex items-center justify-center text-[10px] font-bold text-white capitalize">
                        {c.user[0]}
                      </div>
                      <span className="text-xs font-semibold text-zinc-300">{c.user}</span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1 pl-6">{c.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-3 grid grid-cols-1 gap-4">
            {filteredVideos.map(video => (
              <div
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className="cursor-pointer group flex flex-col rounded-lg overflow-hidden bg-zinc-900 hover:bg-zinc-900/80 border border-zinc-800 transition"
              >
                <div className="relative aspect-video w-full bg-zinc-800">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition duration-300"
                  />
                  <span className="absolute bottom-1.5 right-1.5 bg-black/80 text-[10px] px-1.5 py-0.5 rounded font-mono">
                    {video.duration}
                  </span>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                    <div className="p-2.5 rounded-full bg-red-600 text-white shadow-lg">
                      <Play className="w-5 h-5 fill-current" />
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <p className="font-medium text-sm text-zinc-100 line-clamp-2 leading-snug">
                    {video.title}
                  </p>
                  <div className="flex items-center justify-between mt-1.5 text-xs text-zinc-400">
                    <span>{video.channel}</span>
                    <span>{video.views} • {video.time}</span>
                  </div>
                </div>
              </div>
            ))}
            {filteredVideos.length === 0 && (
              <div className="text-center py-10 text-zinc-500 text-xs">
                Videolar topilmadi.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
