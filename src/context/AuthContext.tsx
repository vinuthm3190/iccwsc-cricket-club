import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  hasPermission: (requiredRole: string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const demoUsers: Record<string, User> = {
  'captain': {
    username: 'captain',
    role: 'captain',
    name: 'Alex Johnson'
  },
  'vice': {
    username: 'vice',
    role: 'vice',
    name: 'Sarah Martinez'
  },
  'member': {
    username: 'member',
    role: 'member',
    name: 'Mike Thompson'
  }
};

const roleHierarchy = {
  'guest': 0,
  'member': 1,
  'vice': 2,
  'captain': 3
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('sportsClubUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    if (demoUsers[username] && password === 'pass123') {
      const loggedInUser = demoUsers[username];
      setUser(loggedInUser);
      localStorage.setItem('sportsClubUser', JSON.stringify(loggedInUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sportsClubUser');
  };

  const hasPermission = (requiredRoles: string[]): boolean => {
    if (!user) return requiredRoles.includes('guest');
    return requiredRoles.some(role => 
      roleHierarchy[user.role] >= roleHierarchy[role as keyof typeof roleHierarchy]
    );
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user,
      hasPermission
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};