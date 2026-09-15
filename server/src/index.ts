import mongoose from 'mongoose'; import {createApp} from './app'; import {config} from './config'; import {redis} from './cache';
async function start(){await mongoose.connect(config.mongo); try{await (redis as any).connect()}catch{} createApp().listen(config.port,()=>console.log(`Weather API on :${config.port}`));}
start().catch(e=>{console.error(e);process.exit(1)});
