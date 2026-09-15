import mongoose from 'mongoose';
const schema=new mongoose.Schema({city:{type:String,required:true,index:true},country:String,cacheHit:{type:Boolean,required:true},latencyMs:{type:Number,required:true},queriedAt:{type:Date,default:Date.now}},{versionKey:false,bufferCommands:false});
export const QueryLog=mongoose.model('QueryLog',schema);
