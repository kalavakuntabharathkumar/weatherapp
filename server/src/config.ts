import 'dotenv/config';
export const config={port:Number(process.env.PORT||3000),mongo:process.env.MONGODB_URI||'mongodb://localhost:27017/weather',redis:process.env.REDIS_URL||'redis://localhost:6379',apiKey:process.env.OPENWEATHER_API_KEY||'',origin:process.env.CLIENT_ORIGIN||'http://localhost:5173'};
