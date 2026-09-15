import Redis from 'ioredis'; import {config} from './config';
export interface Cache {get(k:string):Promise<string|null>; setex(k:string,ttl:number,v:string):Promise<unknown>}
export const redis:Cache=new Redis(config.redis,{maxRetriesPerRequest:1,lazyConnect:true});
