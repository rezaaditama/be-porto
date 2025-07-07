import { Request, Response, Router } from 'express';
import { logger } from '../utils/logger';

export const HealthRouter: Router = Router();

HealthRouter.get('/', (req: Request, res: Response) => {
  res.status(200).send({ status: 200 });
});

HealthRouter.post('/', (req: Request, res: Response) => {
  logger.info('Data Health Berhasil di Tambahkan');
  res.status(200).send({ status: true, statusCode: 200, data: req.body });
});
