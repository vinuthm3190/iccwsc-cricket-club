import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Edit3, 
  Trash2, 
  Mail, 
  Phone, 
  Trophy, 
  Target,
  User,
  Save,
  X,
  Download,
  Upload,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useDataService } from '../../hooks/useDataService';

interface Player {
  id: string;
  name: string;
  position: 'Batsman' | 'All-rounder' | 'Bowler' | 'Wicket-keeper';
  email?: string;
  phone?: string;
  stats?: {
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
}

interface PlayerFilters {
  search: string;
  teamName: string;
  league: string;
  position: string;
  year: string;
  season: string;
  category: string;
}

export default function Players() {
  const { hasPermission } = useAuth();
  const canManagePlayers = hasPermission(['captain', 'vice', 'admin']);
  
  // Use the centralized data service
  const {
    data: players,
    loading,
    error,
    add: addPlayer,
    update: updatePlayer,
    remove: removePlayer,
    refresh: refreshPlayers
  } = useDataService<Player>('players');

  const [filters, setFilters] = useState<PlayerFilters>({
    search: '',
    teamName: '',
    league: '',
    position: '',
    year: '2025',
    season: 'spring',
    category: 'Adult'
  });

  const [showAddPlayerModal, setShowAddPlayerModal] = useState(false);
  const [showEditPlayerModal, setShowEditPlayerModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const [newPlayer, setNewPlayer] = useState<Partial<Player>>({
    name: '',
    position: 'Batsman',
    email: '',
    phone: '',
    year: '2025',
    season: 'spring',
    league: 'ARCL',
    overs: '16 overs',
    category: 'Adult',
    teamName: 'Cereal Killers',
    stats: { runs: 0, wickets: 0, matches: 0 }
  });

  // Available teams for assignment
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

  // Get available overs based on selected league
  const getAvailableOvers = (league: string) => {
    if (league === 'ARCL') {
      return ['16 overs'];
    } else if (league === 'NWCL') {
      return ['T10', 'T20', 'T40'];
    }
    return [];
  };

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
      const matchesCategory = !filters.category || player.category === filters.category;

      return matchesSearch && matchesTeam && matchesLeague && matchesPosition && 
             matchesYear && matchesSeason && matchesCategory;
    });
  }, [players, filters]);

  // Get unique values for filter dropdowns
  const getUniqueTeamNames = () => {
    return [...new Set(players.map(player => player.teamName))].sort();
  };

  const getUniqueLeagues = () => {
    return [...new Set(players.map(player => player.league))].sort();
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

  // Handle new player filter changes
  const handleNewPlayerFilterChange = (key: keyof Player, value: string) => {
    setNewPlayer(prev => {
      const updated = { ...prev, [key]: value };
      
      // Reset overs when league changes
      if (key === 'league') {
        const availableOvers = getAvailableOvers(value);
        updated.overs = availableOvers[0] || '';
      }
      
      return updated;
    });
  };

  // Handle add player
  const handleAddPlayer = async () => {
    if (!newPlayer.name?.trim() || !newPlayer.teamName) {
      alert('Please fill in player name and team assignment.');
      return;
    }

    try {
      const player: Player = {
        id: Date.now().toString(),
        name: newPlayer.name,
        position: newPlayer.position || 'Batsman',
        email: newPlayer.email || '',
        phone: newPlayer.phone || '',
        year: newPlayer.year || '2025',
        season: newPlayer.season || 'spring',
        league: newPlayer.league || 'ARCL',
        overs: newPlayer.overs || '16 overs',
        category: newPlayer.category || 'Adult',
        teamName: newPlayer.teamName,
        stats: newPlayer.stats || { runs: 0, wickets: 0, matches: 0 }
      };

      await addPlayer(player);
      
      setShowAddPlayerModal(false);
      setNewPlayer({
        name: '',
        position: 'Batsman',
        email: '',
        phone: '',
        year: '2025',
        season: 'spring',
        league: 'ARCL',
        overs: '16 overs',
        category: 'Adult',
        teamName: 'Cereal Killers',
        stats: { runs: 0, wickets: 0, matches: 0 }
      });

      alert(`Player "${player.name}" added successfully to ${player.teamName}!`);
    } catch (error) {
      alert('Failed to add player. Please try again.');
    }
  };

  // Handle edit player
  const handleEditPlayer = (player: Player) => {
    setSelectedPlayer(player);
    setNewPlayer({ ...player });
    setShowEditPlayerModal(true);
  };

  // Handle update player
  const handleUpdatePlayer = async () => {
    if (!selectedPlayer || !newPlayer.name?.trim()) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      await updatePlayer(selectedPlayer.id, newPlayer);
      
      setShowEditPlayerModal(false);
      setSelectedPlayer(null);
      setNewPlayer({
        name: '',
        position: 'Batsman',
        email: '',
        phone: '',
        year: '2025',
        season: 'spring',
        league: 'ARCL',
        overs: '16 overs',
        category: 'Adult',
        teamName: 'Cereal Killers',
        stats: { runs: 0, wickets: 0, matches: 0 }
      });

      alert(`Player "${newPlayer.name}" updated successfully!`);
    } catch (error) {
      alert('Failed to update player. Please try again.');
    }
  };

  // Handle delete player
  const handleDeletePlayer = async (playerId: string, playerName: string) => {
    if (confirm(`Are you sure you want to delete player "${playerName}"? This action cannot be undone.`)) {
      try {
        await removePlayer(playerId);
        alert(`Player "${playerName}" deleted successfully!`);
      } catch (error) {
        alert('Failed to delete player. Please try again.');
      }
    }
  };

  // Handle contact info update
  const handleUpdateContact = async () => {
    if (!selectedPlayer) return;

    try {
      await updatePlayer(selectedPlayer.id, {
        email: newPlayer.email,
        phone: newPlayer.phone
      });
      
      setShowContactModal(false);
      setSelectedPlayer(null);
      setNewPlayer({
        name: '',
        position: 'Batsman',
        email: '',
        phone: '',
        year: '2025',
        season: 'spring',
        league: 'ARCL',
        overs: '16 overs',
        category: 'Adult',
        teamName: 'Cereal Killers',
        stats: { runs: 0, wickets: 0, matches: 0 }
      });

      alert('Contact information updated successfully!');
    } catch (error) {
      alert('Failed to update contact information. Please try again.');
    }
  };

  // Handle contact edit
  const handleEditContact = (player: Player) => {
    setSelectedPlayer(player);
    setNewPlayer({
      ...newPlayer,
      email: player.email || '',
      phone: player.phone || ''
    });
    setShowContactModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="mx-auto mb-4 text-white animate-spin" size={48} />
          <p className="text-white text-xl">Loading players...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <X className="mx-auto mb-4 text-red-400" size={48} />
          <p className="text-red-400 text-xl mb-4">Error loading players: {error}</p>
          <button
            onClick={refreshPlayers}
            className="bg-gradient-to-r from-orange-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-green-700 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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
            Discover their achievements, contact information, and cricket statistics.
          </p>
        </div>

        {/* Player Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
            <Users className="mx-auto mb-3 text-orange-400" size={32} />
            <div className="text-3xl font-bold text-white mb-1">{players.length}</div>
            <div className="text-white/70">Total Players</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
            <Trophy className="mx-auto mb-3 text-yellow-400" size={32} />
            <div className="text-3xl font-bold text-white mb-1">
              {players.reduce((total, player) => total + (player.stats?.runs || 0), 0)}
            </div>
            <div className="text-white/70">Total Runs</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
            <Target className="mx-auto mb-3 text-blue-400" size={32} />
            <div className="text-3xl font-bold text-white mb-1">
              {players.reduce((total, player) => total + (player.stats?.wickets || 0), 0)}
            </div>
            <div className="text-white/70">Total Wickets</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
            <User className="mx-auto mb-3 text-green-400" size={32} />
            <div className="text-3xl font-bold text-white mb-1">
              {new Set(players.map(player => player.teamName)).size}
            </div>
            <div className="text-white/70">Teams</div>
          </div>
        </div>

        {/* Filters and Add Player */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 mb-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
            <div className="flex items-center space-x-3 mb-4 lg:mb-0">
              <Filter className="text-orange-400" size={24} />
              <h2 className="text-2xl font-bold text-white">Filter Players</h2>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={refreshPlayers}
                className="bg-white/10 text-white px-4 py-3 rounded-xl font-semibold hover:bg-white/20 transition-colors flex items-center space-x-2"
              >
                <RefreshCw size={16} />
                <span>Refresh</span>
              </button>
              
              {canManagePlayers && (
                <button
                  onClick={() => setShowAddPlayerModal(true)}
                  className="bg-gradient-to-r from-orange-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-green-700 transition-all transform hover:scale-105 flex items-center space-x-2"
                >
                  <Plus size={20} />
                  <span>Add Player</span>
                </button>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
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

            {/* Team Filter */}
            <div>
              <select
                value={filters.teamName}
                onChange={(e) => setFilters({ ...filters, teamName: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="" className="bg-gray-900">All Teams</option>
                {getUniqueTeamNames().map(team => (
                  <option key={team} value={team} className="bg-gray-900">{team}</option>
                ))}
              </select>
            </div>

            {/* League Filter */}
            <div>
              <select
                value={filters.league}
                onChange={(e) => setFilters({ ...filters, league: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="" className="bg-gray-900">All Leagues</option>
                {getUniqueLeagues().map(league => (
                  <option key={league} value={league} className="bg-gray-900">{league}</option>
                ))}
              </select>
            </div>

            {/* Position Filter */}
            <div>
              <select
                value={filters.position}
                onChange={(e) => setFilters({ ...filters, position: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="" className="bg-gray-900">All Positions</option>
                <option value="Batsman" className="bg-gray-900">Batsman</option>
                <option value="All-rounder" className="bg-gray-900">All-rounder</option>
                <option value="Bowler" className="bg-gray-900">Bowler</option>
                <option value="Wicket-keeper" className="bg-gray-900">Wicket-keeper</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Year Filter */}
            <div>
              <select
                value={filters.year}
                onChange={(e) => setFilters({ ...filters, year: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="2025" className="bg-gray-900">2025</option>
                <option value="2024" className="bg-gray-900">2024</option>
                <option value="2023" className="bg-gray-900">2023</option>
              </select>
            </div>

            {/* Season Filter */}
            <div>
              <select
                value={filters.season}
                onChange={(e) => setFilters({ ...filters, season: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="spring" className="bg-gray-900">Spring</option>
                <option value="summer" className="bg-gray-900">Summer</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="Adult" className="bg-gray-900">Adult</option>
                <option value="Youth" className="bg-gray-900">Youth</option>
              </select>
            </div>
          </div>
        </div>

        {/* Permission Notice for Non-Leadership */}
        {!canManagePlayers && (
          <div className="bg-blue-500/20 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/30 mb-8">
            <div className="flex items-center space-x-3 text-blue-300">
              <Users size={20} />
              <span className="font-semibold">Player Management</span>
            </div>
            <p className="text-blue-200 mt-2">
              Only team captains, vice captains, and admins can add, edit, or delete players. 
              You can still view player information and contact details.
            </p>
          </div>
        )}

        {/* Players Grid */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            {filteredPlayers.length > 0 ? `Cricket Players (${filteredPlayers.length})` : 'No Players Found'}
          </h2>
          
          {filteredPlayers.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 text-center">
              <Users className="mx-auto mb-4 text-white/50" size={48} />
              <h3 className="text-xl font-bold text-white mb-2">No Players Found</h3>
              <p className="text-white/70 mb-6">
                No players match your current filters. Try adjusting your search criteria.
              </p>
              {canManagePlayers && (
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
              {filteredPlayers.map((player) => (
                <div
                  key={player.id}
                  className="group bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 hover:transform hover:scale-105"
                >
                  {/* Player Header */}
                  <div className="text-center mb-6">
                    <div className={`w-20 h-20 bg-gradient-to-r ${getPositionColor(player.position)} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <span className="text-white text-xl font-bold">
                        {getPlayerInitials(player.name)}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{player.name}</h3>
                    <div className={`inline-block bg-gradient-to-r ${getPositionColor(player.position)} px-4 py-2 rounded-full text-sm font-semibold text-white mb-2`}>
                      {player.position}
                    </div>
                    <div className="text-white/70 text-sm">
                      {player.teamName} • {player.league} • {player.category}
                    </div>
                  </div>

                  {/* Player Stats */}
                  {player.stats && (
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{player.stats.runs}</div>
                        <div className="text-xs text-white/70">Runs</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{player.stats.wickets}</div>
                        <div className="text-xs text-white/70">Wickets</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{player.stats.matches}</div>
                        <div className="text-xs text-white/70">Matches</div>
                      </div>
                    </div>
                  )}

                  {/* Contact Information */}
                  <div className="space-y-3 mb-6">
                    {player.email && (
                      <div className="flex items-center space-x-3 text-white/80">
                        <Mail size={16} className="text-blue-400" />
                        <span className="text-sm truncate">{player.email}</span>
                      </div>
                    )}
                    {player.phone && (
                      <div className="flex items-center space-x-3 text-white/80">
                        <Phone size={16} className="text-green-400" />
                        <span className="text-sm">{player.phone}</span>
                      </div>
                    )}
                    {(!player.email && !player.phone) && (
                      <div className="text-white/50 text-sm text-center py-2">
                        No contact information available
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditContact(player)}
                      className="flex-1 bg-blue-500/20 text-blue-300 py-2 px-3 rounded-lg hover:bg-blue-500/30 transition-colors text-sm font-semibold flex items-center justify-center space-x-1"
                    >
                      <Mail size={14} />
                      <span>Contact</span>
                    </button>
                    
                    {canManagePlayers && (
                      <>
                        <button
                          onClick={() => handleEditPlayer(player)}
                          className="flex-1 bg-green-500/20 text-green-300 py-2 px-3 rounded-lg hover:bg-green-500/30 transition-colors text-sm font-semibold flex items-center justify-center space-x-1"
                        >
                          <Edit3 size={14} />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeletePlayer(player.id, player.name)}
                          className="bg-red-500/20 text-red-300 py-2 px-3 rounded-lg hover:bg-red-500/30 transition-colors text-sm font-semibold"
                        >
                          <Trash2 size={14} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Add Player Modal */}
        {showAddPlayerModal && canManagePlayers && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 w-full max-w-2xl border border-white/30 max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-bold text-white mb-6">Add New Cricket Player</h3>
              
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                  <h4 className="text-lg font-semibold text-white mb-4">Basic Information</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Full Name *</label>
                      <input
                        type="text"
                        value={newPlayer.name || ''}
                        onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="Enter player's full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Position *</label>
                      <select
                        value={newPlayer.position || 'Batsman'}
                        onChange={(e) => setNewPlayer({ ...newPlayer, position: e.target.value as Player['position'] })}
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
                        value={newPlayer.email || ''}
                        onChange={(e) => setNewPlayer({ ...newPlayer, email: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="player@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={newPlayer.phone || ''}
                        onChange={(e) => setNewPlayer({ ...newPlayer, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="+1-206-555-0123"
                      />
                    </div>
                  </div>
                </div>

                {/* Team Assignment */}
                <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                  <h4 className="text-lg font-semibold text-white mb-4">Team Assignment</h4>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-2">League *</label>
                        <select
                          value={newPlayer.league || 'ARCL'}
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
                          value={newPlayer.overs || ''}
                          onChange={(e) => setNewPlayer({ ...newPlayer, overs: e.target.value })}
                          className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                        >
                          {getAvailableOvers(newPlayer.league || 'ARCL').map(format => (
                            <option key={format} value={format} className="bg-gray-900">{format}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-2">Category *</label>
                        <select
                          value={newPlayer.category || 'Adult'}
                          onChange={(e) => setNewPlayer({ ...newPlayer, category: e.target.value })}
                          className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                        >
                          <option value="Adult" className="bg-gray-900">Adult</option>
                          <option value="Youth" className="bg-gray-900">Youth</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Team *</label>
                      <select
                        value={newPlayer.teamName || ''}
                        onChange={(e) => setNewPlayer({ ...newPlayer, teamName: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                      >
                        <option value="" className="bg-gray-900">Select a team</option>
                        {availableTeams
                          .filter(team => 
                            team.league === (newPlayer.league || 'ARCL') && 
                            team.category === (newPlayer.category || 'Adult')
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

                {/* Statistics */}
                <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                  <h4 className="text-lg font-semibold text-white mb-4">Cricket Statistics</h4>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Runs</label>
                      <input
                        type="number"
                        value={newPlayer.stats?.runs || 0}
                        onChange={(e) => setNewPlayer({ 
                          ...newPlayer, 
                          stats: { 
                            ...newPlayer.stats!, 
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
                        value={newPlayer.stats?.wickets || 0}
                        onChange={(e) => setNewPlayer({ 
                          ...newPlayer, 
                          stats: { 
                            ...newPlayer.stats!, 
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
                        value={newPlayer.stats?.matches || 0}
                        onChange={(e) => setNewPlayer({ 
                          ...newPlayer, 
                          stats: { 
                            ...newPlayer.stats!, 
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
                  onClick={() => setShowAddPlayerModal(false)}
                  className="flex-1 bg-white/10 text-white py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddPlayer}
                  disabled={!newPlayer.name?.trim() || !newPlayer.teamName}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Player
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Player Modal */}
        {showEditPlayerModal && selectedPlayer && canManagePlayers && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 w-full max-w-2xl border border-white/30 max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-bold text-white mb-6">Edit Player: {selectedPlayer.name}</h3>
              
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                  <h4 className="text-lg font-semibold text-white mb-4">Basic Information</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Full Name *</label>
                      <input
                        type="text"
                        value={newPlayer.name || ''}
                        onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="Enter player's full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Position *</label>
                      <select
                        value={newPlayer.position || 'Batsman'}
                        onChange={(e) => setNewPlayer({ ...newPlayer, position: e.target.value as Player['position'] })}
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
                        value={newPlayer.email || ''}
                        onChange={(e) => setNewPlayer({ ...newPlayer, email: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="player@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={newPlayer.phone || ''}
                        onChange={(e) => setNewPlayer({ ...newPlayer, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="+1-206-555-0123"
                      />
                    </div>
                  </div>
                </div>

                {/* Statistics */}
                <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                  <h4 className="text-lg font-semibold text-white mb-4">Cricket Statistics</h4>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Runs</label>
                      <input
                        type="number"
                        value={newPlayer.stats?.runs || 0}
                        onChange={(e) => setNewPlayer({ 
                          ...newPlayer, 
                          stats: { 
                            ...newPlayer.stats!, 
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
                        value={newPlayer.stats?.wickets || 0}
                        onChange={(e) => setNewPlayer({ 
                          ...newPlayer, 
                          stats: { 
                            ...newPlayer.stats!, 
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
                        value={newPlayer.stats?.matches || 0}
                        onChange={(e) => setNewPlayer({ 
                          ...newPlayer, 
                          stats: { 
                            ...newPlayer.stats!, 
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
                    setNewPlayer({
                      name: '',
                      position: 'Batsman',
                      email: '',
                      phone: '',
                      year: '2025',
                      season: 'spring',
                      league: 'ARCL',
                      overs: '16 overs',
                      category: 'Adult',
                      teamName: 'Cereal Killers',
                      stats: { runs: 0, wickets: 0, matches: 0 }
                    });
                  }}
                  className="flex-1 bg-white/10 text-white py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdatePlayer}
                  disabled={!newPlayer.name?.trim()}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Update Player
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Contact Modal */}
        {showContactModal && selectedPlayer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md border border-white/30">
              <h3 className="text-2xl font-bold text-white mb-6">Contact: {selectedPlayer.name}</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">Email</label>
                  <input
                    type="email"
                    value={newPlayer.email || ''}
                    onChange={(e) => setNewPlayer({ ...newPlayer, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="player@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={newPlayer.phone || ''}
                    onChange={(e) => setNewPlayer({ ...newPlayer, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="+1-206-555-0123"
                  />
                </div>
              </div>
              
              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => {
                    setShowContactModal(false);
                    setSelectedPlayer(null);
                    setNewPlayer({
                      name: '',
                      position: 'Batsman',
                      email: '',
                      phone: '',
                      year: '2025',
                      season: 'spring',
                      league: 'ARCL',
                      overs: '16 overs',
                      category: 'Adult',
                      teamName: 'Cereal Killers',
                      stats: { runs: 0, wickets: 0, matches: 0 }
                    });
                  }}
                  className="flex-1 bg-white/10 text-white py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateContact}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-green-700 transition-all"
                >
                  Update Contact
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}