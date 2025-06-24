import React, { useState } from 'react';
import { Shield, Users, UserPlus, Edit3, Trash2, Save, X, CheckCircle, AlertTriangle, Crown, Star, User, Trophy, Search, Filter } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface UserAccount {
  id: string;
  username: string;
  name: string;
  email: string;
  role: 'member' | 'vice' | 'captain';
  status: 'active' | 'inactive';
  teamName?: string;
  createdAt: Date;
  lastLogin?: Date;
}

interface ExistingPlayer {
  id: string;
  name: string;
  teamName: string;
  league: string;
  overs: string;
  category: string;
  year: string;
  season: string;
  position: string;
  email?: string;
  phone?: string;
}

interface PlayerFilters {
  search: string;
  teamName: string;
  league: string;
  category: string;
}

export default function Admin() {
  const { user } = useAuth();

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

  // Existing players from the cricket database
  const existingPlayers: ExistingPlayer[] = [
    // Cereal Killers players
    {
      id: '1',
      name: 'Naim Mohammad',
      teamName: 'Cereal Killers',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      year: '2025',
      season: 'spring',
      position: 'Batsman',
      email: 'naim.mohammad@email.com',
      phone: '+1-206-555-0101'
    },
    {
      id: '2',
      name: 'Dhruva Kumar',
      teamName: 'Cereal Killers',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      year: '2025',
      season: 'spring',
      position: 'Batsman',
      email: 'dhruva.kumar@email.com',
      phone: '+1-206-555-0102'
    },
    {
      id: '3',
      name: 'Darshan Masti Prakash',
      teamName: 'Cereal Killers',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      year: '2025',
      season: 'spring',
      position: 'All-rounder',
      email: 'darshan.prakash@email.com',
      phone: '+1-206-555-0103'
    },
    {
      id: '4',
      name: 'Vinuth Muniraju',
      teamName: 'Cereal Killers',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      year: '2025',
      season: 'spring',
      position: 'Bowler',
      email: 'vinuth.muniraju@email.com',
      phone: '+1-206-555-0104'
    },
    {
      id: '5',
      name: 'Uday C',
      teamName: 'Cereal Killers',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      year: '2025',
      season: 'spring',
      position: 'Batsman',
      email: 'uday.c@email.com',
      phone: '+1-206-555-0105'
    },
    {
      id: '6',
      name: 'Vidhyadhar Ghorpade',
      teamName: 'Cereal Killers',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      year: '2025',
      season: 'spring',
      position: 'All-rounder',
      email: 'vidhyadhar.ghorpade@email.com',
      phone: '+1-206-555-0106'
    },
    {
      id: '7',
      name: 'Vijeth Shetty',
      teamName: 'Cereal Killers',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      year: '2025',
      season: 'spring',
      position: 'Bowler',
      email: 'vijeth.shetty@email.com',
      phone: '+1-206-555-0107'
    },
    {
      id: '8',
      name: 'Kiran S',
      teamName: 'Cereal Killers',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      year: '2025',
      season: 'spring',
      position: 'Batsman',
      email: 'kiran.s@email.com',
      phone: '+1-206-555-0108'
    },
    {
      id: '9',
      name: 'Manjunatha Shetty Kondalli',
      teamName: 'Cereal Killers',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      year: '2025',
      season: 'spring',
      position: 'Wicket-keeper',
      email: 'manjunatha.kondalli@email.com',
      phone: '+1-206-555-0109'
    },
    {
      id: '10',
      name: 'Raj Mani N',
      teamName: 'Cereal Killers',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      year: '2025',
      season: 'spring',
      position: 'All-rounder',
      email: 'raj.mani@email.com',
      phone: '+1-206-555-0110'
    },
    {
      id: '11',
      name: 'Arun Thippur Jayakeerthy',
      teamName: 'Cereal Killers',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      year: '2025',
      season: 'spring',
      position: 'Bowler',
      email: 'arun.jayakeerthy@email.com',
      phone: '+1-206-555-0111'
    },
    {
      id: '12',
      name: 'Avinash Talanki',
      teamName: 'Cereal Killers',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      year: '2025',
      season: 'spring',
      position: 'Batsman',
      email: 'avinash.talanki@email.com',
      phone: '+1-206-555-0112'
    },
    {
      id: '13',
      name: 'Dhanush Shetty CK',
      teamName: 'Cereal Killers',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      year: '2025',
      season: 'spring',
      position: 'All-rounder',
      email: 'dhanush.shetty@email.com',
      phone: '+1-206-555-0113'
    },
    {
      id: '14',
      name: 'Siva Krapa',
      teamName: 'Cereal Killers',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      year: '2025',
      season: 'spring',
      position: 'Bowler',
      email: 'siva.krapa@email.com',
      phone: '+1-206-555-0114'
    },
    // Additional players from other teams
    {
      id: '15',
      name: 'Rajesh Kumar',
      teamName: 'Angry Bulls',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      year: '2025',
      season: 'summer',
      position: 'Batsman',
      email: 'rajesh.kumar@email.com',
      phone: '+1-206-555-0115'
    },
    {
      id: '16',
      name: 'Priya Sharma',
      teamName: 'Royal Warriors',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      year: '2025',
      season: 'summer',
      position: 'All-rounder',
      email: 'priya.sharma@email.com',
      phone: '+1-206-555-0116'
    },
    {
      id: '17',
      name: 'Vikram Singh',
      teamName: 'Watermelons',
      league: 'NWCL',
      overs: 'T20',
      category: 'Adult',
      year: '2025',
      season: 'summer',
      position: 'Bowler',
      email: 'vikram.singh@email.com',
      phone: '+1-206-555-0117'
    },
    {
      id: '18',
      name: 'Anita Patel',
      teamName: 'Solaris',
      league: 'NWCL',
      overs: 'T20',
      category: 'Adult',
      year: '2025',
      season: 'summer',
      position: 'Wicket-keeper',
      email: 'anita.patel@email.com',
      phone: '+1-206-555-0118'
    },
    {
      id: '19',
      name: 'Arjun Reddy',
      teamName: 'Angry Bulls',
      league: 'ARCL',
      overs: '16 overs',
      category: 'Adult',
      year: '2025',
      season: 'summer',
      position: 'Batsman',
      email: 'arjun.reddy@email.com',
      phone: '+1-206-555-0119'
    },
    {
      id: '20',
      name: 'Meera Gupta',
      teamName: 'Watermelons',
      league: 'NWCL',
      overs: 'T10',
      category: 'Youth',
      year: '2025',
      season: 'summer',
      position: 'All-rounder',
      email: 'meera.gupta@email.com',
      phone: '+1-206-555-0120'
    }
  ];

  // Sample user accounts data with team assignments
  const [userAccounts, setUserAccounts] = useState<UserAccount[]>([
    {
      id: '1',
      username: 'naim.mohammad',
      name: 'Naim Mohammad',
      email: 'naim.mohammad@email.com',
      role: 'captain',
      status: 'active',
      teamName: 'Cereal Killers',
      createdAt: new Date('2024-01-15'),
      lastLogin: new Date('2024-12-20')
    },
    {
      id: '2',
      username: 'priya.sharma',
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      role: 'vice',
      status: 'active',
      teamName: 'Royal Warriors',
      createdAt: new Date('2024-02-10'),
      lastLogin: new Date('2024-12-19')
    },
    {
      id: '3',
      username: 'vikram.singh',
      name: 'Vikram Singh',
      email: 'vikram.singh@email.com',
      role: 'member',
      status: 'active',
      teamName: 'Watermelons',
      createdAt: new Date('2024-03-05'),
      lastLogin: new Date('2024-12-18')
    }
  ]);

  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserAccount | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<ExistingPlayer | null>(null);
  const [editUser, setEditUser] = useState<Partial<UserAccount>>({});
  const [filterRole, setFilterRole] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('');

  // Player filters for the selection modal
  const [playerFilters, setPlayerFilters] = useState<PlayerFilters>({
    search: '',
    teamName: '',
    league: '',
    category: ''
  });

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'captain': return Crown;
      case 'vice': return Star;
      case 'member': return User;
      default: return User;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'captain': return 'from-yellow-500 to-orange-500';
      case 'vice': return 'from-blue-500 to-cyan-500';
      case 'member': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'text-green-400' : 'text-red-400';
  };

  const getTeamInfo = (teamName?: string) => {
    if (!teamName) return null;
    return availableTeams.find(team => team.name === teamName);
  };

  // Filter existing players based on search and filters
  const filteredPlayers = existingPlayers.filter(player => {
    const matchesSearch = !playerFilters.search || 
      player.name.toLowerCase().includes(playerFilters.search.toLowerCase()) ||
      player.teamName.toLowerCase().includes(playerFilters.search.toLowerCase());
    
    const matchesTeam = !playerFilters.teamName || player.teamName === playerFilters.teamName;
    const matchesLeague = !playerFilters.league || player.league === playerFilters.league;
    const matchesCategory = !playerFilters.category || player.category === playerFilters.category;

    return matchesSearch && matchesTeam && matchesLeague && matchesCategory;
  });

  // Get unique values for filter dropdowns
  const getUniqueTeamNames = () => {
    return [...new Set(existingPlayers.map(player => player.teamName))].sort();
  };

  const getUniqueLeagues = () => {
    return [...new Set(existingPlayers.map(player => player.league))].sort();
  };

  const getUniqueCategories = () => {
    return [...new Set(existingPlayers.map(player => player.category))].sort();
  };

  const filteredUsers = userAccounts.filter(user => {
    const matchesRole = !filterRole || user.role === filterRole;
    const matchesStatus = !filterStatus || user.status === filterStatus;
    return matchesRole && matchesStatus;
  });

  const handlePlayerSelect = (player: ExistingPlayer) => {
    setSelectedPlayer(player);
  };

  const handleCreateUserFromPlayer = (role: 'member' | 'vice' | 'captain') => {
    if (!selectedPlayer) {
      alert('Please select a player first.');
      return;
    }

    // Check if user already exists
    if (userAccounts.some(user => user.name === selectedPlayer.name)) {
      alert('A user account already exists for this player.');
      return;
    }

    // Generate username from name
    const username = selectedPlayer.name.toLowerCase().replace(/\s+/g, '.');

    // Check if username already exists
    if (userAccounts.some(user => user.username === username)) {
      alert('Username already exists. Please create manually with a different username.');
      return;
    }

    const userAccount: UserAccount = {
      id: Date.now().toString(),
      username: username,
      name: selectedPlayer.name,
      email: selectedPlayer.email || `${username}@email.com`,
      role: role,
      status: 'active',
      teamName: selectedPlayer.teamName,
      createdAt: new Date()
    };

    // Actually add the user to the state
    setUserAccounts(prev => [...prev, userAccount]);
    
    setShowAddUserModal(false);
    setSelectedPlayer(null);
    setPlayerFilters({
      search: '',
      teamName: '',
      league: '',
      category: ''
    });

    alert(`User account created for "${userAccount.name}" with ${role} permissions and assigned to team "${userAccount.teamName}"!`);
  };

  const handleEditUser = (user: UserAccount) => {
    setSelectedUser(user);
    setEditUser({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      teamName: user.teamName
    });
    setShowEditUserModal(true);
  };

  const handleUpdateUser = () => {
    if (!selectedUser || !editUser.name || !editUser.email) {
      alert('Please fill in all required fields.');
      return;
    }

    // Validate team assignment for captains and vice captains
    if ((editUser.role === 'captain' || editUser.role === 'vice') && !editUser.teamName) {
      alert(`Please assign a team for the ${editUser.role === 'vice' ? 'vice captain' : 'captain'}.`);
      return;
    }

    // Actually update the user in the state
    setUserAccounts(prev => prev.map(user => 
      user.id === selectedUser.id 
        ? { ...user, ...editUser }
        : user
    ));

    setShowEditUserModal(false);
    setSelectedUser(null);
    setEditUser({});

    alert(`User "${editUser.name}" updated successfully!`);
  };

  const handleDeleteUser = (userId: string, userName: string) => {
    if (userId === user?.username) {
      alert('You cannot delete your own account.');
      return;
    }

    if (confirm(`Are you sure you want to delete user "${userName}"? This action cannot be undone.`)) {
      // Actually remove the user from the state
      setUserAccounts(prev => prev.filter(user => user.id !== userId));
      alert(`User "${userName}" deleted successfully.`);
    }
  };

  const handleToggleStatus = (userId: string) => {
    if (userId === user?.username) {
      alert('You cannot deactivate your own account.');
      return;
    }

    // Actually toggle the user status in the state
    setUserAccounts(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  const getRoleStats = () => {
    const stats = {
      captain: userAccounts.filter(u => u.role === 'captain' && u.status === 'active').length,
      vice: userAccounts.filter(u => u.role === 'vice' && u.status === 'active').length,
      member: userAccounts.filter(u => u.role === 'member' && u.status === 'active').length,
      total: userAccounts.filter(u => u.status === 'active').length
    };
    return stats;
  };

  const roleStats = getRoleStats();

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Admin
            <span className="bg-gradient-to-r from-orange-400 to-green-400 bg-clip-text text-transparent">
              {' '}Dashboard
            </span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Manage user accounts, permissions, and team assignments for the ICCWSC cricket club system.
          </p>
        </div>

        {/* Admin Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
            <Crown className="mx-auto mb-3 text-yellow-400" size={32} />
            <div className="text-3xl font-bold text-white mb-1">{roleStats.captain}</div>
            <div className="text-white/70">Captains</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
            <Star className="mx-auto mb-3 text-blue-400" size={32} />
            <div className="text-3xl font-bold text-white mb-1">{roleStats.vice}</div>
            <div className="text-white/70">Vice Captains</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
            <User className="mx-auto mb-3 text-green-400" size={32} />
            <div className="text-3xl font-bold text-white mb-1">{roleStats.member}</div>
            <div className="text-white/70">Members</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
            <Users className="mx-auto mb-3 text-orange-400" size={32} />
            <div className="text-3xl font-bold text-white mb-1">{roleStats.total}</div>
            <div className="text-white/70">Total Active</div>
          </div>
        </div>

        {/* User Management */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2 flex items-center space-x-3">
                <Shield size={32} />
                <span>User Management</span>
              </h2>
              <p className="text-white/70">Create user accounts from existing cricket players and manage permissions</p>
            </div>
            
            <button
              onClick={() => setShowAddUserModal(true)}
              className="bg-gradient-to-r from-orange-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-green-700 transition-all transform hover:scale-105 flex items-center space-x-2 mt-4 md:mt-0"
            >
              <UserPlus size={20} />
              <span>Create User from Player</span>
            </button>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">Filter by Role</label>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="" className="bg-gray-900">All Roles</option>
                <option value="captain" className="bg-gray-900">Captain</option>
                <option value="vice" className="bg-gray-900">Vice Captain</option>
                <option value="member" className="bg-gray-900">Member</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">Filter by Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="" className="bg-gray-900">All Status</option>
                <option value="active" className="bg-gray-900">Active</option>
                <option value="inactive" className="bg-gray-900">Inactive</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  setFilterRole('');
                  setFilterStatus('');
                }}
                className="w-full bg-white/10 text-white px-4 py-3 rounded-xl font-semibold hover:bg-white/20 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <div className="space-y-4">
              {filteredUsers.map(userAccount => {
                const RoleIcon = getRoleIcon(userAccount.role);
                const teamInfo = getTeamInfo(userAccount.teamName);
                return (
                  <div
                    key={userAccount.id}
                    className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${getRoleColor(userAccount.role)} rounded-xl flex items-center justify-center`}>
                          <RoleIcon className="text-white" size={24} />
                        </div>
                        <div>
                          <div className="flex items-center space-x-3">
                            <h3 className="text-xl font-bold text-white">{userAccount.name}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(userAccount.status)}`}>
                              {userAccount.status === 'active' ? (
                                <span className="flex items-center space-x-1">
                                  <CheckCircle size={12} />
                                  <span>Active</span>
                                </span>
                              ) : (
                                <span className="flex items-center space-x-1">
                                  <AlertTriangle size={12} />
                                  <span>Inactive</span>
                                </span>
                              )}
                            </span>
                          </div>
                          <div className="text-white/70 text-sm">@{userAccount.username}</div>
                          <div className="text-white/60 text-sm">{userAccount.email}</div>
                          <div className="flex items-center space-x-2 mt-2">
                            <div className={`inline-block bg-gradient-to-r ${getRoleColor(userAccount.role)} px-3 py-1 rounded-full text-xs font-semibold text-white`}>
                              {userAccount.role.charAt(0).toUpperCase() + userAccount.role.slice(1)}
                              {userAccount.role === 'vice' && ' Captain'}
                            </div>
                            {userAccount.teamName && (
                              <div className="inline-flex items-center space-x-1 bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-xs font-semibold border border-orange-500/30">
                                <Trophy size={12} />
                                <span>{userAccount.teamName}</span>
                              </div>
                            )}
                          </div>
                          {teamInfo && (
                            <div className="text-white/50 text-xs mt-1">
                              {teamInfo.league} • {teamInfo.format} • {teamInfo.category}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleToggleStatus(userAccount.id)}
                          disabled={userAccount.username === user?.username}
                          className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                            userAccount.status === 'active'
                              ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30'
                              : 'bg-green-500/20 text-green-300 hover:bg-green-500/30'
                          } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          {userAccount.status === 'active' ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          onClick={() => handleEditUser(userAccount)}
                          className="p-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(userAccount.id, userAccount.name)}
                          disabled={userAccount.username === user?.username}
                          className="p-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-white/60">
                      <div>
                        <span className="font-semibold">Created:</span>
                        <div>{userAccount.createdAt.toLocaleDateString()}</div>
                      </div>
                      <div>
                        <span className="font-semibold">Last Login:</span>
                        <div>{userAccount.lastLogin?.toLocaleDateString() || 'Never'}</div>
                      </div>
                      <div>
                        <span className="font-semibold">Permissions:</span>
                        <div>
                          {userAccount.role === 'captain' && 'Full Access'}
                          {userAccount.role === 'vice' && 'Team Management'}
                          {userAccount.role === 'member' && 'Basic Access'}
                        </div>
                      </div>
                      <div>
                        <span className="font-semibold">Account ID:</span>
                        <div className="font-mono text-xs">{userAccount.id}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Create User from Player Modal */}
        {showAddUserModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 w-full max-w-6xl border border-white/30 max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-bold text-white mb-6">Create User Account from Cricket Player</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Player Selection */}
                <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                    <Users size={20} />
                    <span>Select Cricket Player</span>
                  </h4>
                  
                  {/* Player Filters */}
                  <div className="space-y-4 mb-6">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={16} />
                      <input
                        type="text"
                        value={playerFilters.search}
                        onChange={(e) => setPlayerFilters({ ...playerFilters, search: e.target.value })}
                        className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="Search players by name or team..."
                      />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2">
                      <select
                        value={playerFilters.teamName}
                        onChange={(e) => setPlayerFilters({ ...playerFilters, teamName: e.target.value })}
                        className="px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                      >
                        <option value="" className="bg-gray-900">All Teams</option>
                        {getUniqueTeamNames().map(team => (
                          <option key={team} value={team} className="bg-gray-900">{team}</option>
                        ))}
                      </select>
                      
                      <select
                        value={playerFilters.league}
                        onChange={(e) => setPlayerFilters({ ...playerFilters, league: e.target.value })}
                        className="px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                      >
                        <option value="" className="bg-gray-900">All Leagues</option>
                        {getUniqueLeagues().map(league => (
                          <option key={league} value={league} className="bg-gray-900">{league}</option>
                        ))}
                      </select>
                      
                      <select
                        value={playerFilters.category}
                        onChange={(e) => setPlayerFilters({ ...playerFilters, category: e.target.value })}
                        className="px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                      >
                        <option value="" className="bg-gray-900">All Categories</option>
                        {getUniqueCategories().map(category => (
                          <option key={category} value={category} className="bg-gray-900">{category}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  {/* Player List */}
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {filteredPlayers.map(player => (
                      <div
                        key={player.id}
                        onClick={() => handlePlayerSelect(player)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${
                          selectedPlayer?.id === player.id
                            ? 'bg-orange-500/20 border-orange-500/50 text-white'
                            : 'bg-white/5 border-white/10 hover:border-white/30 text-white/80 hover:text-white'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-semibold">{player.name}</h5>
                            <div className="text-sm opacity-80">{player.position}</div>
                            <div className="text-xs opacity-60 mt-1">
                              {player.teamName} • {player.league} • {player.category}
                            </div>
                            {player.email && (
                              <div className="text-xs opacity-60">{player.email}</div>
                            )}
                          </div>
                          {selectedPlayer?.id === player.id && (
                            <CheckCircle size={20} className="text-orange-400" />
                          )}
                        </div>
                      </div>
                    ))}
                    
                    {filteredPlayers.length === 0 && (
                      <div className="text-center py-8 text-white/50">
                        <Users size={32} className="mx-auto mb-2" />
                        <p>No players found matching your filters</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Role Assignment */}
                <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                    <Shield size={20} />
                    <span>Assign Role & Create Account</span>
                  </h4>
                  
                  {selectedPlayer ? (
                    <div className="space-y-6">
                      {/* Selected Player Info */}
                      <div className="bg-orange-500/20 border border-orange-500/30 rounded-xl p-4">
                        <h5 className="text-white font-semibold mb-2">Selected Player</h5>
                        <div className="text-orange-200">
                          <div className="font-medium">{selectedPlayer.name}</div>
                          <div className="text-sm">{selectedPlayer.position} • {selectedPlayer.teamName}</div>
                          <div className="text-sm">{selectedPlayer.league} {selectedPlayer.overs} {selectedPlayer.category}</div>
                          {selectedPlayer.email && (
                            <div className="text-sm">📧 {selectedPlayer.email}</div>
                          )}
                          {selectedPlayer.phone && (
                            <div className="text-sm">📱 {selectedPlayer.phone}</div>
                          )}
                        </div>
                      </div>

                      {/* Account Preview */}
                      <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-4">
                        <h5 className="text-white font-semibold mb-2">Account Preview</h5>
                        <div className="text-blue-200 text-sm space-y-1">
                          <div><strong>Username:</strong> {selectedPlayer.name.toLowerCase().replace(/\s+/g, '.')}</div>
                          <div><strong>Email:</strong> {selectedPlayer.email || `${selectedPlayer.name.toLowerCase().replace(/\s+/g, '.')}@email.com`}</div>
                          <div><strong>Team Assignment:</strong> {selectedPlayer.teamName}</div>
                        </div>
                      </div>

                      {/* Role Selection */}
                      <div className="space-y-4">
                        <h5 className="text-white font-semibold">Select Role for User Account</h5>
                        
                        <button
                          onClick={() => handleCreateUserFromPlayer('member')}
                          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-[1.02] flex items-center space-x-3"
                        >
                          <User size={20} />
                          <div className="text-left">
                            <div>Create as Member</div>
                            <div className="text-sm opacity-80">Basic access to scheduler and team info</div>
                          </div>
                        </button>
                        
                        <button
                          onClick={() => handleCreateUserFromPlayer('vice')}
                          className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white p-4 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-700 transition-all transform hover:scale-[1.02] flex items-center space-x-3"
                        >
                          <Star size={20} />
                          <div className="text-left">
                            <div>Create as Vice Captain</div>
                            <div className="text-sm opacity-80">Team picker access and player management</div>
                          </div>
                        </button>
                        
                        <button
                          onClick={() => handleCreateUserFromPlayer('captain')}
                          className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white p-4 rounded-xl font-semibold hover:from-yellow-600 hover:to-orange-700 transition-all transform hover:scale-[1.02] flex items-center space-x-3"
                        >
                          <Crown size={20} />
                          <div className="text-left">
                            <div>Create as Captain</div>
                            <div className="text-sm opacity-80">Full team management and event creation</div>
                          </div>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-white/50">
                      <Users size={48} className="mx-auto mb-4" />
                      <p className="text-lg">Select a cricket player from the list</p>
                      <p className="text-sm">Choose a player to create their user account with appropriate role</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 mt-8">
                <button
                  onClick={() => {
                    setShowAddUserModal(false);
                    setSelectedPlayer(null);
                    setPlayerFilters({
                      search: '',
                      teamName: '',
                      league: '',
                      category: ''
                    });
                  }}
                  className="bg-white/10 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit User Modal */}
        {showEditUserModal && selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 w-full max-w-2xl border border-white/30 max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-bold text-white mb-6">Edit User: {selectedUser.name}</h3>
              
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                  <h4 className="text-lg font-semibold text-white mb-4">Basic Information</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Full Name *</label>
                      <input
                        type="text"
                        value={editUser.name || ''}
                        onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="Enter full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Email *</label>
                      <input
                        type="email"
                        value={editUser.email || ''}
                        onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="Enter email address"
                      />
                    </div>
                  </div>
                </div>

                {/* Role and Team */}
                <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                  <h4 className="text-lg font-semibold text-white mb-4">Role & Team Assignment</h4>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-2">Role *</label>
                        <select
                          value={editUser.role || ''}
                          onChange={(e) => setEditUser({ ...editUser, role: e.target.value as UserAccount['role'], teamName: '' })}
                          className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                        >
                          <option value="member" className="bg-gray-900">Member</option>
                          <option value="vice" className="bg-gray-900">Vice Captain</option>
                          <option value="captain" className="bg-gray-900">Captain</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-2">Status *</label>
                        <select
                          value={editUser.status || ''}
                          onChange={(e) => setEditUser({ ...editUser, status: e.target.value as UserAccount['status'] })}
                          className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                        >
                          <option value="active" className="bg-gray-900">Active</option>
                          <option value="inactive" className="bg-gray-900">Inactive</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Team Assignment
                        {(editUser.role === 'captain' || editUser.role === 'vice') && (
                          <span className="text-orange-300 text-xs ml-1">
                            * (Required for {editUser.role === 'vice' ? 'Vice Captains' : 'Captains'})
                          </span>
                        )}
                      </label>
                      <select
                        value={editUser.teamName || ''}
                        onChange={(e) => setEditUser({ ...editUser, teamName: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                      >
                        <option value="" className="bg-gray-900">
                          {editUser.role === 'member' ? 'No team assignment' : 'Select a team'}
                        </option>
                        {availableTeams.map(team => (
                          <option key={team.name} value={team.name} className="bg-gray-900">
                            {team.name} ({team.league} - {team.format} - {team.category})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => {
                    setShowEditUserModal(false);
                    setSelectedUser(null);
                    setEditUser({});
                  }}
                  className="flex-1 bg-white/10 text-white py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateUser}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-green-700 transition-all"
                >
                  Update User
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}