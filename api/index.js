// Serverless API entry point for Vercel. Do not call app.listen() here.
import 'dotenv/config';
import mongoose from 'mongoose';
import {app} from '../server/app.js';
import {restoreApiPath} from './_routing.js';

if (process.env.TRUST_PROXY_HOPS) {
  app.set('trust proxy', Number(process.env.TRUST_PROXY_HOPS));
}

// Cache the in-flight connection across requests handled by a warm Function.
let connectionPromise;
async function ensureDatabase() {
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is not set');
  if (mongoose.connection.readyState === 1) return;
  if (!connectionPromise || mongoose.connection.readyState === 0) {
    connectionPromise = mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    }).then(async () => {
      // Preserve the original server's unique and TTL index initialization.
      await Promise.all(Object.values(mongoose.models).map(model => model.init()));
    }).catch(error => {
      connectionPromise = undefined;
      throw error;
    });
  }
  await connectionPromise;
}

export default async function handler(req, res) {
  restoreApiPath(req);
  try {
    if (process.env.NODE_ENV === 'production' && !process.env.APP_ORIGIN) {
      throw new Error('Set APP_ORIGIN to the production Vercel HTTPS domain');
    }
    await ensureDatabase();
    return app(req, res);
  } catch (error) {
    console.error('TeamFlow API initialization failed:', error);
    if (!res.headersSent) res.status(503).json({error: 'API database connection unavailable'});
  }
}
