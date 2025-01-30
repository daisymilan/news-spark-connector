export const sendToWebhook = async (topic: string) => {
  try {
    const response = await fetch('https://n8n.servenorobot.com/webhook/social-media-links', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic,
        timestamp: new Date().toISOString(),
      }),
    });

    // With no-cors mode, we can't read the response body
    // So we'll just return a success status
    return { success: true };
  } catch (error) {
    console.error('Error sending to webhook:', error);
    throw error;
  }
};