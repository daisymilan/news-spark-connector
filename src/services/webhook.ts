export const sendToWebhook = async (topic: string) => {
  try {
    const response = await fetch('https://n8n.servenorobot.com/webhook/social-media-links', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending to webhook:', error);
    throw error;
  }
};