import axios from 'axios'; import {config} from './config';
export type Forecast={city:string;country:string;current:{temp:number;feelsLike:number;humidity:number;description:string;icon:string};daily:Array<{date:string;min:number;max:number;description:string;icon:string}>};
const sleep=(ms:number)=>new Promise(r=>setTimeout(r,ms));
async function getWithRetry(url:string,params:Record<string,unknown>,retries=3):Promise<any>{for(let attempt=0;;attempt++)try{return await axios.get(url,{params,timeout:5000})}catch(e:any){const status=e.response?.status;if(attempt>=retries-1||(status&&status<500&&status!==429))throw e;await sleep(250*2**attempt)}}
export async function fetchWeather(city:string):Promise<Forecast>{
 if(!config.apiKey) throw Object.assign(new Error('OPENWEATHER_API_KEY is not configured'),{status:503});
 try{
  const geo=await getWithRetry('https://api.openweathermap.org/geo/1.0/direct',{q:city,limit:1,appid:config.apiKey}); if(!geo.data?.length)throw Object.assign(new Error('City not found'),{status:404}); const place=geo.data[0];
  const r=await getWithRetry('https://api.openweathermap.org/data/3.0/onecall',{lat:place.lat,lon:place.lon,exclude:'minutely,hourly,alerts',units:'metric',appid:config.apiKey}); const x=r.data;
  return {city:place.name,country:place.country,current:{temp:x.current.temp,feelsLike:x.current.feels_like,humidity:x.current.humidity,description:x.current.weather[0].description,icon:x.current.weather[0].icon},daily:x.daily.slice(0,7).map((d:any)=>({date:new Date(d.dt*1000).toISOString().slice(0,10),min:d.temp.min,max:d.temp.max,description:d.weather[0].description,icon:d.weather[0].icon}))};
 }catch(e:any){if(e.status===404)throw e;const status=e.response?.status; if(status===404)throw Object.assign(new Error('City not found'),{status:404}); if(status===401)throw Object.assign(new Error('OpenWeather One Call 3.0 is not enabled for this API key'),{status:502}); throw Object.assign(new Error('Weather provider unavailable'),{status:502});}
}
