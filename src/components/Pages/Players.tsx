import React, { useState, useMemo } from 'react';
import { Search, Filter, Trophy, Target, Users, Mail, Phone, Edit3, Save, X, Plus, Trash2, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface PlayerFilters {
  search: string;
  teamName: string;
  league: string;
  position: string;
  year: string;
  season: string;
}

interface Player {
  id: string;
  name: string;
  position: 'Batsman' | 'All-rounder' | 'Bowler' | 'Wicket-keeper';
  stats: {
    runs: number;
    wickets: number;
    matches: number;
  };
  year: string;
  season: string;
  league: string;
  overs: string;
  category: string;
  teamName: string;
  email?: string;
  phone?: string;
}

interface NewPlayerData {
  name: string;
  position: 'Batsman' | 'All-rounder' | 'Bowler' | 'Wicket-keeper';
  teamName: string;
  league: string;
  overs: string;
  category: string;
  year: string;
  season: string;
  email?: string;
  phone?: string;
  stats: {
    runs: number;
    wickets: number;
    matches: number;
  };
}

export default function Players() {
  const { hasPermission } = useAuth();
  const canEditPlayers = hasPermission(['captain', 'vice', 'admin']);

  const [filters, setFilters] = useState<PlayerFilters>({
    search: '',
    teamName: '',
    league: '',
    position: '',
    year: '2025',
    season: 'summer'
  });

  const [editingPlayer, setEditingPlayer] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{ email: string; phone: string }>({ email: '', phone: '' });
  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const [selectedPlayerForContact, setSelectedPlayerForContact] = useState<Player | null>(null);

  // Player Management States
  const [showAddPlayerModal, setShowAddPlayerModal] = useState(false);
  const [showEditPlayerModal, setShowEditPlayerModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [newPlayer, setNewPlayer] = useState<NewPlayerData>({
    name: '',
    position: 'Batsman',
    teamName: '',
    league: 'ARCL',
    overs: '16 overs',
    category: 'Adult',
    year: '2025',
    season: 'summer',
    email: '',
    phone: '',
    stats: { runs: 0, wickets: 0, matches: 0 }
  });
  const [editPlayer, setEditPlayer] = useState<Partial<Player>>({});

  // Available teams for selection
  const availableTeams = [
    // ARCL Teams
    { name: 'Angry Bulls', league: 'ARCL', format: '16 overs', category: 'Adult' },
    { name: 'Royal Warriors', league: 'ARCL', format: '16 overs', category: 'Adult' },
    { name: 'Cereal Killers', league: 'ARCL', format: '16 overs', category: 'Adult' },
    
    // NWCL Teams - Adult
    { name: 'Watermelons Adult T10', league: 'NWCL', format: 'T10', category: 'Adult' },
    { name: 'Watermelons Adult T20', league: 'NWCL', format: 'T20', category: 'Adult' },
    { name: 'Watermelons Adult T40', league: 'NWCL', format: 'T40', category: 'Adult' },
    { name: 'Solaris Adult T10', league: 'NWCL', format: 'T10', category: 'Adult' },
    { name: 'Solaris Adult T20', league: 'NWCL', format: 'T20', category: 'Adult' },
    { name: 'Solaris Adult T40', league: 'NWCL', format: 'T40', category: 'Adult' },
    
    // NWCL Teams - Youth
    { name: 'Watermelons Youth T10', league: 'NWCL', format: 'T10', category: 'Youth' },
    { name: 'Watermelons Youth T20', league: 'NWCL', format: 'T20', category: 'Youth' },
    { name: 'Watermelons Youth T40', league: 'NWCL', format: 'T40', category: 'Youth' },
    { name: 'Solaris Youth T10', league: 'NWCL', format: 'T10', category: 'Youth' },
    { name: 'Solaris Youth T20', league: 'NWCL', format: 'T20', category: 'Youth' },
    { name: 'Solaris Youth T40', league: 'NWCL', format: 'T40', category: 'Youth' }
  ];

  // Extended players data with contact information (images removed)
  const [players, setPlayers] = useState<Player[]>([
    // Cereal Killers players (all 14 players)
    {
      id: '1',
      name: 'Naim Mohammad',
      position: 'Batsman',
      stats: { runs: 1456, wickets: 2, matches: 25 },
      year: '2025',
      season: 'summer',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      teamName: 'Cereal Killers',
      email: 'naim.mohammad@email.com',
      phone: '+1-206-555-0101'
    },
    {
      id: '2',
      name: 'Dhruva Kumar',
      position: 'Batsman',
      stats: { runs: 1234, wickets: 1, matches: 23 },
      year: '2025',
      season: 'summer',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      teamName: 'Cereal Killers',
      email: 'dhruva.kumar@email.com',
      phone: '+1-206-555-0102'
    },
    {
      id: '3',
      name: 'Darshan Masti Prakash',
      position: 'All-rounder',
      stats: { runs: 890, wickets: 23, matches: 30 },
      year: '2025',
      season: 'summer',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      teamName: 'Cereal Killers',
      email: 'darshan.prakash@email.com',
      phone: '+1-206-555-0103'
    },
    {
      id: '4',
      name: 'Vinuth Muniraju',
      position: 'Bowler',
      stats: { runs: 245, wickets: 45, matches: 29 },
      year: '2025',
      season: 'summer',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      teamName: 'Cereal Killers',
      email: 'vinuth.muniraju@email.com',
      phone: '+1-206-555-0104'
    },
    {
      id: '5',
      name: 'Uday C',
      position: 'Batsman',
      stats: { runs: 1123, wickets: 3, matches: 26 },
      year: '2025',
      season: 'summer',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      teamName: 'Cereal Killers',
      email: 'uday.c@email.com',
      phone: '+1-206-555-0105'
    },
    {
      id: '6',
      name: 'Vidhyadhar Ghorpade',
      position: 'All-rounder',
      stats: { runs: 734, wickets: 18, matches: 27 },
      year: '2025',
      season: 'summer',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      teamName: 'Cereal Killers',
      email: 'vidhyadhar.ghorpade@email.com',
      phone: '+1-206-555-0106'
    },
    {
      id: '7',
      name: 'Vijeth Shetty',
      position: 'Bowler',
      stats: { runs: 156, wickets: 38, matches: 30 },
      year: '2025',
      season: 'summer',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      teamName: 'Cereal Killers',
      email: 'vijeth.shetty@email.com',
      phone: '+1-206-555-0107'
    },
    {
      id: '8',
      name: 'Kiran S',
      position: 'Batsman',
      stats: { runs: 892, wickets: 1, matches: 22 },
      year: '2025',
      season: 'summer',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      teamName: 'Cereal Killers',
      email: 'kiran.s@email.com',
      phone: '+1-206-555-0108'
    },
    {
      id: '9',
      name: 'Manjunatha Shetty Kondalli',
      position: 'Wicket-keeper',
      stats: { runs: 678, wickets: 0, matches: 28 },
      year: '2025',
      season: 'summer',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      teamName: 'Cereal Killers',
      email: 'manjunatha.kondalli@email.com',
      phone: '+1-206-555-0109'
    },
    {
      id: '10',
      name: 'Raj Mani N',
      position: 'All-rounder',
      stats: { runs: 567, wickets: 12, matches: 24 },
      year: '2025',
      season: 'summer',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      teamName: 'Cereal Killers',
      email: 'raj.mani@email.com',
      phone: '+1-206-555-0110'
    },
    {
      id: '11',
      name: 'Arun Thippur Jayakeerthy',
      position: 'Bowler',
      stats: { runs: 89, wickets: 29, matches: 27 },
      year: '2025',
      season: 'summer',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      teamName: 'Cereal Killers',
      email: 'arun.jayakeerthy@email.com',
      phone: '+1-206-555-0111'
    },
    {
      id: '12',
      name: 'Avinash Talanki',
      position: 'Batsman',
      stats: { runs: 445, wickets: 15, matches: 18 },
      year: '2025',
      season: 'summer',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      teamName: 'Cereal Killers',
      email: 'avinash.talanki@email.com',
      phone: '+1-206-555-0112'
    },
    {
      id: '13',
      name: 'Dhanush Shetty CK',
      position: 'All-rounder',
      stats: { runs: 78, wickets: 32, matches: 20 },
      year: '2025',
      season: 'summer',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      teamName: 'Cereal Killers',
      email: 'dhanush.shetty@email.com',
      phone: '+1-206-555-0113'
    },
    {
      id: '14',
      name: 'Siva Krapa',
      position: 'Bowler',
      stats: { runs: 234, wickets: 41, matches: 28 },
      year: '2025',
      season: 'summer',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      teamName: 'Cereal Killers',
      email: 'siva.krapa@email.com',
      phone: '+1-206-555-0114'
    },

    // Other team players
    {
      id: '15',
      name: 'Rajesh Kumar',
      position: 'Batsman',
      stats: { runs: 1250, wickets: 5, matches: 28 },
      year: '2025',
      season: 'summer',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      teamName: 'Angry Bulls',
      email: 'rajesh.kumar@email.com',
      phone: '+1-206-555-0115'
    },
    {
      id: '16',
      name: 'Priya Sharma',
      position: 'All-rounder',
      stats: { runs: 890, wickets: 23, matches: 30 },
      year: '2025',
      season: 'summer',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      teamName: 'Royal Warriors',
      email: 'priya.sharma@email.com',
      phone: '+1-206-555-0116'
    },
    {
      id: '17',
      name: 'Vikram Singh',
      position: 'Bowler',
      stats: { runs: 245, wickets: 45, matches: 29 },
      year: '2025',
      season: 'summer',
      league: 'NWCL',
      overs: 'T20',
      category: 'Adult',
      teamName: 'Watermelons',
      email: 'vikram.singh@email.com',
      phone: '+1-206-555-0117'
    },
    {
      id: '18',
      name: 'Anita Patel',
      position: 'Wicket-keeper',
      stats: { runs: 678, wickets: 0, matches: 28 },
      year: '2025',
      season: 'summer',
      league: 'NWCL',
      overs: 'T20',
      category: 'Adult',
      teamName: 'Solaris',
      email: 'anita.patel@email.com',
      phone: '+1-206-555-0118'
    },
    {
      id: '19',
      name: 'Arjun Reddy',
      position: 'Batsman',
      stats: { runs: 1456, wickets: 2, matches: 25 },
      year: '2025',
      season: 'summer',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      teamName: 'Angry Bulls',
      email: 'arjun.reddy@email.com',
      phone: '+1-206-555-0119'
    },
    {
      id: '20',
      name: 'Meera Gupta',
      position: 'All-rounder',
      stats: { runs: 734, wickets: 18, matches: 27 },
      year: '2025',
      season: 'summer',
      league: 'NWCL',
      overs: 'T10',
      category: 'Youth',
      teamName: 'Watermelons',
      email: 'meera.gupta@email.com',
      phone: '+1-206-555-0120'
    }
  ]);

  // Filter players based on current filters
  const filteredPlayers = useMemo(() => {
    return players.filter(player => {
      const matchesSearch = !filters.search || 
        player.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        player.teamName.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesTeam = !filters.teamName || player.teamName === filters.teamName;
      const matchesLeague = !filters.league || player.league === filters.league;
      const matchesPosition = !filters.position || player.position === filters.position;
      const matchesYear = !filters.year || player.year === filters.year;
      const matchesSeason = !filters.season || player.season === filters.season;

      return matchesSearch && matchesTeam && matchesLeague && matchesPosition && matchesYear && matchesSeason;
    });
  }, [filters, players]);

  // Get unique values for filter dropdowns
  const getUniqueTeamNames = () => {
    return [...new Set(players.map(player => player.teamName))].sort();
  };

  const getUniqueLeagues = () => {
    return [...new Set(players.map(player => player.league))].sort();
  };

  const getUniquePositions = () => {
    return [...new Set(players.map(player => player.position))].sort();
  };

  // Get available overs based on selected league
  const getAvailableOvers = (league: string) => {
    if (league === 'ARCL') {
      return ['16 overs'];
    } else if (league === 'NWCL') {
      return ['T10', 'T20', 'T40'];
    }
    return [];
  };

  const getPositionColor = (position: string) => {
    switch (position) {
      case 'Batsman': return 'from-red-500 to-orange-500';
      case 'All-rounder': return 'from-green-500 to-emerald-500';
      case 'Bowler': return 'from-blue-500 to-cyan-500';
      case 'Wicket-keeper': return 'from-purple-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  // Generate initials from player name
  const getPlayerInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  };

  // Contact Information Handlers
  const handleEditContact = (player: Player) => {
    setEditingPlayer(player.id);
    setEditForm({
      email: player.email || '',
      phone: player.phone || ''
    });
  };

  const handleSaveContact = (playerId: string) => {
    // Validate email format
    if (editForm.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editForm.email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Validate phone format
    if (editForm.phone && !/^\+?1?[2-9]\d{2}[2-9]\d{2}\d{4}$/.test(editForm.phone.replace(/\D/g, ''))) {
      alert('Please enter a valid phone number (e.g., +1-206-555-0123)');
      return;
    }

    // Update player contact information
    setPlayers(prev => prev.map(player => 
      player.id === playerId 
        ? { 
            ...player, 
            email: editForm.email || undefined,
            phone: editForm.phone || undefined
          }
        : player
    ));

    setEditingPlayer(null);
    setEditForm({ email: '', phone: '' });
    alert('Contact information updated successfully!');
  };

  const handleCancelEdit = () => {
    setEditingPlayer(null);
    setEditForm({ email: '', phone: '' });
  };

  const handleAddContact = (player: Player) => {
    setSelectedPlayerForContact(player);
    setEditForm({
      email: player.email || '',
      phone: player.phone || ''
    });
    setShowAddContactModal(true);
  };

  const handleSaveContactModal = () => {
    if (!selectedPlayerForContact) return;

    // Validate email format
    if (editForm.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editForm.email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Validate phone format
    if (editForm.phone && !/^\+?1?[2-9]\d{2}[2-9]\d{2}\d{4}$/.test(editForm.phone.replace(/\D/g, ''))) {
      alert('Please enter a valid phone number (e.g., +1-206-555-0123)');
      return;
    }

    // Update player contact information
    setPlayers(prev => prev.map(player => 
      player.id === selectedPlayerForContact.id 
        ? { 
            ...player, 
            email: editForm.email || undefined,
            phone: editForm.phone || undefined
          }
        : player
    ));

    setShowAddContactModal(false);
    setSelectedPlayerForContact(null);
    setEditForm({ email: '', phone: '' });
    alert('Contact information updated successfully!');
  };

  // Player Management Handlers
  const handleAddPlayer = () => {
    if (!newPlayer.name.trim()) {
      alert('Please enter a player name.');
      return;
    }

    if (!newPlayer.teamName) {
      alert('Please select a team.');
      return;
    }

    // Validate email format if provided
    if (newPlayer.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newPlayer.email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Validate phone format if provided
    if (newPlayer.phone && !/^\+?1?[2-9]\d{2}[2-9]\d{2}\d{4}$/.test(newPlayer.phone.replace(/\D/g, ''))) {
      alert('Please enter a valid phone number (e.g., +1-206-555-0123)');
      return;
    }

    const player: Player = {
      id: Date.now().toString(),
      name: newPlayer.name,
      position: newPlayer.position,
      stats: newPlayer.stats,
      year: newPlayer.year,
      season: newPlayer.season,
      league: newPlayer.league,
      overs: newPlayer.overs,
      category: newPlayer.category,
      teamName: newPlayer.teamName,
      email: newPlayer.email || undefined,
      phone: newPlayer.phone || undefined
    };

    // Actually add the player to the state
    setPlayers(prev => [...prev, player]);
    
    setShowAddPlayerModal(false);
    setNewPlayer({
      name: '',
      position: 'Batsman',
      teamName: '',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      year: '2025',
      season: 'summer',
      email: '',
      phone: '',
      stats: { runs: 0, wickets: 0, matches: 0 }
    });

    alert(`Player "${player.name}" added successfully to ${player.teamName}!`);
  };

  const handleEditPlayer = (player: Player) => {
    setSelectedPlayer(player);
    setEditPlayer({
      name: player.name,
      position: player.position,
      teamName: player.teamName,
      league: player.league,
      overs: player.overs,
      category: player.category,
      year: player.year,
      season: player.season,
      email: player.email,
      phone: player.phone,
      stats: player.stats
    });
    setShowEditPlayerModal(true);
  };

  const handleUpdatePlayer = () => {
    if (!selectedPlayer || !editPlayer.name) {
      alert('Please fill in all required fields.');
      return;
    }

    // Validate email format if provided
    if (editPlayer.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editPlayer.email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Validate phone format if provided
    if (editPlayer.phone && !/^\+?1?[2-9]\d{2}[2-9]\d{2}\d{4}$/.test(editPlayer.phone.replace(/\D/g, ''))) {
      alert('Please enter a valid phone number (e.g., +1-206-555-0123)');
      return;
    }

    // Update the player in the state
    setPlayers(prev => prev.map(player => 
      player.id === selectedPlayer.id 
        ? { ...player, ...editPlayer } as Player
        : player
    ));

    setShowEditPlayerModal(false);
    setSelectedPlayer(null);
    setEditPlayer({});

    alert(`Player "${editPlayer.name}" updated successfully!`);
  };

  const handleDeletePlayer = (playerId: string, playerName: string) => {
    if (confirm(`Are you sure you want to delete player "${playerName}"? This action cannot be undone.`)) {
      // Actually remove the player from the state
      setPlayers(prev => prev.filter(player => player.id !== playerId));
      alert(`Player "${playerName}" deleted successfully!`);
    }
  };

  // Handle new player filter changes
  const handleNewPlayerFilterChange = (key: keyof NewPlayerData, value: any) => {
    setNewPlayer(prev => {
      const updated = { ...prev, [key]: value };
      
      // Reset overs when league changes in new player form
      if (key === 'league') {
        const availableOvers = getAvailableOvers(value);
        updated.overs = availableOvers[0] || '';
      }
      
      return updated;
    });
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Cricket
            <span className="bg-gradient-to-r from-orange-400 to-green-400 bg-clip-text text-transparent">
              {' '}Players
            </span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Meet our talented cricket players from across different teams and leagues. 
            Track their performance, statistics, and contact information for better team coordination.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Filter className="text-orange-400" size={24} />
              <h2 className="text-2xl font-bold text-white">Filter Players</h2>
            </div>
            
            {canEditPlayers && (
              <button
                onClick={() => setShowAddPlayerModal(true)}
                className="bg-gradient-to-r from-orange-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-green-700 transition-all transform hover:scale-105 flex items-center space-x-2"
              >
                <Plus size={20} />
                <span>Add New Player</span>
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={16} />
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Search players..."
              />
            </div>

            {/* Team */}
            <select
              value={filters.teamName}
              onChange={(e) => setFilters({ ...filters, teamName: e.target.value })}
              className="px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="" className="bg-gray-900">All Teams</option>
              {getUniqueTeamNames().map(team => (
                <option key={team} value={team} className="bg-gray-900">{team}</option>
              ))}
            </select>

            {/* League */}
            <select
              value={filters.league}
              onChange={(e) => setFilters({ ...filters, league: e.target.value })}
              className="px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="" className="bg-gray-900">All Leagues</option>
              {getUniqueLeagues().map(league => (
                <option key={league} value={league} className="bg-gray-900">{league}</option>
              ))}
            </select>

            {/* Position */}
            <select
              value={filters.position}
              onChange={(e) => setFilters({ ...filters, position: e.target.value })}
              className="px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="" className="bg-gray-900">All Positions</option>
              {getUniquePositions().map(position => (
                <option key={position} value={position} className="bg-gray-900">{position}</option>
              ))}
            </select>

            {/* Year */}
            <select
              value={filters.year}
              onChange={(e) => setFilters({ ...filters, year: e.target.value })}
              className="px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="2025" className="bg-gray-900">2025</option>
              <option value="2024" className="bg-gray-900">2024</option>
              <option value="2023" className="bg-gray-900">2023</option>
            </select>

            {/* Season */}
            <select
              value={filters.season}
              onChange={(e) => setFilters({ ...filters, season: e.target.value })}
              className="px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="summer" className="bg-gray-900">Summer</option>
              <option value="spring" className="bg-gray-900">Spring</option>
            </select>
          </div>

          {/* Clear Filters */}
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={() => setFilters({
                search: '',
                teamName: '',
                league: '',
                position: '',
                year: '2025',
                season: 'summer'
              })}
              className="text-orange-400 hover:text-orange-300 text-sm font-semibold"
            >
              Clear All Filters
            </button>
            <span className="text-white/70 text-sm">
              Showing {filteredPlayers.length} of {players.length} players
            </span>
          </div>
        </div>

        {/* Permission Notice */}
        {!canEditPlayers && (
          <div className="bg-blue-500/20 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/30 mb-8">
            <div className="flex items-center space-x-3 text-blue-300">
              <Users size={20} />
              <span className="font-semibold">Player Management</span>
            </div>
            <p className="text-blue-200 mt-2">
              Only team captains, vice captains, and admins can add, edit, or delete players.
            </p>
          </div>
        )}

        {/* Players Grid */}
        <section>
          {filteredPlayers.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 text-center">
              <Users className="mx-auto mb-4 text-white/50" size={48} />
              <h3 className="text-xl font-bold text-white mb-2">No Players Found</h3>
              <p className="text-white/70 mb-6">
                No players match your current filter criteria. Try adjusting your filters.
              </p>
              {canEditPlayers && (
                <button
                  onClick={() => setShowAddPlayerModal(true)}
                  className="bg-gradient-to-r from-orange-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-green-700 transition-all"
                >
                  Add First Player
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredPlayers.map(player => (
                <div
                  key={player.id}
                  className="group bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 hover:border-white/40 transition-all duration-500 hover:transform hover:scale-105 relative"
                >
                  {/* Management Actions - Only visible to captain/vice/admin */}
                  {canEditPlayers && (
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                      <button
                        onClick={() => handleEditPlayer(player)}
                        className="p-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        onClick={() => handleDeletePlayer(player.id, player.name)}
                        className="p-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  )}

                  {/* Player Avatar - Now using initials */}
                  <div className="text-center mb-6">
                    <div className={`w-20 h-20 rounded-2xl mx-auto mb-4 border-2 border-white/20 bg-gradient-to-r ${getPositionColor(player.position)} flex items-center justify-center`}>
                      <span className="text-white text-xl font-bold">
                        {getPlayerInitials(player.name)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{player.name}</h3>
                    <div className={`inline-block bg-gradient-to-r ${getPositionColor(player.position)} px-3 py-1 rounded-full text-xs font-semibold text-white mb-2`}>
                      {player.position}
                    </div>
                    <div className="text-white/70 text-sm">
                      {player.teamName} • {player.league}
                    </div>
                    <div className="text-white/60 text-xs">
                      {player.overs} • {player.category} • {player.year} {player.season}
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="mb-6 space-y-3">
                    <h4 className="text-white font-semibold text-sm flex items-center space-x-2">
                      <Mail size={14} />
                      <span>Contact Information</span>
                      {canEditPlayers && (
                        <button
                          onClick={() => editingPlayer === player.id ? handleCancelEdit() : handleEditContact(player)}
                          className="ml-auto p-1 text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors"
                        >
                          {editingPlayer === player.id ? <X size={12} /> : <Edit3 size={12} />}
                        </button>
                      )}
                    </h4>

                    {editingPlayer === player.id ? (
                      <div className="space-y-2">
                        <input
                          type="email"
                          value={editForm.email}
                          onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                          className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400 text-xs"
                          placeholder="Email address"
                        />
                        <input
                          type="tel"
                          value={editForm.phone}
                          onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                          className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400 text-xs"
                          placeholder="Phone number"
                        />
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleSaveContact(player.id)}
                            className="flex-1 bg-green-500/20 text-green-300 px-3 py-2 rounded-lg hover:bg-green-500/30 transition-colors text-xs font-semibold flex items-center justify-center space-x-1"
                          >
                            <Save size={12} />
                            <span>Save</span>
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="flex-1 bg-red-500/20 text-red-300 px-3 py-2 rounded-lg hover:bg-red-500/30 transition-colors text-xs font-semibold flex items-center justify-center space-x-1"
                          >
                            <X size={12} />
                            <span>Cancel</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-white/80 text-xs">
                          <Mail size={12} />
                          <span>{player.email || 'No email'}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-white/80 text-xs">
                          <Phone size={12} />
                          <span>{player.phone || 'No phone'}</span>
                        </div>
                        {canEditPlayers && (!player.email || !player.phone) && (
                          <button
                            onClick={() => handleAddContact(player)}
                            className="w-full bg-orange-500/20 text-orange-300 px-3 py-2 rounded-lg hover:bg-orange-500/30 transition-colors text-xs font-semibold flex items-center justify-center space-x-1"
                          >
                            <Plus size={12} />
                            <span>Add Contact Info</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Player Stats */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-white">{player.stats.runs}</div>
                      <div className="text-xs text-white/70">Runs</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">{player.stats.wickets}</div>
                      <div className="text-xs text-white/70">Wickets</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">{player.stats.matches}</div>
                      <div className="text-xs text-white/70">Matches</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Add Player Modal */}
        {showAddPlayerModal && canEditPlayers && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 w-full max-w-2xl border border-white/30 max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-bold text-white mb-6">Add New Cricket Player</h3>
              
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                  <h4 className="text-lg font-semibold text-white mb-4">Basic Information</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Player Name *</label>
                      <input
                        type="text"
                        value={newPlayer.name}
                        onChange={(e) => handleNewPlayerFilterChange('name', e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="Enter player name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Position *</label>
                      <select
                        value={newPlayer.position}
                        onChange={(e) => handleNewPlayerFilterChange('position', e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                      >
                        <option value="Batsman" className="bg-gray-900">Batsman</option>
                        <option value="All-rounder" className="bg-gray-900">All-rounder</option>
                        <option value="Bowler" className="bg-gray-900">Bowler</option>
                        <option value="Wicket-keeper" className="bg-gray-900">Wicket-keeper</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Team Assignment */}
                <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                  <h4 className="text-lg font-semibold text-white mb-4">Team Assignment</h4>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-2">League *</label>
                        <select
                          value={newPlayer.league}
                          onChange={(e) => handleNewPlayerFilterChange('league', e.target.value)}
                          className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                        >
                          <option value="ARCL" className="bg-gray-900">ARCL</option>
                          <option value="NWCL" className="bg-gray-900">NWCL</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-2">Format *</label>
                        <select
                          value={newPlayer.overs}
                          onChange={(e) => handleNewPlayerFilterChange('overs', e.target.value)}
                          className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                        >
                          {getAvailableOvers(newPlayer.league).map(format => (
                            <option key={format} value={format} className="bg-gray-900">{format}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-2">Category *</label>
                        <select
                          value={newPlayer.category}
                          onChange={(e) => handleNewPlayerFilterChange('category', e.target.value)}
                          className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                        >
                          <option value="Adult" className="bg-gray-900">Adult</option>
                          <option value="Youth" className="bg-gray-900">Youth</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-2">Year *</label>
                        <select
                          value={newPlayer.year}
                          onChange={(e) => handleNewPlayerFilterChange('year', e.target.value)}
                          className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                        >
                          <option value="2025" className="bg-gray-900">2025</option>
                          <option value="2024" className="bg-gray-900">2024</option>
                          <option value="2023" className="bg-gray-900">2023</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-2">Season *</label>
                        <select
                          value={newPlayer.season}
                          onChange={(e) => handleNewPlayerFilterChange('season', e.target.value)}
                          className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                        >
                          <option value="summer" className="bg-gray-900">Summer</option>
                          <option value="spring" className="bg-gray-900">Spring</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Team *</label>
                      <select
                        value={newPlayer.teamName}
                        onChange={(e) => handleNewPlayerFilterChange('teamName', e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                      >
                        <option value="" className="bg-gray-900">Select a team</option>
                        {availableTeams
                          .filter(team => 
                            team.league === newPlayer.league && 
                            team.format === newPlayer.overs && 
                            team.category === newPlayer.category
                          )
                          .map(team => (
                            <option key={team.name} value={team.name} className="bg-gray-900">
                              {team.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                  <h4 className="text-lg font-semibold text-white mb-4">Contact Information (Optional)</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Email</label>
                      <input
                        type="email"
                        value={newPlayer.email}
                        onChange={(e) => handleNewPlayerFilterChange('email', e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="player@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={newPlayer.phone}
                        onChange={(e) => handleNewPlayerFilterChange('phone', e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="+1-206-555-0123"
                      />
                    </div>
                  </div>
                </div>

                {/* Statistics */}
                <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                  <h4 className="text-lg font-semibold text-white mb-4">Player Statistics</h4>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Runs</label>
                      <input
                        type="number"
                        value={newPlayer.stats.runs}
                        onChange={(e) => handleNewPlayerFilterChange('stats', { 
                          ...newPlayer.stats, 
                          runs: parseInt(e.target.value) || 0 
                        })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Wickets</label>
                      <input
                        type="number"
                        value={newPlayer.stats.wickets}
                        onChange={(e) => handleNewPlayerFilterChange('stats', { 
                          ...newPlayer.stats, 
                          wickets: parseInt(e.target.value) || 0 
                        })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Matches</label>
                      <input
                        type="number"
                        value={newPlayer.stats.matches}
                        onChange={(e) => handleNewPlayerFilterChange('stats', { 
                          ...newPlayer.stats, 
                          matches: parseInt(e.target.value) || 0 
                        })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => {
                    setShowAddPlayerModal(false);
                    setNewPlayer({
                      name: '',
                      position: 'Batsman',
                      teamName: '',
                      league: 'ARCL',
                      overs: '16 overs',
                      category: 'Adult',
                      year: '2025',
                      season: 'summer',
                      email: '',
                      phone: '',
                      stats: { runs: 0, wickets: 0, matches: 0 }
                    });
                  }}
                  className="flex-1 bg-white/10 text-white py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddPlayer}
                  disabled={!newPlayer.name.trim() || !newPlayer.teamName}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Player
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Player Modal */}
        {showEditPlayerModal && selectedPlayer && canEditPlayers && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 w-full max-w-2xl border border-white/30 max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-bold text-white mb-6">Edit Player: {selectedPlayer.name}</h3>
              
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                  <h4 className="text-lg font-semibold text-white mb-4">Basic Information</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Player Name *</label>
                      <input
                        type="text"
                        value={editPlayer.name || ''}
                        onChange={(e) => setEditPlayer({ ...editPlayer, name: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="Enter player name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Position *</label>
                      <select
                        value={editPlayer.position || ''}
                        onChange={(e) => setEditPlayer({ ...editPlayer, position: e.target.value as Player['position'] })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                      >
                        <option value="Batsman" className="bg-gray-900">Batsman</option>
                        <option value="All-rounder" className="bg-gray-900">All-rounder</option>
                        <option value="Bowler" className="bg-gray-900">Bowler</option>
                        <option value="Wicket-keeper" className="bg-gray-900">Wicket-keeper</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                  <h4 className="text-lg font-semibold text-white mb-4">Contact Information</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Email</label>
                      <input
                        type="email"
                        value={editPlayer.email || ''}
                        onChange={(e) => setEditPlayer({ ...editPlayer, email: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="player@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={editPlayer.phone || ''}
                        onChange={(e) => setEditPlayer({ ...editPlayer, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="+1-206-555-0123"
                      />
                    </div>
                  </div>
                </div>

                {/* Statistics */}
                <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                  <h4 className="text-lg font-semibold text-white mb-4">Player Statistics</h4>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Runs</label>
                      <input
                        type="number"
                        value={editPlayer.stats?.runs || ''}
                        onChange={(e) => setEditPlayer({ 
                          ...editPlayer, 
                          stats: { 
                            ...editPlayer.stats!, 
                            runs: parseInt(e.target.value) || 0 
                          }
                        })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Wickets</label>
                      <input
                        type="number"
                        value={editPlayer.stats?.wickets || ''}
                        onChange={(e) => setEditPlayer({ 
                          ...editPlayer, 
                          stats: { 
                            ...editPlayer.stats!, 
                            wickets: parseInt(e.target.value) || 0 
                          }
                        })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Matches</label>
                      <input
                        type="number"
                        value={editPlayer.stats?.matches || ''}
                        onChange={(e) => setEditPlayer({ 
                          ...editPlayer, 
                          stats: { 
                            ...editPlayer.stats!, 
                            matches: parseInt(e.target.value) || 0 
                          }
                        })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => {
                    setShowEditPlayerModal(false);
                    setSelectedPlayer(null);
                    setEditPlayer({});
                  }}
                  className="flex-1 bg-white/10 text-white py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdatePlayer}
                  disabled={!editPlayer.name}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Update Player
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Contact Modal */}
        {showAddContactModal && selectedPlayerForContact && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md border border-white/30">
              <h3 className="text-2xl font-bold text-white mb-6">
                Update Contact Info - {selectedPlayerForContact.name}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="player@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="+1-206-555-0123"
                  />
                </div>

                <div className="text-xs text-white/60">
                  <p>• Email format: player@email.com</p>
                  <p>• Phone format: +1-206-555-0123 or (206) 555-0123</p>
                </div>
              </div>
              
              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => {
                    setShowAddContactModal(false);
                    setSelectedPlayerForContact(null);
                    setEditForm({ email: '', phone: '' });
                  }}
                  className="flex-1 bg-white/10 text-white py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveContactModal}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-green-700 transition-all"
                >
                  Save Contact Info
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}