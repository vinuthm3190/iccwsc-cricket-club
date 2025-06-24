import React, { useState, useMemo } from 'react';
import { Save, RotateCcw, Users, Target, Filter } from 'lucide-react';
import { Player, TeamConfig } from '../../types';

interface ExtendedPlayer extends Player {
  year: string;
  season: string;
  league: string;
  overs: string;
  category: string;
  teamName: string;
}

export default function TeamPicker() {
  // Extended players data with team assignments
  const availablePlayers: ExtendedPlayer[] = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      position: 'Batsman',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
      stats: { runs: 1250, wickets: 5, matches: 28 },
      year: '2025',
      season: 'summer',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      teamName: 'Angry Bulls'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      position: 'All-rounder',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
      stats: { runs: 890, wickets: 23, matches: 30 },
      year: '2025',
      season: 'summer',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      teamName: 'Royal Warriors'
    },
    {
      id: '3',
      name: 'Vikram Singh',
      position: 'Bowler',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      stats: { runs: 245, wickets: 45, matches: 29 },
      year: '2025',
      season: 'summer',
      league: 'NWCL',
      overs: 'T20',
      category: 'Adult',
      teamName: 'Watermelons'
    },
    {
      id: '4',
      name: 'Anita Patel',
      position: 'Wicket-keeper',
      avatar: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=400',
      stats: { runs: 678, wickets: 0, matches: 28 },
      year: '2025',
      season: 'summer',
      league: 'NWCL',
      overs: 'T20',
      category: 'Adult',
      teamName: 'Solaris'
    },
    {
      id: '5',
      name: 'Arjun Reddy',
      position: 'Batsman',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
      stats: { runs: 1456, wickets: 2, matches: 25 },
      year: '2025',
      season: 'summer',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      teamName: 'Cereal Killers'
    },
    {
      id: '6',
      name: 'Meera Gupta',
      position: 'All-rounder',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
      stats: { runs: 734, wickets: 18, matches: 27 },
      year: '2025',
      season: 'summer',
      league: 'NWCL',
      overs: 'T10',
      category: 'Youth',
      teamName: 'Watermelons'
    },
    {
      id: '7',
      name: 'Suresh Nair',
      position: 'Bowler',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
      stats: { runs: 156, wickets: 38, matches: 30 },
      year: '2025',
      season: 'summer',
      league: 'NWCL',
      overs: 'T40',
      category: 'Adult',
      teamName: 'Solaris'
    },
    {
      id: '8',
      name: 'Kavya Iyer',
      position: 'Batsman',
      avatar: 'https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=400',
      stats: { runs: 1123, wickets: 3, matches: 26 },
      year: '2024',
      season: 'summer',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      teamName: 'Angry Bulls'
    },
    {
      id: '9',
      name: 'Rohit Sharma',
      position: 'All-rounder',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400',
      stats: { runs: 567, wickets: 12, matches: 24 },
      year: '2025',
      season: 'summer',
      league: 'NWCL',
      overs: 'T10',
      category: 'Youth',
      teamName: 'Watermelons'
    },
    {
      id: '10',
      name: 'Deepika Singh',
      position: 'Bowler',
      avatar: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=400',
      stats: { runs: 89, wickets: 29, matches: 27 },
      year: '2025',
      season: 'summer',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      teamName: 'Royal Warriors'
    },
    {
      id: '11',
      name: 'Amit Patel',
      position: 'Batsman',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
      stats: { runs: 892, wickets: 1, matches: 22 },
      year: '2025',
      season: 'summer',
      league: 'NWCL',
      overs: 'T10',
      category: 'Adult',
      teamName: 'Solaris'
    },
    {
      id: '12',
      name: 'Sneha Reddy',
      position: 'All-rounder',
      avatar: 'https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=400',
      stats: { runs: 445, wickets: 15, matches: 18 },
      year: '2025',
      season: 'summer',
      league: 'NWCL',
      overs: 'T20',
      category: 'Youth',
      teamName: 'Solaris'
    },
    {
      id: '13',
      name: 'Kiran Kumar',
      position: 'Bowler',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400',
      stats: { runs: 78, wickets: 32, matches: 20 },
      year: '2025',
      season: 'summer',
      league: 'NWCL',
      overs: 'T40',
      category: 'Youth',
      teamName: 'Watermelons'
    }
  ];

  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [selectedTeamFilter, setSelectedTeamFilter] = useState('');
  const [draggedPlayer, setDraggedPlayer] = useState<Player | null>(null);

  // Get the league of the selected team to determine max players
  const getSelectedTeamLeague = () => {
    if (!selectedTeamFilter) return null;
    const teamPlayer = availablePlayers.find(player => player.teamName === selectedTeamFilter);
    return teamPlayer?.league || null;
  };

  // Get max players based on league (8 for ARCL, 11 for NWCL)
  const getMaxPlayers = () => {
    const league = getSelectedTeamLeague();
    return league === 'ARCL' ? 8 : 11;
  };

  // Get team format name based on league
  const getTeamFormatName = () => {
    const league = getSelectedTeamLeague();
    return league === 'ARCL' ? 'Cricket VIII' : 'Cricket XI';
  };

  // Get unique team names for the filter dropdown
  const getUniqueTeamNames = () => {
    const teamNames = new Set<string>();
    availablePlayers.forEach(player => {
      teamNames.add(player.teamName);
    });
    return Array.from(teamNames).sort();
  };

  // Filter available players based on selected team
  const filteredAvailablePlayers = useMemo(() => {
    let filtered = availablePlayers.filter(
      player => !selectedPlayers.find(selected => selected.id === player.id)
    );

    if (selectedTeamFilter) {
      filtered = filtered.filter(player => player.teamName === selectedTeamFilter);
    }

    return filtered;
  }, [availablePlayers, selectedPlayers, selectedTeamFilter]);

  const getPositionColor = (position: string) => {
    switch (position) {
      case 'Batsman': return 'from-red-500 to-orange-500';
      case 'All-rounder': return 'from-green-500 to-emerald-500';
      case 'Bowler': return 'from-blue-500 to-cyan-500';
      case 'Wicket-keeper': return 'from-purple-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const handleDragStart = (e: React.DragEvent, player: Player) => {
    setDraggedPlayer(player);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDropToSelected = (e: React.DragEvent) => {
    e.preventDefault();
    const maxPlayers = getMaxPlayers();
    if (draggedPlayer && selectedPlayers.length < maxPlayers && !selectedPlayers.find(p => p.id === draggedPlayer.id)) {
      setSelectedPlayers([...selectedPlayers, draggedPlayer]);
    }
    setDraggedPlayer(null);
  };

  const handleDropToAvailable = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedPlayer) {
      setSelectedPlayers(selectedPlayers.filter(p => p.id !== draggedPlayer.id));
    }
    setDraggedPlayer(null);
  };

  const removePlayer = (playerId: string) => {
    setSelectedPlayers(selectedPlayers.filter(p => p.id !== playerId));
  };

  const addPlayer = (player: Player) => {
    const maxPlayers = getMaxPlayers();
    if (selectedPlayers.length < maxPlayers && !selectedPlayers.find(p => p.id === player.id)) {
      setSelectedPlayers([...selectedPlayers, player]);
    }
  };

  const resetTeam = () => {
    setSelectedPlayers([]);
    setSelectedTeamFilter('');
  };

  const saveTeamConfig = () => {
    if (selectedPlayers.length === 0) {
      alert('Please select at least one player before saving.');
      return;
    }

    const config: TeamConfig = {
      id: Date.now().toString(),
      name: `${getTeamFormatName()} - ${new Date().toLocaleDateString()}`,
      formation: getTeamFormatName(),
      players: selectedPlayers,
      createdBy: 'current-user',
      createdAt: new Date()
    };

    // In a real app, this would save to a database
    console.log('Saving cricket team configuration:', config);
    alert(`Cricket team configuration saved successfully with ${selectedPlayers.length} players!`);
  };

  const maxPlayers = getMaxPlayers();
  const teamFormatName = getTeamFormatName();

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Cricket Team
            <span className="bg-gradient-to-r from-orange-400 to-green-400 bg-clip-text text-transparent">
              {' '}Selection
            </span>
          </h1>
          <p className="text-white/70 text-lg">
            Build your perfect cricket team with drag & drop player selection
          </p>
          {selectedTeamFilter && (
            <div className="mt-4 inline-block bg-gradient-to-r from-orange-500/20 to-green-500/20 backdrop-blur-lg rounded-2xl px-6 py-3 border border-white/30">
              <p className="text-white font-semibold">
                {selectedTeamFilter} - {getSelectedTeamLeague()} League ({maxPlayers} players max)
              </p>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">Filter by Team</label>
              <select
                value={selectedTeamFilter}
                onChange={(e) => setSelectedTeamFilter(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="" className="bg-gray-900">All Teams</option>
                {getUniqueTeamNames().map(teamName => (
                  <option key={teamName} value={teamName} className="bg-gray-900">
                    {teamName}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end space-x-2">
              <button
                onClick={resetTeam}
                className="flex-1 bg-white/10 text-white px-4 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors flex items-center justify-center space-x-2"
              >
                <RotateCcw size={16} />
                <span>Reset</span>
              </button>
              <button
                onClick={saveTeamConfig}
                disabled={selectedPlayers.length === 0}
                className="flex-1 bg-gradient-to-r from-orange-500 to-green-600 text-white px-4 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              >
                <Save size={16} />
                <span>Save Team</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Available Players */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
                <Users size={24} />
                <span>Available Cricketers</span>
                <span className="text-sm font-normal text-white/70">({filteredAvailablePlayers.length})</span>
              </h2>
              
              {selectedTeamFilter && (
                <div className="mb-4 p-3 bg-orange-500/20 border border-orange-500/30 rounded-xl">
                  <div className="flex items-center space-x-2 text-orange-300">
                    <Filter size={16} />
                    <span className="text-sm font-semibold">
                      Showing players from: {selectedTeamFilter}
                    </span>
                  </div>
                  <div className="text-xs text-orange-200 mt-1">
                    {getSelectedTeamLeague()} League - Max {maxPlayers} players
                  </div>
                </div>
              )}
              
              <div
                className="space-y-3 max-h-[600px] overflow-y-auto"
                onDragOver={handleDragOver}
                onDrop={handleDropToAvailable}
              >
                {filteredAvailablePlayers.map(player => (
                  <div
                    key={player.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, player)}
                    className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-white/30 transition-all cursor-move hover:bg-white/10"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={player.avatar}
                        alt={player.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-white font-semibold">{player.name}</h3>
                        <div className={`inline-block bg-gradient-to-r ${getPositionColor(player.position)} px-2 py-1 rounded text-xs font-semibold text-white mb-1`}>
                          {player.position}
                        </div>
                        <div className="text-xs text-orange-300 font-medium">
                          {player.teamName}
                        </div>
                        <div className="text-xs text-white/60">
                          {player.league} • {player.overs} • {player.category}
                        </div>
                      </div>
                      <button
                        onClick={() => addPlayer(player)}
                        disabled={selectedPlayers.length >= maxPlayers}
                        className="p-2 bg-orange-500/20 text-orange-300 rounded-lg hover:bg-orange-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Target size={16} />
                      </button>
                    </div>
                    {player.stats && (
                      <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-white/70">
                        <div className="text-center">
                          <div className="font-semibold text-white">{player.stats.runs}</div>
                          <div>Runs</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-white">{player.stats.wickets}</div>
                          <div>Wickets</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-white">{player.stats.matches}</div>
                          <div>Matches</div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                
                {filteredAvailablePlayers.length === 0 && (
                  <div className="text-center py-8 text-white/50">
                    <Users size={32} className="mx-auto mb-2" />
                    <p>
                      {selectedTeamFilter 
                        ? `No available players from ${selectedTeamFilter}` 
                        : 'No available players'
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Selected Team */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
                <Target size={24} />
                <span>Selected {teamFormatName}</span>
                <span className="text-sm font-normal text-white/70">({selectedPlayers.length}/{maxPlayers})</span>
              </h2>
              
              {/* Team Limit Warning */}
              {selectedPlayers.length >= maxPlayers && (
                <div className="mb-4 p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-xl">
                  <div className="flex items-center space-x-2 text-yellow-300">
                    <Users size={16} />
                    <span className="text-sm font-semibold">
                      Team is full! ({maxPlayers}/{maxPlayers} players)
                    </span>
                  </div>
                </div>
              )}
              
              {/* Cricket Field */}
              <div
                className="bg-gradient-to-b from-green-500/20 to-green-600/20 rounded-2xl p-8 mb-6 min-h-[400px] border border-green-500/30 relative"
                style={{
                  backgroundImage: `radial-gradient(circle at center, rgba(255,255,255,0.1) 2px, transparent 2px)`,
                  backgroundSize: '30px 30px'
                }}
                onDragOver={handleDragOver}
                onDrop={handleDropToSelected}
              >
                {/* Cricket pitch in center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-40 h-8 bg-brown-500/30 border-2 border-white/30 rounded-lg flex items-center justify-center">
                    <div className="text-white/50 text-xs">Cricket Pitch</div>
                  </div>
                </div>
                
                {selectedPlayers.length === 0 ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white/50">
                      <Users size={48} className="mx-auto mb-4" />
                      <p className="text-lg">Drag cricketers here to build your {teamFormatName}</p>
                      <p className="text-sm">Or click the target icon on available players</p>
                      {selectedTeamFilter && (
                        <p className="text-sm mt-2 text-orange-300">
                          {getSelectedTeamLeague()} teams need {maxPlayers} players
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className={`grid gap-4 h-full ${maxPlayers === 8 ? 'grid-cols-4' : 'grid-cols-4'}`}>
                    {Array.from({ length: maxPlayers }).map((_, index) => {
                      const player = selectedPlayers[index];
                      return (
                        <div
                          key={index}
                          className="flex flex-col items-center justify-center"
                        >
                          {player ? (
                            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30 text-center min-w-[100px]">
                              <img
                                src={player.avatar}
                                alt={player.name}
                                className="w-12 h-12 rounded-lg object-cover mx-auto mb-2"
                              />
                              <div className="text-white text-xs font-semibold mb-1">
                                {player.name.split(' ')[0]}
                              </div>
                              <div className={`bg-gradient-to-r ${getPositionColor(player.position)} px-2 py-1 rounded text-xs font-semibold text-white`}>
                                {player.position === 'Wicket-keeper' ? 'WK' : 
                                 player.position === 'All-rounder' ? 'AR' :
                                 player.position.substring(0, 3).toUpperCase()}
                              </div>
                              <button
                                onClick={() => removePlayer(player.id)}
                                className="mt-2 text-red-400 hover:text-red-300 text-xs"
                              >
                                Remove
                              </button>
                            </div>
                          ) : (
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border-2 border-dashed border-white/30 text-center min-w-[100px] min-h-[120px] flex items-center justify-center">
                              <div className="text-white/50 text-xs">
                                Player {index + 1}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Selected Players List */}
              {selectedPlayers.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Cricket Team Roster</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedPlayers.map((player, index) => (
                      <div
                        key={player.id}
                        className="bg-white/5 rounded-lg p-3 border border-white/10 flex items-center space-x-3"
                      >
                        <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {index + 1}
                        </div>
                        <img
                          src={player.avatar}
                          alt={player.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="text-white font-semibold text-sm">{player.name}</div>
                          <div className="text-white/70 text-xs">{player.position}</div>
                        </div>
                        <button
                          onClick={() => removePlayer(player.id)}
                          className="text-red-400 hover:text-red-300 text-xs px-2 py-1 rounded"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}