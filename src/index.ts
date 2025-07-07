import dotenv from 'dotenv';
import express, { Application } from 'express';
import { routes } from './routes';
import { logger } from './utils/logger';
import cors from 'cors';

dotenv.config();

const app: Application = express();
const port: number = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

routes(app);

app.listen(port, () => logger.info(`Server is running on port ${port}`));
