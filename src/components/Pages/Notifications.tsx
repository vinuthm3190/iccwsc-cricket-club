import React, { useState } from 'react';
import { Mail, MessageSquare, Send, Users, Settings, Bell, CheckCircle, AlertTriangle, Clock, Plus, Edit3, Trash2, Eye } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { NotificationTemplate, NotificationRecipient, NotificationLog } from '../../types';

export default function Notifications() {
  const { hasPermission } = useAuth();
  const canManageNotifications = hasPermission(['captain', 'admin']);

  const [activeTab, setActiveTab] = useState<'send' | 'templates' | 'recipients' | 'logs' | 'settings'>('send');
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showRecipientModal, setShowRecipientModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<NotificationTemplate | null>(null);
  const [selectedRecipient, setSelectedRecipient] = useState<NotificationRecipient | null>(null);

  // Sample notification templates
  const [templates, setTemplates] = useState<NotificationTemplate[]>([
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
      smsContent: 'Cricket match tomorrow! {{teamName}} vs {{opponent}} at {{time}}, {{location}}. Arrive 30 min early. Good luck!',
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
      smsContent: 'Cricket practice {{date}} at {{time}}, {{location}}. Focus: {{description}}. Bring gear!',
      type: 'practice',
      variables: ['playerName', 'date', 'time', 'location', 'description']
    },
    {
      id: '3',
      name: 'Team Meeting',
      subject: 'Team Meeting - {{date}}',
      emailContent: `Hello {{playerName}},

We have an important team meeting scheduled:

📋 Meeting Details:
- Date: {{date}}
- Time: {{time}}
- Venue: {{location}}
- Agenda: {{description}}

Your attendance is important for team coordination.

Thanks,
{{senderName}}`,
      smsContent: 'Team meeting {{date}} at {{time}}, {{location}}. Agenda: {{description}}. Please attend.',
      type: 'meeting',
      variables: ['playerName', 'date', 'time', 'location', 'description', 'senderName']
    }
  ]);

  // Sample recipients
  const [recipients, setRecipients] = useState<NotificationRecipient[]>([
    {
      id: '1',
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@email.com',
      phone: '+1-206-555-0101',
      teams: ['Angry Bulls'],
      preferences: {
        emailNotifications: true,
        smsNotifications: true,
        matchReminders: true,
        practiceReminders: true,
        generalUpdates: false
      }
    },
    {
      id: '2',
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+1-206-555-0102',
      teams: ['Royal Warriors'],
      preferences: {
        emailNotifications: true,
        smsNotifications: false,
        matchReminders: true,
        practiceReminders: true,
        generalUpdates: true
      }
    },
    {
      id: '3',
      name: 'Vikram Singh',
      email: 'vikram.singh@email.com',
      phone: '+1-206-555-0103',
      teams: ['Watermelons'],
      preferences: {
        emailNotifications: false,
        smsNotifications: true,
        matchReminders: true,
        practiceReminders: false,
        generalUpdates: false
      }
    }
  ]);

  // Sample notification logs
  const [notificationLogs] = useState<NotificationLog[]>([
    {
      id: '1',
      type: 'email',
      recipient: 'rajesh.kumar@email.com',
      subject: 'Cricket Match Tomorrow - Angry Bulls vs Royal Warriors',
      content: 'Match reminder email sent',
      status: 'sent',
      sentAt: new Date('2024-12-20T10:30:00'),
      eventId: 'match-001'
    },
    {
      id: '2',
      type: 'sms',
      recipient: '+1-206-555-0103',
      subject: 'Practice Reminder',
      content: 'Cricket practice today at 6 PM, Marymoor Park. Bring gear!',
      status: 'sent',
      sentAt: new Date('2024-12-20T09:15:00'),
      eventId: 'practice-001'
    },
    {
      id: '3',
      type: 'email',
      recipient: 'priya.sharma@email.com',
      subject: 'Team Meeting - December 21',
      content: 'Team meeting notification',
      status: 'failed',
      sentAt: new Date('2024-12-20T08:45:00'),
      eventId: 'meeting-001'
    }
  ]);

  const [newNotification, setNewNotification] = useState({
    templateId: '',
    recipients: [] as string[],
    customSubject: '',
    customEmailContent: '',
    customSmsContent: '',
    sendEmail: true,
    sendSms: false,
    scheduleDate: '',
    scheduleTime: ''
  });

  const [newTemplate, setNewTemplate] = useState<Partial<NotificationTemplate>>({
    name: '',
    subject: '',
    emailContent: '',
    smsContent: '',
    type: 'general',
    variables: []
  });

  const [newRecipient, setNewRecipient] = useState<Partial<NotificationRecipient>>({
    name: '',
    email: '',
    phone: '',
    teams: [],
    preferences: {
      emailNotifications: true,
      smsNotifications: true,
      matchReminders: true,
      practiceReminders: true,
      generalUpdates: false
    }
  });

  const availableTeams = [
    'Angry Bulls', 'Royal Warriors', 'Cereal Killers',
    'Watermelons Adult', 'Watermelons Youth',
    'Solaris Adult', 'Solaris Youth'
  ];

  const handleSendNotification = () => {
    if (!newNotification.templateId && !newNotification.customSubject) {
      alert('Please select a template or enter a custom subject.');
      return;
    }

    if (newNotification.recipients.length === 0) {
      alert('Please select at least one recipient.');
      return;
    }

    // Simulate sending notification
    const template = templates.find(t => t.id === newNotification.templateId);
    const recipientCount = newNotification.recipients.length;
    const emailCount = newNotification.sendEmail ? recipientCount : 0;
    const smsCount = newNotification.sendSms ? recipientCount : 0;

    console.log('Sending notification:', {
      template: template?.name || 'Custom',
      recipients: newNotification.recipients,
      emailCount,
      smsCount,
      scheduled: newNotification.scheduleDate ? `${newNotification.scheduleDate} ${newNotification.scheduleTime}` : 'Immediate'
    });

    alert(`Notification sent successfully!\n\n📧 Emails: ${emailCount}\n📱 SMS: ${smsCount}\n👥 Recipients: ${recipientCount}`);

    // Reset form
    setNewNotification({
      templateId: '',
      recipients: [],
      customSubject: '',
      customEmailContent: '',
      customSmsContent: '',
      sendEmail: true,
      sendSms: false,
      scheduleDate: '',
      scheduleTime: ''
    });
  };

  const handleSaveTemplate = () => {
    if (!newTemplate.name || !newTemplate.subject) {
      alert('Please fill in template name and subject.');
      return;
    }

    const template: NotificationTemplate = {
      id: Date.now().toString(),
      name: newTemplate.name!,
      subject: newTemplate.subject!,
      emailContent: newTemplate.emailContent || '',
      smsContent: newTemplate.smsContent || '',
      type: newTemplate.type as NotificationTemplate['type'],
      variables: newTemplate.variables || []
    };

    if (selectedTemplate) {
      setTemplates(prev => prev.map(t => t.id === selectedTemplate.id ? { ...template, id: selectedTemplate.id } : t));
      alert('Template updated successfully!');
    } else {
      setTemplates(prev => [...prev, template]);
      alert('Template created successfully!');
    }

    setShowTemplateModal(false);
    setSelectedTemplate(null);
    setNewTemplate({
      name: '',
      subject: '',
      emailContent: '',
      smsContent: '',
      type: 'general',
      variables: []
    });
  };

  const handleSaveRecipient = () => {
    if (!newRecipient.name || (!newRecipient.email && !newRecipient.phone)) {
      alert('Please fill in name and at least one contact method.');
      return;
    }

    const recipient: NotificationRecipient = {
      id: Date.now().toString(),
      name: newRecipient.name!,
      email: newRecipient.email,
      phone: newRecipient.phone,
      teams: newRecipient.teams || [],
      preferences: newRecipient.preferences!
    };

    if (selectedRecipient) {
      setRecipients(prev => prev.map(r => r.id === selectedRecipient.id ? { ...recipient, id: selectedRecipient.id } : r));
      alert('Recipient updated successfully!');
    } else {
      setRecipients(prev => [...prev, recipient]);
      alert('Recipient added successfully!');
    }

    setShowRecipientModal(false);
    setSelectedRecipient(null);
    setNewRecipient({
      name: '',
      email: '',
      phone: '',
      teams: [],
      preferences: {
        emailNotifications: true,
        smsNotifications: true,
        matchReminders: true,
        practiceReminders: true,
        generalUpdates: false
      }
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return <CheckCircle className="text-green-400" size={16} />;
      case 'failed': return <AlertTriangle className="text-red-400" size={16} />;
      case 'pending': return <Clock className="text-yellow-400" size={16} />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'text-green-400';
      case 'failed': return 'text-red-400';
      case 'pending': return 'text-yellow-400';
      default: return 'text-white';
    }
  };

  if (!canManageNotifications) {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-blue-500/20 backdrop-blur-lg rounded-2xl p-8 border border-blue-500/30 text-center">
            <Bell className="mx-auto mb-4 text-blue-400" size={48} />
            <h2 className="text-2xl font-bold text-white mb-4">Notification Management</h2>
            <p className="text-blue-200">
              Only team captains and administrators can manage notifications.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Cricket
            <span className="bg-gradient-to-r from-orange-400 to-green-400 bg-clip-text text-transparent">
              {' '}Notifications
            </span>
          </h1>
          <p className="text-white/70 text-lg">
            Send email and SMS notifications to players and team members
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-2 border border-white/20 mb-8">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'send', label: 'Send Notification', icon: Send },
              { id: 'templates', label: 'Templates', icon: Mail },
              { id: 'recipients', label: 'Recipients', icon: Users },
              { id: 'logs', label: 'Logs', icon: Eye },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-orange-500 to-green-600 text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Send Notification Tab */}
        {activeTab === 'send' && (
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
              <Send size={24} />
              <span>Send Notification</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Configuration */}
              <div className="space-y-6">
                {/* Template Selection */}
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">Template</label>
                  <select
                    value={newNotification.templateId}
                    onChange={(e) => {
                      setNewNotification({ ...newNotification, templateId: e.target.value });
                      if (e.target.value) {
                        const template = templates.find(t => t.id === e.target.value);
                        if (template) {
                          setNewNotification(prev => ({
                            ...prev,
                            customSubject: template.subject,
                            customEmailContent: template.emailContent,
                            customSmsContent: template.smsContent
                          }));
                        }
                      }
                    }}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                  >
                    <option value="" className="bg-gray-900">Select a template or create custom</option>
                    {templates.map(template => (
                      <option key={template.id} value={template.id} className="bg-gray-900">
                        {template.name} ({template.type})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Recipients */}
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">Recipients</label>
                  <div className="bg-white/5 rounded-lg p-4 border border-white/20 max-h-48 overflow-y-auto">
                    {recipients.map(recipient => (
                      <label
                        key={recipient.id}
                        className="flex items-center space-x-3 p-2 hover:bg-white/10 rounded-lg cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={newNotification.recipients.includes(recipient.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewNotification(prev => ({
                                ...prev,
                                recipients: [...prev.recipients, recipient.id]
                              }));
                            } else {
                              setNewNotification(prev => ({
                                ...prev,
                                recipients: prev.recipients.filter(id => id !== recipient.id)
                              }));
                            }
                          }}
                          className="w-4 h-4 text-orange-500 bg-white/10 border-white/30 rounded focus:ring-orange-400"
                        />
                        <div className="flex-1">
                          <div className="text-white font-semibold">{recipient.name}</div>
                          <div className="text-white/60 text-sm">
                            {recipient.teams.join(', ')} • 
                            {recipient.email && ' 📧'} 
                            {recipient.phone && ' 📱'}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Delivery Options */}
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg border border-white/20 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newNotification.sendEmail}
                      onChange={(e) => setNewNotification({ ...newNotification, sendEmail: e.target.checked })}
                      className="w-4 h-4 text-orange-500 bg-white/10 border-white/30 rounded focus:ring-orange-400"
                    />
                    <Mail size={20} className="text-blue-400" />
                    <span className="text-white font-semibold">Send Email</span>
                  </label>
                  <label className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg border border-white/20 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newNotification.sendSms}
                      onChange={(e) => setNewNotification({ ...newNotification, sendSms: e.target.checked })}
                      className="w-4 h-4 text-orange-500 bg-white/10 border-white/30 rounded focus:ring-orange-400"
                    />
                    <MessageSquare size={20} className="text-green-400" />
                    <span className="text-white font-semibold">Send SMS</span>
                  </label>
                </div>

                {/* Schedule Options */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Schedule Date (Optional)</label>
                    <input
                      type="date"
                      value={newNotification.scheduleDate}
                      onChange={(e) => setNewNotification({ ...newNotification, scheduleDate: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Schedule Time</label>
                    <input
                      type="time"
                      value={newNotification.scheduleTime}
                      onChange={(e) => setNewNotification({ ...newNotification, scheduleTime: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                      disabled={!newNotification.scheduleDate}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column - Content */}
              <div className="space-y-6">
                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">Subject</label>
                  <input
                    type="text"
                    value={newNotification.customSubject}
                    onChange={(e) => setNewNotification({ ...newNotification, customSubject: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="Enter notification subject"
                  />
                </div>

                {/* Email Content */}
                {newNotification.sendEmail && (
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Email Content</label>
                    <textarea
                      value={newNotification.customEmailContent}
                      onChange={(e) => setNewNotification({ ...newNotification, customEmailContent: e.target.value })}
                      rows={8}
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                      placeholder="Enter email content..."
                    />
                  </div>
                )}

                {/* SMS Content */}
                {newNotification.sendSms && (
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">SMS Content</label>
                    <textarea
                      value={newNotification.customSmsContent}
                      onChange={(e) => setNewNotification({ ...newNotification, customSmsContent: e.target.value })}
                      rows={4}
                      maxLength={160}
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                      placeholder="Enter SMS content (max 160 characters)..."
                    />
                    <div className="text-right text-white/60 text-sm mt-1">
                      {newNotification.customSmsContent.length}/160 characters
                    </div>
                  </div>
                )}

                {/* Send Button */}
                <button
                  onClick={handleSendNotification}
                  disabled={!newNotification.customSubject || newNotification.recipients.length === 0}
                  className="w-full bg-gradient-to-r from-orange-500 to-green-600 text-white py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-green-700 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                >
                  <Send size={20} />
                  <span>
                    {newNotification.scheduleDate ? 'Schedule Notification' : 'Send Now'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Templates Tab */}
        {activeTab === 'templates' && (
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                <Mail size={24} />
                <span>Notification Templates</span>
              </h2>
              <button
                onClick={() => {
                  setSelectedTemplate(null);
                  setNewTemplate({
                    name: '',
                    subject: '',
                    emailContent: '',
                    smsContent: '',
                    type: 'general',
                    variables: []
                  });
                  setShowTemplateModal(true);
                }}
                className="bg-gradient-to-r from-orange-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-green-700 transition-all flex items-center space-x-2"
              >
                <Plus size={20} />
                <span>Add Template</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map(template => (
                <div key={template.id} className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">{template.name}</h3>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-2 ${
                        template.type === 'match' ? 'bg-red-500/20 text-red-300' :
                        template.type === 'practice' ? 'bg-blue-500/20 text-blue-300' :
                        template.type === 'meeting' ? 'bg-green-500/20 text-green-300' :
                        'bg-gray-500/20 text-gray-300'
                      }`}>
                        {template.type}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedTemplate(template);
                          setNewTemplate(template);
                          setShowTemplateModal(true);
                        }}
                        className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete template "${template.name}"?`)) {
                            setTemplates(prev => prev.filter(t => t.id !== template.id));
                          }
                        }}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="text-white/80 text-sm font-semibold">Subject:</div>
                      <div className="text-white/60 text-sm">{template.subject}</div>
                    </div>
                    <div>
                      <div className="text-white/80 text-sm font-semibold">Variables:</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {template.variables.map(variable => (
                          <span key={variable} className="bg-orange-500/20 text-orange-300 px-2 py-1 rounded text-xs">
                            {variable}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recipients Tab */}
        {activeTab === 'recipients' && (
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                <Users size={24} />
                <span>Notification Recipients</span>
              </h2>
              <button
                onClick={() => {
                  setSelectedRecipient(null);
                  setNewRecipient({
                    name: '',
                    email: '',
                    phone: '',
                    teams: [],
                    preferences: {
                      emailNotifications: true,
                      smsNotifications: true,
                      matchReminders: true,
                      practiceReminders: true,
                      generalUpdates: false
                    }
                  });
                  setShowRecipientModal(true);
                }}
                className="bg-gradient-to-r from-orange-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-green-700 transition-all flex items-center space-x-2"
              >
                <Plus size={20} />
                <span>Add Recipient</span>
              </button>
            </div>

            <div className="space-y-4">
              {recipients.map(recipient => (
                <div key={recipient.id} className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-lg font-bold text-white">{recipient.name}</h3>
                        <div className="flex space-x-2">
                          {recipient.email && (
                            <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs flex items-center space-x-1">
                              <Mail size={12} />
                              <span>Email</span>
                            </span>
                          )}
                          {recipient.phone && (
                            <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs flex items-center space-x-1">
                              <MessageSquare size={12} />
                              <span>SMS</span>
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-white/80 font-semibold">Contact:</div>
                          <div className="text-white/60">
                            {recipient.email && <div>📧 {recipient.email}</div>}
                            {recipient.phone && <div>📱 {recipient.phone}</div>}
                          </div>
                        </div>
                        <div>
                          <div className="text-white/80 font-semibold">Teams:</div>
                          <div className="text-white/60">
                            {recipient.teams.join(', ') || 'No teams assigned'}
                          </div>
                        </div>
                        <div>
                          <div className="text-white/80 font-semibold">Preferences:</div>
                          <div className="text-white/60">
                            {Object.entries(recipient.preferences)
                              .filter(([_, enabled]) => enabled)
                              .map(([key, _]) => key.replace(/([A-Z])/g, ' $1').toLowerCase())
                              .join(', ')}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedRecipient(recipient);
                          setNewRecipient(recipient);
                          setShowRecipientModal(true);
                        }}
                        className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Remove recipient "${recipient.name}"?`)) {
                            setRecipients(prev => prev.filter(r => r.id !== recipient.id));
                          }
                        }}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Logs Tab */}
        {activeTab === 'logs' && (
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
              <Eye size={24} />
              <span>Notification Logs</span>
            </h2>

            <div className="space-y-4">
              {notificationLogs.map(log => (
                <div key={log.id} className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="flex items-center space-x-2">
                          {log.type === 'email' ? <Mail size={16} className="text-blue-400" /> : <MessageSquare size={16} className="text-green-400" />}
                          <span className="text-white font-semibold">{log.subject}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(log.status)}
                          <span className={`text-sm font-semibold ${getStatusColor(log.status)}`}>
                            {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-white/70">
                        <div>
                          <span className="font-semibold">Recipient:</span> {log.recipient}
                        </div>
                        <div>
                          <span className="font-semibold">Sent:</span> {log.sentAt.toLocaleString()}
                        </div>
                        <div>
                          <span className="font-semibold">Type:</span> {log.type.toUpperCase()}
                        </div>
                      </div>
                      
                      {log.content && (
                        <div className="mt-3 p-3 bg-white/5 rounded-lg">
                          <div className="text-white/60 text-sm">{log.content}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
              <Settings size={24} />
              <span>Notification Settings</span>
            </h2>

            <div className="space-y-8">
              {/* Email Settings */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                  <Mail size={20} />
                  <span>Email Configuration</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Email Provider</label>
                    <select className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-400">
                      <option value="emailjs" className="bg-gray-900">EmailJS (Recommended)</option>
                      <option value="sendgrid" className="bg-gray-900">SendGrid</option>
                      <option value="mailgun" className="bg-gray-900">Mailgun</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">From Email</label>
                    <input
                      type="email"
                      defaultValue="noreply@iccwsc.com"
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>
                </div>
              </div>

              {/* SMS Settings */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                  <MessageSquare size={20} />
                  <span>SMS Configuration</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">SMS Provider</label>
                    <select className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-400">
                      <option value="twilio" className="bg-gray-900">Twilio (Recommended)</option>
                      <option value="nexmo" className="bg-gray-900">Vonage (Nexmo)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">From Number</label>
                    <input
                      type="tel"
                      defaultValue="+1-206-555-CRICKET"
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>
                </div>
              </div>

              {/* API Keys */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-bold text-white mb-4">API Configuration</h3>
                <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-4 mb-4">
                  <div className="flex items-center space-x-2 text-yellow-300">
                    <AlertTriangle size={16} />
                    <span className="text-sm font-semibold">Setup Required</span>
                  </div>
                  <p className="text-yellow-200 text-sm mt-1">
                    To enable email and SMS notifications, you'll need to configure API keys for your chosen providers.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">EmailJS Service ID</label>
                    <input
                      type="text"
                      placeholder="Enter your EmailJS service ID"
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Twilio Account SID</label>
                    <input
                      type="text"
                      placeholder="Enter your Twilio Account SID"
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <button className="w-full bg-gradient-to-r from-orange-500 to-green-600 text-white py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-green-700 transition-all">
                Save Settings
              </button>
            </div>
          </div>
        )}

        {/* Template Modal */}
        {showTemplateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 w-full max-w-4xl border border-white/30 max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-bold text-white mb-6">
                {selectedTemplate ? 'Edit Template' : 'Create New Template'}
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Template Name *</label>
                    <input
                      type="text"
                      value={newTemplate.name || ''}
                      onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                      placeholder="Enter template name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Type</label>
                    <select
                      value={newTemplate.type || 'general'}
                      onChange={(e) => setNewTemplate({ ...newTemplate, type: e.target.value as NotificationTemplate['type'] })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                    >
                      <option value="general" className="bg-gray-900">General</option>
                      <option value="match" className="bg-gray-900">Match</option>
                      <option value="practice" className="bg-gray-900">Practice</option>
                      <option value="meeting" className="bg-gray-900">Meeting</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Subject *</label>
                    <input
                      type="text"
                      value={newTemplate.subject || ''}
                      onChange={(e) => setNewTemplate({ ...newTemplate, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                      placeholder="Enter email subject"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">SMS Content</label>
                    <textarea
                      value={newTemplate.smsContent || ''}
                      onChange={(e) => setNewTemplate({ ...newTemplate, smsContent: e.target.value })}
                      rows={4}
                      maxLength={160}
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                      placeholder="Enter SMS content (max 160 characters)"
                    />
                    <div className="text-right text-white/60 text-sm mt-1">
                      {(newTemplate.smsContent || '').length}/160 characters
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">Email Content</label>
                  <textarea
                    value={newTemplate.emailContent || ''}
                    onChange={(e) => setNewTemplate({ ...newTemplate, emailContent: e.target.value })}
                    rows={12}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                    placeholder="Enter email content..."
                  />
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-500/20 border border-blue-500/30 rounded-xl">
                <div className="text-blue-300 text-sm font-semibold mb-2">Available Variables:</div>
                <div className="text-blue-200 text-sm">
                  Use these variables in your templates: {{playerName}}, {{teamName}}, {{date}}, {{time}}, {{location}}, {{description}}, {{opponent}}, {{senderName}}
                </div>
              </div>
              
              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => {
                    setShowTemplateModal(false);
                    setSelectedTemplate(null);
                    setNewTemplate({
                      name: '',
                      subject: '',
                      emailContent: '',
                      smsContent: '',
                      type: 'general',
                      variables: []
                    });
                  }}
                  className="flex-1 bg-white/10 text-white py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveTemplate}
                  disabled={!newTemplate.name || !newTemplate.subject}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {selectedTemplate ? 'Update Template' : 'Create Template'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Recipient Modal */}
        {showRecipientModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 w-full max-w-2xl border border-white/30 max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-bold text-white mb-6">
                {selectedRecipient ? 'Edit Recipient' : 'Add New Recipient'}
              </h3>
              
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Name *</label>
                    <input
                      type="text"
                      value={newRecipient.name || ''}
                      onChange={(e) => setNewRecipient({ ...newRecipient, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Email</label>
                    <input
                      type="email"
                      value={newRecipient.email || ''}
                      onChange={(e) => setNewRecipient({ ...newRecipient, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                      placeholder="Enter email address"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={newRecipient.phone || ''}
                    onChange={(e) => setNewRecipient({ ...newRecipient, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="Enter phone number (e.g., +1-206-555-0123)"
                  />
                </div>

                {/* Team Assignment */}
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">Teams</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-32 overflow-y-auto bg-white/5 rounded-lg p-4 border border-white/20">
                    {availableTeams.map(team => (
                      <label
                        key={team}
                        className="flex items-center space-x-2 cursor-pointer hover:bg-white/10 p-2 rounded-lg transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={(newRecipient.teams || []).includes(team)}
                          onChange={(e) => {
                            const teams = newRecipient.teams || [];
                            if (e.target.checked) {
                              setNewRecipient({ ...newRecipient, teams: [...teams, team] });
                            } else {
                              setNewRecipient({ ...newRecipient, teams: teams.filter(t => t !== team) });
                            }
                          }}
                          className="w-4 h-4 text-orange-500 bg-white/10 border-white/30 rounded focus:ring-orange-400"
                        />
                        <span className="text-white text-sm">{team}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Preferences */}
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-3">Notification Preferences</label>
                  <div className="space-y-3">
                    {[
                      { key: 'emailNotifications', label: 'Email Notifications' },
                      { key: 'smsNotifications', label: 'SMS Notifications' },
                      { key: 'matchReminders', label: 'Match Reminders' },
                      { key: 'practiceReminders', label: 'Practice Reminders' },
                      { key: 'generalUpdates', label: 'General Updates' }
                    ].map(pref => (
                      <label
                        key={pref.key}
                        className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/20 cursor-pointer hover:bg-white/10 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={newRecipient.preferences?.[pref.key as keyof typeof newRecipient.preferences] || false}
                          onChange={(e) => setNewRecipient({
                            ...newRecipient,
                            preferences: {
                              ...newRecipient.preferences!,
                              [pref.key]: e.target.checked
                            }
                          })}
                          className="w-4 h-4 text-orange-500 bg-white/10 border-white/30 rounded focus:ring-orange-400"
                        />
                        <span className="text-white font-semibold">{pref.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => {
                    setShowRecipientModal(false);
                    setSelectedRecipient(null);
                    setNewRecipient({
                      name: '',
                      email: '',
                      phone: '',
                      teams: [],
                      preferences: {
                        emailNotifications: true,
                        smsNotifications: true,
                        matchReminders: true,
                        practiceReminders: true,
                        generalUpdates: false
                      }
                    });
                  }}
                  className="flex-1 bg-white/10 text-white py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveRecipient}
                  disabled={!newRecipient.name || (!newRecipient.email && !newRecipient.phone)}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {selectedRecipient ? 'Update Recipient' : 'Add Recipient'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}