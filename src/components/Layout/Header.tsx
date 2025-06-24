import React, { useState } from 'react';
import { Menu, X, User, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import LoginModal from '../Auth/LoginModal';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user, logout, hasPermission } = useAuth();

  const navItems = [
    { id: 'home', label: 'Home', permission: ['guest'] },
    { id: 'teams', label: 'Teams', permission: ['guest'] },
    { id: 'players', label: 'Players', permission: ['guest'] },
    { id: 'contact', label: 'Contact', permission: ['guest'] },
    { id: 'scheduler', label: 'Scheduler', permission: ['member'] },
    { id: 'teampicker', label: 'Team Picker', permission: ['vice', 'captain'] },
    { id: 'admin', label: 'Admin', permission: ['admin'] },
  ];

  const visibleNavItems = navItems.filter(item => hasPermission(item.permission));

  return (
    <>
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => onNavigate('home')}
                className="text-2xl font-bold text-white hover:text-blue-200 transition-colors"
              >
                ICCWSC
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {visibleNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${
                    currentPage === item.id
                      ? 'text-white bg-white/20'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.id === 'admin' && <Shield size={16} />}
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            {/* User Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 text-white">
                    <User size={20} />
                    <span className="text-sm">{user.name}</span>
                    <span className={`text-xs px-2 py-1 rounded-full capitalize ${
                      user.role === 'admin' ? 'bg-red-500/20 text-red-300' :
                      user.role === 'captain' ? 'bg-yellow-500/20 text-yellow-300' :
                      user.role === 'vice' ? 'bg-blue-500/20 text-blue-300' :
                      'bg-white/20 text-white'
                    }`}>
                      {user.role === 'admin' ? 'Admin' :
                       user.role === 'vice' ? 'Vice Captain' : 
                       user.role}
                    </span>
                  </div>
                  <button
                    onClick={logout}
                    className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
                >
                  Login
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-white hover:bg-white/10 rounded-md"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/10 backdrop-blur-lg border-t border-white/20">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {visibleNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center space-x-2 ${
                    currentPage === item.id
                      ? 'text-white bg-white/20'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.id === 'admin' && <Shield size={16} />}
                  <span>{item.label}</span>
                </button>
              ))}
              
              {user ? (
                <div className="border-t border-white/20 pt-3 mt-3">
                  <div className="px-3 py-2 text-white text-sm">
                    Logged in as {user.name} ({user.role === 'vice' ? 'Vice Captain' : user.role})
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setShowLoginModal(true);
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
}