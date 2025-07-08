import { Request, Response } from 'express';
import { logger } from '../utils/logger';
import { createProductValidation } from '../validations/product.validation';

export const getAllProductController = (req: Request, res: Response) => {
  logger.info('Data Produk Berhasil Di Kirim');
  res.status(200).send({
    status: true,
    statusCode: 200,
    data: { name: 'Sepatu Adidas', price: 20000 },
    message: 'Data Produk Berhasil di Kirim',
  });
};

export const getProductByNameController = (req: Request, res: Response) => {
  const dummyProducts = [
    { name: 'Sepatu', price: 10000 },
    { name: 'Baju', price: 12000 },
    { name: 'Celana', price: 14000 },
    { name: 'Baju Tidur', price: 200000 },
  ];

  const name = req.query.name;

  if (!name || typeof name !== 'string') {
    res.status(400).json({
      status: false,
      statusCode: 400,
      message: 'Query parameter `name` wajib diisi dan harus berupa string.',
    });
    return;
  }

  const product = dummyProducts.filter((item) =>
    item.name.toLowerCase().includes(name.toLowerCase())
  );

  if (product.length === 0) {
    logger.warn(`${name} tidak ditemukan`);
    res.status(404).json({
      status: false,
      statusCode: 404,
      message: `Produk ${name} tidak ditemukan`,
    });
    return;
  }

  logger.info(`Data produk ${name} telah dikirim`);
  res.status(200).json({
    status: true,
    statusCode: 200,
    message: `Data produk ${name} telah dikirim`,
    data: product,
  });
};

export const createProductController = (req: Request, res: Response) => {
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
};
