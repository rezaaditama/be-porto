import { Request, Response, Router } from 'express';
import { createProductValidation } from '../validation/product.validation';
import { logger } from '../utils/logger';

export const ProductRouter: Router = Router();

ProductRouter.get('/', (req: Request, res: Response) => {
  res.status(200).send({ status: 200 });
});

ProductRouter.post('/', (req: Request, res: Response) => {
  const results = createProductValidation.safeParse(req.body);

  if (!results.success) {
    logger.error('Validasi Gagal', results.error.flatten().fieldErrors);
    res.status(400).json({
      status: false,
      statusCode: 400,
      message: 'Validasi Gagal',
      error: results.error.flatten().fieldErrors,
    });
    return;
  }
  logger.info('Data Health Berhasil di Tambahkan');
  res.status(200).send({
    status: true,
    statusCode: 200,
    message: 'Add Product Success',
    data: results.data,
  });
});
