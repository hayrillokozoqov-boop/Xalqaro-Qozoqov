/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AppConfig {
  id: string;
  name: string;
  uzName: string;
  icon: string; // Lucide icon identifier
  color: string; // Tailwind class
  category: 'app' | 'game';
  description: string;
  uzDescription: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'bot' | 'system' | 'news';
  senderName: string;
  text: string;
  time: string;
  media?: string;
}

export interface Chat {
  id: string;
  name: string;
  avatar: string; // color or fallback letter
  messages: Message[];
  unreadCount: number;
  isBot?: boolean;
  isChannel?: boolean;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  color: string;
}

export interface PhoneNotification {
  id: string;
  title: string;
  body: string;
  time: string;
  appName: string;
  appIcon: string;
  appColor: string;
}

export interface VideoItem {
  id: string;
  title: string;
  channel: string;
  views: string;
  time: string;
  duration: string;
  thumbnail: string;
  videoUrl?: string; // or mock iframe
  likes: string;
  comments: Array<{ user: string; text: string }>;
}

export interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  favorite: boolean;
}
