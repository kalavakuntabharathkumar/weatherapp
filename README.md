# Real-Time Weather Dashboard

Full-stack TypeScript project: React/Vite frontend + Express API proxy + MongoDB query history + Redis caching + OpenWeatherMap integration + Jest/Supertest tests + GitHub Actions.

## Run
1. Copy `server/.env.example` to `server/.env` and set your OpenWeatherMap API key. The 7-day view uses OpenWeather One Call 3.0, so enable One Call 3.0 for that key.
2. Run `docker compose up --build`.
3. UI: `http://localhost:5173`; API health: `http://localhost:3000/api/health`.

The API caches city forecast responses for 10 minutes, applies a 60 requests/minute application-side IP limiter, retries transient upstream failures with exponential backoff, validates city input, and persists successful query metadata in MongoDB.

The portfolio metrics (78% fewer upstream calls, 420ms→45ms latency, exactly 35 tests) are benchmark/test-count claims. This code contains the mechanisms and a meaningful automated suite, but you should reproduce measurements before presenting exact numbers as measured results.
