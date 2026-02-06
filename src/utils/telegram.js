/**
 * Send a notification to Telegram
 * @param {string} message - The message to send
 * @returns {Promise<boolean>} - Whether the notification was sent successfully
 */
export async function sendTelegramNotification(message) {
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
  const ENABLED = process.env.NEXT_PUBLIC_ENABLE_TELEGRAM_NOTIFICATIONS === 'true';

  if (!ENABLED || !TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.log('Telegram notifications are disabled or not configured');
    return false;
  }

  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Telegram API error:', data);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error sending Telegram notification:', error);
    return false;
  }
}

/**
 * Format a contact form submission for Telegram
 * @param {Object} formData - The contact form data
 * @returns {string} - Formatted message for Telegram
 */
export function formatContactFormMessage(formData) {
  const { name, email, message } = formData;
  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Jerusalem',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  return `
🆕 <b>New Contact Form Submission</b>

👤 <b>Name:</b> ${name}
📧 <b>Email:</b> ${email}
📅 <b>Time:</b> ${timestamp}

💬 <b>Message:</b>
${message}

---
<i>Reply to this inquiry via ${email}</i>
  `.trim();
}

/**
 * Send a contact form notification to Telegram
 * @param {Object} formData - The contact form data
 * @returns {Promise<boolean>} - Whether the notification was sent successfully
 */
export async function notifyContactFormSubmission(formData) {
  const message = formatContactFormMessage(formData);
  return await sendTelegramNotification(message);
}
