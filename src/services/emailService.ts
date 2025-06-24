import emailjs from 'emailjs-com';

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'your_service_id'; // Replace with your EmailJS service ID
const EMAILJS_TEMPLATE_ID = 'your_template_id'; // Replace with your EmailJS template ID
const EMAILJS_USER_ID = 'your_user_id'; // Replace with your EmailJS user ID

export interface EmailData {
  to_email: string;
  to_name: string;
  subject: string;
  message: string;
  from_name?: string;
  reply_to?: string;
}

export const sendEmail = async (emailData: EmailData): Promise<boolean> => {
  try {
    const templateParams = {
      to_email: emailData.to_email,
      to_name: emailData.to_name,
      subject: emailData.subject,
      message: emailData.message,
      from_name: emailData.from_name || 'ICCWSC Cricket Club',
      reply_to: emailData.reply_to || 'noreply@iccwsc.com'
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_USER_ID
    );

    console.log('Email sent successfully:', response);
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
};

export const sendBulkEmails = async (emails: EmailData[]): Promise<{ success: number; failed: number }> => {
  let success = 0;
  let failed = 0;

  for (const email of emails) {
    const result = await sendEmail(email);
    if (result) {
      success++;
    } else {
      failed++;
    }
    
    // Add delay between emails to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  return { success, failed };
};