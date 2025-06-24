export interface User {
  username: string;
  role: 'guest' | 'member' | 'vice' | 'captain';
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