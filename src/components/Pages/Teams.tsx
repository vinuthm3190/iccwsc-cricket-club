import React, { useState, useMemo } from 'react';
import { Trophy, Target, Users, Filter, Calendar, Clock, Plus, Edit3, Trash2, Award, TrendingUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface TeamFilters {
  year: string;
  season: string;
  league: string;
  overs: string;
  category: string;
}

interface Team {
  id: string;
  name: string;
  year: string;
  season: string;
  league: string;
  overs: string;
  category: string;
  stats: {
    matchesPlayed: number;
    wins: number;
    losses: number;
    draws: number;
    points: number;
    runRate: number;
  };
  players: number;
}

interface NewTeamData {
  name: string;
  year: string;
  season: string;
  league: string;
  overs: string;
  category: string;
}

export default function Teams() {
  const { hasPermission } = useAuth();
  const canManageTeams = hasPermission(['captain', 'vice']);

  const [filters, setFilters] = useState<TeamFilters>({
    year: '2025',
    season: 'summer',
    league: 'ARCL',
    overs: '16 overs',
    category: 'Adult'
  });

  const [showAddTeamModal, setShowAddTeamModal] = useState(false);
  const [showEditTeamModal, setShowEditTeamModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [newTeam, setNewTeam] = useState<NewTeamData>({
    name: '',
    year: '2025',
    season: 'summer',
    league: 'ARCL',
    overs: '16 overs',
    category: 'Adult'
  });
  const [editTeam, setEditTeam] = useState<Partial<Team>>({});

  // Sample teams data with NWCL teams for all formats and categories
  const [teams, setTeams] = useState<Team[]>([
    // ARCL Teams
    {
      id: '1',
      name: 'Angry Bulls',
      year: '2025',
      season: 'summer',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      stats: { matchesPlayed: 12, wins: 8, losses: 3, draws: 1, points: 17, runRate: 1.25 },
      players: 15
    },
    {
      id: '2',
      name: 'Royal Warriors',
      year: '2025',
      season: 'summer',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      stats: { matchesPlayed: 12, wins: 7, losses: 4, draws: 1, points: 15, runRate: 0.98 },
      players: 14
    },
    {
      id: '3',
      name: 'Cereal Killers',
      year: '2025',
      season: 'summer',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      stats: { matchesPlayed: 12, wins: 6, losses: 5, draws: 1, points: 13, runRate: 0.76 },
      players: 16
    },

    // NWCL Teams - Watermelons (All formats, both categories)
    {
      id: '4',
      name: 'Watermelons',
      year: '2025',
      season: 'summer',
      league: 'NWCL',
      overs: 'T10',
      category: 'Adult',
      stats: { matchesPlayed: 8, wins: 6, losses: 2, draws: 0, points: 12, runRate: 1.67 },
      players: 11
    },
    {
      id: '5',
      name: 'Watermelons',
      year: '2025',
      season: 'summer',
      league: 'NWCL',
      overs: 'T10',
      category: 'Youth',
      stats: { matchesPlayed: 8, wins: 5, losses: 3, draws: 0, points: 10, runRate: 1.45 },
      players: 12
    },
    {
      id: '6',
      name: 'Watermelons',
      year: '2025',
      season: 'summer',
      league: 'NWCL',
      overs: 'T20',
      category: 'Adult',
      stats: { matchesPlayed: 10, wins: 7, losses: 3, draws: 0, points: 14, runRate: 1.45 },
      players: 13
    },
    {
      id: '7',
      name: 'Watermelons',
      year: '2025',
      season: 'summer',
      league: 'NWCL',
      overs: 'T20',
      category: 'Youth',
      stats: { matchesPlayed: 10, wins: 6, losses: 4, draws: 0, points: 12, runRate: 1.23 },
      players: 14
    },
    {
      id: '8',
      name: 'Watermelons',
      year: '2025',
      season: 'summer',
      league: 'NWCL',
      overs: 'T40',
      category: 'Adult',
      stats: { matchesPlayed: 6, wins: 4, losses: 2, draws: 0, points: 8, runRate: 1.12 },
      players: 15
    },
    {
      id: '9',
      name: 'Watermelons',
      year: '2025',
      season: 'summer',
      league: 'NWCL',
      overs: 'T40',
      category: 'Youth',
      stats: { matchesPlayed: 6, wins: 3, losses: 3, draws: 0, points: 6, runRate: 0.98 },
      players: 13
    },

    // NWCL Teams - Solaris (All formats, both categories)
    {
      id: '10',
      name: 'Solaris',
      year: '2025',
      season: 'summer',
      league: 'NWCL',
      overs: 'T10',
      category: 'Adult',
      stats: { matchesPlayed: 8, wins: 5, losses: 3, draws: 0, points: 10, runRate: 1.34 },
      players: 12
    },
    {
      id: '11',
      name: 'Solaris',
      year: '2025',
      season: 'summer',
      league: 'NWCL',
      overs: 'T10',
      category: 'Youth',
      stats: { matchesPlayed: 8, wins: 4, losses: 4, draws: 0, points: 8, runRate: 1.12 },
      players: 11
    },
    {
      id: '12',
      name: 'Solaris',
      year: '2025',
      season: 'summer',
      league: 'NWCL',
      overs: 'T20',
      category: 'Adult',
      stats: { matchesPlayed: 10, wins: 5, losses: 5, draws: 0, points: 10, runRate: 0.89 },
      players: 12
    },
    {
      id: '13',
      name: 'Solaris',
      year: '2025',
      season: 'summer',
      league: 'NWCL',
      overs: 'T20',
      category: 'Youth',
      stats: { matchesPlayed: 10, wins: 7, losses: 3, draws: 0, points: 14, runRate: 1.56 },
      players: 13
    },
    {
      id: '14',
      name: 'Solaris',
      year: '2025',
      season: 'summer',
      league: 'NWCL',
      overs: 'T40',
      category: 'Adult',
      stats: { matchesPlayed: 6, wins: 4, losses: 2, draws: 0, points: 8, runRate: 1.12 },
      players: 15
    },
    {
      id: '15',
      name: 'Solaris',
      year: '2025',
      season: 'summer',
      league: 'NWCL',
      overs: 'T40',
      category: 'Youth',
      stats: { matchesPlayed: 6, wins: 2, losses: 4, draws: 0, points: 4, runRate: 0.87 },
      players: 14
    }
  ]);

  // Get available overs based on selected league
  const getAvailableOvers = (league: string) => {
    if (league === 'ARCL') {
      return ['16 overs'];
    } else if (league === 'NWCL') {
      return ['T10', 'T20', 'T40'];
    }
    return [];
  };

  // Filter teams based on current filters
  const filteredTeams = useMemo(() => {
    return teams.filter(team => 
      team.year === filters.year &&
      team.season === filters.season &&
      team.league === filters.league &&
      team.overs === filters.overs &&
      team.category === filters.category
    );
  }, [filters, teams]);

  // Handle filter changes
  const handleFilterChange = (key: keyof TeamFilters, value: string) => {
    setFilters(prev => {
      const newFilters = { ...prev, [key]: value };
      
      // Reset overs when league changes
      if (key === 'league') {
        const availableOvers = getAvailableOvers(value);
        newFilters.overs = availableOvers[0] || '';
      }
      
      return newFilters;
    });
  };

  // Handle new team filter changes
  const handleNewTeamFilterChange = (key: keyof NewTeamData, value: string) => {
    setNewTeam(prev => {
      const updated = { ...prev, [key]: value };
      
      // Reset overs when league changes in new team form
      if (key === 'league') {
        const availableOvers = getAvailableOvers(value);
        updated.overs = availableOvers[0] || '';
      }
      
      return updated;
    });
  };

  const handleAddTeam = () => {
    if (!newTeam.name.trim()) {
      alert('Please enter a team name.');
      return;
    }

    const team: Team = {
      id: Date.now().toString(),
      name: newTeam.name,
      year: newTeam.year,
      season: newTeam.season,
      league: newTeam.league,
      overs: newTeam.overs,
      category: newTeam.category,
      stats: { matchesPlayed: 0, wins: 0, losses: 0, draws: 0, points: 0, runRate: 0 },
      players: 0
    };

    // Actually add the team to the state
    setTeams(prev => [...prev, team]);
    
    setShowAddTeamModal(false);
    setNewTeam({
      name: '',
      year: '2025',
      season: 'summer',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult'
    });

    alert(`Team "${team.name}" added successfully to ${team.league} ${team.overs} ${team.category} league for ${team.year} ${team.season}!`);
  };

  const handleEditTeam = (team: Team) => {
    if (!canManageTeams) return;
    setSelectedTeam(team);
    setEditTeam({
      name: team.name,
      year: team.year,
      season: team.season,
      league: team.league,
      overs: team.overs,
      category: team.category,
      stats: team.stats,
      players: team.players
    });
    setShowEditTeamModal(true);
  };

  const handleUpdateTeam = () => {
    if (!selectedTeam || !editTeam.name) {
      alert('Please fill in all required fields.');
      return;
    }

    // Update the team in the state
    setTeams(prev => prev.map(team => 
      team.id === selectedTeam.id 
        ? { ...team, ...editTeam } as Team
        : team
    ));

    setShowEditTeamModal(false);
    setSelectedTeam(null);
    setEditTeam({});

    alert(`Team "${editTeam.name}" updated successfully!`);
  };

  const handleDeleteTeam = (teamId: string, teamName: string) => {
    if (!canManageTeams) return;
    if (confirm(`Are you sure you want to delete team "${teamName}"? This action cannot be undone.`)) {
      // Actually remove the team from the state
      setTeams(prev => prev.filter(team => team.id !== teamId));
      alert(`Team "${teamName}" deleted successfully!`);
    }
  };

  const getLeagueColor = (league: string) => {
    return league === 'ARCL' ? 'from-blue-500 to-cyan-500' : 'from-green-500 to-emerald-500';
  };

  const getWinPercentage = (wins: number, matches: number) => {
    return matches > 0 ? Math.round((wins / matches) * 100) : 0;
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Cricket
            <span className="bg-gradient-to-r from-orange-400 to-green-400 bg-clip-text text-transparent">
              {' '}Teams
            </span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Explore our cricket teams competing across different leagues and formats. 
            From ARCL's 16-over matches to NWCL's various formats, track team performance and statistics.
          </p>
        </div>

        {/* League Filters */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Filter className="text-orange-400" size={24} />
              <h2 className="text-2xl font-bold text-white">Filter Teams by League</h2>
            </div>
            
            {canManageTeams && (
              <button
                onClick={() => setShowAddTeamModal(true)}
                className="bg-gradient-to-r from-orange-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-green-700 transition-all transform hover:scale-105 flex items-center space-x-2"
              >
                <Plus size={20} />
                <span>Add New Team</span>
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Year */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">Year</label>
              <select
                value={filters.year}
                onChange={(e) => handleFilterChange('year', e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="2025" className="bg-gray-900">2025</option>
                <option value="2024" className="bg-gray-900">2024</option>
                <option value="2023" className="bg-gray-900">2023</option>
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
                <option value="summer" className="bg-gray-900">Summer</option>
                <option value="spring" className="bg-gray-900">Spring</option>
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
                <option value="ARCL" className="bg-gray-900">ARCL</option>
                <option value="NWCL" className="bg-gray-900">NWCL</option>
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
                {getAvailableOvers(filters.league).map(format => (
                  <option key={format} value={format} className="bg-gray-900">{format}</option>
                ))}
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
                <option value="Adult" className="bg-gray-900">Adult</option>
                <option value="Youth" className="bg-gray-900">Youth</option>
              </select>
            </div>
          </div>
        </div>

        {/* Permission Notice for Non-Leadership */}
        {!canManageTeams && (
          <div className="bg-blue-500/20 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/30 mb-8">
            <div className="flex items-center space-x-3 text-blue-300">
              <Users size={20} />
              <span className="font-semibold">Team Management</span>
            </div>
            <p className="text-blue-200 mt-2">
              Only team captains and vice captains can add, edit, or delete teams.
            </p>
          </div>
        )}

        {/* League Summary */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white flex items-center space-x-2">
              <Trophy size={24} />
              <span>{filters.league} {filters.overs} - {filters.category} League</span>
            </h3>
            <div className="text-white/70 text-sm">
              {filters.year} {filters.season.charAt(0).toUpperCase() + filters.season.slice(1)} Season
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{filteredTeams.length}</div>
              <div className="text-white/70">Teams</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400">
                {filteredTeams.reduce((total, team) => total + team.stats.matchesPlayed, 0)}
              </div>
              <div className="text-white/70">Total Matches</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">
                {filteredTeams.reduce((total, team) => total + team.players, 0)}
              </div>
              <div className="text-white/70">Total Players</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">
                {filteredTeams.length > 0 ? Math.round(filteredTeams.reduce((total, team) => total + team.stats.runRate, 0) / filteredTeams.length * 100) / 100 : 0}
              </div>
              <div className="text-white/70">Avg Run Rate</div>
            </div>
          </div>
        </div>

        {/* Teams Grid */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            {filteredTeams.length > 0 ? `${filters.league} ${filters.overs} Teams` : 'No Teams Found'}
          </h2>
          
          {filteredTeams.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 text-center">
              <Trophy className="mx-auto mb-4 text-white/50" size={48} />
              <h3 className="text-xl font-bold text-white mb-2">No Teams Found</h3>
              <p className="text-white/70 mb-6">
                No teams found for the selected criteria. Try adjusting your filters or add a new team.
              </p>
              {canManageTeams && (
                <button
                  onClick={() => setShowAddTeamModal(true)}
                  className="bg-gradient-to-r from-orange-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-green-700 transition-all"
                >
                  Add First Team
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTeams
                .sort((a, b) => b.stats.points - a.stats.points)
                .map((team, index) => (
                <div
                  key={team.id}
                  className="group bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 hover:transform hover:scale-105 relative"
                >
                  {/* Ranking Badge */}
                  <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-r from-orange-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    #{index + 1}
                  </div>

                  {/* Management Actions - Only visible to captain/vice */}
                  {canManageTeams && (
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                      <button
                        onClick={() => handleEditTeam(team)}
                        className="p-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteTeam(team.id, team.name)}
                        className="p-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  )}

                  {/* Team Header */}
                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${getLeagueColor(team.league)} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <Trophy className="text-white" size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{team.name}</h3>
                    <div className="flex items-center justify-center space-x-2 text-white/70 text-sm">
                      <span>{team.league}</span>
                      <span>•</span>
                      <span>{team.overs}</span>
                      <span>•</span>
                      <span>{team.category}</span>
                    </div>
                  </div>

                  {/* Team Stats */}
                  <div className="space-y-4">
                    {/* Win/Loss Record */}
                    <div className="bg-white/5 rounded-2xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white/80 text-sm">Record</span>
                        <span className="text-white font-semibold">
                          {team.stats.wins}-{team.stats.losses}-{team.stats.draws}
                        </span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                          style={{ width: `${getWinPercentage(team.stats.wins, team.stats.matchesPlayed)}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-white/60 mt-1">
                        {getWinPercentage(team.stats.wins, team.stats.matchesPlayed)}% Win Rate
                      </div>
                    </div>

                    {/* Key Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{team.stats.points}</div>
                        <div className="text-xs text-white/70">Points</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{team.stats.runRate}</div>
                        <div className="text-xs text-white/70">Run Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{team.stats.matchesPlayed}</div>
                        <div className="text-xs text-white/70">Matches</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{team.players}</div>
                        <div className="text-xs text-white/70">Players</div>
                      </div>
                    </div>

                    {/* Performance Indicator */}
                    <div className="flex items-center justify-center space-x-2 text-sm">
                      <TrendingUp 
                        size={16} 
                        className={team.stats.runRate > 1 ? 'text-green-400' : 'text-red-400'} 
                      />
                      <span className={team.stats.runRate > 1 ? 'text-green-400' : 'text-red-400'}>
                        {team.stats.runRate > 1 ? 'Strong Performance' : 'Needs Improvement'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Add Team Modal - Only visible to captain/vice */}
        {showAddTeamModal && canManageTeams && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md border border-white/30">
              <h3 className="text-2xl font-bold text-white mb-6">Add New Cricket Team</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">Team Name *</label>
                  <input
                    type="text"
                    value={newTeam.name}
                    onChange={(e) => handleNewTeamFilterChange('name', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="Enter team name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Year</label>
                    <select
                      value={newTeam.year}
                      onChange={(e) => handleNewTeamFilterChange('year', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                    >
                      <option value="2025" className="bg-gray-900">2025</option>
                      <option value="2024" className="bg-gray-900">2024</option>
                      <option value="2023" className="bg-gray-900">2023</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Season</label>
                    <select
                      value={newTeam.season}
                      onChange={(e) => handleNewTeamFilterChange('season', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                    >
                      <option value="summer" className="bg-gray-900">Summer</option>
                      <option value="spring" className="bg-gray-900">Spring</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">League</label>
                  <select
                    value={newTeam.league}
                    onChange={(e) => handleNewTeamFilterChange('league', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                  >
                    <option value="ARCL" className="bg-gray-900">ARCL</option>
                    <option value="NWCL" className="bg-gray-900">NWCL</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Format</label>
                    <select
                      value={newTeam.overs}
                      onChange={(e) => handleNewTeamFilterChange('overs', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                    >
                      {getAvailableOvers(newTeam.league).map(format => (
                        <option key={format} value={format} className="bg-gray-900">{format}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Category</label>
                    <select
                      value={newTeam.category}
                      onChange={(e) => handleNewTeamFilterChange('category', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                    >
                      <option value="Adult" className="bg-gray-900">Adult</option>
                      <option value="Youth" className="bg-gray-900">Youth</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => setShowAddTeamModal(false)}
                  className="flex-1 bg-white/10 text-white py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddTeam}
                  disabled={!newTeam.name.trim()}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Team
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Team Modal */}
        {showEditTeamModal && selectedTeam && canManageTeams && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md border border-white/30">
              <h3 className="text-2xl font-bold text-white mb-6">Edit Team: {selectedTeam.name}</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">Team Name *</label>
                  <input
                    type="text"
                    value={editTeam.name || ''}
                    onChange={(e) => setEditTeam({ ...editTeam, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="Enter team name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">Players Count</label>
                  <input
                    type="number"
                    value={editTeam.players || ''}
                    onChange={(e) => setEditTeam({ ...editTeam, players: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="Number of players"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Wins</label>
                    <input
                      type="number"
                      value={editTeam.stats?.wins || ''}
                      onChange={(e) => setEditTeam({ 
                        ...editTeam, 
                        stats: { 
                          ...editTeam.stats!, 
                          wins: parseInt(e.target.value) || 0 
                        }
                      })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Losses</label>
                    <input
                      type="number"
                      value={editTeam.stats?.losses || ''}
                      onChange={(e) => setEditTeam({ 
                        ...editTeam, 
                        stats: { 
                          ...editTeam.stats!, 
                          losses: parseInt(e.target.value) || 0 
                        }
                      })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => {
                    setShowEditTeamModal(false);
                    setSelectedTeam(null);
                    setEditTeam({});
                  }}
                  className="flex-1 bg-white/10 text-white py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateTeam}
                  disabled={!editTeam.name}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Update Team
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}