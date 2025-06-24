import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Layout/Header';
import Home from './components/Pages/Home';
import Teams from './components/Pages/Teams';
import Players from './components/Pages/Players';
import Blog from './components/Pages/Blog';
import Contact from './components/Pages/Contact';
import Scheduler from './components/Pages/Scheduler';
import TeamPicker from './components/Pages/TeamPicker';
import Admin from './components/Pages/Admin';
import Notifications from './components/Pages/Notifications';
import DataManagement from './components/Pages/DataManagement';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const { hasPermission } = useAuth();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'teams':
        return <Teams />;
      case 'players':
        return <Players />;
      case 'blog':
        return <Blog />;
      case 'contact':
        return <Contact />;
      case 'scheduler':
        return hasPermission(['member']) ? <Scheduler /> : <Home onNavigate={setCurrentPage} />;
      case 'teampicker':
        return hasPermission(['vice', 'captain']) ? <TeamPicker /> : <Home onNavigate={setCurrentPage} />;
      case 'notifications':
        return hasPermission(['captain', 'admin']) ? <Notifications /> : <Home onNavigate={setCurrentPage} />;
      case 'admin':
        return hasPermission(['admin']) ? <Admin /> : <Home onNavigate={setCurrentPage} />;
      case 'data':
        return hasPermission(['admin']) ? <DataManagement /> : <Home onNavigate={setCurrentPage} />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      <main>
        {renderPage()}
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;