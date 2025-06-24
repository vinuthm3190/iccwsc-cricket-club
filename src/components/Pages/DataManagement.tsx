import React, { useState } from 'react';
import { 
  Database, 
  Download, 
  Upload, 
  RefreshCw, 
  Trash2, 
  Save, 
  FileText, 
  AlertTriangle,
  CheckCircle,
  Info,
  HardDrive,
  Calendar,
  Users,
  Trophy,
  BookOpen,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useDataManagement } from '../../hooks/useDataService';

export default function DataManagement() {
  const { hasPermission } = useAuth();
  const canManageData = hasPermission(['admin']);
  
  const {
    info,
    exportData,
    importData,
    resetData,
    createBackup,
    restoreFromBackup,
    validateData,
    refreshInfo
  } = useDataManagement();

  const [showImportModal, setShowImportModal] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [importJsonData, setImportJsonData] = useState('');
  const [restoreJsonData, setRestoreJsonData] = useState('');
  const [validationResult, setValidationResult] = useState<{ isValid: boolean; errors: string[] } | null>(null);

  if (!canManageData) {
    return (
      <div className="min-h-screen py-12 px-4 flex items-center justify-center">
        <div className="bg-red-500/20 backdrop-blur-lg rounded-3xl p-12 border border-red-500/30 text-center max-w-md">
          <AlertTriangle className="mx-auto mb-4 text-red-400" size={48} />
          <h3 className="text-xl font-bold text-white mb-2">Access Denied</h3>
          <p className="text-red-200">
            Only administrators can access the data management system.
          </p>
        </div>
      </div>
    );
  }

  const handleExportData = () => {
    try {
      const jsonData = exportData();
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `iccwsc-data-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      alert('Data exported successfully!');
    } catch (error) {
      alert('Failed to export data. Please try again.');
    }
  };

  const handleImportData = () => {
    if (!importJsonData.trim()) {
      alert('Please paste JSON data to import.');
      return;
    }

    try {
      const success = importData(importJsonData);
      if (success) {
        setShowImportModal(false);
        setImportJsonData('');
        refreshInfo();
        alert('Data imported successfully! The page will refresh to show the new data.');
        window.location.reload();
      } else {
        alert('Failed to import data. Please check the JSON format and try again.');
      }
    } catch (error) {
      alert('Failed to import data. Please check the JSON format and try again.');
    }
  };

  const handleCreateBackup = () => {
    try {
      const backupData = createBackup();
      const blob = new Blob([backupData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `iccwsc-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      alert('Backup created successfully!');
    } catch (error) {
      alert('Failed to create backup. Please try again.');
    }
  };

  const handleRestoreFromBackup = () => {
    if (!restoreJsonData.trim()) {
      alert('Please paste backup JSON data to restore.');
      return;
    }

    if (!confirm('Are you sure you want to restore from backup? This will replace all current data and cannot be undone.')) {
      return;
    }

    try {
      const success = restoreFromBackup(restoreJsonData);
      if (success) {
        setShowRestoreModal(false);
        setRestoreJsonData('');
        refreshInfo();
        alert('Data restored from backup successfully! The page will refresh to show the restored data.');
        window.location.reload();
      } else {
        alert('Failed to restore from backup. Please check the backup format and try again.');
      }
    } catch (error) {
      alert('Failed to restore from backup. Please check the backup format and try again.');
    }
  };

  const handleResetData = () => {
    if (!confirm('Are you sure you want to reset all data to defaults? This will delete all current data and cannot be undone.')) {
      return;
    }

    if (!confirm('This action is IRREVERSIBLE. All players, teams, blog posts, and other data will be lost. Are you absolutely sure?')) {
      return;
    }

    try {
      resetData();
      refreshInfo();
      alert('Data reset to defaults successfully! The page will refresh.');
      window.location.reload();
    } catch (error) {
      alert('Failed to reset data. Please try again.');
    }
  };

  const handleValidateData = () => {
    try {
      const result = validateData();
      setValidationResult(result);
      
      if (result.isValid) {
        alert('Data validation passed! All data is consistent and valid.');
      } else {
        alert(`Data validation found ${result.errors.length} issues. Check the validation results below.`);
      }
    } catch (error) {
      alert('Failed to validate data. Please try again.');
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Data
            <span className="bg-gradient-to-r from-orange-400 to-green-400 bg-clip-text text-transparent">
              {' '}Management
            </span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Manage your cricket club's data with export, import, backup, and restore capabilities. 
            Keep your data safe and synchronized across different systems.
          </p>
        </div>

        {/* Data Overview */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <Database className="text-orange-400" size={24} />
            <h2 className="text-2xl font-bold text-white">Data Overview</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/5 rounded-2xl p-6 text-center border border-white/10">
              <Users className="mx-auto mb-3 text-blue-400" size={32} />
              <div className="text-3xl font-bold text-white mb-1">{info.entities.players || 0}</div>
              <div className="text-white/70">Players</div>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 text-center border border-white/10">
              <Trophy className="mx-auto mb-3 text-yellow-400" size={32} />
              <div className="text-3xl font-bold text-white mb-1">{info.entities.teams || 0}</div>
              <div className="text-white/70">Teams</div>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 text-center border border-white/10">
              <BookOpen className="mx-auto mb-3 text-green-400" size={32} />
              <div className="text-3xl font-bold text-white mb-1">{info.entities.blogPosts || 0}</div>
              <div className="text-white/70">Blog Posts</div>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 text-center border border-white/10">
              <MessageSquare className="mx-auto mb-3 text-purple-400" size={32} />
              <div className="text-3xl font-bold text-white mb-1">{info.entities.events || 0}</div>
              <div className="text-white/70">Events</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center space-x-2 mb-2">
                <HardDrive size={16} className="text-orange-400" />
                <span className="text-white/90 font-semibold">Storage Size</span>
              </div>
              <div className="text-white text-lg">{info.size}</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar size={16} className="text-blue-400" />
                <span className="text-white/90 font-semibold">Last Updated</span>
              </div>
              <div className="text-white text-sm">{new Date(info.lastUpdated).toLocaleString()}</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center space-x-2 mb-2">
                <Info size={16} className="text-green-400" />
                <span className="text-white/90 font-semibold">Version</span>
              </div>
              <div className="text-white text-lg">{info.version}</div>
            </div>
          </div>
        </div>

        {/* Data Operations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Export & Import */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
              <FileText size={24} />
              <span>Export & Import</span>
            </h3>
            
            <div className="space-y-4">
              <button
                onClick={handleExportData}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-700 transition-all flex items-center justify-center space-x-2"
              >
                <Download size={20} />
                <span>Export All Data</span>
              </button>
              
              <button
                onClick={() => setShowImportModal(true)}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all flex items-center justify-center space-x-2"
              >
                <Upload size={20} />
                <span>Import Data</span>
              </button>
              
              <div className="text-white/70 text-sm">
                Export creates a JSON file with all your data. Import replaces current data with imported data.
              </div>
            </div>
          </div>

          {/* Backup & Restore */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
              <Save size={24} />
              <span>Backup & Restore</span>
            </h3>
            
            <div className="space-y-4">
              <button
                onClick={handleCreateBackup}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-700 transition-all flex items-center justify-center space-x-2"
              >
                <Save size={20} />
                <span>Create Backup</span>
              </button>
              
              <button
                onClick={() => setShowRestoreModal(true)}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-yellow-600 hover:to-orange-700 transition-all flex items-center justify-center space-x-2"
              >
                <RefreshCw size={20} />
                <span>Restore from Backup</span>
              </button>
              
              <div className="text-white/70 text-sm">
                Backups include metadata and timestamps. Use for data recovery and version control.
              </div>
            </div>
          </div>
        </div>

        {/* Data Maintenance */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 mb-12">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
            <Database size={24} />
            <span>Data Maintenance</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={handleValidateData}
              className="bg-blue-500/20 text-blue-300 py-3 px-4 rounded-xl font-semibold hover:bg-blue-500/30 transition-all flex items-center justify-center space-x-2"
            >
              <CheckCircle size={20} />
              <span>Validate Data</span>
            </button>
            
            <button
              onClick={() => {
                refreshInfo();
                alert('Data information refreshed!');
              }}
              className="bg-green-500/20 text-green-300 py-3 px-4 rounded-xl font-semibold hover:bg-green-500/30 transition-all flex items-center justify-center space-x-2"
            >
              <RefreshCw size={20} />
              <span>Refresh Info</span>
            </button>
            
            <button
              onClick={handleResetData}
              className="bg-red-500/20 text-red-300 py-3 px-4 rounded-xl font-semibold hover:bg-red-500/30 transition-all flex items-center justify-center space-x-2"
            >
              <Trash2 size={20} />
              <span>Reset to Defaults</span>
            </button>
          </div>
        </div>

        {/* Validation Results */}
        {validationResult && (
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 mb-12">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
              {validationResult.isValid ? (
                <CheckCircle className="text-green-400" size={24} />
              ) : (
                <AlertTriangle className="text-red-400" size={24} />
              )}
              <span>Validation Results</span>
            </h3>
            
            {validationResult.isValid ? (
              <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4">
                <div className="flex items-center space-x-2 text-green-300">
                  <CheckCircle size={20} />
                  <span className="font-semibold">Data validation passed!</span>
                </div>
                <p className="text-green-200 mt-2">
                  All data is consistent and valid. No issues found.
                </p>
              </div>
            ) : (
              <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4">
                <div className="flex items-center space-x-2 text-red-300 mb-3">
                  <AlertTriangle size={20} />
                  <span className="font-semibold">Data validation found {validationResult.errors.length} issues:</span>
                </div>
                <ul className="text-red-200 space-y-1">
                  {validationResult.errors.map((error, index) => (
                    <li key={index} className="text-sm">• {error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Import Modal */}
        {showImportModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 w-full max-w-4xl border border-white/30 max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-bold text-white mb-6">Import Data</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Paste JSON Data
                  </label>
                  <textarea
                    value={importJsonData}
                    onChange={(e) => setImportJsonData(e.target.value)}
                    rows={15}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none font-mono text-sm"
                    placeholder="Paste your JSON data here..."
                  />
                </div>
                
                <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-4">
                  <div className="flex items-center space-x-2 text-yellow-300">
                    <AlertTriangle size={20} />
                    <span className="font-semibold">Warning</span>
                  </div>
                  <p className="text-yellow-200 mt-2 text-sm">
                    Importing data will replace ALL current data. Make sure to create a backup first if you want to preserve current data.
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => {
                    setShowImportModal(false);
                    setImportJsonData('');
                  }}
                  className="flex-1 bg-white/10 text-white py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleImportData}
                  disabled={!importJsonData.trim()}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Import Data
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Restore Modal */}
        {showRestoreModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 w-full max-w-4xl border border-white/30 max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-bold text-white mb-6">Restore from Backup</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Paste Backup JSON Data
                  </label>
                  <textarea
                    value={restoreJsonData}
                    onChange={(e) => setRestoreJsonData(e.target.value)}
                    rows={15}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none font-mono text-sm"
                    placeholder="Paste your backup JSON data here..."
                  />
                </div>
                
                <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4">
                  <div className="flex items-center space-x-2 text-red-300">
                    <AlertTriangle size={20} />
                    <span className="font-semibold">Danger</span>
                  </div>
                  <p className="text-red-200 mt-2 text-sm">
                    Restoring from backup will replace ALL current data with the backup data. This action cannot be undone.
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => {
                    setShowRestoreModal(false);
                    setRestoreJsonData('');
                  }}
                  className="flex-1 bg-white/10 text-white py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRestoreFromBackup}
                  disabled={!restoreJsonData.trim()}
                  className="flex-1 bg-gradient-to-r from-red-500 to-orange-600 text-white py-3 rounded-lg font-semibold hover:from-red-600 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Restore from Backup
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}