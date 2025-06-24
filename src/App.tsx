import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Layout/Header';
import Home from './components/Pages/Home';
import Teams from './components/Pages/Teams';
import Players from './components/Pages/Players';
import Contact from './components/Pages/Contact';
import Scheduler from './components/Pages/Scheduler';
import TeamPicker from './components/Pages/TeamPicker';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const { hasPermission } = useAuth();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'teams':
        return <Teams />;
      case 'players':
        return <Players />;
      case 'contact':
        return <Contact />;
      case 'scheduler':
        return hasPermission(['member']) ? <Scheduler /> : <Home />;
      case 'teampicker':
        return hasPermission(['vice', 'captain']) ? <TeamPicker /> : <Home />;
      default:
        return <Home />;
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