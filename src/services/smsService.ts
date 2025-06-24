// SMS Service using Twilio (requires backend implementation)
// This is a frontend interface - actual SMS sending requires a backend service

export interface SMSData {
  to: string;
  message: string;
  from?: string;
}

export interface SMSResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

// Mock SMS service for demonstration
export const sendSMS = async (smsData: SMSData): Promise<SMSResponse> => {
  try {
    // In a real implementation, this would call your backend API
    // which would then use Twilio or another SMS provider
    
    console.log('Sending SMS:', smsData);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful response
    return {
      success: true,
      messageId: `sms_${Date.now()}`
    };
  } catch (error) {
    console.error('Failed to send SMS:', error);
    return {
      success: false,
      error: 'Failed to send SMS'
    };
  }
};

export const sendBulkSMS = async (messages: SMSData[]): Promise<{ success: number; failed: number }> => {
  let success = 0;
  let failed = 0;

  for (const sms of messages) {
    const result = await sendSMS(sms);
    if (result.success) {
      success++;
    } else {
      failed++;
    }
    
    // Add delay between messages to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  return { success, failed };
};

// Utility function to format phone numbers
export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Add country code if not present
  if (cleaned.length === 10) {
    return `+1${cleaned}`;
  } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+${cleaned}`;
  }
  
  return phone; // Return original if format is unclear
};

// Validate phone number format
export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\+?1?[2-9]\d{2}[2-9]\d{2}\d{4}$/;
  const cleaned = phone.replace(/\D/g, '');
  return phoneRegex.test(cleaned);
};