import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  hasPermission: (requiredRole: string[]) => boolean;
  addUser: (username: string, password: string, name: string, role: string) => void;
  updateUser: (username: string, updates: Partial<User>) => void;
  deleteUser: (username: string) => void;
  getAllUsers: () => Array<{ username: string; password: string; user: User }>;
}

interface StoredUser {
  username: string;
  password: string;
  user: User;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const roleHierarchy = {
  'guest': 0,
  'member': 1,
  'vice': 2,
  'captain': 3,
  'admin': 4
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<StoredUser[]>([]);

  useEffect(() => {
    // Load current user
    const savedUser = localStorage.getItem('sportsClubUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // Load all users or initialize with admin
    const savedUsers = localStorage.getItem('sportsClubUsers');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      // Initialize with admin user
      const initialUsers: StoredUser[] = [{
        username: 'admin',
        password: 'Casper@2022',
        user: {
          username: 'admin',
          role: 'admin',
          name: 'System Administrator'
        }
      }];
      setUsers(initialUsers);
      localStorage.setItem('sportsClubUsers', JSON.stringify(initialUsers));
    }
  }, []);

  // Save users to localStorage whenever users array changes
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('sportsClubUsers', JSON.stringify(users));
    }
  }, [users]);

  const login = (username: string, password: string): boolean => {
    const foundUser = users.find(u => u.username === username && u.password === password);
    if (foundUser) {
      setUser(foundUser.user);
      localStorage.setItem('sportsClubUser', JSON.stringify(foundUser.user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sportsClubUser');
  };

  const addUser = (username: string, password: string, name: string, role: string) => {
    const newUser: User = {
      username,
      role: role as User['role'],
      name
    };

    const newStoredUser: StoredUser = {
      username,
      password,
      user: newUser
    };

    setUsers(prev => [...prev, newStoredUser]);
  };

  const updateUser = (username: string, updates: Partial<User>) => {
    setUsers(prev => prev.map(storedUser => 
      storedUser.username === username 
        ? { ...storedUser, user: { ...storedUser.user, ...updates } }
        : storedUser
    ));

    // Update current user if it's the same user
    if (user && user.username === username) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('sportsClubUser', JSON.stringify(updatedUser));
    }
  };

  const deleteUser = (username: string) => {
    setUsers(prev => prev.filter(storedUser => storedUser.username !== username));
    
    // Logout if deleting current user
    if (user && user.username === username) {
      logout();
    }
  };

  const getAllUsers = () => {
    return users;
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
      hasPermission,
      addUser,
      updateUser,
      deleteUser,
      getAllUsers
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