import request from 'supertest'; import {createApp} from '../src/app';
const sample={city:'London',country:'GB',current:{temp:12,feelsLike:11,humidity:70,description:'cloudy',icon:'04d'},daily:[{date:'2026-09-28',min:8,max:14,description:'cloudy',icon:'04d'}]};
function memory(){const m=new Map<string,string>();return {get:async(k:string)=>m.get(k)||null,setex:async(k:string,_t:number,v:string)=>{m.set(k,v);return 'OK'}}}
test('health',async()=>{expect((await request(createApp(memory(),async()=>sample)).get('/api/health')).status).toBe(200)});
test('weather miss then hit',async()=>{const cache=memory();let calls=0;const app=createApp(cache,async()=>{calls++;return sample});let r=await request(app).get('/api/weather?city=London');expect(r.status).toBe(200);expect(r.headers['x-cache']).toBe('MISS');r=await request(app).get('/api/weather?city=London');expect(r.headers['x-cache']).toBe('HIT');expect(calls).toBe(1)});
test('rejects bad city',async()=>{const r=await request(createApp(memory(),async()=>sample)).get('/api/weather?city=%21');expect(r.status).toBe(400)});
test('maps provider error',async()=>{const r=await request(createApp(memory(),async()=>{throw Object.assign(new Error('City not found'),{status:404})})).get('/api/weather?city=Nowhere');expect(r.status).toBe(404)});
