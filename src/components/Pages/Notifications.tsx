import React, { useState, useMemo } from 'react';
import { 
  Bell, 
  Send, 
  Users, 
  Mail, 
  MessageSquare, 
  Filter, 
  Plus, 
  Edit3, 
  Trash2, 
  Save,
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  Phone,
  Calendar,
  Target,
  Settings,
  Download,
  Upload
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface NotificationRecipient {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  teams: string[];
  preferences: {
    emailNotifications: boolean;
    whatsappNotifications: boolean;
    matchReminders: boolean;
    practiceReminders: boolean;
    generalUpdates: boolean;
  };
}

interface NotificationTemplate {
  id: string;
  name: string;
  subject: string;
  emailContent: string;
  whatsappContent: string;
  type: 'match' | 'practice' | 'meeting' | 'general';
  variables: string[];
}

export default function Notifications() {
  const { hasPermission } = useAuth();
  const canSendNotifications = hasPermission(['captain', 'admin']);

  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);
  const [notificationSubject, setNotificationSubject] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [whatsappContent, setWhatsappContent] = useState('');
  const [sendEmail, setSendEmail] = useState(true);
  const [sendWhatsapp, setSendWhatsapp] = useState(true);
  const [filterTeam, setFilterTeam] = useState('');
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<NotificationTemplate | null>(null);

  // Sample recipients data
  const [recipients] = useState<NotificationRecipient[]>([
    {
      id: '1',
      name: 'Naim Mohammad',
      email: 'naim.mohammad@email.com',
      phone: '+1-206-555-0101',
      teams: ['Cereal Killers'],
      preferences: {
        emailNotifications: true,
        whatsappNotifications: true,
        matchReminders: true,
        practiceReminders: true,
        generalUpdates: true
      }
    },
    {
      id: '2',
      name: 'Dhruva Kumar',
      email: 'dhruva.kumar@email.com',
      phone: '+1-206-555-0102',
      teams: ['Cereal Killers'],
      preferences: {
        emailNotifications: true,
        whatsappNotifications: false,
        matchReminders: true,
        practiceReminders: true,
        generalUpdates: false
      }
    },
    {
      id: '3',
      name: 'Darshan Masti Prakash',
      email: 'darshan.prakash@email.com',
      phone: '+1-206-555-0103',
      teams: ['Cereal Killers'],
      preferences: {
        emailNotifications: false,
        whatsappNotifications: true,
        matchReminders: true,
        practiceReminders: false,
        generalUpdates: true
      }
    },
    {
      id: '4',
      name: 'Vinuth Muniraju',
      email: 'vinuth.muniraju@email.com',
      phone: '+1-206-555-0104',
      teams: ['Cereal Killers'],
      preferences: {
        emailNotifications: true,
        whatsappNotifications: true,
        matchReminders: true,
        practiceReminders: true,
        generalUpdates: true
      }
    },
    {
      id: '5',
      name: 'Uday C',
      email: 'uday.c@email.com',
      phone: '+1-206-555-0105',
      teams: ['Cereal Killers'],
      preferences: {
        emailNotifications: true,
        whatsappNotifications: true,
        matchReminders: true,
        practiceReminders: true,
        generalUpdates: false
      }
    }
  ]);

  // Sample notification templates
  const [templates] = useState<NotificationTemplate[]>([
    {
      id: '1',
      name: 'Match Reminder',
      subject: 'Cricket Match Tomorrow - {{teamName}} vs {{opponent}}',
      emailContent: `Dear {{playerName}},

This is a reminder about tomorrow's cricket match:

🏏 Match Details:
- Teams: {{teamName}} vs {{opponent}}
- Date: {{date}}
- Time: {{time}}
- Venue: {{location}}

Please arrive 30 minutes early for warm-up.

Best regards,
ICCWSC Team`,
      whatsappContent: `🏏 Cricket Match Reminder

Hi {{playerName}}!

Match Details:
🏏 {{teamName}} vs {{opponent}}
📅 {{date}}
⏰ {{time}}
📍 {{location}}

Please arrive 30 minutes early for warm-up.

Good luck! 🏆

- ICCWSC Team`,
      type: 'match',
      variables: ['playerName', 'teamName', 'opponent', 'date', 'time', 'location']
    },
    {
      id: '2',
      name: 'Practice Session',
      subject: 'Cricket Practice - {{date}} at {{time}}',
      emailContent: `Hi {{playerName}},

You have a cricket practice session scheduled:

📅 Practice Details:
- Date: {{date}}
- Time: {{time}}
- Venue: {{location}}
- Focus: {{description}}

Bring your cricket gear and water bottle.

See you on the field!
ICCWSC`,
      whatsappContent: `🏃‍♂️ Cricket Practice

Hi {{playerName}}!

Practice Session:
📅 {{date}}
⏰ {{time}}
📍 {{location}}
🎯 Focus: {{description}}

Bring your cricket gear and water bottle.

See you on the field! 🏏

- ICCWSC`,
      type: 'practice',
      variables: ['playerName', 'date', 'time', 'location', 'description']
    }
  ]);

  if (!canSendNotifications) {
    return (
      <div className="min-h-screen py-12 px-4 flex items-center justify-center">
        <div className="bg-red-500/20 backdrop-blur-lg rounded-3xl p-12 border border-red-500/30 text-center max-w-md">
          <AlertTriangle className="mx-auto mb-4 text-red-400" size={48} />
          <h3 className="text-xl font-bold text-white mb-2">Access Denied</h3>
          <p className="text-red-200">
            Only team captains and administrators can send notifications.
          </p>
        </div>
      </div>
    );
  }

  // Filter recipients based on team selection
  const filteredRecipients = useMemo(() => {
    if (!filterTeam) return recipients;
    return recipients.filter(recipient => 
      recipient.teams.some(team => team.toLowerCase().includes(filterTeam.toLowerCase()))
    );
  }, [recipients, filterTeam]);

  // Get unique teams for filter dropdown
  const getUniqueTeams = () => {
    const teams = new Set<string>();
    recipients.forEach(recipient => {
      recipient.teams.forEach(team => teams.add(team));
    });
    return Array.from(teams).sort();
  };

  const handleRecipientToggle = (recipientId: string) => {
    setSelectedRecipients(prev => 
      prev.includes(recipientId)
        ? prev.filter(id => id !== recipientId)
        : [...prev, recipientId]
    );
  };

  const handleSelectAll = () => {
    const allIds = filteredRecipients.map(r => r.id);
    setSelectedRecipients(allIds);
  };

  const handleDeselectAll = () => {
    setSelectedRecipients([]);
  };

  const handleUseTemplate = (template: NotificationTemplate) => {
    setNotificationSubject(template.subject);
    setEmailContent(template.emailContent);
    setWhatsappContent(template.whatsappContent);
    setShowTemplateModal(false);
  };

  const handleSendNotifications = () => {
    if (selectedRecipients.length === 0) {
      alert('Please select at least one recipient.');
      return;
    }

    if (!notificationSubject.trim() && sendEmail) {
      alert('Please enter a subject for email notifications.');
      return;
    }

    if (!emailContent.trim() && sendEmail) {
      alert('Please enter email content.');
      return;
    }

    if (!whatsappContent.trim() && sendWhatsapp) {
      alert('Please enter WhatsApp content.');
      return;
    }

    // Simulate sending notifications
    const selectedRecipientsData = recipients.filter(r => selectedRecipients.includes(r.id));
    
    let emailCount = 0;
    let whatsappCount = 0;

    selectedRecipientsData.forEach(recipient => {
      if (sendEmail && recipient.email && recipient.preferences.emailNotifications) {
        emailCount++;
      }
      if (sendWhatsapp && recipient.phone && recipient.preferences.whatsappNotifications) {
        whatsappCount++;
      }
    });

    const message = `Notifications sent successfully!\n\n` +
                   `📧 Email notifications: ${emailCount}\n` +
                   `📱 WhatsApp notifications: ${whatsappCount}\n` +
                   `👥 Total recipients: ${selectedRecipients.length}`;

    alert(message);

    // Reset form
    setSelectedRecipients([]);
    setNotificationSubject('');
    setEmailContent('');
    setWhatsappContent('');
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Cricket
            <span className="bg-gradient-to-r from-orange-400 to-green-400 bg-clip-text text-transparent">
              {' '}Notifications
            </span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Send match reminders, practice notifications, and team updates to your cricket players 
            via email and WhatsApp.
          </p>
        </div>

        {/* Notification Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
            <Users className="mx-auto mb-3 text-blue-400" size={32} />
            <div className="text-3xl font-bold text-white mb-1">{recipients.length}</div>
            <div className="text-white/70">Total Recipients</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
            <Mail className="mx-auto mb-3 text-green-400" size={32} />
            <div className="text-3xl font-bold text-white mb-1">
              {recipients.filter(r => r.preferences.emailNotifications).length}
            </div>
            <div className="text-white/70">Email Enabled</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
            <MessageSquare className="mx-auto mb-3 text-orange-400" size={32} />
            <div className="text-3xl font-bold text-white mb-1">
              {recipients.filter(r => r.preferences.whatsappNotifications).length}
            </div>
            <div className="text-white/70">WhatsApp Enabled</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
            <Bell className="mx-auto mb-3 text-purple-400" size={32} />
            <div className="text-3xl font-bold text-white mb-1">{selectedRecipients.length}</div>
            <div className="text-white/70">Selected</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recipients Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                  <Users size={24} />
                  <span>Recipients</span>
                </h2>
                <button
                  onClick={() => setShowTemplateModal(true)}
                  className="bg-blue-500/20 text-blue-300 px-3 py-2 rounded-lg hover:bg-blue-500/30 transition-colors text-sm font-semibold"
                >
                  Templates
                </button>
              </div>

              {/* Team Filter */}
              <div className="mb-4">
                <select
                  value={filterTeam}
                  onChange={(e) => setFilterTeam(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <option value="" className="bg-gray-900">All Teams</option>
                  {getUniqueTeams().map(team => (
                    <option key={team} value={team} className="bg-gray-900">{team}</option>
                  ))}
                </select>
              </div>

              {/* Select All/None */}
              <div className="flex space-x-2 mb-4">
                <button
                  onClick={handleSelectAll}
                  className="flex-1 bg-green-500/20 text-green-300 py-2 px-3 rounded-lg hover:bg-green-500/30 transition-colors text-sm font-semibold"
                >
                  Select All
                </button>
                <button
                  onClick={handleDeselectAll}
                  className="flex-1 bg-red-500/20 text-red-300 py-2 px-3 rounded-lg hover:bg-red-500/30 transition-colors text-sm font-semibold"
                >
                  Clear All
                </button>
              </div>

              {/* Recipients List */}
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredRecipients.map(recipient => (
                  <div
                    key={recipient.id}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      selectedRecipients.includes(recipient.id)
                        ? 'bg-orange-500/20 border-orange-500/50'
                        : 'bg-white/5 border-white/10 hover:border-white/30'
                    }`}
                    onClick={() => handleRecipientToggle(recipient.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={selectedRecipients.includes(recipient.id)}
                        onChange={() => handleRecipientToggle(recipient.id)}
                        className="w-4 h-4 text-orange-500 bg-white/10 border-white/30 rounded focus:ring-orange-400 focus:ring-2"
                      />
                      <div className="flex-1">
                        <h3 className="text-white font-semibold">{recipient.name}</h3>
                        <div className="text-xs text-white/60">
                          {recipient.teams.join(', ')}
                        </div>
                        <div className="flex space-x-2 mt-1">
                          {recipient.preferences.emailNotifications && recipient.email && (
                            <Mail size={12} className="text-green-400" />
                          )}
                          {recipient.preferences.whatsappNotifications && recipient.phone && (
                            <MessageSquare size={12} className="text-blue-400" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Notification Composer */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                <Send size={24} />
                <span>Compose Notification</span>
              </h2>

              {/* Notification Type */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sendEmail}
                    onChange={(e) => setSendEmail(e.target.checked)}
                    className="w-4 h-4 text-orange-500 bg-white/10 border-white/30 rounded focus:ring-orange-400 focus:ring-2"
                  />
                  <Mail size={20} className="text-green-400" />
                  <span className="text-white">Send Email</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sendWhatsapp}
                    onChange={(e) => setSendWhatsapp(e.target.checked)}
                    className="w-4 h-4 text-orange-500 bg-white/10 border-white/30 rounded focus:ring-orange-400 focus:ring-2"
                  />
                  <MessageSquare size={20} className="text-blue-400" />
                  <span className="text-white">Send WhatsApp</span>
                </label>
              </div>

              {/* Subject (for email) */}
              {sendEmail && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-white/90 mb-2">Email Subject</label>
                  <input
                    type="text"
                    value={notificationSubject}
                    onChange={(e) => setNotificationSubject(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="Enter email subject..."
                  />
                </div>
              )}

              {/* Email Content */}
              {sendEmail && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-white/90 mb-2">Email Content</label>
                  <textarea
                    value={emailContent}
                    onChange={(e) => setEmailContent(e.target.value)}
                    rows={8}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                    placeholder="Enter email content... Use {{playerName}} for personalization."
                  />
                </div>
              )}

              {/* WhatsApp Content */}
              {sendWhatsapp && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-white/90 mb-2">WhatsApp Message</label>
                  <textarea
                    value={whatsappContent}
                    onChange={(e) => setWhatsappContent(e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                    placeholder="Enter WhatsApp message... Use {{playerName}} for personalization."
                  />
                </div>
              )}

              {/* Send Button */}
              <button
                onClick={handleSendNotifications}
                disabled={selectedRecipients.length === 0 || (!sendEmail && !sendWhatsapp)}
                className="w-full bg-gradient-to-r from-orange-500 to-green-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-green-700 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              >
                <Send size={20} />
                <span>Send Notifications ({selectedRecipients.length} recipients)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Template Modal */}
        {showTemplateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 w-full max-w-4xl border border-white/30 max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-bold text-white mb-6">Notification Templates</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {templates.map(template => (
                  <div
                    key={template.id}
                    className="bg-white/10 rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all cursor-pointer"
                    onClick={() => handleUseTemplate(template)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-bold text-white">{template.name}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        template.type === 'match' ? 'bg-red-500/20 text-red-300' :
                        template.type === 'practice' ? 'bg-blue-500/20 text-blue-300' :
                        template.type === 'meeting' ? 'bg-green-500/20 text-green-300' :
                        'bg-gray-500/20 text-gray-300'
                      }`}>
                        {template.type}
                      </span>
                    </div>
                    
                    <div className="text-white/80 text-sm mb-3">
                      <strong>Subject:</strong> {template.subject}
                    </div>
                    
                    <div className="text-white/60 text-xs mb-4">
                      Variables: {template.variables.join(', ')}
                    </div>
                    
                    <button className="w-full bg-orange-500/20 text-orange-300 py-2 px-4 rounded-lg hover:bg-orange-500/30 transition-colors text-sm font-semibold">
                      Use This Template
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-end mt-8">
                <button
                  onClick={() => setShowTemplateModal(false)}
                  className="bg-white/10 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}