import express, { Application } from 'express';

const app: Application = express();
const port: Number = Number(process.env.port) || 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
