import { config } from '../server/src/config/env.js';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({
    status: 'ok',
    platform: 'Vercel Serverless',
    service: 'MedBooking API',
    timestamp: new Date().toISOString(),
    telegramConfigured: Boolean(config.telegram.botToken && config.telegram.chatId && !config.telegram.botToken.includes('FakeToken'))
  });
}
