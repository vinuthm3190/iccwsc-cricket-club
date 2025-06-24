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
  smsContent: string;
  type: 'match' | 'practice' | 'meeting' | 'general';
  variables: string[];
}

export interface NotificationSettings {
  emailEnabled: boolean;
  smsEnabled: boolean;
  emailProvider: 'emailjs' | 'sendgrid' | 'mailgun';
  smsProvider: 'twilio' | 'nexmo';
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
    smsNotifications: boolean;
    matchReminders: boolean;
    practiceReminders: boolean;
    generalUpdates: boolean;
  };
}

export interface NotificationLog {
  id: string;
  type: 'email' | 'sms';
  recipient: string;
  subject: string;
  content: string;
  status: 'sent' | 'failed' | 'pending';
  sentAt: Date;
  eventId?: string;
}