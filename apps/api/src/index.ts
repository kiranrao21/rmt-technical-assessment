import { createExpressMiddleware } from '@trpc/server/adapters/express';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { appRouter } from './router';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,
  }),
);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
