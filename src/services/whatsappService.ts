// WhatsApp Service for Cricket Club Notifications
// Uses WhatsApp Click-to-Chat feature with immediate sending

export interface WhatsAppData {
  to: string;
  message: string;
}

export interface WhatsAppResponse {
  success: boolean;
  url?: string;
  error?: string;
}

// Generate WhatsApp click-to-chat URL
export const generateWhatsAppLink = (phoneNumber: string, message: string): string => {
  // Clean phone number (remove all non-digits)
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  
  // Add country code if not present (assuming US numbers)
  let formattedPhone = cleanPhone;
  if (cleanPhone.length === 10) {
    formattedPhone = `1${cleanPhone}`;
  } else if (cleanPhone.length === 11 && cleanPhone.startsWith('1')) {
    formattedPhone = cleanPhone;
  }
  
  // Encode message for URL
  const encodedMessage = encodeURIComponent(message);
  
  // Generate WhatsApp URL
  return `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
};

// Send WhatsApp message immediately (opens WhatsApp)
export const sendWhatsAppMessage = async (whatsappData: WhatsAppData): Promise<WhatsAppResponse> => {
  try {
    console.log('🟢 Sending WhatsApp message:', whatsappData);
    
    // Validate phone number
    const phoneRegex = /^\+?1?[2-9]\d{2}[2-9]\d{2}\d{4}$/;
    const cleanedPhone = whatsappData.to.replace(/\D/g, '');
    
    if (!phoneRegex.test(cleanedPhone) && cleanedPhone.length !== 10) {
      throw new Error('Invalid phone number format. Please use format: +1-206-555-0123 or 2065550123');
    }

    if (!whatsappData.message || whatsappData.message.trim().length === 0) {
      throw new Error('Message cannot be empty');
    }
    
    // Generate WhatsApp URL
    const whatsappUrl = generateWhatsAppLink(whatsappData.to, whatsappData.message);
    
    // Open WhatsApp immediately
    window.open(whatsappUrl, '_blank');
    
    // Small delay to ensure the window opens
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('✅ WhatsApp message sent successfully!');
    console.log(`📱 Phone: ${whatsappData.to}`);
    console.log(`💬 Message: ${whatsappData.message}`);
    console.log(`🔗 URL: ${whatsappUrl}`);
    
    return {
      success: true,
      url: whatsappUrl
    };
  } catch (error) {
    console.error('❌ WhatsApp message failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

// Send WhatsApp messages to multiple recipients immediately
export const sendBulkWhatsApp = async (messages: WhatsAppData[]): Promise<{ success: number; failed: number }> => {
  let success = 0;
  let failed = 0;

  console.log(`🟢 Sending WhatsApp messages to ${messages.length} recipients...`);

  for (const whatsapp of messages) {
    const result = await sendWhatsAppMessage(whatsapp);
    if (result.success) {
      success++;
      console.log(`✅ WhatsApp ${success} sent successfully`);
    } else {
      failed++;
      console.log(`❌ WhatsApp failed: ${result.error}`);
    }
    
    // Add delay between messages to allow user to send each one
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log(`📊 Bulk WhatsApp complete: ${success} sent, ${failed} failed`);
  return { success, failed };
};

// Validate WhatsApp phone number
export const isValidWhatsAppNumber = (phone: string): boolean => {
  const phoneRegex = /^\+?1?[2-9]\d{2}[2-9]\d{2}\d{4}$/;
  const cleaned = phone.replace(/\D/g, '');
  return phoneRegex.test(cleaned) || cleaned.length === 10;
};

// Format phone number for WhatsApp
export const formatWhatsAppNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 10) {
    return `+1-${cleaned.slice(0,3)}-${cleaned.slice(3,6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+${cleaned.slice(0,1)}-${cleaned.slice(1,4)}-${cleaned.slice(4,7)}-${cleaned.slice(7)}`;
  }
  
  return phone;
};

// Test WhatsApp functionality
export const testWhatsAppFunctionality = async (phoneNumber: string, message: string): Promise<WhatsAppResponse> => {
  console.log('🧪 Testing WhatsApp functionality...');
  console.log(`📱 Test phone: ${phoneNumber}`);
  console.log(`💬 Test message: ${message}`);
  
  if (!isValidWhatsAppNumber(phoneNumber)) {
    const error = 'Invalid phone number format. Please use: +1-206-555-0123, (206) 555-0123, or 2065550123';
    console.error('❌ Validation failed:', error);
    return { success: false, error };
  }
  
  const result = await sendWhatsAppMessage({
    to: phoneNumber,
    message: message
  });
  
  if (result.success) {
    console.log('🎉 WhatsApp test completed successfully!');
    console.log('🟢 WhatsApp opened with pre-filled message');
  } else {
    console.log('💥 WhatsApp test failed:', result.error);
  }
  
  return result;
};

// Generate cricket-specific WhatsApp templates
export const generateCricketWhatsAppMessage = (
  type: 'match' | 'practice' | 'meeting' | 'general',
  playerName: string,
  details: Record<string, string>
): string => {
  const emoji = {
    match: '🏏',
    practice: '🏃‍♂️',
    meeting: '📅',
    general: '📢'
  };

  switch (type) {
    case 'match':
      return `${emoji.match} Cricket Match Reminder

Hi ${playerName}!

Match Details:
🏏 ${details.teamName} vs ${details.opponent}
📅 ${details.date}
⏰ ${details.time}
📍 ${details.location}

Please arrive 30 minutes early for warm-up.

Good luck! 🏆

- ICCWSC Team`;

    case 'practice':
      return `${emoji.practice} Cricket Practice

Hi ${playerName}!

Practice Session:
📅 ${details.date}
⏰ ${details.time}
📍 ${details.location}
🎯 Focus: ${details.description || 'Regular practice'}

Bring your cricket gear and water bottle.

See you on the field! 🏏

- ICCWSC`;

    case 'meeting':
      return `${emoji.meeting} Team Meeting

Hi ${playerName}!

Team Meeting for ${details.teamName}:
📅 ${details.date}
⏰ ${details.time}
📍 ${details.location}
📋 Agenda: ${details.agenda}

Your attendance is important.

- ICCWSC Team`;

    case 'general':
      return `${emoji.general} ICCWSC Update

Hi ${playerName}!

${details.message}

Thank you for being part of our cricket community! 🏏

- ICCWSC Team`;

    default:
      return `Hi ${playerName}! 🏏\n\n${details.message || 'ICCWSC Cricket Club notification'}\n\n- ICCWSC Team`;
  }
};

// Send immediate WhatsApp to all selected recipients
export const sendImmediateWhatsAppToAll = async (
  recipients: Array<{ name: string; phone: string }>,
  message: string
): Promise<{ success: number; failed: number }> => {
  let success = 0;
  let failed = 0;

  console.log(`🟢 Sending immediate WhatsApp to ${recipients.length} recipients...`);

  for (const recipient of recipients) {
    try {
      const personalizedMessage = message.replace(/{{playerName}}/g, recipient.name);
      const whatsappUrl = generateWhatsAppLink(recipient.phone, personalizedMessage);
      
      // Open WhatsApp for each recipient
      window.open(whatsappUrl, '_blank');
      success++;
      
      console.log(`✅ WhatsApp opened for ${recipient.name} (${recipient.phone})`);
      
      // Delay between opening each WhatsApp window
      await new Promise(resolve => setTimeout(resolve, 1500));
      
    } catch (error) {
      failed++;
      console.error(`❌ Failed to send WhatsApp to ${recipient.name}:`, error);
    }
  }

  console.log(`📊 WhatsApp sending complete: ${success} opened, ${failed} failed`);
  return { success, failed };
};