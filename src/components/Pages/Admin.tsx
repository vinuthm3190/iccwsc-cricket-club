import React, { useState } from 'react';
import { Shield, Users, UserPlus, Edit3, Trash2, Save, X, CheckCircle, AlertTriangle, Crown, Star, User, Trophy } from 'lucide-react';
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

interface NewUserData {
  username: string;
  name: string;
  email: string;
  role: 'member' | 'vice' | 'captain';
  teamName?: string;
  password: string;
  confirmPassword: string;
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

  // Sample user accounts data with team assignments
  const [userAccounts, setUserAccounts] = useState<UserAccount[]>([
    {
      id: '1',
      username: 'captain',
      name: 'Alex Johnson',
      email: 'alex.johnson@iccwsc.com',
      role: 'captain',
      status: 'active',
      teamName: 'Angry Bulls',
      createdAt: new Date('2024-01-15'),
      lastLogin: new Date('2024-12-20')
    },
    {
      id: '2',
      username: 'vice',
      name: 'Sarah Martinez',
      email: 'sarah.martinez@iccwsc.com',
      role: 'vice',
      status: 'active',
      teamName: 'Royal Warriors',
      createdAt: new Date('2024-02-10'),
      lastLogin: new Date('2024-12-19')
    },
    {
      id: '3',
      username: 'member',
      name: 'Mike Thompson',
      email: 'mike.thompson@iccwsc.com',
      role: 'member',
      status: 'active',
      teamName: 'Watermelons Adult T20',
      createdAt: new Date('2024-03-05'),
      lastLogin: new Date('2024-12-18')
    },
    {
      id: '4',
      username: 'rajesh.kumar',
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@iccwsc.com',
      role: 'member',
      status: 'active',
      teamName: 'Angry Bulls',
      createdAt: new Date('2024-04-12'),
      lastLogin: new Date('2024-12-17')
    },
    {
      id: '5',
      username: 'priya.sharma',
      name: 'Priya Sharma',
      email: 'priya.sharma@iccwsc.com',
      role: 'vice',
      status: 'active',
      teamName: 'Solaris Adult T20',
      createdAt: new Date('2024-05-20'),
      lastLogin: new Date('2024-12-16')
    },
    {
      id: '6',
      username: 'vikram.singh',
      name: 'Vikram Singh',
      email: 'vikram.singh@iccwsc.com',
      role: 'member',
      status: 'inactive',
      teamName: 'Cereal Killers',
      createdAt: new Date('2024-06-08'),
      lastLogin: new Date('2024-11-15')
    }
  ]);

  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserAccount | null>(null);
  const [newUser, setNewUser] = useState<NewUserData>({
    username: '',
    name: '',
    email: '',
    role: 'member',
    teamName: '',
    password: '',
    confirmPassword: ''
  });
  const [editUser, setEditUser] = useState<Partial<UserAccount>>({});
  const [filterRole, setFilterRole] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('');

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

  const filteredUsers = userAccounts.filter(user => {
    const matchesRole = !filterRole || user.role === filterRole;
    const matchesStatus = !filterStatus || user.status === filterStatus;
    return matchesRole && matchesStatus;
  });

  const handleAddUser = () => {
    if (!newUser.username || !newUser.name || !newUser.email || !newUser.password) {
      alert('Please fill in all required fields.');
      return;
    }

    if (newUser.password !== newUser.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    if (userAccounts.some(user => user.username === newUser.username)) {
      alert('Username already exists. Please choose a different username.');
      return;
    }

    if (userAccounts.some(user => user.email === newUser.email)) {
      alert('Email already exists. Please use a different email address.');
      return;
    }

    // Validate team assignment for captains and vice captains
    if ((newUser.role === 'captain' || newUser.role === 'vice') && !newUser.teamName) {
      alert(`Please assign a team for the ${newUser.role === 'vice' ? 'vice captain' : 'captain'}.`);
      return;
    }

    const user: UserAccount = {
      id: Date.now().toString(),
      username: newUser.username,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: 'active',
      teamName: newUser.teamName || undefined,
      createdAt: new Date()
    };

    setUserAccounts([...userAccounts, user]);
    setShowAddUserModal(false);
    setNewUser({
      username: '',
      name: '',
      email: '',
      role: 'member',
      teamName: '',
      password: '',
      confirmPassword: ''
    });

    const teamInfo = user.teamName ? ` and assigned to team "${user.teamName}"` : '';
    alert(`User "${user.name}" created successfully with ${user.role} permissions${teamInfo}!`);
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

    setUserAccounts(userAccounts.map(user => 
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
      setUserAccounts(userAccounts.filter(user => user.id !== userId));
      alert(`User "${userName}" deleted successfully.`);
    }
  };

  const handleToggleStatus = (userId: string) => {
    if (userId === user?.username) {
      alert('You cannot deactivate your own account.');
      return;
    }

    setUserAccounts(userAccounts.map(user => 
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
              <p className="text-white/70">Manage user accounts, permissions, and team assignments</p>
            </div>
            
            <button
              onClick={() => setShowAddUserModal(true)}
              className="bg-gradient-to-r from-orange-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-green-700 transition-all transform hover:scale-105 flex items-center space-x-2 mt-4 md:mt-0"
            >
              <UserPlus size={20} />
              <span>Add New User</span>
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

        {/* Add User Modal */}
        {showAddUserModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 w-full max-w-2xl border border-white/30 max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-bold text-white mb-6">Add New User</h3>
              
              <div className="space-y-6">
                {/* Basic User Information */}
                <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                    <User size={20} />
                    <span>User Information</span>
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Full Name *</label>
                      <input
                        type="text"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="Enter full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Username *</label>
                      <input
                        type="text"
                        value={newUser.username}
                        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="Enter username"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-white/90 mb-2">Email *</label>
                      <input
                        type="email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="Enter email address"
                      />
                    </div>
                  </div>
                </div>

                {/* Role and Team Assignment */}
                <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                    <Trophy size={20} />
                    <span>Role & Team Assignment</span>
                  </h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Role *</label>
                      <select
                        value={newUser.role}
                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value as NewUserData['role'], teamName: '' })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                      >
                        <option value="member" className="bg-gray-900">Member</option>
                        <option value="vice" className="bg-gray-900">Vice Captain</option>
                        <option value="captain" className="bg-gray-900">Captain</option>
                      </select>
                    </div>

                    {(newUser.role === 'captain' || newUser.role === 'vice') && (
                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-2">
                          Team Assignment * 
                          <span className="text-orange-300 text-xs ml-1">
                            (Required for {newUser.role === 'vice' ? 'Vice Captains' : 'Captains'})
                          </span>
                        </label>
                        <select
                          value={newUser.teamName || ''}
                          onChange={(e) => setNewUser({ ...newUser, teamName: e.target.value })}
                          className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                        >
                          <option value="" className="bg-gray-900">Select a team</option>
                          {availableTeams.map(team => (
                            <option key={team.name} value={team.name} className="bg-gray-900">
                              {team.name} ({team.league} - {team.format} - {team.category})
                            </option>
                          ))}
                        </select>
                        {newUser.teamName && (
                          <div className="mt-2 p-3 bg-orange-500/20 border border-orange-500/30 rounded-lg">
                            <div className="text-orange-300 text-sm font-semibold">Selected Team:</div>
                            <div className="text-orange-200 text-sm">
                              {(() => {
                                const team = availableTeams.find(t => t.name === newUser.teamName);
                                return team ? `${team.name} - ${team.league} League (${team.format} ${team.category})` : newUser.teamName;
                              })()}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {newUser.role === 'member' && (
                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-2">
                          Team Assignment (Optional)
                        </label>
                        <select
                          value={newUser.teamName || ''}
                          onChange={(e) => setNewUser({ ...newUser, teamName: e.target.value })}
                          className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                        >
                          <option value="" className="bg-gray-900">No team assignment</option>
                          {availableTeams.map(team => (
                            <option key={team.name} value={team.name} className="bg-gray-900">
                              {team.name} ({team.league} - {team.format} - {team.category})
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                </div>

                {/* Security */}
                <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                    <Shield size={20} />
                    <span>Security</span>
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Password *</label>
                      <input
                        type="password"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="Enter password"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Confirm Password *</label>
                      <input
                        type="password"
                        value={newUser.confirmPassword}
                        onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="Confirm password"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => {
                    setShowAddUserModal(false);
                    setNewUser({
                      username: '',
                      name: '',
                      email: '',
                      role: 'member',
                      teamName: '',
                      password: '',
                      confirmPassword: ''
                    });
                  }}
                  className="flex-1 bg-white/10 text-white py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddUser}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-green-700 transition-all"
                >
                  Create User
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