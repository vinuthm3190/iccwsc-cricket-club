import React, { useState, useMemo } from 'react';
import { Users, Filter, Plus, Edit3, Trash2, UserPlus, Trophy, Target, Award, Search } from 'lucide-react';
import { Player } from '../../types';
import { useAuth } from '../../context/AuthContext';

interface PlayerFilters {
  year: string;
  season: string;
  league: string;
  overs: string;
  category: string;
  position: string;
  teamName: string;
  search: string;
}

interface ExtendedPlayer extends Player {
  year: string;
  season: string;
  league: string;
  overs: string;
  category: string;
  teamName: string;
}

interface NewPlayerData extends Partial<Player> {
  year?: string;
  season?: string;
  league?: string;
  overs?: string;
  category?: string;
  teamName?: string;
}

export default function Players() {
  const { hasPermission } = useAuth();
  const canManagePlayers = hasPermission(['captain', 'vice']);

  const [filters, setFilters] = useState<PlayerFilters>({
    year: '',
    season: '',
    league: '',
    overs: '',
    category: '',
    position: '',
    teamName: '',
    search: ''
  });

  const [showAddPlayerModal, setShowAddPlayerModal] = useState(false);
  const [showEditPlayerModal, setShowEditPlayerModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<ExtendedPlayer | null>(null);
  const [newPlayer, setNewPlayer] = useState<NewPlayerData>({});
  const [editPlayer, setEditPlayer] = useState<Partial<ExtendedPlayer>>({});
  const [customYear, setCustomYear] = useState('');
  const [useCustomYear, setUseCustomYear] = useState(false);

  // Generate dynamic year options (current year ± 5 years)
  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    
    // Add past 5 years, current year, and future 5 years
    for (let i = currentYear - 5; i <= currentYear + 5; i++) {
      years.push(i.toString());
    }
    
    return years;
  };

  const yearOptions = generateYearOptions();

  // Available teams for dropdown - Updated with all NWCL combinations
  const availableTeams = [
    // ARCL Teams
    { name: 'Angry Bulls', league: 'ARCL', overs: '16 overs', category: 'Adult' },
    { name: 'Royal Warriors', league: 'ARCL', overs: '16 overs', category: 'Adult' },
    { name: 'Cereal Killers', league: 'ARCL', overs: '16 overs', category: 'Adult' },
    
    // NWCL Teams - Watermelons (All formats, both categories)
    { name: 'Watermelons', league: 'NWCL', overs: 'T10', category: 'Adult' },
    { name: 'Watermelons', league: 'NWCL', overs: 'T10', category: 'Youth' },
    { name: 'Watermelons', league: 'NWCL', overs: 'T20', category: 'Adult' },
    { name: 'Watermelons', league: 'NWCL', overs: 'T20', category: 'Youth' },
    { name: 'Watermelons', league: 'NWCL', overs: 'T40', category: 'Adult' },
    { name: 'Watermelons', league: 'NWCL', overs: 'T40', category: 'Youth' },
    
    // NWCL Teams - Solaris (All formats, both categories)
    { name: 'Solaris', league: 'NWCL', overs: 'T10', category: 'Adult' },
    { name: 'Solaris', league: 'NWCL', overs: 'T10', category: 'Youth' },
    { name: 'Solaris', league: 'NWCL', overs: 'T20', category: 'Adult' },
    { name: 'Solaris', league: 'NWCL', overs: 'T20', category: 'Youth' },
    { name: 'Solaris', league: 'NWCL', overs: 'T40', category: 'Adult' },
    { name: 'Solaris', league: 'NWCL', overs: 'T40', category: 'Youth' }
  ];

  // Extended players data with team assignments - Updated with Cereal Killers players and no images
  const [players, setPlayers] = useState<ExtendedPlayer[]>([
    // Cereal Killers players (Spring 2025)
    {
      id: '1',
      name: 'Naim Mohammad',
      position: 'Batsman',
      avatar: '',
      stats: { runs: 1250, wickets: 5, matches: 28 },
      year: '2025',
      season: 'spring',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      teamName: 'Cereal Killers'
    },
    {
      id: '2',
      name: 'Dhruva Kumar',
      position: 'Batsman',
      avatar: '',
      stats: { runs: 890, wickets: 2, matches: 25 },
      year: '2025',
      season: 'spring',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      teamName: 'Cereal Killers'
    },
    {
      id: '3',
      name: 'Darshan Masti Prakash',
      position: 'All-rounder',
      avatar: '',
      stats: { runs: 734, wickets: 18, matches: 27 },
      year: '2025',
      season: 'spring',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      teamName: 'Cereal Killers'
    },
    {
      id: '4',
      name: 'Vinuth Muniraju',
      position: 'Bowler',
      avatar: '',
      stats: { runs: 156, wickets: 38, matches: 30 },
      year: '2025',
      season: 'spring',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      teamName: 'Cereal Killers'
    },
    {
      id: '5',
      name: 'Uday C',
      position: 'Batsman',
      avatar: '',
      stats: { runs: 1123, wickets: 3, matches: 26 },
      year: '2025',
      season: 'spring',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      teamName: 'Cereal Killers'
    },
    {
      id: '6',
      name: 'Vidhyadhar Ghorpade',
      position: 'All-rounder',
      avatar: '',
      stats: { runs: 567, wickets: 12, matches: 24 },
      year: '2025',
      season: 'spring',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      teamName: 'Cereal Killers'
    },
    {
      id: '7',
      name: 'Vijeth Shetty',
      position: 'Bowler',
      avatar: '',
      stats: { runs: 89, wickets: 29, matches: 27 },
      year: '2025',
      season: 'spring',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      teamName: 'Cereal Killers'
    },
    {
      id: '8',
      name: 'Kiran S',
      position: 'Batsman',
      avatar: '',
      stats: { runs: 892, wickets: 1, matches: 22 },
      year: '2025',
      season: 'spring',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      teamName: 'Cereal Killers'
    },
    {
      id: '9',
      name: 'Manjunatha Shetty Kondalli',
      position: 'Wicket-keeper',
      avatar: '',
      stats: { runs: 678, wickets: 0, matches: 28 },
      year: '2025',
      season: 'spring',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      teamName: 'Cereal Killers'
    },
    {
      id: '10',
      name: 'Raj Mani N',
      position: 'All-rounder',
      avatar: '',
      stats: { runs: 445, wickets: 15, matches: 18 },
      year: '2025',
      season: 'spring',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      teamName: 'Cereal Killers'
    },
    {
      id: '11',
      name: 'Arun Thippur Jayakeerthy',
      position: 'Bowler',
      avatar: '',
      stats: { runs: 78, wickets: 32, matches: 20 },
      year: '2025',
      season: 'spring',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      teamName: 'Cereal Killers'
    },
    {
      id: '12',
      name: 'Avinash Talanki',
      position: 'Batsman',
      avatar: '',
      stats: { runs: 1456, wickets: 2, matches: 25 },
      year: '2025',
      season: 'spring',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      teamName: 'Cereal Killers'
    },
    {
      id: '13',
      name: 'Dhanush Shetty CK',
      position: 'All-rounder',
      avatar: '',
      stats: { runs: 245, wickets: 45, matches: 29 },
      year: '2025',
      season: 'spring',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      teamName: 'Cereal Killers'
    },
    {
      id: '14',
      name: 'Siva Krapa',
      position: 'Bowler',
      avatar: '',
      stats: { runs: 156, wickets: 38, matches: 30 },
      year: '2025',
      season: 'spring',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      teamName: 'Cereal Killers'
    }
  ]);

  const getPositionColor = (position: string) => {
    switch (position) {
      case 'Batsman': return 'from-red-500 to-orange-500';
      case 'All-rounder': return 'from-green-500 to-emerald-500';
      case 'Bowler': return 'from-blue-500 to-cyan-500';
      case 'Wicket-keeper': return 'from-purple-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
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

  // Get available teams based on filters
  const getAvailableTeams = (league?: string, overs?: string, category?: string) => {
    return availableTeams.filter(team => {
      if (league && team.league !== league) return false;
      if (overs && team.overs !== overs) return false;
      if (category && team.category !== category) return false;
      return true;
    });
  };

  // Filter players based on current filters
  const filteredPlayers = useMemo(() => {
    return players.filter(player => {
      const matchesYear = !filters.year || player.year === filters.year;
      const matchesSeason = !filters.season || player.season === filters.season;
      const matchesLeague = !filters.league || player.league === filters.league;
      const matchesOvers = !filters.overs || player.overs === filters.overs;
      const matchesCategory = !filters.category || player.category === filters.category;
      const matchesPosition = !filters.position || player.position === filters.position;
      const matchesTeamName = !filters.teamName || player.teamName === filters.teamName;
      const matchesSearch = !filters.search || 
        player.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        player.teamName.toLowerCase().includes(filters.search.toLowerCase());

      return matchesYear && matchesSeason && matchesLeague && matchesOvers && 
             matchesCategory && matchesPosition && matchesTeamName && matchesSearch;
    });
  }, [filters, players]);

  // Handle filter changes
  const handleFilterChange = (key: keyof PlayerFilters, value: string) => {
    setFilters(prev => {
      const newFilters = { ...prev, [key]: value };
      
      // Reset dependent filters when league changes
      if (key === 'league' && value) {
        newFilters.overs = '';
        newFilters.teamName = '';
      }
      
      // Reset team name when overs or category changes
      if ((key === 'overs' || key === 'category') && value) {
        newFilters.teamName = '';
      }
      
      return newFilters;
    });
  };

  // Handle new player filter changes
  const handleNewPlayerFilterChange = (key: string, value: string) => {
    setNewPlayer(prev => {
      const updated = { ...prev, [key]: value };
      
      // Reset dependent fields when league changes
      if (key === 'league') {
        const availableOvers = getAvailableOvers(value);
        updated.overs = '';
        updated.teamName = '';
      }
      
      // Reset team name when overs or category changes
      if (key === 'overs' || key === 'category') {
        updated.teamName = '';
      }
      
      return updated;
    });
  };

  // Handle year selection (either from dropdown or custom input)
  const handleYearChange = (value: string) => {
    if (value === 'custom') {
      setUseCustomYear(true);
      setNewPlayer(prev => ({ ...prev, year: customYear }));
    } else {
      setUseCustomYear(false);
      setCustomYear('');
      setNewPlayer(prev => ({ ...prev, year: value }));
    }
  };

  // Handle custom year input
  const handleCustomYearChange = (value: string) => {
    // Only allow numeric input for years
    const numericValue = value.replace(/[^0-9]/g, '');
    
    // Limit to 4 digits
    if (numericValue.length <= 4) {
      setCustomYear(numericValue);
      setNewPlayer(prev => ({ ...prev, year: numericValue }));
    }
  };

  // Validate custom year
  const isValidCustomYear = (year: string) => {
    const yearNum = parseInt(year);
    const currentYear = new Date().getFullYear();
    return year.length === 4 && yearNum >= 1900 && yearNum <= currentYear + 10;
  };

  const handleAddPlayer = () => {
    // Validate year selection
    let selectedYear = '';
    if (useCustomYear) {
      if (!customYear || !isValidCustomYear(customYear)) {
        alert('Please enter a valid 4-digit year (1900 - ' + (new Date().getFullYear() + 10) + ').');
        return;
      }
      selectedYear = customYear;
    } else {
      if (!newPlayer.year) {
        alert('Please select a year.');
        return;
      }
      selectedYear = newPlayer.year;
    }

    if (!newPlayer.name || !newPlayer.position || !newPlayer.season || 
        !newPlayer.league || !newPlayer.overs || !newPlayer.category || !newPlayer.teamName) {
      alert('Please fill in all required fields including team assignment details.');
      return;
    }

    const player: ExtendedPlayer = {
      id: Date.now().toString(),
      name: newPlayer.name,
      position: newPlayer.position as Player['position'],
      avatar: '',
      stats: {
        runs: parseInt(newPlayer.stats?.runs?.toString() || '0'),
        wickets: parseInt(newPlayer.stats?.wickets?.toString() || '0'),
        matches: parseInt(newPlayer.stats?.matches?.toString() || '0')
      },
      year: selectedYear,
      season: newPlayer.season,
      league: newPlayer.league,
      overs: newPlayer.overs,
      category: newPlayer.category,
      teamName: newPlayer.teamName
    };

    // Actually add the player to the state
    setPlayers(prev => [...prev, player]);
    
    setShowAddPlayerModal(false);
    setNewPlayer({});
    setUseCustomYear(false);
    setCustomYear('');

    alert(`Player "${player.name}" added successfully to team "${player.teamName}" in ${player.league} ${player.overs} ${player.category} league for ${player.year} ${player.season}!`);
  };

  const handleEditPlayer = (player: ExtendedPlayer) => {
    if (!canManagePlayers) return;
    setSelectedPlayer(player);
    setEditPlayer({
      name: player.name,
      position: player.position,
      year: player.year,
      season: player.season,
      league: player.league,
      overs: player.overs,
      category: player.category,
      teamName: player.teamName,
      stats: player.stats
    });
    setShowEditPlayerModal(true);
  };

  const handleUpdatePlayer = () => {
    if (!selectedPlayer || !editPlayer.name || !editPlayer.position) {
      alert('Please fill in all required fields.');
      return;
    }

    // Update the player in the state
    setPlayers(prev => prev.map(player => 
      player.id === selectedPlayer.id 
        ? { ...player, ...editPlayer } as ExtendedPlayer
        : player
    ));

    setShowEditPlayerModal(false);
    setSelectedPlayer(null);
    setEditPlayer({});

    alert(`Player "${editPlayer.name}" updated successfully!`);
  };

  const handleRemovePlayer = (playerId: string, playerName: string) => {
    if (!canManagePlayers) return;
    if (confirm(`Are you sure you want to remove ${playerName} from the team?`)) {
      // Actually remove the player from the state
      setPlayers(prev => prev.filter(player => player.id !== playerId));
      alert(`Player "${playerName}" removed successfully!`);
    }
  };

  const clearFilters = () => {
    setFilters({
      year: '',
      season: '',
      league: '',
      overs: '',
      category: '',
      position: '',
      teamName: '',
      search: ''
    });
  };

  // Get unique values for filter dropdowns
  const getUniqueValues = (key: keyof ExtendedPlayer) => {
    return [...new Set(players.map(player => player[key]))].sort();
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
            Discover our talented cricketers across all teams and leagues. 
            Filter by league, team, position, or search for specific players to explore their stats and achievements.
          </p>
        </div>

        {/* Player Filters */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Filter className="text-orange-400" size={24} />
              <h2 className="text-2xl font-bold text-white">Filter Players</h2>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={clearFilters}
                className="bg-white/10 text-white px-4 py-2 rounded-lg font-semibold hover:bg-white/20 transition-colors"
              >
                Clear Filters
              </button>
              {canManagePlayers && (
                <button
                  onClick={() => setShowAddPlayerModal(true)}
                  className="bg-gradient-to-r from-orange-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-green-700 transition-all transform hover:scale-105 flex items-center space-x-2"
                >
                  <UserPlus size={20} />
                  <span>Add Player</span>
                </button>
              )}
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50" size={20} />
              <input
                type="text"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Search players by name or team..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
            {/* Year */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">Year</label>
              <select
                value={filters.year}
                onChange={(e) => handleFilterChange('year', e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="" className="bg-gray-900">All Years</option>
                {getUniqueValues('year').map(year => (
                  <option key={year} value={year} className="bg-gray-900">{year}</option>
                ))}
              </select>
            </div>

            {/* Season */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">Season</label>
              <select
                value={filters.season}
                onChange={(e) => handleFilterChange('season', e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="" className="bg-gray-900">All Seasons</option>
                {getUniqueValues('season').map(season => (
                  <option key={season} value={season} className="bg-gray-900">
                    {season.charAt(0).toUpperCase() + season.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* League */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">League</label>
              <select
                value={filters.league}
                onChange={(e) => handleFilterChange('league', e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="" className="bg-gray-900">All Leagues</option>
                {getUniqueValues('league').map(league => (
                  <option key={league} value={league} className="bg-gray-900">{league}</option>
                ))}
              </select>
            </div>

            {/* Overs */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">Format</label>
              <select
                value={filters.overs}
                onChange={(e) => handleFilterChange('overs', e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="" className="bg-gray-900">All Formats</option>
                {filters.league ? 
                  getAvailableOvers(filters.league).map(format => (
                    <option key={format} value={format} className="bg-gray-900">{format}</option>
                  )) :
                  getUniqueValues('overs').map(overs => (
                    <option key={overs} value={overs} className="bg-gray-900">{overs}</option>
                  ))
                }
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">Category</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="" className="bg-gray-900">All Categories</option>
                {getUniqueValues('category').map(category => (
                  <option key={category} value={category} className="bg-gray-900">{category}</option>
                ))}
              </select>
            </div>

            {/* Team Name */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">Team</label>
              <select
                value={filters.teamName}
                onChange={(e) => handleFilterChange('teamName', e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="" className="bg-gray-900">All Teams</option>
                {getAvailableTeams(filters.league, filters.overs, filters.category).map((team, index) => (
                  <option key={`${team.name}-${team.overs}-${team.category}-${index}`} value={team.name} className="bg-gray-900">
                    {team.name} ({team.overs} {team.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Position */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">Position</label>
              <select
                value={filters.position}
                onChange={(e) => handleFilterChange('position', e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="" className="bg-gray-900">All Positions</option>
                {getUniqueValues('position').map(position => (
                  <option key={position} value={position} className="bg-gray-900">{position}</option>
                ))}
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
              Only team captains and vice captains can add, edit, or remove players.
            </p>
          </div>
        )}

        {/* Player Statistics Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
            <Users className="mx-auto mb-3 text-blue-400" size={32} />
            <div className="text-3xl font-bold text-white mb-1">{filteredPlayers.length}</div>
            <div className="text-white/70">Players Found</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
            <Trophy className="mx-auto mb-3 text-yellow-400" size={32} />
            <div className="text-3xl font-bold text-white mb-1">
              {filteredPlayers.reduce((total, player) => total + (player.stats?.runs || 0), 0)}
            </div>
            <div className="text-white/70">Total Runs</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
            <Target className="mx-auto mb-3 text-green-400" size={32} />
            <div className="text-3xl font-bold text-white mb-1">
              {filteredPlayers.reduce((total, player) => total + (player.stats?.wickets || 0), 0)}
            </div>
            <div className="text-white/70">Total Wickets</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
            <Award className="mx-auto mb-3 text-purple-400" size={32} />
            <div className="text-3xl font-bold text-white mb-1">
              {filteredPlayers.length > 0 ? Math.round(filteredPlayers.reduce((total, player) => total + (player.stats?.matches || 0), 0) / filteredPlayers.length) : 0}
            </div>
            <div className="text-white/70">Avg Matches</div>
          </div>
        </div>

        {/* Players Grid */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            {filteredPlayers.length > 0 ? 
              `${filteredPlayers.length} Cricket Player${filteredPlayers.length !== 1 ? 's' : ''}` : 
              'No Players Found'
            }
          </h2>
          
          {filteredPlayers.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 text-center">
              <Users className="mx-auto mb-4 text-white/50" size={48} />
              <h3 className="text-xl font-bold text-white mb-2">No Players Found</h3>
              <p className="text-white/70 mb-6">
                No players match your current filter criteria. Try adjusting your filters or search terms.
              </p>
              <button
                onClick={clearFilters}
                className="bg-gradient-to-r from-orange-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-green-700 transition-all"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPlayers
                .sort((a, b) => (b.stats?.runs || 0) - (a.stats?.runs || 0))
                .map((player) => (
                <div
                  key={player.id}
                  className="group bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 relative"
                >
                  {/* Management Actions - Only visible to captain/vice - Fixed positioning and hover */}
                  {canManagePlayers && (
                    <div className="absolute top-4 right-4 flex space-x-2 z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditPlayer(player);
                        }}
                        className="p-2 bg-blue-500/80 text-blue-100 rounded-lg hover:bg-blue-500 transition-colors backdrop-blur-sm border border-blue-400/50 shadow-lg"
                        title="Edit Player"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemovePlayer(player.id, player.name);
                        }}
                        className="p-2 bg-red-500/80 text-red-100 rounded-lg hover:bg-red-500 transition-colors backdrop-blur-sm border border-red-400/50 shadow-lg"
                        title="Remove Player"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  )}

                  <div className="relative mb-6">
                    {/* Player Avatar - Show placeholder when no image */}
                    {player.avatar ? (
                      <img
                        src={player.avatar}
                        alt={player.name}
                        className="w-24 h-24 rounded-2xl mx-auto object-cover border-4 border-white/20 group-hover:border-white/40 transition-all"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-2xl mx-auto bg-gradient-to-br from-gray-500 to-gray-600 border-4 border-white/20 group-hover:border-white/40 transition-all flex items-center justify-center">
                        <Users className="text-white/70" size={32} />
                      </div>
                    )}
                    <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r ${getPositionColor(player.position)} px-3 py-1 rounded-full text-xs font-semibold text-white`}>
                      {player.position}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-2">{player.name}</h3>
                    
                    {/* Team Info */}
                    <div className="mb-4 space-y-1">
                      <div className="text-sm font-semibold text-orange-300">
                        {player.teamName}
                      </div>
                      <div className="text-sm text-white/70">
                        {player.league} • {player.overs} • {player.category}
                      </div>
                      <div className="text-xs text-white/60">
                        {player.year} {player.season.charAt(0).toUpperCase() + player.season.slice(1)}
                      </div>
                    </div>
                    
                    {player.stats && (
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
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Add Player Modal - Only visible to captain/vice */}
        {showAddPlayerModal && canManagePlayers && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 w-full max-w-2xl border border-white/30 max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-bold text-white mb-6">Add New Cricket Player</h3>
              
              <div className="space-y-6">
                {/* Team Assignment Section */}
                <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                    <Trophy size={20} />
                    <span>Team Assignment</span>
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Enhanced Year Selection */}
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Year *</label>
                      {!useCustomYear ? (
                        <select
                          value={newPlayer.year || ''}
                          onChange={(e) => handleYearChange(e.target.value)}
                          className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                        >
                          <option value="" className="bg-gray-900">Select year</option>
                          {yearOptions.map(year => (
                            <option key={year} value={year} className="bg-gray-900">{year}</option>
                          ))}
                          <option value="custom" className="bg-gray-900 text-orange-300">✏️ Enter Custom Year</option>
                        </select>
                      ) : (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={customYear}
                            onChange={(e) => handleCustomYearChange(e.target.value)}
                            className={`w-full px-4 py-3 bg-white/10 border ${
                              customYear && !isValidCustomYear(customYear) 
                                ? 'border-red-500' 
                                : 'border-white/30'
                            } rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400`}
                            placeholder="Enter 4-digit year (e.g., 2026)"
                            maxLength={4}
                          />
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setUseCustomYear(false);
                                setCustomYear('');
                                setNewPlayer(prev => ({ ...prev, year: '' }));
                              }}
                              className="text-xs bg-white/10 text-white px-3 py-1 rounded-lg hover:bg-white/20 transition-colors"
                            >
                              ← Back to List
                            </button>
                            {customYear && isValidCustomYear(customYear) && (
                              <span className="text-xs text-green-400 flex items-center">
                                ✓ Valid year
                              </span>
                            )}
                            {customYear && !isValidCustomYear(customYear) && (
                              <span className="text-xs text-red-400 flex items-center">
                                ✗ Invalid year (1900-{new Date().getFullYear() + 10})
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Season */}
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Season *</label>
                      <select
                        value={newPlayer.season || ''}
                        onChange={(e) => handleNewPlayerFilterChange('season', e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                      >
                        <option value="" className="bg-gray-900">Select season</option>
                        <option value="spring" className="bg-gray-900">Spring</option>
                        <option value="summer" className="bg-gray-900">Summer</option>
                        <option value="fall" className="bg-gray-900">Fall</option>
                        <option value="winter" className="bg-gray-900">Winter</option>
                      </select>
                    </div>

                    {/* League */}
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">League *</label>
                      <select
                        value={newPlayer.league || ''}
                        onChange={(e) => handleNewPlayerFilterChange('league', e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                      >
                        <option value="" className="bg-gray-900">Select league</option>
                        <option value="ARCL" className="bg-gray-900">ARCL</option>
                        <option value="NWCL" className="bg-gray-900">NWCL</option>
                      </select>
                    </div>

                    {/* Overs */}
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Format *</label>
                      <select
                        value={newPlayer.overs || ''}
                        onChange={(e) => handleNewPlayerFilterChange('overs', e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                        disabled={!newPlayer.league}
                      >
                        <option value="" className="bg-gray-900">Select format</option>
                        {newPlayer.league && getAvailableOvers(newPlayer.league).map(format => (
                          <option key={format} value={format} className="bg-gray-900">{format}</option>
                        ))}
                      </select>
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Category *</label>
                      <select
                        value={newPlayer.category || ''}
                        onChange={(e) => handleNewPlayerFilterChange('category', e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                      >
                        <option value="" className="bg-gray-900">Select category</option>
                        <option value="Adult" className="bg-gray-900">Adult</option>
                        <option value="Youth" className="bg-gray-900">Youth</option>
                      </select>
                    </div>

                    {/* Team Name */}
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Team Name *</label>
                      <select
                        value={newPlayer.teamName || ''}
                        onChange={(e) => handleNewPlayerFilterChange('teamName', e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                        disabled={!newPlayer.league || !newPlayer.overs || !newPlayer.category}
                      >
                        <option value="" className="bg-gray-900">Select team</option>
                        {getAvailableTeams(newPlayer.league, newPlayer.overs, newPlayer.category).map((team, index) => (
                          <option key={`${team.name}-${team.overs}-${team.category}-${index}`} value={team.name} className="bg-gray-900">
                            {team.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Year Selection Helper */}
                  <div className="mt-4 p-3 bg-blue-500/20 border border-blue-500/30 rounded-xl">
                    <div className="flex items-center space-x-2 text-blue-300 text-sm">
                      <Trophy size={16} />
                      <span className="font-semibold">Year Selection Options:</span>
                    </div>
                    <div className="text-blue-200 text-xs mt-1 space-y-1">
                      <div>• <strong>Dropdown:</strong> Choose from {new Date().getFullYear() - 5} to {new Date().getFullYear() + 5}</div>
                      <div>• <strong>Custom Entry:</strong> Enter any year from 1900 to {new Date().getFullYear() + 10}</div>
                      <div>• <strong>Current Year:</strong> {new Date().getFullYear()}</div>
                    </div>
                  </div>
                </div>

                {/* Player Details Section */}
                <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                    <Users size={20} />
                    <span>Player Details</span>
                  </h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Player Name *</label>
                      <input
                        type="text"
                        value={newPlayer.name || ''}
                        onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="Enter player name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Position *</label>
                      <select
                        value={newPlayer.position || ''}
                        onChange={(e) => setNewPlayer({ ...newPlayer, position: e.target.value as Player['position'] })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                      >
                        <option value="" className="bg-gray-900">Select position</option>
                        <option value="Batsman" className="bg-gray-900">Batsman</option>
                        <option value="All-rounder" className="bg-gray-900">All-rounder</option>
                        <option value="Bowler" className="bg-gray-900">Bowler</option>
                        <option value="Wicket-keeper" className="bg-gray-900">Wicket-keeper</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-2">Runs</label>
                        <input
                          type="number"
                          value={newPlayer.stats?.runs || ''}
                          onChange={(e) => setNewPlayer({ 
                            ...newPlayer, 
                            stats: { 
                              ...newPlayer.stats, 
                              runs: parseInt(e.target.value) || 0,
                              wickets: newPlayer.stats?.wickets || 0,
                              matches: newPlayer.stats?.matches || 0
                            }
                          })}
                          className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-2">Wickets</label>
                        <input
                          type="number"
                          value={newPlayer.stats?.wickets || ''}
                          onChange={(e) => setNewPlayer({ 
                            ...newPlayer, 
                            stats: { 
                              ...newPlayer.stats, 
                              runs: newPlayer.stats?.runs || 0,
                              wickets: parseInt(e.target.value) || 0,
                              matches: newPlayer.stats?.matches || 0
                            }
                          })}
                          className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-2">Matches</label>
                        <input
                          type="number"
                          value={newPlayer.stats?.matches || ''}
                          onChange={(e) => setNewPlayer({ 
                            ...newPlayer, 
                            stats: { 
                              ...newPlayer.stats, 
                              runs: newPlayer.stats?.runs || 0,
                              wickets: newPlayer.stats?.wickets || 0,
                              matches: parseInt(e.target.value) || 0
                            }
                          })}
                          className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => {
                    setShowAddPlayerModal(false);
                    setNewPlayer({});
                    setUseCustomYear(false);
                    setCustomYear('');
                  }}
                  className="flex-1 bg-white/10 text-white py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddPlayer}
                  disabled={
                    !newPlayer.name || 
                    !newPlayer.position || 
                    (!useCustomYear && !newPlayer.year) ||
                    (useCustomYear && (!customYear || !isValidCustomYear(customYear))) ||
                    !newPlayer.season || 
                    !newPlayer.league || 
                    !newPlayer.overs || 
                    !newPlayer.category || 
                    !newPlayer.teamName
                  }
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
                {/* Player Details Section */}
                <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                  <h4 className="text-lg font-semibold text-white mb-4">Player Details</h4>
                  
                  <div className="space-y-4">
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
                        <option value="" className="bg-gray-900">Select position</option>
                        <option value="Batsman" className="bg-gray-900">Batsman</option>
                        <option value="All-rounder" className="bg-gray-900">All-rounder</option>
                        <option value="Bowler" className="bg-gray-900">Bowler</option>
                        <option value="Wicket-keeper" className="bg-gray-900">Wicket-keeper</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-2">Runs</label>
                        <input
                          type="number"
                          value={editPlayer.stats?.runs || ''}
                          onChange={(e) => setEditPlayer({ 
                            ...editPlayer, 
                            stats: { 
                              ...editPlayer.stats, 
                              runs: parseInt(e.target.value) || 0,
                              wickets: editPlayer.stats?.wickets || 0,
                              matches: editPlayer.stats?.matches || 0
                            }
                          })}
                          className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
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
                              ...editPlayer.stats, 
                              runs: editPlayer.stats?.runs || 0,
                              wickets: parseInt(e.target.value) || 0,
                              matches: editPlayer.stats?.matches || 0
                            }
                          })}
                          className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
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
                              ...editPlayer.stats, 
                              runs: editPlayer.stats?.runs || 0,
                              wickets: editPlayer.stats?.wickets || 0,
                              matches: parseInt(e.target.value) || 0
                            }
                          })}
                          className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                          placeholder="0"
                        />
                      </div>
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
                  disabled={!editPlayer.name || !editPlayer.position}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Update Player
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}