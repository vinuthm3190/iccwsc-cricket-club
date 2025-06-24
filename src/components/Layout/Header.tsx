import React, { useState } from 'react';
import { Menu, X, User, LogOut, Shield, Bell, BookOpen, Database, ChevronDown, Home, Users, Trophy, Calendar, Target, MessageSquare, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import LoginModal from '../Auth/LoginModal';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showManagementDropdown, setShowManagementDropdown] = useState(false);
  const { user, logout, hasPermission } = useAuth();

  // Core navigation items (always visible)
  const coreNavItems = [
    { id: 'home', label: 'Home', icon: Home, permission: ['guest'] },
    { id: 'teams', label: 'Teams', icon: Trophy, permission: ['guest'] },
    { id: 'players', label: 'Players', icon: Users, permission: ['guest'] },
    { id: 'blog', label: 'Blog', icon: BookOpen, permission: ['guest'] },
    { id: 'contact', label: 'Contact', icon: MessageSquare, permission: ['guest'] },
  ];

  // Member-only items
  const memberNavItems = [
    { id: 'scheduler', label: 'Scheduler', icon: Calendar, permission: ['member'] },
  ];

  // Leadership items (grouped in dropdown)
  const leadershipItems = [
    { id: 'teampicker', label: 'Team Picker', icon: Target, permission: ['vice', 'captain'] },
    { id: 'notifications', label: 'Notifications', icon: Bell, permission: ['captain', 'admin'] },
  ];

  // Admin items (grouped in dropdown)
  const adminItems = [
    { id: 'admin', label: 'User Management', icon: Shield, permission: ['admin'] },
    { id: 'data', label: 'Data Management', icon: Database, permission: ['admin'] },
  ];

  // Filter items based on permissions
  const visibleCoreItems = coreNavItems.filter(item => hasPermission(item.permission));
  const visibleMemberItems = memberNavItems.filter(item => hasPermission(item.permission));
  const visibleLeadershipItems = leadershipItems.filter(item => hasPermission(item.permission));
  const visibleAdminItems = adminItems.filter(item => hasPermission(item.permission));

  const hasManagementAccess = visibleLeadershipItems.length > 0 || visibleAdminItems.length > 0;

  const handleNavigation = (pageId: string) => {
    onNavigate(pageId);
    setIsMenuOpen(false);
    setShowManagementDropdown(false);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'captain': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'vice': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'member': return 'bg-green-500/20 text-green-300 border-green-500/30';
      default: return 'bg-white/20 text-white border-white/30';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Admin';
      case 'captain': return 'Captain';
      case 'vice': return 'Vice Captain';
      case 'member': return 'Member';
      default: return 'Guest';
    }
  };

  return (
    <>
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo Section */}
            <div className="flex items-center">
              <button
                onClick={() => handleNavigation('home')}
                className="flex items-center space-x-3 text-white hover:text-orange-200 transition-colors group"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-green-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Trophy className="text-white" size={20} />
                </div>
                <div className="hidden sm:block">
                  <div className="text-xl font-bold">ICCWSC</div>
                  <div className="text-xs text-white/70 -mt-1">Cricket Club</div>
                </div>
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {/* Core Navigation */}
              {visibleCoreItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                      currentPage === item.id
                        ? 'text-white bg-white/20 shadow-lg'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </button>
                );
              })}

              {/* Member Items */}
              {visibleMemberItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                      currentPage === item.id
                        ? 'text-white bg-white/20 shadow-lg'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </button>
                );
              })}

              {/* Management Dropdown */}
              {hasManagementAccess && (
                <div className="relative">
                  <button
                    onClick={() => setShowManagementDropdown(!showManagementDropdown)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                      visibleLeadershipItems.some(item => item.id === currentPage) || visibleAdminItems.some(item => item.id === currentPage)
                        ? 'text-white bg-white/20 shadow-lg'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Settings size={16} />
                    <span>Management</span>
                    <ChevronDown size={14} className={`transition-transform ${showManagementDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Management Dropdown Menu */}
                  {showManagementDropdown && (
                    <div className="absolute top-full right-0 mt-2 w-56 bg-white/20 backdrop-blur-lg rounded-2xl border border-white/30 shadow-2xl py-2 z-50">
                      {/* Leadership Section */}
                      {visibleLeadershipItems.length > 0 && (
                        <>
                          <div className="px-4 py-2 text-xs font-semibold text-white/60 uppercase tracking-wider">
                            Team Leadership
                          </div>
                          {visibleLeadershipItems.map((item) => {
                            const Icon = item.icon;
                            return (
                              <button
                                key={item.id}
                                onClick={() => handleNavigation(item.id)}
                                className={`w-full text-left px-4 py-3 text-sm transition-colors flex items-center space-x-3 ${
                                  currentPage === item.id
                                    ? 'text-white bg-white/20'
                                    : 'text-white/80 hover:text-white hover:bg-white/10'
                                }`}
                              >
                                <Icon size={16} />
                                <span>{item.label}</span>
                              </button>
                            );
                          })}
                        </>
                      )}

                      {/* Admin Section */}
                      {visibleAdminItems.length > 0 && (
                        <>
                          {visibleLeadershipItems.length > 0 && (
                            <div className="border-t border-white/20 my-2"></div>
                          )}
                          <div className="px-4 py-2 text-xs font-semibold text-white/60 uppercase tracking-wider">
                            Administration
                          </div>
                          {visibleAdminItems.map((item) => {
                            const Icon = item.icon;
                            return (
                              <button
                                key={item.id}
                                onClick={() => handleNavigation(item.id)}
                                className={`w-full text-left px-4 py-3 text-sm transition-colors flex items-center space-x-3 ${
                                  currentPage === item.id
                                    ? 'text-white bg-white/20'
                                    : 'text-white/80 hover:text-white hover:bg-white/10'
                                }`}
                              >
                                <Icon size={16} />
                                <span>{item.label}</span>
                              </button>
                            );
                          })}
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="hidden md:flex items-center space-x-3">
                  <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/20">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-green-500 rounded-full flex items-center justify-center">
                      <User size={16} className="text-white" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-semibold text-white">{user.name}</div>
                      <div className={`text-xs px-2 py-1 rounded-full border ${getRoleColor(user.role)}`}>
                        {getRoleLabel(user.role)}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={logout}
                    className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                    title="Logout"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="hidden md:block bg-gradient-to-r from-orange-500 to-green-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-orange-600 hover:to-green-700 transition-all transform hover:scale-105"
                >
                  Login
                </button>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-white hover:bg-white/10 rounded-xl transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white/10 backdrop-blur-lg border-t border-white/20">
            <div className="px-4 pt-4 pb-6 space-y-2">
              {/* Core Navigation */}
              {visibleCoreItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors flex items-center space-x-3 ${
                      currentPage === item.id
                        ? 'text-white bg-white/20'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </button>
                );
              })}

              {/* Member Items */}
              {visibleMemberItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors flex items-center space-x-3 ${
                      currentPage === item.id
                        ? 'text-white bg-white/20'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </button>
                );
              })}

              {/* Leadership Items */}
              {visibleLeadershipItems.length > 0 && (
                <>
                  <div className="border-t border-white/20 my-3"></div>
                  <div className="px-4 py-2 text-xs font-semibold text-white/60 uppercase tracking-wider">
                    Team Leadership
                  </div>
                  {visibleLeadershipItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavigation(item.id)}
                        className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors flex items-center space-x-3 ${
                          currentPage === item.id
                            ? 'text-white bg-white/20'
                            : 'text-white/80 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <Icon size={20} />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </>
              )}

              {/* Admin Items */}
              {visibleAdminItems.length > 0 && (
                <>
                  <div className="border-t border-white/20 my-3"></div>
                  <div className="px-4 py-2 text-xs font-semibold text-white/60 uppercase tracking-wider">
                    Administration
                  </div>
                  {visibleAdminItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavigation(item.id)}
                        className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors flex items-center space-x-3 ${
                          currentPage === item.id
                            ? 'text-white bg-white/20'
                            : 'text-white/80 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <Icon size={20} />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </>
              )}
              
              {/* Mobile User Actions */}
              {user ? (
                <div className="border-t border-white/20 pt-4 mt-4">
                  <div className="flex items-center space-x-3 px-4 py-3 bg-white/10 rounded-xl mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-green-500 rounded-full flex items-center justify-center">
                      <User size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">{user.name}</div>
                      <div className={`text-xs px-2 py-1 rounded-full border ${getRoleColor(user.role)}`}>
                        {getRoleLabel(user.role)}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors flex items-center space-x-3"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="border-t border-white/20 pt-4 mt-4">
                  <button
                    onClick={() => {
                      setShowLoginModal(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-orange-500 to-green-600 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-green-700 transition-all"
                  >
                    Login
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Click outside to close dropdown */}
        {showManagementDropdown && (
          <div 
            className="fixed inset-0 z-30" 
            onClick={() => setShowManagementDropdown(false)}
          ></div>
        )}
      </header>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
}