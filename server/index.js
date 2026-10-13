import 'dotenv/config';import mongoose from 'mongoose';import express from 'express';import {app} from './app.js';
if(!process.env.MONGODB_URI)throw new Error('Set MONGODB_URI in .env');
await mongoose.connect(process.env.MONGODB_URI);app.use(express.static('dist'));app.get('/{*path}',(req,res)=>res.sendFile('index.html',{root:'dist'}));
const server=app.listen(process.env.PORT||4000,()=>console.log('TeamFlow API ready'));
async function stop(){server.close(async()=>{await mongoose.disconnect();process.exit(0);});}process.on('SIGTERM',stop);process.on('SIGINT',stop);
