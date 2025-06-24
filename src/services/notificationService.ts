import { sendEmail, sendBulkEmails, EmailData } from './emailService';
import { sendWhatsAppMessage, sendBulkWhatsApp, WhatsAppData, formatWhatsAppNumber } from './whatsappService';
import { NotificationRecipient, NotificationTemplate } from '../types';

export interface NotificationOptions {
  template?: NotificationTemplate;
  customSubject?: string;
  customEmailContent?: string;
  customWhatsappContent?: string;
  variables?: Record<string, string>;
  sendEmail?: boolean;
  sendWhatsapp?: boolean;
}

export interface NotificationResult {
  emailResults?: { success: number; failed: number };
  whatsappResults?: { success: number; failed: number };
  totalSent: number;
  totalFailed: number;
}

// Replace template variables with actual values
const replaceVariables = (content: string, variables: Record<string, string>): string => {
  let result = content;
  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    result = result.replace(regex, value);
  });
  return result;
};

// Send notification to a single recipient
export const sendNotificationToRecipient = async (
  recipient: NotificationRecipient,
  options: NotificationOptions
): Promise<NotificationResult> => {
  const result: NotificationResult = {
    totalSent: 0,
    totalFailed: 0
  };

  const variables = options.variables || {};
  
  // Add recipient-specific variables
  const allVariables = {
    ...variables,
    playerName: recipient.name,
    recipientName: recipient.name
  };

  // Send email if enabled and recipient has email
  if (options.sendEmail && recipient.email && recipient.preferences.emailNotifications) {
    const subject = options.customSubject || options.template?.subject || 'ICCWSC Notification';
    const content = options.customEmailContent || options.template?.emailContent || 'No content provided';
    
    const emailData: EmailData = {
      to_email: recipient.email,
      to_name: recipient.name,
      subject: replaceVariables(subject, allVariables),
      message: replaceVariables(content, allVariables)
    };

    const emailSuccess = await sendEmail(emailData);
    if (emailSuccess) {
      result.totalSent++;
    } else {
      result.totalFailed++;
    }
  }

  // Send WhatsApp if enabled and recipient has phone
  if (options.sendWhatsapp && recipient.phone && recipient.preferences.whatsappNotifications) {
    const content = options.customWhatsappContent || options.template?.whatsappContent || 'ICCWSC Notification';
    
    const whatsappData: WhatsAppData = {
      to: formatWhatsAppNumber(recipient.phone),
      message: replaceVariables(content, allVariables)
    };

    const whatsappResult = await sendWhatsAppMessage(whatsappData);
    if (whatsappResult.success) {
      result.totalSent++;
    } else {
      result.totalFailed++;
    }
  }

  return result;
};

// Send notification to multiple recipients
export const sendBulkNotification = async (
  recipients: NotificationRecipient[],
  options: NotificationOptions
): Promise<NotificationResult> => {
  const result: NotificationResult = {
    totalSent: 0,
    totalFailed: 0
  };

  const variables = options.variables || {};

  // Prepare email data for bulk sending
  if (options.sendEmail) {
    const emailData: EmailData[] = recipients
      .filter(r => r.email && r.preferences.emailNotifications)
      .map(recipient => {
        const allVariables = {
          ...variables,
          playerName: recipient.name,
          recipientName: recipient.name
        };

        const subject = options.customSubject || options.template?.subject || 'ICCWSC Notification';
        const content = options.customEmailContent || options.template?.emailContent || 'No content provided';

        return {
          to_email: recipient.email!,
          to_name: recipient.name,
          subject: replaceVariables(subject, allVariables),
          message: replaceVariables(content, allVariables)
        };
      });

    if (emailData.length > 0) {
      const emailResults = await sendBulkEmails(emailData);
      result.emailResults = emailResults;
      result.totalSent += emailResults.success;
      result.totalFailed += emailResults.failed;
    }
  }

  // Prepare WhatsApp data for bulk sending
  if (options.sendWhatsapp) {
    const whatsappData: WhatsAppData[] = recipients
      .filter(r => r.phone && r.preferences.whatsappNotifications)
      .map(recipient => {
        const allVariables = {
          ...variables,
          playerName: recipient.name,
          recipientName: recipient.name
        };

        const content = options.customWhatsappContent || options.template?.whatsappContent || 'ICCWSC Notification';

        return {
          to: formatWhatsAppNumber(recipient.phone!),
          message: replaceVariables(content, allVariables)
        };
      });

    if (whatsappData.length > 0) {
      const whatsappResults = await sendBulkWhatsApp(whatsappData);
      result.whatsappResults = whatsappResults;
      result.totalSent += whatsappResults.success;
      result.totalFailed += whatsappResults.failed;
    }
  }

  return result;
};

// Send match reminder notifications
export const sendMatchReminder = async (
  recipients: NotificationRecipient[],
  matchDetails: {
    teamName: string;
    opponent: string;
    date: string;
    time: string;
    location: string;
  }
): Promise<NotificationResult> => {
  const variables = {
    teamName: matchDetails.teamName,
    opponent: matchDetails.opponent,
    date: matchDetails.date,
    time: matchDetails.time,
    location: matchDetails.location
  };

  const options: NotificationOptions = {
    customSubject: `Cricket Match Tomorrow - ${matchDetails.teamName} vs ${matchDetails.opponent}`,
    customEmailContent: `Dear {{playerName}},

This is a reminder about tomorrow's cricket match:

🏏 Match Details:
- Teams: ${matchDetails.teamName} vs ${matchDetails.opponent}
- Date: ${matchDetails.date}
- Time: ${matchDetails.time}
- Venue: ${matchDetails.location}

Please arrive 30 minutes early for warm-up.

Best regards,
ICCWSC Team`,
    customWhatsappContent: `🏏 Cricket Match Reminder

Hi {{playerName}}!

Match Details:
🏏 ${matchDetails.teamName} vs ${matchDetails.opponent}
📅 ${matchDetails.date}
⏰ ${matchDetails.time}
📍 ${matchDetails.location}

Please arrive 30 minutes early for warm-up.

Good luck! 🏆

- ICCWSC Team`,
    variables,
    sendEmail: true,
    sendWhatsapp: true
  };

  // Filter recipients who want match reminders
  const filteredRecipients = recipients.filter(r => r.preferences.matchReminders);
  
  return await sendBulkNotification(filteredRecipients, options);
};

// Send practice reminder notifications
export const sendPracticeReminder = async (
  recipients: NotificationRecipient[],
  practiceDetails: {
    date: string;
    time: string;
    location: string;
    description?: string;
  }
): Promise<NotificationResult> => {
  const variables = {
    date: practiceDetails.date,
    time: practiceDetails.time,
    location: practiceDetails.location,
    description: practiceDetails.description || 'Regular practice session'
  };

  const options: NotificationOptions = {
    customSubject: `Cricket Practice - ${practiceDetails.date} at ${practiceDetails.time}`,
    customEmailContent: `Hi {{playerName}},

You have a cricket practice session scheduled:

📅 Practice Details:
- Date: ${practiceDetails.date}
- Time: ${practiceDetails.time}
- Venue: ${practiceDetails.location}
- Focus: ${practiceDetails.description || 'Regular practice session'}

Bring your cricket gear and water bottle.

See you on the field!
ICCWSC`,
    customWhatsappContent: `🏃‍♂️ Cricket Practice

Hi {{playerName}}!

Practice Session:
📅 ${practiceDetails.date}
⏰ ${practiceDetails.time}
📍 ${practiceDetails.location}
🎯 Focus: ${practiceDetails.description || 'Regular practice'}

Bring your cricket gear and water bottle.

See you on the field! 🏏

- ICCWSC`,
    variables,
    sendEmail: true,
    sendWhatsapp: true
  };

  // Filter recipients who want practice reminders
  const filteredRecipients = recipients.filter(r => r.preferences.practiceReminders);
  
  return await sendBulkNotification(filteredRecipients, options);
};