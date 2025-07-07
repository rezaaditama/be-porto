import dotenv from 'dotenv';
import express, { Application } from 'express';
import { routes } from './routes';

const app: Application = express();
const port: number = Number(process.env.port) || 3000;

dotenv.config();

routes(app);

app.listen(port, () => console.log(`Server is running on port ${port}`));
