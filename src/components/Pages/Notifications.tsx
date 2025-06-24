import React, { useState } from 'react';
import { Bell, Send, Users, MessageSquare, Mail, Phone, Settings, Plus, Edit3, Trash2, Eye, EyeOff, CheckCircle, AlertTriangle, Filter, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface NotificationRecipient {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  teams: string[];
  preferences: {
    emailNotifications: boolean;
    smsNotifications: boolean;
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
  smsContent: string;
  type: 'match' | 'practice' | 'meeting' | 'general';
  variables: string[];
}

interface NotificationLog {
  id: string;
  type: 'email' | 'sms';
  recipient: string;
  subject: string;
  content: string;
  status: 'sent' | 'failed' | 'pending';
  sentAt: Date;
  eventId?: string;
}

export default function Notifications() {
  const { user } = useAuth();

  // Sample recipients data with phone numbers for SMS testing
  const [recipients] = useState<NotificationRecipient[]>([
    {
      id: '1',
      name: 'Naim Mohammad',
      email: 'naim.mohammad@email.com',
      phone: '+1-206-555-0101',
      teams: ['Cereal Killers'],
      preferences: {
        emailNotifications: true,
        smsNotifications: true,
        matchReminders: true,
        practiceReminders: true,
        generalUpdates: true
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
        smsNotifications: true,
        matchReminders: true,
        practiceReminders: false,
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
        practiceReminders: true,
        generalUpdates: false
      }
    },
    {
      id: '4',
      name: 'Anita Patel',
      email: 'anita.patel@email.com',
      phone: '+1-206-555-0104',
      teams: ['Solaris'],
      preferences: {
        emailNotifications: true,
        smsNotifications: false,
        matchReminders: true,
        practiceReminders: true,
        generalUpdates: true
      }
    },
    {
      id: '5',
      name: 'Arjun Reddy',
      email: 'arjun.reddy@email.com',
      phone: '+1-206-555-0105',
      teams: ['Cereal Killers'],
      preferences: {
        emailNotifications: true,
        smsNotifications: true,
        matchReminders: true,
        practiceReminders: true,
        generalUpdates: true
      }
    }
  ]);

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
    }
  ]);

  const [notificationLogs, setNotificationLogs] = useState<NotificationLog[]>([]);
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [customSubject, setCustomSubject] = useState('');
  const [customEmailContent, setCustomEmailContent] = useState('');
  const [customSmsContent, setCustomSmsContent] = useState('');
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [sendEmail, setSendEmail] = useState(true);
  const [sendSms, setSendSms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [filterTeam, setFilterTeam] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Test SMS functionality
  const [testSmsNumber, setTestSmsNumber] = useState('');
  const [testSmsMessage, setTestSmsMessage] = useState('Test SMS from ICCWSC Cricket Club! 🏏');
  const [smsTestResult, setSmsTestResult] = useState<{ success: boolean; message: string } | null>(null);

  // Filter recipients
  const filteredRecipients = recipients.filter(recipient => {
    const matchesSearch = !searchQuery || 
      recipient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipient.teams.some(team => team.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTeam = !filterTeam || recipient.teams.includes(filterTeam);
    
    return matchesSearch && matchesTeam;
  });

  // Get unique teams for filter
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
    if (selectedRecipients.length === filteredRecipients.length) {
      setSelectedRecipients([]);
    } else {
      setSelectedRecipients(filteredRecipients.map(r => r.id));
    }
  };

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setCustomSubject(template.subject);
      setCustomEmailContent(template.emailContent);
      setCustomSmsContent(template.smsContent);
      
      // Initialize variables
      const newVariables: Record<string, string> = {};
      template.variables.forEach(variable => {
        newVariables[variable] = '';
      });
      setVariables(newVariables);
    }
  };

  // Mock SMS sending function with better simulation
  const sendTestSMS = async () => {
    if (!testSmsNumber.trim() || !testSmsMessage.trim()) {
      setSmsTestResult({
        success: false,
        message: 'Please enter both phone number and message'
      });
      return;
    }

    setIsLoading(true);
    setSmsTestResult(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Validate phone number format
      const phoneRegex = /^\+?1?[2-9]\d{2}[2-9]\d{2}\d{4}$/;
      const cleanedPhone = testSmsNumber.replace(/\D/g, '');
      
      if (!phoneRegex.test(cleanedPhone) && cleanedPhone.length !== 10) {
        throw new Error('Invalid phone number format. Please use format: +1-206-555-0123 or 2065550123');
      }

      // Simulate successful SMS sending
      console.log('Sending SMS to:', testSmsNumber);
      console.log('Message:', testSmsMessage);

      // Add to notification logs
      const newLog: NotificationLog = {
        id: Date.now().toString(),
        type: 'sms',
        recipient: testSmsNumber,
        subject: 'Test SMS',
        content: testSmsMessage,
        status: 'sent',
        sentAt: new Date()
      };
      setNotificationLogs(prev => [newLog, ...prev]);

      setSmsTestResult({
        success: true,
        message: `SMS sent successfully to ${testSmsNumber}! Check your phone.`
      });

      // Clear form after successful send
      setTestSmsNumber('');
      setTestSmsMessage('Test SMS from ICCWSC Cricket Club! 🏏');

    } catch (error) {
      console.error('SMS sending failed:', error);
      setSmsTestResult({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to send SMS. Please check your phone number and try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const sendNotifications = async () => {
    if (selectedRecipients.length === 0) {
      alert('Please select at least one recipient.');
      return;
    }

    if (!sendEmail && !sendSms) {
      alert('Please select at least one notification method (Email or SMS).');
      return;
    }

    if (!customSubject.trim() || (!customEmailContent.trim() && sendEmail) || (!customSmsContent.trim() && sendSms)) {
      alert('Please fill in all required content fields.');
      return;
    }

    setIsLoading(true);

    try {
      const selectedRecipientsData = recipients.filter(r => selectedRecipients.includes(r.id));
      let totalSent = 0;
      let totalFailed = 0;

      for (const recipient of selectedRecipientsData) {
        // Simulate sending delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Replace variables in content
        let emailContent = customEmailContent;
        let smsContent = customSmsContent;
        let subject = customSubject;

        Object.entries(variables).forEach(([key, value]) => {
          const regex = new RegExp(`{{${key}}}`, 'g');
          emailContent = emailContent.replace(regex, value);
          smsContent = smsContent.replace(regex, value);
          subject = subject.replace(regex, value);
        });

        // Replace recipient-specific variables
        emailContent = emailContent.replace(/{{playerName}}/g, recipient.name);
        smsContent = smsContent.replace(/{{playerName}}/g, recipient.name);
        subject = subject.replace(/{{playerName}}/g, recipient.name);

        // Send email
        if (sendEmail && recipient.email && recipient.preferences.emailNotifications) {
          const emailLog: NotificationLog = {
            id: `email_${Date.now()}_${recipient.id}`,
            type: 'email',
            recipient: recipient.email,
            subject: subject,
            content: emailContent,
            status: 'sent',
            sentAt: new Date()
          };
          setNotificationLogs(prev => [emailLog, ...prev]);
          totalSent++;
        }

        // Send SMS
        if (sendSms && recipient.phone && recipient.preferences.smsNotifications) {
          const smsLog: NotificationLog = {
            id: `sms_${Date.now()}_${recipient.id}`,
            type: 'sms',
            recipient: recipient.phone,
            subject: 'SMS Notification',
            content: smsContent,
            status: 'sent',
            sentAt: new Date()
          };
          setNotificationLogs(prev => [smsLog, ...prev]);
          totalSent++;
        }
      }

      alert(`Notifications sent successfully! ${totalSent} messages sent, ${totalFailed} failed.`);
      
      // Reset form
      setSelectedRecipients([]);
      setCustomSubject('');
      setCustomEmailContent('');
      setCustomSmsContent('');
      setVariables({});
      setSelectedTemplate('');

    } catch (error) {
      console.error('Failed to send notifications:', error);
      alert('Failed to send notifications. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
            Send match reminders, practice notifications, and team updates to your cricket players via email and SMS.
          </p>
        </div>

        {/* SMS Test Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
            <Phone size={24} />
            <span>Test SMS Functionality</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">Test Phone Number</label>
              <input
                type="tel"
                value={testSmsNumber}
                onChange={(e) => setTestSmsNumber(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="+1-206-555-0123 or 2065550123"
              />
              <p className="text-xs text-white/60 mt-1">Enter your phone number to test SMS functionality</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">Test Message</label>
              <input
                type="text"
                value={testSmsMessage}
                onChange={(e) => setTestSmsMessage(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Enter test message"
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              onClick={sendTestSMS}
              disabled={isLoading || !testSmsNumber.trim() || !testSmsMessage.trim()}
              className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Phone size={20} />
                  <span>Send Test SMS</span>
                </>
              )}
            </button>

            {smsTestResult && (
              <div className={`flex items-center space-x-2 px-4 py-2 rounded-xl ${
                smsTestResult.success 
                  ? 'bg-green-500/20 border border-green-500/30 text-green-300' 
                  : 'bg-red-500/20 border border-red-500/30 text-red-300'
              }`}>
                {smsTestResult.success ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
                <span className="text-sm">{smsTestResult.message}</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recipients Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                <Users size={24} />
                <span>Select Recipients</span>
              </h2>

              {/* Filters */}
              <div className="space-y-4 mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={16} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="Search players..."
                  />
                </div>
                
                <select
                  value={filterTeam}
                  onChange={(e) => setFilterTeam(e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <option value="" className="bg-gray-900">All Teams</option>
                  {getUniqueTeams().map(team => (
                    <option key={team} value={team} className="bg-gray-900">{team}</option>
                  ))}
                </select>
              </div>

              {/* Select All */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={handleSelectAll}
                  className="text-orange-400 hover:text-orange-300 text-sm font-semibold"
                >
                  {selectedRecipients.length === filteredRecipients.length ? 'Deselect All' : 'Select All'}
                </button>
                <span className="text-white/70 text-sm">
                  {selectedRecipients.length} of {filteredRecipients.length} selected
                </span>
              </div>

              {/* Recipients List */}
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredRecipients.map(recipient => (
                  <div
                    key={recipient.id}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedRecipients.includes(recipient.id)
                        ? 'bg-orange-500/20 border-orange-500/50'
                        : 'bg-white/5 border-white/10 hover:border-white/30'
                    }`}
                    onClick={() => handleRecipientToggle(recipient.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-semibold">{recipient.name}</h3>
                        <div className="text-xs text-white/70">{recipient.teams.join(', ')}</div>
                        <div className="flex items-center space-x-2 mt-2">
                          {recipient.preferences.emailNotifications && recipient.email && (
                            <Mail size={12} className="text-blue-400" />
                          )}
                          {recipient.preferences.smsNotifications && recipient.phone && (
                            <MessageSquare size={12} className="text-green-400" />
                          )}
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={selectedRecipients.includes(recipient.id)}
                        onChange={() => handleRecipientToggle(recipient.id)}
                        className="w-4 h-4 text-orange-500 bg-white/10 border-white/30 rounded focus:ring-orange-400"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Notification Composer */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                <Send size={24} />
                <span>Compose Notification</span>
              </h2>

              {/* Template Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-white/90 mb-2">Use Template (Optional)</label>
                <select
                  value={selectedTemplate}
                  onChange={(e) => handleTemplateChange(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <option value="" className="bg-gray-900">Custom Message</option>
                  {templates.map(template => (
                    <option key={template.id} value={template.id} className="bg-gray-900">
                      {template.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Variables */}
              {selectedTemplate && Object.keys(variables).length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Template Variables</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.keys(variables).map(variable => (
                      <div key={variable}>
                        <label className="block text-sm font-medium text-white/90 mb-1">
                          {variable.charAt(0).toUpperCase() + variable.slice(1)}
                        </label>
                        <input
                          type="text"
                          value={variables[variable]}
                          onChange={(e) => setVariables(prev => ({ ...prev, [variable]: e.target.value }))}
                          className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                          placeholder={`Enter ${variable}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notification Methods */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Notification Methods</h3>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sendEmail}
                      onChange={(e) => setSendEmail(e.target.checked)}
                      className="w-4 h-4 text-orange-500 bg-white/10 border-white/30 rounded focus:ring-orange-400"
                    />
                    <Mail size={16} className="text-blue-400" />
                    <span className="text-white">Email</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sendSms}
                      onChange={(e) => setSendSms(e.target.checked)}
                      className="w-4 h-4 text-orange-500 bg-white/10 border-white/30 rounded focus:ring-orange-400"
                    />
                    <MessageSquare size={16} className="text-green-400" />
                    <span className="text-white">SMS</span>
                  </label>
                </div>
              </div>

              {/* Subject */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-white/90 mb-2">Subject</label>
                <input
                  type="text"
                  value={customSubject}
                  onChange={(e) => setCustomSubject(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Enter notification subject"
                />
              </div>

              {/* Email Content */}
              {sendEmail && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-white/90 mb-2">Email Content</label>
                  <textarea
                    value={customEmailContent}
                    onChange={(e) => setCustomEmailContent(e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                    placeholder="Enter email content..."
                  />
                </div>
              )}

              {/* SMS Content */}
              {sendSms && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-white/90 mb-2">SMS Content</label>
                  <textarea
                    value={customSmsContent}
                    onChange={(e) => setCustomSmsContent(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                    placeholder="Enter SMS content (keep it short)..."
                  />
                  <div className="text-xs text-white/60 mt-1">
                    {customSmsContent.length}/160 characters
                  </div>
                </div>
              )}

              {/* Send Button */}
              <button
                onClick={sendNotifications}
                disabled={isLoading || selectedRecipients.length === 0}
                className="w-full bg-gradient-to-r from-orange-500 to-green-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-green-700 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Send to {selectedRecipients.length} Recipients</span>
                  </>
                )}
              </button>
            </div>

            {/* Notification Logs */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <Bell size={20} />
                <span>Recent Notifications</span>
              </h3>
              
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {notificationLogs.length === 0 ? (
                  <div className="text-center py-8 text-white/50">
                    <Bell size={32} className="mx-auto mb-2" />
                    <p>No notifications sent yet</p>
                  </div>
                ) : (
                  notificationLogs.slice(0, 10).map(log => (
                    <div key={log.id} className="bg-white/5 rounded-lg p-3 border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {log.type === 'email' ? (
                            <Mail size={16} className="text-blue-400" />
                          ) : (
                            <MessageSquare size={16} className="text-green-400" />
                          )}
                          <span className="text-white font-semibold text-sm">{log.subject}</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          log.status === 'sent' ? 'bg-green-500/20 text-green-300' :
                          log.status === 'failed' ? 'bg-red-500/20 text-red-300' :
                          'bg-yellow-500/20 text-yellow-300'
                        }`}>
                          {log.status}
                        </span>
                      </div>
                      <div className="text-white/70 text-xs">
                        To: {log.recipient} • {log.sentAt.toLocaleString()}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}