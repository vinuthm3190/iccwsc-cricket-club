import React, { useState } from 'react';
import { 
  Shield, 
  Users, 
  UserPlus, 
  Edit3, 
  Trash2, 
  Save, 
  X,
  AlertTriangle,
  CheckCircle,
  Crown,
  Star,
  User
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Admin() {
  const { hasPermission, getAllUsers, addUser, updateUser, deleteUser, user: currentUser } = useAuth();
  const canAccessAdmin = hasPermission(['admin']);

  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    name: '',
    role: 'member'
  });

  if (!canAccessAdmin) {
    return (
      <div className="min-h-screen py-12 px-4 flex items-center justify-center">
        <div className="bg-red-500/20 backdrop-blur-lg rounded-3xl p-12 border border-red-500/30 text-center max-w-md">
          <AlertTriangle className="mx-auto mb-4 text-red-400" size={48} />
          <h3 className="text-xl font-bold text-white mb-2">Access Denied</h3>
          <p className="text-red-200">
            Only administrators can access the admin panel.
          </p>
        </div>
      </div>
    );
  }

  const allUsers = getAllUsers();

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return Crown;
      case 'captain': return Star;
      case 'vice': return Shield;
      case 'member': return User;
      default: return User;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'from-red-500 to-pink-500';
      case 'captain': return 'from-yellow-500 to-orange-500';
      case 'vice': return 'from-blue-500 to-cyan-500';
      case 'member': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const handleAddUser = () => {
    if (!newUser.username.trim() || !newUser.password.trim() || !newUser.name.trim()) {
      alert('Please fill in all fields.');
      return;
    }

    // Check if username already exists
    const existingUser = allUsers.find(u => u.username === newUser.username);
    if (existingUser) {
      alert('Username already exists. Please choose a different username.');
      return;
    }

    try {
      addUser(newUser.username, newUser.password, newUser.name, newUser.role);
      setShowAddUserModal(false);
      setNewUser({ username: '', password: '', name: '', role: 'member' });
      alert(`User "${newUser.name}" added successfully!`);
    } catch (error) {
      alert('Failed to add user. Please try again.');
    }
  };

  const handleEditUser = (userToEdit: any) => {
    setSelectedUser(userToEdit);
    setNewUser({
      username: userToEdit.username,
      password: userToEdit.password,
      name: userToEdit.user.name,
      role: userToEdit.user.role
    });
    setShowEditUserModal(true);
  };

  const handleUpdateUser = () => {
    if (!selectedUser || !newUser.name.trim()) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      updateUser(selectedUser.username, {
        name: newUser.name,
        role: newUser.role as any
      });
      setShowEditUserModal(false);
      setSelectedUser(null);
      setNewUser({ username: '', password: '', name: '', role: 'member' });
      alert(`User "${newUser.name}" updated successfully!`);
    } catch (error) {
      alert('Failed to update user. Please try again.');
    }
  };

  const handleDeleteUser = (username: string, name: string) => {
    if (username === currentUser?.username) {
      alert('You cannot delete your own account.');
      return;
    }

    if (confirm(`Are you sure you want to delete user "${name}"? This action cannot be undone.`)) {
      try {
        deleteUser(username);
        alert(`User "${name}" deleted successfully!`);
      } catch (error) {
        alert('Failed to delete user. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Admin
            <span className="bg-gradient-to-r from-orange-400 to-green-400 bg-clip-text text-transparent">
              {' '}Panel
            </span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Manage user accounts, roles, and system administration for the ICCWSC cricket club.
          </p>
        </div>

        {/* Admin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
            <Users className="mx-auto mb-3 text-blue-400" size={32} />
            <div className="text-3xl font-bold text-white mb-1">{allUsers.length}</div>
            <div className="text-white/70">Total Users</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
            <Crown className="mx-auto mb-3 text-red-400" size={32} />
            <div className="text-3xl font-bold text-white mb-1">
              {allUsers.filter(u => u.user.role === 'admin').length}
            </div>
            <div className="text-white/70">Admins</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
            <Star className="mx-auto mb-3 text-yellow-400" size={32} />
            <div className="text-3xl font-bold text-white mb-1">
              {allUsers.filter(u => u.user.role === 'captain').length}
            </div>
            <div className="text-white/70">Captains</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
            <Shield className="mx-auto mb-3 text-green-400" size={32} />
            <div className="text-3xl font-bold text-white mb-1">
              {allUsers.filter(u => u.user.role === 'member').length}
            </div>
            <div className="text-white/70">Members</div>
          </div>
        </div>

        {/* User Management */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
              <Users size={24} />
              <span>User Management</span>
            </h2>
            
            <button
              onClick={() => setShowAddUserModal(true)}
              className="bg-gradient-to-r from-orange-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-green-700 transition-all transform hover:scale-105 flex items-center space-x-2"
            >
              <UserPlus size={20} />
              <span>Add User</span>
            </button>
          </div>

          {/* Users List */}
          <div className="space-y-4">
            {allUsers.map((userEntry) => {
              const RoleIcon = getRoleIcon(userEntry.user.role);
              const isCurrentUser = userEntry.username === currentUser?.username;
              
              return (
                <div
                  key={userEntry.username}
                  className={`bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all ${
                    isCurrentUser ? 'ring-2 ring-orange-500/50' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${getRoleColor(userEntry.user.role)} rounded-xl flex items-center justify-center`}>
                        <RoleIcon className="text-white" size={24} />
                      </div>
                      
                      <div>
                        <div className="flex items-center space-x-3">
                          <h3 className="text-xl font-bold text-white">{userEntry.user.name}</h3>
                          {isCurrentUser && (
                            <span className="bg-orange-500/20 text-orange-300 px-2 py-1 rounded-lg text-xs font-semibold">
                              You
                            </span>
                          )}
                        </div>
                        <div className="text-white/70">@{userEntry.username}</div>
                        <div className={`inline-block bg-gradient-to-r ${getRoleColor(userEntry.user.role)} px-3 py-1 rounded-full text-xs font-semibold text-white mt-2`}>
                          {userEntry.user.role === 'vice' ? 'Vice Captain' : 
                           userEntry.user.role.charAt(0).toUpperCase() + userEntry.user.role.slice(1)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditUser(userEntry)}
                        className="p-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors"
                      >
                        <Edit3 size={16} />
                      </button>
                      {!isCurrentUser && (
                        <button
                          onClick={() => handleDeleteUser(userEntry.username, userEntry.user.name)}
                          className="p-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Add User Modal */}
        {showAddUserModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md border border-white/30">
              <h3 className="text-2xl font-bold text-white mb-6">Add New User</h3>
              
              <div className="space-y-4">
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
                  <label className="block text-sm font-medium text-white/90 mb-2">Role *</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                  >
                    <option value="member" className="bg-gray-900">Member</option>
                    <option value="vice" className="bg-gray-900">Vice Captain</option>
                    <option value="captain" className="bg-gray-900">Captain</option>
                    <option value="admin" className="bg-gray-900">Admin</option>
                  </select>
                </div>
              </div>
              
              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => setShowAddUserModal(false)}
                  className="flex-1 bg-white/10 text-white py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddUser}
                  disabled={!newUser.username.trim() || !newUser.password.trim() || !newUser.name.trim()}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add User
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit User Modal */}
        {showEditUserModal && selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md border border-white/30">
              <h3 className="text-2xl font-bold text-white mb-6">Edit User: {selectedUser.user.name}</h3>
              
              <div className="space-y-4">
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
                  <label className="block text-sm font-medium text-white/90 mb-2">Username</label>
                  <input
                    type="text"
                    value={newUser.username}
                    disabled
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white/50 cursor-not-allowed"
                  />
                  <p className="text-xs text-white/50 mt-1">Username cannot be changed</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">Role *</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                  >
                    <option value="member" className="bg-gray-900">Member</option>
                    <option value="vice" className="bg-gray-900">Vice Captain</option>
                    <option value="captain" className="bg-gray-900">Captain</option>
                    <option value="admin" className="bg-gray-900">Admin</option>
                  </select>
                </div>
              </div>
              
              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => {
                    setShowEditUserModal(false);
                    setSelectedUser(null);
                    setNewUser({ username: '', password: '', name: '', role: 'member' });
                  }}
                  className="flex-1 bg-white/10 text-white py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateUser}
                  disabled={!newUser.name.trim()}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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