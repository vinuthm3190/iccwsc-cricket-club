import React, { useState } from 'react';
import { Bell, Send, Users, MessageSquare, Mail, Settings, Plus, Edit3, Trash2, Eye, EyeOff, CheckCircle, AlertTriangle, Filter, Search, Phone } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { testWhatsAppFunctionality, generateCricketWhatsAppMessage, sendImmediateWhatsAppToAll } from '../../services/whatsappService';

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

interface NotificationLog {
  id: string;
  type: 'email' | 'whatsapp';
  recipient: string;
  subject: string;
  content: string;
  status: 'sent' | 'failed' | 'pending';
  sentAt: Date;
  eventId?: string;
}

export default function Notifications() {
  const { user, hasPermission } = useAuth();
  const canEditContacts = hasPermission(['captain', 'vice', 'admin']);

  // Complete cricket players database with WhatsApp preferences
  const [recipients, setRecipients] = useState<NotificationRecipient[]>([
    // Cereal Killers players (all 14 players)
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
        whatsappNotifications: true,
        matchReminders: true,
        practiceReminders: true,
        generalUpdates: true
      }
    },
    {
      id: '3',
      name: 'Darshan Masti Prakash',
      email: 'darshan.prakash@email.com',
      phone: '+1-206-555-0103',
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
        generalUpdates: true
      }
    },
    {
      id: '6',
      name: 'Vidhyadhar Ghorpade',
      email: 'vidhyadhar.ghorpade@email.com',
      phone: '+1-206-555-0106',
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
      id: '7',
      name: 'Vijeth Shetty',
      email: 'vijeth.shetty@email.com',
      phone: '+1-206-555-0107',
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
      id: '8',
      name: 'Kiran S',
      email: 'kiran.s@email.com',
      phone: '+1-206-555-0108',
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
      id: '9',
      name: 'Manjunatha Shetty Kondalli',
      email: 'manjunatha.kondalli@email.com',
      phone: '+1-206-555-0109',
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
      id: '10',
      name: 'Raj Mani N',
      email: 'raj.mani@email.com',
      phone: '+1-206-555-0110',
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
      id: '11',
      name: 'Arun Thippur Jayakeerthy',
      email: 'arun.jayakeerthy@email.com',
      phone: '+1-206-555-0111',
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
      id: '12',
      name: 'Avinash Talanki',
      email: 'avinash.talanki@email.com',
      phone: '+1-206-555-0112',
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
      id: '13',
      name: 'Dhanush Shetty CK',
      email: 'dhanush.shetty@email.com',
      phone: '+1-206-555-0113',
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
      id: '14',
      name: 'Siva Krapa',
      email: 'siva.krapa@email.com',
      phone: '+1-206-555-0114',
      teams: ['Cereal Killers'],
      preferences: {
        emailNotifications: true,
        whatsappNotifications: true,
        matchReminders: true,
        practiceReminders: true,
        generalUpdates: true
      }
    },

    // Angry Bulls players
    {
      id: '15',
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@email.com',
      phone: '+1-206-555-0115',
      teams: ['Angry Bulls'],
      preferences: {
        emailNotifications: true,
        whatsappNotifications: true,
        matchReminders: true,
        practiceReminders: true,
        generalUpdates: true
      }
    },
    {
      id: '16',
      name: 'Kavya Iyer',
      email: 'kavya.iyer@email.com',
      phone: '+1-206-555-0116',
      teams: ['Angry Bulls'],
      preferences: {
        emailNotifications: true,
        whatsappNotifications: true,
        matchReminders: true,
        practiceReminders: true,
        generalUpdates: true
      }
    },
    {
      id: '17',
      name: 'Arjun Reddy',
      email: 'arjun.reddy@email.com',
      phone: '+1-206-555-0117',
      teams: ['Angry Bulls'],
      preferences: {
        emailNotifications: true,
        whatsappNotifications: true,
        matchReminders: true,
        practiceReminders: true,
        generalUpdates: true
      }
    },

    // Royal Warriors players
    {
      id: '18',
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+1-206-555-0118',
      teams: ['Royal Warriors'],
      preferences: {
        emailNotifications: true,
        whatsappNotifications: true,
        matchReminders: true,
        practiceReminders: false,
        generalUpdates: true
      }
    },
    {
      id: '19',
      name: 'Deepika Singh',
      email: 'deepika.singh@email.com',
      phone: '+1-206-555-0119',
      teams: ['Royal Warriors'],
      preferences: {
        emailNotifications: true,
        whatsappNotifications: true,
        matchReminders: true,
        practiceReminders: true,
        generalUpdates: true
      }
    },

    // Watermelons players
    {
      id: '20',
      name: 'Vikram Singh',
      email: 'vikram.singh@email.com',
      phone: '+1-206-555-0120',
      teams: ['Watermelons'],
      preferences: {
        emailNotifications: false,
        whatsappNotifications: true,
        matchReminders: true,
        practiceReminders: true,
        generalUpdates: false
      }
    },
    {
      id: '21',
      name: 'Meera Gupta',
      email: 'meera.gupta@email.com',
      phone: '+1-206-555-0121',
      teams: ['Watermelons'],
      preferences: {
        emailNotifications: true,
        whatsappNotifications: true,
        matchReminders: true,
        practiceReminders: true,
        generalUpdates: true
      }
    },
    {
      id: '22',
      name: 'Rohit Sharma',
      email: 'rohit.sharma@email.com',
      phone: '+1-206-555-0122',
      teams: ['Watermelons'],
      preferences: {
        emailNotifications: true,
        whatsappNotifications: true,
        matchReminders: true,
        practiceReminders: true,
        generalUpdates: true
      }
    },
    {
      id: '23',
      name: 'Kiran Kumar',
      email: 'kiran.kumar@email.com',
      phone: '+1-206-555-0123',
      teams: ['Watermelons'],
      preferences: {
        emailNotifications: true,
        whatsappNotifications: true,
        matchReminders: true,
        practiceReminders: true,
        generalUpdates: true
      }
    },

    // Solaris players
    {
      id: '24',
      name: 'Anita Patel',
      email: 'anita.patel@email.com',
      phone: '+1-206-555-0124',
      teams: ['Solaris'],
      preferences: {
        emailNotifications: true,
        whatsappNotifications: true,
        matchReminders: true,
        practiceReminders: true,
        generalUpdates: true
      }
    },
    {
      id: '25',
      name: 'Suresh Nair',
      email: 'suresh.nair@email.com',
      phone: '+1-206-555-0125',
      teams: ['Solaris'],
      preferences: {
        emailNotifications: true,
        whatsappNotifications: true,
        matchReminders: true,
        practiceReminders: true,
        generalUpdates: true
      }
    },
    {
      id: '26',
      name: 'Amit Patel',
      email: 'amit.patel@email.com',
      phone: '+1-206-555-0126',
      teams: ['Solaris'],
      preferences: {
        emailNotifications: true,
        whatsappNotifications: true,
        matchReminders: true,
        practiceReminders: true,
        generalUpdates: true
      }
    },
    {
      id: '27',
      name: 'Sneha Reddy',
      email: 'sneha.reddy@email.com',
      phone: '+1-206-555-0127',
      teams: ['Solaris'],
      preferences: {
        emailNotifications: true,
        whatsappNotifications: true,
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
    },
    {
      id: '3',
      name: 'Team Meeting',
      subject: 'Team Meeting - {{teamName}} - {{date}}',
      emailContent: `Hello {{playerName}},

You are invited to a team meeting for {{teamName}}:

📅 Meeting Details:
- Date: {{date}}
- Time: {{time}}
- Venue: {{location}}
- Agenda: {{agenda}}

Your attendance is important for team coordination.

Best regards,
ICCWSC Team`,
      whatsappContent: `📅 Team Meeting

Hi {{playerName}}!

Team Meeting for {{teamName}}:
📅 {{date}}
⏰ {{time}}
📍 {{location}}
📋 Agenda: {{agenda}}

Your attendance is important.

- ICCWSC Team`,
      type: 'meeting',
      variables: ['playerName', 'teamName', 'date', 'time', 'location', 'agenda']
    },
    {
      id: '4',
      name: 'General Update',
      subject: 'ICCWSC Update - {{subject}}',
      emailContent: `Dear {{playerName}},

{{message}}

Thank you for being part of the ICCWSC cricket community!

Best regards,
ICCWSC Team`,
      whatsappContent: `📢 ICCWSC Update

Hi {{playerName}}!

{{message}}

Thank you for being part of our cricket community! 🏏

- ICCWSC Team`,
      type: 'general',
      variables: ['playerName', 'subject', 'message']
    }
  ]);

  const [notificationLogs, setNotificationLogs] = useState<NotificationLog[]>([]);
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [customSubject, setCustomSubject] = useState('');
  const [customEmailContent, setCustomEmailContent] = useState('');
  const [customWhatsappContent, setCustomWhatsappContent] = useState('');
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [sendEmail, setSendEmail] = useState(true);
  const [sendWhatsapp, setSendWhatsapp] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [filterTeam, setFilterTeam] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Contact editing states
  const [editingContact, setEditingContact] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{ email: string; phone: string }>({ email: '', phone: '' });
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedRecipientForContact, setSelectedRecipientForContact] = useState<NotificationRecipient | null>(null);

  // Test functionality states
  const [testWhatsappNumber, setTestWhatsappNumber] = useState('');
  const [testWhatsappMessage, setTestWhatsappMessage] = useState('Test WhatsApp message from ICCWSC Cricket Club! 🏏');
  const [whatsappTestResult, setWhatsappTestResult] = useState<{ success: boolean; message: string } | null>(null);

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
      setCustomWhatsappContent(template.whatsappContent);
      
      // Initialize variables
      const newVariables: Record<string, string> = {};
      template.variables.forEach(variable => {
        newVariables[variable] = '';
      });
      setVariables(newVariables);
    }
  };

  // Contact editing functions
  const handleEditContact = (recipient: NotificationRecipient) => {
    setEditingContact(recipient.id);
    setEditForm({
      email: recipient.email || '',
      phone: recipient.phone || ''
    });
  };

  const handleSaveContact = (recipientId: string) => {
    // Validate email format
    if (editForm.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editForm.email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Validate phone format
    if (editForm.phone && !/^\+?1?[2-9]\d{2}[2-9]\d{2}\d{4}$/.test(editForm.phone.replace(/\D/g, ''))) {
      alert('Please enter a valid phone number (e.g., +1-206-555-0123)');
      return;
    }

    // Update recipient contact information
    setRecipients(prev => prev.map(recipient => 
      recipient.id === recipientId 
        ? { 
            ...recipient, 
            email: editForm.email || undefined,
            phone: editForm.phone || undefined
          }
        : recipient
    ));

    setEditingContact(null);
    setEditForm({ email: '', phone: '' });
    alert('Contact information updated successfully!');
  };

  const handleCancelEdit = () => {
    setEditingContact(null);
    setEditForm({ email: '', phone: '' });
  };

  const handleAddContact = (recipient: NotificationRecipient) => {
    setSelectedRecipientForContact(recipient);
    setEditForm({
      email: recipient.email || '',
      phone: recipient.phone || ''
    });
    setShowContactModal(true);
  };

  const handleSaveContactModal = () => {
    if (!selectedRecipientForContact) return;

    // Validate email format
    if (editForm.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editForm.email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Validate phone format
    if (editForm.phone && !/^\+?1?[2-9]\d{2}[2-9]\d{2}\d{4}$/.test(editForm.phone.replace(/\D/g, ''))) {
      alert('Please enter a valid phone number (e.g., +1-206-555-0123)');
      return;
    }

    // Update recipient contact information
    setRecipients(prev => prev.map(recipient => 
      recipient.id === selectedRecipientForContact.id 
        ? { 
            ...recipient, 
            email: editForm.email || undefined,
            phone: editForm.phone || undefined
          }
        : recipient
    ));

    setShowContactModal(false);
    setSelectedRecipientForContact(null);
    setEditForm({ email: '', phone: '' });
    alert('Contact information updated successfully!');
  };

  // WhatsApp testing function
  const sendTestWhatsApp = async () => {
    if (!testWhatsappNumber.trim() || !testWhatsappMessage.trim()) {
      setWhatsappTestResult({
        success: false,
        message: 'Please enter both phone number and message'
      });
      return;
    }

    setIsLoading(true);
    setWhatsappTestResult(null);

    try {
      const result = await testWhatsAppFunctionality(testWhatsappNumber, testWhatsappMessage);
      
      if (result.success) {
        const newLog: NotificationLog = {
          id: Date.now().toString(),
          type: 'whatsapp',
          recipient: testWhatsappNumber,
          subject: 'Test WhatsApp',
          content: testWhatsappMessage,
          status: 'sent',
          sentAt: new Date()
        };
        setNotificationLogs(prev => [newLog, ...prev]);

        setWhatsappTestResult({
          success: true,
          message: `WhatsApp opened successfully! Message sent to ${testWhatsappNumber}`
        });

        setTestWhatsappNumber('');
        setTestWhatsappMessage('Test WhatsApp message from ICCWSC Cricket Club! 🏏');
      } else {
        setWhatsappTestResult({
          success: false,
          message: result.error || 'Failed to open WhatsApp'
        });
      }

    } catch (error) {
      console.error('WhatsApp sending failed:', error);
      setWhatsappTestResult({
        success: false,
        message: 'Unexpected error occurred while sending WhatsApp'
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

    if (!sendEmail && !sendWhatsapp) {
      alert('Please select at least one notification method (Email or WhatsApp).');
      return;
    }

    if (!customSubject.trim() || 
        (!customEmailContent.trim() && sendEmail) || 
        (!customWhatsappContent.trim() && sendWhatsapp)) {
      alert('Please fill in all required content fields.');
      return;
    }

    setIsLoading(true);

    try {
      const selectedRecipientsData = recipients.filter(r => selectedRecipients.includes(r.id));
      let totalSent = 0;
      let totalFailed = 0;

      // Send WhatsApp messages immediately
      if (sendWhatsapp) {
        const whatsappRecipients = selectedRecipientsData
          .filter(r => r.phone && r.preferences.whatsappNotifications)
          .map(r => ({
            name: r.name,
            phone: r.phone!
          }));

        if (whatsappRecipients.length > 0) {
          // Replace variables in WhatsApp content
          let whatsappContent = customWhatsappContent;
          Object.entries(variables).forEach(([key, value]) => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            whatsappContent = whatsappContent.replace(regex, value);
          });

          const result = await sendImmediateWhatsAppToAll(whatsappRecipients, whatsappContent);
          totalSent += result.success;
          totalFailed += result.failed;

          // Log WhatsApp messages
          whatsappRecipients.forEach(recipient => {
            const personalizedMessage = whatsappContent.replace(/{{playerName}}/g, recipient.name);
            const whatsappLog: NotificationLog = {
              id: `whatsapp_${Date.now()}_${recipient.phone}`,
              type: 'whatsapp',
              recipient: recipient.phone,
              subject: 'WhatsApp Notification',
              content: personalizedMessage,
              status: 'sent',
              sentAt: new Date()
            };
            setNotificationLogs(prev => [whatsappLog, ...prev]);
          });
        }
      }

      // Send Email notifications (mock)
      if (sendEmail) {
        for (const recipient of selectedRecipientsData) {
          if (recipient.email && recipient.preferences.emailNotifications) {
            await new Promise(resolve => setTimeout(resolve, 100));

            // Replace variables in email content
            let emailContent = customEmailContent;
            let subject = customSubject;

            Object.entries(variables).forEach(([key, value]) => {
              const regex = new RegExp(`{{${key}}}`, 'g');
              emailContent = emailContent.replace(regex, value);
              subject = subject.replace(regex, value);
            });

            // Replace recipient-specific variables
            emailContent = emailContent.replace(/{{playerName}}/g, recipient.name);
            subject = subject.replace(/{{playerName}}/g, recipient.name);

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
        }
      }

      alert(`Notifications sent successfully! ${totalSent} messages sent, ${totalFailed} failed.`);
      
      // Reset form
      setSelectedRecipients([]);
      setCustomSubject('');
      setCustomEmailContent('');
      setCustomWhatsappContent('');
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
            Send match reminders, practice notifications, and team updates to your cricket players via email and WhatsApp instantly.
          </p>
        </div>

        {/* WhatsApp Test Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
            <MessageSquare size={24} />
            <span>Test WhatsApp Messaging</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={testWhatsappNumber}
                  onChange={(e) => setTestWhatsappNumber(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="+1-206-555-0123"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">Message</label>
                <textarea
                  value={testWhatsappMessage}
                  onChange={(e) => setTestWhatsappMessage(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                />
              </div>

              <button
                onClick={sendTestWhatsApp}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                <MessageSquare size={20} />
                <span>Send Test WhatsApp</span>
              </button>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">How WhatsApp Messaging Works</h3>
              <div className="space-y-3 text-white/80 text-sm">
                <div className="flex items-start space-x-2">
                  <CheckCircle size={16} className="text-green-400 mt-0.5" />
                  <span>WhatsApp opens immediately with pre-filled message</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle size={16} className="text-green-400 mt-0.5" />
                  <span>Works on both mobile and desktop WhatsApp</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle size={16} className="text-green-400 mt-0.5" />
                  <span>No backend or API keys required</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle size={16} className="text-green-400 mt-0.5" />
                  <span>Messages are sent instantly to recipients</span>
                </div>
              </div>

              {whatsappTestResult && (
                <div className={`mt-4 flex items-center space-x-2 px-4 py-2 rounded-xl ${
                  whatsappTestResult.success 
                    ? 'bg-green-500/20 border border-green-500/30 text-green-300' 
                    : 'bg-red-500/20 border border-red-500/30 text-red-300'
                }`}>
                  {whatsappTestResult.success ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
                  <span className="text-sm">{whatsappTestResult.message}</span>
                </div>
              )}
            </div>
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

              {/* Team Summary */}
              {filterTeam && (
                <div className="mb-4 p-3 bg-orange-500/20 border border-orange-500/30 rounded-xl">
                  <div className="flex items-center space-x-2 text-orange-300">
                    <Users size={16} />
                    <span className="text-sm font-semibold">
                      {filterTeam}: {filteredRecipients.length} players
                    </span>
                  </div>
                </div>
              )}

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
                      <div className="flex-1">
                        <h3 className="text-white font-semibold">{recipient.name}</h3>
                        <div className="text-xs text-white/70">{recipient.teams.join(', ')}</div>
                        
                        {/* Contact Information */}
                        <div className="mt-2 space-y-1">
                          {editingContact === recipient.id ? (
                            <div className="space-y-2">
                              <input
                                type="email"
                                value={editForm.email}
                                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                className="w-full px-2 py-1 bg-white/10 border border-white/30 rounded text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-orange-400 text-xs"
                                placeholder="Email address"
                                onClick={(e) => e.stopPropagation()}
                              />
                              <input
                                type="tel"
                                value={editForm.phone}
                                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                className="w-full px-2 py-1 bg-white/10 border border-white/30 rounded text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-orange-400 text-xs"
                                placeholder="Phone number"
                                onClick={(e) => e.stopPropagation()}
                              />
                              <div className="flex space-x-1">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSaveContact(recipient.id);
                                  }}
                                  className="flex-1 bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs font-semibold hover:bg-green-500/30 transition-colors"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCancelEdit();
                                  }}
                                  className="flex-1 bg-red-500/20 text-red-300 px-2 py-1 rounded text-xs font-semibold hover:bg-red-500/30 transition-colors"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="flex items-center space-x-2 text-white/80 text-xs">
                                <Mail size={10} />
                                <span>{recipient.email || 'No email'}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-white/80 text-xs">
                                <Phone size={10} />
                                <span>{recipient.phone || 'No phone'}</span>
                              </div>
                              {canEditContacts && (
                                <div className="flex space-x-1 mt-2">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleEditContact(recipient);
                                    }}
                                    className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs font-semibold hover:bg-blue-500/30 transition-colors flex items-center space-x-1"
                                  >
                                    <Edit3 size={10} />
                                    <span>Edit</span>
                                  </button>
                                  {(!recipient.email || !recipient.phone) && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleAddContact(recipient);
                                      }}
                                      className="bg-orange-500/20 text-orange-300 px-2 py-1 rounded text-xs font-semibold hover:bg-orange-500/30 transition-colors flex items-center space-x-1"
                                    >
                                      <Plus size={10} />
                                      <span>Add</span>
                                    </button>
                                  )}
                                </div>
                              )}
                            </>
                          )}
                        </div>

                        <div className="flex items-center space-x-2 mt-2">
                          {recipient.preferences.emailNotifications && recipient.email && (
                            <Mail size={12} className="text-blue-400" />
                          )}
                          {recipient.preferences.whatsappNotifications && recipient.phone && (
                            <MessageSquare size={12} className="text-emerald-400" />
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

                {filteredRecipients.length === 0 && (
                  <div className="text-center py-8 text-white/50">
                    <Users size={32} className="mx-auto mb-2" />
                    <p>No players found</p>
                    <p className="text-xs">Try adjusting your filters</p>
                  </div>
                )}
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
                <div className="flex flex-wrap gap-4">
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
                      checked={sendWhatsapp}
                      onChange={(e) => setSendWhatsapp(e.target.checked)}
                      className="w-4 h-4 text-orange-500 bg-white/10 border-white/30 rounded focus:ring-orange-400"
                    />
                    <MessageSquare size={16} className="text-emerald-400" />
                    <span className="text-white">WhatsApp (Instant)</span>
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

              {/* WhatsApp Content */}
              {sendWhatsapp && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-white/90 mb-2">WhatsApp Content</label>
                  <textarea
                    value={customWhatsappContent}
                    onChange={(e) => setCustomWhatsappContent(e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                    placeholder="Enter WhatsApp content..."
                  />
                  <div className="mt-2 p-3 bg-green-500/20 border border-green-500/30 rounded-xl">
                    <div className="flex items-center space-x-2 text-green-300">
                      <MessageSquare size={16} />
                      <span className="text-sm font-semibold">WhatsApp will open immediately for each recipient</span>
                    </div>
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
                            <MessageSquare size={16} className="text-emerald-400" />
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

        {/* Contact Modal */}
        {showContactModal && selectedRecipientForContact && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md border border-white/30">
              <h3 className="text-2xl font-bold text-white mb-6">
                Update Contact Info - {selectedRecipientForContact.name}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="player@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="+1-206-555-0123"
                  />
                </div>

                <div className="text-xs text-white/60">
                  <p>• Email format: player@email.com</p>
                  <p>• Phone format: +1-206-555-0123 or (206) 555-0123</p>
                </div>
              </div>
              
              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => {
                    setShowContactModal(false);
                    setSelectedRecipientForContact(null);
                    setEditForm({ email: '', phone: '' });
                  }}
                  className="flex-1 bg-white/10 text-white py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveContactModal}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-green-700 transition-all"
                >
                  Save Contact Info
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}