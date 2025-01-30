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

    // With no-cors mode, we can't read the response
    // We'll check if the request was made successfully
    if (response.type === 'opaque') {
      return { success: true };
    } else {
      throw new Error('Failed to connect to the server');
    }
  } catch (error) {
    console.error('Error sending to webhook:', error);
    throw new Error('Unable to reach the server. Please verify the webhook URL is correct and the server is running.');
  }
};