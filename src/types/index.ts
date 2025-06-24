export interface User {
  username: string;
  role: 'guest' | 'member' | 'vice' | 'captain' | 'admin';
  name: string;
}

export interface Event {
  id: string;
  title: string;
  type: 'practice' | 'meeting' | 'match';
  date: Date;
  time: string;
  description?: string;
  teams?: string[];
  location?: string;
}

export interface Player {
  id: string;
  name: string;
  position: 'Batsman' | 'All-rounder' | 'Bowler' | 'Wicket-keeper';
  avatar?: string;
  email?: string;
  phone?: string;
  stats?: {
    runs: number;
    wickets: number;
    matches: number;
  };
}

export interface TeamConfig {
  id: string;
  name: string;
  formation: string;
  players: Player[];
  createdBy: string;
  createdAt: Date;
}

export interface NotificationTemplate {
  id: string;
  name: string;
  subject: string;
  emailContent: string;
  whatsappContent: string;
  type: 'match' | 'practice' | 'meeting' | 'general';
  variables: string[];
}

export interface NotificationSettings {
  emailEnabled: boolean;
  whatsappEnabled: boolean;
  emailProvider: 'emailjs' | 'sendgrid' | 'mailgun';
  templates: NotificationTemplate[];
}

export interface NotificationRecipient {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  teams: string[];
  preferences: {
    emailNotifications: boolean;
    whatsappNotifications: boolean;
    matchReminders: boolean;
    practiceReminders: boolean;
    generalUpdates: boolean;
  };
}

export interface NotificationLog {
  id: string;
  type: 'email' | 'whatsapp';
  recipient: string;
  subject: string;
  content: string;
  status: 'sent' | 'failed' | 'pending';
  sentAt: Date;
  eventId?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: {
    name: string;
    username: string;
    role: string;
  };
  category: 'match-report' | 'player-spotlight' | 'team-news' | 'training-tips' | 'community' | 'general';
  tags: string[];
  publishedAt: Date;
  updatedAt?: Date;
  isPublished: boolean;
  likes: number;
  comments: BlogComment[];
  readTime: number;
  featuredImage?: string;
}

export interface BlogComment {
  id: string;
  content: string;
  author: {
    name: string;
    username: string;
    role: string;
  };
  createdAt: Date;
  likes: number;
  replies: BlogComment[];
}

export interface BlogFilters {
  category: string;
  author: string;
  tag: string;
  search: string;
  sortBy: 'newest' | 'oldest' | 'popular' | 'trending';
}