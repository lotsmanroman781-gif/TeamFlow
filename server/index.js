import 'dotenv/config';
import mongoose from 'mongoose';
import express from 'express';
import {fileURLToPath} from 'node:url';
import {app} from './app.js';
if(!process.env.MONGODB_URI)throw new Error('Set MONGODB_URI in the server environment');
if(process.env.NODE_ENV==='production'&&!process.env.APP_ORIGIN&&!process.env.RENDER_EXTERNAL_URL)throw new Error('Set APP_ORIGIN to your public HTTPS URL');
if(process.env.TRUST_PROXY_HOPS)app.set('trust proxy',Number(process.env.TRUST_PROXY_HOPS));
await mongoose.connect(process.env.MONGODB_URI,{serverSelectionTimeoutMS:15000});
await Promise.all(Object.values(mongoose.models).map(model=>model.init()));
const dist=fileURLToPath(new URL('../dist/',import.meta.url));
app.use(express.static(dist));
app.get('/{*path}',(req,res)=>res.sendFile('index.html',{root:dist}));
const server=app.listen(process.env.PORT||4000,'0.0.0.0',()=>console.log('TeamFlow API ready'));
let closing=false;function stop(){if(closing)return;closing=true;const timer=setTimeout(()=>process.exit(1),10000);timer.unref();server.close(async()=>{await mongoose.disconnect();process.exit(0);});}
process.on('SIGTERM',stop);process.on('SIGINT',stop);
